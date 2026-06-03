import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite, getWebsiteBySubdomain } from "@/lib/db";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const website = await getWebsiteById(params.id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const { slug } = body;

    const updates: any = {
      isPublished: true,
      publishedProfile: website.profile,
      publishedTemplate: website.templateId,
    };

    if (slug) {
      const cleanSlug = slug.toLowerCase().trim();
      const existing = await getWebsiteBySubdomain(cleanSlug);
      if (existing && existing.id !== params.id) {
        return NextResponse.json({ error: "Subdomain is already in use by another website" }, { status: 409 });
      }
      updates.subdomainSlug = cleanSlug;
    }

    const updated = await updateWebsite(params.id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Publish failed" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      url: `/p/${updated.subdomainSlug}`,
      slug: updated.subdomainSlug,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to publish page" }, { status: 500 });
  }
}
