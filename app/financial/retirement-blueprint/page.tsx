import Script from "next/script"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Compass, ShieldCheck, TrendingUp, Wallet, Info } from "lucide-react"

export const metadata = {
  title: "5-Year Retirement Plan Blueprint | Bedo Financial",
  description: "Download your free 5-Year Retirement Plan Blueprint and start planning your financial future today.",
}

export default function RetirementBlueprintPage() {
  const timelineSteps = [
    { year: "5 years before", text: "Build the plan and fix structural risks" },
    { year: "4 years before", text: "Tax planning and portfolio transition" },
    { year: "3 years before", text: "Social Security and sequence-of-returns defense" },
    { year: "2 years before", text: "Build your retirement paycheck (first 24 months)" },
    { year: "1 year before", text: "Dry runs and execution checklist" },
    { year: "First year retired", text: "Monitor, adjust, stay calm" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* MailerLite Script */}
      <Script id="mailerlite-universal" strategy="afterInteractive">
        {`
          (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
          .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
          n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
          (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
          ml('account', '2276773');
        `}
      </Script>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back to Bedo Financial</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-emerald-500 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold tracking-tight">BEDO FINANCIAL</span>
          </div>
        </div>
      </header>

      <main>
        {/* Hero & Form Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 -z-10" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-600 shadow-sm border border-emerald-500/10">
                    <Compass className="h-10 w-10" />
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                    5-Year Retirement Plan Blueprint
                  </h1>
                </div>

                {/* Disclaimer/Note */}
                <div className="flex items-start gap-3 rounded-xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-700/30 p-4 text-amber-800 dark:text-amber-200">
                  <Info className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <p className="text-sm font-medium leading-relaxed">
                    This is an educational planning blueprint. It is not financial, tax, or legal advice.
                  </p>
                </div>

                {/* Timeline Overview */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    Timeline Overview
                  </h2>
                  <div className="relative space-y-4 before:absolute before:left-2 before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-emerald-500/20">
                    {timelineSteps.map((step, i) => (
                      <div key={i} className="relative pl-8">
                        <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-emerald-500 bg-background shadow-sm" />
                        <div className="space-y-1">
                          <p className="font-bold text-emerald-600 leading-none">{step.year}</p>
                          <p className="text-muted-foreground">{step.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:sticky lg:top-24">
                <div className="relative mx-auto w-full max-w-md">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-xl -z-10" />
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl md:p-8">
                    <h2 className="mb-6 text-2xl font-bold text-center">Get Your Blueprint</h2>
                    <p className="mb-8 text-center text-muted-foreground text-sm">
                      Enter your email below to receive the blueprint instantly.
                    </p>
                    
                    {/* MailerLite Form Placeholder */}
                    <div className="ml-embedded" data-form="6OR6dU"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Why this blueprint?</h2>
              <p className="text-lg text-muted-foreground">
                Most retirement planning is overly complex. We've distilled decades of financial wisdom 
                into a clear, actionable guide that anyone can follow.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Clear Roadmap",
                  desc: "A step-by-step guide from your first contribution to your first withdrawal.",
                  icon: TrendingUp
                },
                {
                  title: "Expert Insights",
                  desc: "Avoid common pitfalls that cost retirees thousands in taxes and lost growth.",
                  icon: ShieldCheck
                },
                {
                  title: "Actionable Steps",
                  desc: "No vague advice. Specific, measurable actions you can take today.",
                  icon: CheckCircle2
                }
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-border bg-background p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-emerald-500/20 flex items-center justify-center">
                <Wallet className="h-3.5 w-3.5 text-emerald-500" />
              </div>
              <span className="font-semibold tracking-tight text-sm">BEDO FINANCIAL</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Bedo Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
