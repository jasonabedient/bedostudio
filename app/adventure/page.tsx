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
      subscribeUrl="/subscribe"
      subscribeColor="bg-sky-600 hover:bg-sky-700"
      showYoutubeIcon={false}
      ctaDescription="Join The Adventure Dispatch newsletter to get raw logs on electric vehicles, hands-on tech, and road trip logs."
      ctaSubscribeText="Subscribe to Newsletter"
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
          title: "Hyundai IONIQ6 ICCU Failure Denied Complete Buy back. Don't Make This Mistake!",
          thumbnailUrl: "https://i.ytimg.com/vi/1nJHf-9Kk58/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=1nJHf-9Kk58",
          views: "96",
        },
        {
          title: "Your EV Charger Might Be Slower Than You Think!",
          thumbnailUrl: "https://i.ytimg.com/vi/Wp7OprE7Txk/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=Wp7OprE7Txk",
          views: "409",
        },
        {
          title: "Is the Rivian R1S the perfect adventure vehicle?",
          thumbnailUrl: "https://i.ytimg.com/vi/QnLJ3zjAmfQ/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=QnLJ3zjAmfQ",
          views: "27",
        },
      ]}
    />
  )
}
