import { NextResponse } from "next/server";
import AdmZip from "adm-zip";
import { getAuthenticatedUser } from "@/lib/auth";
import { ProfileData, MOCK_PROFILE } from "@/shared/types";

// Clean CSV parser supporting double quoted cells
function parseCSV(csvText: string): Record<string, string>[] {
  const lines: string[] = [];
  let currentLine = "";
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    if (char === '"') {
      insideQuotes = !insideQuotes;
      currentLine += char;
    } else if (char === '\n' && !insideQuotes) {
      lines.push(currentLine);
      currentLine = "";
    } else if (char === '\r') {
      // ignore
    } else {
      currentLine += char;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

  if (lines.length === 0) return [];

  const parseLine = (line: string): string[] => {
    const cells: string[] = [];
    let currentCell = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cells.push(currentCell.trim().replace(/^"|"$/g, "").trim());
        currentCell = "";
      } else {
        currentCell += char;
      }
    }
    cells.push(currentCell.trim().replace(/^"|"$/g, "").trim());
    return cells;
  };

  const headers = parseLine(lines[0]);
  const results: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const cells = parseLine(lines[i]);
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] || "";
    });
    results.push(row);
  }

  return results;
}

export async function POST(request: Request) {
  try {
    // Auth is optional for manual scraping (allow guests to try it out)
    const user = await getAuthenticatedUser().catch(() => null);

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "ZIP file is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let zip: AdmZip;
    try {
      zip = new AdmZip(buffer);
    } catch {
      return NextResponse.json({ error: "Invalid ZIP file format" }, { status: 400 });
    }

    const entries = zip.getEntries();
    let profileContent = "";
    let positionsContent = "";

    for (const entry of entries) {
      const name = entry.entryName.toLowerCase();
      if (name.endsWith("profile.csv")) {
        profileContent = entry.getData().toString("utf8");
      } else if (name.endsWith("positions.csv")) {
        positionsContent = entry.getData().toString("utf8");
      }
    }

    if (!profileContent) {
      return NextResponse.json(
        { error: "Could not find Profile.csv inside the ZIP archive." },
        { status: 400 }
      );
    }

    // Parse CSV files
    const profiles = parseCSV(profileContent);
    const positions = positionsContent ? parseCSV(positionsContent) : [];

    if (profiles.length === 0) {
      return NextResponse.json({ error: "Profile.csv is empty" }, { status: 400 });
    }

    const pRow = profiles[0];
    const firstName = pRow["First Name"] || user?.firstName || "Guest";
    const lastName = pRow["Last Name"] || user?.lastName || "User";
    const fullName = `${firstName} ${lastName}`;
    const headline = pRow["Headline"] || "Professional Expert";
    const summary = pRow["Summary"] || `I'm ${fullName}. Welcome to my micro-site.`;
    const location = pRow["Address"] || "San Francisco, CA";

    // Map experience
    const experience = positions.map((pos) => {
      const title = pos["Title"] || "Role";
      const company = pos["Company Name"] || pos["Company"] || "Company";
      const duration = `${pos["Started On"] || "2024"} - ${pos["Finished On"] || "Present"}`;
      const description = pos["Description"] || "";
      return { title, company, duration, description, logo: "" };
    });

    const parsedProfile: ProfileData = {
      ...MOCK_PROFILE,
      name: fullName,
      headline,
      summary,
      location,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=8db8ff,8dffb3,2a2a2f`,
      experience,
      skills: MOCK_PROFILE.skills, // Default to mock skills
      links: [
        { label: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
        { label: "Website", url: "#", icon: "website" },
      ],
      linkedinUrl: "https://linkedin.com",
    };

    return NextResponse.json({
      success: true,
      data: parsedProfile,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to process the LinkedIn ZIP data" },
      { status: 500 }
    );
  }
}
