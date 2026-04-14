import { Play, Heart, Sparkles, Users } from "lucide-react"

const features = [
  {
    icon: Play,
    title: "Quality Content",
    description: "Every video is crafted with care, from research to final edit, ensuring value in every watch.",
  },
  {
    icon: Heart,
    title: "Passion Driven",
    description: "We create content we genuinely love, and that passion shines through in every upload.",
  },
  {
    icon: Sparkles,
    title: "Always Evolving",
    description: "We continuously improve our content based on feedback and emerging trends.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Our viewers are at the heart of everything we do. Your feedback shapes our content.",
  },
]

export function FeaturesSection() {
  return (
    <section id="about" className="border-t border-border bg-secondary/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            About Bedo Studio
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We believe in creating content that educates, inspires, and entertains. Three channels, one mission.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
