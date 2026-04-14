"use client"

import Link from "next/link"
import { ArrowUpRight, Palette, DollarSign, Mountain } from "lucide-react"

const channels = [
  {
    title: "Create",
    subtitle: "Bedo Create",
    description: "Tutorials, creative projects, and hands-on guides for makers and builders. Learn new skills, follow along with projects, and unleash your creativity.",
    icon: Palette,
    href: "https://create.bedo.studio",
    color: "from-orange-500/20 to-amber-500/20",
    accentColor: "text-orange-500",
    bgAccent: "bg-orange-500/10",
  },
  {
    title: "Financial",
    subtitle: "Bedo Financial",
    description: "Personal finance, investing strategies, and money management tips. Build wealth, understand markets, and take control of your financial future.",
    icon: DollarSign,
    href: "https://financial.bedo.studio",
    color: "from-emerald-500/20 to-teal-500/20",
    accentColor: "text-emerald-500",
    bgAccent: "bg-emerald-500/10",
  },
  {
    title: "Adventure",
    subtitle: "Bedo Adventure",
    description: "Travel vlogs, outdoor exploration, and adventure stories from around the world. Discover new places, experience different cultures, and get inspired to explore.",
    icon: Mountain,
    href: "https://adventure.bedo.studio",
    color: "from-sky-500/20 to-indigo-500/20",
    accentColor: "text-sky-500",
    bgAccent: "bg-sky-500/10",
  },
]

export function ChannelsSection() {
  return (
    <section id="channels" className="pt-10 pb-20 md:pt-16 md:pb-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Our Channels
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Three unique channels, each with its own focus and community. Find the content that speaks to you.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {channels.map((channel) => (
            <Link
              key={channel.title}
              href={channel.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${channel.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              <div className="relative flex flex-1 flex-col p-8">
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${channel.bgAccent}`}>
                  <channel.icon className={`h-8 w-8 ${channel.accentColor}`} />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-foreground">{channel.title}</h3>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className={`mb-4 text-sm font-medium ${channel.accentColor}`}>{channel.subtitle}</p>
                <p className="flex-1 text-muted-foreground leading-relaxed">
                  {channel.description}
                </p>
                <div className="mt-6 pt-6 border-t border-border">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Visit Channel
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
