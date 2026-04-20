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
      color="from-purple-500/20 to-indigo-500/20"
      accentColor="text-purple-500"
      bgAccent="bg-purple-500/10"
      features={[
        "Step-by-step tutorials",
        "DIY project guides",
        "Creative challenges",
        "Tool and software reviews",
        "Behind-the-scenes content",
        "Community spotlights",
      ]}
      videos={[
        {
          title: "I tried Vercel + V0 AI website builder (and it’s insane)!",
          thumbnailUrl: "https://i.ytimg.com/vi/hCu9lU_wk1k/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=hCu9lU_wk1k",
          views: "1.2K",
        },
        {
          title: "Turn Notion Into Your Blog Engine | Antigravity Setup",
          thumbnailUrl: "https://i.ytimg.com/vi/zq-_f8rr6Yw/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=zq-_f8rr6Yw",
          views: "850",
        },
        {
          title: "Vision Design System 2.0",
          thumbnailUrl: "https://i.ytimg.com/vi/3EjYBQ5SQSQ/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=3EjYBQ5SQSQ",
          views: "2.4K",
        },
      ]}
    />
  )
}
