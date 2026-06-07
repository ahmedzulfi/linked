import fs from "fs";
import path from "path";
import { ProfileData, TemplateId } from "@/shared/types";
import { compileHtmlContent } from "./compiler-client";

export function compileStaticHtml(profile: ProfileData, templateId: TemplateId): string {
  const templatePath = path.join(process.cwd(), "lib", "templates", "daniel-cross.html");
  let html = "";
  try {
    html = fs.readFileSync(templatePath, "utf8");
  } catch (error) {
    console.error("Failed to read Daniel Cross template file, falling back to basic rendering", error);
    // Simple fallback in case of read error
    return `<html><body><h1>${profile.name}</h1><p>${profile.headline}</p><p>${profile.summary}</p></body></html>`;
  }

  return compileHtmlContent(html, profile);
}

