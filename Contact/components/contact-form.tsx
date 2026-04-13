'use client'

import { useActionState } from 'react'
import { Mail, User, MessageSquare, FileText, CheckCircle2 } from 'lucide-react'

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
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="size-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Message Sent</h3>
        <p className="text-muted-foreground">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state.message && !state.success && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.message}
        </div>
      )}

      <FieldGroup>
        <Field data-invalid={!!state.errors?.name}>
          <FieldLabel htmlFor="name" className="flex items-center gap-2">
            <User className="size-4 text-muted-foreground" />
            Name
          </FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            disabled={isPending}
            aria-invalid={!!state.errors?.name}
          />
          {state.errors?.name && <FieldError>{state.errors.name}</FieldError>}
        </Field>

        <Field data-invalid={!!state.errors?.email}>
          <FieldLabel htmlFor="email" className="flex items-center gap-2">
            <Mail className="size-4 text-muted-foreground" />
            Email
          </FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            disabled={isPending}
            aria-invalid={!!state.errors?.email}
          />
          {state.errors?.email && <FieldError>{state.errors.email}</FieldError>}
        </Field>

        <Field data-invalid={!!state.errors?.subject}>
          <FieldLabel htmlFor="subject" className="flex items-center gap-2">
            <FileText className="size-4 text-muted-foreground" />
            Subject
          </FieldLabel>
          <Input
            id="subject"
            name="subject"
            type="text"
            placeholder="How can we help?"
            required
            disabled={isPending}
            aria-invalid={!!state.errors?.subject}
          />
          {state.errors?.subject && (
            <FieldError>{state.errors.subject}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!state.errors?.message}>
          <FieldLabel htmlFor="message" className="flex items-center gap-2">
            <MessageSquare className="size-4 text-muted-foreground" />
            Message
          </FieldLabel>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us more about your inquiry..."
            rows={5}
            required
            disabled={isPending}
            aria-invalid={!!state.errors?.message}
            className="resize-none"
          />
          {state.errors?.message && (
            <FieldError>{state.errors.message}</FieldError>
          )}
        </Field>

        <Field
          orientation="horizontal"
          data-invalid={!!state.errors?.consent}
          className="items-start"
        >
          <Checkbox
            id="consent"
            name="consent"
            disabled={isPending}
            aria-invalid={!!state.errors?.consent}
          />
          <div className="flex flex-col gap-1">
            <FieldLabel htmlFor="consent" className="cursor-pointer">
              I agree to be contacted
            </FieldLabel>
            <FieldDescription>
              By checking this box, you consent to us reaching out to you via
              email regarding your inquiry.
            </FieldDescription>
            {state.errors?.consent && (
              <FieldError>{state.errors.consent}</FieldError>
            )}
          </div>
        </Field>
      </FieldGroup>

      <Button type="submit" size="lg" disabled={isPending} className="w-full">
        {isPending ? (
          <>
            <Spinner className="size-4" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  )
}
