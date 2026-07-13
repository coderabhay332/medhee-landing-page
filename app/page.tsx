import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { LogoBar } from '@/components/landing/logo-bar'
import { SocialProof } from '@/components/landing/social-proof'
import { ZeroSection } from '@/components/landing/zero-section'
import { RahulStory } from '@/components/landing/rahul-story'
import { Brain } from '@/components/landing/brain'
import { Beliefs } from '@/components/landing/beliefs'
import { Benefits } from '@/components/landing/benefits'
import { AppShowcase } from '@/components/landing/showcase'
import { RiskLevels, Trust } from '@/components/landing/risk-trust'
import { Pricing } from '@/components/landing/pricing'
import { DoctorDashboard } from '@/components/landing/doctor-dashboard'
import { Vision, FinalCta, Footer } from '@/components/landing/vision-cta'
import { Team } from '@/components/landing/team'
import { WaitlistProvider } from '@/components/landing/waitlist-modal'

export default function Page() {
  return (
    <WaitlistProvider>
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <SocialProof />
        <ZeroSection />
        <RahulStory />
        <Brain />
        <Beliefs />
        <Benefits />
        <AppShowcase />
        <RiskLevels />
        <Trust />
        <Pricing />
        <DoctorDashboard />
        <Vision />
        <Team />
        <FinalCta />
      </main>
      <Footer />
    </WaitlistProvider>
  )
}
