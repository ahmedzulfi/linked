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

// ── Helpers for client-side HTML compilation ───────────────────────────────

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildProjectCard(
  title: string,
  description: string,
  link: string,
  imageUrl: string,
  category: string,
  year: string
): string {
  const resolvedImg = imageUrl || "/templates/daniel-cross/NZiJk1LCTBcGzs2MNANRaoxI2IA.png";
  return `
<div style="position:relative;border-radius:12px;overflow:hidden;background:#fff;cursor:pointer;flex:0 0 calc(50% - 12px)">
  <a href="${esc(link)}" target="_blank" rel="noopener" style="display:block;position:relative;border-radius:12px;overflow:hidden;text-decoration:none;">
    <div style="position:relative;height:320px;overflow:hidden;">
      <img src="${esc(resolvedImg)}" alt="${esc(title)}" style="width:100%;height:100%;object-fit:cover;display:block;">
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);"></div>
      <div style="position:absolute;bottom:20px;left:20px;right:20px;z-index:2;">
        <h4 style="font-family:'Inter Display',sans-serif;font-size:20px;font-weight:600;color:#fff;margin:0 0 6px 0;">${esc(title)}</h4>
        <div style="display:flex;gap:8px;align-items:center;opacity:0.8;">
          <span style="font-family:'Inter Display',sans-serif;font-size:13px;color:#fff;">${esc(category)}</span>
          <span style="font-family:'Inter Display',sans-serif;font-size:13px;color:#fff;">/</span>
          <span style="font-family:'Inter Display',sans-serif;font-size:13px;color:#fff;">${esc(year)}</span>
        </div>
      </div>
    </div>
  </a>
</div>`;
}

function buildProjectsSection(profile: ProfileData): string {
  const projects = profile.projects || [];
  if (projects.length === 0) return "";

  const cards = projects
    .map((p) =>
      buildProjectCard(
        p.title,
        p.description,
        p.link || "#",
        p.image || "",
        "Design",
        new Date().getFullYear().toString()
      )
    )
    .join("\n");

  return `
<div style="display:flex;flex-wrap:wrap;gap:24px;width:100%;padding:0 25px;">
  ${cards}
</div>`;
}

function buildBrandsTicker(profile: ProfileData): string {
  const companies = profile.experience.map((e) => e.company).filter(Boolean);
  if (companies.length === 0) return "";

  const items = companies
    .concat(companies) // duplicate for seamless scroll
    .map(
      (c) =>
        `<li aria-hidden="true" style="flex-shrink:0;display:inline-flex;align-items:center;padding:0 18px;white-space:nowrap;font-family:'Inter Display',sans-serif;font-size:16px;font-weight:500;color:#333;">${esc(c)}</li>`
    )
    .join("");

  return `
<section style="display:flex;width:100%;place-items:center;mask-image:linear-gradient(to right,rgba(0,0,0,0) 0%,rgb(0,0,0) 12.5%,rgb(0,0,0) 87.5%,rgba(0,0,0,0) 100%);overflow:hidden;">
  <ul style="display:flex;width:100%;place-items:center;margin:0;padding:0;list-style:none;gap:18px;animation:tickerScroll 20s linear infinite;">
    ${items}
  </ul>
</section>
<style>
@keyframes tickerScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>`;
}

// ── Client-side buildPreviewHtml function ───────────────────────────────────

function buildPreviewHtml(template: string, profile: ProfileData): string {
  let html = template;

  const replaceAll = (t: string, s: string, r: string) => t.split(s).join(r);

  // Fix asset paths
  html = replaceAll(
    html,
    "./Danielcross - Personal Portfolio Framer Template_files/",
    "/templates/daniel-cross/"
  );

  // Fix internal Framer navigation links
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
  const firstName = profile.name.split(" ")[0];
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
  const email = emailLink ? emailLink.url.replace("mailto:", "") : "hello@example.com";
  html = replaceAll(html, 'href="mailto:hello@gmail.com"', `href="mailto:${esc(email)}"`);
  html = replaceAll(html, ">hello@gmail.com<", `>${esc(email)}<`);
  html = replaceAll(html, ">+44 7700 900123<", `>${esc(location)}<`);

  // Social link hrefs
  const linksByIcon: Record<string, string> = {};
  for (const l of profile.links) {
    if (l.icon) linksByIcon[l.icon] = l.url;
  }
  if (linksByIcon.linkedin) {
    html = replaceAll(html, 'href="https://www.linkedin.com/"', `href="${esc(linksByIcon.linkedin)}"`);
  }
  if (linksByIcon.twitter) {
    html = replaceAll(html, 'href="https://x.com/"', `href="${esc(linksByIcon.twitter)}"`);
  }

  // Projects / Work cards section
  const workWrapperStart = 'data-framer-name="work wrapper">';
  const wIdx = html.indexOf(workWrapperStart);
  if (wIdx !== -1 && (profile.projects || []).length > 0) {
    const contentStart = wIdx + workWrapperStart.length;
    const projectsHtml = buildProjectsSection(profile);
    html = html.substring(0, contentStart) + projectsHtml + html.substring(contentStart);
  }

  // Brands ticker section
  const tickerMarker = 'data-framer-name="Ticker logos"';
  const tickerIdx = html.indexOf(tickerMarker);
  if (tickerIdx !== -1 && profile.experience.length > 0) {
    const tickerOpenEnd = html.indexOf(">", tickerIdx) + 1;
    const tickerClose = html.indexOf("<!--/$-->", tickerOpenEnd);
    if (tickerClose !== -1) {
      const tickerHtml = buildBrandsTicker(profile);
      html = html.substring(0, tickerOpenEnd) + tickerHtml + html.substring(tickerClose);
    }
  }

  // Replace avatars and banners
  if (profile.avatarUrl) {
    html = replaceAll(html, "/templates/daniel-cross/6fz6fw6ZIqdfPnGjg9h6yUfYitE.jpg", esc(profile.avatarUrl));
  }
  const heroPhoto = profile.bannerUrl || profile.avatarUrl;
  if (heroPhoto) {
    html = replaceAll(html, "/templates/daniel-cross/B3sqQm2pBUNJyRcswxM209Q.png", esc(heroPhoto));
  }

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
      <div className="w-full h-full">
        <iframe
          ref={iframeRef}
          srcDoc={compiledHtml || "<html><body style='display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#888;font-size:14px'>Loading preview…</body></html>"}
          className="w-full h-full border-0"
          style={{ height: "100%" }}
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
