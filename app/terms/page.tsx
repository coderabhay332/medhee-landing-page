import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — Medhee',
  description:
    'Terms of Service for using Medhee, the Personal Health Operating System. Read about service usage, health disclaimers, and user responsibilities.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Back to home
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <span
              aria-hidden="true"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-primary"
            >
              <span className="block h-2 w-2 rounded-full bg-primary-foreground" />
            </span>
            <span className="font-semibold tracking-tight">Medhee</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: July 7, 2026
        </p>

        <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              1. Acceptance of Terms
            </h2>
            <p className="mt-3">
              By creating an account or using Medhee, you agree to be bound by these
              Terms of Service. If you do not agree with any part of these terms,
              please do not use our service. These terms constitute a legally binding
              agreement between you and Medhee Health Technologies Pvt. Ltd.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              2. Service Description
            </h2>
            <p className="mt-3">
              Medhee is a Personal Health Operating System that helps you manage your
              health information. Our services include:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Secure storage and organisation of health records</li>
              <li>AI-powered medication safety checks and health insights</li>
              <li>Connection with verified healthcare professionals</li>
              <li>Health reminders and medication tracking</li>
              <li>Emergency health profile sharing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              3. User Accounts
            </h2>
            <p className="mt-3">
              You are responsible for maintaining the confidentiality of your account
              credentials. You must provide accurate and complete information when
              creating your account. You agree to:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Provide truthful and accurate personal and health information</li>
              <li>Keep your login credentials secure and not share them</li>
              <li>Notify us immediately of any unauthorised access to your account</li>
              <li>Be at least 18 years old, or have parental consent if a minor</li>
            </ul>
          </section>

          <section className="rounded-xl border border-primary/20 bg-accent p-6">
            <h2 className="text-xl font-semibold tracking-tight text-primary">
              4. Health Disclaimer
            </h2>
            <p className="mt-3">
              <strong>
                Medhee&apos;s AI-powered features are not a substitute for professional
                medical advice, diagnosis, or treatment.
              </strong>
            </p>
            <p className="mt-3">
              Our AI assistant provides general health information and medication
              safety alerts based on the data you provide. It is designed to support —
              not replace — the relationship between you and your healthcare provider.
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Always consult a qualified doctor for medical decisions</li>
              <li>Do not disregard professional medical advice based on AI suggestions</li>
              <li>In case of emergency, call your local emergency services immediately</li>
              <li>AI recommendations have built-in safeguards but are not infallible</li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Our platform connects you with verified, licensed doctors for
              professional consultations when needed. AI safeguards include
              confidence scoring, automatic escalation to human doctors for critical
              cases, and clear labelling of AI-generated content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              5. Verified Doctors
            </h2>
            <p className="mt-3">
              Healthcare professionals on Medhee are verified through a rigorous
              credentialing process including license verification, identity checks,
              and background validation. However, Medhee facilitates the connection
              and is not responsible for the medical advice provided by individual
              practitioners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              6. AI Safeguards
            </h2>
            <p className="mt-3">
              Our AI systems are designed with multiple layers of safety:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Drug interaction alerts are cross-referenced with verified medical databases</li>
              <li>Critical health situations are automatically flagged for human review</li>
              <li>AI responses include confidence levels and source citations</li>
              <li>Regular audits by medical professionals ensure accuracy</li>
              <li>All AI-generated content is clearly labelled as such</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              7. Limitations of Liability
            </h2>
            <p className="mt-3">
              To the maximum extent permitted by law, Medhee shall not be liable for:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Any medical decisions made based on information from the platform</li>
              <li>Temporary service interruptions or technical issues</li>
              <li>Actions or advice of third-party healthcare providers</li>
              <li>Data loss beyond what is covered by our backup systems</li>
              <li>Indirect, incidental, or consequential damages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              8. Termination
            </h2>
            <p className="mt-3">
              You may terminate your account at any time through the app settings.
              Upon termination, your data will be handled according to our{' '}
              <Link
                href="/privacy"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p className="mt-3">
              We reserve the right to suspend or terminate accounts that violate these
              terms, engage in fraudulent activity, or misuse the platform in ways
              that could harm other users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              9. Governing Law
            </h2>
            <p className="mt-3">
              These terms are governed by the laws of India. Any disputes shall be
              subject to the exclusive jurisdiction of the courts in Bengaluru,
              Karnataka.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              Questions about these terms?{' '}
              <a
                href="mailto:hello@medhee.com"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                hello@medhee.com
              </a>
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
