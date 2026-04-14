'use server'

import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export type ContactFormState = {
  success: boolean
  message: string
  errors?: {
    name?: string
    email?: string
    subject?: string
    message?: string
    consent?: string
  }
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string
  const consent = formData.get('consent') === 'on'

  // Get host for origin tracking
  const headersList = await headers()
  const host = headersList.get('host')

  // Validation
  const errors: ContactFormState['errors'] = {}

  if (!name || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!subject || subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters'
  }

  if (!message || message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  if (!consent) {
    errors.consent = 'You must agree to be contacted'
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please fix the errors below',
      errors,
    }
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.from('contact_submissions').insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      consent_given: consent,
      origin_host: host,
    })

    if (error) {
      console.error('Supabase error:', error)
      return {
        success: false,
        message: 'Something went wrong. Please try again later.',
      }
    }

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    }
  }
}
