import { ProfileData, TemplateId } from "@/shared/types";
import * as fs from "fs";
import * as path from "path";

// ── Helpers ─────────────────────────────────────────────────────────────────

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Replace ALL occurrences of `search` with `replacement` in `text`.
 */
function replaceAll(text: string, search: string, replacement: string): string {
  return text.split(search).join(replacement);
}

/**
 * Generate the HTML for a single project card in the Daniel Cross style.
 * This mimics the Framer "Work card" structure.
 */
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

/**
 * Generate the "work wrapper" HTML from the user's projects.
 * Replaces the entire framer-3ruzuo section content.
 */
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

/**
 * Build the experience ticker (companies) for the "Worked with Global Brands" section.
 */
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

/**
 * Build the about me paragraph.
 */
function buildAboutMe(profile: ProfileData): string {
  return esc(
    `${profile.summary} ${profile.interests ? `Interests: ${profile.interests}` : ""}`.trim()
  );
}

/**
 * Build the hero "I'm a [headline]..." text.
 */
function buildHeroBio(profile: ProfileData): string {
  return esc(profile.summary);
}

/**
 * Build social links HTML for the sidebar.
 */
function buildSocialLinks(profile: ProfileData): string {
  const linkMap: Record<string, string> = {};
  for (const l of profile.links) {
    const icon = l.icon || "website";
    linkMap[icon] = l.url;
  }

  return [
    { name: "LinkedIn", icon: "linkedin", url: linkMap.linkedin || profile.linkedinUrl || "#" },
    { name: "Twitter-X", icon: "twitter", url: linkMap.twitter || "#" },
    { name: "GitHub", icon: "github", url: linkMap.github || "#" },
    { name: "Website", icon: "website", url: linkMap.website || "#" },
  ]
    .filter((l) => l.url !== "#" || l.name === "LinkedIn")
    .map(
      (l) =>
        `<div style="padding:4px 0;"><a href="${esc(l.url)}" target="_blank" rel="noopener" style="font-family:'Inter Display',sans-serif;font-size:13px;font-weight:500;color:#333;text-decoration:none;letter-spacing:-0.04em;">${esc(l.name)}</a></div>`
    )
    .join("");
}

// ── Main compiler ────────────────────────────────────────────────────────────

