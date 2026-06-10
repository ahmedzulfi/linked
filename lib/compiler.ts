import { ProfileData, TemplateId } from "@/shared/types";
import * as fs from "fs";
import * as path from "path";

// ═══════════════════════════════════════════════════════════════════
// Design tokens extracted from Daniel Cross Framer template
// ═══════════════════════════════════════════════════════════════════
const DC = {
  brown: "#4a3429", // --token-09c1722d (accent / logo)
  black: "#000", // --token-5b7978f2 (primary text)
  divider: "#0000001a", // --token-d14b4603 (borders)
  muted: "#757575", // --token-13ef338a (secondary text)
  white: "#fff", // --token-594aa502
  card2: "#e5e2de", // --token-af0bccb2
  bg: "#e9e6e2", // --token-d469a4a3 (main bg)
  sidebar: "#edeae7", // --token-1f466c1a (sidebar bg)
  card: "#f5f2f0", // --token-1d129b27 (card bg)
  font: "'Inter', sans-serif",
  radius: "12px",
  radiusSm: "8px",
};

// ═══════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function replaceAll(text: string, search: string, replacement: string): string {
  return text.split(search).join(replacement);
}

// ═══════════════════════════════════════════════════════════════════
// Link-intercept script injected into the <head>
// Fixes: clicking links inside the iframe loading the Next.js app
// ═══════════════════════════════════════════════════════════════════
const LINK_INTERCEPT_SCRIPT = `
<script>
(function() {
  function interceptLinks() {
    document.addEventListener('click', function(e) {
      var a = e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href === '' || href === 'javascript:void(0)') return;
      // Hash-only links → smooth scroll within this document
      if (href.startsWith('#')) {
        e.preventDefault();
        var id = href.slice(1);
        var el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      // All other links → prevent iframe navigation, open in parent/new tab
      e.preventDefault();
      try { window.top.open(href, '_blank'); } catch(err) { window.open(href, '_blank'); }
    }, true);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', interceptLinks);
  } else {
    interceptLinks();
  }
})();
</script>`;

// ═══════════════════════════════════════════════════════════════════
// Section builders — match Daniel Cross aesthetic exactly
// ═══════════════════════════════════════════════════════════════════

function buildAboutSection(profile: ProfileData): string {
  const skills = (profile.skills || [])
    .map(
      (s) =>
        `<span style="display:inline-block;padding:6px 14px;background:${DC.card};border-radius:20px;font-family:${DC.font};font-size:13px;font-weight:500;color:${DC.black};letter-spacing:-0.02em;margin:4px 4px 4px 0;">${esc(s.name)}</span>`,
    )
    .join("");

  const experience = (profile.experience || [])
    .map(
      (exp, i) => `
    <div style="display:flex;gap:20px;padding:20px 0;${i > 0 ? `border-top:1px solid ${DC.divider};` : ""}">
      <div style="flex-shrink:0;width:40px;height:40px;border-radius:10px;background:${DC.card2};display:flex;align-items:center;justify-content:center;font-family:${DC.font};font-size:13px;font-weight:700;color:${DC.brown};">
        ${esc(exp.company.charAt(0))}
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-family:${DC.font};font-size:15px;font-weight:600;color:${DC.black};letter-spacing:-0.03em;margin-bottom:2px;">${esc(exp.title)}</div>
        <div style="font-family:${DC.font};font-size:13px;font-weight:500;color:${DC.muted};letter-spacing:-0.02em;margin-bottom:4px;">${esc(exp.company)} · ${esc(exp.duration)}</div>
        <div style="font-family:${DC.font};font-size:13px;color:${DC.muted};line-height:1.6;">${esc(exp.description)}</div>
      </div>
    </div>
  `,
    )
    .join("");

  const education = (profile.education || [])
    .map(
      (edu, i) => `
    <div style="display:flex;gap:20px;padding:20px 0;${i > 0 ? `border-top:1px solid ${DC.divider};` : ""}">
      <div style="flex-shrink:0;width:40px;height:40px;border-radius:10px;background:${DC.card2};display:flex;align-items:center;justify-content:center;font-family:${DC.font};font-size:13px;font-weight:700;color:${DC.brown};">
        ${esc(edu.school.charAt(0))}
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-family:${DC.font};font-size:15px;font-weight:600;color:${DC.black};letter-spacing:-0.03em;margin-bottom:2px;">${esc(edu.degree)}</div>
        <div style="font-family:${DC.font};font-size:13px;color:${DC.muted};letter-spacing:-0.02em;">${esc(edu.school)} · ${esc(edu.year)}</div>
      </div>
    </div>
  `,
    )
    .join("");

  const avatarSrc =
    profile.avatarUrl ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile.name)}`;

  return `
