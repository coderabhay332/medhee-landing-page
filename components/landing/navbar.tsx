'use client'

import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md"
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <a id="nav-logo-link" href="#" className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-primary"
          >
            <span className="block h-2.5 w-2.5 rounded-full bg-primary-foreground" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Medhee</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a id="nav-link-story" href="#story" className="transition-colors hover:text-foreground">
            How it works
          </a>
          <a id="nav-link-beliefs" href="#beliefs" className="transition-colors hover:text-foreground">
            Beliefs
          </a>
          <a id="nav-link-doctors" href="#doctors" className="transition-colors hover:text-foreground">
            For doctors
          </a>
          <a id="nav-link-trust" href="#trust" className="transition-colors hover:text-foreground">
            Trust
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            id="nav-btn-signin"
            href="#"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Sign in
          </a>
          <a
            id="nav-btn-download"
            href="#download"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Get Medhee
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
