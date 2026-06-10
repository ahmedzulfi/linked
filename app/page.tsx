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
  ArrowRight,
  Sparkles,
  Upload,
  Cpu,
  Download,
  CheckCircle2,
  FileCode,
  Smartphone,
  Minus,
  Plus,
  HelpCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

// ─── Small Reusable Pieces ───────────────────────────────────────────────────

function DarkButton({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#2A2A2F] text-white text-[12px] font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] hover:bg-[#3E3E45] shadow-sm ${className}`}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#0A705F] text-[11px] leading-[16px] font-bold uppercase tracking-[0.2em] mb-3 font-plus-jakarta">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.15] font-bold text-black font-plus-jakarta tracking-tight text-balance">
      {children}
    </h2>
  );
}

// ─── Template Card Data ───────────────────────────────────────────────────────

const TEMPLATES_LARGE = [
  {
    name: "Minimal Card",
    subtitle: "Clean, elegant, and focused on essential links",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/ccea70025e4eb65efc78244adad19aa72081243a?width=982",
    id: "minimal-card",
  },
  {
    name: "Bento Grid",
    subtitle: "A highly visual grid showcasing work, experience, and projects",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/b44548e7be08969a8dfc228c049f55fdc9f7bcbb?width=982",
    id: "bento-grid",
  },
  {
    name: "Full-Page Scroll",
    subtitle:
      "A modern, smooth-scrolling experience that tells your career story",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/22a1dcc1827cb472b41466029a5665e67ea82849?width=982",
    id: "full-scroll",
  },
  {
    name: "Dark Bento",
    subtitle: "High-contrast dark mode grid for professional standout profiles",
    img: "https://api.builder.io/api/v1/image/assets/TEMP/de2496b30f9ab12d95e5ad6f29af5e66821c7e0d?width=982",
    id: "dark",
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

function PreviewModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-2xl bg-[#FBFBFB] rounded-[24px] border border-[#E6E6E6] shadow-2xl overflow-hidden text-left flex flex-col max-h-[85vh] select-none font-plus-jakarta"
      >
        {/* Header (Doppelrand Sub-panel) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E6E6]/60 bg-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0A705F]" />
            <span className="text-[12px] font-semibold text-black/70 font-mono">
              reidhoffman.linkedpage.me
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-[#F3F3F5] text-black hover:bg-black/5 transition-colors active:scale-90 font-bold"
          >
            &times;
          </button>
        </div>

        {/* Content - Doppelrand Core */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-[#F7F7F7]">
          {/* Micro-site content */}
          <div className="bg-white rounded-[16px] border border-[#E6E6E6] p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256"
                  alt="Reid Hoffman"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-black leading-tight">
                  Reid Hoffman
                </h3>
                <p className="text-[12px] text-gray-500 font-medium">
                  Co-founder LinkedIn | Partner at Greylock
                </p>
              </div>
            </div>
            <p className="text-[14px] text-[#171717]/80 leading-relaxed font-inter">
              Entrepreneur, executive, and venture capitalist. Passionate about
              building products that connect people and scale networks to
              transform industries.
            </p>
          </div>

          {/* Bento blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-[16px] border border-[#E6E6E6] p-5 flex flex-col gap-2 shadow-sm">
              <span className="text-[9px] font-mono uppercase text-[#0A705F] font-bold tracking-wider">
                Experience
              </span>
              <p className="text-[14px] font-bold text-black">
                Greylock Partners
              </p>
              <p className="text-[12px] text-gray-500 font-medium font-inter">
                Partner • 2009 - Present
              </p>
            </div>
            <div className="bg-white rounded-[16px] border border-[#E6E6E6] p-5 flex flex-col gap-2 shadow-sm">
              <span className="text-[9px] font-mono uppercase text-[#0A705F] font-bold tracking-wider">
                Education
              </span>
              <p className="text-[14px] font-bold text-black">
                Stanford University
              </p>
              <p className="text-[12px] text-gray-500 font-medium font-inter">
                BS in Cognitive Science
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E6E6E6]/60 bg-white">
          <button
            onClick={() =>
              toast.success("Code ZIP export complete! check your downloads.")
            }
            className="h-10 px-5 rounded-full bg-[#2A2A2F] text-white text-[12px] font-semibold hover:bg-[#3E3E45] transition-colors active:scale-95 shadow-sm"
          >
            Export ZIP Source
          </button>
          <button
            onClick={() => {
              toast.success(
                "Micro-site published live on reidhoffman.linkedpage.me!",
              );
              onClose();
            }}
            className="h-10 px-5 rounded-full bg-[#E6FFE6] border border-[#8DFFB3]/40 text-[#075043] text-[12px] font-semibold hover:bg-[#D4FCD4] transition-colors active:scale-95"
          >
            Publish Live
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Hero Section (Asymmetric Split Screen) ───────────────────────────────────

function HabitlineProductShowcase() {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const },
    },
  };

  return (
    <div className="relative w-full select-none pointer-events-none p-1 bg-white rounded-[24px]">
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full overflow-hidden rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
      >
        <img
          src="/heroimage.png"
          alt="Website Preview"
          className="w-full h-auto object-cover object-top select-none pointer-events-none"
        />
      </motion.div>
    </div>
  );
}

function HeroSection() {
  const router = useRouter();

  const heroContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
  };

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center bg-[#FBFBFB] pt-32 pb-24 overflow-hidden border-b border-[#E6E6E6]/60">
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-95">
        <img
          src="/bg.png"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFB]/30 via-[#FBFBFB]/80 to-[#FBFBFB]" />
      </div>

      {/* Asymmetric Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left column: Content */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 flex flex-col text-left items-start gap-6"
        >
          {/* Eyebrow badge */}
          <motion.div
            variants={heroItemVariants}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#E6FFE6] border border-[#8DFFB3]/40 text-[#0A705F] rounded-full text-[10px] font-bold uppercase tracking-[0.2em] font-plus-jakarta"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Instant Personal Site
          </motion.div>

          {/* Headline (Max 2 lines on desktop) */}
          <motion.h1
            variants={heroItemVariants}
            className="text-black text-[38px] sm:text-[52px] lg:text-[58px] leading-[1.08] font-bold tracking-tight font-plus-jakarta text-balance"
          >
            Build personal website that actually stands out.
          </motion.h1>

          {/* Subheading description */}
          <motion.p
            variants={heroItemVariants}
            className="text-[#171717]/70 text-base sm:text-lg leading-relaxed max-w-xl font-inter"
          >
            Instantly turn your LinkedIn public data export ZIP into a fully
            structured personal website. Edit layout templates, add custom
            domains, and go live.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={heroItemVariants}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <button
              onClick={() => router.push("/onboarding")}
              className="h-11 px-7 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[13px] font-semibold rounded-full transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.06)] group"
            >
              Build Your Website
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => router.push("/editor")}
              className="h-11 px-7 bg-white/80 hover:bg-white text-black text-[13px] font-semibold rounded-full transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2 border border-[#E6E6E6] shadow-sm backdrop-blur-sm"
            >
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="translate-y-[0.5px]"
              >
                <path
                  d="M1 1.5 L8.5 6 L1 10.5 Z"
                  fill="black"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              Try Mock Data
            </button>
          </motion.div>
        </motion.div>

        {/* Right column: Interactive mockup preview in nested doppelrand */}
        <motion.div
          variants={heroItemVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 w-full flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-lg p-2 bg-[#F3F3F5]/60 ring-1 ring-black/5 border border-white rounded-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.05)]">
            <div className="overflow-hidden bg-[#FBFBFB] border border-[#E6E6E6]/60 rounded-[20px] shadow-inner">
              <HabitlineProductShowcase />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── How It Works Section (AIDA: Interest) ────────────────────────────────────

const HOW_IT_WORKS = [
  {
    icon: Upload,
    boldText: "Upload LinkedIn ZIP export",
    restText:
      "Parse your public profile export archive to instantly populate your career timeline and layout nodes.",
  },
  {
    icon: Cpu,
    boldText: "Customize styles & text",
    restText:
      "Adjust descriptions and templates (Bento, Minimal, Full Scroll) in real-time inside our visual wizard.",
  },
  {
    icon: Download,
    boldText: "Publish or export source",
    restText:
      "Go live instantly on a free subdomain or download your complete static source code files as a zip archive.",
  },
];

function HowItWorksSection({ onStartGen }: { onStartGen: () => void }) {
  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 bg-white overflow-hidden border-b border-[#E6E6E6]/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="flex flex-col max-w-2xl">
            <SectionLabel>Setup Flow</SectionLabel>
            <SectionHeading>
              Get your personal site online in under 60 seconds
            </SectionHeading>
          </div>
          <DarkButton
            onClick={onStartGen}
            className="self-start md:self-auto h-11 px-7 bg-[#0A705F] hover:bg-[#075043]"
          >
            Generate Page
          </DarkButton>
        </div>

        {/* 3-Column steps with Doppelrand layout elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
                key={i}
                className="flex flex-col gap-5 group"
              >
                {/* Doppelrand card container */}
                <div className="p-2 bg-[#F7F7F9] border border-[#E6E6E6]/60 rounded-[24px] shadow-sm transition-transform duration-300 ease-out hover:scale-[1.01]">
                  <div className="bg-white border border-[#E6E6E6] rounded-[18px] p-6 flex flex-col gap-4 shadow-sm min-h-[160px] justify-between">
                    <div className="w-10 h-10 rounded-full bg-[#E6FFE6] text-[#0A705F] flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[20px] font-bold text-gray-300 font-mono tracking-tight">
                      0{i + 1}
                    </span>
                  </div>
                </div>

                <div className="px-2">
                  <h3 className="text-[17px] font-bold text-black mb-1.5">
                    {item.boldText}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#171717]/60 font-inter">
                    {item.restText}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Templates Section (AIDA: Desire) ─────────────────────────────────────────

function TemplatesSection({
  onSelectTemplate,
}: {
  onSelectTemplate: (name: string) => void;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: dir === "next" ? 400 : -400,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="templates"
      className="py-24 md:py-32 bg-[#FBFBFB] overflow-hidden border-b border-[#E6E6E6]/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="flex flex-col max-w-2xl">
            <SectionLabel>Style Selection</SectionLabel>
            <SectionHeading>
              Choose a layout template designed to convert
            </SectionHeading>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => scrollCarousel("prev")}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-[#E6E6E6] bg-white text-[#171717] hover:text-[#0A705F] hover:bg-[#F3F3F5] active:scale-[0.93] transition-all duration-150"
              aria-label="Previous"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel("next")}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-[#E6E6E6] bg-white text-[#171717] hover:text-[#0A705F] hover:bg-[#F3F3F5] active:scale-[0.93] transition-all duration-150"
              aria-label="Next"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M4.65375 9.30754L7.75625 6.20504L4.65375 3.10254"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel containing templates with outer doppelrand wrappers */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 snap-x snap-mandatory"
        >
          {TEMPLATES_LARGE.map((t, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              key={i}
              className="flex-shrink-0 w-[290px] sm:w-[350px] lg:w-[410px] snap-start"
            >
              <div className="p-1.5 bg-white border border-[#E6E6E6]/60 rounded-[28px] shadow-sm relative group overflow-hidden">
                <div className="relative aspect-[4/3] rounded-[22px] overflow-hidden bg-[#FBFBFB] border border-[#E6E6E6]/60 shadow-inner">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover rounded-[22px] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  {/* Overlay inside padding */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* Title & Info */}
                  <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col gap-1 text-white z-10">
                    <p className="text-[18px] font-bold leading-tight font-plus-jakarta">
                      {t.name}
                    </p>
                    <p className="text-white/80 text-[12px] font-medium leading-snug font-inter">
                      {t.subtitle}
                    </p>
                  </div>

                  {/* Hover action overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[1.5px] z-20">
                    <button
                      onClick={() => onSelectTemplate(t.name)}
                      className="h-10 px-6 bg-white text-black text-[12px] font-bold rounded-full hover:bg-[#F3F3F5] active:scale-[0.95] transition-all duration-150 shadow-md flex items-center gap-1.5"
                    >
                      Use Template
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Career Showcase Section (AIDA: Interest/Desire) ──────────────────────────

const BUSINESS_TABS = ["Experience", "Projects", "Education", "Contact"];
const BUSINESS_CARDS = [
  "https://api.builder.io/api/v1/image/assets/TEMP/dd2d088a6043ca3ede653099742f96ac52246893?width=2560",
  "https://api.builder.io/api/v1/image/assets/TEMP/bd350a3668e75fb33844ff3cbe4a31706b2273df?width=2560",
  "https://api.builder.io/api/v1/image/assets/TEMP/f502cc59ba5f4d7f14360e66cb7e6447fb3a3c98?width=2560",
  "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=1200",
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
          behavior: "smooth",
        });
      }
    }
  };

  const scrollCarousel = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth;
    carouselRef.current.scrollBy({
      left: dir === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="showcase"
      className="py-24 md:py-32 bg-white border-b border-[#E6E6E6]/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionLabel>Structured layouts for real content</SectionLabel>
          <SectionHeading>Showcase Your Career Timeline</SectionHeading>
        </div>

        {/* Tabs with layout glide animation */}
        <div className="flex justify-center mt-2">
          <div className="flex items-center rounded-full bg-[#F3F3F5] p-1 border border-[#E6E6E6] relative">
            {BUSINESS_TABS.map((tab, i) => {
              const isActive = activeTab === i;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(i)}
                  className={`relative h-9 px-6 text-[13px] font-semibold rounded-full transition-colors duration-200 whitespace-nowrap z-10 ${isActive ? "text-[#075043]" : "text-black/60 hover:text-black"}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-business-tab"
                      className="absolute inset-0 bg-[#E6FFE6] border border-[#8DFFB3]/40 rounded-full -z-10 shadow-sm"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Card carousel inside double-bezel wrapper */}
        <div className="relative mt-4">
          <div className="p-2 bg-[#F3F3F5]/50 border border-white ring-1 ring-black/5 rounded-[28px] shadow-sm">
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide rounded-[22px] p-2 bg-white border border-[#E6E6E6]/60 shadow-inner snap-x snap-mandatory"
            >
              {BUSINESS_CARDS.map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-full max-w-[960px] mx-auto rounded-[18px] overflow-hidden shadow-sm transition-all duration-300 snap-center border border-[#E6E6E6]/60"
                >
                  <img
                    src={src}
                    alt={`Showcase ${BUSINESS_TABS[i]}`}
                    className="w-full h-auto object-cover rounded-[18px]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={() => scrollCarousel("prev")}
            className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#E6E6E6] text-black shadow-md hover:bg-[#F3F3F5] active:scale-[0.93] transition-all duration-150 hidden sm:flex z-10"
            aria-label="Previous Showcase"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => scrollCarousel("next")}
            className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#E6E6E6] text-black shadow-md hover:bg-[#F3F3F5] active:scale-[0.93] transition-all duration-150 hidden sm:flex z-10"
            aria-label="Next Showcase"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M4.65375 9.30754L7.75625 6.20504L4.65375 3.10254"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Features Section (AIDA: Desire) ──────────────────────────────────────────

const FEATURES = [
  {
    icon: Smartphone,
    img: "/feature (1).png",
    text: "Responsive Layouts",
    desc: "Every template is engineered to collapse gracefully onto tablet and mobile screens, maintaining sharp readability.",
  },
  {
    icon: FileCode,
    img: "/feature (2).png",
    text: "Clean Code Exports",
    desc: "Download static zip builds structure ready to host on GitHub Pages, Vercel, Netlify, or any traditional server.",
  },
];

function FeaturesSection({ onStartTrial }: { onStartTrial: () => void }) {
  return (
    <section
      id="features"
      className="py-24 md:py-32 bg-[#FBFBFB] border-b border-[#E6E6E6]/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="flex flex-col max-w-2xl">
            <SectionLabel>Visual Integrity</SectionLabel>
            <SectionHeading>
              Everything you need for a stunning portfolio
            </SectionHeading>
          </div>
          <DarkButton
            onClick={onStartTrial}
            className="self-start md:self-auto h-11 px-7 bg-[#0A705F] hover:bg-[#075043]"
          >
            Try Free
          </DarkButton>
        </div>

        {/* 2-Column features grid with nested bezels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                key={i}
                className="flex flex-col gap-5"
              >
                <div className="p-2 bg-white border border-[#E6E6E6]/60 rounded-[28px] shadow-sm overflow-hidden">
                  <div className="rounded-[22px] overflow-hidden border border-[#E6E6E6]/40 shadow-inner aspect-[16/10]">
                    <img
                      src={f.img}
                      alt={f.text}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>
                </div>

                <div className="px-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-black">
                    <Icon className="w-4 h-4 text-[#0A705F]" />
                    <h3 className="text-[17px] font-bold leading-tight">
                      {f.text}
                    </h3>
                  </div>
                  <p className="text-[#171717]/60 text-[14px] leading-relaxed font-inter">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
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
    <section id="faq" className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-16">
          <SectionLabel>FAQ</SectionLabel>
          <SectionHeading>Frequently Asked Questions</SectionHeading>
        </div>

        {/* FAQ items in soft cards */}
        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((question, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-[18px] border border-[#E6E6E6]/60 bg-[#FBFBFB] shadow-sm overflow-hidden font-plus-jakarta transition-all duration-200"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => toggle(i)}
                >
                  <span className="text-[#171717] text-[15px] sm:text-[16px] font-bold leading-snug">
                    {question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border transition-colors ${isOpen ? "bg-[#E6FFE6] text-[#0A705F] border-[#8DFFB3]/40" : "bg-white text-black border-[#E6E6E6]"}`}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
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
                      <div className="px-6 pb-6 text-[#171717]/65 text-[14px] leading-relaxed font-inter border-t border-[#E6E6E6]/30 pt-4">
                        {answers[i]}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Index() {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);
  const [brandName, setBrandName] = useState("Creative Portfolio");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setShowPreview(true);
      window.history.replaceState({}, "", "/");
    }
    const storedBrand = sessionStorage.getItem("webild_brand_name");
    if (storedBrand) setBrandName(storedBrand);

    try {
      const storedUser = sessionStorage.getItem("linkedpage_user");
    } catch {
      // ignore
    }
  }, []);

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

  return (
    <div className="min-h-screen font-inter bg-[#FBFBFB] text-black antialiased relative overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Floating Sidebar Toggle Trigger */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed left-5 top-28 z-40 w-10 h-10 rounded-full bg-white border border-[#E6E6E6] hover:bg-[#F7F7F7] active:scale-95 flex items-center justify-center shadow-md transition-all duration-200"
          title="Open Navigation Drawer"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Floating Overlay Sidebar Panel */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-45 bg-black/10 backdrop-blur-[1px]"
            />

            {/* Sidebar drawer container */}
            <motion.aside
              initial={{ opacity: 0, x: -60, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="fixed left-5 top-28 bottom-5 w-[260px] border border-[#E6E6E6] bg-white/95 backdrop-blur-md px-6 py-6 flex flex-col justify-between z-50 select-none rounded-[20px] shadow-2xl font-plus-jakarta"
            >
              {/* Top items */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">
                    Navigation
                  </span>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/5 text-[#171717]/60 hover:text-black transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* New Website Action button inside doppelrand */}
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    router.push("/onboarding");
                  }}
                  className="w-full h-10 bg-[#F3F3F5] hover:bg-[#EAEAEB] active:scale-[0.98] transition-all rounded-full flex items-center justify-center gap-2 text-[12px] font-bold text-black border border-[#E6E6E6]/60 shadow-sm"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-black"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M9 12h6M12 9v6" />
                  </svg>
                  New Website
                </button>

                {/* Navigation links list */}
                <div className="flex flex-col gap-1">
                  <button className="w-full h-9 px-4 rounded-full bg-[#E6FFE6] border border-[#8DFFB3]/40 flex items-center gap-3 text-[12px] font-bold text-[#075043] shadow-sm text-left">
                    <Home className="w-4 h-4 text-[#0A705F]" />
                    Home
                  </button>

                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/editor");
                    }}
                    className="w-full h-9 px-4 rounded-full hover:bg-black/5 flex items-center gap-3 text-[12px] font-bold text-black/70 hover:text-black transition-colors text-left"
                  >
                    <LayoutIcon className="w-4 h-4 text-black/60" />
                    Templates
                  </button>

                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/dashboard");
                    }}
                    className="w-full h-9 px-4 rounded-full hover:bg-black/5 flex items-center gap-3 text-[12px] font-bold text-black/70 hover:text-black transition-colors text-left"
                  >
                    <Folder className="w-4 h-4 text-black/60" />
                    All Websites
                  </button>
                </div>

                {/* Recents list */}
                <div className="flex flex-col gap-2 pt-3 border-t border-[#E6E6E6]/50">
                  <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest px-4">
                    Recent
                  </span>
                  <div
                    onClick={() => {
                      setIsSidebarOpen(false);
                      router.push("/dashboard");
                    }}
                    className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-[#E6FFE6]/30 cursor-pointer transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#E6FFE6] border border-[#8DFFB3]/30 flex items-center justify-center text-[10px] font-bold text-[#0A705F]">
                      {brandName.charAt(0).toLowerCase()}
                    </div>
                    <span className="text-[12px] font-semibold text-[#171717] truncate">
                      {brandName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom drawer navigation actions */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    router.push("/pricing");
                  }}
                  className="w-full h-9 px-4 rounded-full hover:bg-black/5 flex items-center gap-3 text-[12px] font-bold text-black/70 hover:text-black transition-colors text-left"
                >
                  <CreditCard className="w-4 h-4 text-black/60" />
                  Pricing
                </button>

                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    router.push("/docs");
                  }}
                  className="w-full h-9 px-4 rounded-full hover:bg-black/5 flex items-center gap-3 text-[12px] font-bold text-black/70 hover:text-black transition-colors text-left"
                >
                  <BookOpen className="w-4 h-4 text-black/60" />
                  Documentation
                </button>

                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    router.push("/settings");
                  }}
                  className="w-full h-9 px-4 rounded-full hover:bg-black/5 flex items-center gap-3 text-[12px] font-bold text-black/70 hover:text-black transition-colors text-left"
                >
                  <Settings className="w-4 h-4 text-black/60" />
                  Settings
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Full-Width Content Container */}
      <div className="relative z-10 w-full min-h-screen">
        <main className="w-full relative">
          <HeroSection />
          <HowItWorksSection onStartGen={() => router.push("/onboarding")} />
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
          <PreviewModal
            isOpen={showPreview}
            onClose={() => setShowPreview(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
