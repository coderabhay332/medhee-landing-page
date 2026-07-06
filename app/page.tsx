import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { ZeroSection } from '@/components/landing/zero-section'
import { RahulStory } from '@/components/landing/rahul-story'
import { Brain } from '@/components/landing/brain'
import { Beliefs } from '@/components/landing/beliefs'
import { Benefits } from '@/components/landing/benefits'
import { AppShowcase } from '@/components/landing/showcase'
import { RiskLevels, Trust } from '@/components/landing/risk-trust'
import { DoctorDashboard } from '@/components/landing/doctor-dashboard'
import { Vision, FinalCta, Footer } from '@/components/landing/vision-cta'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ZeroSection />
        <RahulStory />
        <Brain />
        <Beliefs />
        <Benefits />
        <AppShowcase />
        <RiskLevels />
        <Trust />
        <DoctorDashboard />
        <Vision />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
