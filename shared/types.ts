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
  // raw LinkedIn URL that was scraped
  linkedinUrl: string;
}

export type TemplateId = "minimal-card" | "bento-grid" | "full-scroll" | "dark";

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
    id: "minimal-card",
    name: "Minimal Card",
    description: "Clean, single-card profile. Notion-inspired whitespace.",
    previewBg: "#FFFFFF",
    accent: "#8DB8FF",
    dark: false,
  },
  {
    id: "bento-grid",
    name: "Bento Grid",
    description: "Modular bento layout with skill chips and experience tiles.",
    previewBg: "#FBFBFB",
    accent: "#8DFFB3",
    dark: false,
  },
  {
    id: "full-scroll",
    name: "Full Scroll",
    description: "Long-form scroll with rich sections for experience & work.",
    previewBg: "#F3F3F3",
    accent: "#8DB8FF",
    dark: false,
  },
  {
    id: "dark",
    name: "Dark Mode",
    description: "Sleek dark-themed personal page with subtle glow accents.",
    previewBg: "#131316",
    accent: "#8DB8FF",
    dark: true,
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
