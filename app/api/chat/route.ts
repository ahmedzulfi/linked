import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import {
  getWebsiteById,
  updateWebsite,
  getChatHistory,
  saveChatMessage,
} from "@/lib/db";
import { ProfileData, TemplateId, CustomBlock } from "@/shared/types";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, tool, stepCountIs } from "ai";
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
  <img src="${profile.avatarUrl || "https://i.pravatar.cc/300?img=47"}" class="w-24 h-24 rounded-full object-cover border border-neutral-100 flex-shrink-0" />
  <div class="text-center md:text-left flex-1">
    <h1 class="text-2xl font-bold text-neutral-900 font-['Inter_Tight']">${profile.name}</h1>
    <p class="text-sm text-neutral-500 mt-1 leading-snug">${profile.headline}</p>
    ${profile.location ? `<p class="text-xs text-neutral-400 mt-1.5">${profile.location}</p>` : ""}
  </div>
</div>`,
  });

  // 2. About Block
  blocks.push({
    id: "about_" + Math.random().toString(36).substring(2, 9),
    type: "about",
    title: "About Me",
    html: `<div class="bg-white border border-neutral-200/85 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] w-full">
  <h2 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 font-['Inter_Tight']">About</h2>
  <p class="text-sm text-neutral-700 leading-relaxed">${profile.summary}</p>
</div>`,
  });

  // 3. Skills Block
  if (profile.skills && profile.skills.length > 0) {
    const skillChips = profile.skills
      .map(
        (s) =>
          `<span class="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-['Inter_Tight']">${s.name}</span>`,
      )
      .join("\n    ");
    blocks.push({
      id: "skills_" + Math.random().toString(36).substring(2, 9),
      type: "skills",
      title: "Core Skills",
      html: `<div class="bg-white border border-neutral-200/85 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] w-full">
  <h2 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-['Inter_Tight']">Skills</h2>
  <div class="flex flex-wrap gap-2">
    ${skillChips}
  </div>
</div>`,
    });
  }

  // 4. Experience Block
  if (profile.experience && profile.experience.length > 0) {
    const expItems = profile.experience
      .map(
        (exp) => `
    <div class="flex gap-4">
      <div class="w-1 bg-neutral-100 rounded-full flex-shrink-0 mt-1"></div>
      <div>
        <h3 class="text-sm font-semibold text-neutral-950 font-['Inter_Tight']">${exp.title}</h3>
        <p class="text-xs text-neutral-500 font-medium">${exp.company} · ${exp.duration}</p>
        ${exp.description ? `<p class="text-xs text-neutral-400 mt-1 leading-relaxed">${exp.description}</p>` : ""}
      </div>
    </div>`,
      )
      .join("\n");
    blocks.push({
      id: "experience_" + Math.random().toString(36).substring(2, 9),
      type: "experience",
      title: "Work Experience",
      html: `<div class="bg-white border border-neutral-200/85 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] w-full">
  <h2 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 font-['Inter_Tight']">Experience</h2>
  <div class="flex flex-col gap-6">
    ${expItems}
  </div>
</div>`,
    });
  }

  // 5. Education Block
  if (profile.education && profile.education.length > 0) {
    const eduItems = profile.education
      .map(
        (edu) => `
    <div class="border-l-2 border-blue-100 pl-4 py-1">
      <h3 class="text-sm font-semibold text-neutral-950 font-['Inter_Tight']">${edu.degree}</h3>
      <p class="text-xs text-neutral-500">${edu.school} · ${edu.year}</p>
    </div>`,
      )
      .join("\n");
    blocks.push({
      id: "education_" + Math.random().toString(36).substring(2, 9),
      type: "education",
      title: "Education",
      html: `<div class="bg-white border border-neutral-200/85 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] w-full">
  <h2 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 font-['Inter_Tight']">Education</h2>
  <div class="flex flex-col gap-4">
    ${eduItems}
  </div>
