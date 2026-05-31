import fs from "fs";
import path from "path";
import { ProfileData, TemplateId, Website } from "@/shared/types";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

const DB_FILE = path.join(process.cwd(), "data", "db.json");

function initDb() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], websites: [] }, null, 2), "utf8");
  }
}

export function readDb() {
  initDb();
  try {
    const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data) as { users: User[]; websites: Website[] };
  } catch (e) {
    console.error("Failed to read database file, resetting...", e);
    return { users: [], websites: [] };
  }
}

export function writeDb(data: { users: User[]; websites: Website[] }) {
  initDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}
