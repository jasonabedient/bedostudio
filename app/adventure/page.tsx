import { ChannelPage } from "@/components/channel-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bedo Adventure | Travel & Exploration",
  description: "Travel vlogs, outdoor exploration, and adventure stories from around the world. Get inspired to explore.",
}

export default function AdventurePage() {
  return (
    <ChannelPage
      title="Adventure"
      subtitle="Bedo Adventure"
      description="Travel vlogs, outdoor exploration, and adventure stories from around the world. Discover new places, experience different cultures, and get inspired to explore."
      longDescription="Bedo Adventure takes you on journeys to incredible destinations around the globe. From hiking remote trails to exploring vibrant cities, we capture the essence of travel and share it with our community. Our videos are designed to inspire you to step outside your comfort zone and experience the world."
      iconName="Mountain"
      youtubeUrl="https://youtube.com/@bedoadventure"
      color="from-sky-500/20 to-indigo-500/20"
      accentColor="text-sky-500"
      bgAccent="bg-sky-500/10"
      features={[
        "Travel vlogs",
        "Destination guides",
        "Hiking adventures",
        "Cultural experiences",
        "Travel tips & hacks",
        "Gear recommendations",
      ]}
      videos={[
        {
          title: "Work life balance! Mountain biking and the Rivian R1S!",
          thumbnailUrl: "https://i.ytimg.com/vi/QnLJ3zjAmfQ/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=QnLJ3zjAmfQ",
          views: "1.2K",
        },
        {
          title: "Gold robotaxis in the wild!",
          thumbnailUrl: "https://i.ytimg.com/vi/EL9_k-jxcTY/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=EL9_k-jxcTY",
          views: "3.5K",
        },
        {
          title: "DIY Paint Protection Film on My Rivian R1S for Less!",
          thumbnailUrl: "https://i.ytimg.com/vi/Q3FBOgLhdcY/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=Q3FBOgLhdcY",
          views: "920",
        },
      ]}
    />
  )
}
