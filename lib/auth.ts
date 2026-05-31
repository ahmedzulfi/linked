import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getUserByEmail, User, readDb } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "linkedpage_local_secret_key_123456";
const COOKIE_NAME = "linkedpage_auth_token";

export function signToken(payload: { userId: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAuthenticatedUser(): Promise<User | null> {
  const token = await getAuthToken();
  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  const db = readDb();
  return db.users.find((u) => u.id === decoded.userId) || null;
}
