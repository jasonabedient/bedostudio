import Link from "next/link"
import { Play } from "lucide-react"

export function Footer() {
  return (
    <footer id="about" className="border-t border-border py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Play className="h-4 w-4 fill-primary-foreground text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Bedo Studio</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link href="#tools" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Tools
            </Link>
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </Link>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </Link>
          </nav>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Bedo Studio
          </p>
        </div>
      </div>
    </footer>
  )
}
