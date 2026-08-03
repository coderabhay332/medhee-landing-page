/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function SectionFooter() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="final-cta" 
      className="relative py-16 md:py-20 bg-bg-warm overflow-hidden flex flex-col justify-center items-center border-t border-border-light/60"
    >
      {/* Background visual halo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-radial from-accent-soft/20 to-transparent blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center space-y-8 relative z-10">
        
        {/* Core Narrative / Headline */}
        <div className="space-y-6 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-emerald font-bold">The Core Assurance</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text leading-[1.12]">
            Everyone deserves the confidence of having a doctor who already knows them.
          </h2>
          <p className="text-sm sm:text-base text-secondary-text font-light max-w-xl mx-auto leading-relaxed">
            Download Medhee. Start your Personal Health Operating System on iOS or Android. Securely link your clinical record in 60 seconds.
          </p>
        </div>

        {/* Crisp Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="https://play.google.com/store/apps/details?id=com.medhee.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 rounded-full bg-primary-text hover:bg-accent-emerald text-white text-xs font-mono font-bold transition-all duration-300 shadow-md flex items-center gap-2"
          >
            DOWNLOAD MEDHEE
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          
          <a
            href="mailto:doctors@medhee.com"
            className="px-8 py-4 rounded-full bg-white hover:bg-bg-warm text-primary-text border border-border-light text-xs font-mono font-bold transition-all duration-300"
          >
            DOCTOR NETWORK PORTAL
          </a>
        </div>

        {/* Beautiful iPhone Welcome Mockup */}
        <div className="relative w-full max-w-[280px] h-[480px] bg-[#0c0c0d] rounded-[42px] p-[8px] shadow-[0_20px_45px_rgba(0,0,0,0.12)] border-4 border-[#2d2d30] overflow-hidden flex flex-col">
          
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-30" />

          {/* iPhone screen content */}
          <div className="flex-1 bg-white rounded-[34px] overflow-hidden p-5 pt-8 flex flex-col justify-between relative text-left">
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border-light/60">
                <span className="text-[8px] font-mono font-bold text-accent-emerald">MEDHEE OS</span>
                <span className="text-[7px] text-secondary-text">V1.0.4</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-primary-text">Welcome, Rahul</h4>
                <p className="text-[10px] text-secondary-text leading-relaxed font-light">
                  Your clinical memory blueprint is synced, encrypted, and continuous. You do not need to fill out any medical intake questionnaires.
                </p>
              </div>

              {/* Status capsule */}
              <div className="p-3 bg-accent-soft/40 border border-accent-soft rounded-xl space-y-1.5">
                <p className="text-[10px] font-bold text-accent-emerald flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Health context is active.
                </p>
                <p className="text-[8px] text-secondary-text font-light">
                  Verified connections to 1,200 on-call clinical specialists are online.
                </p>
              </div>
            </div>

            <div className="text-center">
              <span className="text-[8px] text-secondary-text font-mono">End-to-end local encryption</span>
              <div className="w-12 h-0.5 bg-primary-text rounded-full mx-auto mt-2" />
            </div>

          </div>
        </div>

        {/* Minimalist Corporate Footer */}
        <div className="w-full pt-16 border-t border-border-light/60 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-secondary-text font-light">
          <div>
            <button 
              onClick={handleScrollToTop}
              className="font-display font-bold text-primary-text hover:opacity-80 transition-opacity mr-3"
            >
              Medhee
            </button>
            <span>© 2026 Medhee Inc. All rights reserved.</span>
          </div>

          {/* Clean list of compliance links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="/privacy" className="font-medium text-primary-text hover:text-accent-emerald transition-colors underline underline-offset-4 decoration-accent-emerald/40">Privacy Policy</a>
            <a href="/terms" className="font-medium text-primary-text hover:text-accent-emerald transition-colors underline underline-offset-4 decoration-accent-emerald/40">Terms of Service</a>
            <a href="/privacy#security" className="hover:text-primary-text transition-colors">Clinical Safeguards</a>
            <a href="mailto:legal@medhee.com" className="hover:text-primary-text transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
