'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

interface EmailLinkProps {
  email?: string
}

export function EmailLink({ email = 'hello@bedo.studio' }: EmailLinkProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    // Prevent default mailto behavior if clicking the copy icon button
    e.preventDefault()
    e.stopPropagation()

    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      toast.success('Email address copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email: ', err)
      toast.error('Failed to copy email to clipboard.')
    }
  }

  return (
    <div className="flex items-center gap-x-3 group/email">
      <a
        href={`mailto:${email}`}
        className="hover:text-foreground transition-colors font-medium text-muted-foreground flex items-center gap-x-2"
        title="Open default email client"
      >
        <span>{email}</span>
      </a>
      <button
        onClick={handleCopy}
        className="p-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer"
        title="Copy email to clipboard"
        aria-label="Copy email address"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Copy className="h-3.5 w-3.5 transition-transform group-hover/email:scale-105" />
        )}
      </button>
    </div>
  )
}
