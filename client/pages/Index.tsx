import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ─── Small reusable pieces ───────────────────────────────────────────────────

function DarkButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button className={`inline-flex items-center justify-center h-10 px-6      rounded-lg   btn-dark text-white text-[12px] font-medium transition-all duration-150 active:scale-97 whitespace-nowrap hover:bg-[#3E3E45] ${className}`}>
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
  "How can I customize my Website?",
  "Can I connect my own domain or subdomain?",
  "Does LinkedPage host my Website?",
  "Can I edit or update my site after publishing?",
  "Can I export the code of my Website?",
];

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
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
      <div className="relative z-10 w-full max-w-[1536px] mx-auto flex flex-col items-center gap-6 px-6 sm:px-8 lg:px-20 text-center">
        {/* Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5   rounded-lg border border-[#E6E6E6] bg-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
          <span className="gradient-text-rainbow text-[13px] font-medium leading-[18px]">
            Create in under 60 seconds
          </span>
          <span className="flex items-center justify-center w-7 h-7   rounded-lg btn-dark-sm flex-shrink-0 active:scale-95 transition-all">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.98708 3.98709H9.6837V9.68372" stroke="white" strokeWidth="1.13917" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.98708 9.68372L9.6837 3.98709" stroke="white" strokeWidth="1.13917" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-black text-[38px] sm:text-[51px] leading-[1.1] font-medium tracking-tight max-w-4xl font-inter-tight">
          LinkedIn to personal Website
        </h1>

        {/* Prompt card */}
        <div className="w-full max-w-[1040px]      rounded-lg   glass-card p-4 sm:p-5 flex flex-col gap-5 mt-4">
          <div className="     rounded-lg   border border-[#E6E6E6] bg-white/20 p-5 flex flex-col gap-4  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
            {/* Textarea */}
            <textarea
              className="w-full bg-transparent text-[#171717] text-[16px] sm:text-[18px] leading-[27px] resize-none outline-none placeholder:text-[#171717]/40 min-h-[72px] font-inter-tight"
              defaultValue="https://www.linkedin.com/in/reidhoffman"
              placeholder="Paste your LinkedIn profile URL here..."
            />

            {/* Bottom actions */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-[#F3F3F3]">
              <div className="flex items-center gap-3">
                {/* Add button */}
                <button className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6] card-btn-shadow hover:bg-[#F7F7F7] active:scale-95 transition-all">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3.68124 8.83502H13.9887" stroke="black" strokeWidth="0.73625" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.83499 3.68127V13.9888" stroke="black" strokeWidth="0.73625" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Enhance prompt button */}
                <button className="h-10 px-5      rounded-lg   bg-[#F3F3F3] text-black text-[12px] font-medium hover:bg-[#EAEAEA] active:scale-97 transition-all whitespace-nowrap">
                  Enhance prompt
                </button>

                {/* Color palette button */}
                <button className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6] card-btn-shadow hover:bg-[#F7F7F7] active:scale-95 transition-all">
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
                <button className="flex items-center justify-center w-9 h-9   rounded-lg bg-white border border-[#E6E6E6] card-btn-shadow hover:bg-[#F7F7F7] active:scale-95 transition-all">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7.95499 12.5954V14.5837" stroke="black" strokeWidth="0.662917" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.5954 6.62915V7.95498C12.5954 9.1857 12.1065 10.366 11.2363 11.2363C10.366 12.1065 9.18571 12.5954 7.95499 12.5954C6.72428 12.5954 5.54397 12.1065 4.67372 11.2363C3.80347 10.366 3.31458 9.1857 3.31458 7.95498V6.62915" stroke="black" strokeWidth="0.662917" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.94375 3.31456C9.94375 2.2162 9.05335 1.32581 7.955 1.32581C6.85664 1.32581 5.96625 2.2162 5.96625 3.31456V7.95497C5.96625 9.05333 6.85664 9.94372 7.955 9.94372C9.05335 9.94372 9.94375 9.05333 9.94375 7.95497V3.31456Z" stroke="black" strokeWidth="0.662917" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Send button (Primary action) */}
                <button className="flex items-center justify-center w-9 h-9   rounded-lg bg-[#2A2A2F] text-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#3E3E45] active:scale-95 transition-all">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3.68127 8.83502L8.83502 3.68127L13.9888 8.83502" stroke="white" strokeWidth="0.73625" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.83502 13.9888V3.68127" stroke="white" strokeWidth="0.73625" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Templates Section ────────────────────────────────────────────────────────

function TemplatesSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === "next" ? 520 : -520, behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden border-t border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div className="flex flex-col">
            <SectionLabel>Browse our collection</SectionLabel>
            <SectionHeading>Start with a Template</SectionHeading>
          </div>
          <DarkButton className="self-start sm:self-auto">View All Templates</DarkButton>
        </div>

        {/* Template cards carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
          >
            {TEMPLATES_LARGE.map((t, i) => (
              <div key={i} className="flex-shrink-0 w-[300px] sm:w-[380px] lg:w-[495px] template-card group">
                <div className="relative aspect-square      rounded-lg   overflow-hidden bg-[#FBFBFB] border border-[#E6E6E6] p-[11px]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
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
                        <button className="h-10 px-5      rounded-lg   bg-[#2A2A2F] text-white text-[12px] font-medium hover:bg-[#3E3E45] active:scale-97 transition-all  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
                          Customize this look
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress + controls */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex-1 h-2   rounded-lg border border-[#E6E6E6] bg-[#FBFBFB]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden mr-8">
            <div className="h-full w-1/4   rounded-lg" style={{ background: "linear-gradient(90deg, #8DFFB3 0%, #E6FFE6 100%)" }} />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollCarousel("prev")}
              className="flex items-center justify-center w-8 h-8      rounded-lg   border border-[#E6E6E6] bg-white text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-95 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254" stroke="currentColor" strokeWidth="1.03417" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel("next")}
              className="flex items-center justify-center w-8 h-8      rounded-lg   border border-[#E6E6E6] bg-white text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-95 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M4.65375 9.30754L7.75625 6.20504L4.65375 3.10254" stroke="currentColor" strokeWidth="1.03417" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
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

function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F7F7F7] border-t border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>Get your page in under 60 seconds</SectionHeading>
          </div>
          <DarkButton className="self-start sm:self-auto">Generate Now</DarkButton>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map((item, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="     rounded-lg   border border-[#E6E6E6] bg-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden p-2">
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
            </div>
          ))}
        </div>
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
];

