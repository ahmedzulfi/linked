"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const handleNavClick = (sectionName: string) => {
    setMobileOpen(false);
    toast(`Scrolling to ${sectionName}...`);
  };

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
    { label: "Templates", href: "#templates" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl font-plus-jakarta">
      {/* Navbar Container: Glass Pill */}
      <div className="flex items-center justify-between h-14 pl-5 pr-3 bg-white/70 backdrop-blur-xl rounded-full border border-white/40 ring-1 ring-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 flex items-center hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
        >
          <img
            src="/logo.png"
            alt="LinkedPage"
            className="h-[32px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => handleNavClick(link.label)}
              className="text-[#171717]/75 text-[13px] font-semibold hover:text-[#0A705F] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side CTA & Menu Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Auth Actions */}
          {isPending ? (
            <div className="hidden sm:flex h-9 px-4 items-center justify-center rounded-full bg-[#F3F3F3] text-black/50 text-[12px] font-medium animate-pulse w-24" />
          ) : session ? (
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center justify-center h-9 px-5 bg-[#2A2A2F] text-white text-[12px] font-semibold rounded-full hover:bg-[#3E3E45] transition-all duration-200 active:scale-[0.97]"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center h-9 px-4 text-[#171717] text-[12px] font-semibold hover:text-[#0A705F] transition-all duration-200"
              >
                Log in
              </Link>
              <Link
                href="/editor"
                className="inline-flex items-center justify-center h-9 pl-4 pr-1.5 bg-[#0A705F] text-white text-[12px] font-semibold rounded-full hover:bg-[#075043] transition-all duration-200 active:scale-[0.97] group"
              >
                Get started
                <span className="ml-2 w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </>
          )}

          {/* Mobile hamburger menu button */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-[#F3F3F5] active:scale-[0.93] transition-transform duration-100 ease-out"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-4 h-4 flex flex-col justify-center items-center relative">
              <motion.span
                animate={{
                  rotate: mobileOpen ? 45 : 0,
                  y: mobileOpen ? 0 : -4,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="w-4 h-0.5 bg-black rounded-full absolute"
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                className="w-4 h-0.5 bg-black rounded-full absolute"
              />
              <motion.span
                animate={{
                  rotate: mobileOpen ? -45 : 0,
                  y: mobileOpen ? 0 : 4,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="w-4 h-0.5 bg-black rounded-full absolute"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ originX: 0.9, originY: 0 }}
            className="mt-3.5 mx-2 p-5 rounded-[20px] border border-white/40 ring-1 ring-black/5 bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col gap-3 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 + 0.05 }}
                key={link.label}
                href={link.href}
                className="text-[#171717]/85 text-[14px] font-semibold py-2 hover:text-[#0A705F] transition-colors"
                onClick={() => handleNavClick(link.label)}
              >
                {link.label}
              </motion.a>
            ))}

            <div className="flex flex-col gap-2 pt-3 border-t border-[#E6E6E6] mt-1">
              {isPending ? (
                <div className="h-10 rounded-full bg-[#F3F3F3] animate-pulse" />
              ) : session ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 rounded-full bg-[#2A2A2F] text-white text-[12px] font-semibold items-center justify-center active:scale-[0.98] transition-transform duration-100"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex h-10 rounded-full bg-[#F3F3F5] text-black text-[12px] font-semibold items-center justify-center active:scale-[0.98] transition-transform duration-100"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/editor"
                    onClick={() => setMobileOpen(false)}
                    className="flex h-10 rounded-full bg-[#0A705F] text-white text-[12px] font-semibold items-center justify-center active:scale-[0.98] transition-transform duration-100"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
