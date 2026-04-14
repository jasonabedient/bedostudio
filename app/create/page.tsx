import { ChannelPage } from "@/components/channel-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bedo Create | Tutorials & Creative Projects",
  description: "Tutorials, creative projects, and hands-on guides for makers and builders. Learn new skills and unleash your creativity.",
}

export default function CreatePage() {
  return (
    <ChannelPage
      title="Create"
      subtitle="Bedo Create"
      description="Tutorials, creative projects, and hands-on guides for makers and builders. Learn new skills, follow along with projects, and unleash your creativity."
      longDescription="Bedo Create is your destination for learning and building. Whether you're a beginner looking to pick up new skills or an experienced creator seeking fresh ideas, we've got content tailored for you. Our tutorials are designed to be practical, engaging, and easy to follow along with at home."
      iconName="Palette"
      youtubeUrl="https://youtube.com/@bedocreate"
      color="from-orange-500/20 to-amber-500/20"
      accentColor="text-orange-500"
      bgAccent="bg-orange-500/10"
      features={[
        "Step-by-step tutorials",
        "DIY project guides",
        "Creative challenges",
        "Tool and software reviews",
        "Behind-the-scenes content",
        "Community spotlights",
      ]}
    />
  )
}