<section id="about" style="min-height:100vh;background:${DC.bg};padding:60px 48px 80px 48px;box-sizing:border-box;">
  <!-- Section header -->
  <div style="margin-bottom:48px;">
    <span style="font-family:${DC.font};font-size:11px;font-weight:600;color:${DC.brown};text-transform:uppercase;letter-spacing:0.1em;">About</span>
    <h2 style="font-family:${DC.font};font-size:40px;font-weight:700;color:${DC.black};letter-spacing:-0.04em;margin-top:8px;line-height:1.1;">Get to know me</h2>
  </div>

  <!-- Hero card -->
  <div style="background:${DC.card};border-radius:${DC.radius};padding:32px;display:flex;gap:32px;align-items:flex-start;margin-bottom:32px;flex-wrap:wrap;">
    <img src="${esc(avatarSrc)}" alt="${esc(profile.name)}" 
      style="width:120px;height:120px;border-radius:60px;object-fit:cover;flex-shrink:0;background:${DC.card2};"
      onerror="this.src='https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile.name)}'">
    <div style="flex:1;min-width:200px;">
      <h3 style="font-family:${DC.font};font-size:24px;font-weight:700;color:${DC.black};letter-spacing:-0.04em;margin-bottom:6px;">${esc(profile.name)}</h3>
      <p style="font-family:${DC.font};font-size:14px;font-weight:500;color:${DC.muted};margin-bottom:16px;letter-spacing:-0.02em;">${esc(profile.headline)}</p>
      <p style="font-family:${DC.font};font-size:14px;color:${DC.black};line-height:1.7;opacity:0.8;max-width:560px;">${esc(profile.summary)}</p>
    </div>
  </div>

  <!-- Skills -->
  ${
    skills
      ? `
  <div style="background:${DC.card};border-radius:${DC.radius};padding:28px;margin-bottom:28px;">
    <h4 style="font-family:${DC.font};font-size:13px;font-weight:600;color:${DC.muted};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:16px;">Skills</h4>
    <div style="display:flex;flex-wrap:wrap;gap:0;">${skills}</div>
  </div>`
      : ""
  }

  <!-- Experience -->
  ${
    experience
      ? `
  <div style="background:${DC.card};border-radius:${DC.radius};padding:28px 28px 8px 28px;margin-bottom:28px;">
    <h4 style="font-family:${DC.font};font-size:13px;font-weight:600;color:${DC.muted};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Experience</h4>
    ${experience}
  </div>`
      : ""
  }

  <!-- Education -->
  ${
    education
      ? `
  <div style="background:${DC.card};border-radius:${DC.radius};padding:28px 28px 8px 28px;">
    <h4 style="font-family:${DC.font};font-size:13px;font-weight:600;color:${DC.muted};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Education</h4>
    ${education}
  </div>`
      : ""
  }
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
            const href = p.link || "#";
            const year = new Date().getFullYear().toString();
            return `
    <a href="${esc(href)}" style="display:block;border-radius:${DC.radius};overflow:hidden;text-decoration:none;background:${DC.white};position:relative;aspect-ratio:4/3;">
      <img src="${esc(img)}" alt="${esc(p.title)}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.4s ease;"
        onerror="this.style.background='${DC.card2}';this.style.display='block';">
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,0.85) 100%);"></div>
      <div style="position:absolute;bottom:0;left:0;right:0;padding:20px 24px;">
        <h3 style="font-family:${DC.font};font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.03em;margin-bottom:6px;">${esc(p.title)}</h3>
        <div style="display:flex;gap:8px;align-items:center;">
          <span style="font-family:${DC.font};font-size:13px;color:rgba(255,255,255,0.75);">${esc(p.description.substring(0, 60))}${p.description.length > 60 ? "…" : ""}</span>
          <span style="color:rgba(255,255,255,0.4);">·</span>
          <span style="font-family:${DC.font};font-size:13px;color:rgba(255,255,255,0.75);">${year}</span>
        </div>
      </div>
    </a>`;
          })
          .join("")
      : `
  <div style="grid-column:1/-1;padding:60px;text-align:center;background:${DC.card};border-radius:${DC.radius};">
    <p style="font-family:${DC.font};font-size:16px;color:${DC.muted};">No projects added yet. Add some in the editor!</p>
  </div>`;

  return `
<section id="work" style="min-height:100vh;background:${DC.bg};padding:60px 48px 80px 48px;box-sizing:border-box;">
  <!-- Section header -->
  <div style="margin-bottom:48px;">
    <span style="font-family:${DC.font};font-size:11px;font-weight:600;color:${DC.brown};text-transform:uppercase;letter-spacing:0.1em;">Work</span>
    <h2 style="font-family:${DC.font};font-size:40px;font-weight:700;color:${DC.black};letter-spacing:-0.04em;margin-top:8px;line-height:1.1;">Selected projects</h2>
  </div>

  <!-- Projects grid -->
  <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;">
    ${cards}
  </div>
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

  const contactItems = [
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
  ].filter((item) => item.value);

  const socialItems = [
    { name: "LinkedIn", url: linksByIcon.linkedin || profile.linkedinUrl },
    { name: "Twitter / X", url: linksByIcon.twitter },
    { name: "GitHub", url: linksByIcon.github },
    { name: "Website", url: linksByIcon.website },
  ].filter((item) => item.url && item.url !== "#");

  const contactCards = contactItems
    .map(
      (item) => `
    <a href="${esc(item.href!)}" style="display:flex;align-items:center;gap:16px;background:${DC.card};border-radius:${DC.radius};padding:20px 24px;text-decoration:none;transition:background 0.2s;">
      <span style="font-size:20px;line-height:1;">${item.icon}</span>
      <div>
        <div style="font-family:${DC.font};font-size:11px;font-weight:600;color:${DC.muted};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;">${item.label}</div>
        <div style="font-family:${DC.font};font-size:15px;font-weight:500;color:${DC.black};letter-spacing:-0.02em;">${esc(item.value)}</div>
      </div>
    </a>
  `,
    )
    .join("");

  const socialLinks = socialItems
    .map(
      (item) => `
    <a href="${esc(item.url)}" target="_blank" rel="noopener"
      style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px;background:${DC.card};border-radius:${DC.radiusSm};text-decoration:none;">
      <span style="font-family:${DC.font};font-size:14px;font-weight:500;color:${DC.black};letter-spacing:-0.02em;">${item.name}</span>
      <span style="font-family:${DC.font};font-size:18px;color:${DC.muted};">↗</span>
    </a>
  `,
    )
    .join("");

  return `
