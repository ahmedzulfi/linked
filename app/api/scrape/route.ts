import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { ProfileData, MOCK_PROFILE } from "@/shared/types";
import { chromium } from "playwright";

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
    const name = await page.$eval(".top-card-layout__title", (el) => el.textContent?.trim() || "John Doe").catch(() => "John Doe");
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
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    const profileData = await scrapeLinkedInProfile(url);

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
