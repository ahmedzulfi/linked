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

  // Onboarding wizard steps (1 to 7, then 9 for free-form editor mode)
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

  // Inline Add states
  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [newProjLink, setNewProjLink] = useState("");
  const [showAddProject, setShowAddProject] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  // Free-form editor mode states (Step 9)
  const [customMessages, setCustomMessages] = useState<{ id: string; role: "user" | "assistant"; content: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  // Selection mode states for the visual customizer
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

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
  }, [websiteId]);

  // Load saved onboarding step from sessionStorage or url parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isOnboardingFlow = searchParams.get("onboarding") === "true";
      if (!isOnboardingFlow) {
        // If not in the onboarding flow, default straight to free-form editor (Step 9)
        setCurrentStep(9);
        return;
      }

      const savedStep = sessionStorage.getItem("webild_onboarding_step");
      if (savedStep) {
        const parsed = parseInt(savedStep, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 9) {
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

  const handleNextStep = () => {
    // Save to context local state on next clicks
    if (currentStep === 2) updateField("projects", projects);
    if (currentStep === 3) updateField("interests", interests);
    if (currentStep === 4) updateField("skills", skills);
    if (currentStep === 5) updateField("experience", experience);

    setCurrentStep(currentStep + 1);
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      if (currentStep === 7) {
        setCurrentStep(6); // Go back to AI comparison view
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const addProject = () => {
    if (!newProjTitle.trim()) {
      toast.error("Project title is required");
      return;
    }
    const updated = [
      ...projects,
      {
        title: newProjTitle.trim(),
        description: newProjDesc.trim(),
        link: newProjLink.trim() || undefined,
        image: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60`,
      },
    ];
    setProjects(updated);
    updateField("projects", updated);
    setNewProjTitle("");
    setNewProjDesc("");
    setNewProjLink("");
    setShowAddProject(false);
  };

  const removeProject = (idx: number) => {
    const updated = projects.filter((_, i) => i !== idx);
    setProjects(updated);
    updateField("projects", updated);
  };

  const addSkillTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (skills.some(s => s.name.toLowerCase() === newSkill.trim().toLowerCase())) {
      setNewSkill("");
      return;
    }
    const updated = [...skills, { name: newSkill.trim() }];
    setSkills(updated);
    updateField("skills", updated);
    setNewSkill("");
  };

  const removeSkillTag = (name: string) => {
    const updated = skills.filter(s => s.name !== name);
    setSkills(updated);
    updateField("skills", updated);
  };

  const addExperienceItem = () => {
    const updated = [
      ...experience,
      {
        title: "New Role",
        company: "Company Name",
        duration: "Jan 2026 - Present",
        description: "",
      },
    ];
    setExperience(updated);
    updateField("experience", updated);
  };

  const updateExperienceItem = (index: number, key: string, value: string) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [key]: value };
    setExperience(updated);
    updateField("experience", updated);
  };

  const removeExperienceItem = (idx: number) => {
    const updated = experience.filter((_, i) => i !== idx);
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
      if (fieldName === "projects" || fieldName.startsWith("block-")) {
        setCurrentStep(2);
      } else if (fieldName === "interests" || fieldName === "summary") {
        setCurrentStep(3);
      } else if (fieldName === "skills") {
        setCurrentStep(4);
      } else if (fieldName === "experience") {
        setCurrentStep(5);
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

      {/* ── Left Column Panel Switcher based on activeNav ── */}
      
      {/* 1. Design / AI Onboarding Wizard Panel */}
      {activeNav === 1 && (
        <aside 
          className={`h-full bg-white flex flex-col justify-between relative z-20 font-inter transition-all duration-300 ${
            currentStep <= 6
              ? "flex-1"
              : "w-[510px] shrink-0 border-r border-[#E6E6E6]/60 shadow-xs"
          }`}
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
                <div className={`flex items-center justify-between w-full ${currentStep <= 6 ? "max-w-3xl mx-auto" : ""}`}>
                  <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="LinkedPage" className="h-6 w-auto object-contain" />
                    <div className="w-px h-3 bg-black/10" />
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
            <div className={`space-y-6 flex flex-col ${currentStep <= 6 ? "max-w-3xl mx-auto w-full py-4" : ""}`}>
            
            {/* Step 1 Welcome Chat Bubble */}
            {currentStep >= 1 && (
              <div className="w-full flex flex-col justify-start items-start gap-2.5 font-inter">
                <div className="flex items-center gap-2 select-none">
                  <img src="/logoicon.png" alt="Logo" className="h-5 w-auto object-contain" />
                  <span className="font-semibold text-[13.5px] text-black">Webild</span>
                </div>
                <div className="w-full text-[#171717] text-[14.5px] leading-[22px] font-normal">
                  Hello{editedProfile?.name ? `, ${editedProfile.name}` : ""}! Welcome to Webild. I've successfully initialized your profile details using your LinkedIn profile.
                  <br/><br/>
                  Let's review and customize your portfolio details step-by-step.
                </div>
              </div>
            )}

            {/* User confirmation Step 1 */}
            {currentStep > 1 && (
              <div className="w-full flex justify-end items-start font-inter animate-in fade-in duration-200">
                <div className="max-w-[85%] bg-white border border-neutral-200/60 rounded-[18px] px-4 py-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                  <p className="text-[#171717] text-[14.5px] leading-[22px] font-normal break-words max-w-full">
                    Let's get started!
                  </p>
                </div>
              </div>
            )}

            {/* Step 2 Intro */}
            {currentStep >= 2 && (
              <div className="w-full flex flex-col justify-start items-start gap-2.5 font-inter animate-in fade-in duration-200">
                <div className="flex items-center gap-2 select-none">
                  <img src="/logoicon.png" alt="Logo" className="h-5 w-auto object-contain" />
                  <span className="font-semibold text-[13.5px] text-black">Webild</span>
                </div>
                <div className="w-full text-[#171717] text-[14.5px] leading-[22px] font-normal">
                  First, let's review your <strong>Projects & Portfolio Highlights</strong>. Showcase your best apps, portfolios, or articles.
                </div>
              </div>
            )}

            {/* User confirmation Step 2 */}
            {currentStep > 2 && (
              <div className="w-full flex justify-end items-start font-inter">
                <div className="max-w-[85%] bg-white border border-neutral-200/60 rounded-[18px] px-4 py-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                  <p className="text-[#171717] text-[14.5px] leading-[22px] font-normal break-words max-w-full">
                    I've updated my projects and portfolio details.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3 (Interests) */}
            {currentStep >= 3 && (
              <div className="w-full flex flex-col justify-start items-start gap-2.5 font-inter animate-in fade-in duration-200">
                <div className="flex items-center gap-2 select-none">
                  <img src="/logoicon.png" alt="Logo" className="h-5 w-auto object-contain" />
                  <span className="font-semibold text-[13.5px] text-black">Webild</span>
                </div>
                <div className="w-full text-[#171717] text-[14.5px] leading-[22px] font-normal">
                  Got it. Next, let's document your <strong>Core Interests and Career Goals</strong> to personalize your profile bio.
                </div>
              </div>
            )}

            {/* User confirmation Step 3 */}
            {currentStep > 3 && (
              <div className="w-full flex justify-end items-start font-inter">
                <div className="max-w-[85%] bg-white border border-neutral-200/60 rounded-[18px] px-4 py-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                  <p className="text-[#171717] text-[14.5px] leading-[22px] font-normal break-words max-w-full">
                    Interests and aspirations submitted successfully.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4 (Skills) */}
            {currentStep >= 4 && (
              <div className="w-full flex flex-col justify-start items-start gap-2.5 font-inter animate-in fade-in duration-200">
                <div className="flex items-center gap-2 select-none">
                  <img src="/logoicon.png" alt="Logo" className="h-5 w-auto object-contain" />
                  <span className="font-semibold text-[13.5px] text-black">Webild</span>
                </div>
                <div className="w-full text-[#171717] text-[14.5px] leading-[22px] font-normal">
                  Excellent. Let's adjust your <strong>Core Skills & Tools</strong> tags.
                </div>
              </div>
            )}

            {/* User confirmation Step 4 */}
            {currentStep > 4 && (
              <div className="w-full flex justify-end items-start font-inter">
                <div className="max-w-[85%] bg-white border border-neutral-200/60 rounded-[18px] px-4 py-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                  <p className="text-[#171717] text-[14.5px] leading-[22px] font-normal break-words max-w-full">
                    Skills tags confirmed.
                  </p>
                </div>
              </div>
            )}

            {/* Step 5 (Experience) */}
            {currentStep >= 5 && (
              <div className="w-full flex flex-col justify-start items-start gap-2.5 font-inter animate-in fade-in duration-200">
                <div className="flex items-center gap-2 select-none">
                  <img src="/logoicon.png" alt="Logo" className="h-5 w-auto object-contain" />
                  <span className="font-semibold text-[13.5px] text-black">Webild</span>
                </div>
                <div className="w-full text-[#171717] text-[14.5px] leading-[22px] font-normal">
                  Perfect. Finally, let's verify your <strong>Work Experience timeline</strong>.
                </div>
              </div>
            )}

            {/* User confirmation Step 5 */}
            {currentStep > 5 && (
              <div className="w-full flex justify-end items-start font-inter">
                <div className="max-w-[85%] bg-white border border-neutral-200/60 rounded-[18px] px-4 py-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                  <p className="text-[#171717] text-[14.5px] leading-[22px] font-normal break-words max-w-full">
                    Work experience details refined.
                  </p>
                </div>
              </div>
            )}

            {/* Step 6 (AI Refinement Processing or Review) */}
            {currentStep === 6 && optimizing && (
              <div className="w-full flex flex-col justify-start items-start gap-2.5 font-inter animate-in fade-in duration-200">
                <div className="flex items-center gap-2 select-none">
                  <img src="/logoicon.png" alt="Logo" className="h-5 w-auto object-contain animate-pulse" />
                  <span className="font-semibold text-[13.5px] text-black animate-pulse">Webild</span>
                </div>
                <div className="bg-white px-4 py-3 rounded-[18px] border border-neutral-200/60 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] flex items-center justify-center gap-2 text-xs font-semibold text-neutral-750">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  Refinement engine running in the background...
                </div>
              </div>
            )}

            {currentStep >= 6 && !optimizing && (
              <div className="w-full flex flex-col justify-start items-start gap-2.5 font-inter animate-in fade-in duration-200">
                <div className="flex items-center gap-2 select-none">
                  <img src="/logoicon.png" alt="Logo" className="h-5 w-auto object-contain" />
                  <span className="font-semibold text-[13.5px] text-black">Webild</span>
                </div>
                <div className="w-full text-[#171717] text-[14.5px] leading-[22px] font-normal">
                  I've run my AI copy refinement engine on your bio and headline to make them more impactful and professional.
                  <br/><br/>
                  Please review the changes below and adjust them to your liking.
                </div>
              </div>
            )}

            {/* User confirmation Step 6 */}
            {currentStep > 6 && (
              <div className="w-full flex justify-end items-start font-inter animate-in fade-in duration-200">
                <div className="max-w-[85%] bg-white border border-neutral-200/60 rounded-[18px] px-4 py-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                  <p className="text-[#171717] text-[14.5px] leading-[22px] font-normal break-words max-w-full">
                    AI copy refinement modifications approved.
                  </p>
                </div>
              </div>
            )}

            {/* Step 7 (Template Picker) */}
            {currentStep >= 7 && (
              <div className="w-full flex flex-col justify-start items-start gap-2.5 font-inter animate-in fade-in duration-200">
                <div className="flex items-center gap-2 select-none">
                  <img src="/logoicon.png" alt="Logo" className="h-5 w-auto object-contain" />
                  <span className="font-semibold text-[13.5px] text-black">Webild</span>
                </div>
                <div className="w-full text-[#171717] text-[14.5px] leading-[22px] font-normal">
                  AI optimization finished! I've polished your text copy.
                  <br/><br/>
                  Now, please **select one of the 4 Framer-inspired template styles** below to apply your design theme.
                </div>
              </div>
            )}

            {/* User confirmation Step 7 */}
            {currentStep > 7 && (
              <div className="w-full flex justify-end items-start font-inter animate-in fade-in duration-200">
                <div className="max-w-[85%] bg-white border border-neutral-200/60 rounded-[18px] px-4 py-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                  <p className="text-[#171717] text-[14.5px] leading-[22px] font-normal break-words max-w-full">
                    Template design style chosen.
                  </p>
                </div>
              </div>
            )}

            {/* Free-form chat transition separator & timeline (Step 9) */}
            {currentStep === 9 && (
              <>
                <div className="flex items-center gap-2 py-4 select-none">
                  <div className="h-px bg-neutral-100 flex-1" />
                  <span className="text-[10.5px] font-bold text-neutral-400 uppercase tracking-widest font-mono">Free-Form Chat Editor</span>
                  <div className="h-px bg-neutral-100 flex-1" />
                </div>

                {/* Setup complete assistant message */}
                <div className="w-full flex flex-col justify-start items-start gap-2.5 font-inter animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 select-none">
                    <img src="/logoicon.png" alt="Logo" className="h-5 w-auto object-contain" />
                    <span className="font-semibold text-[13.5px] text-black">Webild</span>
                  </div>
                  <div className="w-full text-[#171717] text-[14.5px] leading-[22px] font-normal">
                    Setup complete! Your website is ready. Tell me what you'd like to change — I can update your headline, summary, skills, links, or swap templates.
                    <br/><br/>
                    On the <strong>Daniel Cross</strong> template, you can also ask me to adjust your <strong>Services cards</strong>, client <strong>Reviews</strong>, or design <strong>Process steps</strong>! Or switch to the <strong>✍️ Manual Editor</strong> tab to tweak them visual-form style. What would you like to adjust?
                  </div>
                </div>

                {/* Custom chat history messages */}
                {customMessages.map((msg) => (
                  <div key={msg.id} className="w-full flex flex-col gap-2.5">
                    {msg.role === "user" ? (
                      <div className="w-full flex justify-end items-start font-inter animate-in fade-in duration-200">
                        <div className="max-w-[85%] bg-white border border-neutral-200/60 rounded-[18px] px-4 py-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                          <p className="text-[#171717] text-[14.5px] leading-[22px] font-normal break-words max-w-full">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex flex-col justify-start items-start gap-2.5 font-inter animate-in fade-in duration-200">
                        <div className="flex items-center gap-2 select-none">
                          <img src="/logoicon.png" alt="Logo" className="h-5 w-auto object-contain" />
                          <span className="font-semibold text-[13.5px] text-black">Webild</span>
                        </div>
                        <div className="w-full text-[#171717] text-[14.5px] leading-[22px] font-normal whitespace-pre-wrap">
                          {msg.content}
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
                      <span className="font-semibold text-[13.5px] text-black">Webild</span>
                    </div>
                    <div className="bg-white px-4 py-3 rounded-[18px] border border-neutral-200/60 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] flex items-center justify-center">
                      <div className="flex items-center gap-[3px] px-1 py-0.5">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-[5px] h-[5px] rounded-full bg-[#2A2A2F]/40 animate-bounce"
                            style={{ animationDelay: `${i * 0.18}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* DYNAMIC FORMS */}
            <div className="pt-2">
              {/* Step 1 Welcome / Kickoff Form */}
              {currentStep === 1 && (
                <div className="overflow-hidden bg-white border border-neutral-200/80 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] animate-in fade-in duration-300 relative z-10 text-left">
                  <div className="bg-[#2A2A2F] px-6 py-4 flex items-center gap-3 text-white border-b border-neutral-800 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                      <Sparkles className="w-4 h-4 text-[#8DB8FF] fill-[#8DB8FF]/10" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold tracking-wider text-[#8DB8FF] uppercase block">ONBOARDING KICKOFF</span>
                      <h3 className="text-sm font-semibold text-white leading-tight">Welcome to Webild</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* User profile card visual slot */}
                    <div className="flex items-center gap-3.5 p-3.5 bg-[#FBFBFB] border border-neutral-200/80 rounded-xl">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-neutral-200 shrink-0 bg-neutral-100 flex items-center justify-center shadow-xs">
                        <img src={editedProfile?.avatarUrl || "https://i.pravatar.cc/80?img=47"} alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-neutral-800 truncate">{editedProfile?.name || "Your Profile"}</h3>
                        <p className="text-xs text-neutral-500 truncate max-w-[320px] mt-0.5 font-medium">{editedProfile?.headline || "Professional Headline"}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3.5">
                      <h4 className="text-[10px] font-bold text-[#2A2A2F]/60 uppercase tracking-wider">Your Customization Steps</h4>
                      <div className="space-y-2.5 text-xs text-neutral-700 font-medium">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-[10px] shrink-0 border border-blue-100">1</span>
                          <span>📂 Review Projects & Highlights</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-[10px] shrink-0 border border-blue-100">2</span>
                          <span>🎯 Refine Interests & Aspirations</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-[10px] shrink-0 border border-blue-100">3</span>
                          <span>🛠 Select Core Skills & Tools</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-[10px] shrink-0 border border-blue-100">4</span>
                          <span>💼 Verify Work Experience Timeline</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-[10px] shrink-0 border border-blue-100">5</span>
                          <span>🎨 Choose Layout Template & Edit Live</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentStep(2)}
                      className="w-full h-11 bg-neutral-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-[0.97] transition-transform duration-100 shadow-sm cursor-pointer hover:bg-neutral-800"
                    >
                      Get Started <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 Form: Projects */}
              {currentStep === 2 && (
                <div className="overflow-hidden bg-white border border-neutral-200/80 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] animate-in fade-in duration-300 relative z-10 text-left">
                  <div className="bg-[#2A2A2F] px-6 py-4 flex items-center gap-3 text-white border-b border-neutral-800 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                      <Folder className="w-4 h-4 text-[#8DB8FF]" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold tracking-wider text-[#8DB8FF] uppercase block">STEP 2 OF 7 • PORTFOLIO</span>
                      <h3 className="text-sm font-semibold text-white leading-tight">Projects & Highlights</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-5">
                    <div className="space-y-1">
                      {projects.map((proj, idx) => (
                        <div 
                          key={idx} 
                          className="group flex items-start justify-between p-3 rounded-xl hover:bg-neutral-50/80 transition-colors duration-150 relative border border-transparent hover:border-neutral-200/50 bg-[#FBFBFB] mb-2"
                        >
                          <div className="flex items-start gap-2.5 min-w-0 flex-1">
                            <FileText className="w-4 h-4 text-[#2A2A2F]/70 shrink-0 mt-0.5" />
                            <div className="truncate pr-4 flex-1">
                              <span className="text-xs font-semibold text-neutral-800 block truncate">{proj.title}</span>
                              {proj.description && (
                                <span className="text-[11px] text-[#171717]/60 block truncate mt-0.5 leading-relaxed font-medium">{proj.description}</span>
                              )}
                            </div>
                          </div>
                          <button 
                            onClick={() => removeProject(idx)} 
                            className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-red-600 hover:bg-red-50/50 p-1.5 rounded-lg transition-[opacity,transform] duration-100 ease-out absolute right-2 top-2 bg-white border border-neutral-200/40 shadow-xs active:scale-[0.95]"
                            title="Remove project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      {projects.length === 0 && !showAddProject && (
                        <div className="flex flex-col items-center justify-center py-6 bg-[#FBFBFB] border border-dashed border-neutral-200/80 rounded-xl text-neutral-400 text-center animate-in fade-in duration-200">
                          <Inbox className="w-7 h-7 text-neutral-400 stroke-[1.5]" />
                          <span className="text-[11px] font-medium mt-1.5 text-neutral-500">No projects added yet</span>
                        </div>
                      )}
                    </div>

                    {showAddProject ? (
                      <div className="border border-neutral-200/80 bg-[#FBFBFB] rounded-xl p-4 space-y-3.5 shadow-xs">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Project Title</label>
                          <input
                            type="text"
                            placeholder="e.g. Financial Dashboard App"
                            value={newProjTitle}
                            onChange={(e) => setNewProjTitle(e.target.value)}
                            className="w-full h-11 text-xs px-3 border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Short Description</label>
                          <textarea
                            placeholder="What did you build? What technologies did you use?"
                            value={newProjDesc}
                            onChange={(e) => setNewProjDesc(e.target.value)}
                            rows={2}
                            className="w-full text-xs px-3 py-2.5 border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 resize-none leading-relaxed transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Project URL (Optional)</label>
                          <input
                            type="text"
                            placeholder="https://github.com/username/project"
                            value={newProjLink}
                            onChange={(e) => setNewProjLink(e.target.value)}
                            className="w-full h-11 text-xs px-3 border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 transition-colors"
                          />
                        </div>
                        <div className="flex gap-2 justify-end pt-1">
                          <button 
                            onClick={() => setShowAddProject(false)} 
                            className="h-10 px-4 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl border border-neutral-200 bg-white transition-transform active:scale-[0.97] duration-100 ease-out"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={addProject} 
                            className="h-10 px-4 text-xs font-bold bg-[#2A2A2F] hover:bg-[#1f1f22] text-white rounded-xl transition-transform active:scale-[0.97] duration-100 ease-out shadow-sm"
                          >
                            Add Project
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowAddProject(true)}
                        className="w-full h-11 border border-dashed border-neutral-200 hover:border-neutral-300 rounded-xl text-xs font-semibold text-neutral-600 flex items-center justify-center gap-1.5 hover:bg-neutral-50/50 transition-transform active:scale-[0.97] duration-100 ease-out"
                      >
                        <Plus className="w-4 h-4 text-neutral-500" /> Add Project
                      </button>
                    )}

                    <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
                      <button 
                        onClick={handleBackStep} 
                        className="h-11 px-4 flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl border border-neutral-200 bg-white transition-transform active:scale-[0.97] duration-100 ease-out"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="h-11 px-5 bg-[#2A2A2F] hover:bg-[#1f1f22] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-transform active:scale-[0.97] duration-100 ease-out shadow-sm"
                      >
                        Save & Next <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 Form: Interests */}
              {currentStep === 3 && (
                <div className="overflow-hidden bg-white border border-neutral-200/80 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] animate-in fade-in duration-300 relative z-10 text-left">
                  <div className="bg-[#2A2A2F] px-6 py-4 flex items-center gap-3 text-white border-b border-neutral-800 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                      <Sparkles className="w-4 h-4 text-[#8DB8FF]" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold tracking-wider text-[#8DB8FF] uppercase block">STEP 3 OF 7 • TARGETS</span>
                      <h3 className="text-sm font-semibold text-white leading-tight">Interests & Career Goals</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-5">
                    <textarea
                      placeholder="Write a brief overview of your interests and what drives you. E.g. I am passionate about AI engineering, developer tools, and high-fidelity user experiences..."
                      value={interests}
                      onChange={(e) => {
                        setInterests(e.target.value);
                        updateField("interests", e.target.value);
                      }}
                      rows={5}
                      className="w-full text-xs p-3.5 border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 bg-[#FBFBFB] focus:bg-white placeholder-neutral-400 text-neutral-800 resize-none leading-relaxed focus:ring-1 focus:ring-neutral-400/10 transition-colors"
                    />
                    <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
                      <button 
                        onClick={handleBackStep} 
                        className="h-11 px-4 flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl border border-neutral-200 bg-white transition-transform active:scale-[0.97] duration-100 ease-out"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="h-11 px-5 bg-[#2A2A2F] hover:bg-[#1f1f22] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-transform active:scale-[0.97] duration-100 ease-out shadow-sm"
                      >
                        Save & Next <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 Form: Skills */}
              {currentStep === 4 && (
                <div className="overflow-hidden bg-white border border-neutral-200/80 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] animate-in fade-in duration-300 relative z-10 text-left">
                  <div className="bg-[#2A2A2F] px-6 py-4 flex items-center gap-3 text-white border-b border-neutral-800 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                      <Wrench className="w-4 h-4 text-[#8DB8FF]" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold tracking-wider text-[#8DB8FF] uppercase block">STEP 4 OF 7 • SKILLS</span>
                      <h3 className="text-sm font-semibold text-white leading-tight">Core Skills & Tools</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-5">
                    <div className="flex flex-wrap gap-1.5 p-3.5 bg-[#FBFBFB] border border-neutral-200/60 rounded-xl min-h-[90px] max-h-36 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                      {skills.map((skill, idx) => {
                        const tagColor = getNotionTagClasses(skill.name);
                        return (
                          <span 
                            key={idx} 
                            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${tagColor} transition-transform duration-105 active:scale-[0.95]`}
                          >
                            {skill.name}
                            <button 
                              onClick={() => removeSkillTag(skill.name)} 
                              className="hover:bg-black/5 rounded-sm p-0.5 text-neutral-500 hover:text-neutral-900 font-bold ml-0.5 transition-transform duration-100 ease-out flex items-center justify-center active:scale-[0.85]"
                              style={{ width: "12px", height: "12px", fontSize: "10px", lineHeight: 1 }}
                            >
                              ×
                            </button>
                          </span>
                        );
                      })}
                      {skills.length === 0 && (
                        <span className="text-[11px] text-neutral-550 italic self-center mx-auto select-none font-medium">No skills added yet. Add some below.</span>
                      )}
                    </div>

                    <form onSubmit={addSkillTag} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. TypeScript, UI Design, Next.js"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="flex-1 h-11 text-xs px-3 border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 transition-colors"
                      />
                      <button 
                        type="submit" 
                        className="px-5 bg-[#2A2A2F] hover:bg-neutral-850 text-white text-xs font-bold rounded-xl transition-transform active:scale-[0.97] duration-100 ease-out h-11 shadow-sm"
                      >
                        Add
                      </button>
                    </form>

                    <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
                      <button 
                        onClick={handleBackStep} 
                        className="h-11 px-4 flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl border border-neutral-200 bg-white transition-transform active:scale-[0.97] duration-100 ease-out"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="h-11 px-5 bg-[#2A2A2F] hover:bg-[#1f1f22] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-transform active:scale-[0.97] duration-100 ease-out shadow-sm"
                      >
                        Save & Next <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5 Form: Experience */}
              {currentStep === 5 && (
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.02)] space-y-5 animate-in fade-in duration-300 relative z-10 text-left">
                  <div className="flex items-start gap-3 border-b border-neutral-100 pb-4">
                    <div className="w-9 h-9 rounded-lg bg-neutral-50 border border-neutral-200/80 flex items-center justify-center text-lg shadow-sm shrink-0">
                      <Briefcase className="w-5 h-5 text-neutral-600 stroke-[1.75]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-neutral-800">Work Experience</h3>
                      <p className="text-xs text-neutral-550 mt-1 leading-normal font-medium">Refine your work timeline, companies, and achievements.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
                    {experience.map((exp, idx) => (
                      <div 
                        key={idx} 
                        className="group bg-neutral-50/30 border border-neutral-200/80 rounded-xl p-3.5 space-y-2.5 relative hover:bg-neutral-50/60 transition-colors duration-150"
                      >
                        <button 
                          onClick={() => removeExperienceItem(idx)} 
                          className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-red-600 hover:bg-red-50/50 p-1.5 rounded-lg transition-[opacity,transform] duration-100 ease-out absolute right-2.5 top-2.5 bg-white border border-neutral-200/40 shadow-xs active:scale-[0.95]"
                          title="Remove experience"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
 
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Job Title</label>
                            <input
                              type="text"
                              value={exp.title}
                              placeholder="e.g. Lead Engineer"
                              onChange={(e) => updateExperienceItem(idx, "title", e.target.value)}
                              className="w-full h-11 text-xs px-2.5 border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 transition-colors"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Company</label>
                            <input
                              type="text"
                              value={exp.company}
                              placeholder="e.g. Acme Corp"
                              onChange={(e) => updateExperienceItem(idx, "company", e.target.value)}
                              className="w-full h-11 text-xs px-2.5 border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 transition-colors"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Duration</label>
                            <input
                              type="text"
                              value={exp.duration}
                              placeholder="e.g. Jan 2024 - Present"
                              onChange={(e) => updateExperienceItem(idx, "duration", e.target.value)}
                              className="w-full h-11 text-xs px-2.5 border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 transition-colors"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Key Responsibilities / Impact</label>
                          <textarea
                            value={exp.description}
                            placeholder="Built cloud infrastructure; mentored 4 junior engineers..."
                            rows={2}
                            onChange={(e) => updateExperienceItem(idx, "description", e.target.value)}
                            className="w-full text-xs px-2.5 py-1.5 border border-neutral-200 rounded-xl outline-none focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 resize-none leading-relaxed transition-colors"
                          />
                        </div>
                      </div>
                    ))}
                    {experience.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-6 bg-neutral-50/40 border border-dashed border-neutral-200/60 rounded-xl text-neutral-400 text-center animate-in fade-in duration-200">
                        <Inbox className="w-7 h-7 text-neutral-400 stroke-[1.5]" />
                        <span className="text-[11px] font-medium mt-1.5 text-neutral-500">No work history items added yet</span>
                      </div>
                    )}
                  </div>
 
                  <button
                    onClick={addExperienceItem}
                    className="w-full h-11 border border-dashed border-neutral-200 hover:border-neutral-300 rounded-xl text-xs font-semibold text-neutral-600 flex items-center justify-center gap-1.5 hover:bg-neutral-50/50 transition-transform active:scale-[0.97] duration-100 ease-out"
                  >
                    <Plus className="w-4 h-4 text-neutral-500" /> Add Work Experience
                  </button>
 
                  <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                    <button 
                      onClick={handleBackStep} 
                      className="h-11 px-4 flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl border border-neutral-200 bg-white transition-transform active:scale-[0.97] duration-100 ease-out"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="h-11 px-5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-transform active:scale-[0.97] duration-100 ease-out shadow-sm"
                    >
                      Refine with AI <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 6 Form: AI Copy Refinement Compare */}
              {currentStep === 6 && (
                <div className="overflow-hidden bg-white border border-neutral-200/80 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] animate-in fade-in duration-300 relative z-10 text-left">
                  <div className="bg-[#2A2A2F] px-6 py-4 flex items-center gap-3 text-white border-b border-neutral-800 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                      <Sparkles className="w-4 h-4 text-[#8DFFB3]" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold tracking-wider text-[#8DFFB3] uppercase block">STEP 6 OF 7 • COPYWRITING</span>
                      <h3 className="text-sm font-semibold text-white leading-tight">AI Copy Optimization</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    {optimizing ? (
                      /* AI Refinement Loading Screen */
                      <div className="py-10 flex flex-col items-center justify-center gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        <p className="text-xs font-semibold text-neutral-500 font-mono animate-pulse">Refining your portfolio details...</p>
                      </div>
                    ) : (
                      /* Comparison Screen */
                      <div className="space-y-4">
                        {/* Headline Compare */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Headline</label>
                            <span className="text-[10px] bg-[#8DFFB3]/15 text-[#369762] px-2 py-0.5 rounded-full font-bold">AI Polished</span>
                          </div>
                          
                          {/* Before (original) */}
                          {originalHeadline && originalHeadline !== editedProfile?.headline && (
                            <div className="bg-neutral-50 border border-neutral-200/50 rounded-xl p-3 text-[11px] text-neutral-500 leading-normal line-through opacity-70">
                              {originalHeadline}
                            </div>
                          )}
                          
                          {/* After (interactive input) */}
                          <input
                            type="text"
                            value={editedProfile?.headline || ""}
                            onChange={(e) => updateField("headline", e.target.value)}
                            className="w-full h-11 px-4 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-blue-500/30 bg-[#FBFBFB] focus:bg-white transition-all"
                            placeholder="Your professional headline"
                          />
                        </div>

                        {/* Bio Compare */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Bio Summary</label>
                            <span className="text-[10px] bg-[#8DFFB3]/15 text-[#369762] px-2 py-0.5 rounded-full font-bold">AI Polished</span>
                          </div>
                          
                          {/* Before (original) */}
                          {originalBio && originalBio !== editedProfile?.summary && (
                            <div className="bg-neutral-50 border border-neutral-200/50 rounded-xl p-3 text-[11px] text-neutral-500 leading-normal line-through opacity-70 max-h-24 overflow-y-auto">
                              {originalBio}
                            </div>
                          )}
                          
                          {/* After (interactive textarea) */}
                          <textarea
                            rows={4}
                            value={editedProfile?.summary || ""}
                            onChange={(e) => updateField("summary", e.target.value)}
                            className="w-full p-4 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-blue-500/30 bg-[#FBFBFB] focus:bg-white transition-all resize-none"
                            placeholder="Your professional bio summary"
                          />
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
                          <button 
                            onClick={handleBackStep} 
                            className="h-11 px-4 flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl border border-neutral-200 bg-white transition-transform active:scale-[0.97] duration-100 ease-out"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" /> Back
                          </button>
                          <button
                            onClick={() => setCurrentStep(7)}
                            className="h-11 px-5 bg-[#2A2A2F] hover:bg-[#1f1f22] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-transform active:scale-[0.97] duration-100 ease-out shadow-sm cursor-pointer"
                          >
                            Apply & Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 7 Form: Select Template */}
              {currentStep === 7 && (
                <div className="overflow-hidden bg-white border border-neutral-200/80 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] animate-in fade-in duration-300 relative z-10 text-left">
                  <div className="bg-[#2A2A2F] px-6 py-4 flex items-center gap-3 text-white border-b border-neutral-800 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                      <Palette className="w-4 h-4 text-[#8DB8FF]" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold tracking-wider text-[#8DB8FF] uppercase block">STEP 7 OF 7 • STYLES</span>
                      <h3 className="text-sm font-semibold text-white leading-tight">Theme Styles</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-2.5">
                      {["daniel-cross", "julian-mercer", "link-hunt", "biobricks"].map((id) => {
                        const isSelected = selectedTemplate === id;
                        const labelName = id === "daniel-cross" ? "Daniel Cross" : id === "julian-mercer" ? "Julian Mercer" : id === "link-hunt" ? "Link Hunt" : "Biobricks";
                        
                        let descText = "";
                        if (id === "daniel-cross") descText = "Stark, high-contrast, bold headlines";
                        if (id === "julian-mercer") descText = "Warm paper, elegant serif text";
                        if (id === "link-hunt") descText = "Centered links-in-bio aesthetic";
                        if (id === "biobricks") descText = "Grid-based bento block structure";

                        return (
                          <div
                            key={id}
                            onClick={() => selectTemplate(id as any)}
                            className={`group bg-[#FBFBFB] border p-3.5 rounded-xl cursor-pointer text-left flex flex-col justify-between h-[95px] relative active:scale-[0.97] transition-transform duration-100 ease-out ${
                              isSelected
                                ? "border-neutral-900 ring-1 ring-neutral-900 bg-neutral-50/30 shadow-sm"
                                : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/20"
                            }`}
                          >
                            <div className="pr-5">
                              <span className="text-xs font-semibold text-neutral-800 block">{labelName}</span>
                              <span className="text-[9.5px] text-neutral-500 block mt-1 leading-tight line-clamp-2">{descText}</span>
                            </div>
                            {isSelected && (
                              <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#2A2A2F] flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
                      <button 
                        onClick={handleBackStep} 
                        className="h-11 px-4 flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl border border-neutral-200 bg-white transition-transform active:scale-[0.97] duration-100 ease-out"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                      </button>
                      <button
                        onClick={() => {
                          // Confirm theme and transition straight to free-form chat (step 9)
                          setCurrentStep(9);
                          toast.success("Theme confirmed and setup complete!");
                        }}
                        className="h-11 px-5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-transform active:scale-[0.97] duration-100 ease-out shadow-sm"
                      >
                        Confirm & Finish <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Bottom input composer area */}
          <div className="p-4 shrink-0 bg-white flex flex-col border-t border-neutral-100">
            <div className={`w-full flex flex-col gap-3 ${currentStep <= 6 ? "max-w-3xl mx-auto" : ""}`}>
              {/* Show Suggestion pills on top of composer only when setup is complete (Step 9) */}
            {currentStep === 9 && (
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendChatMessage(s)}
                    className="flex-shrink-0 h-9 px-4 bg-white hover:bg-neutral-50 border border-neutral-200/60 rounded-full text-[13px] font-medium text-black transition-[background-color,transform] duration-150 whitespace-nowrap shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] cursor-pointer active:scale-[0.95]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Text input composer */}
            <div className={`bg-white rounded-[20px] p-2.5 flex flex-col gap-2 border border-neutral-200/80 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] transition-opacity duration-300 ${currentStep === 9 ? "opacity-100" : "opacity-60"}`}>
              <textarea
                disabled={currentStep !== 9}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && currentStep === 9) {
                    e.preventDefault();
                    sendChatMessage();
                  }
                }}
                className={`w-full bg-transparent border-none resize-none focus:ring-0 text-[14px] px-2.5 py-1.5 outline-none font-inter ${currentStep === 9 ? "text-neutral-800 placeholder:text-neutral-400 cursor-text" : "text-neutral-400 placeholder:text-neutral-400 cursor-not-allowed"}`}
                placeholder={currentStep === 9 ? "Ask Webild to adjust copy, headline, template style..." : "Complete wizard steps above to proceed..."}
                rows={2}
              />
              <div className="flex items-center justify-between px-1">
                <button
                  disabled={currentStep !== 9}
                  onClick={() => toast.info("Attachments coming soon!")}
                  className={`w-9 h-9 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center transition-colors border-none ${currentStep === 9 ? "hover:bg-neutral-200 cursor-pointer" : "cursor-not-allowed"}`}
                >
                  <Plus className="w-[18px] h-[18px]" />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentStep !== 9}
                    onClick={() => toast.info("Voice input coming soon!")}
                    className={`w-9 h-9 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center transition-colors border-none ${currentStep === 9 ? "hover:bg-neutral-200 cursor-pointer" : "cursor-not-allowed"}`}
                  >
                    <Mic className="w-[18px] h-[18px]" />
                  </button>
                  <button
                    disabled={currentStep !== 9}
                    onClick={() => sendChatMessage()}
                    className={`w-9 h-9 rounded-full text-white flex items-center justify-center transition-[background-color,transform] duration-100 border-none ${currentStep === 9 ? "bg-[#8DB8FF] hover:bg-[#7ca8f0] cursor-pointer active:scale-[0.93]" : "bg-neutral-200 cursor-not-allowed"}`}
                  >
                    <ArrowUp className="w-[18px] h-[18px]" />
                  </button>
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
      <main 
        className={`flex-1 h-full flex flex-col bg-white overflow-hidden p-5 gap-3 ${
          activeNav === 1 && currentStep <= 6 ? "hidden" : ""
        }`}
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
                  disabled={activeNav === 1 && currentStep <= 6}
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
                    activeNav === 1 && currentStep <= 6
                      ? "opacity-30 cursor-not-allowed bg-[#F7F7F7] border-[#E6E6E6] text-neutral-450"
                      : isSelectionMode
                      ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
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
              <div className="flex items-center bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg overflow-hidden p-0.5 gap-0.5">
                <button
                  onClick={() => setPreviewMode("desktop")}
                  disabled={activeNav === 1 && currentStep <= 6}
                  className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${
                    activeNav === 1 && currentStep <= 6
                      ? "opacity-30 cursor-not-allowed"
                      : previewMode === "desktop"
                      ? "bg-white shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] text-[#2A2A2F]"
                      : "text-[#171717]/40 hover:text-[#2A2A2F]"
                  }`}
                  title="Desktop preview"
                >
                  <Monitor className="w-[14px] h-[14px]" />
                </button>
                <button
                  onClick={() => setPreviewMode("tablet")}
                  disabled={activeNav === 1 && currentStep <= 6}
                  className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${
                    activeNav === 1 && currentStep <= 6
                      ? "opacity-30 cursor-not-allowed"
                      : previewMode === "tablet"
                      ? "bg-white shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] text-[#2A2A2F]"
                      : "text-[#171717]/40 hover:text-[#2A2A2F]"
                  }`}
                  title="Tablet preview"
                >
                  <Tablet className="w-[14px] h-[14px]" />
                </button>
                <button
                  onClick={() => setPreviewMode("mobile")}
                  disabled={activeNav === 1 && currentStep <= 6}
                  className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${
                    activeNav === 1 && currentStep <= 6
                      ? "opacity-30 cursor-not-allowed"
                      : previewMode === "mobile"
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
                    // Reset to a sensible width if it's default
                    if (resizableWidth === 800) {
                      setResizableWidth(800);
                    }
                  }}
                  disabled={activeNav === 1 && currentStep <= 6}
                  className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${
                    activeNav === 1 && currentStep <= 6
                      ? "opacity-30 cursor-not-allowed"
                      : previewMode === "resizable"
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
            className={`flex-1 flex items-center justify-center overflow-hidden relative transition-all duration-500 ${
              activeNav === 1 && currentStep <= 6 
                ? "bg-[#FBFBFB] bg-[radial-gradient(#E8E8E8_1.5px,transparent_1.5px)] [background-size:32px_32px] p-8" 
                : "bg-[#F5F5F7] bg-[radial-gradient(#E2E2E9_1.2px,transparent_1.2px)] [background-size:24px_24px] p-6"
            }`}
          >
            <AnimatePresence mode="wait">
              
              {/* Show SVG animations when Wizard (activeNav === 1) is active and currentStep <= 6 */}
              {activeNav === 1 && currentStep <= 6 ? (
                <motion.div
                  key={`anim-${currentStep}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full flex items-center justify-center"
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
                /* Show resizable Live Preview for template choosing/publishing or other tabs */
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
              )}

            </AnimatePresence>
          </div>

        </div>
      </main>

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
