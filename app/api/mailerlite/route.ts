import { NextRequest, NextResponse } from "next/server"

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID
const MAILERLITE_BASE_URL = "https://connect.mailerlite.com/api"

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json()

    if (!email || !MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
      return NextResponse.json(
        { success: false, error: "Missing required credentials" },
        { status: 400 }
      )
    }

    const response = await fetch(`${MAILERLITE_BASE_URL}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MAILERLITE_API_KEY}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        fields: { source: source || "ev_calculator" },
        groups: [MAILERLITE_GROUP_ID],
      }),
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json({ success: true, subscriber: data })
    }

    // Handle duplicate subscriber (already in list)
    if (response.status === 422 || data?.errors?.some((e: any) => e.status === 422)) {
      return NextResponse.json({ success: true, message: "Already subscribed" })
    }

    return NextResponse.json(
      { success: false, error: "MailerLite API error", details: data },
      { status: response.status }
    )
  } catch (error) {
    console.error("MailerLite API error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
