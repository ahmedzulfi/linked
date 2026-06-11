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

// ── Customization Defaults & Builders ────────────────────────────────────────

const DEFAULT_SERVICES = [
  { title: "Web design", price: "$1200", description: "I create visually appealing, responsive websites with clean layouts, ensuring engaging user experiences and professional digital presence." },
  { title: "UI/UX Design", price: "$1500", description: "I design intuitive user interfaces and seamless experiences, focusing on usability, accessibility, and modern aesthetics to improve user satisfaction." },
  { title: "Framer Development", price: "$1300", description: "I build interactive, high-performing websites in Framer, smooth animations, & fully responsive layouts tailored to your brand." },
  { title: "Mobile App Design", price: "$1600", description: "I design user mobile applications with functional layouts, engaging visuals, & optimized experiences for both iOS & Android platforms." },
  { title: "Branding & Identity", price: "$1000", description: "I craft unique brand identities including logos, typography, & guidelines, helping businesses stand out with consistency & strong visual presence." }
];

const DEFAULT_SERVICES_CTA = {
  title: "Book A 30 min Free Call",
  text: "Let’s connect to discuss your design needs, explore creative ideas, and plan your project effectively together.",
  buttonText: "Book A Call",
  buttonUrl: "#contact"
};

const DEFAULT_PROCESSES = [
  { stepTag: "/01", title: "Creative Discovery", description: "Through research and collaboration, we uncover goals, audience needs, and brand vision to build a solid creative foundation." },
  { stepTag: "/02", title: "Design Blueprint", description: "Transforming insights into structured wireframes and prototypes that guide visuals, user experience, and brand alignment seamlessly." },
  { stepTag: "/03", title: "Delivery & Launch", description: "Executing development and refined animations, ensuring cross-platform testing, and launching a high-performance experience." }
];

const DEFAULT_TESTIMONIALS = [
  { quote: "Daniel transformed our digital presence with stunning design and seamless usability. Working with him was a complete delight.", name: "James Walker", role: "Marketing Director, BrightEdge", avatarUrl: "/templates/daniel-cross/3R6WpHw2pAWlgNTDtMQICmJ9as.png" },
  { quote: "Professional, creative, & highly reliable. he delivered designs that exceeded expectations & strengthened our brand identity across platforms.", name: "Emily Harris", role: "Product Manager, Nexora", avatarUrl: "/templates/daniel-cross/6GdVor1G40eyD13tSRQ8IzSBQ.png" },
  { quote: "His attention to detail and ability to capture our vision in design made the entire process effortless, inspiring, and memorable.", name: "Oliver Bennett", role: "CEO, Innovent Solutions", avatarUrl: "/templates/daniel-cross/0gmxJBiUekQL1gjvN4nDfGCVIRE.webp" }
];

