'use client';
/**
 * WaitlistForm — submits name + email to Google Sheets via Apps Script web app.
 * Set NEXT_PUBLIC_SHEETS_WEBHOOK to your deployed Apps Script URL.
 */

import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const WEBHOOK_URL = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK as string | undefined;

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!WEBHOOK_URL) {
      console.warn('NEXT_PUBLIC_SHEETS_WEBHOOK is not set');
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      // Google Apps Script requires no-cors for cross-origin POST
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim().slice(0, 100),
          email: email.trim().slice(0, 254),
          timestamp: new Date().toISOString(),
          source: 'landing-page',
        }),
      });
      // no-cors means we can't read the response — assume success if no throw
      setStatus('success');
      setName('');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-2 py-4" role="status">
        <CheckCircle2 className="w-10 h-10 text-accent-emerald" aria-hidden="true" />
        <p className="text-base font-bold text-primary-text">You're on the list.</p>
        <p className="text-sm text-secondary-text">We'll email you when Medhee is ready for you.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="waitlist-name" className="sr-only">
          Your name
        </label>
        <input
          id="waitlist-name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-full border border-border-light bg-white text-sm text-primary-text placeholder:text-secondary-text/70 outline-none focus:border-accent-emerald transition-colors"
        />
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-full border border-border-light bg-white text-sm text-primary-text placeholder:text-secondary-text/70 outline-none focus:border-accent-emerald transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-8 py-3.5 rounded-full bg-primary-text hover:bg-accent-emerald disabled:opacity-60 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Joining…
          </>
        ) : (
          <>
            Join the waitlist
          </>
        )}
      </button>
      {status === 'error' && (
        <p className="text-sm text-center text-accent-red" role="alert">
          Something went wrong. Email us at{' '}
          <a href="mailto:beta@medhee.com" className="underline">
            beta@medhee.com
          </a>
          .
        </p>
      )}
    </form>
  );
}
