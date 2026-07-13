'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { WaitlistButton } from './waitlist-button'

const NAV_LINKS = [
  { id: 'nav-link-story', href: '#story', label: 'How it works' },
  { id: 'nav-link-beliefs', href: '#beliefs', label: 'Our Mission' },
  { id: 'nav-link-doctors', href: '#doctors', label: 'For doctors' },
  { id: 'nav-link-trust', href: '#trust', label: 'Trust' },
  { id: 'nav-link-pricing', href: '#pricing', label: 'Pricing' },
  { id: 'nav-link-team', href: '#team', label: 'Team' },
]

function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { rootMargin: '-30% 0px -60% 0px' }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [sectionIds])

  return activeSection
}

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const sectionIds = ['story', 'beliefs', 'doctors', 'trust', 'pricing', 'team']
  const activeSection = useActiveSection(sectionIds)
  const scrolled = useScrolled()

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? 'bg-background/95 border-border/80 shadow-[0_2px_20px_rgba(0,0,0,0.02)]'
          : 'bg-[#09090b]/40 border-white/5'
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <a id="nav-logo-link" href="#" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(14,107,82,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>
          <span className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${scrolled ? 'text-foreground' : 'text-white'}`}>
            Medhee
          </span>
        </a>

        {/* Desktop nav links */}
        <div className={`hidden items-center gap-8 text-sm transition-colors duration-300 md:flex ${scrolled ? 'text-muted-foreground' : 'text-white/60'}`}>
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <a
                key={link.id}
                id={link.id}
                href={link.href}
                className={`relative transition-colors hover:text-foreground ${
                  isActive ? (scrolled ? 'text-foreground font-semibold' : 'text-white font-semibold') : ''
                } ${!scrolled ? 'hover:text-white' : ''}`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${scrolled ? 'bg-primary' : 'bg-emerald-400'}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <WaitlistButton
            id="nav-btn-download"
            variant={scrolled ? 'dark' : 'outline'}
            className={!scrolled ? 'border-white/20! bg-white/5! hover:bg-white/15! text-white! px-5! py-2!' : 'px-5! py-2!'}
          >
            Join Waitlist
          </WaitlistButton>

          {/* Mobile hamburger button */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
              scrolled 
                ? 'text-foreground hover:bg-muted' 
                : 'text-white hover:bg-white/10'
            } md:hidden`}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden border-t backdrop-blur-md md:hidden ${
              scrolled 
                ? 'border-border/60 bg-background/95' 
                : 'border-white/5 bg-[#09090b]/95'
            }`}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={closeMobile}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? (scrolled ? 'bg-primary/5 text-primary' : 'bg-white/5 text-emerald-400')
                        : (scrolled ? 'text-muted-foreground hover:bg-muted' : 'text-white/60 hover:bg-white/5')
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
              <WaitlistButton
                variant={scrolled ? 'dark' : 'primary'}
                className="mt-2 w-full rounded-full px-4 py-2.5 text-center"
              >
                Join Waitlist
              </WaitlistButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
