"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const productLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "/pricing" },
];

const technologyLinks = [
  { label: "Scraping Engine", href: "#" },
  { label: "Bento Generator", href: "#" },
  { label: "ZIP Export", href: "#" },
];

const companyLinks = [
  { label: "Our Philosophy", href: "#" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Security Info", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address!");
      return;
    }
    toast.success(`Subscribed ${email} to our newsletter successfully!`);
    setEmail("");
  };

  const handleLinkClick = (label: string, e: React.MouseEvent) => {
    if (e.currentTarget.getAttribute("href") === "#") {
      e.preventDefault();
      toast.info(`${label} portal coming soon!`);
    } else {
      toast(`Navigating to ${label}...`);
    }
  };

  return (
    <footer
      className="w-full p-6 sm:p-10 lg:p-14 bg-cover bg-center bg-no-repeat select-none pointer-events-none"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="w-full max-w-[1536px] mx-auto bg-[#FBFBFB] rounded-[32px] border border-[#E6E6E6] shadow-[0_8px_30px_rgba(0,0,0,0.02)] px-6 sm:px-12 lg:px-20 py-16 text-black font-plus-jakarta pointer-events-auto">
        <div className="flex flex-col gap-12">
          {/* Top Section: Giant centered logo */}
          <div className="w-full flex justify-center py-4 border-b border-[#E6E6E6]/60 pb-12">
            <img
              src="/logo.png"
              alt="LinkedPage Logo"
              className="h-[60px] sm:h-[80px] w-auto object-contain select-none pointer-events-none hover:scale-[1.01] transition-transform duration-300"
            />
          </div>

          {/* Details Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pt-4 pb-12 border-b border-[#E6E6E6]/60">
            {/* Left Column: Newsletter & Social */}
            <div className="md:col-span-4 flex flex-col justify-between gap-10 md:pr-12 md:border-r border-[#E6E6E6]/60">
              {/* Newsletter form */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Newsletter
                </span>
                <form
                  onSubmit={handleSubscribe}
                  className="relative w-full max-w-sm mt-1"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-white text-[#171717] border border-[#E6E6E6] rounded-full h-[48px] px-5 pr-12 text-sm placeholder-[#171717]/40 outline-none focus:border-[#0A705F] focus:ring-1 focus:ring-[#0A705F] transition-all duration-200 shadow-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0A705F] active:scale-[0.90] transition-all duration-120 ease-out"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={18} />
                  </button>
                </form>
                <p className="font-mono text-[9px] text-gray-400 tracking-tight leading-normal uppercase">
                  I accept the terms and conditions
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success("Opening Instagram profile...");
                  }}
                  className="w-8 h-8 rounded-full border border-[#E6E6E6] bg-white flex items-center justify-center text-gray-500 hover:text-[#0A705F] hover:border-[#0A705F]/30 hover:shadow-sm active:scale-[0.93] transition-all duration-200"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success("Opening LinkedIn showcase...");
                  }}
                  className="w-8 h-8 rounded-full border border-[#E6E6E6] bg-white flex items-center justify-center text-gray-500 hover:text-[#0A705F] hover:border-[#0A705F]/30 hover:shadow-sm active:scale-[0.93] transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success("Opening X (Twitter) profile...");
                  }}
                  className="w-8 h-8 rounded-full border border-[#E6E6E6] bg-white flex items-center justify-center text-gray-500 hover:text-[#0A705F] hover:border-[#0A705F]/30 hover:shadow-sm active:scale-[0.93] transition-all duration-200"
                  aria-label="Twitter"
                >
                  <Twitter size={16} />
                </a>
              </div>
            </div>

            {/* Right Columns: Nav Links */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 md:pl-12">
              {/* Product */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  Product
                </span>
                <div className="flex flex-col gap-3">
                  {productLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-[#0A705F] text-[13px] transition-colors duration-200 font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Technology */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  Technology
                </span>
                <div className="flex flex-col gap-3">
                  {technologyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-[#0A705F] text-[13px] transition-colors duration-200 font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  Brand
                </span>
                <div className="flex flex-col gap-3">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-[#0A705F] text-[13px] transition-colors duration-200 font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  Support
                </span>
                <div className="flex flex-col gap-3">
                  {legalLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-[#0A705F] text-[13px] transition-colors duration-200 font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono uppercase tracking-wider">
            <span>Copyright LinkedPage 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
