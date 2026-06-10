"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  CreditCard,
  BookOpen,
  Settings,
  Check,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { UserMenu } from "@/components/UserMenu";

export default function PricingPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [priceText, setPriceText] = useState("$16");

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

    // Read dynamic upgrade price from env or default
    const dynamicPrice = process.env.NEXT_PUBLIC_UPGRADE_PRICE || "$16";
    setPriceText(dynamicPrice);
  }, []);

  const [isUpgrading, setIsUpgrading] = useState(false);

  const handlePurchase = async () => {
    setIsUpgrading(true);
    const toastId = toast.loading("Registering upgrade intent...");
    try {
      const res = await fetch("/api/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "pro" }),
      });
      const data = await res.json();
      toast.dismiss(toastId);

      if (res.ok) {
        toast.success(
          "Upgrade request logged! You'll receive an email to complete payment.",
        );
      } else {
        // Not logged in — redirect to login first
        if (res.status === 401) {
          toast.info("Please log in to upgrade your account.");
          router.push("/login");
        } else {
          toast.error(data.error || "Something went wrong. Please try again.");
        }
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Connection error. Please try again.");
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-inter flex flex-col text-black antialiased relative overflow-x-hidden">
      {/* ── Background Graphic (Polished Light Mesh Gradient) ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-[#FBFBFB]">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#8DB8FF]/12 to-[#E0EBFF]/5 blur-[120px] opacity-70" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#8DFFB3]/8 to-[#E0FFE7]/5 blur-[100px] opacity-45" />
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
          <span className="text-sm font-medium text-[#171717]/60 truncate">
            Pricing
          </span>
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
              <span className="text-[12px] font-semibold text-[#88888E] px-3 mb-1 uppercase tracking-wider">
                Navigation
              </span>

              <button
                onClick={() => router.push(userName ? "/dashboard" : "/")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-semibold text-black/60 hover:text-black transition-all text-left"
              >
                <Folder className="w-[18px] h-[18px]" />
                {userName ? "All Websites" : "Home"}
              </button>
            </div>

            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#F5F5F7]">
              <span className="text-[12px] font-semibold text-[#88888E] px-3">
                Recent websites
              </span>
              <button
                onClick={() => router.push(userName ? "/dashboard" : "/")}
                className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] hover:bg-white/60 text-left w-full"
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#E6E6E6] overflow-hidden p-0.5 shrink-0">
                  <img
                    src="/logoicon.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[13px] font-semibold text-[#171717] truncate">
                  {userName ? "Back to dashboard" : "Back to home"}
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => router.push("/pricing")}
                className="w-full h-10 px-3 rounded-[8px] bg-white/80 border border-[#E6E6E6]/60 flex items-center gap-3 text-[14px] font-semibold text-black transition-all text-left"
              >
                <CreditCard className="w-[18px] h-[18px] text-black" />
                Pricing
              </button>

              <button
                onClick={() => router.push("/docs")}
                className="w-full h-10 px-3 rounded-[8px] hover:bg-white/60 flex items-center gap-3 text-[14px] font-medium text-black/60 hover:text-black transition-all text-left"
              >
                <BookOpen className="w-[18px] h-[18px]" />
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
        <main className="flex-1 px-8 md:px-16 py-12 mt-14 max-w-5xl">
          <div className="mb-10 text-center max-w-xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-black font-inter-tight">
              Simple, Flat Pricing
            </h1>
            <p className="text-[14px] text-gray-500 mt-2">
              Create a premium landing page from your LinkedIn profile in
              minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
            {/* Free Plan Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-[24px] shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-black font-inter-tight">
                  Free Draft
                </h3>
                <p className="text-[13px] text-gray-500 mt-1">
                  Perfect for trying out templates and structures.
                </p>
                <div className="mt-5 flex items-baseline">
                  <span className="text-4xl font-extrabold text-black font-inter-tight">
                    $0
                  </span>
                  <span className="text-xs text-gray-400 ml-1 font-semibold">
                    forever
                  </span>
                </div>
                <div className="border-t border-gray-100 my-6" />
                <ul className="space-y-3.5">
                  {[
                    "1 Website Draft",
                    "Standard Card Layouts",
                    "Live Preview Panel",
                    "LinkedPage Subdomain",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-[13.5px] font-medium text-gray-600"
                    >
                      <Check className="w-4 h-4 text-[#369762]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => router.push("/editor")}
                  className="w-full h-11 border border-[#E6E6E6] hover:bg-[#FBFBFB] text-black text-[13px] font-bold rounded-xl transition-all active:scale-[0.97] transition-transform"
                >
                  Start Customizing
                </button>
              </div>
            </motion.div>

            {/* Pro Plan Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.12 }}
              className="relative bg-white/95 border-2 border-[#8DB8FF] rounded-[24px] shadow-[0px_10px_20px_-8px_rgba(141,184,255,0.22)] p-8 flex flex-col justify-between overflow-hidden"
            >
              {/* Popular Badge */}
              <div className="absolute top-0 right-0 bg-[#8DB8FF] text-white text-[10px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-bl-xl flex items-center gap-1">
                <Zap className="w-3 h-3 fill-white" /> Pro Feature
              </div>

              <div>
                <h3 className="text-lg font-bold text-black font-inter-tight">
                  Professional Pro
                </h3>
                <p className="text-[13px] text-gray-500 mt-1">
                  Unlock all templates, exports, and custom domains.
                </p>
                <div className="mt-5 flex items-baseline">
                  <span className="text-4xl font-extrabold text-black font-inter-tight">
                    {priceText}
                  </span>
                  <span className="text-xs text-gray-400 ml-1 font-semibold">
                    one-time payment
                  </span>
                </div>
                <div className="border-t border-gray-100 my-6" />
                <ul className="space-y-3.5">
                  {[
                    "Unlimited Websites",
                    "Custom Custom Domains",
                    "All Premium Templates (e.g. Bento)",
                    "Full Code Export (HTML/CSS ZIP)",
                    "Premium SEO & Meta Editing",
                    "Priority AI Builder Assist",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-[13.5px] font-medium text-gray-600"
                    >
                      <Check className="w-4 h-4 text-[#369762]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <button
                  onClick={handlePurchase}
                  disabled={isUpgrading}
                  className="w-full h-11 bg-[#2A2A2F] hover:bg-[#3A3A42] text-white text-[13px] font-bold rounded-xl transition-all active:scale-[0.97] transition-transform shadow-md disabled:opacity-60"
                >
                  {isUpgrading ? "Processing..." : "Upgrade to Pro"}
                </button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
