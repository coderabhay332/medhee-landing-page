'use client';
/**
 * WaitlistForm — submits name + email to Google Sheets via Apps Script web app.
 * Set VITE_SHEETS_WEBHOOK in .env to your deployed Apps Script URL.
 */

import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const WEBHOOK_URL = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK as string | undefined;

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!WEBHOOK_URL) {
      console.warn('VITE_SHEETS_WEBHOOK not set');
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
          name: name.trim(),
          email: email.trim(),
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
      <div className="flex flex-col items-center gap-3 py-4">
        <CheckCircle2 className="w-10 h-10 text-accent-emerald" />
        <p className="text-sm font-mono font-bold text-primary-text">YOU'RE ON THE LIST</p>
        <p className="text-xs text-secondary-text font-light">We'll email you the moment Medhee goes live.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-full border border-border-light bg-white text-sm text-primary-text placeholder:text-secondary-text/60 outline-none focus:border-accent-emerald transition-colors"
        />
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-full border border-border-light bg-white text-sm text-primary-text placeholder:text-secondary-text/60 outline-none focus:border-accent-emerald transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="group px-8 py-3.5 rounded-full bg-primary-text hover:bg-accent-emerald disabled:opacity-60 text-white text-xs font-mono font-bold transition-all duration-300 shadow-md flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> JOINING...</>
        ) : (
          <>JOIN BETA WAITLIST <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></>
        )}
      </button>
      {status === 'error' && (
        <p className="text-xs text-center text-red-500">
          Something went wrong. Email us at{' '}
          <a href="mailto:beta@medhee.com" className="underline">beta@medhee.com</a>
        </p>
      )}
    </form>
  );
}
