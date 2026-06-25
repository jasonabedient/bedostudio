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
      subscribeUrl="/subscribe"
      subscribeColor="bg-orange-600 hover:bg-orange-700"
      showYoutubeIcon={false}
      ctaDescription="Join The Draft Bin newsletter to get raw ideas, UI/UX design assets, and practical AI workflows."
      ctaSubscribeText="Subscribe to Newsletter"
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
          title: "Is Google Stitch the Figma Killer? (A UX Designer’s Take)",
          thumbnailUrl: "https://i.ytimg.com/vi/4fuqUF_4rvI/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=4fuqUF_4rvI",
          views: "17",
        },
        {
          title: "Turn Any Photo Into Gallery-Worthy Art (Nano Banana + Figma Workflow)",
          thumbnailUrl: "https://i.ytimg.com/vi/CcAE77OS1lQ/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=CcAE77OS1lQ",
          views: "4",
        },
        {
          title: "Automate Figma Color Swatches with Claude (Mind-Blowing Speed)",
          thumbnailUrl: "https://i.ytimg.com/vi/Cg8ux-iCFTA/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=Cg8ux-iCFTA",
          views: "7",
        },
      ]}
    />
  )
}
