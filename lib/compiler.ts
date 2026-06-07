import { ProfileData, TemplateId } from "@/shared/types";

export function compileStaticHtml(profile: ProfileData, templateId: TemplateId): string {
  const name = profile.name;
  const headline = profile.headline;
  const summary = profile.summary;
  const location = profile.location || "";
  const avatarUrl = profile.avatarUrl || "https://i.pravatar.cc/300?img=47";
  const interests = profile.interests || "";

  // Pre-render projects
  const projectsHtml = (profile.projects || []).map(proj => `
    <div class="project-card">
      ${proj.image ? `<img src="${proj.image}" alt="${proj.title}" class="project-image">` : ""}
      <h3 class="project-title">${proj.title}</h3>
      <p class="project-desc">${proj.description}</p>
      ${proj.link ? `<a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="project-link">View Project ↗</a>` : ""}
    </div>
  `).join("");

  // Pre-render experiences
  const experienceHtml = profile.experience.map(exp => `
    <div class="experience-item">
      <div class="experience-header">
        <h3 class="experience-title">${exp.title}</h3>
        <span class="experience-duration">${exp.duration}</span>
      </div>
      <p class="experience-company">${exp.company}</p>
      ${exp.description ? `<p class="experience-desc">${exp.description}</p>` : ""}
    </div>
  `).join("");

  // Pre-render skills
  const skillsHtml = profile.skills.map(skill => `
    <span class="skill-badge">${skill.name}</span>
  `).join("");

  // Pre-render links
  const linksHtml = profile.links.map(link => `
    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="link-button">
      <span>${link.label}</span>
    </a>
  `).join("");

  // Theme styling definitions
  let templateStyles = "";
  let templateBody = "";

  const isDanielCross = templateId === "daniel-cross";
  const isJulianMercer = templateId === "julian-mercer";
  const isLinkHunt = templateId === "link-hunt";
  const isBiobricks = templateId === "biobricks";
  const actualTemplate = isDanielCross || isJulianMercer || isLinkHunt || isBiobricks ? templateId : "daniel-cross";

  if (actualTemplate === "daniel-cross") {
    templateStyles = `
      body { background-color: #ffffff; color: #000000; font-family: system-ui, sans-serif; }
      .container { max-width: 768px; margin: 60px auto; padding: 0 24px; }
      header { border-bottom: 4px solid #000000; padding-bottom: 24px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
      .title-group { display: flex; flex-direction: column; gap: 8px; }
      .name { font-size: 38px; font-weight: 900; text-transform: uppercase; letter-spacing: -1px; margin: 0; }
      .headline { font-size: 18px; font-weight: 700; color: #333333; margin: 0; }
      .avatar { width: 80px; height: 80px; object-fit: cover; border: 4px solid #000000; box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); filter: grayscale(100%); }
      .section-label { font-size: 10px; text-transform: uppercase; font-family: monospace; font-weight: bold; color: #888888; margin-bottom: 16px; display: block; }
      .summary { font-size: 18px; font-weight: 700; line-height: 1.5; margin-bottom: 40px; }
      .grid-projects { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 40px; }
      .project-card { border: 2px solid #000000; padding: 20px; box-shadow: 3px 3px 0px 0px rgba(0,0,0,1); background: #ffffff; }
      .project-image { width: 100%; height: 160px; object-fit: cover; border: 1px solid #000000; margin-bottom: 12px; }
      .project-title { font-size: 18px; font-weight: 900; text-transform: uppercase; margin: 0 0 8px 0; }
      .project-desc { font-size: 12px; color: #444444; margin: 0 0 12px 0; }
      .project-link { font-size: 10px; font-family: monospace; font-weight: bold; text-transform: uppercase; color: #000000; text-decoration: underline; }
      .experience-item { border-bottom: 2px solid #000000; padding: 16px 0; display: flex; justify-content: space-between; align-items: flex-start; }
      .experience-item:first-child { border-top: 2px solid #000000; }
      .experience-title { font-size: 16px; font-weight: bold; text-transform: uppercase; margin: 0; }
      .experience-company { font-size: 12px; font-family: monospace; color: #666666; margin: 2px 0 0 0; }
      .experience-duration { font-size: 10px; font-family: monospace; font-weight: bold; background: #f3f3f3; border: 1px solid #000000; padding: 2px 8px; }
      .experience-desc { font-size: 12px; color: #555555; margin-top: 8px; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 40px; }
      .skill-badge { font-size: 10px; font-family: monospace; font-weight: bold; border: 1px solid #000000; background: #f3f3f3; padding: 4px 10px; text-transform: uppercase; }
      footer { border-top: 4px solid #000000; padding-top: 24px; display: flex; justify-content: space-between; font-family: monospace; font-size: 12px; }
      .footer-links { display: flex; gap: 16px; }
      .footer-links a { color: #000000; text-decoration: underline; font-weight: bold; text-transform: uppercase; }
    `;
    templateBody = `
      <div class="container">
        <header>
          <div class="title-group">
            <span class="section-label">Independent Portfolio</span>
            <h1 class="name">${name}</h1>
            <p class="headline">${headline}</p>
            ${location ? `<p style="font-size: 12px; font-family: monospace; margin: 4px 0 0 0; color: #666;">Loc. ${location}</p>` : ""}
          </div>
          <img src="${avatarUrl}" alt="${name}" class="avatar">
        </header>

        <section style="margin-bottom: 40px;">
          <span class="section-label">Context</span>
          <p class="summary">${summary}</p>
          ${interests ? `<p style="font-size: 12px; font-family: monospace; color: #555; margin-top: 12px;"><span style="font-weight: bold; color: #000;">Core Focus:</span> ${interests}</p>` : ""}
        </section>

        ${profile.projects && profile.projects.length > 0 ? `
          <section style="margin-bottom: 40px;">
            <span class="section-label">Selected Work</span>
            <div class="grid-projects">${projectsHtml}</div>
          </section>
        ` : ""}

        ${profile.experience.length > 0 ? `
          <section style="margin-bottom: 40px;">
            <span class="section-label">Experience Timeline</span>
            <div style="margin-bottom: 40px;">${experienceHtml}</div>
          </section>
        ` : ""}

        ${profile.skills.length > 0 ? `
          <section style="margin-bottom: 40px;">
            <span class="section-label">Core Tools</span>
            <div class="skills-container">${skillsHtml}</div>
          </section>
        ` : ""}

        <footer>
          <div class="footer-links">${linksHtml}</div>
          <span>&copy; ${name}</span>
        </footer>
      </div>
    `;
  } else if (actualTemplate === "julian-mercer") {
    templateStyles = `
      body { background-color: #FAF8F5; color: #2C2621; font-family: Georgia, serif; }
      .container { max-width: 640px; margin: 60px auto; padding: 0 24px; }
      header { text-align: center; border-bottom: 1px solid #E3DEC3; padding-bottom: 32px; margin-bottom: 48px; }
      .header-avatar { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 1px solid #E3DEC3; padding: 4px; background: white; margin-bottom: 16px; }
      .name { font-size: 32px; font-weight: 300; italic: true; margin: 0; font-style: italic; }
      .headline { font-size: 12px; font-family: monospace; text-transform: uppercase; color: #7A6A53; margin: 8px 0 0 0; letter-spacing: 1px; }
      .section-label { font-size: 10px; font-family: monospace; text-transform: uppercase; tracking-wider; color: #7A6A53; margin-bottom: 12px; display: block; }
      .summary { font-size: 18px; font-weight: 300; font-style: italic; line-height: 1.6; color: #332d28; margin-bottom: 48px; }
      .project-card { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: center; margin-bottom: 32px; }
      .project-image { width: 100%; height: 140px; object-fit: cover; border: 1px solid #E3DEC3; rounded-lg: 8px; border-radius: 8px; }
      .project-title { font-size: 18px; font-weight: normal; font-style: italic; margin: 0 0 6px 0; }
      .project-desc { font-size: 12px; color: #666666; font-family: sans-serif; margin: 0 0 8px 0; line-height: 1.4; }
      .project-link { font-size: 10px; font-family: monospace; color: #7A6A53; text-decoration: underline; }
      .experience-item { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(227, 222, 195, 0.4); padding-bottom: 16px; margin-bottom: 16px; }
      .experience-title { font-size: 16px; font-weight: normal; margin: 0; }
      .experience-company { font-size: 11px; font-family: monospace; color: #7A6A53; margin: 2px 0 0 0; }
      .experience-duration { font-size: 10px; font-family: monospace; color: #7A6A53; background: rgba(227, 222, 195, 0.2); padding: 2px 6px; border-radius: 4px; }
      .experience-desc { font-size: 12px; color: #666666; font-family: sans-serif; margin-top: 6px; line-height: 1.4; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 48px; }
      .skill-badge { font-size: 10px; font-family: monospace; border: 1px solid #E3DEC3; background: white; padding: 2px 8px; border-radius: 4px; color: #444; }
      footer { border-top: 1px solid #E3DEC3; padding-top: 24px; display: flex; justify-content: space-between; font-family: monospace; font-size: 10px; color: #7A6A53; }
      .footer-links { display: flex; gap: 16px; }
      .footer-links a { color: #7A6A53; text-decoration: underline; }
    `;
    templateBody = `
      <div class="container">
        <header>
          <img src="${avatarUrl}" alt="${name}" class="header-avatar">
          <h1 class="name">${name}</h1>
          <p class="headline">${headline}</p>
        </header>

        <section style="margin-bottom: 48px;">
          <span class="section-label">Introduction</span>
          <p class="summary">"${summary}"</p>
          ${interests ? `<div style="font-size: 12px; color: #666; font-family: sans-serif; border-top: 1px solid rgba(227, 222, 195, 0.4); padding-top: 12px;"><span style="font-family: monospace; font-size: 10px; text-transform: uppercase; color: #7A6A53; display: block; margin-bottom: 2px;">Passions & Interests</span> ${interests}</div>` : ""}
        </section>

        ${profile.projects && profile.projects.length > 0 ? `
          <section style="margin-bottom: 48px;">
            <span class="section-label">Selected Works</span>
            <div>${projectsHtml}</div>
          </section>
        ` : ""}

        ${profile.experience.length > 0 ? `
          <section style="margin-bottom: 48px;">
            <span class="section-label">Timeline</span>
            <div>${experienceHtml}</div>
          </section>
        ` : ""}

        ${profile.skills.length > 0 ? `
          <section style="margin-bottom: 48px;">
            <span class="section-label">Skills & Tools</span>
            <div class="skills-container">${skillsHtml}</div>
          </section>
        ` : ""}

        <footer>
          <div class="footer-links">${linksHtml}</div>
          <span>Julian Mercer Theme</span>
        </footer>
      </div>
    `;
  } else if (actualTemplate === "link-hunt") {
    templateStyles = `
      body { background: linear-gradient(180deg, #F3F4F6 0%, #E5E7EB 100%); color: #111827; font-family: system-ui, sans-serif; }
      .container { max-width: 440px; margin: 40px auto; padding: 0 16px; text-align: center; }
      .profile-card { bg: white; background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); margin-bottom: 24px; }
      .avatar { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid #3b82f6; padding: 2px; background: white; margin: 0 auto 16px auto; }
      .name { font-size: 20px; font-weight: bold; margin: 0; }
      .headline { font-size: 10px; font-weight: bold; text-transform: uppercase; color: #3b82f6; background: #eff6ff; display: inline-block; padding: 2px 8px; border-radius: 9999px; margin-top: 6px; }
      .summary { font-size: 13px; color: #4b5563; line-height: 1.5; margin-top: 12px; margin-bottom: 0; }
      .links-container { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
      .link-button { display: flex; align-items: center; justify-content: space-between; text-decoration: none; font-size: 13px; font-weight: 600; color: #1f2937; border: 1px solid #E5E7EB; padding: 14px; border-radius: 14px; background: white; box-shadow: 0 1px 2px rgba(0,0,0,0.02); transition: transform 0.2s; }
      .link-button:hover { transform: translateY(-1px); }
      .panel-card { background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 20px; text-align: left; box-shadow: 0 1px 3px rgba(0,0,0,0.02); margin-bottom: 20px; }
      .panel-title { font-size: 10px; text-transform: uppercase; font-weight: bold; color: #9ca3af; margin-bottom: 12px; display: block; }
      .project-card { display: flex; gap: 12px; border-bottom: 1px solid #f3f4f6; padding-bottom: 12px; margin-bottom: 12px; }
      .project-card:last-child { border-bottom: 0; padding-bottom: 0; margin-bottom: 0; }
      .project-image { width: 48px; height: 48px; object-fit: cover; border-radius: 8px; border: 1px solid #f3f4f6; }
      .project-title { font-size: 13px; font-weight: bold; margin: 0; }
      .project-desc { font-size: 11px; color: #6b7280; margin: 2px 0 0 0; }
      .project-link { font-size: 10px; color: #3b82f6; text-decoration: none; font-weight: bold; margin-top: 4px; display: block; }
      .experience-item { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
      .experience-item:last-child { margin-bottom: 0; }
      .experience-title { font-size: 13px; font-weight: bold; margin: 0; }
      .experience-company { font-size: 11px; color: #6b7280; margin-top: 1px; }
      .experience-duration { font-size: 9px; font-family: monospace; color: #9ca3af; background: #f9fafb; border: 1px solid #e5e7eb; padding: 1px 4px; border-radius: 4px; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; margin-bottom: 24px; }
      .skill-badge { font-size: 10px; font-weight: 600; padding: 4px 10px; border-radius: 9999px; background: white; border: 1px solid #e5e7eb; color: #4b5563; }
    `;
    templateBody = `
      <div class="container">
        <div class="profile-card">
          <img src="${avatarUrl}" alt="${name}" class="avatar">
          <h1 class="name">${name}</h1>
          <p class="headline">${headline}</p>
          <p class="summary">${summary}</p>
          ${interests ? `<div style="font-size: 10px; color: #6b7280; border-top: 1px solid #f3f4f6; margin-top: 12px; padding-top: 8px; font-style: italic;">Focus: ${interests}</div>` : ""}
        </div>

        <div class="links-container">${linksHtml}</div>

        ${profile.projects && profile.projects.length > 0 ? `
          <div class="panel-card">
            <span class="panel-title">Featured Works</span>
            <div>${projectsHtml}</div>
          </div>
        ` : ""}

        ${profile.skills.length > 0 ? `
          <div class="skills-container">${skillsHtml}</div>
        ` : ""}

        ${profile.experience.length > 0 ? `
          <div class="panel-card">
            <span class="panel-title">Experience</span>
            <div>${experienceHtml}</div>
          </div>
        ` : ""}

        <p style="font-size: 9px; font-family: monospace; color: #9ca3af; margin-top: 24px;">&copy; ${name} &middot; Link Hunt</p>
      </div>
    `;
  } else if (actualTemplate === "biobricks") {
    templateStyles = `
      body { background-color: #FAFAFA; color: #171717; font-family: system-ui, sans-serif; }
      .container { max-width: 768px; margin: 40px auto; padding: 0 20px; }
      .bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
      .col-span-2 { grid-column: span 2; }
      .col-span-3 { grid-column: span 3; }
      .brick { background: white; border: 1px solid #E6E6E6; border-radius: 16px; padding: 20px; shadow: 0 1px 2px rgba(0,0,0,0.01); display: flex; flex-direction: column; justify-content: space-between; }
      .profile-header { display: flex; items-center; gap: 12px; }
      .avatar { width: 48px; height: 48px; border-radius: 12px; object-fit: cover; border: 1px solid #eaeaea; }
      .name { font-size: 18px; font-weight: bold; margin: 0; }
      .headline { font-size: 12px; color: #666; line-height: 1.4; margin-top: 6px; }
      .summary { font-size: 12px; color: #555; leading-relaxed: 1.5; margin-top: 12px; }
      .brick-title { font-size: 10px; font-weight: bold; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.5px; margin-bottom: 12px; margin-top: 0; }
      .brick-links { display: flex; flex-direction: column; gap: 8px; }
      .brick-links a { display: flex; align-items: center; gap: 6px; text-decoration: none; font-size: 12px; font-weight: 600; color: #444; }
      .brick-links a:hover { color: #10b981; }
      .project-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
      .project-card { border: 1px solid #E6E6E6; border-radius: 12px; padding: 12px; background: #fafafa; display: flex; flex-direction: column; justify-content: space-between; }
      .project-title { font-size: 12px; font-weight: bold; margin: 0; }
      .project-desc { font-size: 10px; color: #666; margin: 2px 0 8px 0; line-height: 1.3; }
      .project-link { font-size: 10px; color: #10b981; text-decoration: none; font-weight: bold; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 6px; }
      .skill-badge { font-size: 10px; font-weight: 500; padding: 2px 8px; border-radius: 4px; background: #fafafa; border: 1px solid #eaeaea; color: #555; }
      .experience-item { display: flex; justify-content: space-between; border-bottom: 1px solid #f3f3f3; padding-bottom: 8px; margin-bottom: 8px; }
      .experience-item:last-child { border-bottom: 0; padding-bottom: 0; margin-bottom: 0; }
      .experience-title { font-size: 12px; font-weight: bold; margin: 0; }
      .experience-company { font-size: 10px; color: #888; }
      .experience-duration { font-size: 9px; font-family: monospace; color: #999; }
    `;
    templateBody = `
      <div class="container">
        <div class="bento-grid">
          
          <!-- Profile brick -->
          <div class="brick col-span-2">
            <div>
              <div class="profile-header">
                <img src="${avatarUrl}" alt="${name}" class="avatar">
                <div>
                  <h1 class="name">${name}</h1>
                  ${location ? `<p style="font-size: 10px; color: #999; margin: 2px 0 0 0;">${location}</p>` : ""}
                </div>
              </div>
              <p class="headline">${headline}</p>
            </div>
            <p class="summary">${summary}</p>
          </div>

          <!-- Links brick -->
          <div class="brick">
            <h2 class="brick-title">Connect</h2>
            <div class="brick-links">${linksHtml}</div>
            <div style="font-size: 9px; font-family: monospace; color: #aaa; margin-top: 12px;">Active Biobricks</div>
          </div>

          <!-- Interests brick -->
          ${interests ? `
            <div class="brick col-span-3" style="background-color: #EEFDF5; border-color: rgba(16, 185, 129, 0.2);">
              <h2 class="brick-title" style="color: #047857;">Interests & Focus</h2>
              <p style="font-size: 12px; color: #065f46; margin: 0; font-weight: 500; line-height: 1.4;">${interests}</p>
            </div>
          ` : ""}

          <!-- Projects brick -->
          ${profile.projects && profile.projects.length > 0 ? `
            <div class="brick col-span-3">
              <h2 class="brick-title">Projects</h2>
              <div class="project-grid">${projectsHtml}</div>
            </div>
          ` : ""}

          <!-- Skills brick -->
          ${profile.skills.length > 0 ? `
            <div class="brick">
              <h2 class="brick-title">Skills</h2>
              <div class="skills-container">${skillsHtml}</div>
            </div>
          ` : ""}

          <!-- Experience brick -->
          ${profile.experience.length > 0 ? `
            <div class="brick col-span-2">
              <h2 class="brick-title">Experience</h2>
              <div style="display: flex; flex-direction: column; gap: 8px;">${experienceHtml}</div>
            </div>
          ` : ""}

          <!-- Education brick -->
          ${profile.education.length > 0 ? `
            <div class="brick col-span-3">
              <h2 class="brick-title">Education</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                ${profile.education.map(edu => `
                  <div style="font-size: 11px;">
                    <h4 style="margin: 0; font-weight: bold;">${edu.degree}</h4>
                    <p style="margin: 2px 0 0 0; color: #666;">${edu.school} &middot; ${edu.year}</p>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}

        </div>
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - Professional Portfolio</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    ${templateStyles}
  </style>
</head>
<body>
  ${templateBody}
</body>
</html>`;
}
