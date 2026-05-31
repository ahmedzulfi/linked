import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { Website } from "@/shared/types";

// GET: List all websites for a user (by email query parameter)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email")?.toLowerCase();

    const db = readDb();

    if (!email) {
      // For general purposes, return all websites if no query email is specified
      return NextResponse.json({ success: true, websites: db.websites });
    }

    const user = db.users.find((u) => u.email === email);
    if (!user) {
      return NextResponse.json({ success: true, websites: [] });
    }

    const userWebsites = db.websites.filter((w) => w.userId === user.id);
    return NextResponse.json({ success: true, websites: userWebsites });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to fetch websites" }, { status: 500 });
  }
}

// POST: Save or update a website
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, subdomain, template, profileData } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required to assign site" }, { status: 400 });
    }

    const db = readDb();
    const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return NextResponse.json({ error: "User session not found" }, { status: 404 });
    }

    // Check if website already exists for this subdomain
    const existingIndex = db.websites.findIndex(
      (w) => w.subdomain.toLowerCase() === subdomain.toLowerCase()
    );

    let website: Website;

    if (existingIndex > -1) {
      // Update existing site
      website = {
        ...db.websites[existingIndex],
        name: name || db.websites[existingIndex].name,
        template: template || db.websites[existingIndex].template,
        profileData: profileData || db.websites[existingIndex].profileData,
        publishedAt: new Date().toISOString(),
      };
      db.websites[existingIndex] = website;
    } else {
      // Create new website entry
      website = {
        id: Date.now().toString(),
        userId: user.id,
        name: name || `${user.firstName}'s Website`,
        subdomain: subdomain.toLowerCase(),
        template: template || "minimal-card",
        profileData: profileData || {
          name: `${user.firstName} ${user.lastName}`,
          headline: "Professional Portfolio",
          summary: "Welcome to my website.",
          avatarUrl: "",
          experience: [],
          education: [],
          skills: [],
          links: [],
          linkedinUrl: "",
        },
        createdAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      };
      db.websites.push(website);
    }

    writeDb(db);
    return NextResponse.json({ success: true, website });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to save website" }, { status: 500 });
  }
}

// DELETE: Delete a website
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const email = searchParams.get("email");

    if (!id || !email) {
      return NextResponse.json({ error: "Website ID and Email are required" }, { status: 400 });
    }

    const db = readDb();
    const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return NextResponse.json({ error: "User session not found" }, { status: 404 });
    }

    const websiteIndex = db.websites.findIndex((w) => w.id === id && w.userId === user.id);
    if (websiteIndex === -1) {
      return NextResponse.json({ error: "Website not found or not owned by user" }, { status: 404 });
    }

    db.websites.splice(websiteIndex, 1);
    writeDb(db);

    return NextResponse.json({ success: true, message: "Website deleted successfully" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to delete website" }, { status: 500 });
  }
}
