import { ChannelPage } from "@/components/channel-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bedo Financial | Personal Finance & Investing",
  description: "Personal finance, investing strategies, and money management tips. Build wealth and take control of your financial future.",
}

export default function FinancialPage() {
  return (
    <ChannelPage
      title="Financial"
      subtitle="Bedo Financial"
      description="Personal finance, investing strategies, and money management tips. Build wealth, understand markets, and take control of your financial future."
      longDescription="Bedo Financial breaks down complex money topics into digestible, actionable content. From budgeting basics to advanced investing strategies, we cover it all without the confusing jargon. Our goal is to help you make smarter financial decisions and build long-term wealth through education and practical advice."
      iconName="DollarSign"
      youtubeUrl="https://youtube.com/@bedofinancial"
      color="from-emerald-500/20 to-teal-500/20"
      accentColor="text-emerald-500"
      bgAccent="bg-emerald-500/10"
      features={[
        "Investing fundamentals",
        "Budgeting strategies",
        "Market analysis",
        "Passive income ideas",
        "Financial planning tips",
        "Economic news breakdowns",
      ]}
    />
  )
}
