import { NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
}

export default function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hostname = req.headers.get("host") || ""
  
  // Get the subdomain (e.g., "create" from "create.bedo.studio")
  // Handle both production (bedo.studio) and preview deployments (*.vercel.app)
  const allowedDomains = ["bedo.studio", "localhost:3000"]
  
  // Check if we're on a Vercel preview deployment
  const isVercelPreview = hostname.includes(".vercel.app")
  
  let subdomain: string | null = null
  
  if (isVercelPreview) {
    // For Vercel preview URLs like create--project.vercel.app or create.project.vercel.app
    // We'll use query params or path-based routing for preview
    const pathSubdomain = url.searchParams.get("subdomain")
    if (pathSubdomain) {
      subdomain = pathSubdomain
    }
  } else {
    // Production subdomain detection
    const hostParts = hostname.split(".")
    
    // Check for subdomain (e.g., create.bedo.studio has 3 parts)
    if (hostParts.length > 2 || (hostname.includes("localhost") && hostParts.length > 1 && hostParts[0] !== "localhost")) {
      const potentialSubdomain = hostParts[0]
      if (["create", "financial", "adventure"].includes(potentialSubdomain)) {
        subdomain = potentialSubdomain
      }
    }
  }
  
  // If we have a valid subdomain, rewrite to the appropriate page
  // Skip rewrites for the global contact page
  if (subdomain && url.pathname !== "/contact") {
    // Rewrite to the subdomain's page
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname === "/" ? "" : url.pathname}`, req.url))
  }
  
  return NextResponse.next()
}