<section id="contact" style="min-height:80vh;background:${DC.sidebar};padding:60px 48px 80px 48px;box-sizing:border-box;">
  <!-- Section header -->
  <div style="margin-bottom:48px;">
    <span style="font-family:${DC.font};font-size:11px;font-weight:600;color:${DC.brown};text-transform:uppercase;letter-spacing:0.1em;">Contact</span>
    <h2 style="font-family:${DC.font};font-size:40px;font-weight:700;color:${DC.black};letter-spacing:-0.04em;margin-top:8px;line-height:1.1;">Let's work together</h2>
    <p style="font-family:${DC.font};font-size:16px;color:${DC.muted};margin-top:12px;line-height:1.6;max-width:480px;">Have a project in mind or want to collaborate? I'd love to hear from you.</p>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:800px;">
    <!-- Contact details -->
    <div style="display:flex;flex-direction:column;gap:12px;">
      <h3 style="font-family:${DC.font};font-size:13px;font-weight:600;color:${DC.muted};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Get in Touch</h3>
      ${contactCards || `<p style="font-family:${DC.font};font-size:14px;color:${DC.muted};">No contact details added yet.</p>`}
    </div>
    
    <!-- Social links -->
    ${
      socialLinks
        ? `
    <div>
      <h3 style="font-family:${DC.font};font-size:13px;font-weight:600;color:${DC.muted};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:16px;">Follow Me</h3>
      <div style="display:flex;flex-direction:column;gap:8px;">${socialLinks}</div>
    </div>`
        : ""
    }
  </div>
