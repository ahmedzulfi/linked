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

// ═══════════════════════════════════════════════════════════════════
// Design tokens (mirrors lib/compiler.ts)
// ═══════════════════════════════════════════════════════════════════
const DC = {
  brown: "#4a3429",
  black: "#000",
  divider: "#0000001a",
  muted: "#757575",
  white: "#fff",
  card2: "#e5e2de",
  bg: "#e9e6e2",
  sidebar: "#edeae7",
  card: "#f5f2f0",
  font: "'Inter', sans-serif",
  radius: "12px",
  radiusSm: "8px",
};

function e(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ═══════════════════════════════════════════════════════════════════
// Link-intercept script — same as compiler.ts
// ═══════════════════════════════════════════════════════════════════
const LINK_INTERCEPT = `
<script>
(function() {
  function go() {
    document.addEventListener('click', function(ev) {
      var a = ev.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href === '' || href === 'javascript:void(0)') return;
      if (href.startsWith('#')) {
        ev.preventDefault();
        var el = document.getElementById(href.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      ev.preventDefault();
      try { window.top.open(href, '_blank'); } catch(err) { window.open(href, '_blank'); }
    }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();
</script>`;

// ═══════════════════════════════════════════════════════════════════
// Section builders (client-side, same as compiler.ts)
// ═══════════════════════════════════════════════════════════════════
function buildAboutSection(profile: ProfileData): string {
  const skills = (profile.skills || [])
    .map(
      (s) =>
        `<span style="display:inline-block;padding:6px 14px;background:${DC.card};border-radius:20px;font-family:${DC.font};font-size:13px;font-weight:500;color:${DC.black};margin:4px 4px 4px 0;">${e(s.name)}</span>`,
    )
    .join("");

  const experience = (profile.experience || [])
    .map(
      (exp, i) => `
    <div style="display:flex;gap:20px;padding:20px 0;${i > 0 ? `border-top:1px solid ${DC.divider};` : ""}">
      <div style="flex-shrink:0;width:40px;height:40px;border-radius:10px;background:${DC.card2};display:flex;align-items:center;justify-content:center;font-family:${DC.font};font-size:13px;font-weight:700;color:${DC.brown};">${e(exp.company.charAt(0))}</div>
      <div style="flex:1;">
        <div style="font-family:${DC.font};font-size:15px;font-weight:600;color:${DC.black};letter-spacing:-0.03em;margin-bottom:2px;">${e(exp.title)}</div>
        <div style="font-family:${DC.font};font-size:13px;color:${DC.muted};margin-bottom:4px;">${e(exp.company)} · ${e(exp.duration)}</div>
        <div style="font-family:${DC.font};font-size:13px;color:${DC.muted};line-height:1.6;">${e(exp.description)}</div>
      </div>
    </div>`,
    )
    .join("");

  const education = (profile.education || [])
    .map(
      (edu, i) => `
    <div style="display:flex;gap:20px;padding:20px 0;${i > 0 ? `border-top:1px solid ${DC.divider};` : ""}">
      <div style="flex-shrink:0;width:40px;height:40px;border-radius:10px;background:${DC.card2};display:flex;align-items:center;justify-content:center;font-family:${DC.font};font-size:13px;font-weight:700;color:${DC.brown};">${e(edu.school.charAt(0))}</div>
      <div>
        <div style="font-family:${DC.font};font-size:15px;font-weight:600;color:${DC.black};letter-spacing:-0.03em;margin-bottom:2px;">${e(edu.degree)}</div>
        <div style="font-family:${DC.font};font-size:13px;color:${DC.muted};">${e(edu.school)} · ${e(edu.year)}</div>
      </div>
    </div>`,
    )
    .join("");

  const avatarSrc =
    profile.avatarUrl ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile.name)}`;

  return `
