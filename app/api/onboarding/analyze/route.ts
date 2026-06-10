import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite } from "@/lib/db";
import { ProfileData } from "@/shared/types";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser().catch(() => null);
    const body = await request.json();
    const { websiteId, projects, interests, skills, experience } = body;

    if (!websiteId) {
      return NextResponse.json(
        { error: "websiteId is required" },
        { status: 400 },
      );
    }

    const website = await getWebsiteById(websiteId);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    // Merge manual form inputs into existing profile data
    const currentProfile = website.profile as ProfileData;
    const mergedProfile: ProfileData = {
      ...currentProfile,
      projects: projects || currentProfile.projects || [],
      interests: interests || currentProfile.interests || "",
      skills: skills || currentProfile.skills || [],
      experience: experience || currentProfile.experience || [],
    };

    const openrouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openrouterApiKey || openrouterApiKey === "your_key_here") {
      // Return merged profile immediately if AI key is missing
      console.warn(
        "[Onboarding API] OPENROUTER_API_KEY is not set. Skipping AI refinement.",
      );
      await updateWebsite(websiteId, { profile: mergedProfile });
      return NextResponse.json({
        success: true,
        data: mergedProfile,
        aiOptimized: false,
      });
    }

    const openrouter = createOpenRouter({
      apiKey: openrouterApiKey,
    });
    const modelName =
      process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";
    const model = openrouter(modelName);

    const prompt = `
You are a professional website builder copywriter.
Optimize the following user portfolio data to make it look premium, polished, and compelling for their website.

User Name: ${mergedProfile.name}
Current Headline: ${mergedProfile.headline}
Current Bio/Summary: ${mergedProfile.summary}
Location: ${mergedProfile.location || "Not specified"}
Interests & Goals: ${mergedProfile.interests || "Not specified"}

Selected Work / Projects:
${JSON.stringify(mergedProfile.projects || [])}

Work Experience:
${JSON.stringify(mergedProfile.experience || [])}

Skills:
${JSON.stringify(mergedProfile.skills || [])}

INSTRUCTIONS:
1. Rewrite the headline to be short, modern, and high-impact.
2. Rewrite the summary/bio to be in first-person ("I..."), extremely punchy (maximum 3-4 sentences), highlighting their unique value proposition.
3. Clean up the experience descriptions: correct grammatical issues, make them action-oriented, and write them in short, professional sentences.
4. Clean up projects: refine project descriptions to be engaging and brief (max 2 sentences).
5. Output ONLY a valid JSON object matching the structure below. Do not output markdown wraps (no \`\`\`json blocks), explanations, or text other than the JSON object itself.

JSON Output Structure:
{
  "headline": "...",
  "summary": "...",
  "experience": [
    {
      "title": "...",
      "company": "...",
      "duration": "...",
      "description": "..."
    }
  ],
  "projects": [
    {
      "title": "...",
      "description": "...",
      "link": "...",
      "image": "..."
    }
  ],
  "skills": [
    { "name": "..." }
  ]
}
`;

    try {
      const response = await generateText({
        model,
        prompt,
      });

      const cleanText = response.text
        .trim()
        .replace(/^```json|```$/g, "")
        .trim();
      const parsedData = JSON.parse(cleanText);

      // Construct refined profile
      const refinedProfile: ProfileData = {
        ...mergedProfile,
        headline: parsedData.headline || mergedProfile.headline,
        summary: parsedData.summary || mergedProfile.summary,
        experience:
          parsedData.experience && parsedData.experience.length > 0
            ? parsedData.experience
            : mergedProfile.experience,
        projects:
          parsedData.projects && parsedData.projects.length > 0
            ? parsedData.projects
            : mergedProfile.projects,
        skills:
          parsedData.skills && parsedData.skills.length > 0
            ? parsedData.skills
            : mergedProfile.skills,
      };

      // Save refined profile to the website draft
      await updateWebsite(websiteId, { profile: refinedProfile });

      return NextResponse.json({
        success: true,
        data: refinedProfile,
        aiOptimized: true,
      });
    } catch (err: any) {
      console.error(
        "[Onboarding API] LLM execution or JSON parsing failed:",
        err,
      );
      // Fallback: save merged data directly so user doesn't lose anything
      await updateWebsite(websiteId, { profile: mergedProfile });
      return NextResponse.json({
        success: true,
        data: mergedProfile,
        aiOptimized: false,
        warning:
          "AI optimization encountered an issue. Reverted to raw merged data.",
      });
    }
  } catch (e: any) {
    console.error("[Onboarding API] Request processing error:", e);
    return NextResponse.json(
      { error: e.message || "Failed to process request" },
      { status: 500 },
    );
  }
}
