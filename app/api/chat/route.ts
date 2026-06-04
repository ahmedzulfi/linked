import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite, getChatHistory, saveChatMessage } from "@/lib/db";
import { ProfileData, TemplateId } from "@/shared/types";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, tool } from "ai";
import { z } from "zod";

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
  return `You are an expert AI website generator and editor assistant for "LinkedPage" (a platform that transforms LinkedIn profiles into personal websites).
Your task is to conversationally interact with the user and execute their requested updates to their personal page.

To update the website, you MUST use the appropriate tools provided to you:
- To update text fields like name, headline, summary, location, avatarUrl, bannerUrl, use 'update_profile_field'.
- To replace or add experience items, use 'update_experience'.
- To replace or add skills, use 'update_skills'.
- To replace or add social/portfolio links, use 'update_links'.
- To switch the website layout template, use 'switch_template' (available templates: "minimal-card", "bento-grid", "full-scroll", "dark").

Here is the CURRENT website state for context:
- Template: "${currentTemplate}"
- Profile Data JSON:
${JSON.stringify(profile, null, 2)}

Instructions:
1. Explain friendly and conversationally what updates you are making in your response.
2. Only update fields the user asked to change. Keep updates minimal.
3. Be helpful, professional, and maintain high-quality writing when updating fields.`;
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

    // Initialize the OpenRouter client
    const openrouter = createOpenRouter({
      apiKey: openrouterApiKey,
    });

    const modelName = process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";
    const model = openrouter(modelName);

    // Local accumulation of updates performed by tools
    const profileUpdates: Partial<ProfileData> = {};
    let templateUpdate: TemplateId | null = null;

    const systemPromptContent = buildSystemPrompt(website.profile as ProfileData, website.templateId || "minimal-card");

    // Format chat messages history for Vercel AI SDK
    const chatMessagesContext = history.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    }));

    // Call generateText with tools
    const result = await generateText({
      model,
      messages: [
        { role: "system", content: systemPromptContent },
        ...chatMessagesContext,
        { role: "user", content: message }
      ],
      tools: {
        update_profile_field: tool({
          description: "Updates a single string/text field in the user's profile (name, headline, summary, location, avatarUrl, bannerUrl). Only call this for text fields.",
          inputSchema: z.object({
            key: z.enum(["name", "headline", "summary", "location", "avatarUrl", "bannerUrl"]).describe("The field name to update"),
            value: z.string().describe("The new value for the field"),
          }),
          execute: async ({ key, value }) => {
            try {
              profileUpdates[key] = value;
              const current = await getWebsiteById(websiteId);
              if (current) {
                const newProfile = {
                  ...current.profile,
                  [key]: value
                };
                await updateWebsite(websiteId, { profile: newProfile });
              }
              return { success: true, updated: key, value };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          }
        }),
        update_experience: tool({
          description: "Replaces the entire experience array with a new array. Always provide the complete updated list of experience items.",
          inputSchema: z.object({
            experience: z.array(z.object({
              title: z.string().describe("Job title"),
              company: z.string().describe("Company name"),
              duration: z.string().describe("Time period, e.g. '2020 - Present'"),
              description: z.string().describe("Description of responsibilities and achievements"),
              logo: z.string().optional().describe("URL or placeholder for company logo"),
            })).describe("The complete new experience list"),
          }),
          execute: async ({ experience }) => {
            try {
              profileUpdates.experience = experience;
              const current = await getWebsiteById(websiteId);
              if (current) {
                const newProfile = {
                  ...current.profile,
                  experience
                };
                await updateWebsite(websiteId, { profile: newProfile });
              }
              return { success: true, updated: "experience", count: experience.length };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          }
        }),
        update_skills: tool({
          description: "Replaces the entire skills array with a new array of skills. Always provide the complete updated list of skills.",
          inputSchema: z.object({
            skills: z.array(z.object({
              name: z.string().describe("Skill name, e.g. 'React'"),
            })).describe("The complete new skills list"),
          }),
          execute: async ({ skills }) => {
            try {
              profileUpdates.skills = skills;
              const current = await getWebsiteById(websiteId);
              if (current) {
                const newProfile = {
                  ...current.profile,
                  skills
                };
                await updateWebsite(websiteId, { profile: newProfile });
              }
              return { success: true, updated: "skills", count: skills.length };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          }
        }),
        update_links: tool({
          description: "Replaces the entire links array with a new array of social/portfolio links. Always provide the complete updated list of links.",
          inputSchema: z.object({
            links: z.array(z.object({
              label: z.string().describe("Link label, e.g. 'GitHub', 'LinkedIn'"),
              url: z.string().describe("URL for the link"),
              icon: z.enum(["linkedin", "twitter", "github", "website", "email", "other"]).optional().describe("Icon category"),
            })).describe("The complete new links list"),
          }),
          execute: async ({ links }) => {
            try {
              profileUpdates.links = links;
              const current = await getWebsiteById(websiteId);
              if (current) {
                const newProfile = {
                  ...current.profile,
                  links
                };
                await updateWebsite(websiteId, { profile: newProfile });
              }
              return { success: true, updated: "links", count: links.length };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          }
        }),
        switch_template: tool({
          description: "Changes the website layout template to a different template style.",
          inputSchema: z.object({
            templateId: z.enum(["minimal-card", "bento-grid", "full-scroll", "dark"]).describe("The ID of the template style to switch to"),
          }),
          execute: async ({ templateId }) => {
            try {
              templateUpdate = templateId as TemplateId;
              await updateWebsite(websiteId, { templateId: templateId as TemplateId });
              return { success: true, updated: "templateId", value: templateId };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          }
        })
      }
    });

    const replyText = result.text || "I have updated your page successfully.";

    // 3. Save assistant response to DB
    await saveChatMessage(websiteId, "assistant", replyText);

    return NextResponse.json({
      success: true,
      reply: replyText,
      profileUpdates,
      template: templateUpdate,
    });
  } catch (e: any) {
    console.error("[Chat API] Error processing request:", e);
    return NextResponse.json({ error: e.message || "Failed to process chat query" }, { status: 500 });
  }
}
