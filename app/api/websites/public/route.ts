import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";

// GET: Retrieve a published website's details by subdomain or slug
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")?.toLowerCase();

    if (!slug) {
      return NextResponse.json({ error: "Slug or subdomain parameter is required" }, { status: 400 });
    }

    const db = readDb();
    
    // Find a website matching the subdomain or slug: e.g. "ayesha" or "ayesha.linkedpage.io"
    const website = db.websites.find(
      (w) =>
        w.subdomain.toLowerCase() === slug ||
        w.subdomain.toLowerCase().replace(".linkedpage.io", "") === slug ||
        w.subdomain.toLowerCase().replace(".studio", "") === slug
    );

    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      profileData: website.profileData,
      template: website.template,
      name: website.name,
      subdomain: website.subdomain,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to fetch public website" }, { status: 500 });
  }
}
