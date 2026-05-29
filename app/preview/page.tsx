"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import ProfilePreview from "@/app/editor/components/ProfilePreview";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  Globe,
  Download,
  ExternalLink,
  Check,
  Loader2,
  Share2,
  Pencil,
  Smartphone,
  Monitor,
} from "lucide-react";

type PreviewMode = "desktop" | "mobile";
type PublishStep = "idle" | "subdomain" | "publishing" | "done";

// ─── Subdomain input panel ─────────────────────────────────────────────────────
function PublishPanel({
  onPublish,
  publishing,
}: {
  onPublish: (slug: string) => void;
  publishing: boolean;
}) {
  const { editedProfile } = useEditor();

  const suggestedSlug = editedProfile
    ? editedProfile.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    : "yourname";

  const [slug, setSlug] = useState(suggestedSlug);
  const isValid = /^[a-z0-9-]{3,30}$/.test(slug);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-medium text-black mb-1">Choose your subdomain</h3>
        <p className="text-xs text-[#9CA3AF]">Your free URL on LinkedPage</p>
      </div>

      <div className="flex items-center      rounded-lg   border border-[#E6E6E6] overflow-hidden bg-white focus-within:border-[#8DB8FF] focus-within:shadow-[0_0_0_3px_rgba(141,184,255,0.15)] transition-all duration-150">
        <div className="px-3 py-2.5 bg-[#F3F3F3] border-r border-[#E6E6E6] text-xs text-[#9CA3AF] whitespace-nowrap flex-shrink-0">
          linkedpage.io/
        </div>
        <input
          className="flex-1 px-3 py-2.5 text-sm text-black bg-transparent outline-none min-w-0"
          value={slug}
          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
          placeholder="yourname"
          maxLength={30}
        />
      </div>

      {slug && !isValid && (
        <p className="text-xs text-[#E45A5A]">
          3–30 characters, lowercase letters, numbers and hyphens only.
        </p>
      )}

      {slug && isValid && (
        <p className="text-xs text-[#369762] flex items-center gap-1">
          <Check className="w-5 h-5" />
          linkedpage.io/{slug} is available!
        </p>
      )}

      <button
        onClick={() => isValid && onPublish(slug)}
        disabled={!isValid || publishing}
        className={`button button-primary w-full justify-center gap-2 ${!isValid || publishing ? "opacity-50 pointer-events-none" : ""
          }`}
      >
        {publishing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Globe className="w-5 h-5" />
        )}
        {publishing ? "Publishing…" : "Publish for free"}
      </button>
    </div>
  );
}

