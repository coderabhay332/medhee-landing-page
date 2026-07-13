import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Medhee',
  description:
    'Learn how Medhee collects, uses, and protects your personal health data. DPDP compliant, end-to-end encrypted, and your data is never sold.',
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: July 7, 2026
        </p>

        <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              1. Data We Collect
            </h2>
            <p className="mt-3">
              Medhee collects the following categories of personal data to provide
              you with a personalised health experience:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Account information (name, email, phone number)</li>
              <li>Health records you upload (prescriptions, lab reports, discharge summaries)</li>
              <li>Medication history and allergy information</li>
              <li>Interaction logs with our AI health assistant</li>
              <li>Device and usage data (app version, crash logs, anonymised analytics)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              2. How We Use Your Data
            </h2>
            <p className="mt-3">Your data is used exclusively to:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Provide personalised health insights and medication safety checks</li>
              <li>Enable verified doctors to access your history during consultations</li>
              <li>Improve the accuracy of our AI-driven health recommendations</li>
              <li>Send critical health alerts and reminders</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
            <p className="mt-3 font-medium text-primary">
              Your data is never sold to third parties. Ever.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              3. Data Storage &amp; Encryption
            </h2>
            <p className="mt-3">
              All personal health data is protected with{' '}
              <strong>end-to-end encryption</strong> both in transit and at rest.
              Your health records are encrypted using AES-256 before being stored on
              our servers. Only you and the healthcare professionals you explicitly
              authorise can decrypt and view your records.
            </p>
            <p className="mt-3">
              Data is stored on secure, SOC 2 compliant infrastructure within India,
              ensuring compliance with data residency requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              4. Data Sharing
            </h2>
            <p className="mt-3">We share your data only when:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>You explicitly grant access to a verified healthcare provider</li>
              <li>Required by law or a valid court order</li>
              <li>Necessary to prevent imminent harm (emergency situations)</li>
            </ul>
            <p className="mt-3">
              We do not share data with advertisers, data brokers, or any
              third-party analytics services that can identify you personally.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              5. DPDP Compliance
            </h2>
            <p className="mt-3">
              Medhee is fully compliant with India&apos;s{' '}
              <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>. We
              act as a Data Fiduciary and process your data only for the purposes you
              have consented to. You may withdraw consent at any time through the app
              settings.
            </p>
            <p className="mt-3">
              We maintain a Data Protection Officer (DPO) who can be reached at{' '}
              <a
                href="mailto:dpo@medhee.com"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                dpo@medhee.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              6. Your Rights
            </h2>
            <p className="mt-3">As a Medhee user, you have the right to:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Access all personal data we hold about you</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Withdraw consent for data processing</li>
              <li>Request complete deletion of your account and data</li>
              <li>Export your health data in a portable format</li>
              <li>Nominate a representative to exercise these rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              7. Data Deletion
            </h2>
            <p className="mt-3">
              You can request deletion of your account and all associated data at any
              time from your app settings or by emailing{' '}
              <a
                href="mailto:hello@medhee.com"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                hello@medhee.com
              </a>
              . Upon request, we will permanently delete your data within 30 days,
              except where retention is required by law.
            </p>
            <p className="mt-3">
              Anonymised, aggregated data that cannot be linked back to you may be
              retained for research and product improvement purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              8. Changes to This Policy
            </h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. Significant changes
              will be communicated through the app and via email. Continued use of
              Medhee after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              Questions about your privacy?{' '}
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
