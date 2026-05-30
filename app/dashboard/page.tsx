"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Search, 
  MoreHorizontal, 
  Gift, 
  Globe,
  ExternalLink,
  Edit2,
  Trash2
} from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const [brandName, setBrandName] = useState("Creative Portfolio");
  const [subdomain, setSubdomain] = useState("realitycheque.io");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedBrand = sessionStorage.getItem("webild_brand_name");
    const storedSubdomain = sessionStorage.getItem("webild_subdomain");
    if (storedBrand) setBrandName(storedBrand);
    if (storedSubdomain) setSubdomain(storedSubdomain);
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter flex flex-col text-black antialiased">
      
      {/* ── Header ── */}
      <header className="w-full h-[70px] px-8 flex items-center justify-between border-b border-[#F5F5F7]">
        {/* Left Logo Side */}
        <div className="flex items-center gap-1.5 select-none">
          <span className="font-bold text-lg font-inter-tight text-black tracking-tight">Webild</span>
          <button className="w-5 h-5 rounded-[4px] bg-[#F3F3F5] flex items-center justify-center text-gray-500 hover:bg-[#EAEAEA] active:scale-95 transition-all">
            <svg width="8" height="8" viewBox="0 0 16 16" fill="none" className="text-gray-600">
              <path d="M6 12L2 8L6 4M10 12L14 8L10 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Right Action Side */}
        <div className="flex items-center gap-4">
          {/* Upgrade Plan button with gradient border */}
          <button 
            onClick={() => toast.success("Upgrade Plan feature clicked!")}
            className="relative inline-flex items-center justify-center h-10 px-5 rounded-[13px] bg-white text-[13px] font-semibold text-black hover:bg-gray-50 transition-all select-none shadow-[0_0_0_1px_rgba(0,0,0,0.06)] after:absolute after:inset-0 after:rounded-[13px] after:border-2 after:border-transparent after:bg-gradient-to-r after:from-pink-500 after:via-red-500 after:to-yellow-500 after:[mask-image:linear-gradient(white,white)_padding-box,linear-gradient(white,white)] after:[mask-clip:padding-box,border-box] after:pointer-events-none active:scale-[0.98]"
          >
            Upgrade Plan
          </button>
          
          {/* Gift Icon */}
          <button 
            onClick={() => toast.info("Referrals coming soon!")}
            className="w-9 h-9 rounded-full bg-white border border-[#E6E6E6] flex items-center justify-center text-gray-700 hover:bg-[#F9F9FB] active:scale-95 transition-all"
          >
            <Gift className="w-[18px] h-[18px]" />
          </button>

          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#E6E6E6] cursor-pointer hover:opacity-90">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <main className="flex-1 flex flex-col items-center max-w-7xl w-full mx-auto px-6 pt-16 pb-16">
        
        {/* All Websites Title & Subtitle */}
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <div className="flex items-center gap-2 justify-center">
            <span className="text-[44px] font-normal text-black font-inter-tight tracking-tight leading-none">All</span>
            <div className="w-[42px] h-[42px] bg-[#3B82F6] rounded-[10px] flex items-center justify-center shadow-[0_4px_12px_rgba(59,130,246,0.3)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M4 14.5C4 14.5 6.5 12 9.5 14.5C12.5 17 15 14.5 15 14.5M9.5 14.5V20M15 14.5V20M3 20H21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[44px] font-normal text-black font-inter-tight tracking-tight leading-none">Websites</span>
          </div>
          <p className="text-[15px] text-[#6B6B6B]">
            Manage and access all your websites websites in one place.
          </p>
        </div>

        {/* Search Bar Pill */}
        <div className="w-full max-w-[420px] relative mb-12">
          <Search className="w-[18px] h-[18px] text-gray-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search websites..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-12 pr-6 bg-[#F3F3F5] hover:bg-[#EAEAEB] focus:bg-[#EAEAEB] rounded-[13px] border-none text-[14px] text-black outline-none transition-all placeholder:text-gray-400 font-medium"
          />
        </div>

        {/* Websites Grid */}
        <div className="w-full flex justify-start pl-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
            
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
  );
}
