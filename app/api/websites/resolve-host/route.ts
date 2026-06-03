import { NextResponse } from "next/server";
import { getWebsiteByDomain, getWebsiteBySubdomain } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const host = searchParams.get("host")?.toLowerCase().trim();

    if (!host) {
      return NextResponse.json({ slug: null });
    }

    // Try custom domain first
    let website = await getWebsiteByDomain(host);

    if (!website) {
      // Try subdomain: e.g. ayesha.linkedpage.io -> ayesha
      const parts = host.split(".");
      if (parts.length > 2) {
        const slug = parts[0];
        website = await getWebsiteBySubdomain(slug);
      }
    }

    if (website && website.isPublished) {
      return NextResponse.json({ slug: website.subdomainSlug });
    }

    return NextResponse.json({ slug: null });
  } catch (e) {
    console.error("Resolve host failed:", e);
    return NextResponse.json({ slug: null });
  }
}
