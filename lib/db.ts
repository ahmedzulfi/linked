import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import { ProfileData, TemplateId, MOCK_PROFILE } from "@/shared/types";

// User interface for app compatibility
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

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:imblue-12345@localhost:4000/linked";

const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool, { schema });

export async function getUserWebsites(userId: string): Promise<Website[]> {
  const rows = await db.select().from(schema.website).where(eq(schema.website.userId, userId));
  return rows.map((w) => ({
    ...w,
    templateId: w.templateId as TemplateId,
    customDomains: (w.customDomains || []) as CustomDomain[],
    profile: w.profile as ProfileData,
    publishedProfile: (w.publishedProfile || undefined) as ProfileData | undefined,
    publishedTemplate: (w.publishedTemplate || undefined) as TemplateId | undefined,
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
  }));
}

export async function getWebsiteById(id: string): Promise<Website | undefined> {
  const rows = await db.select().from(schema.website).where(eq(schema.website.id, id)).limit(1);
  const w = rows[0];
  if (!w) return undefined;
  return {
    ...w,
    templateId: w.templateId as TemplateId,
    customDomains: (w.customDomains || []) as CustomDomain[],
    profile: w.profile as ProfileData,
    publishedProfile: (w.publishedProfile || undefined) as ProfileData | undefined,
    publishedTemplate: (w.publishedTemplate || undefined) as TemplateId | undefined,
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
  };
}

export async function getWebsiteBySubdomain(subdomainSlug: string): Promise<Website | undefined> {
  const rows = await db.select().from(schema.website).where(eq(schema.website.subdomainSlug, subdomainSlug.toLowerCase())).limit(1);
  const w = rows[0];
  if (!w) return undefined;
  return {
    ...w,
    templateId: w.templateId as TemplateId,
    customDomains: (w.customDomains || []) as CustomDomain[],
    profile: w.profile as ProfileData,
    publishedProfile: (w.publishedProfile || undefined) as ProfileData | undefined,
    publishedTemplate: (w.publishedTemplate || undefined) as TemplateId | undefined,
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
  };
}

export async function getWebsiteByDomain(domainName: string): Promise<Website | undefined> {
  const rows = await db.select().from(schema.website);
  const match = rows.find((w) =>
    ((w.customDomains || []) as CustomDomain[]).some(
      (d) => d.name.toLowerCase() === domainName.toLowerCase()
    )
  );
  if (!match) return undefined;
  return {
    ...match,
    templateId: match.templateId as TemplateId,
    customDomains: (match.customDomains || []) as CustomDomain[],
    profile: match.profile as ProfileData,
    publishedProfile: (match.publishedProfile || undefined) as ProfileData | undefined,
    publishedTemplate: (match.publishedTemplate || undefined) as TemplateId | undefined,
    createdAt: match.createdAt.toISOString(),
    updatedAt: match.updatedAt.toISOString(),
  };
}

export async function createWebsite(userId: string, templateId: TemplateId = "minimal-card"): Promise<Website> {
  const uRows = await db.select().from(schema.user).where(eq(schema.user.id, userId)).limit(1);
  const user = uRows[0];
  const name = user ? user.name : "Alex Morgan";
  const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Math.floor(1000 + Math.random() * 9000);
  const id = "web_" + Math.random().toString(36).substring(2, 11);

  const newWebsite = {
    id,
    userId,
    brandName: user ? `${user.name}'s Portfolio` : "Creative Portfolio",
    subdomainSlug: slug,
    templateId: templateId as string,
    seoTitle: `${name} - Professional Micro-site`,
    seoDesc: "Explore my professional experience, projects, education, and social networks.",
    customDomains: [] as any,
    profile: {
      ...MOCK_PROFILE,
      name,
      headline: "Senior Professional",
      summary: "Welcome to my personal micro-site.",
      experience: [],
      education: [],
      skills: [],
      links: [],
    } as any,
    publishedProfile: null,
    publishedTemplate: null,
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.insert(schema.website).values(newWebsite);

  return {
    ...newWebsite,
    templateId: newWebsite.templateId as TemplateId,
    customDomains: newWebsite.customDomains as CustomDomain[],
    profile: newWebsite.profile as ProfileData,
    publishedProfile: undefined,
    publishedTemplate: undefined,
    createdAt: newWebsite.createdAt.toISOString(),
    updatedAt: newWebsite.updatedAt.toISOString(),
  };
}

export async function updateWebsite(id: string, updates: Partial<Omit<Website, "id" | "userId" | "createdAt">>): Promise<Website | undefined> {
  const formattedUpdates: any = {
    ...updates,
    updatedAt: new Date(),
  };
  
  await db.update(schema.website).set(formattedUpdates).where(eq(schema.website.id, id));
  return getWebsiteById(id);
}

export async function deleteWebsite(id: string): Promise<boolean> {
  await db.delete(schema.website).where(eq(schema.website.id, id));
  return true;
}
