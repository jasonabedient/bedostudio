import { ChannelPage } from "@/components/channel-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bedo Freedom | Personal Finance & Investing",
  description: "Financial freedom through investing, wealth building, and money management. Take control of your future and build the life you want.",
}

export default function FreedomPage() {
  return (
    <ChannelPage
      title="Freedom"
      subtitle="Bedo Freedom"
      description="Financial freedom through investing, wealth building, and money management. Take control of your future and build the life you want."
      longDescription="Bedo Freedom breaks down complex money topics into digestible, actionable content. From budgeting basics to advanced investing strategies, we cover it all without the confusing jargon. Our goal is to help you make smarter financial decisions and build long-term wealth through education and practical advice."
      iconName="DollarSign"
      youtubeUrl="https://youtube.com/@bedofreedom"
      color="from-emerald-500/20 to-teal-500/20"
      accentColor="text-emerald-500"
      bgAccent="bg-emerald-500/10"
      features={[
        "Investing fundamentals",
        "Budgeting strategies",
        "Market analysis",
        "Passive income ideas",
        "Freedom planning tips",
        "Economic news breakdowns",
      ]}
      videos={[
        {
          title: "50 and Burned Out: How I Got My Drive Back!",
          thumbnailUrl: "https://i.ytimg.com/vi/ikhbTfn4698/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=ikhbTfn4698",
          views: "2.1K",
        },
        {
          title: "Impulse shopping is killing your budget! Save $300 a month!",
          thumbnailUrl: "https://i.ytimg.com/vi/m_pzlvFN00Q/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=m_pzlvFN00Q",
          views: "1.5K",
        },
        {
          title: "How i lost over $100,000 buying an out of state rental property!",
          thumbnailUrl: "https://i.ytimg.com/vi/sPjXHXxWcPk/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=sPjXHXxWcPk",
          views: "4.8K",
        },
      ]}
    />
  )
}
