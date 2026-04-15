"use client"

import Link from "next/link"
import { ArrowLeft, Youtube, ExternalLink, Palette, DollarSign, Mountain } from "lucide-react"

const iconMap = {
  Palette,
  DollarSign,
  Mountain,
} as const

export interface YouTubeVideo {
  title: string
  thumbnailUrl: string
  videoUrl: string
  views: string
}

interface ChannelPageProps {
  title: string
  subtitle: string
  description: string
  longDescription: string
  iconName: keyof typeof iconMap
  youtubeUrl: string
  color: string
  accentColor: string
  bgAccent: string
  features: string[]
  videos?: YouTubeVideo[]
}

export function ChannelPage({
  title,
  subtitle,
  description,
  longDescription,
  iconName,
  youtubeUrl,
  color,
  accentColor,
  bgAccent,
  features,
  videos = [],
}: ChannelPageProps) {
  const Icon = iconMap[iconName]
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="https://bedo.studio" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back to Bedo Studio</span>
          </Link>
          <Link
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            <Youtube className="h-4 w-4" />
            Subscribe
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-30`} />
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${bgAccent}`}>
              <Icon className={`h-10 w-10 ${accentColor}`} />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              {title}
            </h1>
            <p className={`mb-6 text-lg font-medium ${accentColor}`}>{subtitle}</p>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Latest Videos Section */}
      {videos.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 flex flex-col items-center justify-center gap-4 text-center">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Latest Videos</h2>
                <p className="mt-2 text-muted-foreground">Catch up on the newest content from {subtitle}</p>
              </div>
              <Link
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                View all on YouTube
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video, index) => (
                <Link
                  key={index}
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-xl">
                        <Youtube className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="line-clamp-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                      {video.title}
                    </h3>
                    <div className="mt-auto pt-4 flex items-center justify-between text-sm text-muted-foreground">
                      <span>{video.views} views</span>
                      <span className="flex items-center gap-1.5 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Watch Now
                        <ExternalLink className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-foreground">About This Channel</h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
              {longDescription}
            </p>
            <h3 className="mb-4 text-xl font-semibold text-foreground">What You&apos;ll Find Here</h3>
            <ul className="grid gap-3 sm:grid-cols-2 text-left">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full ${bgAccent}`}>
                    <span className={`h-2 w-2 rounded-full ${accentColor.replace('text-', 'bg-')}`} />
                  </span>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`bg-gradient-to-br ${color} py-16`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Ready to Join?</h2>
            <p className="mb-8 text-muted-foreground">
              Subscribe to {subtitle} on YouTube and become part of our growing community.
            </p>
            <Link
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-red-700"
            >
              <Youtube className="h-6 w-6" />
              Subscribe on YouTube
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Bedo Studio. All rights reserved.
            </p>
            <Link href="https://bedo.studio" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Back to main site
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
