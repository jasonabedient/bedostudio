import type { Metadata } from "next"
import SubscribeForm from "./subscribe-form"

export const metadata: Metadata = {
  title: "Subscribe to The Draft Bin | Bedo Create",
  description: "Get weekly tactical lessons on UI/UX design systems, AI-powered brand building, and shipping digital products. Straight from my private Obsidian notes, direct to your inbox.",
}

export default function SubscribePage() {
  return <SubscribeForm />
}
