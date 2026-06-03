import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite } from "@/lib/db";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const website = await getWebsiteById(id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const updated = await updateWebsite(id, {
      isPublished: false,
    });

    if (!updated) {
      return NextResponse.json({ error: "Unpublish failed" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Website unpublished successfully",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to unpublish website" }, { status: 500 });
  }
}
