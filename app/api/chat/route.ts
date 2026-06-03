import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite } from "@/lib/db";
import { TEMPLATES } from "@/shared/types";

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { message, websiteId } = body;

    if (!message || !websiteId) {
      return NextResponse.json({ error: "Message and websiteId are required" }, { status: 400 });
    }

    const website = await getWebsiteById(websiteId);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const lower = message.toLowerCase();
    let reply = "I've applied that instruction. Let me know if you want any other edits!";
    const profileUpdates: any = {};
    let templateUpdate: string | undefined = undefined;

    // Check for template triggers
    for (const tpl of TEMPLATES) {
      if (lower.includes(tpl.name.toLowerCase()) || lower.includes(tpl.id)) {
        templateUpdate = tpl.id;
        reply = `Certainly! I've switched your template layout to the ${tpl.name}. You can see the preview update live on the canvas.`;
        break;
      }
    }

    if (!templateUpdate && lower.includes("dark")) {
      templateUpdate = "dark";
      reply = "Applied the Dark Mode template layout!";
    }

    // Check for profile content edits triggers
    if (lower.includes("name is") || lower.includes("change my name to")) {
      const match = message.match(/(?:name is|name to)\s+([^.]+)/i);
      if (match && match[1]) {
        const nextName = match[1].trim();
        profileUpdates.name = nextName;
        reply = `Updated your portfolio name to "${nextName}".`;
      }
    } else if (lower.includes("headline is") || lower.includes("change headline to")) {
      const match = message.match(/(?:headline is|headline to)\s+([^.]+)/i);
      if (match && match[1]) {
        const nextHeadline = match[1].trim();
        profileUpdates.headline = nextHeadline;
        reply = `Updated your headline tag to "${nextHeadline}".`;
      }
    } else if (lower.includes("bio") || lower.includes("summary") || lower.includes("about description")) {
      reply = "Switched you to the Edit profile tab. You can directly edit your bio details there or type what changes you want.";
    } else if (lower.includes("social links") || lower.includes("add link")) {
      reply = "Switched you to the Edit profile tab under the Links sub-section so you can add or remove custom URLs.";
    }

    // Save updates in DB if matched
    if (templateUpdate || Object.keys(profileUpdates).length > 0) {
      const dbUpdates: any = {};
      if (templateUpdate) dbUpdates.templateId = templateUpdate;
      if (Object.keys(profileUpdates).length > 0) {
        dbUpdates.profile = {
          ...website.profile,
          ...profileUpdates,
        };
      }
      await updateWebsite(websiteId, dbUpdates);
    }

    return NextResponse.json({
      success: true,
      reply,
      template: templateUpdate,
      profileUpdates,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to process chat query" }, { status: 500 });
  }
}
