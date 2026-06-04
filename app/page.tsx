"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  Home, 
  Layout as LayoutIcon, 
  Folder, 
  CreditCard, 
  BookOpen, 
  Settings, 
  LogOut,
  User,
  Shield,
  Upload,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { UserMenu } from "@/components/UserMenu";
import { useEditor } from "@/context/EditorContext";


// ─── Small reusable pieces ───────────────────────────────────────────────────

function DarkButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center h-10 px-6      rounded-lg   btn-dark text-white text-[12px] font-medium whitespace-nowrap hover:bg-[#3E3E45] ${className}`}
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
        className="w-full max-w-2xl bg-white rounded-[18px] border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden text-left flex flex-col max-h-[85vh] select-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F3F3]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5   rounded-lg bg-[#369762]" />
            <span className="text-[13px] font-semibold text-black font-mono">reidhoffman.linkedpage.me</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8   rounded-lg flex items-center justify-center bg-[#F3F3F3] text-black hover:bg-[#EAEAEA] transition-colors active:scale-90 font-bold"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-[#F7F7F7]">
          {/* Micro-site content */}
          <div className="bg-white      rounded-lg   border border-[#E6E6E6] p-6 flex flex-col gap-4  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16   rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
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
            <div className="bg-white      rounded-lg   border border-[#E6E6E6] p-4 flex flex-col gap-2  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
              <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Experience</span>
              <p className="text-[14px] font-semibold text-black font-inter-tight">Greylock Partners</p>
              <p className="text-[12px] text-gray-500 font-inter-tight">Partner • 2009 - Present</p>
            </div>
            <div className="bg-white      rounded-lg   border border-[#E6E6E6] p-4 flex flex-col gap-2  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
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
            className="h-10 px-5      rounded-lg   bg-[#2A2A2F] text-white text-[12px] font-medium hover:bg-[#3E3E45] transition-colors active:scale-95"
          >
            Export ZIP Source
          </button>
          <button
            onClick={() => { toast.success("Micro-site published live on reidhoffman.linkedpage.me!"); onClose(); }}
            className="h-10 px-5      rounded-lg   bg-[#E6FFE6] border border-[#8DFFB3]/40 text-[#1B5E20] text-[12px] font-medium hover:bg-[#D4FCD4] transition-colors active:scale-95"
          >
            Publish Live
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const COLOR_PALETTES = [
  { name: "Alexandria", gradient: "conic-gradient(rgb(245, 250, 255) 0%, rgb(245, 250, 255) 25%, rgb(21, 71, 156) 25%, rgb(21, 71, 156) 50%, rgb(168, 204, 232) 50%, rgb(168, 204, 232) 75%, rgb(123, 163, 207) 75%, rgb(123, 163, 207) 100%)" },
  { name: "Evergreen", gradient: "conic-gradient(rgb(250, 255, 251) 0%, rgb(250, 255, 251) 25%, rgb(10, 112, 95) 25%, rgb(10, 112, 95) 50%, rgb(168, 217, 190) 50%, rgb(168, 217, 190) 75%, rgb(107, 191, 184) 75%, rgb(107, 191, 184) 100%)" },
  { name: "Crimson", gradient: "conic-gradient(rgb(255, 250, 250) 0%, rgb(255, 250, 250) 25%, rgb(230, 57, 70) 25%, rgb(230, 57, 70) 50%, rgb(245, 196, 199) 50%, rgb(245, 196, 199) 75%, rgb(240, 145, 153) 75%, rgb(240, 145, 153) 100%)" },
  { name: "Lavender", gradient: "conic-gradient(rgb(251, 250, 255) 0%, rgb(251, 250, 255) 25%, rgb(139, 92, 246) 25%, rgb(139, 92, 246) 50%, rgb(216, 206, 245) 50%, rgb(216, 206, 245) 75%, rgb(196, 168, 249) 75%, rgb(196, 168, 249) 100%)" },
  { name: "Sahara", gradient: "conic-gradient(rgb(246, 240, 233) 0%, rgb(246, 240, 233) 25%, rgb(43, 24, 10) 25%, rgb(43, 24, 10) 50%, rgb(148, 135, 124) 50%, rgb(148, 135, 124) 75%, rgb(175, 160, 148) 75%, rgb(175, 160, 148) 100%)" },
  { name: "Glacier", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(28, 28, 28) 25%, rgb(28, 28, 28) 50%, rgb(21, 71, 156) 50%, rgb(21, 71, 156) 75%, rgb(168, 204, 232) 75%, rgb(168, 204, 232) 100%)" },
  { name: "Forest", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(28, 28, 28) 25%, rgb(28, 28, 28) 50%, rgb(21, 156, 73) 50%, rgb(21, 156, 73) 75%, rgb(168, 232, 186) 75%, rgb(168, 232, 186) 100%)" },
  { name: "Coral", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(28, 28, 28) 25%, rgb(28, 28, 28) 50%, rgb(230, 57, 70) 50%, rgb(230, 57, 70) 75%, rgb(232, 190, 168) 75%, rgb(232, 190, 168) 100%)" },
  { name: "Amethyst", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(28, 28, 28) 25%, rgb(28, 28, 28) 50%, rgb(97, 57, 230) 50%, rgb(97, 57, 230) 75%, rgb(179, 168, 232) 75%, rgb(179, 168, 232) 100%)" },
  { name: "Parchment", gradient: "conic-gradient(rgb(239, 235, 229) 0%, rgb(239, 235, 229) 25%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 50%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 75%, rgb(225, 184, 117) 75%, rgb(225, 184, 117) 100%)" },
  { name: "Emerald City", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(31, 81, 76) 25%, rgb(31, 81, 76) 50%, rgb(21, 156, 73) 50%, rgb(21, 156, 73) 75%, rgb(168, 232, 186) 75%, rgb(168, 232, 186) 100%)" },
  { name: "Navy Pier", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(31, 50, 81) 25%, rgb(31, 50, 81) 50%, rgb(21, 71, 156) 50%, rgb(21, 71, 156) 75%, rgb(168, 204, 232) 75%, rgb(168, 204, 232) 100%)" },
  { name: "Bordeaux", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(81, 31, 31) 25%, rgb(81, 31, 31) 50%, rgb(230, 57, 70) 50%, rgb(230, 57, 70) 75%, rgb(232, 190, 168) 75%, rgb(232, 190, 168) 100%)" },
  { name: "Plum", gradient: "conic-gradient(rgb(245, 245, 245) 0%, rgb(245, 245, 245) 25%, rgb(52, 31, 81) 25%, rgb(52, 31, 81) 50%, rgb(97, 57, 230) 50%, rgb(97, 57, 230) 75%, rgb(179, 168, 232) 75%, rgb(179, 168, 232) 100%)" },
  { name: "Sakura", gradient: "conic-gradient(rgb(247, 246, 247) 0%, rgb(247, 246, 247) 25%, rgb(27, 12, 37) 25%, rgb(27, 12, 37) 50%, rgb(255, 147, 228) 50%, rgb(255, 147, 228) 75%, rgb(232, 168, 195) 75%, rgb(232, 168, 195) 100%)" },
  { name: "Sunset", gradient: "conic-gradient(rgb(247, 246, 247) 0%, rgb(247, 246, 247) 25%, rgb(255, 98, 7) 25%, rgb(255, 98, 7) 50%, rgb(255, 206, 147) 50%, rgb(255, 206, 147) 75%, rgb(232, 207, 168) 75%, rgb(232, 207, 168) 100%)" },
  { name: "Azure", gradient: "conic-gradient(rgb(247, 246, 247) 0%, rgb(247, 246, 247) 25%, rgb(7, 152, 255) 25%, rgb(7, 152, 255) 50%, rgb(147, 199, 255) 50%, rgb(147, 199, 255) 75%, rgb(168, 205, 232) 75%, rgb(168, 205, 232) 100%)" },
  { name: "Peach Blossom", gradient: "conic-gradient(rgb(227, 222, 234) 0%, rgb(227, 222, 234) 25%, rgb(39, 35, 31) 25%, rgb(39, 35, 31) 50%, rgb(198, 138, 98) 50%, rgb(198, 138, 98) 75%, rgb(198, 138, 98) 75%, rgb(198, 138, 98) 100%)" },
  { name: "Iris", gradient: "conic-gradient(rgb(227, 222, 234) 0%, rgb(227, 222, 234) 25%, rgb(31, 32, 39) 25%, rgb(31, 32, 39) 50%, rgb(98, 125, 198) 50%, rgb(98, 125, 198) 75%, rgb(98, 125, 198) 75%, rgb(98, 125, 198) 100%)" },
  { name: "Sandstone", gradient: "conic-gradient(rgb(245, 244, 239) 0%, rgb(245, 244, 239) 25%, rgb(42, 41, 40) 25%, rgb(42, 41, 40) 50%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 75%, rgb(198, 177, 128) 75%, rgb(198, 177, 128) 100%)" },
  { name: "Slate", gradient: "conic-gradient(rgb(245, 244, 240) 0%, rgb(245, 244, 240) 25%, rgb(44, 44, 44) 25%, rgb(44, 44, 44) 50%, rgb(138, 138, 138) 50%, rgb(138, 138, 138) 75%, rgb(232, 230, 225) 75%, rgb(232, 230, 225) 100%)" },
  { name: "Botanical", gradient: "conic-gradient(rgb(246, 247, 244) 0%, rgb(246, 247, 244) 25%, rgb(14, 58, 41) 25%, rgb(14, 58, 41) 50%, rgb(53, 193, 139) 50%, rgb(53, 193, 139) 75%, rgb(198, 239, 198) 75%, rgb(198, 239, 198) 100%)" },
  { name: "Desert", gradient: "conic-gradient(rgb(252, 246, 236) 0%, rgb(252, 246, 236) 25%, rgb(46, 37, 33) 25%, rgb(46, 37, 33) 50%, rgb(178, 162, 139) 50%, rgb(178, 162, 139) 75%, rgb(178, 162, 139) 75%, rgb(178, 162, 139) 100%)" },
  { name: "Rosewood", gradient: "conic-gradient(rgb(247, 246, 247) 0%, rgb(247, 246, 247) 25%, rgb(184, 43, 64) 25%, rgb(184, 43, 64) 50%, rgb(185, 9, 65) 50%, rgb(185, 9, 65) 75%, rgb(232, 168, 182) 75%, rgb(232, 168, 182) 100%)" },
];

function FloatingBentoMockup() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.1 }
        }
      }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-12 px-4 relative"
    >
      {/* Profile Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
        className="md:col-span-1 rounded-[24px] bg-white/70 backdrop-blur-xl border border-white/60 p-6 flex flex-col gap-4 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.03)] text-left"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8DFFB3] to-[#8DB8FF] p-[2px] shadow-sm">
            <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256"
                alt="Reid Hoffman"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-black font-inter-tight leading-tight">Reid Hoffman</h3>
            <p className="text-[12px] text-gray-400 font-inter-tight">Co-founder, LinkedIn</p>
          </div>
        </div>
        <p className="text-[13px] text-[#171717]/70 leading-relaxed font-inter-tight">
          Entrepreneur, VC, and executive. Passionate about building networks and scaling platforms that transform global industries.
        </p>
        <div className="flex gap-2 mt-1">
          <span className="text-[11px] font-semibold text-gray-500 bg-[#F3F3F3] border border-neutral-200/50 px-2.5 py-1 rounded-full leading-none">
            Silicon Valley
          </span>
          <span className="text-[11px] font-semibold text-[#1B5E20] bg-[#E6FFE6] border border-[#8DFFB3]/40 px-2.5 py-1 rounded-full leading-none">
            VC & Angel
          </span>
        </div>
      </motion.div>

      {/* Experience Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
        className="md:col-span-1 rounded-[24px] bg-white/70 backdrop-blur-xl border border-white/60 p-6 flex flex-col gap-4 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.03)] text-left"
      >
        <h4 className="text-[12px] font-bold text-[#369762] uppercase tracking-wider font-inter-tight">
          Featured Experience
        </h4>
        <div className="flex flex-col gap-3.5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0a66c2] text-xs font-bold shrink-0">
              in
            </div>
            <div>
              <p className="text-[13.5px] font-bold text-black leading-tight">Co-Founder & CEO</p>
              <p className="text-[11.5px] text-gray-500">LinkedIn • 2002 - 2009</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2A2A2F]/5 border border-[#2A2A2F]/10 flex items-center justify-center text-[#2A2A2F] text-[10px] font-bold shrink-0">
              GL
            </div>
            <div>
              <p className="text-[13.5px] font-bold text-black leading-tight">Partner</p>
              <p className="text-[11.5px] text-gray-500">Greylock • 2009 - Present</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skills Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
        className="md:col-span-1 rounded-[24px] bg-white/70 backdrop-blur-xl border border-white/60 p-6 flex flex-col justify-between gap-4 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.03)] text-left"
      >
        <div className="flex flex-col gap-3">
          <h4 className="text-[12px] font-bold text-[#8DB8FF] uppercase tracking-wider font-inter-tight">
            Expertise & Focus
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {["Venture Capital", "Scaling", "Product Strategy", "Network Effects", "AI Ethics"].map((skill) => (
              <span key={skill} className="text-[11px] font-medium text-[#2A2A2F] bg-white border border-[#E6E6E6] px-2.5 py-1 rounded-lg">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-[#F3F3F3] pt-3 flex items-center justify-between">
          <span className="text-[11.5px] font-semibold text-gray-400">Education</span>
          <span className="text-[12.5px] font-bold text-[#2A2A2F] font-inter-tight">Stanford University</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroSection() {
  const router = useRouter();

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
        duration: 0.45,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white pt-28 pb-20">
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-90">
        <img
          src="/bg.png"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Centered Content Container */}
      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center gap-6 px-6 sm:px-8"
      >
        {/* Badge */}
        <motion.div
          variants={heroItemVariants}
          onClick={() => router.push("/onboarding")}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E6E6E6] bg-white shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] cursor-pointer hover:bg-gray-50 active:scale-97 transition-transform"
        >
          <span className="gradient-text-rainbow text-[13px] font-semibold leading-[18px]">
            Create in under 60 seconds
          </span>
          <span className="flex items-center justify-center w-6 h-6 rounded-lg btn-dark-sm flex-shrink-0 active:scale-[0.95] transition-transform">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M3.98708 3.98709H9.6837V9.68372" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.98708 9.68372L9.6837 3.98709" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.div>

        {/* Heading Title */}
        <motion.h1
          variants={heroItemVariants}
          className="text-black text-[42px] sm:text-[56px] lg:text-[68px] leading-[1.05] font-semibold tracking-tight font-inter-tight max-w-4xl"
        >
          LinkedIn to personal Website.
        </motion.h1>

        {/* Subheading description */}
        <motion.p
          variants={heroItemVariants}
          className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl font-inter-tight"
        >
          Instantly turn your LinkedIn public data export ZIP into a fully structured personal website. Edit layout templates, add custom domains, and go live.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={heroItemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
        >
          <button
            onClick={() => router.push("/onboarding")}
            className="h-11 px-6 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[13px] font-semibold rounded-[13px] transition-[background-color,transform] duration-100 active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] cursor-pointer"
          >
            Build Your Website <ArrowRight className="w-4.5 h-4.5" />
          </button>
          
          <button
            onClick={() => router.push("/editor")}
            className="h-11 px-6 bg-[#F3F3F3] hover:bg-[#EAEAEA] text-black text-[13px] font-semibold rounded-[13px] transition-[background-color,transform] duration-100 active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] cursor-pointer border border-[#E6E6E6]"
          >
            Skip & Try Mock Data →
          </button>
        </motion.div>

        {/* Floating Bento Mockup Below */}
        <motion.div
          variants={heroItemVariants}
          className="w-full flex justify-center mt-6"
        >
          <FloatingBentoMockup />
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
                <div className="relative aspect-square      rounded-lg   overflow-hidden bg-[#FBFBFB] border border-[#E6E6E6] p-[11px]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  transition-transform duration-300 ease-out hover:scale-[1.01] will-change-transform">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover     rounded-lg " />
                  {/* Bottom gradient overlay inside padding */}
                  <div className="absolute bottom-[11px] left-[11px] right-[11px] h-2/5 rounded-b-[8px]" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)" }} />
                  {/* Title */}
                  <div className="absolute bottom-[11px] left-[11px] right-[11px] p-5 z-10">
                    <p className="text-white text-[20px] font-normal leading-[26px] font-inter-tight">{t.name}</p>
                    <p className="text-white/75 text-[14px] leading-[20px] font-inter-tight">{t.subtitle}</p>
                  </div>
                  {/* Hover overlay */}
                  <div className="template-hover-overlay absolute inset-[11px] flex items-center justify-center     rounded-lg  bg-white/30 backdrop-blur-[1.5px]">
                    <div className="relative">
                      <div className="absolute -inset-1 opacity-20 blur-[4px]" style={{ background: "linear-gradient(95deg, #0894FF 0%, #C959DD 34%, #FF2E54 68%, #FF9004 100%)" }} />
                      <div className="relative p-0.5      rounded-lg   overflow-hidden bg-white">
                        <button
                          onClick={() => onSelectTemplate(t.name)}
                          className="h-10 px-5      rounded-lg   bg-[#2A2A2F] text-white text-[12px] font-medium hover:bg-[#3E3E45] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] "
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
          <div className="flex-1 h-2   rounded-lg border border-[#E6E6E6] bg-[#FBFBFB]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden mr-8">
            <div className="h-full w-1/4   rounded-lg" style={{ background: "linear-gradient(90deg, #8DFFB3 0%, #E6FFE6 100%)" }} />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollCarousel("prev")}
              className="flex items-center justify-center w-8 h-8      rounded-lg   border border-[#E6E6E6] bg-white text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254" stroke="currentColor" strokeWidth="1.03417" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel("next")}
              className="flex items-center justify-center w-8 h-8      rounded-lg   border border-[#E6E6E6] bg-white text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
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
    boldText: "Upload LinkedIn ZIP export",
    restText: " and watch LinkedPage parse your profile data to instantly render a professional personal page.",
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
              <div className="     rounded-lg   border border-[#E6E6E6] bg-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden p-2 transition-transform duration-300 ease-out hover:scale-[1.01] will-change-transform">
                <img
                  src={item.img}
                  alt={item.boldText}
                  className="w-full     rounded-lg  object-cover aspect-[41/38]"
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
          <div className="flex items-center      rounded-lg   bg-[#F3F3F3] p-1 border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  relative">
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
                      className="absolute inset-0 bg-[#E6FFE6] border border-[#8DFFB3]/40 rounded-[10px]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  -z-10"
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
            className="flex gap-6 overflow-x-auto scrollbar-hide      rounded-lg   border border-[#E6E6E6] p-2 bg-[#FBFBFB]"
          >
            {BUSINESS_CARDS.map((src, i) => (
              <div key={i} className="flex-shrink-0 w-full max-w-[900px] sm:max-w-[1100px]     rounded-lg  overflow-hidden  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  transition-transform duration-300 ease-out hover:scale-[1.005] will-change-transform">
                <img src={src} alt={`Business card ${i + 1}`} className="w-full h-auto     rounded-lg  object-cover" />
              </div>
            ))}
          </div>
          {/* Arrows */}
          <button
            onClick={() => scrollCarousel("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10   rounded-lg bg-white border border-[#E6E6E6] text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out hidden sm:flex"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254" stroke="currentColor" strokeWidth="1.03417" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scrollCarousel("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10   rounded-lg bg-white border border-[#E6E6E6] text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out hidden sm:flex"
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
              <div className="     rounded-lg   border border-[#E6E6E6] bg-white p-2 overflow-hidden  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  transition-transform duration-300 ease-out hover:scale-[1.01] will-change-transform">
                <img
                  src={f.img}
                  alt={f.text}
                  className="w-full     rounded-lg  object-cover aspect-[13/8]"
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
    0: "LinkedPage is a web tool that converts a LinkedIn data export ZIP into a beautiful personal micro-site. You upload your LinkedIn ZIP export, the platform parses your profile data, and instantly renders a customizable page.",
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
              <div key={i} className="     rounded-lg   border border-[#E6E6E6] bg-[#FBFBFB]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden font-inter">
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
                    className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-[10px] btn-dark-sm text-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] "
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
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [brandName, setBrandName] = useState("Creative Portfolio");
  const [subdomain, setSubdomain] = useState("realitycheque.io");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setShowPreview(true);
      window.history.replaceState({}, "", "/");
    }
    const storedBrand = sessionStorage.getItem("webild_brand_name");
    const storedSubdomain = sessionStorage.getItem("webild_subdomain");
    if (storedBrand) setBrandName(storedBrand);
    if (storedSubdomain) setSubdomain(storedSubdomain);

    try {
      const storedUser = sessionStorage.getItem("linkedpage_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUserName(parsed.name || "");
        setUserEmail(parsed.email || "");
      }
    } catch {
      // ignore
    }
  }, []);

  const simulateGeneration = (url: string) => {
    const raw = url.split(" --theme")[0].trim();
    if (!raw) {
      toast.error("Please paste a LinkedIn URL first!");
      return;
    }
    if (!raw.includes("linkedin.com/in/")) {
      toast.error("Please paste a valid LinkedIn profile URL (linkedin.com/in/…)");
      return;
    }
    router.push(`/onboarding?url=${encodeURIComponent(raw)}`);
  };

  const handleSelectTemplate = (templateName: string) => {
    // Map landing-page template name → editor template id
    const map: Record<string, string> = {
      "Minimal Card": "minimal-card",
      "Bento Grid": "bento-grid",
      "Full-Page Scroll": "full-scroll",
      "Dark Bento": "dark",
    };
    const id = map[templateName] ?? "minimal-card";
    router.push(`/editor?template=${id}`);
  };

  const handleTrial = () => {
    router.push("/editor");
  };

  const handleLogout = () => {
    toast.success("Logging out...");
    setTimeout(() => router.push("/login"), 1000);
  };

  return (
    <div className="min-h-screen font-inter bg-[#FBFBFB] text-black antialiased relative overflow-x-hidden">
      
      {/* ── Original Floating Navbar ── */}
      <Navbar />

      {/* ── Sidebar Toggle Trigger ── */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed left-5 top-28 z-40 w-10 h-10 rounded-full bg-white border border-[#E6E6E6] hover:bg-[#F7F7F7] active:scale-95 flex items-center justify-center shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] transition-all"
          title="Open Sidebar"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* ── Floating Overlay Sidebar (Closed by default, gap on left) ── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-45 bg-black/15 backdrop-blur-[2px]"
            />

            {/* Floating Sidebar Panel */}
            <motion.aside
              initial={{ opacity: 0, x: -60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="fixed left-5 top-28 bottom-5 w-[260px] border border-[#E6E6E6] bg-white/95 backdrop-blur-md px-6 py-6 flex flex-col justify-between z-50 select-none rounded-[16px] shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
            >
              
              {/* Top navigation items */}
              <div className="flex flex-col gap-6">
                
                {/* Header with Close button */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-black/40 uppercase tracking-wider">Navigation</span>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-black/5 text-[#171717]/60 hover:text-black transition-colors"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* New Website Button */}
                <button 
                  onClick={() => {
                    setIsSidebarOpen(false);
                    router.push("/onboarding");
                  }}
                  className="w-full h-11 bg-[#F3F3F5] hover:bg-[#EAEAEB] active:scale-[0.98] transition-all rounded-[12px] flex items-center justify-center gap-2 text-[14px] font-semibold text-black"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M9 12h6M12 9v6" />
                  </svg>
                  New Website
                </button>

                {/* Menu Items (Home Active) */}
                <div className="flex flex-col gap-1.5">
                  <button 
                    className="w-full h-10 px-3 rounded-[8px] bg-[#E8F1FF] border border-[#8DB8FF]/40 flex items-center gap-3 text-[14px] font-semibold text-[#1A68FF] transition-all text-left"
                    style={{ boxShadow: "0 6px 10px -6px #00000016" }}
                  >
                    <Home className="w-[18px] h-[18px] text-[#1A68FF]" />
                    Home
                  </button>

                  <button 
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/editor");
                    }}
                    className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all text-left"
                  >
                    <LayoutIcon className="w-[18px] h-[18px] text-black" />
                    Templates
                  </button>

                  <button 
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/dashboard");
                    }}
                    className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all text-left"
                  >
                    <Folder className="w-[18px] h-[18px] text-black" />
                    All Websites
                  </button>
                </div>

                {/* Recent Websites Section */}
                <div className="flex flex-col gap-2.5 pt-2 border-t border-[#F5F5F7]">
                  <span className="text-[12px] font-semibold text-[#88888E] px-3">Recent websites</span>
                  
                  <div 
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/dashboard");
                    }}
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
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/pricing");
                    }}
                    className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all text-left"
                  >
                    <CreditCard className="w-[18px] h-[18px] text-black" />
                    Pricing
                  </button>

                  <button 
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/docs");
                    }}
                    className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all text-left"
                  >
                    <BookOpen className="w-[18px] h-[18px] text-black" />
                    Documentation
                  </button>

                  <button 
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/settings");
                    }}
                    className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black transition-all text-left"
                  >
                    <Settings className="w-[18px] h-[18px] text-black" />
                    Settings
                  </button>
                </div>

              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Full-Width Container ── */}
      <div className="relative z-10 w-full min-h-screen">
        <main className="w-full relative">
          <HeroSection />
          <TemplatesSection onSelectTemplate={handleSelectTemplate} />
          <BusinessSection />
          <FeaturesSection onStartTrial={handleTrial} />
          <FAQSection />
          <Footer />
        </main>
      </div>

      {/* Scraped Site Live Preview Overlay Modal */}
      <AnimatePresence>
        {showPreview && (
          <PreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
