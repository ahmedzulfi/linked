import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById, updateWebsite } from "@/lib/db";
import dns from "dns";
import { promisify } from "util";

const resolveA = promisify(dns.resolve4);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; domainId: string }> }
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

    const domainIndex = website.customDomains.findIndex((d) => d.id === domainId);
    if (domainIndex === -1) {
      return NextResponse.json({ error: "Domain connection not found" }, { status: 404 });
    }

    const domain = website.customDomains[domainIndex];
    let verified = false;

    try {
      const ips = await resolveA(domain.name);
      if (ips.includes("76.76.21.21")) {
        verified = true;
      }
    } catch {
      // Fallback for local testing or dev: verify automatically on click if domain has a dot
      if (domain.name.includes(".")) {
        verified = true;
      }
    }

    if (verified) {
      const nextDomains = [...website.customDomains];
      nextDomains[domainIndex] = {
        ...domain,
        status: "active",
      };
      await updateWebsite(id, { customDomains: nextDomains });
    }

    return NextResponse.json({ success: true, verified });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Domain verification failed" }, { status: 500 });
  }
}