</div>`,
    });
  }

  // 6. Links Block
  if (profile.links && profile.links.length > 0) {
    const linkItems = profile.links
      .map(
        (link) => `
    <a href="${link.url}" target="_blank" class="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 transition-colors text-neutral-800 font-['Inter_Tight']">
      ${link.label}
    </a>`,
      )
      .join("\n    ");
    blocks.push({
      id: "links_" + Math.random().toString(36).substring(2, 9),
      type: "links",
      title: "Contact & Links",
      html: `<div class="bg-white border border-neutral-200/85 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] w-full">
  <h2 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-['Inter_Tight']">Links</h2>
  <div class="flex flex-wrap gap-2">
    ${linkItems}
  </div>
</div>`,
    });
  }

  return blocks;
}

function buildSystemPrompt(
  profile: ProfileData,
  currentTemplate: string,
): string {
  return `You are an expert AI website builder and editor assistant for "LinkedPage".

### 📋 GATHER & BUILD WORKFLOW (Option A)
You must strictly follow a two-phase onboarding workflow:

1. **PHASE 1: GATHER INFO (DO NOT Call Tools)**
   Go through the following milestones one-by-one. Ask exactly ONE single question at a time. Do NOT call any database profile tools in this phase. Simply store the user's answers in the conversation history and ask the next question:
   - **Milestone 1: Name & Role** (e.g., "Hi! I'm Webild, your AI website builder. What is your name and what is your professional role?")
   - **Milestone 2: Location** (e.g., "Nice to meet you, Ahmed! Where are you located?")
   - **Milestone 3: Biography / About** (e.g., "Got it. Tell me a bit about your professional background and the value you provide to your clients.")
   - **Milestone 4: Work Experience / Brands** (e.g., "Great! What are some of the companies or brands you've worked with?")
   - **Milestone 5: Portfolio Projects** (Ask the user about their work projects in text. If they prefer to add them manually, they can click the projects button. Append '[MILESTONE:PROJECTS]' to this message).
   - **Milestone 6: Offered Services** (Ask what services or packages they offer, and append '[MILESTONE:SERVICES]').
   - **Milestone 7: Testimonials & Reviews** (Ask if they have any client testimonials or reviews they'd like to show).
   - **Milestone 8: Contact Details & Socials** (Ask for their contact email, phone, and links like LinkedIn or GitHub).

   CRITICAL CONVERSATIONAL RULES DURING PHASE 1:
   - Check the chat history to see which milestones have been answered in text.
   - Do NOT run any tools (like 'update_profile_field', 'update_projects', etc.) yet! Keep the website in its initial/empty state while chatting.
   - NEVER ask more than one question in a single message. Keep questions short, conversational, and friendly.

2. **PHASE 2: BUILD WEBSITE (Call Tools at the End)**
   - Only after all 8 milestones have been answered in the conversation, announce to the user that you are generating their website:
     "Thank you! I have gathered all your details. Now, I will generate your premium copywriting, titles, descriptions, CTA buttons, and pricing packages, and build your entire portfolio page at once. Please hold on..."
   - Immediately call the appropriate tools (like 'update_profile_field', 'update_projects', 'update_services', etc.) in this turn to write the fully generated copy, projects, services, experience, and links to their website database.
   - Generate high-end, premium copywriting: professional display headlines, benefit-focused subheadlines, detailed biographies, and value-driven service cards. Make sure all content matches the user's details but sounds expensive and polished.
   - Switch the layout template style to the template of choice or default to 'daniel-cross' using 'switch_template'.
   - Once all tools have successfully run, tell the user that their page is fully generated and ready to preview or publish!

### 🤖 OTHER CONVERSATIONAL RULES
1. **Act Like a Real Chat Companion**: Keep responses engaging and conversational. For example, if the user answers "My name is Ahmed", greet them back with "Hi Ahmed! Nice to meet you..." and ask a follow-up.
2. **No Technical/Layout Micro-Questions**: Do not ask the user for details like footer text, specific page headings, subheadline formatting, or badge text. The user should only express raw meaning in conversation. You will generate all the professional copywriting, CTA button texts, pricing values, headlines, and descriptions, and update the fields.
3. **Trigger Milestone UI Widgets**: Help the user by triggering specialized form modals or upload buttons in the chat when they are needed. You must append one of these tags at the very end of your response to enable the buttons on the front-end:
   - When suggesting the user add projects or discussing projects: append '[MILESTONE:PROJECTS]'.
   - When suggesting the user add services or discussing services: append '[MILESTONE:SERVICES]'.
4. **Dynamic Suggestions**: Whenever you ask the user a question (e.g. at each Phase 1 milestone or during subsequent follow-up questions), you MUST call the 'suggest_replies' tool to suggest 3-4 replies that the user can choose from. The suggestions should be short, concise, and representative of what a user would say (e.g., if you ask for location, suggest things like "San Francisco, CA" or "Remote / No location"). Do NOT use static options. Do NOT list or write these suggestions inside your text response itself. They will be rendered as separate quick-reply button pills automatically. Keep your text reply clean and focused only on the conversational greeting or question.

Here is the CURRENT website state for context:
- Template: "${currentTemplate}"
- Profile Data JSON:
${JSON.stringify({ ...profile, blocks: undefined }, null, 2)}

### 🛠️ PROFILE DATA TOOLS
You have the following tools to update structured profile fields:
- To update text fields (e.g. 'name', 'headline', 'summary', 'location', 'avatarUrl', 'bannerUrl', 'aboutPhotoUrl', 'signatureUrl', 'footerBannerUrl', 'servicesTitle', 'processTitle', 'testimonialsTitle', 'heroBadgeText', 'heroGreetingStart', 'heroGreetingEnd', 'statusText', 'heroSubheadline', 'heroRatingText', 'followMeLabel', 'footerLabel', 'email', 'phone'), use 'update_profile_field'.
- To replace or update portfolio projects list, use 'update_projects'.
- To replace or update client testimonials/reviews, use 'update_testimonials'.
- To replace or update services grid cards & call-to-action block, use 'update_services'.
- To replace or update work/design process steps, use 'update_processes'.
- To replace experience items, use 'update_experience'.
- To replace education items, use 'update_education'.
- To replace skills, use 'update_skills'.
- To replace links, use 'update_links'.
- To switch the template style, use 'switch_template' (available templates: "daniel-cross", "julian-mercer", "link-hunt", "biobricks").
- To suggest dynamic quick-reply answers for the user to choose, use 'suggest_replies'.

### 📋 INSTRUCTIONS
1. Do NOT call profile editing tools during Phase 1. Only call profile editing tools during Phase 2 when all information has been gathered.
2. Keep the website content premium, cohesive, and high-fidelity.
3. CRITICAL: Do NOT list, print, or output suggested replies anywhere inside the text of your response (e.g. do not write "Suggested replies: ..." or "*(Suggested replies: ...)*"). The UI will render them automatically from your "suggest_replies" tool call. If you output suggested replies as conversational text, it will be flagged as a bug.`;
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
      return NextResponse.json(
        { error: "websiteId is required" },
        { status: 400 },
      );
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
    return NextResponse.json(
      { error: e.message || "Failed to load chat history" },
      { status: 500 },
    );
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
        {
          error:
            "You're sending messages too quickly. Wait a moment and try again.",
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { message, websiteId } = body;

    if (!message || !websiteId) {
      return NextResponse.json(
        { error: "Message and websiteId are required" },
        { status: 400 },
      );
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
      const fallbackReply =
        "Please set your actual `OPENROUTER_API_KEY` in the `.env` file to enable AI page edits.";
      await saveChatMessage(websiteId, "assistant", fallbackReply);
      return NextResponse.json({
        success: true,
        reply: fallbackReply,
        profileUpdates: {},
        template: null,
      });
    }

    // Initialize the OpenRouter client
    const openrouter = createOpenRouter({
      apiKey: openrouterApiKey,
    });

    const modelName =
      process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";
    const model = openrouter(modelName);

    // Local accumulation of updates performed by tools
    const profileUpdates: Partial<ProfileData> = {};
    let templateUpdate: TemplateId | null = null;
    let chatSuggestions: string[] = [];

    const systemPromptContent = buildSystemPrompt(
      website.profile as ProfileData,
      website.templateId || "minimal-card",
    );

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
        { role: "user", content: message },
      ],
      stopWhen: stepCountIs(5),
      tools: {
        update_profile_field: tool({
          description:
            "Updates a single string/text field in the user's profile. Only call this for text fields.",
          inputSchema: z.object({
            key: z
              .enum([
                "name",
                "headline",
                "summary",
                "location",
                "avatarUrl",
                "bannerUrl",
                "aboutPhotoUrl",
                "signatureUrl",
                "footerBannerUrl",
                "servicesTitle",
                "processTitle",
                "testimonialsTitle",
                "heroBadgeText",
                "heroGreetingStart",
                "heroGreetingName",
                "heroGreetingEnd",
                "statusText",
                "heroSubheadline",
                "heroRatingText",
                "followMeLabel",
                "footerLabel",
                "email",
                "phone"
              ])
              .describe("The field name to update"),
            value: z.string().describe("The new value for the field"),
          }),
          execute: async ({ key, value }) => {
            try {
              profileUpdates[key] = value;
              const current = await getWebsiteById(websiteId);
              if (current) {
                const newProfile = {
                  ...current.profile,
                  [key]: value,
                };
                await updateWebsite(websiteId, { profile: newProfile });
              }
              return { success: true, updated: key, value };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          },
        }),
        update_projects: tool({
          description:
            "Replaces/updates the entire list of portfolio projects. Always provide the complete array. Use this tool when the user describes their projects or you generate them.",
          inputSchema: z.object({
            projects: z
              .array(
                z.object({
                  title: z.string().describe("Project title"),
                  description: z.string().describe("High-end project description generated by you"),
                  link: z.string().optional().describe("Project website link or redirect URL"),
                  image: z.string().optional().describe("Project cover image URL"),
                })
              )
              .describe("The complete list of projects"),
          }),
          execute: async ({ projects }) => {
            try {
              profileUpdates.projects = projects;
              const current = await getWebsiteById(websiteId);
              if (current) {
                const newProfile = {
                  ...current.profile,
                  projects,
                };
                await updateWebsite(websiteId, { profile: newProfile });
              }
              return { success: true, updated: "projects", count: projects.length };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          },
        }),
        update_testimonials: tool({
          description:
            "Replaces/updates the list of client reviews (testimonials). Always provide the complete array.",
          inputSchema: z.object({
            testimonials: z
              .array(
                z.object({
                  quote: z.string().describe("The review/testimonial text quoted from the client"),
                  name: z.string().describe("Client name"),
                  role: z.string().describe("Client's role or company"),
                  avatarUrl: z.string().describe("Client's avatar image URL or empty string"),
                })
              )
              .describe("The complete list of client testimonials"),
          }),
          execute: async ({ testimonials }) => {
            try {
              profileUpdates.testimonials = testimonials;
              const current = await getWebsiteById(websiteId);
              if (current) {
                const newProfile = {
                  ...current.profile,
                  testimonials,
                };
                await updateWebsite(websiteId, { profile: newProfile });
              }
              return { success: true, updated: "testimonials", count: testimonials.length };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          },
        }),
        update_services: tool({
          description:
            "Replaces/updates the services list and the call-to-action details under the services section.",
          inputSchema: z.object({
            servicesTitle: z.string().optional().describe("Optional new title for the services section"),
            services: z
              .array(
                z.object({
                  title: z.string().describe("Service name/title"),
                  price: z.string().describe("Price/cost detail, e.g. '$2,500' or 'Custom'"),
                  description: z.string().describe("Description of what this service covers"),
                })
              )
              .describe("The complete list of services"),
            servicesCta: z
              .object({
                title: z.string().describe("CTA card heading"),
                text: z.string().describe("CTA card description body"),
                buttonText: z.string().describe("CTA button text"),
                buttonUrl: z.string().describe("CTA button URL link"),
              })
              .optional()
              .describe("Optional Call-To-Action card updates"),
          }),
          execute: async ({ servicesTitle, services, servicesCta }) => {
            try {
              if (servicesTitle) profileUpdates.servicesTitle = servicesTitle;
              profileUpdates.services = services;
              if (servicesCta) profileUpdates.servicesCta = servicesCta;
              
              const current = await getWebsiteById(websiteId);
              if (current) {
                const newProfile = {
                  ...current.profile,
                  services,
                  ...(servicesTitle ? { servicesTitle } : {}),
                  ...(servicesCta ? { servicesCta } : {}),
                };
                await updateWebsite(websiteId, { profile: newProfile });
              }
              return { success: true, updated: "services", count: services.length };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          },
        }),
        update_processes: tool({
          description:
            "Replaces/updates the timeline steps of the work/design process.",
          inputSchema: z.object({
            processTitle: z.string().optional().describe("Optional new title for the process steps section"),
            processes: z
              .array(
                z.object({
                  stepTag: z.string().describe("Visual sequence indicator, e.g., '/01', '/02'"),
                  title: z.string().describe("Title of this phase of the process"),
                  description: z.string().describe("Brief details describing this process step"),
                })
              )
              .describe("The complete list of process steps"),
          }),
          execute: async ({ processTitle, processes }) => {
            try {
              if (processTitle) profileUpdates.processTitle = processTitle;
              profileUpdates.processes = processes;
              
              const current = await getWebsiteById(websiteId);
              if (current) {
                const newProfile = {
                  ...current.profile,
                  processes,
                  ...(processTitle ? { processTitle } : {}),
                };
                await updateWebsite(websiteId, { profile: newProfile });
              }
              return { success: true, updated: "processes", count: processes.length };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          },
        }),
        update_experience: tool({
          description:
            "Replaces the entire experience array with a new array. Always provide the complete updated list of experience items.",
          inputSchema: z.object({
            experience: z
              .array(
                z.object({
                  title: z.string().describe("Job title"),
                  company: z.string().describe("Company name"),
                  duration: z
                    .string()
                    .describe("Time period, e.g. '2020 - Present'"),
                  description: z
                    .string()
                    .describe(
                      "Description of responsibilities and achievements",
                    ),
                  logo: z
                    .string()
                    .optional()
                    .describe("URL or placeholder for company logo"),
                }),
              )
              .describe("The complete new experience list"),
          }),
          execute: async ({ experience }) => {
            try {
              profileUpdates.experience = experience;
              const current = await getWebsiteById(websiteId);
              if (current) {
                const newProfile = {
                  ...current.profile,
                  experience,
                };
                await updateWebsite(websiteId, { profile: newProfile });
              }
              return {
                success: true,
                updated: "experience",
                count: experience.length,
              };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          },
        }),
        update_skills: tool({
          description:
            "Replaces the entire skills array with a new array of skills. Always provide the complete updated list of skills.",
          inputSchema: z.object({
            skills: z
              .array(
                z.object({
                  name: z.string().describe("Skill name, e.g. 'React'"),
                }),
              )
              .describe("The complete new skills list"),
          }),
          execute: async ({ skills }) => {
            try {
              profileUpdates.skills = skills;
              const current = await getWebsiteById(websiteId);
              if (current) {
                const newProfile = {
                  ...current.profile,
                  skills,
                };
                await updateWebsite(websiteId, { profile: newProfile });
              }
              return { success: true, updated: "skills", count: skills.length };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          },
        }),
        update_links: tool({
          description:
            "Replaces the entire links array with a new array of social/portfolio links. Always provide the complete updated list of links.",
          inputSchema: z.object({
            links: z
              .array(
                z.object({
                  label: z
                    .string()
                    .describe("Link label, e.g. 'GitHub', 'LinkedIn'"),
                  url: z.string().describe("URL for the link"),
                  icon: z
                    .enum([
                      "linkedin",
                      "twitter",
                      "github",
                      "website",
                      "email",
                      "other",
                    ])
                    .optional()
                    .describe("Icon category"),
                }),
              )
              .describe("The complete new links list"),
          }),
          execute: async ({ links }) => {
            try {
              profileUpdates.links = links;
              const current = await getWebsiteById(websiteId);
              if (current) {
                const newProfile = {
                  ...current.profile,
                  links,
                };
                await updateWebsite(websiteId, { profile: newProfile });
              }
              return { success: true, updated: "links", count: links.length };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          },
        }),
        update_education: tool({
          description:
            "Replaces the entire education array with a new array. Always provide the complete updated list of education items.",
          inputSchema: z.object({
            education: z
              .array(
                z.object({
                  degree: z
                    .string()
                    .describe("Degree name, e.g. 'Bachelor of Science'"),
                  school: z.string().describe("School name"),
                  year: z.string().describe("Graduation year"),
                }),
              )
              .describe("The complete new education list"),
          }),
          execute: async ({ education }) => {
            try {
              profileUpdates.education = education;
              const current = await getWebsiteById(websiteId);
              if (current) {
                const newProfile = {
                  ...current.profile,
                  education,
                };
                await updateWebsite(websiteId, { profile: newProfile });
              }
              return {
                success: true,
                updated: "education",
                count: education.length,
              };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          },
        }),
        switch_template: tool({
          description:
            "Changes the website layout template to a different template style.",
          inputSchema: z.object({
            templateId: z
              .enum(["daniel-cross", "julian-mercer", "link-hunt", "biobricks"])
              .describe("The ID of the template style to switch to"),
          }),
          execute: async ({ templateId }) => {
            try {
              templateUpdate = templateId as TemplateId;
              await updateWebsite(websiteId, {
                templateId: templateId as TemplateId,
              });
              return {
                success: true,
                updated: "templateId",
                value: templateId,
              };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          },
        }),
        initialize_custom_blocks: tool({
          description:
            "Initializes the website layout with dynamic HTML/Tailwind blocks based on current profile data, and automatically switches the active template to 'daniel-cross'.",
          inputSchema: z.object({}),
          execute: async () => {
            try {
              const current = await getWebsiteById(websiteId);
              if (current) {
                const blocks = createDefaultBlocks(current.profile);
                const newProfile = {
                  ...current.profile,
                  blocks,
                };
                profileUpdates.blocks = blocks;
                templateUpdate = "daniel-cross";
                await updateWebsite(websiteId, {
                  profile: newProfile,
                  templateId: "daniel-cross",
                });
                return { success: true, blocksCount: blocks.length };
              }
              return { success: false, error: "Website not found" };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          },
        }),
        add_custom_block: tool({
          description:
            "Adds a new custom HTML/Tailwind block to the layout at a specified position.",
          inputSchema: z.object({
            type: z
              .string()
              .describe(
                "Type of block, e.g. 'custom', 'hero', 'education', 'gallery'",
              ),
            title: z
              .string()
              .describe("Title for the block, e.g. 'My Portfolio Projects'"),
            html: z
              .string()
              .describe("The full HTML string with Tailwind CSS styles"),
            index: z
              .number()
              .optional()
              .describe(
                "The index to insert the block at (default adds to the end)",
              ),
          }),
          execute: async ({ type, title, html, index }) => {
            try {
              const current = await getWebsiteById(websiteId);
              if (current) {
                const blocks = [...(current.profile.blocks || [])];
                const newBlock = {
                  id:
                    "block_custom_" +
                    Math.random().toString(36).substring(2, 9),
                  type,
                  title,
                  html,
                };
                if (typeof index === "number") {
                  blocks.splice(index, 0, newBlock);
                } else {
                  blocks.push(newBlock);
                }
                const newProfile = {
                  ...current.profile,
                  blocks,
                };
                profileUpdates.blocks = blocks;
                await updateWebsite(websiteId, { profile: newProfile });
                return { success: true, addedBlockId: newBlock.id };
              }
              return { success: false, error: "Website not found" };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          },
        }),
        update_block_html: tool({
          description:
            "Updates the HTML/Tailwind code of an existing block in the layout.",
          inputSchema: z.object({
            id: z.string().describe("The unique ID of the block to update"),
            html: z
              .string()
              .describe("The new HTML/Tailwind code to set for the block"),
          }),
          execute: async ({ id, html }) => {
            try {
              const current = await getWebsiteById(websiteId);
              if (current) {
                const blocks = (current.profile.blocks || []).map((b) => {
                  if (b.id === id || id.startsWith(`block-${b.id}`)) {
                    return { ...b, html };
                  }
                  return b;
                });
                const newProfile = {
                  ...current.profile,
                  blocks,
                };
                profileUpdates.blocks = blocks;
                await updateWebsite(websiteId, { profile: newProfile });
                return { success: true, updatedBlockId: id };
              }
              return { success: false, error: "Website not found" };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          },
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
                const blocks = (current.profile.blocks || []).filter(
                  (b) => b.id !== id && !id.startsWith(`block-${b.id}`),
                );
                const newProfile = {
                  ...current.profile,
                  blocks,
                };
                profileUpdates.blocks = blocks;
                await updateWebsite(websiteId, { profile: newProfile });
                return { success: true, deletedBlockId: id };
              }
              return { success: false, error: "Website not found" };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          },
        }),
        reorder_blocks: tool({
          description:
            "Reorders the list of blocks by providing the ordered list of block IDs.",
          inputSchema: z.object({
            ids: z.array(z.string()).describe("The ordered list of block IDs"),
          }),
          execute: async ({ ids }) => {
            try {
              const current = await getWebsiteById(websiteId);
              if (current) {
                const currentBlocks = current.profile.blocks || [];
                const reordered = ids
                  .map((id) =>
                    currentBlocks.find(
                      (b) => b.id === id || id.startsWith(`block-${b.id}`),
                    ),
                  )
                  .filter(Boolean) as any[];

                // Add any missing blocks back at the end
                for (const b of currentBlocks) {
                  if (!reordered.some((r) => r.id === b.id)) {
                    reordered.push(b);
                  }
                }
                const newProfile = {
                  ...current.profile,
                  blocks: reordered,
                };
                profileUpdates.blocks = reordered;
                await updateWebsite(websiteId, { profile: newProfile });
                return { success: true };
              }
              return { success: false, error: "Website not found" };
            } catch (err: any) {
              return { success: false, error: err.message || err };
            }
          },
        }),
        suggest_replies: tool({
          description:
            "Suggests 3-4 contextually relevant, short, conversational reply options for the user to choose from. ALWAYS call this tool when asking a question to guide the user's answer.",
          inputSchema: z.object({
            replies: z
              .array(z.string())
              .min(2)
              .max(4)
              .describe("3-4 recommended short replies (typically 1-5 words each)"),
          }),
          execute: async ({ replies }) => {
            chatSuggestions = replies;
            return { success: true };
          },
        }),
      },
    });

    const replyText = result.text || "I have updated your page successfully.";

    // 3. Save assistant response to DB
    await saveChatMessage(websiteId, "assistant", replyText);

    return NextResponse.json({
      success: true,
      reply: replyText,
      profileUpdates,
      template: templateUpdate,
      suggestions: chatSuggestions,
    });
  } catch (e: any) {
    console.error("[Chat API] Error processing request:", e);
    return NextResponse.json(
      { error: e.message || "Failed to process chat query" },
      { status: 500 },
    );
  }
}
