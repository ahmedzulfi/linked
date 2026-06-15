"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Check,
  ExternalLink,
  Share2,
  Twitter,
  Linkedin,
  RotateCcw,
  Copy,
  Sparkles,
} from "lucide-react";
import { AnimatedSuccessIllustration } from "@/components/AnimatedSVGs";

function PublishInner() {
  const params = useSearchParams();
  const router = useRouter();
  const slug = params.get("slug") ?? "yourname";
  const [url, setUrl] = useState("");

  useEffect(() => {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    if (isLocalhost) {
      setUrl(`${window.location.origin}/p/${slug}`);
    } else {
      const host = window.location.host;
      const parts = host.split(".");
      const mainDomain = parts.length > 2 ? parts.slice(1).join(".") : host;
      setUrl(`${window.location.protocol}//${slug}.${mainDomain}`);
    }
  }, [slug]);

  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      `Just turned my LinkedIn into a beautiful personal micro-site in under 60 seconds with @LinkedPage ✨\n\n${url}`,
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const shareUrl = encodeURIComponent(url);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      "_blank",
    );
  };

  return (
    <main className="flex-1 flex items-center justify-center px-5 pt-24 pb-16">
      <div className="flex flex-col items-center gap-10 max-w-md w-full text-center">
        {/* Success ring */}
        <AnimatedSuccessIllustration />

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8DB8FF]" />
            <span className="text-xs font-medium text-[#8DB8FF] uppercase tracking-wide">
              Published
            </span>
          </div>
          <h1 className="text-3xl font-medium text-black leading-tight">
            Your page is live!
          </h1>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            Share it anywhere — your LinkedIn profile, email signature,
            portfolio, or bio link.
          </p>
        </motion.div>

        {/* URL box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="w-full"
        >
          <div
            onClick={copy}
            className="flex items-center gap-3 p-4 bg-[#F7F7F7] border border-[#E6E6E6] rounded-[16px] cursor-pointer hover:border-[#C0C0C0] active:scale-[0.98] transition-[transform,border-color] duration-150"
          >
            <div className="w-8 h-8   rounded-lg bg-white border border-[#E6E6E6] flex items-center justify-center flex-shrink-0">
              <ExternalLink className="w-5 h-5 text-[#6B6B6B]" />
            </div>
            <p className="text-sm text-black font-medium flex-1 text-left truncate">
              {url}
            </p>
            {copied ? (
              <Check className="w-5 h-5 text-[#d4ff66] flex-shrink-0" />
            ) : (
              <Copy className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" />
            )}
          </div>
        </motion.div>

        {/* Share buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col gap-3 w-full"
        >
          <p className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wide">
            Share
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={shareOnTwitter}
              className="button button-secondary justify-center gap-2"
            >
              <Twitter className="w-5 h-5" />
              Post on X
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="button button-secondary justify-center gap-2"
            >
              <Linkedin className="w-5 h-5" />
              Share on LinkedIn
            </button>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38 }}
          className="w-full flex items-center gap-4"
        >
          <div className="flex-1 h-px bg-[#E6E6E6]" />
          <span className="text-xs text-[#9CA3AF]">or</span>
          <div className="flex-1 h-px bg-[#E6E6E6]" />
        </motion.div>

        {/* Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.42, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full"
        >
          <button
            onClick={() => router.push("/editor")}
            className="button button-secondary flex-1 w-full justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Edit your page
          </button>
          <button
            onClick={() => router.push("/")}
            className="button button-primary flex-1 w-full justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Create another
          </button>
        </motion.div>
      </div>
    </main>
  );
}

export default function PublishPage() {
  return (
    <div className="min-h-screen bg-white font-inter flex flex-col">
      <Navbar />
      <Suspense
        fallback={
          <main className="flex-1 flex items-center justify-center">
            <div className="w-5 h-5   rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
          </main>
        }
      >
        <PublishInner />
      </Suspense>
    </div>
  );
}
