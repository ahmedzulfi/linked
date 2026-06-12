"use client";

import { useEffect, useState, useRef } from "react";
import { ProfileData, TemplateId } from "@/shared/types";

interface ProfilePreviewProps {
  profile: ProfileData;
  template: TemplateId;
  scale?: number;
  onFieldClick?: (fieldName: string, index?: number) => void;
  fluid?: boolean;
  isSelectionMode?: boolean;
  selectedField?: string | null;
  selectedIndex?: number;
}

function buildSocialLinksBlock(profile: ProfileData, isPreview: boolean): string {
  const links = profile.links || [];
  if (links.length === 0) return "";

  return links.map((lnk, index) => {
    const editableAttr = isPreview ? `data-editable-field="links" data-editable-index="${index}"` : "";
    return `
<div class="ssr-variant" ${editableAttr} style="opacity: 1; margin-bottom: 6px;">
  <!--$--><a class="framer-RdB2l framer-5K3Le framer-7fvNa framer-wyk4az framer-v-wyk4az framer-g0nscs" href="${esc(lnk.url)}" target="_blank" rel="noopener" style="background-color:rgba(0, 0, 0, 0); opacity:1; display:flex; justify-content:space-between; width:100%; text-decoration:none; padding: 4px 0;">
    <div class="framer-pq6inv" style="opacity: 1;">
      <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="color:var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)); margin:0;">${esc(lnk.label)}</p>
    </div>
  </a><!--/$-->
</div>`;
  }).join("\n");
}

