import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite, getChatHistory, saveChatMessage } from "@/lib/db";
import { ProfileData, TemplateId, CustomBlock } from "@/shared/types";
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

function createDefaultBlocks(profile: ProfileData): CustomBlock[] {
  const blocks: CustomBlock[] = [];
  
  // 1. Hero Block
  blocks.push({
    id: "hero_" + Math.random().toString(36).substring(2, 9),
    type: "hero",
    title: "Hero Section",
    html: `<div class="bg-white border border-neutral-200/85 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] w-full">
  <img src="${profile.avatarUrl || 'https://i.pravatar.cc/300?img=47'}" class="w-24 h-24 rounded-full object-cover border border-neutral-100 flex-shrink-0" />
  <div class="text-center md:text-left flex-1">
    <h1 class="text-2xl font-bold text-neutral-900 font-['Inter_Tight']">${profile.name}</h1>
    <p class="text-sm text-neutral-500 mt-1 leading-snug">${profile.headline}</p>
    ${profile.location ? `<p class="text-xs text-neutral-400 mt-1.5">${profile.location}</p>` : ""}
  </div>
</div>`
  });

  // 2. About Block
  blocks.push({
    id: "about_" + Math.random().toString(36).substring(2, 9),
    type: "about",
    title: "About Me",
    html: `<div class="bg-white border border-neutral-200/85 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] w-full">
  <h2 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 font-['Inter_Tight']">About</h2>
  <p class="text-sm text-neutral-700 leading-relaxed">${profile.summary}</p>
</div>`
  });

  // 3. Skills Block
  if (profile.skills && profile.skills.length > 0) {
    const skillChips = profile.skills.map(s => `<span class="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-['Inter_Tight']">${s.name}</span>`).join("\n    ");
    blocks.push({
      id: "skills_" + Math.random().toString(36).substring(2, 9),
      type: "skills",
      title: "Core Skills",
      html: `<div class="bg-white border border-neutral-200/85 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] w-full">
  <h2 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-['Inter_Tight']">Skills</h2>
  <div class="flex flex-wrap gap-2">
    ${skillChips}
  </div>
</div>`
    });
  }

  // 4. Experience Block
  if (profile.experience && profile.experience.length > 0) {
    const expItems = profile.experience.map(exp => `
    <div class="flex gap-4">
      <div class="w-1 bg-neutral-100 rounded-full flex-shrink-0 mt-1"></div>
      <div>
        <h3 class="text-sm font-semibold text-neutral-950 font-['Inter_Tight']">${exp.title}</h3>
        <p class="text-xs text-neutral-500 font-medium">${exp.company} · ${exp.duration}</p>
        ${exp.description ? `<p class="text-xs text-neutral-400 mt-1 leading-relaxed">${exp.description}</p>` : ""}
      </div>
    </div>`).join("\n");
    blocks.push({
      id: "experience_" + Math.random().toString(36).substring(2, 9),
      type: "experience",
      title: "Work Experience",
      html: `<div class="bg-white border border-neutral-200/85 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] w-full">
  <h2 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 font-['Inter_Tight']">Experience</h2>
  <div class="flex flex-col gap-6">
    ${expItems}
  </div>
</div>`
    });
  }

  // 5. Education Block
  if (profile.education && profile.education.length > 0) {
    const eduItems = profile.education.map(edu => `
    <div class="border-l-2 border-blue-100 pl-4 py-1">
      <h3 class="text-sm font-semibold text-neutral-950 font-['Inter_Tight']">${edu.degree}</h3>
      <p class="text-xs text-neutral-500">${edu.school} · ${edu.year}</p>
    </div>`).join("\n");
    blocks.push({
      id: "education_" + Math.random().toString(36).substring(2, 9),
      type: "education",
      title: "Education",
      html: `<div class="bg-white border border-neutral-200/85 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] w-full">
  <h2 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 font-['Inter_Tight']">Education</h2>
  <div class="flex flex-col gap-4">
    ${eduItems}
  </div>
</div>`
    });
  }

  // 6. Links Block
  if (profile.links && profile.links.length > 0) {
    const linkItems = profile.links.map(link => `
    <a href="${link.url}" target="_blank" class="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 transition-colors text-neutral-800 font-['Inter_Tight']">
      ${link.label}
    </a>`).join("\n    ");
    blocks.push({
      id: "links_" + Math.random().toString(36).substring(2, 9),
      type: "links",
      title: "Contact & Links",
      html: `<div class="bg-white border border-neutral-200/85 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] w-full">
  <h2 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-['Inter_Tight']">Links</h2>
  <div class="flex flex-wrap gap-2">
    ${linkItems}
  </div>
</div>`
    });
  }

  return blocks;
}

