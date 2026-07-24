/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import SectionHero from './components/SectionHero';
import SectionAppShowcase from './components/SectionAppShowcase';
import SectionZero from './components/SectionZero';
import SectionRahul from './components/SectionRahul';
import SectionBrain from './components/SectionBrain';
import SectionWhatWeBelieve from './components/SectionWhatWeBelieve';
import SectionBeforeProblems from './components/SectionBeforeProblems';
import SectionAILimits from './components/SectionAILimits';
import SectionTrust from './components/SectionTrust';
import SectionDashboard from './components/SectionDashboard';
import SectionVision from './components/SectionVision';
import SectionFooter from './components/SectionFooter';

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg-warm antialiased selection:bg-accent-soft selection:text-accent-emerald">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Layout Flow */}
      <main className="relative">
        
        {/* Section 1: Hero with central AI core & floating context cards inside iPhone */}
        <SectionHero />

        {/* Section 2: Interactive App Showcase featuring the 4 real app UI screens */}
        <SectionAppShowcase />

        {/* Section 3: "Healthcare Starts from Zero" Collapsible dark section */}
        <SectionZero />

        {/* Section 3: "Meet Rahul" interactive storyboard slider */}
        <SectionRahul />

        {/* Section 4: "The Medhee Brain" node connectivity flow */}
        <SectionBrain />

        {/* Section 5: "What We Believe" high-end minimalist copy (no icons, pure typographic rhythm) */}
        <SectionWhatWeBelieve />

        {/* Section 6: "Before Problems Become Emergencies" high-fidelity feature benefit cards */}
        <SectionBeforeProblems />

        {/* Section 7: "AI Knows Its Limits" low vs. moderate vs. high risk triage comparison matrices */}
        <SectionAILimits />

        {/* Section 8: "Trust" encryption, privacy, DPDP safeguards */}
        <SectionTrust />

        {/* Section 9: "Doctor Dashboard" interactive clinic portal */}
        <SectionDashboard />

        {/* Section 10: "Vision" roadmap timeline of continuous operating system integration */}
        <SectionVision />

        {/* Section 11: Final CTA + Elegant Minimalist footer */}
        <SectionFooter />

      </main>
    </div>
  );
}
