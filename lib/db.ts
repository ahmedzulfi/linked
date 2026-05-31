import fs from "fs";
import path from "path";
import { ProfileData, TemplateId, MOCK_PROFILE } from "@/shared/types";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface CustomDomain {
  id: string;
  name: string;
  status: "pending" | "active";
}

export interface Website {
  id: string;
  userId: string;
  brandName: string;
  subdomainSlug: string;
  templateId: TemplateId;
  seoTitle: string;
  seoDesc: string;
  customDomains: CustomDomain[];
  profile: ProfileData;
  publishedProfile?: ProfileData;
  publishedTemplate?: TemplateId;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
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

export function getUserByEmail(email: string): User | undefined {
  const db = readDb();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(firstName: string, lastName: string, email: string, passwordHash: string): User {
  const db = readDb();
  const newUser: User = {
    id: "usr_" + Math.random().toString(36).substring(2, 11),
    firstName,
    lastName,
    email: email.toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  db.users.push(newUser);
  writeDb(db);
  return newUser;
}

export function getUserWebsites(userId: string): Website[] {
  const db = readDb();
  return db.websites.filter((w) => w.userId === userId);
}

export function getWebsiteById(id: string): Website | undefined {
  const db = readDb();
  return db.websites.find((w) => w.id === id);
}

export function getWebsiteBySubdomain(subdomainSlug: string): Website | undefined {
  const db = readDb();
  return db.websites.find((w) => w.subdomainSlug.toLowerCase() === subdomainSlug.toLowerCase());
}

export function getWebsiteByDomain(domainName: string): Website | undefined {
  const db = readDb();
  return db.websites.find((w) =>
    w.customDomains.some((d) => d.name.toLowerCase() === domainName.toLowerCase())
  );
}

export function createWebsite(userId: string, templateId: TemplateId = "minimal-card"): Website {
  const db = readDb();
  const id = "web_" + Math.random().toString(36).substring(2, 11);
  const user = db.users.find((u) => u.id === userId);
  const name = user ? `${user.firstName} ${user.lastName}` : "Alex Morgan";
  const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Math.floor(1000 + Math.random() * 9000);

  const newWebsite: Website = {
    id,
    userId,
    brandName: user ? `${user.firstName}'s Portfolio` : "Creative Portfolio",
    subdomainSlug: slug,
    templateId,
    seoTitle: `${name} - Professional Micro-site`,
    seoDesc: "Explore my professional experience, projects, education, and social networks.",
    customDomains: [],
    profile: {
      ...MOCK_PROFILE,
      name,
      headline: "Senior Professional",
      summary: "Welcome to my personal micro-site.",
      experience: [],
      education: [],
      skills: [],
      links: [],
    },
    isPublished: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.websites.push(newWebsite);
  writeDb(db);
  return newWebsite;
}

export function updateWebsite(id: string, updates: Partial<Omit<Website, "id" | "userId" | "createdAt">>): Website | undefined {
  const db = readDb();
  const idx = db.websites.findIndex((w) => w.id === id);
  if (idx === -1) return undefined;

  const updated = {
    ...db.websites[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  db.websites[idx] = updated;
  writeDb(db);
  return updated;
}

export function deleteWebsite(id: string): boolean {
  const db = readDb();
  const originalLength = db.websites.length;
  db.websites = db.websites.filter((w) => w.id !== id);
  if (db.websites.length === originalLength) return false;
  writeDb(db);
  return true;
}
