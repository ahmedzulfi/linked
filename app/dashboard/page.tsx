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
  Globe
} from "lucide-react";
import { toast } from "sonner";

import { UserMenu } from "@/components/UserMenu";
import { useEditor } from "@/context/EditorContext";
import ProfilePreview from "@/app/editor/components/ProfilePreview";
import { MOCK_PROFILE } from "@/shared/types";

export default function DashboardPage() {
  const router = useRouter();
  const { editedProfile, selectedTemplate } = useEditor();
  const activeProfile = editedProfile || MOCK_PROFILE;

  const [brandName, setBrandName] = useState("Creative Portfolio");
  const [subdomain, setSubdomain] = useState("realitycheque.io");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedBrand = sessionStorage.getItem("linkedpage_brand_name");
    const storedSubdomain = sessionStorage.getItem("linkedpage_subdomain");
    if (storedBrand) {
      setBrandName(storedBrand);
    } else {
      setBrandName(activeProfile.name);
    }

    if (storedSubdomain) {
      setSubdomain(storedSubdomain);
    } else {
      setSubdomain(`${activeProfile.name.toLowerCase().replace(/\s+/g, "")}.linkedpage.io`);
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
  }, [activeProfile]);

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-inter flex flex-col text-black antialiased relative overflow-x-hidden">

      {/* ── Background Graphic ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-50">
        <img src="/bg.png" alt="" className="w-full h-full object-cover object-top" />
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
          <span className="text-sm font-medium text-[#171717]/60 truncate max-w-[120px]">{brandName}</span>
        </div>

        {/* Right Action Side */}
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => {
              navigator.clipboard.writeText(`https://${subdomain}`);
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
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
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
              <button
                className="w-full h-10 px-3 rounded-[8px] bg-[#E8F1FF] border border-[#8DB8FF]/40 flex items-center gap-3 text-[14px] font-semibold text-[#1A68FF] transition-all"
              >
                <Folder className="w-[18px] h-[18px] text-[#1A68FF]" />
                All Websites
              </button>
            </div>

            {/* Recent Websites Section */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#F5F5F7]">
              <span className="text-[12px] font-semibold text-[#88888E] px-3">Recent websites</span>

              <div
                className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] hover:bg-white/60 cursor-pointer transition-all bg-white/30"
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#E6E6E6] overflow-hidden p-0.5 shrink-0">
                  <img src="/logoicon.png" alt="Logo" className="w-full h-full object-contain" />
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
                onClick={() => toast.info("Pricing modal coming soon!")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all"
              >
                <CreditCard className="w-[18px] h-[18px] text-black" />
                Pricing
              </button>

              <button
                onClick={() => toast.info("Documentation coming soon!")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all"
              >
                <BookOpen className="w-[18px] h-[18px] text-black" />
                Documentation
              </button>

              <button
                onClick={() => toast.info("Settings panel coming soon!")}
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
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-7xl">

              {/* User-Styled Website card using exact code */}
              <div
                className={`relative flex-col gap-3 p-3 cursor-pointer rounded-[12px] bg-white border border-[#EBEBEB] hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)] transition-all duration-300 group ${
                  (!searchQuery || 
                   brandName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                   subdomain.toLowerCase().includes(searchQuery.toLowerCase())) 
                    ? "flex" 
                    : "hidden"
                }`}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                <div
                  onClick={() => router.push("/editor")}
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                  }}
                >
                  <div
                    className="relative w-full bg-[#F7F7F7] rounded-[10px] overflow-hidden aspect-video border border-[#F5F5F7] flex items-center justify-center"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                    }}
                  >
                    <div
                      className="relative w-full p-1 rounded-sm flex items-center justify-center"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                      }}
                    >
                      <div
                        className="relative w-full aspect-video overflow-hidden rounded-[8px] bg-white flex items-center justify-center pointer-events-none"
                      >
                        <div className="scale-[0.27] origin-center flex-shrink-0 flex items-center justify-center">
                          <ProfilePreview
                            profile={activeProfile}
                            template={selectedTemplate}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer details */}
                <div
                  className="flex items-start justify-between relative min-w-0"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                  }}
                >
                  <div
                    className="min-w-0 max-w-[80%] flex flex-col"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                    }}
                  >
                    <h3
                      className="text-sm font-semibold leading-tight truncate text-black"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                      }}
                    >
                      {brandName}
                    </h3>
                    <p
                      className="text-xs leading-tight truncate text-gray-500 mt-1"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                      }}
                    >
                      Created 17 hours ago
                    </p>
                  </div>

                  <div
                    className="relative"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                    }}
                  >
                    <div>
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 transition-all my-auto text-gray-500"
                        aria-haspopup="true"
                        style={{
                          scrollbarWidth: "thin",
                          scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                        }}
                      >
                        <svg
                          className="lucide lucide-ellipsis w-full"
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
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="19" cy="12" r="1" />
                          <circle cx="5" cy="12" r="1" />
                        </svg>
                      </button>

                      {/* Dropdown Options */}
                      {showDropdown && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                          <div
                            className="absolute right-0 bottom-10 z-20 w-44 bg-white border border-[#EBEBEB] rounded-[12px] py-1.5 flex flex-col"
                          >
                            <button
                              onClick={() => { setShowDropdown(false); router.push("/editor"); }}
                              className="px-4 py-2 text-left text-[13px] font-medium text-black hover:bg-[#F3F3F5] flex items-center gap-2"
                            >
                              <Edit2 className="w-4 h-4 text-gray-500" />
                              Edit in Builder
                            </button>
                            <button
                              onClick={() => { setShowDropdown(false); router.push("/preview"); }}
                              className="px-4 py-2 text-left text-[13px] font-medium text-black hover:bg-[#F3F3F5] flex items-center gap-2"
                            >
                              <Globe className="w-4 h-4 text-gray-500" />
                              View Live Preview
                            </button>
                            <button
                              onClick={() => { setShowDropdown(false); toast.error("Delete action is placeholder."); }}
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

              </div>
            </div>
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
