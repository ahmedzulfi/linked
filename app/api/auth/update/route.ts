import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const currentUser = await getAuthenticatedUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { firstName, lastName } = await req.json();
    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First and last name are required" },
        { status: 400 },
      );
    }

    const name = `${firstName.trim()} ${lastName.trim()}`;
    await db.update(user).set({ name }).where(eq(user.id, currentUser.id));

    return NextResponse.json({ success: true, name });
  } catch (e: any) {
    console.error("Failed to update user profile:", e);
    return NextResponse.json(
      { error: e.message || "Failed to update profile" },
      { status: 500 },
    );
  }
}
