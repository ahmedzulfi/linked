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
