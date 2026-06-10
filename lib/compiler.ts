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
<div class="ssr-variant">
  <div class="framer-1kys2js-container" data-framer-name="Work card" name="Work card" style="will-change: transform; opacity: 1; transform: none;">
    <!--$--><a name="Work card" class="framer-cOcSQ framer-x2WlA framer-5K3Le framer-ryc3c framer-v-ryc3c framer-j0rmx6" data-framer-name="Work card" href="${esc(link)}" style="background-color: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); width: 100%; border-radius: 12px; opacity: 1;">
      <div class="framer-z31oie" data-framer-name="Cover image" style="transform: none; opacity: 1;">
        <div style="position:absolute;border-radius:inherit;corner-shape:inherit;top:0;right:0;bottom:0;left:0" data-framer-background-image-wrapper="true">
          <img decoding="auto" src="${esc(resolvedImg)}" alt="" style="display:block;width:100%;height:100%;border-radius:inherit;corner-shape:inherit;object-position:center;object-fit:cover">
        </div>
      </div>
      <div class="framer-fh6ndj" data-framer-name="Linear" style="background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)) 100%); opacity: 1;"></div>
      <div class="framer-1s2w6if" data-framer-name="Text wrapper" style="opacity: 1;">
        <div class="framer-1k4j78w" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
          <h4 class="framer-text framer-styles-preset-qumrh3" data-styles-preset="FLDbgL1a7">${esc(title)}</h4>
        </div>
        <div class="framer-1orth6j" data-framer-name="details" style="opacity:0.8">
          <div class="framer-1wxz9c2" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)))">${esc(category)}</p>
          </div>
          <div class="framer-1prjt4a" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)))">/</p>
          </div>
          <div class="framer-5hs0bj" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)))">${esc(year)}</p>
          </div>
        </div>
      </div>
    </a><!--/$-->
  </div>
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

  return `<!--$--><!--$-->${cards}<!--/$--><!--/$-->`;
}

function replaceWorkWrapperContent(html: string, projectsHtml: string): string {
  const workWrapperStart = 'data-framer-name="work wrapper">';
  const wIdx = html.indexOf(workWrapperStart);
  if (wIdx === -1) return html;

  const contentStart = wIdx + workWrapperStart.length;
  
  let pos = contentStart;
  let depth = 1;
  while (depth > 0 && pos < html.length) {
    const nextOpen = html.indexOf("<div", pos);
    const nextClose = html.indexOf("</div>", pos);
    
    if (nextClose === -1) break;
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }
  
  if (depth === 0) {
    const wrapperEnd = pos - 6;
    return html.substring(0, contentStart) + projectsHtml + html.substring(wrapperEnd);
  }
  
  return html;
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
  // Replace the entire work wrapper content with user's projects (replaces placeholder cards)
  if ((profile.projects || []).length > 0) {
    const projectsHtml = buildProjectsSection(profile);
    html = replaceWorkWrapperContent(html, projectsHtml);
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

  // Reset reviews slider starting translation to 0px so testimonials are visible by default
  html = replaceAll(html, "transform: translateX(-1214px);", "transform: translateX(0px);");

  // ─── 14. Replace avatars and banners ──────────────────────────────────
  if (profile.avatarUrl) {
    html = replaceAll(html, "/templates/daniel-cross/6fz6fw6ZIqdfPnGjg9h6yUfYitE.jpg", esc(profile.avatarUrl));
  }
  const heroPhoto = profile.bannerUrl || profile.avatarUrl;
  if (heroPhoto) {
    html = replaceAll(html, "/templates/daniel-cross/B3sqQm2pBUNJyRcswxM209Q.png", esc(heroPhoto));
  }

  // Add custom responsive stylesheet overrides to prevent absolute width overflows and correctly display hidden variants
  const responsiveStyles = `
<style data-custom-responsive="true">
  /* Base hidden class overrides */
  @media (max-width: 809.98px) {
    .hidden-18pvjnd {
      display: none !important;
    }
    /* Ensure testimonials slideshow variant remains visible */
    .framer-9ivh3c-container .hidden-18pvjnd {
      display: block !important;
    }
  }
  @media (min-width: 810px) and (max-width: 1199.98px) {
    .hidden-1bkts62 {
      display: none !important;
    }
    /* Ensure testimonials slideshow variant remains visible */
    .framer-9ivh3c-container .hidden-1bkts62 {
      display: block !important;
    }
  }

  /* Make containers fluid on screens smaller than desktop (1200px) */
  @media (max-width: 1199.98px) {
    .framer-NYla7.framer-nqzx6h {
      width: 100% !important;
      max-width: 100vw !important;
      overflow-x: hidden !important;
    }
    
    .framer-NYla7 .framer-1qj9dji {
      width: 100% !important;
      max-width: 100% !important;
    }
    
    .framer-NYla7 .framer-11htobf {
      max-width: 100% !important;
    }
    
    .framer-NYla7 .framer-vprhwm {
      width: 100% !important;
      max-width: 100% !important;
      flex: 1 1 auto !important;
    }

    .framer-DKwHu.framer-ha6joy {
      width: 100% !important;
      max-width: 100% !important;
      padding-left: 24px !important;
      padding-right: 24px !important;
    }
    
    .framer-cOcSQ.framer-ryc3c {
      width: 100% !important;
      max-width: 100% !important;
    }
    
    .framer-euNV9.framer-mfpv4s {
      width: 100% !important;
      max-width: 100% !important;
    }
  }

  /* Specific mobile-size adjustments (under 810px) */
  @media (max-width: 809.98px) {
    .framer-50OQE .framer-tfstyy-container {
      width: 100% !important;
      max-width: 100vw !important;
    }
    
    .framer-Cxj9g.framer-v-117swu5.framer-1g4vz55,
    .framer-Cxj9g.framer-v-tlavhy.framer-1g4vz55 {
      width: 100% !important;
      max-width: 100vw !important;
    }

    .framer-DKwHu.framer-v-1qhzu7s.framer-ha6joy {
      width: 100% !important;
      max-width: 100% !important;
      padding-left: 16px !important;
      padding-right: 16px !important;
    }

    .framer-DKwHu .framer-1bh76c {
      padding: 40px 16px !important;
    }
  }
</style>
`;
  html = html.replace("</head>", `${responsiveStyles}</head>`);

  return html;
}
