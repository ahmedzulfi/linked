import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";

const productLinks = [
  { label: "How It Works", to: "/" },
  { label: "Features", to: "/" },
  { label: "Templates", to: "/" },
  { label: "Pricing", to: "/" },
];

const technologyLinks = [
  { label: "Scraping Engine", to: "/" },
  { label: "Bento Generator", to: "/" },
  { label: "ZIP Export", to: "/" },
  { label: "API Docs", to: "/" },
];

const companyLinks = [
  { label: "Our Philosophy", to: "/" },
  { label: "Support Docs", to: "/" },
  { label: "FAQ", to: "/" },
  { label: "Contact Us", to: "/" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/" },
  { label: "Terms of Service", to: "/" },
  { label: "Cookie Policy", to: "/" },
  { label: "Security Info", to: "/" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#FBFBFB] border-t border-gray-200 px-6 sm:px-12 lg:px-20 py-16 text-black font-inter">
      <div className="max-w-[1536px] mx-auto flex flex-col gap-12">
        
        {/* Top Section: Giant centered logo */}
        <div className="w-full flex justify-center py-4 border-b border-gray-200 pb-12">
          <img
            src="/logo.png"
            alt="LinkedPage Logo"
            className="h-[100px] sm:h-[140px] md:h-[160px] w-auto object-contain select-none pointer-events-none"
          />
        </div>

        {/* Details Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pt-4 pb-12 border-b border-gray-200">
          
          {/* Left Column: Newsletter & Social */}
          <div className="md:col-span-4 flex flex-col justify-between gap-10 md:pr-12 md:border-r border-gray-200">
            {/* Newsletter form */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-wider text-gray-500 font-semibold">
                Newsletter
              </span>
              <div className="relative w-full max-w-sm mt-2">
                <input
                  type="email"
                  placeholder="monemail@mail.com"
                  className="w-full bg-transparent border-b border-gray-300 py-2.5 pr-8 text-sm placeholder-gray-400 outline-none focus:border-black transition-colors"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>
              <p className="font-mono text-[9px] text-gray-400 tracking-tight leading-normal uppercase">
                I accept the terms and conditions
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-500 hover:text-black transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Right Columns: Nav Links */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 md:pl-12">
            
            {/* Nos Formules (Product) */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Nos formules
              </span>
              <div className="flex flex-col gap-3">
                {productLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-gray-600 hover:text-black text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Science (Tech) */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Science
              </span>
              <div className="flex flex-col gap-3">
                {technologyLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-gray-600 hover:text-black text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* La Marque (Brand) */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold">
                La marque
              </span>
              <div className="flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-gray-600 hover:text-black text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Assistance (Help) */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Assistance
              </span>
              <div className="flex flex-col gap-3">
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-gray-600 hover:text-black text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between text-xs text-gray-400 font-mono uppercase tracking-wider">
          <span>Copyright LinkedPage 2026</span>
        </div>
        
      </div>
    </footer>
  );
}
