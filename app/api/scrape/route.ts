import { NextResponse } from "next/server";
import { ProfileData, MOCK_PROFILE } from "@/shared/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "LinkedIn URL is required" }, { status: 400 });
    }

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 2000));

    if (url.toLowerCase().includes("fail")) {
      return NextResponse.json(
        { error: "LinkedIn privacy settings are blocking direct public data access." },
        { status: 403 }
      );
    }

    // Extract name from URL: e.g. https://www.linkedin.com/in/ayesha-zulfiqar
    let slug = "User";
    try {
      const parts = url.split("/in/");
      if (parts.length > 1) {
        slug = parts[1].split("/")[0].split("?")[0];
      } else {
        const fallbackParts = url.split("/");
        slug = fallbackParts[fallbackParts.length - 1] || "User";
      }
    } catch {
      // fallback
    }

    // Format slug to Capitalized Name: e.g. ayesha-zulfiqar -> Ayesha Zulfiqar
    const formattedName = slug
      .split(/[-_+]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    // Generate personalized profile data
    const profileData: ProfileData = {
      ...MOCK_PROFILE,
      name: formattedName,
      headline: `Professional Expert | Designing the future of tech`,
      summary: `I'm ${formattedName}. Passionate about building high-impact products, leading cross-functional teams, and solving complex problems. Feel free to explore my background and get in touch!`,
      linkedinUrl: url,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formattedName)}&backgroundColor=8db8ff,8dffb3,2a2a2f`,
      experience: [
        {
          title: "Senior Leader",
          company: "Innovation Systems",
          duration: "2023 - Present",
          description: "Leading strategy, design and implementation of modern digital platforms.",
          logo: "",
        },
        {
          title: "Lead Specialist",
          company: "Enterprise Co",
          duration: "2020 - 2023",
          description: "Built scalable product modules and coordinated team delivery goals.",
          logo: "",
        }
      ],
      links: [
        { label: "LinkedIn", url: url, icon: "linkedin" },
        { label: "Website", url: "#", icon: "website" },
      ]
    };

    return NextResponse.json({
      success: true,
      data: profileData,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to parse profile details" },
      { status: 500 }
    );
  }
}
