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
  Plus,
} from "lucide-react";
import { toast } from "sonner";

import { UserMenu } from "@/components/UserMenu";
import { useEditor } from "@/context/EditorContext";
import ProfilePreview from "@/app/editor/components/ProfilePreview";
import { MOCK_PROFILE } from "@/shared/types";
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
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-40">
        <img
          src="/bg.png"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFB]/40 via-white/80 to-[#FBFBFB]" />
      </div>

      {/* ── Frosted Navbar/Top-bar ── */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white/70 backdrop-blur-xl border-b border-neutral-200/55 px-6 z-50 flex items-center justify-between select-none shadow-none">
        {/* Left Logo Side */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Webild"
            className="h-7 w-auto object-contain cursor-pointer hover:opacity-85 transition-opacity"
            onClick={() => router.push("/")}
          />
          <div className="w-px h-4 bg-neutral-200" />
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">
            Dashboard
          </span>
        </div>

        {/* Right Action Side */}
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => {
              const sub = websites[0]
                ? `${websites[0].subdomainSlug}.linkedpage.io`
                : "linkedpage.io";
              navigator.clipboard.writeText(`https://${sub}`);
              toast.success("Site link copied to clipboard!");
            }}
            className="h-8 px-3.5 text-xs font-semibold bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg text-neutral-700 active:scale-[0.97] transition-all shadow-xs"
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
            className="h-8 px-4 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-all active:scale-[0.97] shadow-xs"
          >
            Publish
          </button>

          <div className="w-px h-4 bg-neutral-200 mx-1" />

          {/* User Menu Avatar Trigger */}
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-8 h-8 rounded-lg bg-neutral-100 overflow-hidden border border-neutral-200 hover:scale-105 active:scale-95 transition-transform ml-1 shadow-xs"
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
        <aside className="w-[260px] border-r border-neutral-200/50 bg-neutral-50/20 backdrop-blur-xl px-5 py-6 flex flex-col justify-between hidden md:flex h-[calc(100vh-3.5rem)] sticky top-14 select-none">
          {/* Top navigation items */}
          <div className="flex flex-col gap-6">
            {/* New Website Button */}
            <button
              onClick={() => router.push("/onboarding")}
              className="w-full h-10 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] transition-transform duration-100 ease-out rounded-lg flex items-center justify-center gap-2 text-xs font-bold text-white shadow-xs"
            >
              <Plus className="w-4 h-4 text-white" />
              New Website
            </button>

            {/* Menu Items */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => router.push("/")}
                className="w-full h-9 px-3 rounded-lg hover:bg-neutral-100/60 flex items-center gap-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <Home className="w-4 h-4 text-neutral-500" />
                Home
              </button>

              <button
                onClick={() => router.push("/editor")}
                className="w-full h-9 px-3 rounded-lg hover:bg-neutral-100/60 flex items-center gap-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <Layout className="w-4 h-4 text-neutral-500" />
                Templates
              </button>

              {/* Active Tab */}
              <button className="w-full h-9 px-3 rounded-lg bg-neutral-100 border border-neutral-200/50 flex items-center gap-2.5 text-xs font-bold text-neutral-900 transition-all shadow-xs">
                <Folder className="w-4 h-4 text-neutral-800" />
                All Websites
              </button>
            </div>

            {/* Recent Websites Section */}
            <div className="flex flex-col gap-1 pt-4 border-t border-neutral-200/50">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-3 block mb-1">
                Recent websites
              </span>

              <div
                onClick={() =>
                  websites[0] && router.push(`/editor?id=${websites[0].id}`)
                }
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-neutral-100/60 cursor-pointer transition-colors"
              >
                <div className="w-5.5 h-5.5 rounded bg-white flex items-center justify-center border border-neutral-200 overflow-hidden p-0.5 shrink-0 shadow-xs">
                  <img
                    src="/logoicon.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs font-semibold text-neutral-700 truncate">
                  {websites[0]?.brandName || "No recent sites"}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom navigation & pricing items */}
          <div className="flex flex-col gap-1 border-t border-neutral-200/50 pt-4">
            <button
              onClick={() => router.push("/pricing")}
              className="w-full h-9 px-3 rounded-lg hover:bg-neutral-100/60 flex items-center gap-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <CreditCard className="w-4 h-4 text-neutral-500" />
              Pricing
            </button>

            <button
              onClick={() => router.push("/docs")}
              className="w-full h-9 px-3 rounded-lg hover:bg-neutral-100/60 flex items-center gap-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-neutral-500" />
              Documentation
            </button>

            <button
              onClick={() => router.push("/settings")}
              className="w-full h-9 px-3 rounded-lg hover:bg-neutral-100/60 flex items-center gap-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <Settings className="w-4 h-4 text-neutral-500" />
              Settings
            </button>
          </div>
        </aside>

        {/* ── Main Content Area ── */}
        <main className="flex-1 flex flex-col items-center px-8 md:px-12 py-12">
          {/* User Provided Search and Title Container */}
          <div className="flex flex-col gap-3.5 items-center text-center w-full max-w-lg mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 flex items-center justify-center gap-2 flex-wrap">
              <span>All</span>{" "}
              <img
                className="h-[1em] w-auto object-contain align-middle shrink-0"
                height={40}
                width={40}
                src="/logoicon.png"
                alt="Logo"
              />{" "}
              <span>Websites</span>
            </h2>
            <p className="text-balance text-xs md:text-sm font-medium text-neutral-500 max-w-sm">
              Manage and access all your website drafts and published micro-sites in one place.
            </p>
            
            {/* Search input bar */}
            <div className="relative flex items-center gap-2 px-3.5 h-10.5 rounded-xl border border-neutral-200/80 bg-white w-full md:w-80 text-sm mt-3 focus-within:ring-2 focus-within:ring-neutral-900/5 focus-within:border-neutral-450 transition-all shadow-xs">
              <svg
                className="lucide lucide-search h-4 w-4 text-neutral-400 shrink-0"
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
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
              <input
                className="w-full placeholder:text-neutral-400 focus:outline-none text-xs text-neutral-800 bg-transparent border-none p-0 focus:ring-0 font-medium"
                type="text"
                placeholder="Search websites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                    className="flex flex-col gap-3.5 p-3.5 rounded-xl bg-white border border-neutral-200/80 animate-pulse shadow-xs"
                  >
                    <div className="w-full bg-neutral-100 rounded-lg aspect-video" />
                    <div className="flex flex-col gap-2 mt-1 px-1">
                      <div className="h-4 bg-neutral-200 rounded w-1/3" />
                      <div className="h-3 bg-neutral-150 rounded w-2/3" />
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
                        className="relative flex flex-col gap-3.5 p-3.5 cursor-pointer rounded-xl bg-white border border-neutral-200/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 group/card shadow-xs"
                      >
                        <div
                          onClick={() => router.push(`/editor?id=${web.id}`)}
                          className="relative w-full bg-neutral-50 rounded-lg overflow-hidden aspect-video border border-neutral-200/60 flex items-center justify-center group-hover/card:border-neutral-300 transition-colors"
                        >
                          {/* Miniature mockup preview of the compiled website */}
                          <div className="absolute inset-0 p-3 flex items-center justify-center">
                            <div className="w-full h-full rounded-md border border-neutral-200/60 shadow-xs overflow-hidden bg-white relative flex flex-col">
                              {/* Mock macOS dots for realistic iframe header view */}
                              <div className="h-4 shrink-0 bg-neutral-50 border-b border-neutral-200/50 px-2 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-[#E45A5A]/85" />
                                <span className="w-1 h-1 rounded-full bg-[#FFBD2E]/85" />
                                <span className="w-1 h-1 rounded-full bg-[#369762]/85" />
                              </div>
                              <div className="flex-1 w-full overflow-hidden relative bg-white">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.22] origin-center shrink-0">
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
                        <div className="flex items-start justify-between relative min-w-0 px-1">
                          <div className="min-w-0 max-w-[75%] flex flex-col">
                            <h3 className="text-[13px] font-bold text-neutral-800 truncate">
                              {web.brandName}
                            </h3>
                            <div className="mt-1">
                              {web.isPublished ? (
                                <span className="text-[11px] font-bold text-[#369762] flex items-center gap-1.5 leading-none">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#369762] animate-pulse" />
                                  Live: {web.subdomainSlug}.linkedpage.io
                                </span>
                              ) : (
                                <span className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1.5 leading-none">
                                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                                  Draft (Unpublished)
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 relative flex-shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const sub = web.subdomainSlug
                                  ? `${web.subdomainSlug}.linkedpage.io`
                                  : "linkedpage.io";
                                navigator.clipboard.writeText(`https://${sub}`);
                                toast.success("Site link copied to clipboard!");
                              }}
                              className="inline-flex h-8 px-2.5 text-[11px] font-bold cursor-pointer items-center justify-center rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 active:scale-[0.95] transition-transform shadow-xs"
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
                              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-neutral-50 text-neutral-550 transition-colors my-auto"
                            >
                              <svg
                                className="lucide lucide-ellipsis w-4 h-4"
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
                            <AnimatePresence>
                              {isDropdownOpen && (
                                <>
                                  <div
                                    className="fixed inset-0 z-10 cursor-default"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveDropdownId(null);
                                    }}
                                  />
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                    className="absolute right-0 bottom-10 z-20 w-44 bg-white/95 backdrop-blur-xl border border-neutral-200/80 rounded-xl py-1.5 flex flex-col shadow-lg"
                                  >
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const sub = web.subdomainSlug
                                          ? `${web.subdomainSlug}.linkedpage.io`
                                          : "linkedpage.io";
                                        navigator.clipboard.writeText(
                                          `https://${sub}`,
                                        );
                                        toast.success(
                                          "Site link copied to clipboard!",
                                        );
                                        setActiveDropdownId(null);
                                      }}
                                      className="px-3.5 py-2 text-left text-[12px] font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 transition-colors"
                                    >
                                      <Share2 className="w-3.5 h-3.5 text-neutral-400" />
                                      Share Link
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveDropdownId(null);
                                        router.push(`/editor?id=${web.id}`);
                                      }}
                                      className="px-3.5 py-2 text-left text-[12px] font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 transition-colors"
                                    >
                                      <Edit2 className="w-3.5 h-3.5 text-neutral-400" />
                                      Edit in Builder
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveDropdownId(null);
                                        router.push(`/preview?id=${web.id}`);
                                      }}
                                      className="px-3.5 py-2 text-left text-[12px] font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 transition-colors"
                                    >
                                      <Globe className="w-3.5 h-3.5 text-neutral-400" />
                                      View Live Preview
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveDropdownId(null);
                                        handleDeleteSite(web.id);
                                      }}
                                      className="px-3.5 py-2 text-left text-[12px] font-bold text-[#E45A5A] hover:bg-red-50 flex items-center gap-2 border-t border-neutral-100 mt-1 pt-2 transition-colors"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      Delete site
                                    </button>
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
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
