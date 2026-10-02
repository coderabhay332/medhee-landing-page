'use client';

export default function Navbar() {
  const scrollToCTA = () => {
    document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header id="medhee-navbar" className="fixed top-0 inset-x-0 z-50 bg-white border-b border-border-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex justify-between items-center">
        <div className="flex items-center gap-6 md:gap-8">
          <a href="#hero" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-primary-text hover:opacity-80 transition-opacity">
            <img src="/medhee-logo.svg" alt="" width="32" height="32" className="h-8 w-8" />
            Medhee
          </a>
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-secondary-text">
            <a href="#meet-rahul" className="hover:text-primary-text transition-colors">How it works</a>
            <a href="#doctor-dashboard" className="hover:text-primary-text transition-colors">For doctors</a>
            <a href="#features" className="hover:text-primary-text transition-colors">Features</a>
            <a href="#trust" className="hover:text-primary-text transition-colors">Privacy</a>
            <a href="/drugs" className="hover:text-primary-text transition-colors">Drug library</a>
          </nav>
        </div>

        <button
          onClick={scrollToCTA}
          className="px-4 py-2 rounded-lg bg-surface-dark text-surface-pure text-sm font-semibold hover:bg-surface-raised transition-colors"
          id="btn-nav-cta"
        >
          Join the waitlist
        </button>
      </div>
    </header>
  );
}
