import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite, readDb } from "@/lib/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const website = getWebsiteById(params.id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.json({ success: true, domains: website.customDomains });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to fetch domains" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const website = getWebsiteById(params.id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = await request.json();
    const domain = body.domain?.toLowerCase().trim();

    if (!domain) {
      return NextResponse.json({ error: "Domain name is required" }, { status: 400 });
    }

    if (!domain.includes(".")) {
      return NextResponse.json({ error: "Please enter a valid domain name (e.g. realitycheque.com)" }, { status: 400 });
    }

    // Check if the domain is connected to any website
    const db = readDb();
    const isTaken = db.websites.some((w) =>
      w.customDomains.some((d) => d.name.toLowerCase() === domain)
    );

    if (isTaken) {
      return NextResponse.json({ error: "Domain is already connected to another site" }, { status: 409 });
    }

    const newDomain = {
      id: "dom_" + Math.random().toString(36).substring(2, 11),
      name: domain,
      status: "pending" as const,
    };

    const updatedDomains = [...website.customDomains, newDomain];
    updateWebsite(params.id, { customDomains: updatedDomains });

    return NextResponse.json({ success: true, domain: newDomain });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to connect domain" }, { status: 500 });
  }
}
