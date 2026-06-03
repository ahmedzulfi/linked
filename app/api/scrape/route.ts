import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { ProfileData, MOCK_PROFILE } from "@/shared/types";
import { chromium } from "playwright";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);

async function runScrapyScraper(url: string): Promise<any> {
  const pythonPath = "python";
  const scriptPath = path.join(process.cwd(), "linkedin_scraper", "run_spider.py");
  
  const { stdout, stderr } = await execAsync(`"${pythonPath}" "${scriptPath}" "${url}"`, {
    timeout: 30000,
  });
  
  if (stderr && stderr.includes("Error")) {
    console.warn("[Scrapy Warning/Error]:", stderr);
  }
  
  const lines = stdout.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      const parsed = JSON.parse(trimmed);
      if (parsed.error) {
        throw new Error(parsed.error);
      }
      return parsed;
    }
  }
  throw new Error("Scrapy failed to output valid profile JSON data");
}

async function scrapeLinkedInProfileWithFallback(url: string): Promise<ProfileData> {
  if (process.env.SCRAPY_ENABLED === "true") {
    console.log(`[Scrape] Attempting Python Scrapy scraper for: ${url}`);
    try {
      const scrapyData = await runScrapyScraper(url);
      console.log(`[Scrape] Scrapy scraper succeeded for: ${url}`);
      return {
        ...MOCK_PROFILE,
        name: scrapyData.name || "John Doe",
        headline: scrapyData.headline || "Professional expert",
        summary: scrapyData.summary || `I'm ${scrapyData.name}. Passionate about building products, driving impact, and solving complex challenges.`,
        location: scrapyData.location || "San Francisco, CA",
        avatarUrl: scrapyData.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(scrapyData.name || "John Doe")}&backgroundColor=8db8ff,8dffb3,2a2a2f`,
        experience: scrapyData.experience && scrapyData.experience.length > 0 ? scrapyData.experience : MOCK_PROFILE.experience,
        education: scrapyData.education && scrapyData.education.length > 0 ? scrapyData.education : MOCK_PROFILE.education,
        linkedinUrl: url,
        links: [
          { label: "LinkedIn", url, icon: "linkedin" },
          { label: "Website", url: "#", icon: "website" },
        ],
      };
    } catch (err: any) {
      console.warn(`[Scrape] Scrapy scraper failed: ${err.message}. Falling back to Playwright...`);
    }
  }
  return scrapeLinkedInProfile(url);
}


async function scrapeLinkedInProfile(url: string): Promise<ProfileData> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
    locale: "en-US",
  });

  const page = await context.newPage();
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
  });

  try {
    // Navigate to public LinkedIn profile page
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    const currentUrl = page.url();
    if (currentUrl.includes("linkedin.com/login") || currentUrl.includes("linkedin.com/signup") || currentUrl.includes("authwall")) {
      throw new Error(
        "LinkedIn security check (authwall/login) blocked public access. Please request a Member Data ZIP export from LinkedIn and upload it below."
      );
    }

    // Verify page title / layout exists
    await page.waitForSelector(".top-card-layout__title, h1", { timeout: 8000 }).catch(() => {
      throw new Error("LinkedIn security challenges or loading timeouts blocked access. Please use the manual ZIP import option.");
    });

    // Extract fields
    const name = await page.$eval(".top-card-layout__title", (el) => {
      const text = el.textContent?.trim();
      if (!text || text.toLowerCase() === "linkedin") {
        throw new Error("Invalid profile name scraped.");
      }
      return text;
    }).catch(() => {
      throw new Error("LinkedIn security challenge or authwall blocked public access. Please use the manual ZIP import option below.");
    });
    const headline = await page.$eval(".top-card-layout__headline", (el) => el.textContent?.trim() || "Professional expert").catch(() => "Professional expert");
    const location = await page.$eval(".top-card-layout__first-subline, .top-card__subline-item", (el) => el.textContent?.trim() || "San Francisco, CA").catch(() => "San Francisco, CA");
    const summary = await page.$eval(".summary__text", (el) => el.textContent?.trim() || "").catch(() => "");

    const avatarUrl = await page.$eval(".top-card-layout__entity-image-container img", (el) => (el as HTMLImageElement).src).catch(() => {
      return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=8db8ff,8dffb3,2a2a2f`;
    });

    // Parse experience
    const experience: any[] = [];
    const experienceElements = await page.$$("li.experience-item, .experience-item");
    for (const el of experienceElements) {
      const title = await el.$eval(".experience-item__title, h3", (sub) => sub.textContent?.trim() || "").catch(() => "Role");
      const company = await el.$eval(".experience-item__subtitle, h4", (sub) => sub.textContent?.trim() || "").catch(() => "Company");
      const duration = await el.$eval(".experience-item__duration, .experience-item__meta-item", (sub) => sub.textContent?.trim() || "").catch(() => "");
      const description = await el.$eval(".experience-item__description", (sub) => sub.textContent?.trim() || "").catch(() => "");

      experience.push({
        title,
        company,
        duration,
        description,
        logo: "",
      });
    }

    // Parse education
    const education: any[] = [];
    const educationElements = await page.$$("li.education__list-item");
    for (const el of educationElements) {
      const school = await el.$eval(".education__school-name", (sub) => sub.textContent?.trim() || "").catch(() => "");
      const degree = await el.$eval(".education__degree-name", (sub) => sub.textContent?.trim() || "").catch(() => "");
      const duration = await el.$eval(".education__duration", (sub) => sub.textContent?.trim() || "").catch(() => "");

      if (school) {
        education.push({
          school,
          degree,
          duration,
        });
      }
    }

    await browser.close();

    return {
      ...MOCK_PROFILE,
      name,
      headline,
      summary: summary || `I'm ${name}. Passionate about building products, driving impact, and solving complex challenges.`,
      location,
      avatarUrl,
      experience: experience.length > 0 ? experience : MOCK_PROFILE.experience,
      education: education.length > 0 ? education : MOCK_PROFILE.education,
      linkedinUrl: url,
      links: [
        { label: "LinkedIn", url, icon: "linkedin" },
        { label: "Website", url: "#", icon: "website" },
      ],
    };
  } catch (e) {
    await browser.close();
    throw e;
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    // if (!user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "LinkedIn URL is required" }, { status: 400 });
    }

    // Keep simulated failure for developer testing path
    if (url.toLowerCase().includes("fail")) {
      return NextResponse.json(
        { error: "LinkedIn privacy settings are blocking direct public data access." },
        { status: 403 }
      );
    }

    const profileData = await scrapeLinkedInProfileWithFallback(url);

    return NextResponse.json({
      success: true,
      data: profileData,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to scrape LinkedIn profile details." },
      { status: 500 }
    );
  }
}
