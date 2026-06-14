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
  "Make my headline more impactful",
  "Shorten my summary",
  "Switch to Julian Mercer style",
  "Add a new project named Finance App",
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
  const [isThinking, setIsThinking] = useState(false);

  // Selection mode states for the visual customizer
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
    if (!websiteId || currentStep !== 12) return;
    const fetchChatHistory = async () => {
      try {
        const res = await fetch(`/api/chat?websiteId=${websiteId}`);
        const data = await res.json();
        if (res.ok && data.success && data.history) {
          const formatted = data.history.map((msg: any) => ({
            id: msg.id || String(msg.createdAt),
            role: msg.role as "user" | "assistant",
            content: msg.content,
          }));
          setCustomMessages(formatted);
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    };
    fetchChatHistory();
  }, [websiteId, currentStep]);

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
      }

      if (data.profileUpdates) {
        for (const [k, v] of Object.entries(data.profileUpdates)) {
          updateField(k as any, v as any);
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
          className="h-full w-[510px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col justify-between relative z-20 font-inter shadow-xs"
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
            <div className="flex flex-col justify-between h-full w-full">
              {/* Title Header */}
              <div className="h-[54px] border-b border-[#E6E6E6]/40 px-6 flex items-center shrink-0 bg-white select-none">
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
                      onClick={() => router.push("/onboarding")}
                      className="text-[11px] font-semibold text-neutral-400 hover:text-neutral-700 transition-colors border border-[#E6E6E6]/60 px-2.5 py-1 rounded-lg"
                    >
                      Restart
                    </button>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-[#8DFFB3]/25 text-[#369762] rounded-md">
                      Editor Mode
                    </span>
                  </div>
                </div>
              </div>

          {/* Scrollable Wizard History */}
          <div className="flex-1 overflow-y-auto px-6 py-4" style={{ scrollbarWidth: "none" }}>
            <div className="space-y-6 flex flex-col w-full py-4">
              
              {/* Conversational timeline rendering (Steps 1-12) */}
              {customMessages.map((msg) => (
                <div key={msg.id} className="w-full flex flex-col gap-2.5">
                  {msg.role === "user" ? (
                    <div className="w-full flex justify-end items-start font-inter animate-in fade-in duration-200">
                      <div className="max-w-[85%] bg-[#E1F3FE] border border-[#3B82F6]/10 rounded-[18px] px-4 py-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.05)]">
                        <p className="text-slate-800 text-[16px] leading-[26px] font-normal break-words max-w-full">
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
                      <div className="max-w-[85%] bg-white border border-[#E6E6E6] rounded-[18px] px-4 py-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.05)] text-[#18181B] text-[16px] leading-[26px] font-normal break-words">
                        {removeEmojis(msg.content)}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Thinking / Dots loader */}
              {isThinking && (
                <div className="w-full flex flex-col justify-start items-start gap-2.5 font-inter animate-pulse">
                  <div className="flex items-center gap-2 select-none">
                    <img src="/logoicon.png" alt="Logo" className="h-5 w-auto object-contain" />
                    <span className="font-semibold text-[13.5px] text-slate-700">Webild</span>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-[18px] border border-[#EAEAEA] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.05)] flex items-center justify-center">
                    <div className="flex items-center gap-[3px] px-1 py-0.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-[5px] h-[5px] rounded-full bg-slate-400 animate-bounce"
                          style={{ animationDelay: `${i * 0.18}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Minimalist-UI Progress Steps Checklist */}
              {currentStep <= 11 && (
                <div className="pt-4 border-t border-[#EAEAEA] space-y-4">
                  <div className="flex items-center gap-2 select-none mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest font-mono">Onboarding Setup Checklist</span>
                  </div>
                  {[
                    { step: 1, label: "Basics & Profile Identity" },
                    { step: 2, label: "Hero Greeting & Status" },
                    { step: 3, label: "Hero Headline & Value Prop" },
                    { step: 4, label: "About Me Biography" },
                    { step: 5, label: "Client Logos Ticker List" },
                    { step: 6, label: "Portfolio Grid Projects" },
                    { step: 7, label: "Services Grid" },
                    { step: 8, label: "Services CTA Consultation" },
                    { step: 9, label: "Creative Process Steps" },
                    { step: 10, label: "Client Testimonials" },
                    { step: 11, label: "Contact Footer & Socials" }
                  ].map((stepItem) => {
                    const isActive = currentStep === stepItem.step;
                    const isCompleted = currentStep > stepItem.step;
                    return (
                      <div
                        key={stepItem.step}
                        className={cn(
                          "border rounded-xl p-4 transition-all duration-200 bg-white",
                          isActive 
                            ? "border-[#3B82F6] shadow-[0_4px_20px_rgba(59,130,246,0.04)]" 
                            : "border-[#EAEAEA] opacity-65"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            {isCompleted ? (
                              <span className="w-5 h-5 rounded-full bg-[#EDF3EC] text-[#346538] flex items-center justify-center font-bold text-xs font-mono">✓</span>
                            ) : (
                              <span className={cn(
                                "w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs font-mono",
                                isActive ? "bg-[#E1F3FE] text-[#1F6C9F]" : "bg-neutral-100 text-neutral-400"
                              )}>
                                {stepItem.step}
                              </span>
                            )}
                            <span className={cn("text-xs font-bold font-sans", isActive ? "text-slate-800" : "text-slate-600")}>
                              {stepItem.label}
                            </span>
                          </div>
                          {isActive && (
                            <span className="text-[10px] uppercase font-bold text-[#3B82F6] font-mono tracking-wider animate-pulse">
                              Active
                            </span>
                          )}
                        </div>

                        {/* Display values gathered so far for this step */}
                        {isActive && (
                          <div className="mt-3.5 space-y-2 text-xs font-medium text-slate-700 bg-slate-50/50 p-3 rounded-lg border border-[#EAEAEA] animate-in fade-in duration-200">
                            {stepItem.step === 1 && (
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px] text-slate-600">
                                <div>Name:</div><div className="text-[#18181B] font-bold">{editedProfile?.name || "Pending..."}</div>
                                <div>Headline:</div><div className="text-[#18181B] truncate">{editedProfile?.headline || "Pending..."}</div>
                                <div>Location:</div><div className="text-[#18181B]">{editedProfile?.location || "Pending..."}</div>
                                <div>Avatar Photo:</div><div className="text-[#18181B] truncate">{editedProfile?.avatarUrl || "Pending..."}</div>
                              </div>
                            )}
                            {stepItem.step === 2 && (
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px] text-slate-600">
                                <div>Greeting Badge:</div><div className="text-[#18181B] font-bold">{editedProfile?.heroBadgeText || "Pending..."}</div>
                                <div>Greeting Start:</div><div className="text-[#18181B]">{editedProfile?.heroGreetingStart || "Pending..."}</div>
                                <div>Greeting End:</div><div className="text-[#18181B]">{editedProfile?.heroGreetingEnd || "Pending..."}</div>
                                <div>Availability Status:</div><div className="text-[#18181B]">{editedProfile?.statusText || "Pending..."}</div>
                              </div>
                            )}
                            {stepItem.step === 3 && (
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px] text-slate-600">
                                <div>Value Prop:</div><div className="text-[#18181B] truncate">{editedProfile?.heroSubheadline || "Pending..."}</div>
                                <div>Rating Text:</div><div className="text-[#18181B]">{editedProfile?.heroRatingText || "Pending..."}</div>
                                <div>Follow Label:</div><div className="text-[#18181B]">{editedProfile?.followMeLabel || "Pending..."}</div>
                              </div>
                            )}
                            {stepItem.step === 4 && (
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px] text-slate-600">
                                <div>About Label:</div><div className="text-[#18181B] font-bold">{editedProfile?.aboutLabel || "Pending..."}</div>
                                <div>Bio details:</div><div className="text-[#18181B] truncate">{editedProfile?.summary || "Pending..."}</div>
                                <div>About Photo URL:</div><div className="text-[#18181B] truncate">{editedProfile?.aboutPhotoUrl || "Pending..."}</div>
                                <div>Signature URL:</div><div className="text-[#18181B] truncate">{editedProfile?.signatureUrl || "Pending..."}</div>
                              </div>
                            )}
                            {stepItem.step === 5 && (
                              <div className="space-y-1 font-mono text-[11px] text-slate-600">
                                <div>Marquee Header: <span className="text-[#18181B] font-bold">{editedProfile?.brandsLabel || "Pending..."}</span></div>
                                <div>Client Companies: <span className="text-[#18181B] font-bold">{(editedProfile?.experience || []).map(e => e.company).join(", ") || "None yet"}</span></div>
                              </div>
                            )}
                            {stepItem.step === 6 && (
                              <div className="space-y-1 font-mono text-[11px] text-slate-600">
                                <div>Projects Label: <span className="text-[#18181B] font-bold">{editedProfile?.projectsLabel || "Pending..."}</span></div>
                                <div>Projects Subtitle: <span className="text-[#18181B]">{editedProfile?.projectsSubtitle || "Pending..."}</span></div>
                                <div>Projects Count: <span className="text-[#18181B] font-bold">{(editedProfile?.projects || []).length} items</span></div>
                              </div>
                            )}
                            {stepItem.step === 7 && (
                              <div className="space-y-1 font-mono text-[11px] text-slate-600">
                                <div>Services Label: <span className="text-[#18181B] font-bold">{editedProfile?.servicesLabel || "Pending..."}</span></div>
                                <div>Services Catchphrase: <span className="text-[#18181B]">{editedProfile?.servicesTitle || "Pending..."}</span></div>
                                <div>Services Count: <span className="text-[#18181B] font-bold">{(editedProfile?.services || []).length} items</span></div>
                              </div>
                            )}
                            {stepItem.step === 8 && (
                              <div className="space-y-1 font-mono text-[11px] text-slate-600">
                                <div>Consultation Title: <span className="text-[#18181B] font-bold">{editedProfile?.servicesCta?.title || "Pending..."}</span></div>
                                <div>Consultation Button: <span className="text-[#18181B]">{editedProfile?.servicesCta?.buttonText || "Pending..."}</span></div>
                              </div>
                            )}
                            {stepItem.step === 9 && (
                              <div className="space-y-1 font-mono text-[11px] text-slate-600">
                                <div>Process Label: <span className="text-[#18181B] font-bold">{editedProfile?.processLabel || "Pending..."}</span></div>
                                <div>Process Title: <span className="text-[#18181B]">{editedProfile?.processTitle || "Pending..."}</span></div>
                                <div>Process steps count: <span className="text-[#18181B] font-bold">{(editedProfile?.processes || []).length} items</span></div>
                              </div>
                            )}
                            {stepItem.step === 10 && (
                              <div className="space-y-1 font-mono text-[11px] text-slate-600">
                                <div>Reviews Label: <span className="text-[#18181B] font-bold">{editedProfile?.testimonialsLabel || "Pending..."}</span></div>
                                <div>Reviews Title: <span className="text-[#18181B]">{editedProfile?.testimonialsTitle || "Pending..."}</span></div>
                                <div>Testimonials Count: <span className="text-[#18181B] font-bold">{(editedProfile?.testimonials || []).length} items</span></div>
                              </div>
                            )}
                            {stepItem.step === 11 && (
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px] text-slate-600 font-normal">
                                <div>Footer Label:</div><div className="text-[#18181B] font-bold">{editedProfile?.footerLabel || "Pending..."}</div>
                                <div>Email:</div><div className="text-[#18181B] truncate">{editedProfile?.email || "Pending..."}</div>
                                <div>Phone:</div><div className="text-[#18181B]">{editedProfile?.phone || "Pending..."}</div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Display Completed state summary */}
                        {isCompleted && (
                          <div className="mt-2 text-[11px] font-mono text-slate-500 bg-slate-50/30 p-2.5 rounded-lg border border-[#EAEAEA]/60">
                            {stepItem.step === 1 && `BASICS: ${editedProfile?.name} • ${editedProfile?.headline}`}
                            {stepItem.step === 2 && `HERO: ${editedProfile?.heroGreetingStart} "${editedProfile?.heroBadgeText}"`}
                            {stepItem.step === 3 && `HEADLINE: "${editedProfile?.heroSubheadline}"`}
                            {stepItem.step === 4 && `ABOUT: ${editedProfile?.aboutLabel} • Bio details`}
                            {stepItem.step === 5 && `EXPERIENCE: ${(editedProfile?.experience || []).map(e => e.company).join(", ")}`}
                            {stepItem.step === 6 && `PROJECTS: ${(editedProfile?.projects || []).length} items configured`}
                            {stepItem.step === 7 && `SERVICES: ${(editedProfile?.services || []).length} items configured`}
                            {stepItem.step === 8 && `CONSULTATION: ${editedProfile?.servicesCta?.title}`}
                            {stepItem.step === 9 && `PROCESS: ${(editedProfile?.processes || []).length} steps configured`}
                            {stepItem.step === 10 && `TESTIMONIALS: ${(editedProfile?.testimonials || []).length} testimonials`}
                            {stepItem.step === 11 && `CONTACT: ${editedProfile?.email} • ${editedProfile?.phone}`}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Choose template style layout selector block */}
              {currentStep === 12 && (
                <div className="border border-[#E6E6E6] rounded-xl p-4 bg-white shadow-sm space-y-4 animate-in fade-in duration-350">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#3B82F6]" />
                    <span className="text-xs font-bold text-slate-800 font-sans">Select Theme Layout Style</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {["daniel-cross", "julian-mercer", "link-hunt", "biobricks"].map((id) => {
                      const isSelected = selectedTemplate === id;
                      const labelName = id === "daniel-cross" ? "Daniel Cross" : id === "julian-mercer" ? "Julian Mercer" : id === "link-hunt" ? "Link Hunt" : "Biobricks";
                      const isPro = id !== "daniel-cross";
                      
                      let descText = "";
                      if (id === "daniel-cross") descText = "Stark, high-contrast, bold headlines";
                      if (id === "julian-mercer") descText = "Warm paper, elegant serif text";
                      if (id === "link-hunt") descText = "Centered links-in-bio aesthetic";
                      if (id === "biobricks") descText = "Grid-based bento block structure";

                      return (
                        <div
                          key={id}
                          onClick={() => {
                            if (isPro) {
                              toast.info("Upgrade to Pro to unlock this layout style!");
                            } else {
                              selectTemplate(id as any);
                            }
                          }}
                          className={cn(
                            "group bg-slate-50/50 border p-3.5 rounded-xl cursor-pointer text-left flex flex-col justify-between h-[95px] relative active:scale-[0.98] transition-transform duration-100 ease-out",
                            isSelected
                              ? "border-[#3B82F6] ring-1 ring-[#3B82F6] bg-slate-50"
                              : "border-[#EAEAEA] hover:border-slate-350",
                            isPro && "opacity-60 hover:opacity-85"
                          )}
                        >
                          <div className="pr-5">
                            <span className="text-xs font-semibold text-slate-800 block flex items-center gap-1">
                              {labelName}
                              {isPro && <span className="text-[8px] bg-amber-100 text-amber-800 px-1 py-0.2 rounded font-mono">PRO</span>}
                            </span>
                            <span className="text-[9.5px] text-slate-500 block mt-1 leading-tight line-clamp-2">{descText}</span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#3B82F6] flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div ref={chatEndRef} />
          </div>
                   {/* Bottom input composer area */}
          <div className="p-4 shrink-0 bg-white flex flex-col border-t border-neutral-100">
            <div className="w-full flex flex-col gap-3">
              {currentStep <= 11 ? (
                <div className="w-full bg-white rounded-xl p-3 border border-neutral-200/80 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.05)] transition-all animate-in fade-in duration-200">
                  {currentStep === 1 && (
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Full Name</label>
                        <Input
                          value={editedProfile?.name || ""}
                          onChange={(e) => updateField("name", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. Daniel Cross"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Headline</label>
                        <Input
                          value={editedProfile?.headline || ""}
                          onChange={(e) => updateField("headline", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. UI/UX Designer"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Location</label>
                        <Input
                          value={editedProfile?.location || ""}
                          onChange={(e) => updateField("location", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. London, UK"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Avatar Photo URL</label>
                        <Input
                          value={editedProfile?.avatarUrl || ""}
                          onChange={(e) => updateField("avatarUrl", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="Avatar URL"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Greeting Badge Text</label>
                        <Input
                          value={editedProfile?.heroBadgeText || ""}
                          onChange={(e) => updateField("heroBadgeText", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. Welcome here ❤️"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Greeting Start</label>
                        <Input
                          value={editedProfile?.heroGreetingStart || ""}
                          onChange={(e) => updateField("heroGreetingStart", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. Hey,"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Greeting Name</label>
                        <Input
                          value={editedProfile?.heroGreetingName || ""}
                          onChange={(e) => updateField("heroGreetingName", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. Daniel"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Greeting End</label>
                        <Input
                          value={editedProfile?.heroGreetingEnd || ""}
                          onChange={(e) => updateField("heroGreetingEnd", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. here"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 col-span-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Availability Status Text</label>
                        <Input
                          value={editedProfile?.statusText || ""}
                          onChange={(e) => updateField("statusText", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. Available for work"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="flex flex-col gap-1.5 col-span-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Hero Subheadline / Value Prop</label>
                        <Input
                          value={editedProfile?.heroSubheadline || ""}
                          onChange={(e) => updateField("heroSubheadline", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. I design Interfaces, experiences, & brands."
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Rating Text</label>
                        <Input
                          value={editedProfile?.heroRatingText || ""}
                          onChange={(e) => updateField("heroRatingText", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. 4.9 / 5"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Social Follow Label</label>
                        <Input
                          value={editedProfile?.followMeLabel || ""}
                          onChange={(e) => updateField("followMeLabel", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. Follow me"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="flex flex-col gap-1.5 col-span-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">About Section Label</label>
                        <Input
                          value={editedProfile?.aboutLabel || ""}
                          onChange={(e) => updateField("aboutLabel", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. About me"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 col-span-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Bio Summary Text</label>
                        <Textarea
                          value={editedProfile?.summary || ""}
                          onChange={(e) => updateField("summary", e.target.value)}
                          className="min-h-[80px] text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="Tell us about yourself..."
                          rows={3}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Portrait Photo URL</label>
                        <Input
                          value={editedProfile?.aboutPhotoUrl || ""}
                          onChange={(e) => updateField("aboutPhotoUrl", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="Portrait photo URL"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Signature Image URL</label>
                        <Input
                          value={editedProfile?.signatureUrl || ""}
                          onChange={(e) => updateField("signatureUrl", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="Signature URL"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Brands Marquee Header</label>
                        <Input
                          value={editedProfile?.brandsLabel || ""}
                          onChange={(e) => updateField("brandsLabel", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. Worked with Global Brands"
                        />
                      </div>
                      <div className="flex flex-col gap-2 bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Logos Ticker Companies</span>
                        <div className="flex gap-2">
                          <Input
                            id="new-brand-input"
                            className="h-9 text-[13px] bg-white border-slate-200 rounded-lg"
                            placeholder="Company Name (e.g. Google)"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                const input = document.getElementById("new-brand-input") as HTMLInputElement;
                                if (input && input.value.trim()) {
                                  addBrandCompany(input.value);
                                  input.value = "";
                                }
                              }
                            }}
                          />
                          <button
                            onClick={() => {
                              const input = document.getElementById("new-brand-input") as HTMLInputElement;
                              if (input && input.value.trim()) {
                                addBrandCompany(input.value);
                                input.value = "";
                              }
                            }}
                            className="px-3 bg-[#3B82F6] text-white rounded-lg text-xs font-semibold hover:bg-[#2563EB]"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {(editedProfile?.experience || []).map((exp, idx) => (
                            <div key={idx} className="flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-full text-xs font-medium text-slate-700 animate-in zoom-in-95 duration-150">
                              <span>{exp.company}</span>
                              <button
                                onClick={() => removeBrandCompany(idx)}
                                className="text-slate-400 hover:text-red-500 font-bold ml-1 text-[11px]"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                          {(editedProfile?.experience || []).length === 0 && (
                            <span className="text-xs text-slate-400 font-normal italic">No companies added yet.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 6 && (
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Projects Label</label>
                          <Input
                            value={editedProfile?.projectsLabel || ""}
                            onChange={(e) => updateField("projectsLabel", e.target.value)}
                            className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                            placeholder="e.g. My Portfolio"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Projects Subtitle</label>
                          <Input
                            value={editedProfile?.projectsSubtitle || ""}
                            onChange={(e) => updateField("projectsSubtitle", e.target.value)}
                            className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                            placeholder="e.g. Every project built to inspire users"
                          />
                        </div>
                      </div>
                      <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Portfolio Projects ({(editedProfile?.projects || []).length})</span>
                          <button
                            onClick={() => {
                              setModalProjectTitle("");
                              setModalProjectLink("");
                              setModalProjectImage("");
                              setModalProjectDescription("");
                              setEditingProjectIndex(null);
                              setIsProjectModalOpen(true);
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-50 text-[#3B82F6] border border-[#3B82F6]/30 hover:border-[#3B82F6]/65 rounded-lg text-[11px] font-semibold transition-colors shadow-xs active:scale-[0.97]"
                          >
                            <Plus className="w-3 h-3" /> Add Project
                          </button>
                        </div>
                        <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin" }}>
                          {(editedProfile?.projects || []).map((proj, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-xl shadow-xs gap-3">
                              <div className="min-w-0 flex-1">
                                <span className="text-[13px] font-bold text-slate-800 block truncate">{proj.title}</span>
                                <span className="text-[10.5px] text-slate-500 block truncate leading-tight">{proj.description}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => {
                                    setModalProjectTitle(proj.title || "");
                                    setModalProjectLink(proj.link || "");
                                    setModalProjectImage(proj.image || "");
                                    setModalProjectDescription(proj.description || "");
                                    setEditingProjectIndex(idx);
                                    setIsProjectModalOpen(true);
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-[#3B82F6] transition-colors"
                                  title="Edit project"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => {
                                    const updated = (editedProfile?.projects || []).filter((_, i) => i !== idx);
                                    setProjects(updated);
                                    updateField("projects", updated);
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                                  title="Delete project"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                          {(editedProfile?.projects || []).length === 0 && (
                            <span className="text-xs text-slate-400 font-normal italic block py-2">No projects configured. Click Add Project to start.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 7 && (
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Services Label</label>
                          <Input
                            value={editedProfile?.servicesLabel || ""}
                            onChange={(e) => updateField("servicesLabel", e.target.value)}
                            className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                            placeholder="e.g. What I Do"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Services Catchphrase Title</label>
                          <Input
                            value={editedProfile?.servicesTitle || ""}
                            onChange={(e) => updateField("servicesTitle", e.target.value)}
                            className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                            placeholder="e.g. Turning ideas into digital experiences"
                          />
                        </div>
                      </div>
                      <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-xl space-y-3">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Offered Services ({(editedProfile?.services || DEFAULT_SERVICES).length})</span>
                        <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin" }}>
                          {(editedProfile?.services || DEFAULT_SERVICES).map((srv, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-xl shadow-xs gap-3">
                              <div className="min-w-0 flex-1">
                                <span className="text-[13px] font-bold text-slate-800 block truncate">{srv.title} ({srv.price})</span>
                                <span className="text-[10.5px] text-slate-500 block truncate leading-tight">{srv.description}</span>
                              </div>
                              <button
                                onClick={() => {
                                  const currentList = editedProfile?.services || DEFAULT_SERVICES;
                                  const updated = currentList.filter((_, i) => i !== idx);
                                  updateField("services", updated);
                                }}
                                className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-slate-200/60 pt-3 space-y-2.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-sans">Add New Service Card</span>
                          <div className="grid grid-cols-3 gap-2">
                            <Input
                              id="new-srv-title"
                              disabled={(editedProfile?.services || DEFAULT_SERVICES).length >= 5}
                              className="h-8.5 text-xs bg-white border-slate-200 rounded-lg col-span-2 disabled:opacity-50"
                              placeholder="Service Title"
                            />
                            <Input
                              id="new-srv-price"
                              disabled={(editedProfile?.services || DEFAULT_SERVICES).length >= 5}
                              className="h-8.5 text-xs bg-white border-slate-200 rounded-lg disabled:opacity-50"
                              placeholder="Price"
                            />
                            <Input
                              id="new-srv-desc"
                              disabled={(editedProfile?.services || DEFAULT_SERVICES).length >= 5}
                              className="h-8.5 text-xs bg-white border-slate-200 rounded-lg col-span-3 disabled:opacity-50"
                              placeholder="Description summary..."
                            />
                          </div>
                          {(editedProfile?.services || DEFAULT_SERVICES).length >= 5 && (
                            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 border border-amber-200/60 p-2.5 rounded-lg text-[11px] font-medium animate-in fade-in duration-200 select-none">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>Maximum of 5 services reached. Delete an existing service to add a new one.</span>
                            </div>
                          )}
                          <button
                            disabled={(editedProfile?.services || DEFAULT_SERVICES).length >= 5}
                            onClick={() => {
                              const currentList = editedProfile?.services || DEFAULT_SERVICES;
                              if (currentList.length >= 5) {
                                toast.error("You cannot add more than 5 services.");
                                return;
                              }
                              const titleEl = document.getElementById("new-srv-title") as HTMLInputElement;
                              const priceEl = document.getElementById("new-srv-price") as HTMLInputElement;
                              const descEl = document.getElementById("new-srv-desc") as HTMLInputElement;
                              if (titleEl && titleEl.value.trim() && priceEl && priceEl.value.trim() && descEl && descEl.value.trim()) {
                                const updated = [
                                  ...currentList,
                                  {
                                    title: titleEl.value.trim(),
                                    price: priceEl.value.trim(),
                                    description: descEl.value.trim()
                                  }
                                ];
                                updateField("services", updated);
                                titleEl.value = "";
                                priceEl.value = "";
                                descEl.value = "";
                              } else {
                                toast.error("Please fill in all service fields.");
                              }
                            }}
                            className={cn(
                              "w-full py-1.5 text-white rounded-lg text-xs font-semibold transition-colors active:scale-[0.98]",
                              (editedProfile?.services || DEFAULT_SERVICES).length >= 5
                                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border-none"
                                : "bg-[#3B82F6] hover:bg-[#2563EB]"
                            )}
                          >
                            Add Service Item
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 8 && (
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="flex flex-col gap-1.5 col-span-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Booking Card Title</label>
                        <Input
                          value={editedProfile?.servicesCta?.title || ""}
                          onChange={(e) => {
                            const sCta = editedProfile?.servicesCta || DEFAULT_SERVICES_CTA;
                            updateField("servicesCta", { ...sCta, title: e.target.value });
                          }}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. Book A 30 min Free Call"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 col-span-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Description Details</label>
                        <Input
                          value={editedProfile?.servicesCta?.text || ""}
                          onChange={(e) => {
                            const sCta = editedProfile?.servicesCta || DEFAULT_SERVICES_CTA;
                            updateField("servicesCta", { ...sCta, text: e.target.value });
                          }}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="Card call-to-action details description"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Button Label</label>
                        <Input
                          value={editedProfile?.servicesCta?.buttonText || ""}
                          onChange={(e) => {
                            const sCta = editedProfile?.servicesCta || DEFAULT_SERVICES_CTA;
                            updateField("servicesCta", { ...sCta, buttonText: e.target.value });
                          }}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. Book A Call"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Button Booking URL</label>
                        <Input
                          value={editedProfile?.servicesCta?.buttonUrl || ""}
                          onChange={(e) => {
                            const sCta = editedProfile?.servicesCta || DEFAULT_SERVICES_CTA;
                            updateField("servicesCta", { ...sCta, buttonUrl: e.target.value });
                          }}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. #contact"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 9 && (
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Process Label</label>
                          <Input
                            value={editedProfile?.processLabel || ""}
                            onChange={(e) => updateField("processLabel", e.target.value)}
                            className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                            placeholder="e.g. My Process"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Process Section Title</label>
                          <Input
                            value={editedProfile?.processTitle || ""}
                            onChange={(e) => updateField("processTitle", e.target.value)}
                            className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                            placeholder="e.g. From ideas to impactful creative results."
                          />
                        </div>
                      </div>
                      <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-xl space-y-3">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Process Steps ({(editedProfile?.processes || DEFAULT_PROCESSES).length})</span>
                        <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin" }}>
                          {(editedProfile?.processes || DEFAULT_PROCESSES).map((prc, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-xl shadow-xs gap-3">
                              <div className="min-w-0 flex-1">
                                <span className="text-[13px] font-bold text-slate-800 block truncate">{prc.stepTag} - {prc.title}</span>
                                <span className="text-[10.5px] text-slate-500 block truncate leading-tight">{prc.description}</span>
                              </div>
                              <button
                                onClick={() => {
                                  const currentList = editedProfile?.processes || DEFAULT_PROCESSES;
                                  const updated = currentList.filter((_, i) => i !== idx);
                                  updateField("processes", updated);
                                }}
                                className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-slate-200/60 pt-3 space-y-2.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-sans">Add Process Step Card</span>
                          <div className="grid grid-cols-3 gap-2">
                            <Input
                              id="new-prc-tag"
                              className="h-8.5 text-xs bg-white border-slate-200 rounded-lg"
                              placeholder="Tag (e.g. /01)"
                            />
                            <Input
                              id="new-prc-title"
                              className="h-8.5 text-xs bg-white border-slate-200 rounded-lg col-span-2"
                              placeholder="Step Name"
                            />
                            <Input
                              id="new-prc-desc"
                              className="h-8.5 text-xs bg-white border-slate-200 rounded-lg col-span-3"
                              placeholder="Description text details..."
                            />
                          </div>
                          <button
                            onClick={() => {
                              const tagEl = document.getElementById("new-prc-tag") as HTMLInputElement;
                              const titleEl = document.getElementById("new-prc-title") as HTMLInputElement;
                              const descEl = document.getElementById("new-prc-desc") as HTMLInputElement;
                              if (tagEl && tagEl.value.trim() && titleEl && titleEl.value.trim() && descEl && descEl.value.trim()) {
                                const currentList = editedProfile?.processes || DEFAULT_PROCESSES;
                                const updated = [
                                  ...currentList,
                                  {
                                    stepTag: tagEl.value.trim(),
                                    title: titleEl.value.trim(),
                                    description: descEl.value.trim()
                                  }
                                ];
                                updateField("processes", updated);
                                tagEl.value = "";
                                titleEl.value = "";
                                descEl.value = "";
                              } else {
                                toast.error("Please fill in all process fields.");
                              }
                            }}
                            className="w-full py-1.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg text-xs font-semibold transition-colors active:scale-[0.98]"
                          >
                            Add Step Card
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 10 && (
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Reviews Section Label</label>
                          <Input
                            value={editedProfile?.testimonialsLabel || ""}
                            onChange={(e) => updateField("testimonialsLabel", e.target.value)}
                            className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                            placeholder="e.g. Reviews"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Reviews Title</label>
                          <Input
                            value={editedProfile?.testimonialsTitle || ""}
                            onChange={(e) => updateField("testimonialsTitle", e.target.value)}
                            className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                            placeholder="e.g. Voices of trust from happy clients"
                          />
                        </div>
                      </div>
                      <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-xl space-y-3">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Client Reviews ({(editedProfile?.testimonials || DEFAULT_TESTIMONIALS).length})</span>
                        <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin" }}>
                          {(editedProfile?.testimonials || DEFAULT_TESTIMONIALS).map((tst, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-xl shadow-xs gap-3">
                              <div className="min-w-0 flex-1">
                                <span className="text-[13px] font-bold text-slate-800 block truncate">{tst.name} ({tst.role})</span>
                                <span className="text-[10.5px] text-slate-500 block truncate leading-tight">"{tst.quote}"</span>
                              </div>
                              <button
                                onClick={() => {
                                  const currentList = editedProfile?.testimonials || DEFAULT_TESTIMONIALS;
                                  const updated = currentList.filter((_, i) => i !== idx);
                                  updateField("testimonials", updated);
                                }}
                                className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-slate-200/60 pt-3 space-y-2.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-sans">Add New Testimonial Review</span>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              id="new-tst-name"
                              className="h-8.5 text-xs bg-white border-slate-200 rounded-lg"
                              placeholder="Client Name"
                            />
                            <Input
                              id="new-tst-role"
                              className="h-8.5 text-xs bg-white border-slate-200 rounded-lg"
                              placeholder="Role / Title"
                            />
                            <Input
                              id="new-tst-quote"
                              className="h-8.5 text-xs bg-white border-slate-200 rounded-lg col-span-2"
                              placeholder="Review / Quote..."
                            />
                            <Input
                              id="new-tst-avatar"
                              className="h-8.5 text-xs bg-white border-slate-200 rounded-lg col-span-2"
                              placeholder="Avatar Photo URL (Optional)"
                            />
                          </div>
                          <button
                            onClick={() => {
                              const nameEl = document.getElementById("new-tst-name") as HTMLInputElement;
                              const roleEl = document.getElementById("new-tst-role") as HTMLInputElement;
                              const quoteEl = document.getElementById("new-tst-quote") as HTMLInputElement;
                              const avatarEl = document.getElementById("new-tst-avatar") as HTMLInputElement;
                              if (nameEl && nameEl.value.trim() && roleEl && roleEl.value.trim() && quoteEl && quoteEl.value.trim()) {
                                const currentList = editedProfile?.testimonials || DEFAULT_TESTIMONIALS;
                                const updated = [
                                  ...currentList,
                                  {
                                    name: nameEl.value.trim(),
                                    role: roleEl.value.trim(),
                                    quote: quoteEl.value.trim(),
                                    avatarUrl: avatarEl ? avatarEl.value.trim() : ""
                                  }
                                ];
                                updateField("testimonials", updated);
                                nameEl.value = "";
                                roleEl.value = "";
                                quoteEl.value = "";
                                if (avatarEl) avatarEl.value = "";
                              } else {
                                toast.error("Please fill in all testimonial fields.");
                              }
                            }}
                            className="w-full py-1.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg text-xs font-semibold transition-colors active:scale-[0.98]"
                          >
                            Add Testimonial Review
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 11 && (
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Footer Label</label>
                        <Input
                          value={editedProfile?.footerLabel || ""}
                          onChange={(e) => updateField("footerLabel", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="e.g. Have a question"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Footer Banner Photo URL</label>
                        <Input
                          value={editedProfile?.footerBannerUrl || ""}
                          onChange={(e) => updateField("footerBannerUrl", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="Banner image URL"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Contact Email</label>
                        <Input
                          value={editedProfile?.email || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateField("email", val);
                            const currentLinks = editedProfile?.links || [];
                            const idx = currentLinks.findIndex((l) => l.icon === "email");
                            const updated = [...currentLinks];
                            if (idx !== -1) {
                              updated[idx] = { ...updated[idx], url: val.startsWith("mailto:") ? val : `mailto:${val}` };
                            } else {
                              updated.push({ label: "Email", icon: "email", url: val.startsWith("mailto:") ? val : `mailto:${val}` });
                            }
                            updateField("links", updated);
                          }}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="hello@example.com"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">Contact Phone</label>
                        <Input
                          value={editedProfile?.phone || ""}
                          onChange={(e) => updateField("phone", e.target.value)}
                          className="h-10 text-[14px] bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                          placeholder="+44 7700 900123"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 col-span-2 border-t border-slate-100 pt-3">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans block mb-1">Social Media Links</span>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 font-sans">LinkedIn URL</label>
                            <Input
                              value={(() => {
                                  const lnk = (editedProfile?.links || []).find(l => l.icon === "linkedin");
                                  return lnk ? lnk.url : "";
                                })()}
                              onChange={(e) => {
                                const val = e.target.value;
                                const currentLinks = editedProfile?.links || [];
                                const idx = currentLinks.findIndex((l) => l.icon === "linkedin");
                                const updated = [...currentLinks];
                                if (idx !== -1) {
                                  updated[idx] = { ...updated[idx], url: val };
                                } else {
                                  updated.push({ label: "LinkedIn", icon: "linkedin", url: val });
                                }
                                updateField("links", updated);
                              }}
                              className="h-8.5 text-xs bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                              placeholder="LinkedIn URL"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 font-sans">GitHub URL</label>
                            <Input
                              value={(() => {
                                  const lnk = (editedProfile?.links || []).find(l => l.icon === "github");
                                  return lnk ? lnk.url : "";
                                })()}
                              onChange={(e) => {
                                const val = e.target.value;
                                const currentLinks = editedProfile?.links || [];
                                const idx = currentLinks.findIndex((l) => l.icon === "github");
                                const updated = [...currentLinks];
                                if (idx !== -1) {
                                  updated[idx] = { ...updated[idx], url: val };
                                } else {
                                  updated.push({ label: "GitHub", icon: "github", url: val });
                                }
                                updateField("links", updated);
                              }}
                              className="h-8.5 text-xs bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                              placeholder="GitHub URL"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 font-sans">Twitter URL</label>
                            <Input
                              value={(() => {
                                  const lnk = (editedProfile?.links || []).find(l => l.icon === "twitter");
                                  return lnk ? lnk.url : "";
                                })()}
                              onChange={(e) => {
                                const val = e.target.value;
                                const currentLinks = editedProfile?.links || [];
                                const idx = currentLinks.findIndex((l) => l.icon === "twitter");
                                const updated = [...currentLinks];
                                if (idx !== -1) {
                                  updated[idx] = { ...updated[idx], url: val };
                                } else {
                                  updated.push({ label: "Twitter", icon: "twitter", url: val });
                                }
                                updateField("links", updated);
                              }}
                              className="h-8.5 text-xs bg-slate-50 border-slate-200 focus:border-[#3B82F6] focus:bg-white rounded-lg text-slate-800"
                              placeholder="Twitter URL"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3.5 mt-3.5 select-none">
                    <div>
                      {currentStep > 1 && (
                        <button
                          onClick={goToBackStep}
                          className="h-9.5 px-4 text-xs font-bold text-[#18181B] hover:text-[#18181B]/80 bg-[#F7F6F3] border border-[#EAEAEA] rounded-lg transition-colors cursor-pointer active:scale-[0.98]"
                        >
                          ← Back
                        </button>
                      )}
                    </div>
                    <button
                      onClick={goToNextStep}
                      className="h-9.5 px-5 text-xs font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg transition-colors cursor-pointer active:scale-[0.98]"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                    {SUGGESTIONS.map((s) => (
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
                </>
              )}
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
                  activeNav === 1 && currentStep <= 6 ? (
                    <motion.div
                      key={`anim-${currentStep}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <WizardAnimations
                        step={currentStep}
                        profile={editedProfile}
                        projects={projects}
                        interests={interests}
                        skills={skills}
                        experience={experience}
                      />
                    </motion.div>
                  ) : (
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
                  )
                ) : (
                  <div className="text-neutral-400 text-xs font-mono">Loading preview data...</div>
                )}
              </motion.div>

            </AnimatePresence>
          </div>

        </div>
      </main>

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
                className="h-9.5 px-4 text-xs font-bold text-[#18181B] hover:text-[#18181B]/80 bg-white border border-slate-200 rounded-lg transition-colors cursor-pointer active:scale-[0.98]"
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
                className="h-9.5 px-5 text-xs font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg transition-colors cursor-pointer active:scale-[0.98]"
              >
                Save Project
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
