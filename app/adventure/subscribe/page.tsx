import type { Metadata } from "next"
import SubscribeForm from "./subscribe-form"

export const metadata: Metadata = {
  title: "Subscribe to The Adventure Dispatch | Bedo Adventure",
  description: "Get weekly logs on electric vehicles, hands-on tech, and curiosity-driven exploration. Straight from my private notes, direct to your inbox.",
}

export default function SubscribePage() {
  return <SubscribeForm />
}
