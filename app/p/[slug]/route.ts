import { getWebsiteBySubdomain, getWebsiteByDomain } from "@/lib/db";
import { compileStaticHtml } from "@/lib/compiler";
import { cache } from "react";

const getPageData = cache(async (slug: string) => {
  let website = await getWebsiteBySubdomain(slug);
  if (!website) {
    website = await getWebsiteByDomain(slug);
  }
  if (!website || !website.isPublished) {
    return null;
  }
  return {
    profile: website.publishedProfile || website.profile,
    template: website.publishedTemplate || website.templateId,
  };
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await getPageData(slug);

    if (!data) {
      return new Response("Not Found", { status: 404 });
    }

    const html = compileStaticHtml(data.profile, data.template);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (e: any) {
    return new Response(e.message || "Failed to load page content", {
      status: 500,
    });
  }
}
