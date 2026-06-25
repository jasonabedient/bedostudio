"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Loader2, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SubscribeForm() {
  const [email, setEmail] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear status
    setStatus("loading")
    setErrorMessage("")

    // Honeypot spam check
    if (honeypot) {
      console.warn("Spam submission detected")
      // Pretend success to bots
      setStatus("success")
      return
    }

    const trimmedEmail = email.trim()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address.")
      return
    }

    try {
      const response = await fetch("/api/mailerlite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          source: "bedo_adventure_subscribe_page",
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus("success")
      } else {
        setStatus("error")
        setErrorMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Subscription error:", error)
      setStatus("error")
      setErrorMessage("A network error occurred. Please try again later.")
    }
  }

  return (
    <div className="theme-adventure min-h-screen bg-background relative flex flex-col overflow-hidden">
      {/* Background grids and glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,oklch(0.65_0.2_250_/_0.08)_0%,transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,oklch(0.65_0.2_250_/_0.04)_0%,transparent_45%)]" />
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Header with back button */}
      <header className="sticky top-0 z-10 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-xl">
          <div className="bg-card/40 border border-border/80 backdrop-blur-xl rounded-2xl p-6 md:p-10 shadow-2xl transition-all duration-300 hover:border-primary/30">
            
            {status !== "success" ? (
              <div className="space-y-6">
                
                {/* Brand Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Bedo Adventure
                </div>

                {/* Typography */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl flex items-center gap-2">
                    The Adventure Dispatch
                  </h1>
                  <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                    Weekly logs on electric vehicles, hands-on tech, and curiosity-driven exploration. Straight from my private notes, direct to your inbox.
                  </p>
                </div>

                {/* Values list */}
                <div className="space-y-3.5 text-sm md:text-base border-t border-b border-border/50 py-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground font-semibold">EV & Adventure Tech:</strong> In-depth breakdowns of electric vehicles, charging speeds, and hands-on tech reviews before you buy.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground font-semibold">Exploration & Travel Logs:</strong> Behind-the-scenes vlogs, trail reports, and destination guides to help you step outside your comfort zone.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground font-semibold">Gear & Travel Hacks:</strong> Honest, zero-fluff recommendations on adventure gear and road-trip strategies that actually save you time and money.
                    </span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3" novalidate>
                  {/* Honeypot field for bot mitigation */}
                  <div className="hidden" aria-hidden="true">
                    <input 
                      type="text" 
                      name="ml-honeypot" 
                      tabIndex={-1} 
                      value={honeypot} 
                      onChange={(e) => setHoneypot(e.target.value)} 
                      autoComplete="off" 
                    />
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="flex-grow">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-11 md:h-12 bg-background/50 border-border/80 focus-visible:border-primary text-base placeholder:text-muted-foreground/60 focus-visible:ring-primary/20"
                        autoComplete="email"
                        disabled={status === "loading"}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="h-11 md:h-12 px-6 font-semibold bg-primary hover:bg-primary/95 text-primary-foreground text-base shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-75 disabled:pointer-events-none"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Joining...
                        </>
                      ) : (
                        "Subscribe"
                      )}
                    </Button>
                  </div>

                  {/* Feedback Message */}
                  {status === "error" && (
                    <div className="text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3 animate-in fade-in slide-in-from-top-1 duration-200">
                      {errorMessage}
                    </div>
                  )}
                </form>

                <p className="text-xs text-muted-foreground/75 text-center mt-2">
                  Your email is secure. Unsubscribe at any time.
                </p>

              </div>
            ) : (
              /* Success State */
              <div className="text-center py-6 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <Check className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    You're on the list!
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base max-w-sm mx-auto">
                    Thanks for subscribing to <strong className="text-foreground font-semibold">The Adventure Dispatch</strong>. Keep an eye on your inbox for the next edition.
                  </p>
                </div>
                <div className="pt-2">
                  <Link href="/" passHref legacyBehavior>
                    <Button className="w-full sm:w-auto px-6 font-semibold bg-primary hover:bg-primary/95 text-primary-foreground">
                      Explore Bedo Adventure
                    </Button>
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border/40 bg-background/50">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bedo Studio. All rights reserved.</p>
          <Link href="https://bedo.studio" className="transition-colors hover:text-foreground">
            Back to main site
          </Link>
        </div>
      </footer>
    </div>
  )
}