<section id="about" style="min-height:100vh;background:${DC.bg};padding:60px 48px 80px;box-sizing:border-box;">
  <div style="margin-bottom:48px;">
    <span style="font-family:${DC.font};font-size:11px;font-weight:600;color:${DC.brown};text-transform:uppercase;letter-spacing:0.1em;">About</span>
    <h2 style="font-family:${DC.font};font-size:40px;font-weight:700;color:${DC.black};letter-spacing:-0.04em;margin-top:8px;line-height:1.1;">Get to know me</h2>
  </div>
  <div style="background:${DC.card};border-radius:${DC.radius};padding:32px;display:flex;gap:32px;align-items:flex-start;margin-bottom:32px;flex-wrap:wrap;">
    <img src="${e(avatarSrc)}" alt="${e(profile.name)}" style="width:120px;height:120px;border-radius:60px;object-fit:cover;flex-shrink:0;background:${DC.card2};" onerror="this.src='https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile.name)}'">
    <div style="flex:1;min-width:200px;">
      <h3 style="font-family:${DC.font};font-size:24px;font-weight:700;color:${DC.black};letter-spacing:-0.04em;margin-bottom:6px;">${e(profile.name)}</h3>
      <p style="font-family:${DC.font};font-size:14px;color:${DC.muted};margin-bottom:16px;">${e(profile.headline)}</p>
      <p style="font-family:${DC.font};font-size:14px;color:${DC.black};line-height:1.7;opacity:0.8;max-width:560px;">${e(profile.summary)}</p>
    </div>
  </div>
  ${skills ? `<div style="background:${DC.card};border-radius:${DC.radius};padding:28px;margin-bottom:28px;"><h4 style="font-family:${DC.font};font-size:13px;font-weight:600;color:${DC.muted};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:16px;">Skills</h4><div>${skills}</div></div>` : ""}
  ${experience ? `<div style="background:${DC.card};border-radius:${DC.radius};padding:28px 28px 8px;margin-bottom:28px;"><h4 style="font-family:${DC.font};font-size:13px;font-weight:600;color:${DC.muted};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Experience</h4>${experience}</div>` : ""}
  ${education ? `<div style="background:${DC.card};border-radius:${DC.radius};padding:28px 28px 8px;"><h4 style="font-family:${DC.font};font-size:13px;font-weight:600;color:${DC.muted};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Education</h4>${education}</div>` : ""}
</section>`;
}

function buildWorkSection(profile: ProfileData): string {
  const projects = profile.projects || [];
  const cards =
    projects.length > 0
      ? projects
          .map((p) => {
            const img =
              p.image ||
              `/templates/daniel-cross/NZiJk1LCTBcGzs2MNANRaoxI2IA.png`;
            return `
        <a href="${e(p.link || "#")}" style="display:block;border-radius:${DC.radius};overflow:hidden;text-decoration:none;background:${DC.white};position:relative;aspect-ratio:4/3;">
          <img src="${e(img)}" alt="${e(p.title)}" style="width:100%;height:100%;object-fit:cover;display:block;">
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,0.85) 100%);"></div>
          <div style="position:absolute;bottom:0;left:0;right:0;padding:20px 24px;">
            <h3 style="font-family:${DC.font};font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.03em;margin-bottom:6px;">${e(p.title)}</h3>
            <span style="font-family:${DC.font};font-size:13px;color:rgba(255,255,255,0.75);">${e(p.description.substring(0, 60))}${p.description.length > 60 ? "…" : ""}</span>
          </div>
        </a>`;
          })
          .join("")
      : `<div style="grid-column:1/-1;padding:60px;text-align:center;background:${DC.card};border-radius:${DC.radius};"><p style="font-family:${DC.font};font-size:16px;color:${DC.muted};">Add projects in the editor to see them here.</p></div>`;

  return `
<section id="work" style="min-height:100vh;background:${DC.bg};padding:60px 48px 80px;box-sizing:border-box;">
  <div style="margin-bottom:48px;">
    <span style="font-family:${DC.font};font-size:11px;font-weight:600;color:${DC.brown};text-transform:uppercase;letter-spacing:0.1em;">Work</span>
    <h2 style="font-family:${DC.font};font-size:40px;font-weight:700;color:${DC.black};letter-spacing:-0.04em;margin-top:8px;line-height:1.1;">Selected projects</h2>
  </div>
  <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;">${cards}</div>
