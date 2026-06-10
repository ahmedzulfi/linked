import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { upgradeRequest } from "@/lib/schema";

export async function POST(req: Request) {
  try {
    const currentUser = await getAuthenticatedUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan } = await req.json();

    const id = "upg_" + Math.random().toString(36).substring(2, 11);

    await db.insert(upgradeRequest).values({
      id,
      userId: currentUser.id,
      userEmail: currentUser.email,
      plan: plan ?? "pro",
    });

    return NextResponse.json({ success: true, id });
  } catch (e: any) {
    console.error("Failed to log upgrade request:", e);
    return NextResponse.json(
      { error: e.message || "Failed to process upgrade" },
      { status: 500 },
    );
  }
}
