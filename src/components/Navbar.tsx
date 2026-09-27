'use client';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const scrollToCTA = () => {
    const element = document.getElementById('final-cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto w-full max-w-5xl bg-white/90 backdrop-blur-xl border border-border-light shadow-2 shadow-black/5 rounded-full px-5 py-2.5 flex justify-between items-center"
        id="medhee-navbar"
      >
        <div className="flex items-center gap-6 md:gap-8">
          <a href="#hero" className="flex items-center gap-2.5 font-display text-base font-bold tracking-tight text-primary-text hover:opacity-80 transition-opacity">
            <img src="/medhee-logo.svg" alt="" width="32" height="32" className="h-8 w-8" />
            Medhee
          </a>
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-secondary-text">
            <a href="#features" className="hover:text-primary-text transition-colors">Features</a>
            <a href="#meet-rahul" className="hover:text-primary-text transition-colors">How it works</a>
            <a href="#doctor-dashboard" className="hover:text-primary-text transition-colors">For doctors</a>
            <a href="#trust" className="hover:text-primary-text transition-colors">Privacy</a>
            <a href="/drugs" className="hover:text-primary-text transition-colors">Drug library</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={scrollToCTA}
            className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-dark text-surface-pure text-sm font-semibold hover:bg-surface-raised transition-colors"
            id="btn-nav-cta"
          >
            Join the waitlist
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </motion.header>
    </div>
  );
}
