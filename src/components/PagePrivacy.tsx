/**
 * Privacy Policy page — medhee.com/privacy
 * Required by Google Play Store and DPDP Act 2023.
 */

import { useEffect } from 'react';
import { ShieldCheck, ArrowLeft, Mail } from 'lucide-react';

const PRIMARY = '#2260FF';

export default function PagePrivacy() {
  useEffect(() => {
    document.title = 'Privacy Policy — Medhee Personal Health OS';
  }, []);
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <a
          href="/"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Medhee
        </a>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <ShieldCheck className="w-4 h-4" />
          DPDP Act 2023 Compliant
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Effective: July 23, 2026 · medhee.com</p>

        <p className="text-gray-600 leading-relaxed mb-10">
          Medhee ("we," "us," or "our") is committed to protecting your personal health information.
          This Privacy Policy explains what data we collect, why we collect it, how we use it, and
          your rights under India's Digital Personal Data Protection (DPDP) Act, 2023.
        </p>

        {/* Sections */}
        {[
          {
            title: '1. Data We Collect',
            bullets: [
              '<strong>Account Data:</strong> Name, email, age, gender, blood group.',
              '<strong>Health & Medical Data:</strong> Medicines, doses, conditions, allergies, lab report contents, symptom descriptions, and AI triage history.',
              '<strong>Prescriptions & Reports:</strong> Scanned photos processed via OCR for medicine and condition extraction.',
              '<strong>Device & Usage Data:</strong> App crash reports, feature usage analytics (anonymised), device model and OS version.',
            ],
          },
          {
            title: '2. How We Use Your Data',
            body:
              'Your data is strictly used to run 5-layer safety interaction checks, display daily medication schedules, extract lab report parameters, and provide AI symptom triage. Your data is never sold to third parties or used for advertising.',
          },
          {
            title: '3. Data Security & Storage',
            bullets: [
              'All data in transit is encrypted using TLS 1.2+.',
              'Data at rest is encrypted using AES-256.',
              'Uploaded prescription and report photos are deleted immediately after AI extraction.',
              'Authentication tokens are stored in the device secure enclave (Android Keystore / iOS Secure Enclave).',
            ],
          },
          {
            title: '4. Your Rights (DPDP Act 2023)',
            bullets: [
              '<strong>Right to Access:</strong> Request a copy of all personal data we hold about you.',
              '<strong>Right to Correction:</strong> Update or correct inaccurate data at any time via the app.',
              '<strong>Right to Erasure:</strong> Delete your account and all associated data from within the app (Settings → Delete Account).',
              '<strong>Right to Grievance Redressal:</strong> Contact our Data Protection Officer at privacy@medhee.com.',
            ],
          },
          {
            title: '5. Third-Party Services',
            body:
              'Medhee uses the following trusted sub-processors: Google Cloud (infrastructure), Cloudinary (image processing — files deleted post-extraction), Expo (mobile build & update delivery), and LiveKit (encrypted video consultations). Each sub-processor is bound by data processing agreements.',
          },
          {
            title: '6. Children\'s Privacy',
            body:
              'Medhee is not directed to children under 18. Family profile members under 18 are managed by the primary account holder who accepts full responsibility for their data.',
          },
          {
            title: '7. Changes to This Policy',
            body:
              'We will notify you of any material changes via in-app notification and by updating the effective date above. Continued use of Medhee after changes constitutes acceptance.',
          },
        ].map((section) => (
          <div
            key={section.title}
            className="bg-white border border-gray-100 rounded-2xl p-6 mb-4 shadow-sm"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
            {section.body && (
              <p className="text-gray-600 leading-relaxed text-sm">{section.body}</p>
            )}
            {section.bullets && (
              <ul className="space-y-2">
                {section.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: `• ${b}` }}
                  />
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Contact */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-3">8. Contact & Grievances</h2>
          <p className="text-sm text-gray-600 mb-4">
            For privacy inquiries, data rights requests, or to reach our Data Protection Officer:
          </p>
          <a
            href="mailto:privacy@medhee.com"
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 font-semibold text-sm px-4 py-3 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <Mail className="w-4 h-4" />
            privacy@medhee.com
          </a>
        </div>
      </div>
    </div>
  );
}