function buildServicesSection(profile: ProfileData): string {
  const services = profile.services && profile.services.length > 0 ? profile.services : DEFAULT_SERVICES;
  const cta = profile.servicesCta || DEFAULT_SERVICES_CTA;

  const cards = services.map((s) => `
<div class="ssr-variant">
  <div class="framer-1pxl5gq-container" data-framer-name="Service card" name="Service card" style="will-change: transform; opacity: 1; transform: none;">
    <div name="Service card" class="framer-VzKJz framer-jF71g framer-7fvNa framer-6tapR framer-1e9a2dx framer-v-1e9a2dx" data-framer-name="Service card" style="background-color: var(--token-1f466c1a-ea57-4ca6-b62a-278c9a994c3b, rgb(237, 234, 231)); width: 100%; border-radius: 10px; opacity: 1;">
      <div class="framer-1gbvodd" data-framer-name="Top text" style="opacity: 1;">
        <div class="framer-mkogse" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
          <p class="framer-text framer-styles-preset-tupu2d" data-styles-preset="gDmw1PFmz" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)))">${esc(s.title)}</p>
        </div>
        <div class="framer-12mw7zf" data-framer-name="Price tag" style="background-color: var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, rgb(74, 52, 41)); border-radius: 999px; opacity: 1;">
          <div class="framer-1opeho9" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-1nhui24" data-styles-preset="IfUNq__y7" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)))">${esc(s.price)}</p>
          </div>
        </div>
      </div>
      <div class="framer-18fafw1" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
        <p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm">${esc(s.description)}</p>
      </div>
    </div>
  </div>
</div>`).join("\n");

  const ctaCard = `
<div class="framer-qz5mfl" data-framer-name="Services Contact card" style="will-change: transform; opacity: 1; transform: none;">
  <div class="framer-1pi5p4y" data-framer-name="Text wrapper">
    <div class="framer-z96g2q" data-framer-component-type="RichTextContainer" style="transform:none">
      <p class="framer-text framer-styles-preset-tupu2d" data-styles-preset="gDmw1PFmz">${esc(cta.title)}</p>
    </div>
    <div class="framer-pj0lb2" data-framer-component-type="RichTextContainer" style="transform:none">
      <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255))">${esc(cta.text)}</p>
    </div>
  </div>
  <!--$--><div class="ssr-variant"><div class="framer-qryzno-container" data-framer-name="Button" name="Button"><!--$--><a name="Button" class="framer-w0cQM framer-6tapR framer-12hwi5v framer-v-17sj5po framer-18lqbhu" data-framer-name="White" href="${esc(cta.buttonUrl || "#contact")}" style="background-color: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); width: 100%; border-radius: 6px; opacity: 1;"><div class="framer-1cl53n9" data-framer-name="Text" style="opacity: 1;"><div class="framer-1icur2i" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, rgb(74, 52, 41)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"><p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, rgb(74, 52, 41)))">${esc(cta.buttonText)}</p></div><div class="framer-dhttw8" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, rgb(74, 52, 41)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"><p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, rgb(74, 52, 41)))">${esc(cta.buttonText)}</p></div></div></a><!--/$--></div></div><!--/$-->
</div>`;

  return `<!--$--><!--$-->${cards}\n${ctaCard}<!--/$--><!--/$-->`;
}

function replaceServicesGridContent(html: string, servicesHtml: string): string {
  const marker = 'data-framer-name="Grid 3x">';
  const sIdx = html.indexOf(marker);
  if (sIdx === -1) return html;

  const contentStart = sIdx + marker.length;
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
    return html.substring(0, contentStart) + servicesHtml + html.substring(wrapperEnd);
  }

  return html;
}

function buildProcessStepsSection(profile: ProfileData): string {
  const steps = profile.processes && profile.processes.length > 0 ? profile.processes : DEFAULT_PROCESSES;

  const cards = steps.map((s, idx) => {
    const stepName = `Step 0${idx + 1}`;
    return `
<div class="ssr-variant">
  <div class="framer-h03gyd-container" data-framer-name="${esc(stepName)}" name="${esc(stepName)}" style="will-change: transform; opacity: 1; transform: none;">
    <div name="${esc(stepName)}" class="framer-euNV9 framer-jF71g framer-7fvNa framer-6tapR framer-mfpv4s framer-v-mfpv4s" data-border="true" data-framer-name="Process step" style="--1og3yzz: 0px 0px 24px 0px; --border-bottom-width: 1px; --border-color: var(--token-d14b4603-7c19-4eb1-a2c4-11c0d954f027, rgba(0, 0, 0, 0.1)); --border-left-width: 0px; --border-right-width: 0px; --border-style: solid; --border-top-width: 0px; width: 100%; opacity: 1;">
      <div class="framer-k69a0f" data-framer-name="Top text" style="opacity: 1;">
        <div class="framer-evo9ii" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
          <p class="framer-text framer-styles-preset-tupu2d" data-styles-preset="gDmw1PFmz" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)))">${esc(s.title)}</p>
        </div>
        <div class="framer-r79wk8" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
          <p class="framer-text framer-styles-preset-1nhui24" data-styles-preset="IfUNq__y7">${esc(s.stepTag)}</p>
        </div>
      </div>
      <div class="framer-dbu4a4" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
        <p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm">${esc(s.description)}</p>
      </div>
    </div>
  </div>
</div>`;
  }).join("\n");

  return `<!--$--><!--$-->${cards}<!--/$--><!--/$-->`;
}

