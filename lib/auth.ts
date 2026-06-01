import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { headers } from "next/headers";
import { User } from "./db";

// Ensure data directory exists
const dbDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(path.join(dbDir, "auth.db"));

export const auth = betterAuth({
  database: db,
  secret: process.env.BETTER_AUTH_SECRET || "linkedpage_local_secret_key_123456_better",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});

export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) return null;

    const nameParts = session.user.name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    return {
      id: session.user.id,
      firstName,
      lastName,
      email: session.user.email,
      passwordHash: "",
      createdAt: session.user.createdAt ? new Date(session.user.createdAt).toISOString() : new Date().toISOString(),
    };
  } catch (e) {
    console.error("Error in getAuthenticatedUser:", e);
    return null;
  }
}