</section>`;
}

function buildContactSection(profile: ProfileData): string {
  const emailLink = profile.links.find((l) => l.icon === "email");
  const email = emailLink ? emailLink.url.replace("mailto:", "") : "";
  const phone = profile.phone || "";
  const location = profile.location || "";
  const linksByIcon: Record<string, string> = {};
  for (const l of profile.links) {
    if (l.icon) linksByIcon[l.icon] = l.url;
  }

  const items = [
    {
      icon: "✉",
      label: "Email",
      value: email,
      href: email ? `mailto:${email}` : null,
    },
    {
      icon: "📞",
      label: "Phone",
      value: phone,
      href: phone ? `tel:${phone}` : null,
    },
    {
      icon: "📍",
      label: "Location",
      value: location,
      href: location
        ? `https://maps.google.com?q=${encodeURIComponent(location)}`
        : null,
    },
  ].filter((i) => i.value);

  const socials = [
    { name: "LinkedIn", url: linksByIcon.linkedin || profile.linkedinUrl },
    { name: "Twitter / X", url: linksByIcon.twitter },
    { name: "GitHub", url: linksByIcon.github },
    { name: "Website", url: linksByIcon.website },
  ].filter((i) => i.url && i.url !== "#");

  const contactCards = items
    .map(
      (item) => `
    <a href="${e(item.href!)}" style="display:flex;align-items:center;gap:16px;background:${DC.card};border-radius:${DC.radius};padding:20px 24px;text-decoration:none;">
      <span style="font-size:20px;">${item.icon}</span>
      <div>
        <div style="font-family:${DC.font};font-size:11px;font-weight:600;color:${DC.muted};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;">${item.label}</div>
        <div style="font-family:${DC.font};font-size:15px;font-weight:500;color:${DC.black};">${e(item.value)}</div>
      </div>
    </a>`,
    )
    .join("");

  const socialLinks = socials
    .map(
      (s) => `
    <a href="${e(s.url)}" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px;background:${DC.card};border-radius:${DC.radiusSm};text-decoration:none;">
      <span style="font-family:${DC.font};font-size:14px;font-weight:500;color:${DC.black};">${s.name}</span>
      <span style="font-size:18px;color:${DC.muted};">↗</span>
    </a>`,
    )
    .join("");

  return `
<section id="contact" style="min-height:80vh;background:${DC.sidebar};padding:60px 48px 80px;box-sizing:border-box;">
  <div style="margin-bottom:48px;">
    <span style="font-family:${DC.font};font-size:11px;font-weight:600;color:${DC.brown};text-transform:uppercase;letter-spacing:0.1em;">Contact</span>
    <h2 style="font-family:${DC.font};font-size:40px;font-weight:700;color:${DC.black};letter-spacing:-0.04em;margin-top:8px;line-height:1.1;">Let's work together</h2>
    <p style="font-family:${DC.font};font-size:16px;color:${DC.muted};margin-top:12px;line-height:1.6;max-width:480px;">Have a project in mind? I'd love to hear from you.</p>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:800px;">
    <div style="display:flex;flex-direction:column;gap:12px;">
      <h3 style="font-family:${DC.font};font-size:13px;font-weight:600;color:${DC.muted};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Get in Touch</h3>
      ${contactCards || `<p style="font-family:${DC.font};font-size:14px;color:${DC.muted};">No contact details added yet.</p>`}
    </div>
    ${socialLinks ? `<div><h3 style="font-family:${DC.font};font-size:13px;font-weight:600;color:${DC.muted};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:16px;">Follow Me</h3><div style="display:flex;flex-direction:column;gap:8px;">${socialLinks}</div></div>` : ""}
  </div>
</section>`;
}

