import { ProfileData } from "@/shared/types";

export function compileHtmlContent(htmlTemplate: string, profile: ProfileData): string {
  const name = profile.name;
  const headline = profile.headline;
  const summary = profile.summary;
  const location = profile.location || "San Francisco, CA";
  const avatarUrl = profile.avatarUrl || "https://i.pravatar.cc/300?img=47";
  const interests = profile.interests || "";

  let html = htmlTemplate;

  // 1. Map assets back to original Framer CDN to ensure they render online
  html = html.replaceAll("./Danielcross - Personal Portfolio Framer Template_files/", "https://framerusercontent.com/images/");

  // 2. Remove minified local Framer badge / tracking script to make page white-label
  html = html.replace(/<script async="" src="[^"]*script"[^>]*><\/script>/gi, "");

  // 3. Dynamic replacement: Sidebar name & tagline
  // Sidebar logo title
  const sidebarNameTarget = /<p class="framer-text"[^>]*>Daniel Cross<\/p>/g;
  html = html.replace(sidebarNameTarget, (match) => {
    return match.replace("Daniel Cross", name);
  });

  // Sidebar tagline
  const taglineTarget = /<p class="framer-text framer-styles-preset-181yzww"[^>]*>ui\/ux designer<\/p>/g;
  html = html.replace(taglineTarget, (match) => {
    return match.replace("ui/ux designer", headline);
  });

  // 4. Dynamic replacement: Sidebar profile image
  const sidebarImageTarget = /<div class="framer-pnceva" data-framer-name="Profile image"[\s\S]*?<\/div>\s*<\/div>/g;
  const sidebarImageReplacement = `<div class="framer-pnceva" data-framer-name="Profile image" style="border-radius: 999px; opacity: 1;"><div style="position:absolute;border-radius:inherit;corner-shape:inherit;top:0;right:0;bottom:0;left:0" data-framer-background-image-wrapper="true"><img decoding="auto" src="${avatarUrl}" alt="${name}" style="display:block;width:100%;height:100%;border-radius:inherit;corner-shape:inherit;object-position:center;object-fit:cover"></div></div>`;
  html = html.replace(sidebarImageTarget, sidebarImageReplacement);

  // 5. Dynamic replacement: Hero greeting name ("Hey, [first_name] here")
  const firstName = name.split(" ")[0].toLowerCase();
  const heroNameTarget = /<h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">daniel<\/h1>/gi;
  html = html.replace(heroNameTarget, `<h1 class="framer-text framer-styles-preset-1jz5tz9" data-styles-preset="PHHRPNoBI">${firstName}</h1>`);

  // 6. Dynamic replacement: Available tag location
  const locationTarget = /Based in London-UK/gi;
  html = html.replace(locationTarget, `Based in ${location}`);

  // 7. Dynamic replacement: Hero Bio / Summary paragraph
  const bioContainerTarget = /<div class="framer-1jgxnfo" data-framer-component-type="RichTextContainer" style="transform:none">[\s\S]*?<\/p>\s*<\/div>/gi;
  const bioContainerReplacement = `<div class="framer-1jgxnfo" data-framer-component-type="RichTextContainer" style="transform:none"><p class="framer-text framer-styles-preset-j7qdls" data-styles-preset="tipiXbIpE" style="--framer-text-alignment:left">${summary}</p></div>`;
  html = html.replace(bioContainerTarget, bioContainerReplacement);

  // 8. Dynamic replacement: Selected projects list mapping
  const projects = profile.projects || [];
  let projectsHtml = "";
  if (projects.length > 0) {
    projectsHtml = projects.map((proj, idx) => `
      <div class="ssr-variant">
        <div class="framer-1kys2js-container" data-framer-name="Work card" name="Work card" style="will-change: transform; opacity: 1; transform: none;">
          <a name="Work card" class="framer-cOcSQ framer-x2WlA framer-5K3Le framer-ryc3c framer-v-ryc3c framer-j0rmx6" href="${proj.link || "#"}" target="_blank" rel="noopener noreferrer" style="background-color: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); width: 100%; border-radius: 12px; opacity: 1;">
            <div class="framer-z31oie" data-framer-name="Cover image" style="transform: none; opacity: 1;">
              <div style="position:absolute;border-radius:inherit;corner-shape:inherit;top:0;right:0;bottom:0;left:0" data-framer-background-image-wrapper="true">
                <img decoding="auto" src="${proj.image || "https://framerusercontent.com/images/NZiJk1LCTBcGzs2MNANRaoxI2IA.png"}" alt="${proj.title}" style="display:block;width:100%;height:100%;border-radius:inherit;corner-shape:inherit;object-position:center;object-fit:cover">
              </div>
            </div>
            <div class="framer-fh6ndj" data-framer-name="Linear" style="background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, rgb(0, 0, 0)) 100%); opacity: 1;"></div>
            <div class="framer-1s2w6if" data-framer-name="Text wrapper" style="opacity: 1;">
              <div class="framer-1k4j78w" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
                <h4 class="framer-text framer-styles-preset-qumrh3" data-styles-preset="FLDbgL1a7">${proj.title}</h4>
              </div>
              <div class="framer-1orth6j" data-framer-name="details" style="opacity:0.8">
                <div class="framer-1wxz9c2" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv: var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;">
                  <p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0" style="--framer-text-color:var(--extracted-r6o4lv, var(--token-594aa502-e203-45ce-9ad2-f76051124fa9, rgb(255, 255, 255)))">${proj.description}</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    `).join("");
  }

  // Replace static works cards with dynamically loaded user projects
  const worksSectionTarget = /<!--\$\-\-><div class="ssr-variant"><div class="framer-1kys2js-container" data-framer-name="Work card"[\s\S]*?<!--\/\$\-\->/g;
  html = html.replace(worksSectionTarget, `<!--$-->${projectsHtml}<!--/$-->`);

  // 9. Dynamic replacement: Experience timeline mapped to Process cards
  // Build dynamic experience cards using the grid visual architecture
  const experience = profile.experience || [];
  let experienceHtml = "";
  if (experience.length > 0) {
    experienceHtml = experience.map((exp, idx) => `
      <div class="ssr-variant">
        <div class="framer-1pxl5gq-container" style="opacity: 1; transform: none; will-change: transform; margin-bottom: 16px;">
          <div class="framer-VzKJz framer-jF71g framer-7fvNa framer-6tapR framer-1e9a2dx framer-v-1e9a2dx" style="background-color: var(--token-1f466c1a-ea57-4ca6-b62a-278c9a994c3b, rgb(237, 234, 231)); width: 100%; border-radius: 12px; opacity: 1; padding: 24px; display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
              <h4 class="framer-text framer-styles-preset-tupu2d" style="font-size: 16px; font-weight: bold; margin: 0; color: var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, #000);">${exp.title}</h4>
              <span style="font-size: 10px; font-family: monospace; background-color: var(--token-09c1722d-5d82-4a0e-b304-abc5a551cacb, #4a3429); color: white; padding: 2px 8px; border-radius: 99px; font-weight: bold; flex-shrink: 0;">${exp.duration}</span>
            </div>
            <p style="font-size: 12px; font-weight: 600; color: #757575; margin: 0;">${exp.company}</p>
            ${exp.description ? `<p style="font-size: 12px; color: #555; line-height: 1.4; margin: 4px 0 0 0; font-family: sans-serif; font-weight: normal;">${exp.description}</p>` : ""}
          </div>
        </div>
      </div>
    `).join("");
  }

  // Inject experience items into the Process block container
  // Target the container between "<section class="framer-1j8enbf" data-framer-name="Process">" and its close tags
  const processSectionTarget = /<section class="framer-1j8enbf" data-framer-name="Process">([\s\S]*?)<\/section>/g;
  html = html.replace(processSectionTarget, (match) => {
    // Replace the cards wrapper inner region with our experience cards
    // The inner list is inside a div container
    const innerListTarget = /<div class="framer-1cx9kc4" data-framer-name="Grid 2x"[\s\S]*?<\/div>\s*<\/div>/g;
    return match.replace(innerListTarget, `<div class="framer-1cx9kc4" data-framer-name="Grid 2x" style="display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 650px; margin-top: 24px;">${experienceHtml}</div>`);
  });

  // 10. Dynamic replacement: Skills & interests block
  // We can render skills in place of the Services section cards
  const skills = profile.skills || [];
  let skillsHtml = "";
  if (skills.length > 0) {
    skillsHtml = skills.map((skill) => `
      <div class="ssr-variant">
        <div class="framer-1pxl5gq-container" style="opacity: 1; transform: none; will-change: transform;">
          <div class="framer-VzKJz framer-jF71g framer-7fvNa framer-6tapR framer-1e9a2dx framer-v-1e9a2dx" style="background-color: var(--token-1f466c1a-ea57-4ca6-b62a-278c9a994c3b, rgb(237, 234, 231)); width: 100%; border-radius: 12px; opacity: 1; padding: 20px; text-align: center; border: 1px solid rgba(0,0,0,0.03);">
            <p class="framer-text" style="font-size: 14px; font-weight: 700; margin: 0; color: var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, #000);">${skill.name}</p>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Replace Services section description & cards with our skills grid
  const servicesSectionTarget = /<section class="framer-nd7o3u" data-framer-name="Services">([\s\S]*?)<\/section>/g;
  html = html.replace(servicesSectionTarget, (match) => {
    // Change subtitle to "Expertise & Skills"
    match = match.replace(/Turning ideas into digital experiences/g, "Core Skills & Tools");
    match = match.replace(/What I Do/g, "Skills");
    
    // Replace grid cards
    const gridCardsTarget = /<div class="framer-1cx9kc4" data-framer-name="Grid 3x">[\s\S]*?Explore All<\/p><\/div><\/div><\/div>/g;
    const gridCardsReplacement = `<div class="framer-1cx9kc4" data-framer-name="Grid 3x" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; width: 100%; max-width: 650px;">${skillsHtml}</div>`;
    return match.replace(gridCardsTarget, gridCardsReplacement);
  });

  // 11. Dynamic replacement: Connect links in footer and sidebar
  const links = profile.links || [];
  let linksHtml = "";
  if (links.length > 0) {
    linksHtml = links.map((link) => `
      <div class="framer-1e78gum-container" style="opacity: 1;">
        <a class="framer-RdB2l framer-5K3Le framer-7fvNa framer-wyk4az framer-v-wyk4az framer-g0nscs" href="${link.url}" target="_blank" rel="noopener noreferrer" style="opacity:1; display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <div class="framer-pq6inv">
            <p class="framer-text framer-styles-preset-zy5y8s" style="font-weight: 600; color: var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, #000);">${link.label}</p>
          </div>
        </a>
      </div>
    `).join("");
  }

  // Inject sidebar links
  const sidebarLinksTarget = /<div class="framer-1mskmu9" data-framer-name="Social links"[\s\S]*?<\/div>\s*<\/div>/g;
  const sidebarLinksReplacement = `<div class="framer-1mskmu9" data-framer-name="Social links" style="display: flex; flex-direction: column; gap: 8px; width: 100%;">${linksHtml}</div>`;
  html = html.replace(sidebarLinksTarget, sidebarLinksReplacement);

  // Inject footer links (under "Explore more" block)
  const footerLinksReplacement = links.map(link => `
    <div style="margin-right: 16px; display: inline-block;">
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" style="color: var(--token-5b7978f2-455d-4675-a18c-26d9c3d422ca, #000); font-weight: 600; text-decoration: underline; font-size: 13px;">${link.label}</a>
    </div>
  `).join("");
  html = html.replace(/<div class="framer-1hg216l" data-framer-component-type="RichTextContainer" style="--framer-link-text-color: rgb\(0, 153, 255\); --framer-link-text-decoration: underline; transform: none; opacity: 1;"><p class="framer-text framer-styles-preset-zy5y8s" data-styles-preset="XkMlNAnh0">Explore more<\/p>[\s\S]*?<\/footer>/gi, (match) => {
    return `<div style="margin-bottom: 24px;">${footerLinksReplacement}</div></footer>`;
  });

  return html;
}