function BusinessSection() {
  const [activeTab, setActiveTab] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === "next" ? 600 : -600, behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionLabel>Beautiful structures for real content</SectionLabel>
          <SectionHeading>Showcase Your Career</SectionHeading>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-2">
          <div className="flex items-center      rounded-lg   bg-[#F3F3F3] p-1 border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
            {BUSINESS_TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`h-9 px-6 text-[14px] leading-[20px] rounded-[10px] transition-all duration-150 whitespace-nowrap font-inter-tight ${activeTab === i
                  ? "bg-[#E6FFE6] border border-[#8DFFB3]/40 text-[#1B5E20]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  font-semibold"
                  : "text-[#171717]/60 hover:text-black hover:bg-black/5"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Card carousel */}
        <div className="relative mt-4">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide      rounded-lg   border border-[#E6E6E6] p-2 bg-[#FBFBFB]"
          >
            {BUSINESS_CARDS.map((src, i) => (
              <div key={i} className="flex-shrink-0 w-full max-w-[900px] sm:max-w-[1100px]     rounded-lg  overflow-hidden  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
                <img src={src} alt={`Business card ${i + 1}`} className="w-full h-auto     rounded-lg  object-cover" />
              </div>
            ))}
          </div>
          {/* Arrows */}
          <button
            onClick={() => scrollCarousel("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10   rounded-lg bg-white border border-[#E6E6E6] text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-95 transition-all hidden sm:flex"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M7.75625 9.30754L4.65375 6.20504L7.75625 3.10254" stroke="currentColor" strokeWidth="1.03417" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scrollCarousel("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10   rounded-lg bg-white border border-[#E6E6E6] text-black  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  hover:bg-[#F3F3F3] active:scale-95 transition-all hidden sm:flex"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M4.65375 9.30754L7.75625 6.20504L4.65375 3.10254" stroke="currentColor" strokeWidth="1.03417" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Domain Section ───────────────────────────────────────────────────────────

function DomainSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F7F7F7] border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col gap-2">
            <SectionLabel>Instant publishing</SectionLabel>
            <h2 className="text-black text-[28px] sm:text-[38px] leading-[46px] font-normal font-inter-tight">
              Claim Your Free Subdomain or Export ZIP
            </h2>
          </div>

          {/* Search box */}
          <div className="w-full max-w-[800px] relative mt-2">
            <div className="absolute -inset-0.5 opacity-15 blur-[4px]      rounded-lg  " style={{ background: "linear-gradient(92deg, #0894FF 0%, #C959DD 34%, #FF2E54 68%, #FF9004 100%)" }} />
            <div className="relative p-1      rounded-lg   overflow-hidden bg-white border border-[#E6E6E6]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
              <div className="flex items-center justify-between px-5 py-4 rounded-[11px] bg-white">
                <div className="flex items-center gap-3">
                  <svg width="16" height="19" viewBox="0 0 16 19" fill="none">
                    <path d="M13.2211 14.7838L10.4889 12.0515" stroke="black" strokeWidth="1.25917" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.92514 13.5241C9.7067 13.5241 11.9616 11.2692 11.9616 8.48764C11.9616 5.70607 9.7067 3.45117 6.92514 3.45117C4.14357 3.45117 1.88867 5.70607 1.88867 8.48764C1.88867 11.2692 4.14357 13.5241 6.92514 13.5241Z" stroke="black" strokeWidth="1.25917" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-black text-[16px] sm:text-[17px] font-medium leading-[27px] font-inter-tight">reidhoffman.linkedpage.me</span>
                </div>
                <button className="flex items-center justify-center w-8 h-8   rounded-lg btn-dark-sm active:scale-95 transition-all text-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <path d="M5.31708 5.31714H12.9129V12.913" stroke="currentColor" strokeWidth="0.949479" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.31708 12.913L12.9129 5.31714" stroke="currentColor" strokeWidth="0.949479" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <p className="text-[#171717]/60 text-[13px] leading-[19px] underline cursor-pointer hover:text-black font-inter-tight transition-colors">
            Need local files? Download clean code zip
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Brand Section ────────────────────────────────────────────────────────────

const BRAND_CARDS = [
  {
    img: "https://api.builder.io/api/v1/image/assets/TEMP/9f3a1f22cc257cf4f0da1f8d5b8c463fc3e20c54?width=1498",
    boldText: "Notion meets Linktree",
    restText: " aesthetics that combine clean bento grid designs with rich professional content.",
  },
  {
    img: "https://api.builder.io/api/v1/image/assets/TEMP/8ef521fbb820f1b4a44b8f4b078009658f2a6baf?width=1498",
    boldText: "No dashboards or bloat",
    restText: " — edit your content directly on the page and get a beautiful result in under 60 seconds.",
  },
];

function BrandSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <SectionLabel>Make it uniquely yours</SectionLabel>
            <SectionHeading>Designed for Professionals</SectionHeading>
          </div>
          <DarkButton className="self-start sm:self-auto">Create Page</DarkButton>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BRAND_CARDS.map((card, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="     rounded-lg   border border-[#E6E6E6] bg-[#FBFBFB]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden p-2">
                <img
                  src={card.img}
                  alt={card.boldText}
                  className="w-full     rounded-lg  object-cover aspect-[129/116]"
                />
              </div>
              <p className="text-[16px] leading-[24px] text-[#171717]/60 font-inter-tight">
                <span className="text-[#171717] font-medium block mb-1 text-[18px] leading-[24px]">{card.boldText}</span>
                {card.restText}
              </p>
            </div>
          ))}
        </div>
      </div>
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

function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F7F7F7] border-b border-[#E6E6E6]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <SectionLabel>Clean & Modern Aesthetics</SectionLabel>
            <SectionHeading>A Page with Real Content</SectionHeading>
          </div>
          <DarkButton className="self-start sm:self-auto">Try It Free</DarkButton>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="     rounded-lg   border border-[#E6E6E6] bg-white p-2 overflow-hidden  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] ">
                <img
                  src={f.img}
                  alt={f.text}
                  className="w-full     rounded-lg  object-cover aspect-[13/8]"
                />
              </div>
              <p className="text-[#171717] text-[16px] sm:text-[18px] leading-[27px] font-normal font-inter-tight">{f.text}</p>
            </div>
          ))}
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
    0: "LinkedPage is a web tool that converts a LinkedIn profile URL into a beautiful personal Website. You paste your LinkedIn link, the platform scrapes your profile data, and instantly renders a customizable page.",
    1: "No design or coding experience is required! LinkedPage automatically extracts your career history, skills, and details, then formats them into a polished personal website.",
    2: "You can edit text and images inline, swap and rearrange layout elements, and switch templates (minimal card, bento grid, full-page scroll, or dark mode) directly on the screen.",
    3: "Yes! You can connect your own custom domain, or publish it instantly on a free subdomain (like yourname.linkedpage.me).",
    4: "Yes, every site built with LinkedPage includes fast, free built-in hosting, so your professional site is online in seconds.",
    5: "Absolutely. You can update your site at any time through our inline visual editor. Changes go live instantly.",
    6: "Yes, you can export the generated code as a ZIP file containing clean, static HTML, CSS, and JS to host on GitHub Pages, Vercel, or any provider of your choice.",
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-12">
          <SectionLabel>Frequently Asked Questions</SectionLabel>
          <SectionHeading>Still have questions about LinkedPage?</SectionHeading>
        </div>

        {/* FAQ items */}
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {FAQ_ITEMS.map((question, i) => (
            <div key={i} className="     rounded-lg   border border-[#E6E6E6] bg-[#FBFBFB]  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  overflow-hidden transition-all duration-150">
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => toggle(i)}
              >
                <span className="text-[#171717] text-[16px] sm:text-[18px] leading-[26px] font-medium font-inter-tight pr-4">
                  {question}
                </span>
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-[10px] btn-dark-sm text-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]  active:scale-95 transition-all">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M2.94586 7.5H11.1945" stroke="currentColor" strokeWidth="1.17833" strokeLinecap="round" strokeLinejoin="round" />
                    {openIdx !== i && (
                      <path d="M7.07001 3.375V11.625" stroke="currentColor" strokeWidth="1.17833" strokeLinecap="round" strokeLinejoin="round" />
                    )}
                  </svg>
                </span>
              </button>
              {openIdx === i && (
                <div className="px-6 pb-6 text-[#171717]/60 text-[15px] sm:text-[16px] leading-[24px] font-inter-tight border-t border-[#F3F3F3]/80 pt-4">
                  {answers[i]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Index() {
  return (
    <div className="min-h-screen font-inter bg-white text-black antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <TemplatesSection />
        <HowItWorksSection />
        <BusinessSection />
        <FeaturesSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