// ═══════════════════════════════════════════════════════════════════
// Client-side string replacement (mirrors lib/compiler.ts)
// ═══════════════════════════════════════════════════════════════════
function buildPreviewHtml(raw: string, profile: ProfileData): string {
  let html = raw;
  const ra = (t: string, s: string, r: string) => t.split(s).join(r);

  // Fix asset paths
  html = ra(
    html,
    "./Danielcross - Personal Portfolio Framer Template_files/",
    "/templates/daniel-cross/",
  );

  // Fix nav links → hash anchors
  // Links left unmodified so they are caught by intercept script and open in a new tab

  // Inject link-intercept script into <head>
  html = html.replace("</head>", LINK_INTERCEPT + "\n</head>");

  // Page title
  html = ra(
    html,
    "Danielcross - Personal Portfolio Framer Template",
    e(`${profile.name} - Portfolio`),
  );

  // Sidebar name
  html = ra(html, ">Daniel Cross<", `>${e(profile.name)}<`);

  // Role
  html = ra(html, ">ui/ux designer<", `>${e(profile.headline)}<`);

  // Hero first name
  const firstName = profile.name.split(" ")[0].toLowerCase();
  html = ra(html, ">daniel<", `>${e(firstName)}<`);

  // Bio
  html = ra(
    html,
    "I'm Daniel Cross, a passionate UI/UX Designer dedicated to crafting digital experiences that truly connect with people. With a focus on simplicity, usability, and creativity, I design products that not only look beautiful but also solve real problems. My approach blends strategy, design, and technology to transform ideas into meaningful solutions. Whether it's designing intuitive interfaces, building websites, or shaping brand identities, I bring every project to life with precision and purpose.",
    e(profile.summary),
  );

  // Location
  const location = profile.location || "Remote";
  html = ra(html, ">Based in London-UK<", `>Based in ${e(location)}<`);
  html = ra(html, ">London-UK<", `>${e(location)}<`);

  // Email
  const emailLink = profile.links.find((l) => l.icon === "email");
  const email = emailLink ? emailLink.url.replace("mailto:", "") : "";
  if (email) {
    html = ra(
      html,
      'href="mailto:hello@gmail.com"',
      `href="mailto:${e(email)}"`,
    );
    html = ra(html, ">hello@gmail.com<", `>${e(email)}<`);
  }

  // Phone
  const phone = profile.phone || "";
  html = ra(
    html,
    ">+44 7700 900123<",
    phone ? `>${e(phone)}<` : `>${e(location)}<`,
  );

  // Social hrefs
  const linksByIcon: Record<string, string> = {};
  for (const l of profile.links) {
    if (l.icon) linksByIcon[l.icon] = l.url;
  }
  if (linksByIcon.linkedin)
    html = ra(
      html,
      'href="https://www.linkedin.com/"',
      `href="${e(linksByIcon.linkedin)}"`,
    );
  if (linksByIcon.twitter)
    html = ra(
      html,
      'href="https://x.com/"',
      `href="${e(linksByIcon.twitter)}"`,
    );

  // Add id="home" to main
  html = html.replace('<main class="', '<main id="home" class="');

  // Remove Framer badge
  html = html.replace(/<div id="__framer-badge-container"[\s\S]*?<\/div>/g, "");

  // Append About, Work, Contact sections
  // Removed to preserve original template layout exactly

  return html;
}

// ═══════════════════════════════════════════════════════════════════
// Main exported component
// ═══════════════════════════════════════════════════════════════════
export default function ProfilePreview({
  profile,
  template,
  scale = 1,
  fluid = false,
}: ProfilePreviewProps) {
  const [rawTemplate, setRawTemplate] = useState<string | null>(null);
  const [compiledHtml, setCompiledHtml] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    fetch("/templates/daniel-cross.html")
      .then((r) => r.text())
      .then(setRawTemplate)
      .catch(() =>
        console.error("[ProfilePreview] Failed to load daniel-cross template"),
      );
  }, []);

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
          srcDoc={
            compiledHtml ||
            "<html><body style='display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#888;font-size:14px'>Loading preview…</body></html>"
          }
          className="w-full border-0"
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
      style={{ width: PREVIEW_W * scale, height: PREVIEW_H * scale }}
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
