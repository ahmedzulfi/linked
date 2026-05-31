import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";

export async function POST() {
  await clearAuthCookie();
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
export async function GET() {
  // Support both GET and POST for convenience
  await clearAuthCookie();
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
