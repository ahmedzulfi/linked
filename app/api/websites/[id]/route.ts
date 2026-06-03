import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite, deleteWebsite } from "@/lib/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
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

    return NextResponse.json({ success: true, website });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to fetch website detail" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
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

    const body = await request.json();
    const { brandName, templateId, seoTitle, seoDesc, profile } = body;

    const updates: any = {};
    if (brandName !== undefined) updates.brandName = brandName;
    if (templateId !== undefined) updates.templateId = templateId;
    if (seoTitle !== undefined) updates.seoTitle = seoTitle;
    if (seoDesc !== undefined) updates.seoDesc = seoDesc;
    if (profile !== undefined) updates.profile = profile;

    const updatedWebsite = await updateWebsite(params.id, updates);
    return NextResponse.json({ success: true, website: updatedWebsite });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to save website updates" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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

    await deleteWebsite(params.id);
    return NextResponse.json({ success: true, message: "Website deleted successfully" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to delete website" }, { status: 500 });
  }
}
