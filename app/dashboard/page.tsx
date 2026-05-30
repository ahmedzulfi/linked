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

function UserMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "scale(0.95)" }}
      animate={{ opacity: 1, transform: "scale(1)" }}
      exit={{ opacity: 0, transform: "scale(0.95)" }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className="absolute z-55 top-10 rounded-2xl origin-top-right border border-[#010101]/5 bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_#ffff,0_0_0_1px_rgba(255,255,255,0.4)_inset] right-0 w-72 p-5"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
        transformOrigin: "top right"
      }}
    >
      <div
        className="space-y-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
        }}
      >
        <div
          className="flex items-center gap-3"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
          }}
        >
          <div
            className="relative shrink-0 rounded-lg h-9 w-9 p-0.5 cursor-pointer border border-[#E6E6E6]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <img
              className="h-full w-full object-cover rounded-lg"
              height={31}
              width={31}
              alt="user"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                color: "transparent",
              }}
            />
          </div>
          <div
            className="truncate"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <p
              className="text-sm font-medium leading-tight text-[#2A2A2F] truncate"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              Ayesha Zulfiqar
            </p>
            <p
              className="text-xs text-[#171717]/60 leading-tight truncate"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              ayeshazulfiqar609@gmail.com
            </p>
          </div>
        </div>
        <div
          className="border-t border-black/8"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
          }}
        />
        <div
          className="flex flex-col gap-3"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
          }}
        >
          <div
            className="relative p-4 flex flex-col gap-2 bg-black/5 backdrop-blur-sm border border-white/40 rounded-[10px]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <div
              className="flex justify-between"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <span
                className="text-sm font-medium text-[#2A2A2F]"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                Credits
              </span>
              <span
                className="text-sm font-medium text-[#2A2A2F]"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                16 left
              </span>
            </div>
            <div
              className="w-full rounded-lg bg-white border border-[#E6E6E6] overflow-hidden p-0.5"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <div
                className="relative bg-[#8DFFB3] h-2 rounded-lg transition-all duration-300"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                  width: "25%",
                }}
              />
            </div>
            <div
              className="text-xs text-[#171717]/70 mt-1 leading-relaxed"
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
                You're on the free plan. Unlock additional features and
                credits by upgrading your plan.
              </span>
            </div>
          </div>
          <button
            className="flex items-center justify-center font-medium transition-all duration-150 bg-[#2A2A2F] text-white hover:bg-[#3E3E45] rounded-[9px] w-full text-xs h-9 active:scale-95"
            type="button"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            Upgrade
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <button
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <svg
              className="w-5 h-5"
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
                d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
            </svg>
            Settings
          </button>
          <button
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <svg
              className="w-5 h-5"
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
                d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
            </svg>
            Report a bug
          </button>
          <button
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
            }}
          >
            <svg
              className="w-5 h-5"
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
                d="M12 7v14"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
              <path
                d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              />
            </svg>
            Documentation
          </button>
        </div>
        <div
          className="border-t border-black/8"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
          }}
        />
        <button
          className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F3F3F3] text-black w-full"
          type="button"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
          }}
        >
          <svg
            className="w-5 h-5"
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
              d="m16 17 5-5-5-5"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            />
            <path
              d="M21 12H9"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            />
            <path
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            />
          </svg>
          Sign out
        </button>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [brandName, setBrandName] = useState("Creative Portfolio");
  const [subdomain, setSubdomain] = useState("realitycheque.io");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const storedBrand = sessionStorage.getItem("webild_brand_name");
    const storedSubdomain = sessionStorage.getItem("webild_subdomain");
    if (storedBrand) setBrandName(storedBrand);
    if (storedSubdomain) setSubdomain(storedSubdomain);
  }, []);

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
              <UserMenu />
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
                <div className="w-6 h-6 rounded-full bg-[#F3F3F5] flex items-center justify-center text-[11px] font-bold text-black border border-[#E6E6E6]">
                  c
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
              <span
                className="inline-block relative button-accent -rotate-12 aspect-square align-middle mx-1 rounded-sm h-[1em] w-auto bg-[#3B82F6] p-2"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                }}
              >
                <img
                  className="absolute inset-0 m-auto h-1/2 w-1/2 invert"
                  height={30}
                  width={30}
                  src="https://www.webild.io/_next/image?url=/brand/webildlogonew.png&w=48&q=75&dpl=dpl_74fbPg9hDGnd6mNcms3zAGnT6GTo"
                  srcSet="/_next/image?url=%2Fbrand%2Fwebildlogonew.png&w=32&q=75&dpl=dpl_74fbPg9hDGnd6mNcms3zAGnT6GTo 1x, /_next/image?url=%2Fbrand%2Fwebildlogonew.png&w=48&q=75&dpl=dpl_74fbPg9hDGnd6mNcms3zAGnT6GTo 2x"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                    color: "transparent",
                  }}
                />
              </span>{" "}
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
              className="relative flex items-center gap-1.5 px-4 py-2.5 rounded-[12px] bg-[#F3F3F5]/80 hover:bg-[#EAEAEB]/90 backdrop-blur-sm w-full h-fit text-base border border-black/5"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
              }}
            >
              <svg
                className="lucide lucide-search h-[1em] text-gray-500"
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
                className="w-full placeholder:text-gray-400 bg-transparent focus:outline-none text-base md:text-[15px] text-black font-medium"
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
                className="relative flex flex-col gap-3 p-3 cursor-pointer rounded-[12px] bg-white border border-[#EBEBEB] hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)] transition-all duration-300 group"
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
                        className="relative w-full aspect-video overflow-hidden rounded-[8px] bg-white"
                        style={{
                          scrollbarWidth: "thin",
                          scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                        }}
                      >
                        <iframe
                          className="absolute top-0 left-0 border-none pointer-events-none"
                          sandbox="allow-scripts allow-same-origin"
                          src="https://webuild-dev.s3.eu-north-1.amazonaws.com/previews/86be4a9a-430f-4330-9206-d2c1c63b4910/index.html"
                          tabIndex={-1}
                          title="Preview"
                          style={{
                            scrollbarWidth: "thin",
                            scrollbarColor: "rgba(0, 0, 0, 0.05) transparent",
                            transition: "opacity 0.3s",
                            width: "1280px",
                            height: "720px",
                            transform: "scale(0.265)",
                            transformOrigin: "left top",
                            opacity: 1,
                          }}
                        />
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
