import { Mail, MapPin, Globe } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            
            {/* Left Column - Info */}
            <div className="max-w-xl lg:max-w-lg">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                Contact
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Let's start a <span className="text-primary">conversation</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Whether you have a question about our projects, financial services, or your next adventure, we're here to help. Reach out and we'll get back to you shortly.
              </p>
              
              <dl className="mt-10 space-y-4 text-base leading-7 text-muted-foreground">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <Mail className="h-7 w-6 text-primary" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a className="hover:text-foreground transition-colors" href="mailto:hello@bedo.studio">
                      hello@bedo.studio
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Website</span>
                    <Globe className="h-7 w-6 text-primary" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a className="hover:text-foreground transition-colors" href="https://bedo.studio">
                      bedo.studio
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Location</span>
                    <MapPin className="h-7 w-6 text-primary" aria-hidden="true" />
                  </dt>
                  <dd>
                    Based in the Pacific Northwest<br />
                    Serving Worldwide
                  </dd>
                </div>
              </dl>
            </div>

            {/* Right Column - Form */}
            <div className="relative">
              <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 shadow-2xl ring-1 ring-white/10">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Send a Message
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fill out the form below and we'll respond as soon as possible.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
