/**
 * Terms & Conditions page — medhee.com/terms
 * Required by Google Play Store.
 */

import { ArrowLeft, FileText, Mail } from 'lucide-react';

export default function PageTerms() {
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
        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <FileText className="w-4 h-4" />
          Terms & Conditions
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-10">Effective: July 23, 2026 · medhee.com</p>

        <p className="text-gray-600 leading-relaxed mb-10">
          These Terms of Service ("Terms") govern your use of the Medhee mobile application and
          website (collectively, the "Service"). By creating an account or using the Service you
          agree to these Terms. If you do not agree, do not use the Service.
        </p>

        {[
          {
            title: '1. Nature of the Service',
            body: 'Medhee is a personal health management tool. It provides medication tracking, drug interaction alerts, AI-assisted symptom triage, and telemedicine facilitation. Medhee is NOT a licensed medical provider. Nothing in the Service constitutes medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical decisions.',
          },
          {
            title: '2. Eligibility',
            bullets: [
              'You must be at least 18 years old to create an account.',
              'You may manage family profiles for minors under your supervision.',
              'You must provide accurate information during registration.',
            ],
          },
          {
            title: '3. User Responsibilities',
            bullets: [
              'You are responsible for the accuracy of health data you enter.',
              'You must not use the Service to make emergency medical decisions without contacting emergency services.',
              'You must not attempt to reverse-engineer, scrape, or abuse the Service.',
              'You must keep your login credentials secure.',
            ],
          },
          {
            title: '4. Telemedicine & Doctor Consultations',
            body: 'Video consultations facilitated through Medhee connect you with independent licensed medical practitioners. Medhee is a technology platform only — it is not a party to the doctor-patient relationship. Consultation quality, clinical outcomes, and prescriptions are the sole responsibility of the consulting practitioner.',
          },
          {
            title: '5. AI Triage Disclaimer',
            body: 'The AI symptom triage feature is informational only. It uses pattern recognition to suggest possible conditions or urgency levels. It does not replace clinical examination. For any emergency — chest pain, difficulty breathing, loss of consciousness — call 112 (India) or your local emergency number immediately.',
          },
          {
            title: '6. Intellectual Property',
            body: 'All content, design, software, and trademarks in the Service are owned by Medhee Inc. You may not reproduce, distribute, or create derivative works without express written permission.',
          },
          {
            title: '7. Limitation of Liability',
            body: 'To the fullest extent permitted by law, Medhee shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability shall not exceed the amount you paid for the Service in the 12 months preceding the claim.',
          },
          {
            title: '8. Termination',
            body: 'You may delete your account at any time from Settings → Delete Account. We may suspend or terminate your account if you violate these Terms. Upon termination, all your data will be permanently deleted within 30 days.',
          },
          {
            title: '9. Governing Law',
            body: 'These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India.',
          },
          {
            title: '10. Changes to Terms',
            body: 'We may update these Terms from time to time. We will notify you of material changes via in-app notification. Continued use after changes constitutes acceptance.',
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
                  <li key={i} className="text-sm text-gray-600 leading-relaxed">
                    • {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Contact */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-3">11. Contact</h2>
          <p className="text-sm text-gray-600 mb-4">
            For questions about these Terms, reach us at:
          </p>
          <a
            href="mailto:legal@medhee.com"
            className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 font-semibold text-sm px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Mail className="w-4 h-4" />
            legal@medhee.com
          </a>
        </div>
      </div>
    </div>
  );
}
