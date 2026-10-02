import Navbar from '@/src/components/Navbar';
import SectionHero from '@/src/components/SectionHero';
import SectionZero from '@/src/components/SectionZero';
import SectionAppShowcase from '@/src/components/SectionAppShowcase';
import SectionFeatureSuite from '@/src/components/SectionFeatureSuite';
import SectionRahul from '@/src/components/SectionRahul';
import SectionBeforeProblems from '@/src/components/SectionBeforeProblems';
import SectionAILimits from '@/src/components/SectionAILimits';
import SectionDashboard from '@/src/components/SectionDashboard';
import SectionTrust from '@/src/components/SectionTrust';
import SectionVision from '@/src/components/SectionVision';
import SectionFooter from '@/src/components/SectionFooter';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-bg-warm antialiased selection:bg-accent-soft selection:text-accent-emerald">
      <Navbar />
      <main className="relative">
        <SectionHero />
        <SectionZero />
        <SectionRahul />
        <SectionDashboard />
        <SectionFeatureSuite />
        <SectionAppShowcase />
        <SectionBeforeProblems />
        <SectionAILimits />
        <SectionTrust />
        <SectionVision />
        <SectionFooter />
      </main>
    </div>
  );
}
