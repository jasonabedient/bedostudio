import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sonlight Surfshop – In-Stock Surfboards | Bedo Create",
  description:
    "Interactive surfboard quiver & live inventory viewer for Sonlight Surfshop in Pacifica, CA (Linda Mar). Browse New, Used, and Rental surfboards.",
}

export default function SonlightSurfshopPage() {
  return (
    <div style={{ width: "100%", height: "100dvh", margin: 0, padding: 0, overflow: "hidden" }}>
      <iframe
        src="/sonlight-preview.html"
        title="Sonlight Surfshop – In-Stock Surfboards"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
      />
    </div>
  )
}