function buildSystemPrompt(profile: ProfileData, currentTemplate: string): string {
  const currentBlocksList = (profile.blocks || []).map(b => `- ID: "${b.id}" (Type: "${b.type}", Title: "${b.title}")`).join("\n");
  
  return `You are an expert AI website generator and editor assistant for "LinkedPage" (a platform that transforms LinkedIn profiles into personal websites).
Your task is to conversationally interact with the user and execute their requested updates.

### 🌟 DYNAMIC WEBPAGE LAYOUT (ai-custom)
When the active template is "ai-custom", the website is composed of dynamic, fully customizable HTML/Tailwind CSS blocks. This allows you to generate, style, and add any custom sections (like a custom Education box, FAQ, projects showcase, custom text cards, styling grids, etc.) directly using raw Tailwind CSS v3 classes!

The page automatically loads Tailwind CDN, so you can write *any* standard Tailwind v3 class (colors, margins, padding, flexbox, grid, shadows, borders, text size, etc.) and it will compile in real-time.

To manage custom blocks on "ai-custom":
1. Use 'initialize_custom_blocks' to populate default HTML blocks (Hero, About, Experience, Skills, Education, Links) based on the user's current profile data, and automatically switch the active template to "ai-custom".
2. Use 'add_custom_block' to create and insert a completely new box/section anywhere in the layout.
3. Use 'update_block_html' to rewrite the structure, design, text, colors, or classes of any block.
4. Use 'delete_block' to remove any block.
5. Use 'reorder_blocks' to rearrange the layout block structure.

Here is the CURRENT website state for context:
- Template: "${currentTemplate}"
- Profile Data JSON:
${JSON.stringify({ ...profile, blocks: undefined }, null, 2)}

${currentTemplate === "ai-custom" ? `- CURRENT BLOCKS INSTALLED:\n${currentBlocksList}` : "- Dynamic blocks: Not initialized on this template. Call 'initialize_custom_blocks' to convert this template to block-based editing."}

### 🛠️ STANDARD PROFILE TOOLS
You also have standard tools to update structured profile fields:
- To update text fields like name, headline, summary, location, avatarUrl, bannerUrl, use 'update_profile_field'.
- To replace experience items, use 'update_experience'.
- To replace education items, use 'update_education'.
- To replace skills, use 'update_skills'.
- To replace links, use 'update_links'.
- To switch the template style, use 'switch_template' (available: "minimal-card", "bento-grid", "full-scroll", "dark", "ai-custom").

### 📋 INSTRUCTIONS
1. If the user wants to add an education section or a new section that isn't showing up (or if they ask to make edits to elements, add custom boxes, or change element colors/sizes), first switch template to "ai-custom" or call "initialize_custom_blocks", then edit the block's HTML code using 'update_block_html' or inject a custom block with 'add_custom_block'.
2. Explain friendly and conversationally what updates you are making in your response.
3. Keep updates clean, beautiful, premium, and highly responsive.`;
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
        update_education: tool({
          description: "Replaces the entire education array with a new array. Always provide the complete updated list of education items.",
          inputSchema: z.object({
            education: z.array(z.object({
              degree: z.string().describe("Degree name, e.g. 'Bachelor of Science'"),
              school: z.string().describe("School name"),
              year: z.string().describe("Graduation year"),
            })).describe("The complete new education list"),
          }),
          execute: async ({ education }) => {
            try {
              profileUpdates.education = education;
              const current = await getWebsiteById(websiteId);
              if (current) {
                const newProfile = {
                  ...current.profile,
                  education
                };
                await updateWebsite(websiteId, { profile: newProfile });
              }
              return { success: true, updated: "education", count: education.length };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          }
        }),
        switch_template: tool({
          description: "Changes the website layout template to a different template style.",
          inputSchema: z.object({
            templateId: z.enum(["daniel-cross", "julian-mercer", "link-hunt", "biobricks"]).describe("The ID of the template style to switch to"),
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
        }),
        initialize_custom_blocks: tool({
          description: "Initializes the website layout with dynamic HTML/Tailwind blocks based on current profile data, and automatically switches the active template to 'daniel-cross'.",
          inputSchema: z.object({}),
          execute: async () => {
            try {
              const current = await getWebsiteById(websiteId);
              if (current) {
                const blocks = createDefaultBlocks(current.profile);
                const newProfile = {
                  ...current.profile,
                  blocks
                };
                profileUpdates.blocks = blocks;
                templateUpdate = "daniel-cross";
                await updateWebsite(websiteId, { profile: newProfile, templateId: "daniel-cross" });
                return { success: true, blocksCount: blocks.length };
              }
              return { success: false, error: "Website not found" };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          }
        }),
        add_custom_block: tool({
          description: "Adds a new custom HTML/Tailwind block to the layout at a specified position.",
          inputSchema: z.object({
            type: z.string().describe("Type of block, e.g. 'custom', 'hero', 'education', 'gallery'"),
            title: z.string().describe("Title for the block, e.g. 'My Portfolio Projects'"),
            html: z.string().describe("The full HTML string with Tailwind CSS styles"),
            index: z.number().optional().describe("The index to insert the block at (default adds to the end)"),
          }),
          execute: async ({ type, title, html, index }) => {
            try {
              const current = await getWebsiteById(websiteId);
              if (current) {
                const blocks = [...(current.profile.blocks || [])];
                const newBlock = {
                  id: "block_custom_" + Math.random().toString(36).substring(2, 9),
                  type,
                  title,
                  html
                };
                if (typeof index === "number") {
                  blocks.splice(index, 0, newBlock);
                } else {
                  blocks.push(newBlock);
                }
                const newProfile = {
                  ...current.profile,
                  blocks
                };
                profileUpdates.blocks = blocks;
                await updateWebsite(websiteId, { profile: newProfile });
                return { success: true, addedBlockId: newBlock.id };
              }
              return { success: false, error: "Website not found" };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          }
        }),
        update_block_html: tool({
          description: "Updates the HTML/Tailwind code of an existing block in the layout.",
          inputSchema: z.object({
            id: z.string().describe("The unique ID of the block to update"),
            html: z.string().describe("The new HTML/Tailwind code to set for the block"),
          }),
          execute: async ({ id, html }) => {
            try {
              const current = await getWebsiteById(websiteId);
              if (current) {
                const blocks = (current.profile.blocks || []).map(b => {
                  if (b.id === id || id.startsWith(`block-${b.id}`)) {
                    return { ...b, html };
                  }
                  return b;
                });
                const newProfile = {
                  ...current.profile,
                  blocks
                };
                profileUpdates.blocks = blocks;
                await updateWebsite(websiteId, { profile: newProfile });
                return { success: true, updatedBlockId: id };
              }
              return { success: false, error: "Website not found" };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          }
        }),
        delete_block: tool({
          description: "Deletes a block from the custom layout by its ID.",
          inputSchema: z.object({
            id: z.string().describe("The ID of the block to delete"),
          }),
          execute: async ({ id }) => {
            try {
              const current = await getWebsiteById(websiteId);
              if (current) {
                const blocks = (current.profile.blocks || []).filter(b => b.id !== id && !id.startsWith(`block-${b.id}`));
                const newProfile = {
                  ...current.profile,
                  blocks
                };
                profileUpdates.blocks = blocks;
                await updateWebsite(websiteId, { profile: newProfile });
                return { success: true, deletedBlockId: id };
              }
              return { success: false, error: "Website not found" };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          }
        }),
        reorder_blocks: tool({
          description: "Reorders the list of blocks by providing the ordered list of block IDs.",
          inputSchema: z.object({
            ids: z.array(z.string()).describe("The ordered list of block IDs"),
          }),
          execute: async ({ ids }) => {
            try {
              const current = await getWebsiteById(websiteId);
              if (current) {
                const currentBlocks = current.profile.blocks || [];
                const reordered = ids.map(id => currentBlocks.find(b => b.id === id || id.startsWith(`block-${b.id}`))).filter(Boolean) as any[];
                
                // Add any missing blocks back at the end
                for (const b of currentBlocks) {
                  if (!reordered.some(r => r.id === b.id)) {
                    reordered.push(b);
                  }
                }
                const newProfile = {
                  ...current.profile,
                  blocks: reordered
                };
                profileUpdates.blocks = reordered;
                await updateWebsite(websiteId, { profile: newProfile });
                return { success: true };
              }
              return { success: false, error: "Website not found" };
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
