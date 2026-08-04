import { ChannelPage } from "@/components/channel-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bedo Adventure | EV, Tech & Off-Grid Exploration",
  description: "Real-world electric vehicle logs, off-grid battery setups, EV road trips, and modern adventure gear.",
}

export default function AdventurePage() {
  return (
    <ChannelPage
      title="Adventure"
      subtitle="Bedo Adventure"
      description="Real-world electric vehicle logs, off-grid battery setups, EV road trips, and modern adventure gear."
      longDescription={
        <>
          Bedo Adventure explores the intersection of technology and outdoor exploration. From detailed logs on electric vehicles like the Rivian R1S and Hyundai IONIQ 6, to hands-on solar battery setups and road trip planning, we share practical guides for modern off-grid adventures. We also built <a href="http://whatthecharge.com" target="_blank" rel="noopener noreferrer" className="text-sky-500 underline hover:text-sky-400 transition-colors">What the Charge?</a>, an EV charging calculator to help you estimate and plan charging speeds for your road trips.
        </>
      }
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
        "Electric vehicle logs",
        "EV charging guides",
        "Solar & battery tech",
        "Off-grid gear reviews",
        "Road trip planning",
        "Hands-on DIY guides",
      ]}
      videos={[
        {
          title: "15 Rivian Accessories I Can't Live Without (R1S, R1T, R2)",
          thumbnailUrl: "https://i.ytimg.com/vi/nOtGez5lBOk/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=nOtGez5lBOk",
          views: "383",
        },
        {
          title: "TAXA TigerMoth Battery Swap: Upgrading to Mighty Max 100Ah",
          thumbnailUrl: "https://i.ytimg.com/vi/pPM-OUVMECY/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=pPM-OUVMECY",
          views: "24",
        },
        {
          title: "Rivian R1S 3-Month Update: Is Buying Used Actually Worth It?",
          thumbnailUrl: "https://i.ytimg.com/vi/L6L9Vv2-2nU/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=L6L9Vv2-2nU",
          views: "5.5K",
        },
      ]}
    />
  )
}
