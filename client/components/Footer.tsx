import { Link } from "react-router-dom";

const navLinks = [
  { label: "How It Works", to: "/" },
  { label: "Features", to: "/" },
  { label: "FAQ", to: "/" },
  { label: "Pricing", to: "/" },
];

const socialLinks = [
  { label: "X (Twitter)", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Discord", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Support", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full px-4 sm:px-8 pb-8 bg-[#000812]">
      <div className="relative rounded-[24px] border border-white/5 bg-[#000d1a]/40 overflow-hidden px-6 sm:px-12 lg:px-20 py-16">
        {/* Soft glowing ambient spots */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1536px] mx-auto flex flex-col gap-16 relative z-10">
          
          {/* Top Section: Bento-style CTA Panel */}
          <div className="relative rounded-[20px] bg-white/[0.01] border border-white/5 p-8 sm:p-10 lg:p-12 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-lime-500/10 rounded-full blur-[90px] pointer-events-none" />
            
            <div className="flex flex-col gap-3 max-w-xl text-center lg:text-left z-10">
              <span className="text-lime-400 font-semibold tracking-wider text-xs uppercase">Next Generation Portfolios</span>
              <h2 className="text-white text-3xl sm:text-4xl font-light tracking-tight leading-[1.15]">
                Ready to stand out? <br />
                <span className="font-semibold text-lime-400">Convert your LinkedIn now.</span>
              </h2>
              <p className="text-white/60 text-sm sm:text-base font-normal mt-1 leading-[24px]">
                Paste your profile link and instantly preview multiple clean, bento-style templates. No credit card required.
              </p>
            </div>

            {/* Input Box */}
            <div className="w-full max-w-md flex flex-col sm:flex-row gap-3 z-10">
              <input
                type="text"
                placeholder="linkedin.com/in/username"
                className="flex-1 h-12 px-5 rounded-[13px] border border-white/10 bg-white/5 text-white placeholder:text-white/30 text-sm outline-none focus:border-lime-500/50 focus:bg-white/[0.08] transition-all"
              />
              <button className="h-12 px-6 rounded-[13px] bg-lime-500 hover:bg-lime-400 text-white font-medium text-sm transition-all shadow-[0_4px_20px_rgba(132,204,22,0.25)] hover:shadow-[0_4px_25px_rgba(132,204,22,0.4)] flex items-center justify-center gap-2 whitespace-nowrap active:scale-95">
                Generate Page
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.125 7.5H11.875" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.125 3.75L11.875 7.5L8.125 11.25" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Middle Section: Brand and Nav links */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pt-8 pb-12 border-b border-white/5">
            {/* Brand column */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <img
                src="/logo.png"
                alt="LinkedPage"
                className="h-12 w-auto object-contain brightness-0 invert self-start"
              />
              <p className="text-white/60 text-sm sm:text-base leading-[26px] max-w-sm">
                Notion meets Linktree. Built for professionals who want clean, zero-bloat portfolios in under 60 seconds.
              </p>
              {/* System status indicator */}
              <div className="flex items-center gap-2.5 text-xs text-white/40">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
                </span>
                <span>All Systems Operational</span>
              </div>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {/* Product */}
              <div className="flex flex-col gap-4">
                <span className="text-white font-semibold text-xs tracking-wider uppercase opacity-40">Product</span>
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="text-white/60 hover:text-lime-400 hover:translate-x-1.5 transition-all duration-300 text-[15px] font-normal inline-flex items-center"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Legal */}
              <div className="flex flex-col gap-4">
                <span className="text-white font-semibold text-xs tracking-wider uppercase opacity-40">Legal</span>
                <div className="flex flex-col gap-3">
                  {legalLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-white/60 hover:text-lime-400 hover:translate-x-1.5 transition-all duration-300 text-[15px] font-normal inline-flex items-center"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Social (Pills) */}
              <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
                <span className="text-white font-semibold text-xs tracking-wider uppercase opacity-40">Connect</span>
                <div className="flex flex-wrap sm:flex-col gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="px-4 py-2 rounded-[10px] border border-white/5 bg-white/[0.02] text-white/70 hover:text-white hover:bg-lime-50 hover:border-lime-400 transition-all duration-300 text-[14px] font-medium flex items-center justify-between group"
                    >
                      <span>{link.label}</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                        <path d="M3 9L9 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.5 3H9V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Giant typography and copyright */}
          <div className="relative pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 z-10">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} LinkedPage. All rights reserved.
            </p>
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 px-4 py-2 rounded-[13px] bg-white/[0.03] border border-white/5 hover:border-lime-500/30 text-white/60 hover:text-lime-400 text-sm font-medium transition-all group"
            >
              <span>Back to Top</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:-translate-y-0.5 transition-transform">
                <path d="M6 9.5V2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.5 6L6 2.5L9.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Giant semi-transparent background watermark */}
          <div className="w-full text-center select-none overflow-hidden mt-4 opacity-[0.02] pointer-events-none">
            <h3 className="text-[12vw] font-black tracking-tighter text-white uppercase leading-none pointer-events-none">
              LINKEDPAGE
            </h3>
          </div>

        </div>
      </div>
    </footer>
  );
}
