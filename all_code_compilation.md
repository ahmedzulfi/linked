# Codebase Compilation

This file contains the complete source code of all active project files.

## File: `.vercel/project.json`

```json
{
  "projectId": "prj_1J5yBTHexKAG31O1JN8gXqpO1Q3m",
  "orgId": "team_PWgPdAQ7NcmD35J37bj8ri4t",
  "projectName": "fusion-starter-529"
}

```

---

## File: `AGENTS.md`

```markdown
# Fusion Starter

A production-ready full-stack React application template with integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod and modern tooling.

While the starter comes with a express server, only create endpoint when strictly neccesary, for example to encapsulate logic that must leave in the server, such as private keys handling, or certain DB operations, db...

## Tech Stack

- **PNPM**: Prefer pnpm
- **Frontend**: React 18 + React Router 6 (spa) + TypeScript + Vite + TailwindCSS 3
- **Backend**: Express server integrated with Vite dev server
- **Testing**: Vitest
- **UI**: Radix UI + TailwindCSS 3 + Lucide React icons

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx                # App entry point and with SPA routing setup
└── global.css            # TailwindCSS 3 theming and global styles

server/                   # Express API backend
├── index.ts              # Main server setup (express config + routes)
└── routes/               # API handlers

shared/                   # Types used by both client & server
└── api.ts                # Example of how to share api interfaces
```

## Key Features

## SPA Routing System

The routing system is powered by React Router 6:

- `client/pages/Index.tsx` represents the home page.
- Routes are defined in `client/App.tsx` using the `react-router-dom` import
- Route files are located in the `client/pages/` directory

For example, routes can be defined with:

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>;
```

### Styling System

- **Primary**: TailwindCSS 3 utility classes
- **Theme and design tokens**: Configure in `client/global.css`
- **UI components**: Pre-built library in `client/components/ui/`
- **Utility**: `cn()` function combines `clsx` + `tailwind-merge` for conditional classes

```typescript
// cn utility usage
className={cn(
  "base-classes",
  { "conditional-class": condition },
  props.className  // User overrides
)}
```

### Express Server Integration

- **Development**: Single port (8080) for both frontend/backend
- **Hot reload**: Both client and server code
- **API endpoints**: Prefixed with `/api/`

#### Example API Routes

- `GET /api/ping` - Simple ping api
- `GET /api/demo` - Demo endpoint

### Shared Types

Import consistent types in both client and server:

```typescript
import { DemoResponse } from "@shared/api";
```

Path aliases:

- `@shared/*` - Shared folder
- `@/*` - Client folder

## Development Commands

```bash
pnpm dev        # Start dev server (client + server)
pnpm build      # Production build
pnpm start      # Start production server
pnpm typecheck  # TypeScript validation
pnpm test          # Run Vitest tests
```

## Adding Features

### Add new colors to the theme

Open `client/global.css` and `tailwind.config.ts` and add new tailwind colors.

### New API Route

1. **Optional**: Create a shared interface in `shared/api.ts`:

```typescript
export interface MyRouteResponse {
  message: string;
  // Add other response properties here
}
```

2. Create a new route handler in `server/routes/my-route.ts`:

```typescript
import { RequestHandler } from "express";
import { MyRouteResponse } from "@shared/api"; // Optional: for type safety

export const handleMyRoute: RequestHandler = (req, res) => {
  const response: MyRouteResponse = {
    message: "Hello from my endpoint!",
  };
  res.json(response);
};
```

3. Register the route in `server/index.ts`:

```typescript
import { handleMyRoute } from "./routes/my-route";

// Add to the createServer function:
app.get("/api/my-endpoint", handleMyRoute);
```

4. Use in React components with type safety:

```typescript
import { MyRouteResponse } from "@shared/api"; // Optional: for type safety

const response = await fetch("/api/my-endpoint");
const data: MyRouteResponse = await response.json();
```

### New Page Route

1. Create component in `client/pages/MyPage.tsx`
2. Add route in `client/App.tsx`:

```typescript
<Route path="/my-page" element={<MyPage />} />
```

## Production Deployment

- **Standard**: `pnpm build`
- **Binary**: Self-contained executables (Linux, macOS, Windows)
- **Cloud Deployment**: Use either Netlify or Vercel via their MCP integrations for easy deployment. Both providers work well with this starter template.

## Architecture Notes

- Single-port development with Vite + Express integration
- TypeScript throughout (client, server, shared)
- Full hot reload for rapid development
- Production-ready with multiple deployment options
- Comprehensive UI component library included
- Type-safe API communication via shared interfaces

```

---

## File: `app/api/auth/me/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Session check failed" },
      { status: 500 },
    );
  }
}

```

---

## File: `app/api/auth/update/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const currentUser = await getAuthenticatedUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { firstName, lastName } = await req.json();
    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First and last name are required" },
        { status: 400 },
      );
    }

    const name = `${firstName.trim()} ${lastName.trim()}`;
    await db.update(user).set({ name }).where(eq(user.id, currentUser.id));

    return NextResponse.json({ success: true, name });
  } catch (e: any) {
    console.error("Failed to update user profile:", e);
    return NextResponse.json(
      { error: e.message || "Failed to update profile" },
      { status: 500 },
    );
  }
}

```

---

## File: `app/api/chat/route.ts`

```typescript
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
   - Check both the CURRENT website state (Profile Data JSON) and the chat history to see which milestones are already satisfied.
   - If a milestone field (such as name, headline, location, summary/bio, experience, skills, links, or education) is already populated with actual content (not default placeholder names or blank states) in the Profile Data JSON, consider that milestone ALREADY SATISFIED. Do NOT ask for this information again! Skip straight to asking for remaining/missing information.
   - Do NOT run any tools (like 'update_profile_field', 'update_projects', etc.) yet! Keep the website in its current state while chatting.
   - NEVER ask more than one question in a single message. Keep questions short, conversational, and friendly.

2. **PHASE 2: BUILD WEBSITE (Call Tools at the End)**
   - Only after all 8 milestones have been answered in the conversation, announce to the user that you are generating their website:
     "Thank you! I have gathered all your details. Now, I will generate your premium copywriting, titles, descriptions, CTA buttons, and pricing packages, and build your entire portfolio page at once. Please hold on..."
   - Immediately call the appropriate tools (like 'update_profile_field', 'update_projects', 'update_services', 'update_processes', etc.) in this turn to write the fully generated copy, projects, services, experience, and links to their website database.
   - Generate high-end, premium copywriting: professional display headlines, benefit-focused subheadlines, detailed biographies (saving to 'summary'), and value-driven service cards. Make sure all content matches the user's details but sounds expensive, cohesive, and fully realized.
   - **Biography/About Writing**: You MUST write a detailed, high-end 3-4 sentence professional biography about the user based on their background and save it in 'summary'. Never output default/mock values.
   - **Process Steps Generation**: You MUST automatically invent/generate a customized, logical 3-step design/creative/work process (step tag like "/01", title, description) tailored to the user's role and background, and call the 'update_processes' tool. Do NOT ask the user for their process steps. Synthesize it using their other info (e.g. for a UI Designer: Discovery & wireframing, high-fidelity design & interactions, handoff & launch).
   - Switch the layout template style to the template of choice or default to 'daniel-cross' using 'switch_template'.
   - Once all tools have successfully run, tell the user that their page is fully generated and ready to preview or publish!

### 🤖 OTHER CONVERSATIONAL RULES
1. **Act Like a Real Chat Companion**: Keep responses engaging and conversational. For example, if the user answers "My name is Ahmed", greet them back with "Hi Ahmed! Nice to meet you..." and ask a follow-up.
2. **No Technical/Layout Micro-Questions**: Do not ask the user for details like footer text, specific page headings, subheadline formatting, or badge text. The user should only express raw meaning in conversation. You will generate all the professional copywriting, CTA button texts, pricing values, headlines, and descriptions, and update the fields.
3. **Trigger Milestone UI Widgets**: Help the user by triggering specialized form modals or upload buttons in the chat when they are needed. You must append one of these tags at the very end of your response to enable the buttons on the front-end:
   - When suggesting the user add projects or discussing projects: append '[MILESTONE:PROJECTS]'.
   - When suggesting the user add services or discussing services: append '[MILESTONE:SERVICES]'.
4. **No Suggestions**: Do NOT offer or suggest replies for the user. Let the user type their custom answers naturally.

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
      suggestions: [],
    });
  } catch (e: any) {
    console.error("[Chat API] Error processing request:", e);
    return NextResponse.json(
      { error: e.message || "Failed to process chat query" },
      { status: 500 },
    );
  }
}

```

---

## File: `app/api/demo/route.ts`

```typescript
import { NextResponse } from "next/server";
import { DemoResponse } from "../../../shared/api";

export async function GET() {
  const response: DemoResponse = {
    message: "Hello from Next.js server",
  };
  return NextResponse.json(response);
}

```

---

## File: `app/api/onboarding/analyze/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite } from "@/lib/db";
import { ProfileData } from "@/shared/types";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser().catch(() => null);
    const body = await request.json();
    const { websiteId, projects, interests, skills, experience } = body;

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

    // Merge manual form inputs into existing profile data
    const currentProfile = website.profile as ProfileData;
    const mergedProfile: ProfileData = {
      ...currentProfile,
      projects: projects || currentProfile.projects || [],
      interests: interests || currentProfile.interests || "",
      skills: skills || currentProfile.skills || [],
      experience: experience || currentProfile.experience || [],
    };

    const openrouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openrouterApiKey || openrouterApiKey === "your_key_here") {
      // Return merged profile immediately if AI key is missing
      console.warn(
        "[Onboarding API] OPENROUTER_API_KEY is not set. Skipping AI refinement.",
      );
      await updateWebsite(websiteId, { profile: mergedProfile });
      return NextResponse.json({
        success: true,
        data: mergedProfile,
        aiOptimized: false,
      });
    }

    const openrouter = createOpenRouter({
      apiKey: openrouterApiKey,
    });
    const modelName =
      process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";
    const model = openrouter(modelName);

    const prompt = `
You are a professional website builder copywriter.
Optimize the following user portfolio data to make it look premium, polished, and compelling for their website.

User Name: ${mergedProfile.name}
Current Headline: ${mergedProfile.headline}
Current Bio/Summary: ${mergedProfile.summary}
Location: ${mergedProfile.location || "Not specified"}
Interests & Goals: ${mergedProfile.interests || "Not specified"}

Selected Work / Projects:
${JSON.stringify(mergedProfile.projects || [])}

Work Experience:
${JSON.stringify(mergedProfile.experience || [])}

Skills:
${JSON.stringify(mergedProfile.skills || [])}

INSTRUCTIONS:
1. Rewrite the headline to be short, modern, and high-impact.
2. Rewrite the summary/bio to be in first-person ("I..."), extremely punchy (maximum 3-4 sentences), highlighting their unique value proposition.
3. Clean up the experience descriptions: correct grammatical issues, make them action-oriented, and write them in short, professional sentences.
4. Clean up projects: refine project descriptions to be engaging and brief (max 2 sentences).
5. Output ONLY a valid JSON object matching the structure below. Do not output markdown wraps (no \`\`\`json blocks), explanations, or text other than the JSON object itself.

JSON Output Structure:
{
  "headline": "...",
  "summary": "...",
  "experience": [
    {
      "title": "...",
      "company": "...",
      "duration": "...",
      "description": "..."
    }
  ],
  "projects": [
    {
      "title": "...",
      "description": "...",
      "link": "...",
      "image": "..."
    }
  ],
  "skills": [
    { "name": "..." }
  ]
}
`;

    try {
      const response = await generateText({
        model,
        prompt,
      });

      const cleanText = response.text
        .trim()
        .replace(/^```json|```$/g, "")
        .trim();
      const parsedData = JSON.parse(cleanText);

      // Construct refined profile
      const refinedProfile: ProfileData = {
        ...mergedProfile,
        headline: parsedData.headline || mergedProfile.headline,
        summary: parsedData.summary || mergedProfile.summary,
        experience:
          parsedData.experience && parsedData.experience.length > 0
            ? parsedData.experience
            : mergedProfile.experience,
        projects:
          parsedData.projects && parsedData.projects.length > 0
            ? parsedData.projects
            : mergedProfile.projects,
        skills:
          parsedData.skills && parsedData.skills.length > 0
            ? parsedData.skills
            : mergedProfile.skills,
      };

      // Save refined profile to the website draft
      await updateWebsite(websiteId, { profile: refinedProfile });

      return NextResponse.json({
        success: true,
        data: refinedProfile,
        aiOptimized: true,
      });
    } catch (err: any) {
      console.error(
        "[Onboarding API] LLM execution or JSON parsing failed:",
        err,
      );
      // Fallback: save merged data directly so user doesn't lose anything
      await updateWebsite(websiteId, { profile: mergedProfile });
      return NextResponse.json({
        success: true,
        data: mergedProfile,
        aiOptimized: false,
        warning:
          "AI optimization encountered an issue. Reverted to raw merged data.",
      });
    }
  } catch (e: any) {
    console.error("[Onboarding API] Request processing error:", e);
    return NextResponse.json(
      { error: e.message || "Failed to process request" },
      { status: 500 },
    );
  }
}

```

---

## File: `app/api/ping/route.ts`

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  const ping = process.env.PING_MESSAGE ?? "ping";
  return NextResponse.json({ message: ping });
}

```

---

## File: `app/api/report-bug/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { bugReport } from "@/lib/schema";

export async function POST(req: Request) {
  try {
    const { subject, description, severity } = await req.json();

    if (!subject?.trim() || !description?.trim()) {
      return NextResponse.json(
        { error: "Subject and description are required" },
        { status: 400 },
      );
    }

    // Optionally attach user identity if logged in — anonymous reports are fine too
    const currentUser = await getAuthenticatedUser().catch(() => null);

    const id = "bug_" + Math.random().toString(36).substring(2, 11);

    await db.insert(bugReport).values({
      id,
      userId: currentUser?.id ?? null,
      userEmail: currentUser?.email ?? null,
      subject: subject.trim(),
      description: description.trim(),
      severity: severity ?? "low",
    });

    return NextResponse.json({ success: true, id });
  } catch (e: any) {
    console.error("Failed to save bug report:", e);
    return NextResponse.json(
      { error: e.message || "Failed to save bug report" },
      { status: 500 },
    );
  }
}

```

---

## File: `app/api/scrape/manual/route.ts`

```typescript
import { NextResponse } from "next/server";
import AdmZip from "adm-zip";
import { getAuthenticatedUser } from "@/lib/auth";
import { ProfileData, MOCK_PROFILE } from "@/shared/types";

// Clean CSV parser supporting double quoted cells
function parseCSV(csvText: string): Record<string, string>[] {
  const lines: string[] = [];
  let currentLine = "";
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    if (char === '"') {
      insideQuotes = !insideQuotes;
      currentLine += char;
    } else if (char === "\n" && !insideQuotes) {
      lines.push(currentLine);
      currentLine = "";
    } else if (char === "\r") {
      // ignore
    } else {
      currentLine += char;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

  if (lines.length === 0) return [];

  const parseLine = (line: string): string[] => {
    const cells: string[] = [];
    let currentCell = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        cells.push(currentCell.trim().replace(/^"|"$/g, "").trim());
        currentCell = "";
      } else {
        currentCell += char;
      }
    }
    cells.push(currentCell.trim().replace(/^"|"$/g, "").trim());
    return cells;
  };

  const headers = parseLine(lines[0]);
  const results: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const cells = parseLine(lines[i]);
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] || "";
    });
    results.push(row);
  }

  return results;
}

export async function POST(request: Request) {
  try {
    // Auth is optional for manual scraping (allow guests to try it out)
    const user = await getAuthenticatedUser().catch(() => null);

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "ZIP file is required" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let zip: AdmZip;
    try {
      zip = new AdmZip(buffer);
    } catch {
      return NextResponse.json(
        { error: "Invalid ZIP file format" },
        { status: 400 },
      );
    }

    const entries = zip.getEntries();
    let profileContent = "";
    let positionsContent = "";
    let skillsContent = "";
    let educationContent = "";

    for (const entry of entries) {
      const name = entry.entryName.toLowerCase();
      if (name.endsWith("profile.csv")) {
        profileContent = entry.getData().toString("utf8");
      } else if (name.endsWith("positions.csv")) {
        positionsContent = entry.getData().toString("utf8");
      } else if (name.endsWith("skills.csv")) {
        skillsContent = entry.getData().toString("utf8");
      } else if (name.endsWith("education.csv")) {
        educationContent = entry.getData().toString("utf8");
      }
    }

    if (!profileContent) {
      return NextResponse.json(
        { error: "Could not find Profile.csv inside the ZIP archive." },
        { status: 400 },
      );
    }

    // Parse CSV files
    const profiles = parseCSV(profileContent);
    const positions = positionsContent ? parseCSV(positionsContent) : [];
    const rawSkills = skillsContent ? parseCSV(skillsContent) : [];
    const rawEducation = educationContent ? parseCSV(educationContent) : [];

    if (profiles.length === 0) {
      return NextResponse.json(
        { error: "Profile.csv is empty" },
        { status: 400 },
      );
    }

    const pRow = profiles[0];
    const firstName = pRow["First Name"] || user?.firstName || "Guest";
    const lastName = pRow["Last Name"] || user?.lastName || "User";
    const fullName = `${firstName} ${lastName}`;
    const headline = pRow["Headline"] || "Professional Expert";
    const summary =
      pRow["Summary"] || `I'm ${fullName}. Welcome to my micro-site.`;
    const location = pRow["Address"] || "San Francisco, CA";

    // Map experience
    const experience = positions.map((pos) => {
      const title = pos["Title"] || "Role";
      const company = pos["Company Name"] || pos["Company"] || "Company";
      const duration = `${pos["Started On"] || "2024"} - ${pos["Finished On"] || "Present"}`;
      const description = pos["Description"] || "";
      return { title, company, duration, description, logo: "" };
    });

    // Map skills
    const skills = rawSkills
      .map((s) => ({ name: s["Name"] || s["name"] || "" }))
      .filter((s) => s.name.length > 0);

    // Map education
    const education = rawEducation
      .map((edu) => {
        const school = edu["School Name"] || edu["school"] || "University";
        const degree = edu["Degree Name"] || edu["degree"] || "Degree";
        const started = edu["Started On"] || "";
        const finished = edu["Finished On"] || "Present";
        const year = finished ? finished : started;
        return { school, degree, year };
      })
      .filter((edu) => edu.school.length > 0);

    const parsedProfile: ProfileData = {
      ...MOCK_PROFILE,
      name: fullName,
      headline,
      summary,
      location,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=8db8ff,d4ff66,2a2a2f`,
      experience,
      education: education.length > 0 ? education : MOCK_PROFILE.education,
      skills: skills.length > 0 ? skills : MOCK_PROFILE.skills,
      links: [
        { label: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
        { label: "Website", url: "#", icon: "website" },
      ],
      linkedinUrl: "https://linkedin.com",
      importedFromZip: true,
    };

    return NextResponse.json({
      success: true,
      data: parsedProfile,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to process the LinkedIn ZIP data" },
      { status: 500 },
    );
  }
}

```

---

## File: `app/api/scrape/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { ProfileData, MOCK_PROFILE } from "@/shared/types";
import { chromium } from "playwright";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);

async function runScrapyScraper(url: string): Promise<any> {
  const pythonPath = "python";
  const scriptPath = path.join(
    process.cwd(),
    "linkedin_scraper",
    "run_spider.py",
  );

  const { stdout, stderr } = await execAsync(
    `"${pythonPath}" "${scriptPath}" "${url}"`,
    {
      timeout: 30000,
    },
  );

  if (stderr && stderr.includes("Error")) {
    console.warn("[Scrapy Warning/Error]:", stderr);
  }

  const lines = stdout.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      const parsed = JSON.parse(trimmed);
      if (parsed.error) {
        throw new Error(parsed.error);
      }
      return parsed;
    }
  }
  throw new Error("Scrapy failed to output valid profile JSON data");
}

async function scrapeLinkedInProfileWithFallback(
  url: string,
): Promise<ProfileData> {
  if (process.env.SCRAPY_ENABLED === "true") {
    console.log(`[Scrape] Attempting Python Scrapy scraper for: ${url}`);
    try {
      const scrapyData = await runScrapyScraper(url);
      console.log(`[Scrape] Scrapy scraper succeeded for: ${url}`);
      return {
        ...MOCK_PROFILE,
        name: scrapyData.name || "John Doe",
        headline: scrapyData.headline || "Professional expert",
        summary:
          scrapyData.summary ||
          `I'm ${scrapyData.name}. Passionate about building products, driving impact, and solving complex challenges.`,
        location: scrapyData.location || "San Francisco, CA",
        avatarUrl:
          scrapyData.avatarUrl ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(scrapyData.name || "John Doe")}&backgroundColor=8db8ff,d4ff66,2a2a2f`,
        experience:
          scrapyData.experience && scrapyData.experience.length > 0
            ? scrapyData.experience
            : MOCK_PROFILE.experience,
        education:
          scrapyData.education && scrapyData.education.length > 0
            ? scrapyData.education
            : MOCK_PROFILE.education,
        linkedinUrl: url,
        links: [
          { label: "LinkedIn", url, icon: "linkedin" },
          { label: "Website", url: "#", icon: "website" },
        ],
      };
    } catch (err: any) {
      console.warn(
        `[Scrape] Scrapy scraper failed: ${err.message}. Falling back to Playwright...`,
      );
    }
  }
  return scrapeLinkedInProfile(url);
}

async function scrapeLinkedInProfile(url: string): Promise<ProfileData> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
    locale: "en-US",
  });

  const page = await context.newPage();
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
  });

  try {
    // Navigate to public LinkedIn profile page
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    const currentUrl = page.url();
    if (
      currentUrl.includes("linkedin.com/login") ||
      currentUrl.includes("linkedin.com/signup") ||
      currentUrl.includes("authwall")
    ) {
      throw new Error(
        "LinkedIn security check (authwall/login) blocked public access. Please request a Member Data ZIP export from LinkedIn and upload it below.",
      );
    }

    // Verify page title / layout exists
    await page
      .waitForSelector(".top-card-layout__title, h1", { timeout: 8000 })
      .catch(() => {
        throw new Error(
          "LinkedIn security challenges or loading timeouts blocked access. Please use the manual ZIP import option.",
        );
      });

    // Extract fields
    const name = await page
      .$eval(".top-card-layout__title", (el) => {
        const text = el.textContent?.trim();
        if (!text || text.toLowerCase() === "linkedin") {
          throw new Error("Invalid profile name scraped.");
        }
        return text;
      })
      .catch(() => {
        throw new Error(
          "LinkedIn security challenge or authwall blocked public access. Please use the manual ZIP import option below.",
        );
      });
    const headline = await page
      .$eval(
        ".top-card-layout__headline",
        (el) => el.textContent?.trim() || "Professional expert",
      )
      .catch(() => "Professional expert");
    const location = await page
      .$eval(
        ".top-card-layout__first-subline, .top-card__subline-item",
        (el) => el.textContent?.trim() || "San Francisco, CA",
      )
      .catch(() => "San Francisco, CA");
    const summary = await page
      .$eval(".summary__text", (el) => el.textContent?.trim() || "")
      .catch(() => "");

    const avatarUrl = await page
      .$eval(
        ".top-card-layout__entity-image-container img",
        (el) => (el as HTMLImageElement).src,
      )
      .catch(() => {
        return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=8db8ff,d4ff66,2a2a2f`;
      });

    // Parse experience
    const experience: any[] = [];
    const experienceElements = await page.$$(
      "li.experience-item, .experience-item",
    );
    for (const el of experienceElements) {
      const title = await el
        .$eval(
          ".experience-item__title, h3",
          (sub) => sub.textContent?.trim() || "",
        )
        .catch(() => "Role");
      const company = await el
        .$eval(
          ".experience-item__subtitle, h4",
          (sub) => sub.textContent?.trim() || "",
        )
        .catch(() => "Company");
      const duration = await el
        .$eval(
          ".experience-item__duration, .experience-item__meta-item",
          (sub) => sub.textContent?.trim() || "",
        )
        .catch(() => "");
      const description = await el
        .$eval(
          ".experience-item__description",
          (sub) => sub.textContent?.trim() || "",
        )
        .catch(() => "");

      experience.push({
        title,
        company,
        duration,
        description,
        logo: "",
      });
    }

    // Parse education
    const education: any[] = [];
    const educationElements = await page.$$("li.education__list-item");
    for (const el of educationElements) {
      const school = await el
        .$eval(
          ".education__school-name",
          (sub) => sub.textContent?.trim() || "",
        )
        .catch(() => "");
      const degree = await el
        .$eval(
          ".education__degree-name",
          (sub) => sub.textContent?.trim() || "",
        )
        .catch(() => "");
      const duration = await el
        .$eval(".education__duration", (sub) => sub.textContent?.trim() || "")
        .catch(() => "");

      if (school) {
        education.push({
          school,
          degree,
          duration,
        });
      }
    }

    await browser.close();

    return {
      ...MOCK_PROFILE,
      name,
      headline,
      summary:
        summary ||
        `I'm ${name}. Passionate about building products, driving impact, and solving complex challenges.`,
      location,
      avatarUrl,
      experience: experience.length > 0 ? experience : MOCK_PROFILE.experience,
      education: education.length > 0 ? education : MOCK_PROFILE.education,
      linkedinUrl: url,
      links: [
        { label: "LinkedIn", url, icon: "linkedin" },
        { label: "Website", url: "#", icon: "website" },
      ],
    };
  } catch (e) {
    await browser.close();
    throw e;
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    // if (!user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: "LinkedIn URL is required" },
        { status: 400 },
      );
    }

    // Keep simulated failure for developer testing path
    if (url.toLowerCase().includes("fail")) {
      return NextResponse.json(
        {
          error:
            "LinkedIn privacy settings are blocking direct public data access.",
        },
        { status: 403 },
      );
    }

    const profileData = await scrapeLinkedInProfileWithFallback(url);

    return NextResponse.json({
      success: true,
      data: profileData,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to scrape LinkedIn profile details." },
      { status: 500 },
    );
  }
}

```

---

## File: `app/api/upgrade/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { upgradeRequest } from "@/lib/schema";

export async function POST(req: Request) {
  try {
    const currentUser = await getAuthenticatedUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan } = await req.json();

    const id = "upg_" + Math.random().toString(36).substring(2, 11);

    await db.insert(upgradeRequest).values({
      id,
      userId: currentUser.id,
      userEmail: currentUser.email,
      plan: plan ?? "pro",
    });

    return NextResponse.json({ success: true, id });
  } catch (e: any) {
    console.error("Failed to log upgrade request:", e);
    return NextResponse.json(
      { error: e.message || "Failed to process upgrade" },
      { status: 500 },
    );
  }
}

```

---

## File: `app/api/websites/resolve-host/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getWebsiteByDomain, getWebsiteBySubdomain } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const host = searchParams.get("host")?.toLowerCase().trim();

    if (!host) {
      return NextResponse.json({ slug: null });
    }

    // Try custom domain first
    let website = await getWebsiteByDomain(host);

    if (!website) {
      // Try subdomain: e.g. ayesha.linkedpage.io -> ayesha
      const parts = host.split(".");
      if (parts.length > 2) {
        const slug = parts[0];
        website = await getWebsiteBySubdomain(slug);
      }
    }

    if (website && website.isPublished) {
      return NextResponse.json({ slug: website.subdomainSlug });
    }

    return NextResponse.json({ slug: null });
  } catch (e) {
    console.error("Resolve host failed:", e);
    return NextResponse.json({ slug: null });
  }
}

```

---

## File: `app/api/websites/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getUserWebsites, createWebsite } from "@/lib/db";
import { TemplateId } from "@/shared/types";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const websites = await getUserWebsites(user.id);
    return NextResponse.json({ success: true, websites });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to fetch websites" },
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

    let templateId: TemplateId = "daniel-cross";
    try {
      const body = await request.json();
      if (body.templateId) {
        templateId = body.templateId;
      }
    } catch {
      // Body empty or invalid, proceed with default
    }

    const website = await createWebsite(user.id, templateId);
    return NextResponse.json({ success: true, website });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to create website draft" },
      { status: 500 },
    );
  }
}

```

---

## File: `app/api/websites/subdomain/check/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteBySubdomain } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")?.toLowerCase().trim();
    const websiteId = searchParams.get("websiteId");

    if (!slug) {
      return NextResponse.json(
        { error: "Subdomain slug is required" },
        { status: 400 },
      );
    }

    if (!/^[a-z0-9-]{3,30}$/.test(slug)) {
      return NextResponse.json({ available: false, reason: "Invalid format" });
    }

    const existing = await getWebsiteBySubdomain(slug);
    const isAvailable = !existing || existing.id === websiteId;

    return NextResponse.json({ success: true, available: isAvailable });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Subdomain verification failed" },
      { status: 500 },
    );
  }
}

```

---

## File: `app/dashboard/page.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Layout,
  Folder,
  CreditCard,
  BookOpen,
  Settings,
  Trash2,
  Edit2,
  ExternalLink,
  Globe,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

import { UserMenu } from "@/components/UserMenu";
import { useEditor } from "@/context/EditorContext";
import dynamic from "next/dynamic";
import { MOCK_PROFILE } from "@/shared/types";

const ProfilePreview = dynamic(() => import("@/app/editor/components/ProfilePreview"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-neutral-100 animate-pulse" />,
});
import { AnimatedDashboardEmptyIllustration } from "@/components/AnimatedSVGs";

export default function DashboardPage() {
  const router = useRouter();
  const { editedProfile, selectedTemplate } = useEditor();
  const activeProfile = editedProfile || MOCK_PROFILE;

  const [websites, setWebsites] = useState<any[]>([]);
  const [loadingWebsites, setLoadingWebsites] = useState(true);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // 1. Get current authenticated user
    const checkUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (!res.ok) {
          router.push("/login");
          return;
        }
        setUserName(`${data.user.firstName} ${data.user.lastName}`);
        setUserEmail(data.user.email);
        sessionStorage.setItem(
          "linkedpage_user",
          JSON.stringify({
            name: `${data.user.firstName} ${data.user.lastName}`,
            email: data.user.email,
          }),
        );
      } catch {
        router.push("/login");
      }
    };
    checkUser();

    // 2. Load websites
    const loadSites = async () => {
      try {
        const res = await fetch("/api/websites");
        const data = await res.json();
        if (res.ok && data.websites) {
          setWebsites(data.websites);
        }
      } catch (err) {
        console.error("Failed to load websites", err);
      } finally {
        setLoadingWebsites(false);
      }
    };
    loadSites();
  }, [router]);

  const handleDeleteSite = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this website? This action cannot be undone.",
      )
    ) {
      return;
    }
    const toastId = toast.loading("Deleting website draft...");
    try {
      const res = await fetch(`/api/websites/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      toast.dismiss(toastId);
      if (res.ok) {
        toast.success("Website deleted successfully.");
        setWebsites((prev) => prev.filter((w) => w.id !== id));
      } else {
        toast.error(data.error || "Failed to delete website");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Network error. Failed to delete website.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-inter flex flex-col text-black antialiased relative overflow-x-hidden">
      {/* ── Background Graphic ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-50">
        <img
          src="/bg.png"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFB]/40 via-white/80 to-[#FBFBFB]" />
      </div>

      {/* ── Editor Style Navbar/Top-bar (Removed shadow) ── */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-b border-[#E6E6E6] px-6 z-50 flex items-center justify-between select-none shadow-none">
        {/* Left Logo Side */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Webild"
            className="h-7 w-auto object-contain cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="w-px h-4 bg-[#2A2A2F]/15" />
          <span className="text-sm font-medium text-[#171717]/60 truncate max-w-[120px]">
            {websites[0]?.brandName || "My Dashboard"}
          </span>
        </div>

        {/* Right Action Side */}
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => {
              const slug = websites[0]?.subdomainSlug;
              const url = slug
                ? `https://fusion-starter-529.vercel.app/p/${slug}`
                : "https://fusion-starter-529.vercel.app";
              navigator.clipboard.writeText(url);
              toast.success("Site link copied to clipboard!");
            }}
            className="h-8 px-4 text-xs font-semibold bg-white border border-[#E6E6E6] rounded-lg text-[#2A2A2F] hover:bg-[#F7F7F7] transition-all"
          >
            Share
          </button>

          <button
            onClick={() => {
              toast.loading("Publishing changes...");
              setTimeout(() => {
                toast.dismiss();
                toast.success("Your site updates are live!");
              }, 1000);
            }}
            className="h-8 px-5 text-xs font-semibold bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-all active:scale-[0.97]"
          >
            Publish
          </button>

          {/* User Menu Avatar Trigger */}
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-8 h-8 rounded-lg bg-[#E6E6E6] overflow-hidden border-2 border-white hover:scale-105 active:scale-95 transition-all ml-1"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {/* User Dropdown Menu */}
          <AnimatePresence>
            {isUserMenuOpen && (
              <UserMenu
                name={userName}
                email={userEmail}
                onClose={() => setIsUserMenuOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Main Container (Sidebar + Content) ── */}
      <div className="flex-1 flex pt-14 min-h-screen relative z-10">
        {/* ── Sidebar (Sticky Left) ── */}
        <aside className="w-[260px] border-r border-[#F3F3F5] bg-white/50 backdrop-blur-sm px-6 py-6 flex flex-col justify-between hidden md:flex h-[calc(100vh-3.5rem)] sticky top-14 select-none">
          {/* Top navigation items */}
          <div className="flex flex-col gap-6">
            {/* New Website Button */}
            <button
              onClick={() => router.push("/onboarding")}
              className="w-full h-11 bg-[#F3F3F5] hover:bg-[#EAEAEB] active:scale-[0.98] transition-all rounded-[12px] flex items-center justify-center gap-2 text-[14px] font-semibold text-black"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 12h6M12 9v6" />
              </svg>
              New Website
            </button>

            {/* Menu Items */}
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => router.push("/")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all"
              >
                <Home className="w-[18px] h-[18px] text-black" />
                Home
              </button>

              <button
                onClick={() => router.push("/editor")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all"
              >
                <Layout className="w-[18px] h-[18px] text-black" />
                Templates
              </button>

              {/* Active Tab */}
              <button className="w-full h-10 px-3 rounded-[8px] bg-[#E8F1FF] border border-[#8DB8FF]/40 flex items-center gap-3 text-[14px] font-semibold text-[#1A68FF] transition-all">
                <Folder className="w-[18px] h-[18px] text-[#1A68FF]" />
                All Websites
              </button>
            </div>

            {/* Recent Websites Section */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#F5F5F7]">
              <span className="text-[12px] font-semibold text-[#88888E] px-3">
                Recent websites
              </span>

              <div
                onClick={() =>
                  websites[0] && router.push(`/editor?id=${websites[0].id}`)
                }
                className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] hover:bg-white/60 cursor-pointer transition-all bg-white/30"
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#E6E6E6] overflow-hidden p-0.5 shrink-0">
                  <img
                    src="/logoicon.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[13px] font-semibold text-[#171717] truncate">
                  {websites[0]?.brandName || "No recent sites"}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom navigation & pricing items */}
          <div className="flex flex-col gap-6">
            {/* Pricing, Documentation, Settings */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => router.push("/pricing")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all"
              >
                <CreditCard className="w-[18px] h-[18px] text-black" />
                Pricing
              </button>

              <button
                onClick={() => router.push("/docs")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all"
              >
                <BookOpen className="w-[18px] h-[18px] text-black" />
                Documentation
              </button>

              <button
                onClick={() => router.push("/settings")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all"
              >
                <Settings className="w-[18px] h-[18px] text-black" />
                Settings
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main Content Area ── */}
        <main className="flex-1 flex flex-col items-center px-8 md:px-12 py-10">
          {/* User Provided Search and Title Container */}
          <div
            className="flex flex-col gap-4 items-center text-center w-full max-w-[420px] mb-12"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <h2
              className="text-5xl font-medium leading-[1.15] text-black flex items-center justify-center gap-1 flex-wrap"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <span
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                All
              </span>{" "}
              <img
                className="h-[1.1em] w-auto object-contain align-middle mx-1.5 shrink-0"
                height={55}
                width={55}
                src="/logoicon.png"
                alt="Logo"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />{" "}
              <span
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                Websites
              </span>
            </h2>
            <p
              className="text-balance text-base md:text-xl leading-tight text-black"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              Manage and access all your websites websites in one place.
            </p>
            <div
              className="relative flex items-center gap-1 px-3 py-3 rounded-sm button-secondary w-full md:w-80 h-fit text-base md:text-lg mt-2"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <svg
                className="lucide lucide-search h-[1em] text-black"
                height="24"
                width="24"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                <path
                  d="m21 21-4.34-4.34"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                  }}
                />
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                  }}
                />
              </svg>
              <input
                className="w-full placeholder:text-black focus:outline-none text-base md:text-lg bg-transparent border-none p-0 focus:ring-0"
                type="text"
                placeholder="Search websites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
            </div>
          </div>

          {/* Websites Grid */}
          <div className="w-full flex justify-start pl-2">
            {loadingWebsites ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-7xl">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-3 p-3 rounded-[12px] bg-white border border-[#EBEBEB] animate-pulse"
                  >
                    <div className="w-full bg-gray-100 rounded-[10px] aspect-video" />
                    <div className="flex flex-col gap-2 mt-1">
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-3 bg-gray-100 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-7xl">
                {websites
                  .filter((web) => {
                    const term = searchQuery.toLowerCase();
                    return (
                      !term ||
                      web.brandName.toLowerCase().includes(term) ||
                      web.subdomainSlug.toLowerCase().includes(term)
                    );
                  })
                  .map((web) => {
                    const isDropdownOpen = activeDropdownId === web.id;
                    return (
                      <div
                        key={web.id}
                        className="relative flex flex-col gap-3 p-3 cursor-pointer rounded-[12px] bg-white border border-[#EBEBEB] hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)] transition-all duration-300 group"
                      >
                        <div
                          onClick={() => router.push(`/editor?id=${web.id}`)}
                        >
                          <div className="relative w-full bg-[#F7F7F7] rounded-[10px] overflow-hidden aspect-video border border-[#F5F5F7] flex items-center justify-center">
                            <div className="relative w-full p-1 rounded-sm flex items-center justify-center">
                              <div className="relative w-full aspect-video overflow-hidden rounded-[8px] bg-white flex items-center justify-center pointer-events-none">
                                <div className="scale-[0.27] origin-center flex-shrink-0 flex items-center justify-center">
                                  <ProfilePreview
                                    profile={web.profile}
                                    template={web.templateId}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer details */}
                        <div className="flex items-start justify-between relative min-w-0">
                          <div className="min-w-0 max-w-[80%] flex flex-col">
                            <h3 className="text-sm font-semibold leading-tight truncate text-black">
                              {web.brandName}
                            </h3>
                            <p className="text-xs leading-tight truncate text-gray-500 mt-1">
                              {web.isPublished ? (
                                <span className="text-[#d4ff66] font-semibold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff66]" />
                                  Live: fusion-starter-529.vercel.app/p/{web.subdomainSlug}
                                </span>
                              ) : (
                                <span>Draft (Unpublished)</span>
                              )}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 relative flex-shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const url = web.subdomainSlug
                                  ? `https://fusion-starter-529.vercel.app/p/${web.subdomainSlug}`
                                  : "https://fusion-starter-529.vercel.app";
                                navigator.clipboard.writeText(url);
                                toast.success("Site link copied to clipboard!");
                              }}
                              className="inline-flex h-8 px-2.5 text-xs font-semibold cursor-pointer items-center justify-center rounded-lg bg-white border border-[#E6E6E6] text-[#2A2A2F] hover:bg-[#F7F7F7] transition-all"
                            >
                              Share
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDropdownId(
                                  isDropdownOpen ? null : web.id,
                                );
                              }}
                              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 transition-all my-auto text-gray-500"
                            >
                              <svg
                                className="lucide lucide-ellipsis w-full"
                                height="24"
                                width="24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                                <circle cx="5" cy="12" r="1" />
                              </svg>
                            </button>

                            {/* Dropdown Options */}
                            {isDropdownOpen && (
                              <>
                                <div
                                  className="fixed inset-0 z-10"
                                  onClick={() => setActiveDropdownId(null)}
                                />
                                <div className="absolute right-0 bottom-10 z-20 w-44 bg-white border border-[#EBEBEB] rounded-[12px] py-1.5 flex flex-col shadow-lg">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const url = web.subdomainSlug
                                        ? `https://fusion-starter-529.vercel.app/p/${web.subdomainSlug}`
                                        : "https://fusion-starter-529.vercel.app";
                                      navigator.clipboard.writeText(url);
                                      toast.success(
                                        "Site link copied to clipboard!",
                                      );
                                      setActiveDropdownId(null);
                                    }}
                                    className="px-4 py-2 text-left text-[13px] font-medium text-black hover:bg-[#F3F3F5] flex items-center gap-2"
                                  >
                                    <Share2 className="w-4 h-4 text-gray-500" />
                                    Share Link
                                  </button>
                                  <button
                                    onClick={() => {
                                      setActiveDropdownId(null);
                                      router.push(`/editor?id=${web.id}`);
                                    }}
                                    className="px-4 py-2 text-left text-[13px] font-medium text-black hover:bg-[#F3F3F5] flex items-center gap-2"
                                  >
                                    <Edit2 className="w-4 h-4 text-gray-500" />
                                    Edit in Builder
                                  </button>
                                  <button
                                    onClick={() => {
                                      setActiveDropdownId(null);
                                      router.push(`/preview?id=${web.id}`);
                                    }}
                                    className="px-4 py-2 text-left text-[13px] font-medium text-black hover:bg-[#F3F3F5] flex items-center gap-2"
                                  >
                                    <Globe className="w-4 h-4 text-gray-500" />
                                    View Live Preview
                                  </button>
                                  <button
                                    onClick={() => {
                                      setActiveDropdownId(null);
                                      handleDeleteSite(web.id);
                                    }}
                                    className="px-4 py-2 text-left text-[13px] font-medium text-[#E45A5A] hover:bg-red-50 flex items-center gap-2 border-t border-[#F5F5F7] mt-1"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete site
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </main>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            html {
              scrollbar-width: thin;
              scrollbar-color: rgba(0, 0, 0, 0.05) transparent;
              overscroll-behavior: none;
            }

            body {
              scrollbar-width: thin;
              scrollbar-color: rgba(0, 0, 0, 0.05) transparent;
              background: #fff;
              overscroll-behavior: none;
              color: #171717;
              min-height: 100vh;
              position: relative;
              font-family: "Inter Tight", "Inter Tight Fallback";
              font-style: normal;
            }
          `,
        }}
      />
    </div>
  );
}

```

---

## File: `app/docs/page.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  CreditCard,
  BookOpen,
  Settings,
  HelpCircle,
  Code,
  Globe,
  Sliders,
  Sparkles,
} from "lucide-react";
import { UserMenu } from "@/components/UserMenu";

export default function DocsPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("started");

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("linkedpage_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUserName(parsed.name || "");
        setUserEmail(parsed.email || "");
      }
    } catch {
      // ignore
    }
  }, []);

  const docSections = {
    started: {
      title: "Getting Started",
      icon: <Sparkles className="w-5 h-5 text-[#8DB8FF]" />,
      content: (
        <div className="space-y-4 text-[14.5px] leading-relaxed text-gray-600">
          <p>
            Welcome to <strong>Webild LinkedPage</strong>! We build premium,
            responsive personal micro-sites directly from your LinkedIn profile.
          </p>
          <h3 className="text-lg font-bold text-black mt-6 font-inter-tight">
            The 3-Step Flow
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Paste Profile URL</strong>: Paste your public LinkedIn
              link. Our system reads the data.
            </li>
            <li>
              <strong>Select & Modify Template</strong>: Choose from Bento,
              Scroll, or Minimal layout presets and edit fields inside the
              editor canvas.
            </li>
            <li>
              <strong>Publish Site</strong>: Hit publish to get your free site
              live on a subdomain, or link a custom domain.
            </li>
          </ol>
        </div>
      ),
    },
    scraping: {
      title: "LinkedIn Scraper & ZIP",
      icon: <Code className="w-5 h-5 text-[#3b82f6]" />,
      content: (
        <div className="space-y-4 text-[14.5px] leading-relaxed text-gray-600">
          <p>
            LinkedIn employs security headers and rate limits. If the public
            scraper is blocked by LinkedIn’s login firewall, you can use our{" "}
            <strong>ZIP manual import</strong>:
          </p>
          <h3 className="text-lg font-bold text-black mt-6 font-inter-tight">
            How to download your archive
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Go to settings and request your data export:{" "}
              <a
                href="https://www.linkedin.com/psettings/member-data"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn Data Export
              </a>
            </li>
            <li>
              Select the <strong>"Profile"</strong> checkbox (the fast export
              takes ~10 minutes).
            </li>
            <li>
              Once you receive the ZIP download, drag and drop the file directly
              into our fallback screen.
            </li>
          </ul>
        </div>
      ),
    },
    templates: {
      title: "Editing & Templates",
      icon: <Sliders className="w-5 h-5 text-purple-500" />,
      content: (
        <div className="space-y-4 text-[14.5px] leading-relaxed text-gray-600">
          <p>
            LinkedPage offers modern templates configured to match professional
            brands.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Bento Grid</strong>: A bento-style visual portfolio
              demonstrating recent projects, experience milestones, and links.
            </li>
            <li>
              <strong>Minimal Card</strong>: High-key focused layout suitable
              for brief bio links.
            </li>
            <li>
              <strong>Full-Page Scroll</strong>: Narrative linear timeline
              presenting education, roles, and skills.
            </li>
          </ul>
          <p className="mt-4">
            Changes inside the canvas save automatically every few seconds. Look
            for the "Saved" tick in the top-bar header.
          </p>
        </div>
      ),
    },
    domains: {
      title: "Custom Domains",
      icon: <Globe className="w-5 h-5 text-[#d4ff66]" />,
      content: (
        <div className="space-y-4 text-[14.5px] leading-relaxed text-gray-600">
          <p>
            Pro plans allow you to host your micro-site on custom domains (e.g.{" "}
            <code>yoursite.com</code>).
          </p>
          <h3 className="text-lg font-bold text-black mt-6 font-inter-tight">
            DNS Configuration
          </h3>
          <p>
            To connect a domain, go to your site editor →{" "}
            <strong>Site Settings</strong> → <strong>Domains</strong> and
            configure the following DNS records with your registrar:
          </p>
          <table className="w-full text-left border border-gray-200 mt-4 text-[13px] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 font-semibold text-black">Type</th>
                <th className="p-3 font-semibold text-black">Name</th>
                <th className="p-3 font-semibold text-black">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-3">A Record</td>
                <td className="p-3">@ (Root)</td>
                <td className="p-3">
                  <code>76.76.21.21</code> (Anycast IP)
                </td>
              </tr>
              <tr>
                <td className="p-3">CNAME</td>
                <td className="p-3">www</td>
                <td className="p-3">
                  <code>cname.linkedpage.io</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    faq: {
      title: "Frequently Asked Questions",
      icon: <HelpCircle className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-4 text-[14.5px] leading-relaxed text-gray-600">
          <div className="space-y-3">
            <h4 className="font-bold text-black">
              Q: Can I edit details manually?
            </h4>
            <p>
              A: Yes! Click on any block inside the Editor panel to overwrite
              text, change headings, toggle visible cards, or upload custom
              profile avatars.
            </p>
          </div>
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <h4 className="font-bold text-black">Q: Is my data safe?</h4>
            <p>
              A: Absolutely. We only fetch public details. Your credentials are
              never handled, and files uploaded during manual import are
              processed on the server without storage.
            </p>
          </div>
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-inter flex flex-col text-black antialiased relative overflow-x-hidden">
      {/* ── Background Graphic (Polished Light Mesh Gradient) ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-[#FBFBFB]">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#8DB8FF]/10 to-[#E0EBFF]/5 blur-[120px] opacity-70" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#d4ff66]/6 to-[#d4ff66]/5 blur-[100px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#FBFBFB]" />
      </div>

      {/* ── Top-bar ── */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-b border-[#E6E6E6] px-6 z-50 flex items-center justify-between select-none shadow-none">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Webild"
            className="h-7 w-auto object-contain cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="w-px h-4 bg-[#2A2A2F]/15" />
          <span className="text-sm font-medium text-[#171717]/60 truncate">
            Documentation
          </span>
        </div>

        <div className="flex items-center gap-2 relative">
          {userName ? (
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-8 h-8 rounded-full border border-[#E6E6E6] overflow-hidden cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="h-8 px-4 text-xs font-semibold bg-[#2A2A2F] text-white rounded-lg hover:bg-[#3A3A42] transition-all"
            >
              Log in
            </button>
          )}

          <AnimatePresence>
            {isUserMenuOpen && (
              <UserMenu
                name={userName}
                email={userEmail}
                onClose={() => setIsUserMenuOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Dashboard Layout Body ── */}
      <div className="flex flex-1 relative z-10">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#E6E6E6] bg-white/50 backdrop-blur-md p-6 flex flex-col justify-between select-none shrink-0 min-h-[calc(100vh-3.5rem)] mt-14 relative z-20">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-[#88888E] px-3 mb-1 uppercase tracking-wider">
                Navigation
              </span>

              <button
                onClick={() => router.push(userName ? "/dashboard" : "/")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-semibold text-black/60 hover:text-black transition-all text-left"
              >
                <Folder className="w-[18px] h-[18px]" />
                {userName ? "All Websites" : "Home"}
              </button>
            </div>

            <div className="flex flex-col gap-1.5 pt-2 border-t border-[#F5F5F7]">
              <span className="text-[12px] font-semibold text-[#88888E] px-3 mb-1">
                Topics
              </span>
              {Object.keys(docSections).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full h-9 px-3 rounded-[6px] text-[13.5px] font-medium text-left transition-all flex items-center gap-2 ${
                    activeTab === key
                      ? "bg-white border border-[#E6E6E6] text-black shadow-sm"
                      : "text-gray-500 hover:text-black hover:bg-white/40"
                  }`}
                >
                  {docSections[key as keyof typeof docSections].title}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => router.push("/pricing")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black/60 hover:text-black transition-all text-left"
              >
                <CreditCard className="w-[18px] h-[18px]" />
                Pricing
              </button>

              <button
                onClick={() => router.push("/docs")}
                className="w-full h-10 px-3 rounded-[8px] bg-white/80 border border-[#E6E6E6]/60 flex items-center gap-3 text-[14px] font-semibold text-black transition-all text-left"
              >
                <BookOpen className="w-[18px] h-[18px] text-black" />
                Documentation
              </button>

              <button
                onClick={() => router.push("/settings")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black/60 hover:text-black transition-all text-left"
              >
                <Settings className="w-[18px] h-[18px]" />
                Settings
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 px-8 md:px-16 py-12 mt-14 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-black font-inter-tight">
              Help & Documentation
            </h1>
            <p className="text-[14px] text-gray-500 mt-1">
              Read tutorials and guides to launch your premium micro-site.
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] p-8"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                {docSections[activeTab as keyof typeof docSections].icon}
                <h2 className="text-xl font-bold text-black font-inter-tight">
                  {docSections[activeTab as keyof typeof docSections].title}
                </h2>
              </div>

              {docSections[activeTab as keyof typeof docSections].content}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

```

---

## File: `app/editor/components/ChatPane.tsx`

```tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, LayoutGrid, Plus, Mic, ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { useEditor } from "@/context/EditorContext";
import { ProfileData, TemplateId } from "@/shared/types";
import TemplatePicker from "./TemplatePicker";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedThinkingIllustration } from "@/components/AnimatedSVGs";

export type ChatTab = "chat" | "grid";

interface ChatPaneProps {
  onCommand: (cmd: string) => void;
  profileName: string;
  profile: ProfileData | null;
  selectedTemplate: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  onChangeField: <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K],
  ) => void;
  activeTab: ChatTab;
  setActiveTab: (tab: ChatTab) => void;
  prefill: string;
  onClearPrefill: () => void;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Your page is ready. Tell me what you'd like to change — I can update your headline, summary, skills, links, or switch the template. What would you like to adjust?",
    time: "",
  },
];

const SUGGESTIONS = [
  "Make my headline more impactful",
  "Shorten my summary",
  "Switch to dark template",
  "Add a GitHub link",
];

function TypingDots() {
  return (
    <div className="flex items-center gap-[3px] px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-[5px] h-[5px] rounded-full bg-[#2A2A2F]/40"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function ChatPane({
  onCommand,
  profileName,
  profile,
  selectedTemplate,
  onSelectTemplate,
  onChangeField,
  activeTab,
  setActiveTab,
  prefill,
  onClearPrefill,
}: ChatPaneProps) {
  const { websiteId } = useEditor();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Prefill prompt when triggered
  useEffect(() => {
    if (prefill) {
      setInput(prefill);
      onClearPrefill();
    }
  }, [prefill, onClearPrefill]);

  // Load chat history from backend on mount or when websiteId changes
  useEffect(() => {
    if (!websiteId) {
      setMessages(initialMessages);
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/chat?websiteId=${websiteId}`);
        if (!res.ok) throw new Error("Failed to load chat history");
        const data = await res.json();
        if (data.success && data.history && data.history.length > 0) {
          // Format messages for frontend
          const formatted = data.history.map((msg: any) => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
            time: "",
          }));
          setMessages(formatted);
        } else {
          setMessages(initialMessages);
        }
      } catch (err) {
        console.error("Error loading chat history:", err);
        setMessages(initialMessages);
      }
    };

    fetchHistory();
  }, [websiteId]);

  const sendMessage = async (text?: string) => {
    const msg = text ?? input.trim();
    if (!msg) return;
    setInput("");

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
      time: "",
    };
    setMessages((prev) => [...prev, userMsg]);

    if (!websiteId) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "No active site loaded. Please select a website from the dashboard first.",
          time: "",
        },
      ]);
      return;
    }

    setIsThinking(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, websiteId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI reply");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: data.reply,
          time: "",
        },
      ]);

      if (data.template) {
        onSelectTemplate(data.template);
      }

      if (data.profileUpdates) {
        for (const [k, v] of Object.entries(data.profileUpdates)) {
          onChangeField(k as keyof ProfileData, v as any);
        }
      }

      const lower = msg.toLowerCase();
      if (
        lower.includes("change template") ||
        lower.includes("switch template") ||
        lower.includes("switch to")
      ) {
        setActiveTab("grid");
      }

      onCommand(msg);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: `Error: ${e.message || "Failed to generate AI reply."}`,
          time: "",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    if (activeTab === "chat") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab, isThinking]);

  const chatTabs = [
    {
      id: "chat" as ChatTab,
      icon: (isActive: boolean) => (
        <MessageSquare
          className={`w-4 h-4 transition-colors duration-200 ${isActive ? "text-blue-500" : "text-[#171717]/60"}`}
        />
      ),
      label: "Chat",
    },
    {
      id: "grid" as ChatTab,
      icon: (isActive: boolean) => (
        <LayoutGrid
          className={`w-4 h-4 transition-colors duration-200 ${isActive ? "text-blue-500" : "text-[#171717]/60"}`}
        />
      ),
      label: "Templates",
    },
  ];

  return (
    <section className="w-[510px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full overflow-hidden select-none font-inter">
      {/* Title Header */}
      <div className="h-[54px] border-b border-[#E6E6E6]/40 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="LinkedPage"
            className="h-6 w-auto object-contain"
          />
          <div className="w-px h-3 bg-black/10" />
          <span className="text-[12.5px] font-bold text-[#171717]/65 truncate max-w-[120px]">
            {profileName || "LinkedPage"}
          </span>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 bg-[#d4ff66]/25 text-[#d4ff66] rounded-md">
          Editor Mode
        </span>
      </div>

      {/* Tabs Toolbar with Custom Premium Expandable Style */}
      <div className="px-6 py-3 border-b border-[#E6E6E6]/30 bg-[#FBFBFB] shrink-0">
        <div className="relative flex items-center justify-center bg-zinc-100 rounded-xl p-[4px] h-10 w-full gap-1.5">
          {chatTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                layout
                key={tab.id}
                id={tab.id === "grid" ? "onboarding-templates-tab" : undefined}
                onClick={() => setActiveTab(tab.id)}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className={`relative h-8 rounded-xl flex items-center justify-center group cursor-pointer focus:outline-none select-none transition-all duration-300 ${
                  isActive
                    ? "flex-[1.5] text-blue-500 px-3 font-['Inter_Tight']"
                    : "flex-1 text-[#171717]/60 hover:bg-zinc-200/40"
                }`}
              >
                {/* Smoothly animated background pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-blue-50 outline outline-1 outline-blue-500/50 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Content wrapper to render above the absolute background pill */}
                <div className="relative z-10 flex items-center justify-center shrink-0">
                  {tab.icon(isActive)}
                </div>

                {/* Label (visible only when active) */}
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15, delay: 0.05 }}
                    className="relative z-10 ml-1.5 text-xs font-semibold whitespace-nowrap text-blue-500 font-['Inter_Tight']"
                  >
                    {tab.label}
                  </motion.span>
                )}

                {/* Tooltip for inactive tabs */}
                {!isActive && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-center">
                    {/* Small arrow pointing up */}
                    <div className="w-2 h-2 bg-zinc-800 rotate-45 -mb-1 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]" />
                    <div className="px-3 py-1 bg-gradient-to-b from-zinc-800 to-zinc-700 text-white text-[10px] font-medium font-['Inter_Tight'] rounded-lg shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] whitespace-nowrap">
                      {tab.label}
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab content area */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {activeTab === "chat" && (
          <>
            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto w-full px-4"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="max-w-[479px] mx-auto flex flex-col gap-6 pb-4 pt-4 w-full">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="w-full flex flex-col"
                    >
                      {msg.role === "user" ? (
                        <div className="w-full flex justify-end items-start font-inter">
                          <div className="max-w-[85%] bg-white border border-neutral-200/60 rounded-[18px] px-4 py-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                            <p className="text-[#171717] text-[14.5px] leading-[22px] font-normal break-words max-w-full">
                              {msg.content}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex flex-col justify-start items-start gap-2.5 font-inter">
                          <div className="flex items-center gap-2 select-none">
                            {/* Logo Icon */}
                            <img
                              src="/logoicon.png"
                              alt="Logo"
                              className="h-5 w-auto object-contain"
                            />
                            <span className="font-semibold text-[13.5px] text-black">
                              Webild
                            </span>
                          </div>

                          <div className="w-full">
                            <p className="text-[#171717] text-[14.5px] leading-[22px] font-normal whitespace-pre-wrap w-full">
                              {msg.content}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {isThinking && (
                    <motion.div
                      key="thinking"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="w-full flex flex-col justify-start items-start gap-2.5 font-inter"
                    >
                      <div className="flex items-center gap-2 select-none">
                        <img
                          src="/logoicon.png"
                          alt="Logo"
                          className="h-5 w-auto object-contain animate-pulse"
                        />
                        <span className="font-semibold text-[13.5px] text-black animate-pulse">
                          Webild
                        </span>
                      </div>
                      <div className="bg-white px-4 py-3 rounded-[18px] border border-neutral-200/60 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] flex items-center justify-center">
                        <AnimatedThinkingIllustration />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input area */}
            <div className="p-4 shrink-0 bg-white flex flex-col gap-3">
              {/* Suggestion pills */}
              <div
                className="flex gap-2 overflow-x-auto pb-1"
                style={{ scrollbarWidth: "none" }}
              >
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="flex-shrink-0 h-9 px-4 bg-white hover:bg-neutral-50 border border-neutral-200/60 rounded-full text-[13px] font-medium text-black transition-[background-color,transform] duration-150 whitespace-nowrap shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] cursor-pointer active:scale-[0.95]"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Text input composer */}
              <div className="bg-white rounded-[20px] p-2.5 flex flex-col gap-2 border border-neutral-200/80 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="w-full bg-transparent border-none resize-none focus:ring-0 text-[14px] px-2.5 py-1.5 text-neutral-800 placeholder:text-neutral-400 h-16 outline-none font-inter"
                  placeholder="Ask Webild..."
                />
                {input.length > 200 && (
                  <div className="text-[10px] text-gray-400 self-end mr-2 -mt-1 select-none font-inter">
                    {input.length} characters
                  </div>
                )}
                <div className="flex items-center justify-between px-1">
                  <button
                    onClick={() => toast.info("Attachments coming soon!")}
                    className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer border-none"
                  >
                    <Plus className="w-[18px] h-[18px]" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toast.info("Voice input coming soon!")}
                      className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer border-none"
                    >
                      <Mic className="w-[18px] h-[18px]" />
                    </button>
                    <button
                      onClick={() => sendMessage()}
                      className="w-9 h-9 rounded-full bg-[#8DB8FF] hover:bg-[#7ca8f0] text-white flex items-center justify-center transition-[background-color,transform] duration-100 cursor-pointer border-none active:scale-[0.93]"
                    >
                      <ArrowUp className="w-[18px] h-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "grid" && (
          <div
            className="flex-1 overflow-y-auto pb-6"
            style={{ scrollbarWidth: "none" }}
          >
            <TemplatePicker
              selected={selectedTemplate}
              onSelect={onSelectTemplate}
            />
          </div>
        )}
      </div>
    </section>
  );
}

```

---

## File: `app/editor/components/DomainsPane.tsx`

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useEditor } from "@/context/EditorContext";
import { Loader2, Check, RefreshCw, Trash2 } from "lucide-react";

interface DomainType {
  id: string;
  name: string;
  status: "active" | "pending";
}

export default function DomainsPane() {
  const { websiteId } = useEditor();
  const [searchVal, setSearchVal] = useState("");
  const [customDomains, setCustomDomains] = useState<DomainType[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  // Load custom domains from DB
  const loadDomains = async () => {
    if (!websiteId) return;
    try {
      const res = await fetch(`/api/websites/${websiteId}/domains`);
      const data = await res.json();
      if (res.ok && data.domains) {
        setCustomDomains(data.domains);
      }
    } catch (err) {
      console.error("Failed to load domains", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDomains();
  }, [websiteId]);

  const handleConnect = async () => {
    const domain = searchVal.trim();
    if (!domain) return;
    if (!domain.includes(".")) {
      toast.error("Please enter a valid domain name (e.g. realitycheque.com)");
      return;
    }
    if (!websiteId) {
      toast.error("No website selected.");
      return;
    }
    setConnecting(true);
    const toastId = toast.loading("Connecting domain...");
    try {
      const res = await fetch(`/api/websites/${websiteId}/domains`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      const data = await res.json();
      toast.dismiss(toastId);
      setConnecting(false);
      if (res.ok && data.domain) {
        setCustomDomains((prev) => [...prev, data.domain]);
        setSearchVal("");
        toast.success("Domain added! Please configure your DNS settings.");
      } else {
        toast.error(data.error || "Failed to connect domain");
      }
    } catch {
      toast.dismiss(toastId);
      setConnecting(false);
      toast.error("Connection failed.");
    }
  };

  const handleVerify = async (domainId: string) => {
    if (!websiteId) return;
    setVerifyingId(domainId);
    const toastId = toast.loading("Checking DNS resolution...");
    try {
      const res = await fetch(
        `/api/websites/${websiteId}/domains/${domainId}/verify`,
        {
          method: "POST",
        },
      );
      const data = await res.json();
      toast.dismiss(toastId);
      setVerifyingId(null);
      if (res.ok && data.verified) {
        toast.success("Domain verified! SSL certificate issued.");
        loadDomains();
      } else {
        toast.error(
          "DNS records check failed. DNS propagation might take up to 24h.",
        );
      }
    } catch {
      toast.dismiss(toastId);
      setVerifyingId(null);
      toast.error("Failed to verify DNS. Connection error.");
    }
  };

  const handleDelete = async (domainId: string) => {
    if (!websiteId) return;
    if (!confirm("Are you sure you want to disconnect this custom domain?"))
      return;
    const toastId = toast.loading("Disconnecting domain...");
    try {
      const res = await fetch(
        `/api/websites/${websiteId}/domains/${domainId}`,
        {
          method: "DELETE",
        },
      );
      toast.dismiss(toastId);
      if (res.ok) {
        toast.success("Domain disconnected!");
        setCustomDomains((prev) => prev.filter((d) => d.id !== domainId));
      } else {
        toast.error("Failed to disconnect domain.");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Failed to disconnect domain. Connection error.");
    }
  };

  if (!websiteId) {
    return (
      <section className="w-[340px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full items-center justify-center p-6 text-center">
        <p className="text-sm text-gray-400 font-medium font-['Inter_Tight']">
          No website loaded. Go back to the dashboard and open a site.
        </p>
      </section>
    );
  }

  return (
    <section className="w-[340px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full overflow-hidden select-none font-inter">
      {/* Title Header */}
      <div className="h-[54px] border-b border-[#E6E6E6]/40 px-6 flex items-center justify-between shrink-0">
        <span className="font-semibold text-[15px] text-black">
          Domains & SSL
        </span>
        <span className="text-[11px] font-bold px-2 py-0.5 bg-[#d4ff66]/25 text-[#d4ff66] rounded-md">
          Pro Active
        </span>
      </div>

      {/* Content container */}
      <div
        className="flex-1 overflow-y-auto p-5 flex flex-col gap-6"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Section: Connected Domains */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Connected Domains
          </span>
          {loading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            </div>
          ) : customDomains.length === 0 ? (
            <div className="text-xs text-gray-500 text-center py-4 border border-dashed border-[#E6E6E6] rounded-xl bg-[#FBFBFB]">
              No custom domains connected yet.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {customDomains.map((dom) => (
                <div
                  key={dom.id}
                  className="p-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-xl flex flex-col gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-bold text-black truncate">
                        {dom.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {dom.status === "active"
                          ? "SSL secured & live"
                          : "DNS config pending"}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        dom.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700 animate-pulse"
                      }`}
                    >
                      {dom.status === "active" ? "Active" : "Setup Required"}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-2 border-t border-[#E6E6E6]/40 pt-2">
                    {dom.status === "pending" && (
                      <button
                        onClick={() => handleVerify(dom.id)}
                        disabled={verifyingId === dom.id}
                        className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-0.5 disabled:opacity-50"
                      >
                        {verifyingId === dom.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <RefreshCw className="w-3 h-3" />
                        )}
                        Verify DNS
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(dom.id)}
                      className="text-[10px] font-semibold text-red-650 hover:text-red-700 flex items-center gap-0.5"
                    >
                      <Trash2 className="w-3 h-3" />
                      Disconnect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section: Connect Domain Input */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Connect Custom Domain
          </span>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value.toLowerCase())}
              placeholder="e.g. yourname.com"
              className="w-full h-10 px-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-blue-400 font-medium"
            />
            <button
              onClick={handleConnect}
              disabled={connecting}
              className="w-full h-10 rounded-lg bg-[#2A2A2F] hover:bg-[#3E3E45] active:scale-95 transition-all text-white text-[12px] font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              {connecting && (
                <span className="w-3 h-3 rounded-lg border-2 border-white border-t-transparent animate-spin" />
              )}
              Connect Domain
            </button>
          </div>
        </div>

        {/* DNS instructions panel if setup required exists */}
        {customDomains.some((d) => d.status === "pending") && (
          <div className="p-4 bg-amber-50/50 border border-amber-200/60 rounded-xl flex flex-col gap-2.5">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
              DNS Settings Required
            </span>
            <p className="text-xs text-amber-700/80 leading-relaxed">
              Configure your domain registrar (Namecheap, GoDaddy, etc.) with
              the following DNS records:
            </p>
            <div className="flex flex-col gap-1.5 font-mono text-[10px] text-gray-600 bg-white p-2.5 rounded-lg border border-amber-200/40">
              <div>
                Type: <strong className="text-black">A</strong>
              </div>
              <div>
                Host: <strong className="text-black">@</strong>
              </div>
              <div>
                Value: <strong className="text-black">76.76.21.21</strong>
              </div>
              <div className="h-px bg-gray-100 my-1" />
              <div>
                Type: <strong className="text-black">CNAME</strong>
              </div>
              <div>
                Host: <strong className="text-black">www</strong>
              </div>
              <div>
                Value:{" "}
                <strong className="text-black">cname.linkedpage.co</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

```

---

## File: `app/editor/components/MediaPicker.tsx`

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Upload } from "lucide-react";
import { toast } from "sonner";

interface MediaItem {
  id: string;
  name: string;
  url: string;
}

const STOCK_MEDIA: MediaItem[] = [
  {
    id: "tech",
    name: "technology",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "fashion",
    name: "fashion",
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "business",
    name: "business",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "architecture",
    name: "architecture",
    url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "nature",
    name: "nature",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "food",
    name: "food",
    url: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&auto=format&fit=crop&q=80",
  },
];

export default function MediaPicker() {
  const [activePickerTab, setActivePickerTab] = useState<"uploads" | "ai">(
    "uploads",
  );
  const [search, setSearch] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const filteredMedia = STOCK_MEDIA.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleUploadClick = () => {
    toast.info("Upload functionality integration triggered!");
  };

  return (
    <div className="flex flex-col self-stretch grow">
      <div className="flex justify-center self-stretch pt-[21.07979965209961px]">
        <div className="flex flex-col justify-center self-stretch grow bg-[#fbfbfb] rounded-[13px] outline-1 outline-t-1 outline-l-1 outline-r-1 outline-b-1 outline outline-[#f3f3f3] relative overflow-hidden min-h-[832px]">
          {/* Background white sheet layer */}
          <div className="w-[486.25px] h-[831.4500122070312px] bg-white absolute left-0 top-0 rounded-[13px] pointer-events-none"></div>

          <div className="self-stretch grow relative z-10 flex flex-col items-center py-[21.08px]">
            {/* Background mask layer */}
            <div className="w-[486.25px] h-[831.4500122070312px] bg-gradient-to-b from-black via-black to-black absolute left-0 top-0 pointer-events-none opacity-0"></div>

            <div className="w-[434.0899963378906px] flex flex-col gap-[12.640000343322754px]">
              <div className="flex justify-between items-center self-stretch">
                <div className="w-[83.16px] h-[27.34000015258789px] flex items-center">
                  <span className="font-medium text-[17.899999618530273px] leading-[27.360000610351562px] text-neutral-900">
                    Media
                  </span>
                </div>

                <div className="flex flex-col relative group/info">
                  <div className="w-[18.229999542236328px] h-[18.229999542236328px] flex items-center justify-center cursor-pointer">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[15.191665649414062px] h-[15.191665649414062px]"
                    >
                      <g clipPath="url(#clip0_5_88)">
                        <path
                          d="M9.11488 16.7108C13.3099 16.7108 16.7107 13.3101 16.7107 9.115C16.7107 4.91994 13.3099 1.51917 9.11488 1.51917C4.91981 1.51917 1.51904 4.91994 1.51904 9.115C1.51904 13.3101 4.91981 16.7108 9.11488 16.7108Z"
                          stroke="#171717"
                          strokeWidth="1.51917"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.11523 12.1541V9.11499"
                          stroke="#171717"
                          strokeWidth="1.51917"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.11523 6.07666H9.12283"
                          stroke="#171717"
                          stroke-width="1.51917"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_5_88">
                          <rect width="18.23" height="18.23" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  {/* Hover tooltip explanation */}
                  <div className="h-[66.62999725341797px] flex flex-col opacity-0 group-hover/info:opacity-100 transition-opacity duration-150 absolute right-0 top-[22px] z-50 pointer-events-none">
                    <div className="w-80 flex flex-col bg-gradient-to-b from-[#2a2a2f] to-[#3a3a42] px-[12.647899627685547px] pt-[3.109999895095825px] pb-[4.519999980926514px] rounded-lg shadow-md">
                      <span className="font-normal text-[13.300000190734863px] leading-[19.40999984741211px] text-white">
                        Manage your site's visuals. Upload your own images,
                        browse the library, or generate new ones with AI.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-0.5 border-t border-black/5"></div>
            </div>

            {/* Tabs Selector Navigation */}
            <div className="flex w-[434.0899963378906px] h-[44px] items-center justify-between mt-3">
              {/* Your Uploads Tab Button */}
              <button
                onClick={() => {
                  setActivePickerTab("uploads");
                  handleUploadClick();
                }}
                className={`w-[206.5px] h-10 rounded-[13px] relative cursor-pointer outline-none transition-all flex items-center justify-center gap-2 border ${
                  activePickerTab === "uploads"
                    ? "bg-white border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                    : "bg-[#f3f3f3] border-transparent hover:bg-zinc-200/50"
                }`}
              >
                <div className="w-[16.15999984741211px] h-[16.15999984741211px] flex items-center justify-center">
                  <Upload className="w-4 h-4 text-black" />
                </div>
                <span className="font-medium text-[14.899999618530273px] leading-[23px] text-center text-black">
                  Your Uploads
                </span>
              </button>

              {/* Generate Images Tab Button */}
              <button
                onClick={() => setActivePickerTab("ai")}
                className="flex flex-col justify-start items-start cursor-pointer outline-none relative w-[210.52000427246094px]"
              >
                {activePickerTab === "ai" && (
                  <div className="w-[210.52000427246094px] h-12 opacity-[0.20] bg-gradient-to-b from-[#0894ff] via-[#c959dd] via-[#ff2e54] to-[#ff9004] absolute -top-[4px] -left-[2px] blur-sm rounded-[14px] pointer-events-none"></div>
                )}
                <div className="flex flex-col self-stretch p-0.5 rounded-[14px] w-full relative z-10">
                  <div
                    className={`self-stretch h-10 rounded-[13px] flex items-center justify-center gap-2 border transition-all ${
                      activePickerTab === "ai"
                        ? "bg-white border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                        : "bg-[#f3f3f3] border-transparent hover:bg-zinc-200/50"
                    }`}
                  >
                    <div className="w-[16.15999984741211px] h-[16.15999984741211px] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-black" />
                    </div>
                    <span className="font-medium text-[15.100000381469727px] leading-[23px] text-center text-black">
                      Generate Images
                    </span>
                  </div>
                </div>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activePickerTab === "uploads" ? (
                <motion.div
                  key="uploads"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-3 mt-4"
                >
                  {/* Library Header */}
                  <div className="w-[434.0899963378906px] flex flex-col mt-1">
                    <span className="font-medium text-[14.899999618530273px] leading-[23px] text-black">
                      Image Library
                    </span>
                  </div>

                  {/* Search Input Bar Container */}
                  <div className="w-[434.0899963378906px] h-10 flex items-center gap-[4.199999809265137px] bg-[#f3f3f3] px-[12.647899627685547px] rounded-[13px] border border-black/5 relative">
                    <div className="relative shrink-0 w-[22.440000534057617px] h-[16.158000946044922px] flex items-center justify-center">
                      <svg
                        width="23"
                        height="17"
                        viewBox="0 0 23 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[18px] h-[14px]"
                      >
                        <path
                          d="M17.279 14.1379L14.3574 11.2163"
                          stroke="black"
                          strokeWidth="1.3465"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.5466 12.7918C13.5212 12.7918 15.9326 10.3804 15.9326 7.40578C15.9326 4.43117 13.5212 2.01978 10.5466 2.01978C7.57204 2.01978 5.16064 4.43117 5.16064 7.40578C5.16064 10.3804 7.57204 12.7918 10.5466 12.7918Z"
                          stroke="black"
                          strokeWidth="1.3465"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search through image library"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="flex-1 bg-transparent border-none text-[14.600000381469727px] text-black placeholder:text-zinc-400 focus:outline-none focus:ring-0 p-0 font-normal ml-1"
                    />
                  </div>

                  {/* Media preset cards grid list */}
                  <div
                    className="grid grid-cols-2 gap-x-[15px] gap-y-[16px] w-[434.0899963378906px] h-[510px] overflow-y-auto mt-1 pb-4"
                    style={{ scrollbarWidth: "none" }}
                  >
                    {filteredMedia.length > 0 ? (
                      filteredMedia.map((item) => {
                        const isSelected = selectedMedia === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              setSelectedMedia(item.id);
                              toast.success(`Selected ${item.name} image!`);
                            }}
                            className={`w-[208.61000061035156px] h-[156.4499969482422px] bg-[#f3f3f3] rounded-[13px] relative overflow-hidden cursor-pointer group border transition-all ${
                              isSelected
                                ? "border-blue-500 ring-1 ring-blue-500"
                                : "border-black/5 hover:border-zinc-300"
                            }`}
                          >
                            {/* Image element */}
                            <img
                              src={item.url}
                              alt={item.name}
                              className="w-[208.61000061035156px] h-[156.4499969482422px] object-cover absolute inset-0 select-none pointer-events-none opacity-85 group-hover:scale-105 transition-transform duration-300"
                            />

                            {/* Bottom Gradient overlay */}
                            <div className="w-[208.61000061035156px] h-[78.22116088867188px] absolute bottom-0 left-0 pointer-events-none">
                              <div className="w-[208.61000061035156px] h-[78.22116088867188px] bg-gradient-to-b from-black/0 to-black/80 absolute inset-0"></div>
                            </div>

                            {/* Media tag */}
                            <div className="flex flex-col absolute bottom-3 left-3 z-10 pointer-events-none">
                              <div className="h-[23.079999923706055px] flex items-center">
                                <span className="font-medium text-[15.199999809265137px] leading-[23px] capitalize text-white truncate max-w-[180px]">
                                  {item.name}
                                </span>
                              </div>
                            </div>

                            {/* Selected Badge Indicator */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-5 h-5 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm z-20">
                                <Check
                                  className="w-3 h-3 text-white"
                                  strokeWidth={2.5}
                                />
                              </div>
                            )}

                            {/* Action Hover overlay */}
                            <div className="w-[208.61000061035156px] h-[156.4499969482422px] flex justify-center items-center bg-white/20 backdrop-blur-[1px] absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                              <div className="h-10 flex flex-col justify-center items-center bg-[#f3f3f3] px-[25.295799255371094px] py-[8px] rounded-[13px] shadow-sm">
                                <span className="font-medium text-[15.300000190734863px] leading-[23px] text-center text-black">
                                  {isSelected ? "Active" : "Explore"}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-8 text-center text-xs text-zinc-400 w-full">
                        No images match your search.
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-[434.0899963378906px] flex flex-col gap-4 mt-6"
                >
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-[13px] p-4 border border-[#E6E6E6]/60 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      <span>AI Image Generator</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                      Describe the concept or image style you desire, and our AI
                      will automatically construct a customized image matching
                      your request.
                    </p>
                    <div className="flex flex-col gap-2 mt-1">
                      {[
                        "Modern clean workspace mockup",
                        "High fashion editorial photoshoot model",
                        "Business professional handshake close-up",
                        "Stunning high rise architecture skyscraper",
                      ].map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => {
                            toast.loading(
                              `Analyzing description and generating image...`,
                            );
                            setTimeout(() => {
                              toast.dismiss();
                              toast.success("AI image successfully generated!");
                              setActivePickerTab("uploads");
                            }, 1500);
                          }}
                          className="text-left w-full px-3.5 py-2.5 bg-white hover:bg-zinc-50 border border-[#E6E6E6] rounded-xl text-[11px] font-semibold text-zinc-700 hover:text-black flex items-center justify-between transition-colors shadow-sm cursor-pointer"
                        >
                          <span>{prompt}</span>
                          <Sparkles className="w-3 h-3 text-zinc-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

```

---

## File: `app/editor/components/ProfilePreview.tsx`

```tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { ProfileData, TemplateId } from "@/shared/types";

interface ProfilePreviewProps {
  profile: ProfileData;
  template: TemplateId;
  scale?: number;
  onFieldClick?: (fieldName: string, index?: number) => void;
  fluid?: boolean;
  isSelectionMode?: boolean;
  selectedField?: string | null;
  selectedIndex?: number;
}

function buildSocialLinksBlock(profile: ProfileData, isPreview: boolean): string {
  const links = profile.links || [];
  if (links.length === 0) return "";

  return links.map((lnk, index) => {
    const editableAttr = isPreview ? `data-editable-field="links" data-editable-index="${index}"` : "";
    return `
<div class="ssr-variant" ${editableAttr} style="opacity: 1; margin-bottom: 6px;">
  <!--$--><a class="framer-RdB2l framer-5K3Le framer-7fvNa framer-wyk4az framer-v-wyk4az framer-g0nscs" href="${esc(lnk.url)}" target="_blank" rel="noopener" style="background-color:rgba(0, 0, 0, 0); opacity:1; display:flex; justify-content:space-between; width:100%; text-decoration:none; padding: 4px 0;">
    <div class="framer-pq6inv" style="opacity: 1;">
      <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="color:var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)); margin:0;">${esc(lnk.label)}</p>
    </div>
  </a><!--/$-->
</div>`;
  }).join("\n");
}

function replaceSocialLinksContent(html: string, socialHtml: string): string {
  const marker = 'data-framer-name="Social links"';
  const sIdx = html.indexOf(marker);
  if (sIdx === -1) return html;

  const contentStart = html.indexOf(">", sIdx) + 1;
  let pos = contentStart;
  let depth = 1;
  while (depth > 0 && pos < html.length) {
    const nextOpen = html.indexOf("<div", pos);
    const nextClose = html.indexOf("</div>", pos);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }

  if (depth === 0) {
    const wrapperEnd = pos - 6;
    return html.substring(0, contentStart) + socialHtml + html.substring(wrapperEnd);
  }

  return html;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function removeHtmlSection(html: string, startIndicator: string, tagName: string = "section"): string {
  const startIdx = html.indexOf(startIndicator);
  if (startIdx === -1) return html;

  // Trace back to find the actual start tag of this element (e.g., <section or <footer)
  const tagOpenIdx = html.lastIndexOf(`<${tagName}`, startIdx);
  if (tagOpenIdx === -1) return html;

  let pos = tagOpenIdx + tagName.length + 1;
  let depth = 1;
  while (depth > 0 && pos < html.length) {
    const nextOpen = html.indexOf(`<${tagName}`, pos);
    const nextClose = html.indexOf(`</${tagName}>`, pos);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + tagName.length + 1;
    } else {
      depth--;
      pos = nextClose + tagName.length + 3;
    }
  }

  if (depth === 0) {
    return html.substring(0, tagOpenIdx) + html.substring(pos);
  }

  return html;
}

function buildProjectCard(
  title: string,
  description: string,
  link: string,
  imageUrl: string,
  category: string,
  year: string,
  index: number
): string {
  const resolvedImg = imageUrl || "/templates/daniel-cross/NZiJk1LCTBcGzs2MNANRaoxI2IA.png";
  return `
<div class="ssr-variant" data-editable-field="project" data-editable-index="${index}">
  <div class="framer-1kys2js-container" data-framer-name="Work card" name="Work card" style="will-change: transform; opacity: 1; transform: none;">
    <!--$--><a name="Work card" class="framer-cOcSQ framer-x2WlA framer-5K3Le framer-ryc3c framer-v-ryc3c framer-j0rmx6" data-framer-name="Work card" href="${esc(link)}" style="background-color: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); width: 100%; border-radius: 12px; opacity: 1;">
      <div class="framer-z31oie" data-framer-name="Cover image" style="transform: none; opacity: 1;">
        <div style="position:absolute;border-radius:inherit;corner-shape:inherit;top:0;right:0;bottom:0;left:0" data-framer-background-image-wrapper="true">
          <img decoding="auto" src="${esc(resolvedImg)}" alt="" style="display:block;width:100%;height:100%;border-radius:inherit;corner-shape:inherit;object-position:center;object-fit:cover">
        </div>
      </div>
      <div class="framer-fh6ndj" data-framer-name="Linear" style="background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)) 100%); opacity: 1;"></div>
      <div class="framer-1s2w6if" data-framer-name="Text wrapper" style="opacity: 1;">
        <div class="framer-1k4j78w" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
          <h4 class="framer-text framer-styles-preset-qumrh3" data-styles-preset="FLDbgL1a7">${esc(title)}</h4>
        </div>
        <div class="framer-1orth6j" data-framer-name="details" style="opacity:0.8">
          <div class="framer-1wxz9c2" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)))">${esc(category)}</p>
          </div>
          <div class="framer-1prjt4a" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)))">/</p>
          </div>
          <div class="framer-5hs0bj" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)))">${esc(year)}</p>
          </div>
        </div>
      </div>
    </a><!--/$-->
  </div>
</div>`;
}

function buildProjectsSection(profile: ProfileData): string {
  const projects = profile.projects || [];
  if (projects.length === 0) return "";

  const cards = projects
    .map((p, index) =>
      buildProjectCard(
        p.title,
        p.description,
        p.link || "#",
        p.image || "",
        "Design",
        new Date().getFullYear().toString(),
        index
      )
    )
    .join("\n");

  return `<!--$--><!--$-->${cards}<!--/$--><!--/$-->`;
}

function buildBrandsTicker(profile: ProfileData): string {
  const companies = profile.experience.map((e) => e.company).filter(Boolean);
  if (companies.length === 0) return "";

  const items = companies
    .concat(companies) // duplicate for seamless scroll
    .map(
      (c) =>
        `<li aria-hidden="true" style="flex-shrink:0;display:inline-flex;align-items:center;padding:0 18px;white-space:nowrap;font-family:'Inter Display',sans-serif;font-size:16px;font-weight:500;color:#333;">${esc(c)}</li>`
    )
    .join("");

  return `
<section style="display:flex;width:100%;place-items:center;mask-image:linear-gradient(to right,rgba(0,0,0,0) 0%,rgb(0,0,0) 12.5%,rgb(0,0,0) 87.5%,rgba(0,0,0,0) 100%);overflow:hidden;">
  <ul style="display:flex;width:100%;place-items:center;margin:0;padding:0;list-style:none;gap:18px;animation:tickerScroll 20s linear infinite;">
    ${items}
  </ul>
</section>
<style>
@keyframes tickerScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>`;
}

function replaceWorkWrapperContent(html: string, projectsHtml: string): string {
  const workWrapperStart = 'data-framer-name="work wrapper">';
  const wIdx = html.indexOf(workWrapperStart);
  if (wIdx === -1) return html;

  const contentStart = wIdx + workWrapperStart.length;
  
  let pos = contentStart;
  let depth = 1;
  while (depth > 0 && pos < html.length) {
    const nextOpen = html.indexOf("<div", pos);
    const nextClose = html.indexOf("</div>", pos);
    
    if (nextClose === -1) break;
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }
  
  if (depth === 0) {
    const wrapperEnd = pos - 6;
    return html.substring(0, contentStart) + projectsHtml + html.substring(wrapperEnd);
  }
  
  return html;
}

function wrapPlaceholderProjects(html: string): string {
  const workWrapperStart = 'data-framer-name="work wrapper">';
  const wIdx = html.indexOf(workWrapperStart);
  if (wIdx === -1) return html;

  const contentStart = wIdx + workWrapperStart.length;
  
  let pos = contentStart;
  let depth = 1;
  while (depth > 0 && pos < html.length) {
    const nextOpen = html.indexOf("<div", pos);
    const nextClose = html.indexOf("</div>", pos);
    
    if (nextClose === -1) break;
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }
  
  if (depth === 0) {
    const wrapperEnd = pos - 6;
    const innerContent = html.substring(contentStart, wrapperEnd);
    return html.substring(0, contentStart) + `<div data-editable-field="projects_list" style="display: contents;">` + innerContent + `</div>` + html.substring(wrapperEnd);
  }
  
  return html;
}

// ── Customization Defaults & Builders ────────────────────────────────────────

const DEFAULT_SERVICES = [
  { title: "Web design", price: "$1200", description: "I create visually appealing, responsive websites with clean layouts, ensuring engaging user experiences and professional digital presence." },
  { title: "UI/UX Design", price: "$1500", description: "I design intuitive user interfaces and seamless experiences, focusing on usability, accessibility, and modern aesthetics to improve user satisfaction." },
  { title: "Framer Development", price: "$1300", description: "I build interactive, high-performing websites in Framer, smooth animations, & fully responsive layouts tailored to your brand." },
  { title: "Mobile App Design", price: "$1600", description: "I design user mobile applications with functional layouts, engaging visuals, & optimized experiences for both iOS & Android platforms." },
  { title: "Branding & Identity", price: "$1000", description: "I craft unique brand identities including logos, typography, & guidelines, helping businesses stand out with consistency & strong visual presence." }
];

const DEFAULT_SERVICES_CTA = {
  title: "Book A 30 min Free Call",
  text: "Let’s connect to discuss your design needs, explore creative ideas, and plan your project effectively together.",
  buttonText: "Book A Call",
  buttonUrl: "#contact"
};

const DEFAULT_PROCESSES = [
  { stepTag: "/01", title: "Creative Discovery", description: "Through research and collaboration, we uncover goals, audience needs, and brand vision to build a solid creative foundation." },
  { stepTag: "/02", title: "Design Blueprint", description: "Transforming insights into structured wireframes and prototypes that guide visuals, user experience, and brand alignment seamlessly." },
  { stepTag: "/03", title: "Delivery & Launch", description: "Executing development and refined animations, ensuring cross-platform testing, and launching a high-performance experience." }
];

const DEFAULT_TESTIMONIALS = [
  { quote: "Daniel transformed our digital presence with stunning design and seamless usability. Working with him was a complete delight.", name: "James Walker", role: "Marketing Director, BrightEdge", avatarUrl: "/templates/daniel-cross/3R6WpHw2pAWlgNTDtMQICmJ9as.png" },
  { quote: "Professional, creative, & highly reliable. he delivered designs that exceeded expectations & strengthened our brand identity across platforms.", name: "Emily Harris", role: "Product Manager, Nexora", avatarUrl: "/templates/daniel-cross/6GdVor1G40eyD13tSRQ8IzSBQ.png" },
  { quote: "His attention to detail and ability to capture our vision in design made the entire process effortless, inspiring, and memorable.", name: "Oliver Bennett", role: "CEO, Innovent Solutions", avatarUrl: "/templates/daniel-cross/0gmxJBiUekQL1gjvN4nDfGCVIRE.webp" }
];

function buildServicesSection(profile: ProfileData): string {
  const services = profile.services && profile.services.length > 0 ? profile.services : DEFAULT_SERVICES;
  const cta = profile.servicesCta || DEFAULT_SERVICES_CTA;

  const cards = services.map((s, index) => `
<div class="ssr-variant" data-editable-field="service" data-editable-index="${index}">
  <div class="framer-1pxl5gq-container" data-framer-name="Service card" name="Service card" style="will-change: transform; opacity: 1; transform: none;">
    <div name="Service card" class="framer-VzKJz framer-jF71g framer-7fvNa framer-6tapR framer-1e9a2dx framer-v-1e9a2dx" data-framer-name="Service card" style="background-color: var(--token-1f466c1a-ea57-4ca6-b62a-278c9a994c3b, rgb(237, 234, 231)); width: 100%; border-radius: 10px; opacity: 1;">
      <div class="framer-1gbvodd" data-framer-name="Top text" style="opacity: 1;">
        <div class="framer-mkogse" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
          <p class="framer-text framer-styles-preset-tupu2d" data-styles-preset="gDmw1PFmz" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)))">${esc(s.title)}</p>
        </div>
        <div class="framer-12mw7zf" data-framer-name="Price tag" style="background-color: var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, rgb(74, 52, 41)); border-radius: 999px; opacity: 1;">
          <div class="framer-1opeho9" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-1nhui24" data-styles-preset="IfUNq__y7" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)))">${esc(s.price)}</p>
          </div>
        </div>
      </div>
      <div class="framer-18fafw1" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
        <p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm">${esc(s.description)}</p>
      </div>
    </div>
  </div>
</div>`).join("\n");

  const ctaCard = `
<div class="framer-qz5mfl" data-editable-field="servicesCta" data-framer-name="Services Contact card" style="will-change: transform; opacity: 1; transform: none;">
  <div class="framer-1pi5p4y" data-framer-name="Text wrapper">
    <div class="framer-z96g2q" data-framer-component-type="RichTextContainer" style="transform:none">
      <p class="framer-text framer-styles-preset-tupu2d" data-styles-preset="gDmw1PFmz">${esc(cta.title)}</p>
    </div>
    <div class="framer-pj0lb2" data-framer-component-type="RichTextContainer" style="transform:none">
      <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255))">${esc(cta.text)}</p>
    </div>
  </div>
  <!--$--><div class="ssr-variant"><div class="framer-qryzno-container" data-framer-name="Button" name="Button"><!--$--><a name="Button" class="framer-w0cQM framer-6tapR framer-12hwi5v framer-v-17sj5po framer-18lqbhu" data-framer-name="White" href="${esc(cta.buttonUrl || "#contact")}" style="background-color: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); width: 100%; border-radius: 6px; opacity: 1;"><div class="framer-1cl53n9" data-framer-name="Text" style="opacity: 1;"><div class="framer-1icur2i" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, rgb(74, 52, 41)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"><p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, rgb(74, 52, 41)))">${esc(cta.buttonText)}</p></div><div class="framer-dhttw8" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, rgb(74, 52, 41)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"><p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, rgb(74, 52, 41)))">${esc(cta.buttonText)}</p></div></div></a><!--/$--></div></div><!--/$-->
</div>`;

  return `<!--$--><!--$-->${cards}\n${ctaCard}<!--/$--><!--/$-->`;
}

function replaceServicesGridContent(html: string, servicesHtml: string): string {
  const marker = 'data-framer-name="Grid 3x">';
  const sIdx = html.indexOf(marker);
  if (sIdx === -1) return html;

  const contentStart = sIdx + marker.length;
  let pos = contentStart;
  let depth = 1;
  while (depth > 0 && pos < html.length) {
    const nextOpen = html.indexOf("<div", pos);
    const nextClose = html.indexOf("</div>", pos);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }

  if (depth === 0) {
    const wrapperEnd = pos - 6;
    return html.substring(0, contentStart) + servicesHtml + html.substring(wrapperEnd);
  }

  return html;
}

function buildProcessStepsSection(profile: ProfileData): string {
  const steps = profile.processes && profile.processes.length > 0 ? profile.processes : DEFAULT_PROCESSES;

  const cards = steps.map((s, idx) => {
    const stepName = `Step 0${idx + 1}`;
    return `
<div class="ssr-variant" data-editable-field="process" data-editable-index="${idx}">
  <div class="framer-h03gyd-container" data-framer-name="${esc(stepName)}" name="${esc(stepName)}" style="will-change: transform; opacity: 1; transform: none;">
    <div name="${esc(stepName)}" class="framer-euNV9 framer-jF71g framer-7fvNa framer-6tapR framer-mfpv4s framer-v-mfpv4s" data-border="true" data-framer-name="Process step" style="--1og3yzz: 0px 0px 24px 0px; --border-bottom-width: 1px; --border-color: var(--token-d14b4603-7c19-4eb1-a2c4-11c0d954f027, rgba(0, 0, 0, 0.1)); --border-left-width: 0px; --border-right-width: 0px; --border-style: solid; --border-top-width: 0px; width: 100%; opacity: 1;">
      <div class="framer-k69a0f" data-framer-name="Top text" style="opacity: 1;">
        <div class="framer-evo9ii" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
          <p class="framer-text framer-styles-preset-tupu2d" data-styles-preset="gDmw1PFmz" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)))">${esc(s.title)}</p>
        </div>
        <div class="framer-r79wk8" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
          <p class="framer-text framer-styles-preset-1nhui24" data-styles-preset="IfUNq__y7">${esc(s.stepTag)}</p>
        </div>
      </div>
      <div class="framer-dbu4a4" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
        <p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm">${esc(s.description)}</p>
      </div>
    </div>
  </div>
</div>`;
  }).join("\n");

  return `<!--$--><!--$-->${cards}<!--/$--><!--/$-->`;
}

function replaceProcessStepsContent(html: string, processHtml: string): string {
  const marker = 'data-framer-name="Process steps">';
  const pIdx = html.indexOf(marker);
  if (pIdx === -1) return html;

  const contentStart = pIdx + marker.length;
  let pos = contentStart;
  let depth = 1;
  while (depth > 0 && pos < html.length) {
    const nextOpen = html.indexOf("<div", pos);
    const nextClose = html.indexOf("</div>", pos);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }

  if (depth === 0) {
    const wrapperEnd = pos - 6;
    return html.substring(0, contentStart) + processHtml + html.substring(wrapperEnd);
  }

  return html;
}

function buildTestimonialsSection(profile: ProfileData): string {
  const testimonials = profile.testimonials && profile.testimonials.length > 0 ? profile.testimonials : DEFAULT_TESTIMONIALS;

  const cards = testimonials.map((t, idx) => {
    const defaultAvatars = [
      "/templates/daniel-cross/3R6WpHw2pAWlgNTDtMQICmJ9as.png",
      "/templates/daniel-cross/6GdVor1G40eyD13tSRQ8IzSBQ.png",
      "/templates/daniel-cross/0gmxJBiUekQL1gjvN4nDfGCVIRE.webp"
    ];
    const resolvedAvatar = t.avatarUrl || defaultAvatars[idx % 3];

    return `
<li style="display: contents;" data-editable-field="testimonial" data-editable-index="${idx}">
  <div class="framer-esrupl-container" data-framer-name="Reviews card" name="Reviews card" style="flex-shrink: 0; user-select: none; width: calc(33.3333% - 9.33333px); height: 100%; opacity: 1; visibility: visible; transform: none; transform-origin: 100% 50% 0px;" aria-hidden="true">
    <div name="Reviews card" class="framer-KjIJu framer-6tapR framer-5K3Le framer-ufx0vo framer-v-ufx0vo" data-framer-name="Reviews card" style="background-color: var(--token-1f466c1a-ea57-4ca6-b62a-278c9a994c3b, rgb(237, 234, 231)); width: 100%; border-radius: 16px; opacity: 1;">
      <div class="framer-1uws27r" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
        <p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm">${esc(t.quote)}</p>
      </div>
      <div class="framer-17i8f2v" data-framer-name="User wrapper" style="opacity: 1;">
        <div class="framer-2c4g0l" data-framer-name="Profile image" style="border-radius: 999px; opacity: 1;">
          <div style="position:absolute;border-radius:inherit;corner-shape:inherit;top:0;right:0;bottom:0;left:0" data-framer-background-image-wrapper="true">
            <img decoding="auto" src="${esc(resolvedAvatar)}" alt="" style="display:block;width:100%;height:100%;border-radius:inherit;corner-shape:inherit;object-position:center;object-fit:cover">
          </div>
        </div>
        <div class="framer-w6er8w" data-framer-name="Text" style="opacity: 1;">
          <div class="framer-dn64y5" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)))">${esc(t.name)}</p>
          </div>
          <div class="framer-t1h63y" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-13ef338a-a018-4b90-9b3e-7bf1136daf34, rgb(138, 138, 138)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-13ef338a-a018-4b90-9b3e-7bf1136daf34, rgb(138, 138, 138)))">${esc(t.role)}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</li>`;
  }).join("\n");

  return cards;
}

function replaceTestimonialsContent(html: string, testimonialsHtml: string): string {
  const marker = 'transform: translateX(-1214px);">';
  const tIdx = html.indexOf(marker);
  if (tIdx === -1) {
    const marker2 = 'transform: translateX(0px);">';
    const t2Idx = html.indexOf(marker2);
    if (t2Idx === -1) return html;
    
    const contentStart = t2Idx + marker2.length;
    const listEnd = html.indexOf("</ul>", contentStart);
    if (listEnd !== -1) {
      return html.substring(0, contentStart) + testimonialsHtml + html.substring(listEnd);
    }
    return html;
  }

  const contentStart = tIdx + marker.length;
  const listEnd = html.indexOf("</ul>", contentStart);
  if (listEnd !== -1) {
    return html.substring(0, contentStart) + testimonialsHtml + html.substring(listEnd);
  }
  return html;
}

// ── Client-side buildPreviewHtml function ───────────────────────────────────

function buildPreviewHtml(template: string, profile: ProfileData): string {
  let html = template;

  const replaceAll = (t: string, s: string, r: string) => t.split(s).join(r);

  // Fix asset paths
  html = replaceAll(
    html,
    "./Danielcross - Personal Portfolio Framer Template_files/",
    "/templates/daniel-cross/"
  );

  // Fix internal Framer navigation links
  html = replaceAll(html, "https://danielcross.framer.website/about", "#about");
  html = replaceAll(html, "https://danielcross.framer.website/work", "#work");
  html = replaceAll(html, "https://danielcross.framer.website/contact", "#contact");
  html = replaceAll(html, "https://danielcross.framer.website/", "#");

  // Page title
  html = replaceAll(html, "Danielcross - Personal Portfolio Framer Template", esc(`${profile.name} - Portfolio`));

  // Sidebar name wrapped for selection
  html = replaceAll(html, ">Daniel Cross<", `><span data-editable-field="name">${esc(profile.name)}</span><`);

  // Role / headline wrapped for selection
  html = replaceAll(html, ">ui/ux designer<", `><span data-editable-field="headline">${esc(profile.headline)}</span><`);

  // Hero Greeting words
  const firstName = profile.name.split(" ")[0];
  html = replaceAll(html, ">Hey,<", `><span data-editable-field="heroGreetingStart">${esc(profile.heroGreetingStart || "Hey,")}</span><`);
  html = replaceAll(html, ">daniel<", `><span data-editable-field="heroGreetingName">${esc(profile.heroGreetingName || firstName)}</span><`);
  html = replaceAll(html, ">here<", `><span data-editable-field="heroGreetingEnd">${esc(profile.heroGreetingEnd || "here")}</span><`);

  // Status and follow labels
  html = replaceAll(html, ">Available for work</p>", `><span data-editable-field="statusText">${esc(profile.statusText || "Available for work")}</span></p>`);
  html = replaceAll(html, ">Follow me</p>", `><span data-editable-field="followMeLabel">${esc(profile.followMeLabel || "Follow me")}</span></p>`);

  // Navigation Links Text Overrides
  html = replaceAll(html, ">Home<", `><span data-editable-field="navHomeText">${esc(profile.navHomeText || "Home")}</span><`);
  html = replaceAll(html, ">About<", `><span data-editable-field="navAboutText">${esc(profile.navAboutText || "About")}</span><`);
  html = replaceAll(html, ">Projects<", `><span data-editable-field="navProjectsText">${esc(profile.navProjectsText || "Projects")}</span><`);
  html = replaceAll(html, ">Contact<", `><span data-editable-field="navContactText">${esc(profile.navContactText || "Contact")}</span><`);

  // Footer Credit Details
  html = replaceAll(html, ">Template by </p>", `><span data-editable-field="footerCreditText">${esc(profile.footerCreditText || "Template by")}</span></p>`);
  html = replaceAll(html, ">Muddasir Hussain</a>", `><span data-editable-field="footerCreditName">${esc(profile.footerCreditName || "Muddasir Hussain")}</span></a>`);
  html = replaceAll(html, ">Built in</p>", `><span data-editable-field="builtInFramerText">${esc(profile.builtInFramerText || "Built in")}</span></p>`);
  html = replaceAll(html, ">Framer</a>", `><span data-editable-field="builtInFramerUrl">${esc(profile.builtInFramerUrl || "Framer")}</span></a>`);

  // About me paragraph wrapped for selection
  html = replaceAll(
    html,
    "I’m Daniel Cross, a passionate UI/UX Designer dedicated to crafting digital experiences that truly connect with people. With a focus on simplicity, usability, and creativity, I design products that not only look beautiful but also solve real problems. My approach blends strategy, design, and technology to transform ideas into meaningful solutions. Whether it’s designing intuitive interfaces, building websites, or shaping brand identities, I bring every project to life with precision and purpose.",
    `<span data-editable-field="summary">${esc(profile.summary)}</span>`
  );

  // Location wrapped for selection
  const location = profile.location || "Remote";
  html = replaceAll(html, ">Based in London-UK<", `><span data-editable-field="location">Based in ${esc(location)}</span><`);
  html = replaceAll(html, ">London-UK<", `><span data-editable-field="location">${esc(location)}</span><`);

  // Footer email wrapped for selection
  const emailLink = profile.links.find((l) => l.icon === "email");
  const email = emailLink ? emailLink.url.replace("mailto:", "") : "hello@example.com";
  const phone = profile.phone || "+44 7700 900123";
  html = replaceAll(html, 'href="mailto:hello@gmail.com"', `href="mailto:${esc(email)}"`);
  html = replaceAll(html, 'href="tel:+44 7700 900123"', `href="tel:${esc(phone)}"`);
  html = replaceAll(html, ">hello@gmail.com<", `><span data-editable-field="email">${esc(email)}</span><`);
  html = replaceAll(html, ">+44 7700 900123<", `><span data-editable-field="phone">${esc(phone)}</span><`);

  // Compile dynamic social links block
  const socialHtml = buildSocialLinksBlock(profile, true);
  html = replaceSocialLinksContent(html, socialHtml);

  // ─── 9.5 Custom Template Customizations ────────────────────────────────
  // Hero Badge
  const badgeText = profile.heroBadgeText || "Welcome here ❤️";
  html = replaceAll(html, "Welcome here ❤️", `<span data-editable-field="heroBadgeText">${esc(badgeText)}</span>`);

  // Hero subheadline words block
  const subheadlineText = profile.heroSubheadline || "I design Interfaces, experiences, & brands.";
  const words = subheadlineText.split(" ");
  const wordsHtml = words
    .map(
      (w) =>
        `<div class="ssr-variant" data-editable-field="heroSubheadline"><div style="opacity:1;transform:none;will-change:transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">${esc(w)}</h1></div></div>`
    )
    .join("");
  const originalWordsSequence = `</div></div><div class="framer-1q82b98" data-framer-appear-id="1q82b98" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">I</h1></div><div class="framer-a5yabo" data-framer-appear-id="a5yabo" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">design</h1></div><div class="framer-oik3st" data-framer-appear-id="oik3st" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">Interfaces,</h1></div><div class="framer-198z1h1" data-framer-appear-id="198z1h1" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">experiences,</h1></div><div class="framer-k25hut" data-framer-appear-id="k25hut" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">&amp;</h1></div><div class="framer-9xarsm" data-framer-appear-id="9xarsm" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">brands.</h1></div>`;
  html = replaceAll(html, originalWordsSequence, `</div></div>` + wordsHtml);

  // Hero CTA Button
  const heroCtaText = profile.heroCtaText || "Book A Call";
  const heroCtaUrl = profile.heroCtaUrl || "#contact";
  html = replaceAll(html, 'data-framer-name="Brown" href="https://danielcross.framer.website/contact"', `data-framer-name="Brown" data-editable-field="heroCtaUrl" href="${esc(heroCtaUrl)}"`);
  html = replaceAll(html, 'data-framer-name="Brown" href="#contact"', `data-framer-name="Brown" data-editable-field="heroCtaUrl" href="${esc(heroCtaUrl)}"`);
  html = replaceAll(html, "Book A Call", `<span data-editable-field="heroCtaText">${esc(heroCtaText)}</span>`);

  // Hero rating text
  html = replaceAll(html, "4.9 / 5", `<span data-editable-field="heroRatingText">${esc(profile.heroRatingText || "4.9 / 5")}</span>`);

  // Section Labels
  html = replaceAll(html, ">What I Do<", `><span data-editable-field="servicesLabel">${esc(profile.servicesLabel || "What I Do")}</span><`);
  html = replaceAll(html, ">About me<", `><span data-editable-field="aboutLabel">${esc(profile.aboutLabel || "About me")}</span><`);
  html = replaceAll(html, ">Worked with Global Brands<", `><span data-editable-field="brandsLabel">${esc(profile.brandsLabel || "Worked with Global Brands")}</span><`);
  html = replaceAll(html, ">My Portfolio<", `><span data-editable-field="projectsLabel">${esc(profile.projectsLabel || "My Portfolio")}</span><`);
  html = replaceAll(html, ">Every project built to inspire users<", `><span data-editable-field="projectsSubtitle">${esc(profile.projectsSubtitle || "Every project built to inspire users")}</span><`);

  // Projects list CTA button
  const exploreUrl = profile.projectsExploreUrl || "#work";
  html = replaceAll(html, 'data-framer-name="Brown" href="https://danielcross.framer.website/work"', `data-framer-name="Brown" data-editable-field="projectsExploreUrl" href="${esc(exploreUrl)}"`);
  html = replaceAll(html, 'data-framer-name="Brown" href="#work"', `data-framer-name="Brown" data-editable-field="projectsExploreUrl" href="${esc(exploreUrl)}"`);
  html = replaceAll(html, "Explore All", `<span data-editable-field="projectsExploreText">${esc(profile.projectsExploreText || "Explore All")}</span>`);

  html = replaceAll(html, ">My Process<", `><span data-editable-field="processLabel">${esc(profile.processLabel || "My Process")}</span><`);
  html = replaceAll(html, ">Reviews<", `><span data-editable-field="testimonialsLabel">${esc(profile.testimonialsLabel || "Reviews")}</span><`);
  html = replaceAll(html, ">Have a question<", `><span data-editable-field="footerLabel">${esc(profile.footerLabel || "Have a question")}</span><`);

  // Projects / Work cards section (replaces the entire placeholder cards inside the wrapper)
  if ((profile.projects || []).length > 0) {
    const projectsHtml = buildProjectsSection(profile);
    html = replaceWorkWrapperContent(html, projectsHtml);
  } else {
    html = wrapPlaceholderProjects(html);
  }

  // Brands ticker section wrapped in a selectable div
  const tickerMarker = 'data-framer-name="Ticker logos"';
  const tickerIdx = html.indexOf(tickerMarker);
  if (tickerIdx !== -1) {
    const tickerOpenEnd = html.indexOf(">", tickerIdx) + 1;
    const tickerClose = html.indexOf("<!--/$-->", tickerOpenEnd);
    if (tickerClose !== -1) {
      const tickerHtml = profile.experience.length > 0 ? buildBrandsTicker(profile) : html.substring(tickerOpenEnd, tickerClose);
      html = html.substring(0, tickerOpenEnd) + `<div data-editable-field="experience" style="width: 100%;">` + tickerHtml + `</div>` + html.substring(tickerClose);
    }
  }

  // Remove srcset overrides to force browser fallback to custom src
  html = html.replace(/srcset="[^"]*?6fz6fw6ZIqdfPnGjg9h6yUfYitE[^"]*?"/g, "");
  html = html.replace(/srcset="[^"]*?B3sqQm2pBUNJyRcswxM209Q[^"]*?"/g, "");
  html = html.replace(/srcset="[^"]*?8pmcaHy6B2IO4Rap9XhFCnzKA[^"]*?"/g, "");
  html = html.replace(/srcset="[^"]*?jI4zwMAO3uowSwVm4sMQEYbksMc[^"]*?"/g, "");
  html = html.replace(/srcset="[^"]*?MlC72sVCQio6ooebpIaFFKLOVDA[^"]*?"/g, "");
  html = html.replace(/srcset="[^"]*?tWZ2VFb5FDPeKYQ9yBBM9vYwvM[^"]*?"/g, "");
  html = html.replace(/srcset="[^"]*?9AC9XJeFmKrPFObuCUzsjnfqI[^"]*?"/g, "");
  html = html.replace(/srcset="[^"]*?9GBbApze5hUVXQgG9ZiXatQdLa0[^"]*?"/g, "");

  // Tag container divs with data-editable-field so they are easily clicked/selected in selection mode
  html = replaceAll(html, '<div class="framer-pnceva" data-framer-name="Profile image"', '<div class="framer-pnceva" data-framer-name="Profile image" data-editable-field="avatarUrl" data-editable-type="image"');
  
  // Tiny fan-out heading icons:
  html = replaceAll(html, '<div class="framer-1m8xtt5" data-framer-appear-id="1m8xtt5" data-framer-name="Image 01"', '<div class="framer-1m8xtt5" data-framer-appear-id="1m8xtt5" data-framer-name="Image 01" data-editable-field="bannerUrl" data-editable-type="image"');
  html = replaceAll(html, '<div class="framer-19db7zm" data-framer-appear-id="19db7zm" data-framer-name="Image 02"', '<div class="framer-19db7zm" data-framer-appear-id="19db7zm" data-framer-name="Image 02" data-editable-field="avatarUrl" data-editable-type="image"');
  html = replaceAll(html, '<div class="framer-yfhmy0" data-framer-appear-id="yfhmy0" data-framer-name="Image 03"', '<div class="framer-yfhmy0" data-framer-appear-id="yfhmy0" data-framer-name="Image 03" data-editable-field="aboutPhotoUrl" data-editable-type="image"');
  
  // Large hero image grid fans:
  html = replaceAll(html, '<div class="framer-1u0qqnx" data-framer-name="Image 01"', '<div class="framer-1u0qqnx" data-framer-name="Image 01" data-editable-field="aboutPhotoUrl" data-editable-type="image"');
  html = replaceAll(html, '<div class="framer-1i9qvch" data-framer-name="Image 02"', '<div class="framer-1i9qvch" data-framer-name="Image 02" data-editable-field="avatarUrl" data-editable-type="image"');
  html = replaceAll(html, '<div class="framer-nswwcw" data-framer-name="Image 03"', '<div class="framer-nswwcw" data-framer-name="Image 03" data-editable-field="bannerUrl" data-editable-type="image"');

  html = replaceAll(html, '<div class="framer-1npp3u0" data-framer-name="Main image"', '<div class="framer-1npp3u0" data-framer-name="Main image" data-editable-field="aboutPhotoUrl" data-editable-type="image"');
  html = replaceAll(html, '<div class="framer-12lay3g" data-framer-name="Signature"', '<div class="framer-12lay3g" data-framer-name="Signature" data-editable-field="signatureUrl" data-editable-type="image"');
  html = replaceAll(html, '<div class="framer-opxp2k"', '<div class="framer-opxp2k" data-editable-field="footerBannerUrl" data-editable-type="image"');

  // Replace avatars and banners src with logical fallbacks to prevent empty images
  const avatarPhoto = profile.avatarUrl;
  const bannerPhoto = profile.bannerUrl || profile.avatarUrl;
  const aboutPhoto = profile.aboutPhotoUrl || profile.bannerUrl || profile.avatarUrl;

  if (profile.avatarUrl) {
    html = replaceAll(html, "/templates/daniel-cross/6fz6fw6ZIqdfPnGjg9h6yUfYitE.jpg", esc(profile.avatarUrl));
  }
  if (avatarPhoto) {
    html = replaceAll(html, "/templates/daniel-cross/9AC9XJeFmKrPFObuCUzsjnfqI.png", esc(avatarPhoto));
  }
  if (bannerPhoto) {
    html = replaceAll(html, "/templates/daniel-cross/B3sqQm2pBUNJyRcswxM209Q.png", esc(bannerPhoto));
  }
  if (aboutPhoto) {
    html = replaceAll(html, "/templates/daniel-cross/tWZ2VFb5FDPeKYQ9yBBM9vYwvM.png", esc(aboutPhoto));
    html = replaceAll(html, "/templates/daniel-cross/9GBbApze5hUVXQgG9ZiXatQdLa0.png", esc(aboutPhoto));
  }

  // Replace custom section titles if provided, wrapped in spans
  if (profile.servicesTitle) {
    html = replaceAll(html, ">Turning ideas into digital experiences<", `><span data-editable-field="servicesTitle">${esc(profile.servicesTitle)}</span><`);
  } else {
    html = replaceAll(html, ">Turning ideas into digital experiences<", `><span data-editable-field="servicesTitle">Turning ideas into digital experiences</span><`);
  }
  if (profile.processTitle) {
    html = replaceAll(html, ">From ideas to impactful creative results.<", `><span data-editable-field="processTitle">${esc(profile.processTitle)}</span><`);
  } else {
    html = replaceAll(html, ">From ideas to impactful creative results.<", `><span data-editable-field="processTitle">From ideas to impactful creative results.</span><`);
  }
  if (profile.testimonialsTitle) {
    html = replaceAll(html, ">Voices of trust from happy clients<", `><span data-editable-field="testimonialsTitle">${esc(profile.testimonialsTitle)}</span><`);
  } else {
    html = replaceAll(html, ">Voices of trust from happy clients<", `><span data-editable-field="testimonialsTitle">Voices of trust from happy clients</span><`);
  }

  // Replace customizable images src if provided
  if (profile.aboutPhotoUrl) {
    html = replaceAll(html, "/templates/daniel-cross/8pmcaHy6B2IO4Rap9XhFCnzKA.png", esc(profile.aboutPhotoUrl));
  }
  if (profile.signatureUrl) {
    html = replaceAll(html, "/templates/daniel-cross/jI4zwMAO3uowSwVm4sMQEYbksMc.png", esc(profile.signatureUrl));
  }
  if (profile.footerBannerUrl) {
    html = replaceAll(html, "/templates/daniel-cross/MlC72sVCQio6ooebpIaFFKLOVDA.png", esc(profile.footerBannerUrl));
  }

  // Compile custom services
  const servicesHtml = buildServicesSection(profile);
  html = replaceServicesGridContent(html, servicesHtml);

  // Compile custom process steps
  const processHtml = buildProcessStepsSection(profile);
  html = replaceProcessStepsContent(html, processHtml);

  // Compile custom testimonials reviews
  const testimonialsHtml = buildTestimonialsSection(profile);
  html = replaceTestimonialsContent(html, testimonialsHtml);

  // Remove Framer badge
  html = html.replace(/<div id="__framer-badge-container"[\s\S]*?<\/div>/g, "");

  // Reset reviews slider starting translation to 0px so testimonials are visible by default
  html = replaceAll(html, "transform: translateX(-1214px);", "transform: translateX(0px);");

  // Injected CSS variables for custom colors theme override
  let colorStyles = "";
  if (profile.themeColors) {
    const { primaryBg, accentColor, cardBg, textPrimary, textMuted } = profile.themeColors;
    colorStyles = `
<style id="custom-theme-colors">
  body {
    ${primaryBg ? `--token-d469a4a3-0708-4dfe-8498-9b2828796a10: ${primaryBg} !important; --token-1d129b27-20b9-421b-bc87-4be93ee49891: ${primaryBg} !important;` : ""}
    ${accentColor ? `--token-09c1722d-5d82-4a0e-b304-abc5a551cacb: ${accentColor} !important;` : ""}
    ${cardBg ? `--token-1f466c1a-ea57-4ca6-b62a-278c9a994c3b: ${cardBg} !important;` : ""}
    ${textPrimary ? `--token-5b7978f2-455d-4675-a18c-26d9c3d422ca: ${textPrimary} !important;` : ""}
    ${textMuted ? `--token-13ef338a-a018-4b90-9b3e-7bf1136daf34: ${textMuted} !important;` : ""}
  }
</style>
`;
  }

  // Add custom responsive stylesheet overrides
  const responsiveStyles = `
<style data-custom-responsive="true">
  /* Complete sidebar removal overrides */
  .framer-11htobf,
  .framer-11htobf-container,
  [data-framer-name="Sidebar wrapper"],
  [data-framer-name="Sidebar"] {
    display: none !important;
  }
  
  .framer-NYla7 .framer-1qj9dji {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
  }

  .framer-NYla7 .framer-vprhwm {
    width: 100% !important;
    max-width: 100% !important;
    flex: 1 1 auto !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    margin: 0 auto !important;
  }
  
  .framer-DKwHu.framer-ha6joy {
    margin: 0 auto !important;
  }

  /* Base hidden class overrides */
  @media (max-width: 809.98px) {
    .hidden-18pvjnd {
      display: none !important;
    }
    /* Ensure testimonials slideshow variant remains visible */
    .framer-9ivh3c-container .hidden-18pvjnd {
      display: block !important;
    }
  }
  @media (min-width: 810px) and (max-width: 1199.98px) {
    .hidden-1bkts62 {
      display: none !important;
    }
    /* Ensure testimonials slideshow variant remains visible */
    .framer-9ivh3c-container .hidden-1bkts62 {
      display: block !important;
    }
  }

  /* Make containers fluid on screens smaller than desktop (1200px) */
  @media (max-width: 1199.98px) {
    .framer-NYla7.framer-nqzx6h {
      width: 100% !important;
      max-width: 100vw !important;
      overflow-x: hidden !important;
    }
    
    .framer-NYla7 .framer-1qj9dji {
      width: 100% !important;
      max-width: 100% !important;
    }
    
    .framer-NYla7 .framer-11htobf {
      max-width: 100% !important;
    }
    
    .framer-NYla7 .framer-vprhwm {
      width: 100% !important;
      max-width: 100% !important;
      flex: 1 1 auto !important;
    }

    .framer-DKwHu.framer-ha6joy {
      width: 100% !important;
      max-width: 100% !important;
      padding-left: 24px !important;
      padding-right: 24px !important;
    }
    
    .framer-cOcSQ.framer-ryc3c {
      width: 100% !important;
      max-width: 100% !important;
    }
    
    .framer-euNV9.framer-mfpv4s {
      width: 100% !important;
      max-width: 100% !important;
    }

    /* Testimonials slideshow responsive sizing & swipe adjustments */
    .framer-9ivh3c-container {
      height: auto !important;
      min-height: 280px !important;
    }
    .framer-9ivh3c-container section > div {
      overflow-x: auto !important;
      scroll-snap-type: x mandatory !important;
      -webkit-overflow-scrolling: touch !important;
      -ms-overflow-style: none !important;
      scrollbar-width: none !important;
    }
    .framer-9ivh3c-container section > div::-webkit-scrollbar {
      display: none !important;
    }
    
    .framer-esrupl-container,
    .framer-1x1fbg7-container,
    .framer-16lsjul-container {
      width: calc(50% - 7px) !important;
      height: auto !important;
      min-height: 240px !important;
      scroll-snap-align: start !important;
      flex-shrink: 0 !important;
    }
    .framer-KjIJu {
      height: 100% !important;
      min-height: 220px !important;
      box-sizing: border-box !important;
    }
  }

  /* Specific mobile-size adjustments (under 810px) */
  @media (max-width: 809.98px) {
    .framer-50OQE .framer-tfstyy-container {
      width: 100% !important;
      max-width: 100vw !important;
    }
    
    .framer-Cxj9g.framer-v-117swu5.framer-1g4vz55,
    .framer-Cxj9g.framer-v-tlavhy.framer-1g4vz55 {
      width: 100% !important;
      max-width: 100vw !important;
    }

    .framer-DKwHu.framer-v-1qhzu7s.framer-ha6joy {
      width: 100% !important;
      max-width: 100% !important;
      padding-left: 16px !important;
      padding-right: 16px !important;
    }

    .framer-DKwHu .framer-1bh76c {
      padding: 40px 16px !important;
    }

    .framer-9ivh3c-container {
      min-height: 320px !important;
    }
    .framer-esrupl-container,
    .framer-1x1fbg7-container,
    .framer-16lsjul-container {
      width: 100% !important;
      min-height: 280px !important;
    }
    .framer-KjIJu {
      min-height: 260px !important;
    }
  }
</style>
`;

  // Visual selection outline highlight overlay script inside iframe
  const selectionScripts = `
<style id="editable-highlight-styles">
  [data-editable-field] {
    transition: outline 0.15s ease-in-out, background-color 0.15s ease-in-out;
  }
  body.selection-mode-active * {
    pointer-events: none !important;
  }
  body.selection-mode-active [data-editable-field],
  body.selection-mode-active [data-editable-field] * {
    pointer-events: auto !important;
  }
  body.selection-mode-active [data-editable-field] {
    cursor: pointer !important;
    position: relative !important;
    z-index: 999999 !important;
  }
  body.selection-mode-active span[data-editable-field],
  body.selection-mode-active a[data-editable-field] {
    display: inline-block !important;
  }
  body.selection-mode-active [data-editable-field]:hover {
    outline: 2px solid #3b82f6 !important;
    outline-offset: 2px;
    background-color: rgba(59, 130, 246, 0.04) !important;
  }
  body.selection-mode-active [data-editable-field].selected-element {
    outline: 2px solid #2563eb !important;
    outline-offset: 2px;
    background-color: rgba(37, 99, 235, 0.08) !important;
  }
  [data-editable-field].step-highlight-active,
  div.step-highlight-active,
  section.step-highlight-active,
  ul.step-highlight-active,
  li.step-highlight-active {
    outline: 2px dashed #3b82f6 !important;
    outline-offset: 4px !important;
    background-color: rgba(59, 130, 246, 0.05) !important;
  }
</style>
<script id="editable-highlight-script">
  // Listen for selection mode updates from host
  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'SET_SELECTION_MODE') {
      if (e.data.active) {
        document.body.classList.add('selection-mode-active');
      } else {
        document.body.classList.remove('selection-mode-active');
        document.querySelectorAll('.selected-element').forEach(el => el.classList.remove('selected-element'));
      }
    }
    if (e.data && e.data.type === 'SET_SELECTED_FIELD') {
      document.querySelectorAll('.selected-element').forEach(el => el.classList.remove('selected-element'));
      const field = e.data.field;
      const index = e.data.index;
      if (field) {
        let selector = '[data-editable-field="' + field + '"]';
        if (index !== undefined && index !== null) {
          selector += '[data-editable-index="' + index + '"]';
        }
        const target = document.querySelector(selector);
        if (target) {
          target.classList.add('selected-element');
        }
      }
    }
    if (e.data && e.data.type === 'SCROLL_TO_SECTION') {
      const step = e.data.step;
      let target = null;
      if (step === 1) {
        target = document.querySelector('[data-editable-field="name"]') || document.body;
      } else if (step === 2) {
        target = document.querySelector('[data-editable-field="heroBadgeText"]') || document.querySelector('[data-editable-field="statusText"]') || document.body;
      } else if (step === 3) {
        target = document.querySelector('[data-editable-field="heroSubheadline"]') || document.body;
      } else if (step === 4) {
        target = document.querySelector('[data-framer-name="About"]') || document.querySelector('[data-editable-field="summary"]') || document.querySelector('[data-editable-field="aboutPhotoUrl"]');
      } else if (step === 5) {
        target = document.querySelector('[data-framer-name="Ticker logos"]') || document.querySelector('[data-editable-field="experience"]');
      } else if (step === 6) {
        target = document.querySelector('[data-framer-name="work wrapper"]') || document.querySelector('[data-editable-field="project"]');
      } else if (step === 7) {
        target = document.querySelector('[data-framer-name="Grid 3x"]') || document.querySelector('[data-editable-field="servicesTitle"]');
      } else if (step === 8) {
        target = document.querySelector('[data-editable-field="servicesCta"]') || document.querySelector('[data-framer-name="Services Contact card"]');
      } else if (step === 9) {
        target = document.querySelector('[data-framer-name="Process steps"]') || document.querySelector('[data-editable-field="processTitle"]');
      } else if (step === 10) {
        target = document.querySelector('[data-framer-name="Reviews card"]') || document.querySelector('[data-editable-field="testimonialsTitle"]');
      } else if (step === 11) {
        target = document.querySelector('[data-framer-name="Footer"]') || document.querySelector('[data-editable-field="email"]') || document.querySelector('[data-editable-field="phone"]');
      } else if (step === 12) {
        target = document.body;
      }
      
      // Clear previous active highlights
      document.querySelectorAll('.step-highlight-active').forEach(el => el.classList.remove('step-highlight-active'));
      
      if (target) {
        if (target !== document.body) {
          target.classList.add('step-highlight-active');
        }
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  // Capture clicks on customizable elements and post them to parent
  document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('selection-mode-active')) return;
    
    const target = e.target.closest('[data-editable-field]');
    if (target) {
      e.preventDefault();
      e.stopPropagation();
      
      const field = target.getAttribute('data-editable-field');
      const index = target.getAttribute('data-editable-index');
      
      document.querySelectorAll('.selected-element').forEach(el => el.classList.remove('selected-element'));
      target.classList.add('selected-element');
      
      window.parent.postMessage({
        type: 'ELEMENT_CLICKED',
        field: field,
        index: index ? parseInt(index, 10) : undefined
      }, '*');
    }
  }, true);
</script>
`;

  html = html.replace("</head>", `${responsiveStyles}${colorStyles}${selectionScripts}</head>`);

  // ─── 15. Conditional Section Removal ────────────────────────────────
  if (!profile.testimonials || profile.testimonials.length === 0) {
    html = removeHtmlSection(html, 'data-framer-name="Reviews"', 'section');
  }
  if (!profile.services || profile.services.length === 0) {
    html = removeHtmlSection(html, 'data-framer-name="Services"', 'section');
  }
  if (!profile.projects || profile.projects.length === 0) {
    html = removeHtmlSection(html, 'data-framer-name="Projects"', 'section');
  }

  const emailLinkForFooter = profile.links?.find((l) => l.icon === "email");
  const emailVal = profile.email || (emailLinkForFooter ? emailLinkForFooter.url.replace("mailto:", "") : "");
  const phoneVal = profile.phone || "";
  const hasLinks = profile.links && profile.links.length > 0;
  if (!emailVal && !phoneVal && !hasLinks) {
    html = removeHtmlSection(html, 'name="CTA &amp; Footer"', 'footer');
  }

  return html;
}

interface ProfilePreviewProps {
  profile: ProfileData;
  template: TemplateId;
  scale?: number;
  onFieldClick?: (fieldName: string, index?: number) => void;
  fluid?: boolean;
  isSelectionMode?: boolean;
  selectedField?: string | null;
  selectedIndex?: number;
  currentStep?: number;
}

// ── Main exported component ──────────────────────────────────────────────────
export default function ProfilePreview({
  profile,
  template,
  scale = 1,
  fluid = false,
  isSelectionMode = false,
  selectedField = null,
  selectedIndex,
  onFieldClick,
  currentStep,
}: ProfilePreviewProps) {
  const [rawTemplate, setRawTemplate] = useState<string | null>(null);
  const [compiledHtml, setCompiledHtml] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Fetch the raw template once
  useEffect(() => {
    fetch("/templates/daniel-cross.html")
      .then((r) => r.text())
      .then(setRawTemplate)
      .catch(() => {
        console.error("[ProfilePreview] Failed to load daniel-cross template");
      });
  }, []);

  // Re-compile whenever profile or raw template changes
  useEffect(() => {
    if (!rawTemplate) return;
    const html = buildPreviewHtml(rawTemplate, profile);
    setCompiledHtml(html);
  }, [rawTemplate, profile]);

  // Handle click captures from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "ELEMENT_CLICKED") {
        if (onFieldClick) {
          onFieldClick(event.data.field, event.data.index);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onFieldClick]);

  // Sync state to iframe when selection changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    
    iframe.contentWindow.postMessage({
      type: "SET_SELECTION_MODE",
      active: isSelectionMode
    }, "*");

    iframe.contentWindow.postMessage({
      type: "SET_SELECTED_FIELD",
      field: selectedField,
      index: selectedIndex
    }, "*");
  }, [isSelectionMode, selectedField, selectedIndex, compiledHtml]);

  // Send scroll command when currentStep changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage({
      type: "SCROLL_TO_SECTION",
      step: currentStep
    }, "*");
  }, [currentStep, compiledHtml]);

  const PREVIEW_W = 1200;
  const PREVIEW_H = 900;

  if (fluid) {
    return (
      <div className="w-full h-full">
        <iframe
          ref={iframeRef}
          srcDoc={compiledHtml || "<html><body style='display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#888;font-size:14px'>Loading preview…</body></html>"}
          className="w-full h-full border-0"
          style={{ height: "100%" }}
          sandbox="allow-same-origin allow-scripts"
          title="Profile Preview"
          onLoad={() => {
            const iframe = iframeRef.current;
            if (iframe && iframe.contentWindow) {
              iframe.contentWindow.postMessage({
                type: "SET_SELECTION_MODE",
                active: isSelectionMode
              }, "*");
              if (selectedField) {
                iframe.contentWindow.postMessage({
                  type: "SET_SELECTED_FIELD",
                  field: selectedField,
                  index: selectedIndex
                }, "*");
              }
              if (currentStep) {
                iframe.contentWindow.postMessage({
                  type: "SCROLL_TO_SECTION",
                  step: currentStep
                }, "*");
              }
            }
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-[16px] border border-[#E6E6E6] bg-[#e9e6e2]"
      style={{
        width: PREVIEW_W * scale,
        height: PREVIEW_H * scale,
      }}
    >
      {!compiledHtml && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-400 font-sans">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
            <span>Loading preview…</span>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        srcDoc={compiledHtml}
        style={{
          width: PREVIEW_W,
          height: PREVIEW_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          border: "none",
          display: "block",
        }}
        sandbox="allow-same-origin allow-scripts"
        title="Profile Preview"
        onLoad={() => {
          const iframe = iframeRef.current;
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
              type: "SET_SELECTION_MODE",
              active: isSelectionMode
            }, "*");
            if (selectedField) {
              iframe.contentWindow.postMessage({
                type: "SET_SELECTED_FIELD",
                field: selectedField,
                index: selectedIndex
              }, "*");
            }
            if (currentStep) {
              iframe.contentWindow.postMessage({
                type: "SCROLL_TO_SECTION",
                step: currentStep
              }, "*");
            }
          }
        }}
      />
    </div>
  );
}

```

---

## File: `app/editor/components/PropertiesPanel.tsx`

```tsx
"use client";

import React, { useRef } from "react";
import { ProfileData, ProfileExperience, ProfileLink, ProfileProject } from "@/shared/types";
import { 
  User, Briefcase, Link as LinkIcon, Folder, Plus, Trash2, 
  Wrench, MessageSquare, ArrowLeft, X, Palette, Image as ImageIcon, Upload 
} from "lucide-react";
import { toast } from "sonner";

interface PropertiesPanelProps {
  profile: ProfileData;
  selectedField: string | null;
  selectedIndex?: number;
  onChange: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
  onClose: () => void;
  onSelectField: (field: string | null, index?: number) => void;
}

export default function PropertiesPanel({
  profile,
  selectedField,
  selectedIndex,
  onChange,
  onClose,
  onSelectField,
}: PropertiesPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to handle local base64 image uploads
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    index?: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image file is too large (max 2MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (index !== undefined) {
        if (field === "projects") {
          const list = [...(profile.projects || [])];
          list[index] = { ...list[index], image: base64 };
          onChange("projects", list);
        } else if (field === "testimonials") {
          const list = [...(profile.testimonials || [])];
          list[index] = { ...list[index], avatarUrl: base64 };
          onChange("testimonials", list);
        }
      } else {
        onChange(field as any, base64);
      }
      toast.success("Image updated successfully!");
    };
    reader.readAsDataURL(file);
  };

  // Helper for updating theme colors
  const updateThemeColor = (key: string, value: string) => {
    const themeColors = profile.themeColors || {};
    onChange("themeColors", {
      ...themeColors,
      [key]: value,
    });
  };

  const resetThemeColors = () => {
    onChange("themeColors", undefined);
    toast.success("Theme colors reset to template defaults!");
  };

  // Helper to trigger file upload click
  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const themeColors = profile.themeColors || {};

  // Form wrappers and fields
  const renderProfileFields = () => (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Full Name</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Name"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Headline</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.headline}
          onChange={(e) => onChange("headline", e.target.value)}
          placeholder="Role or headline"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Location</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.location ?? "London-UK"}
          onChange={(e) => onChange("location", e.target.value)}
          placeholder="London-UK"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Summary / Bio</label>
        <textarea
          className="min-h-[120px] border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl p-3.5 text-sm transition-colors outline-none resize-none leading-relaxed"
          value={profile.summary}
          onChange={(e) => onChange("summary", e.target.value)}
          placeholder="Write your professional bio..."
          rows={4}
        />
      </div>
    </div>
  );

  const renderGraphicsFields = (activeField: string) => {
    const graphics = [
      { id: "avatarUrl", label: "Profile Avatar Image", value: profile.avatarUrl },
      { id: "bannerUrl", label: "Hero Portrait Photo", value: profile.bannerUrl || profile.avatarUrl },
      { id: "aboutPhotoUrl", label: "About Section Portrait", value: profile.aboutPhotoUrl },
      { id: "signatureUrl", label: "Handwritten Signature", value: profile.signatureUrl },
      { id: "footerBannerUrl", label: "Footer Work Banner Background", value: profile.footerBannerUrl }
    ];

    const currentImg = graphics.find(g => g.id === activeField) || graphics[0];

    return (
      <div className="space-y-5 animate-in fade-in duration-200 text-left">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">{currentImg.label}</label>
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 flex flex-col items-center gap-3">
            {currentImg.value ? (
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-neutral-200/80 shadow-sm bg-white flex items-center justify-center">
                <img src={currentImg.value} alt={currentImg.label} className="w-full h-full object-cover" />
                <button
                  onClick={() => onChange(currentImg.id as any, "")}
                  className="absolute top-1 right-1 w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center active:scale-95 shadow-md border-none"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center text-neutral-400 select-none">
                <ImageIcon className="w-8 h-8 stroke-[1.25]" />
                <span className="text-[10px] mt-1.5 font-medium">No image URL</span>
              </div>
            )}

            <div className="flex gap-2 w-full mt-1">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => handleImageUpload(e, currentImg.id)}
                className="hidden"
              />
              <button
                onClick={triggerImageUpload}
                className="flex-1 h-9 bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform duration-100 shadow-sm hover:bg-neutral-800 cursor-pointer border-none"
              >
                <Upload className="w-3.5 h-3.5" /> Upload File
              </button>
              {currentImg.value && (
                <button
                  onClick={() => onChange(currentImg.id as any, "")}
                  className="h-9 px-3 border border-neutral-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-neutral-700 bg-white rounded-lg text-xs font-semibold active:scale-[0.97] transition-all"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Image URL Override</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-xs transition-colors outline-none font-mono"
            value={currentImg.value || ""}
            onChange={(e) => onChange(currentImg.id as any, e.target.value)}
            placeholder="https://images.unsplash.com/... or data:image/png;base64,..."
          />
        </div>
      </div>
    );
  };

  const renderColorPalette = () => (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Accent Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={themeColors.accentColor || "#4a3429"}
              onChange={(e) => updateThemeColor("accentColor", e.target.value)}
              className="w-8 h-8 rounded-lg border border-neutral-200 cursor-pointer overflow-hidden p-0 shrink-0 bg-transparent"
            />
            <input
              type="text"
              value={themeColors.accentColor || "#4a3429"}
              onChange={(e) => updateThemeColor("accentColor", e.target.value)}
              className="w-full h-8 text-[11px] border border-neutral-200 rounded-lg px-2 outline-none font-mono"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={themeColors.primaryBg || "#e9e6e2"}
              onChange={(e) => updateThemeColor("primaryBg", e.target.value)}
              className="w-8 h-8 rounded-lg border border-neutral-200 cursor-pointer overflow-hidden p-0 shrink-0 bg-transparent"
            />
            <input
              type="text"
              value={themeColors.primaryBg || "#e9e6e2"}
              onChange={(e) => updateThemeColor("primaryBg", e.target.value)}
              className="w-full h-8 text-[11px] border border-neutral-200 rounded-lg px-2 outline-none font-mono"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Card Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={themeColors.cardBg || "#edeae7"}
              onChange={(e) => updateThemeColor("cardBg", e.target.value)}
              className="w-8 h-8 rounded-lg border border-neutral-200 cursor-pointer overflow-hidden p-0 shrink-0 bg-transparent"
            />
            <input
              type="text"
              value={themeColors.cardBg || "#edeae7"}
              onChange={(e) => updateThemeColor("cardBg", e.target.value)}
              className="w-full h-8 text-[11px] border border-neutral-200 rounded-lg px-2 outline-none font-mono"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={themeColors.textPrimary || "#000000"}
              onChange={(e) => updateThemeColor("textPrimary", e.target.value)}
              className="w-8 h-8 rounded-lg border border-neutral-200 cursor-pointer overflow-hidden p-0 shrink-0 bg-transparent"
            />
            <input
              type="text"
              value={themeColors.textPrimary || "#000000"}
              onChange={(e) => updateThemeColor("textPrimary", e.target.value)}
              className="w-full h-8 text-[11px] border border-neutral-200 rounded-lg px-2 outline-none font-mono"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 text-left">
        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Secondary Text Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={themeColors.textMuted || "#8a8a8a"}
            onChange={(e) => updateThemeColor("textMuted", e.target.value)}
            className="w-8 h-8 rounded-lg border border-neutral-200 cursor-pointer overflow-hidden p-0 shrink-0 bg-transparent"
          />
          <input
            type="text"
            value={themeColors.textMuted || "#8a8a8a"}
            onChange={(e) => updateThemeColor("textMuted", e.target.value)}
            className="w-full h-8 text-[11px] border border-neutral-200 rounded-lg px-2 outline-none font-mono"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-neutral-100 flex gap-2">
        <button
          onClick={resetThemeColors}
          className="flex-1 h-9 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 bg-white rounded-lg text-xs font-semibold active:scale-[0.97]"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );

  const renderProjectEditor = (idx: number) => {
    const list = profile.projects || [];
    const proj = list[idx];

    if (!proj) {
      return (
        <div className="text-sm text-neutral-500 py-4">Project not found</div>
      );
    }

    const updateProjField = (key: keyof ProfileProject, value: string) => {
      const next = [...list];
      next[idx] = { ...next[idx], [key]: value };
      onChange("projects", next);
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left">
        <button
          onClick={() => onSelectField("projects_list")}
          className="h-8 px-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-semibold flex items-center gap-1 active:scale-[0.97] transition-all border-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to projects list
        </button>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Project Title</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={proj.title}
            onChange={(e) => updateProjField("title", e.target.value)}
            placeholder="Title"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Link / URL</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-xs transition-colors outline-none font-mono"
            value={proj.link || ""}
            onChange={(e) => updateProjField("link", e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Project Cover Image</label>
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 flex flex-col items-center gap-3">
            {proj.image ? (
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-neutral-200 shadow-sm bg-white">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-full aspect-[16/10] rounded-xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center text-neutral-400 select-none">
                <ImageIcon className="w-8 h-8 stroke-[1.25]" />
                <span className="text-[10px] mt-1.5 font-medium">No image uploaded</span>
              </div>
            )}

            <div className="flex gap-2 w-full mt-1">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "projects", idx)}
                className="hidden"
              />
              <button
                onClick={triggerImageUpload}
                className="flex-1 h-9 bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform duration-100 shadow-sm hover:bg-neutral-800 cursor-pointer border-none"
              >
                <Upload className="w-3.5 h-3.5" /> Upload File
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Image URL Override</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-xs transition-colors outline-none font-mono"
            value={proj.image || ""}
            onChange={(e) => updateProjField("image", e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="pt-2 border-t border-neutral-100 flex gap-2">
          <button
            onClick={() => {
              const next = list.filter((_, i) => i !== idx);
              onChange("projects", next);
              onSelectField("projects_list");
              toast.success("Project deleted successfully");
            }}
            className="flex-1 h-10 border border-red-200 text-red-600 bg-white hover:bg-red-50 rounded-xl text-xs font-semibold active:scale-[0.97] transition-all flex items-center justify-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete Project
          </button>
        </div>
      </div>
    );
  };

  const renderProjectsList = () => {
    const list = profile.projects || [];
    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Project Cards ({list.length})</span>
          <button
            onClick={() => {
              const next = [
                ...list,
                {
                  title: "New Project",
                  description: "Design description",
                  link: "#",
                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60"
                }
              ];
              onChange("projects", next);
              onSelectField("project", next.length - 1);
              toast.success("New project added! Customizing...");
            }}
            className="h-8 px-2.5 bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 active:scale-[0.97] cursor-pointer border-none"
          >
            <Plus className="w-3.5 h-3.5" /> Add Project
          </button>
        </div>

        <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
          {list.map((proj, idx) => (
            <div
              key={idx}
              onClick={() => onSelectField("project", idx)}
              className="p-3 bg-neutral-50/50 hover:bg-neutral-50 border border-neutral-200/60 rounded-xl flex items-center justify-between cursor-pointer group active:scale-[0.99] transition-transform duration-100 text-left"
            >
              <div className="flex items-center gap-3 min-w-0 pr-4">
                {proj.image ? (
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-neutral-200 shrink-0">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200">
                    <Folder className="w-4 h-4 text-neutral-400" />
                  </div>
                )}
                <div className="truncate">
                  <span className="text-xs font-bold text-neutral-800 block truncate">{proj.title}</span>
                  <span className="text-[10px] text-neutral-400 block truncate mt-0.5 font-mono">{proj.link || "No URL link"}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const next = list.filter((_, i) => i !== idx);
                  onChange("projects", next);
                  toast.success("Project deleted");
                }}
                className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-650 p-1 rounded-lg transition-opacity duration-100 border-none bg-transparent"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {list.length === 0 && (
            <div className="text-center py-8 text-xs text-neutral-400 italic">No projects found. Add one above!</div>
          )}
        </div>
      </div>
    );
  };

  const renderExperienceList = () => {
    const list = profile.experience || [];

    const updateExpItem = (idx: number, field: keyof ProfileExperience, val: string) => {
      const next = [...list];
      next[idx] = { ...next[idx], [field]: val };
      onChange("experience", next);
    };

    const addExp = () => {
      const next = [
        ...list,
        {
          title: "Senior Lead Designer",
          company: "Workspace",
          duration: "2024 – Present",
          description: "Responsible for leading team deliverables and prototypes."
        }
      ];
      onChange("experience", next);
      toast.success("Added new work experience!");
    };

    const removeExp = (idx: number) => {
      const next = list.filter((_, i) => i !== idx);
      onChange("experience", next);
      toast.success("Removed work experience");
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide font-inter">Work Timeline ({list.length})</span>
          <button
            onClick={addExp}
            className="h-8 px-2.5 bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 active:scale-[0.97] cursor-pointer border-none"
          >
            <Plus className="w-3.5 h-3.5" /> Add Job
          </button>
        </div>

        <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
          {list.map((exp, idx) => (
            <div key={idx} className="group bg-neutral-50/20 hover:bg-neutral-50/50 border border-neutral-200 rounded-xl p-3.5 space-y-3 relative transition-colors duration-150">
              <button
                onClick={() => removeExp(idx)}
                className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1.5 rounded-lg border border-neutral-200/50 bg-white hover:bg-red-50 text-neutral-400 hover:text-red-650 active:scale-95 transition-all shadow-xs border-none"
                title="Delete item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Job Title</label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => updateExpItem(idx, "title", e.target.value)}
                    className="h-9 text-xs border border-neutral-200 rounded-lg px-2.5 bg-white outline-none focus:border-neutral-400"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExpItem(idx, "company", e.target.value)}
                    className="h-9 text-xs border border-neutral-200 rounded-lg px-2.5 bg-white outline-none focus:border-neutral-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Duration / Dates</label>
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => updateExpItem(idx, "duration", e.target.value)}
                  className="h-9 text-xs border border-neutral-200 rounded-lg px-2.5 bg-white outline-none focus:border-neutral-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Job Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExpItem(idx, "description", e.target.value)}
                  className="text-xs border border-neutral-200 rounded-lg p-2 bg-white resize-none leading-relaxed focus:border-neutral-400 h-16 outline-none"
                  rows={2}
                />
              </div>
            </div>
          ))}

          {list.length === 0 && (
            <div className="text-center py-6 text-xs text-neutral-400 italic">No work history found. Add one above!</div>
          )}
        </div>
      </div>
    );
  };

  const renderServicesEditor = (idx?: number) => {
    const list = profile.services || [];
    const cta = profile.servicesCta || {
      title: "Book A 30 min Free Call",
      text: "Let’s connect to discuss your design needs, explore creative ideas, and plan your project effectively together.",
      buttonText: "Book A Call",
      buttonUrl: "#contact"
    };

    const updateServiceField = (sIdx: number, field: string, val: string) => {
      const next = [...list];
      next[sIdx] = { ...next[sIdx], [field]: val };
      onChange("services", next);
    };

    const addServiceItem = () => {
      const next = [
        ...list,
        { title: "New Service Offered", price: "$400", description: "Design package description." }
      ];
      onChange("services", next);
      toast.success("Service card added successfully!");
    };

    const removeServiceItem = (sIdx: number) => {
      const next = list.filter((_, i) => i !== sIdx);
      onChange("services", next);
      toast.success("Service card removed");
    };

    const updateCta = (field: string, val: string) => {
      onChange("servicesCta", {
        ...cta,
        [field]: val
      });
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left pr-1" style={{ scrollbarWidth: "none" }}>
        
        {/* Services Section Title */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Section Headline</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.servicesTitle || ""}
            onChange={(e) => onChange("servicesTitle", e.target.value)}
            placeholder="Turning ideas into digital experiences"
          />
        </div>

        {/* Services List cards */}
        <div className="pt-2 border-t border-neutral-100 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Service Cards ({list.length})</span>
            <button
              onClick={addServiceItem}
              className="h-7 px-2 bg-neutral-900 text-white rounded-lg text-[10.5px] font-bold flex items-center gap-1 active:scale-[0.97] border-none cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Add Card
            </button>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
            {list.map((srv, sIdx) => {
              const isSelected = selectedField === "service" && selectedIndex === sIdx;
              return (
                <div key={sIdx} className={`p-3 border rounded-xl space-y-2 relative transition-all group ${
                  isSelected ? "border-blue-500 bg-blue-50/10" : "border-neutral-200 bg-neutral-50/10"
                }`}>
                  <button
                    onClick={() => removeServiceItem(sIdx)}
                    className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 text-neutral-400 hover:text-red-650 border-none bg-transparent cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={srv.title}
                      placeholder="Title"
                      onChange={(e) => updateServiceField(sIdx, "title", e.target.value)}
                      className="col-span-2 h-8 text-xs border border-neutral-200 rounded-lg px-2 bg-white outline-none"
                    />
                    <input
                      type="text"
                      value={srv.price}
                      placeholder="Price"
                      onChange={(e) => updateServiceField(sIdx, "price", e.target.value)}
                      className="h-8 text-xs border border-neutral-200 rounded-lg px-2 bg-white outline-none text-right font-mono"
                    />
                  </div>
                  <textarea
                    value={srv.description}
                    placeholder="Brief description of deliverables..."
                    onChange={(e) => updateServiceField(sIdx, "description", e.target.value)}
                    className="w-full text-xs border border-neutral-200 rounded-lg p-2 bg-white resize-none outline-none"
                    rows={2}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Card Offer */}
        <div className="pt-3 border-t border-neutral-100 space-y-3.5">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide block">Call-To-Action Offer Block</span>
          <div className="p-3.5 bg-neutral-50/30 border border-neutral-200 rounded-xl space-y-3">
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">CTA Title</label>
              <input
                type="text"
                value={cta.title}
                onChange={(e) => updateCta("title", e.target.value)}
                className="h-9 text-xs border border-neutral-200 rounded-lg px-2.5 bg-white outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">CTA Description Text</label>
              <textarea
                value={cta.text}
                onChange={(e) => updateCta("text", e.target.value)}
                className="text-xs border border-neutral-200 rounded-lg p-2 bg-white resize-none h-16 outline-none leading-relaxed"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">Button Label</label>
                <input
                  type="text"
                  value={cta.buttonText}
                  onChange={(e) => updateCta("buttonText", e.target.value)}
                  className="h-9 text-xs border border-neutral-200 rounded-lg px-2.5 bg-white outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">Button Link / URL</label>
                <input
                  type="text"
                  value={cta.buttonUrl}
                  onChange={(e) => updateCta("buttonUrl", e.target.value)}
                  className="h-9 text-[11px] border border-neutral-200 rounded-lg px-2 bg-white outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProcessEditor = () => {
    const list = profile.processes || [];

    const updateStepField = (idx: number, field: string, val: string) => {
      const next = [...list];
      next[idx] = { ...next[idx], [field]: val };
      onChange("processes", next);
    };

    const addStep = () => {
      const stepsCount = list.length;
      const next = [
        ...list,
        { stepTag: `/0${stepsCount + 1}`, title: "New Step Title", description: "Design phase details." }
      ];
      onChange("processes", next);
      toast.success("Process step added successfully!");
    };

    const removeStep = (idx: number) => {
      const next = list.filter((_, i) => i !== idx);
      onChange("processes", next);
      toast.success("Process step removed");
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Section Headline</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.processTitle || ""}
            onChange={(e) => onChange("processTitle", e.target.value)}
            placeholder="From ideas to impactful creative results."
          />
        </div>

        <div className="pt-2 border-t border-neutral-100 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Process Steps ({list.length})</span>
            <button
              onClick={addStep}
              className="h-7 px-2.5 bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 active:scale-[0.97] border-none cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Step
            </button>
          </div>

          <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
            {list.map((step, idx) => (
              <div key={idx} className="group bg-neutral-50/20 hover:bg-neutral-50/50 border border-neutral-200 rounded-xl p-3.5 space-y-2.5 relative transition-colors">
                <button
                  onClick={() => removeStep(idx)}
                  className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 text-neutral-400 hover:text-red-650 border-none bg-transparent cursor-pointer"
                  title="Remove step"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="grid grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={step.stepTag}
                    placeholder="/01"
                    onChange={(e) => updateStepField(idx, "stepTag", e.target.value)}
                    className="h-8 text-xs border border-neutral-200 rounded-lg px-2 bg-white outline-none font-mono text-center"
                  />
                  <input
                    type="text"
                    value={step.title}
                    placeholder="Step Title"
                    onChange={(e) => updateStepField(idx, "title", e.target.value)}
                    className="col-span-3 h-8 text-xs border border-neutral-200 rounded-lg px-2.5 bg-white outline-none font-semibold"
                  />
                </div>
                <textarea
                  value={step.description}
                  placeholder="Phase details description..."
                  onChange={(e) => updateStepField(idx, "description", e.target.value)}
                  className="w-full text-xs border border-neutral-200 rounded-lg p-2 bg-white resize-none outline-none leading-relaxed"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTestimonialsEditor = () => {
    const list = profile.testimonials || [];

    const updateTestimonialField = (idx: number, field: string, val: string) => {
      const next = [...list];
      next[idx] = { ...next[idx], [field]: val };
      onChange("testimonials", next);
    };

    const addReview = () => {
      const next = [
        ...list,
        { quote: "Outstanding work and communication.", name: "Client Name", role: "CEO, Innovent", avatarUrl: "" }
      ];
      onChange("testimonials", next);
      toast.success("Review card added!");
    };

    const removeReview = (idx: number) => {
      const next = list.filter((_, i) => i !== idx);
      onChange("testimonials", next);
      toast.success("Review card removed");
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Section Headline</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.testimonialsTitle || ""}
            onChange={(e) => onChange("testimonialsTitle", e.target.value)}
            placeholder="Voices of trust from happy clients"
          />
        </div>

        <div className="pt-2 border-t border-neutral-100 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Client Testimonials ({list.length})</span>
            <button
              onClick={addReview}
              className="h-7 px-2.5 bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 active:scale-[0.97] border-none cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Review
            </button>
          </div>

          <div className="space-y-3.5 max-h-[440px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
            {list.map((review, idx) => (
              <div key={idx} className="group bg-neutral-50/20 hover:bg-neutral-50/50 border border-neutral-200 rounded-xl p-3.5 space-y-2.5 relative transition-colors">
                <button
                  onClick={() => removeReview(idx)}
                  className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 text-neutral-400 hover:text-red-650 border-none bg-transparent cursor-pointer"
                  title="Remove review"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Quote / Feedback</label>
                  <textarea
                    value={review.quote}
                    onChange={(e) => updateTestimonialField(idx, "quote", e.target.value)}
                    className="text-xs border border-neutral-200 rounded-lg p-2.5 bg-white resize-none outline-none leading-relaxed h-16"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Client Name</label>
                    <input
                      type="text"
                      value={review.name}
                      onChange={(e) => updateTestimonialField(idx, "name", e.target.value)}
                      className="h-8 text-xs border border-neutral-200 rounded-lg px-2 bg-white outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Client Role</label>
                    <input
                      type="text"
                      value={review.role}
                      onChange={(e) => updateTestimonialField(idx, "role", e.target.value)}
                      className="h-8 text-xs border border-neutral-200 rounded-lg px-2 bg-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Client Avatar Photo</label>
                  <div className="flex items-center gap-3 bg-neutral-50/50 p-2 border border-neutral-200 rounded-lg">
                    {review.avatarUrl ? (
                      <img src={review.avatarUrl} alt={review.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200">
                        <ImageIcon className="w-4 h-4 text-neutral-400" />
                      </div>
                    )}
                    <input
                      type="file"
                      id={`file-review-${idx}`}
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "testimonials", idx)}
                      className="hidden"
                    />
                    <button
                      onClick={() => document.getElementById(`file-review-${idx}`)?.click()}
                      className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 rounded text-[10.5px] font-bold transition-all border-none cursor-pointer"
                    >
                      Upload File
                    </button>
                    <input
                      type="text"
                      value={review.avatarUrl || ""}
                      placeholder="Or paste URL"
                      onChange={(e) => updateTestimonialField(idx, "avatarUrl", e.target.value)}
                      className="flex-1 h-7 text-[10.5px] border border-neutral-200 rounded px-2 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderLinksEditor = () => {
    const list = profile.links || [];

    const updateLinkItem = (idx: number, field: keyof ProfileLink, val: string) => {
      const next = [...list];
      next[idx] = { ...next[idx], [field]: val };
      onChange("links", next);
    };

    const addLinkItem = () => {
      const next = [
        ...list,
        { label: "Website", url: "https://", icon: "website" as const }
      ];
      onChange("links", next);
      toast.success("Added new profile link!");
    };

    const removeLinkItem = (idx: number) => {
      const next = list.filter((_, i) => i !== idx);
      onChange("links", next);
      toast.success("Link removed");
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left">
        <div className="flex flex-col gap-1 pb-4 border-b border-neutral-100">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Phone Number</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+44 7700 900123"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Social & Portfolio Links ({list.length})</span>
          <button
            onClick={addLinkItem}
            className="h-8 px-2.5 bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 active:scale-[0.97] cursor-pointer border-none"
          >
            <Plus className="w-3.5 h-3.5" /> Add Link
          </button>
        </div>

        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
          {list.map((lnk, idx) => (
            <div key={idx} className="group bg-neutral-50/20 hover:bg-neutral-50/50 border border-neutral-200 rounded-xl p-3 space-y-2.5 relative transition-colors">
              <button
                onClick={() => removeLinkItem(idx)}
                className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 text-neutral-400 hover:text-red-650 border-none bg-transparent cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">Label</label>
                  <input
                    type="text"
                    value={lnk.label}
                    onChange={(e) => updateLinkItem(idx, "label", e.target.value)}
                    className="h-9 text-xs border border-neutral-200 rounded-lg px-2.5 bg-white outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">Icon Type</label>
                  <select
                    value={lnk.icon || "other"}
                    onChange={(e) => updateLinkItem(idx, "icon", e.target.value as any)}
                    className="h-9 text-xs border border-neutral-200 rounded-lg px-2 bg-white outline-none"
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter / X</option>
                    <option value="github">GitHub</option>
                    <option value="website">Website</option>
                    <option value="email">Email</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">URL Link</label>
                <input
                  type="text"
                  value={lnk.url}
                  onChange={(e) => updateLinkItem(idx, "url", e.target.value)}
                  className="h-9 text-[11px] border border-neutral-200 rounded-lg px-2.5 bg-white font-mono outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHeroFields = () => {
    const firstName = profile.name ? profile.name.split(" ")[0].toLowerCase() : "daniel";
    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Hero Badge Text</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.heroBadgeText ?? "Welcome here ❤️"}
            onChange={(e) => onChange("heroBadgeText", e.target.value)}
            placeholder="Welcome here ❤️"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Greeting Start</label>
            <input
              type="text"
              className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-2 text-xs transition-colors outline-none"
              value={profile.heroGreetingStart ?? "Hey,"}
              onChange={(e) => onChange("heroGreetingStart", e.target.value)}
              placeholder="Hey,"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Name Text</label>
            <input
              type="text"
              className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-2 text-xs transition-colors outline-none"
              value={profile.heroGreetingName ?? firstName}
              onChange={(e) => onChange("heroGreetingName", e.target.value)}
              placeholder="daniel"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Greeting End</label>
            <input
              type="text"
              className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-2 text-xs transition-colors outline-none"
              value={profile.heroGreetingEnd ?? "here"}
              onChange={(e) => onChange("heroGreetingEnd", e.target.value)}
              placeholder="here"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Hero Subheadline (Inline Wrap)</label>
          <textarea
            className="min-h-[80px] border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl p-3.5 text-sm transition-colors outline-none resize-none leading-relaxed"
            value={profile.heroSubheadline ?? "I design Interfaces, experiences, & brands."}
            onChange={(e) => onChange("heroSubheadline", e.target.value)}
            placeholder="I design Interfaces, experiences, & brands."
            rows={3}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Hero CTA Button Text</label>
            <input
              type="text"
              className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
              value={profile.heroCtaText ?? "Book A Call"}
              onChange={(e) => onChange("heroCtaText", e.target.value)}
              placeholder="Book A Call"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Hero CTA Button Link</label>
            <input
              type="text"
              className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none font-mono"
              value={profile.heroCtaUrl ?? "#contact"}
              onChange={(e) => onChange("heroCtaUrl", e.target.value)}
              placeholder="#contact"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Hero Rating Text</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.heroRatingText ?? "4.9 / 5"}
            onChange={(e) => onChange("heroRatingText", e.target.value)}
            placeholder="4.9 / 5"
          />
        </div>
      </div>
    );
  };

  const renderLabelsFields = () => (
    <div className="space-y-4 animate-in fade-in duration-200 text-left max-h-[580px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Services Tag Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.servicesLabel ?? "What I Do"}
          onChange={(e) => onChange("servicesLabel", e.target.value)}
          placeholder="What I Do"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">About Section Tag Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.aboutLabel ?? "About me"}
          onChange={(e) => onChange("aboutLabel", e.target.value)}
          placeholder="About me"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Brands Ticker Tag Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.brandsLabel ?? "Worked with Global Brands"}
          onChange={(e) => onChange("brandsLabel", e.target.value)}
          placeholder="Worked with Global Brands"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Projects Section Tag Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.projectsLabel ?? "My Portfolio"}
          onChange={(e) => onChange("projectsLabel", e.target.value)}
          placeholder="My Portfolio"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Projects Section Subtitle</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.projectsSubtitle ?? "Every project built to inspire users"}
          onChange={(e) => onChange("projectsSubtitle", e.target.value)}
          placeholder="Every project built to inspire users"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Explore Projects Button Label</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.projectsExploreText ?? "Explore All"}
            onChange={(e) => onChange("projectsExploreText", e.target.value)}
            placeholder="Explore All"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Explore Projects Button URL</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none font-mono"
            value={profile.projectsExploreUrl ?? "#work"}
            onChange={(e) => onChange("projectsExploreUrl", e.target.value)}
            placeholder="#work"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Process Section Tag Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.processLabel ?? "My Process"}
          onChange={(e) => onChange("processLabel", e.target.value)}
          placeholder="My Process"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Testimonials Section Tag Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.testimonialsLabel ?? "Reviews"}
          onChange={(e) => onChange("testimonialsLabel", e.target.value)}
          placeholder="Reviews"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Footer Section Tag Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.footerLabel ?? "Have a question"}
          onChange={(e) => onChange("footerLabel", e.target.value)}
          placeholder="Have a question"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Status Tag Text</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.statusText ?? "Available for work"}
          onChange={(e) => onChange("statusText", e.target.value)}
          placeholder="Available for work"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Follow Me Header Text</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.followMeLabel ?? "Follow me"}
          onChange={(e) => onChange("followMeLabel", e.target.value)}
          placeholder="Follow me"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Footer Credit Intro</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.footerCreditText ?? "Template by"}
            onChange={(e) => onChange("footerCreditText", e.target.value)}
            placeholder="Template by"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Footer Credit Name</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.footerCreditName ?? "Muddasir Hussain"}
            onChange={(e) => onChange("footerCreditName", e.target.value)}
            placeholder="Muddasir Hussain"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Framer Badge Text</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.builtInFramerText ?? "Built in"}
            onChange={(e) => onChange("builtInFramerText", e.target.value)}
            placeholder="Built in"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Framer Link Text</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.builtInFramerUrl ?? "Framer"}
            onChange={(e) => onChange("builtInFramerUrl", e.target.value)}
            placeholder="Framer"
          />
        </div>
      </div>
    </div>
  );

  const renderNavigationFields = () => (
    <div className="space-y-4 animate-in fade-in duration-200 text-left">
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Home Nav Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.navHomeText ?? "Home"}
          onChange={(e) => onChange("navHomeText", e.target.value)}
          placeholder="Home"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">About Nav Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.navAboutText ?? "About"}
          onChange={(e) => onChange("navAboutText", e.target.value)}
          placeholder="About"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Projects Nav Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.navProjectsText ?? "Projects"}
          onChange={(e) => onChange("navProjectsText", e.target.value)}
          placeholder="Projects"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Contact Nav Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.navContactText ?? "Contact"}
          onChange={(e) => onChange("navContactText", e.target.value)}
          placeholder="Contact"
        />
      </div>
    </div>
  );

  // Determine which properties editor pane to display based on selectedField
  const renderEditorContent = () => {
    if (!selectedField) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 select-none animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shadow-sm mb-4">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 9.152c.582-.448 1.148-.89 1.676-1.345m-1.676 1.345a55.542 55.542 0 0 1-5.696 4.01c-3.024 1.747-4.536 2.62-5.65 1.706-1.114-.914-.73-2.617-.005-6.02L4.545 4.54a1.8 1.8 0 0 1 1.742-1.424l4.5.006a1.8 1.8 0 0 1 1.742 1.424l.872 3.424Z" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-neutral-800">Visual Editor Active</h3>
          <p className="text-xs text-neutral-500 mt-2 max-w-[280px] leading-relaxed">
            Click on any section, text line, or image card on the right website preview canvas to edit its properties instantly.
          </p>
        </div>
      );
    }

    switch (selectedField) {
      case "name":
      case "headline":
      case "location":
      case "summary":
        return renderProfileFields();
      
      case "hero":
      case "heroBadgeText":
      case "heroGreetingStart":
      case "heroGreetingName":
      case "heroGreetingEnd":
      case "heroSubheadline":
      case "heroCtaText":
      case "heroCtaUrl":
      case "heroRatingText":
        return renderHeroFields();

      case "labels":
      case "servicesLabel":
      case "aboutLabel":
      case "brandsLabel":
      case "projectsLabel":
      case "projectsSubtitle":
      case "projectsExploreText":
      case "projectsExploreUrl":
      case "processLabel":
      case "testimonialsLabel":
      case "footerLabel":
      case "statusText":
      case "followMeLabel":
      case "footerCreditText":
      case "footerCreditName":
      case "builtInFramerText":
      case "builtInFramerUrl":
        return renderLabelsFields();

      case "navigation":
      case "navHomeText":
      case "navAboutText":
      case "navProjectsText":
      case "navContactText":
        return renderNavigationFields();
      
      case "avatarUrl":
      case "bannerUrl":
      case "aboutPhotoUrl":
      case "signatureUrl":
      case "footerBannerUrl":
        return renderGraphicsFields(selectedField);

      case "project":
        return renderProjectEditor(selectedIndex ?? 0);
      case "projects_list":
      case "projects":
        return renderProjectsList();

      case "experience":
        return renderExperienceList();

      case "service":
      case "servicesCta":
      case "services":
      case "servicesTitle":
        return renderServicesEditor(selectedIndex);

      case "process":
      case "processes":
      case "processTitle":
        return renderProcessEditor();

      case "testimonial":
      case "testimonials":
      case "testimonialsTitle":
        return renderTestimonialsEditor();

      case "links":
      case "email":
      case "phone":
        return renderLinksEditor();

      case "colors":
        return renderColorPalette();

      default:
        return renderProfileFields();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white select-none">
      {/* Properties Panel Header */}
      <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-blue-500" />
          <span className="font-bold text-sm text-neutral-800">
            {selectedField ? "Properties Editor" : "Visual Customizer"}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-500 flex items-center justify-center active:scale-95 transition-all border-none bg-transparent cursor-pointer"
          title="Exit Customizer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>



      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-5" style={{ scrollbarWidth: "none" }}>
        {renderEditorContent()}
      </div>
    </div>
  );
}

```

---

## File: `app/editor/components/SettingsPane.tsx`

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useEditor } from "@/context/EditorContext";

interface SettingsPaneProps {
  profileName: string;
  router: any;
}

export default function SettingsPane({
  profileName,
  router,
}: SettingsPaneProps) {
  const { websiteId } = useEditor();
  const [siteName, setSiteName] = useState(profileName);
  const [seoTitle, setSeoTitle] = useState(
    `${profileName} - Professional Micro-site`,
  );
  const [seoDesc, setSeoDesc] = useState(
    "Explore my professional experience, projects, education, and social networks.",
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!websiteId) return;
    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/websites/${websiteId}`);
        const data = await res.json();
        if (res.ok && data.website) {
          setSiteName(data.website.brandName || "");
          setSeoTitle(data.website.seoTitle || "");
          setSeoDesc(data.website.seoDesc || "");
        }
      } catch (err) {
        console.error("Failed to fetch settings details", err);
      }
    };
    fetchDetails();
  }, [websiteId]);

  const handleSaveSettings = async () => {
    if (!websiteId) return;
    setSaving(true);
    const toastId = toast.loading("Saving settings...");
    try {
      const res = await fetch(`/api/websites/${websiteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: siteName,
          seoTitle,
          seoDesc,
        }),
      });
      const data = await res.json();
      toast.dismiss(toastId);
      setSaving(false);
      if (res.ok) {
        toast.success("Site configuration saved!");
        sessionStorage.setItem("linkedpage_brand_name", siteName);
      } else {
        toast.error(data.error || "Failed to save settings");
      }
    } catch {
      toast.dismiss(toastId);
      setSaving(false);
      toast.error("Failed to save settings. Connection error.");
    }
  };

  const handleDeleteSite = async () => {
    if (!websiteId) return;
    const confirmDel = window.confirm(
      "Are you absolutely sure you want to delete this website? This action is permanent!",
    );
    if (!confirmDel) return;
    const toastId = toast.loading("Deleting website...");
    try {
      const res = await fetch(`/api/websites/${websiteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      toast.dismiss(toastId);
      if (res.ok) {
        toast.success("Website deleted successfully.");
        sessionStorage.removeItem("linkedpage_brand_name");
        sessionStorage.removeItem("linkedpage_subdomain");
        router.push("/dashboard");
      } else {
        toast.error(data.error || "Failed to delete website");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Failed to delete website. Connection error.");
    }
  };

  if (!websiteId) {
    return (
      <section className="w-[340px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full items-center justify-center p-6 text-center">
        <p className="text-sm text-gray-400 font-medium font-['Inter_Tight']">
          No website loaded. Go back to the dashboard and open a site.
        </p>
      </section>
    );
  }

  return (
    <section className="w-[340px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full overflow-hidden select-none font-inter">
      {/* Title Header */}
      <div className="h-[54px] border-b border-[#E6E6E6]/40 px-6 flex items-center justify-between shrink-0">
        <span className="font-semibold text-[15px] text-black">
          Site Settings
        </span>
      </div>

      {/* Content container */}
      <div
        className="flex-1 overflow-y-auto p-5 flex flex-col gap-5"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Branding */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Brand Name
          </label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full h-9 px-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-blue-400 font-medium"
          />
        </div>

        {/* SEO Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            SEO Title Tag
          </label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full h-9 px-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-blue-400 font-medium"
          />
        </div>

        {/* SEO Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Meta Description
          </label>
          <textarea
            value={seoDesc}
            onChange={(e) => setSeoDesc(e.target.value)}
            rows={4}
            className="w-full p-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-blue-400 resize-none font-medium"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="w-full h-10 rounded-lg bg-[#2A2A2F] text-white text-[12px] font-semibold hover:bg-[#3E3E45] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          {saving && (
            <span className="w-3 h-3 rounded-lg border-2 border-white border-t-transparent animate-spin" />
          )}
          Save Configuration
        </button>

        <div className="border-t border-gray-100 my-2" />

        {/* Danger Zone */}
        <div className="p-4 border border-red-200 bg-red-50/40 rounded-xl flex flex-col gap-3">
          <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider">
            Danger Zone
          </span>
          <p className="text-xs text-red-700/80 leading-relaxed">
            Deleting your site will permanently wipe all pages, files, and
            domains. This cannot be undone.
          </p>
          <button
            onClick={handleDeleteSite}
            className="w-full h-10 rounded-lg bg-red-650 hover:bg-red-700 text-white text-[12px] font-bold active:scale-95 transition-all shadow-sm"
          >
            Delete Website
          </button>
        </div>
      </div>
    </section>
  );
}

```

---

## File: `app/editor/components/TemplatePicker.tsx`

```tsx
"use client";

import { Check } from "lucide-react";
import { TEMPLATES, TemplateId } from "@/shared/types";

interface TemplatePickerProps {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
}

function DanielCrossPreview() {
  return (
    <div
      className="w-full h-full"
      style={{
        backgroundColor: "#e9e6e2",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Sidebar mock */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "30%",
          backgroundColor: "#edeae7",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {/* Logo / name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "4px",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "6px",
              background: "#d5d0cb",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <div
              style={{
                height: "6px",
                width: "50px",
                background: "#4a3429",
                borderRadius: "3px",
              }}
            />
            <div
              style={{
                height: "4px",
                width: "36px",
                background: "#aaa8a5",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>
        {/* Nav items */}
        {["Home", "About", "Work", "Contact"].map((n, i) => (
          <div
            key={i}
            style={{
              height: "22px",
              borderRadius: "5px",
              background: i === 0 ? "#f5f2f0" : "transparent",
              display: "flex",
              alignItems: "center",
              paddingLeft: "6px",
            }}
          >
            <div
              style={{
                height: "4px",
                width: i === 0 ? "28px" : `${20 + i * 6}px`,
                background: "#8a8782",
                borderRadius: "2px",
              }}
            />
          </div>
        ))}
        {/* Social links */}
        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              height: "4px",
              width: "40px",
              background: "#b0aca8",
              borderRadius: "2px",
              marginBottom: "5px",
            }}
          />
          {["Instagram", "Twitter-X", "LinkedIn"].map((s, i) => (
            <div
              key={i}
              style={{
                height: "14px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginBottom: "2px",
              }}
            >
              <div
                style={{
                  height: "3px",
                  width: "40px",
                  background: "#c0bdb9",
                  borderRadius: "2px",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div
        style={{
          marginLeft: "30%",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {/* Hero section */}
        <div
          style={{
            background: "#f5f2f0",
            borderRadius: "8px",
            padding: "10px 12px",
            marginBottom: "4px",
          }}
        >
          {/* Status tags */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "6px" }}>
            <div
              style={{
                height: "12px",
                borderRadius: "6px",
                background: "#edeae7",
                padding: "0 6px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: "4px",
                  width: "40px",
                  background: "#4a3429",
                  borderRadius: "2px",
                }}
              />
            </div>
          </div>
          {/* Big name */}
          <div
            style={{
              height: "22px",
              width: "65%",
              background: "#2a2520",
              borderRadius: "4px",
              marginBottom: "4px",
            }}
          />
          {/* Subtitle */}
          <div
            style={{
              height: "10px",
              width: "80%",
              background: "#c0bdb9",
              borderRadius: "3px",
              marginBottom: "6px",
            }}
          />
          {/* Bio paragraph */}
          {[100, 95, 88].map((w, i) => (
            <div
              key={i}
              style={{
                height: "4px",
                width: `${w}%`,
                background: "#d8d5d1",
                borderRadius: "2px",
                marginBottom: "3px",
              }}
            />
          ))}
        </div>

        {/* Projects grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px",
          }}
        >
          {[1, 2].map((i) => (
            <div
              key={i}
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                position: "relative",
                height: "60px",
                background: "#d5d0cb",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "50%",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "4px 6px",
                }}
              >
                <div
                  style={{
                    height: "5px",
                    width: "40px",
                    background: "#fff",
                    borderRadius: "2px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            background: "#e5e2de",
            borderRadius: "6px",
            padding: "6px 8px",
            display: "flex",
            gap: "8px",
          }}
        >
          {["Email", "Phone", "Location"].map((f, i) => (
            <div
              key={i}
              style={{
                height: "4px",
                width: `${30 + i * 6}px`,
                background: "#b0aba7",
                borderRadius: "2px",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TemplatePicker({
  selected,
  onSelect,
}: TemplatePickerProps) {
  const template = TEMPLATES[0]; // Only Daniel Cross

  return (
    <div className="flex flex-col self-stretch grow">
      <div className="flex justify-center self-stretch pt-[21px]">
        <div className="flex flex-col justify-center self-stretch grow bg-[#fbfbfb] rounded-[13px] outline outline-1 outline-[#f3f3f3] relative overflow-hidden min-h-[832px]">
          {/* Background layer */}
          <div className="w-full bg-white absolute left-0 top-0 bottom-0 rounded-[13px] pointer-events-none" />

          <div className="self-stretch grow relative z-10 flex flex-col items-center py-[21px]">
            <div className="w-[434px] flex flex-col gap-[12px]">
              {/* Header */}
              <div className="flex justify-between items-center self-stretch">
                <span className="font-medium text-[17px] leading-[27px] text-neutral-900">
                  Templates
                </span>
                <div className="relative group/info">
                  <div className="w-[18px] h-[18px] flex items-center justify-center cursor-pointer">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#info-clip)">
                        <path
                          d="M9.11488 16.7108C13.3099 16.7108 16.7107 13.3101 16.7107 9.115C16.7107 4.91994 13.3099 1.51917 9.11488 1.51917C4.91981 1.51917 1.51904 4.91994 1.51904 9.115C1.51904 13.3101 4.91981 16.7108 9.11488 16.7108Z"
                          stroke="#171717"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.11523 12.1541V9.11499"
                          stroke="#171717"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.11523 6.07666H9.12283"
                          stroke="#171717"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="info-clip">
                          <rect width="18.23" height="18.23" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="opacity-0 group-hover/info:opacity-100 transition-opacity duration-150 absolute right-0 top-[22px] z-50 pointer-events-none">
                    <div className="w-72 bg-gradient-to-b from-[#2a2a2f] to-[#3a3a42] px-3 py-2 rounded-lg shadow-md">
                      <span className="text-[13px] leading-[19px] text-white font-normal">
                        Your portfolio is built on the Daniel Cross Framer
                        template — a premium, clean design with modern
                        typography and sleek aesthetics.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-0.5 border-t border-black/5" />
            </div>

            {/* Single Template Card */}
            <div className="w-[434px] mt-4">
              <div
                onClick={() => onSelect(template.id)}
                className={`w-full h-[200px] bg-[#f3f3f3] rounded-[13px] relative overflow-hidden cursor-pointer border transition-all ${
                  selected === template.id
                    ? "border-blue-500 ring-1 ring-blue-500"
                    : "border-black/5 hover:border-zinc-300"
                }`}
              >
                {/* Template Preview */}
                <div className="absolute inset-0 pointer-events-none">
                  <DanielCrossPreview />
                </div>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-black/0 to-white/80 pointer-events-none" />

                {/* Template Name */}
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="font-medium text-[15px] text-black/80">
                    {template.name}
                  </span>
                  <p className="text-[11px] text-black/40 mt-0.5">
                    {template.description}
                  </p>
                </div>

                {/* Selected badge */}
                {selected === template.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm z-20">
                    <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 flex justify-center items-center bg-white/20 backdrop-blur-[1px] opacity-0 hover:opacity-100 transition-opacity duration-200 z-10">
                  <div className="h-10 flex items-center bg-[#f3f3f3] px-6 rounded-[13px] shadow-sm">
                    <span className="font-medium text-[15px] text-black">
                      {selected === template.id ? "Active" : "Use This Layout"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Premium badge row */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-[#edeae7] border border-[#d5d0cb] rounded-full px-3 py-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1L7.5 4.5H11L8 7L9.5 10.5L6 8.5L2.5 10.5L4 7L1 4.5H4.5L6 1Z"
                      fill="#4a3429"
                    />
                  </svg>
                  <span className="text-[11px] font-medium text-[#4a3429]">
                    Premium Framer Template
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400">
                  Daniel Cross by Muddasir Hussain
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

---

## File: `app/editor/page.tsx`

```tsx
"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Check,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Plus,
  Trash2,
  Globe,
  Loader2,
  Smartphone,
  Tablet,
  Monitor,
  MoveHorizontal,
  Mic,
  ArrowUp,
  Folder,
  Briefcase,
  Wrench,
  Inbox,
  FileText,
  Eye,
  EyeOff,
  Copy,
  RotateCw,
} from "lucide-react";
import dynamic from "next/dynamic";
import PropertiesPanel from "./components/PropertiesPanel";
import WizardAnimations from "@/components/WizardAnimations";
import { UserMenu } from "@/components/UserMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShiningText } from "@/components/ui/shining-text";

const ProfilePreview = dynamic(() => import("./components/ProfilePreview"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-400 font-sans">
      <div className="flex flex-col items-center gap-2">
        <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
        <span>Loading preview…</span>
      </div>
    </div>
  )
});

const DomainsPane = dynamic(() => import("./components/DomainsPane"), {
  ssr: false,
  loading: () => <div className="p-8 text-neutral-400 text-sm">Loading domains config...</div>,
});

const SettingsPane = dynamic(() => import("./components/SettingsPane"), {
  ssr: false,
  loading: () => <div className="p-8 text-neutral-400 text-sm">Loading settings...</div>,
});

// User avatar placeholder
function UserAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-neutral-200 border border-neutral-300 flex items-center justify-center shrink-0 shadow-xs">
      <span className="text-[10px] font-bold text-neutral-600 uppercase">You</span>
    </div>
  );
}

// Left Sidebar Icons type
type NavItem = { icon: React.ReactNode; label: string; active?: boolean };

const navItems: NavItem[] = [
  {
    label: "Home",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Design",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Domains",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Site Settings",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
];

// Suggestions removed

const DEFAULT_SERVICES = [
  { title: "Web design", price: "$1200", description: "I create visually appealing, responsive websites with clean layouts, ensuring engaging user experiences and professional digital presence." },
  { title: "UI/UX Design", price: "$1500", description: "I design intuitive user interfaces and seamless experiences, focusing on usability, accessibility, and modern aesthetics to improve user satisfaction." },
  { title: "Framer Development", price: "$1300", description: "I build interactive, high-performing websites in Framer, smooth animations, & fully responsive layouts tailored to your brand." },
  { title: "Mobile App Design", price: "$1600", description: "I design user mobile applications with functional layouts, engaging visuals, & optimized experiences for both iOS & Android platforms." },
  { title: "Branding & Identity", price: "$1000", description: "I craft unique brand identities including logos, typography, & guidelines, helping businesses stand out with consistency & strong visual presence." }
];

const DEFAULT_SERVICES_CTA = {
  title: "Book A 30 min Free Call",
  text: "Let’s connect to discuss your design needs, explore creative ideas, and plan your project effectively together.",
  buttonText: "Book A Call",
  buttonUrl: "#contact"
};

const DEFAULT_PROCESSES = [
  { stepTag: "/01", title: "Creative Discovery", description: "Through research and collaboration, we uncover goals, audience needs, and brand vision to build a solid creative foundation." },
  { stepTag: "/02", title: "Design Blueprint", description: "Transforming insights into structured wireframes and prototypes that guide visuals, user experience, and brand alignment seamlessly." },
  { stepTag: "/03", title: "Delivery & Launch", description: "Executing development and refined animations, ensuring cross-platform testing, and launching a high-performance experience." }
];

const DEFAULT_TESTIMONIALS = [
  { quote: "Daniel transformed our digital presence with stunning design and seamless usability. Working with him was a complete delight.", name: "James Walker", role: "Marketing Director, BrightEdge", avatarUrl: "/templates/daniel-cross/3R6WpHw2pAWlgNTDtMQICmJ9as.png" },
  { quote: "Professional, creative, & highly reliable. he delivered designs that exceeded expectations & strengthened our brand identity across platforms.", name: "Emily Harris", role: "Product Manager, Nexora", avatarUrl: "/templates/daniel-cross/6GdVor1G40eyD13tSRQ8IzSBQ.png" },
  { quote: "His attention to detail and ability to capture our vision in design made the entire process effortless, inspiring, and memorable.", name: "Oliver Bennett", role: "CEO, Innovent Solutions", avatarUrl: "/templates/daniel-cross/0gmxJBiUekQL1gjvN4nDfGCVIRE.webp" }
];

interface WizardStep {
  step: number;
  label: string;
  prompt: string;
}

const WIZARD_STEPS: WizardStep[] = [
  { step: 1, label: "Basics & Profile Identity", prompt: "Welcome to Webild! Let's build your portfolio page step-by-step. First, please provide your professional identity details below." },
  { step: 2, label: "Hero Greeting & Status", prompt: "Great. Now let's configure the greeting header and your availability status." },
  { step: 3, label: "Hero Headline & Value Prop", prompt: "Let's set up the main headline and value prop for your hero section." },
  { step: 4, label: "About Me Biography", prompt: "Next, let's write your professional biography and choose your section photos." },
  { step: 5, label: "Client Logos Ticker List", prompt: "Let's showcase the brands and companies you have worked with in a scrolling ticker." },
  { step: 6, label: "Portfolio Grid Projects", prompt: "Now, let's add some projects to showcase your portfolio of work." },
  { step: 7, label: "Services Grid", prompt: "Let's list the core services and packages you offer. Note: you can add up to 5 services." },
  { step: 8, label: "Services CTA Consultation", prompt: "Let's configure the consultation booking card for visitors to schedule a call." },
  { step: 9, label: "Creative Process Steps", prompt: "Let's outline the steps of your creative process." },
  { step: 10, label: "Client Testimonials", prompt: "Let's add client reviews and testimonials to build credibility." },
  { step: 11, label: "Contact Footer & Socials", prompt: "Finally, let's configure your footer links, email, phone, and social media handles." },
  { step: 12, label: "Free-form Chat Mode & Theme Selection", prompt: "Setup complete! Your website is updated. You can select a template style above or use the chat below to make any further edits." }
];

const removeEmojis = (text: string) => {
  return text.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\uD83D[\uDE00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|[\u2600-\u26FF]|[\u2700-\u27BF]/g, "");
};

const cleanMessageContent = (text: string) => {
  let cleaned = text.replace(/\[MILESTONE:[A-Z_]+\]/g, "");

  // 1. Strip block of suggested replies starting with optional * or ( or both, and matching all the way to the closing ) or * or end of line.
  // Match *(Suggested replies: ...) or (Suggested replies: ...)
  cleaned = cleaned.replace(/\*?\(?Suggested replies:[^)]+\)?\*?/gi, "");

  // Match *Suggested replies:* ... or *Suggested replies:...*
  cleaned = cleaned.replace(/\*Suggested replies:\*?[\s\S]*?(?=\n\n|\n[A-Z]|$)/gi, "");

  // Match plain Suggested replies: ...
  cleaned = cleaned.replace(/Suggested replies:[\s\S]*?(?=\n\n|\n[A-Z]|$)/gi, "");

  return cleaned.trim();
};



const getNotionTagClasses = (name: string) => {
  const colors = [
    "bg-neutral-50 text-neutral-700 border-neutral-200",
    "bg-orange-50 text-orange-700 border-orange-200/60",
    "bg-amber-50/70 text-amber-800 border-amber-200/60",
    "bg-emerald-50/80 text-emerald-700 border-emerald-200/60",
    "bg-blue-50 text-blue-700 border-blue-200/60",
    "bg-indigo-50 text-indigo-700 border-indigo-200/60",
    "bg-pink-50 text-pink-700 border-pink-200/60",
    "bg-rose-50 text-rose-800 border-rose-200/60"
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

function EditorInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    websiteId,
    editedProfile,
    selectedTemplate,
    selectTemplate,
    loadWebsite,
    updateField,
    isDirty,
    resetEdits,
  } = useEditor();

  // Navigation Panel tab state (1: Design/Wizard, 2: Domains, 3: Site Settings)
  const [activeNav, setActiveNav] = useState(1);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Onboarding wizard steps (1 to 11, then 12 for free-form editor mode)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [originalHeadline, setOriginalHeadline] = useState("");
  const [originalBio, setOriginalBio] = useState("");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile" | "resizable">("desktop");
  const [resizableWidth, setResizableWidth] = useState<number>(800);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [actualWidth, setActualWidth] = useState<number>(1200);
  const [publishing, setPublishing] = useState(false);
  const [optimizing, setOptimizing] = useState(false);

  // Form states
  const [projects, setProjects] = useState<{ title: string; description: string; link?: string; image?: string }[]>([]);
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState<{ name: string }[]>([]);
  const [experience, setExperience] = useState<{ title: string; company: string; duration: string; description: string }[]>([]);
  const [subdomain, setSubdomain] = useState("");
  const [checkingSubdomain, setCheckingSubdomain] = useState(false);
  const [isSubdomainAvailable, setIsSubdomainAvailable] = useState<boolean | null>(null);

  // Project Modal states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
  const [modalProjectTitle, setModalProjectTitle] = useState("");
  const [modalProjectDescription, setModalProjectDescription] = useState("");
  const [modalProjectLink, setModalProjectLink] = useState("");
  const [modalProjectImage, setModalProjectImage] = useState("");

  // Services Modal states
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);
  const [modalServiceTitle, setModalServiceTitle] = useState("");
  const [modalServicePrice, setModalServicePrice] = useState("");
  const [modalServiceDescription, setModalServiceDescription] = useState("");

  // Process steps Modal states
  const [isProcessesModalOpen, setIsProcessesModalOpen] = useState(false);
  const [editingProcessIndex, setEditingProcessIndex] = useState<number | null>(null);
  const [modalProcessTag, setModalProcessTag] = useState("");
  const [modalProcessTitle, setModalProcessTitle] = useState("");
  const [modalProcessDescription, setModalProcessDescription] = useState("");

  // Testimonials Modal states
  const [isTestimonialsModalOpen, setIsTestimonialsModalOpen] = useState(false);
  const [editingTestimonialIndex, setEditingTestimonialIndex] = useState<number | null>(null);
  const [modalTestimonialName, setModalTestimonialName] = useState("");
  const [modalTestimonialRole, setModalTestimonialRole] = useState("");
  const [modalTestimonialQuote, setModalTestimonialQuote] = useState("");
  const [modalTestimonialAvatar, setModalTestimonialAvatar] = useState("");

  // Inline Add states
  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [newProjLink, setNewProjLink] = useState("");
  const [showAddProject, setShowAddProject] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  // Free-form editor mode states (Step 9)
  const [customMessages, setCustomMessages] = useState<{ id: string; role: "user" | "assistant"; content: string }[]>(() => {
    return [
      {
        id: "welcome",
        role: "assistant",
        content: "Welcome to Webild! I've loaded your LinkedIn data. Let's customize your profile step-by-step. Type 'start' below to begin!"
      }
    ];
  });
  const [chatInput, setChatInput] = useState("");
  // Suggestions state removed
  const [isThinking, setIsThinking] = useState(false);

  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false);
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Onboarding controllers
  const goToNextStep = () => {
    if (currentStep < 12) {
      const nextStep = currentStep + 1;
      const stepLabel = WIZARD_STEPS.find(s => s.step === currentStep)?.label || "Step details";
      setCustomMessages(prev => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          role: "user" as const,
          content: `${stepLabel} configured.`
        }
      ]);
      setCurrentStep(nextStep);
      const nextPrompt = WIZARD_STEPS.find(s => s.step === nextStep)?.prompt || "";
      if (nextPrompt) {
        setCustomMessages(prev => [
          ...prev,
          {
            id: `assistant-${Date.now() + 1}`,
            role: "assistant" as const,
            content: nextPrompt
          }
        ]);
      }
    }
  };

  const goToBackStep = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      const prevPrompt = WIZARD_STEPS.find(s => s.step === prevStep)?.prompt || "";
      setCustomMessages(prev => [
        ...prev,
        {
          id: `user-back-${Date.now()}`,
          role: "user" as const,
          content: "Go back to previous step."
        },
        {
          id: `assistant-back-${Date.now() + 1}`,
          role: "assistant" as const,
          content: prevPrompt
        }
      ]);
    }
  };

  // Load website data on mount & Check Auth
  useEffect(() => {
    const checkUserAndLoad = async () => {
      try {
        const authRes = await fetch("/api/auth/me");
        const authData = await authRes.json();
        if (!authRes.ok) {
          router.push("/login");
          return;
        }
        setUserName(`${authData.user.firstName} ${authData.user.lastName}`);
        setUserEmail(authData.user.email);

        if (id) {
          await loadWebsite(id);
        } else {
          // Attempt to restore last active website
          const lastId = sessionStorage.getItem("linkedpage_last_website_id");
          if (lastId) {
            router.push(`/editor?id=${lastId}`);
            return;
          }

          // Otherwise fetch from database
          const websRes = await fetch("/api/websites");
          const websData = await websRes.json();
          if (websRes.ok && websData.success && websData.websites && websData.websites.length > 0) {
            // Sort by updatedAt desc to get latest draft
            const sorted = websData.websites.sort((a: any, b: any) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
            const latestId = sorted[0].id;
            router.push(`/editor?id=${latestId}`);
          } else {
            router.push("/onboarding");
          }
        }
      } catch {
        router.push("/login");
      }
    };
    checkUserAndLoad();
  }, [id, loadWebsite, router]);

  // Load saved chat history when websiteId is available
  useEffect(() => {
    if (!websiteId) return;
    const fetchChatHistory = async () => {
      try {
        const res = await fetch(`/api/chat?websiteId=${websiteId}`);
        const data = await res.json();
        if (res.ok && data.success && data.history && data.history.length > 0) {
          const formatted = data.history.map((msg: any) => ({
            id: msg.id || String(msg.createdAt),
            role: msg.role as "user" | "assistant",
            content: msg.content,
          }));
          setCustomMessages(formatted);
        } else {
          // Empty history, set welcome message
          if (editedProfile?.importedFromZip) {
            setCustomMessages([
              {
                id: "welcome",
                role: "assistant",
                content: `Hi ${editedProfile.name || "there"}! I've successfully imported your LinkedIn profile data. Let's finish building your premium portfolio. I have your name, headline, location, experience, and education details.\n\nTo make your page stand out, what are some key projects you'd like to feature? Tell me a bit about them, and I'll add them to your portfolio! [MILESTONE:PROJECTS]`
              }
            ]);
          } else {
            setCustomMessages([
              {
                id: "welcome",
                role: "assistant",
                content: "Hi! I'm Webild, your AI website builder companion. I will guide you step-by-step to create your premium portfolio page. Let's start with the basics—what's your name, and what is your professional role?"
              }
            ]);
          }
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    };
    fetchChatHistory();
  }, [websiteId, editedProfile]);

  // Load saved onboarding step from sessionStorage or url parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isOnboardingFlow = searchParams.get("onboarding") === "true";
      if (!isOnboardingFlow) {
        // If not in the onboarding flow, default straight to free-form editor (Step 12)
        setCurrentStep(12);
        return;
      }

      if (editedProfile?.importedFromZip) {
        // If profile was imported from a ZIP, default straight to free-form editor (Step 12)
        setCurrentStep(12);
        return;
      }

      const savedStep = sessionStorage.getItem("webild_onboarding_step");
      if (savedStep) {
        const parsed = parseInt(savedStep, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 12) {
          setCurrentStep(parsed);
        }
      } else {
        setCurrentStep(1);
      }
    }
  }, [searchParams, editedProfile]);

  // Save currentStep to sessionStorage on changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("webild_onboarding_step", currentStep.toString());
    }
  }, [currentStep]);

  // Synchronize onboarding customMessages with current step on load
  useEffect(() => {
    if (currentStep <= 11 && customMessages.length <= 1) {
      const activeStep = WIZARD_STEPS.find(s => s.step === currentStep);
      if (activeStep) {
        setCustomMessages([
          {
            id: "welcome",
            role: "assistant",
            content: activeStep.prompt
          }
        ]);
      }
    }
  }, [currentStep, customMessages.length]);

  // Sync profile data to forms
  useEffect(() => {
    if (editedProfile) {
      if (projects.length === 0 && editedProfile.projects) {
        setProjects(editedProfile.projects);
      }
      if (!interests && editedProfile.interests) {
        setInterests(editedProfile.interests);
      }
      if (skills.length === 0 && editedProfile.skills) {
        setSkills(editedProfile.skills);
      }
      if (experience.length === 0 && editedProfile.experience) {
        setExperience(editedProfile.experience.map(exp => ({
          title: exp.title,
          company: exp.company,
          duration: exp.duration,
          description: exp.description || ""
        })));
      }
      if (!subdomain && editedProfile.name) {
        const slug = editedProfile.name.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
        setSubdomain(slug);
      }
    }
  }, [editedProfile]);

  // Check subdomain availability
  useEffect(() => {
    if (subdomain.length < 3) {
      setIsSubdomainAvailable(null);
      return;
    }
    setCheckingSubdomain(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/websites/subdomain/check?slug=${subdomain}${websiteId ? `&websiteId=${websiteId}` : ""}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setIsSubdomainAvailable(data.available);
        } else {
          setIsSubdomainAvailable(null);
        }
      } catch {
        setIsSubdomainAvailable(null);
      } finally {
        setCheckingSubdomain(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [subdomain, websiteId]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentStep, showAddProject, customMessages, isThinking]);

  // Listen for mouse dragging events to resize preview canvas
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!previewContainerRef.current) return;
      const rect = previewContainerRef.current.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(e.clientX - center);
      const calculatedWidth = Math.round(distance * 2);
      const maxWidth = Math.min(1600, rect.width - 40); // 20px padding on each side
      setResizableWidth(Math.max(320, Math.min(maxWidth, calculatedWidth)));
      setPreviewMode("resizable");
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Keep actualWidth state in sync with rendered preview frame width
  useEffect(() => {
    const updateWidth = () => {
      if (previewContainerRef.current) {
        let width = previewContainerRef.current.getBoundingClientRect().width - 48; // -48 for p-6 padding
        if (previewMode === "tablet") {
          width = Math.min(width, 768);
        } else if (previewMode === "mobile") {
          width = Math.min(width, 375);
        } else if (previewMode === "resizable") {
          width = Math.min(width, resizableWidth);
        }
        setActualWidth(Math.round(width));
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [previewMode, resizableWidth]);

  // Step 6: AI Optimization
  useEffect(() => {
    if (currentStep === 6) {
      if (editedProfile) {
        setOriginalHeadline(editedProfile.headline || "");
        setOriginalBio(editedProfile.summary || "");
      }
      const runAiRefinement = async () => {
        setOptimizing(true);
        try {
          const res = await fetch("/api/onboarding/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              websiteId,
              projects,
              interests,
              skills,
              experience,
            }),
          });
          const data = await res.json();
          if (res.ok && data.success) {
            toast.success("AI copy refinement complete!");
            if (websiteId) {
              await loadWebsite(websiteId);
            }
          }
        } catch (err) {
          console.error("AI refinement failed:", err);
          setCurrentStep(7);
        } finally {
          setOptimizing(false);
        }
      };
      runAiRefinement();
    }
  }, [currentStep]);

  // Handle final publish
  const handlePublish = async () => {
    if (!websiteId) return;
    setPublishing(true);
    const toastId = toast.loading("Publishing your professional portfolio page...");
    try {
      // 1. Update slug & template preference in DB
      const saveRes = await fetch(`/api/websites/${websiteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subdomainSlug: subdomain,
          templateId: selectedTemplate,
          profile: editedProfile,
        }),
      });

      if (!saveRes.ok) {
        throw new Error("Failed to save subdomain slug settings.");
      }

      // 2. Call publish API
      const response = await fetch(`/api/websites/${websiteId}/publish`, {
        method: "POST",
      });
      const data = await response.json();
      toast.dismiss(toastId);
      setPublishing(false);
      if (!response.ok) {
        toast.error(data.error || "Failed to publish website");
        return;
      }
      toast.success("Your page is live! 🎉");
      router.push(`/publish?slug=${data.slug}`);
    } catch (err: any) {
      toast.dismiss(toastId);
      setPublishing(false);
      toast.error(err.message || "Network error. Failed to publish website.");
    }
  };

  const addBrandCompany = (companyName: string) => {
    if (!companyName.trim()) return;
    const updated = [
      ...experience,
      {
        title: "",
        company: companyName.trim(),
        duration: "",
        description: "",
      }
    ];
    setExperience(updated);
    updateField("experience", updated);
  };

  const removeBrandCompany = (index: number) => {
    const updated = experience.filter((_, i) => i !== index);
    setExperience(updated);
    updateField("experience", updated);
  };

  const regenerateLastMessage = async (index: number) => {
    let lastUserMessage = "";
    for (let i = index - 1; i >= 0; i--) {
      if (customMessages[i].role === "user") {
        lastUserMessage = customMessages[i].content;
        break;
      }
    }
    if (!lastUserMessage) return;

    setIsThinking(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: lastUserMessage, websiteId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI reply");
      }

      setCustomMessages(prev => {
        const copy = [...prev];
        if (copy[index]) {
          copy[index] = { ...copy[index], content: data.reply };
        }
        return copy;
      });

      if (data.template) {
        selectTemplate(data.template);
        setIsPreviewVisible(true);
      }

      if (data.profileUpdates) {
        for (const [k, v] of Object.entries(data.profileUpdates)) {
          updateField(k as any, v as any);
        }
        setIsPreviewVisible(true);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to regenerate reply");
    } finally {
      setIsThinking(false);
    }
  };

  // Dispatch free-form messages to backend AI route
  const sendChatMessage = async (text?: string) => {
    const msg = text ?? chatInput.trim();
    if (!msg) return;
    if (!text) setChatInput("");

    // Append user message bubble to timeline
    const userMsg = { id: Date.now().toString(), role: "user" as const, content: msg };
    setCustomMessages(prev => [...prev, userMsg]);

    if (!websiteId) {
      setCustomMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant" as const, content: "No active site loaded. Please select a website from the dashboard first." }
      ]);
      return;
    }

    setIsThinking(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, websiteId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI reply");
      }

      // Append assistant text answer
      setCustomMessages(prev => [
        ...prev,
        { id: (Date.now() + 2).toString(), role: "assistant" as const, content: data.reply }
      ]);

      if (data.template) {
        selectTemplate(data.template);
        setIsPreviewVisible(true);
      }

      if (data.profileUpdates) {
        for (const [k, v] of Object.entries(data.profileUpdates)) {
          updateField(k as any, v as any);
          // Auto-scroll preview based on updated key
          if (["name", "headline", "location", "avatarUrl"].includes(k)) {
            setCurrentStep(1);
          } else if (["heroBadgeText", "heroGreetingStart", "heroGreetingEnd", "statusText"].includes(k)) {
            setCurrentStep(2);
          } else if (["heroSubheadline", "heroRatingText", "followMeLabel"].includes(k)) {
            setCurrentStep(3);
          } else if (["aboutLabel", "summary", "aboutPhotoUrl", "signatureUrl"].includes(k)) {
            setCurrentStep(4);
          } else if (["experience", "brandsLabel"].includes(k)) {
            setCurrentStep(5);
          } else if (["projects", "projectsLabel", "projectsSubtitle"].includes(k)) {
            setCurrentStep(6);
          } else if (["services", "servicesLabel", "servicesTitle"].includes(k)) {
            setCurrentStep(7);
          } else if (["servicesCta"].includes(k)) {
            setCurrentStep(8);
          } else if (["processes", "processLabel", "processTitle"].includes(k)) {
            setCurrentStep(9);
          } else if (["testimonials", "testimonialsLabel", "testimonialsTitle"].includes(k)) {
            setCurrentStep(10);
          } else if (["footerLabel", "email", "phone", "links"].includes(k)) {
            setCurrentStep(11);
          }
        }
        setIsPreviewVisible(true);
      }

      // Reload website details to sync latest changes to local context and preview
      await loadWebsite(websiteId);
    } catch (err: any) {
      setCustomMessages(prev => [
        ...prev,
        { id: (Date.now() + 3).toString(), role: "assistant" as const, content: `Error: ${err.message || "Failed to parse AI response."}` }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  // Preview click handler to map sections to wizard steps or select elements
  const handleFieldClick = (fieldName: string, index?: number) => {
    if (isSelectionMode) {
      setSelectedField(fieldName);
      setSelectedIndex(index);
    } else {
      setActiveNav(1); // Switch back to Design/Wizard tab
      if (
        fieldName === "name" ||
        fieldName === "headline" ||
        fieldName === "location" ||
        fieldName === "avatarUrl"
      ) {
        setCurrentStep(1);
      } else if (
        fieldName === "heroBadgeText" ||
        fieldName === "heroGreetingStart" ||
        fieldName === "heroGreetingEnd" ||
        fieldName === "statusText"
      ) {
        setCurrentStep(2);
      } else if (
        fieldName === "heroSubheadline" ||
        fieldName === "heroRatingText" ||
        fieldName === "followMeLabel"
      ) {
        setCurrentStep(3);
      } else if (
        fieldName === "aboutLabel" ||
        fieldName === "summary" ||
        fieldName === "aboutPhotoUrl" ||
        fieldName === "signatureUrl"
      ) {
        setCurrentStep(4);
      } else if (
        fieldName === "experience" ||
        fieldName === "brandsLabel"
      ) {
        setCurrentStep(5);
      } else if (
        fieldName === "project" ||
        fieldName === "projectsLabel" ||
        fieldName === "projectsSubtitle"
      ) {
        setCurrentStep(6);
      } else if (
        fieldName === "services" ||
        fieldName === "servicesLabel" ||
        fieldName === "servicesTitle"
      ) {
        setCurrentStep(7);
      } else if (
        fieldName === "servicesCta"
      ) {
        setCurrentStep(8);
      } else if (
        fieldName === "process" ||
        fieldName === "processLabel" ||
        fieldName === "processTitle"
      ) {
        setCurrentStep(9);
      } else if (
        fieldName === "testimonials" ||
        fieldName === "testimonialsLabel" ||
        fieldName === "testimonialsTitle"
      ) {
        setCurrentStep(10);
      } else if (
        fieldName === "footerLabel" ||
        fieldName === "email" ||
        fieldName === "phone" ||
        fieldName === "links"
      ) {
        setCurrentStep(11);
      } else {
        toast.info(`Select the options in the chat flow to modify your ${fieldName}.`);
      }
    }
  };

  const profileName = editedProfile?.name ?? "Your Profile";
  const desktopScale = 0.54;
  const mobileScale = 0.44;

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 font-inter select-none">

      {/* ── Left Sidebar (Collapsible hover style) ── */}
      <div className="w-[60px] h-full shrink-0 relative z-[60]">
        <aside className="absolute top-0 left-0 h-full w-[60px] hover:w-[250px] bg-white/60 backdrop-blur-xl border-r border-[#0101]/5 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] hover:shadow-[0_8px_32px_#ffff] py-4">
          <div className="flex flex-col items-start w-full">
            {/* Project/Brand logo icon */}
            <div className="flex items-center px-[10px] mb-4 w-full cursor-pointer group/project relative">
              <div className="w-10 h-10 flex shrink-0 items-center justify-center rounded-[12px] bg-white border border-[#E6E6E6] text-[#2A2A2F] font-semibold text-[15px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] group-hover:mr-3 transition-all duration-300 relative z-10 overflow-hidden p-1.5">
                <img src="/logoicon.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex items-center justify-between w-[170px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-[62px] pointer-events-none group-hover:pointer-events-auto">
                <span className="font-medium text-[#2A2A2F] text-[15px] truncate">{profileName}</span>
                <svg className="w-5 h-5 text-[#171717]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="w-full px-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="h-px w-full bg-[#E6E6E6]/60" />
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col gap-[2px] w-full px-2">
              {navItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i === 0) {
                      router.push("/dashboard");
                    } else {
                      setActiveNav(i);
                      if (i !== 1) {
                        setIsSelectionMode(false);
                        setSelectedField(null);
                        setSelectedIndex(undefined);
                      }
                    }
                  }}
                  title={item.label}
                  className={`w-full flex items-center h-[38px] px-2 rounded-[10px] transition-all duration-150 ${activeNav === i
                    ? "bg-[#ebf5ff] text-[#3b82f6] border border-[#3b82f6]/20 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
                    : "text-[#171717]/70 hover:bg-[#fff]/50 hover:text-[#2A2A2F] border border-transparent"
                    }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span className={`ml-3 font-medium text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap absolute left-[44px] pointer-events-none ${activeNav === i ? "text-[#3b82f6]" : ""}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-center w-full mt-auto">
            {/* Upgrade Plan Promo Card */}
            <div className="px-3 w-full mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-[250px] overflow-hidden flex-shrink-0">
              <div className="relative p-[14px] bg-white border border-[#E6E6E6] rounded-[14px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] overflow-hidden text-left mt-2">
                <p className="text-[14px] font-semibold text-[#2A2A2F] leading-[1.3] mb-3">
                  ONLY {process.env.NEXT_PUBLIC_UPGRADE_PRICE || "$16"} to<br />unlock Premium<br />Features
                </p>
                <button
                  onClick={() => toast.info("Premium plans unlocking soon!")}
                  className="w-full py-1.5 bg-[#4b93ff] text-white rounded-lg text-[13px] font-medium hover:bg-[#3b82f6] transition-colors shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
                >
                  Upgrade Now
                </button>
              </div>
            </div>

            {/* Bottom links */}
            <div className="flex flex-col gap-1 w-full px-2">
              <button
                onClick={() => setActiveNav(3)}
                className="w-full flex items-center h-9 px-2 rounded-[10px] text-[#171717]/70 hover:bg-[#E6E6E6]/50 hover:text-[#2A2A2F] transition-all duration-150 relative"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="ml-3 font-medium text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap absolute left-[44px] pointer-events-none">
                  Settings
                </span>
              </button>
              <button
                onClick={() => toast.info("Check back later for help articles.")}
                className="w-full flex items-center h-9 px-2 rounded-[10px] text-[#171717]/70 hover:bg-[#E6E6E6]/50 hover:text-[#2A2A2F] transition-all duration-150 relative"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="ml-3 font-medium text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap absolute left-[44px] pointer-events-none">
                  Help
                </span>
              </button>
            </div>

            <div className="w-full px-4 my-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="h-px w-full bg-[#E6E6E6]/60" />
            </div>

            <div className="px-2 w-full">
              <button
                onClick={() => router.push("/onboarding")}
                className="w-full flex items-center h-9 px-2 rounded-[10px] text-[#171717]/80 hover:bg-[#E6E6E6]/50 hover:text-[#2A2A2F] transition-all duration-150 relative"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="ml-3 font-medium text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap absolute left-[44px] pointer-events-none">
                  Add new website
                </span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Left Column Panel Switcher based on activeN      {/* 1. Design / AI Onboarding Wizard Panel */}
      {activeNav === 1 && (
        <aside
          className={cn(
            "h-full bg-white flex flex-col justify-between relative z-20 font-inter transition-all duration-300",
            isPreviewVisible ? "w-[480px] shrink-0 border-r border-[#E6E6E6]/60 shadow-xs" : "flex-1"
          )}
        >
          {isSelectionMode ? (
            editedProfile ? (
              <PropertiesPanel
                profile={editedProfile}
                selectedField={selectedField}
                selectedIndex={selectedIndex}
                onChange={updateField}
                onClose={() => {
                  setIsSelectionMode(false);
                  setSelectedField(null);
                  setSelectedIndex(undefined);
                }}
                onSelectField={(field, idx) => {
                  setSelectedField(field);
                  setSelectedIndex(idx);
                }}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-sm text-neutral-400 font-sans">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                  <span>Loading customizer…</span>
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-col h-full w-full overflow-hidden bg-white">
              {/* Title Header */}
              <div className="h-[64px] border-b border-[#E6E6E6]/40 px-6 flex items-center shrink-0 bg-white select-none w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="LinkedPage" className="h-6 w-auto object-contain" />
                    <div className="w-px h-3 bg-slate-200" />
                    <span className="text-[12.5px] font-bold text-[#171717]/65 truncate max-w-[120px]">
                      {profileName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                      className="text-[11.5px] font-semibold text-neutral-600 hover:text-neutral-900 transition-colors border border-[#E6E6E6] px-2.5 py-1 rounded-lg flex items-center gap-1.5 bg-white shadow-xs"
                    >
                      {isPreviewVisible ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hide Preview</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 text-[#3b82f6]" />
                          <span>Show Preview</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => router.push("/onboarding")}
                      className="text-[11.5px] font-semibold text-neutral-400 hover:text-neutral-700 transition-colors border border-[#E6E6E6]/60 px-2.5 py-1 rounded-lg"
                    >
                      Restart
                    </button>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-[#8DFFB3]/25 text-[#369762] rounded-md">
                      Editor Mode
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Content Wrapper (centered when preview is hidden) */}
              <div className={cn(
                "flex-1 flex flex-col justify-between overflow-hidden w-full",
                !isPreviewVisible && "max-w-3xl mx-auto px-4"
              )}>

                {/* Scrollable Wizard History */}
                <div className="flex-1 overflow-y-auto px-6 py-4 font-sans" style={{ scrollbarWidth: "none" }}>
                  <div className="space-y-6 flex flex-col w-full py-4">
                    {/* Profile Card Header */}
                    <div className="text-center flex flex-col items-center justify-center py-6 select-none animate-in fade-in duration-300 mb-8">
                      {/* Logo Image */}
                      <img
                        src="/logo.png"
                        alt="Linked Logo"
                        className="h-10 w-auto object-contain mb-4"
                      />

                      {/* Title */}

                      <p className="text-slate-500 text-[14px] leading-[22px] max-w-lg mx-auto mt-3 font-normal font-sans">
                        Linked is your intelligent workspace for building premium portfolios.
                      </p>
                    </div>

                    {/* Conversational timeline rendering */}
                    {customMessages.map((msg, idx) => {
                      const cleanContent = cleanMessageContent(msg.content);
                      const contentUpper = msg.content.toUpperCase();
                      const hasProjectsMilestone = msg.content.includes("[MILESTONE:PROJECTS]") ||
                        (msg.role === "assistant" &&
                          (contentUpper.includes("PORTFOLIO PROJECTS") || contentUpper.includes("KEY PROJECTS") || contentUpper.includes("PROJECTS YOU'D LIKE TO FEATURE")) &&
                          !contentUpper.includes("GATHERED ALL YOUR DETAILS"));
                      const hasServicesMilestone = msg.content.includes("[MILESTONE:SERVICES]") ||
                        (msg.role === "assistant" &&
                          (contentUpper.includes("OFFERED SERVICES") || contentUpper.includes("WHAT SERVICES OR PACKAGES") || contentUpper.includes("WHAT SERVICES DO YOU OFFER") || contentUpper.includes("MILESTONE 6: OFFERED SERVICES")) &&
                          !contentUpper.includes("GATHERED ALL YOUR DETAILS"));

                      return (
                        <div key={msg.id} className="w-full flex flex-col gap-2.5">
                          {msg.role === "user" ? (
                            <div className="w-full flex justify-end items-start font-inter animate-in fade-in duration-200">
                              <div className="max-w-[65%] bg-[#E1F3FE] border border-[#3B82F6]/10 rounded-[18px] px-3.5 py-2 shadow-[0px_4px_8px_-4px_rgba(0,0,0,0.03)]">
                                <p className="text-slate-800 text-[14.5px] leading-[22px] font-normal break-words max-w-full font-sans">
                                  {removeEmojis(msg.content)}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full flex flex-col justify-start items-start gap-1 font-inter animate-in fade-in duration-200">
                              <div className="flex items-center gap-2 select-none mb-1">
                                <img src="/logoicon.png" alt="Logo" className="h-5 w-auto object-contain" />
                                <span className="font-semibold text-[13.5px] text-slate-700">Webild</span>
                              </div>
                              <div className="max-w-[90%] text-[#18181B] text-[15px] leading-[24px] font-normal break-words font-sans px-0 py-0.5">
                                {removeEmojis(cleanContent)}
                              </div>

                              {/* Action Icons Bar */}
                              <div className="flex items-center gap-3 mt-2 mb-1 select-none">
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(removeEmojis(cleanContent));
                                    toast.success("Copied to clipboard!");
                                  }}
                                  className="p-1 rounded hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer group flex items-center justify-center animate-in fade-in"
                                  title="Copy to clipboard"
                                >
                                  <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-650 transition-colors" />
                                </button>
                                <button
                                  onClick={() => regenerateLastMessage(idx)}
                                  className="p-1 rounded hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer group flex items-center justify-center animate-in fade-in"
                                  title="Regenerate reply"
                                >
                                  <RotateCw className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-650 transition-colors" />
                                </button>
                              </div>

                              {hasProjectsMilestone && (
                                <div className="mt-2 ml-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-[95%] animate-in fade-in duration-200">
                                  {(editedProfile?.projects || []).map((p, pIdx) => (
                                    <div
                                      key={pIdx}
                                      onClick={() => {
                                        setModalProjectTitle(p.title || "");
                                        setModalProjectLink(p.link || "");
                                        setModalProjectImage(p.image || "");
                                        setModalProjectDescription(p.description || "");
                                        setEditingProjectIndex(pIdx);
                                        setIsProjectModalOpen(true);
                                      }}
                                      className="relative bg-[#FAF8F5] hover:bg-[#FAF8F5]/80 border border-[#EAE6DF] hover:border-slate-400 p-5 rounded-2xl shadow-xs transition-all duration-205 flex flex-col justify-between h-full min-h-[160px] text-left cursor-pointer group active:scale-[0.98]"
                                    >
                                      <div>
                                        <h4 className="font-['Inter_Tight'] font-semibold text-[#2A2A2F] text-[15px] leading-tight truncate">
                                          {p.title}
                                        </h4>
                                        {p.link && (
                                          <p className="text-[10px] text-slate-400 truncate font-mono mt-1">
                                            {p.link}
                                          </p>
                                        )}
                                        {p.description && (
                                          <p className="text-[12px] text-slate-550 line-clamp-3 leading-normal mt-2.5 font-sans">
                                            {p.description}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  ))}

                                  <div
                                    onClick={() => {
                                      setModalProjectTitle("");
                                      setModalProjectLink("");
                                      setModalProjectImage("");
                                      setModalProjectDescription("");
                                      setEditingProjectIndex(null);
                                      setIsProjectModalOpen(true);
                                    }}
                                    className="relative bg-[#3B82F6] hover:bg-[#2563EB] p-5 rounded-2xl shadow-xs transition-all duration-200 flex flex-col justify-between h-full min-h-[160px] text-left cursor-pointer group active:scale-[0.98]"
                                  >
                                    <div>
                                      <h4 className="font-['Inter_Tight'] font-semibold text-white text-[15px] leading-tight">
                                        Add New Project
                                      </h4>
                                      <p className="text-[12px] text-blue-100/90 leading-normal mt-2.5 font-sans line-clamp-3">
                                        Showcase a new project in your portfolio. Add custom titles, redirect links, and descriptions.
                                      </p>
                                    </div>
                                    <div className="w-full bg-white hover:bg-blue-50 text-[#3B82F6] font-semibold text-[13px] py-2 px-4 rounded-xl text-center mt-4 transition-colors">
                                      Add Project
                                    </div>
                                  </div>
                                </div>
                              )}

                              {hasServicesMilestone && (
                                <div className="mt-2 ml-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-[95%] animate-in fade-in duration-200">
                                  {(editedProfile?.services || []).map((srv, sIdx) => (
                                    <div
                                      key={sIdx}
                                      onClick={() => {
                                        setModalServiceTitle(srv.title || "");
                                        setModalServicePrice(srv.price || "");
                                        setModalServiceDescription(srv.description || "");
                                        setEditingServiceIndex(sIdx);
                                        setIsServicesModalOpen(true);
                                      }}
                                      className="relative bg-[#FAF8F5] hover:bg-[#FAF8F5]/80 border border-[#EAE6DF] hover:border-slate-400 p-5 rounded-2xl shadow-xs transition-all duration-205 flex flex-col justify-between h-full min-h-[160px] text-left cursor-pointer group active:scale-[0.98]"
                                    >
                                      <div>
                                        <div className="flex items-start justify-between gap-2">
                                          <h4 className="font-['Inter_Tight'] font-semibold text-[#2A2A2F] text-[15px] leading-tight max-w-[70%]">
                                            {srv.title}
                                          </h4>
                                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2A2A2F] text-white leading-none shrink-0">
                                            {srv.price}
                                          </span>
                                        </div>
                                        {srv.description && (
                                          <p className="text-[12px] text-slate-550 line-clamp-3 leading-normal mt-2.5 font-sans">
                                            {srv.description}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  ))}

                                  {(editedProfile?.services || []).length < 5 && (
                                    <div
                                      onClick={() => {
                                        setModalServiceTitle("");
                                        setModalServicePrice("");
                                        setModalServiceDescription("");
                                        setEditingServiceIndex(null);
                                        setIsServicesModalOpen(true);
                                      }}
                                      className="relative bg-[#3B82F6] hover:bg-[#2563EB] p-5 rounded-2xl shadow-xs transition-all duration-200 flex flex-col justify-between h-full min-h-[160px] text-left cursor-pointer group active:scale-[0.98]"
                                    >
                                      <div>
                                        <h4 className="font-['Inter_Tight'] font-semibold text-white text-[15px] leading-tight">
                                          Add New Service
                                        </h4>
                                        <p className="text-[12px] text-blue-100/90 leading-normal mt-2.5 font-sans line-clamp-3">
                                          Create a new package with custom pricing deliverables, features, and details.
                                        </p>
                                      </div>
                                      <div className="w-full bg-white hover:bg-blue-50 text-[#3B82F6] font-semibold text-[13px] py-2 px-4 rounded-xl text-center mt-4 transition-colors">
                                        Add Service
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}



                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Thinking / Dots loader */}
                    {isThinking && (
                      <div className="w-full flex flex-col justify-start items-start gap-2.5 font-inter">
                        <div className="flex items-center gap-2 select-none">
                          <img src="/logoicon.png" alt="Logo" className="h-5 w-auto object-contain" />
                          <span className="font-semibold text-[13.5px] text-slate-700">Webild</span>
                        </div>
                        <div className="bg-white px-4 py-3 rounded-[18px] flex items-center justify-center gap-3">
                          <ShiningText text="Webild is thinking..." />
                        </div>
                      </div>
                    )}



                  </div>
                  <div ref={chatEndRef} />
                </div>
                {/* Bottom input composer area */}
                <div className="p-4 shrink-0 bg-white flex flex-col border-t border-neutral-100">
                  <div className="w-full flex flex-col gap-3">
                    {/* Suggestions removed */}

                    <div className="bg-white rounded-[20px] p-2.5 flex flex-col gap-2 border border-neutral-200/80 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] transition-opacity duration-300 opacity-100">
                      <textarea
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendChatMessage();
                          }
                        }}
                        className="w-full bg-transparent border-none resize-none focus:ring-0 text-[14px] px-2.5 py-1.5 outline-none font-inter text-neutral-800 placeholder:text-neutral-400 cursor-text"
                        placeholder="Ask Webild to adjust copy, headline, template style..."
                        rows={2}
                      />
                      <div className="flex items-center justify-between px-1 select-none">
                        <button
                          onClick={() => toast.info("Attachments coming soon!")}
                          className="w-9 h-9 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center transition-colors border-none hover:bg-neutral-200 cursor-pointer"
                        >
                          <Plus className="w-[18px] h-[18px]" />
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toast.info("Voice input coming soon!")}
                            className="w-9 h-9 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center transition-colors border-none hover:bg-neutral-200 cursor-pointer"
                          >
                            <Mic className="w-[18px] h-[18px]" />
                          </button>
                          <button
                            onClick={() => sendChatMessage()}
                            disabled={!chatInput.trim()}
                            className={cn(
                              "w-9 h-9 rounded-full text-white flex items-center justify-center transition-[background-color,transform] duration-100 border-none",
                              chatInput.trim()
                                ? "bg-[#3B82F6] hover:bg-[#2563EB] cursor-pointer active:scale-[0.93]"
                                : "bg-neutral-200 cursor-not-allowed"
                            )}
                          >
                            <ArrowUp className="w-[18px] h-[18px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>
      )}

      {/* 2. Domains Panel */}
      {activeNav === 2 && <DomainsPane />}

      {/* 3. Settings Panel */}
      {activeNav === 3 && <SettingsPane profileName={profileName} router={router} />}

      {/* ── Main Canvas Workspace ── */}
      {isPreviewVisible && (
        <main
          className="flex-1 h-full flex flex-col bg-white overflow-hidden p-5 gap-3"
        >

          {/* Top Navbar */}
          <div className="flex items-center justify-between shrink-0 h-9 bg-white">

            {/* Left Side: Collapse Button + Saving Indicator */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => toast.info("Upgrade to Pro to link custom domains & unlock premium features!")}
                className="flex items-center gap-2 h-10 px-2 text-sm font-medium bg-white border border-[#E6E6E6] rounded-sm text-[#2A2A2F] hover:bg-[#F7F7F7] transition-colors shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
                style={{ boxShadow: "0 1px 4px #fff" }}
              >
                <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>

              {/* Saved Indicators */}
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                {isDirty ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>Unsaved edits</span>
                    <button
                      onClick={resetEdits}
                      className="underline text-[11px] text-gray-400 hover:text-black transition-colors ml-1"
                    >
                      Reset
                    </button>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>All changes saved</span>
                  </>
                )}
              </div>
            </div>

            {/* Right Side: Share + Publish + Avatar menu */}
            <div className="flex items-center gap-2 relative">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://linkedpage.io/${editedProfile?.name.toLowerCase().replace(/\s+/g, "-") ?? "profile"}`);
                  toast.success("Share link copied to clipboard!");
                }}
                className="h-8 px-4 text-sm font-medium bg-white border border-[#E6E6E6] rounded-lg text-[#2A2A2F] hover:bg-[#F7F7F7] transition-colors shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
              >
                Share
              </button>
              <button
                id="onboarding-publish-btn"
                onClick={handlePublish}
                disabled={publishing}
                className="h-8 px-5 text-sm font-medium bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors active:scale-[0.97] flex items-center gap-1.5 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
              >
                {publishing && <span className="w-3 h-3 rounded-lg border-2 border-white border-t-transparent animate-spin" />}
                Publish
              </button>

              {/* Profile Avatar Button */}
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-8 h-8 rounded-lg bg-[#E6E6E6] overflow-hidden border-2 border-white shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] hover:scale-105 active:scale-95 transition-transform ml-1"
              >
                <img src={editedProfile?.avatarUrl ?? "https://i.pravatar.cc/80?img=47"} alt="Avatar" className="w-full h-full object-cover" />
              </button>

              {/* Profile User Menu Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 top-10 z-50"
                  >
                    <UserMenu
                      name={userName}
                      email={userEmail}
                      onClose={() => setIsUserMenuOpen(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Elevated Canvas Card Frame */}
          <div className="relative flex-1 bg-white/75 backdrop-blur-xl rounded-[14px] flex flex-col overflow-hidden shadow-[0_4px_24px_#ffff,0_0_0_1px_rgba(255,255,255,0.6)_inset]">

            {/* Canvas Toolbar */}
            <div className="relative z-30 flex items-center gap-3 w-full h-[54px] border-b border-white/30 shrink-0 bg-white/50 backdrop-blur-md px-4">

              {/* Left: Customize + Page switcher */}
              <div className="flex items-center gap-2">
                <div className="relative group">
                  <button
                    onClick={() => {
                      if (isSelectionMode) {
                        setIsSelectionMode(false);
                        setSelectedField(null);
                        setSelectedIndex(undefined);
                      } else {
                        setIsSelectionMode(true);
                        setActiveNav(1); // Make sure Design tab is active
                        setSelectedField(null);
                        setSelectedIndex(undefined);
                      }
                    }}
                    className={`flex items-center gap-2 h-8 px-3 text-sm font-medium rounded-lg transition-colors border ${isSelectionMode
                      ? "bg-[#3B82F6] border-[#3B82F6] text-white hover:bg-[#2563EB]"
                      : "bg-[#F7F7F7] border-[#E6E6E6] text-[#2A2A2F] hover:bg-[#F0F0F0]"
                      }`}
                  >
                    <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" viewBox="0 0 24 24">
                      <path d="M14 4.1 12 6" /><path d="m5.1 8-2.9-.8" /><path d="m6 12-1.9 2" />
                      <path d="M7.2 2.2 8 5.1" />
                      <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
                    </svg>
                    {isSelectionMode ? "Editing Canvas" : "Customize"}
                  </button>
                </div>

                <div className="relative group">
                  <button className="flex items-center gap-2 h-8 px-3 text-sm font-medium bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg text-[#2A2A2F] hover:bg-[#F0F0F0] transition-colors">
                    <span className="text-sm leading-tight">Home</span>
                    <svg className="w-3.5 h-3.5 text-[#171717]/50" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Center: Subdomain Address Status */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3 px-4 h-9 bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg">
                  <span className="flex items-center min-w-0 gap-2 text-sm font-medium">
                    <Globe className="w-[14px] h-[14px] text-[#3b82f6] shrink-0" />
                    <span className="min-w-0 truncate text-[#3b82f6] font-medium font-mono">
                      {subdomain || editedProfile?.name.toLowerCase().replace(/\s+/g, "") || "yourname"}.linkedpage.io
                    </span>
                    {checkingSubdomain ? (
                      <span className="hidden lg:inline text-gray-400 font-normal">checking...</span>
                    ) : isSubdomainAvailable === true ? (
                      <span className="hidden lg:inline text-[#369762] font-semibold text-xs">available!</span>
                    ) : isSubdomainAvailable === false ? (
                      <span className="hidden lg:inline text-[#E45A5A] font-semibold text-xs">taken!</span>
                    ) : null}
                  </span>
                </div>
              </div>

              {/* Right: Device scale switches */}
              <div className="flex items-center gap-1.5">
                {/* Undo/Redo/History Placeholders */}
                <button disabled className="w-8 h-8 flex items-center justify-center rounded-lg text-[#171717]/30 cursor-not-allowed">
                  <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
                  </svg>
                </button>
                <button disabled className="w-8 h-8 flex items-center justify-center rounded-lg text-[#171717]/30 cursor-not-allowed">
                  <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m15 14 5-5-5-5" /><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" />
                  </svg>
                </button>

                <div className="w-px h-4 bg-[#E6E6E6] mx-0.5" />

                {/* Responsive Toggles */}
                <div className="flex items-center bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg overflow-hidden p-0.5 gap-0.5 select-none">
                  <button
                    onClick={() => setPreviewMode("desktop")}
                    className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${previewMode === "desktop"
                      ? "bg-white shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] text-[#2A2A2F]"
                      : "text-[#171717]/40 hover:text-[#2A2A2F]"
                      }`}
                    title="Desktop preview"
                  >
                    <Monitor className="w-[14px] h-[14px]" />
                  </button>
                  <button
                    onClick={() => setPreviewMode("tablet")}
                    className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${previewMode === "tablet"
                      ? "bg-white shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] text-[#2A2A2F]"
                      : "text-[#171717]/40 hover:text-[#2A2A2F]"
                      }`}
                    title="Tablet preview"
                  >
                    <Tablet className="w-[14px] h-[14px]" />
                  </button>
                  <button
                    onClick={() => setPreviewMode("mobile")}
                    className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${previewMode === "mobile"
                      ? "bg-white shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] text-[#2A2A2F]"
                      : "text-[#171717]/40 hover:text-[#2A2A2F]"
                      }`}
                    title="Mobile preview"
                  >
                    <Smartphone className="w-[14px] h-[14px]" />
                  </button>
                  <button
                    onClick={() => {
                      setPreviewMode("resizable");
                      if (resizableWidth === 800) {
                        setResizableWidth(800);
                      }
                    }}
                    className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${previewMode === "resizable"
                      ? "bg-white shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] text-[#2A2A2F]"
                      : "text-[#171717]/40 hover:text-[#2A2A2F]"
                      }`}
                    title="Drag-to-resize preview"
                  >
                    <MoveHorizontal className="w-[14px] h-[14px]" />
                  </button>
                </div>
              </div>

            </div>

            {/* Canvas Main content area */}
            <div
              ref={previewContainerRef}
              className="flex-1 flex items-center justify-center overflow-hidden relative bg-[#F5F5F7] bg-[radial-gradient(#E2E2E9_1.2px,transparent_1.2px)] [background-size:24px_24px] p-6"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`preview-wrapper-${selectedTemplate}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {editedProfile ? (
                    <motion.div
                      animate={{
                        width:
                          previewMode === "desktop" ? "100%" :
                            previewMode === "tablet" ? 768 :
                              previewMode === "mobile" ? 375 :
                                resizableWidth
                      }}
                      transition={isDragging ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 30 }}
                      className="h-full max-w-full flex flex-col bg-white rounded-xl border border-neutral-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden relative group/frame"
                    >
                      {/* Browser Header Bezel */}
                      <div className="h-11 shrink-0 bg-neutral-50 border-b border-neutral-200/80 px-4 flex items-center justify-between select-none">
                        {/* 3 macOS dots */}
                        <div className="flex items-center gap-1.5 w-16">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#E45A5A]/85 hover:bg-[#E45A5A] transition-colors" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/85 hover:bg-[#FFBD2E] transition-colors" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#369762]/85 hover:bg-[#369762] transition-colors" />
                        </div>

                        {/* Address Bar */}
                        <div className="flex-1 max-w-md mx-auto px-4 h-7 bg-white border border-neutral-200/80 rounded-lg flex items-center justify-center gap-1.5 shadow-xs text-neutral-550 font-sans text-[11px] font-medium leading-none">
                          <Globe className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span className="truncate text-neutral-650 font-mono">
                            {subdomain || editedProfile?.name.toLowerCase().replace(/\s+/g, "") || "yourname"}.linkedpage.io
                          </span>
                          <span className="text-neutral-300 mx-1">|</span>
                          <span className="text-neutral-455 shrink-0 text-[10px] font-mono">
                            {previewMode === "desktop" ? `Desktop • ${actualWidth}px` :
                              previewMode === "tablet" ? `Tablet • ${actualWidth}px` :
                                previewMode === "mobile" ? `Mobile • ${actualWidth}px` :
                                  `Custom • ${actualWidth}px`}
                          </span>
                        </div>

                        {/* Right side status indicator */}
                        <div className="w-16 flex justify-end">
                          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider bg-neutral-200/50 px-1.5 py-0.5 rounded">
                            {previewMode}
                          </span>
                        </div>
                      </div>

                      {/* Iframe Viewport Container */}
                      <div className="flex-1 w-full bg-white relative overflow-hidden">
                        {/* Drag Overlay to prevent iframe event interception */}
                        {isDragging && (
                          <div className="absolute inset-0 bg-transparent z-50 cursor-ew-resize" />
                        )}

                        <ProfilePreview
                          profile={editedProfile}
                          template={selectedTemplate}
                          fluid={true}
                          onFieldClick={handleFieldClick}
                          isSelectionMode={isSelectionMode}
                          selectedField={selectedField}
                          selectedIndex={selectedIndex}
                          currentStep={currentStep}
                        />
                      </div>

                      {/* Left Resizing Drag Handle */}
                      <div
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        className="absolute left-0 top-11 bottom-0 w-3 cursor-ew-resize flex items-center justify-center z-[60] bg-transparent group/handle transition-all"
                        title="Drag to resize"
                      >
                        <div className="w-1 h-12 rounded-full bg-neutral-300 hover:bg-neutral-400 group-hover/handle:scale-y-110 group-hover/handle:bg-neutral-400/80 transition-all flex flex-col justify-between py-1 shadow-sm">
                          <span className="w-0.5 h-0.5 rounded-full bg-white mx-auto" />
                          <span className="w-0.5 h-0.5 rounded-full bg-white mx-auto" />
                          <span className="w-0.5 h-0.5 rounded-full bg-white mx-auto" />
                        </div>
                      </div>

                      {/* Right Resizing Drag Handle */}
                      <div
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        className="absolute right-0 top-11 bottom-0 w-3 cursor-ew-resize flex items-center justify-center z-[60] bg-transparent group/handle transition-all"
                        title="Drag to resize"
                      >
                        <div className="w-1 h-12 rounded-full bg-neutral-300 hover:bg-neutral-400 group-hover/handle:scale-y-110 group-hover/handle:bg-neutral-400/80 transition-all flex flex-col justify-between py-1 shadow-sm">
                          <span className="w-0.5 h-0.5 rounded-full bg-white mx-auto" />
                          <span className="w-0.5 h-0.5 rounded-full bg-white mx-auto" />
                          <span className="w-0.5 h-0.5 rounded-full bg-white mx-auto" />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-neutral-400 text-xs font-mono">Loading preview data...</div>
                  )}
                </motion.div>

              </AnimatePresence>
            </div>

          </div>
        </main>
      )}

      {/* ── Two-Column Project Modal ── */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden font-inter select-none animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-[15px] font-bold text-slate-800">
                {editingProjectIndex !== null ? "Edit Portfolio Project" : "Add Portfolio Project"}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors text-lg font-bold font-mono"
              >
                ×
              </button>
            </div>

            {/* Modal Body: Two Columns */}
            <div className="p-6 grid grid-cols-2 gap-6">
              {/* Column 1 (Left Column): Title, Link, Cover Image */}
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Project Title</label>
                  <Input
                    value={modalProjectTitle}
                    onChange={(e) => setModalProjectTitle(e.target.value)}
                    className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                    placeholder="e.g. Acme SaaS App"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Link / Redirect URL</label>
                  <Input
                    value={modalProjectLink}
                    onChange={(e) => setModalProjectLink(e.target.value)}
                    className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                    placeholder="e.g. https://myproject.com"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Cover Image URL</label>
                  <Input
                    value={modalProjectImage}
                    onChange={(e) => setModalProjectImage(e.target.value)}
                    className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                    placeholder="Cover image URL"
                  />
                </div>
              </div>

              {/* Column 2 (Right Column): Description Textarea */}
              <div className="flex flex-col gap-1.5 h-full">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Project Description</label>
                <textarea
                  value={modalProjectDescription}
                  onChange={(e) => setModalProjectDescription(e.target.value)}
                  className="flex-1 min-h-[178px] text-[14px] bg-slate-50 border border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800 p-3.5 outline-none resize-none animate-none"
                  placeholder="Describe the project goals, tech stack, and your key contributions..."
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="h-10 px-6 text-xs font-bold text-[#18181B] hover:bg-slate-50/80 border border-slate-200 rounded-full transition-colors cursor-pointer active:scale-[0.97] flex items-center justify-center"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!modalProjectTitle.trim() || !modalProjectDescription.trim()) {
                    toast.error("Please enter a title and description for the project.");
                    return;
                  }
                  const currentProj = {
                    title: modalProjectTitle.trim(),
                    description: modalProjectDescription.trim(),
                    link: modalProjectLink.trim() || undefined,
                    image: modalProjectImage.trim() || undefined
                  };

                  let updatedProjects = [...(editedProfile?.projects || [])];
                  if (editingProjectIndex !== null) {
                    updatedProjects[editingProjectIndex] = currentProj;
                  } else {
                    updatedProjects.push(currentProj);
                  }

                  setProjects(updatedProjects);
                  updateField("projects", updatedProjects);
                  setIsProjectModalOpen(false);
                  toast.success(editingProjectIndex !== null ? "Project updated successfully!" : "Project added successfully!");
                }}
                className="h-10 px-6 text-xs font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-full transition-colors cursor-pointer active:scale-[0.97] flex items-center justify-center"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Two-Column Services Modal ── */}
      {isServicesModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden font-inter select-none animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-[15px] font-bold text-slate-800">
                {editingServiceIndex !== null ? "Edit Offered Service" : "Add Offered Service"}
              </h3>
              <button
                onClick={() => setIsServicesModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors text-lg font-bold font-mono"
              >
                ×
              </button>
            </div>

            {/* Modal Body: Two Columns */}
            <div className="p-6 grid grid-cols-2 gap-6">
              {/* Column 1 (Left Column): Title, Price */}
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Service Title</label>
                  <Input
                    value={modalServiceTitle}
                    onChange={(e) => setModalServiceTitle(e.target.value)}
                    className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                    placeholder="e.g. Web design"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Price</label>
                  <Input
                    value={modalServicePrice}
                    onChange={(e) => setModalServicePrice(e.target.value)}
                    className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                    placeholder="e.g. $1200"
                  />
                </div>
              </div>

              {/* Column 2 (Right Column): Description Textarea */}
              <div className="flex flex-col gap-1.5 h-full">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Service Description</label>
                <textarea
                  value={modalServiceDescription}
                  onChange={(e) => setModalServiceDescription(e.target.value)}
                  className="flex-1 min-h-[120px] text-[14px] bg-slate-50 border border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800 p-3.5 outline-none resize-none animate-none"
                  placeholder="Describe what this service covers and details of the deliverables..."
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
              <button
                onClick={() => setIsServicesModalOpen(false)}
                className="h-10 px-6 text-xs font-bold text-[#18181B] hover:bg-slate-50/80 border border-slate-200 rounded-full transition-colors cursor-pointer active:scale-[0.97] flex items-center justify-center"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!modalServiceTitle.trim() || !modalServicePrice.trim() || !modalServiceDescription.trim()) {
                    toast.error("Please fill in all service fields.");
                    return;
                  }
                  const currentSrv = {
                    title: modalServiceTitle.trim(),
                    price: modalServicePrice.trim(),
                    description: modalServiceDescription.trim()
                  };

                  let updatedServices = [...(editedProfile?.services || [])];
                  if (editingServiceIndex !== null) {
                    updatedServices[editingServiceIndex] = currentSrv;
                  } else {
                    if (updatedServices.length >= 5) {
                      toast.error("Maximum of 5 services reached.");
                      return;
                    }
                    updatedServices.push(currentSrv);
                  }

                  updateField("services", updatedServices);
                  setIsServicesModalOpen(false);
                  toast.success(editingServiceIndex !== null ? "Service updated successfully!" : "Service added successfully!");
                }}
                className="h-10 px-6 text-xs font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-full transition-colors cursor-pointer active:scale-[0.97] flex items-center justify-center"
              >
                Save Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Two-Column Process Steps Modal ── */}
      {isProcessesModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden font-inter select-none animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-[15px] font-bold text-slate-800">
                {editingProcessIndex !== null ? "Edit Process Step" : "Add Process Step"}
              </h3>
              <button
                onClick={() => setIsProcessesModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors text-lg font-bold font-mono"
              >
                ×
              </button>
            </div>

            {/* Modal Body: Two Columns */}
            <div className="p-6 grid grid-cols-2 gap-6">
              {/* Column 1 (Left Column): Tag, Title */}
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Step Tag</label>
                  <Input
                    value={modalProcessTag}
                    onChange={(e) => setModalProcessTag(e.target.value)}
                    className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                    placeholder="e.g. /01"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Step Name</label>
                  <Input
                    value={modalProcessTitle}
                    onChange={(e) => setModalProcessTitle(e.target.value)}
                    className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                    placeholder="e.g. Creative Discovery"
                  />
                </div>
              </div>

              {/* Column 2 (Right Column): Description Textarea */}
              <div className="flex flex-col gap-1.5 h-full">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Step Description</label>
                <textarea
                  value={modalProcessDescription}
                  onChange={(e) => setModalProcessDescription(e.target.value)}
                  className="flex-1 min-h-[120px] text-[14px] bg-slate-50 border border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800 p-3.5 outline-none resize-none animate-none"
                  placeholder="Describe what is accomplished during this process step..."
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
              <button
                onClick={() => setIsProcessesModalOpen(false)}
                className="h-10 px-6 text-xs font-bold text-[#18181B] hover:bg-slate-50/80 border border-slate-200 rounded-full transition-colors cursor-pointer active:scale-[0.97] flex items-center justify-center"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!modalProcessTag.trim() || !modalProcessTitle.trim() || !modalProcessDescription.trim()) {
                    toast.error("Please fill in all process step fields.");
                    return;
                  }
                  const currentPrc = {
                    stepTag: modalProcessTag.trim(),
                    title: modalProcessTitle.trim(),
                    description: modalProcessDescription.trim()
                  };

                  let updatedProcesses = [...(editedProfile?.processes || DEFAULT_PROCESSES)];
                  if (editingProcessIndex !== null) {
                    updatedProcesses[editingProcessIndex] = currentPrc;
                  } else {
                    updatedProcesses.push(currentPrc);
                  }

                  updateField("processes", updatedProcesses);
                  setIsProcessesModalOpen(false);
                  toast.success(editingProcessIndex !== null ? "Process step updated successfully!" : "Process step added successfully!");
                }}
                className="h-10 px-6 text-xs font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-full transition-colors cursor-pointer active:scale-[0.97] flex items-center justify-center"
              >
                Save Step
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Two-Column Client Testimonials Modal ── */}
      {isTestimonialsModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden font-inter select-none animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-[15px] font-bold text-slate-800">
                {editingTestimonialIndex !== null ? "Edit Client Review" : "Add Client Review"}
              </h3>
              <button
                onClick={() => setIsTestimonialsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors text-lg font-bold font-mono"
              >
                ×
              </button>
            </div>

            {/* Modal Body: Two Columns */}
            <div className="p-6 grid grid-cols-2 gap-6">
              {/* Column 1 (Left Column): Name, Role, Avatar */}
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Client Name</label>
                  <Input
                    value={modalTestimonialName}
                    onChange={(e) => setModalTestimonialName(e.target.value)}
                    className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                    placeholder="e.g. James Walker"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Role / Position</label>
                  <Input
                    value={modalTestimonialRole}
                    onChange={(e) => setModalTestimonialRole(e.target.value)}
                    className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                    placeholder="e.g. Marketing Director, BrightEdge"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Avatar Photo URL (Optional)</label>
                  <Input
                    value={modalTestimonialAvatar}
                    onChange={(e) => setModalTestimonialAvatar(e.target.value)}
                    className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                    placeholder="e.g. avatar image URL"
                  />
                </div>
              </div>

              {/* Column 2 (Right Column): Quote Textarea */}
              <div className="flex flex-col gap-1.5 h-full">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Client Quote / Review</label>
                <textarea
                  value={modalTestimonialQuote}
                  onChange={(e) => setModalTestimonialQuote(e.target.value)}
                  className="flex-1 min-h-[178px] text-[14px] bg-slate-50 border border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800 p-3.5 outline-none resize-none animate-none"
                  placeholder="Enter the client testimonial review text here..."
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
              <button
                onClick={() => setIsTestimonialsModalOpen(false)}
                className="h-10 px-6 text-xs font-bold text-[#18181B] hover:bg-slate-50/80 border border-slate-200 rounded-full transition-colors cursor-pointer active:scale-[0.97] flex items-center justify-center"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!modalTestimonialName.trim() || !modalTestimonialRole.trim() || !modalTestimonialQuote.trim()) {
                    toast.error("Please fill in all testimonial fields.");
                    return;
                  }
                  const currentTst = {
                    name: modalTestimonialName.trim(),
                    role: modalTestimonialRole.trim(),
                    quote: modalTestimonialQuote.trim(),
                    avatarUrl: modalTestimonialAvatar.trim() || undefined
                  };

                  let updatedTestimonials = [...(editedProfile?.testimonials || DEFAULT_TESTIMONIALS)];
                  if (editingTestimonialIndex !== null) {
                    updatedTestimonials[editingTestimonialIndex] = currentTst;
                  } else {
                    updatedTestimonials.push(currentTst);
                  }

                  updateField("testimonials", updatedTestimonials);
                  setIsTestimonialsModalOpen(false);
                  toast.success(editingTestimonialIndex !== null ? "Testimonial review updated successfully!" : "Testimonial review added successfully!");
                }}
                className="h-10 px-6 text-xs font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-full transition-colors cursor-pointer active:scale-[0.97] flex items-center justify-center"
              >
                Save Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-6 h-6 text-neutral-800 animate-spin" />
            <span className="text-xs text-neutral-400 font-mono">Loading workspace...</span>
          </div>
        </div>
      }
    >
      <EditorInner />
    </Suspense>
  );
}

```

---

## File: `app/globals.css`

```css


@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    /* #FFFFFF */
    --foreground: 0 0% 0%;
    /* #000000 (on-surface) */

    --card: 0 0% 98.4%;
    /* #FBFBFB (tertiary) */
    --card-foreground: 0 0% 9%;
    /* #171717 (on-surface-muted) */

    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 0%;

    --primary: 240 5.3% 17.6%;
    /* #2A2A2F */
    --primary-foreground: 0 0% 100%;
    /* #FFFFFF */

    --secondary: 0 0% 95.3%;
    /* #F3F3F3 */
    --secondary-foreground: 0 0% 0%;
    /* #000000 */

    --muted: 0 0% 96.9%;
    /* #F7F7F7 (surface-muted) */
    --muted-foreground: 0 0% 9%;
    /* #171717 */

    --accent: 217 100% 77.6%;
    /* #8DB8FF */
    --accent-foreground: 0 0% 0%;

    --accent-green: 77 100% 70%;
    /* #d4ff66 */
    --accent-green-dark: 77 100% 70%;
    /* #d4ff66 */

    --destructive: 0 74.3% 62.5%;
    /* #E45A5A (error) */
    --destructive-foreground: 0 0% 100%;

    --border: 0 0% 90.2%;
    /* #E6E6E6 */
    --input: 0 0% 100%;
    /* #FFFFFF */
    --ring: 217 100% 77.6%;
    /* #8DB8FF */

    --radius: 0.8125rem;
    /* 13px */

    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;

    /* Motion Durations */
    --dur-1: 120ms;
    --dur-2: 180ms;
    --dur-3: 240ms;
    --dur-4: 300ms;
    --dur-5: 500ms;

    /* Motion Ease-out */
    --ease-out-quad: cubic-bezier(.25, .46, .45, .94);
    --ease-out-cubic: cubic-bezier(.215, .61, .355, 1);
    --ease-out-quart: cubic-bezier(.165, .84, .44, 1);
    --ease-out-quint: cubic-bezier(.23, 1, .32, 1);
    --ease-out-expo: cubic-bezier(.19, 1, .22, 1);
    --ease-out-circ: cubic-bezier(.075, .82, .165, 1);

    /* Motion Ease-in-out */
    --ease-in-out-quad: cubic-bezier(.455, .03, .515, .955);
    --ease-in-out-cubic: cubic-bezier(.645, .045, .355, 1);
    --ease-in-out-quart: cubic-bezier(.77, 0, .175, 1);
    --ease-in-out-quint: cubic-bezier(.86, 0, .07, 1);
    --ease-in-out-expo: cubic-bezier(1, 0, 0, 1);
    --ease-in-out-circ: cubic-bezier(.785, .135, .15, .86);
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-inter;
  }

  :where(p, span, li, h1, h2, h3, h4, h5, h6, a, button, label, td, th) {
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  pre,
  code {
    overflow-x: auto;
    white-space: pre;
  }
}

@layer utilities {
  .font-inter {
    font-family: var(--font-inter-tight), var(--font-inter), sans-serif;
  }

  /* Dark flat button with tactile inner shadow */
  .btn-dark {
    background-color: #2A2A2F;
    box-shadow: 0px 6px 10px -6px rgba(0,0,0,0.09);
    transition: background-color 180ms cubic-bezier(.165, .84, .44, 1), box-shadow 180ms cubic-bezier(.165, .84, .44, 1), transform 120ms cubic-bezier(.25, .46, .45, .94);
  }

  .btn-dark:active {
    transform: scale(0.97);
  }

  .btn-dark-sm {
    background-color: #2A2A2F;
    box-shadow: 0px 6px 10px -6px rgba(0,0,0,0.09);
    transition: background-color 180ms cubic-bezier(.165, .84, .44, 1), box-shadow 180ms cubic-bezier(.165, .84, .44, 1), transform 120ms cubic-bezier(.25, .46, .45, .94);
  }

  .btn-dark-sm:active {
    transform: scale(0.97);
  }

  /* Success gradient button */
  .btn-green {
    background-color: #2A2A2F;
    color: #FFFFFF;
    box-shadow: 0px 6px 10px -6px rgba(0,0,0,0.09);
    transition: opacity 180ms cubic-bezier(.165, .84, .44, 1), transform 120ms cubic-bezier(.25, .46, .45, .94);
  }

  .btn-green:active {
    transform: scale(0.97);
  }

  /* Light card */
  .card-light {
    background: #FBFBFB;
    border: 1px solid #E6E6E6;
    box-shadow: 0px 6px 10px -6px rgba(0,0,0,0.09);
  }

  /* Card button shadow */
  .card-btn-shadow {
    box-shadow: 0px 6px 10px -6px rgba(0,0,0,0.09);
  }

  /* Dark card */
  .dark-card {
    background: #FBFBFB;
    border: 1px solid #E6E6E6;
    box-shadow: 0px 6px 10px -6px rgba(0,0,0,0.09);
  }

  /* Glass card (frosted panel) */
  .glass-card {
    background: rgba(255, 255, 255, 0.507);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(230, 230, 230, 0.4);
    box-shadow: 0px 6px 10px -6px rgba(0,0,0,0.09);
  }

  /* Rainbow gradient text */
  .gradient-text-rainbow {
    background: linear-gradient(93deg, #0894FF 0%, #C959DD 34%, #FF2E54 68%, #FF9004 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Hero gradient overlay */
  .hero-overlay {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.95) 100%);
    opacity: 30%;
  }

  /* Section to dark (top transition) - modified to be simple soft transition */
  .section-to-dark-top {
    background: linear-gradient(180deg, #FFFFFF 0%, #F7F7F7 100%);
  }

  /* Section to dark (bottom transition) - modified to be simple soft transition */
  .section-to-dark-bottom {
    background: linear-gradient(180deg, #F7F7F7 0%, #FFFFFF 100%);
  }

  /* Footer gradient */
  .footer-gradient {
    background: #FBFBFB;
    border: 1px solid #E6E6E6;
  }

  /* Scrollbar hidden for carousels */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Template card hover overlay */
  .template-hover-overlay {
    opacity: 0;
    transition: opacity 180ms cubic-bezier(.165, .84, .44, 1);
  }

  @media (hover: hover) and (pointer: fine) {
    .template-card:hover .template-hover-overlay {
      opacity: 1;
    }
  }

  /* ======================================
     WEBILD DESIGN SYSTEM COMPONENT CLASSES
     ====================================== */

  /* Border radius tokens */
  .rounded-extra-sm {
    border-radius: 4px;
  }

  /* Card surface */
  .card {
    background-color: #FBFBFB;
    border: 1px solid #E6E6E6;
    border-radius: 13px;
    box-shadow: 0px 6px 10px -6px rgba(0,0,0,0.09);
  }

  /* Base button reset + shared styles */
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: 'Inter Tight', 'Inter', -apple-system, sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    border-radius: 13px;
    padding: 14px 13px;
    min-height: 40px;
    cursor: pointer;
    border: none;
    outline: none;
    white-space: nowrap;
    transition: background-color 180ms cubic-bezier(.165, .84, .44, 1), transform 120ms cubic-bezier(.25, .46, .45, .94);
  }

  .button:active {
    transform: scale(0.97);
  }

  /* Primary button */
  .button-primary {
    background-color: #2A2A2F;
    color: #FFFFFF;
    box-shadow: 0px 6px 10px -6px rgba(0,0,0,0.09);
  }

  .button-primary:hover {
    background-color: #3A3A42;
  }

  /* Secondary button */
  .button-secondary {
    background-color: #F3F3F3;
    color: #000000;
    border: 1px solid #E6E6E6;
  }

  .button-secondary:hover {
    background-color: #EAEAEA;
  }

  /* Tertiary button */
  .button-tertiary {
    background-color: transparent;
    color: #000000;
    padding: 0;
    min-height: auto;
    border-radius: 0;
  }

  /* Design system input */
  .ds-input {
    background-color: #FFFFFF;
    color: #171717;
    border: 1px solid #E6E6E6;
    border-radius: 13px;
    padding: 14px 16px;
    height: 48px;
    font-family: 'Inter Tight', 'Inter', -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    outline: none;
    width: 100%;
    transition: border-color 150ms cubic-bezier(.165, .84, .44, 1), box-shadow 150ms cubic-bezier(.165, .84, .44, 1);
  }

  .ds-input::placeholder {
    color: #9CA3AF;
  }

  .ds-input:focus {
    border-color: #8DB8FF;
    box-shadow: 0 0 0 3px rgba(141, 184, 255, 0.15);
  }

  /* Divider */
  .ds-divider {
    height: 1px;
    background-color: #E6E6E6;
    width: 100%;
  }
}
```

---

## File: `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { EditorProvider } from "@/context/EditorContext";
import { Inter, Inter_Tight } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LinkedPage – Turn Your LinkedIn Into a Beautiful Personal Site",
  description:
    "Paste your LinkedIn URL and get a stunning personal micro-site in under 60 seconds. Pick a template, edit inline, publish free.",
  openGraph: {
    title: "LinkedPage – LinkedIn → Personal Site in 60 Seconds",
    description:
      "Convert your LinkedIn profile into a beautiful micro-site. No code. Just paste, customise, publish.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="min-h-screen font-inter bg-white text-black antialiased">
        <EditorProvider>{children}</EditorProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}

```

---

## File: `app/login/page.tsx`

```tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordStep, setShowPasswordStep] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordValid = password.length >= 6;

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) {
      toast.error("Please enter a valid email address!");
      return;
    }
    if (!showPasswordStep) {
      setShowPasswordStep(true);
      setTimeout(() => passwordInputRef.current?.focus(), 100);
      return;
    }
    if (!isPasswordValid) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    setIsSubmitting(true);
    const loadingToast = toast.loading("Authenticating secure session...");
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      toast.dismiss(loadingToast);
      setIsSubmitting(false);

      if (error) {
        toast.error(error.message || "Invalid email or password");
        return;
      }

      if (data && data.user) {
        const nameParts = (data.user.name || "").split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        sessionStorage.setItem(
          "linkedpage_user",
          JSON.stringify({
            id: data.user.id,
            firstName,
            lastName,
            email: data.user.email,
          }),
        );
      }

      toast.success("Welcome back! Signed in successfully.");
      const params = new URLSearchParams(window.location.search);
      if (params.get("intent") === "save_scrape") {
        router.push("/editor?onboarding=true");
      } else {
        router.push("/dashboard");
      }
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Connection failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google Authentication coming in next release!");
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] font-inter select-none">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-screen py-28 mx-auto  max-w-[1536px]">
        {/* ── Left: Form ── */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Card wrapper — exact reference style */}
          <div className="relative bg-white shadow-inner rounded-[20px] px-10 py-14 w-full max-w-md">
            <div className="flex flex-col gap-5">
              {/* Header */}
              <div className="flex flex-col gap-1 text-center items-center">
                <h1 className="text-2xl font-medium text-black w-fit leading-tight">
                  Welcome back
                </h1>
                <p className="text-sm text-black">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Google SSO */}
              <div className="flex flex-col gap-3">
                <button
                  className="button text-sm font-medium outline-none focus:outline-none focus-visible:outline-none transition-all duration-200 card flex items-center justify-center gap-2 w-full"
                  type="button"
                  onClick={handleGoogleLogin}
                >
                  <img
                    className="w-auto"
                    height={16}
                    width={16}
                    alt="Google"
                    src="https://www.webild.io/icons/google.svg"
                  />
                  Continue with Google
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center gap-4">
                <div className="flex-1 border-t-2 border-black/5" />
                <span className="text-xs text-black">or</span>
                <div className="flex-1 border-t-2 border-black/5" />
              </div>

              {/* Form */}
              <form className="flex flex-col gap-4" onSubmit={handleContinue}>
                {/* Email */}
                <div>
                  <div className="z-10 flex items-center gap-1 mb-2 w-full min-w-0 relative">
                    <label className="block text-sm font-medium text-black text-nowrap truncate">
                      Email
                    </label>
                  </div>
                  <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                    <input
                      className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none bg-transparent"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={showPasswordStep || isSubmitting}
                      required
                    />
                  </div>
                </div>

                {/* Password (collapsible) */}
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)]"
                  style={{ gridTemplateRows: showPasswordStep ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden flex flex-col gap-4 p-px">
                    <div>
                      <div className="z-10 flex items-center justify-between gap-1 mb-2 w-full min-w-0 relative">
                        <label className="block text-sm font-medium text-black text-nowrap truncate">
                          Password
                        </label>
                        <button
                          type="button"
                          className="text-xs text-[#8DB8FF] font-medium hover:underline"
                          onClick={() =>
                            toast.info(
                              "Password reset link sent to your email!",
                            )
                          }
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                        <input
                          ref={passwordInputRef}
                          className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none pr-10 bg-transparent"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isSubmitting}
                          required={showPasswordStep}
                        />
                        <button
                          className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-black/75"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  className={`button text-sm font-medium outline-none focus:outline-none focus-visible:outline-none transition-all duration-200 button-primary w-full justify-center ${
                    isSubmitting ||
                    (showPasswordStep ? !isPasswordValid : !isEmailValid)
                      ? "opacity-50"
                      : ""
                  }`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5   rounded-lg border-2 border-white border-t-transparent animate-spin" />
                      Processing...
                    </span>
                  ) : showPasswordStep ? (
                    "Sign in"
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="text-center text-sm text-black">
                Don't have an account?{" "}
                <button
                  className="cursor-pointer text-[#000] font-medium hover:underline"
                  onClick={() =>
                    router.push(`/signup${window.location.search}`)
                  }
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Hero Illustration ── */}
        <div className="relative hidden md:flex rounded-[20px] overflow-hidden bg-gradient-to-tr from-[#8DB8FF]/10 to-[#d4ff66]/10 items-center justify-center border border-[#E6E6E6]">
          <img
            className="absolute inset-0 size-full object-cover opacity-80"
            alt="Auth background"
            src="/bg.png"
          />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
          <img
            className="relative z-20 drop- shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  max-w-[85%] w-auto h-auto"
            alt="Webild input illustration"
            src="https://www.webild.io/images/input.svg"
          />
        </div>
      </div>
    </div>
  );
}

```

---

## File: `app/not-found.tsx`

```tsx
"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white font-inter flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-5 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center gap-8 max-w-sm text-center"
        >
          {/* Icon */}
          <div className="w-16 h-16   rounded-lg bg-[#F3F3F3] flex items-center justify-center">
            <Compass className="w-7 h-7 text-[#9CA3AF]" />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-medium text-black">404</h1>
            <p className="text-base text-[#6B6B6B] leading-relaxed">
              This page doesn't exist. Maybe it was moved, deleted, or you typed
              the URL incorrectly.
            </p>
          </div>

          {/* CTA */}
          <Link href="/" className="button button-primary gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to home
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

```

---

## File: `app/onboarding/page.tsx`

```tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { AlertCircle, ArrowRight } from "lucide-react";
import {
  AnimatedUploadIllustration,
  AnimatedGeneratingIllustration,
} from "@/components/AnimatedSVGs";

function OnboardingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    startScrapeManual,
    scrapeError,
    clearProfile,
    useMockProfile,
    websiteId,
    pendingZip,
    setPendingZip,
  } = useEditor();

  const [step, setStep] = useState<"input" | "loading" | "fallback">("input");
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUploadZipWithFile = async (file: File) => {
    if (file.size > 20 * 1024 * 1024) {
      toast.error(
        "LinkedIn exports are typically under 5MB. Files larger than 20MB are not allowed.",
      );
      return;
    }
    setStep("loading");
    setIsImporting(true);
    const toastId = toast.loading("Processing and parsing ZIP archive...");
    try {
      const success = await startScrapeManual(file);
      toast.dismiss(toastId);
      if (!success) {
        setIsImporting(false);
        setStep("input");
      }
    } catch (e: any) {
      toast.dismiss(toastId);
      toast.error(e.message || "Failed to process ZIP archive.");
      setIsImporting(false);
      setStep("input");
    }
  };

  // If there's an uploaded ZIP from the home page, start processing immediately
  useEffect(() => {
    if (pendingZip) {
      const fileToProcess = pendingZip;
      setPendingZip(null);
      setZipFile(fileToProcess);
      handleUploadZipWithFile(fileToProcess);
    }
  }, [pendingZip, setPendingZip]);

  // Redirect on website creation success
  useEffect(() => {
    if (websiteId && (step === "loading" || isImporting)) {
      setProgress(100);
      const t = setTimeout(() => {
        router.push(`/editor?id=${websiteId}&onboarding=true`);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [websiteId, step, isImporting, router]);

  const handleZipFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setZipFile(file);
      handleUploadZipWithFile(file);
    }
  };

  const handleManualImport = async () => {
    const toastId = toast.loading("Loading default workspace settings...");
    await useMockProfile();
    toast.dismiss(toastId);
    toast.success("Proceeding with default template data.");
    setStep("loading");
  };

  const handleBackToInput = () => {
    router.replace("/onboarding");
    clearProfile();
    setZipFile(null);
    setStep("input");
  };

  const isAuthwallError =
    scrapeError &&
    (scrapeError.toLowerCase().includes("authwall") ||
      scrapeError.toLowerCase().includes("privacy") ||
      scrapeError.toLowerCase().includes("login"));

  return (
    <div className="min-h-screen bg-white font-inter flex flex-col items-center justify-center text-black antialiased relative overflow-hidden">
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-90">
        <img
          src="/bg.png"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* ── Content View Area ── */}
      <main className="w-full flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-[480px]">
          <AnimatePresence mode="wait">
            {/* Step 1 — Upload ZIP */}
            {step === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/70 backdrop-blur-xl border border-[#E6E6E6]/60 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 flex flex-col w-full max-w-[480px] select-none animate-in fade-in zoom-in duration-200"
              >
                <h1 className="text-2xl font-semibold tracking-tight text-[#2A2A2F] text-center mb-2 font-inter">
                  Import your LinkedIn Profile
                </h1>
                <p className="text-[14px] text-gray-500 text-center mb-6 leading-relaxed font-inter">
                  Upload your LinkedIn data export ZIP to build a fully
                  structured website instantly.
                </p>

                {/* ZIP Upload Section */}
                <div className="flex flex-col gap-3 w-full mb-5">
                  <label
                    htmlFor="zip-upload-primary"
                    className="w-full flex flex-col items-center justify-center border-2 border-dashed border-[#E6E6E6] hover:border-[#8DB8FF] rounded-2xl p-6 bg-[#FBFBFB]/50 hover:bg-[#8DB8FF]/5 cursor-pointer transition-[border-color,background-color,box-shadow,transform] duration-150 hover:shadow-[0_0_20px_rgba(141,184,255,0.12)] active:scale-[0.98] relative text-center group"
                  >
                    <input
                      id="zip-upload-primary"
                      type="file"
                      accept=".zip"
                      onChange={handleZipFileChange}
                      className="hidden"
                      disabled={isImporting}
                    />
                    <AnimatedUploadIllustration />
                    {zipFile ? (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[13px] font-semibold text-[#2A2A2F] truncate max-w-[280px]">
                          {zipFile.name}
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium">
                          {(zipFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[13.5px] font-semibold text-[#2A2A2F]">
                          Upload LinkedIn data ZIP
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium">
                          Click to select or drag and drop archive
                        </span>
                      </div>
                    )}
                  </label>
                </div>

                <div className="flex items-center gap-2 mb-4 select-none">
                  <div className="h-px bg-[#E6E6E6] flex-1" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                    Or
                  </span>
                  <div className="h-px bg-[#E6E6E6] flex-1" />
                </div>

                <button
                  onClick={handleManualImport}
                  className="w-full h-11 border border-neutral-200 hover:border-neutral-350 hover:bg-neutral-50 rounded-2xl text-xs font-semibold text-neutral-700 flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98] duration-100 ease-out mb-6"
                >
                  Start from Scratch (Empty Canvas)
                </button>

                {/* Step-by-Step Instructions */}
                <div className="bg-[#FBFBFB]/40 border border-[#E6E6E6]/60 rounded-2xl p-5 mb-6 text-left">
                  <h3 className="text-[11px] font-bold text-[#2A2A2F] uppercase tracking-wider mb-3.5">
                    How to export your profile (takes 2m)
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        num: 1,
                        text: (
                          <>
                            Open LinkedIn's{" "}
                            <a
                              href="https://www.linkedin.com/psettings/member-data"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#3b82f6] font-semibold hover:underline"
                            >
                              Data Settings
                            </a>
                            .
                          </>
                        ),
                      },
                      {
                        num: 2,
                        text: (
                          <>
                            Select <strong>"Something in particular"</strong>{" "}
                            and check the <strong>"Profile"</strong> box.
                          </>
                        ),
                      },
                      {
                        num: 3,
                        text: (
                          <>
                            Click <strong>"Request archive"</strong> and enter
                            password.
                          </>
                        ),
                      },
                      {
                        num: 4,
                        text: (
                          <>Download the ZIP from email and upload it above.</>
                        ),
                      },
                    ].map((item) => (
                      <div
                        key={item.num}
                        className="flex gap-3 text-[12.5px] text-gray-500"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#8DB8FF]/15 text-[#3b82f6] text-[10px] font-bold flex items-center justify-center shrink-0 select-none">
                          {item.num}
                        </span>
                        <span className="leading-normal">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2 — Timeline-style loading */}
            {step === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] w-full max-w-lg overflow-hidden flex flex-col p-8 select-none text-center"
              >
                <AnimatedGeneratingIllustration />
                <div className="space-y-2 mt-4">
                  <div className="font-semibold text-lg text-black font-inter">
                    Reading Profile Data
                  </div>
                  <div className="text-sm text-gray-500 font-inter">
                    Creating website workspace draft...
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-6">
                  <div
                    className="bg-blue-500 h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3 — Scraper failure fallback */}
            {step === "fallback" && (
              <motion.div
                key="fallback"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/70 backdrop-blur-xl border border-[#E6E6E6]/60 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 flex flex-col w-full max-w-[480px] select-none"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-5 shadow-sm border border-[#E6E6E6]/40">
                  <AlertCircle className="w-5 h-5 text-[#E45A5A]" />
                </div>

                <h2 className="text-xl font-semibold text-[#2A2A2F] mb-2 font-inter">
                  Could not fetch public profile
                </h2>
                <div className="text-[13.5px] text-gray-500 leading-relaxed mb-6 font-inter">
                  LinkedIn couldn't be read publicly. Please download your
                  settings archive from{" "}
                  <a
                    href="https://www.linkedin.com/psettings/member-data"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3b82f6] font-semibold hover:underline inline-flex items-center gap-0.5"
                  >
                    LinkedIn's Settings page
                  </a>{" "}
                  and import it below.
                </div>

                <div className="flex flex-col items-center gap-3 w-full mb-6">
                  <label
                    htmlFor="zip-upload"
                    className="w-full flex flex-col items-center justify-center border-2 border-dashed border-[#E6E6E6] hover:border-[#8DB8FF] rounded-2xl p-6 bg-[#FBFBFB]/50 hover:bg-[#8DB8FF]/5 cursor-pointer transition-[border-color,background-color,box-shadow,transform] duration-150 hover:shadow-[0_0_20px_rgba(141,184,255,0.12)] active:scale-[0.98] relative text-center group"
                  >
                    <input
                      id="zip-upload"
                      type="file"
                      accept=".zip"
                      onChange={handleZipFileChange}
                      className="hidden"
                      disabled={isImporting}
                    />
                    <svg
                      className="w-8 h-8 text-gray-400 mb-2 transition-transform duration-200 group-hover:scale-105"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 16v-8m0 8l-4-4m4 4l4-4M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2z"
                      />
                    </svg>
                    {zipFile ? (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[13px] font-semibold text-[#2A2A2F] truncate max-w-[280px]">
                          {zipFile.name}
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium">
                          {(zipFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[13.5px] font-semibold text-[#2A2A2F]">
                          Upload LinkedIn data export ZIP
                        </span>
                      </div>
                    )}
                  </label>
                </div>

                <div className="flex items-center gap-2 mb-4 select-none">
                  <div className="h-px bg-[#E6E6E6] flex-1" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                    Or
                  </span>
                  <div className="h-px bg-[#E6E6E6] flex-1" />
                </div>

                <button
                  onClick={handleManualImport}
                  className="w-full h-11 border border-neutral-200 hover:border-neutral-350 hover:bg-neutral-50 rounded-2xl text-xs font-semibold text-neutral-700 flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98] duration-100 ease-out mb-6"
                >
                  Start from Scratch (Empty Canvas)
                </button>

                <button
                  onClick={handleBackToInput}
                  className="text-xs font-semibold text-neutral-500 hover:text-neutral-700 underline text-center"
                >
                  Go Back
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-neutral-300 border-t-neutral-800 animate-spin" />
        </div>
      }
    >
      <OnboardingInner />
    </Suspense>
  );
}

```

---

## File: `app/page.tsx`

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Home,
  Layout as LayoutIcon,
  Folder,
  CreditCard,
  BookOpen,
  Settings,
  LogOut,
  User,
  Shield,
  Upload,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { UserMenu } from "@/components/UserMenu";
import { useEditor } from "@/context/EditorContext";
import Image from "next/image";

// ─── Small reusable pieces ───────────────────────────────────────────────────

function DarkButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center h-10 px-6      rounded-lg   btn-dark text-white text-[12px] font-medium whitespace-nowrap hover:bg-[#3E3E45] ${className}`}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#d4ff66] text-[13px] leading-[18px] font-semibold uppercase tracking-wider mb-2 font-inter-tight">{children}</p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[28px] sm:text-[38px] leading-[46px] font-normal text-black font-inter-tight">
      {children}
    </h2>
  );
}

// ─── Template card data ───────────────────────────────────────────────────────

const TEMPLATES_LARGE = [
  {
    name: "Minimal Card",
    subtitle: "Clean, elegant, and focused on essential links",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/ccea70025e4eb65efc78244adad19aa72081243a?width=982",
  },
  {
    name: "Bento Grid",
    subtitle: "A highly visual grid showcasing work, experience, and projects",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/b44548e7be08969a8dfc228c049f55fdc9f7bcbb?width=982",
  },
  {
    name: "Full-Page Scroll",
    subtitle: "A modern, smooth-scrolling experience that tells your career story",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/22a1dcc1827cb472b41466029a5665e67ea82849?width=982",
  },
  {
    name: "Dark Bento",
    subtitle: "High-contrast dark mode grid for professional standout profiles",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/de2496b30f9ab12d95e5ad6f29af5e66821c7e0d?width=982",
  },
];

const FAQ_ITEMS = [
  "What is LinkedPage and how does it work?",
  "Do I need design or coding experience to use LinkedPage?",
  "How can I customize my micro-site?",
  "Can I connect my own domain or subdomain?",
  "Does LinkedPage host my micro-site?",
  "Can I edit or update my site after publishing?",
  "Can I export the code of my micro-site?",
];

// ─── Live Preview Modal Component ─────────────────────────────────────────────

function PreviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-2xl bg-white rounded-[18px] border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden text-left flex flex-col max-h-[85vh] select-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F3F3]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5   rounded-lg bg-[#d4ff66]" />
            <span className="text-[13px] font-semibold text-black font-mono">reidhoffman.linkedpage.me</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8   rounded-lg flex items-center justify-center bg-[#F3F3F3] text-black hover:bg-[#EAEAEA] transition-colors active:scale-90 font-bold"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-[#F7F7F7]">
          {/* Micro-site content */}
          <div className="bg-white      rounded-lg   border border-[#E6E6E6] p-6 flex flex-col gap-4  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16   rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 relative">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256"
                  alt="Reid Hoffman"
                  className="object-cover"
                  fill
                  sizes="64px"
                />
              </div>
              <div>
                <h3 className="text-[20px] font-bold text-black font-inter-tight leading-tight">Reid Hoffman</h3>
                <p className="text-[13px] text-gray-500 font-inter-tight">Co-founder LinkedIn | Partner at Greylock</p>
              </div>
            </div>
            <p className="text-[14px] text-[#171717]/80 leading-relaxed font-inter-tight">
              Entrepreneur, executive, and venture capitalist. Passionate about building products that connect people and scale networks to transform industries.
            </p>
          </div>

          {/* Bento blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white      rounded-lg   border border-[#E6E6E6] p-4 flex flex-col gap-2  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
              <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Experience</span>
              <p className="text-[14px] font-semibold text-black font-inter-tight">Greylock Partners</p>
              <p className="text-[12px] text-gray-500 font-inter-tight">Partner • 2009 - Present</p>
            </div>
            <div className="bg-white      rounded-lg   border border-[#E6E6E6] p-4 flex flex-col gap-2  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
              <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Education</span>
              <p className="text-[14px] font-semibold text-black font-inter-tight">Stanford University</p>
              <p className="text-[12px] text-gray-500 font-inter-tight">BS in Cognitive Science</p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#F3F3F3] bg-white">
          <button
            onClick={() => toast.success("Code ZIP export complete! check your downloads.")}
            className="h-10 px-5      rounded-lg   bg-[#2A2A2F] text-white text-[12px] font-medium hover:bg-[#3E3E45] transition-colors active:scale-95"
          >
            Export ZIP Source
          </button>
          <button
            onClick={() => { toast.success("Micro-site published live on reidhoffman.linkedpage.me!"); onClose(); }}
            className="h-10 px-5      rounded-lg   bg-[#d4ff66] border border-[#d4ff66]/40 text-[#d4ff66] text-[12px] font-medium hover:bg-[#D4FCD4] transition-colors active:scale-95"
          >
            Publish Live
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const COLOR_PALETTES = [
  { name: "Alexandria", gradient: "conic-gradient(rgb(245, 250, 255) 0%, rgb(245, 250, 255) 25%, rgb(21, 71, 156) 25%, rgb(21, 71, 156) 50%, rgb(168, 204, 232) 50%, rgb(168, 204, 232) 75%, rgb(123, 163, 207) 75%, rgb(123, 163, 207) 100%)" },
  { name: "Evergreen", gradient: "conic-gradient(rgb(250, 255, 251) 0%, rgb(250, 255, 251) 25%, rgb(10, 112, 95) 25%, rgb(10, 112, 95) 50%, rgb(168, 217, 190) 50%, rgb(168, 217, 190) 75%, rgb(107, 191, 184) 75%, rgb(107, 191, 184) 100%)" },
  { name: "Crimson", gradient: "conic-gradient(rgb(255, 250, 250) 0%, rgb(255, 250, 250) 25%, rgb(230, 57, 70) 25%, rgb(230, 57, 70) 50%, rgb(245, 196, 199) 50%, rgb(245, 196, 199) 75%, rgb(240, 145, 153) 75%, rgb(240, 145, 153) 100%)" },
  { name: "Lavender", gradient: "conic-gradient(rgb(251, 250, 255) 0%, rgb(251, 250, 255) 25%, rgb(139, 92, 246) 25%, rgb(139, 92, 246) 50%, rgb(216, 206, 245) 50%, rgb(216, 206, 245) 75%, rgb(196, 168, 249) 75%, rgb(196, 168, 249) 100%)" },
  { name: "Sahara", gradient: "conic-gradient(rgb(246, 240, 233) 0%, rgb(246, 240, 233) 25%, rgb(43, 24, 10) 25%, rgb(43, 24, 10) 50%, rgb(148, 135, 124) 50%, rgb(148, 135, 124) 75%, rgb(175, 160, 148) 75%, rgb(175, 160, 148) 100%)" },
  { name: "Glacier", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(28, 28, 28) 25%, rgb(28, 28, 28) 50%, rgb(21, 71, 156) 50%, rgb(21, 71, 156) 75%, rgb(168, 204, 232) 75%, rgb(168, 204, 232) 100%)" },
  { name: "Forest", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(28, 28, 28) 25%, rgb(28, 28, 28) 50%, rgb(21, 156, 73) 50%, rgb(21, 156, 73) 75%, rgb(168, 232, 186) 75%, rgb(168, 232, 186) 100%)" },
  { name: "Coral", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(28, 28, 28) 25%, rgb(28, 28, 28) 50%, rgb(230, 57, 70) 50%, rgb(230, 57, 70) 75%, rgb(232, 190, 168) 75%, rgb(232, 190, 168) 100%)" },
  { name: "Amethyst", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(28, 28, 28) 25%, rgb(28, 28, 28) 50%, rgb(97, 57, 230) 50%, rgb(97, 57, 230) 75%, rgb(179, 168, 232) 75%, rgb(179, 168, 232) 100%)" },
  { name: "Parchment", gradient: "conic-gradient(rgb(239, 235, 229) 0%, rgb(239, 235, 229) 25%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 50%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 75%, rgb(225, 184, 117) 75%, rgb(225, 184, 117) 100%)" },
  { name: "Emerald City", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(31, 81, 76) 25%, rgb(31, 81, 76) 50%, rgb(21, 156, 73) 50%, rgb(21, 156, 73) 75%, rgb(168, 232, 186) 75%, rgb(168, 232, 186) 100%)" },
  { name: "Navy Pier", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(31, 50, 81) 25%, rgb(31, 50, 81) 50%, rgb(21, 71, 156) 50%, rgb(21, 71, 156) 75%, rgb(168, 204, 232) 75%, rgb(168, 204, 232) 100%)" },
  { name: "Bordeaux", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(81, 31, 31) 25%, rgb(81, 31, 31) 50%, rgb(230, 57, 70) 50%, rgb(230, 57, 70) 75%, rgb(232, 190, 168) 75%, rgb(232, 190, 168) 100%)" },
  { name: "Plum", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(52, 31, 81) 25%, rgb(52, 31, 81) 50%, rgb(97, 57, 230) 50%, rgb(97, 57, 230) 75%, rgb(179, 168, 232) 75%, rgb(179, 168, 232) 100%)" },
  { name: "Sakura", gradient: "conic-gradient(rgb(247, 246, 247) 0%, rgb(247, 246, 247) 25%, rgb(27, 12, 37) 25%, rgb(27, 12, 37) 50%, rgb(255, 147, 228) 50%, rgb(255, 147, 228) 75%, rgb(232, 168, 195) 75%, rgb(232, 168, 195) 100%)" },
  { name: "Sunset", gradient: "conic-gradient(rgb(247, 246, 247) 0%, rgb(247, 246, 247) 25%, rgb(255, 98, 7) 25%, rgb(255, 98, 7) 50%, rgb(255, 206, 147) 50%, rgb(255, 206, 147) 75%, rgb(232, 207, 168) 75%, rgb(232, 207, 168) 100%)" },
  { name: "Azure", gradient: "conic-gradient(rgb(247, 246, 247) 0%, rgb(247, 246, 247) 25%, rgb(7, 152, 255) 25%, rgb(7, 152, 255) 50%, rgb(147, 199, 255) 50%, rgb(147, 199, 255) 75%, rgb(168, 205, 232) 75%, rgb(168, 205, 232) 100%)" },
  { name: "Peach Blossom", gradient: "conic-gradient(rgb(227, 222, 234) 0%, rgb(227, 222, 234) 25%, rgb(39, 35, 31) 25%, rgb(39, 35, 31) 50%, rgb(198, 138, 98) 50%, rgb(198, 138, 98) 75%, rgb(198, 138, 98) 75%, rgb(198, 138, 98) 100%)" },
  { name: "Iris", gradient: "conic-gradient(rgb(227, 222, 234) 0%, rgb(227, 222, 234) 25%, rgb(31, 32, 39) 25%, rgb(31, 32, 39) 50%, rgb(98, 125, 198) 50%, rgb(98, 125, 198) 75%, rgb(98, 125, 198) 75%, rgb(98, 125, 198) 100%)" },
  { name: "Sandstone", gradient: "conic-gradient(rgb(245, 244, 239) 0%, rgb(245, 244, 239) 25%, rgb(42, 41, 40) 25%, rgb(42, 41, 40) 50%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 75%, rgb(198, 177, 128) 75%, rgb(198, 177, 128) 100%)" },
  { name: "Slate", gradient: "conic-gradient(rgb(245, 244, 240) 0%, rgb(245, 244, 240) 25%, rgb(44, 44, 44) 25%, rgb(44, 44, 44) 50%, rgb(138, 138, 138) 50%, rgb(138, 138, 138) 75%, rgb(232, 230, 225) 75%, rgb(232, 230, 225) 100%)" },
  { name: "Botanical", gradient: "conic-gradient(rgb(246, 247, 244) 0%, rgb(246, 247, 244) 25%, rgb(14, 58, 41) 25%, rgb(14, 58, 41) 50%, rgb(53, 193, 139) 50%, rgb(53, 193, 139) 75%, rgb(198, 239, 198) 75%, rgb(198, 239, 198) 100%)" },
  { name: "Desert", gradient: "conic-gradient(rgb(252, 246, 236) 0%, rgb(252, 246, 236) 25%, rgb(46, 37, 33) 25%, rgb(46, 37, 33) 50%, rgb(178, 162, 139) 50%, rgb(178, 162, 139) 75%, rgb(178, 162, 139) 75%, rgb(178, 162, 139) 100%)" },
  { name: "Rosewood", gradient: "conic-gradient(rgb(247, 246, 247) 0%, rgb(247, 246, 247) 25%, rgb(184, 43, 64) 25%, rgb(184, 43, 64) 50%, rgb(185, 9, 65) 50%, rgb(185, 9, 65) 75%, rgb(232, 168, 182) 75%, rgb(232, 168, 182) 100%)" },
];



function HabitlineProductShowcase() {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }
    }
  };

  return (
    <div className="relative w-full select-none pointer-events-none">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-44 h-44 bg-[#8DB8FF]/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-44 h-44 bg-[#d4ff66]/10 rounded-full blur-[60px] pointer-events-none" />

      {/* Clipped image container */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full overflow-hidden rounded-t-2xl border border-gray-200/80 border-b-0 shadow-[0_-12px_30px_-5px_rgba(0,0,0,0.03),0_20px_40px_-15px_rgba(0,0,0,0.08)]"
      >
        <Image
          src="/heroimage.png"
          alt="Website Preview"
          className="w-full h-auto object-cover object-top select-none pointer-events-none"
          width={1200}
          height={675}
          priority
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </motion.div>
    </div>
  );
}

function HeroSection() {
  const router = useRouter();

  const heroContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  };

  return (
    <section className="relative w-full h-[100vh] flex flex-col items-center justify-between overflow-hidden bg-white pt-24 pb-0">
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-90">
        <Image
          src="/bg.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Centered Content Container */}
      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mt-20 w-full mx-auto flex flex-col items-center text-center gap-6 px-6 sm:px-8"
      >
        {/* Heading Title */}
        <motion.h1
          variants={heroItemVariants}
          className="text-black text-[42px] sm:text-[56px] lg:text-[68px] leading-[1.05] font-semibold tracking-tight font-inter-tight max-w-4xl"
        >
          Build personal website that actually stands out.
        </motion.h1>

        {/* Subheading description */}
        <motion.p
          variants={heroItemVariants}
          className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl font-inter-tight"
        >
          Instantly turn your LinkedIn public data export ZIP into a fully structured personal website. Edit layout templates, add custom domains, and go live.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={heroItemVariants}
          className="flex flex-wrap items-center justify-center gap-3.5 mt-2"
        >
          <button
            onClick={() => router.push("/onboarding")}
            className="h-11 px-7 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[13px] font-semibold rounded-full transition-[background-color,transform] duration-100 active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] cursor-pointer"
          >
            Build Your Website
          </button>

          <button
            onClick={() => router.push("/editor")}
            className="h-11 px-7 bg-white/40 hover:bg-white/70 text-black text-[13px] font-semibold rounded-full transition-[background-color,transform] duration-100 active:scale-[0.97] flex items-center justify-center gap-2 shadow-[0px_4px_10px_rgba(0,0,0,0.03)] cursor-pointer border border-[#E6E6E6] backdrop-blur-sm"
          >
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-y-[0.5px]">
              <path d="M1 1.5 L8.5 6 L1 10.5 Z" fill="black" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            Skip & Try Mock Data
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Product Showcase Visual - 80% width, pushed down by 20% */}
      <motion.div
        variants={heroItemVariants}
        className="w-[80%] flex justify-center z-10 mt-auto transform translate-y-[10%]"
      >
        <HabitlineProductShowcase />
      </motion.div>

      {/* White gradient overlay absolute at the bottom of the hero section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-20 pointer-events-none" />
    </section>
  );
}

// ─── Templates Section ────────────────────────────────────────────────────────

function TemplatesSection({ onSelectTemplate }: { onSelectTemplate: (name: string) => void }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === "next" ? 520 : -520, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  };

  return (
    <section id="templates" className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden lg:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div className="flex flex-col">
            <SectionLabel>Browse our collection</SectionLabel>
            <SectionHeading>Start with a Template</SectionHeading>
          </div>
          <DarkButton
            onClick={() => toast.success("Loaded all templates!")}
            className="self-start sm:self-auto"
          >
            View All Templates
          </DarkButton>
        </div>

        {/* Template cards carousel */}
        <div className="relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
          >
            {TEMPLATES_LARGE.map((t, i) => (
              <motion.div
                variants={itemVariants}
                key={i}
                className="flex-shrink-0 w-[300px] sm:w-[380px] lg:w-[495px] template-card group"
              >
                <div className="relative aspect-square      rounded-lg   overflow-hidden p-0 bg-[#FBFBFB] border border-[#E6E6E6] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  transition-transform duration-300 ease-out hover:scale-[1.01] will-change-transform">
                  <Image src={t.img} alt={t.name} fill className="object-cover rounded-lg" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  {/* Bottom gradient overlay inside padding */}
                  <div className="absolute bottom-[11px] left-[11px] right-[11px] h-2/5 rounded-b-[8px]" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)" }} />
                  {/* Title */}
                  <div className="absolute bottom-[11px] left-[11px] right-[11px] p-5 z-10">
                    <p className="text-white text-[20px] font-normal leading-[26px] font-inter-tight">{t.name}</p>
                    <p className="text-white/75 text-[14px] leading-[20px] font-inter-tight">{t.subtitle}</p>
                  </div>
                  {/* Hover overlay */}
                  <div className="template-hover-overlay absolute inset-[11px] flex items-center justify-center     rounded-lg  bg-white/30 backdrop-blur-[1.5px]">
                    <div className="relative">
                      <div className="absolute -inset-1 opacity-20 blur-[4px]" style={{ background: "linear-gradient(95deg, #0894FF 0%, #C959DD 34%, #FF2E54 68%, #FF9004 100%)" }} />
                      <div className="relative p-0.5      rounded-lg   overflow-hidden bg-white">
                        <button
                          onClick={() => onSelectTemplate(t.name)}
                          className="h-10 px-5      rounded-lg   bg-[#2A2A2F] text-white text-[12px] font-medium hover:bg-[#3E3E45] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] "
                        >
                          Customize this look
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress + controls */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex-1 h-2   rounded-lg border border-[#E6E6E6] bg-[#FBFBFB]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden mr-8">
            <div className="h-full w-1/4   rounded-lg" style={{ background: "linear-gradient(90deg, #d4ff66 0%, #d4ff66 100%)" }} />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollCarousel("prev")}
              className="flex items-center justify-center w-8 h-8      rounded-lg   border border-[#E6E6E6] bg-white text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254" stroke="currentColor" strokeWidth="1.03417" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel("next")}
              className="flex items-center justify-center w-8 h-8      rounded-lg   border border-[#E6E6E6] bg-white text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M4.65375 9.30754L7.75625 6.20504L4.65375 3.10254" stroke="currentColor" strokeWidth="1.03417" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── How It Works Section ─────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    img: "/process1 (1).png",
    boldText: "Upload LinkedIn ZIP export",
    restText: " and watch LinkedPage parse your profile data to instantly render a professional personal page.",
  },
  {
    img: "/process1 (2).png",
    boldText: "Customize inline",
    restText: " text and images directly on the screen, and pick from multiple clean layout styles like Bento or minimal.",
  },
  {
    img: "/process1 (3).png",
    boldText: "Publish or export",
    restText: " instantly to a free subdomain or download the complete source code as a zip file to host anywhere.",
  },
];

function HowItWorksSection({ onStartGen }: { onStartGen: () => void }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-[#F7F7F7] border-t border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>Get your page in under 60 seconds</SectionHeading>
          </div>
          <DarkButton
            onClick={onStartGen}
            className="self-start sm:self-auto"
          >
            Generate Now
          </DarkButton>
        </div>

        {/* 3-column grid with stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div variants={itemVariants} key={i} className="flex flex-col gap-4">
              <div className="     rounded-lg   border border-[#E6E6E6] bg-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden p-2 transition-transform duration-300 ease-out hover:scale-[1.01] will-change-transform">
                <Image
                  src={item.img}
                  alt={item.boldText}
                  className="w-full rounded-lg object-cover aspect-[41/38]"
                  width={410}
                  height={380}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="text-[16px] leading-[24px] text-[#171717]/60 font-inter-tight">
                <span className="text-[#171717] font-medium block mb-1 text-[18px] leading-[24px]">{item.boldText}</span>
                {item.restText}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Business Section (Career Showcase) ──────────────────────────────────────

const BUSINESS_TABS = ["Experience", "Projects", "Education", "Contact"];
const BUSINESS_CARDS = [
  "https://api.builder.io/api/v1/image/assets/TEMP/dd2d088a6043ca3ede653099742f96ac52246893?width=2560",
  "https://api.builder.io/api/v1/image/assets/TEMP/bd350a3668e75fb33844ff3cbe4a31706b2273df?width=2560",
  "https://api.builder.io/api/v1/image/assets/TEMP/f502cc59ba5f4d7f14360e66cb7e6447fb3a3c98?width=2560",
  "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=1200" // 4th placeholder card image for Contact tab
];

function BusinessSection() {
  const [activeTab, setActiveTab] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (i: number) => {
    setActiveTab(i);
    if (carouselRef.current) {
      const container = carouselRef.current;
      const slide = container.children[i] as HTMLElement;
      if (slide) {
        container.scrollTo({
          left: slide.offsetLeft - 8,
          behavior: "smooth"
        });
      }
    }
  };

  const scrollCarousel = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth;
    carouselRef.current.scrollBy({ left: dir === "next" ? scrollAmount : -scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="showcase" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6E6E6]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20 flex flex-col gap-8"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionLabel>Beautiful structures for real content</SectionLabel>
          <SectionHeading>Showcase Your Career</SectionHeading>
        </div>

        {/* Tabs with layout glide */}
        <div className="flex justify-center mt-2">
          <div className="flex items-center      rounded-lg   bg-[#F3F3F3] p-1 border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  relative">
            {BUSINESS_TABS.map((tab, i) => {
              const isActive = activeTab === i;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(i)}
                  className={`relative h-9 px-6 text-[14px] leading-[20px] rounded-[10px] transition-colors duration-200 whitespace-nowrap font-inter-tight z-10 ${isActive ? "text-[#d4ff66] font-semibold" : "text-[#171717]/60 hover:text-black"}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-business-tab"
                      className="absolute inset-0 bg-[#d4ff66] border border-[#d4ff66]/40 rounded-[10px]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Card carousel */}
        <div className="relative mt-4">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide      rounded-lg   border border-[#E6E6E6] p-2 bg-[#FBFBFB]"
          >
            {BUSINESS_CARDS.map((src, i) => (
              <div key={i} className="flex-shrink-0 w-full max-w-[900px] sm:max-w-[1100px]     rounded-lg  overflow-hidden  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  transition-transform duration-300 ease-out hover:scale-[1.005] will-change-transform">
                <Image src={src} alt={`Business card ${i + 1}`} className="w-full h-auto rounded-lg object-cover" width={1100} height={620} sizes="(max-width: 1200px) 100vw, 1100px" />
              </div>
            ))}
          </div>
          {/* Arrows */}
          <button
            onClick={() => scrollCarousel("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10   rounded-lg bg-white border border-[#E6E6E6] text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out hidden sm:flex"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254" stroke="currentColor" strokeWidth="1.03417" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scrollCarousel("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10   rounded-lg bg-white border border-[#E6E6E6] text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out hidden sm:flex"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M4.65375 9.30754L7.75625 6.20504L4.65375 3.10254" stroke="currentColor" strokeWidth="1.03417" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────

const FEATURES = [
  {
    img: "/feature (1).png",
    text: "Fully responsive layouts optimized for mobile, tablet, and desktop viewing.",
  },
  {
    img: "/feature (2).png",
    text: "Export clean static code zip files to host on GitHub Pages, Vercel, or Netlify.",
  },
];

function FeaturesSection({ onStartTrial }: { onStartTrial: () => void }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  };

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-[#F7F7F7] border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <SectionLabel>Clean & Modern Aesthetics</SectionLabel>
            <SectionHeading>A Page with Real Content</SectionHeading>
          </div>
          <DarkButton
            onClick={onStartTrial}
            className="self-start sm:self-auto"
          >
            Try It Free
          </DarkButton>
        </div>

        {/* 2-column grid with stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {FEATURES.map((f, i) => (
            <motion.div variants={itemVariants} key={i} className="flex flex-col gap-4">
              <div className="     rounded-lg   border border-[#E6E6E6] bg-white p-2 overflow-hidden  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  transition-transform duration-300 ease-out hover:scale-[1.01] will-change-transform">
                <Image
                  src={f.img}
                  alt={f.text}
                  className="w-full rounded-lg object-cover aspect-[13/8]"
                  width={650}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p className="text-[#171717] text-[16px] sm:text-[18px] leading-[27px] font-normal font-inter-tight">{f.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  const answers: Record<number, string> = {
    0: "LinkedPage is a web tool that converts a LinkedIn data export ZIP into a beautiful personal micro-site. You upload your LinkedIn ZIP export, the platform parses your profile data, and instantly renders a customizable page.",
    1: "No design or coding experience is required! LinkedPage automatically extracts your career history, skills, and details, then formats them into a polished personal website.",
    2: "You can edit text and images inline, swap and rearrange layout elements, and switch templates (minimal card, bento grid, full-page scroll, or dark mode) directly on the screen.",
    3: "Yes! You can connect your own custom domain, or publish it instantly on a free subdomain (like yourname.linkedpage.me).",
    4: "Yes, every site built with LinkedPage includes fast, free built-in hosting, so your professional site is online in seconds.",
    5: "Absolutely. You can update your site at any time through our inline visual editor. Changes go live instantly.",
    6: "Yes, you can export the generated code as a ZIP file containing clean, static HTML, CSS, and JS to host on GitHub Pages, Vercel, or any provider of your choice.",
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-12">
          <SectionLabel>Frequently Asked Questions</SectionLabel>
          <SectionHeading>Still have questions about LinkedPage?</SectionHeading>
        </div>

        {/* FAQ items */}
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {FAQ_ITEMS.map((question, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="     rounded-lg   border border-[#E6E6E6] bg-[#FBFBFB]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden font-inter">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => toggle(i)}
                >
                  <span className="text-[#171717] text-[16px] sm:text-[18px] leading-[26px] font-medium font-inter-tight pr-4">
                    {question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-[10px] btn-dark-sm text-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] "
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path d="M2.94586 7.5H11.1945" stroke="currentColor" strokeWidth="1.17833" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M7.07001 3.375V11.625"
                        stroke="currentColor"
                        strokeWidth="1.17833"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transformOrigin: "center",
                          transition: "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s ease",
                          transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                          opacity: isOpen ? 0 : 1
                        }}
                      />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-[#171717]/60 text-[15px] sm:text-[16px] leading-[24px] font-inter-tight border-t border-[#F3F3F3]/80 pt-4">
                        {answers[i]}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Index() {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [brandName, setBrandName] = useState("Creative Portfolio");
  const [subdomain, setSubdomain] = useState("realitycheque.io");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setShowPreview(true);
      window.history.replaceState({}, "", "/");
    }
    const storedBrand = sessionStorage.getItem("webild_brand_name");
    const storedSubdomain = sessionStorage.getItem("webild_subdomain");
    if (storedBrand) setBrandName(storedBrand);
    if (storedSubdomain) setSubdomain(storedSubdomain);

    try {
      const storedUser = sessionStorage.getItem("linkedpage_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUserName(parsed.name || "");
        setUserEmail(parsed.email || "");
      }
    } catch {
      // ignore
    }
  }, []);

  const simulateGeneration = (url: string) => {
    const raw = url.split(" --theme")[0].trim();
    if (!raw) {
      toast.error("Please paste a LinkedIn URL first!");
      return;
    }
    if (!raw.includes("linkedin.com/in/")) {
      toast.error("Please paste a valid LinkedIn profile URL (linkedin.com/in/…)");
      return;
    }
    router.push(`/onboarding?url=${encodeURIComponent(raw)}`);
  };

  const handleSelectTemplate = (templateName: string) => {
    // Map landing-page template name → editor template id
    const map: Record<string, string> = {
      "Minimal Card": "minimal-card",
      "Bento Grid": "bento-grid",
      "Full-Page Scroll": "full-scroll",
      "Dark Bento": "dark",
    };
    const id = map[templateName] ?? "minimal-card";
    router.push(`/editor?template=${id}`);
  };

  const handleTrial = () => {
    router.push("/editor");
  };

  const handleLogout = () => {
    toast.success("Logging out...");
    setTimeout(() => router.push("/login"), 1000);
  };

  return (
    <div className="min-h-screen font-inter bg-[#FBFBFB] text-black antialiased relative overflow-x-hidden">

      {/* ── Original Floating Navbar ── */}
      <Navbar />

      {/* ── Sidebar Toggle Trigger ── */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed left-5 top-28 z-40 w-10 h-10 rounded-full bg-white border border-[#E6E6E6] hover:bg-[#F7F7F7] active:scale-95 flex items-center justify-center shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] transition-all"
          title="Open Sidebar"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* ── Floating Overlay Sidebar (Closed by default, gap on left) ── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-45 bg-black/15 backdrop-blur-[2px]"
            />

            {/* Floating Sidebar Panel */}
            <motion.aside
              initial={{ opacity: 0, x: -60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="fixed left-5 top-28 bottom-5 w-[260px] border border-[#E6E6E6] bg-white/95 backdrop-blur-md px-6 py-6 flex flex-col justify-between z-50 select-none rounded-[16px] shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
            >

              {/* Top navigation items */}
              <div className="flex flex-col gap-6">

                {/* Header with Close button */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-black/40 uppercase tracking-wider">Navigation</span>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-black/5 text-[#171717]/60 hover:text-black transition-colors"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* New Website Button */}
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    router.push("/onboarding");
                  }}
                  className="w-full h-11 bg-[#F3F3F5] hover:bg-[#EAEAEB] active:scale-[0.98] transition-all rounded-[12px] flex items-center justify-center gap-2 text-[14px] font-semibold text-black"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M9 12h6M12 9v6" />
                  </svg>
                  New Website
                </button>

                {/* Menu Items (Home Active) */}
                <div className="flex flex-col gap-1.5">
                  <button
                    className="w-full h-10 px-3 rounded-[8px] bg-[#E8F1FF] border border-[#8DB8FF]/40 flex items-center gap-3 text-[14px] font-semibold text-[#1A68FF] transition-all text-left"
                    style={{ boxShadow: "0 6px 10px -6px #00000016" }}
                  >
                    <Home className="w-[18px] h-[18px] text-[#1A68FF]" />
                    Home
                  </button>

                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/editor");
                    }}
                    className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all text-left"
                  >
                    <LayoutIcon className="w-[18px] h-[18px] text-black" />
                    Templates
                  </button>

                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/dashboard");
                    }}
                    className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all text-left"
                  >
                    <Folder className="w-[18px] h-[18px] text-black" />
                    All Websites
                  </button>
                </div>

                {/* Recent Websites Section */}
                <div className="flex flex-col gap-2.5 pt-2 border-t border-[#F5F5F7]">
                  <span className="text-[12px] font-semibold text-[#88888E] px-3">Recent websites</span>

                  <div
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/dashboard");
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] hover:bg-white/60 cursor-pointer transition-all bg-white/30"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#F3F3F5] flex items-center justify-center text-[11px] font-bold text-black border border-[#E6E6E6]">
                      c
                    </div>
                    <span className="text-[13px] font-semibold text-[#171717] truncate">{brandName}</span>
                  </div>
                </div>

              </div>

              {/* Bottom navigation & pricing items */}
              <div className="flex flex-col gap-6">

                {/* Pricing, Documentation, Settings */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/pricing");
                    }}
                    className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all text-left"
                  >
                    <CreditCard className="w-[18px] h-[18px] text-black" />
                    Pricing
                  </button>

                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/docs");
                    }}
                    className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all text-left"
                  >
                    <BookOpen className="w-[18px] h-[18px] text-black" />
                    Documentation
                  </button>

                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/settings");
                    }}
                    className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all text-left"
                  >
                    <Settings className="w-[18px] h-[18px] text-black" />
                    Settings
                  </button>
                </div>

              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Full-Width Container ── */}
      <div className="relative z-10 w-full min-h-screen">
        <main className="w-full relative">
          <HeroSection />
          <FAQSection />
          <Footer />
        </main>
      </div>

      {/* Scraped Site Live Preview Overlay Modal */}
      <AnimatePresence>
        {showPreview && (
          <PreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

```

---

## File: `app/preview/page.tsx`

```tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import ProfilePreview from "@/app/editor/components/ProfilePreview";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  Globe,
  Download,
  ExternalLink,
  Check,
  Loader2,
  Share2,
  Pencil,
  Smartphone,
  Monitor,
} from "lucide-react";

type PreviewMode = "desktop" | "mobile";
type PublishStep = "idle" | "subdomain" | "publishing" | "done";

// ─── Subdomain input panel ─────────────────────────────────────────────────────
function PublishPanel({
  onPublish,
  publishing,
}: {
  onPublish: (slug: string) => void;
  publishing: boolean;
}) {
  const { editedProfile } = useEditor();

  const suggestedSlug = editedProfile
    ? editedProfile.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    : "yourname";

  const [slug, setSlug] = useState(suggestedSlug);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);

  const isValid = /^[a-z0-9-]{3,30}$/.test(slug);

  // Debounced subdomain checking
  useEffect(() => {
    if (!slug || slug.length < 3) {
      setIsAvailable(false);
      return;
    }
    setChecking(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/websites/subdomain/check?slug=${encodeURIComponent(slug)}`,
        );
        const data = await res.json();
        if (res.ok) {
          setIsAvailable(data.available);
        } else {
          setIsAvailable(false);
        }
      } catch {
        setIsAvailable(false);
      } finally {
        setChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-medium text-black mb-1">
          Choose your subdomain
        </h3>
        <p className="text-xs text-[#9CA3AF]">Your free URL on LinkedPage</p>
      </div>

      <div className="flex items-center rounded-lg border border-[#E6E6E6] overflow-hidden bg-white focus-within:border-[#8DB8FF] focus-within:shadow-[0_0_0_3px_rgba(141,184,255,0.15)] transition-all duration-150">
        <div className="px-3 py-2.5 bg-[#F3F3F3] border-r border-[#E6E6E6] text-xs text-[#9CA3AF] whitespace-nowrap flex-shrink-0">
          linkedpage.io/
        </div>
        <input
          className="flex-1 px-3 py-2.5 text-sm text-black bg-transparent outline-none min-w-0"
          value={slug}
          onChange={(e) =>
            setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
          }
          placeholder="yourname"
          maxLength={30}
        />
      </div>

      {slug && !isValid && (
        <p className="text-xs text-[#E45A5A]">
          3–30 characters, lowercase letters, numbers and hyphens only.
        </p>
      )}

      {slug && isValid && (
        <div className="text-xs">
          {checking ? (
            <span className="text-[#9CA3AF] flex items-center gap-1">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Checking
              availability...
            </span>
          ) : isAvailable ? (
            <p className="text-xs text-[#d4ff66] flex items-center gap-1">
              <Check className="w-4 h-4" />
              linkedpage.io/{slug} is available!
            </p>
          ) : (
            <p className="text-xs text-[#E45A5A]">
              linkedpage.io/{slug} is already taken.
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => isValid && isAvailable && onPublish(slug)}
        disabled={!isValid || !isAvailable || publishing || checking}
        className={`button button-primary w-full justify-center gap-2 ${
          !isValid || !isAvailable || publishing || checking
            ? "opacity-50 pointer-events-none"
            : ""
        }`}
      >
        {publishing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Globe className="w-5 h-5" />
        )}
        {publishing ? "Publishing…" : "Publish for free"}
      </button>
    </div>
  );
}

// ─── Published success panel ───────────────────────────────────────────────────
function PublishedPanel({ url, slug }: { url: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-lg bg-[#d4ff66] flex items-center justify-center">
          <Check className="w-5 h-5 text-[#1a5c3a]" strokeWidth={2.5} />
        </div>
        <h3 className="text-sm font-medium text-black">Your page is live!</h3>
      </div>

      <div
        className="flex items-center gap-2 p-3 bg-[#F3F3F3] rounded-[10px] cursor-pointer group"
        onClick={copy}
      >
        <Globe className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" />
        <p className="text-sm text-black flex-1 truncate font-medium">
          linkedpage.io/{slug}
        </p>
        {copied ? (
          <Check className="w-5 h-5 text-[#d4ff66] flex-shrink-0" />
        ) : (
          <Share2 className="w-5 h-5 text-[#9CA3AF] group-hover:text-black flex-shrink-0 transition-colors" />
        )}
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="button button-secondary w-full justify-center gap-2"
      >
        <ExternalLink className="w-5 h-5" />
        Open your page
      </a>
    </div>
  );
}

// ─── Preview page inner ────────────────────────────────────────────────────────
function PreviewInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    editedProfile,
    selectedTemplate,
    useMockProfile,
    loadWebsite,
    websiteId,
  } = useEditor();

  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [publishStep, setPublishStep] = useState<PublishStep>("idle");
  const [publishedSlug, setPublishedSlug] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      loadWebsite(id);
    }
  }, [searchParams, loadWebsite]);

  useEffect(() => {
    if (!editedProfile) useMockProfile();
  }, [editedProfile, useMockProfile]);

  const handlePublish = async (slug: string) => {
    if (!websiteId) {
      toast.error("Please load a website draft first.");
      return;
    }
    setPublishing(true);
    toast.loading("Publishing your page…");
    try {
      // 1. Update subdomain slug in draft first
      await fetch(`/api/websites/${websiteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subdomainSlug: slug }),
      });
      // 2. Trigger publish
      const response = await fetch(`/api/websites/${websiteId}/publish`, {
        method: "POST",
      });
      const data = await response.json();
      setPublishing(false);
      toast.dismiss();
      if (!response.ok) {
        toast.error(data.error || "Failed to publish website");
        return;
      }
      setPublishedSlug(slug);
      setPublishStep("done");
      toast.success(`Your page is live at linkedpage.io/${slug} 🎉`);
    } catch {
      setPublishing(false);
      toast.dismiss();
      toast.error("Network error. Failed to publish website.");
    }
  };

  const handleExport = async () => {
    if (!websiteId) {
      toast.error("Please load a website draft first.");
      return;
    }
    setExportLoading(true);
    const toastId = toast.loading("Generating static build export ZIP…");
    try {
      const response = await fetch(`/api/websites/${websiteId}/export`, {
        method: "POST",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to export build");
      }
      const blob = await response.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `linkedpage-export-${websiteId}.zip`;
      a.click();
      toast.dismiss(toastId);
      toast.success("Build ZIP downloaded successfully!");
    } catch (e: any) {
      toast.dismiss(toastId);
      toast.error(e.message || "Failed to generate zip export.");
    } finally {
      setExportLoading(false);
    }
  };

  if (!editedProfile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-[#9CA3AF]" />
      </div>
    );
  }

  const desktopW = 1024;
  const desktopH = 768;
  const mobileW = 375;
  const mobileH = 812;

  // Calculate scale to fit within available space
  const previewContainerW =
    typeof window !== "undefined" ? window.innerWidth - 340 : 700;
  const previewContainerH =
    typeof window !== "undefined" ? window.innerHeight - 200 : 600;

  const desktopScale = Math.min(
    (previewContainerW - 40) / desktopW,
    (previewContainerH - 60) / desktopH,
    0.85,
  );
  const mobileScale = Math.min(
    200 / mobileW,
    (previewContainerH - 60) / mobileH,
    0.65,
  );

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-inter">
      <Navbar />

      {/* ── Top toolbar ── */}
      <div className="fixed top-[88px] left-0 right-0 z-40 px-5">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between gap-3 h-12 px-4 bg-white/80 backdrop-blur-md rounded-lg border border-[#E6E6E6] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
          {/* Left: back */}
          <button
            onClick={() =>
              router.push(websiteId ? `/editor?id=${websiteId}` : "/editor")
            }
            className="flex items-center gap-1.5 text-[11px] font-medium text-[#6B6B6B] hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to editor</span>
          </button>

          {/* Center: preview mode */}
          <div className="flex items-center gap-1 p-1 bg-[#F3F3F5] rounded-[10px]">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-lg transition-[background,color] duration-150 ${
                previewMode === "desktop"
                  ? "bg-white text-black shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
                  : "text-[#6B6B6B] hover:text-black"
              }`}
            >
              <Monitor className="w-5 h-5" />
              Desktop
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-lg transition-[background,color] duration-150 ${
                previewMode === "mobile"
                  ? "bg-white text-black shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
                  : "text-[#6B6B6B] hover:text-black"
              }`}
            >
              <Smartphone className="w-5 h-5" />
              Mobile
            </button>
          </div>

          {/* Right: edit CTA */}
          <button
            onClick={() =>
              router.push(websiteId ? `/editor?id=${websiteId}` : "/editor")
            }
            className="button button-secondary !py-1.5 !px-3 !text-[11px] flex items-center gap-1.5"
          >
            <Pencil className="w-5 h-5" />
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>
      </div>

      {/* ── Layout: canvas + right panel ── */}
      <div className="flex flex-col lg:flex-row pt-[148px] pb-8 px-5 gap-4 max-w-[1536px] mx-auto">
        {/* ── Canvas ── */}
        <div className="flex-1 flex items-start justify-center min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={previewMode}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {previewMode === "desktop" ? (
                <div
                  className="rounded-[16px] overflow-hidden border border-[#E6E6E6] bg-white"
                  style={{
                    width: desktopW * desktopScale,
                    height: desktopH * desktopScale,
                    boxShadow:
                      "0 8px 30px -8px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      width: desktopW,
                      height: desktopH,
                      transform: `scale(${desktopScale})`,
                      transformOrigin: "top left",
                      overflow: "auto",
                      pointerEvents: "none",
                    }}
                  >
                    <ProfilePreview
                      profile={editedProfile}
                      template={selectedTemplate}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="rounded-[32px] overflow-hidden border-[8px] border-[#2A2A2F] bg-white"
                  style={{
                    width: mobileW * mobileScale,
                    height: mobileH * mobileScale,
                    boxShadow: "0 16px 48px -12px rgba(0,0,0,0.22)",
                  }}
                >
                  <div
                    style={{
                      width: mobileW,
                      height: mobileH,
                      transform: `scale(${mobileScale})`,
                      transformOrigin: "top left",
                      overflow: "auto",
                      pointerEvents: "none",
                    }}
                  >
                    <ProfilePreview
                      profile={editedProfile}
                      template={selectedTemplate}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Right publish panel ── */}
        <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-4">
          {/* Publish card */}
          <div
            className="bg-white border border-[#E6E6E6] rounded-[16px] p-5"
            style={{
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)",
            }}
          >
            <AnimatePresence mode="wait">
              {publishStep === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  <PublishedPanel
                    url={
                      publishedSlug
                        ? `https://${publishedSlug}.linkedpage.io`
                        : `https://linkedpage.io/${publishedSlug}`
                    }
                    slug={publishedSlug}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="publish"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                >
                  <PublishPanel
                    onPublish={handlePublish}
                    publishing={publishing}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Export card */}
          <div
            className="bg-white border border-[#E6E6E6] rounded-[16px] p-5"
            style={{
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)",
            }}
          >
            <h3 className="text-sm font-medium text-black mb-1">Export code</h3>
            <p className="text-xs text-[#9CA3AF] mb-4 leading-relaxed">
              Download your page as a self-contained HTML + CSS file. Host it
              anywhere.
            </p>
            <button
              onClick={handleExport}
              disabled={exportLoading}
              className={`button button-secondary w-full justify-center gap-2 ${exportLoading ? "opacity-60 pointer-events-none" : ""}`}
            >
              {exportLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              {exportLoading ? "Generating…" : "Download ZIP"}
            </button>
          </div>

          {/* What's included */}
          <div className="bg-[#FBFBFB] border border-[#E6E6E6] rounded-[16px] p-5">
            <h3 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-3">
              Free plan includes
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                "Custom subdomain (linkedpage.io/…)",
                "All 4 templates",
                "Code export",
                "Always up-to-date with LinkedIn",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-xs text-[#171717]"
                >
                  <div className="w-5 h-5 rounded-lg bg-[#d4ff66] flex items-center justify-center flex-shrink-0">
                    <Check
                      className="w-2.5 h-2.5 text-[#1a5c3a]"
                      strokeWidth={2.5}
                    />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-white font-inter flex flex-col">
      <Navbar />
      <Suspense
        fallback={
          <main className="flex-1 flex items-center justify-center">
            <div className="w-5 h-5 rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
          </main>
        }
      >
        <PreviewInner />
      </Suspense>
    </div>
  );
}

```

---

## File: `app/pricing/page.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  CreditCard,
  BookOpen,
  Settings,
  Check,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { UserMenu } from "@/components/UserMenu";

export default function PricingPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [priceText, setPriceText] = useState("$16");

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("linkedpage_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUserName(parsed.name || "");
        setUserEmail(parsed.email || "");
      }
    } catch {
      // ignore
    }

    // Read dynamic upgrade price from env or default
    const dynamicPrice = process.env.NEXT_PUBLIC_UPGRADE_PRICE || "$16";
    setPriceText(dynamicPrice);
  }, []);

  const [isUpgrading, setIsUpgrading] = useState(false);

  const handlePurchase = async () => {
    setIsUpgrading(true);
    const toastId = toast.loading("Registering upgrade intent...");
    try {
      const res = await fetch("/api/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "pro" }),
      });
      const data = await res.json();
      toast.dismiss(toastId);

      if (res.ok) {
        toast.success(
          "Upgrade request logged! You'll receive an email to complete payment.",
        );
      } else {
        // Not logged in — redirect to login first
        if (res.status === 401) {
          toast.info("Please log in to upgrade your account.");
          router.push("/login");
        } else {
          toast.error(data.error || "Something went wrong. Please try again.");
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Connection error. Please try again.");
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-inter flex flex-col text-black antialiased relative overflow-x-hidden">
      {/* ── Background Graphic (Polished Light Mesh Gradient) ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-[#FBFBFB]">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#8DB8FF]/12 to-[#E0EBFF]/5 blur-[120px] opacity-70" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#d4ff66]/8 to-[#d4ff66]/5 blur-[100px] opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#FBFBFB]" />
      </div>

      {/* ── Top-bar ── */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-b border-[#E6E6E6] px-6 z-50 flex items-center justify-between select-none shadow-none">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Webild"
            className="h-7 w-auto object-contain cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="w-px h-4 bg-[#2A2A2F]/15" />
          <span className="text-sm font-medium text-[#171717]/60 truncate">
            Pricing
          </span>
        </div>

        <div className="flex items-center gap-2 relative">
          {userName ? (
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-8 h-8 rounded-full border border-[#E6E6E6] overflow-hidden cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="h-8 px-4 text-xs font-semibold bg-[#2A2A2F] text-white rounded-lg hover:bg-[#3A3A42] transition-all"
            >
              Log in
            </button>
          )}

          <AnimatePresence>
            {isUserMenuOpen && (
              <UserMenu
                name={userName}
                email={userEmail}
                onClose={() => setIsUserMenuOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Dashboard Layout Body ── */}
      <div className="flex flex-1 relative z-10">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#E6E6E6] bg-white/50 backdrop-blur-md p-6 flex flex-col justify-between select-none shrink-0 min-h-[calc(100vh-3.5rem)] mt-14 relative z-20">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-[#88888E] px-3 mb-1 uppercase tracking-wider">
                Navigation
              </span>

              <button
                onClick={() => router.push(userName ? "/dashboard" : "/")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-semibold text-black/60 hover:text-black transition-all text-left"
              >
                <Folder className="w-[18px] h-[18px]" />
                {userName ? "All Websites" : "Home"}
              </button>
            </div>

            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#F5F5F7]">
              <span className="text-[12px] font-semibold text-[#88888E] px-3">
                Recent websites
              </span>
              <button
                onClick={() => router.push(userName ? "/dashboard" : "/")}
                className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] hover:bg-white/60 text-left w-full"
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#E6E6E6] overflow-hidden p-0.5 shrink-0">
                  <img
                    src="/logoicon.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[13px] font-semibold text-[#171717] truncate">
                  {userName ? "Back to dashboard" : "Back to home"}
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => router.push("/pricing")}
                className="w-full h-10 px-3 rounded-[8px] bg-white/80 border border-[#E6E6E6]/60 flex items-center gap-3 text-[14px] font-semibold text-black transition-all text-left"
              >
                <CreditCard className="w-[18px] h-[18px] text-black" />
                Pricing
              </button>

              <button
                onClick={() => router.push("/docs")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black/60 hover:text-black transition-all text-left"
              >
                <BookOpen className="w-[18px] h-[18px]" />
                Documentation
              </button>

              <button
                onClick={() => router.push("/settings")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black/60 hover:text-black transition-all text-left"
              >
                <Settings className="w-[18px] h-[18px]" />
                Settings
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 px-8 md:px-16 py-12 mt-14 max-w-5xl">
          <div className="mb-10 text-center max-w-xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-black font-inter-tight">
              Simple, Flat Pricing
            </h1>
            <p className="text-[14px] text-gray-500 mt-2">
              Create a premium landing page from your LinkedIn profile in
              minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
            {/* Free Plan Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-black font-inter-tight">
                  Free Draft
                </h3>
                <p className="text-[13px] text-gray-500 mt-1">
                  Perfect for trying out templates and structures.
                </p>
                <div className="mt-5 flex items-baseline">
                  <span className="text-4xl font-extrabold text-black font-inter-tight">
                    $0
                  </span>
                  <span className="text-xs text-gray-400 ml-1 font-semibold">
                    forever
                  </span>
                </div>
                <div className="border-t border-gray-100 my-6" />
                <ul className="space-y-3.5">
                  {[
                    "1 Website Draft",
                    "Standard Card Layouts",
                    "Live Preview Panel",
                    "LinkedPage Subdomain",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-[13.5px] font-medium text-gray-600"
                    >
                      <Check className="w-4 h-4 text-[#d4ff66]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => router.push("/editor")}
                  className="w-full h-11 border border-[#E6E6E6] hover:bg-[#FBFBFB] text-black text-[13px] font-bold rounded-xl transition-all active:scale-[0.97] transition-transform"
                >
                  Start Customizing
                </button>
              </div>
            </motion.div>

            {/* Pro Plan Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.12 }}
              className="relative bg-white/95 border-2 border-[#8DB8FF] rounded-[24px] shadow-[0px_10px_20px_-8px_rgba(141,184,255,0.22)] p-8 flex flex-col justify-between overflow-hidden"
            >
              {/* Popular Badge */}
              <div className="absolute top-0 right-0 bg-[#8DB8FF] text-white text-[10px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-bl-xl flex items-center gap-1">
                <Zap className="w-3 h-3 fill-white" /> Pro Feature
              </div>

              <div>
                <h3 className="text-lg font-bold text-black font-inter-tight">
                  Professional Pro
                </h3>
                <p className="text-[13px] text-gray-500 mt-1">
                  Unlock all templates, exports, and custom domains.
                </p>
                <div className="mt-5 flex items-baseline">
                  <span className="text-4xl font-extrabold text-black font-inter-tight">
                    {priceText}
                  </span>
                  <span className="text-xs text-gray-400 ml-1 font-semibold">
                    one-time payment
                  </span>
                </div>
                <div className="border-t border-gray-100 my-6" />
                <ul className="space-y-3.5">
                  {[
                    "Unlimited Websites",
                    "Custom Custom Domains",
                    "All Premium Templates (e.g. Bento)",
                    "Full Code Export (HTML/CSS ZIP)",
                    "Premium SEO & Meta Editing",
                    "Priority AI Builder Assist",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-[13.5px] font-medium text-gray-600"
                    >
                      <Check className="w-4 h-4 text-[#d4ff66]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <button
                  onClick={handlePurchase}
                  disabled={isUpgrading}
                  className="w-full h-11 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[13px] font-bold rounded-xl transition-all active:scale-[0.97] transition-transform shadow-md disabled:opacity-60"
                >
                  {isUpgrading ? "Processing..." : "Upgrade to Pro"}
                </button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

```

---

## File: `app/publish/page.tsx`

```tsx
"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Check,
  ExternalLink,
  Share2,
  Twitter,
  Linkedin,
  RotateCcw,
  Copy,
  Sparkles,
} from "lucide-react";
import { AnimatedSuccessIllustration } from "@/components/AnimatedSVGs";

function PublishInner() {
  const params = useSearchParams();
  const router = useRouter();
  const slug = params.get("slug") ?? "yourname";
  const [url, setUrl] = useState("");

  useEffect(() => {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    if (isLocalhost) {
      setUrl(`${window.location.origin}/p/${slug}`);
    } else {
      const host = window.location.host;
      const parts = host.split(".");
      const mainDomain = parts.length > 2 ? parts.slice(1).join(".") : host;
      setUrl(`${window.location.protocol}//${slug}.${mainDomain}`);
    }
  }, [slug]);

  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      `Just turned my LinkedIn into a beautiful personal micro-site in under 60 seconds with @LinkedPage ✨\n\n${url}`,
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const shareUrl = encodeURIComponent(url);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      "_blank",
    );
  };

  return (
    <main className="flex-1 flex items-center justify-center px-5 pt-24 pb-16">
      <div className="flex flex-col items-center gap-10 max-w-md w-full text-center">
        {/* Success ring */}
        <AnimatedSuccessIllustration />

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8DB8FF]" />
            <span className="text-xs font-medium text-[#8DB8FF] uppercase tracking-wide">
              Published
            </span>
          </div>
          <h1 className="text-3xl font-medium text-black leading-tight">
            Your page is live!
          </h1>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            Share it anywhere — your LinkedIn profile, email signature,
            portfolio, or bio link.
          </p>
        </motion.div>

        {/* URL box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="w-full"
        >
          <div
            onClick={copy}
            className="flex items-center gap-3 p-4 bg-[#F7F7F7] border border-[#E6E6E6] rounded-[16px] cursor-pointer hover:border-[#C0C0C0] active:scale-[0.98] transition-[transform,border-color] duration-150"
          >
            <div className="w-8 h-8   rounded-lg bg-white border border-[#E6E6E6] flex items-center justify-center flex-shrink-0">
              <ExternalLink className="w-5 h-5 text-[#6B6B6B]" />
            </div>
            <p className="text-sm text-black font-medium flex-1 text-left truncate">
              {url}
            </p>
            {copied ? (
              <Check className="w-5 h-5 text-[#d4ff66] flex-shrink-0" />
            ) : (
              <Copy className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" />
            )}
          </div>
        </motion.div>

        {/* Share buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col gap-3 w-full"
        >
          <p className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wide">
            Share
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={shareOnTwitter}
              className="button button-secondary justify-center gap-2"
            >
              <Twitter className="w-5 h-5" />
              Post on X
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="button button-secondary justify-center gap-2"
            >
              <Linkedin className="w-5 h-5" />
              Share on LinkedIn
            </button>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38 }}
          className="w-full flex items-center gap-4"
        >
          <div className="flex-1 h-px bg-[#E6E6E6]" />
          <span className="text-xs text-[#9CA3AF]">or</span>
          <div className="flex-1 h-px bg-[#E6E6E6]" />
        </motion.div>

        {/* Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.42, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full"
        >
          <button
            onClick={() => router.push("/editor")}
            className="button button-secondary flex-1 w-full justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Edit your page
          </button>
          <button
            onClick={() => router.push("/")}
            className="button button-primary flex-1 w-full justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Create another
          </button>
        </motion.div>
      </div>
    </main>
  );
}

export default function PublishPage() {
  return (
    <div className="min-h-screen bg-white font-inter flex flex-col">
      <Navbar />
      <Suspense
        fallback={
          <main className="flex-1 flex items-center justify-center">
            <div className="w-5 h-5   rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
          </main>
        }
      >
        <PublishInner />
      </Suspense>
    </div>
  );
}

```

---

## File: `app/report-bug/page.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  CreditCard,
  BookOpen,
  Settings,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { UserMenu } from "@/components/UserMenu";

export default function ReportBugPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("low");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("linkedpage_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUserName(parsed.name || "");
        setUserEmail(parsed.email || "");
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      toast.error("Please fill out both the subject and description fields.");
      return;
    }
    setIsSubmitting(true);
    const toastId = toast.loading("Submitting bug report...");

    try {
      const res = await fetch("/api/report-bug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, description, severity }),
      });
      const data = await res.json();
      toast.dismiss(toastId);

      if (!res.ok) {
        toast.error(data.error || "Failed to submit report.");
        setIsSubmitting(false);
        return;
      }

      toast.success("Bug report submitted! Our team will investigate.");
      setSubject("");
      setDescription("");
      setSeverity("low");

      setTimeout(() => {
        router.push(userName ? "/dashboard" : "/");
      }, 1000);
    } catch {
      toast.dismiss(toastId);
      toast.error("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-inter flex flex-col text-black antialiased relative overflow-x-hidden">
      {/* ── Background Graphic (Polished Light Mesh Gradient) ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-[#FBFBFB]">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#8DB8FF]/12 to-[#E0EBFF]/5 blur-[120px] opacity-70" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#d4ff66]/8 to-[#d4ff66]/5 blur-[100px] opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#FBFBFB]" />
      </div>

      {/* ── Top-bar ── */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-b border-[#E6E6E6] px-6 z-50 flex items-center justify-between select-none shadow-none">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Webild"
            className="h-7 w-auto object-contain cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="w-px h-4 bg-[#2A2A2F]/15" />
          <span className="text-sm font-medium text-[#171717]/60 truncate">
            Report a bug
          </span>
        </div>

        <div className="flex items-center gap-2 relative">
          {userName ? (
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-8 h-8 rounded-full border border-[#E6E6E6] overflow-hidden cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="h-8 px-4 text-xs font-semibold bg-[#2A2A2F] text-white rounded-lg hover:bg-[#3A3A42] transition-all"
            >
              Log in
            </button>
          )}

          <AnimatePresence>
            {isUserMenuOpen && (
              <UserMenu
                name={userName}
                email={userEmail}
                onClose={() => setIsUserMenuOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Dashboard Layout Body ── */}
      <div className="flex flex-1 relative z-10">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#E6E6E6] bg-white/50 backdrop-blur-md p-6 flex flex-col justify-between select-none shrink-0 min-h-[calc(100vh-3.5rem)] mt-14 relative z-20">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-[#88888E] px-3 mb-1 uppercase tracking-wider">
                Navigation
              </span>

              <button
                onClick={() => router.push(userName ? "/dashboard" : "/")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-semibold text-black/60 hover:text-black transition-all text-left"
              >
                <Folder className="w-[18px] h-[18px]" />
                {userName ? "All Websites" : "Home"}
              </button>
            </div>

            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#F5F5F7]">
              <span className="text-[12px] font-semibold text-[#88888E] px-3">
                Recent websites
              </span>
              <button
                onClick={() => router.push(userName ? "/dashboard" : "/")}
                className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] hover:bg-white/60 text-left w-full"
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#E6E6E6] overflow-hidden p-0.5 shrink-0">
                  <img
                    src="/logoicon.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[13px] font-semibold text-[#171717] truncate">
                  {userName ? "Back to dashboard" : "Back to home"}
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => router.push("/pricing")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black/60 hover:text-black transition-all text-left"
              >
                <CreditCard className="w-[18px] h-[18px]" />
                Pricing
              </button>

              <button
                onClick={() => router.push("/docs")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black/60 hover:text-black transition-all text-left"
              >
                <BookOpen className="w-[18px] h-[18px]" />
                Documentation
              </button>

              <button
                onClick={() => router.push("/settings")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black/60 hover:text-black transition-all text-left"
              >
                <Settings className="w-[18px] h-[18px]" />
                Settings
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 px-8 md:px-16 py-12 mt-14 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-black font-inter-tight">
              Report a Bug
            </h1>
            <p className="text-[14px] text-gray-500 mt-1">
              Found something broken? Send a report directly to the developers.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                  Bug Title / Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Subdomain check is failing on certain keywords"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="h-11 px-4 rounded-xl bg-[#FBFBFB] border border-[#E6E6E6] focus:border-[#8DB8FF] focus:ring-1 focus:ring-[#8DB8FF] outline-none text-[14.5px] font-medium text-black transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                    Severity Level
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="h-11 px-4 rounded-xl bg-[#FBFBFB] border border-[#E6E6E6] focus:border-[#8DB8FF] focus:ring-1 focus:ring-[#8DB8FF] outline-none text-[14px] font-medium text-black transition-colors"
                  >
                    <option value="low">Low (Cosmetic/Typo)</option>
                    <option value="medium">Medium (Annoying/Slow)</option>
                    <option value="high">High (Broken feature)</option>
                    <option value="critical">Critical (Crash/Data loss)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                  Description & Steps to reproduce
                </label>
                <textarea
                  rows={6}
                  placeholder="Please describe exactly what happened and the steps to reproduce the issue."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-4 rounded-xl bg-[#FBFBFB] border border-[#E6E6E6] focus:border-[#8DB8FF] focus:ring-1 focus:ring-[#8DB8FF] outline-none text-[14.5px] font-medium text-black transition-colors resize-none"
                />
              </div>

              <div className="border-t border-[#E6E6E6] pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 px-6 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[13px] font-bold rounded-xl transition-all active:scale-[0.97] transition-transform flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}{" "}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

```

---

## File: `app/settings/page.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  CreditCard,
  BookOpen,
  Settings,
  User,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { UserMenu } from "@/components/UserMenu";

export default function SettingsPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const full = `${data.user.firstName} ${data.user.lastName}`;
        setUserName(full);
        setUserEmail(data.user.email);
        setFirstName(data.user.firstName || "");
        setLastName(data.user.lastName || "");

        sessionStorage.setItem(
          "linkedpage_user",
          JSON.stringify({ name: full, email: data.user.email }),
        );
      } catch {
        router.push("/login");
      }
    };
    checkUser();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("First and last names are required.");
      return;
    }
    setIsSaving(true);
    const toastId = toast.loading("Saving account settings...");

    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });
      const data = await res.json();
      toast.dismiss(toastId);
      setIsSaving(false);

      if (res.ok) {
        toast.success("Profile updated successfully!");
        setUserName(data.name);
        sessionStorage.setItem(
          "linkedpage_user",
          JSON.stringify({ name: data.name, email: userEmail }),
        );
      } else {
        toast.error(data.error || "Failed to update profile.");
      }
    } catch {
      toast.dismiss(toastId);
      setIsSaving(false);
      toast.error("Connection error. Failed to save settings.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-inter flex flex-col text-black antialiased relative overflow-x-hidden">
      {/* ── Background Graphic (Polished Light Mesh Gradient) ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-[#FBFBFB]">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#8DB8FF]/12 to-[#E0EBFF]/5 blur-[120px] opacity-70" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#d4ff66]/8 to-[#d4ff66]/5 blur-[100px] opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#FBFBFB]" />
      </div>

      {/* ── Top-bar ── */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-b border-[#E6E6E6] px-6 z-50 flex items-center justify-between select-none shadow-none">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Webild"
            className="h-7 w-auto object-contain cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="w-px h-4 bg-[#2A2A2F]/15" />
          <span className="text-sm font-medium text-[#171717]/60 truncate">
            Settings
          </span>
        </div>

        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-8 h-8 rounded-full border border-[#E6E6E6] overflow-hidden cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>

          <AnimatePresence>
            {isUserMenuOpen && (
              <UserMenu
                name={userName}
                email={userEmail}
                onClose={() => setIsUserMenuOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Dashboard Layout Body ── */}
      <div className="flex flex-1 relative z-10">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#E6E6E6] bg-white/50 backdrop-blur-md p-6 flex flex-col justify-between select-none shrink-0 min-h-[calc(100vh-3.5rem)] mt-14 relative z-20">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-[#88888E] px-3 mb-1 uppercase tracking-wider">
                Navigation
              </span>

              <button
                onClick={() => router.push("/dashboard")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-semibold text-black/60 hover:text-black transition-all text-left"
              >
                <Folder className="w-[18px] h-[18px]" />
                All Websites
              </button>
            </div>

            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#F5F5F7]">
              <span className="text-[12px] font-semibold text-[#88888E] px-3">
                Recent websites
              </span>
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] hover:bg-white/60 text-left w-full"
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#E6E6E6] overflow-hidden p-0.5 shrink-0">
                  <img
                    src="/logoicon.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[13px] font-semibold text-[#171717] truncate">
                  Back to dashboard
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => router.push("/pricing")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black/60 hover:text-black transition-all text-left"
              >
                <CreditCard className="w-[18px] h-[18px]" />
                Pricing
              </button>

              <button
                onClick={() => router.push("/docs")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black/60 hover:text-black transition-all text-left"
              >
                <BookOpen className="w-[18px] h-[18px]" />
                Documentation
              </button>

              <button
                onClick={() => router.push("/settings")}
                className="w-full h-10 px-3 rounded-[8px] bg-white/80 border border-[#E6E6E6]/60 flex items-center gap-3 text-[14px] font-semibold text-black transition-all text-left"
              >
                <Settings className="w-[18px] h-[18px] text-black" />
                Settings
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 px-8 md:px-16 py-12 mt-14 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-black font-inter-tight">
              Account Settings
            </h1>
            <p className="text-[14px] text-gray-500 mt-1">
              Manage your professional account details and preferences.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] p-8"
          >
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-11 px-4 rounded-xl bg-[#FBFBFB] border border-[#E6E6E6] focus:border-[#8DB8FF] focus:ring-1 focus:ring-[#8DB8FF] outline-none text-[14.5px] font-medium text-black transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-11 px-4 rounded-xl bg-[#FBFBFB] border border-[#E6E6E6] focus:border-[#8DB8FF] focus:ring-1 focus:ring-[#8DB8FF] outline-none text-[14.5px] font-medium text-black transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userEmail}
                  disabled
                  className="h-11 px-4 rounded-xl bg-[#F3F3F3] border border-[#E6E6E6] outline-none text-[14.5px] font-medium text-gray-500 cursor-not-allowed"
                />
                <span className="text-[11px] text-gray-400 font-medium">
                  Contact email address is linked to better-auth login and
                  cannot be altered.
                </span>
              </div>

              <div className="border-t border-[#E6E6E6] pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="h-11 px-6 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[13px] font-bold rounded-xl transition-all active:scale-[0.97] transition-transform flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}{" "}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

```

---

## File: `app/signup/page.tsx`

```tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordStep, setShowPasswordStep] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const isFirstNameValid = firstName.trim().length >= 1;
  const isLastNameValid = lastName.trim().length >= 1;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordValid = password.length >= 8 && /[\d!@#$%^&*]/.test(password);

  // Step 1: name + email valid → reveal password
  // Step 2: all valid → submit
  const canContinue = isFirstNameValid && isLastNameValid && isEmailValid;
  const canSubmit = canContinue && isPasswordValid;

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canContinue) {
      if (!isFirstNameValid) toast.error("Please enter your first name!");
      else if (!isLastNameValid) toast.error("Please enter your last name!");
      else toast.error("Please enter a valid email address!");
      return;
    }

    if (!showPasswordStep) {
      setShowPasswordStep(true);
      setTimeout(() => passwordInputRef.current?.focus(), 100);
      return;
    }

    if (!isPasswordValid) {
      toast.error(
        "Password must be at least 8 characters with a number or symbol!",
      );
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Creating your account...");
    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name: `${firstName} ${lastName}`,
      });

      toast.dismiss(loadingToast);
      setIsSubmitting(false);

      if (error) {
        toast.error(error.message || "Failed to create account");
        return;
      }

      if (data && data.user) {
        sessionStorage.setItem(
          "linkedpage_user",
          JSON.stringify({
            id: data.user.id,
            firstName,
            lastName,
            email: data.user.email,
          }),
        );
      }

      toast.success("Account created! Welcome to Webild 🎉");

      const params = new URLSearchParams(window.location.search);
      if (params.get("intent") === "save_scrape") {
        router.push("/editor?onboarding=true");
      } else {
        router.push("/onboarding");
      }
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Connection failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.loading("Connecting Google authorization provider...");
    setTimeout(() => {
      toast.success("Successfully signed up with Google!");

      const params = new URLSearchParams(window.location.search);
      if (params.get("intent") === "save_scrape") {
        router.push("/editor?onboarding=true");
      } else {
        router.push("/onboarding");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] font-inter select-none">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-screen py-28 mx-auto max-w-[1536px]">
        {/* ── Left: Signup Form (exact reference UI) ── */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Outer card — button-secondary + rounded + p-8 as in reference */}
          <div className="relative bg-white shadow-inner rounded-[20px] px-10 py-14 w-full max-w-md">
            <div className="flex flex-col gap-5">
              {/* Header */}
              <div className="flex flex-col gap-1 text-center items-center">
                <h1 className="text-2xl font-medium text-black w-fit leading-tight">
                  Create your account
                </h1>
                <p className="text-sm text-black">
                  Get started with Webild today
                </p>
              </div>

              {/* Google SSO */}
              <div className="flex flex-col gap-3">
                <button
                  className="button text-sm font-medium outline-none focus:outline-none focus-visible:outline-none transition-all duration-200 card flex items-center justify-center gap-2 w-full"
                  type="button"
                  onClick={handleGoogleSignup}
                >
                  <img
                    className="w-auto"
                    height={16}
                    width={16}
                    alt="Google"
                    src="https://www.webild.io/icons/google.svg"
                    style={{ color: "transparent" }}
                  />
                  Continue with Google
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center gap-4">
                <div className="flex-1 border-t-2 border-black/5" />
                <span className="text-xs text-black">or</span>
                <div className="flex-1 border-t-2 border-black/5" />
              </div>

              {/* Form */}
              <form className="flex flex-col gap-4" onSubmit={handleContinue}>
                {/* First name + Last name */}
                <div className="grid grid-cols-2 gap-3">
                  {/* First name */}
                  <div>
                    <div className="z-10 flex items-center gap-1 mb-2 w-full min-w-0 relative">
                      <label className="block text-sm font-medium text-black text-nowrap truncate">
                        First name
                      </label>
                    </div>
                    <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                      <input
                        className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none bg-transparent"
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>

                  {/* Last name */}
                  <div>
                    <div className="z-10 flex items-center gap-1 mb-2 w-full min-w-0 relative">
                      <label className="block text-sm font-medium text-black text-nowrap truncate">
                        Last name
                      </label>
                    </div>
                    <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                      <input
                        className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none bg-transparent"
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <div className="z-10 flex items-center gap-1 mb-2 w-full min-w-0 relative">
                    <label className="block text-sm font-medium text-black text-nowrap truncate">
                      Email
                    </label>
                  </div>
                  <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                    <input
                      className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none bg-transparent"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>

                {/* Password (collapsible — matches reference grid-template-rows trick) */}
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)]"
                  style={{ gridTemplateRows: showPasswordStep ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden flex flex-col gap-4 p-px">
                    <div>
                      <div className="z-10 flex items-center gap-1 mb-2 w-full min-w-0 relative">
                        <label className="block text-sm font-medium text-black text-nowrap truncate">
                          Password
                        </label>
                      </div>
                      <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                        <input
                          ref={passwordInputRef}
                          className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none pr-10 bg-transparent"
                          type={showPassword ? "text" : "password"}
                          placeholder="At least 8 characters and at least 1 special symbol or number"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isSubmitting}
                          required={showPasswordStep}
                        />
                        <button
                          className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-black/75"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {/* Password strength hint */}
                      {showPasswordStep &&
                        password.length > 0 &&
                        !isPasswordValid && (
                          <p className="mt-1.5 text-xs text-[#E45A5A]">
                            Min 8 characters with at least 1 number or symbol
                          </p>
                        )}
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  className={`button text-sm font-medium outline-none focus:outline-none focus-visible:outline-none transition-all duration-200 button-primary w-full justify-center ${
                    isSubmitting ||
                    (showPasswordStep ? !isPasswordValid : !canContinue)
                      ? "opacity-50"
                      : ""
                  }`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5   rounded-lg border-2 border-white border-t-transparent animate-spin" />
                      Creating account...
                    </span>
                  ) : showPasswordStep ? (
                    "Sign up"
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="text-center text-sm text-black">
                Already have an account?{" "}
                <button
                  className="cursor-pointer text-[#000] font-medium hover:underline"
                  onClick={() => router.push(`/login${window.location.search}`)}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Hero Illustration Panel ── */}
        <div className="relative hidden md:flex rounded-[20px] overflow-hidden bg-gradient-to-tr from-[#8DB8FF]/10 to-[#d4ff66]/10 items-center justify-center border border-[#E6E6E6]">
          <img
            className="absolute inset-0 size-full object-cover opacity-80"
            alt="Auth background"
            src="/bg.png"
          />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
          <img
            className="relative z-20 drop- shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  max-w-[85%] w-auto h-auto"
            alt="Webild illustration"
            src="https://www.webild.io/images/input.svg"
          />
        </div>
      </div>
    </div>
  );
}

```

---

## File: `client/pages/Index.tsx`

```tsx
import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ─── Small reusable pieces ───────────────────────────────────────────────────

function DarkButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`inline-flex items-center justify-center h-10 px-6      rounded-lg   btn-dark text-white text-[12px] font-medium transition-all duration-150 active:scale-97 whitespace-nowrap hover:bg-[#3E3E45] ${className}`}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#d4ff66] text-[13px] leading-[18px] font-semibold uppercase tracking-wider mb-2 font-inter-tight">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[28px] sm:text-[38px] leading-[46px] font-normal text-black font-inter-tight">
      {children}
    </h2>
  );
}

// ─── Template card data ───────────────────────────────────────────────────────

const TEMPLATES_LARGE = [
  {
    name: "Minimal Card",
    subtitle: "Clean, elegant, and focused on essential links",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/ccea70025e4eb65efc78244adad19aa72081243a?width=982",
  },
  {
    name: "Bento Grid",
    subtitle: "A highly visual grid showcasing work, experience, and projects",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/b44548e7be08969a8dfc228c049f55fdc9f7bcbb?width=982",
  },
  {
    name: "Full-Page Scroll",
    subtitle:
      "A modern, smooth-scrolling experience that tells your career story",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/22a1dcc1827cb472b41466029a5665e67ea82849?width=982",
  },
  {
    name: "Dark Bento",
    subtitle: "High-contrast dark mode grid for professional standout profiles",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/de2496b30f9ab12d95e5ad6f29af5e66821c7e0d?width=982",
  },
];

const FAQ_ITEMS = [
  "What is LinkedPage and how does it work?",
  "Do I need design or coding experience to use LinkedPage?",
  "How can I customize my Website?",
  "Can I connect my own domain or subdomain?",
  "Does LinkedPage host my Website?",
  "Can I edit or update my site after publishing?",
  "Can I export the code of my Website?",
];

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white pt-24 pb-16">
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-90">
        <img
          src="/bg.png"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1536px] mx-auto flex flex-col items-center gap-6 px-6 sm:px-8 lg:px-20 text-center">
        {/* Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5   rounded-lg border border-[#E6E6E6] bg-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
          <span className="gradient-text-rainbow text-[13px] font-medium leading-[18px]">
            Create in under 60 seconds
          </span>
          <span className="flex items-center justify-center w-7 h-7   rounded-lg btn-dark-sm flex-shrink-0 active:scale-95 transition-all">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3.98708 3.98709H9.6837V9.68372"
                stroke="white"
                strokeWidth="1.13917"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.98708 9.68372L9.6837 3.98709"
                stroke="white"
                strokeWidth="1.13917"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-black text-[38px] sm:text-[51px] leading-[1.1] font-medium tracking-tight max-w-4xl font-inter-tight">
          LinkedIn to personal Website
        </h1>

        {/* Prompt card */}
        <div className="w-full max-w-[1040px]      rounded-lg   glass-card p-4 sm:p-5 flex flex-col gap-5 mt-4">
          <div className="     rounded-lg   border border-[#E6E6E6] bg-white/20 p-5 flex flex-col gap-4  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
            {/* Textarea */}
            <textarea
              className="w-full bg-transparent text-[#171717] text-[16px] sm:text-[18px] leading-[27px] resize-none outline-none placeholder:text-[#171717]/40 min-h-[72px] font-inter-tight"
              defaultValue="https://www.linkedin.com/in/reidhoffman"
              placeholder="Paste your LinkedIn profile URL here..."
            />

            {/* Bottom actions */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-[#F3F3F3]">
              <div className="flex items-center gap-3">
                {/* Add button */}
                <button className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6] card-btn-shadow hover:bg-[#F7F7F7] active:scale-95 transition-all">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3.68124 8.83502H13.9887"
                      stroke="black"
                      strokeWidth="0.73625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.83499 3.68127V13.9888"
                      stroke="black"
                      strokeWidth="0.73625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Enhance prompt button */}
                <button className="h-10 px-5      rounded-lg   bg-[#F3F3F3] text-black text-[12px] font-medium hover:bg-[#EAEAEA] active:scale-97 transition-all whitespace-nowrap">
                  Enhance prompt
                </button>

                {/* Color palette button */}
                <button className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6] card-btn-shadow hover:bg-[#F7F7F7] active:scale-95 transition-all">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <g clipPath="url(#palette-clip)">
                      <path
                        d="M7.07029 12.9622C5.50766 12.9622 4.00903 12.3415 2.90408 11.2365C1.79913 10.1316 1.17838 8.63296 1.17838 7.07032C1.17838 5.50769 1.79913 4.00906 2.90408 2.90411C4.00903 1.79916 5.50766 1.17841 7.07029 1.17841C8.63293 1.17841 10.1316 1.73708 11.2365 2.73154C12.3415 3.72599 12.9622 5.07476 12.9622 6.48113C12.9622 7.26245 12.6518 8.01176 12.0994 8.56424C11.5469 9.11671 10.7976 9.42709 10.0163 9.42709H8.69057C8.49908 9.42709 8.31138 9.48041 8.1485 9.58108C7.98561 9.68175 7.85397 9.82579 7.76834 9.99706C7.6827 10.1683 7.64645 10.3601 7.66365 10.5508C7.68085 10.7415 7.75081 10.9236 7.8657 11.0768L8.04246 11.3125C8.15735 11.4657 8.22731 11.6478 8.24451 11.8386C8.26171 12.0293 8.22546 12.221 8.13982 12.3923C8.05419 12.5635 7.92255 12.7076 7.75966 12.8082C7.59678 12.9089 7.40907 12.9622 7.21759 12.9622H7.07029Z"
                        stroke="black"
                        strokeWidth="0.589167"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="7.95378" cy="3.82957" r="0.59" fill="black" />
                      <circle cx="10.3104" cy="6.18626" r="0.59" fill="black" />
                      <circle cx="3.8296" cy="7.3646" r="0.59" fill="black" />
                      <circle cx="5.00813" cy="4.41892" r="0.59" fill="black" />
                    </g>
                    <defs>
                      <clipPath id="palette-clip">
                        <rect width="14.1406" height="14.1406" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-3">
                {/* Mic button */}
                <button className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6] card-btn-shadow hover:bg-[#F7F7F7] active:scale-95 transition-all">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M7.95499 12.5954V14.5837"
                      stroke="black"
                      strokeWidth="0.662917"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5954 6.62915V7.95498C12.5954 9.1857 12.1065 10.366 11.2363 11.2363C10.366 12.1065 9.18571 12.5954 7.95499 12.5954C6.72428 12.5954 5.54397 12.1065 4.67372 11.2363C3.80347 10.366 3.31458 9.1857 3.31458 7.95498V6.62915"
                      stroke="black"
                      strokeWidth="0.662917"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.94375 3.31456C9.94375 2.2162 9.05335 1.32581 7.955 1.32581C6.85664 1.32581 5.96625 2.2162 5.96625 3.31456V7.95497C5.96625 9.05333 6.85664 9.94372 7.955 9.94372C9.05335 9.94372 9.94375 9.05333 9.94375 7.95497V3.31456Z"
                      stroke="black"
                      strokeWidth="0.662917"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Send button (Primary action) */}
                <button className="flex items-center justify-center w-9 h-9   rounded-lg bg-[#2A2A2F] text-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#3E3E45] active:scale-95 transition-all">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3.68127 8.83502L8.83502 3.68127L13.9888 8.83502"
                      stroke="white"
                      strokeWidth="0.73625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.83502 13.9888V3.68127"
                      stroke="white"
                      strokeWidth="0.73625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Templates Section ────────────────────────────────────────────────────────

function TemplatesSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: dir === "next" ? 520 : -520,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden border-t border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div className="flex flex-col">
            <SectionLabel>Browse our collection</SectionLabel>
            <SectionHeading>Start with a Template</SectionHeading>
          </div>
          <DarkButton className="self-start sm:self-auto">
            View All Templates
          </DarkButton>
        </div>

        {/* Template cards carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
          >
            {TEMPLATES_LARGE.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[300px] sm:w-[380px] lg:w-[495px] template-card group"
              >
                <div className="relative aspect-square      rounded-lg   overflow-hidden bg-[#FBFBFB] border border-[#E6E6E6] p-[11px]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover     rounded-lg "
                  />
                  {/* Bottom gradient overlay inside padding */}
                  <div
                    className="absolute bottom-[11px] left-[11px] right-[11px] h-2/5 rounded-b-[8px]"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
                    }}
                  />
                  {/* Title */}
                  <div className="absolute bottom-[11px] left-[11px] right-[11px] p-5 z-10">
                    <p className="text-white text-[20px] font-normal leading-[26px] font-inter-tight">
                      {t.name}
                    </p>
                    <p className="text-white/75 text-[14px] leading-[20px] font-inter-tight">
                      {t.subtitle}
                    </p>
                  </div>
                  {/* Hover overlay */}
                  <div className="template-hover-overlay absolute inset-[11px] flex items-center justify-center     rounded-lg  bg-white/30 backdrop-blur-[1.5px]">
                    <div className="relative">
                      <div
                        className="absolute -inset-1 opacity-20 blur-[4px]"
                        style={{
                          background:
                            "linear-gradient(95deg, #0894FF 0%, #C959DD 34%, #FF2E54 68%, #FF9004 100%)",
                        }}
                      />
                      <div className="relative p-0.5      rounded-lg   overflow-hidden bg-white">
                        <button className="h-10 px-5      rounded-lg   bg-[#2A2A2F] text-white text-[12px] font-medium hover:bg-[#3E3E45] active:scale-97 transition-all  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
                          Customize this look
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress + controls */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex-1 h-2   rounded-lg border border-[#E6E6E6] bg-[#FBFBFB]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden mr-8">
            <div
              className="h-full w-1/4   rounded-lg"
              style={{
                background: "linear-gradient(90deg, #d4ff66 0%, #d4ff66 100%)",
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollCarousel("prev")}
              className="flex items-center justify-center w-8 h-8      rounded-lg   border border-[#E6E6E6] bg-white text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-95 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254"
                  stroke="currentColor"
                  strokeWidth="1.03417"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel("next")}
              className="flex items-center justify-center w-8 h-8      rounded-lg   border border-[#E6E6E6] bg-white text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-95 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M4.65375 9.30754L7.75625 6.20504L4.65375 3.10254"
                  stroke="currentColor"
                  strokeWidth="1.03417"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works Section ─────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    img: "/process1 (1).png",
    boldText: "Paste your LinkedIn link",
    restText:
      " and watch LinkedPage scrape your profile data to instantly render a professional personal page.",
  },
  {
    img: "/process1 (2).png",
    boldText: "Customize inline",
    restText:
      " text and images directly on the screen, and pick from multiple clean layout styles like Bento or minimal.",
  },
  {
    img: "/process1 (3).png",
    boldText: "Publish or export",
    restText:
      " instantly to a free subdomain or download the complete source code as a zip file to host anywhere.",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F7F7F7] border-t border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>Get your page in under 60 seconds</SectionHeading>
          </div>
          <DarkButton className="self-start sm:self-auto">
            Generate Now
          </DarkButton>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map((item, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="     rounded-lg   border border-[#E6E6E6] bg-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden p-2">
                <img
                  src={item.img}
                  alt={item.boldText}
                  className="w-full     rounded-lg  object-cover aspect-[41/38]"
                />
              </div>
              <p className="text-[16px] leading-[24px] text-[#171717]/60 font-inter-tight">
                <span className="text-[#171717] font-medium block mb-1 text-[18px] leading-[24px]">
                  {item.boldText}
                </span>
                {item.restText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Business Section (Career Showcase) ──────────────────────────────────────

const BUSINESS_TABS = ["Experience", "Projects", "Education", "Contact"];
const BUSINESS_CARDS = [
  "https://api.builder.io/api/v1/image/assets/TEMP/dd2d088a6043ca3ede653099742f96ac52246893?width=2560",
  "https://api.builder.io/api/v1/image/assets/TEMP/bd350a3668e75fb33844ff3cbe4a31706b2273df?width=2560",
  "https://api.builder.io/api/v1/image/assets/TEMP/f502cc59ba5f4d7f14360e66cb7e6447fb3a3c98?width=2560",
];

function BusinessSection() {
  const [activeTab, setActiveTab] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: dir === "next" ? 600 : -600,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionLabel>Beautiful structures for real content</SectionLabel>
          <SectionHeading>Showcase Your Career</SectionHeading>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-2">
          <div className="flex items-center      rounded-lg   bg-[#F3F3F3] p-1 border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
            {BUSINESS_TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`h-9 px-6 text-[14px] leading-[20px] rounded-[10px] transition-all duration-150 whitespace-nowrap font-inter-tight ${
                  activeTab === i
                    ? "bg-[#d4ff66] border border-[#d4ff66]/40 text-[#d4ff66]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  font-semibold"
                    : "text-[#171717]/60 hover:text-black hover:bg-black/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Card carousel */}
        <div className="relative mt-4">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide      rounded-lg   border border-[#E6E6E6] p-2 bg-[#FBFBFB]"
          >
            {BUSINESS_CARDS.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-full max-w-[900px] sm:max-w-[1100px]     rounded-lg  overflow-hidden  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] "
              >
                <img
                  src={src}
                  alt={`Business card ${i + 1}`}
                  className="w-full h-auto     rounded-lg  object-cover"
                />
              </div>
            ))}
          </div>
          {/* Arrows */}
          <button
            onClick={() => scrollCarousel("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10   rounded-lg bg-white border border-[#E6E6E6] text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-95 transition-all hidden sm:flex"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254"
                stroke="currentColor"
                strokeWidth="1.03417"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => scrollCarousel("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10   rounded-lg bg-white border border-[#E6E6E6] text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-95 transition-all hidden sm:flex"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M4.65375 9.30754L7.75625 6.20504L4.65375 3.10254"
                stroke="currentColor"
                strokeWidth="1.03417"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Domain Section ───────────────────────────────────────────────────────────

function DomainSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F7F7F7] border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col gap-2">
            <SectionLabel>Instant publishing</SectionLabel>
            <h2 className="text-black text-[28px] sm:text-[38px] leading-[46px] font-normal font-inter-tight">
              Claim Your Free Subdomain or Export ZIP
            </h2>
          </div>

          {/* Search box */}
          <div className="w-full max-w-[800px] relative mt-2">
            <div
              className="absolute -inset-0.5 opacity-15 blur-[4px]      rounded-lg  "
              style={{
                background:
                  "linear-gradient(92deg, #0894FF 0%, #C959DD 34%, #FF2E54 68%, #FF9004 100%)",
              }}
            />
            <div className="relative p-1      rounded-lg   overflow-hidden bg-white border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
              <div className="flex items-center justify-between px-5 py-4 rounded-[11px] bg-white">
                <div className="flex items-center gap-3">
                  <svg width="16" height="19" viewBox="0 0 16 19" fill="none">
                    <path
                      d="M13.2211 14.7838L10.4889 12.0515"
                      stroke="black"
                      strokeWidth="1.25917"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.92514 13.5241C9.7067 13.5241 11.9616 11.2692 11.9616 8.48764C11.9616 5.70607 9.7067 3.45117 6.92514 3.45117C4.14357 3.45117 1.88867 5.70607 1.88867 8.48764C1.88867 11.2692 4.14357 13.5241 6.92514 13.5241Z"
                      stroke="black"
                      strokeWidth="1.25917"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-black text-[16px] sm:text-[17px] font-medium leading-[27px] font-inter-tight">
                    reidhoffman.linkedpage.me
                  </span>
                </div>
                <button className="flex items-center justify-center w-8 h-8   rounded-lg btn-dark-sm active:scale-95 transition-all text-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <path
                      d="M5.31708 5.31714H12.9129V12.913"
                      stroke="currentColor"
                      strokeWidth="0.949479"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.31708 12.913L12.9129 5.31714"
                      stroke="currentColor"
                      strokeWidth="0.949479"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <p className="text-[#171717]/60 text-[13px] leading-[19px] underline cursor-pointer hover:text-black font-inter-tight transition-colors">
            Need local files? Download clean code zip
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Brand Section ────────────────────────────────────────────────────────────

const BRAND_CARDS = [
  {
    img: "https://api.builder.io/api/v1/image/assets/TEMP/9f3a1f22cc257cf4f0da1f8d5b8c463fc3e20c54?width=1498",
    boldText: "Notion meets Linktree",
    restText:
      " aesthetics that combine clean bento grid designs with rich professional content.",
  },
  {
    img: "https://api.builder.io/api/v1/image/assets/TEMP/8ef521fbb820f1b4a44b8f4b078009658f2a6baf?width=1498",
    boldText: "No dashboards or bloat",
    restText:
      " — edit your content directly on the page and get a beautiful result in under 60 seconds.",
  },
];

function BrandSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <SectionLabel>Make it uniquely yours</SectionLabel>
            <SectionHeading>Designed for Professionals</SectionHeading>
          </div>
          <DarkButton className="self-start sm:self-auto">
            Create Page
          </DarkButton>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BRAND_CARDS.map((card, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="     rounded-lg   border border-[#E6E6E6] bg-[#FBFBFB]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden p-2">
                <img
                  src={card.img}
                  alt={card.boldText}
                  className="w-full     rounded-lg  object-cover aspect-[129/116]"
                />
              </div>
              <p className="text-[16px] leading-[24px] text-[#171717]/60 font-inter-tight">
                <span className="text-[#171717] font-medium block mb-1 text-[18px] leading-[24px]">
                  {card.boldText}
                </span>
                {card.restText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────

const FEATURES = [
  {
    img: "/feature (1).png",
    text: "Fully responsive layouts optimized for mobile, tablet, and desktop viewing.",
  },
  {
    img: "/feature (2).png",
    text: "Export clean static code zip files to host on GitHub Pages, Vercel, or Netlify.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F7F7F7] border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <SectionLabel>Clean & Modern Aesthetics</SectionLabel>
            <SectionHeading>A Page with Real Content</SectionHeading>
          </div>
          <DarkButton className="self-start sm:self-auto">
            Try It Free
          </DarkButton>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="     rounded-lg   border border-[#E6E6E6] bg-white p-2 overflow-hidden  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
                <img
                  src={f.img}
                  alt={f.text}
                  className="w-full     rounded-lg  object-cover aspect-[13/8]"
                />
              </div>
              <p className="text-[#171717] text-[16px] sm:text-[18px] leading-[27px] font-normal font-inter-tight">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  const answers: Record<number, string> = {
    0: "LinkedPage is a web tool that converts a LinkedIn profile URL into a beautiful personal Website. You paste your LinkedIn link, the platform scrapes your profile data, and instantly renders a customizable page.",
    1: "No design or coding experience is required! LinkedPage automatically extracts your career history, skills, and details, then formats them into a polished personal website.",
    2: "You can edit text and images inline, swap and rearrange layout elements, and switch templates (minimal card, bento grid, full-page scroll, or dark mode) directly on the screen.",
    3: "Yes! You can connect your own custom domain, or publish it instantly on a free subdomain (like yourname.linkedpage.me).",
    4: "Yes, every site built with LinkedPage includes fast, free built-in hosting, so your professional site is online in seconds.",
    5: "Absolutely. You can update your site at any time through our inline visual editor. Changes go live instantly.",
    6: "Yes, you can export the generated code as a ZIP file containing clean, static HTML, CSS, and JS to host on GitHub Pages, Vercel, or any provider of your choice.",
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-12">
          <SectionLabel>Frequently Asked Questions</SectionLabel>
          <SectionHeading>
            Still have questions about LinkedPage?
          </SectionHeading>
        </div>

        {/* FAQ items */}
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {FAQ_ITEMS.map((question, i) => (
            <div
              key={i}
              className="     rounded-lg   border border-[#E6E6E6] bg-[#FBFBFB]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden transition-all duration-150"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => toggle(i)}
              >
                <span className="text-[#171717] text-[16px] sm:text-[18px] leading-[26px] font-medium font-inter-tight pr-4">
                  {question}
                </span>
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-[10px] btn-dark-sm text-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  active:scale-95 transition-all">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path
                      d="M2.94586 7.5H11.1945"
                      stroke="currentColor"
                      strokeWidth="1.17833"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {openIdx !== i && (
                      <path
                        d="M7.07001 3.375V11.625"
                        stroke="currentColor"
                        strokeWidth="1.17833"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>
                </span>
              </button>
              {openIdx === i && (
                <div className="px-6 pb-6 text-[#171717]/60 text-[15px] sm:text-[16px] leading-[24px] font-inter-tight border-t border-[#F3F3F3]/80 pt-4">
                  {answers[i]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Index() {
  return (
    <div className="min-h-screen font-inter bg-white text-black antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <TemplatesSection />
        <HowItWorksSection />
        <BusinessSection />
        <FeaturesSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}

```

---

## File: `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "client/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}

```

---

## File: `components/AnimatedSVGs.tsx`

```tsx
"use client";

import React from "react";

export function AnimatedUploadIllustration() {
  return (
    <div className="w-full max-w-[200px] h-[120px] mx-auto select-none pointer-events-none mb-3">
      <svg
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Subtle glow filter */}
          <filter id="glow-svg" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Gradients */}
          <linearGradient id="folderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8DB8FF" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          <linearGradient id="browserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9FAFB" />
            <stop offset="100%" stopColor="#EEF2F6" />
          </linearGradient>

          <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4ff66" />
            <stop offset="100%" stopColor="#d4ff66" />
          </linearGradient>
        </defs>

        <style>{`
          /* Keyframes */
          @keyframes floatZip {
            0% {
              transform: translateY(0px) rotate(-3deg);
            }
            50% {
              transform: translateY(-8px) rotate(1deg);
            }
            100% {
              transform: translateY(0px) rotate(-3deg);
            }
          }

          @keyframes pulseBrowser {
            0%, 100% {
              opacity: 0.85;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.015);
            }
          }

          @keyframes drawRay {
            0% {
              stroke-dashoffset: 16;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }

          @keyframes floatParticle {
            0%, 100% {
              transform: translate(0, 0);
              opacity: 0.3;
            }
            50% {
              transform: translate(3px, -5px);
              opacity: 0.8;
            }
          }

          /* Class bindings (Safari-compatible with fill-box/transform-origin) */
          .svg-zip-card {
            transform-box: fill-box;
            transform-origin: center center;
            animation: floatZip 3.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
          }

          .svg-browser-card {
            transform-box: fill-box;
            transform-origin: center bottom;
            animation: pulseBrowser 4s ease-in-out infinite;
          }

          .svg-connector-ray {
            stroke-dasharray: 8 8;
            animation: drawRay 1.2s linear infinite;
          }

          .svg-p1 {
            transform-box: fill-box;
            transform-origin: center;
            animation: floatParticle 2.8s ease-in-out infinite;
          }

          .svg-p2 {
            transform-box: fill-box;
            transform-origin: center;
            animation: floatParticle 3.4s ease-in-out infinite -1s;
          }
        `}</style>

        {/* 1. Browser Base (Dropzone target background) */}
        <g className="svg-browser-card">
          {/* Main Card */}
          <rect
            x="30"
            y="45"
            width="140"
            height="70"
            rx="12"
            fill="url(#browserGrad)"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          {/* Top Bar Decoration */}
          <line
            x1="30"
            y1="58"
            x2="170"
            y2="58"
            stroke="#E6E6E6"
            strokeWidth="1.2"
          />
          {/* Browser Dots */}
          <circle cx="40" cy="51" r="2.5" fill="#E45A5A" />
          <circle cx="48" cy="51" r="2.5" fill="#E9C46A" />
          <circle cx="56" cy="51" r="2.5" fill="#d4ff66" />

          {/* Fake Grid Layout Elements inside Browser */}
          <rect
            x="40"
            y="66"
            width="35"
            height="12"
            rx="3"
            fill="#E6E6E6"
            opacity="0.6"
          />
          <rect
            x="80"
            y="66"
            width="80"
            height="12"
            rx="3"
            fill="#E6E6E6"
            opacity="0.6"
          />
          <rect
            x="40"
            y="84"
            width="120"
            height="20"
            rx="4"
            fill="url(#accentGrad)"
            opacity="0.15"
          />
          <rect
            x="48"
            y="90"
            width="70"
            height="8"
            rx="2"
            fill="url(#accentGrad)"
            opacity="0.6"
          />
        </g>

        {/* 2. Moving Rays/Connectors flowing from top to browser */}
        <path
          d="M 50 15 Q 60 40 85 45"
          stroke="#3b82f6"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="svg-connector-ray"
          opacity="0.3"
        />
        <path
          d="M 150 15 Q 140 40 115 45"
          stroke="#3b82f6"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="svg-connector-ray"
          opacity="0.3"
        />

        {/* 3. Floating Particles */}
        <circle cx="25" cy="40" r="3" fill="#8DB8FF" className="svg-p1" />
        <circle cx="178" cy="65" r="2" fill="#d4ff66" className="svg-p2" />
        <circle
          cx="165"
          cy="30"
          r="3.5"
          fill="#3b82f6"
          className="svg-p1"
          opacity="0.5"
        />

        {/* 4. The ZIP File Card (Floating/Ingesting) */}
        <g className="svg-zip-card">
          {/* Card Shadow */}
          <rect
            x="76"
            y="12"
            width="48"
            height="48"
            rx="10"
            fill="#171717"
            opacity="0.08"
            filter="url(#glow-svg)"
          />
          {/* Card Body */}
          <rect
            x="74"
            y="10"
            width="48"
            height="48"
            rx="10"
            fill="url(#folderGrad)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          {/* Zip Folder Icon */}
          <path
            d="M 88 22 L 95 22 L 97 25 L 108 25 L 108 38 L 88 38 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
          {/* Zipper Teeth details */}
          <line
            x1="98"
            y1="27"
            x2="98"
            y2="38"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />

          {/* "ZIP" Tag label text */}
          <rect
            x="88"
            y="32"
            width="20"
            height="8"
            rx="2"
            fill="#1e3a8a"
            opacity="0.3"
          />
          <path
            d="M91 37 L91 34 M93 34 L97 34 M95 34 L95 37 M98 34 L98 37"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

export function AnimatedGeneratingIllustration() {
  return (
    <div className="w-full max-w-[240px] h-[140px] mx-auto select-none pointer-events-none mb-6">
      <svg
        viewBox="0 0 240 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Glowing Filter */}
          <filter id="glow-heavy" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Gradients */}
          <linearGradient
            id="mainBentoGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8DB8FF" />
          </linearGradient>

          <linearGradient id="bentoAccent" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d4ff66" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d4ff66" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <style>{`
          /* Animations */
          @keyframes drawStroke {
            0% {
              stroke-dashoffset: 400;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }

          @keyframes popIn {
            0%, 100% {
              transform: scale(0.92);
              opacity: 0.4;
            }
            50% {
              transform: scale(1.02);
              opacity: 1;
            }
          }

          @keyframes spinSlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes assembleBlock {
            0% {
              transform: translateY(12px) scale(0.9);
              opacity: 0;
            }
            30%, 70% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-8px) scale(0.95);
              opacity: 0;
            }
          }

          @keyframes pulseCircle {
            0%, 100% {
              r: 12px;
              opacity: 0.15;
            }
            50% {
              r: 20px;
              opacity: 0.35;
            }
          }

          /* Classes */
          .svg-wireframe-lines {
            stroke-dasharray: 400;
            animation: drawStroke 6s linear infinite;
          }

          .svg-node-avatar {
            transform-box: fill-box;
            transform-origin: center center;
            animation: popIn 3s ease-in-out infinite;
          }

          .svg-bento-1 {
            transform-box: fill-box;
            transform-origin: center center;
            animation: assembleBlock 4s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          }

          .svg-bento-2 {
            transform-box: fill-box;
            transform-origin: center center;
            animation: assembleBlock 4s cubic-bezier(0.25, 1, 0.5, 1) infinite -1.33s;
          }

          .svg-bento-3 {
            transform-box: fill-box;
            transform-origin: center center;
            animation: assembleBlock 4s cubic-bezier(0.25, 1, 0.5, 1) infinite -2.66s;
          }

          .svg-pulse-glow {
            transform-box: fill-box;
            transform-origin: center;
            animation: pulseCircle 3s ease-in-out infinite;
          }

          .svg-spinning-gear {
            transform-box: fill-box;
            transform-origin: center;
            animation: spinSlow 12s linear infinite;
          }
        `}</style>

        {/* 1. Network / Connecting Wireframe Lines */}
        <path
          d="M 30,70 L 80,35 L 140,55 L 210,70 L 160,110 L 80,100 Z M 80,35 L 160,110 M 140,55 L 80,100"
          stroke="#E6E6E6"
          strokeWidth="1"
          className="svg-wireframe-lines"
        />

        {/* 2. Glowing pulse behind central Avatar node */}
        <circle
          cx="120"
          cy="70"
          r="16"
          fill="#8DB8FF"
          className="svg-pulse-glow"
        />

        {/* 3. Spinning Gear/Stars Decoration */}
        <g className="svg-spinning-gear">
          {/* Mini star nodes */}
          <path
            d="M 120 40 L 122 45 L 127 45 L 123 48 L 125 53 L 120 50 L 115 53 L 117 48 L 113 45 L 118 45 Z"
            fill="#d4ff66"
            opacity="0.6"
          />
          <path
            d="M 60 70 L 62 73 L 66 73 L 63 75 L 64 79 L 60 77 L 56 79 L 57 75 L 54 73 L 58 73 Z"
            fill="#3b82f6"
            opacity="0.4"
          />
        </g>

        {/* 4. Assembling Bento Web Blocks */}
        {/* Left Small block */}
        <g className="svg-bento-1">
          <rect
            x="25"
            y="45"
            width="45"
            height="50"
            rx="8"
            fill="url(#bentoAccent)"
            stroke="#d4ff66"
            strokeWidth="1.2"
          />
          <line
            x1="33"
            y1="57"
            x2="62"
            y2="57"
            stroke="#d4ff66"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="33"
            y1="67"
            x2="52"
            y2="67"
            stroke="#d4ff66"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <circle cx="35" cy="82" r="3" fill="#d4ff66" />
          <circle cx="45" cy="82" r="3" fill="#d4ff66" />
          <circle cx="55" cy="82" r="3" fill="#d4ff66" />
        </g>

        {/* Center Main block */}
        <g className="svg-bento-2">
          <rect
            x="85"
            y="25"
            width="70"
            height="90"
            rx="10"
            fill="#FFFFFF"
            stroke="#E6E6E6"
            strokeWidth="1.5"
            filter="url(#glow-heavy)"
          />
          {/* Avatar frame */}
          <circle cx="120" cy="55" r="14" fill="#F3F3F3" />
          <path d="M110 74 C110 65, 130 65, 130 74 Z" fill="#E6E6E6" />
          {/* Name & details */}
          <rect x="100" y="78" width="40" height="5" rx="2" fill="#2A2A2F" />
          <rect x="95" y="87" width="50" height="3.5" rx="1.5" fill="#E6E6E6" />
          <rect x="105" y="94" width="30" height="3" rx="1.5" fill="#E6E6E6" />
        </g>

        {/* Right Small block */}
        <g className="svg-bento-3">
          <rect
            x="170"
            y="45"
            width="45"
            height="50"
            rx="8"
            fill="url(#mainBentoGrad)"
            stroke="#3b82f6"
            strokeWidth="1"
          />
          <rect
            x="178"
            y="55"
            width="29"
            height="10"
            rx="3"
            fill="#FFFFFF"
            opacity="0.3"
          />
          <line
            x1="178"
            y1="73"
            x2="198"
            y2="73"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="178"
            y1="81"
            x2="192"
            y2="81"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      </svg>
    </div>
  );
}

export function AnimatedSuccessIllustration() {
  return (
    <div className="relative w-24 h-24 mx-auto">
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <filter
            id="success-blur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <style>{`
          @keyframes drawCheckCircle {
            to { stroke-dashoffset: 0; }
          }
          @keyframes drawCheckMark {
            to { stroke-dashoffset: 0; }
          }
          @keyframes popScale {
            0% { transform: scale(0.8); }
            50% { transform: scale(1.08); }
            100% { transform: scale(1); }
          }
          @keyframes confettiFly {
            0% { transform: translate(0, 0) scale(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translate(var(--tx), var(--ty)) scale(1.2); opacity: 0; }
          }

          .success-circle-bg {
            stroke-dasharray: 202;
            stroke-dashoffset: 202;
            animation: drawCheckCircle 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          }
          .success-check-path {
            stroke-dasharray: 45;
            stroke-dashoffset: 45;
            animation: drawCheckMark 0.5s cubic-bezier(0.19, 1, 0.22, 1) 0.5s forwards;
          }
          .success-con-1 { --tx: -20px; --ty: -25px; animation: confettiFly 1.2s ease-out 0.8s infinite; }
          .success-con-2 { --tx: 25px; --ty: -22px; animation: confettiFly 1.4s ease-out 0.7s infinite; }
          .success-con-3 { --tx: -22px; --ty: 15px; animation: confettiFly 1.1s ease-out 0.9s infinite; }
          .success-con-4 { --tx: 24px; --ty: 20px; animation: confettiFly 1.3s ease-out 0.6s infinite; }
          .success-con-5 { --tx: 0px; --ty: -32px; animation: confettiFly 1.5s ease-out 0.5s infinite; }
          
          .success-main-group {
            transform-box: fill-box;
            transform-origin: center;
            animation: popScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
        `}</style>

        {/* Confetti Burst */}
        <circle
          cx="40"
          cy="40"
          r="2"
          fill="#8DB8FF"
          className="success-con-1"
        />
        <circle
          cx="40"
          cy="40"
          r="3"
          fill="#d4ff66"
          className="success-con-2"
        />
        <circle
          cx="40"
          cy="40"
          r="2.5"
          fill="#E9C46A"
          className="success-con-3"
        />
        <circle
          cx="40"
          cy="40"
          r="3"
          fill="#E45A5A"
          className="success-con-4"
        />
        <path
          d="M40 40 L41 42 L43 42 L41 43 L42 45 L40 44 L38 45 L39 43 L37 42 L39 42 Z"
          fill="#8DB8FF"
          className="success-con-5"
        />

        <g className="success-main-group">
          {/* Background Glow */}
          <circle
            cx="40"
            cy="40"
            r="32"
            fill="#d4ff66"
            opacity="0.25"
            filter="url(#success-blur)"
          />
          {/* Main Circle */}
          <circle
            cx="40"
            cy="40"
            r="32"
            fill="#d4ff66"
            stroke="#d4ff66"
            strokeWidth="3"
            className="success-circle-bg"
          />
          {/* Check Path */}
          <path
            d="M26 41.5 L35 50.5 L54 31.5"
            stroke="#1a5c3a"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="success-check-path"
          />
        </g>
      </svg>
    </div>
  );
}

export function AnimatedDashboardEmptyIllustration() {
  return (
    <div className="w-full max-w-[160px] h-[120px] mx-auto select-none pointer-events-none mb-4">
      <svg
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient
            id="emptyFolderGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#EEF2F6" />
            <stop offset="100%" stopColor="#DFE5EC" />
          </linearGradient>
          <linearGradient
            id="emptyPaperGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F9FAFB" />
          </linearGradient>
        </defs>

        <style>{`
          @keyframes folderBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          @keyframes paperSlide {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px) rotate(1.5deg); }
          }
          @keyframes dashDraw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes searchFloat {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(4px, -4px) rotate(3deg); }
          }

          .empty-folder-base {
            transform-box: fill-box;
            transform-origin: center bottom;
            animation: folderBounce 4s ease-in-out infinite;
          }
          .empty-paper-card {
            transform-box: fill-box;
            transform-origin: center center;
            animation: paperSlide 4s ease-in-out infinite;
          }
          .empty-dash-border {
            stroke-dasharray: 6 4;
            stroke-dashoffset: 50;
            animation: dashDraw 3s linear infinite;
          }
          .empty-magnifier {
            transform-box: fill-box;
            transform-origin: center center;
            animation: searchFloat 3.2s ease-in-out infinite;
          }
        `}</style>

        {/* Dash Outline of website board representation */}
        <rect
          x="25"
          y="15"
          width="110"
          height="85"
          rx="14"
          stroke="#D1D5DB"
          strokeWidth="1.5"
          className="empty-dash-border"
        />

        {/* Paper Page sliding out */}
        <g className="empty-paper-card">
          <rect
            x="42"
            y="24"
            width="76"
            height="60"
            rx="8"
            fill="url(#emptyPaperGrad)"
            stroke="#E6E6E6"
            strokeWidth="1.2"
          />
          {/* Wireframe details on paper */}
          <circle cx="56" cy="38" r="6" fill="#F3F3F3" />
          <rect x="68" y="34" width="38" height="4" rx="2" fill="#E6E6E6" />
          <rect
            x="68"
            y="41"
            width="24"
            height="3"
            rx="1.5"
            fill="#E6E6E6"
            opacity="0.6"
          />

          <rect x="50" y="52" width="60" height="2" rx="1" fill="#F3F3F3" />
          <rect x="50" y="58" width="45" height="2" rx="1" fill="#F3F3F3" />
          <rect
            x="50"
            y="64"
            width="55"
            height="2"
            rx="1"
            fill="#F3F3F3"
            opacity="0.5"
          />

          {/* Plus Add sign */}
          <circle cx="80" cy="74" r="8" fill="#3b82f6" opacity="0.1" />
          <path
            d="M77 74 L83 74 M80 77 L80 71"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* Open Folder representation */}
        <g className="empty-folder-base">
          {/* Back flap */}
          <path
            d="M 35 90 L 35 55 A 4 4 0 0 1 39 51 L 62 51 L 68 56 L 121 56 A 4 4 0 0 1 125 60 L 125 90 Z"
            fill="url(#emptyFolderGrad)"
            stroke="#D1D5DB"
            strokeWidth="1"
          />
          {/* Front flap */}
          <path
            d="M 33 92 L 33 63 A 4 4 0 0 1 37 59 L 123 59 A 4 4 0 0 1 127 63 L 127 92 Z"
            fill="#EEF2F6"
            stroke="#D1D5DB"
            strokeWidth="1"
            opacity="0.95"
          />
          <path d="M 33 65 L 127 65" stroke="#FFFFFF" strokeWidth="1.2" />
        </g>

        {/* Floating Magnifier */}
        <g className="empty-magnifier">
          <circle
            cx="112"
            cy="42"
            r="9"
            stroke="#9CA3AF"
            strokeWidth="2"
            fill="#FFFFFF"
            opacity="0.9"
          />
          <line
            x1="118.5"
            y1="48.5"
            x2="129"
            y2="59"
            stroke="#9CA3AF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

export function AnimatedThinkingIllustration() {
  return (
    <div className="flex items-center justify-center py-1 select-none pointer-events-none">
      <svg
        viewBox="0 0 42 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-4"
      >
        <style>{`
          @keyframes bubblePulse {
            0%, 100% { transform: translateY(0) scale(0.85); opacity: 0.4; }
            50% { transform: translateY(-4px) scale(1.05); opacity: 1; }
          }
          .think-bubble-1 {
            transform-box: fill-box;
            transform-origin: center;
            animation: bubblePulse 1.2s ease-in-out infinite;
          }
          .think-bubble-2 {
            transform-box: fill-box;
            transform-origin: center;
            animation: bubblePulse 1.2s ease-in-out infinite -0.4s;
          }
          .think-bubble-3 {
            transform-box: fill-box;
            transform-origin: center;
            animation: bubblePulse 1.2s ease-in-out infinite -0.8s;
          }
        `}</style>

        {/* Glow stops */}
        <circle
          cx="8"
          cy="8"
          r="4.5"
          fill="#3b82f6"
          className="think-bubble-1"
        />
        <circle
          cx="21"
          cy="8"
          r="4.5"
          fill="#8DB8FF"
          className="think-bubble-2"
        />
        <circle
          cx="34"
          cy="8"
          r="4.5"
          fill="#d4ff66"
          className="think-bubble-3"
        />
      </svg>
    </div>
  );
}

```

---

## File: `components/Footer.tsx`

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const productLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "#" },
];

const technologyLinks = [
  { label: "Scraping Engine", href: "#" },
  { label: "Bento Generator", href: "#" },
  { label: "ZIP Export", href: "#" },
];

const companyLinks = [
  { label: "Our Philosophy", href: "#" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Security Info", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address!");
      return;
    }
    toast.success(`Subscribed ${email} to our newsletter successfully!`);
    setEmail("");
  };

  const handleLinkClick = (label: string, e: React.MouseEvent) => {
    if (e.currentTarget.getAttribute("href") === "#") {
      e.preventDefault();
      toast.info(`${label} portal coming soon!`);
    } else {
      toast(`Navigating to ${label}...`);
    }
  };

  return (
    <footer
      className="w-full p-6 sm:p-10 lg:p-14 bg-cover bg-center bg-no-repeat select-none pointer-events-none"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="w-full max-w-[1536px] mx-auto bg-[#FBFBFB] rounded-[18px] border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  px-6 sm:px-12 lg:px-20 py-16 text-black font-inter pointer-events-auto">
        <div className="flex flex-col gap-12">

          {/* Top Section: Giant centered logo */}
          <div className="w-full flex justify-center py-4 border-b border-[#E6E6E6] pb-12">
            <img
              src="/logo.png"
              alt="LinkedPage Logo"
              className="h-[80px] sm:h-[120px] md:h-[140px] w-auto object-contain select-none pointer-events-none"
            />
          </div>

          {/* Details Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pt-4 pb-12 border-b border-[#E6E6E6]">

            {/* Left Column: Newsletter & Social */}
            <div className="md:col-span-4 flex flex-col justify-between gap-10 md:pr-12 md:border-r border-[#E6E6E6]">
              {/* Newsletter form */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-500 font-semibold font-inter-tight">
                  Newsletter
                </span>
                <form onSubmit={handleSubscribe} className="relative w-full max-w-sm mt-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-white text-[#171717] border border-[#E6E6E6]      rounded-lg   h-[48px] px-4 pr-12 text-sm placeholder-[#171717]/40 outline-none focus:border-[#8DB8FF] transition-[border-color] duration-200 font-inter-tight  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] "
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#171717] hover:text-black active:scale-[0.95] transition-transform duration-120 ease-out"
                  >
                    <ArrowRight size={16} />
                  </button>
                </form>
                <p className="font-mono text-[9px] text-gray-400 tracking-tight leading-normal uppercase">
                  I accept the terms and conditions
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); toast.success("Opening Instagram profile..."); }}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); toast.success("Opening LinkedIn showcase..."); }}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); toast.success("Opening X (Twitter) profile..."); }}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Right Columns: Nav Links */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 md:pl-12">

              {/* Product */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold font-inter-tight">
                  Product
                </span>
                <div className="flex flex-col gap-3">
                  {productLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-black text-sm transition-colors duration-200 font-inter-tight"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Technology */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold font-inter-tight">
                  Technology
                </span>
                <div className="flex flex-col gap-3">
                  {technologyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-black text-sm transition-colors duration-200 font-inter-tight"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold font-inter-tight">
                  Brand
                </span>
                <div className="flex flex-col gap-3">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-black text-sm transition-colors duration-200 font-inter-tight"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold font-inter-tight">
                  Support
                </span>
                <div className="flex flex-col gap-3">
                  {legalLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-black text-sm transition-colors duration-200 font-inter-tight"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between text-xs text-gray-400 font-mono uppercase tracking-wider font-inter-tight">
            <span>Copyright LinkedPage 2026</span>
          </div>

        </div>
      </div>
    </footer>
  );
}

```

---

## File: `components/Navbar.tsx`

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const handleNavClick = (sectionName: string) => {
    setMobileOpen(false);
    toast(`Scrolling to ${sectionName}...`);
  };

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[1536px] px-6 sm:px-0 font-inter">
      <div className="flex items-center justify-between h-14 px-7 py-8 bg-white/70 backdrop-blur-md      rounded-lg   border border-[#E6E6E6]/10  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <img
            src="/logo.png"
            alt="LinkedPage"
            className="h-[40px] sm:h-[44px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="#features"
            onClick={() => handleNavClick("Features")}
            className="text-[#171717]/85 text-[13px] font-medium leading-[18px] hover:text-black transition-colors font-inter-tight"
          >
            Features
          </a>
          <a
            href="#faq"
            onClick={() => handleNavClick("FAQ")}
            className="text-[#171717]/85 text-[13px] font-medium leading-[18px] hover:text-black transition-colors font-inter-tight"
          >
            FAQ
          </a>
          <a
            href="#templates"
            onClick={() => handleNavClick("Templates")}
            className="text-[#171717]/85 text-[13px] font-medium leading-[18px] hover:text-black transition-colors font-inter-tight"
          >
            Templates
          </a>
          <Link
            href="/pricing"
            className="text-[#171717]/85 text-[13px] font-medium leading-[18px] hover:text-black transition-colors font-inter-tight"
          >
            Pricing
          </Link>

        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Social Icons - desktop only */}
          <div className="hidden md:flex items-center gap-2">
            {/* Discord */}
            <button
              onClick={() => toast.success("Redirecting to Discord community...")}
              className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  text-black hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#discord-clip)">
                  <path d="M13.04 1.19272C12.1164 0.770902 11.12 0.450902 10.08 0.276357C10.0606 0.271508 10.0436 0.278781 10.0291 0.298175C9.89819 0.52363 9.76001 0.821811 9.65819 1.05454C8.53819 0.884842 7.43031 0.884842 6.33456 1.05454C6.23274 0.814539 6.08728 0.52363 5.96365 0.298175C5.95395 0.28363 5.93698 0.276357 5.91274 0.276357C4.87031 0.460599 3.88365 0.766054 2.95274 1.19272C2.94789 1.19272 2.94062 1.19757 2.93092 1.20727C1.04728 4.02181 0.530919 6.7709 0.785465 9.48363C0.785465 9.49818 0.792738 9.5103 0.807283 9.51999C2.05092 10.4364 3.25819 10.9891 4.43637 11.3527C4.45577 11.3527 4.47274 11.3479 4.48728 11.3382C4.7685 10.9551 5.01577 10.5527 5.2291 10.1309C5.2388 10.1067 5.23153 10.0848 5.20728 10.0654C4.81456 9.9103 4.43637 9.7309 4.07274 9.52727C4.04365 9.51272 4.04365 9.46908 4.07274 9.44727C4.15031 9.38908 4.22546 9.3309 4.29819 9.27272C4.31274 9.25818 4.32728 9.25818 4.34183 9.27272C6.72001 10.3564 9.30183 10.3564 11.6509 9.27272C11.6703 9.26787 11.6873 9.26787 11.7018 9.27272C11.7746 9.33575 11.8497 9.39393 11.9273 9.44727C11.9515 9.47636 11.9515 9.50302 11.9273 9.52727C11.5636 9.7406 11.1855 9.91999 10.7927 10.0654C10.7636 10.0751 10.7564 10.097 10.7709 10.1309C10.9891 10.5527 11.2364 10.9551 11.5127 11.3382C11.5273 11.3527 11.5443 11.3576 11.5636 11.3527C12.7491 10.9818 13.9564 10.4291 15.2 9.51999C15.2097 9.5103 15.217 9.49818 15.2218 9.48363C15.5273 6.34908 14.7127 3.62181 13.0691 1.20727C13.0691 1.19757 13.0618 1.19272 13.0473 1.19272H13.04ZM5.58546 7.83999C4.86546 7.83999 4.27637 7.18545 4.27637 6.3709C4.27637 5.55636 4.85819 4.90181 5.58546 4.90181C6.31274 4.90181 6.90183 5.56363 6.89456 6.3709C6.89456 7.17818 6.31274 7.83999 5.58546 7.83999ZM10.4218 7.83999C9.70183 7.83999 9.11274 7.18545 9.11274 6.3709C9.11274 5.55636 9.69456 4.90181 10.4218 4.90181C11.1491 4.90181 11.7382 5.56363 11.7309 6.3709C11.7309 7.17818 11.1564 7.83999 10.4218 7.83999Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="discord-clip">
                    <rect width="16" height="11.6364" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            {/* X (Twitter) */}
            <button
              onClick={() => toast.success("Redirecting to Twitter feed...")}
              className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  text-black hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#x-clip)">
                  <path d="M11.0133 0H13.16L8.44667 5.36667L13.9533 12.6467H9.632L6.24867 8.22267L2.37534 12.6467H0.228669L5.222 6.90667L-0.0513306 0H4.37734L7.434 4.04133L11.0133 0ZM10.262 11.3867H11.452L3.752 1.21333H2.47334L10.262 11.3867Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="x-clip">
                    <rect width="14" height="12.6467" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            {/* Instagram */}
            <button
              onClick={() => toast.success("Redirecting to Instagram profile...")}
              className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  text-black hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#ig-clip)">
                  <path d="M12.75 1.5H5.25C3.17893 1.5 1.5 3.17893 1.5 5.25V12.75C1.5 14.8211 3.17893 16.5 5.25 16.5H12.75C14.8211 16.5 16.5 14.8211 16.5 12.75V5.25C16.5 3.17893 14.8211 1.5 12.75 1.5Z" stroke="black" strokeWidth="1.6875" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8.5275C12.0926 9.15168 11.986 9.78916 11.6953 10.3493C11.4047 10.9094 10.9449 11.3636 10.3812 11.6473C9.8176 11.9309 9.17886 12.0297 8.55586 11.9294C7.93287 11.8292 7.35734 11.5351 6.91115 11.0889C6.46496 10.6427 6.17082 10.0672 6.07058 9.44416C5.97033 8.82116 6.06907 8.18242 6.35277 7.61878C6.63647 7.05514 7.09066 6.5953 7.65076 6.30468C8.21086 6.01405 8.84834 5.90744 9.47252 6C10.1092 6.09441 10.6987 6.39109 11.1538 6.84623C11.6089 7.30136 11.9056 7.89081 12 8.5275Z" stroke="black" strokeWidth="1.6875" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.125 4.875H13.1325" stroke="black" strokeWidth="1.6875" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="ig-clip">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>

          {/* Auth Buttons */}
          {isPending ? (
            <div className="hidden sm:flex h-10 px-5 items-center justify-center rounded-lg bg-[#F3F3F3] text-black/50 text-[12px] font-medium animate-pulse w-24" />
          ) : session ? (
            <Link
              href="/dashboard"
              className="hidden sm:flex h-10 px-5 items-center justify-center rounded-lg btn-dark text-white text-[12px] font-medium whitespace-nowrap font-inter-tight"
            >
              Go to dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:flex h-10 px-5 items-center justify-center rounded-lg bg-[#F3F3F3] text-black text-[12px] font-medium hover:bg-[#EAEAEA] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out whitespace-nowrap font-inter-tight"
              >
                Log in
              </Link>
              <Link
                href="/editor"
                className="flex h-10 px-5 items-center justify-center rounded-lg btn-dark text-white text-[12px] font-medium whitespace-nowrap font-inter-tight"
              >
                Get started
              </Link>
            </>
          )}

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9      rounded-lg   bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out ml-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              {mobileOpen ? (
                <>
                  <path d="M4 4L14 14" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14 4L4 14" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <path d="M3 5H15" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 9H15" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 13H15" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu with origin-aware animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ originX: 0.9, originY: 0 }}
            className="mt-2      rounded-lg   border border-[#E6E6E6] bg-white/95 backdrop-blur-md  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  p-4 flex flex-col gap-3 lg:hidden will-change-[transform,opacity]"
          >
            <a
              href="#features"
              className="text-[#171717]/85 text-[14px] py-2 hover:text-black transition-colors font-inter-tight font-medium"
              onClick={() => handleNavClick("Features")}
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-[#171717]/85 text-[14px] py-2 hover:text-black transition-colors font-inter-tight font-medium"
              onClick={() => handleNavClick("FAQ")}
            >
              FAQ
            </a>
            <a
              href="#templates"
              className="text-[#171717]/85 text-[14px] py-2 hover:text-black transition-colors font-inter-tight font-medium"
              onClick={() => handleNavClick("Templates")}
            >
              Templates
            </a>
            <Link
              href="/pricing"
              className="text-[#171717]/85 text-[14px] py-2 hover:text-black transition-colors font-inter-tight font-medium text-left"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>

            <div className="flex items-center gap-2 pt-2 border-t border-[#E6E6E6]">
              {isPending ? (
                <div className="flex-1 h-10 rounded-lg bg-[#F3F3F3] animate-pulse" />
              ) : session ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 h-10 rounded-lg btn-dark text-white text-[12px] font-medium font-inter-tight flex items-center justify-center"
                >
                  Go to dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 h-10 rounded-lg bg-[#F3F3F3] text-black text-[12px] font-medium hover:bg-[#EAEAEA] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out flex items-center justify-center"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/editor"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 h-10 rounded-lg btn-dark text-white text-[12px] font-medium font-inter-tight flex items-center justify-center"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

```

---

## File: `components/ui/badge.tsx`

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```

---

## File: `components/ui/button.tsx`

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

---

## File: `components/ui/card.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

---

## File: `components/ui/demo.tsx`

```tsx
import { ShiningText } from "@/components/ui/shining-text";

const Demo = () => {
  return (
    <>
      <ShiningText text="HextaAI is thinking..." />
    </>
  );
};

export { Demo };

```

---

## File: `components/ui/input.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```

---

## File: `components/ui/shining-text.tsx`

```tsx
"use client";

import * as React from "react";
import { motion } from "motion/react";

interface ShiningTextProps {
  text: string;
}

export function ShiningText({ text }: ShiningTextProps) {
  return (
    <motion.h1
      className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text text-base font-regular text-transparent"
      initial={{ backgroundPosition: "200% 0" }}
      animate={{ backgroundPosition: "-200% 0" }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "linear",
      }}
    >
      {text}
    </motion.h1>
  );
}

```

---

## File: `components/ui/textarea.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

```

---

## File: `components/UserMenu.tsx`

```tsx
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface UserMenuProps {
  name: string;
  email: string;
  avatarUrl?: string;
  onClose?: () => void;
}

export function UserMenu({
  name,
  email,
  avatarUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  onClose,
}: UserMenuProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, transform: "scale(0.95)" }}
      animate={{ opacity: 1, transform: "scale(1)" }}
      exit={{ opacity: 0, transform: "scale(0.95)" }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className="absolute z-50 top-10 rounded-2xl origin-top-right border border-[#010101]/5 bg-white/95 backdrop-blur-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] right-0 w-72 p-5 text-left"
    >
      <div className="space-y-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0 rounded-lg h-9 w-9 p-0.5 border border-[#E6E6E6]">
            <img
              className="h-full w-full object-cover rounded-lg"
              alt="user"
              src={avatarUrl}
            />
          </div>
          <div className="truncate">
            <p className="text-sm font-semibold text-[#2A2A2F] truncate">
              {name || "User"}
            </p>
            <p className="text-xs text-[#171717]/60 truncate">
              {email || "user@example.com"}
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-1">
          <button
            onClick={() => {
              router.push("/settings");
              onClose?.();
            }}
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 0 3.319-1.915" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Settings
          </button>
          <button
            onClick={() => {
              router.push("/report-bug");
              onClose?.();
            }}
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
            </svg>
            Report a bug
          </button>
          <button
            onClick={() => {
              router.push("/docs");
              onClose?.();
            }}
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 7v14" />
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
            </svg>
            Documentation
          </button>
        </div>

        <div className="border-t border-black/5" />
        <button
          onClick={async () => {
            await authClient.signOut();
            sessionStorage.removeItem("linkedpage_user");
            toast.success("Signed out successfully");
            onClose?.();
            router.push("/");
          }}
          className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-red-50 text-[#E45A5A] w-full"
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          </svg>
          Sign out
        </button>
      </div>
    </motion.div>
  );
}

```

---

## File: `components/WizardAnimations.tsx`

```tsx
"use client";

import React from "react";
import { Sparkles, Briefcase, Code, Heart, Layers } from "lucide-react";

interface WizardAnimationsProps {
  step: number;
  profile?: any;
  projects?: { title: string; description: string; link?: string }[];
  interests?: string;
  skills?: { name: string }[];
  experience?: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
}

// ─── Welcome / Kickoff Animation (Step 1) ──────────────────────────────────────
export function WelcomeAnimation({ profile }: { profile?: any }) {
  const name = profile?.name || "Your Name";
  const headline = profile?.headline || "Professional Headline";
  const avatarUrl = profile?.avatarUrl || "https://i.pravatar.cc/80?img=47";

  return (
    <div className="w-full max-w-[480px] aspect-square flex flex-col items-center justify-center relative">
      <style>{`
        @keyframes cardFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes welcomePulse {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.1; }
        }
        .welcome-float {
          animation: cardFloat 6s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .welcome-pulse {
          animation: welcomePulse 4s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>

      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[380px] welcome-float"
      >
        <defs>
          <filter
            id="shadowWelcome"
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
          >
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="12"
              floodColor="#000000"
              floodOpacity="0.08"
            />
          </filter>
          <clipPath id="circleAvatar">
            <circle cx="200" cy="140" r="36" />
          </clipPath>
          <linearGradient id="welcomeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8DB8FF" />
            <stop offset="100%" stop-color="#DCEAFF" />
          </linearGradient>
        </defs>

        {/* Pulse Ring in background */}
        <circle
          cx="200"
          cy="140"
          r="54"
          fill="url(#welcomeGrad)"
          className="welcome-pulse"
        />

        {/* Main Welcome Card */}
        <rect
          x="40"
          y="60"
          width="320"
          height="260"
          rx="24"
          fill="white"
          stroke="#E6E6E6"
          strokeWidth="2"
          filter="url(#shadowWelcome)"
        />

        {/* Avatar Container */}
        <circle
          cx="200"
          cy="140"
          r="38"
          fill="white"
          stroke="#E6E6E6"
          strokeWidth="1.5"
        />
        <image
          href={avatarUrl}
          x="164"
          y="104"
          width="72"
          height="72"
          clipPath="url(#circleAvatar)"
        />

        {/* Profile Details */}
        <text
          x="200"
          y="210"
          fill="#2A2A2F"
          fontSize="16"
          fontWeight="bold"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          {name}
        </text>

        <text
          x="200"
          y="232"
          fill="#888888"
          fontSize="11"
          fontWeight="600"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          {headline.length > 42 ? headline.slice(0, 42) + "..." : headline}
        </text>

        {/* Divider */}
        <line
          x1="70"
          y1="255"
          x2="330"
          y2="255"
          stroke="#F0F0F0"
          strokeWidth="1.5"
        />

        {/* Action Badge */}
        <rect x="90" y="270" width="220" height="32" rx="10" fill="#2A2A2F" />
        <text
          x="200"
          y="290"
          fill="white"
          fontSize="10"
          fontWeight="bold"
          fontFamily="sans-serif"
          textAnchor="middle"
          letterSpacing="0.8"
        >
          PORTFOLIO INITIALIZED ✨
        </text>
      </svg>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide animate-pulse">
        Ready to customize
      </div>
    </div>
  );
}

// ─── Projects Animation (Step 2) ────────────────────────────────────────────────
export function ProjectsAnimation({
  projects,
}: {
  projects?: { title: string; description: string }[];
}) {
  const defaultProjects = [
    {
      title: "Financial Dashboard App",
      description: "Modern Web UI using React & Tailwind",
    },
    {
      title: "SaaS Analytics Platform",
      description: "Node.js and PostgreSQL backend",
    },
    {
      title: "E-Commerce Mobile Client",
      description: "React Native application",
    },
  ];

  const displayProjects =
    projects && projects.length > 0 ? projects.slice(0, 3) : defaultProjects;

  // Backfill up to 3 placeholders if they have deleted projects
  while (displayProjects.length < 3) {
    displayProjects.push({
      title: "Add New Project",
      description: "Customize details in the editor form...",
    });
  }

  return (
    <div className="w-full max-w-[480px] aspect-square flex flex-col items-center justify-center relative">
      <style>{`
        @keyframes browserFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes blockFloat1 {
          0% { transform: translate(-30px, 30px) scale(0.95); opacity: 0; }
          70% { transform: translate(3px, -2px) scale(1.03); opacity: 0.9; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes blockFloat2 {
          0% { transform: translate(30px, 40px) scale(0.95); opacity: 0; }
          70% { transform: translate(-3px, -2px) scale(1.03); opacity: 0.9; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes blockFloat3 {
          0% { transform: translate(0px, 50px) scale(0.95); opacity: 0; }
          70% { transform: translate(0px, -4px) scale(1.03); opacity: 0.9; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes logoPulse {
          0% { transform: scale(1); opacity: 0.08; }
          50% { transform: scale(1.08); opacity: 0.15; }
          100% { transform: scale(1); opacity: 0.08; }
        }
        .anim-browser {
          animation: browserFloat 6s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .anim-card-1 {
          animation: blockFloat1 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards 0.2s;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .anim-card-2 {
          animation: blockFloat2 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards 0.5s;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .anim-card-3 {
          animation: blockFloat3 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards 0.8s;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .anim-bg-logo {
          animation: logoPulse 4s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>

      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[380px] anim-browser"
      >
        <defs>
          <filter
            id="shadowFilter"
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
          >
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="8"
              floodColor="#000000"
              floodOpacity="0.06"
            />
          </filter>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8DB8FF" />
            <stop offset="100%" stop-color="#4B89FF" />
          </linearGradient>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d4ff66" />
            <stop offset="100%" stop-color="#d4ff66" />
          </linearGradient>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#DCEAFF" />
            <stop offset="100%" stop-color="#9d8dfa" />
          </linearGradient>
          <pattern
            id="innerGrid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="#EAEAEA" />
          </pattern>
        </defs>

        {/* Browser Window */}
        <rect
          x="20"
          y="30"
          width="360"
          height="320"
          rx="20"
          fill="white"
          stroke="#E6E6E6"
          strokeWidth="2"
          filter="url(#shadowFilter)"
        />

        {/* Controls */}
        <g>
          <circle cx="45" cy="52" r="6" fill="#E45A5A" opacity="0.8" />
          <circle cx="61" cy="52" r="6" fill="#d4ff66" opacity="0.8" />
          <circle cx="77" cy="52" r="6" fill="#8DB8FF" opacity="0.8" />

          <rect x="110" y="40" width="180" height="24" rx="12" fill="#F3F3F3" />
          <image href="/logoicon.png" x="120" y="44" width="16" height="16" />
          <text
            x="142"
            y="56"
            fill="#888888"
            fontFamily="monospace"
            fontSize="9"
            fontWeight="bold"
          >
            webild.com/projects
          </text>
        </g>

        <line
          x1="20"
          y1="76"
          x2="380"
          y2="76"
          stroke="#E6E6E6"
          strokeWidth="1.5"
        />
        <rect
          x="21"
          y="77"
          width="358"
          height="272"
          fill="url(#innerGrid)"
          rx="19"
        />

        <image
          href="/logoicon.png"
          x="140"
          y="130"
          width="120"
          height="120"
          className="anim-bg-logo"
        />

        {/* Dynamic Project Cards */}
        {displayProjects.map((proj, idx) => {
          const yPos = 100 + idx * 80;
          const animClass = `anim-card-${idx + 1}`;
          const gradColor =
            idx === 0
              ? "url(#blueGrad)"
              : idx === 1
                ? "url(#greenGrad)"
                : "url(#purpleGrad)";
          const initialLetter = proj.title
            ? proj.title.charAt(0).toUpperCase()
            : "P";

          return (
            <g key={idx} className={animClass} filter="url(#shadowFilter)">
              <rect
                x="48"
                y={yPos}
                width="304"
                height="64"
                rx="14"
                fill="white"
                stroke="#E6E6E6"
                strokeWidth="1.5"
              />
              <rect
                x="60"
                y={yPos + 12}
                width="40"
                height="40"
                rx="10"
                fill={gradColor}
              />
              <text
                x="80"
                y={yPos + 37}
                fill="white"
                fontSize="16"
                fontWeight="bold"
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                {initialLetter}
              </text>

              <text
                x="114"
                y={yPos + 28}
                fill="#2A2A2F"
                fontSize="12"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                {proj.title.length > 24
                  ? proj.title.slice(0, 24) + "..."
                  : proj.title}
              </text>
              <text
                x="114"
                y={yPos + 44}
                fill="#A3A3A3"
                fontSize="10"
                fontFamily="sans-serif"
              >
                {proj.description.length > 34
                  ? proj.description.slice(0, 34) + "..."
                  : proj.description}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide">
        <Code className="w-4 h-4 text-blue-500" /> Building Projects Grid
      </div>
    </div>
  );
}

// ─── Interests Animation (Step 3) ───────────────────────────────────────────────
export function InterestsAnimation({ interests }: { interests?: string }) {
  const defaultInterests = [
    "Product Design",
    "AI Development",
    "Creative Writing",
    "Startup Growth",
  ];
  const parsed = interests
    ? interests
        .split(/[,;\n]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 2)
    : [];
  const displayInterests =
    parsed.length > 0 ? parsed.slice(0, 4) : defaultInterests;

  while (displayInterests.length < 4) {
    displayInterests.push(
      defaultInterests[displayInterests.length % defaultInterests.length],
    );
  }

  return (
    <div className="w-full max-w-[480px] aspect-square flex items-center justify-center relative">
      <style>{`
        @keyframes floatPill1 {
          0% { transform: translate(70px, 70px) rotate(0deg); }
          50% { transform: translate(70px, 62px) rotate(1deg); }
          100% { transform: translate(70px, 70px) rotate(0deg); }
        }
        @keyframes floatPill2 {
          0% { transform: translate(310px, 80px) rotate(0deg); }
          50% { transform: translate(310px, 74px) rotate(-1deg); }
          100% { transform: translate(310px, 80px) rotate(0deg); }
        }
        @keyframes floatPill3 {
          0% { transform: translate(80px, 320px) rotate(0deg); }
          50% { transform: translate(80px, 312px) rotate(-0.5deg); }
          100% { transform: translate(80px, 320px) rotate(0deg); }
        }
        @keyframes floatPill4 {
          0% { transform: translate(310px, 310px) rotate(0deg); }
          50% { transform: translate(310px, 302px) rotate(0.8deg); }
          100% { transform: translate(310px, 310px) rotate(0deg); }
        }
        @keyframes pulsePathway {
          0% { stroke-dashoffset: 0; opacity: 0.3; }
          50% { opacity: 0.9; }
          100% { stroke-dashoffset: -40; opacity: 0.3; }
        }
        @keyframes centerPulse {
          0% { transform: scale(1); box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
          50% { transform: scale(1.08); box-shadow: 0 12px 28px rgba(141,184,255,0.35); }
          100% { transform: scale(1); box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
        }
        .center-orb {
          animation: centerPulse 4s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .pill-1 { animation: floatPill1 5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .pill-2 { animation: floatPill2 6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .pill-3 { animation: floatPill3 5.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .pill-4 { animation: floatPill4 6.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .pathway {
          stroke-dasharray: 10 12;
          animation: pulsePathway 3s linear infinite;
        }
      `}</style>

      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[380px]"
      >
        <defs>
          <filter
            id="shadowFilter2"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor="#000000"
              floodOpacity="0.05"
            />
          </filter>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8DB8FF" />
            <stop offset="100%" stop-color="#4B89FF" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d4ff66" />
            <stop offset="100%" stop-color="#d4ff66" />
          </linearGradient>
        </defs>

        {/* Neural pathway curves */}
        <path
          d="M 200 200 Q 130 130, 70 88"
          stroke="url(#gradient1)"
          strokeWidth="3"
          className="pathway"
          strokeLinecap="round"
        />
        <path
          d="M 200 200 Q 260 130, 310 98"
          stroke="url(#gradient2)"
          strokeWidth="3"
          className="pathway"
          strokeLinecap="round"
        />
        <path
          d="M 200 200 Q 130 260, 80 302"
          stroke="url(#gradient1)"
          strokeWidth="3"
          className="pathway"
          strokeLinecap="round"
        />
        <path
          d="M 200 200 Q 270 260, 310 292"
          stroke="#d4ff66"
          strokeWidth="3"
          className="pathway"
          strokeLinecap="round"
        />

        <circle cx="70" cy="88" r="4" fill="#8DB8FF" />
        <circle cx="310" cy="98" r="4" fill="#d4ff66" />
        <circle cx="80" cy="302" r="4" fill="#8DB8FF" />
        <circle cx="310" cy="292" r="4" fill="#d4ff66" />

        {/* Center Orb */}
        <g className="center-orb">
          <circle
            cx="200"
            cy="200"
            r="40"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="2.5"
            filter="url(#shadowFilter2)"
          />
          <image href="/logoicon.png" x="176" y="176" width="48" height="48" />
          <circle
            cx="200"
            cy="200"
            r="48"
            stroke="#8DB8FF"
            strokeWidth="1.5"
            strokeDasharray="3 6"
            opacity="0.5"
          />
        </g>

        {/* Dynamic Interest Pills */}
        <g className="pill-1" filter="url(#shadowFilter2)">
          <rect
            x="-70"
            y="-18"
            width="140"
            height="36"
            rx="18"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <circle cx="-50" cy="0" r="6" fill="#E45A5A" opacity="0.8" />
          <text
            x="-36"
            y="4"
            fill="#2A2A2F"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            {displayInterests[0].length > 16
              ? displayInterests[0].slice(0, 16) + "..."
              : displayInterests[0]}
          </text>
        </g>

        <g className="pill-2" filter="url(#shadowFilter2)">
          <rect
            x="-70"
            y="-18"
            width="140"
            height="36"
            rx="18"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <circle cx="-50" cy="0" r="6" fill="#d4ff66" />
          <text
            x="-36"
            y="4"
            fill="#2A2A2F"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            {displayInterests[1].length > 16
              ? displayInterests[1].slice(0, 16) + "..."
              : displayInterests[1]}
          </text>
        </g>

        <g className="pill-3" filter="url(#shadowFilter2)">
          <rect
            x="-70"
            y="-18"
            width="140"
            height="36"
            rx="18"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <circle cx="-50" cy="0" r="6" fill="#8DB8FF" />
          <text
            x="-36"
            y="4"
            fill="#2A2A2F"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            {displayInterests[2].length > 16
              ? displayInterests[2].slice(0, 16) + "..."
              : displayInterests[2]}
          </text>
        </g>

        <g className="pill-4" filter="url(#shadowFilter2)">
          <rect
            x="-70"
            y="-18"
            width="140"
            height="36"
            rx="18"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <circle cx="-50" cy="0" r="6" fill="#d4ff66" />
          <text
            x="-36"
            y="4"
            fill="#2A2A2F"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            {displayInterests[3].length > 16
              ? displayInterests[3].slice(0, 16) + "..."
              : displayInterests[3]}
          </text>
        </g>
      </svg>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide">
        <Heart className="w-4 h-4 text-red-500" /> Mapping Interests
      </div>
    </div>
  );
}

// ─── Skills Animation (Step 4) ──────────────────────────────────────────────────
export function SkillsAnimation({ skills }: { skills?: { name: string }[] }) {
  const defaultSkills = ["React", "Tailwind", "TypeScript", "Next.js"];
  const parsed =
    skills && skills.length > 0 ? skills.map((s) => s.name) : defaultSkills;
  const displaySkills = [...parsed];

  while (displaySkills.length < 3) {
    displaySkills.push(
      defaultSkills[displaySkills.length % defaultSkills.length],
    );
  }

  return (
    <div className="w-full max-w-[480px] aspect-square flex flex-col items-center justify-center relative">
      <style>{`
        @keyframes bentoSnap {
          0% { transform: scale(0.92) translate(var(--x-off), var(--y-off)); opacity: 0; }
          75% { transform: scale(1.04) translate(0, 0); opacity: 0.95; }
          100% { transform: scale(1) translate(0, 0); opacity: 1; }
        }
        @keyframes bentoPulse {
          0% { border-color: rgba(230, 230, 230, 0.8); }
          50% { border-color: rgba(141, 184, 255, 0.5); }
          100% { border-color: rgba(230, 230, 230, 0.8); }
        }
        @keyframes scanGuide {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -40; }
        }
        .anim-bento-container {
          animation: bentoPulse 3s ease-in-out infinite;
        }
        .bento-card-1 {
          --x-off: -40px; --y-off: -40px;
          animation: bentoSnap 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards 0.1s;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .bento-card-2 {
          --x-off: 40px; --y-off: -30px;
          animation: bentoSnap 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards 0.3s;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .bento-card-3 {
          --x-off: -30px; --y-off: 40px;
          animation: bentoSnap 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards 0.5s;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .bento-card-4 {
          --x-off: 40px; --y-off: 40px;
          animation: bentoSnap 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards 0.7s;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .laser-line {
          stroke-dasharray: 4 4;
          animation: scanGuide 2s linear infinite;
        }
      `}</style>

      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[380px]"
      >
        <defs>
          <filter
            id="shadowFilter3"
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
          >
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor="#000000"
              floodOpacity="0.04"
            />
          </filter>
        </defs>

        <rect
          x="50"
          y="50"
          width="300"
          height="300"
          rx="28"
          fill="rgba(250, 250, 250, 0.4)"
          stroke="#E6E6E6"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          className="anim-bento-container"
        />

        <line
          x1="200"
          y1="30"
          x2="200"
          y2="370"
          stroke="#8DB8FF"
          strokeWidth="1.5"
          opacity="0.4"
          className="laser-line"
        />
        <line
          x1="30"
          y1="200"
          x2="370"
          y2="200"
          stroke="#8DB8FF"
          strokeWidth="1.5"
          opacity="0.4"
          className="laser-line"
        />

        {/* Bento Cell 1: Webild Anchor */}
        <g className="bento-card-1" filter="url(#shadowFilter3)">
          <rect
            x="65"
            y="65"
            width="130"
            height="130"
            rx="20"
            fill="#2A2A2F"
            stroke="#171717"
            strokeWidth="2"
          />
          <image href="/logoicon.png" x="100" y="90" width="60" height="60" />
          <text
            x="130"
            y="172"
            fill="#E6E6E6"
            fontSize="11"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            ANCHOR
          </text>
        </g>

        {/* Bento Cell 2: Skill Node 1 */}
        <g className="bento-card-2" filter="url(#shadowFilter3)">
          <rect
            x="205"
            y="65"
            width="130"
            height="130"
            rx="20"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <circle cx="270" cy="115" r="18" fill="#8DB8FF" opacity="0.1" />
          <circle cx="270" cy="115" r="5" fill="#8DB8FF" />
          <ellipse
            cx="270"
            cy="115"
            rx="16"
            ry="6"
            stroke="#8DB8FF"
            strokeWidth="1.5"
            transform="rotate(30, 270, 115)"
          />
          <ellipse
            cx="270"
            cy="115"
            rx="16"
            ry="6"
            stroke="#8DB8FF"
            strokeWidth="1.5"
            transform="rotate(150, 270, 115)"
          />

          <text
            x="270"
            y="165"
            fill="#2A2A2F"
            fontSize="11"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            {displaySkills[0].length > 14
              ? displaySkills[0].slice(0, 14) + "..."
              : displaySkills[0]}
          </text>
        </g>

        {/* Bento Cell 3: Skill Node 2 */}
        <g className="bento-card-3" filter="url(#shadowFilter3)">
          <rect
            x="65"
            y="205"
            width="130"
            height="130"
            rx="20"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <circle cx="130" cy="255" r="18" fill="#d4ff66" opacity="0.1" />
          <path
            d="M 120 255 Q 130 240, 140 255 Q 130 270, 120 255 Z"
            stroke="#d4ff66"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="130" cy="255" r="4" fill="#d4ff66" />

          <text
            x="130"
            y="305"
            fill="#2A2A2F"
            fontSize="11"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            {displaySkills[1].length > 14
              ? displaySkills[1].slice(0, 14) + "..."
              : displaySkills[1]}
          </text>
        </g>

        {/* Bento Cell 4: Skill Node 3 */}
        <g className="bento-card-4" filter="url(#shadowFilter3)">
          <rect
            x="205"
            y="205"
            width="130"
            height="130"
            rx="20"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <rect
            x="252"
            y="235"
            width="36"
            height="36"
            rx="6"
            fill="#8DB8FF"
            opacity="0.1"
          />
          <text
            x="270"
            y="260"
            fill="#2A2A2F"
            fontSize="16"
            fontWeight="950"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            TS
          </text>

          <text
            x="270"
            y="305"
            fill="#2A2A2F"
            fontSize="11"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            {displaySkills[2].length > 14
              ? displaySkills[2].slice(0, 14) + "..."
              : displaySkills[2]}
          </text>
        </g>
      </svg>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide">
        <Layers className="w-4 h-4 text-indigo-500" /> Stacking Skills Chips
      </div>
    </div>
  );
}

// ─── Experience Animation (Step 5) ──────────────────────────────────────────────
export function ExperienceAnimation({
  experience,
}: {
  experience?: { title: string; company: string; duration: string }[];
}) {
  const defaultExp = [
    { title: "Freelancer", company: "Product Dev", duration: "2022 - 2024" },
    {
      title: "Senior Engineer",
      company: "Webild Cloud",
      duration: "2024 - PRESENT",
    },
  ];

  const displayExp =
    experience && experience.length > 0 ? experience.slice(0, 2) : defaultExp;

  // Stagger left and right cards
  const leftCard = displayExp.length === 2 ? displayExp[0] : defaultExp[0];
  const rightCard =
    displayExp.length === 2
      ? displayExp[1]
      : displayExp.length === 1
        ? displayExp[0]
        : defaultExp[1];

  return (
    <div className="w-full max-w-[480px] aspect-square flex flex-col items-center justify-center relative">
      <style>{`
        @keyframes drawTimelineAxis {
          0% { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes scaleTimelineNode {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideCardL {
          0% { transform: translateX(-15px) scale(0.96); opacity: 0; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes slideCardR {
          0% { transform: translateX(15px) scale(0.96); opacity: 0; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes particleFlow {
          0% { transform: translate(200px, 80px); opacity: 0; }
          15% { opacity: 1; }
          50% { transform: translate(200px, 190px); }
          75% { transform: translate(110px, 205px); opacity: 1; }
          90% { opacity: 0; }
          100% { transform: translate(70px, 205px); opacity: 0; }
        }
        .axis-trunk {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: drawTimelineAxis 2.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        .anim-node-exp1 { animation: scaleTimelineNode 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 0.4s; opacity: 0; transform-origin: 200px 190px; }
        .anim-node-exp2 { animation: scaleTimelineNode 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 1.2s; opacity: 0; transform-origin: 200px 290px; }
        .exp-card-l { animation: slideCardL 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards 0.6s; opacity: 0; transform-origin: right center; }
        .exp-card-r { animation: slideCardR 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards 1.4s; opacity: 0; transform-origin: left center; }
        .particle-beam { animation: particleFlow 4s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}</style>

      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[380px]"
      >
        <defs>
          <filter
            id="shadowFilter4"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor="#000000"
              floodOpacity="0.04"
            />
          </filter>
        </defs>

        <line
          x1="200"
          y1="80"
          x2="200"
          y2="350"
          stroke="#E6E6E6"
          strokeWidth="4"
          strokeLinecap="round"
          className="axis-trunk"
        />
        <path
          d="M 200 80 L 200 350"
          stroke="#8DB8FF"
          strokeWidth="4"
          strokeLinecap="round"
          className="axis-trunk"
          opacity="0.6"
        />

        {/* Top Node */}
        <g>
          <circle
            cx="200"
            cy="55"
            r="24"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="2.5"
            filter="url(#shadowFilter4)"
          />
          <image href="/logoicon.png" x="184" y="39" width="32" height="32" />
        </g>

        {/* Node 1 */}
        <g className="anim-node-exp1">
          <path
            d="M 200 190 Q 150 190, 110 205"
            stroke="#8DB8FF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle
            cx="200"
            cy="190"
            r="8"
            fill="white"
            stroke="#8DB8FF"
            strokeWidth="3"
          />
        </g>

        {/* Left Card */}
        <g
          className="exp-card-l"
          transform="translate(20, 150)"
          filter="url(#shadowFilter4)"
        >
          <rect
            width="130"
            height="80"
            rx="14"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <text
            x="12"
            y="24"
            fill="#A3A3A3"
            fontSize="8"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {leftCard.company.length > 20
              ? leftCard.company.slice(0, 20) + "..."
              : leftCard.company}
          </text>
          <text
            x="12"
            y="44"
            fill="#2A2A2F"
            fontSize="11"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {leftCard.title.length > 18
              ? leftCard.title.slice(0, 18) + "..."
              : leftCard.title}
          </text>
          <text
            x="12"
            y="66"
            fill="#8DB8FF"
            fontSize="9"
            fontWeight="900"
            fontFamily="sans-serif"
            letterSpacing="0.5"
          >
            {leftCard.duration}
          </text>
        </g>

        {/* Node 2 */}
        <g className="anim-node-exp2">
          <path
            d="M 200 290 Q 250 290, 290 305"
            stroke="#d4ff66"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle
            cx="200"
            cy="290"
            r="8"
            fill="white"
            stroke="#d4ff66"
            strokeWidth="3"
          />
        </g>

        {/* Right Card */}
        <g
          className="exp-card-r"
          transform="translate(250, 250)"
          filter="url(#shadowFilter4)"
        >
          <rect
            width="130"
            height="80"
            rx="14"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <text
            x="12"
            y="24"
            fill="#A3A3A3"
            fontSize="8"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {rightCard.company.length > 20
              ? rightCard.company.slice(0, 20) + "..."
              : rightCard.company}
          </text>
          <text
            x="12"
            y="44"
            fill="#2A2A2F"
            fontSize="11"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {rightCard.title.length > 18
              ? rightCard.title.slice(0, 18) + "..."
              : rightCard.title}
          </text>
          <text
            x="12"
            y="66"
            fill="#d4ff66"
            fontSize="9"
            fontWeight="900"
            fontFamily="sans-serif"
            letterSpacing="0.5"
          >
            {rightCard.duration}
          </text>
        </g>

        <circle
          r="4"
          fill="#8DB8FF"
          className="particle-beam"
          filter="url(#shadowFilter4)"
        />
      </svg>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide">
        <Briefcase className="w-4 h-4 text-amber-500" /> Drawing Timeline
      </div>
    </div>
  );
}

// ─── Generating Mesh Animation (Step 6 / Others) ──────────────────────────────
export function GeneratingAnimation() {
  return (
    <div className="w-full max-w-[480px] aspect-square flex items-center justify-center relative">
      <style>{`
        @keyframes meshSpin1 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes meshSpin2 {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes meshBreathe {
          0% { transform: scale(0.96); opacity: 0.35; }
          50% { transform: scale(1.04); opacity: 0.7; }
          100% { transform: scale(0.96); opacity: 0.35; }
        }
        @keyframes AIlogoPulse {
          0% { transform: scale(1); filter: drop-shadow(0 4px 12px rgba(0,0,0,0.06)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 12px 28px rgba(141,184,255,0.45)); }
          100% { transform: scale(1); filter: drop-shadow(0 4px 12px rgba(0,0,0,0.06)); }
        }
        .spin-mesh-inner {
          animation: meshSpin1 16s linear infinite;
          transform-origin: 200px 200px;
        }
        .spin-mesh-outer {
          animation: meshSpin2 24s linear infinite;
          transform-origin: 200px 200px;
        }
        .breath-mesh {
          animation: meshBreathe 4s ease-in-out infinite;
          transform-origin: 200px 200px;
        }
        .pulse-logo-glow {
          animation: AIlogoPulse 3s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>

      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[380px]"
      >
        <defs>
          <filter
            id="shadowFilter5"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="10"
              floodColor="#000000"
              floodOpacity="0.06"
            />
          </filter>
          <radialGradient id="meshRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#8DB8FF" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#8DB8FF" stop-opacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="200" r="150" fill="url(#meshRadial)" />

        <g className="spin-mesh-outer">
          <circle
            cx="200"
            cy="200"
            r="130"
            stroke="#E6E6E6"
            strokeWidth="2"
            strokeDasharray="8 16"
          />
          <circle cx="200" cy="70" r="5" fill="#d4ff66" />
          <circle cx="200" cy="330" r="5" fill="#8DB8FF" />
          <circle cx="70" cy="200" r="5" fill="#d4ff66" />
          <circle cx="330" cy="200" r="5" fill="#d4ff66" />
        </g>

        <g className="spin-mesh-inner">
          <circle
            cx="200"
            cy="200"
            r="95"
            stroke="#8DB8FF"
            strokeWidth="1.5"
            strokeDasharray="16 8"
            opacity="0.7"
          />
          <line
            x1="200"
            y1="200"
            x2="267"
            y2="133"
            stroke="#8DB8FF"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <line
            x1="200"
            y1="200"
            x2="133"
            y2="267"
            stroke="#8DB8FF"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <circle cx="267" cy="133" r="4" fill="#8DB8FF" />
          <circle cx="133" cy="267" r="4" fill="#8DB8FF" />
        </g>

        <circle
          cx="200"
          cy="200"
          r="65"
          stroke="#d4ff66"
          strokeWidth="3.5"
          opacity="0.6"
          className="breath-mesh"
        />

        <g className="pulse-logo-glow">
          <circle
            cx="200"
            cy="200"
            r="38"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="2.5"
            filter="url(#shadowFilter5)"
          />
          <image href="/logoicon.png" x="178" y="178" width="44" height="44" />
        </g>
      </svg>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide">
        <Sparkles
          className="w-4 h-4 text-amber-500 animate-spin"
          style={{ animationDuration: "4s" }}
        />{" "}
        AI Refinement
      </div>
    </div>
  );
}

// ─── Main Animation Dispatcher ────────────────────────────────────────────────
export default function WizardAnimations({
  step,
  profile,
  projects,
  interests,
  skills,
  experience,
}: WizardAnimationsProps) {
  if (step === 1) return <WelcomeAnimation profile={profile} />;
  if (step === 5) return <ExperienceAnimation experience={experience} />;
  if (step === 6) return <ProjectsAnimation projects={projects} />;
  return <GeneratingAnimation />;
}

```

---

## File: `context/EditorContext.tsx`

```tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  ProfileData,
  TemplateId,
  MOCK_PROFILE,
  BLANK_PROFILE,
} from "@/shared/types";
import { toast } from "sonner";

// ─── State Shape ───────────────────────────────────────────────────────────────
interface EditorState {
  websiteId: string | null;
  profile: ProfileData | null;
  editedProfile: ProfileData | null;
  selectedTemplate: TemplateId;
  linkedinUrl: string;
  isLoading: boolean;
  scrapeError: string | null;
  isDirty: boolean;
  pendingZip: File | null;
}

interface EditorActions {
  setWebsiteId: (id: string | null) => void;
  loadWebsite: (id: string) => Promise<void>;
  saveWebsite: () => Promise<void>;
  setLinkedinUrl: (url: string) => void;
  startScrape: (url: string) => Promise<void>;
  startScrapeManual: (file: File) => Promise<boolean>;
  updateField: <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K],
  ) => void;
  selectTemplate: (id: TemplateId) => void;
  resetEdits: () => void;
  clearProfile: () => void;
  useMockProfile: () => void;
  setScrapeError: (err: string | null) => void;
  setPendingZip: (file: File | null) => void;
}

type EditorContextValue = EditorState & EditorActions;

// ─── Context ───────────────────────────────────────────────────────────────────
const EditorContext = createContext<EditorContextValue | null>(null);

const SESSION_KEY = "linkedpage_profile";
const TEMPLATE_KEY = "linkedpage_template";
const URL_KEY = "linkedpage_url";

export function EditorProvider({ children }: { children: ReactNode }) {
  const [websiteId, setWebsiteId] = useState<string | null>(null);
  const [linkedinUrl, setLinkedinUrlState] = useState("");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [editedProfile, setEditedProfile] = useState<ProfileData | null>(null);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>("daniel-cross");
  const [isLoading, setIsLoading] = useState(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);
  const [pendingZip, setPendingZip] = useState<File | null>(null);

  // Rehydrate from sessionStorage on mount (fallback/legacy support)
  useEffect(() => {
    try {
      const storedProfile = sessionStorage.getItem(SESSION_KEY);
      const storedTemplate = sessionStorage.getItem(
        TEMPLATE_KEY,
      ) as TemplateId | null;
      const storedUrl = sessionStorage.getItem(URL_KEY);
      if (storedProfile && !websiteId) {
        const p = JSON.parse(storedProfile) as ProfileData;
        setProfile(p);
        setEditedProfile(p);
      }
      if (storedTemplate) setSelectedTemplate(storedTemplate);
      if (storedUrl) setLinkedinUrlState(storedUrl);
    } catch {
      // ignore parse errors
    }
  }, [websiteId]);

  const setLinkedinUrl = useCallback((url: string) => {
    setLinkedinUrlState(url);
    sessionStorage.setItem(URL_KEY, url);
  }, []);

  const persistProfile = useCallback((p: ProfileData) => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(p));
  }, []);

  // Helper to create a website in the backend and assign it the profile data
  const createWebsiteWithProfile = useCallback(
    async (profileData: ProfileData): Promise<string> => {
      const createRes = await fetch("/api/websites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: selectedTemplate }),
      });

      if (createRes.status === 401) {
        // User is not logged in. Redirect to signup to save their progress
        window.location.href = "/signup?intent=save_scrape";
        // We return a dummy promise that never resolves so the rest of the code doesn't crash before redirect
        await new Promise(() => {});
      }

      const createData = await createRes.json();
      if (!createRes.ok || !createData.website) {
        throw new Error(createData.error || "Failed to create website draft");
      }
      const newId = createData.website.id;

      // 2. Save profile data to the website
      const updateRes = await fetch(`/api/websites/${newId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: profileData.name,
          profile: profileData,
        }),
      });
      const updateData = await updateRes.json();
      if (!updateRes.ok) {
        throw new Error(
          updateData.error || "Failed to save profile data to website draft",
        );
      }

      setWebsiteId(newId);
      sessionStorage.setItem("linkedpage_last_website_id", newId);
      sessionStorage.setItem("linkedpage_brand_name", profileData.name);
      sessionStorage.setItem(
        "linkedpage_subdomain",
        `https://fusion-starter-529.vercel.app/p/${createData.website.subdomainSlug}`,
      );
      return newId;
    },
    [selectedTemplate],
  );

  // Load website from API
  const loadWebsite = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/websites/${id}`);
      const data = await res.json();
      if (!res.ok || !data.website) {
        throw new Error(data.error || "Failed to load website details");
      }
      const web = data.website;
      setWebsiteId(web.id);
      sessionStorage.setItem("linkedpage_last_website_id", web.id);
      setProfile(web.profile);
      setEditedProfile(web.profile);
      setSelectedTemplate(web.templateId || "minimal-card");
      if (web.profile.linkedinUrl) {
        setLinkedinUrlState(web.profile.linkedinUrl);
      }

      sessionStorage.setItem("linkedpage_brand_name", web.brandName);
      sessionStorage.setItem(
        "linkedpage_subdomain",
        `https://fusion-starter-529.vercel.app/p/${web.subdomainSlug}`,
      );
    } catch (e: any) {
      toast.error(e.message || "Failed to load website.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save changes manually to the backend API
  const saveWebsite = useCallback(async () => {
    if (!websiteId || !editedProfile) return;
    try {
      const response = await fetch(`/api/websites/${websiteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: editedProfile,
          templateId: selectedTemplate,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save website changes");
      }
      setProfile(editedProfile);
    } catch (e: any) {
      console.error("Manual save failed:", e);
    }
  }, [websiteId, editedProfile, selectedTemplate]);

  // Auto-save changes (debounced)
  useEffect(() => {
    if (!websiteId || !editedProfile || !isDirty) return;

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/websites/${websiteId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profile: editedProfile,
            templateId: selectedTemplate,
          }),
        });
        if (response.ok) {
          setProfile(editedProfile);
        }
      } catch (err) {
        console.error("Auto-save failed:", err);
      }
    }, 1000); // 1-second debounce

    return () => clearTimeout(timer);
  }, [websiteId, editedProfile, selectedTemplate]);

  // Scraping logic using the backend URL scraper
  const startScrape = useCallback(
    async (url: string) => {
      setIsLoading(true);
      setScrapeError(null);
      setLinkedinUrlState(url);
      sessionStorage.setItem(URL_KEY, url);

      try {
        const response = await fetch("/api/scrape", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch LinkedIn profile.");
        }

        const profileData = data.data;
        setProfile(profileData);
        setEditedProfile(profileData);
        persistProfile(profileData);

        // Create site draft in backend
        await createWebsiteWithProfile(profileData);
      } catch (e: any) {
        setScrapeError(
          e.message ||
            "Failed to fetch LinkedIn profile. Please check the URL and try again.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [persistProfile, createWebsiteWithProfile],
  );

  // Manual scraping logic via uploaded ZIP file
  const startScrapeManual = useCallback(
    async (file: File): Promise<boolean> => {
      setIsLoading(true);
      setScrapeError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/scrape/manual", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to parse ZIP archive.");
        }

        const profileData = data.data;
        setProfile(profileData);
        setEditedProfile(profileData);
        persistProfile(profileData);

        // Create site draft in backend
        await createWebsiteWithProfile(profileData);
        return true;
      } catch (e: any) {
        setScrapeError(
          e.message ||
            "Failed to process ZIP archive. Make sure it contains Profile.csv.",
        );
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [persistProfile, createWebsiteWithProfile],
  );

  const updateField = useCallback(
    <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
      setEditedProfile((prev) => {
        if (!prev) return prev;
        const next = { ...prev, [key]: value };
        persistProfile(next);
        return next;
      });
    },
    [persistProfile],
  );

  const selectTemplate = useCallback((id: TemplateId) => {
    setSelectedTemplate(id);
    sessionStorage.setItem(TEMPLATE_KEY, id);
  }, []);

  const resetEdits = useCallback(() => {
    if (profile) {
      setEditedProfile(profile);
      persistProfile(profile);
    }
  }, [profile, persistProfile]);

  const clearProfile = useCallback(() => {
    setWebsiteId(null);
    setProfile(null);
    setEditedProfile(null);
    setScrapeError(null);
    setLinkedinUrlState("");
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(URL_KEY);
  }, []);

  const useMockProfile = useCallback(async () => {
    setScrapeError(null);
    setProfile(BLANK_PROFILE);
    setEditedProfile(BLANK_PROFILE);
    persistProfile(BLANK_PROFILE);

    // Create website draft in backend
    try {
      await createWebsiteWithProfile(BLANK_PROFILE);
    } catch (e) {
      console.error("Failed to initialize mock website in DB:", e);
    }
  }, [persistProfile, createWebsiteWithProfile]);

  const isDirty =
    !!profile &&
    !!editedProfile &&
    JSON.stringify(profile) !== JSON.stringify(editedProfile);

  return (
    <EditorContext.Provider
      value={{
        websiteId,
        profile,
        editedProfile,
        selectedTemplate,
        linkedinUrl,
        isLoading,
        scrapeError,
        isDirty,
        pendingZip,
        setWebsiteId,
        loadWebsite,
        saveWebsite,
        setLinkedinUrl,
        startScrape,
        startScrapeManual,
        updateField,
        selectTemplate,
        resetEdits,
        clearProfile,
        useMockProfile,
        setScrapeError,
        setPendingZip,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor(): EditorContextValue {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used inside <EditorProvider>");
  return ctx;
}

```

---

## File: `design.md`

```markdown
---
version: alpha
name: Webild Cloud Editorial
description: A soft, airy landing-page system with bold type, frosted panels, and restrained dark accents.
colors:
  primary: "#2A2A2F"
  primary-contrast: "#FFFFFF"
  secondary: "#F3F3F3"
  tertiary: "#FBFBFB"
  neutral: "#FFFFFF"
  surface: "#FFFFFF"
  surface-muted: "#F7F7F7"
  on-surface: "#000000"
  on-surface-muted: "#171717"
  border: "#E6E6E6"
  accent: "#8DB8FF"
  accent-soft: "#DCEAFF"
  accent-green: "#8DFFB3"
  accent-green-dark: "#369762"
  success: "#BFE7A9"
  error: "#E45A5A"
typography:
  headline-display:
    fontFamily: "Inter Tight"
    fontSize: "51px"
    fontWeight: 500
    lineHeight: "51.2px"
    letterSpacing: "0px"
  headline-lg:
    fontFamily: "Inter Tight"
    fontSize: "38px"
    fontWeight: 400
    lineHeight: "46px"
    letterSpacing: "0px"
  headline-md:
    fontFamily: "Inter Tight"
    fontSize: "29px"
    fontWeight: 400
    lineHeight: "35px"
    letterSpacing: "0px"
  headline-sm:
    fontFamily: "Inter Tight"
    fontSize: "21px"
    fontWeight: 400
    lineHeight: "25px"
    letterSpacing: "0px"
  body-lg:
    fontFamily: "Inter Tight"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "27px"
    letterSpacing: "0px"
  body-md:
    fontFamily: "Inter Tight"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
    letterSpacing: "0px"
  body-sm:
    fontFamily: "Inter Tight"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
    letterSpacing: "0px"
  label-lg:
    fontFamily: "Inter Tight"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: "18px"
    letterSpacing: "0px"
  label-md:
    fontFamily: "Inter Tight"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "16px"
    letterSpacing: "0px"
  label-sm:
    fontFamily: "Inter Tight"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: "14px"
    letterSpacing: "0px"
  caption:
    fontFamily: "Inter Tight"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: "14px"
    letterSpacing: "0px"
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 13px
  xl: 18px
  full: 9999px
spacing:
  xs: 2px
  sm: 12px
  md: 18px
  lg: 40px
  xl: 90px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-contrast}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    padding: "14px 13px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    padding: "14px 13px"
    height: "40px"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-surface-muted}"
    rounded: "{rounded.lg}"
    padding: "11px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    rounded: "{rounded.lg}"
    padding: "14px 16px"
    height: "48px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "6px 10px"
  icon-button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    size: "36px"
---

# Webild Cloud Editorial

## Overview
Webild feels airy, optimistic, and lightly futuristic, with a polished landing-page aesthetic built to inspire quick creation and conversion. The experience balances playful cloudscape imagery with a serious, product-led structure, making it suitable for founders, marketers, and small teams wanting a fast way to launch pages. The overall tone is spacious and inviting rather than dense or technical.

## Branding & Logos
- **logo.png (Full Logo):** Displays the brand icon and the brand name text. Used in standard headers, navbars, and footers where space allows for the complete brand signature.
- **logoicon.png (Icon Logo):** Displays only the minimalist brand icon. Used in space-constrained slots such as sidebar project selectors, small avatar slots in recent lists, AI response bubble identifiers, and centered header accents.

## Colors
- **Primary (#2A2A2F):** A deep charcoal used for the strongest call-to-action buttons, prominent UI contrast, and dark text accents. It gives the interface a grounded, premium anchor against the bright background.
- **Secondary (#F3F3F3):** A soft off-white used for neutral buttons and subtle control surfaces. It keeps secondary actions visible without competing with the primary CTA.
- **Tertiary (#FBFBFB):** The lightest elevated surface tone, ideal for cards and panels that sit above the background with minimal visual weight.
- **Neutral / Surface (#FFFFFF):** Pure white is used for the base canvas, input areas, and high-clarity containers.
- **On-surface (#000000):** Crisp black text for headlines, navigation, and essential labels, matching the high-contrast editorial feel.
- **On-surface-muted (#171717):** A near-black supporting text tone for card content and body copy where full black would feel too stark.
- **Border (#E6E6E6):** A faint divider color for structural separation and soft edges, especially on floating panels and controls.
- **Accent (#8DB8FF):** A gentle sky-blue highlight used for active states, visual emphasis, and lightweight interactive cues.
- **Accent-soft (#DCEAFF):** A pale blue companion for low-emphasis highlights and blended interface accents.
- **Accent-green (#d4ff66):** A bright lime green highlight used for visual accents, progress indicators, and active highlights.
- **Accent-green-dark (#d4ff66):** A bright lime green accent, used for consistency across the application.
- **Success (#d4ff66):** A bright lime green used sparingly for positive signals and subtle environmental warmth.
- **Error (#E45A5A):** A restrained red reserved for destructive states, validation, and alert messaging.

## Typography
The system uses Inter Tight throughout, which gives the brand a compact, modern, and slightly editorial voice. Headlines rely on lighter weights for h2–h4 and a medium weight for the main display line, creating a sleek contrast with the bold visual imagery. Body text stays at 16px/24px for comfortable reading, while labels and button text move slightly smaller and medium-weight for crisp utility. Letter spacing is neutral, with no visible uppercase tracking treatment, so the hierarchy comes from size, weight, and contrast rather than decorative text styling.

## Layout & Spacing
The layout uses centered compositions throughout, maintaining a wide, fixed structure with generous negative space and a soft full-bleed background.
- **Landing Page Hero Layout (Website Image Showcase):** To align with premium SaaS product design, the hero section spans exactly `100vh` with overflow hidden. The layout is centered and consists of a bold display headline, description, and pill-shaped CTAs (with the previous badge removed). At the bottom of the section, the website preview image (`heroimage.png`) is rendered at `80%` width and translated vertically downward by `20%` to hide the lower portion of the screen mockup, with a viewport-bottom absolute white gradient overlay fading upward to blend the visual elements into the white page background.
- **Onboarding Page Layout:** The onboarding page specifically uses a lightweight CSS-based animated mesh gradient instead of image assets to ensure instant page loads. Major content sits inside layered floating panels, while the top navigation uses a rounded, inset container that spans most of the viewport width with even internal spacing. To minimize user friction, the main screen and scraper fallback screens render a prominent "Start from Scratch (Empty Canvas)" bypass button (`h-11`, `rounded-2xl`, border color matching `#E6E6E6`, active press animation `active:scale-[0.98] transition-transform duration-100 ease-out`). This skips ZIP archive uploads and transitions directly to the wizard, initializing template fields with visual layout placeholder variables.

The spacing rhythm is simple and airy, using a compact base of 2px for micro-adjustments and then jumping to 12px, 18px, 40px, and 90px for component padding, section separation, and dramatic hero breathing room. Cards and controls prefer consistent internal padding over dense alignment, reinforcing the polished, easygoing feel.

## Elevation & Depth
Depth is achieved more through translucency, soft borders, and gentle shadows than through dramatic stacking. Panels use pale surfaces with subtle gray edges and light shadowing to appear lifted from the cloud background without feeling heavy. The interface leans flat overall, but the contrast between white controls, frosted containers, and dark CTA buttons creates enough hierarchy for navigation and action. Inner shadow treatment on primary buttons adds a tactile, slightly embossed quality.

## Shapes
The shape language is soft and rounded, with a notable 13px corner radius on major buttons and cards. Full pills appear on chips, icon buttons, and compact controls, while larger panels keep a moderate rounded rectangle profile. Overall, the system feels approachable and polished rather than angular or architectural.

## Components
Buttons are the most expressive component family. `button-primary` uses the charcoal `#2A2A2F` background with white text, medium label typography, 14px vertical padding, and a 40px minimum height for a confident CTA. `button-secondary` uses `#F3F3F3` with black text and the same sizing, making it ideal for less dominant actions like “Decline” or “Log in.” `button-tertiary` is text-only and should remain visually quiet for low-emphasis navigation or inline actions.

Cards use `card` styling: pale `#FBFBFB` surfaces, 13px radii, modest 11px padding, and a soft shadow. They should feel like display containers rather than hard modules, especially when paired with imagery or template previews. Inputs should stay bright, minimally bordered, and comfortably padded, with clear text contrast and no heavy outline treatment. Chips and icon buttons should remain pill-shaped, compact, and lightly elevated, with icon buttons sized around 36px to preserve the airy control cluster seen in the header and prompt composer. Navigation links should be simple, medium-gray text with minimal chrome, and should not compete with action

### Editor Dashboard Layout & Conversational AI Builder
The editor `/editor` displays the full dashboard layout shell integrated with the conversational AI builder and sub-panels:
- **Left Sidebar (Collapsible Drawer):**
  - Hovering expands the panel from `60px` to `250px`.
  - Hosts navigation items: Home (dashboard redirect), Design (active workspace), Domains (custom domain panel), and Site Settings (site details).
  - Houses the pricing promo card and shortcut links for help, settings, and adding new websites.
- **Conversational Builder Workspace:**
  - **Centered Chat Layout:** Center-aligned ChatGPT-style conversational pane with a bottom input composer and auto-scroll behavior. The live browser preview is hidden by default. The input composer does not display any suggested replies or pills, keeping the input flow natural and text-driven.
  - **Assistant Bubble Content Cleaning:** Defensive client-side filters strip out any legacy suggested replies format blocks (e.g. `*(Suggested replies: ...)*`, `*Suggested replies:...*`, `Suggested replies: ...`) and custom milestone markers before rendering bubbles to ensure clean conversational text.
  - **Start Agent Header:** Renders a clean logo image (`/logo.png`) and title heading ("About Linked") at the top of the scroll container, with no background, border, shadow, profile CTAs, or handle details, offset with margin spacing (`mb-8`) to position the initial greeting bubble downwards.
  - **Live Preview Toggle:** Header button to toggle between full-width chat and side-by-side split screen workspace with the resizable iframe simulator.
  - **Visual Milestone Forms:** Renders interactive inline triggers below bubbles when the AI parses milestones:
    - **Projects Milestone (`[MILESTONE:PROJECTS]`):** Show inline buttons to open the Projects Modal and manage portfolio grid items.
    - **Services Milestone (`[MILESTONE:SERVICES]`):** Render services package lists (capped at 5) and edit actions.
- **Two-Column Modals for Content Creation:**
  - **Projects Modal:** Left column captures title, redirect link, and cover image URL; right column hosts description textarea. Includes full CRUD.
  - **Services Modal:** Left column captures service title and price; right column hosts description textarea. Enforces 5-card maximum limits.
  - **Process Steps Modal:** Left column captures step tag (e.g. /01) and step name; right column hosts description textarea.
  - **Client Testimonials Modal:** Left column captures client name, role/position, and avatar URL; right column hosts the client review quote textarea.
- **Data Persistence:** Syncs modifications to the database in real-time, stores the last active website ID in `sessionStorage` (key: `linkedpage_last_website_id`), caches the current view step in `sessionStorage` (key: `webild_onboarding_step`), and restores chat history immediately on mount from `/api/chat`.
- **LinkedIn ZIP Import Integration**:
  - **Import Processing**: Uploading a LinkedIn ZIP archive parses profile data in the backend (retrieving name, headline, location, summary, work positions, skills, and education) and flags the profile as `importedFromZip: true`.
  - **Wizard Bypass**: On page load, if `importedFromZip` is true, the editor bypasses the static 11-step form wizard, immediately initializing the editor view on Step 12 (free-form AI chat editor).
  - **Dynamic AI Milestone Checking**: In Phase 1 onboarding, the AI parses the current populated Profile Data state and skips questions for milestones that are already satisfied (e.g. name, work experience, education) from the ZIP. It greets the user, confirms what was successfully imported, and asks only for remaining/missing information (such as custom projects or service pricing packages).
  - **Domains Tab:** Displays the `DomainsPane` to connect custom domains and verify DNS settings.
  - **Site Settings Tab:** Displays the `SettingsPane` with fields to configure brand details, SEO tags, and delete websites.
- **Top Navbar:**
  - Renders saving indicators ("Unsaved edits" / "All changes saved") with a Reset trigger.
  - Hosts Share (link copier) and Publish actions alongside the User profile menu dropdown.
- **Main Canvas Workspace:**
  - **Canvas Header:** Customize/page dropdowns, subdomain availability ticker, and device size preset switches (Desktop vs. Tablet vs. Mobile vs. Drag-to-Resize).
  - **Preview Area:** Renders the live, scalable `ProfilePreview` browser simulator bezel right from Step 1 of the onboarding wizard. To provide a clear feedback loop, the canvas automatically scrolls the relevant section corresponding to the active step into focus inside the preview frame and highlights it with a dashed Electric Blue border. The preview panel is automatically opened/expanded whenever the AI assistant returns profile updates or template changes, offering instant visual feedback on conversational requests. The frame has macOS-style traffic light window controls, a centered address bar URL readout with interactive pixel dimensions sync, and left/right drag handles to resize the canvas dynamically.
  - **Dragging & Interactive Transition Physics:** Changing device presets triggers a smooth spring-damping settle animation (`stiffness: 380`, `damping: 30`). Initiating a drag via the left/right handles instantly overrides the active preset and switches the workspace mode to "Resizable", tracking the cursor coordinate distance from the workspace center at zero animation latency. An invisible overlay covers the preview iframe during dragging to maintain continuous mouse gesture capture.
  - **Dynamic Real-Time Data Binding:** The preview iframe dynamically binds actual state variables from the editor (such as name, headline, biography, logos, projects, services, processes, and testimonials) to update and display the user's actual entered data in real-time.
  - **Customizable Avatar & Portrait Images:** Substitutes the template placeholders with the user's `avatarUrl` (sidebar and layout avatar) and `bannerUrl` / `avatarUrl` (large hero portrait) in both the published page compiler and client-side editor preview. To enable intuitive image selection and keep all images distinct, all hero grid images and heading fan icons map separately to:
    - **Image 01** (left grid photo / first icon): Maps to `aboutPhotoUrl` (About Portrait image)
    - **Image 02** (center grid photo / middle icon): Maps to `avatarUrl` (Profile Avatar image)
    - **Image 03** (right grid photo / last icon): Maps to `bannerUrl` (Hero Banner photo)
    - Each container div (classes `framer-1u0qqnx`, `framer-1i9qvch`, `framer-nswwcw` and `framer-1m8xtt5`, `framer-19db7zm`, `framer-yfhmy0`) is tagged with its corresponding `data-editable-field` target, so clicking them selects and edits them independently.

### Template Style System (4 Premium Framer-Inspired Layouts)
The templates utilize generic system font stacks (sans-serif, serif, mono) for simplicity and fast loads:
- **Daniel Cross**: stark, high-contrast, editorial style. Uses bold display headlines (`font-sans font-black uppercase`), thick black dividers, border-2 outlines, and a clean white background.
  - **Sidebar Removal & Centering**: The profile/navigation sidebar has been completely removed from the layout. The main content column is styled to span full width and center itself on all device sizes (desktop, tablet, mobile), creating a clean, modern, column-based editorial flow.
  - **Conditional Section Removal**: To maintain visual consistency, sections for projects, services, testimonials, and the footer contact details block are automatically stripped from the HTML DOM tree if the profile has no associated data for those elements.
  - **Mobile & Tablet Responsiveness Overrides**: To enable complete responsive support on smaller viewports (max-width: 1199.98px) without altering the desktop layout, the system injects a custom style override block:
    - **Fluid Viewport Containers**: Converts absolute width layouts (e.g. `.framer-nqzx6h`'s default `1200px` / `810px` / `390px`, `.framer-ha6joy`'s `950px` / `390px`) to `100%` width with fluid spacing boundaries (`max-width: 100vw !important`).
    - **Breakpoint Hiding Helpers**: Defines `.hidden-18pvjnd` (hides elements when screen width <= 809.98px) and `.hidden-1bkts62` (hides elements when screen width is between 810px and 1199.98px) as media-query specific `display: none !important` rules to override Framer's absolute breakpoint containers.
    - **Adaptive Projects Layout**: Project cards render inline inside the original `.framer-3ruzuo` grid, ensuring 100% fluid scaling and fitting grid columns. The parent template grid automatically responsive-collapses from 2-columns on desktop to 1-column on mobile viewports.
    - **Original Cinematic Overlay Card Design**: Restored the original layout where cover images occupy full card dimensions, with titles and category/year details overlaid on top of a dark gradient backdrop at the bottom. Card container dimensions are governed natively by the template classes (width 440px, height 350px).
    - **Original Testimonials Slideshow Layout**: Retained the original horizontal slider component structure for the testimonials list, discarding grid and flex style overrides.
- **Julian Mercer:** elegant, warm paper style. Uses a warm background `#FAF8F5`, italic serif typography (`font-serif font-light italic`), monospace metadata tags, and soft dividers.
- **Link Hunt:** links-in-bio style. Features a centered layout (`max-w-md mx-auto text-center`), large avatar, pill buttons for social accounts with icons, and card containers.
- **Biobricks:** grid bento style. Organizes details into modular bricks/cards (`bg-white border border-[#E6E6E6] rounded-2xl p-5`) structured with a clean grid system.

## Motion & Animation Guidelines

To deliver premium interfaces that feel tactile and responsive, all page motions must follow strict design engineering constraints.

### 1. Easing & Timing System
- **UI Interactions (Dropdowns, popovers, mobile drawers):**
  Use strong ease-out curves: `cubic-bezier(0.23, 1, 0.32, 1)`. Keep durations between `150ms` and `250ms`.
- **Morphing or On-screen movement:**
  Use strong ease-in-out curves: `cubic-bezier(0.77, 0, 0.175, 1)`. Keep durations between `250ms` and `400ms`.
- **Active / Press Interactions:**
  Use crisp ease-out: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`. Keep duration between `100ms` and `160ms`.
- **Spring Physics (Interpreted Tabs):**
  Use `stiffness: 380` and `damping: 30` to simulate quick settling and high physical momentum without bouncy overshoot.

### 2. Performance & Composition Guidelines
- **Native Scrolling:** Scrolling relies on standard native browser actions with no scroll-jacking or interception.
- **Hardware Acceleration:** Ensure interactive transitions are composited on the GPU rather than triggering browser repaints, using composite-friendly properties like transforms and opacity.

### 3. Tactile Micro-Interactions
- **Active Press Scale:**
  - Major buttons (CTAs, primary triggers): scale down to `scale(0.97)` on active press.
  - Minor buttons (icons, smaller control pills): scale down to `scale(0.95)`.
  - Apply transition directly to the `transform` property. Never use `transition: all`.
- **Entrance Animation Origin:**
  - Never animate element entrances from `scale(0)`. Start from `scale(0.95)` combined with `opacity: 0` to simulate spatial materialization.
- **Stagger Delays:**
  - When rendering lists or grids (templates, process cards), stagger entry delays between `30ms` and `80ms` per item. Never block page interactivity during staggering.
- **Touch-Device Guard:**
  - Restrict all hover states to fine-pointer devices to avoid "sticky hovers" on iOS/Android. Use `@media (hover: hover) and (pointer: fine)` or Tailwind's `future.hoverOnlyWhenSupported` configuration.

## Do's and Don'ts
- Do keep primary actions dark, rounded, and compact, with clear white text.
- Do use generous whitespace and large centered hero compositions.
- Do preserve the soft, high-key palette and avoid harsh outlines.
- Do keep body copy and labels clean, plain, and highly legible with Inter Tight.
- Do specify exact target properties for CSS transitions (avoid `transition: all`).
- Do use hardware-accelerated transforms for interactive transitions.
- Don't introduce sharp corners or aggressive geometric styling.
- Don't overuse shadows; depth should feel subtle and atmospheric.
- Don't make secondary controls louder than the main CTA.
- Don't compress layouts into dense grids; the system should breathe.
- Don't animate element entries starting from a scale of 0.
- Don't trigger animations on keyboard-activated shortcuts.
```

---

## File: `drizzle.config.ts`

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://postgres:imblue-12345@localhost:4000/linked",
  },
});

```

---

## File: `env.d.ts`

```typescript
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENROUTER_API_KEY: string;
      OPENROUTER_BASE_URL: string;
      OPENROUTER_MODEL: string;
    }
  }
}

export {};

```

---

## File: `hooks/use-mobile.tsx`

```tsx
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

```

---

## File: `lib/auth.ts`

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { headers } from "next/headers";
import { User, db } from "./db";
import * as schema from "./schema";

const productionUrl = process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "linkedpage_local_secret_key_123456_better",
  baseURL: productionUrl,
  trustedOrigins: [
    "https://fusion-starter-529.vercel.app",
    "http://localhost:3000",
    // Also trust any preview deployment URLs
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
      : []),
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});

export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) return null;

    const nameParts = session.user.name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    return {
      id: session.user.id,
      firstName,
      lastName,
      email: session.user.email,
      passwordHash: "",
      createdAt: session.user.createdAt
        ? new Date(session.user.createdAt).toISOString()
        : new Date().toISOString(),
    };
  } catch (e) {
    console.error("Error in getAuthenticatedUser:", e);
    return null;
  }
}

```

---

## File: `lib/auth-client.ts`

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined"
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
});

```

---

## File: `lib/compiler.ts`

```typescript
import { ProfileData, TemplateId } from "@/shared/types";
import * as fs from "fs";
import * as path from "path";

// ── Helpers ─────────────────────────────────────────────────────────────────

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Replace ALL occurrences of `search` with `replacement` in `text`.
 */
function replaceAll(text: string, search: string, replacement: string): string {
  return text.split(search).join(replacement);
}

/**
 * Remove an entire HTML tag block (e.g. section or footer) containing a specific marker/indicator.
 */
function removeHtmlSection(html: string, startIndicator: string, tagName: string = "section"): string {
  const startIdx = html.indexOf(startIndicator);
  if (startIdx === -1) return html;

  // Trace back to find the actual start tag of this element (e.g., <section or <footer)
  const tagOpenIdx = html.lastIndexOf(`<${tagName}`, startIdx);
  if (tagOpenIdx === -1) return html;

  let pos = tagOpenIdx + tagName.length + 1;
  let depth = 1;
  while (depth > 0 && pos < html.length) {
    const nextOpen = html.indexOf(`<${tagName}`, pos);
    const nextClose = html.indexOf(`</${tagName}>`, pos);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + tagName.length + 1;
    } else {
      depth--;
      pos = nextClose + tagName.length + 3;
    }
  }

  if (depth === 0) {
    return html.substring(0, tagOpenIdx) + html.substring(pos);
  }

  return html;
}

/**
 * Generate the HTML for a single project card in the Daniel Cross style.
 * This mimics the Framer "Work card" structure.
 */
function buildProjectCard(
  title: string,
  description: string,
  link: string,
  imageUrl: string,
  category: string,
  year: string
): string {
  const resolvedImg = imageUrl || "/templates/daniel-cross/NZiJk1LCTBcGzs2MNANRaoxI2IA.png";
  return `
<div class="ssr-variant">
  <div class="framer-1kys2js-container" data-framer-name="Work card" name="Work card" style="will-change: transform; opacity: 1; transform: none;">
    <!--$--><a name="Work card" class="framer-cOcSQ framer-x2WlA framer-5K3Le framer-ryc3c framer-v-ryc3c framer-j0rmx6" data-framer-name="Work card" href="${esc(link)}" style="background-color: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); width: 100%; border-radius: 12px; opacity: 1;">
      <div class="framer-z31oie" data-framer-name="Cover image" style="transform: none; opacity: 1;">
        <div style="position:absolute;border-radius:inherit;corner-shape:inherit;top:0;right:0;bottom:0;left:0" data-framer-background-image-wrapper="true">
          <img decoding="auto" src="${esc(resolvedImg)}" alt="" style="display:block;width:100%;height:100%;border-radius:inherit;corner-shape:inherit;object-position:center;object-fit:cover">
        </div>
      </div>
      <div class="framer-fh6ndj" data-framer-name="Linear" style="background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)) 100%); opacity: 1;"></div>
      <div class="framer-1s2w6if" data-framer-name="Text wrapper" style="opacity: 1;">
        <div class="framer-1k4j78w" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
          <h4 class="framer-text framer-styles-preset-qumrh3" data-styles-preset="FLDbgL1a7">${esc(title)}</h4>
        </div>
        <div class="framer-1orth6j" data-framer-name="details" style="opacity:0.8">
          <div class="framer-1wxz9c2" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)))">${esc(category)}</p>
          </div>
          <div class="framer-1prjt4a" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)))">/</p>
          </div>
          <div class="framer-5hs0bj" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)))">${esc(year)}</p>
          </div>
        </div>
      </div>
    </a><!--/$-->
  </div>
</div>`;
}

/**
 * Generate the "work wrapper" HTML from the user's projects.
 * Replaces the entire framer-3ruzuo section content.
 */
function buildProjectsSection(profile: ProfileData): string {
  const projects = profile.projects || [];
  if (projects.length === 0) return "";

  const cards = projects
    .map((p) =>
      buildProjectCard(
        p.title,
        p.description,
        p.link || "#",
        p.image || "",
        "Design",
        new Date().getFullYear().toString()
      )
    )
    .join("\n");

  return `<!--$--><!--$-->${cards}<!--/$--><!--/$-->`;
}

function replaceWorkWrapperContent(html: string, projectsHtml: string): string {
  const workWrapperStart = 'data-framer-name="work wrapper">';
  const wIdx = html.indexOf(workWrapperStart);
  if (wIdx === -1) return html;

  const contentStart = wIdx + workWrapperStart.length;
  
  let pos = contentStart;
  let depth = 1;
  while (depth > 0 && pos < html.length) {
    const nextOpen = html.indexOf("<div", pos);
    const nextClose = html.indexOf("</div>", pos);
    
    if (nextClose === -1) break;
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }
  
  if (depth === 0) {
    const wrapperEnd = pos - 6;
    return html.substring(0, contentStart) + projectsHtml + html.substring(wrapperEnd);
  }
  
  return html;
}

/**
 * Build the experience ticker (companies) for the "Worked with Global Brands" section.
 */
function buildBrandsTicker(profile: ProfileData): string {
  const companies = profile.experience.map((e) => e.company).filter(Boolean);
  if (companies.length === 0) return "";

  const items = companies
    .concat(companies) // duplicate for seamless scroll
    .map(
      (c) =>
        `<li aria-hidden="true" style="flex-shrink:0;display:inline-flex;align-items:center;padding:0 18px;white-space:nowrap;font-family:'Inter Display',sans-serif;font-size:16px;font-weight:500;color:#333;">${esc(c)}</li>`
    )
    .join("");

  return `
<section style="display:flex;width:100%;place-items:center;mask-image:linear-gradient(to right,rgba(0,0,0,0) 0%,rgb(0,0,0) 12.5%,rgb(0,0,0) 87.5%,rgba(0,0,0,0) 100%);overflow:hidden;">
  <ul style="display:flex;width:100%;place-items:center;margin:0;padding:0;list-style:none;gap:18px;animation:tickerScroll 20s linear infinite;">
    ${items}
  </ul>
</section>
<style>
@keyframes tickerScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>`;
}

/**
 * Build the about me paragraph.
 */
function buildAboutMe(profile: ProfileData): string {
  return esc(
    `${profile.summary} ${profile.interests ? `Interests: ${profile.interests}` : ""}`.trim()
  );
}

/**
 * Build the hero "I'm a [headline]..." text.
 */
function buildHeroBio(profile: ProfileData): string {
  return esc(profile.summary);
}

function buildSocialLinksBlock(profile: ProfileData, isPreview: boolean): string {
  const links = profile.links || [];
  if (links.length === 0) return "";

  return links.map((lnk, index) => {
    const editableAttr = isPreview ? `data-editable-field="links" data-editable-index="${index}"` : "";
    return `
<div class="ssr-variant" ${editableAttr} style="opacity: 1; margin-bottom: 6px;">
  <!--$--><a class="framer-RdB2l framer-5K3Le framer-7fvNa framer-wyk4az framer-v-wyk4az framer-g0nscs" href="${esc(lnk.url)}" target="_blank" rel="noopener" style="background-color:rgba(0, 0, 0, 0); opacity:1; display:flex; justify-content:space-between; width:100%; text-decoration:none; padding: 4px 0;">
    <div class="framer-pq6inv" style="opacity: 1;">
      <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="color:var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)); margin:0;">${esc(lnk.label)}</p>
    </div>
  </a><!--/$-->
</div>`;
  }).join("\n");
}

function replaceSocialLinksContent(html: string, socialHtml: string): string {
  const marker = 'data-framer-name="Social links"';
  const sIdx = html.indexOf(marker);
  if (sIdx === -1) return html;

  const contentStart = html.indexOf(">", sIdx) + 1;
  let pos = contentStart;
  let depth = 1;
  while (depth > 0 && pos < html.length) {
    const nextOpen = html.indexOf("<div", pos);
    const nextClose = html.indexOf("</div>", pos);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }

  if (depth === 0) {
    const wrapperEnd = pos - 6;
    return html.substring(0, contentStart) + socialHtml + html.substring(wrapperEnd);
  }

  return html;
}

// ── Customization Defaults & Builders ────────────────────────────────────────

const DEFAULT_SERVICES = [
  { title: "Web design", price: "$1200", description: "I create visually appealing, responsive websites with clean layouts, ensuring engaging user experiences and professional digital presence." },
  { title: "UI/UX Design", price: "$1500", description: "I design intuitive user interfaces and seamless experiences, focusing on usability, accessibility, and modern aesthetics to improve user satisfaction." },
  { title: "Framer Development", price: "$1300", description: "I build interactive, high-performing websites in Framer, smooth animations, & fully responsive layouts tailored to your brand." },
  { title: "Mobile App Design", price: "$1600", description: "I design user mobile applications with functional layouts, engaging visuals, & optimized experiences for both iOS & Android platforms." },
  { title: "Branding & Identity", price: "$1000", description: "I craft unique brand identities including logos, typography, & guidelines, helping businesses stand out with consistency & strong visual presence." }
];

const DEFAULT_SERVICES_CTA = {
  title: "Book A 30 min Free Call",
  text: "Let’s connect to discuss your design needs, explore creative ideas, and plan your project effectively together.",
  buttonText: "Book A Call",
  buttonUrl: "#contact"
};

const DEFAULT_PROCESSES = [
  { stepTag: "/01", title: "Creative Discovery", description: "Through research and collaboration, we uncover goals, audience needs, and brand vision to build a solid creative foundation." },
  { stepTag: "/02", title: "Design Blueprint", description: "Transforming insights into structured wireframes and prototypes that guide visuals, user experience, and brand alignment seamlessly." },
  { stepTag: "/03", title: "Delivery & Launch", description: "Executing development and refined animations, ensuring cross-platform testing, and launching a high-performance experience." }
];

const DEFAULT_TESTIMONIALS = [
  { quote: "Daniel transformed our digital presence with stunning design and seamless usability. Working with him was a complete delight.", name: "James Walker", role: "Marketing Director, BrightEdge", avatarUrl: "/templates/daniel-cross/3R6WpHw2pAWlgNTDtMQICmJ9as.png" },
  { quote: "Professional, creative, & highly reliable. he delivered designs that exceeded expectations & strengthened our brand identity across platforms.", name: "Emily Harris", role: "Product Manager, Nexora", avatarUrl: "/templates/daniel-cross/6GdVor1G40eyD13tSRQ8IzSBQ.png" },
  { quote: "His attention to detail and ability to capture our vision in design made the entire process effortless, inspiring, and memorable.", name: "Oliver Bennett", role: "CEO, Innovent Solutions", avatarUrl: "/templates/daniel-cross/0gmxJBiUekQL1gjvN4nDfGCVIRE.webp" }
];

function buildServicesSection(profile: ProfileData): string {
  const services = profile.services && profile.services.length > 0 ? profile.services : DEFAULT_SERVICES;
  const cta = profile.servicesCta || DEFAULT_SERVICES_CTA;

  const cards = services.map((s) => `
<div class="ssr-variant">
  <div class="framer-1pxl5gq-container" data-framer-name="Service card" name="Service card" style="will-change: transform; opacity: 1; transform: none;">
    <div name="Service card" class="framer-VzKJz framer-jF71g framer-7fvNa framer-6tapR framer-1e9a2dx framer-v-1e9a2dx" data-framer-name="Service card" style="background-color: var(--token-1f466c1a-ea57-4ca6-b62a-278c9a994c3b, rgb(237, 234, 231)); width: 100%; border-radius: 10px; opacity: 1;">
      <div class="framer-1gbvodd" data-framer-name="Top text" style="opacity: 1;">
        <div class="framer-mkogse" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
          <p class="framer-text framer-styles-preset-tupu2d" data-styles-preset="gDmw1PFmz" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)))">${esc(s.title)}</p>
        </div>
        <div class="framer-12mw7zf" data-framer-name="Price tag" style="background-color: var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, rgb(74, 52, 41)); border-radius: 999px; opacity: 1;">
          <div class="framer-1opeho9" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-1nhui24" data-styles-preset="IfUNq__y7" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)))">${esc(s.price)}</p>
          </div>
        </div>
      </div>
      <div class="framer-18fafw1" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
        <p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm">${esc(s.description)}</p>
      </div>
    </div>
  </div>
</div>`).join("\n");

  const ctaCard = `
<div class="framer-qz5mfl" data-framer-name="Services Contact card" style="will-change: transform; opacity: 1; transform: none;">
  <div class="framer-1pi5p4y" data-framer-name="Text wrapper">
    <div class="framer-z96g2q" data-framer-component-type="RichTextContainer" style="transform:none">
      <p class="framer-text framer-styles-preset-tupu2d" data-styles-preset="gDmw1PFmz">${esc(cta.title)}</p>
    </div>
    <div class="framer-pj0lb2" data-framer-component-type="RichTextContainer" style="transform:none">
      <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255))">${esc(cta.text)}</p>
    </div>
  </div>
  <!--$--><div class="ssr-variant"><div class="framer-qryzno-container" data-framer-name="Button" name="Button"><!--$--><a name="Button" class="framer-w0cQM framer-6tapR framer-12hwi5v framer-v-17sj5po framer-18lqbhu" data-framer-name="White" href="${esc(cta.buttonUrl || "#contact")}" style="background-color: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); width: 100%; border-radius: 6px; opacity: 1;"><div class="framer-1cl53n9" data-framer-name="Text" style="opacity: 1;"><div class="framer-1icur2i" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, rgb(74, 52, 41)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"><p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, rgb(74, 52, 41)))">${esc(cta.buttonText)}</p></div><div class="framer-dhttw8" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, rgb(74, 52, 41)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"><p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, rgb(74, 52, 41)))">${esc(cta.buttonText)}</p></div></div></a><!--/$--></div></div><!--/$-->
</div>`;

  return `<!--$--><!--$-->${cards}\n${ctaCard}<!--/$--><!--/$-->`;
}

function replaceServicesGridContent(html: string, servicesHtml: string): string {
  const marker = 'data-framer-name="Grid 3x">';
  const sIdx = html.indexOf(marker);
  if (sIdx === -1) return html;

  const contentStart = sIdx + marker.length;
  let pos = contentStart;
  let depth = 1;
  while (depth > 0 && pos < html.length) {
    const nextOpen = html.indexOf("<div", pos);
    const nextClose = html.indexOf("</div>", pos);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }

  if (depth === 0) {
    const wrapperEnd = pos - 6;
    return html.substring(0, contentStart) + servicesHtml + html.substring(wrapperEnd);
  }

  return html;
}

function buildProcessStepsSection(profile: ProfileData): string {
  const steps = profile.processes && profile.processes.length > 0 ? profile.processes : DEFAULT_PROCESSES;

  const cards = steps.map((s, idx) => {
    const stepName = `Step 0${idx + 1}`;
    return `
<div class="ssr-variant">
  <div class="framer-h03gyd-container" data-framer-name="${esc(stepName)}" name="${esc(stepName)}" style="will-change: transform; opacity: 1; transform: none;">
    <div name="${esc(stepName)}" class="framer-euNV9 framer-jF71g framer-7fvNa framer-6tapR framer-mfpv4s framer-v-mfpv4s" data-border="true" data-framer-name="Process step" style="--1og3yzz: 0px 0px 24px 0px; --border-bottom-width: 1px; --border-color: var(--token-d14b4603-7c19-4eb1-a2c4-11c0d954f027, rgba(0, 0, 0, 0.1)); --border-left-width: 0px; --border-right-width: 0px; --border-style: solid; --border-top-width: 0px; width: 100%; opacity: 1;">
      <div class="framer-k69a0f" data-framer-name="Top text" style="opacity: 1;">
        <div class="framer-evo9ii" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
          <p class="framer-text framer-styles-preset-tupu2d" data-styles-preset="gDmw1PFmz" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)))">${esc(s.title)}</p>
        </div>
        <div class="framer-r79wk8" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
          <p class="framer-text framer-styles-preset-1nhui24" data-styles-preset="IfUNq__y7">${esc(s.stepTag)}</p>
        </div>
      </div>
      <div class="framer-dbu4a4" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
        <p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm">${esc(s.description)}</p>
      </div>
    </div>
  </div>
</div>`;
  }).join("\n");

  return `<!--$--><!--$-->${cards}<!--/$--><!--/$-->`;
}

function replaceProcessStepsContent(html: string, processHtml: string): string {
  const marker = 'data-framer-name="Process steps">';
  const pIdx = html.indexOf(marker);
  if (pIdx === -1) return html;

  const contentStart = pIdx + marker.length;
  let pos = contentStart;
  let depth = 1;
  while (depth > 0 && pos < html.length) {
    const nextOpen = html.indexOf("<div", pos);
    const nextClose = html.indexOf("</div>", pos);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }

  if (depth === 0) {
    const wrapperEnd = pos - 6;
    return html.substring(0, contentStart) + processHtml + html.substring(wrapperEnd);
  }

  return html;
}

function buildTestimonialsSection(profile: ProfileData): string {
  const testimonials = profile.testimonials && profile.testimonials.length > 0 ? profile.testimonials : DEFAULT_TESTIMONIALS;

  const cards = testimonials.map((t, idx) => {
    const defaultAvatars = [
      "/templates/daniel-cross/3R6WpHw2pAWlgNTDtMQICmJ9as.png",
      "/templates/daniel-cross/6GdVor1G40eyD13tSRQ8IzSBQ.png",
      "/templates/daniel-cross/0gmxJBiUekQL1gjvN4nDfGCVIRE.webp"
    ];
    const resolvedAvatar = t.avatarUrl || defaultAvatars[idx % 3];

    return `
<li style="display: contents;">
  <div class="framer-esrupl-container" data-framer-name="Reviews card" name="Reviews card" style="flex-shrink: 0; user-select: none; width: calc(33.3333% - 9.33333px); height: 100%; opacity: 1; visibility: visible; transform: none; transform-origin: 100% 50% 0px;" aria-hidden="true">
    <div name="Reviews card" class="framer-KjIJu framer-6tapR framer-5K3Le framer-ufx0vo framer-v-ufx0vo" data-framer-name="Reviews card" style="background-color: var(--token-1f466c1a-ea57-4ca6-b62a-278c9a994c3b, rgb(237, 234, 231)); width: 100%; border-radius: 16px; opacity: 1;">
      <div class="framer-1uws27r" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
        <p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm">${esc(t.quote)}</p>
      </div>
      <div class="framer-17i8f2v" data-framer-name="User wrapper" style="opacity: 1;">
        <div class="framer-2c4g0l" data-framer-name="Profile image" style="border-radius: 999px; opacity: 1;">
          <div style="position:absolute;border-radius:inherit;corner-shape:inherit;top:0;right:0;bottom:0;left:0" data-framer-background-image-wrapper="true">
            <img decoding="auto" src="${esc(resolvedAvatar)}" alt="" style="display:block;width:100%;height:100%;border-radius:inherit;corner-shape:inherit;object-position:center;object-fit:cover">
          </div>
        </div>
        <div class="framer-w6er8w" data-framer-name="Text" style="opacity: 1;">
          <div class="framer-dn64y5" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)))">${esc(t.name)}</p>
          </div>
          <div class="framer-t1h63y" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-13ef338a-a018-4b90-9b3e-7bf1136daf34, rgb(138, 138, 138)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-13ef338a-a018-4b90-9b3e-7bf1136daf34, rgb(138, 138, 138)))">${esc(t.role)}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</li>`;
  }).join("\n");

  return cards;
}

function replaceTestimonialsContent(html: string, testimonialsHtml: string): string {
  const marker = 'transform: translateX(-1214px);">';
  const tIdx = html.indexOf(marker);
  if (tIdx === -1) {
    const marker2 = 'transform: translateX(0px);">';
    const t2Idx = html.indexOf(marker2);
    if (t2Idx === -1) return html;
    
    const contentStart = t2Idx + marker2.length;
    const listEnd = html.indexOf("</ul>", contentStart);
    if (listEnd !== -1) {
      return html.substring(0, contentStart) + testimonialsHtml + html.substring(listEnd);
    }
    return html;
  }

  const contentStart = tIdx + marker.length;
  const listEnd = html.indexOf("</ul>", contentStart);
  if (listEnd !== -1) {
    return html.substring(0, contentStart) + testimonialsHtml + html.substring(listEnd);
  }
  return html;
}

// ── Main compiler ────────────────────────────────────────────────────────────

export function compileStaticHtml(profile: ProfileData, _templateId: TemplateId): string {
  // Read the original Framer template HTML
  const templatePath = path.join(process.cwd(), "public", "templates", "daniel-cross.html");
  let html = fs.readFileSync(templatePath, "utf-8");

  // ─── 1. Fix all asset URLs ─────────────────────────────────────────────
  // The template uses relative paths to a local _files folder.
  // We remap them to our /templates/daniel-cross/ public URL.
  html = replaceAll(
    html,
    "./Danielcross - Personal Portfolio Framer Template_files/",
    "/templates/daniel-cross/"
  );

  // ─── 2. Fix all internal framer website links ─────────────────────────
  // Replace internal Framer navigation links with # to avoid broken nav
  html = replaceAll(html, "https://danielcross.framer.website/", "#");
  html = replaceAll(html, "https://danielcross.framer.website/about", "#about");
  html = replaceAll(html, "https://danielcross.framer.website/work", "#work");
  html = replaceAll(html, "https://danielcross.framer.website/contact", "#contact");

  // ─── 3. Update page title & SEO meta ──────────────────────────────────
  const pageTitle = `${profile.name} - Portfolio`;
  html = replaceAll(
    html,
    "Danielcross - Personal Portfolio Framer Template",
    esc(pageTitle)
  );
  html = replaceAll(
    html,
    "Daniel Cross is a modern portfolio template for Framer, crafted for UI/UX designers and creatives. Sleek, professional, and fully customizable — ideal for showcas",
    esc(profile.summary.substring(0, 150))
  );

  // ─── 4. Sidebar name (logo link text) ─────────────────────────────────
  // "Daniel Cross" in sidebar logo area
  html = replaceAll(html, ">Daniel Cross<", `>${esc(profile.name)}<`);

  // ─── 5. Sidebar role ──────────────────────────────────────────────────
  html = replaceAll(html, ">ui/ux designer<", `>${esc(profile.headline)}<`);

  // ─── 6. Hero headline (first name on h1) ──────────────────────────────
  // The template has "Hey,\ndaniel\nhere" split across multiple h1 elements
  const firstName = profile.name.split(" ")[0].toLowerCase();
  html = replaceAll(html, ">daniel<", `>${esc(profile.heroGreetingName || firstName)}<`);
  html = replaceAll(html, ">Hey,<", `>${esc(profile.heroGreetingStart || "Hey,")}<`);
  html = replaceAll(html, ">here<", `>${esc(profile.heroGreetingEnd || "here")}<`);

  // Status and follow labels
  html = replaceAll(html, ">Available for work</p>", `>${esc(profile.statusText || "Available for work")}</p>`);
  html = replaceAll(html, ">Follow me</p>", `>${esc(profile.followMeLabel || "Follow me")}</p>`);

  // Navigation Links Text Overrides
  html = replaceAll(html, ">Home<", `>${esc(profile.navHomeText || "Home")}<`);
  html = replaceAll(html, ">About<", `>${esc(profile.navAboutText || "About")}<`);
  html = replaceAll(html, ">Projects<", `>${esc(profile.navProjectsText || "Projects")}<`);
  html = replaceAll(html, ">Contact<", `>${esc(profile.navContactText || "Contact")}<`);

  // Footer Credit Details
  html = replaceAll(html, ">Template by </p>", `>${esc(profile.footerCreditText || "Template by")}</p>`);
  html = replaceAll(html, ">Muddasir Hussain</a>", `>${esc(profile.footerCreditName || "Muddasir Hussain")}</a>`);
  html = replaceAll(html, ">Built in</p>", `>${esc(profile.builtInFramerText || "Built in")}</p>`);
  html = replaceAll(html, ">Framer</a>", `>${esc(profile.builtInFramerUrl || "Framer")}</a>`);

  // ─── 7. Hero bio paragraph ────────────────────────────────────────────
  html = replaceAll(
    html,
    "I’m Daniel Cross, a passionate UI/UX Designer dedicated to crafting digital experiences that truly connect with people. With a focus on simplicity, usability, and creativity, I design products that not only look beautiful but also solve real problems. My approach blends strategy, design, and technology to transform ideas into meaningful solutions. Whether it’s designing intuitive interfaces, building websites, or shaping brand identities, I bring every project to life with precision and purpose.",
    esc(profile.summary)
  );

  // ─── 8. Location (sidebar & footer) ───────────────────────────────────
  const location = profile.location || "Remote";
  html = replaceAll(html, ">Based in London-UK<", `>Based in ${esc(location)}<`);
  html = replaceAll(html, ">London-UK<", `>${esc(location)}<`);

  // Fix footer location map href
  html = replaceAll(
    html,
    'href="https://www.google.com/maps/place/45+Westwood+Ave,+Ellenville,+NY+12428,+USA/@41.7197902,-74.4073192,17z/data=!3m1!4b1!4m6!3m5!1s0x89dcdcab387f0725:0xa47e5e118528587f!8m2!3d41.7197862!4d-74.4047443!16s%2Fg%2F11c4w_9k9y?entry=ttu&amp;g_ep=EgoyMDI1MDUxMS4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"',
    `href="https://maps.google.com?q=${encodeURIComponent(location)}"`
  );

  // ─── 9. Footer contact details ────────────────────────────────────────
  // Email
  const emailLink = profile.links.find((l) => l.icon === "email");
  const email = emailLink ? emailLink.url.replace("mailto:", "") : "hello@example.com";
  html = replaceAll(html, 'href="mailto:hello@gmail.com"', `href="mailto:${esc(email)}"`);
  html = replaceAll(html, ">hello@gmail.com<", `>${esc(email)}<`);

  // Phone
  const phone = profile.phone || "+44 7700 900123";
  html = replaceAll(html, 'href="tel:+44 7700 900123"', `href="tel:${esc(phone)}"`);
  html = replaceAll(html, ">+44 7700 900123<", `>${esc(phone)}<`);

  // ─── 9.5 Custom Template Customizations ────────────────────────────────
  // Hero Badge
  const badgeText = profile.heroBadgeText || "Welcome here ❤️";
  html = replaceAll(html, "Welcome here ❤️", esc(badgeText));

  // Hero subheadline words block
  const subheadlineText = profile.heroSubheadline || "I design Interfaces, experiences, & brands.";
  const words = subheadlineText.split(" ");
  const wordsHtml = words
    .map(
      (w) =>
        `<div style="opacity:1;transform:none;will-change:transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">${esc(w)}</h1></div>`
    )
    .join("");
  const originalWordsSequence = `</div></div><div class="framer-1q82b98" data-framer-appear-id="1q82b98" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">I</h1></div><div class="framer-a5yabo" data-framer-appear-id="a5yabo" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">design</h1></div><div class="framer-oik3st" data-framer-appear-id="oik3st" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">Interfaces,</h1></div><div class="framer-198z1h1" data-framer-appear-id="198z1h1" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">experiences,</h1></div><div class="framer-k25hut" data-framer-appear-id="k25hut" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">&amp;</h1></div><div class="framer-9xarsm" data-framer-appear-id="9xarsm" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">brands.</h1></div>`;
  html = replaceAll(html, originalWordsSequence, `</div></div>` + wordsHtml);

  // Hero CTA Button
  const heroCtaText = profile.heroCtaText || "Book A Call";
  const heroCtaUrl = profile.heroCtaUrl || "#contact";
  html = replaceAll(html, 'data-framer-name="Brown" href="https://danielcross.framer.website/contact"', `data-framer-name="Brown" href="${esc(heroCtaUrl)}"`);
  html = replaceAll(html, 'data-framer-name="Brown" href="#contact"', `data-framer-name="Brown" href="${esc(heroCtaUrl)}"`);
  html = replaceAll(html, "Book A Call", esc(heroCtaText));

  // Hero rating text
  html = replaceAll(html, "4.9 / 5", esc(profile.heroRatingText || "4.9 / 5"));

  // Section Labels
  html = replaceAll(html, ">What I Do<", `>${esc(profile.servicesLabel || "What I Do")}<`);
  html = replaceAll(html, ">About me<", `>${esc(profile.aboutLabel || "About me")}<`);
  html = replaceAll(html, ">Worked with Global Brands<", `>${esc(profile.brandsLabel || "Worked with Global Brands")}<`);
  html = replaceAll(html, ">My Portfolio<", `>${esc(profile.projectsLabel || "My Portfolio")}<`);
  html = replaceAll(html, ">Every project built to inspire users<", `>${esc(profile.projectsSubtitle || "Every project built to inspire users")}<`);

  // Projects list CTA button
  const exploreUrl = profile.projectsExploreUrl || "#work";
  html = replaceAll(html, 'data-framer-name="Brown" href="https://danielcross.framer.website/work"', `data-framer-name="Brown" href="${esc(exploreUrl)}"`);
  html = replaceAll(html, 'data-framer-name="Brown" href="#work"', `data-framer-name="Brown" href="${esc(exploreUrl)}"`);
  html = replaceAll(html, "Explore All", esc(profile.projectsExploreText || "Explore All"));

  html = replaceAll(html, ">My Process<", `>${esc(profile.processLabel || "My Process")}<`);
  html = replaceAll(html, ">Reviews<", `>${esc(profile.testimonialsLabel || "Reviews")}<`);
  html = replaceAll(html, ">Have a question<", `>${esc(profile.footerLabel || "Have a question")}<`);

  // ─── 10. Projects / Work cards section ────────────────────────────────
  // Replace the entire work wrapper content with user's projects (replaces placeholder cards)
  if ((profile.projects || []).length > 0) {
    const projectsHtml = buildProjectsSection(profile);
    html = replaceWorkWrapperContent(html, projectsHtml);
  }

  // ─── 11. Brands ticker section ─────────────────────────────────────────
  const tickerMarker = 'data-framer-name="Ticker logos"';
  const tickerIdx = html.indexOf(tickerMarker);
  if (tickerIdx !== -1 && profile.experience.length > 0) {
    const tickerOpenEnd = html.indexOf(">", tickerIdx) + 1;
    const tickerClose = html.indexOf("<!--/$-->", tickerOpenEnd);
    if (tickerClose !== -1) {
      const tickerHtml = buildBrandsTicker(profile);
      html = html.substring(0, tickerOpenEnd) + tickerHtml + html.substring(tickerClose);
    }
  }

  // ─── 12. Social links in sidebar (compiled block replacement) ─────────
  const socialHtml = buildSocialLinksBlock(profile, false);
  html = replaceSocialLinksContent(html, socialHtml);

  // ─── 13. Remove Framer badge ──────────────────────────────────────────
  html = html.replace(/<div id="__framer-badge-container"[\s\S]*?<\/div>/g, "");

  // Reset reviews slider starting translation to 0px so testimonials are visible by default
  html = replaceAll(html, "transform: translateX(-1214px);", "transform: translateX(0px);");

  // ─── 14. Replace avatars and banners ──────────────────────────────────
  html = html.replace(/srcset="[^"]*?6fz6fw6ZIqdfPnGjg9h6yUfYitE[^"]*?"/g, "");
  html = html.replace(/srcset="[^"]*?B3sqQm2pBUNJyRcswxM209Q[^"]*?"/g, "");
  html = html.replace(/srcset="[^"]*?8pmcaHy6B2IO4Rap9XhFCnzKA[^"]*?"/g, "");
  html = html.replace(/srcset="[^"]*?jI4zwMAO3uowSwVm4sMQEYbksMc[^"]*?"/g, "");
  html = html.replace(/srcset="[^"]*?MlC72sVCQio6ooebpIaFFKLOVDA[^"]*?"/g, "");
  html = html.replace(/srcset="[^"]*?tWZ2VFb5FDPeKYQ9yBBM9vYwvM[^"]*?"/g, "");
  html = html.replace(/srcset="[^"]*?9AC9XJeFmKrPFObuCUzsjnfqI[^"]*?"/g, "");
  html = html.replace(/srcset="[^"]*?9GBbApze5hUVXQgG9ZiXatQdLa0[^"]*?"/g, "");

  const avatarPhoto = profile.avatarUrl;
  const bannerPhoto = profile.bannerUrl || profile.avatarUrl;
  const aboutPhoto = profile.aboutPhotoUrl || profile.bannerUrl || profile.avatarUrl;

  if (profile.avatarUrl) {
    html = replaceAll(html, "/templates/daniel-cross/6fz6fw6ZIqdfPnGjg9h6yUfYitE.jpg", esc(profile.avatarUrl));
  }
  if (avatarPhoto) {
    html = replaceAll(html, "/templates/daniel-cross/9AC9XJeFmKrPFObuCUzsjnfqI.png", esc(avatarPhoto));
  }
  if (bannerPhoto) {
    html = replaceAll(html, "/templates/daniel-cross/B3sqQm2pBUNJyRcswxM209Q.png", esc(bannerPhoto));
  }
  if (aboutPhoto) {
    html = replaceAll(html, "/templates/daniel-cross/tWZ2VFb5FDPeKYQ9yBBM9vYwvM.png", esc(aboutPhoto));
    html = replaceAll(html, "/templates/daniel-cross/9GBbApze5hUVXQgG9ZiXatQdLa0.png", esc(aboutPhoto));
  }

  // Replace custom section titles if provided
  if (profile.servicesTitle) {
    html = replaceAll(html, ">Turning ideas into digital experiences<", `>${esc(profile.servicesTitle)}<`);
  }
  if (profile.processTitle) {
    html = replaceAll(html, ">From ideas to impactful creative results.<", `>${esc(profile.processTitle)}<`);
  }
  if (profile.testimonialsTitle) {
    html = replaceAll(html, ">Voices of trust from happy clients<", `>${esc(profile.testimonialsTitle)}<`);
  }

  // Replace customizable images if provided
  if (profile.aboutPhotoUrl) {
    html = replaceAll(html, "/templates/daniel-cross/8pmcaHy6B2IO4Rap9XhFCnzKA.png", esc(profile.aboutPhotoUrl));
  }
  if (profile.signatureUrl) {
    html = replaceAll(html, "/templates/daniel-cross/jI4zwMAO3uowSwVm4sMQEYbksMc.png", esc(profile.signatureUrl));
  }
  if (profile.footerBannerUrl) {
    html = replaceAll(html, "/templates/daniel-cross/MlC72sVCQio6ooebpIaFFKLOVDA.png", esc(profile.footerBannerUrl));
  }

  // Compile custom services
  const servicesHtml = buildServicesSection(profile);
  html = replaceServicesGridContent(html, servicesHtml);

  // Compile custom process steps
  const processHtml = buildProcessStepsSection(profile);
  html = replaceProcessStepsContent(html, processHtml);

  // Compile custom testimonials reviews
  const testimonialsHtml = buildTestimonialsSection(profile);
  html = replaceTestimonialsContent(html, testimonialsHtml);
  // Add custom responsive stylesheet overrides to prevent absolute width overflows and correctly display hidden variants
  const responsiveStyles = `
<style data-custom-responsive="true">
  /* Complete sidebar removal overrides */
  .framer-11htobf,
  .framer-11htobf-container,
  [data-framer-name="Sidebar wrapper"],
  [data-framer-name="Sidebar"] {
    display: none !important;
  }
  
  .framer-NYla7 .framer-1qj9dji {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
  }

  .framer-NYla7 .framer-vprhwm {
    width: 100% !important;
    max-width: 100% !important;
    flex: 1 1 auto !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    margin: 0 auto !important;
  }
  
  .framer-DKwHu.framer-ha6joy {
    margin: 0 auto !important;
  }

  /* Base hidden class overrides */
  @media (max-width: 809.98px) {
    .hidden-18pvjnd {
      display: none !important;
    }
    /* Ensure testimonials slideshow variant remains visible */
    .framer-9ivh3c-container .hidden-18pvjnd {
      display: block !important;
    }
  }
  @media (min-width: 810px) and (max-width: 1199.98px) {
    .hidden-1bkts62 {
      display: none !important;
    }
    /* Ensure testimonials slideshow variant remains visible */
    .framer-9ivh3c-container .hidden-1bkts62 {
      display: block !important;
    }
  }

  /* Make containers fluid on screens smaller than desktop (1200px) */
  @media (max-width: 1199.98px) {
    .framer-NYla7.framer-nqzx6h {
      width: 100% !important;
      max-width: 100vw !important;
      overflow-x: hidden !important;
    }
    
    .framer-NYla7 .framer-1qj9dji {
      width: 100% !important;
      max-width: 100% !important;
    }
    
    .framer-NYla7 .framer-11htobf {
      max-width: 100% !important;
    }
    
    .framer-NYla7 .framer-vprhwm {
      width: 100% !important;
      max-width: 100% !important;
      flex: 1 1 auto !important;
    }

    .framer-DKwHu.framer-ha6joy {
      width: 100% !important;
      max-width: 100% !important;
      padding-left: 24px !important;
      padding-right: 24px !important;
    }
    
    .framer-cOcSQ.framer-ryc3c {
      width: 100% !important;
      max-width: 100% !important;
    }
    
    .framer-euNV9.framer-mfpv4s {
      width: 100% !important;
      max-width: 100% !important;
    }

    /* Testimonials slideshow responsive sizing & swipe adjustments */
    .framer-9ivh3c-container {
      height: auto !important;
      min-height: 280px !important;
    }
    .framer-9ivh3c-container section > div {
      overflow-x: auto !important;
      scroll-snap-type: x mandatory !important;
      -webkit-overflow-scrolling: touch !important;
      -ms-overflow-style: none !important;
      scrollbar-width: none !important;
    }
    .framer-9ivh3c-container section > div::-webkit-scrollbar {
      display: none !important;
    }
    
    .framer-esrupl-container,
    .framer-1x1fbg7-container,
    .framer-16lsjul-container {
      width: calc(50% - 7px) !important;
      height: auto !important;
      min-height: 240px !important;
      scroll-snap-align: start !important;
      flex-shrink: 0 !important;
    }
    .framer-KjIJu {
      height: 100% !important;
      min-height: 220px !important;
      box-sizing: border-box !important;
    }
  }

  /* Specific mobile-size adjustments (under 810px) */
  @media (max-width: 809.98px) {
    .framer-50OQE .framer-tfstyy-container {
      width: 100% !important;
      max-width: 100vw !important;
    }
    
    .framer-Cxj9g.framer-v-117swu5.framer-1g4vz55,
    .framer-Cxj9g.framer-v-tlavhy.framer-1g4vz55 {
      width: 100% !important;
      max-width: 100vw !important;
    }

    .framer-DKwHu.framer-v-1qhzu7s.framer-ha6joy {
      width: 100% !important;
      max-width: 100% !important;
      padding-left: 16px !important;
      padding-right: 16px !important;
    }

    .framer-DKwHu .framer-1bh76c {
      padding: 40px 16px !important;
    }

    .framer-9ivh3c-container {
      min-height: 320px !important;
    }
    .framer-esrupl-container,
    .framer-1x1fbg7-container,
    .framer-16lsjul-container {
      width: 100% !important;
      min-height: 280px !important;
    }
    .framer-KjIJu {
      min-height: 260px !important;
    }
  }
</style>
`;
  let colorStyles = "";
  if (profile.themeColors) {
    const { primaryBg, accentColor, cardBg, textPrimary, textMuted } = profile.themeColors;
    colorStyles = `
<style id="custom-theme-colors">
  body {
    ${primaryBg ? `--token-d469a4a3-0708-4dfe-8498-9b2828796a10: ${primaryBg} !important; --token-1d129b27-20b9-421b-bc87-4be93ee49891: ${primaryBg} !important;` : ""}
    ${accentColor ? `--token-09c1722d-5d82-4a0e-b304-abc5a551cacb: ${accentColor} !important;` : ""}
    ${cardBg ? `--token-1f466c1a-ea57-4ca6-b62a-278c9a994c3b: ${cardBg} !important;` : ""}
    ${textPrimary ? `--token-5b7978f2-455d-4675-a18c-26d9c3d422ca: ${textPrimary} !important;` : ""}
    ${textMuted ? `--token-13ef338a-a018-4b90-9b3e-7bf1136daf34: ${textMuted} !important;` : ""}
  }
</style>
`;
  }
  html = html.replace("</head>", `${responsiveStyles}${colorStyles}</head>`);

  // ─── 15. Conditional Section Removal ────────────────────────────────
  if (!profile.testimonials || profile.testimonials.length === 0) {
    html = removeHtmlSection(html, 'data-framer-name="Reviews"', 'section');
  }
  if (!profile.services || profile.services.length === 0) {
    html = removeHtmlSection(html, 'data-framer-name="Services"', 'section');
  }
  if (!profile.projects || profile.projects.length === 0) {
    html = removeHtmlSection(html, 'data-framer-name="Projects"', 'section');
  }

  const emailLinkForFooter = profile.links?.find((l) => l.icon === "email");
  const emailVal = profile.email || (emailLinkForFooter ? emailLinkForFooter.url.replace("mailto:", "") : "");
  const phoneVal = profile.phone || "";
  const hasLinks = profile.links && profile.links.length > 0;
  if (!emailVal && !phoneVal && !hasLinks) {
    html = removeHtmlSection(html, 'name="CTA &amp; Footer"', 'footer');
  }

  return html;
}

```

---

## File: `lib/db.ts`

```typescript
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq, asc } from "drizzle-orm";
import * as schema from "./schema";
import { ProfileData, TemplateId, MOCK_PROFILE } from "@/shared/types";

// User interface for app compatibility
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface CustomDomain {
  id: string;
  name: string;
  status: "pending" | "active";
}

export interface Website {
  id: string;
  userId: string;
  brandName: string;
  subdomainSlug: string;
  templateId: TemplateId;
  seoTitle: string;
  seoDesc: string;
  customDomains: CustomDomain[];
  profile: ProfileData;
  publishedProfile?: ProfileData;
  publishedTemplate?: TemplateId;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:imblue-12345@localhost:4000/linked";

const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool, { schema });

export async function getUserWebsites(userId: string): Promise<Website[]> {
  const rows = await db
    .select()
    .from(schema.website)
    .where(eq(schema.website.userId, userId));
  return rows.map((w) => ({
    ...w,
    templateId: w.templateId as TemplateId,
    customDomains: (w.customDomains || []) as CustomDomain[],
    profile: w.profile as ProfileData,
    publishedProfile: (w.publishedProfile || undefined) as
      | ProfileData
      | undefined,
    publishedTemplate: (w.publishedTemplate || undefined) as
      | TemplateId
      | undefined,
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
  }));
}

export async function getWebsiteById(id: string): Promise<Website | undefined> {
  const rows = await db
    .select()
    .from(schema.website)
    .where(eq(schema.website.id, id))
    .limit(1);
  const w = rows[0];
  if (!w) return undefined;
  return {
    ...w,
    templateId: w.templateId as TemplateId,
    customDomains: (w.customDomains || []) as CustomDomain[],
    profile: w.profile as ProfileData,
    publishedProfile: (w.publishedProfile || undefined) as
      | ProfileData
      | undefined,
    publishedTemplate: (w.publishedTemplate || undefined) as
      | TemplateId
      | undefined,
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
  };
}

export async function getWebsiteBySubdomain(
  subdomainSlug: string,
): Promise<Website | undefined> {
  const rows = await db
    .select()
    .from(schema.website)
    .where(eq(schema.website.subdomainSlug, subdomainSlug.toLowerCase()))
    .limit(1);
  const w = rows[0];
  if (!w) return undefined;
  return {
    ...w,
    templateId: w.templateId as TemplateId,
    customDomains: (w.customDomains || []) as CustomDomain[],
    profile: w.profile as ProfileData,
    publishedProfile: (w.publishedProfile || undefined) as
      | ProfileData
      | undefined,
    publishedTemplate: (w.publishedTemplate || undefined) as
      | TemplateId
      | undefined,
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
  };
}

export async function getWebsiteByDomain(
  domainName: string,
): Promise<Website | undefined> {
  const rows = await db.select().from(schema.website);
  const match = rows.find((w) =>
    ((w.customDomains || []) as CustomDomain[]).some(
      (d) => d.name.toLowerCase() === domainName.toLowerCase(),
    ),
  );
  if (!match) return undefined;
  return {
    ...match,
    templateId: match.templateId as TemplateId,
    customDomains: (match.customDomains || []) as CustomDomain[],
    profile: match.profile as ProfileData,
    publishedProfile: (match.publishedProfile || undefined) as
      | ProfileData
      | undefined,
    publishedTemplate: (match.publishedTemplate || undefined) as
      | TemplateId
      | undefined,
    createdAt: match.createdAt.toISOString(),
    updatedAt: match.updatedAt.toISOString(),
  };
}

export async function createWebsite(
  userId: string,
  templateId: TemplateId = "daniel-cross",
): Promise<Website> {
  const uRows = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.id, userId))
    .limit(1);
  const user = uRows[0];
  const name = user ? user.name : "Alex Morgan";
  const slug =
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") +
    "-" +
    Math.floor(1000 + Math.random() * 9000);
  const id = "web_" + Math.random().toString(36).substring(2, 11);

  const newWebsite = {
    id,
    userId,
    brandName: user ? `${user.name}'s Portfolio` : "Creative Portfolio",
    subdomainSlug: slug,
    templateId: templateId as string,
    seoTitle: `${name} - Professional Micro-site`,
    seoDesc:
      "Explore my professional experience, projects, education, and social networks.",
    customDomains: [] as any,
    profile: {
      ...MOCK_PROFILE,
      name,
      headline: "Senior Professional",
      summary: "Welcome to my personal micro-site.",
      experience: [],
      education: [],
      skills: [],
      links: [],
    } as any,
    publishedProfile: null,
    publishedTemplate: null,
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.insert(schema.website).values(newWebsite);

  return {
    ...newWebsite,
    templateId: newWebsite.templateId as TemplateId,
    customDomains: newWebsite.customDomains as CustomDomain[],
    profile: newWebsite.profile as ProfileData,
    publishedProfile: undefined,
    publishedTemplate: undefined,
    createdAt: newWebsite.createdAt.toISOString(),
    updatedAt: newWebsite.updatedAt.toISOString(),
  };
}

export async function updateWebsite(
  id: string,
  updates: Partial<Omit<Website, "id" | "userId" | "createdAt">>,
): Promise<Website | undefined> {
  const formattedUpdates: any = {
    ...updates,
    updatedAt: new Date(),
  };

  await db
    .update(schema.website)
    .set(formattedUpdates)
    .where(eq(schema.website.id, id));
  return getWebsiteById(id);
}

export async function deleteWebsite(id: string): Promise<boolean> {
  await db.delete(schema.website).where(eq(schema.website.id, id));
  return true;
}

export interface ChatMessage {
  id: string;
  websiteId: string;
  role: string;
  content: string;
  createdAt: string;
}

export async function getChatHistory(
  websiteId: string,
): Promise<ChatMessage[]> {
  const rows = await db
    .select()
    .from(schema.chatMessage)
    .where(eq(schema.chatMessage.websiteId, websiteId))
    .orderBy(asc(schema.chatMessage.createdAt));

  return rows.map((row) => ({
    id: row.id,
    websiteId: row.websiteId,
    role: row.role,
    content: row.content,
    createdAt: row.createdAt.toISOString(),
  }));
}

export async function saveChatMessage(
  websiteId: string,
  role: "user" | "assistant",
  content: string,
): Promise<ChatMessage> {
  const id = "msg_" + Math.random().toString(36).substring(2, 11);
  const newMessage = {
    id,
    websiteId,
    role,
    content,
    createdAt: new Date(),
  };

  await db.insert(schema.chatMessage).values(newMessage);

  return {
    ...newMessage,
    createdAt: newMessage.createdAt.toISOString(),
  };
}

```

---

## File: `lib/schema.ts`

```typescript
import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

// App data website configuration table
export const website = pgTable("website", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  brandName: text("brand_name").notNull(),
  subdomainSlug: text("subdomain_slug").notNull().unique(),
  templateId: text("template_id").notNull(),
  seoTitle: text("seo_title").notNull(),
  seoDesc: text("seo_desc").notNull(),
  customDomains: jsonb("custom_domains").notNull().default([]), // stores Array<{ id, name, status }>
  profile: jsonb("profile").notNull(), // stores ProfileData
  publishedProfile: jsonb("published_profile"), // stores ProfileData
  publishedTemplate: text("published_template"),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  websites: many(website),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const websiteRelations = relations(website, ({ one, many }) => ({
  user: one(user, {
    fields: [website.userId],
    references: [user.id],
  }),
  chatMessages: many(chatMessage),
}));

// Bug reports submitted via /report-bug page
export const bugReport = pgTable("bug_report", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  userEmail: text("user_email"),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull().default("low"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Upgrade-interest log — records when a user clicks "Upgrade to Pro"
export const upgradeRequest = pgTable("upgrade_request", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  userEmail: text("user_email"),
  plan: text("plan").notNull().default("pro"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Saved AI Chat history messages
export const chatMessage = pgTable("chat_message", {
  id: text("id").primaryKey(),
  websiteId: text("website_id")
    .notNull()
    .references(() => website.id, { onDelete: "cascade" }),
  role: text("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const chatMessageRelations = relations(chatMessage, ({ one }) => ({
  website: one(website, {
    fields: [chatMessage.websiteId],
    references: [website.id],
  }),
}));

```

---

## File: `lib/utils.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

---

## File: `middleware.ts`

```typescript
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // 1. Exclude asset paths and direct API routes
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.includes(".") ||
    url.pathname.startsWith("/logo") ||
    url.pathname.startsWith("/bg")
  ) {
    return NextResponse.next();
  }

  // 2. Identify if host is subdomain or custom domain
  const mainDomains = [
    "linkedpage.io",
    "linkedpage.me",
    "localhost:3000",
    "fusion-starter-529.vercel.app", // production Vercel URL
  ];
  let subdomainSlug: string | null = null;

  for (const domain of mainDomains) {
    if (host.endsWith("." + domain)) {
      subdomainSlug = host.replace("." + domain, "").split(":")[0];
      break;
    }
  }

  // 3. Resolve slug from DB (via fetch API to avoid edge runtime fs limitations)
  let targetSlug: string | null = subdomainSlug;

  if (!targetSlug && !mainDomains.includes(host)) {
    // It's a custom domain, ask resolve-host API route
    try {
      const apiHost = host.includes("localhost")
        ? "http://localhost:3000"
        : `https://${host}`;
      const res = await fetch(
        `${apiHost}/api/websites/resolve-host?host=${encodeURIComponent(host)}`,
      );
      const data = await res.json();
      if (data && data.slug) {
        targetSlug = data.slug;
      }
    } catch (e) {
      console.error("Middleware resolve host fetch error:", e);
    }
  }

  // 4. Perform rewrite if resolved
  if (targetSlug) {
    url.pathname = `/p/${targetSlug}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Configure matcher to limit middleware executions
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

```

---

## File: `next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
    cpus: 2, // Limit CPU worker processes to reduce memory usage on multi-core systems
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.builder.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

```

---

## File: `next-env.d.ts`

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

---

## File: `package.json`

```json
{
  "name": "fusion-starter",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest --run",
    "format.fix": "prettier --write .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@ai-sdk/react": "^3.0.198",
    "@openrouter/ai-sdk-provider": "^2.9.0",
    "@radix-ui/react-slot": "^1.2.5",
    "@types/adm-zip": "^0.5.8",
    "adm-zip": "^0.5.17",
    "ai": "^6.0.196",
    "better-auth": "^1.6.13",
    "class-variance-authority": "^0.7.1",
    "drizzle-orm": "^0.45.2",
    "motion": "^12.40.0",
    "next": "latest",
    "pg": "^8.21.0",
    "playwright": "^1.60.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.16",
    "@types/node": "^24.2.1",
    "@types/pg": "^8.20.0",
    "@types/react": "^18.3.23",
    "@types/react-dom": "^18.3.7",
    "autoprefixer": "^10.4.21",
    "clsx": "^2.1.1",
    "drizzle-kit": "^0.31.10",
    "framer-motion": "^12.23.12",
    "lucide-react": "^0.539.0",
    "postcss": "^8.5.6",
    "prettier": "^3.6.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss": "^3.4.17",
    "tailwindcss-animate": "^1.0.7",
    "tsx": "^4.20.3",
    "typescript": "^5.9.2"
  },
  "packageManager": "pnpm@10.14.0+sha512.ad27a79641b49c3e481a16a805baa71817a04bbe06a38d17e60e2eaee83f6a146c6a688125f5792e48dd5ba30e7da52a5cda4c3992b9ccf333f9ce223af84748",
  "pnpm": {
    "overrides": {
      "kysely": "0.28.0"
    }
  },
  "pkg": {
    "assets": [
      "dist/spa/*"
    ],
    "scripts": [
      "dist/server/**/*.js"
    ]
  }
}

```

---

## File: `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

---

## File: `README.md`

```markdown
# Webild Project Architecture & Knowledge Base

This document outlines the codebase structure, technical architecture, data model, templates, and complex flows (like preview compilation and drag-resizing canvas) to help developers and AI agents understand the project.

---

## 1. Tech Stack Overview
- **Framework**: Next.js (App Router) + React 18
- **Language**: TypeScript
- **Styling**: TailwindCSS 3 + Custom global variable definitions (documented in `design.md`)
- **Animations**: Framer Motion
- **Database**: PostgreSQL (pg pool) + Drizzle ORM
- **Authentication**: Better Auth (integrated session/account middleware)
- **AI Integrations**: Vercel AI SDK (`ai`, `@ai-sdk/react`)

---

## 2. Directory Layout
```
c:\Users\GIGABYTE\Downloads\fusion-starter-529/
├── app/                      # Next.js App Router Pages & APIs
│   ├── api/                  # Backend endpoints (auth, onboarding, websites, chat)
│   ├── dashboard/            # User dashboard showing active website drafts
│   ├── editor/               # Main editor and workspace canvas view
│   ├── onboarding/           # Onboarding setups
│   ├── p/                    # Published pages route (e.g. /p/[slug])
│   └── globals.css           # Global CSS variables and Tailwind styling
├── components/               # Core shared UI components
│   ├── AnimatedSVGs.tsx      # SVG assets
│   ├── Footer.tsx            # Footer
│   ├── Navbar.tsx            # Navigation header
│   └── WizardAnimations.tsx  # Dynamic pure SVG animations for Onboarding Steps 1-6
├── lib/                      # Helper libraries, DB instances, and schemas
│   ├── db.ts                 # Database query operations and connection setup
│   └── schema.ts             # Drizzle PostgreSQL table definitions
├── shared/                   # Shared TypeScript type definitions
│   └── types.ts              # Data structures (ProfileData, Project, Experience, etc.)
├── public/
│   └── templates/            # Raw HTML template layout files (daniel-cross, etc.)
└── design.md                 # Design instructions (fonts, spacing, HSL palette)
```

---

## 3. Database Schema (`lib/schema.ts` & `lib/db.ts`)

### Authentication Tables (Better Auth)
- **`user`**: Store basic profiles (`id`, `name`, `email`, `emailVerified`, `image`, timestamps).
- **`session`**: Track active logins (`id`, `userId`, `expiresAt`, `token`, `ipAddress`, `userAgent`).
- **`account`**: Auth credentials/providers (`id`, `userId`, `providerId`, `password`, tokens).
- **`verification`**: Tokens for email and account verification flows.

### Application Tables
- **`website`**: Core table mapping user portfolios:
  - `id`: Unique prefix id (e.g., `web_xxxxxx`).
  - `userId`: References the authoring user.
  - `brandName`: Display title of the profile.
  - `subdomainSlug`: Unique lowercase sub-address slug (e.g. `yourname`).
  - `templateId`: Active draft layout style ID (e.g., `daniel-cross`).
  - `profile`: A `jsonb` object representing the current draft `ProfileData` (headline, summary, projects, experience, skills, links).
  - `publishedProfile`: A `jsonb` object representing the live published profile data.
  - `publishedTemplate`: Layout style ID of the live published version.
  - `isPublished`: Boolean status flag.
  - `customDomains`: DNS/Domain mappings (`customDomains: Array<{ id, name, status }>`).
- **`chat_message`**: Timeline table saving the AI Chat Assistant conversations (`id`, `websiteId`, `role` [user/assistant], `content`, `createdAt`).
- **`bug_report`**: Logs user bug reports (`id`, `userId`, `subject`, `description`, `severity`).
- **`upgrade_request`**: Records when users express interest in upgrading to the Pro plan.

---

## 4. Editor Workspace & Canvas Mechanics (`app/editor/`)

The editor page (`/editor?id=...`) is divided into two columns: the Collapsible Left Sidebar + pane settings, and the Main Canvas Workspace.

### Left Sidebar & Panes
- **Design Pane (Timeline Wizard)**:
  - **Steps 1-5 (Forms)**: Form wizard asking for Name, Projects, Interests, Skills, and Work Experience.
  - **Step 6 (AI Copy Refinement)**: Compares original copy against AI-polished headline/bio side-by-side.
  - **Step 7 (Template Picker)**: Selects one of the 4 Framer-inspired template styles.
  - **Step 9 (Free-form Editor)**: Activates once setup is finished. Toggles between:
    - **AI Chat Assistant**: Free-form text area allowing the user to request portfolio modifications using the AI model (synced via `fetch('/api/chat')`).
    - **Manual Editor**: Exposes visual form inputs (using `InlineEditor.tsx`) to manually tweak text, project cards, and profile links.
- **Domains Pane (`DomainsPane.tsx`)**: Configures custom domains and lists domain verification steps.
- **Site Settings Pane (`SettingsPane.tsx`)**: Handles SEO titles, SEO descriptions, brand names, and website deletion.

### Main Canvas Workspace (Right Column)
- **Dot-Grid Background**: A Figma-style workspace background using a repeating radial gradient.
- **Wizard Animations (Steps 1-6)**: Displays step-specific, resolution-independent SVG vector animations that dynamically render the user's real-time form inputs (e.g. listing added project cards or experience nodes on step-specific cards).
- **Live Scalable Preview (Steps >= 7)**: Wraps the preview compiled iframe in a centered browser mockup frame:
  - Presets: Four toolbar icons switch modes: Desktop, Tablet (768px), Mobile (375px), Resizable (Custom).
  - Browser Header: Displays macOS window control dots, active subdomain name, and the current width in pixels (dynamically tracked by a window resize and container listener).
  - Left & Right Drag Handles: Allow clicking and dragging the boundaries to resize the canvas dynamically.
  - Interactive transition animation settings: Changes in width animate via spring physics (`stiffness: 380`, `damping: 30`) during preset clicks, but switch to instant responsive feedback (`duration: 0`) while actively dragging.
  - Drag Cover Overlay: Renders an invisible overlay over the preview iframe during drag operations to prevent the iframe from intercepting mouse gestures, preserving a buttery-smooth dragging motion.

---

## 5. Preview Page Compilation (`ProfilePreview.tsx`)

The preview page does not compile react components inside the iframe. Instead, it compiles static raw HTML for efficiency and accuracy:
1. **Raw HTML Fetch**: On mount, `ProfilePreview` fetches the static base HTML from `/public/templates/daniel-cross.html`.
2. **String Replacement Compiler**: The `buildPreviewHtml` function performs target key string replacements on the template content:
   - Replaces placeholders like `>Daniel Cross<` with `>${profile.name}<`.
   - Replaces headline/role tags like `>ui/ux designer<` with the active headline.
   - Dynamically builds the projects grid HTML by mapping the projects array into custom styled project cards.
   - Dynamically constructs the work history ticker from experience company list strings.
   - Rewrites asset urls and email pointers.
   - Safely escapes strings using HTML entity conversions.
3. **Iframe Injection**: The final compiled HTML is injected into the iframe's `srcDoc` attribute.
4. **Fluid Mode Sizing**: When `fluid={true}`, the wrapper and iframe fill exactly `100%` height and width of the parent layout, ensuring that scrolling and drag resizing are properly calculated by the container layout box.

---

## 6. Layout Style Templates
- **Daniel Cross**: Editorial style. Heavy serif headers, bold black borders, outline dividers, stark contrast.
- **Julian Mercer**: Elegance. Warm background (`#FAF8F5`), lightweight serif fonts, muted dividers, clean tabular details.
- **Link Hunt**: Bio links. Centered portrait, large profile icons, clean cards, minimal background colors.
- **Biobricks**: Bento grid. Organizes sections (about, work, links) inside clean white rounded cards layout.

```

---

## File: `shared/api.ts`

```typescript
/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

```

---

## File: `shared/types.ts`

```typescript
// Shared types for LinkedPage — used by client pages and (future) server routes

export interface ProfileExperience {
  title: string;
  company: string;
  duration: string;
  description: string;
  logo?: string;
}

export interface ProfileEducation {
  degree: string;
  school: string;
  year: string;
}

export interface ProfileSkill {
  name: string;
}

export interface ProfileLink {
  label: string;
  url: string;
  icon?: "linkedin" | "twitter" | "github" | "website" | "email" | "other";
}

export interface CustomBlock {
  id: string;
  type: string;
  title: string;
  html: string;
}

export interface ProfileProject {
  title: string;
  description: string;
  link?: string;
  image?: string;
}

export interface ProfileData {
  name: string;
  headline: string;
  location?: string;
  summary: string;
  avatarUrl: string;
  bannerUrl?: string;
  connections?: string;
  experience: ProfileExperience[];
  education: ProfileEducation[];
  skills: ProfileSkill[];
  links: ProfileLink[];
  projects?: ProfileProject[];
  interests?: string;
  // raw LinkedIn URL that was scraped
  linkedinUrl: string;
  importedFromZip?: boolean;
  // AI-generated dynamic blocks
  blocks?: CustomBlock[];

  // Custom template elements
  aboutPhotoUrl?: string;
  signatureUrl?: string;
  footerBannerUrl?: string;
  servicesTitle?: string;
  services?: Array<{ title: string; price: string; description: string }>;
  servicesCta?: { title: string; text: string; buttonText: string; buttonUrl: string };
  processTitle?: string;
  processes?: Array<{ stepTag: string; title: string; description: string }>;
  testimonialsTitle?: string;
  testimonials?: Array<{ quote: string; name: string; role: string; avatarUrl: string }>;
  themeColors?: {
    primaryBg?: string;
    accentColor?: string;
    cardBg?: string;
    textPrimary?: string;
    textMuted?: string;
  };
  // Complete template customization fields
  heroBadgeText?: string;
  heroSubheadline?: string;
  heroCtaText?: string;
  heroCtaUrl?: string;
  heroRatingText?: string;
  servicesLabel?: string;
  aboutLabel?: string;
  brandsLabel?: string;
  projectsLabel?: string;
  projectsSubtitle?: string;
  projectsExploreText?: string;
  projectsExploreUrl?: string;
  processLabel?: string;
  testimonialsLabel?: string;
  footerLabel?: string;
  // Hero Greeting words
  heroGreetingStart?: string;
  heroGreetingName?: string;
  heroGreetingEnd?: string;
  // Status and follow labels
  statusText?: string;
  followMeLabel?: string;
  // Navigation links labels
  navHomeText?: string;
  navAboutText?: string;
  navProjectsText?: string;
  navContactText?: string;
  // Footer credit
  footerCreditText?: string;
  footerCreditName?: string;
  phone?: string;
  email?: string;
  builtInFramerText?: string;
  builtInFramerUrl?: string;
}

export type TemplateId = "daniel-cross";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  previewBg: string;
  accent: string;
  dark: boolean;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "daniel-cross",
    name: "Daniel Cross",
    description: "Premium Framer portfolio template with modern typography and sleek aesthetics.",
    previewBg: "#e9e6e2",
    accent: "#4a3429",
    dark: false,
  },
];

// Mock profile for demo / skeleton purposes
export const MOCK_PROFILE: ProfileData = {
  name: "Alex Morgan",
  headline: "Senior Product Designer · Building for humans",
  location: "San Francisco, CA",
  summary:
    "I design products that people actually love using. 8 years working across fintech, healthcare, and B2B SaaS. Currently open to senior IC and staff roles. Previously at Stripe, Linear, and Figma.",
  avatarUrl: "https://i.pravatar.cc/300?img=47",
  bannerUrl: "",
  connections: "2.4k",
  experience: [
    {
      title: "Senior Product Designer",
      company: "Stripe",
      duration: "2022 – Present · 2 yrs",
      description:
        "Led design for Stripe Radar fraud detection. Reduced false positive rate by 23%.",
      logo: "",
    },
    {
      title: "Product Designer",
      company: "Linear",
      duration: "2020 – 2022 · 2 yrs",
      description:
        "Designed the issue tracker, cycles, and roadmap features from 0 to 1.",
      logo: "",
    },
    {
      title: "UI Designer",
      company: "Figma",
      duration: "2018 – 2020 · 2 yrs",
      description: "Early design team hire. Shipped community, plugins, and multiplayer.",
      logo: "",
    },
  ],
  education: [
    {
      degree: "B.Des in Interaction Design",
      school: "California College of the Arts",
      year: "2018",
    },
  ],
  skills: [
    { name: "Product Design" },
    { name: "Figma" },
    { name: "User Research" },
    { name: "Design Systems" },
    { name: "Prototyping" },
    { name: "TypeScript" },
    { name: "React" },
    { name: "Motion Design" },
  ],
  links: [
    { label: "LinkedIn", url: "#", icon: "linkedin" },
    { label: "Twitter", url: "#", icon: "twitter" },
    { label: "GitHub", url: "#", icon: "github" },
    { label: "alexmorgan.design", url: "#", icon: "website" },
  ],
  linkedinUrl: "https://linkedin.com/in/alexmorgan",
};

export const BLANK_PROFILE: ProfileData = {
  name: "Your Name",
  headline: "Your Professional Headline",
  location: "Your Location",
  summary: "Write a short bio or summary of your professional background here.",
  avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=User&backgroundColor=8db8ff",
  bannerUrl: "",
  connections: "",
  experience: [
    {
      title: "Your Role",
      company: "Your Company",
      duration: "Duration",
      description: "Describe your responsibilities and achievements in this role.",
      logo: "",
    }
  ],
  education: [
    {
      degree: "Your Degree",
      school: "Your School",
      year: "Year",
    }
  ],
  skills: [
    { name: "Skill 1" },
    { name: "Skill 2" },
  ],
  links: [
    { label: "LinkedIn", url: "#", icon: "linkedin" },
    { label: "Website", url: "#", icon: "website" },
  ],
  linkedinUrl: "",
};

export interface ScrapeResponse {
  success: boolean;
  data?: ProfileData;
  error?: string;
}

export interface PublishResponse {
  success: boolean;
  url?: string;
  slug?: string;
  error?: string;
}

```

---

## File: `skills-lock.json`

```json
{
  "version": 1,
  "skills": {
    "agent-browser": {
      "source": "vercel-labs/agent-browser",
      "sourceType": "github",
      "skillPath": "skills/agent-browser/SKILL.md",
      "computedHash": "228f87d57035100d9dc6efcfc05aafd4b6e3962adacaa04b8217ab2fadb15dc8"
    },
    "ai-sdk": {
      "source": "vercel/ai",
      "sourceType": "github",
      "skillPath": "skills/use-ai-sdk/SKILL.md",
      "computedHash": "2249889eb47ef0f61c4dba4cf2afe01c1c8dd793bb4c24230347c1ab909bb7dd"
    },
    "better-auth": {
      "source": "secondsky/claude-skills",
      "sourceType": "github",
      "skillPath": "plugins/better-auth/skills/better-auth/SKILL.md",
      "computedHash": "de3b1f9cae922ca43f2aced878c3668086c2cf669da43276178679df3a778f31"
    },
    "better-auth-best-practices": {
      "source": "better-auth/skills",
      "sourceType": "github",
      "skillPath": "better-auth/best-practices/SKILL.md",
      "computedHash": "9ab075b5061be2a5f299c10505667345cc1ec76e8de4120901cfd586643e776f"
    },
    "brandkit": {
      "source": "Leonxlnx/taste-skill",
      "sourceType": "github",
      "skillPath": "skills/brandkit/SKILL.md",
      "computedHash": "735007879f5110aeae1e981a53fe74a12afde70347f9773dacd50e4697a091bf"
    },
    "create-auth-skill": {
      "source": "better-auth/skills",
      "sourceType": "github",
      "skillPath": "better-auth/create-auth/SKILL.md",
      "computedHash": "393e8d2d795fa5797c9a4e0665f29183ea2e140233db59746d510340a10456e6"
    },
    "design-taste-frontend": {
      "source": "Leonxlnx/taste-skill",
      "sourceType": "github",
      "skillPath": "skills/taste-skill/SKILL.md",
      "computedHash": "899b84384f74f540ea5284d9b2e9234e050998b42eacc805410b518d4226c0b3"
    },
    "design-taste-frontend-v1": {
      "source": "Leonxlnx/taste-skill",
      "sourceType": "github",
      "skillPath": "skills/taste-skill-v1/SKILL.md",
      "computedHash": "8d59c96751feacf88f341a43151eae6f4fd748978884c4552293b8841573d776"
    },
    "find-skills": {
      "source": "vercel-labs/skills",
      "sourceType": "github",
      "skillPath": "skills/find-skills/SKILL.md",
      "computedHash": "9e1c8b3103f92fa8092568a44fe64858de7c5c9dc65ce4bea8f168080e889cfd"
    },
    "full-output-enforcement": {
      "source": "Leonxlnx/taste-skill",
      "sourceType": "github",
      "skillPath": "skills/output-skill/SKILL.md",
      "computedHash": "524f7c7950c3fde726101613f630140411c7d080e63be718687f4b38f919be81"
    },
    "glassmorphism": {
      "source": "ainergiz/design-inspirations",
      "sourceType": "github",
      "skillPath": ".claude/skills/glassmorphism/SKILL.md",
      "computedHash": "96b57506515153cbca213dc6a38588e1698591283de67c733c9caa29eec7fe12"
    },
    "gpt-taste": {
      "source": "Leonxlnx/taste-skill",
      "sourceType": "github",
      "skillPath": "skills/gpt-tasteskill/SKILL.md",
      "computedHash": "7bd1bfdda0e51016ca222693401a65fc0dd9bf9487e0bd5b1740ba510f6f963a"
    },
    "high-end-visual-design": {
      "source": "Leonxlnx/taste-skill",
      "sourceType": "github",
      "skillPath": "skills/soft-skill/SKILL.md",
      "computedHash": "f730e4132775f13eea19e3dc39afc6bb453cfc0498872b127ad8f0d47cfd802d"
    },
    "image-to-code": {
      "source": "Leonxlnx/taste-skill",
      "sourceType": "github",
      "skillPath": "skills/image-to-code-skill/SKILL.md",
      "computedHash": "3d2ac14d956fdafc5500d2108b90895e134d847f9f199e7f1d18bf1f814cf7c8"
    },
    "imagegen-frontend-mobile": {
      "source": "Leonxlnx/taste-skill",
      "sourceType": "github",
      "skillPath": "skills/imagegen-frontend-mobile/SKILL.md",
      "computedHash": "7c1d1dc59cd0df4063b8621af543bf5dea1d576b261507e17b0323c69680b048"
    },
    "imagegen-frontend-web": {
      "source": "Leonxlnx/taste-skill",
      "sourceType": "github",
      "skillPath": "skills/imagegen-frontend-web/SKILL.md",
      "computedHash": "27255c7c50181e58add156b2aa2bd5325285b85f04027e4c8b73742d98d7be0a"
    },
    "industrial-brutalist-ui": {
      "source": "Leonxlnx/taste-skill",
      "sourceType": "github",
      "skillPath": "skills/brutalist-skill/SKILL.md",
      "computedHash": "e66e5a2a8b73cef79ab6546459c665e8b983645689c5f3772f7eed8b9f1e8e0e"
    },
    "minimalist-ui": {
      "source": "Leonxlnx/taste-skill",
      "sourceType": "github",
      "skillPath": "skills/minimalist-skill/SKILL.md",
      "computedHash": "7e88897e0371184e97a82b8d9ef080323c13f21eb067b58ef71eb05173a08ac2"
    },
    "optimize-for-ai": {
      "source": "calm-north/seojuice-skills",
      "sourceType": "github",
      "skillPath": "skills/optimize-for-ai/SKILL.md",
      "computedHash": "df3c9173a6469d99fcf07b29dd28aa9073d17340246b032dd16715c61c02741e"
    },
    "performance": {
      "source": "addyosmani/web-quality-skills",
      "sourceType": "github",
      "skillPath": "skills/performance/SKILL.md",
      "computedHash": "646931a3af896ae12a3cad3d762668cb6487fe3ab179daf8fdc974fb79acfe49"
    },
    "redesign-existing-projects": {
      "source": "Leonxlnx/taste-skill",
      "sourceType": "github",
      "skillPath": "skills/redesign-skill/SKILL.md",
      "computedHash": "47eced3e960a2c961d3cbee11fa1216264f589344b586a5cbd03967cd6b9c54b"
    },
    "stitch-design-taste": {
      "source": "Leonxlnx/taste-skill",
      "sourceType": "github",
      "skillPath": "skills/stitch-skill/SKILL.md",
      "computedHash": "c96b580192b34167efa01f460bbc669ff4315cf97f3cf6ff85ded8029aa720b8"
    }
  }
}

```

---

## File: `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          "Inter Tight",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        inter: [
          "Inter Tight",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Webild Cloud Editorial brand colors
        webild: {
          primary: "#2A2A2F",
          secondary: "#F3F3F3",
          tertiary: "#FBFBFB",
          neutral: "#FFFFFF",
          surface: "#FFFFFF",
          "surface-muted": "#F7F7F7",
          "on-surface": "#000000",
          "on-surface-muted": "#171717",
          border: "#E6E6E6",
          accent: "#8DB8FF",
          "accent-soft": "#DCEAFF",
          "accent-green": "#d4ff66",
          "accent-green-dark": "#d4ff66",
          success: "#d4ff66",
          error: "#E45A5A",
        },
        // Keep linkedpage mapped to Webild for compatibility
        linkedpage: {
          blue: "#8DB8FF",
          dark: "#2A2A2F",
          "dark-card": "#FBFBFB",
          "dark-card2": "#F3F3F3",
          light: "#FBFBFB",
          border: "#E6E6E6",
          text: "#171717",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "13px",
      },
      boxShadow: {
        sm: "0px 6px 10px -6px rgba(0,0,0,0.09)",
        DEFAULT: "0px 6px 10px -6px rgba(0,0,0,0.09)",
        md: "0px 6px 10px -6px rgba(0,0,0,0.09)",
        lg: "0px 6px 10px -6px rgba(0,0,0,0.09)",
        xl: "0px 6px 10px -6px rgba(0,0,0,0.09)",
        "2xl": "0px 6px 10px -6px rgba(0,0,0,0.09)",
      },
      maxWidth: {
        content: "1536px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scroll-slow": "scroll 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

```

---

## File: `test-playwright.ts`

```typescript
import { chromium } from "playwright";

async function test() {
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  console.log("Browser launched.");
  await browser.close();
  console.log("Done.");
}

test().catch(console.error);

```

---

## File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@shared/*": ["./shared/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "shared/**/*",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules", ".next", "dist", "client"]
}

```

---


