import { NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
}

const VALID_SUBDOMAINS = ["create", "financial", "finance", "adventure"]

export default function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hostname = req.headers.get("host") || ""
  
  // Remove port if present (e.g., "financial.bedo.studio:443" -> "financial.bedo.studio")
  const hostnameWithoutPort = hostname.split(":")[0]
  const hostParts = hostnameWithoutPort.split(".")
  
  let subdomain: string | null = null
  
  // Check if we're on a Vercel preview deployment - use query param for subdomain
  if (hostname.includes(".vercel.app")) {
    const pathSubdomain = url.searchParams.get("subdomain")
    if (pathSubdomain && VALID_SUBDOMAINS.includes(pathSubdomain.toLowerCase())) {
      subdomain = pathSubdomain.toLowerCase() === "finance" ? "financial" : pathSubdomain.toLowerCase()
    }
  } 
  // Production subdomain detection (e.g., create.bedo.studio has 3+ parts)
  else if (hostParts.length >= 3) {
    const potentialSubdomain = hostParts[0].toLowerCase()
    if (VALID_SUBDOMAINS.includes(potentialSubdomain)) {
      subdomain = potentialSubdomain === "finance" ? "financial" : potentialSubdomain
    }
  }
  // Localhost subdomain detection (e.g., financial.localhost:3000)
  else if (hostname.includes("localhost") && hostParts.length > 1 && hostParts[0] !== "localhost") {
    const potentialSubdomain = hostParts[0].toLowerCase()
    if (VALID_SUBDOMAINS.includes(potentialSubdomain)) {
      subdomain = potentialSubdomain === "finance" ? "financial" : potentialSubdomain
    }
  }
  
  // If we have a valid subdomain, rewrite to the appropriate page
  // Skip rewrites for the global contact page
  if (subdomain && url.pathname !== "/contact") {
    // Normalize path to lowercase for consistent routing
    const normalizedPath = url.pathname.toLowerCase()
    
    // Build the rewrite path
    const rewritePath = normalizedPath === "/" || normalizedPath === "" 
      ? `/${subdomain}` 
      : `/${subdomain}${normalizedPath}`
    
    return NextResponse.rewrite(new URL(rewritePath, req.url))
  }
  
  return NextResponse.next()
}
