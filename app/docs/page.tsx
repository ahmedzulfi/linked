"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  CreditCard,
  BookOpen,
  Settings,
  HelpCircle,
  Code,
  Globe,
  Sliders,
  Sparkles,
} from "lucide-react";
import { UserMenu } from "@/components/UserMenu";

export default function DocsPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("started");

  useEffect(() => {
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

  const docSections = {
    started: {
      title: "Getting Started",
      icon: <Sparkles className="w-5 h-5 text-[#8DB8FF]" />,
      content: (
        <div className="space-y-4 text-[14.5px] leading-relaxed text-gray-600">
          <p>
            Welcome to <strong>Webild LinkedPage</strong>! We build premium, responsive personal micro-sites directly from your LinkedIn profile.
          </p>
          <h3 className="text-lg font-bold text-black mt-6 font-inter-tight">The 3-Step Flow</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Paste Profile URL</strong>: Paste your public LinkedIn link. Our system reads the data.
            </li>
            <li>
              <strong>Select & Modify Template</strong>: Choose from Bento, Scroll, or Minimal layout presets and edit fields inside the editor canvas.
            </li>
            <li>
              <strong>Publish Site</strong>: Hit publish to get your free site live on a subdomain, or link a custom domain.
            </li>
          </ol>
        </div>
      ),
    },
    scraping: {
      title: "LinkedIn Scraper & ZIP",
      icon: <Code className="w-5 h-5 text-[#3b82f6]" />,
      content: (
        <div className="space-y-4 text-[14.5px] leading-relaxed text-gray-600">
          <p>
            LinkedIn employs security headers and rate limits. If the public scraper is blocked by LinkedIn’s login firewall, you can use our <strong>ZIP manual import</strong>:
          </p>
          <h3 className="text-lg font-bold text-black mt-6 font-inter-tight">How to download your archive</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Go to settings and request your data export: <a href="https://www.linkedin.com/psettings/member-data" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn Data Export</a></li>
            <li>Select the <strong>"Profile"</strong> checkbox (the fast export takes ~10 minutes).</li>
            <li>Once you receive the ZIP download, drag and drop the file directly into our fallback screen.</li>
          </ul>
        </div>
      ),
    },
    templates: {
      title: "Editing & Templates",
      icon: <Sliders className="w-5 h-5 text-purple-500" />,
      content: (
        <div className="space-y-4 text-[14.5px] leading-relaxed text-gray-600">
          <p>
            LinkedPage offers modern templates configured to match professional brands.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Bento Grid</strong>: A bento-style visual portfolio demonstrating recent projects, experience milestones, and links.</li>
            <li><strong>Minimal Card</strong>: High-key focused layout suitable for brief bio links.</li>
            <li><strong>Full-Page Scroll</strong>: Narrative linear timeline presenting education, roles, and skills.</li>
          </ul>
          <p className="mt-4">
            Changes inside the canvas save automatically every few seconds. Look for the "Saved" tick in the top-bar header.
          </p>
        </div>
      ),
    },
    domains: {
      title: "Custom Domains",
      icon: <Globe className="w-5 h-5 text-[#369762]" />,
      content: (
        <div className="space-y-4 text-[14.5px] leading-relaxed text-gray-600">
          <p>
            Pro plans allow you to host your micro-site on custom domains (e.g. <code>yoursite.com</code>).
          </p>
          <h3 className="text-lg font-bold text-black mt-6 font-inter-tight">DNS Configuration</h3>
          <p>To connect a domain, go to your site editor → <strong>Site Settings</strong> → <strong>Domains</strong> and configure the following DNS records with your registrar:</p>
          <table className="w-full text-left border border-gray-200 mt-4 text-[13px] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 font-semibold text-black">Type</th>
                <th className="p-3 font-semibold text-black">Name</th>
                <th className="p-3 font-semibold text-black">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-3">A Record</td>
                <td className="p-3">@ (Root)</td>
                <td className="p-3"><code>76.76.21.21</code> (Anycast IP)</td>
              </tr>
              <tr>
                <td className="p-3">CNAME</td>
                <td className="p-3">www</td>
                <td className="p-3"><code>cname.linkedpage.io</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    faq: {
      title: "Frequently Asked Questions",
      icon: <HelpCircle className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-4 text-[14.5px] leading-relaxed text-gray-600">
          <div className="space-y-3">
            <h4 className="font-bold text-black">Q: Can I edit details manually?</h4>
            <p>A: Yes! Click on any block inside the Editor panel to overwrite text, change headings, toggle visible cards, or upload custom profile avatars.</p>
          </div>
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <h4 className="font-bold text-black">Q: Is my data safe?</h4>
            <p>A: Absolutely. We only fetch public details. Your credentials are never handled, and files uploaded during manual import are processed on the server without storage.</p>
          </div>
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-inter flex flex-col text-black antialiased relative overflow-x-hidden">
      
      {/* ── Background Graphic (Polished Light Mesh Gradient) ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-[#FBFBFB]">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#8DB8FF]/10 to-[#E0EBFF]/5 blur-[120px] opacity-70" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#8DFFB3]/6 to-[#E0FFE7]/5 blur-[100px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#FBFBFB]" />
      </div>

      {/* ── Top-bar ── */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-b border-[#E6E6E6] px-6 z-50 flex items-center justify-between select-none shadow-none">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Webild"
            className="h-7 w-auto object-contain cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="w-px h-4 bg-[#2A2A2F]/15" />
          <span className="text-sm font-medium text-[#171717]/60 truncate">Documentation</span>
        </div>

        <div className="flex items-center gap-2 relative">
          {userName ? (
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-8 h-8 rounded-full border border-[#E6E6E6] overflow-hidden cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="h-8 px-4 text-xs font-semibold bg-[#2A2A2F] text-white rounded-lg hover:bg-[#3A3A42] transition-all"
            >
              Log in
            </button>
          )}

          <AnimatePresence>
            {isUserMenuOpen && (
              <UserMenu
                name={userName}
                email={userEmail}
                onClose={() => setIsUserMenuOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Dashboard Layout Body ── */}
      <div className="flex flex-1 relative z-10">
        
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#E6E6E6] bg-white/50 backdrop-blur-md p-6 flex flex-col justify-between select-none shrink-0 min-h-[calc(100vh-3.5rem)] mt-14 relative z-20">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-[#88888E] px-3 mb-1 uppercase tracking-wider">Navigation</span>

              <button
                onClick={() => router.push(userName ? "/dashboard" : "/")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-semibold text-black/60 hover:text-black transition-all text-left"
              >
                <Folder className="w-[18px] h-[18px]" />
                {userName ? "All Websites" : "Home"}
              </button>
            </div>

            <div className="flex flex-col gap-1.5 pt-2 border-t border-[#F5F5F7]">
              <span className="text-[12px] font-semibold text-[#88888E] px-3 mb-1">Topics</span>
              {Object.keys(docSections).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full h-9 px-3 rounded-[6px] text-[13.5px] font-medium text-left transition-all flex items-center gap-2 ${
                    activeTab === key
                      ? "bg-white border border-[#E6E6E6] text-black shadow-sm"
                      : "text-gray-500 hover:text-black hover:bg-white/40"
                  }`}
                >
                  {docSections[key as keyof typeof docSections].title}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => router.push("/pricing")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black/60 hover:text-black transition-all text-left"
              >
                <CreditCard className="w-[18px] h-[18px]" />
                Pricing
              </button>

              <button
                onClick={() => router.push("/docs")}
                className="w-full h-10 px-3 rounded-[8px] bg-white/80 border border-[#E6E6E6]/60 flex items-center gap-3 text-[14px] font-semibold text-black transition-all text-left"
              >
                <BookOpen className="w-[18px] h-[18px] text-black" />
                Documentation
              </button>

              <button
                onClick={() => router.push("/settings")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black/60 hover:text-black transition-all text-left"
              >
                <Settings className="w-[18px] h-[18px]" />
                Settings
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 px-8 md:px-16 py-12 mt-14 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-black font-inter-tight">Help & Documentation</h1>
            <p className="text-[14px] text-gray-500 mt-1">Read tutorials and guides to launch your premium micro-site.</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] p-8"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                {docSections[activeTab as keyof typeof docSections].icon}
                <h2 className="text-xl font-bold text-black font-inter-tight">
                  {docSections[activeTab as keyof typeof docSections].title}
                </h2>
              </div>

              {docSections[activeTab as keyof typeof docSections].content}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>

    </div>
  );
}
