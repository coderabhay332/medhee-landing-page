'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

/* ─── Waitlist Context ─── */

type WaitlistState = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const WaitlistContext = createContext<WaitlistState | null>(null)

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <WaitlistContext.Provider value={{ isOpen, open, close }}>
      {children}
      <WaitlistModal isOpen={isOpen} onClose={close} />
    </WaitlistContext.Provider>
  )
}

export function useWaitlist() {
  const ctx = useContext(WaitlistContext)
  if (!ctx) throw new Error('useWaitlist must be used within WaitlistProvider')
  return ctx
}

/* ─── Modal Component ─── */

type WaitlistModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Focus input on open
  useEffect(() => {
    if (isOpen && !submitted) {
      // Small delay to let animation start
      const timer = setTimeout(() => inputRef.current?.focus(), 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen, submitted])

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Basic focus trap
  useEffect(() => {
    if (!isOpen) return
    const modal = modalRef.current
    if (!modal) return

    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = modal.querySelectorAll<HTMLElement>(focusableSelector)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isOpen])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    // Store in localStorage (API integration later)
    try {
      const existing = JSON.parse(localStorage.getItem('medhee_waitlist') || '[]')
      if (!existing.includes(email)) {
        existing.push(email)
        localStorage.setItem('medhee_waitlist', JSON.stringify(existing))
      }
    } catch {
      // Silently handle storage errors
    }

    setSubmitted(true)
  }

  const handleClose = () => {
    onClose()
    // Reset state after close animation
    setTimeout(() => {
      setEmail('')
      setError('')
      setSubmitted(false)
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="waitlist-title"
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Overlay */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
          />

          {/* Card */}
          <motion.div
            className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-background p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <>
                {/* Header */}
                <div className="text-center">
                  <span
                    aria-hidden="true"
                    className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary"
                  >
                    <span className="block h-3 w-3 rounded-full bg-primary-foreground" />
                  </span>
                  <h2
                    id="waitlist-title"
                    className="mt-4 text-2xl font-semibold tracking-tight"
                  >
                    Join the Medhee Waitlist
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Be the first to experience healthcare that remembers you.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6" noValidate>
                  <label htmlFor="waitlist-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    ref={inputRef}
                    id="waitlist-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                    aria-invalid={!!error}
                    aria-describedby={error ? 'waitlist-error' : undefined}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  {error && (
                    <p id="waitlist-error" className="mt-2 text-xs text-red-500" role="alert">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="mt-4 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Join Waitlist
                  </button>
                </form>

                {/* Social proof */}
                <p className="mt-5 text-center text-xs text-muted-foreground">
                  Join 500+ people already on the waitlist
                </p>
              </>
            ) : (
              /* Success state */
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  aria-hidden="true"
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
                >
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <h2
                  id="waitlist-title"
                  className="mt-4 text-2xl font-semibold tracking-tight"
                >
                  You&apos;re on the list!
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  We&apos;ll notify you at <span className="font-medium text-foreground">{email}</span> when Medhee is ready.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
