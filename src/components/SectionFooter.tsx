'use client';

import WaitlistForm from './WaitlistForm';

export default function SectionFooter() {
  return (
    <footer id="final-cta" className="relative py-16 md:py-20 bg-white border-t border-border-light">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center space-y-8">
        <div className="space-y-4 max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text leading-[1.12]">
            Like having a doctor in the family
          </h2>
          <p className="text-base text-secondary-text max-w-xl mx-auto leading-relaxed">
            Medhee is in beta. Join the waitlist and we'll email you when it's ready for you.
          </p>
        </div>

        <WaitlistForm />

        <a href="mailto:doctors@medhee.com" className="text-sm text-secondary-text hover:text-primary-text underline underline-offset-4 transition-colors">
          Are you a doctor? Email us to join →
        </a>

        <div className="w-full pt-12 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-secondary-text">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-lg font-bold tracking-tight text-primary-text hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              <img src="/medhee-logo.svg" alt="" width="32" height="32" className="h-8 w-8" />
              Medhee
            </button>
            <a href="https://www.nvidia.com/en-us/startups/" target="_blank" rel="noopener noreferrer" aria-label="NVIDIA Inception Program member">
              <img src="/nvidia-inception-badge.svg" alt="NVIDIA Inception Program member" className="h-7 w-auto opacity-80 hover:opacity-100 transition-opacity" />
            </a>
            <span>© 2026 Medhee Inc.</span>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-6">
            <a href="/drugs" className="hover:text-primary-text transition-colors">
              Drug library
            </a>
            <a href="/privacy" className="hover:text-primary-text transition-colors">
              Privacy policy
            </a>
            <a href="/terms" className="hover:text-primary-text transition-colors">
              Terms
            </a>
            <a href="mailto:beta@medhee.com" className="hover:text-primary-text transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
