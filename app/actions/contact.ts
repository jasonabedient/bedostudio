'use server'

import { headers } from 'next/headers'
import nodemailer from 'nodemailer'

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
  const host = headersList.get('host') || 'unknown'

  console.log('[Contact Form] Received submission:', {
    name,
    email,
    subject,
    consent,
    host,
  })

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
    console.warn('[Contact Form] Validation failed:', errors)
    return {
      success: false,
      message: 'Please fix the errors below',
      errors,
    }
  }

  // Read SMTP settings
  const hostSmtp = process.env.SMTP_HOST || 'smtp.fastmail.com'
  const portSmtp = parseInt(process.env.SMTP_PORT || '465', 10)
  const secureSmtp = process.env.SMTP_SECURE !== 'false' // default true (for port 465)
  const userSmtp = process.env.SMTP_USER
  const passSmtp = process.env.SMTP_PASS
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'hello@bedo.studio'

  if (!userSmtp || !passSmtp) {
    const errorMsg = 'SMTP credentials are not configured in environment variables (SMTP_USER/SMTP_PASS).'
    console.error(`[Contact Form] Configuration error: ${errorMsg}`)
    return {
      success: false,
      message: 'Email service configuration is missing. Please configure SMTP variables.',
    }
  }

  try {
    console.log(`[Contact Form] Preparing SMTP transport through ${hostSmtp}:${portSmtp}`)
    const transporter = nodemailer.createTransport({
      host: hostSmtp,
      port: portSmtp,
      secure: secureSmtp,
      auth: {
        user: userSmtp,
        pass: passSmtp,
      },
    })

    const mailOptions = {
      from: `Bedo Studio Contact Form <${userSmtp}>`,
      to: receiverEmail,
      replyTo: email.trim().toLowerCase(),
      subject: `[Contact Form] ${subject.trim()}`,
      text: `New Contact Form Submission\n\n` +
            `From: ${name.trim()} (${email.trim().toLowerCase()})\n` +
            `Subject: ${subject.trim()}\n` +
            `Origin Host: ${host}\n` +
            `Date: ${new Date().toLocaleString()}\n\n` +
            `Message:\n${message.trim()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #ef4444; padding-bottom: 10px; margin-top: 0;">New Contact Message</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #475569; width: 120px;">From:</td>
              <td style="padding: 6px 0; color: #0f172a;">${name.trim()} (&lt;${email.trim().toLowerCase()}&gt;)</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #475569;">Subject:</td>
              <td style="padding: 6px 0; color: #0f172a;">${subject.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #475569;">Origin Host:</td>
              <td style="padding: 6px 0; color: #0f172a;">${host}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #475569;">Date:</td>
              <td style="padding: 6px 0; color: #0f172a;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #ef4444; border-radius: 4px;">
            <p style="white-space: pre-wrap; color: #334155; margin: 0; font-size: 15px; line-height: 1.6;">${message.trim()}</p>
          </div>
          
          <hr style="margin-top: 30px; border: 0; border-top: 1px solid #e5e7eb;" />
          <p style="font-size: 12px; color: #64748b; text-align: center; margin-bottom: 0;">Sent from Bedo Studio Contact Page</p>
        </div>
      `,
    }

    console.log('[Contact Form] Sending mail...')
    const info = await transporter.sendMail(mailOptions)
    console.log('[Contact Form] Mail sent successfully. Message ID:', info.messageId)

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    }
  } catch (error: any) {
    console.error('[Contact Form] SMTP dispatch exception:', error)
    return {
      success: false,
      message: `Failed to send email: ${error?.message || 'SMTP server error.'}`,
    }
  }
}
