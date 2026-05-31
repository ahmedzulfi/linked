"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import { type TemplateId, TEMPLATES } from "@/shared/types";
import ProfilePreview from "./components/ProfilePreview";
import ChatPane, { ChatTab } from "./components/ChatPane";
import DomainsPane from "./components/DomainsPane";
import SettingsPane from "./components/SettingsPane";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { UserMenu } from "@/components/UserMenu";

// ─── Left Sidebar Icons ────────────────────────────────────────────────────────
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
    active: true,
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

// ─── Main editor inner ─────────────────────────────────────────────────────────
function EditorInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    editedProfile,
    selectedTemplate,
    updateField,
    selectTemplate,
    useMockProfile,
    isDirty,
    resetEdits,
  } = useEditor();

  const [activeNav, setActiveNav] = useState(1); // Templates active by default
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [publishing, setPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState<ChatTab>("chat");
  const [editorTab, setEditorTab] = useState<"profile" | "experience" | "links">("profile");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingCoords, setOnboardingCoords] = useState<{
    templates?: DOMRect;
    publish?: DOMRect;
    preview?: DOMRect;
  }>({});

  useEffect(() => {
    if (searchParams.get("onboarding") === "true") {
      setShowOnboarding(true);
      setActiveTab("grid"); // Set to Grid (Templates) tab initially during onboarding
    }
    
    try {
      const userStr = sessionStorage.getItem("linkedpage_user");
      if (userStr) {
        const user = JSON.parse(userStr);
        setUserName(user.name || "");
        setUserEmail(user.email || "");
      }
    } catch (e) {
      console.error(e);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!showOnboarding) return;

    const measure = () => {
      const templatesEl = document.getElementById("onboarding-templates-tab");
      const publishEl = document.getElementById("onboarding-publish-btn");
      const previewEl = document.getElementById("onboarding-preview-canvas");

      setOnboardingCoords({
        templates: templatesEl?.getBoundingClientRect(),
        publish: publishEl?.getBoundingClientRect(),
        preview: previewEl?.getBoundingClientRect(),
      });
    };

    // Delay a short amount to ensure render completion before measurement
    const t = setTimeout(measure, 600);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [showOnboarding]);

  useEffect(() => {
    if (!editedProfile) useMockProfile();
  }, [editedProfile, useMockProfile]);

  useEffect(() => {
    const t = searchParams.get("template") as TemplateId | null;
    if (t) selectTemplate(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommand = (cmd: string) => {
    const lower = cmd.toLowerCase();
    for (const tpl of TEMPLATES) {
      if (lower.includes(tpl.name.toLowerCase()) || lower.includes(tpl.id)) {
        selectTemplate(tpl.id);
        toast.success(`Applied template: ${tpl.name}`);
        return;
      }
    }
    if (lower.includes("dark")) { selectTemplate("dark"); toast.success("Dark mode template applied!"); }
  };

  const handlePublish = async () => {
    setPublishing(true);
    toast.loading("Publishing your page…");
    
    try {
      const userStr = sessionStorage.getItem("linkedpage_user");
      const user = userStr ? JSON.parse(userStr) : null;
      const email = user?.email || "guest@linkedpage.io";
      
      const sub = sessionStorage.getItem("linkedpage_subdomain") || 
        `${(editedProfile?.name || "portfolio").toLowerCase().replace(/\s+/g, "")}.linkedpage.io`;
      const slug = sub.replace(".io", "").replace(".linkedpage", "");

      const res = await fetch("/api/websites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: editedProfile?.name || "My Portfolio",
          subdomain: sub,
          template: selectedTemplate,
          profileData: editedProfile,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to publish website");
      }

      toast.dismiss();
      toast.success("Your page is live! 🎉");
      router.push(`/publish?slug=${slug}`);
    } catch (err: any) {
      toast.dismiss();
      toast.error(err.message || "Failed to publish website. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  const handleFieldClick = (fieldName: string) => {
    setActiveTab("theme");
    if (fieldName === "experience") {
      setEditorTab("experience");
    } else if (fieldName === "links") {
      setEditorTab("links");
    } else {
      setEditorTab("profile");
    }
    
    setTimeout(() => {
      const el = document.getElementById(`editor-field-${fieldName}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        const inputEl = el.querySelector("input, textarea");
        if (inputEl) {
          (inputEl as HTMLElement).focus();
        } else {
          (el as HTMLElement).focus();
        }
      }
    }, 150);
  };

  const profileName = editedProfile?.name ?? "Your Profile";

  // Preview scale
  const desktopScale = 0.58;
  const mobileScale = 0.45;

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 font-inter select-none">

      {/* ── Left Sidebar ── */}
      <div className="w-[60px] h-full shrink-0 relative z-[60]">
        <aside className="absolute top-0 left-0 h-full w-[60px] hover:w-[250px] bg-white/60 backdrop-blur-xl border-r border-[#0101]/5 transition-all duration-300 overflow-hidden flex flex-col justify-between group   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] hover:shadow-[0_8px_32px_#ffff] py-4">
          <div className="flex flex-col items-start w-full">
            {/* Project Selector */}
            <div className="flex items-center px-[10px] mb-4 w-full cursor-pointer group/project relative">
              <div className="w-10 h-10 flex shrink-0 items-center justify-center rounded-[12px] bg-white border border-[#E6E6E6] text-[#2A2A2F] font-semibold text-[15px]   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] group-hover:mr-3 transition-all duration-300 relative z-10 overflow-hidden p-1.5">
                <img src="/logoicon.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex items-center justify-between w-[170px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-[62px] pointer-events-none group-hover:pointer-events-auto">
                <span className="font-medium text-[#2A2A2F] text-[15px]">hi hellow</span>
                <svg className="w-5 h-5 text-[#171717]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="w-full px-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="h-px w-full bg-[#E6E6E6]/60" />
            </div>

            {/* Nav Items */}
            <nav className="flex flex-col gap-[2px] w-full px-2">
              {navItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i === 0) {
                      router.push("/dashboard");
                    } else {
                      setActiveNav(i);
                    }
                  }}
                  title={item.label}
                  className={`w-full flex items-center h-[38px] px-2 rounded-[10px] transition-all duration-150 ${activeNav === i
                    ? "bg-[#ebf5ff] text-[#3b82f6] border border-[#3b82f6]/20   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
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
            {/* Upgrade Card */}
            <div className="px-3 w-full mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-[250px] overflow-hidden flex-shrink-0">
              <div className="relative p-[14px] bg-white border border-[#E6E6E6] rounded-[14px]   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] overflow-hidden text-left mt-2">
                <p className="text-[14px] font-semibold text-[#2A2A2F] leading-[1.3] mb-3">
                  ONLY $16 to<br />unlock Premium<br />Features
                </p>
                <button className="w-full py-1.5 bg-[#4b93ff] text-white     rounded-lg  text-[13px] font-medium hover:bg-[#3b82f6] transition-colors   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                  Upgrade Now
                </button>
              </div>
            </div>

            {/* Bottom Links */}
            <div className="flex flex-col gap-1 w-full px-2">
              <button className="w-full flex items-center h-9 px-2 rounded-[10px] text-[#171717]/70 hover:bg-[#E6E6E6]/50 hover:text-[#2A2A2F] transition-all duration-150 relative">
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
              <button className="w-full flex items-center h-9 px-2 rounded-[10px] text-[#171717]/70 hover:bg-[#E6E6E6]/50 hover:text-[#2A2A2F] transition-all duration-150 relative">
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
              <button className="w-full flex items-center h-9 px-2 rounded-[10px] text-[#171717]/80 hover:bg-[#E6E6E6]/50 hover:text-[#2A2A2F] transition-all duration-150 relative">
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
      {activeNav === 1 && (
        <ChatPane
          onCommand={handleCommand}
          profileName={profileName}
          profile={editedProfile}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={selectTemplate}
          onChangeField={updateField}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          editorTab={editorTab}
          setEditorTab={setEditorTab}
        />
      )}
      {activeNav === 2 && (
        <DomainsPane />
      )}
      {activeNav === 3 && (
        <SettingsPane profileName={profileName} router={router} />
      )}

      {/* ── Canvas ── */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden relative p-5 gap-3">

        {/* ── Top bar (outside card) ── */}
        <div className="flex items-center justify-between shrink-0 h-9  bg-white">
          {/* Left: Upgrade Plan & Saving Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => toast.info("Upgrade to Pro for custom domains, priority support & more!")}
              className="flex items-center gap-2 h-10 px-2  text-sm font-medium bg-white border border-[#E6E6E6]   rounded-sm text-[#2A2A2F] hover:bg-[#F7F7F7] transition-colors   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
              style={{ boxShadow: " 0 1px 4px #fff" }}
            >
              <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>

            {/* Changes saved dot indicator */}
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

          {/* Right: Share + Publish + Avatar */}
          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => { navigator.clipboard.writeText(`https://linkedpage.io/${editedProfile?.name.toLowerCase().replace(/\s+/g, "-") ?? "profile"}`); toast.success("Share link copied!"); }}
              className="h-8 px-4 text-sm font-medium bg-white border border-[#E6E6E6]   rounded-lg text-[#2A2A2F] hover:bg-[#F7F7F7] transition-colors   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
            >
              Share
            </button>
            <button
              id="onboarding-publish-btn"
              onClick={handlePublish}
              disabled={publishing}
              className="h-8 px-5 text-sm font-medium bg-[#3b82f6] text-white   rounded-lg hover:bg-[#2563eb] transition-colors active:scale-[0.97] flex items-center gap-1.5   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
            >
              {publishing && <span className="w-3 h-3   rounded-lg border-2 border-white border-t-transparent animate-spin" />}
              Publish
            </button>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-8 h-8   rounded-lg bg-[#E6E6E6] overflow-hidden border-2 border-white   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] hover:scale-105 active:scale-95 transition-transform ml-1"
            >
              <img src={editedProfile?.avatarUrl ?? "https://i.pravatar.cc/80?img=47"} alt="Avatar" className="w-full h-full object-cover" />
            </button>
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

        {/* ── Canvas card ── */}
        <div className="relative flex-1 bg-white/75  backdrop-blur-xl  rounded-[14px] flex flex-col overflow-hidden shadow-[0_4px_24px_#ffff,0_0_0_1px_rgba(255,255,255,0.6)_inset]">

          {/* ── Canvas toolbar ── */}
          <div className="relative z-30 flex items-center gap-3 w-full h-[54px]  border-b border-white/30 shrink-0 bg-white/50 backdrop-blur-md">

            {/* Left: Customize + Page */}
            <div className="flex items-center gap-2">
              {/* Customize button */}
              <div className="relative group">
                <button className="flex items-center gap-2 h-8 px-3 text-sm font-medium bg-[#F7F7F7] border border-[#E6E6E6]     rounded-lg  text-[#2A2A2F] hover:bg-[#F0F0F0] transition-colors">
                  <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" viewBox="0 0 24 24">
                    <path d="M14 4.1 12 6" /><path d="m5.1 8-2.9-.8" /><path d="m6 12-1.9 2" />
                    <path d="M7.2 2.2 8 5.1" />
                    <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
                  </svg>
                  Customize
                </button>
                <div className="hidden md:block absolute z-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 left-full top-1/2 -translate-y-1/2 ml-2">
                  <div className="absolute w-2 h-2 bg-[#171717] rotate-45 -left-1 top-1/2 -translate-y-1/2" />
                  <div className="relative px-3 py-1 text-xs text-white bg-[#171717]     rounded-lg  whitespace-nowrap">Edit text, images, colors, fonts, and layouts</div>
                </div>
              </div>

              {/* Page switcher */}
              <div className="relative group">
                <button className="flex items-center gap-2 h-8 px-3 text-sm font-medium bg-[#F7F7F7] border border-[#E6E6E6]     rounded-lg  text-[#2A2A2F] hover:bg-[#F0F0F0] transition-colors">
                  <span className="text-sm leading-tight">Home</span>
                  <svg className="w-3.5 h-3.5 text-[#171717]/50" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="hidden md:block absolute z-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 top-full left-1/2 -translate-x-1/2 mt-2">
                  <div className="absolute w-2 h-2 bg-[#171717] rotate-45 -top-1 left-1/2 -translate-x-1/2" />
                  <div className="relative px-3 py-1 text-xs text-white bg-[#171717]     rounded-lg  whitespace-nowrap">Switch and manage site pages</div>
                </div>
              </div>
            </div>

            {/* Center: domain availability banner */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3 px-4 h-9 bg-[#F7F7F7] border border-[#E6E6E6]     rounded-lg ">
                <span className="flex items-center min-w-0 gap-2 text-sm font-medium">
                  <svg className="w-[14px] h-[14px] text-[#3b82f6] shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                    <path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" />
                  </svg>
                  <span className="min-w-0 truncate text-[#3b82f6] font-medium">
                    {editedProfile?.name.toLowerCase().replace(/\s+/g, "") ?? "yourname"}.linkedpage.io
                  </span>
                  <span className="hidden lg:inline text-[#2A2A2F] font-normal">is available!</span>
                </span>
              </div>
            </div>

            {/* Right: undo/redo + history + device toggle (icon-only) */}
            <div className="flex items-center gap-1.5">
              {/* Undo */}
              <div className="relative group">
                <button disabled className="w-8 h-8 flex items-center justify-center     rounded-lg  text-[#171717]/30 cursor-not-allowed">
                  <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
                  </svg>
                </button>
              </div>

              {/* Redo */}
              <div className="relative group">
                <button disabled className="w-8 h-8 flex items-center justify-center     rounded-lg  text-[#171717]/30 cursor-not-allowed">
                  <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m15 14 5-5-5-5" /><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" />
                  </svg>
                </button>
              </div>

              {/* History */}
              <div className="relative group">
                <button disabled className="w-8 h-8 flex items-center justify-center     rounded-lg  text-[#171717]/30 cursor-not-allowed">
                  <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" />
                  </svg>
                </button>
                <div className="absolute z-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 top-full left-1/2 -translate-x-1/2 mt-2">
                  <div className="absolute w-2 h-2 bg-[#171717] rotate-45 -top-1 left-1/2 -translate-x-1/2" />
                  <div className="relative px-3 py-1 text-xs text-white bg-[#171717]     rounded-lg  whitespace-nowrap">Version history</div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-4 bg-[#E6E6E6] mx-0.5" />

              {/* Device toggle */}
              <div className="relative group">
                <div className="flex items-center bg-[#F7F7F7] border border-[#E6E6E6]     rounded-lg  overflow-hidden p-0.5 gap-0.5">
                  <button
                    onClick={() => setPreviewMode("desktop")}
                    className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${previewMode === "desktop" ? "bg-white   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] text-[#2A2A2F]" : "text-[#171717]/40 hover:text-[#2A2A2F]"}`}
                  >
                    <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                      <rect height="14" width="20" rx="2" x="2" y="3" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setPreviewMode("mobile")}
                    className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-all duration-200 ${previewMode === "mobile" ? "bg-white   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] text-[#2A2A2F]" : "text-[#171717]/40 hover:text-[#2A2A2F]"}`}
                  >
                    <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                      <rect height="20" width="14" rx="2" ry="2" x="5" y="2" /><path d="M12 18h.01" />
                    </svg>
                  </button>
                </div>
                <div className="absolute z-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 right-full top-1/2 -translate-y-1/2 mr-2">
                  <div className="absolute w-2 h-2 bg-[#171717] rotate-45 -right-1 top-1/2 -translate-y-1/2" />
                  <div className="relative px-3 py-1 text-xs text-white bg-[#171717]     rounded-lg  whitespace-nowrap">Switch between desktop and mobile</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Preview Area ── */}
          <div className="flex-1 flex items-center justify-center overflow-hidden bg-[#F9F9F9] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedTemplate}-${previewMode}`}
                id="onboarding-preview-canvas"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="w-full h-full flex items-center justify-center p-6"
              >
                {editedProfile ? (
                  previewMode === "desktop" ? (
                    /* Desktop canvas */
                    <div
                      className="rounded-[16px] overflow-hidden border border-[#E6E6E6] bg-white shadow-[0_8px_40px_-8px_#ffff,0_2px_8px_#ffff]"
                      style={{ width: 1024 * desktopScale, height: 768 * desktopScale }}
                    >
                      <div style={{ width: 1024, height: 768, transform: `scale(${desktopScale})`, transformOrigin: "top left", overflow: "auto" }}>
                        <ProfilePreview profile={editedProfile} template={selectedTemplate} onFieldClick={handleFieldClick} />
                      </div>
                    </div>
                  ) : (
                    /* Mobile canvas */
                    <div
                      className="rounded-[32px] overflow-hidden border-[7px] border-[#2A2A2F] bg-white shadow-[0_16px_48px_-12px_#ffff]"
                      style={{ width: 375 * mobileScale, height: 812 * mobileScale }}
                    >
                      <div style={{ width: 375, height: 812, transform: `scale(${mobileScale})`, transformOrigin: "top left", overflow: "auto" }}>
                        <ProfilePreview profile={editedProfile} template={selectedTemplate} onFieldClick={handleFieldClick} />
                      </div>
                    </div>
                  )
                ) : (
                  /* Empty state */
                  <div
                    className="rounded-[16px] overflow-hidden border border-[#E6E6E6] bg-white flex flex-col items-center justify-center shadow-[0_8px_40px_-8px_#ffff]"
                    style={{ width: 1024 * desktopScale, height: 768 * desktopScale }}
                  >
                    <div className="flex flex-col items-center text-center max-w-sm gap-4">
                      <div className="w-14 h-14 bg-[#2A2A2F] rounded-[18px] flex items-center justify-center transform rotate-3   shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
                        <svg className="w-5 h-5 text-white transform -rotate-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-medium text-[#2A2A2F]">Paste your LinkedIn URL</h2>
                      <p className="text-sm text-[#9CA3AF]">Use the chat panel to paste a LinkedIn URL and generate your micro-site.</p>
                      <button onClick={() => router.push("/")} className="mt-2 px-4 py-2 bg-[#2A2A2F] text-white text-sm font-medium     rounded-lg  hover:bg-[#3A3A42] transition-colors">
                        Go to home
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </main>

      {/* ── Onboarding Overlay ── */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setShowOnboarding(false);
              const params = new URLSearchParams(window.location.search);
              params.delete("onboarding");
              const query = params.toString();
              router.replace(`${window.location.pathname}${query ? `?${query}` : ""}`);
            }}
            className="fixed inset-0 z-[100] cursor-pointer bg-black/15 backdrop-blur-[1px]"
          >
            {onboardingCoords.templates && (
              <div
                className="absolute pointer-events-none"
                style={{
                  top: onboardingCoords.templates.top + onboardingCoords.templates.height / 2,
                  left: onboardingCoords.templates.left + onboardingCoords.templates.width / 2,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-6 h-6 rounded-full bg-[#8DB8FF]/30 flex items-center justify-center relative">
                  <span className="absolute inset-0 rounded-full bg-[#8DB8FF]/40 animate-ping" style={{ animationDuration: "1.5s" }} />
                  <div className="w-3 h-3 rounded-full bg-[#3b82f6] border-2 border-white shadow-sm" />
                </div>
                <div
                  className="absolute bg-white border border-[#E6E6E6] rounded-xl p-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] whitespace-nowrap text-left flex flex-col gap-0.5"
                  style={{
                    top: onboardingCoords.templates.height / 2 + 10,
                    left: 0,
                  }}
                >
                  <span className="text-[12px] font-bold text-black">🎨 Templates</span>
                  <span className="text-[10px] text-[#171717]/60">Switch layouts instantly</span>
                </div>
              </div>
            )}

            {onboardingCoords.publish && (
              <div
                className="absolute pointer-events-none"
                style={{
                  top: onboardingCoords.publish.top + onboardingCoords.publish.height / 2,
                  left: onboardingCoords.publish.left + onboardingCoords.publish.width / 2,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-6 h-6 rounded-full bg-[#8DFFB3]/30 flex items-center justify-center relative">
                  <span className="absolute inset-0 rounded-full bg-[#8DFFB3]/40 animate-ping" style={{ animationDuration: "1.5s" }} />
                  <div className="w-3 h-3 rounded-full bg-[#369762] border-2 border-white shadow-sm" />
                </div>
                <div
                  className="absolute bg-white border border-[#E6E6E6] rounded-xl p-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] whitespace-nowrap text-left flex flex-col gap-0.5"
                  style={{
                    top: onboardingCoords.publish.height / 2 + 10,
                    right: 0,
                    transform: "translateX(30%)",
                  }}
                >
                  <span className="text-[12px] font-bold text-black">🚀 Go Live</span>
                  <span className="text-[10px] text-[#171717]/60">Go live in one click</span>
                </div>
              </div>
            )}

            {onboardingCoords.preview && (
              <div
                className="absolute pointer-events-none"
                style={{
                  top: onboardingCoords.preview.top + onboardingCoords.preview.height / 2,
                  left: onboardingCoords.preview.left + onboardingCoords.preview.width / 2,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-6 h-6 rounded-full bg-[#8DB8FF]/30 flex items-center justify-center relative">
                  <span className="absolute inset-0 rounded-full bg-[#8DB8FF]/40 animate-ping" style={{ animationDuration: "1.5s" }} />
                  <div className="w-3 h-3 rounded-full bg-[#3b82f6] border-2 border-white shadow-sm" />
                </div>
                <div
                  className="absolute bg-white border border-[#E6E6E6] rounded-xl p-3.5 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] whitespace-nowrap text-center flex flex-col gap-0.5"
                  style={{
                    top: 24,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <span className="text-[12px] font-bold text-black">✏️ Click to Edit</span>
                  <span className="text-[10px] text-[#171717]/60">Click any text to edit</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div >
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center bg-[#F7F7F7]">
          <div className="w-5 h-5   rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
        </div>
      }
    >
      <EditorInner />
    </Suspense>
  );
}