export function compileStaticHtml(profile: ProfileData, _templateId: TemplateId): string {
  // Read the original Framer template HTML
  const templatePath = path.join(process.cwd(), "public", "templates", "daniel-cross.html");
  let html = fs.readFileSync(templatePath, "utf-8");

  // ─── 1. Fix all asset URLs ─────────────────────────────────────────────
  // The template uses relative paths to a local _files folder.
  // We remap them to our /templates/daniel-cross/ public URL.
  html = replaceAll(
    html,
    "./Danielcross - Personal Portfolio Framer Template_files/",
    "/templates/daniel-cross/"
  );

  // ─── 2. Fix all internal framer website links ─────────────────────────
  // Replace internal Framer navigation links with # to avoid broken nav
  html = replaceAll(html, "https://danielcross.framer.website/", "#");
  html = replaceAll(html, "https://danielcross.framer.website/about", "#about");
  html = replaceAll(html, "https://danielcross.framer.website/work", "#work");
  html = replaceAll(html, "https://danielcross.framer.website/contact", "#contact");

  // ─── 3. Update page title & SEO meta ──────────────────────────────────
  const pageTitle = `${profile.name} - Portfolio`;
  html = replaceAll(
    html,
    "Danielcross - Personal Portfolio Framer Template",
    esc(pageTitle)
  );
  html = replaceAll(
    html,
    "Daniel Cross is a modern portfolio template for Framer, crafted for UI/UX designers and creatives. Sleek, professional, and fully customizable — ideal for showcas",
    esc(profile.summary.substring(0, 150))
  );

  // ─── 4. Sidebar name (logo link text) ─────────────────────────────────
  // "Daniel Cross" in sidebar logo area
  html = replaceAll(html, ">Daniel Cross<", `>${esc(profile.name)}<`);

  // ─── 5. Sidebar role ──────────────────────────────────────────────────
  html = replaceAll(html, ">ui/ux designer<", `>${esc(profile.headline)}<`);

  // ─── 6. Hero headline (first name on h1) ──────────────────────────────
  // The template has "Hey,\ndaniel\nhere" split across multiple h1 elements
  const firstName = profile.name.split(" ")[0].toLowerCase();
  html = replaceAll(html, ">daniel<", `>${esc(firstName)}<`);

  // ─── 7. Hero bio paragraph ────────────────────────────────────────────
  html = replaceAll(
    html,
    "I'm Daniel Cross, a passionate UI/UX Designer dedicated to crafting digital experiences that truly connect with people. With a focus on simplicity, usability, and creativity, I design products that not only look beautiful but also solve real problems. My approach blends strategy, design, and technology to transform ideas into meaningful solutions. Whether it's designing intuitive interfaces, building websites, or shaping brand identities, I bring every project to life with precision and purpose.",
    esc(profile.summary)
  );

  // ─── 8. Location (sidebar & footer) ───────────────────────────────────
  const location = profile.location || "Remote";
  html = replaceAll(html, ">Based in London-UK<", `>Based in ${esc(location)}<`);
  html = replaceAll(html, ">London-UK<", `>${esc(location)}<`);

  // Fix footer location map href
  html = replaceAll(
    html,
    'href="https://www.google.com/maps/place/45+Westwood+Ave,+Ellenville,+NY+12428,+USA/@41.7197902,-74.4073192,17z/data=!3m1!4b1!4m6!3m5!1s0x89dcdcab387f0725:0xa47e5e118528587f!8m2!3d41.7197862!4d-74.4047443!16s%2Fg%2F11c4w_9k9y?entry=ttu&amp;g_ep=EgoyMDI1MDUxMS4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"',
    `href="https://maps.google.com?q=${encodeURIComponent(location)}"`
  );

  // ─── 9. Footer contact details ────────────────────────────────────────
  // Email
  const emailLink = profile.links.find((l) => l.icon === "email");
  const email = emailLink ? emailLink.url.replace("mailto:", "") : "hello@example.com";
  html = replaceAll(html, 'href="mailto:hello@gmail.com"', `href="mailto:${esc(email)}"`);
  html = replaceAll(html, ">hello@gmail.com<", `>${esc(email)}<`);

  // Phone — remove or replace
  const phoneLinkIdx = html.indexOf('href="tel:+44 7700 900123"');
  if (phoneLinkIdx !== -1) {
    html = replaceAll(html, 'href="tel:+44 7700 900123"', 'href="#"');
    html = replaceAll(html, ">+44 7700 900123<", `>${esc(location)}<`);
  }

  // ─── 10. Projects / Work cards section ────────────────────────────────
  // Replace the entire work wrapper content with user's projects
  const workWrapperStart = 'data-framer-name="work wrapper">';
  const workWrapperEnd = '</section>';
  const wIdx = html.indexOf(workWrapperStart);
  
  if (wIdx !== -1 && (profile.projects || []).length > 0) {
    // Find the range: from after work wrapper open tag to the Explore All button section
    const contentStart = wIdx + workWrapperStart.length;
    // Find the section close tag that ends the projects section
    const projectsSection = html.indexOf('data-framer-name="Projects"');
    if (projectsSection !== -1) {
      // Replace the projects/work section
      const projectsHtml = buildProjectsSection(profile);
      const EXPLORE_MARKER = '<!--$--></div></div><!-/$--></div></section>';
      const exploreIdx = html.indexOf('data-framer-name="Text wraooer"'); // typo in Framer
      if (exploreIdx !== -1) {
        const sectionEndClose = html.lastIndexOf('</section>', exploreIdx);
        if (sectionEndClose !== -1) {
          // We'll inject a marker and do a targeted replace
          const OLD_WORK_WRAPPER_SECTION = html.substring(wIdx, wIdx + workWrapperStart.length);
          // Just append our HTML after the wrapper open tag marker
          html = html.substring(0, contentStart) + projectsHtml + html.substring(contentStart);
        }
      }
    }
  }

  // ─── 11. Brands ticker section ─────────────────────────────────────────
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

  // ─── 12. Social links in sidebar (hrefs) ──────────────────────────────
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
  if (linksByIcon.github) {
    html = replaceAll(html, 'href="https://www.instagram.com/"', `href="${esc(linksByIcon.github)}"`);
  }

  // ─── 13. Remove Framer badge ──────────────────────────────────────────
  html = html.replace(/<div id="__framer-badge-container"[\s\S]*?<\/div>/g, "");

  // ─── 14. Replace avatars and banners ──────────────────────────────────
  if (profile.avatarUrl) {
    html = replaceAll(html, "/templates/daniel-cross/6fz6fw6ZIqdfPnGjg9h6yUfYitE.jpg", esc(profile.avatarUrl));
  }
  const heroPhoto = profile.bannerUrl || profile.avatarUrl;
  if (heroPhoto) {
    html = replaceAll(html, "/templates/daniel-cross/B3sqQm2pBUNJyRcswxM209Q.png", esc(heroPhoto));
  }

  return html;
}
