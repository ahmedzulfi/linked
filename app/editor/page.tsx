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
  Palette,
  Inbox,
  FileText,
  Eye,
  EyeOff,
  Pencil,
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

const SUGGESTIONS = [
  "Start",
  "Make my headline more impactful",
  "Shorten my summary",
  "Switch to Julian Mercer style",
];

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
  return text.replace(/\[MILESTONE:[A-Z_]+\]/g, "").trim();
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
        content: "Welcome to Webild! I've loaded your LinkedIn data. Let's customize your profile step-by-step. Press 'Start' or type 'start' below to begin!"
      }
    ];
  });
  const [chatInput, setChatInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>(SUGGESTIONS);
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
          setCustomMessages([
            {
              id: "welcome",
              role: "assistant",
              content: "Hi! I'm Webild, your AI website builder companion. I will guide you step-by-step to create your premium portfolio page. Let's start with the basics—what's your name, and what is your professional role?"
            }
          ]);
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    };
    fetchChatHistory();
  }, [websiteId]);

  // Load saved onboarding step from sessionStorage or url parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isOnboardingFlow = searchParams.get("onboarding") === "true";
      if (!isOnboardingFlow) {
        // If not in the onboarding flow, default straight to free-form editor (Step 12)
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
  }, [searchParams]);

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

  // Dispatch free-form messages to backend AI route
  const sendChatMessage = async (text?: string) => {
    const msg = text ?? chatInput.trim();
    if (!msg) return;
    if (!text) setChatInput("");
    setSuggestions([]); // clear suggestions while thinking

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

      if (data.suggestions && data.suggestions.length > 0) {
        setSuggestions(data.suggestions);
      } else {
        setSuggestions(SUGGESTIONS);
      }

      if (data.template) {
        selectTemplate(data.template);
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
                  className={`w-full flex items-center h-[38px] px-2 rounded-[10px] transition-all duration-150 ${
                    activeNav === i
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
              
              {/* Conversational timeline rendering */}
              {customMessages.map((msg) => {
                const cleanContent = cleanMessageContent(msg.content);
                const hasProjectsMilestone = msg.content.includes("[MILESTONE:PROJECTS]");
                const hasServicesMilestone = msg.content.includes("[MILESTONE:SERVICES]");
                const hasImagesMilestone = msg.content.includes("[MILESTONE:IMAGES]");

                return (
                  <div key={msg.id} className="w-full flex flex-col gap-2.5">
                    {msg.role === "user" ? (
                      <div className="w-full flex justify-end items-start font-inter animate-in fade-in duration-200">
                        <div className="max-w-[85%] bg-[#E1F3FE] border border-[#3B82F6]/10 rounded-[18px] px-4 py-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.05)]">
                          <p className="text-slate-800 text-[16px] leading-[26px] font-normal break-words max-w-full font-sans">
                            {removeEmojis(msg.content)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex flex-col justify-start items-start gap-2.5 font-inter animate-in fade-in duration-200">
                        <div className="flex items-center gap-2 select-none">
                          <img src="/logoicon.png" alt="Logo" className="h-5 w-auto object-contain" />
                          <span className="font-semibold text-[13.5px] text-slate-700">Webild</span>
                        </div>
                        <div className="max-w-[85%] bg-white border border-[#E6E6E6] rounded-[18px] px-4 py-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.05)] text-[#18181B] text-[16px] leading-[26px] font-normal break-words font-sans">
                          {removeEmojis(cleanContent)}
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

                        {hasImagesMilestone && (
                          <div className="mt-1 ml-7 flex flex-col gap-2 w-full max-w-[85%]">
                            <div className="backdrop-blur-md bg-white/40 border border-white/40 rounded-2xl p-5 shadow-[0_8px_32px_0_rgba(31,38,135,0.04)] space-y-4 text-left font-sans">
                              <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 text-slate-800" />
                                <span className="font-['Inter_Tight'] font-semibold text-slate-900 tracking-tight text-sm">Upload Images & Visuals</span>
                              </div>
                              
                              <div className="space-y-3">
                                {[
                                  { id: "avatarUrl", label: "Profile Avatar Image", value: editedProfile?.avatarUrl },
                                  { id: "bannerUrl", label: "Hero Portrait Photo", value: editedProfile?.bannerUrl || editedProfile?.avatarUrl },
                                  { id: "aboutPhotoUrl", label: "About Section Portrait", value: editedProfile?.aboutPhotoUrl }
                                ].map((imgItem) => (
                                  <div key={imgItem.id} className="bg-white/50 backdrop-blur-xs border border-white/60 rounded-xl p-3.5 space-y-3 shadow-xs">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">{imgItem.label}</span>
                                      {imgItem.value && (
                                        <span className="text-[9px] text-[#369762] bg-[#8DFFB3]/25 border border-[#8DFFB3]/30 px-2 py-0.5 rounded-full font-semibold">Configured</span>
                                      )}
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                      {imgItem.value ? (
                                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-250 shadow-xs shrink-0 bg-slate-50 flex items-center justify-center">
                                          <img src={imgItem.value} className="w-full h-full object-cover" />
                                        </div>
                                      ) : (
                                        <div className="w-14 h-14 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 shrink-0 bg-slate-50/50">
                                          <Palette className="w-5 h-5 text-slate-400 stroke-[1.25]" />
                                        </div>
                                      )}
                                      
                                      <div className="flex-1 min-w-0 flex flex-col gap-2">
                                        <input
                                          type="text"
                                          value={imgItem.value || ""}
                                          onChange={(e) => updateField(imgItem.id as any, e.target.value)}
                                          placeholder="Paste URL..."
                                          className="h-8 text-xs bg-white/70 border border-slate-200 rounded-lg px-2.5 w-full focus:bg-white focus:border-slate-800 outline-none text-slate-800 font-mono shadow-inner transition-all"
                                        />
                                        
                                        <div className="flex items-center gap-2">
                                          <input
                                            type="file"
                                            id={`file-upload-${imgItem.id}`}
                                            accept="image/*"
                                            onChange={(e) => {
                                              const file = e.target.files?.[0];
                                              if (!file) return;
                                              if (file.size > 2 * 1024 * 1024) {
                                                toast.error("Image file is too large (max 2MB)");
                                                return;
                                              }
                                              const reader = new FileReader();
                                              reader.onload = (event) => {
                                                const base64 = event.target?.result as string;
                                                updateField(imgItem.id as any, base64);
                                                toast.success(`${imgItem.label} updated!`);
                                              };
                                              reader.readAsDataURL(file);
                                            }}
                                            className="hidden"
                                          />
                                          <button
                                            onClick={() => document.getElementById(`file-upload-${imgItem.id}`)?.click()}
                                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-slate-900 text-[10px] font-bold border-none transition-all duration-150 cursor-pointer"
                                          >
                                            Upload File
                                          </button>
                                          {imgItem.value && (
                                            <button
                                              onClick={() => updateField(imgItem.id as any, "")}
                                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 text-[10px] font-bold border-none transition-all duration-150 cursor-pointer"
                                            >
                                              Clear
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
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
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendChatMessage(s)}
                    className="flex-shrink-0 h-9 px-4 bg-white hover:bg-neutral-50 border border-neutral-200/60 rounded-full text-[13px] font-medium text-slate-800 transition-[background-color,transform] duration-150 whitespace-nowrap shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] cursor-pointer active:scale-[0.95]"
                  >
                    {s}
                  </button>
                ))}
              </div>

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
                  className={`flex items-center gap-2 h-8 px-3 text-sm font-medium rounded-lg transition-colors border ${
                    isSelectionMode
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
                  className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${
                    previewMode === "desktop"
                      ? "bg-white shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] text-[#2A2A2F]"
                      : "text-[#171717]/40 hover:text-[#2A2A2F]"
                  }`}
                  title="Desktop preview"
                >
                  <Monitor className="w-[14px] h-[14px]" />
                </button>
                <button
                  onClick={() => setPreviewMode("tablet")}
                  className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${
                    previewMode === "tablet"
                      ? "bg-white shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] text-[#2A2A2F]"
                      : "text-[#171717]/40 hover:text-[#2A2A2F]"
                  }`}
                  title="Tablet preview"
                >
                  <Tablet className="w-[14px] h-[14px]" />
                </button>
                <button
                  onClick={() => setPreviewMode("mobile")}
                  className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${
                    previewMode === "mobile"
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
                  className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${
                    previewMode === "resizable"
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