// ─── Published success panel ───────────────────────────────────────────────────
function PublishedPanel({ url, slug }: { url: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5   rounded-lg bg-[#8DFFB3] flex items-center justify-center">
          <Check className="w-5 h-5 text-[#1a5c3a]" strokeWidth={2.5} />
        </div>
        <h3 className="text-sm font-medium text-black">Your page is live!</h3>
      </div>

      <div
        className="flex items-center gap-2 p-3 bg-[#F3F3F3] rounded-[10px] cursor-pointer group"
        onClick={copy}
      >
        <Globe className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" />
        <p className="text-sm text-black flex-1 truncate font-medium">linkedpage.io/{slug}</p>
        {copied ? (
          <Check className="w-5 h-5 text-[#369762] flex-shrink-0" />
        ) : (
          <Share2 className="w-5 h-5 text-[#9CA3AF] group-hover:text-black flex-shrink-0 transition-colors" />
        )}
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="button button-secondary w-full justify-center gap-2"
      >
        <ExternalLink className="w-5 h-5" />
        Open your page
      </a>
    </div>
  );
}

// ─── Preview page ──────────────────────────────────────────────────────────────
export default function PreviewPage() {
  const router = useRouter();
  const { editedProfile, selectedTemplate, useMockProfile } = useEditor();

  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [publishStep, setPublishStep] = useState<PublishStep>("idle");
  const [publishedSlug, setPublishedSlug] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    if (!editedProfile) useMockProfile();
  }, [editedProfile, useMockProfile]);

  const handlePublish = async (slug: string) => {
    setPublishing(true);
    toast.loading("Publishing your page…");
    await new Promise((r) => setTimeout(r, 1800));
    setPublishing(false);
    toast.dismiss();
    setPublishedSlug(slug);
    setPublishStep("done");
    toast.success(`Your page is live at linkedpage.io/${slug} 🎉`);
  };

  const handleExport = async () => {
    setExportLoading(true);
    toast.loading("Generating ZIP…");
    await new Promise((r) => setTimeout(r, 1200));
    setExportLoading(false);
    toast.dismiss();
    toast.success("ZIP downloaded!");

    // Create a minimal mock HTML file and download
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${editedProfile?.name ?? "My Page"} – LinkedPage</title>
  <script>window.alert("This is a static export placeholder from LinkedPage!")</script>
</head>
<body>
  <h1>${editedProfile?.name ?? "My Page"}</h1>
  <p>${editedProfile?.headline ?? ""}</p>
</body>
</html>`;
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `linkedpage-${editedProfile?.name?.toLowerCase().replace(/\s+/g, "-") ?? "site"}.html`;
    a.click();
  };

  if (!editedProfile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-[#9CA3AF]" />
      </div>
    );
  }

  const desktopW = 1024;
  const desktopH = 768;
  const mobileW = 375;
  const mobileH = 812;

  // Calculate scale to fit within available space
  const previewContainerW = typeof window !== "undefined" ? window.innerWidth - 340 : 700;
  const previewContainerH = typeof window !== "undefined" ? window.innerHeight - 200 : 600;

  const desktopScale = Math.min(
    (previewContainerW - 40) / desktopW,
    (previewContainerH - 60) / desktopH,
    0.85
  );
  const mobileScale = Math.min(
    200 / mobileW,
    (previewContainerH - 60) / mobileH,
    0.65
  );

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-inter">
      <Navbar />

      {/* ── Top toolbar ── */}
      <div className="fixed top-[88px] left-0 right-0 z-40 px-5">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between gap-3 h-12 px-4 bg-white/80 backdrop-blur-md      rounded-lg   border border-[#E6E6E6]  shadow-[0_6px_10px_-6px_#00000016] ">
          {/* Left: back */}
          <button
            onClick={() => router.push("/editor")}
            className="flex items-center gap-1.5 text-[11px] font-medium text-[#6B6B6B] hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to editor</span>
          </button>

          {/* Center: preview mode */}
          <div className="flex items-center gap-1 p-1 bg-[#F3F3F3] rounded-[10px]">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium     rounded-lg  transition-[background,color] duration-150 ${previewMode === "desktop" ? "bg-white text-black  shadow-[0_6px_10px_-6px_#00000016] " : "text-[#6B6B6B] hover:text-black"
                }`}
            >
              <Monitor className="w-5 h-5" />
              Desktop
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium     rounded-lg  transition-[background,color] duration-150 ${previewMode === "mobile" ? "bg-white text-black  shadow-[0_6px_10px_-6px_#00000016] " : "text-[#6B6B6B] hover:text-black"
                }`}
            >
              <Smartphone className="w-5 h-5" />
              Mobile
            </button>
          </div>

          {/* Right: edit CTA */}
          <button
            onClick={() => router.push("/editor")}
            className="button button-secondary !py-1.5 !px-3 !text-[11px] flex items-center gap-1.5"
          >
            <Pencil className="w-5 h-5" />
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>
      </div>

      {/* ── Layout: canvas + right panel ── */}
      <div className="flex flex-col lg:flex-row pt-[148px] pb-8 px-5 gap-4 max-w-[1536px] mx-auto">

        {/* ── Canvas ── */}
        <div className="flex-1 flex items-start justify-center min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={previewMode}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {previewMode === "desktop" ? (
                <div
                  className="rounded-[16px] overflow-hidden border border-[#E6E6E6] bg-white"
                  style={{
                    width: desktopW * desktopScale,
                    height: desktopH * desktopScale,
                    boxShadow: "0 8px 30px -8px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      width: desktopW,
                      height: desktopH,
                      transform: `scale(${desktopScale})`,
                      transformOrigin: "top left",
                      overflow: "auto",
                      pointerEvents: "none",
                    }}
                  >
                    <ProfilePreview profile={editedProfile} template={selectedTemplate} />
                  </div>
                </div>
              ) : (
                <div
                  className="rounded-[32px] overflow-hidden border-[8px] border-[#2A2A2F] bg-white"
                  style={{
                    width: mobileW * mobileScale,
                    height: mobileH * mobileScale,
                    boxShadow: "0 16px 48px -12px rgba(0,0,0,0.22)",
                  }}
                >
                  <div
                    style={{
                      width: mobileW,
                      height: mobileH,
                      transform: `scale(${mobileScale})`,
                      transformOrigin: "top left",
                      overflow: "auto",
                      pointerEvents: "none",
                    }}
                  >
                    <ProfilePreview profile={editedProfile} template={selectedTemplate} />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Right publish panel ── */}
        <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-4">

          {/* Publish card */}
          <div className="bg-white border border-[#E6E6E6] rounded-[16px] p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)" }}>
            <AnimatePresence mode="wait">
              {publishStep === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  <PublishedPanel
                    url={`https://linkedpage.io/${publishedSlug}`}
                    slug={publishedSlug}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="publish"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                >
                  <PublishPanel onPublish={handlePublish} publishing={publishing} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Export card */}
          <div className="bg-white border border-[#E6E6E6] rounded-[16px] p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)" }}>
            <h3 className="text-sm font-medium text-black mb-1">Export code</h3>
            <p className="text-xs text-[#9CA3AF] mb-4 leading-relaxed">
              Download your page as a self-contained HTML + CSS file. Host it anywhere.
            </p>
            <button
              onClick={handleExport}
              disabled={exportLoading}
              className={`button button-secondary w-full justify-center gap-2 ${exportLoading ? "opacity-60 pointer-events-none" : ""}`}
            >
              {exportLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              {exportLoading ? "Generating…" : "Download ZIP"}
            </button>
          </div>

          {/* What's included */}
          <div className="bg-[#FBFBFB] border border-[#E6E6E6] rounded-[16px] p-5">
            <h3 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-3">Free plan includes</h3>
            <ul className="flex flex-col gap-2">
              {[
                "Custom subdomain (linkedpage.io/…)",
                "All 4 templates",
                "Code export",
                "Always up-to-date with LinkedIn",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-[#171717]">
                  <div className="w-5 h-5   rounded-lg bg-[#8DFFB3] flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#1a5c3a]" strokeWidth={2.5} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
