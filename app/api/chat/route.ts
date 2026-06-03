import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite } from "@/lib/db";
import { ProfileData } from "@/shared/types";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(userId);
  
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + 60_000 }); // 1 minute window
    return true;
  }
  
  if (entry.count >= 10) return false; // max 10 messages per minute
  
  entry.count++;
  return true;
}

function buildSystemPrompt(profile: ProfileData, currentTemplate: string): string {
  return `You are an AI assistant embedded inside LinkedPage, a tool that turns LinkedIn profiles into personal websites. You are helping the user edit their personal page.

CURRENT PAGE STATE:
- Name: ${profile.name}
- Headline: ${profile.headline}
- Location: ${profile.location || "not set"}
- Summary: ${profile.summary}
- Current template: ${currentTemplate}
- Experience: ${profile.experience?.map(e => `${e.title} at ${e.company} (${e.duration})`).join(", ") || "none"}
- Skills: ${profile.skills?.map(s => s.name).join(", ") || "none"}
- Links: ${profile.links?.map(l => `${l.label}: ${l.url}`).join(", ") || "none"}

AVAILABLE TEMPLATES:
- minimal-card: Clean white card layout, Notion-style
- bento-grid: Modular bento grid with skill chips
- full-scroll: Long-form scrolling layout
- dark: Dark background, blue accents

YOUR JOB:
Help the user edit their page. You can update any profile fields or switch the template based on what they ask.

RESPONSE FORMAT:
You MUST always respond with valid JSON and nothing else. No markdown, no explanation outside the JSON. Use this exact structure:

{
  "reply": "your conversational message to the user here",
  "updates": {
    "profile": {
      // only include fields that should change, omit unchanged fields
      // valid keys: name, headline, location, summary, avatarUrl
      // for arrays: experience, skills, links — provide the FULL updated array
    },
    "template": "template-id-here or null if not changing"
  }
}

RULES:
- Always include "reply" with a friendly, concise message confirming what you did or answering the question
- Only include fields in "profile" that the user actually wants to change
- If the user asks to change the template, set "template" to one of the 4 valid IDs
- If nothing should change (user is just chatting), set "updates" to { "profile": {}, "template": null }
- If the user asks to add a skill, return the full skills array with the new skill appended
- If the user asks to remove something, return the full array without that item
- Keep replies short — 1 to 2 sentences max
- Never make up information the user didn't provide
- If the user asks something you can't do (like upload images), explain briefly and suggest what you can do instead`;
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!checkRateLimit(user.id)) {
      return NextResponse.json(
        { error: "You're sending messages too quickly. Wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { message, websiteId } = body;

    if (!message || !websiteId) {
      return NextResponse.json({ error: "Message and websiteId are required" }, { status: 400 });
    }

    const website = await getWebsiteById(websiteId);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const openrouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openrouterApiKey || openrouterApiKey === "your_key_here") {
      return NextResponse.json({
        success: true,
        reply: "Please set your actual `OPENROUTER_API_KEY` in the `.env` file to enable AI page edits.",
        profileUpdates: {},
        template: null
      });
    }

    const modelsToTry = [
      process.env.OPENROUTER_MODEL || "openrouter/free",
      "google/gemma-2-9b-it:free",
      "meta-llama/llama-3.1-8b-instruct:free",
      "qwen/qwen-2.5-72b-instruct:free",
      "qwen/qwen-2-7b-instruct:free",
      "meta-llama/llama-3.3-70b-instruct:free",
      "meta-llama/llama-3.2-3b-instruct:free"
    ];

    const uniqueModels = Array.from(new Set(modelsToTry));
    let response: Response | null = null;
    let lastErrorDetails = "";
    let chosenModel = "";

    for (const model of uniqueModels) {
      try {
        console.log(`[Chat API] Attempting OpenRouter call with model: ${model}`);
        const res = await fetch(`${process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1"}/chat/completions`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${openrouterApiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
            "X-Title": "LinkedPage Editor",
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "system", content: buildSystemPrompt(website.profile as ProfileData, website.templateId || "minimal-card") },
              { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 800,
          }),
        });

        if (res.ok) {
          response = res;
          chosenModel = model;
          break;
        } else {
          const errText = await res.text();
          console.warn(`[Chat API] OpenRouter model ${model} failed with status ${res.status}:`, errText);
          lastErrorDetails = `Model ${model} failed (${res.status}): ${errText}`;
        }
      } catch (err: any) {
        console.error(`[Chat API] Error requesting model ${model}:`, err);
        lastErrorDetails = `Model ${model} network error: ${err.message || err}`;
      }
    }

    if (!response) {
      console.error("[Chat API] All OpenRouter models failed. Last error details:", lastErrorDetails);
      return NextResponse.json({
        success: true,
        reply: "I'm having trouble connecting right now. Try again in a moment.",
        profileUpdates: {},
        template: null
      });
    }

    console.log(`[Chat API] OpenRouter call succeeded using model: ${chosenModel}`);
    const aiData = await response.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    let parsed: { reply: string; updates: { profile: Partial<ProfileData>; template: string | null } };

    try {
      // Strip any accidental markdown code fences
      const cleaned = rawContent.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      // If JSON parsing fails, treat the whole response as a plain reply with no updates
      parsed = {
        reply: rawContent || "I had trouble understanding that. Could you rephrase?",
        updates: { profile: {}, template: null }
      };
    }

    // Apply updates to DB if any exist
    const hasProfileUpdates = Object.keys(parsed.updates?.profile || {}).length > 0;
    const hasTemplateUpdate = parsed.updates?.template && parsed.updates.template !== website.templateId;

    if (hasProfileUpdates || hasTemplateUpdate) {
      const dbUpdates: any = {};
      
      if (hasProfileUpdates) {
        dbUpdates.profile = {
          ...website.profile,
          ...parsed.updates.profile,
        };
      }
      
      if (hasTemplateUpdate) {
        dbUpdates.templateId = parsed.updates.template;
      }
      
      await updateWebsite(websiteId, dbUpdates);
    }

    return NextResponse.json({
      success: true,
      reply: parsed.reply,
      profileUpdates: parsed.updates?.profile || {},
      template: parsed.updates?.template || null,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to process chat query" }, { status: 500 });
  }
}
