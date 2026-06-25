import type { Metadata } from "next"
import SubscribeForm from "./subscribe-form"

export const metadata: Metadata = {
  title: "Subscribe to The Freedom Blueprint | Bedo Freedom",
  description: "Get weekly personal finance tips, passive income strategies, and portfolio building guides. Straight from my private notes, direct to your inbox.",
}

export default function SubscribePage() {
  return <SubscribeForm />
}
