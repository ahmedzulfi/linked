"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, Sparkles, Check, Globe, Layout, ShieldAlert } from "lucide-react";

const ONBOARDING_STYLES = [
  { id: "modern", label: "Modern Professional", desc: "Sleek typography, deep charcoal colors, high clarity grids" },
  { id: "ctas", label: "Clear CTAs", desc: "High-contrast action triggers, bold buttons, and primary focus" },
  { id: "trust", label: "Trust-Building Layout", desc: "Mentorship proofs, rating counters, and student reviews" },
  { id: "community", label: "Vibrant Community Focus", desc: "Live user numbers, community highlight cards, and social links" }
];

function OnboardingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial values from query parameters if available
  const linkedinUrl = searchParams.get("url") || "";
  const initialBrandName = linkedinUrl
    ? linkedinUrl.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase())
    : "Reality Cheque";

  const [step, setStep] = useState(0);
  const [brandName, setBrandName] = useState(initialBrandName);
  const [subdomain, setSubdomain] = useState(
    initialBrandName.toLowerCase().replace(/[^a-z0-9]/g, "") || "realitycheque"
  );
  const [selectedStyles, setSelectedStyles] = useState<string[]>([
    "Modern Professional",
    "Clear CTAs",
    "Trust-Building Layout",
    "Vibrant Community Focus" // Default all checked as in mockup
  ]);
  const [isDomainChecking, setIsDomainChecking] = useState(false);
  const [domainStatus, setDomainStatus] = useState<"available" | "taken" | "idle">("idle");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing Webild workspace...");

  // Sync subdomain with brandName on step 0
  useEffect(() => {
    if (step === 0) {
      setSubdomain(brandName.toLowerCase().replace(/[^a-z0-9]/g, ""));
    }
  }, [brandName, step]);

  // Simulate domain validation check
  useEffect(() => {
    if (step === 1 && subdomain) {
      setIsDomainChecking(true);
      setDomainStatus("idle");
      const timer = setTimeout(() => {
        setIsDomainChecking(false);
        // realitycheque.io is available, others might be too
        setDomainStatus("available");
        toast.success(`✨ ${subdomain}.io is available for custom registration!`);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [subdomain, step]);

  // Step 4 Loading Simulation
  useEffect(() => {
    if (step === 3) {
      const texts = [
        "Ingesting brand guidelines...",
        "Applying 'Webild Cloud Editorial' colors...",
        "Formulating Inter Tight typography layers...",
        "Generating tilted project canvas grids...",
        "Finalizing interactive site layout...",
      ];

      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const next = prev + 1;
          const textIndex = Math.min(Math.floor((next / 100) * texts.length), texts.length - 1);
          setLoadingText(texts[textIndex]);

          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              // Store criteria in session storage so dashboard can read them
              sessionStorage.setItem("webild_brand_name", brandName);
              sessionStorage.setItem("webild_subdomain", subdomain + ".io");
              sessionStorage.setItem("webild_styles", JSON.stringify(selectedStyles));
              toast.success("Site layout generated successfully!");
              router.push("/?success=true");
            }, 500);
            return 100;
          }
          return next;
        });
      }, 40);

      return () => clearInterval(interval);
    }
  }, [step, router, brandName, subdomain, selectedStyles]);

  const nextStep = () => {
    if (step === 0 && !brandName.trim()) {
      toast.error("Please enter a brand or site name!");
      return;
    }
    if (step === 1 && !subdomain.trim()) {
      toast.error("Please specify a subdomain!");
      return;
    }
    if (step === 2 && selectedStyles.length === 0) {
      toast.error("Please select at least one design style!");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const toggleStyle = (label: string) => {
    setSelectedStyles(prev =>
      prev.includes(label)
        ? prev.filter(s => s !== label)
        : [...prev, label]
    );
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1] as const
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.25,
        ease: [0.23, 1, 0.32, 1] as const
      }
    })
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] relative overflow-hidden flex flex-col items-center justify-center font-inter select-none">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-50">
        <img src="/bg.png" alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBFBFB]/40 via-white/80 to-[#FBFBFB]" />
      </div>

      {/* Header Info */}
      <div className="absolute top-8 left-8 right-8 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-[13px] bg-[#2A2A2F] text-white flex items-center justify-center font-bold text-lg font-inter-tight">W</span>
          <span className="font-semibold text-[16px] text-black font-inter-tight">Webild</span>
        </div>
        {step < 3 && (
          <div className="text-[13px] text-gray-500 font-medium font-inter-tight bg-white border border-[#E6E6E6] px-3.5 py-1.5 rounded-[13px]  shadow-[0_6px_10px_-6px_#00000016] ">
            Step {step + 1} of 3
          </div>
        )}
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[540px] px-6 z-10">
        <div className="bg-white/80 backdrop-blur-md border border-[#E6E6E6] p-8 sm:p-10 rounded-[18px]  shadow-[0_6px_10px_-6px_#00000016]  relative overflow-hidden min-h-[420px] flex flex-col justify-between">
          <AnimatePresence mode="wait" custom={1}>
            {step === 0 && (
              <motion.div
                key="step0"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-[13px] bg-[#8DB8FF]/10 flex items-center justify-center text-[#8DB8FF] mb-2">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <h1 className="text-[29px] leading-tight font-medium text-black font-inter-tight">
                    Name your web project
                  </h1>
                  <p className="text-[14px] text-gray-500 font-inter-tight leading-relaxed">
                    What is the title or name of your project? We will use this to set up your preview canvas content and titles.
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. Reality Cheque"
                    className="w-full h-12 px-4 rounded-[13px] bg-[#F7F7F7] border border-[#E6E6E6] text-black text-[16px] font-medium outline-none focus:ring-2 focus:ring-[#8DB8FF]/50 transition-shadow font-inter-tight"
                    autoFocus
                  />
                  {linkedinUrl && (
                    <span className="text-[11px] text-emerald-600 font-semibold font-mono flex items-center gap-1.5">
                      ✓ Imported from LinkedIn URL
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-[13px] bg-[#8DFFB3]/10 flex items-center justify-center text-[#369762] mb-2">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h1 className="text-[29px] leading-tight font-medium text-black font-inter-tight">
                    Set your subdomain
                  </h1>
                  <p className="text-[14px] text-gray-500 font-inter-tight leading-relaxed">
                    This will be the web address people use to view your live builder preview. You can also connect a custom domain later.
                  </p>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                      placeholder="realitycheque"
                      className="w-full h-12 pl-4 pr-24 rounded-[13px] bg-[#F7F7F7] border border-[#E6E6E6] text-black text-[16px] font-medium outline-none focus:ring-2 focus:ring-[#8DB8FF]/50 transition-shadow font-inter-tight"
                    />
                    <span className="absolute right-4 text-gray-400 font-semibold text-[14px] font-inter-tight">
                      .webild.co
                    </span>
                  </div>

                  <div className="flex items-center gap-2 min-h-[24px]">
                    {isDomainChecking ? (
                      <span className="text-[12px] text-gray-400 font-medium animate-pulse font-inter-tight flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-ping" />
                        Checking web address availability...
                      </span>
                    ) : domainStatus === "available" ? (
                      <span className="text-[12px] text-emerald-600 font-semibold font-inter-tight flex items-center gap-1">
                        ✨ realitycheque.io is also available!
                      </span>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-[13px] bg-[#8DB8FF]/10 flex items-center justify-center text-[#8DB8FF] mb-2">
                    <Layout className="w-5 h-5" />
                  </div>
                  <h1 className="text-[29px] leading-tight font-medium text-black font-inter-tight">
                    Select design layers
                  </h1>
                  <p className="text-[14px] text-gray-500 font-inter-tight leading-relaxed">
                    Check the elements and styling paradigms you want to pre-configure inside your workspace canvas.
                  </p>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  {ONBOARDING_STYLES.map((style) => {
                    const isChecked = selectedStyles.includes(style.label);
                    return (
                      <button
                        key={style.id}
                        onClick={() => toggleStyle(style.label)}
                        className={`w-full flex items-start gap-3.5 p-3.5 rounded-[13px] border transition-all text-left group active:scale-[0.98] ${isChecked
                          ? "bg-[#DCEAFF]/20 border-[#8DB8FF]  shadow-[0_6px_10px_-6px_#00000016] "
                          : "bg-[#F7F7F7] border-[#E6E6E6] hover:bg-[#F3F3F3]"
                          }`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${isChecked
                          ? "bg-[#8DB8FF] border-[#8DB8FF] text-white"
                          : "bg-white border-[#C5C5C5] group-hover:border-gray-500"
                          }`}>
                          {isChecked && <Check className="w-5 h-5 stroke-[3px]" />}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[14px] font-semibold text-black font-inter-tight leading-tight">{style.label}</span>
                          <span className="text-[12px] text-gray-400 font-inter-tight leading-snug">{style.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center gap-6 py-10"
              >
                <div className="w-16 h-16 rounded-[18px] bg-[#2A2A2F] text-white flex items-center justify-center  shadow-[0_6px_10px_-6px_#00000016]  relative animate-spin">
                  <Sparkles className="w-8 h-8 text-[#8DFFB3]" />
                  <span className="absolute inset-0 rounded-[18px] border-2 border-dashed border-[#8DB8FF]" />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-[21px] font-semibold text-black font-inter-tight">Generating your website...</h2>
                  <p className="text-[13px] text-gray-500 h-6 font-medium animate-pulse font-inter-tight">{loadingText}</p>
                </div>

                <div className="w-full max-w-[280px] h-2 bg-[#F3F3F3] rounded-full overflow-hidden border border-[#E6E6E6] mt-4">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#8DB8FF] to-[#8DFFB3]"
                    style={{ width: `${loadingProgress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                <span className="text-[11px] font-bold text-gray-400 font-mono">{loadingProgress}% COMPLETE</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          {step < 3 && (
            <div className="flex items-center justify-between border-t border-[#F3F3F3] pt-6 mt-6">
              {step > 0 ? (
                <button
                  onClick={prevStep}
                  className="h-10 px-5 rounded-[13px] bg-[#F3F3F3] text-black text-[12px] font-semibold hover:bg-[#EAEAEA] active:scale-[0.97] transition-all font-inter-tight"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={nextStep}
                className="h-10 px-5 rounded-[13px] bg-[#2A2A2F] text-white text-[12px] font-semibold hover:bg-[#3E3E45] active:scale-[0.97] transition-all font-inter-tight flex items-center gap-1.5  shadow-[0_6px_10px_-6px_#00000016] "
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center font-inter select-none">
        <div className="text-[14px] text-gray-500 font-semibold font-inter-tight">Loading wizard...</div>
      </div>
    }>
      <OnboardingWizard />
    </Suspense>
  );
}
