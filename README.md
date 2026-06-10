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