</section>`;
}

// ═══════════════════════════════════════════════════════════════════
// Main compiler
// ═══════════════════════════════════════════════════════════════════
export function compileStaticHtml(
  profile: ProfileData,
  _templateId: TemplateId,
): string {
  const templatePath = path.join(
    process.cwd(),
    "public",
    "templates",
    "daniel-cross.html",
  );
  let html = fs.readFileSync(templatePath, "utf-8");

  // ─── 1. Fix asset URLs ──────────────────────────────────────────
  html = replaceAll(
    html,
    "./Danielcross - Personal Portfolio Framer Template_files/",
    "/templates/daniel-cross/",
  );

  // ─── 2. Fix internal navigation links → hash anchors ───────────
  // Links left unmodified so they are caught by intercept script and open in a new tab

  // ─── 3. Inject link-intercept script into <head> ───────────────
  html = html.replace("</head>", LINK_INTERCEPT_SCRIPT + "\n</head>");

  // ─── 4. SEO / page title ───────────────────────────────────────
  const pageTitle = `${profile.name} - Portfolio`;
  html = replaceAll(
    html,
    "Danielcross - Personal Portfolio Framer Template",
    esc(pageTitle),
  );

  // Fix canonical
  html = replaceAll(
    html,
    'href="https://danielcross.framer.website/"',
    'href="#"',
  );

  // ─── 5. Sidebar name ────────────────────────────────────────────
  html = replaceAll(html, ">Daniel Cross<", `>${esc(profile.name)}<`);

  // ─── 6. Sidebar role ────────────────────────────────────────────
  html = replaceAll(html, ">ui/ux designer<", `>${esc(profile.headline)}<`);

  // ─── 7. Hero first name ─────────────────────────────────────────
  const firstName = profile.name.split(" ")[0].toLowerCase();
  html = replaceAll(html, ">daniel<", `>${esc(firstName)}<`);

  // ─── 8. About bio paragraph ─────────────────────────────────────
  html = replaceAll(
    html,
    "I'm Daniel Cross, a passionate UI/UX Designer dedicated to crafting digital experiences that truly connect with people. With a focus on simplicity, usability, and creativity, I design products that not only look beautiful but also solve real problems. My approach blends strategy, design, and technology to transform ideas into meaningful solutions. Whether it's designing intuitive interfaces, building websites, or shaping brand identities, I bring every project to life with precision and purpose.",
    esc(profile.summary),
  );

  // ─── 9. Location ────────────────────────────────────────────────
  const location = profile.location || "Remote";
  html = replaceAll(
    html,
    ">Based in London-UK<",
    `>Based in ${esc(location)}<`,
  );
  html = replaceAll(html, ">London-UK<", `>${esc(location)}<`);
  html = replaceAll(
    html,
    'href="https://www.google.com/maps/place/45+Westwood+Ave,+Ellenville,+NY+12428,+USA/@41.7197902,-74.4073192,17z/data=!3m1!4b1!4m6!3m5!1s0x89dcdcab387f0725:0xa47e5e118528587f!8m2!3d41.7197862!4d-74.4047443!16s%2Fg%2F11c4w_9k9y?entry=ttu&amp;g_ep=EgoyMDI1MDUxMS4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"',
    `href="https://maps.google.com?q=${encodeURIComponent(location)}"`,
  );

  // ─── 10. Email ──────────────────────────────────────────────────
  const emailLink = profile.links.find((l) => l.icon === "email");
  const email = emailLink ? emailLink.url.replace("mailto:", "") : "";
  if (email) {
    html = replaceAll(
      html,
      'href="mailto:hello@gmail.com"',
      `href="mailto:${esc(email)}"`,
    );
    html = replaceAll(html, ">hello@gmail.com<", `>${esc(email)}<`);
  }

  // Phone
  const phone = profile.phone || "";
  html = replaceAll(
    html,
    'href="tel:+44 7700 900123"',
    phone ? `href="tel:${esc(phone)}"` : 'href="#"',
  );
  html = replaceAll(
    html,
    ">+44 7700 900123<",
    phone ? `>${esc(phone)}<` : `>${esc(location)}<`,
  );

  // ─── 11. Social link hrefs ──────────────────────────────────────
  const linksByIcon: Record<string, string> = {};
  for (const l of profile.links) {
    if (l.icon) linksByIcon[l.icon] = l.url;
  }
  if (linksByIcon.linkedin)
    html = replaceAll(
      html,
      'href="https://www.linkedin.com/"',
      `href="${esc(linksByIcon.linkedin)}"`,
    );
  if (linksByIcon.twitter)
    html = replaceAll(
      html,
      'href="https://x.com/"',
      `href="${esc(linksByIcon.twitter)}"`,
    );

  // ─── 12. Add id="home" to the root wrapper ──────────────────────
  html = html.replace('<main class="', '<main id="home" class="');

  // ─── 13. Remove Framer badge ────────────────────────────────────
  html = html.replace(/<div id="__framer-badge-container"[\s\S]*?<\/div>/g, "");

  // ─── 14. Append About, Work, Contact sections before </body> ────
  // Removed to preserve original template layout exactly

  return html;
}
