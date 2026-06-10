import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { bugReport } from "@/lib/schema";

export async function POST(req: Request) {
  try {
    const { subject, description, severity } = await req.json();

    if (!subject?.trim() || !description?.trim()) {
      return NextResponse.json(
        { error: "Subject and description are required" },
        { status: 400 },
      );
    }

    // Optionally attach user identity if logged in — anonymous reports are fine too
    const currentUser = await getAuthenticatedUser().catch(() => null);

    const id = "bug_" + Math.random().toString(36).substring(2, 11);

    await db.insert(bugReport).values({
      id,
      userId: currentUser?.id ?? null,
      userEmail: currentUser?.email ?? null,
      subject: subject.trim(),
      description: description.trim(),
      severity: severity ?? "low",
    });

    return NextResponse.json({ success: true, id });
  } catch (e: any) {
    console.error("Failed to save bug report:", e);
    return NextResponse.json(
      { error: e.message || "Failed to save bug report" },
      { status: 500 },
    );
  }
}