function replaceProcessStepsContent(html: string, processHtml: string): string {
  const marker = 'data-framer-name="Process steps">';
  const pIdx = html.indexOf(marker);
  if (pIdx === -1) return html;

  const contentStart = pIdx + marker.length;
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
    return html.substring(0, contentStart) + processHtml + html.substring(wrapperEnd);
  }

  return html;
}

function buildTestimonialsSection(profile: ProfileData): string {
  const testimonials = profile.testimonials && profile.testimonials.length > 0 ? profile.testimonials : DEFAULT_TESTIMONIALS;

  const cards = testimonials.map((t, idx) => {
    const defaultAvatars = [
      "/templates/daniel-cross/3R6WpHw2pAWlgNTDtMQICmJ9as.png",
      "/templates/daniel-cross/6GdVor1G40eyD13tSRQ8IzSBQ.png",
      "/templates/daniel-cross/0gmxJBiUekQL1gjvN4nDfGCVIRE.webp"
    ];
    const resolvedAvatar = t.avatarUrl || defaultAvatars[idx % 3];

    return `
<li style="display: contents;">
  <div class="framer-esrupl-container" data-framer-name="Reviews card" name="Reviews card" style="flex-shrink: 0; user-select: none; width: calc(33.3333% - 9.33333px); height: 100%; opacity: 1; visibility: visible; transform: none; transform-origin: 100% 50% 0px;" aria-hidden="true">
    <div name="Reviews card" class="framer-KjIJu framer-6tapR framer-5K3Le framer-ufx0vo framer-v-ufx0vo" data-framer-name="Reviews card" style="background-color: var(--token-1f466c1a-ea57-4ca6-b62a-278c9a994c3b, rgb(237, 234, 231)); width: 100%; border-radius: 16px; opacity: 1;">
      <div class="framer-1uws27r" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
        <p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm">${esc(t.quote)}</p>
      </div>
      <div class="framer-17i8f2v" data-framer-name="User wrapper" style="opacity: 1;">
        <div class="framer-2c4g0l" data-framer-name="Profile image" style="border-radius: 999px; opacity: 1;">
          <div style="position:absolute;border-radius:inherit;corner-shape:inherit;top:0;right:0;bottom:0;left:0" data-framer-background-image-wrapper="true">
            <img decoding="auto" src="${esc(resolvedAvatar)}" alt="" style="display:block;width:100%;height:100%;border-radius:inherit;corner-shape:inherit;object-position:center;object-fit:cover">
          </div>
        </div>
        <div class="framer-w6er8w" data-framer-name="Text" style="opacity: 1;">
          <div class="framer-dn64y5" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-3x8l3o" data-styles-preset="AtQJknSmm" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)))">${esc(t.name)}</p>
          </div>
          <div class="framer-t1h63y" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-13ef338a-a018-4b90-9b3e-7bf1136daf34, rgb(138, 138, 138)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
            <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-13ef338a-a018-4b90-9b3e-7bf1136daf34, rgb(138, 138, 138)))">${esc(t.role)}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</li>`;
  }).join("\n");

  return cards;
}

