import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite, getChatHistory, saveChatMessage } from "@/lib/db";
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
  // Extract simple skills context for the few-shot examples
  const currentSkills = profile.skills || [];
  const exampleSkills = [...currentSkills, { name: "Python" }];

  return `You are an expert AI website generator and editor assistant for "LinkedPage" (a platform that transforms LinkedIn profiles into personal websites).
Your task is to conversationally interact with the user and execute their requested updates to their personal page.

Here is the CURRENT website state:
- Template: "${currentTemplate}"
- Profile Data JSON:
${JSON.stringify(profile, null, 2)}

You can modify ANY field in the Profile Data (including name, headline, summary, location, avatarUrl, bannerUrl, experience, education, skills, links).
You can also change the template to one of the following available templates:
- "minimal-card" (Clean white card layout, Notion-style)
- "bento-grid" (Modular bento grid layout with skill chips and experience tiles)
- "full-scroll" (Long-form scroll with rich sections for experience)
- "dark" (Sleek dark-themed personal page with subtle glow accents)

YOUR RESPONSE FORMAT:
You MUST reply with a single JSON object. Do not output any conversational text or markdown explanation before or after the JSON.
The JSON must match the following structure exactly:
{
  "reply": "Your brief, friendly conversational message back to the user explaining what you updated.",
  "updates": {
    "profile": {
      // ONLY include fields that need to change. Do NOT include fields that are unchanged.
      // If updating an array (like experience, skills, education, or links), you MUST provide the FULL updated array.
      // Example to edit summary: { "summary": "New shortened bio text..." }
      // Example to edit headline: { "headline": "New headline text..." }
    },
    "template": "template-id-here" // or null if not changing
  }
}

EXAMPLES:

1. User says: "shorten my summary"
Response:
{
  "reply": "I've shortened your summary to be more concise and highlight your core expertise.",
  "updates": {
    "profile": {
      "summary": "Shortened, high-impact version of their summary here..."
    },
    "template": null
  }
}

2. User says: "change the theme to dark mode"
Response:
{
  "reply": "I've switched your page template to the sleek Dark Mode theme.",
  "updates": {
    "profile": {},
    "template": "dark"
  }
}

3. User says: "add python to my skills"
Response:
{
  "reply": "I have added Python to your skills list.",
  "updates": {
    "profile": {
      "skills": ${JSON.stringify(exampleSkills)}
    },
    "template": null
  }
}

4. User says: "hi, how are you?"
Response:
{
  "reply": "Hello! I'm here to help you customize and edit your website. Let me know what you'd like to change!",
  "updates": {
    "profile": {},
    "template": null
  }
}

Remember:
- Only update fields the user asked to change. Keep updates minimal.
- When updating arrays (skills, experience, links, education), you MUST return the COMPLETE array with the additions or removals applied.
- Maintain professional, clean formatting for all profile edits.`;
}

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const websiteId = searchParams.get("websiteId");

    if (!websiteId) {
      return NextResponse.json({ error: "websiteId is required" }, { status: 400 });
    }

    const website = await getWebsiteById(websiteId);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const history = await getChatHistory(websiteId);
    return NextResponse.json({ success: true, history });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to load chat history" }, { status: 500 });
  }
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

    // 1. Fetch previous chat history
    const history = await getChatHistory(websiteId);

    // 2. Save the user's message to the database
    await saveChatMessage(websiteId, "user", message);

    const openrouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openrouterApiKey || openrouterApiKey === "your_key_here") {
      const fallbackReply = "Please set your actual `OPENROUTER_API_KEY` in the `.env` file to enable AI page edits.";
      await saveChatMessage(websiteId, "assistant", fallbackReply);
      return NextResponse.json({
        success: true,
        reply: fallbackReply,
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

    // Build the system prompt
    const systemPromptContent = buildSystemPrompt(website.profile as ProfileData, website.templateId || "minimal-card");

    // Format chat messages history for OpenRouter
    const chatMessagesContext = history.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    }));

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
              { role: "system", content: systemPromptContent },
              ...chatMessagesContext,
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
      const errReply = "I'm having trouble connecting right now. Try again in a moment.";
      // We do not save connection errors to chat history to keep history clean
      return NextResponse.json({
        success: true,
        reply: errReply,
        profileUpdates: {},
        template: null
      });
    }

    console.log(`[Chat API] OpenRouter call succeeded using model: ${chosenModel}`);
    const aiData = await response.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    let parsed: { reply: string; updates: { profile: Partial<ProfileData>; template: string | null } };

    try {
      let cleaned = rawContent.trim();
      
      // Find first occurrence of '{' and last occurrence of '}' to extract JSON
      const firstBrace = cleaned.indexOf("{");
      const lastBrace = cleaned.lastIndexOf("}");
      
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleaned = cleaned.substring(firstBrace, lastBrace + 1);
      }
      
      // Strip any accidental markdown code fences
      cleaned = cleaned.replace(/```json|```/g, "").trim();
      
      // Clean up common JSON issues: comments, trailing commas
      cleaned = cleaned.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
      cleaned = cleaned.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

      parsed = JSON.parse(cleaned);
      if (!parsed.reply) {
        parsed.reply = "I've updated your website settings.";
      }
      if (!parsed.updates) {
        parsed.updates = { profile: {}, template: null };
      }
    } catch (parseErr) {
      console.warn("[Chat API] JSON parsing failed. Raw content was:", rawContent, "Error details:", parseErr);
      // If JSON parsing fails, treat the whole response as a plain reply with no updates
      parsed = {
        reply: rawContent || "I had trouble understanding that. Could you rephrase?",
        updates: { profile: {}, template: null }
      };
    }

    // 3. Save assistant response to DB
    await saveChatMessage(websiteId, "assistant", parsed.reply);

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
