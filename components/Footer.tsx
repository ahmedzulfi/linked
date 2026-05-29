"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const productLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "#" },
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
      <div className="w-full max-w-[1536px] mx-auto bg-[#FBFBFB] rounded-[18px] border border-[#E6E6E6]  shadow-[0_6px_10px_-6px_#00000016]  px-6 sm:px-12 lg:px-20 py-16 text-black font-inter pointer-events-auto">
        <div className="flex flex-col gap-12">

          {/* Top Section: Giant centered logo */}
          <div className="w-full flex justify-center py-4 border-b border-[#E6E6E6] pb-12">
            <img
              src="/logo.png"
              alt="LinkedPage Logo"
              className="h-[80px] sm:h-[120px] md:h-[140px] w-auto object-contain select-none pointer-events-none"
            />
          </div>

          {/* Details Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pt-4 pb-12 border-b border-[#E6E6E6]">

            {/* Left Column: Newsletter & Social */}
            <div className="md:col-span-4 flex flex-col justify-between gap-10 md:pr-12 md:border-r border-[#E6E6E6]">
              {/* Newsletter form */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-500 font-semibold font-inter-tight">
                  Newsletter
                </span>
                <form onSubmit={handleSubscribe} className="relative w-full max-w-sm mt-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-white text-[#171717] border border-[#E6E6E6] rounded-[13px] h-[48px] px-4 pr-12 text-sm placeholder-[#171717]/40 outline-none focus:border-[#8DB8FF] transition-[border-color] duration-200 font-inter-tight  shadow-[0_6px_10px_-6px_#00000016] "
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#171717] hover:text-black active:scale-[0.95] transition-transform duration-120 ease-out"
                  >
                    <ArrowRight size={16} />
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
                  onClick={(e) => { e.preventDefault(); toast.success("Opening Instagram profile..."); }}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); toast.success("Opening LinkedIn showcase..."); }}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); toast.success("Opening X (Twitter) profile..."); }}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Right Columns: Nav Links */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 md:pl-12">

              {/* Product */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold font-inter-tight">
                  Product
                </span>
                <div className="flex flex-col gap-3">
                  {productLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-black text-sm transition-colors duration-200 font-inter-tight"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Technology */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold font-inter-tight">
                  Technology
                </span>
                <div className="flex flex-col gap-3">
                  {technologyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-black text-sm transition-colors duration-200 font-inter-tight"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold font-inter-tight">
                  Brand
                </span>
                <div className="flex flex-col gap-3">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-black text-sm transition-colors duration-200 font-inter-tight"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold font-inter-tight">
                  Support
                </span>
                <div className="flex flex-col gap-3">
                  {legalLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.label, e)}
                      className="text-[#171717]/70 hover:text-black text-sm transition-colors duration-200 font-inter-tight"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between text-xs text-gray-400 font-mono uppercase tracking-wider font-inter-tight">
            <span>Copyright LinkedPage 2026</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
