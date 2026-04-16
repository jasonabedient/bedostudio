import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with us. Fill out our contact form and we will get back to you as soon as possible.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

import { headers } from 'next/headers'

function getThemeClass(host: string | null) {
  if (!host) return 'theme-create'
  if (host.includes('financial')) return 'theme-financial'
  if (host.includes('adventure')) return 'theme-adventure'
  return 'theme-create' // Default for Bedo Studio / Create
}

import { Header } from '@/components/header'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = await headers()
  const host = headersList.get('host')
  const themeClass = getThemeClass(host)

  return (
    <html lang="en" className={`bg-background dark ${geistSans.variable} ${geistMono.variable}`}>
      <body className={`font-sans antialiased ${themeClass}`}>
        <Header host={host} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
