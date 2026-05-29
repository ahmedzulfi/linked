"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (sectionName: string) => {
    setMobileOpen(false);
    toast(`Scrolling to ${sectionName}...`);
  };

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[1536px] px-6 sm:px-0 font-inter">
      <div className="flex items-center justify-between h-14 px-7 py-8 bg-white/70 backdrop-blur-md rounded-[13px] border border-[#E6E6E6] shadow-sm">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <img
            src="/logo.png"
            alt="LinkedPage"
            className="h-[40px] sm:h-[44px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="#features"
            onClick={() => handleNavClick("Features")}
            className="text-[#171717]/85 text-[13px] font-medium leading-[18px] hover:text-black transition-colors font-inter-tight"
          >
            Features
          </a>
          <a
            href="#faq"
            onClick={() => handleNavClick("FAQ")}
            className="text-[#171717]/85 text-[13px] font-medium leading-[18px] hover:text-black transition-colors font-inter-tight"
          >
            FAQ
          </a>
          <a
            href="#templates"
            onClick={() => handleNavClick("Templates")}
            className="text-[#171717]/85 text-[13px] font-medium leading-[18px] hover:text-black transition-colors font-inter-tight"
          >
            Templates
          </a>
          <button
            onClick={() => toast.info("Pricing plans coming soon!")}
            className="text-[#171717]/85 text-[13px] font-medium leading-[18px] hover:text-black transition-colors font-inter-tight"
          >
            Pricing
          </button>

        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Social Icons - desktop only */}
          <div className="hidden md:flex items-center gap-2">
            {/* Discord */}
            <button
              onClick={() => toast.success("Redirecting to Discord community...")}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#E6E6E6] shadow-sm text-black hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#discord-clip)">
                  <path d="M13.04 1.19272C12.1164 0.770902 11.12 0.450902 10.08 0.276357C10.0606 0.271508 10.0436 0.278781 10.0291 0.298175C9.89819 0.52363 9.76001 0.821811 9.65819 1.05454C8.53819 0.884842 7.43031 0.884842 6.33456 1.05454C6.23274 0.814539 6.08728 0.52363 5.96365 0.298175C5.95395 0.28363 5.93698 0.276357 5.91274 0.276357C4.87031 0.460599 3.88365 0.766054 2.95274 1.19272C2.94789 1.19272 2.94062 1.19757 2.93092 1.20727C1.04728 4.02181 0.530919 6.7709 0.785465 9.48363C0.785465 9.49818 0.792738 9.5103 0.807283 9.51999C2.05092 10.4364 3.25819 10.9891 4.43637 11.3527C4.45577 11.3527 4.47274 11.3479 4.48728 11.3382C4.7685 10.9551 5.01577 10.5527 5.2291 10.1309C5.2388 10.1067 5.23153 10.0848 5.20728 10.0654C4.81456 9.9103 4.43637 9.7309 4.07274 9.52727C4.04365 9.51272 4.04365 9.46908 4.07274 9.44727C4.15031 9.38908 4.22546 9.3309 4.29819 9.27272C4.31274 9.25818 4.32728 9.25818 4.34183 9.27272C6.72001 10.3564 9.30183 10.3564 11.6509 9.27272C11.6703 9.26787 11.6873 9.26787 11.7018 9.27272C11.7746 9.33575 11.8497 9.39393 11.9273 9.44727C11.9515 9.47636 11.9515 9.50302 11.9273 9.52727C11.5636 9.7406 11.1855 9.91999 10.7927 10.0654C10.7636 10.0751 10.7564 10.097 10.7709 10.1309C10.9891 10.5527 11.2364 10.9551 11.5127 11.3382C11.5273 11.3527 11.5443 11.3576 11.5636 11.3527C12.7491 10.9818 13.9564 10.4291 15.2 9.51999C15.2097 9.5103 15.217 9.49818 15.2218 9.48363C15.5273 6.34908 14.7127 3.62181 13.0691 1.20727C13.0691 1.19757 13.0618 1.19272 13.0473 1.19272H13.04ZM5.58546 7.83999C4.86546 7.83999 4.27637 7.18545 4.27637 6.3709C4.27637 5.55636 4.85819 4.90181 5.58546 4.90181C6.31274 4.90181 6.90183 5.56363 6.89456 6.3709C6.89456 7.17818 6.31274 7.83999 5.58546 7.83999ZM10.4218 7.83999C9.70183 7.83999 9.11274 7.18545 9.11274 6.3709C9.11274 5.55636 9.69456 4.90181 10.4218 4.90181C11.1491 4.90181 11.7382 5.56363 11.7309 6.3709C11.7309 7.17818 11.1564 7.83999 10.4218 7.83999Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="discord-clip">
                    <rect width="16" height="11.6364" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            {/* X (Twitter) */}
            <button
              onClick={() => toast.success("Redirecting to Twitter feed...")}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#E6E6E6] shadow-sm text-black hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#x-clip)">
                  <path d="M11.0133 0H13.16L8.44667 5.36667L13.9533 12.6467H9.632L6.24867 8.22267L2.37534 12.6467H0.228669L5.222 6.90667L-0.0513306 0H4.37734L7.434 4.04133L11.0133 0ZM10.262 11.3867H11.452L3.752 1.21333H2.47334L10.262 11.3867Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="x-clip">
                    <rect width="14" height="12.6467" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            {/* Instagram */}
            <button
              onClick={() => toast.success("Redirecting to Instagram profile...")}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#E6E6E6] shadow-sm text-black hover:bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#ig-clip)">
                  <path d="M12.75 1.5H5.25C3.17893 1.5 1.5 3.17893 1.5 5.25V12.75C1.5 14.8211 3.17893 16.5 5.25 16.5H12.75C14.8211 16.5 16.5 14.8211 16.5 12.75V5.25C16.5 3.17893 14.8211 1.5 12.75 1.5Z" stroke="black" strokeWidth="1.6875" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8.5275C12.0926 9.15168 11.986 9.78916 11.6953 10.3493C11.4047 10.9094 10.9449 11.3636 10.3812 11.6473C9.8176 11.9309 9.17886 12.0297 8.55586 11.9294C7.93287 11.8292 7.35734 11.5351 6.91115 11.0889C6.46496 10.6427 6.17082 10.0672 6.07058 9.44416C5.97033 8.82116 6.06907 8.18242 6.35277 7.61878C6.63647 7.05514 7.09066 6.5953 7.65076 6.30468C8.21086 6.01405 8.84834 5.90744 9.47252 6C10.1092 6.09441 10.6987 6.39109 11.1538 6.84623C11.6089 7.30136 11.9056 7.89081 12 8.5275Z" stroke="black" strokeWidth="1.6875" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.125 4.875H13.1325" stroke="black" strokeWidth="1.6875" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="ig-clip">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>

          {/* Log in (Secondary style) */}
          <button
            onClick={() => toast.info("Authorization popup coming soon!")}
            className="hidden sm:flex h-10 px-5 items-center justify-center rounded-[13px] bg-[#F3F3F3] text-black text-[12px] font-medium hover:bg-[#EAEAEA] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out whitespace-nowrap font-inter-tight"
          >
            Log in
          </button>

          {/* Get started (Primary style) */}
          <Link
            href="/onboarding"
            className="flex h-10 px-5 items-center justify-center rounded-[13px] btn-dark text-white text-[12px] font-medium whitespace-nowrap font-inter-tight"
          >
            Get started
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-[13px] bg-[#F3F3F3] active:scale-[0.95] transition-[transform,background-color] duration-150 ease-out ml-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              {mobileOpen ? (
                <>
                  <path d="M4 4L14 14" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14 4L4 14" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <path d="M3 5H15" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 9H15" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 13H15" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu with origin-aware animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ originX: 0.9, originY: 0 }}
            className="mt-2 rounded-[13px] border border-[#E6E6E6] bg-white/95 backdrop-blur-md shadow-md p-4 flex flex-col gap-3 lg:hidden will-change-[transform,opacity]"
          >
            <a
              href="#features"
              className="text-[#171717]/85 text-[14px] py-2 hover:text-black transition-colors font-inter-tight font-medium"
              onClick={() => handleNavClick("Features")}
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-[#171717]/85 text-[14px] py-2 hover:text-black transition-colors font-inter-tight font-medium"
              onClick={() => handleNavClick("FAQ")}
            >
              FAQ
            </a>
            <a
              href="#templates"
              className="text-[#171717]/85 text-[14px] py-2 hover:text-black transition-colors font-inter-tight font-medium"
              onClick={() => handleNavClick("Templates")}
            >
              Templates
            </a>
            <button
              className="text-[#171717]/85 text-[14px] py-2 hover:text-black transition-colors font-inter-tight font-medium text-left"
              onClick={() => { setMobileOpen(false); toast.info("Pricing plans coming soon!"); }}
            >
              Pricing
            </button>

            <div className="flex items-center gap-2 pt-2 border-t border-[#E6E6E6]">
              <button
                onClick={() => { setMobileOpen(false); toast.info("Authorization popup coming soon!"); }}
                className="flex-1 h-10 rounded-[13px] bg-[#F3F3F3] text-black text-[12px] font-medium hover:bg-[#EAEAEA] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out"
              >
                Log in
              </button>
              <Link
                href="/onboarding"
                onClick={() => setMobileOpen(false)}
                className="flex-1 h-10 rounded-[13px] btn-dark text-white text-[12px] font-medium font-inter-tight flex items-center justify-center"
              >
                Get started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
