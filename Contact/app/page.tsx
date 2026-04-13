import { Mail, MapPin, Phone } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Info */}
          <div className="flex flex-col justify-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Get in touch
            </span>
            <h1 className="mt-2 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {"Let's start a conversation"}
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Have a question or want to work together? Fill out the form and
              {"we'll"} get back to you as soon as possible.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="mt-1 text-muted-foreground">
                    hello@example.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <p className="mt-1 text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p className="mt-1 text-muted-foreground">
                    123 Innovation Street
                    <br />
                    San Francisco, CA 94102
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex flex-col justify-center">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Send us a message
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {"We'd love to hear from you. Fill out the form below."}
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
