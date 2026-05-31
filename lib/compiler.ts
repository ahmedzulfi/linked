import { ProfileData, TemplateId } from "@/shared/types";

export function compileStaticHtml(profile: ProfileData, templateId: TemplateId): string {
  const name = profile.name;
  const headline = profile.headline;
  const summary = profile.summary;
  const location = profile.location || "";
  const avatarUrl = profile.avatarUrl || "https://i.pravatar.cc/300?img=47";

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

  if (templateId === "minimal-card") {
    templateStyles = `
      body { background-color: #FBFBFB; color: #171717; }
      .container { max-width: 520px; margin: 80px auto; padding: 0 20px; }
      .card { background: white; border: 1px border #E6E6E6; border-radius: 20px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04), 0 10px 30px -10px rgba(0,0,0,0.08); }
      .header { display: flex; gap: 20px; margin-bottom: 24px; align-items: center; }
      .avatar { width: 80px; height: 80px; border-radius: 12px; object-fit: cover; border: 1px solid #E6E6E6; }
      .name { font-size: 24px; font-weight: 600; margin: 0; color: #000; }
      .headline { font-size: 15px; color: #6B6B6B; margin: 4px 0 0 0; }
      .location { font-size: 12px; color: #9CA3AF; margin-top: 6px; }
      .summary { font-size: 15px; line-height: 1.6; margin-bottom: 30px; }
      .section-title { font-size: 12px; text-transform: uppercase; tracking-wider; color: #9CA3AF; margin-bottom: 16px; font-weight: 600; }
      .experience-list { display: flex; flex-col; gap: 20px; margin-bottom: 30px; }
      .experience-item { border-left: 2px solid #E6E6E6; padding-left: 16px; }
      .experience-title { font-size: 15px; font-weight: 600; margin: 0; }
      .experience-company { font-size: 13px; color: #6B6B6B; margin: 2px 0; }
      .experience-duration { font-size: 12px; color: #9CA3AF; }
      .experience-desc { font-size: 13px; color: #9CA3AF; margin-top: 4px; line-height: 1.5; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 30px; }
      .skill-badge { font-size: 11px; font-weight: 500; padding: 4px 10px; border-radius: 8px; background-color: #DCEAFF; color: #1A4A8A; }
      .links-container { display: flex; flex-wrap: wrap; gap: 10px; }
      .link-button { display: inline-flex; align-items: center; text-decoration: none; font-size: 13px; font-weight: 500; color: #171717; border: 1px solid #E6E6E6; padding: 8px 16px; border-radius: 8px; transition: border-color 0.2s; }
      .link-button:hover { border-color: #8DB8FF; }
    `;
    templateBody = `
      <div class="container">
        <div class="card">
          <div class="header">
            <img src="${avatarUrl}" alt="${name}" class="avatar">
            <div>
              <h1 class="name">${name}</h1>
              <p class="headline">${headline}</p>
              ${location ? `<div class="location">${location}</div>` : ""}
            </div>
          </div>
          <p class="summary">${summary}</p>
          
          ${profile.skills.length > 0 ? `
            <h2 class="section-title">Skills</h2>
            <div class="skills-container">${skillsHtml}</div>
          ` : ""}

          ${profile.experience.length > 0 ? `
            <h2 class="section-title">Experience</h2>
            <div class="experience-list">${experienceHtml}</div>
          ` : ""}

          ${profile.links.length > 0 ? `
            <h2 class="section-title">Links</h2>
            <div class="links-container">${linksHtml}</div>
          ` : ""}
        </div>
      </div>
    `;
  } else if (templateId === "bento-grid") {
    templateStyles = `
      body { background-color: #FBFBFB; color: #171717; }
      .container { max-width: 680px; margin: 60px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
      .bento-card { background: white; border: 1px solid #E6E6E6; border-radius: 16px; padding: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
      .col-span-2 { grid-column: span 2; }
      .header-card { display: flex; gap: 20px; align-items: center; }
      .avatar { width: 72px; height: 72px; border-radius: 12px; object-fit: cover; border: 1px solid #E6E6E6; }
      .name { font-size: 22px; font-weight: 600; margin: 0; color: #000; }
      .headline { font-size: 14px; color: #6B6B6B; margin: 4px 0 0 0; }
      .location { font-size: 12px; color: #9CA3AF; margin-top: 6px; }
      .section-title { font-size: 11px; text-transform: uppercase; tracking-wider; color: #9CA3AF; margin-bottom: 12px; font-weight: 600; }
      .summary-text { font-size: 14px; line-height: 1.6; margin: 0; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 6px; }
      .skill-badge { font-size: 11px; font-weight: 500; padding: 4px 8px; border-radius: 6px; background-color: white; border: 1px solid #8DB8FF; color: #1A4A8A; }
      .skills-card { background-color: #DCEAFF; border-color: rgba(141, 184, 255, 0.3); }
      .experience-list { display: flex; flex-direction: column; gap: 16px; }
      .experience-item { display: flex; flex-direction: column; }
      .experience-title { font-size: 13px; font-weight: 600; margin: 0; }
      .experience-company { font-size: 11px; color: #9CA3AF; margin-top: 1px; }
      .experience-duration { font-size: 10px; color: #9CA3AF; margin-top: 1px; }
      .experience-desc { display: none; }
      .links-container { display: flex; flex-wrap: wrap; gap: 8px; }
      .link-button { display: inline-flex; align-items: center; text-decoration: none; font-size: 12px; font-weight: 500; color: #171717; border: 1px solid #E6E6E6; padding: 6px 12px; border-radius: 8px; }
    `;
    templateBody = `
      <div class="container">
        <!-- Header -->
        <div class="bento-card col-span-2 header-card">
          <img src="${avatarUrl}" alt="${name}" class="avatar">
          <div>
            <h1 class="name">${name}</h1>
            <p class="headline">${headline}</p>
            ${location ? `<div class="location">${location}</div>` : ""}
          </div>
        </div>

        <!-- Summary -->
        <div class="bento-card col-span-2">
          <h2 class="section-title">About</h2>
          <p class="summary-text">${summary}</p>
        </div>

        <!-- Skills -->
        <div class="bento-card skills-card">
          <h2 class="section-title" style="color: #1A4A8A;">Skills</h2>
          <div class="skills-container">${skillsHtml}</div>
        </div>

        <!-- Experience -->
        <div class="bento-card">
          <h2 class="section-title">Experience</h2>
          <div class="experience-list">${experienceHtml}</div>
        </div>

        <!-- Links -->
        ${profile.links.length > 0 ? `
          <div class="bento-card col-span-2">
            <h2 class="section-title">Links</h2>
            <div class="links-container">${linksHtml}</div>
          </div>
        ` : ""}
      </div>
    `;
  } else if (templateId === "full-scroll") {
    templateStyles = `
      body { background-color: #F3F3F3; color: #171717; }
      .banner { height: 160px; background: linear-gradient(90deg, #2A2A2F 0%, #3A3A4A 100%); }
      .container { max-width: 600px; margin: -60px auto 80px auto; padding: 0 20px; }
      .avatar { width: 96px; height: 96px; border-radius: 16px; object-fit: cover; border: 4px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.05); margin-bottom: 16px; }
      .name { font-size: 26px; font-weight: 600; margin: 0; color: #000; }
      .headline { font-size: 15px; color: #6B6B6B; margin: 4px 0 0 0; }
      .location { font-size: 12px; color: #9CA3AF; margin-top: 6px; margin-bottom: 16px; }
      .panel { background: white; border: 1px solid #E6E6E6; border-radius: 16px; padding: 24px; margin-bottom: 16px; }
      .section-title { font-size: 11px; text-transform: uppercase; tracking-wider; color: #9CA3AF; margin-bottom: 16px; font-weight: 600; }
      .experience-list { display: flex; flex-direction: column; gap: 24px; }
      .experience-item { display: flex; gap: 12px; }
      .experience-indicator { width: 4px; background-color: #E6E6E6; border-radius: 2px; flex-shrink: 0; margin-top: 4px; }
      .experience-content { flex-1; }
      .experience-title { font-size: 15px; font-weight: 600; margin: 0; }
      .experience-company { font-size: 12px; color: #6B6B6B; margin: 2px 0; }
      .experience-duration { font-size: 11px; color: #9CA3AF; }
      .experience-desc { font-size: 13px; color: #9CA3AF; margin-top: 6px; line-height: 1.5; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 6px; }
      .skill-badge { font-size: 11px; font-weight: 500; padding: 6px 12px; border-radius: 8px; background-color: #F3F3F3; border: 1px solid #E6E6E6; color: #171717; }
      .links-container { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
      .link-button { display: inline-flex; align-items: center; text-decoration: none; font-size: 13px; font-weight: 500; color: #171717; border: 1px solid #E6E6E6; padding: 8px 16px; border-radius: 8px; background: white; }
    `;
    templateBody = `
      <div class="banner"></div>
      <div class="container">
        <img src="${avatarUrl}" alt="${name}" class="avatar">
        <h1 class="name">${name}</h1>
        <p class="headline">${headline}</p>
        ${location ? `<div class="location">${location}</div>` : ""}

        <!-- Links -->
        ${profile.links.length > 0 ? `
          <div class="links-container">${linksHtml}</div>
        ` : ""}

        <!-- About -->
        <div class="panel">
          <h2 class="section-title">About</h2>
          <p class="summary-text" style="font-size: 14px; line-height: 1.6; margin: 0;">${summary}</p>
        </div>

        <!-- Experience -->
        ${profile.experience.length > 0 ? `
          <div class="panel">
            <h2 class="section-title">Experience</h2>
            <div class="experience-list">
              ${profile.experience.map(exp => `
                <div class="experience-item">
                  <div class="experience-indicator"></div>
                  <div class="experience-content">
                    <h3 class="experience-title">${exp.title}</h3>
                    <p class="experience-company">${exp.company} · <span class="experience-duration">${exp.duration}</span></p>
                    ${exp.description ? `<p class="experience-desc">${exp.description}</p>` : ""}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Skills -->
        ${profile.skills.length > 0 ? `
          <div class="panel">
            <h2 class="section-title">Skills</h2>
            <div class="skills-container">${skillsHtml}</div>
          </div>
        ` : ""}
      </div>
    `;
  } else if (templateId === "dark") {
    templateStyles = `
      body { background-color: #0D0D10; color: #ffffff80; }
      .container { max-width: 540px; margin: 80px auto; padding: 0 20px; }
      .header { display: flex; gap: 20px; align-items: center; margin-bottom: 30px; }
      .avatar { width: 72px; height: 72px; border-radius: 12px; object-fit: cover; border: 1px solid rgba(255,255,255,0.08); }
      .name { font-size: 22px; font-weight: 500; margin: 0; color: white; }
      .headline { font-size: 14px; color: #8DB8FF; margin: 4px 0 0 0; }
      .location { font-size: 11px; color: rgba(255,255,255,0.25); margin-top: 4px; }
      .summary { font-size: 14px; line-height: 1.65; margin-bottom: 30px; color: rgba(255,255,255,0.5); }
      .section-title { font-size: 11px; text-transform: uppercase; tracking-wider; color: rgba(255,255,255,0.25); margin-bottom: 20px; font-weight: 600; }
      .experience-list { display: flex; flex-direction: column; gap: 24px; margin-bottom: 30px; }
      .experience-item { display: flex; gap: 12px; }
      .experience-indicator { width: 1px; background-color: rgba(255,255,255,0.1); flex-shrink: 0; margin-top: 4px; }
      .experience-content { flex-1; }
      .experience-title { font-size: 14px; font-weight: 500; color: white; margin: 0; }
      .experience-company { font-size: 12px; color: rgba(141, 184, 255, 0.7); margin: 2px 0; }
      .experience-duration { font-size: 11px; color: rgba(255,255,255,0.25); }
      .experience-desc { font-size: 12px; color: rgba(255,255,255,0.3); margin-top: 6px; line-height: 1.5; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 30px; }
      .skill-badge { font-size: 11px; font-weight: 500; padding: 4px 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); color: #8DB8FF; background: transparent; }
      .links-container { display: flex; flex-wrap: wrap; gap: 8px; }
      .link-button { display: inline-flex; align-items: center; text-decoration: none; font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.08); padding: 8px 16px; border-radius: 8px; transition: color 0.2s, border-color 0.2s; }
      .link-button:hover { color: white; border-color: rgba(141,184,255,0.3); }
      hr { border: 0; border-top: 1px solid rgba(255,255,255,0.05); margin-bottom: 30px; }
    `;
    templateBody = `
      <div class="container">
        <!-- Header -->
        <div class="header">
          <img src="${avatarUrl}" alt="${name}" class="avatar">
          <div>
            <h1 class="name">${name}</h1>
            <p class="headline">${headline}</p>
            ${location ? `<div class="location">${location}</div>` : ""}
          </div>
        </div>

        <!-- Summary -->
        <p class="summary">${summary}</p>

        <!-- Skills -->
        ${profile.skills.length > 0 ? `
          <div class="skills-container">${skillsHtml}</div>
        ` : ""}

        <hr>

        <!-- Experience -->
        ${profile.experience.length > 0 ? `
          <h2 class="section-title">Experience</h2>
          <div class="experience-list">
            ${profile.experience.map(exp => `
              <div class="experience-item">
                <div class="experience-indicator"></div>
                <div class="experience-content">
                  <h3 class="experience-title">${exp.title}</h3>
                  <p class="experience-company">${exp.company} · <span class="experience-duration">${exp.duration}</span></p>
                  ${exp.description ? `<p class="experience-desc">${exp.description}</p>` : ""}
                </div>
              </div>
            `).join("")}
          </div>
        ` : ""}

        <!-- Links -->
        ${profile.links.length > 0 ? `
          <div class="links-container">${linksHtml}</div>
        ` : ""}
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - Professional Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter Tight', 'Inter', sans-serif;
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
