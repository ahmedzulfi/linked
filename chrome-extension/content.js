// CSS helper to inject beautiful styling for our floating button
const style = document.createElement("style");
style.textContent = `
  #webild-floating-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 99999;
    background-color: #2A2A2F;
    color: #FFFFFF;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 13px;
    padding: 12px 18px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0px 8px 16px rgba(0,0,0,0.15);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: transform 150ms cubic-bezier(.25, .46, .45, .94), background-color 150ms ease;
  }
  #webild-floating-btn:hover {
    background-color: #3A3A42;
    transform: translateY(-2px);
  }
  #webild-floating-btn:active {
    transform: translateY(1px) scale(0.98);
  }
  #webild-floating-btn svg {
    width: 16px;
    height: 16px;
  }
`;
document.head.appendChild(style);

function injectButton() {
  if (document.getElementById("webild-floating-btn")) return;

  const btn = document.createElement("button");
  btn.id = "webild-floating-btn";
  btn.innerHTML = `
    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 21l8.982-11.795H13.62l1.382-7.205L6 13.795h5.193L9.813 15.904z"></path>
    </svg>
    Create Webild Page
  `;
  btn.onclick = () => handleScrape();
  document.body.appendChild(btn);
}

// Extract LinkedIn data using selectors
function extractProfileData() {
  const name = document.querySelector(".text-heading-xlarge, h1")?.textContent?.trim() || "John Doe";
  const headline = document.querySelector(".text-body-medium.break-words, .pv-text-details__left-panel [class*='headline']")?.textContent?.trim() || "Professional Expert";
  const location = document.querySelector(".text-body-small.inline.break-words, .pv-text-details__left-panel [class*='location']")?.textContent?.trim() || "San Francisco, CA";
  
  // Find Summary / About section text
  const summaryEl = document.querySelector("div#about ~ div .display-flex .inline-show-more-text, section.about-section p, section.summary-section p");
  const summary = summaryEl?.textContent?.trim() || `I'm ${name}. Passionate about building products, driving impact, and solving complex challenges.`;
  
  const avatarUrl = document.querySelector(".pv-top-card-profile-picture__image, .pv-top-card-section__photo")?.getAttribute("src") || "";

  // Parse experiences
  const experience = [];
  const expItems = document.querySelectorAll("section#experience ~ div ul > li, .experience-section li, section.experience-section li");
  expItems.forEach(el => {
    const title = el.querySelector("[class*='title'], h3")?.textContent?.trim() || "Role";
    const company = el.querySelector("[class*='subtitle'], h4")?.textContent?.trim() || "Company";
    const duration = el.querySelector("[class*='duration'], .pv-entity__date-range")?.textContent?.trim() || "";
    const description = el.querySelector("[class*='description'], .pv-entity__extra-details")?.textContent?.trim() || "";
    experience.push({ title, company, duration, description, logo: "" });
  });

  // Parse education
  const education = [];
  const eduItems = document.querySelectorAll("section#education ~ div ul > li, .education-section li, section.education-section li");
  eduItems.forEach(el => {
    const school = el.querySelector("h3")?.textContent?.trim() || "";
    const degree = el.querySelector("p [class*='degree-name']")?.textContent?.trim() || "";
    const year = el.querySelector("p [class*='dates']")?.textContent?.trim() || "";
    if (school) {
      education.push({ school, degree, year });
    }
  });

  // Parse skills
  const skills = [];
  const skillItems = document.querySelectorAll("section#skills ~ div ul > li, .skills-section li, section.skills-section li");
  skillItems.forEach(el => {
    const nameText = el.querySelector("[class*='title'], span")?.textContent?.trim();
    if (nameText) {
      skills.push({ name: nameText });
    }
  });

  return {
    name,
    headline,
    location,
    summary,
    avatarUrl,
    experience: experience.slice(0, 5), // Keep top 5
    education: education.slice(0, 3),
    skills: skills.slice(0, 10),
    links: [
      { label: "LinkedIn", url: window.location.href, icon: "linkedin" },
      { label: "Website", url: "#", icon: "website" }
    ],
    linkedinUrl: window.location.href
  };
}

async function handleScrape() {
  const btn = document.getElementById("webild-floating-btn");
  if (btn) {
    btn.innerHTML = `<span class="animate-spin">⌛</span> Scraping profile...`;
    btn.disabled = true;
  }
  
  try {
    const data = extractProfileData();
    // Send to background worker to initiate onboarding redirect
    chrome.runtime.sendMessage({ action: "scraped_data", data, url: window.location.href });
  } catch (e) {
    alert("Scrape failed: " + e.message);
  } finally {
    if (btn) {
      btn.innerHTML = `
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 21l8.982-11.795H13.62l1.382-7.205L6 13.795h5.193L9.813 15.904z"></path>
        </svg>
        Create Webild Page
      `;
      btn.disabled = false;
    }
  }
}

// Inject button on page load
injectButton();

// Monitor page mutations to re-inject button if LinkedIn loads dynamic sections
const observer = new MutationObserver(() => injectButton());
observer.observe(document.body, { childList: true, subtree: true });

// Listen for background trigger scrape actions
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "trigger_scrape") {
    handleScrape();
  }
  return true;
});
