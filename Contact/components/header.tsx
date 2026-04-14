import Link from 'next/link'
import { ArrowLeft, Youtube, Palette, DollarSign, Mountain } from 'lucide-react'

interface HeaderProps {
  host: string | null
}

export function Header({ host }: HeaderProps) {
  const isFinancial = host?.includes('financial')
  const isAdventure = host?.includes('adventure')
  const isCreate = !isFinancial && !isAdventure

  let subdomainName = 'Bedo Studio'
  let subdomainUrl = 'https://bedo.studio'
  let youtubeUrl = 'https://youtube.com/@bedocreate' // Default
  let Icon = Palette

  if (isFinancial) {
    subdomainName = 'Bedo Financial'
    subdomainUrl = 'https://financial.bedo.studio'
    youtubeUrl = 'https://youtube.com/@bedofinancial'
    Icon = DollarSign
  } else if (isAdventure) {
    subdomainName = 'Bedo Adventure'
    subdomainUrl = 'https://adventure.bedo.studio'
    youtubeUrl = 'https://youtube.com/@bedoadventure'
    Icon = Mountain
  } else if (host?.includes('create')) {
    subdomainName = 'Bedo Create'
    subdomainUrl = 'https://create.bedo.studio'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            href={subdomainUrl}
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 text-primary transition-transform group-hover:-translate-x-1" />
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary/10">
                <Icon className="size-3.5 text-primary" />
              </div>
              <span>Back to {subdomainName}</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#f97316] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#ea580c] hover:shadow-md active:scale-95"
          >
            <Youtube className="size-3.5" />
            Subscribe
          </a>
        </div>
      </div>
    </header>
  )
}
