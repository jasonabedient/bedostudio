import { NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
}

export default function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hostname = req.headers.get("host") || ""
  
  console.log("[v0] Middleware - hostname:", hostname, "pathname:", url.pathname)
  
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
    // Remove port if present (e.g., "financial.bedo.studio:443" -> "financial.bedo.studio")
    const hostnameWithoutPort = hostname.split(":")[0]
    const hostParts = hostnameWithoutPort.split(".")
    
    console.log("[v0] Middleware - hostParts:", hostParts, "length:", hostParts.length)
    
    // Check for subdomain (e.g., create.bedo.studio has 3 parts)
    // Also handle www.subdomain.bedo.studio (4 parts)
    if (hostParts.length >= 3) {
      // Get the first part as potential subdomain
      const potentialSubdomain = hostParts[0].toLowerCase()
      console.log("[v0] Middleware - potentialSubdomain:", potentialSubdomain)
      
      const validSubdomains = ["create", "financial", "finance", "adventure"]
      if (validSubdomains.includes(potentialSubdomain)) {
        subdomain = potentialSubdomain === "finance" ? "financial" : potentialSubdomain
        console.log("[v0] Middleware - matched subdomain:", subdomain)
      }
    } else if (hostname.includes("localhost") && hostParts.length > 1 && hostParts[0] !== "localhost") {
      const potentialSubdomain = hostParts[0].toLowerCase()
      if (["create", "financial", "finance", "adventure"].includes(potentialSubdomain)) {
        subdomain = potentialSubdomain === "finance" ? "financial" : potentialSubdomain
      }
    }
  }
  
  // If we have a valid subdomain, rewrite to the appropriate page
  // Skip rewrites for the global contact page
  if (subdomain && url.pathname !== "/contact") {
    // Normalize path to lowercase for consistent routing (e.g. /Retirement-Blueprint -> /retirement-blueprint)
    const normalizedPath = url.pathname.toLowerCase()
    
    // Build the rewrite path - for root path, just use the subdomain folder
    const rewritePath = normalizedPath === "/" || normalizedPath === "" 
      ? `/${subdomain}` 
      : `/${subdomain}${normalizedPath}`
    
    console.log("[v0] Middleware - subdomain:", subdomain, "rewritePath:", rewritePath)
    
    // Rewrite to the subdomain's page
    return NextResponse.rewrite(new URL(rewritePath, req.url))
  }
  
  return NextResponse.next()
}