function replaceTestimonialsContent(html: string, testimonialsHtml: string): string {
  const marker = 'transform: translateX(-1214px);">';
  const tIdx = html.indexOf(marker);
  if (tIdx === -1) {
    const marker2 = 'transform: translateX(0px);">';
    const t2Idx = html.indexOf(marker2);
    if (t2Idx === -1) return html;
    
    const contentStart = t2Idx + marker2.length;
    const listEnd = html.indexOf("</ul>", contentStart);
    if (listEnd !== -1) {
      return html.substring(0, contentStart) + testimonialsHtml + html.substring(listEnd);
    }
    return html;
  }

  const contentStart = tIdx + marker.length;
  const listEnd = html.indexOf("</ul>", contentStart);
  if (listEnd !== -1) {
    return html.substring(0, contentStart) + testimonialsHtml + html.substring(listEnd);
  }
  return html;
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

  // Replace custom section titles if provided
  if (profile.servicesTitle) {
    html = replaceAll(html, ">Turning ideas into digital experiences<", `>${esc(profile.servicesTitle)}<`);
  }
  if (profile.processTitle) {
    html = replaceAll(html, ">From ideas to impactful creative results.<", `>${esc(profile.processTitle)}<`);
  }
  if (profile.testimonialsTitle) {
    html = replaceAll(html, ">Voices of trust from happy clients<", `>${esc(profile.testimonialsTitle)}<`);
  }

  // Replace customizable images if provided
  if (profile.aboutPhotoUrl) {
    html = replaceAll(html, "/templates/daniel-cross/8pmcaHy6B2IO4Rap9XhFCnzKA.png", esc(profile.aboutPhotoUrl));
  }
  if (profile.signatureUrl) {
    html = replaceAll(html, "/templates/daniel-cross/jI4zwMAO3uowSwVm4sMQEYbksMc.png", esc(profile.signatureUrl));
  }
  if (profile.footerBannerUrl) {
    html = replaceAll(html, "/templates/daniel-cross/MlC72sVCQio6ooebpIaFFKLOVDA.png", esc(profile.footerBannerUrl));
  }

  // Compile custom services
  const servicesHtml = buildServicesSection(profile);
  html = replaceServicesGridContent(html, servicesHtml);

  // Compile custom process steps
  const processHtml = buildProcessStepsSection(profile);
  html = replaceProcessStepsContent(html, processHtml);

  // Compile custom testimonials reviews
  const testimonialsHtml = buildTestimonialsSection(profile);
  html = replaceTestimonialsContent(html, testimonialsHtml);

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

    /* Testimonials slideshow responsive sizing & swipe adjustments */
    .framer-9ivh3c-container {
      height: auto !important;
      min-height: 280px !important;
    }
    .framer-9ivh3c-container section > div {
      overflow-x: auto !important;
      scroll-snap-type: x mandatory !important;
      -webkit-overflow-scrolling: touch !important;
      -ms-overflow-style: none !important;
      scrollbar-width: none !important;
    }
    .framer-9ivh3c-container section > div::-webkit-scrollbar {
      display: none !important;
    }
    
    .framer-esrupl-container,
    .framer-1x1fbg7-container,
    .framer-16lsjul-container {
      width: calc(50% - 7px) !important;
      height: auto !important;
      min-height: 240px !important;
      scroll-snap-align: start !important;
      flex-shrink: 0 !important;
    }
    .framer-KjIJu {
      height: 100% !important;
      min-height: 220px !important;
      box-sizing: border-box !important;
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

    .framer-9ivh3c-container {
      min-height: 320px !important;
    }
    .framer-esrupl-container,
    .framer-1x1fbg7-container,
    .framer-16lsjul-container {
      width: 100% !important;
      min-height: 280px !important;
    }
    .framer-KjIJu {
      min-height: 260px !important;
    }
  }
</style>
`;
  let colorStyles = "";
  if (profile.themeColors) {
    const { primaryBg, accentColor, cardBg, textPrimary, textMuted } = profile.themeColors;
    colorStyles = `
<style id="custom-theme-colors">
  body {
    ${primaryBg ? `--token-d469a4a3-0708-4dfe-8498-9b2828796a10: ${primaryBg} !important; --token-1d129b27-20b9-421b-bc87-4be93ee49891: ${primaryBg} !important;` : ""}
    ${accentColor ? `--token-09c1722d-5d82-4a0e-b304-abc5a551cacb: ${accentColor} !important;` : ""}
    ${cardBg ? `--token-1f466c1a-ea57-4ca6-b62a-278c9a994c3b: ${cardBg} !important;` : ""}
    ${textPrimary ? `--token-5b7978f2-455d-4675-a18c-26d9c3d422ca: ${textPrimary} !important;` : ""}
    ${textMuted ? `--token-13ef338a-a018-4b90-9b3e-7bf1136daf34: ${textMuted} !important;` : ""}
  }
</style>
`;
  }
  html = html.replace("</head>", `${responsiveStyles}${colorStyles}</head>`);

  return html;
}
