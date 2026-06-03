import { NextResponse } from "next/server";
import { getWebsiteBySubdomain, getWebsiteByDomain } from "@/lib/db";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    let website = await getWebsiteBySubdomain(slug);

    if (!website) {
      // If not resolved by subdomain, try custom domain
      website = await getWebsiteByDomain(slug);
    }

    if (!website || !website.isPublished) {
      return NextResponse.json({ error: "Published page not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      profile: website.publishedProfile || website.profile,
      template: website.publishedTemplate || website.templateId,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to load page content" }, { status: 500 });
  }
}
