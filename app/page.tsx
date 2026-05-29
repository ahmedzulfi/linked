"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

// ─── Small reusable pieces ───────────────────────────────────────────────────

function DarkButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`inline-flex items-center justify-center h-10 px-6 rounded-[13px] btn-dark text-white text-[12px] font-medium whitespace-nowrap hover:bg-[#3E3E45] ${className}`}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#369762] text-[13px] leading-[18px] font-semibold uppercase tracking-wider mb-2 font-inter-tight">{children}</p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[28px] sm:text-[38px] leading-[46px] font-normal text-black font-inter-tight">
      {children}
    </h2>
  );
}

// ─── Template card data ───────────────────────────────────────────────────────

const TEMPLATES_LARGE = [
  {
    name: "Minimal Card",
    subtitle: "Clean, elegant, and focused on essential links",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/ccea70025e4eb65efc78244adad19aa72081243a?width=982",
  },
  {
    name: "Bento Grid",
    subtitle: "A highly visual grid showcasing work, experience, and projects",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/b44548e7be08969a8dfc228c049f55fdc9f7bcbb?width=982",
  },
  {
    name: "Full-Page Scroll",
    subtitle: "A modern, smooth-scrolling experience that tells your career story",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/22a1dcc1827cb472b41466029a5665e67ea82849?width=982",
  },
  {
    name: "Dark Bento",
    subtitle: "High-contrast dark mode grid for professional standout profiles",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/de2496b30f9ab12d95e5ad6f29af5e66821c7e0d?width=982",
  },
];

const FAQ_ITEMS = [
  "What is LinkedPage and how does it work?",
  "Do I need design or coding experience to use LinkedPage?",
  "How can I customize my micro-site?",
  "Can I connect my own domain or subdomain?",
  "Does LinkedPage host my micro-site?",
  "Can I edit or update my site after publishing?",
  "Can I export the code of my micro-site?",
];

// ─── Live Preview Modal Component ─────────────────────────────────────────────

function PreviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-2xl bg-white rounded-[18px] border border-[#E6E6E6] shadow-xl overflow-hidden text-left flex flex-col max-h-[85vh] select-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F3F3]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#369762]" />
            <span className="text-[13px] font-semibold text-black font-mono">reidhoffman.linkedpage.me</span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F3F3F3] text-black hover:bg-[#EAEAEA] transition-colors active:scale-90 font-bold"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-[#F7F7F7]">
          {/* Micro-site content */}
          <div className="bg-white rounded-[13px] border border-[#E6E6E6] p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256" 
                  alt="Reid Hoffman" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h3 className="text-[20px] font-bold text-black font-inter-tight leading-tight">Reid Hoffman</h3>
                <p className="text-[13px] text-gray-500 font-inter-tight">Co-founder LinkedIn | Partner at Greylock</p>
              </div>
            </div>
            <p className="text-[14px] text-[#171717]/80 leading-relaxed font-inter-tight">
              Entrepreneur, executive, and venture capitalist. Passionate about building products that connect people and scale networks to transform industries.
            </p>
          </div>

          {/* Bento blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-[13px] border border-[#E6E6E6] p-4 flex flex-col gap-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Experience</span>
              <p className="text-[14px] font-semibold text-black font-inter-tight">Greylock Partners</p>
              <p className="text-[12px] text-gray-500 font-inter-tight">Partner • 2009 - Present</p>
            </div>
            <div className="bg-white rounded-[13px] border border-[#E6E6E6] p-4 flex flex-col gap-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Education</span>
              <p className="text-[14px] font-semibold text-black font-inter-tight">Stanford University</p>
              <p className="text-[12px] text-gray-500 font-inter-tight">BS in Cognitive Science</p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#F3F3F3] bg-white">
          <button 
            onClick={() => toast.success("Code ZIP export complete! check your downloads.")}
            className="h-10 px-5 rounded-[13px] bg-[#2A2A2F] text-white text-[12px] font-medium hover:bg-[#3E3E45] transition-colors active:scale-95"
          >
            Export ZIP Source
          </button>
          <button 
            onClick={() => { toast.success("Micro-site published live on reidhoffman.linkedpage.me!"); onClose(); }}
            className="h-10 px-5 rounded-[13px] bg-[#E6FFE6] border border-[#8DFFB3]/40 text-[#1B5E20] text-[12px] font-medium hover:bg-[#D4FCD4] transition-colors active:scale-95"
          >
            Publish Live
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection({ onGenerate }: { onGenerate: (url: string) => void }) {
  const [profileUrl, setProfileUrl] = useState("https://www.linkedin.com/in/reidhoffman");

  const heroContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  };

  const enhancePrompt = () => {
    if (!profileUrl.trim()) {
      toast.error("Please paste a LinkedIn URL first!");
      return;
    }
    if (!profileUrl.includes("--theme")) {
      setProfileUrl(prev => `${prev.trim()} --theme bento --layout modern --accent sky-blue`);
      toast.success("Prompt enhanced with theme and layout parameters!");
    } else {
      toast.info("Prompt is already enhanced!");
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white pt-24 pb-16">
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-90">
        <img
          src="/bg.png"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <motion.div 
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[1536px] mx-auto flex flex-col items-center gap-6 px-6 sm:px-8 lg:px-20 text-center"
      >
        {/* Badge */}
        <motion.div 
          variants={heroItemVariants} 
          onClick={() => onGenerate(profileUrl)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E6E6E6] bg-white shadow-sm cursor-pointer hover:bg-gray-50 active:scale-97 transition-all"
        >
          <span className="gradient-text-rainbow text-[13px] font-medium leading-[18px]">
            Create in under 60 seconds
          </span>
          <span className="flex items-center justify-center w-7 h-7 rounded-full btn-dark-sm flex-shrink-0 active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.98708 3.98709H9.6837V9.68372" stroke="white" strokeWidth="1.13917" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.98708 9.68372L9.6837 3.98709" stroke="white" strokeWidth="1.13917" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          variants={heroItemVariants}
          className="text-black text-[38px] sm:text-[51px] leading-[1.1] font-medium tracking-tight max-w-4xl font-inter-tight"
        >
          LinkedIn to personal micro-site
        </motion.h1>

        {/* Prompt card */}
        <motion.div 
          variants={heroItemVariants}
          className="w-full max-w-[1040px] rounded-[13px] glass-card p-4 sm:p-5 flex flex-col gap-5 mt-4"
        >
          <div className="rounded-[13px] border border-[#E6E6E6] bg-white p-5 flex flex-col gap-4 shadow-sm focus-within:ring-2 focus-within:ring-[#8DB8FF]/40 transition-[box-shadow] duration-250 ease-out">
            {/* Textarea */}
            <textarea
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className="w-full bg-transparent text-[#171717] text-[16px] sm:text-[18px] leading-[27px] resize-none outline-none placeholder:text-[#171717]/40 min-h-[72px] font-inter-tight"
              placeholder="Paste your LinkedIn profile URL here..."
            />

            {/* Bottom actions */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-[#F3F3F3]">
              <div className="flex items-center gap-3">
                {/* Add button */}
                <button 
                  onClick={() => toast.success("Custom content block selector opened!")}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#E6E6E6] card-btn-shadow hover:bg-[#F7F7F7] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3.68124 8.83502H13.9887" stroke="black" strokeWidth="0.73625" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.83499 3.68127V13.9888" stroke="black" strokeWidth="0.73625" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Enhance prompt button */}
                <button 
                  onClick={enhancePrompt}
                  className="h-10 px-5 rounded-[13px] bg-[#F3F3F3] text-black text-[12px] font-medium hover:bg-[#EAEAEA] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out whitespace-nowrap"
                >
                  Enhance prompt
                </button>

                {/* Color palette button */}
                <button 
                  onClick={() => toast.success("Theme customizer panel loaded!")}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#E6E6E6] card-btn-shadow hover:bg-[#F7F7F7] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <g clipPath="url(#palette-clip)">
                      <path d="M7.07029 12.9622C5.50766 12.9622 4.00903 12.3415 2.90408 11.2365C1.79913 10.1316 1.17838 8.63296 1.17838 7.07032C1.17838 5.50769 1.79913 4.00906 2.90408 2.90411C4.00903 1.79916 5.50766 1.17841 7.07029 1.17841C8.63293 1.17841 10.1316 1.73708 11.2365 2.73154C12.3415 3.72599 12.9622 5.07476 12.9622 6.48113C12.9622 7.26245 12.6518 8.01176 12.0994 8.56424C11.5469 9.11671 10.7976 9.42709 10.0163 9.42709H8.69057C8.49908 9.42709 8.31138 9.48041 8.1485 9.58108C7.98561 9.68175 7.85397 9.82579 7.76834 9.99706C7.6827 10.1683 7.64645 10.3601 7.66365 10.5508C7.68085 10.7415 7.75081 10.9236 7.8657 11.0768L8.04246 11.3125C8.15735 11.4657 8.22731 11.6478 8.24451 11.8386C8.26171 12.0293 8.22546 12.221 8.13982 12.3923C8.05419 12.5635 7.92255 12.7076 7.75966 12.8082C7.59678 12.9089 7.40907 12.9622 7.21759 12.9622H7.07029Z" stroke="black" strokeWidth="0.589167" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="7.95378" cy="3.82957" r="0.59" fill="black" />
                      <circle cx="10.3104" cy="6.18626" r="0.59" fill="black" />
                      <circle cx="3.8296" cy="7.3646" r="0.59" fill="black" />
                      <circle cx="5.00813" cy="4.41892" r="0.59" fill="black" />
                    </g>
                    <defs>
                      <clipPath id="palette-clip">
                        <rect width="14.1406" height="14.1406" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-3">
                {/* Mic button */}
                <button 
                  onClick={() => toast("Listening for profile voice commands...")}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#E6E6E6] card-btn-shadow hover:bg-[#F7F7F7] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7.95499 12.5954V14.5837" stroke="black" strokeWidth="0.662917" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.5954 6.62915V7.95498C12.5954 9.1857 12.1065 10.366 11.2363 11.2363C10.366 12.1065 9.18571 12.5954 7.95499 12.5954C6.72428 12.5954 5.54397 12.1065 4.67372 11.2363C3.80347 10.366 3.31458 9.1857 3.31458 7.95498V6.62915" stroke="black" strokeWidth="0.662917" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.94375 3.31456C9.94375 2.2162 9.05335 1.32581 7.955 1.32581C6.85664 1.32581 5.96625 2.2162 5.96625 3.31456V7.95497C5.96625 9.05333 6.85664 9.94372 7.955 9.94372C9.05335 9.94372 9.94375 9.05333 9.94375 7.95497V3.31456Z" stroke="black" strokeWidth="0.662917" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Send button (Primary action) */}
                <button 
                  onClick={() => onGenerate(profileUrl)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#2A2A2F] text-white shadow-md hover:bg-[#3E3E45] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3.68127 8.83502L8.83502 3.68127L13.9888 8.83502" stroke="white" strokeWidth="0.73625" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.83502 13.9888V3.68127" stroke="white" strokeWidth="0.73625" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Templates Section ────────────────────────────────────────────────────────

function TemplatesSection({ onSelectTemplate }: { onSelectTemplate: (name: string) => void }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === "next" ? 520 : -520, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  };

  return (
    <section id="templates" className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden border-t border-[#E6E6E6]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div className="flex flex-col">
            <SectionLabel>Browse our collection</SectionLabel>
            <SectionHeading>Start with a Template</SectionHeading>
          </div>
          <DarkButton 
            onClick={() => toast.success("Loaded all templates!")}
            className="self-start sm:self-auto"
          >
            View All Templates
          </DarkButton>
        </div>

        {/* Template cards carousel */}
        <div className="relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
          >
            {TEMPLATES_LARGE.map((t, i) => (
              <motion.div 
                variants={itemVariants} 
                key={i} 
                className="flex-shrink-0 w-[300px] sm:w-[380px] lg:w-[495px] template-card group"
              >
                <div className="relative aspect-square rounded-[13px] overflow-hidden bg-[#FBFBFB] border border-[#E6E6E6] p-[11px] shadow-sm transition-transform duration-300 ease-out hover:scale-[1.01] will-change-transform">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover rounded-[8px]" />
                  {/* Bottom gradient overlay inside padding */}
                  <div className="absolute bottom-[11px] left-[11px] right-[11px] h-2/5 rounded-b-[8px]" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)" }} />
                  {/* Title */}
                  <div className="absolute bottom-[11px] left-[11px] right-[11px] p-5 z-10">
                    <p className="text-white text-[20px] font-normal leading-[26px] font-inter-tight">{t.name}</p>
                    <p className="text-white/75 text-[14px] leading-[20px] font-inter-tight">{t.subtitle}</p>
                  </div>
                  {/* Hover overlay */}
                  <div className="template-hover-overlay absolute inset-[11px] flex items-center justify-center rounded-[8px] bg-white/30 backdrop-blur-[1.5px]">
                    <div className="relative">
                      <div className="absolute -inset-1 opacity-20 blur-[4px]" style={{ background: "linear-gradient(95deg, #0894FF 0%, #C959DD 34%, #FF2E54 68%, #FF9004 100%)" }} />
                      <div className="relative p-0.5 rounded-[13px] overflow-hidden bg-white">
                        <button 
                          onClick={() => onSelectTemplate(t.name)}
                          className="h-10 px-5 rounded-[13px] bg-[#2A2A2F] text-white text-[12px] font-medium hover:bg-[#3E3E45] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out shadow-md"
                        >
                          Customize this look
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress + controls */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex-1 h-2 rounded-full border border-[#E6E6E6] bg-[#FBFBFB] shadow-sm overflow-hidden mr-8">
            <div className="h-full w-1/4 rounded-full" style={{ background: "linear-gradient(90deg, #8DFFB3 0%, #E6FFE6 100%)" }} />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollCarousel("prev")}
              className="flex items-center justify-center w-8 h-8 rounded-[13px] border border-[#E6E6E6] bg-white text-black shadow-sm hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254" stroke="currentColor" strokeWidth="1.03417" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel("next")}
              className="flex items-center justify-center w-8 h-8 rounded-[13px] border border-[#E6E6E6] bg-white text-black shadow-sm hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M4.65375 9.30754L7.75625 6.20504L4.65375 3.10254" stroke="currentColor" strokeWidth="1.03417" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── How It Works Section ─────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    img: "/process1 (1).png",
    boldText: "Paste your LinkedIn link",
    restText: " and watch LinkedPage scrape your profile data to instantly render a professional personal page.",
  },
  {
    img: "/process1 (2).png",
    boldText: "Customize inline",
    restText: " text and images directly on the screen, and pick from multiple clean layout styles like Bento or minimal.",
  },
  {
    img: "/process1 (3).png",
    boldText: "Publish or export",
    restText: " instantly to a free subdomain or download the complete source code as a zip file to host anywhere.",
  },
];

function HowItWorksSection({ onStartGen }: { onStartGen: () => void }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-[#F7F7F7] border-t border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>Get your page in under 60 seconds</SectionHeading>
          </div>
          <DarkButton 
            onClick={onStartGen}
            className="self-start sm:self-auto"
          >
            Generate Now
          </DarkButton>
        </div>

        {/* 3-column grid with stagger */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div variants={itemVariants} key={i} className="flex flex-col gap-4">
              <div className="rounded-[13px] border border-[#E6E6E6] bg-white shadow-sm overflow-hidden p-2 transition-transform duration-300 ease-out hover:scale-[1.01] will-change-transform">
                <img
                  src={item.img}
                  alt={item.boldText}
                  className="w-full rounded-[8px] object-cover aspect-[41/38]"
                />
              </div>
              <p className="text-[16px] leading-[24px] text-[#171717]/60 font-inter-tight">
                <span className="text-[#171717] font-medium block mb-1 text-[18px] leading-[24px]">{item.boldText}</span>
                {item.restText}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Business Section (Career Showcase) ──────────────────────────────────────

const BUSINESS_TABS = ["Experience", "Projects", "Education", "Contact"];
const BUSINESS_CARDS = [
  "https://api.builder.io/api/v1/image/assets/TEMP/dd2d088a6043ca3ede653099742f96ac52246893?width=2560",
  "https://api.builder.io/api/v1/image/assets/TEMP/bd350a3668e75fb33844ff3cbe4a31706b2273df?width=2560",
  "https://api.builder.io/api/v1/image/assets/TEMP/f502cc59ba5f4d7f14360e66cb7e6447fb3a3c98?width=2560",
  "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=1200" // 4th placeholder card image for Contact tab
];

function BusinessSection() {
  const [activeTab, setActiveTab] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (i: number) => {
    setActiveTab(i);
    if (carouselRef.current) {
      const container = carouselRef.current;
      const slide = container.children[i] as HTMLElement;
      if (slide) {
        container.scrollTo({
          left: slide.offsetLeft - 8,
          behavior: "smooth"
        });
      }
    }
  };

  const scrollCarousel = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth;
    carouselRef.current.scrollBy({ left: dir === "next" ? scrollAmount : -scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="showcase" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6E6E6]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20 flex flex-col gap-8"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionLabel>Beautiful structures for real content</SectionLabel>
          <SectionHeading>Showcase Your Career</SectionHeading>
        </div>

        {/* Tabs with layout glide */}
        <div className="flex justify-center mt-2">
          <div className="flex items-center rounded-[13px] bg-[#F3F3F3] p-1 border border-[#E6E6E6] shadow-sm relative">
            {BUSINESS_TABS.map((tab, i) => {
              const isActive = activeTab === i;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(i)}
                  className={`relative h-9 px-6 text-[14px] leading-[20px] rounded-[10px] transition-colors duration-200 whitespace-nowrap font-inter-tight z-10 ${isActive ? "text-[#1B5E20] font-semibold" : "text-[#171717]/60 hover:text-black"}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-business-tab"
                      className="absolute inset-0 bg-[#E6FFE6] border border-[#8DFFB3]/40 rounded-[10px] shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Card carousel */}
        <div className="relative mt-4">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide rounded-[13px] border border-[#E6E6E6] p-2 bg-[#FBFBFB]"
          >
            {BUSINESS_CARDS.map((src, i) => (
              <div key={i} className="flex-shrink-0 w-full max-w-[900px] sm:max-w-[1100px] rounded-[8px] overflow-hidden shadow-sm transition-transform duration-300 ease-out hover:scale-[1.005] will-change-transform">
                <img src={src} alt={`Business card ${i + 1}`} className="w-full h-auto rounded-[8px] object-cover" />
              </div>
            ))}
          </div>
          {/* Arrows */}
          <button
            onClick={() => scrollCarousel("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#E6E6E6] text-black shadow-md hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out hidden sm:flex"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254" stroke="currentColor" strokeWidth="1.03417" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scrollCarousel("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#E6E6E6] text-black shadow-md hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out hidden sm:flex"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M4.65375 9.30754L7.75625 6.20504L4.65375 3.10254" stroke="currentColor" strokeWidth="1.03417" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────

const FEATURES = [
  {
    img: "/feature (1).png",
    text: "Fully responsive layouts optimized for mobile, tablet, and desktop viewing.",
  },
  {
    img: "/feature (2).png",
    text: "Export clean static code zip files to host on GitHub Pages, Vercel, or Netlify.",
  },
];

function FeaturesSection({ onStartTrial }: { onStartTrial: () => void }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  };

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-[#F7F7F7] border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <SectionLabel>Clean & Modern Aesthetics</SectionLabel>
            <SectionHeading>A Page with Real Content</SectionHeading>
          </div>
          <DarkButton 
            onClick={onStartTrial}
            className="self-start sm:self-auto"
          >
            Try It Free
          </DarkButton>
        </div>

        {/* 2-column grid with stagger */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {FEATURES.map((f, i) => (
            <motion.div variants={itemVariants} key={i} className="flex flex-col gap-4">
              <div className="rounded-[13px] border border-[#E6E6E6] bg-white p-2 overflow-hidden shadow-sm transition-transform duration-300 ease-out hover:scale-[1.01] will-change-transform">
                <img
                  src={f.img}
                  alt={f.text}
                  className="w-full rounded-[8px] object-cover aspect-[13/8]"
                />
              </div>
              <p className="text-[#171717] text-[16px] sm:text-[18px] leading-[27px] font-normal font-inter-tight">{f.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  const answers: Record<number, string> = {
    0: "LinkedPage is a web tool that converts a LinkedIn profile URL into a beautiful personal micro-site. You paste your LinkedIn link, the platform scrapes your profile data, and instantly renders a customizable page.",
    1: "No design or coding experience is required! LinkedPage automatically extracts your career history, skills, and details, then formats them into a polished personal website.",
    2: "You can edit text and images inline, swap and rearrange layout elements, and switch templates (minimal card, bento grid, full-page scroll, or dark mode) directly on the screen.",
    3: "Yes! You can connect your own custom domain, or publish it instantly on a free subdomain (like yourname.linkedpage.me).",
    4: "Yes, every site built with LinkedPage includes fast, free built-in hosting, so your professional site is online in seconds.",
    5: "Absolutely. You can update your site at any time through our inline visual editor. Changes go live instantly.",
    6: "Yes, you can export the generated code as a ZIP file containing clean, static HTML, CSS, and JS to host on GitHub Pages, Vercel, or any provider of your choice.",
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-12">
          <SectionLabel>Frequently Asked Questions</SectionLabel>
          <SectionHeading>Still have questions about LinkedPage?</SectionHeading>
        </div>

        {/* FAQ items */}
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {FAQ_ITEMS.map((question, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="rounded-[13px] border border-[#E6E6E6] bg-[#FBFBFB] shadow-sm overflow-hidden font-inter">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => toggle(i)}
                >
                  <span className="text-[#171717] text-[16px] sm:text-[18px] leading-[26px] font-medium font-inter-tight pr-4">
                    {question}
                  </span>
                  <motion.span 
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-[10px] btn-dark-sm text-white shadow-sm"
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path d="M2.94586 7.5H11.1945" stroke="currentColor" strokeWidth="1.17833" strokeLinecap="round" strokeLinejoin="round" />
                      <path 
                        d="M7.07001 3.375V11.625" 
                        stroke="currentColor" 
                        strokeWidth="1.17833" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        style={{
                          transformOrigin: "center",
                          transition: "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s ease",
                          transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                          opacity: isOpen ? 0 : 1
                        }}
                      />
                    </svg>
                  </motion.span>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-[#171717]/60 text-[15px] sm:text-[16px] leading-[24px] font-inter-tight border-t border-[#F3F3F3]/80 pt-4">
                        {answers[i]}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Index() {
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const simulateGeneration = (url: string) => {
    if (!url.trim()) {
      toast.error("Please paste a valid LinkedIn URL first!");
      return;
    }
    if (isGenerating) return;

    setIsGenerating(true);
    toast.info("Scraping LinkedIn profile details...");

    setTimeout(() => {
      toast.info("Parsing experience history and skill tags...");
      
      setTimeout(() => {
        toast.info("Optimizing micro-site page assets...");
        
        setTimeout(() => {
          setIsGenerating(false);
          toast.success("Generation completed!");
          setShowPreview(true);
        }, 800);
      }, 700);
    }, 600);
  };

  const handleSelectTemplate = (templateName: string) => {
    toast.success(`Selected "${templateName}". Generating layout mock...`);
    setShowPreview(true);
  };

  const handleTrial = () => {
    toast.success("Free trial activated! 0 credit card needed.");
  };

  return (
    <div className="min-h-screen font-inter bg-white text-black antialiased relative">
      <Navbar />
      <main>
        <HeroSection onGenerate={simulateGeneration} />
        <TemplatesSection onSelectTemplate={handleSelectTemplate} />
        <HowItWorksSection onStartGen={() => simulateGeneration("https://www.linkedin.com/in/reidhoffman")} />
        <BusinessSection />
        <FeaturesSection onStartTrial={handleTrial} />
        <FAQSection />
      </main>
      <Footer />

      {/* Scraped Site Live Preview Overlay Modal */}
      <AnimatePresence>
        {showPreview && (
          <PreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
