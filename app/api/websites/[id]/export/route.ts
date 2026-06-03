import { NextResponse } from "next/server";
import AdmZip from "adm-zip";
import { getAuthenticatedUser } from "@/lib/auth";
import { getWebsiteById } from "@/lib/db";
import { compileStaticHtml } from "@/lib/compiler";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const website = await getWebsiteById(id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    if (website.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Compile static page
    const htmlContent = compileStaticHtml(website.profile, website.templateId);

    // Create README info
    const readmeContent = `# Static Export: ${website.brandName}

This package contains the fully generated static files for your portfolio, exported from LinkedPage.

## Files
- \`index.html\`: The self-contained page rendering your profile and experiences.

## How to host
You can upload this \`index.html\` file directly to any static web hosting provider:
1. **Netlify**: Drag and drop the folder containing these files into Netlify Drop.
2. **Vercel**: Deploy using vercel CLI or import a GitHub repository.
3. **GitHub Pages**: Upload to a repo and turn on Pages in repository settings.
`;

    // Package into ZIP
    const zip = new AdmZip();
    zip.addFile("index.html", Buffer.from(htmlContent, "utf-8"));
    zip.addFile("README.md", Buffer.from(readmeContent, "utf-8"));

    const zipBuffer = zip.toBuffer();

    return new Response(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="linkedpage-export-${website.subdomainSlug}.zip"`,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to generate zip export" }, { status: 500 });
  }
}
