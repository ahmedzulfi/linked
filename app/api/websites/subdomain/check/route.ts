import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteBySubdomain } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")?.toLowerCase().trim();
    const websiteId = searchParams.get("websiteId");

    if (!slug) {
      return NextResponse.json({ error: "Subdomain slug is required" }, { status: 400 });
    }

    if (!/^[a-z0-9-]{3,30}$/.test(slug)) {
      return NextResponse.json({ available: false, reason: "Invalid format" });
    }

    const existing = await getWebsiteBySubdomain(slug);
    const isAvailable = !existing || existing.id === websiteId;

    return NextResponse.json({ success: true, available: isAvailable });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Subdomain verification failed" }, { status: 500 });
  }
}