function replaceSocialLinksContent(html: string, socialHtml: string): string {
  const marker = 'data-framer-name="Social links"';
  const sIdx = html.indexOf(marker);
  if (sIdx === -1) return html;

  const contentStart = html.indexOf(">", sIdx) + 1;
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
    return html.substring(0, contentStart) + socialHtml + html.substring(wrapperEnd);
  }

  return html;
}

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
  year: string,
  index: number
): string {
  const resolvedImg = imageUrl || "/templates/daniel-cross/NZiJk1LCTBcGzs2MNANRaoxI2IA.png";
  return `
<div class="ssr-variant" data-editable-field="project" data-editable-index="${index}">
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

function buildProjectsSection(profile: ProfileData): string {
  const projects = profile.projects || [];
  if (projects.length === 0) return "";

  const cards = projects
    .map((p, index) =>
      buildProjectCard(
        p.title,
        p.description,
        p.link || "#",
        p.image || "",
        "Design",
        new Date().getFullYear().toString(),
        index
      )
    )
    .join("\n");

  return `<!--$--><!--$-->${cards}<!--/$--><!--/$-->`;
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

function wrapPlaceholderProjects(html: string): string {
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
    const innerContent = html.substring(contentStart, wrapperEnd);
    return html.substring(0, contentStart) + `<div data-editable-field="projects_list" style="display: contents;">` + innerContent + `</div>` + html.substring(wrapperEnd);
  }
  
  return html;
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

  const cards = services.map((s, index) => `
<div class="ssr-variant" data-editable-field="service" data-editable-index="${index}">
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
<div class="framer-qz5mfl" data-editable-field="servicesCta" data-framer-name="Services Contact card" style="will-change: transform; opacity: 1; transform: none;">
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
<div class="ssr-variant" data-editable-field="process" data-editable-index="${idx}">
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
<li style="display: contents;" data-editable-field="testimonial" data-editable-index="${idx}">
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

  // Sidebar name wrapped for selection
  html = replaceAll(html, ">Daniel Cross<", `><span data-editable-field="name">${esc(profile.name)}</span><`);

  // Role / headline wrapped for selection
  html = replaceAll(html, ">ui/ux designer<", `><span data-editable-field="headline">${esc(profile.headline)}</span><`);

  // Hero Greeting words
  const firstName = profile.name.split(" ")[0];
  html = replaceAll(html, ">Hey,<", `><span data-editable-field="heroGreetingStart">${esc(profile.heroGreetingStart || "Hey,")}</span><`);
  html = replaceAll(html, ">daniel<", `><span data-editable-field="heroGreetingName">${esc(profile.heroGreetingName || firstName)}</span><`);
  html = replaceAll(html, ">here<", `><span data-editable-field="heroGreetingEnd">${esc(profile.heroGreetingEnd || "here")}</span><`);

  // Status and follow labels
  html = replaceAll(html, ">Available for work</p>", `><span data-editable-field="statusText">${esc(profile.statusText || "Available for work")}</span></p>`);
  html = replaceAll(html, ">Follow me</p>", `><span data-editable-field="followMeLabel">${esc(profile.followMeLabel || "Follow me")}</span></p>`);

  // Navigation Links Text Overrides
  html = replaceAll(html, ">Home<", `><span data-editable-field="navHomeText">${esc(profile.navHomeText || "Home")}</span><`);
  html = replaceAll(html, ">About<", `><span data-editable-field="navAboutText">${esc(profile.navAboutText || "About")}</span><`);
  html = replaceAll(html, ">Projects<", `><span data-editable-field="navProjectsText">${esc(profile.navProjectsText || "Projects")}</span><`);
  html = replaceAll(html, ">Contact<", `><span data-editable-field="navContactText">${esc(profile.navContactText || "Contact")}</span><`);

  // Footer Credit Details
  html = replaceAll(html, ">Template by </p>", `><span data-editable-field="footerCreditText">${esc(profile.footerCreditText || "Template by")}</span></p>`);
  html = replaceAll(html, ">Muddasir Hussain</a>", `><span data-editable-field="footerCreditName">${esc(profile.footerCreditName || "Muddasir Hussain")}</span></a>`);
  html = replaceAll(html, ">Built in</p>", `><span data-editable-field="builtInFramerText">${esc(profile.builtInFramerText || "Built in")}</span></p>`);
  html = replaceAll(html, ">Framer</a>", `><span data-editable-field="builtInFramerUrl">${esc(profile.builtInFramerUrl || "Framer")}</span></a>`);

  // About me paragraph wrapped for selection
  html = replaceAll(
    html,
    "I'm Daniel Cross, a passionate UI/UX Designer dedicated to crafting digital experiences that truly connect with people. With a focus on simplicity, usability, and creativity, I design products that not only look beautiful but also solve real problems. My approach blends strategy, design, and technology to transform ideas into meaningful solutions. Whether it's designing intuitive interfaces, building websites, or shaping brand identities, I bring every project to life with precision and purpose.",
    `<span data-editable-field="summary">${esc(profile.summary)}</span>`
  );

  // Location wrapped for selection
  const location = profile.location || "Remote";
  html = replaceAll(html, ">Based in London-UK<", `><span data-editable-field="location">Based in ${esc(location)}</span><`);
  html = replaceAll(html, ">London-UK<", `><span data-editable-field="location">${esc(location)}</span><`);

  // Footer email wrapped for selection
  const emailLink = profile.links.find((l) => l.icon === "email");
  const email = emailLink ? emailLink.url.replace("mailto:", "") : "hello@example.com";
  const phone = profile.phone || "+44 7700 900123";
  html = replaceAll(html, 'href="mailto:hello@gmail.com"', `href="mailto:${esc(email)}"`);
  html = replaceAll(html, 'href="tel:+44 7700 900123"', `href="tel:${esc(phone)}"`);
  html = replaceAll(html, ">hello@gmail.com<", `><span data-editable-field="email">${esc(email)}</span><`);
  html = replaceAll(html, ">+44 7700 900123<", `><span data-editable-field="phone">${esc(phone)}</span><`);

  // Compile dynamic social links block
  const socialHtml = buildSocialLinksBlock(profile, true);
  html = replaceSocialLinksContent(html, socialHtml);

  // ─── 9.5 Custom Template Customizations ────────────────────────────────
  // Hero Badge
  const badgeText = profile.heroBadgeText || "Welcome here ❤️";
  html = replaceAll(html, "Welcome here ❤️", `<span data-editable-field="heroBadgeText">${esc(badgeText)}</span>`);

  // Hero subheadline words block
  const subheadlineText = profile.heroSubheadline || "I design Interfaces, experiences, & brands.";
  const words = subheadlineText.split(" ");
  const wordsHtml = words
    .map(
      (w) =>
        `<div class="ssr-variant" data-editable-field="heroSubheadline"><div style="opacity:1;transform:none;will-change:transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">${esc(w)}</h1></div></div>`
    )
    .join("");
  const originalWordsSequence = `</div></div><div class="framer-1q82b98" data-framer-appear-id="1q82b98" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">I</h1></div><div class="framer-a5yabo" data-framer-appear-id="a5yabo" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">design</h1></div><div class="framer-oik3st" data-framer-appear-id="oik3st" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">Interfaces,</h1></div><div class="framer-198z1h1" data-framer-appear-id="198z1h1" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">experiences,</h1></div><div class="framer-k25hut" data-framer-appear-id="k25hut" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">&amp;</h1></div><div class="framer-9xarsm" data-framer-appear-id="9xarsm" data-framer-component-type="RichTextContainer" style="opacity: 1; transform: none; will-change: transform;"><h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">brands.</h1></div>`;
  html = replaceAll(html, originalWordsSequence, `</div></div>` + wordsHtml);

  // Hero CTA Button
  const heroCtaText = profile.heroCtaText || "Book A Call";
  const heroCtaUrl = profile.heroCtaUrl || "#contact";
  html = replaceAll(html, 'data-framer-name="Brown" href="https://danielcross.framer.website/contact"', `data-framer-name="Brown" data-editable-field="heroCtaUrl" href="${esc(heroCtaUrl)}"`);
  html = replaceAll(html, 'data-framer-name="Brown" href="#contact"', `data-framer-name="Brown" data-editable-field="heroCtaUrl" href="${esc(heroCtaUrl)}"`);
  html = replaceAll(html, "Book A Call", `<span data-editable-field="heroCtaText">${esc(heroCtaText)}</span>`);

  // Hero rating text
  html = replaceAll(html, "4.9 / 5", `<span data-editable-field="heroRatingText">${esc(profile.heroRatingText || "4.9 / 5")}</span>`);

  // Section Labels
  html = replaceAll(html, ">What I Do<", `><span data-editable-field="servicesLabel">${esc(profile.servicesLabel || "What I Do")}</span><`);
  html = replaceAll(html, ">About me<", `><span data-editable-field="aboutLabel">${esc(profile.aboutLabel || "About me")}</span><`);
  html = replaceAll(html, ">Worked with Global Brands<", `><span data-editable-field="brandsLabel">${esc(profile.brandsLabel || "Worked with Global Brands")}</span><`);
  html = replaceAll(html, ">My Portfolio<", `><span data-editable-field="projectsLabel">${esc(profile.projectsLabel || "My Portfolio")}</span><`);
  html = replaceAll(html, ">Every project built to inspire users<", `><span data-editable-field="projectsSubtitle">${esc(profile.projectsSubtitle || "Every project built to inspire users")}</span><`);

  // Projects list CTA button
  const exploreUrl = profile.projectsExploreUrl || "#work";
  html = replaceAll(html, 'data-framer-name="Brown" href="https://danielcross.framer.website/work"', `data-framer-name="Brown" data-editable-field="projectsExploreUrl" href="${esc(exploreUrl)}"`);
  html = replaceAll(html, 'data-framer-name="Brown" href="#work"', `data-framer-name="Brown" data-editable-field="projectsExploreUrl" href="${esc(exploreUrl)}"`);
  html = replaceAll(html, "Explore All", `<span data-editable-field="projectsExploreText">${esc(profile.projectsExploreText || "Explore All")}</span>`);

  html = replaceAll(html, ">My Process<", `><span data-editable-field="processLabel">${esc(profile.processLabel || "My Process")}</span><`);
  html = replaceAll(html, ">Reviews<", `><span data-editable-field="testimonialsLabel">${esc(profile.testimonialsLabel || "Reviews")}</span><`);
  html = replaceAll(html, ">Have a question<", `><span data-editable-field="footerLabel">${esc(profile.footerLabel || "Have a question")}</span><`);

  // Projects / Work cards section (replaces the entire placeholder cards inside the wrapper)
  if ((profile.projects || []).length > 0) {
    const projectsHtml = buildProjectsSection(profile);
    html = replaceWorkWrapperContent(html, projectsHtml);
  } else {
    html = wrapPlaceholderProjects(html);
  }

  // Brands ticker section wrapped in a selectable div
  const tickerMarker = 'data-framer-name="Ticker logos"';
  const tickerIdx = html.indexOf(tickerMarker);
  if (tickerIdx !== -1) {
    const tickerOpenEnd = html.indexOf(">", tickerIdx) + 1;
    const tickerClose = html.indexOf("<!--/$-->", tickerOpenEnd);
    if (tickerClose !== -1) {
      const tickerHtml = profile.experience.length > 0 ? buildBrandsTicker(profile) : html.substring(tickerOpenEnd, tickerClose);
      html = html.substring(0, tickerOpenEnd) + `<div data-editable-field="experience" style="width: 100%;">` + tickerHtml + `</div>` + html.substring(tickerClose);
    }
  }

  // Replace avatars and banners tagged for selection
  if (profile.avatarUrl) {
    html = replaceAll(html, "/templates/daniel-cross/6fz6fw6ZIqdfPnGjg9h6yUfYitE.jpg", esc(profile.avatarUrl) + '" data-editable-field="avatarUrl" data-editable-type="image');
  } else {
    html = replaceAll(html, "/templates/daniel-cross/6fz6fw6ZIqdfPnGjg9h6yUfYitE.jpg", '/templates/daniel-cross/6fz6fw6ZIqdfPnGjg9h6yUfYitE.jpg" data-editable-field="avatarUrl" data-editable-type="image');
  }
  const heroPhoto = profile.bannerUrl || profile.avatarUrl;
  if (heroPhoto) {
    html = replaceAll(html, "/templates/daniel-cross/B3sqQm2pBUNJyRcswxM209Q.png", esc(heroPhoto) + '" data-editable-field="bannerUrl" data-editable-type="image');
  } else {
    html = replaceAll(html, "/templates/daniel-cross/B3sqQm2pBUNJyRcswxM209Q.png", '/templates/daniel-cross/B3sqQm2pBUNJyRcswxM209Q.png" data-editable-field="bannerUrl" data-editable-type="image');
  }

  // Replace custom section titles if provided, wrapped in spans
  if (profile.servicesTitle) {
    html = replaceAll(html, ">Turning ideas into digital experiences<", `><span data-editable-field="servicesTitle">${esc(profile.servicesTitle)}</span><`);
  } else {
    html = replaceAll(html, ">Turning ideas into digital experiences<", `><span data-editable-field="servicesTitle">Turning ideas into digital experiences</span><`);
  }
  if (profile.processTitle) {
    html = replaceAll(html, ">From ideas to impactful creative results.<", `><span data-editable-field="processTitle">${esc(profile.processTitle)}</span><`);
  } else {
    html = replaceAll(html, ">From ideas to impactful creative results.<", `><span data-editable-field="processTitle">From ideas to impactful creative results.</span><`);
  }
  if (profile.testimonialsTitle) {
    html = replaceAll(html, ">Voices of trust from happy clients<", `><span data-editable-field="testimonialsTitle">${esc(profile.testimonialsTitle)}</span><`);
  } else {
    html = replaceAll(html, ">Voices of trust from happy clients<", `><span data-editable-field="testimonialsTitle">Voices of trust from happy clients</span><`);
  }

  // Replace customizable images if provided, tagged for selection
  if (profile.aboutPhotoUrl) {
    html = replaceAll(html, "/templates/daniel-cross/8pmcaHy6B2IO4Rap9XhFCnzKA.png", esc(profile.aboutPhotoUrl) + '" data-editable-field="aboutPhotoUrl" data-editable-type="image');
  } else {
    html = replaceAll(html, "/templates/daniel-cross/8pmcaHy6B2IO4Rap9XhFCnzKA.png", '/templates/daniel-cross/8pmcaHy6B2IO4Rap9XhFCnzKA.png" data-editable-field="aboutPhotoUrl" data-editable-type="image');
  }
  if (profile.signatureUrl) {
    html = replaceAll(html, "/templates/daniel-cross/jI4zwMAO3uowSwVm4sMQEYbksMc.png", esc(profile.signatureUrl) + '" data-editable-field="signatureUrl" data-editable-type="image');
  } else {
    html = replaceAll(html, "/templates/daniel-cross/jI4zwMAO3uowSwVm4sMQEYbksMc.png", '/templates/daniel-cross/jI4zwMAO3uowSwVm4sMQEYbksMc.png" data-editable-field="signatureUrl" data-editable-type="image');
  }
  if (profile.footerBannerUrl) {
    html = replaceAll(html, "/templates/daniel-cross/MlC72sVCQio6ooebpIaFFKLOVDA.png", esc(profile.footerBannerUrl) + '" data-editable-field="footerBannerUrl" data-editable-type="image');
  } else {
    html = replaceAll(html, "/templates/daniel-cross/MlC72sVCQio6ooebpIaFFKLOVDA.png", '/templates/daniel-cross/MlC72sVCQio6ooebpIaFFKLOVDA.png" data-editable-field="footerBannerUrl" data-editable-type="image');
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

  // Remove Framer badge
  html = html.replace(/<div id="__framer-badge-container"[\s\S]*?<\/div>/g, "");

  // Reset reviews slider starting translation to 0px so testimonials are visible by default
  html = replaceAll(html, "transform: translateX(-1214px);", "transform: translateX(0px);");

  // Injected CSS variables for custom colors theme override
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

  // Add custom responsive stylesheet overrides
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

  // Visual selection outline highlight overlay script inside iframe
  const selectionScripts = `
<style id="editable-highlight-styles">
  [data-editable-field] {
    transition: outline 0.15s ease-in-out, background-color 0.15s ease-in-out;
  }
  body.selection-mode-active * {
    pointer-events: none !important;
  }
  body.selection-mode-active [data-editable-field],
  body.selection-mode-active [data-editable-field] * {
    pointer-events: auto !important;
  }
  body.selection-mode-active [data-editable-field] {
    cursor: pointer !important;
    position: relative !important;
    z-index: 999999 !important;
  }
  body.selection-mode-active span[data-editable-field],
  body.selection-mode-active a[data-editable-field] {
    display: inline-block !important;
  }
  body.selection-mode-active [data-editable-field]:hover {
    outline: 2px solid #3b82f6 !important;
    outline-offset: 2px;
    background-color: rgba(59, 130, 246, 0.04) !important;
  }
  body.selection-mode-active [data-editable-field].selected-element {
    outline: 2px solid #2563eb !important;
    outline-offset: 2px;
    background-color: rgba(37, 99, 235, 0.08) !important;
  }
</style>
<script id="editable-highlight-script">
  // Listen for selection mode updates from host
  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'SET_SELECTION_MODE') {
      if (e.data.active) {
        document.body.classList.add('selection-mode-active');
      } else {
        document.body.classList.remove('selection-mode-active');
        document.querySelectorAll('.selected-element').forEach(el => el.classList.remove('selected-element'));
      }
    }
    if (e.data && e.data.type === 'SET_SELECTED_FIELD') {
      document.querySelectorAll('.selected-element').forEach(el => el.classList.remove('selected-element'));
      const field = e.data.field;
      const index = e.data.index;
      if (field) {
        let selector = '[data-editable-field="' + field + '"]';
        if (index !== undefined && index !== null) {
          selector += '[data-editable-index="' + index + '"]';
        }
        const target = document.querySelector(selector);
        if (target) {
          target.classList.add('selected-element');
        }
      }
    }
  });

  // Capture clicks on customizable elements and post them to parent
  document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('selection-mode-active')) return;
    
    const target = e.target.closest('[data-editable-field]');
    if (target) {
      e.preventDefault();
      e.stopPropagation();
      
      const field = target.getAttribute('data-editable-field');
      const index = target.getAttribute('data-editable-index');
      
      document.querySelectorAll('.selected-element').forEach(el => el.classList.remove('selected-element'));
      target.classList.add('selected-element');
      
      window.parent.postMessage({
        type: 'ELEMENT_CLICKED',
        field: field,
        index: index ? parseInt(index, 10) : undefined
      }, '*');
    }
  }, true);
</script>
`;

  html = html.replace("</head>", `${responsiveStyles}${colorStyles}${selectionScripts}</head>`);

  return html;
}

// ── Main exported component ──────────────────────────────────────────────────
export default function ProfilePreview({
  profile,
  template,
  scale = 1,
  fluid = false,
  isSelectionMode = false,
  selectedField = null,
  selectedIndex,
  onFieldClick,
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

  // Re-compile whenever profile or raw template changes (debounced to avoid keystroke input lag)
  useEffect(() => {
    if (!rawTemplate) return;
    const timer = setTimeout(() => {
      const html = buildPreviewHtml(rawTemplate, profile);
      setCompiledHtml(html);
    }, 250);
    return () => clearTimeout(timer);
  }, [rawTemplate, profile]);

  // Handle click captures from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "ELEMENT_CLICKED") {
        if (onFieldClick) {
          onFieldClick(event.data.field, event.data.index);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onFieldClick]);

  // Sync state to iframe when selection changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    
    iframe.contentWindow.postMessage({
      type: "SET_SELECTION_MODE",
      active: isSelectionMode
    }, "*");

    iframe.contentWindow.postMessage({
      type: "SET_SELECTED_FIELD",
      field: selectedField,
      index: selectedIndex
    }, "*");
  }, [isSelectionMode, selectedField, selectedIndex, compiledHtml]);

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
          onLoad={() => {
            // Push active state immediately on iframe load completion to prevent race conditions
            const iframe = iframeRef.current;
            if (iframe && iframe.contentWindow) {
              iframe.contentWindow.postMessage({
                type: "SET_SELECTION_MODE",
                active: isSelectionMode
              }, "*");
              if (selectedField) {
                iframe.contentWindow.postMessage({
                  type: "SET_SELECTED_FIELD",
                  field: selectedField,
                  index: selectedIndex
                }, "*");
              }
            }
          }}
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
        onLoad={() => {
          const iframe = iframeRef.current;
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
              type: "SET_SELECTION_MODE",
              active: isSelectionMode
            }, "*");
            if (selectedField) {
              iframe.contentWindow.postMessage({
                type: "SET_SELECTED_FIELD",
                field: selectedField,
                index: selectedIndex
              }, "*");
            }
          }
        }}
      />
    </div>
  );
}
