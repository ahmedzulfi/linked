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
  Globe,
  Share2,
  Search,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";

import { UserMenu } from "@/components/UserMenu";
import { useEditor } from "@/context/EditorContext";
import ProfilePreview from "@/app/editor/components/ProfilePreview";
import { MOCK_PROFILE } from "@/shared/types";
import { AnimatedDashboardEmptyIllustration } from "@/components/AnimatedSVGs";

export default function DashboardPage() {
  const router = useRouter();
  const { editedProfile } = useEditor();

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

  const filteredWebsites = websites.filter((web) => {
    const term = searchQuery.toLowerCase();
    return (
      !term ||
      web.brandName.toLowerCase().includes(term) ||
      web.subdomainSlug.toLowerCase().includes(term)
    );
  });

  const userAvatarUrl = websites[0]?.profile?.avatarUrl ?? "https://i.pravatar.cc/80?img=47";

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans flex flex-col text-neutral-800 antialiased relative overflow-x-hidden">
      
      {/* ── Background Grid & Ambient Glows ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        {/* Soft dot grid */}
        <div className="absolute inset-0 bg-[#F5F5F7] bg-[radial-gradient(#E2E2E9_1.2px,transparent_1.2px)] [background-size:24px_24px]" />
        
        {/* Ambient mesh glows */}
        <div 
          className="absolute -top-[20%] -left-[10%] w-[60%] aspect-square rounded-full bg-blue-100/30 blur-[120px] mix-blend-multiply" 
          style={{ transform: "translate3d(0, 0, 0)" }}
        />
        <div 
          className="absolute top-[10%] -right-[10%] w-[50%] aspect-square rounded-full bg-purple-100/20 blur-[100px] mix-blend-multiply" 
          style={{ transform: "translate3d(0, 0, 0)" }}
        />
      </div>

      {/* ── Glassmorphic Top Header ── */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white/70 backdrop-blur-md border-b border-neutral-200/60 px-6 z-50 flex items-center justify-between select-none shadow-none">
        {/* Left Logo Side */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Webild"
            className="h-6 w-auto object-contain cursor-pointer active:scale-95 transition-transform"
            onClick={() => router.push("/")}
          />
          <div className="w-px h-4 bg-neutral-200" />
          <span className="text-xs font-semibold text-neutral-500 truncate max-w-[150px]">
            {websites[0]?.brandName || "My Dashboard"}
          </span>
        </div>

        {/* Right Action Side */}
        <div className="flex items-center gap-2.5 relative">
          <button
            onClick={() => {
              const sub = websites[0]
                ? `${websites[0].subdomainSlug}.linkedpage.io`
                : "linkedpage.io";
              navigator.clipboard.writeText(`https://${sub}`);
              toast.success("Site link copied to clipboard!");
            }}
            className="h-8 px-4 text-xs font-bold bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg text-neutral-700 transition-all active:scale-95 shadow-xs cursor-pointer"
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
            className="h-8 px-5 text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-all active:scale-[0.97] shadow-sm cursor-pointer"
          >
            Publish
          </button>

          {/* User Menu Avatar Trigger */}
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-8 h-8 rounded-lg overflow-hidden border border-neutral-200 hover:scale-105 active:scale-95 transition-transform ml-1 bg-white"
          >
            <img
              src={userAvatarUrl}
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
        <aside className="w-[260px] border-r border-neutral-200/50 bg-white/40 backdrop-blur-sm px-6 py-6 flex flex-col justify-between hidden md:flex h-[calc(100vh-3.5rem)] sticky top-14 select-none z-20">
          
          {/* Top part navigation */}
          <div className="flex flex-col gap-6">
            {/* New Website Button */}
            <button
              onClick={() => router.push("/onboarding")}
              className="w-full h-10 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.97] transition-all rounded-lg flex items-center justify-center gap-2 text-xs font-semibold text-white shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 text-white" />
              New Website
            </button>

            {/* Menu Tabs */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => router.push("/")}
                className="w-full h-9 px-3 rounded-lg hover:bg-white/60 flex items-center gap-2.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Home className="w-4 h-4 text-neutral-500" />
                Home
              </button>

              <button
                onClick={() => router.push("/editor")}
                className="w-full h-9 px-3 rounded-lg hover:bg-white/60 flex items-center gap-2.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Layout className="w-4 h-4 text-neutral-500" />
                Templates
              </button>

              {/* Active Tab */}
              <button className="w-full h-9 px-3 rounded-lg bg-blue-50/60 border border-blue-200/30 flex items-center gap-2.5 text-xs font-bold text-blue-600 transition-all">
                <Folder className="w-4 h-4 text-blue-500" />
                All Websites
              </button>
            </div>

            {/* Recent Websites Section */}
            <div className="flex flex-col gap-2 pt-4 border-t border-neutral-200/50">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-3">
                Recent websites
              </span>

              {websites.length > 0 ? (
                <div
                  onClick={() => router.push(`/editor?id=${websites[0].id}`)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/60 cursor-pointer transition-all bg-white/25 border border-transparent hover:border-neutral-200/30 active:scale-[0.98]"
                >
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-neutral-200 overflow-hidden p-0.5 shrink-0">
                    <img
                      src="/logoicon.png"
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-700 truncate">
                    {websites[0].brandName}
                  </span>
                </div>
              ) : (
                <span className="text-[11px] italic text-neutral-400 px-3">
                  No recent sites
                </span>
              )}
            </div>
          </div>

          {/* Bottom Settings navigation */}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => router.push("/pricing")}
              className="w-full h-9 px-3 rounded-lg hover:bg-white/60 flex items-center gap-2.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-all active:scale-[0.98] cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-neutral-500" />
              Pricing
            </button>

            <button
              onClick={() => router.push("/docs")}
              className="w-full h-9 px-3 rounded-lg hover:bg-white/60 flex items-center gap-2.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-all active:scale-[0.98] cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-neutral-500" />
              Documentation
            </button>

            <button
              onClick={() => router.push("/settings")}
              className="w-full h-9 px-3 rounded-lg hover:bg-white/60 flex items-center gap-2.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-all active:scale-[0.98] cursor-pointer"
            >
              <Settings className="w-4 h-4 text-neutral-500" />
              Settings
            </button>
          </div>
        </aside>

        {/* ── Main Content Area ── */}
        <main className="flex-1 flex flex-col items-center px-6 md:px-12 py-10 z-10 w-full max-w-7xl mx-auto overflow-hidden">
          
          {/* Cinematic Wide Display Hero Section */}
          <div className="flex flex-col gap-4 items-center text-center w-full max-w-4xl mb-12 mt-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 leading-none max-w-3xl flex items-center justify-center gap-1.5 flex-wrap">
              Manage your 
              <span 
                className="inline-block w-14 h-7 rounded-full align-middle bg-cover bg-center border border-neutral-200/30 shadow-xs mx-1" 
                style={{ backgroundImage: 'url(/logoicon.png)', transform: 'translateY(-2px)' }} 
              />
              websites
            </h1>
            <p className="text-sm md:text-base text-neutral-500 max-w-md">
              Create, manage, and edit your professional portfolio websites in one unified workspace.
            </p>
            
            {/* Search Capsule */}
            <div className="relative flex items-center gap-2.5 px-4 h-11 rounded-full bg-white border border-neutral-200/80 shadow-xs focus-within:border-neutral-450 focus-within:ring-2 focus-within:ring-neutral-400/5 max-w-xs w-full transition-all mt-4">
              <Search className="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                type="text"
                placeholder="Search websites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full placeholder:text-neutral-400 focus:outline-none text-xs bg-transparent border-none p-0 focus:ring-0 text-neutral-800"
              />
            </div>
          </div>

          {/* Websites Layout Grid */}
          <div className="w-full flex justify-center">
            {loadingWebsites ? (
              /* Loading Skeletons */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-3.5 p-3 rounded-xl bg-white border border-neutral-200/60 animate-pulse"
                  >
                    <div className="w-full bg-neutral-100 rounded-lg aspect-video" />
                    <div className="flex flex-col gap-2 mt-1 px-1">
                      <div className="h-4 bg-neutral-200 rounded w-1/2" />
                      <div className="h-3 bg-neutral-100 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredWebsites.length === 0 ? (
              /* Empty State view */
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white rounded-2xl border border-neutral-200/80 shadow-md p-8 flex flex-col items-center text-center mt-6"
              >
                <AnimatedDashboardEmptyIllustration />
                <h3 className="text-base font-semibold text-neutral-800 mt-2">No portfolio websites found</h3>
                <p className="text-xs text-neutral-400 max-w-xs mt-1 leading-normal">
                  {searchQuery ? "No drafts match your search terms. Try refining your keywords." : "You haven't initialized any portfolio drafts yet. Let's create one!"}
                </p>
                {!searchQuery && (
                  <button
                    onClick={() => router.push("/onboarding")}
                    className="h-10 px-5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg mt-5 transition-all active:scale-95 shadow-sm cursor-pointer"
                  >
                    Create Portfolio Draft
                  </button>
                )}
              </motion.div>
            ) : (
              /* Bento Website Card Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {filteredWebsites.map((web, idx) => {
                  const isDropdownOpen = activeDropdownId === web.id;
                  return (
                    <motion.div
                      key={web.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                      className="relative flex flex-col gap-3.5 p-3 cursor-pointer rounded-xl bg-white border border-neutral-200/80 hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] hover:border-neutral-350 transition-all duration-300 group active:scale-[0.99]"
                    >
                      {/* Browser bezel mockup preview frame */}
                      <div
                        onClick={() => router.push(`/editor?id=${web.id}`)}
                        className="relative w-full aspect-video rounded-lg overflow-hidden border border-neutral-200/60 bg-neutral-50/50 flex flex-col"
                      >
                        {/* Mini Browser Bezel Header */}
                        <div className="h-6 shrink-0 bg-neutral-100/80 border-b border-neutral-250/30 px-2 flex items-center gap-1 select-none pointer-events-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E45A5A]/85" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]/85" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#369762]/85" />
                          <div className="flex-1 mx-4 h-3.5 bg-white border border-neutral-200/40 rounded flex items-center justify-center text-[8.5px] font-mono text-neutral-400">
                            {web.subdomainSlug}.linkedpage.io
                          </div>
                        </div>
                        
                        {/* Scaled Preview Frame */}
                        <div className="flex-1 w-full relative overflow-hidden flex items-center justify-center bg-neutral-50/10">
                          <div className="absolute w-[1200px] h-[900px] scale-[0.27] origin-center flex-shrink-0 flex items-center justify-center pointer-events-none transition-transform duration-500 group-hover:scale-[0.285] ease-out">
                            <ProfilePreview
                              profile={web.profile}
                              template={web.templateId}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Card Footer details */}
                      <div className="flex items-start justify-between relative min-w-0 px-1">
                        <div className="min-w-0 max-w-[75%] flex flex-col gap-0.5">
                          <h3 className="text-xs font-bold leading-tight truncate text-neutral-800">
                            {web.brandName}
                          </h3>
                          <p className="text-[10px] leading-tight truncate text-neutral-450">
                            {web.isPublished ? (
                              <span className="text-[#369762] font-semibold flex items-center gap-1">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#369762] opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#369762]"></span>
                                </span>
                                Live: {web.subdomainSlug}.linkedpage.io
                              </span>
                            ) : (
                              <span className="text-neutral-400 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
                                Draft (Unpublished)
                              </span>
                            )}
                          </p>
                        </div>

                        {/* Card Options Button & Dropdown */}
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
                            className="inline-flex h-7 px-2.5 text-[10.5px] font-bold cursor-pointer items-center justify-center rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 transition-all active:scale-95 shadow-xs"
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
                            className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full hover:bg-neutral-100 transition-all my-auto text-neutral-400 hover:text-neutral-600"
                          >
                            <MoreHorizontal className="w-4.5 h-4.5" />
                          </button>

                          {/* Dropdown Options */}
                          {isDropdownOpen && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setActiveDropdownId(null)}
                              />
                              <div className="absolute right-0 bottom-8 z-20 w-44 bg-white/95 backdrop-blur-md border border-neutral-200/80 rounded-xl py-1 flex flex-col shadow-lg">
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
                                  className="px-3.5 py-2 text-left text-[11px] font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                                >
                                  <Share2 className="w-3.5 h-3.5 text-neutral-400" />
                                  Share Link
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveDropdownId(null);
                                    router.push(`/editor?id=${web.id}`);
                                  }}
                                  className="px-3.5 py-2 text-left text-[11px] font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                                >
                                  <Edit2 className="w-3.5 h-3.5 text-neutral-400" />
                                  Edit in Builder
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveDropdownId(null);
                                    router.push(`/preview?id=${web.id}`);
                                  }}
                                  className="px-3.5 py-2 text-left text-[11px] font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                                >
                                  <Globe className="w-3.5 h-3.5 text-neutral-400" />
                                  View Live Preview
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveDropdownId(null);
                                    handleDeleteSite(web.id);
                                  }}
                                  className="px-3.5 py-2 text-left text-[11px] font-bold text-[#E45A5A] hover:bg-red-50/50 flex items-center gap-2 border-t border-neutral-200/50 mt-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  Delete site
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
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
              background: #F5F5F7;
              overscroll-behavior: none;
              color: #171717;
              min-height: 100vh;
              position: relative;
              font-family: "Inter Tight", "Inter Tight Fallback", sans-serif;
              font-style: normal;
            }
          `,
        }}
      />
    </div>
  );
}
