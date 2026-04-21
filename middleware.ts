import { NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
}

export default function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hostname = req.headers.get("x-forwarded-host") || req.headers.get("host") || ""
  
  // Define our core channels and their mapping
  const channels = ["create", "financial", "adventure"]
  const channelAliases: Record<string, string> = {
    finance: "financial",
  }

  // Normalize path
  const path = url.pathname.toLowerCase()
  const normalizedPath = path.replace(/\/$/, "") || "/"
  
  // 1. Handle production subdomain detection
  const hostParts = hostname.split(".")
  let subdomain: string | null = null
  
  // Check if we're on a Vercel preview or localhost
  const isVercelPreview = hostname.includes(".vercel.app")
  const isLocalhost = hostname.includes("localhost")
  
  if (isVercelPreview) {
    subdomain = url.searchParams.get("subdomain")
  } else if (!isLocalhost && hostParts.length > 2) {
    // e.g., create.bedo.studio -> parts are ["create", "bedo", "studio"]
    const potentialSubdomain = hostParts[0].toLowerCase()
    if (channels.includes(potentialSubdomain) || channelAliases[potentialSubdomain]) {
      subdomain = channelAliases[potentialSubdomain] || potentialSubdomain
    }
  } else if (isLocalhost && hostParts.length > 1 && hostParts[0] !== "localhost") {
    // e.g., create.localhost:3000
    const potentialSubdomain = hostParts[0].toLowerCase()
    if (channels.includes(potentialSubdomain) || channelAliases[potentialSubdomain]) {
      subdomain = channelAliases[potentialSubdomain] || potentialSubdomain
    }
  }

  // 2. RESTRICTION: Redirect path-based access on main domain to subdomains
  // If we are on the main domain (no subdomain detected) and hitting a channel path
  if (!subdomain && !isVercelPreview) {
    const firstSegment = normalizedPath.split("/")[1]
    if (channels.includes(firstSegment) || channelAliases[firstSegment]) {
      const targetSubdomain = channelAliases[firstSegment] || firstSegment
      const targetPath = normalizedPath.replace(`/${firstSegment}`, "") || "/"
      
      // Only redirect in production environments where bedos.studio is used
      if (hostname.includes("bedo.studio")) {
        return NextResponse.redirect(new URL(`https://${targetSubdomain}.bedo.studio${targetPath}`, req.url), 301)
      }
    }
  }

  // 3. CLEANUP: Redirect subdomain/channel-name to subdomain root
  // e.g., financial.bedo.studio/financial -> financial.bedo.studio/
  if (subdomain) {
    const firstSegment = normalizedPath.split("/")[1]
    if (firstSegment === subdomain || channelAliases[firstSegment] === subdomain) {
      const targetPath = normalizedPath.replace(`/${firstSegment}`, "") || "/"
      return NextResponse.redirect(new URL(targetPath, req.url))
    }
  }

  // 4. ROUTING: Internal rewrite to the subdomain folder
  if (subdomain && path !== "/contact") {
    const rewritePath = `/${subdomain}${normalizedPath === "/" ? "" : normalizedPath}`
    return NextResponse.rewrite(new URL(rewritePath, req.url))
  }
  
  return NextResponse.next()
}

