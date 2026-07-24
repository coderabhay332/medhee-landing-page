/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
          <a href="#hero" className="flex items-center gap-2 font-display text-base font-bold tracking-tight text-primary-text hover:opacity-80 transition-opacity">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-plum"></span>
            Medhee
          </a>
          <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-secondary-text">
            <a href="#app-showcase" className="hover:text-primary-text transition-colors">App Demo</a>
            <a href="#meet-rahul" className="hover:text-primary-text transition-colors">The Story</a>
            <a href="#doctor-dashboard" className="hover:text-primary-text transition-colors">Doctor Portal</a>
            <a href="#vision" className="hover:text-primary-text transition-colors">Vision</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={scrollToCTA}
            className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-dark text-surface-pure text-xs font-semibold hover:bg-surface-raised transition-all duration-300 shadow-sm"
            id="btn-nav-cta"
          >
            Download OS
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </motion.header>
    </div>
  );
}
