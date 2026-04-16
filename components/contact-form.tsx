'use client'

import { useActionState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'

import { submitContactForm, type ContactFormState } from '@/app/actions/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Spinner } from '@/components/ui/spinner'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldDescription,
} from '@/components/ui/field'

const initialState: ContactFormState = {
  success: false,
  message: '',
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  )

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-primary/20 bg-primary/5 p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="flex size-20 items-center justify-center rounded-full bg-primary/20 ring-8 ring-primary/10">
          <CheckCircle2 className="size-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
          <p className="max-w-xs text-muted-foreground">
            {state.message || "We've received your request and will get back to you shortly."}
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="mt-2"
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {state.message && !state.success && (
        <div className="flex items-center gap-3 rounded-xl border-2 border-destructive/50 bg-destructive/10 px-5 py-4 text-sm font-semibold text-destructive animate-in slide-in-from-top-4 duration-300">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-destructive/20">
            !
          </div>
          {state.message}
        </div>
      )}

      <FieldGroup className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field data-invalid={!!state.errors?.name}>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              required
              disabled={isPending}
              aria-invalid={!!state.errors?.name}
              className="bg-background/50 focus:bg-background transition-all"
            />
            {state.errors?.name && <FieldError>{state.errors.name}</FieldError>}
          </Field>

          <Field data-invalid={!!state.errors?.email}>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="hello@example.com"
              required
              disabled={isPending}
              aria-invalid={!!state.errors?.email}
              className="bg-background/50 focus:bg-background transition-all"
            />
            {state.errors?.email && <FieldError>{state.errors.email}</FieldError>}
          </Field>
        </div>

        <Field data-invalid={!!state.errors?.subject}>
          <FieldLabel htmlFor="subject">Subject</FieldLabel>
          <Input
            id="subject"
            name="subject"
            type="text"
            placeholder="How can we help?"
            required
            disabled={isPending}
            aria-invalid={!!state.errors?.subject}
            className="bg-background/50 focus:bg-background transition-all"
          />
          {state.errors?.subject && (
            <FieldError>{state.errors.subject}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!state.errors?.message}>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us more about your inquiry..."
            rows={5}
            required
            disabled={isPending}
            aria-invalid={!!state.errors?.message}
            className="resize-none bg-background/50 focus:bg-background transition-all"
          />
          {state.errors?.message && (
            <FieldError>{state.errors.message}</FieldError>
          )}
        </Field>

        <Field
          orientation="horizontal"
          data-invalid={!!state.errors?.consent}
          className="items-start gap-3"
        >
          <Checkbox
            id="consent"
            name="consent"
            disabled={isPending}
            aria-invalid={!!state.errors?.consent}
            className="mt-1"
          />
          <div className="flex flex-col gap-1">
            <FieldLabel htmlFor="consent" className="cursor-pointer text-sm font-medium">
              I agree to be contacted
            </FieldLabel>
            <FieldDescription className="text-xs">
              By checking this box, you consent to Bedo Studio reaching out via email regarding your inquiry.
            </FieldDescription>
            {state.errors?.consent && (
              <FieldError>{state.errors.consent}</FieldError>
            )}
          </div>
        </Field>
      </FieldGroup>

      <Button 
        type="submit" 
        size="lg" 
        disabled={isPending} 
        className="w-full h-12 text-base font-semibold transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        {isPending ? (
          <>
            <Spinner className="mr-2 size-4" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="mr-2 size-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
