"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  Globe, 
  ExternalLink, 
  Settings, 
  Edit3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointerClick, 
  Check, 
  CreditCard,
  Layers,
  Sparkles,
  ArrowRight,
  Plus
} from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const [brandName, setBrandName] = useState("Reality Cheque");
  const [subdomain, setSubdomain] = useState("realitycheque.io");
  const [styles, setStyles] = useState<string[]>([
    "Modern Professional",
    "Clear CTAs",
    "Trust-Building Layout",
    "Vibrant Community Focus"
  ]);

  useEffect(() => {
    const storedBrand = sessionStorage.getItem("webild_brand_name");
    const storedSubdomain = sessionStorage.getItem("webild_subdomain");
    const storedStyles = sessionStorage.getItem("webild_styles");

    if (storedBrand) setBrandName(storedBrand);
    if (storedSubdomain) setSubdomain(storedSubdomain);
    if (storedStyles) {
      try {
        setStyles(JSON.parse(storedStyles));
      } catch (e) {
        // Fallback
      }
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${subdomain}`);
    toast.success("Site URL copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-inter flex flex-col text-black antialiased relative">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-30">
        <img src="/bg.png" alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFB]/40 via-white/80 to-[#FBFBFB]" />
      </div>

      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 pt-28 pb-16 z-10 flex flex-col gap-10">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-[38px] leading-[46px] font-normal text-black font-inter-tight">
              Dashboard
            </h1>
            <p className="text-sm text-[#6B6B6B]">
              Manage, analyze, and customize your Webild pages.
            </p>
          </div>
          <button 
            onClick={() => router.push("/onboarding")}
            className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-[13px] bg-[#2A2A2F] text-white text-[13px] font-medium hover:bg-[#3E3E45] transition-all duration-150 active:scale-[0.97]"
          >
            <Plus className="w-4 h-4" />
            Create another site
          </button>
        </div>

        {/* Top level grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Active Site Card */}
          <div className="lg:col-span-2 flex flex-col bg-white border border-[#E6E6E6] rounded-[18px] shadow-[0_6px_10px_-6px_#0000000a] overflow-hidden">
            <div className="p-6 border-b border-[#F3F3F3] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px] bg-[#8DB8FF]/10 flex items-center justify-center text-[#8DB8FF]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-black">{brandName}</h3>
                  <p className="text-xs text-[#9CA3AF]">Active Site</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#8DFFB3]/25 text-[#369762]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#369762] animate-pulse" />
                  Live
                </span>
              </div>
            </div>

            {/* Simulated Frame Preview with Glassmorphism Overlays */}
            <div className="relative aspect-[16/9] bg-[#F7F7F7] flex items-center justify-center overflow-hidden group p-8 border-b border-[#F3F3F3]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8DB8FF]/5 via-transparent to-[#8DFFB3]/5" />
              
              {/* Card Container Mockup */}
              <div className="w-full max-w-md bg-white/75 backdrop-blur-md rounded-[13px] border border-white/60 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] p-6 flex flex-col gap-4 transform group-hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E6E6E6] flex-shrink-0 animate-pulse" />
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="h-4 w-28 bg-[#E6E6E6] rounded animate-pulse" />
                    <div className="h-3 w-16 bg-[#F3F3F3] rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-3 w-full bg-[#F3F3F3] rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-[#F3F3F3] rounded animate-pulse" />
                
                <div className="flex gap-2 mt-2">
                  <div className="h-8 w-24 bg-[#E6E6E6] rounded-[8px] animate-pulse" />
                  <div className="h-8 w-24 bg-[#F3F3F3] rounded-[8px] animate-pulse" />
                </div>
              </div>

              {/* Hover Actions Panel */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                <button 
                  onClick={() => router.push("/editor")}
                  className="h-10 px-4 rounded-[13px] bg-white text-black font-semibold text-[13px] hover:bg-[#F3F3F3] shadow-md flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Site
                </button>
                <button 
                  onClick={() => router.push("/preview")}
                  className="h-10 px-4 rounded-[13px] bg-[#2A2A2F] text-white font-semibold text-[13px] hover:bg-[#3E3E45] shadow-md flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </button>
              </div>
            </div>

            {/* Site footer config info */}
            <div className="p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">Subdomain</span>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#8DB8FF]" />
                  <span className="text-sm font-medium text-black">{subdomain}</span>
                  <button 
                    onClick={handleCopyLink}
                    className="p-1 hover:bg-[#F3F3F3] rounded text-[#6B6B6B]"
                    title="Copy URL"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => router.push("/editor")}
                  className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-[13px] bg-[#F3F3F3] text-black text-[13px] font-medium hover:bg-[#EAEAEA] transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit site
                </button>
                <button 
                  onClick={() => router.push("/publish")}
                  className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-[13px] bg-white border border-[#E6E6E6] text-black text-[13px] font-medium hover:border-[#C0C0C0] transition-all"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Quick Domain Checker & Upgrade Side Panel */}
          <div className="flex flex-col gap-6">
            
            {/* Domain Panel */}
            <div className="bg-white border border-[#E6E6E6] rounded-[18px] p-6 shadow-[0_6px_10px_-6px_#0000000a] flex flex-col gap-4">
              <h3 className="text-base font-semibold text-black flex items-center gap-2">
                <Globe className="w-4.5 h-4.5 text-[#8DB8FF]" />
                Domains
              </h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Your site is hosted at a free Webild subdomain. Upgrading lets you link any custom domain.
              </p>
              
              <div className="p-3 bg-[#FBFBFB] border border-[#E6E6E6] rounded-[13px] flex items-center justify-between">
                <div className="flex items-center gap-2 truncate">
                  <Check className="w-4 h-4 text-[#369762] flex-shrink-0" />
                  <span className="text-sm font-medium text-[#171717] truncate">{subdomain}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#6B6B6B] bg-[#F3F3F3] px-2 py-0.5 rounded-full">
                  Subdomain
                </span>
              </div>

              <button 
                onClick={() => toast.info("Custom domains feature is available on Premium plans.")}
                className="w-full h-10 rounded-[13px] bg-white border border-[#E6E6E6] hover:border-[#C0C0C0] text-black text-[13px] font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                Add Custom Domain
              </button>
            </div>

            {/* Plan Upgrade Box */}
            <div className="bg-[#2A2A2F] text-white rounded-[18px] p-6 shadow-[0_6px_15px_-6px_rgba(0,0,0,0.15)] relative overflow-hidden flex flex-col gap-4">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-[#8DB8FF]/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 transform -translate-x-4 translate-y-4 w-24 h-24 bg-[#8DFFB3]/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#8DFFB3]" />
                <span className="text-xs font-semibold text-[#8DFFB3] uppercase tracking-wide">Upgrade Plan</span>
              </div>

              <h4 className="text-lg font-medium leading-tight">Unlock premium custom templates & unlimited pages</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Connect custom domains, strip Webild branding, and access deeper design configurations.
              </p>

              <button 
                onClick={() => toast.success("Plan Upgrade Modal Triggered!")}
                className="w-full h-10 rounded-[13px] bg-white text-black text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#F3F3F3] transition-all active:scale-[0.98] mt-2"
              >
                Upgrade to Pro
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Lower Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Analytics Overview Stats */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <h3 className="text-base font-semibold text-black flex items-center gap-2">
              <TrendingUp className="w-4.5 h-4.5 text-[#369762]" />
              Site Performance
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-[#E6E6E6] rounded-[13px] p-4 flex flex-col gap-1 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.02)]">
                <span className="text-xs text-[#9CA3AF] font-medium flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Visitors
                </span>
                <span className="text-2xl font-semibold text-black">142</span>
                <span className="text-[10px] text-[#369762] font-semibold font-mono">+12.4% vs last week</span>
              </div>

              <div className="bg-white border border-[#E6E6E6] rounded-[13px] p-4 flex flex-col gap-1 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.02)]">
                <span className="text-xs text-[#9CA3AF] font-medium flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> Page Views
                </span>
                <span className="text-2xl font-semibold text-black">384</span>
                <span className="text-[10px] text-[#369762] font-semibold font-mono">+8.7% vs last week</span>
              </div>

              <div className="bg-white border border-[#E6E6E6] rounded-[13px] p-4 flex flex-col gap-1 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.02)]">
                <span className="text-xs text-[#9CA3AF] font-medium flex items-center gap-1.5">
                  <MousePointerClick className="w-3.5 h-3.5" /> CTA Clicks
                </span>
                <span className="text-2xl font-semibold text-black">58</span>
                <span className="text-[10px] text-[#369762] font-semibold font-mono">+18.2% vs last week</span>
              </div>

              <div className="bg-white border border-[#E6E6E6] rounded-[13px] p-4 flex flex-col gap-1 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.02)]">
                <span className="text-xs text-[#9CA3AF] font-medium flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Conv. Rate
                </span>
                <span className="text-2xl font-semibold text-black">15.1%</span>
                <span className="text-[10px] text-[#369762] font-semibold font-mono">+4.1% vs last week</span>
              </div>
            </div>
          </div>

          {/* SVG Analytics Chart */}
          <div className="md:col-span-2 bg-white border border-[#E6E6E6] rounded-[18px] p-6 shadow-[0_6px_10px_-6px_#0000000a] flex flex-col justify-between min-h-[220px]">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-semibold text-black">Visitor Over Time (Last 7 Days)</h4>
              <div className="flex items-center gap-3 text-xs text-[#6B6B6B]">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8DB8FF]" /> Views
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8DFFB3]" /> Clicks
                </div>
              </div>
            </div>
            
            <div className="relative flex-1 w-full h-32">
              <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
                {/* Grid Lines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="#F3F3F3" strokeWidth="1" />
                <line x1="0" y1="60" x2="500" y2="60" stroke="#F3F3F3" strokeWidth="1" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#F3F3F3" strokeWidth="1" />

                {/* Views Path (Blue) */}
                <path
                  d="M 10 90 Q 90 70 170 85 T 330 35 T 490 25"
                  fill="none"
                  stroke="#8DB8FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                
                {/* Clicks Path (Green) */}
                <path
                  d="M 10 110 Q 90 100 170 95 T 330 85 T 490 60"
                  fill="none"
                  stroke="#8DFFB3"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                <circle cx="170" cy="85" r="4" fill="#8DB8FF" />
                <circle cx="330" cy="35" r="4" fill="#8DB8FF" />
                <circle cx="490" cy="25" r="4" fill="#8DB8FF" />
                <circle cx="490" cy="60" r="4" fill="#8DFFB3" />
              </svg>
            </div>

            <div className="flex justify-between text-[11px] text-[#9CA3AF] font-medium mt-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
