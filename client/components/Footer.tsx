import { Link } from "react-router-dom";

const ChevronRight = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.83624 13.6726L11.3937 9.11512L6.83624 4.55762" stroke="white" strokeWidth="2.27875" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
    <footer className="w-full px-4 sm:px-8 pb-0">
      <div className="footer-gradient rounded-t-[13px] overflow-hidden px-6 sm:px-12 lg:px-20 py-16">
        <div className="max-w-[1536px] mx-auto flex flex-col gap-16">
          {/* Large logo */}
          <div className="w-full overflow-hidden">
            <img
              src="/logo.png"
              alt="LinkedPage"
              className="h-10 w-auto object-contain brightness-0 invert"
              style={{ objectPosition: 'left' }}
            />
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pb-10 border-b border-white/10">
            {/* Nav links */}
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="flex items-center gap-2 text-white text-[17px] leading-[27px] hover:opacity-80 transition-opacity"
                >
                  <ChevronRight />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 text-white text-[17px] leading-[27px] hover:opacity-80 transition-opacity"
                >
                  <ChevronRight />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            {/* Legal links */}
            <div className="flex flex-col gap-4">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 text-white text-[17px] leading-[27px] hover:opacity-80 transition-opacity"
                >
                  <ChevronRight />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <p className="text-white/40 text-sm text-center">
            © {new Date().getFullYear()} LinkedPage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
