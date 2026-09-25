import Navbar from '@/src/components/Navbar';
import SectionHero from '@/src/components/SectionHero';
import SectionAppShowcase from '@/src/components/SectionAppShowcase';
import SectionZero from '@/src/components/SectionZero';
import SectionRahul from '@/src/components/SectionRahul';
import SectionBrain from '@/src/components/SectionBrain';
import SectionWhatWeBelieve from '@/src/components/SectionWhatWeBelieve';
import SectionBeforeProblems from '@/src/components/SectionBeforeProblems';
import SectionAILimits from '@/src/components/SectionAILimits';
import SectionTrust from '@/src/components/SectionTrust';
import SectionDashboard from '@/src/components/SectionDashboard';
import SectionVision from '@/src/components/SectionVision';
import SectionFooter from '@/src/components/SectionFooter';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-bg-warm antialiased selection:bg-accent-soft selection:text-accent-emerald">
      <Navbar />
      <main className="relative">
        <SectionHero />
        <SectionAppShowcase />
        <SectionZero />
        <SectionRahul />
        <SectionBrain />
        <SectionWhatWeBelieve />
        <SectionBeforeProblems />
        <SectionAILimits />
        <SectionTrust />
        <SectionDashboard />
        <SectionVision />
        <SectionFooter />
      </main>
    </div>
  );
}
