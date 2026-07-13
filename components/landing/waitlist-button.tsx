'use client'

import { useWaitlist } from './waitlist-modal'

type WaitlistButtonProps = {
  children?: React.ReactNode
  className?: string
  variant?: 'primary' | 'dark' | 'outline'
  id?: string
}

const variants = {
  primary:
    'rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90',
  dark:
    'rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85',
  outline:
    'rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted',
}

export function WaitlistButton({
  children = 'Join Waitlist',
  className = '',
  variant = 'primary',
  id,
}: WaitlistButtonProps) {
  const { open } = useWaitlist()

  return (
    <button
      id={id}
      type="button"
      onClick={open}
      className={`${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
