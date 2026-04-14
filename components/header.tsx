"use client"

import Link from "next/link"
import { Play } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Play className="h-5 w-5 fill-primary-foreground text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">Bedo Studio</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#channels" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Channels
          </Link>
          <Link href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="#channels"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore
          </Link>
        </div>
      </div>
    </header>
  )
}
