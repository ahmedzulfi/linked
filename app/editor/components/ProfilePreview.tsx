"use client";

import { useEffect, useState, useRef } from "react";
import { ProfileData, TemplateId } from "@/shared/types";

interface ProfilePreviewProps {
  profile: ProfileData;
  template: TemplateId;
  scale?: number;
  onFieldClick?: (fieldName: string) => void;
  fluid?: boolean;
}

// ── Helper: client-side "lite" replacement of key profile fields ──────────
function buildPreviewHtml(template: string, profile: ProfileData): string {
  let html = template;

  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const replaceAll = (t: string, s: string, r: string) => t.split(s).join(r);

  // Fix asset paths — template expects /templates/daniel-cross/ in prod, but
  // in preview we point to the same path served from Next.js /public
  html = replaceAll(
    html,
    "./Danielcross - Personal Portfolio Framer Template_files/",
    "/templates/daniel-cross/"
  );

  // Fix all internal Framer navigation links
  html = replaceAll(html, "https://danielcross.framer.website/about", "#about");
  html = replaceAll(html, "https://danielcross.framer.website/work", "#work");
  html = replaceAll(html, "https://danielcross.framer.website/contact", "#contact");
  html = replaceAll(html, "https://danielcross.framer.website/", "#");

  // Page title
  html = replaceAll(html, "Danielcross - Personal Portfolio Framer Template", esc(`${profile.name} - Portfolio`));

  // Sidebar name
  html = replaceAll(html, ">Daniel Cross<", `>${esc(profile.name)}<`);

  // Role / headline
  html = replaceAll(html, ">ui/ux designer<", `>${esc(profile.headline)}<`);

  // Hero first name
  const firstName = profile.name.split(" ")[0].toLowerCase();
  html = replaceAll(html, ">daniel<", `>${esc(firstName)}<`);

  // About me paragraph
  html = replaceAll(
    html,
    "I'm Daniel Cross, a passionate UI/UX Designer dedicated to crafting digital experiences that truly connect with people. With a focus on simplicity, usability, and creativity, I design products that not only look beautiful but also solve real problems. My approach blends strategy, design, and technology to transform ideas into meaningful solutions. Whether it's designing intuitive interfaces, building websites, or shaping brand identities, I bring every project to life with precision and purpose.",
    esc(profile.summary)
  );

  // Location
  const location = profile.location || "Remote";
  html = replaceAll(html, ">Based in London-UK<", `>Based in ${esc(location)}<`);
  html = replaceAll(html, ">London-UK<", `>${esc(location)}<`);

  // Footer email
  const emailLink = profile.links.find((l) => l.icon === "email");
  const email = emailLink ? emailLink.url.replace("mailto:", "") : (profile.links[0]?.label ?? "contact@example.com");
  html = replaceAll(html, 'href="mailto:hello@gmail.com"', `href="mailto:${esc(email)}"`);
  html = replaceAll(html, ">hello@gmail.com<", `>${esc(email)}<`);
  html = replaceAll(html, ">+44 7700 900123<", `>${esc(location)}<`);

  // Social link hrefs
  const linksByIcon: Record<string, string> = {};
  for (const l of profile.links) {
    if (l.icon) linksByIcon[l.icon] = l.url;
  }
  if (linksByIcon.linkedin)
    html = replaceAll(html, 'href="https://www.linkedin.com/"', `href="${esc(linksByIcon.linkedin)}"`);
  if (linksByIcon.twitter)
    html = replaceAll(html, 'href="https://x.com/"', `href="${esc(linksByIcon.twitter)}"`);

  // Remove Framer badge
  html = html.replace(/<div id="__framer-badge-container"[\s\S]*?<\/div>/g, "");

  return html;
}

// ── Main exported component ──────────────────────────────────────────────────
export default function ProfilePreview({
  profile,
  template,
  scale = 1,
  fluid = false,
}: ProfilePreviewProps) {
  const [rawTemplate, setRawTemplate] = useState<string | null>(null);
  const [compiledHtml, setCompiledHtml] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Fetch the raw template once
  useEffect(() => {
    fetch("/templates/daniel-cross.html")
      .then((r) => r.text())
      .then(setRawTemplate)
      .catch(() => {
        console.error("[ProfilePreview] Failed to load daniel-cross template");
      });
  }, []);

  // Re-compile whenever profile or raw template changes
  useEffect(() => {
    if (!rawTemplate) return;
    const html = buildPreviewHtml(rawTemplate, profile);
    setCompiledHtml(html);
  }, [rawTemplate, profile]);

  const PREVIEW_W = 1200;
  const PREVIEW_H = 900;

  if (fluid) {
    return (
      <div className="w-full min-h-screen">
        <iframe
          ref={iframeRef}
          srcDoc={compiledHtml || "<html><body style='display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#888;font-size:14px'>Loading preview…</body></html>"}
          className="w-full min-h-screen border-0"
          style={{ height: "100vh" }}
          sandbox="allow-same-origin allow-scripts"
          title="Profile Preview"
        />
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-[16px] border border-[#E6E6E6] bg-[#e9e6e2]"
      style={{
        width: PREVIEW_W * scale,
        height: PREVIEW_H * scale,
      }}
    >
      {!compiledHtml && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-400 font-sans">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
            <span>Loading preview…</span>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        srcDoc={compiledHtml}
        style={{
          width: PREVIEW_W,
          height: PREVIEW_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          border: "none",
          display: "block",
        }}
        sandbox="allow-same-origin allow-scripts"
        title="Profile Preview"
      />
    </div>
  );
}
