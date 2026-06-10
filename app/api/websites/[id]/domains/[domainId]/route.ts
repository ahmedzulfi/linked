import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; domainId: string }> },
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, domainId } = await params;
    const website = await getWebsiteById(id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const nextDomains = website.customDomains.filter((d) => d.id !== domainId);
    if (nextDomains.length === website.customDomains.length) {
      return NextResponse.json(
        { error: "Domain connection not found" },
        { status: 404 },
      );
    }

    await updateWebsite(id, { customDomains: nextDomains });
    return NextResponse.json({
      success: true,
      message: "Domain disconnected successfully",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to disconnect domain" },
      { status: 500 },
    );
  }
}
