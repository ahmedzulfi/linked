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
  Search,
  MoreHorizontal,
  Edit2,
  ExternalLink,
  Trash2,
  Globe,
  LogOut,
  User,
  Shield
} from "lucide-react";
import { toast } from "sonner";

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

  const handleLogout = () => {
    toast.success("Logging out...");
    setTimeout(() => router.push("/login"), 1000);
  };

  return (
    <div className="min-h-screen bg-white font-inter flex flex-col text-black antialiased">
      
      {/* ── Editor Style Navbar/Top-bar ── */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-[#E6E6E6] px-6 z-50 flex items-center justify-between select-none">
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

        {/* Right Action Side (Share + Publish + Avatar matching Editor top bar) */}
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
            className="w-8 h-8 rounded-lg bg-[#E6E6E6] overflow-hidden border-2 border-white shadow-sm hover:scale-105 active:scale-95 transition-all ml-1"
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
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-10 z-50 w-52 bg-white border border-[#EBEBEB] rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] py-1.5 flex flex-col"
                >
                  <div className="px-4 py-2 border-b border-[#F5F5F7] mb-1">
                    <p className="text-[13px] font-bold text-black truncate">{brandName}</p>
                    <p className="text-[11px] text-[#88888E] truncate">{subdomain}</p>
                  </div>
                  <button 
                    onClick={() => { setIsUserMenuOpen(false); router.push("/editor"); }}
                    className="px-4 py-2 text-left text-[13px] font-medium text-black hover:bg-[#F3F3F5] flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    Builder Editor
                  </button>
                  <button 
                    onClick={() => { setIsUserMenuOpen(false); toast.info("Premium plans unlock all features."); }}
                    className="px-4 py-2 text-left text-[13px] font-medium text-black hover:bg-[#F3F3F5] flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4 text-gray-500" />
                    Account Level
                  </button>
                  <button 
                    onClick={() => { setIsUserMenuOpen(false); handleLogout(); }}
                    className="px-4 py-2 text-left text-[13px] font-medium text-[#E45A5A] hover:bg-red-50 flex items-center gap-2 border-t border-[#F5F5F7] mt-1.5"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Main Container (Sidebar + Content) ── */}
      <div className="flex-1 flex pt-14 min-h-screen">
        
        {/* ── Sidebar (Sticky Left) ── */}
        <aside className="w-[260px] border-r border-[#F3F3F5] px-6 py-6 flex flex-col justify-between hidden md:flex h-[calc(100vh-3.5rem)] sticky top-14 select-none">
          
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
                className="w-full h-10 px-3 rounded-[8px] hover:bg-[#F9F9FB] flex items-center gap-3 text-[14px] font-medium text-black transition-all"
              >
                <Home className="w-[18px] h-[18px] text-black" />
                Home
              </button>

              <button 
                onClick={() => router.push("/editor")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-[#F9F9FB] flex items-center gap-3 text-[14px] font-medium text-black transition-all"
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
              
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] hover:bg-[#F9F9FB] cursor-pointer transition-all">
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
                className="w-full h-10 px-3 rounded-[8px] hover:bg-[#F9F9FB] flex items-center gap-3 text-[14px] font-medium text-black transition-all"
              >
                <CreditCard className="w-[18px] h-[18px] text-black" />
                Pricing
              </button>

              <button 
                onClick={() => toast.info("Documentation coming soon!")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-[#F9F9FB] flex items-center gap-3 text-[14px] font-medium text-black transition-all"
              >
                <BookOpen className="w-[18px] h-[18px] text-black" />
                Documentation
              </button>

              <button 
                onClick={() => toast.info("Settings panel coming soon!")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-[#F9F9FB] flex items-center gap-3 text-[14px] font-medium text-black transition-all"
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
                className="inline-block relative button-accent -rotate-12 aspect-square align-middle mx-1 rounded-sm h-[1em] w-auto bg-[#3B82F6] p-2 shadow-[0_4px_10px_rgba(59,130,246,0.35)]"
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
              className="relative flex items-center gap-1.5 px-4 py-2.5 rounded-[12px] bg-[#F3F3F5] hover:bg-[#EAEAEB] w-full h-fit text-base"
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
              
              {/* Website card */}
              <div className="w-full max-w-[390px] bg-white border border-[#EBEBEB] rounded-[16px] overflow-hidden group select-none shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)] transition-all duration-300">
                
                {/* Site preview image container */}
                <div className="relative aspect-[16/10] bg-[#FFF8F3] border-b border-[#F5F5F7] overflow-hidden flex items-center justify-center p-3">
                  
                  {/* Simulated preview of bento template matching screenshot exactly */}
                  <div className="w-full h-full bg-[#FFFBF7] rounded-[10px] border border-[#F3EBE3] p-4 flex flex-col gap-2 relative overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center justify-between w-full">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                      <div className="flex gap-1">
                        <div className="w-7 h-3.5 bg-[#FF8A00] rounded-[4px] scale-[0.8]" />
                        <div className="w-7 h-3.5 bg-[#E6E6E6] rounded-[4px] scale-[0.8]" />
                      </div>
                    </div>
                    
                    {/* Headline & description */}
                    <div className="flex flex-col gap-1 mt-1 max-w-[55%]">
                      <h5 className="text-[12px] font-bold text-black leading-tight">Innovate. Design. Create.</h5>
                      <p className="text-[6px] text-gray-500 leading-normal">Transforming ideas into captivating digital experiences. Explore my journey and portfolio.</p>
                      <div className="flex gap-1 mt-1">
                        <div className="w-12 h-3.5 bg-[#FF8A00] rounded-[4px] scale-[0.8]" />
                        <div className="w-12 h-3.5 bg-[#E6E6E6] border border-[#E6E6E6] rounded-[4px] scale-[0.8]" />
                      </div>
                    </div>

                    {/* Bento Images right */}
                    <div className="absolute right-4 top-8 bottom-4 w-[35%] flex flex-col gap-1.5">
                      <div className="flex-1 bg-[#E6E6E6] rounded-[6px] overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=150&auto=format&fit=crop&q=60" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 bg-[#E6E6E6] rounded-[6px] overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=150&auto=format&fit=crop&q=60" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    {/* Footer tags */}
                    <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between gap-1 border-t border-[#F3EBE3] pt-1.5">
                      <div className="h-1 w-6 bg-[#E6E6E6] rounded" />
                      <div className="h-1 w-6 bg-[#E6E6E6] rounded" />
                      <div className="h-1 w-6 bg-[#E6E6E6] rounded" />
                      <div className="h-1 w-8 bg-[#FF8A00] rounded" />
                    </div>
                  </div>

                  {/* Hover Quick Edit Panel overlay */}
                  <div className="absolute inset-0 bg-black/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                    <button 
                      onClick={() => router.push("/editor")}
                      className="h-9 px-3.5 rounded-[10px] bg-white border border-[#E6E6E6] text-black font-semibold text-[12px] hover:bg-[#F3F3F5] shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button 
                      onClick={() => router.push("/preview")}
                      className="h-9 px-3.5 rounded-[10px] bg-[#2A2A2F] text-white font-semibold text-[12px] hover:bg-[#3E3E45] shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Preview
                    </button>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 flex items-center justify-between relative">
                  <div className="flex flex-col gap-0.5">
                    <h4 className="text-[14px] font-semibold text-black">{brandName}</h4>
                    <p className="text-[12px] text-[#88888E]">Created 17 hours ago</p>
                  </div>

                  <div className="relative">
                    <button 
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-[#F3F3F5] active:scale-90 transition-all"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {/* Settings dropdown menu */}
                    {showDropdown && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                        <div className="absolute right-0 bottom-10 z-20 w-44 bg-white border border-[#EBEBEB] rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] py-1.5 flex flex-col">
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
