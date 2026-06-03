import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getUserWebsites, createWebsite } from "@/lib/db";
import { TemplateId } from "@/shared/types";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const websites = await getUserWebsites(user.id);
    return NextResponse.json({ success: true, websites });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to fetch websites" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let templateId: TemplateId = "minimal-card";
    try {
      const body = await request.json();
      if (body.templateId) {
        templateId = body.templateId;
      }
    } catch {
      // Body empty or invalid, proceed with default
    }

    const website = await createWebsite(user.id, templateId);
    return NextResponse.json({ success: true, website });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to create website draft" }, { status: 500 });
  }
}
