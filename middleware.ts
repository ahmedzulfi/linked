import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // 1. Exclude asset paths and direct API routes
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.includes(".") ||
    url.pathname.startsWith("/logo") ||
    url.pathname.startsWith("/bg")
  ) {
    return NextResponse.next();
  }

  // 2. Identify if host is subdomain or custom domain
  const mainDomains = [
    "linkedpage.io",
    "linkedpage.me",
    "localhost:3000",
    "fusion-starter-529.vercel.app", // production Vercel URL
  ];
  let subdomainSlug: string | null = null;

  for (const domain of mainDomains) {
    if (host.endsWith("." + domain)) {
      subdomainSlug = host.replace("." + domain, "").split(":")[0];
      break;
    }
  }

  // 3. Resolve slug from DB (via fetch API to avoid edge runtime fs limitations)
  let targetSlug: string | null = subdomainSlug;

  if (!targetSlug && !mainDomains.includes(host)) {
    // It's a custom domain, ask resolve-host API route
    try {
      const apiHost = host.includes("localhost")
        ? "http://localhost:3000"
        : `https://${host}`;
      const res = await fetch(
        `${apiHost}/api/websites/resolve-host?host=${encodeURIComponent(host)}`,
      );
      const data = await res.json();
      if (data && data.slug) {
        targetSlug = data.slug;
      }
    } catch (e) {
      console.error("Middleware resolve host fetch error:", e);
    }
  }

  // 4. Perform rewrite if resolved
  if (targetSlug) {
    url.pathname = `/p/${targetSlug}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Configure matcher to limit middleware executions
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
