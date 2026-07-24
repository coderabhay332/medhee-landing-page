/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Pill, 
  TrendingUp, 
  Archive, 
  Stethoscope, 
  Apple, 
  Sparkles,
  ShieldAlert,
  ArrowUpRight,
  FileText,
  Clock,
  Heart
} from 'lucide-react';

interface BenefitCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  uiMockup: React.ReactNode;
}

export default function SectionBeforeProblems() {
  const [activeCardId, setActiveCardId] = useState<string>('med-safety');

  const benefits: BenefitCard[] = [
    {
      id: 'med-safety',
      badge: "Medication Safety",
      title: "Real-time drug conflict safeguards.",
      subtitle: "Never take an incompatible medicine again.",
      description: "Whenever a doctor prescribes a new medication, Medhee's memory core cross-references it with your existing regimen, allergies, and chronic stats to block dangerous drug-drug interactions automatically.",
      icon: <Pill className="w-5 h-5 text-accent-emerald" />,
      uiMockup: (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px] text-secondary-text pb-2 border-b border-border-light">
            <span className="font-mono">MEDHEE SAFETY MATRIX</span>
            <span className="text-accent-emerald font-bold">ACTIVE SCAN</span>
          </div>
          
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl space-y-2 text-left">
            <div className="flex items-center gap-2 text-accent-red">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <p className="text-xs font-bold">Critical Contraindication Flagged</p>
            </div>
            <p className="text-[10px] text-[#A82522] leading-relaxed">
              New Prescription: <strong>Amoxicillin</strong> clashes with active history of <strong>Severe Penicillin Anaphylaxis</strong>.
            </p>
            <div className="flex items-center gap-1.5 pt-1.5 border-t border-red-200/40">
              <span className="text-[8px] bg-red-100 px-1.5 py-0.5 rounded text-accent-red font-mono uppercase">Blocked Rx</span>
              <span className="text-[8px] text-secondary-text font-mono">0.02ms latency</span>
            </div>
          </div>

          <div className="p-2.5 bg-white border border-border-light rounded-xl text-[10px] text-left flex items-center justify-between">
            <span className="text-secondary-text">Current Active Rx:</span>
            <span className="font-mono font-semibold text-primary-text">Metformin 500mg • 2x/day</span>
          </div>
        </div>
      )
    },
    {
      id: 'report-intel',
      badge: "Report Intelligence",
      title: "Disparate data woven into trendlines.",
      subtitle: "Say goodbye to unorganized PDF attachments.",
      description: "Medhee parses lab documents, scans, and doctor letters instantly. It extracts physical data points and plots your cardiovascular, metabolic, and liver metrics on a single connected trendline.",
      icon: <TrendingUp className="w-5 h-5 text-accent-emerald" />,
      uiMockup: (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px] text-secondary-text pb-2 border-b border-border-light">
            <span className="font-mono">METABOLIC LAB PROFILE</span>
            <span className="text-secondary-text">PDF SOURCE: QUEST DIAGNASTICS</span>
          </div>

          <div className="bg-white border border-border-light p-3 rounded-xl space-y-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[9px] uppercase text-secondary-text">HbA1c Blood Glucose</p>
                <p className="text-lg font-bold text-primary-text">6.8% <span className="text-xs text-accent-amber font-medium">Elevated</span></p>
              </div>
              <p className="text-[8px] text-secondary-text font-mono">Synced 2d ago</p>
            </div>

            {/* Simulated premium Sparkline chart */}
            <div className="h-16 flex items-end gap-2 pt-2 border-b border-border-light/40 pb-1">
              <div className="flex-1 bg-accent-soft/30 rounded-t h-12 relative group hover:bg-accent-soft transition-all duration-200">
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 text-[8px] font-mono text-secondary-text">7.4%</span>
              </div>
              <div className="flex-1 bg-accent-soft/30 rounded-t h-14 relative group hover:bg-accent-soft transition-all duration-200">
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 text-[8px] font-mono text-secondary-text">7.1%</span>
              </div>
              <div className="flex-1 bg-accent-emerald rounded-t h-10 relative group transition-all duration-200">
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 text-[8px] font-mono font-bold text-accent-emerald">6.8%</span>
              </div>
            </div>

            <div className="flex justify-between text-[8px] font-mono text-secondary-text uppercase">
              <span>Nov 2025</span>
              <span>Mar 2026</span>
              <span>Jun 2026</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'health-mem',
      badge: "Health Memory",
      title: "An un-wiped medical ledger.",
      subtitle: "Your complete history, fully preserved.",
      description: "Medhee remembers surgeries, allergic reactions, vaccinations, previous treatments, and prescriptions. Unlike standard systems, your health history belongs to you, not an isolated hospital server.",
      icon: <Archive className="w-5 h-5 text-accent-emerald" />,
      uiMockup: (
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-[10px] text-secondary-text pb-2 border-b border-border-light">
            <span className="font-mono">CHRONOLOGICAL HISTORY</span>
            <span className="text-secondary-text">7 CREDENTIALS RECORDED</span>
          </div>

          <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 no-scrollbar text-left">
            <div className="relative pl-4 border-l border-border-light space-y-1">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-emerald border-2 border-white" />
              <p className="text-[9px] font-mono text-secondary-text">2026 (Active)</p>
              <p className="text-xs font-semibold text-primary-text">Type 2 Diabetes Metformin Regimen</p>
            </div>

            <div className="relative pl-4 border-l border-border-light space-y-1">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-border-light border-2 border-white" />
              <p className="text-[9px] font-mono text-secondary-text">2024</p>
              <p className="text-xs font-semibold text-primary-text">Mild Penicillin Hypersensitivity (Hives)</p>
            </div>

            <div className="relative pl-4 border-l border-border-light space-y-1">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-border-light border-2 border-white" />
              <p className="text-[9px] font-mono text-secondary-text">2022</p>
              <p className="text-xs font-semibold text-primary-text">Tetanus Booster Vaccine (Tdap)</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'doc-call',
      badge: "Doctor On Call",
      title: "Immediate, context-rich hand-offs.",
      subtitle: "Skip the triage line completely.",
      description: "If an acute symptom raises alarm, Medhee instantly triggers a doctor connection. The attending physician joins the video consult with your continuous medical history already open on their clinical screen.",
      icon: <Stethoscope className="w-5 h-5 text-accent-emerald" />,
      uiMockup: (
        <div className="space-y-3">
          <div className="p-2.5 bg-accent-soft/40 border border-accent-soft rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-border-light">
              <Stethoscope className="w-4 h-4 text-accent-emerald" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <h5 className="text-xs font-bold text-primary-text truncate">Dr. Aris Vance</h5>
              <p className="text-[9px] text-secondary-text truncate">Internal Medicine Specialist joined</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-accent-red animate-ping" />
          </div>

          <div className="bg-white border border-border-light rounded-xl p-3 text-left space-y-2">
            <span className="text-[8px] font-mono text-secondary-text uppercase">Security Gateway</span>
            <div className="p-2 bg-bg-warm rounded-lg text-[9px] text-secondary-text">
              Dr. Vance has read and confirmed your chronic diabetes history, penicillin allergy risk, and recent laboratory profiles.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'diet-integration',
      badge: "Personal Diet",
      title: "Nutrient analysis tied to active illnesses.",
      subtitle: "Diet is medicine. Let’s integrate it.",
      description: "Unlike normal generic calorie counters, Medhee connects your dietary intakes directly to clinical parameters. High glycemic index tracking alerts you when diabetes ranges are sensitive.",
      icon: <Apple className="w-5 h-5 text-accent-emerald" />,
      uiMockup: (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px] text-secondary-text pb-2 border-b border-border-light">
            <span className="font-mono">DIET MONITORING</span>
            <span className="text-[#388E3C] font-bold">METABOLIC COMPATIBLE</span>
          </div>

          <div className="p-3 bg-white border border-border-light rounded-xl flex items-center justify-between text-left">
            <div>
              <p className="text-xs font-bold text-primary-text">Oatmeal & Almond Milk</p>
              <p className="text-[9px] text-secondary-text">Glucose Load: 12g (Low Impact)</p>
            </div>
            <span className="text-[9px] font-mono font-bold bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded-full border border-[#C8E6C9]">
              Safe Range
            </span>
          </div>

          <div className="p-3 bg-white border border-border-light rounded-xl flex items-center justify-between text-left">
            <div>
              <p className="text-xs font-bold text-primary-text">White Sugar Glazed Donut</p>
              <p className="text-[9px] text-secondary-text">Glucose Load: 42g (Spike Hazard)</p>
            </div>
            <span className="text-[9px] font-mono font-bold bg-amber-50 text-accent-amber px-2 py-0.5 rounded-full border border-amber-200">
              Diabetes Warning
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'ai-triage',
      badge: "AI Triage",
      title: "Smart triage guided by safety limits.",
      subtitle: "Deep AI reasoning under safety limits.",
      description: "Medhee's AI chatbot is restricted by rigorous medical guardrails. It never guesses. If your background records reveal a high-risk history, it bypasses conversational play, transitioning you to human specialists.",
      icon: <Sparkles className="w-5 h-5 text-accent-emerald" />,
      uiMockup: (
        <div className="space-y-3 text-left">
          <div className="flex justify-between items-center text-[10px] text-secondary-text pb-2 border-b border-border-light">
            <span className="font-mono">MEDHEE TRIAGE ENGINE</span>
            <span className="text-[9px] text-accent-amber font-mono font-bold">GUARDRAILS INITIATED</span>
          </div>

          <div className="p-2.5 bg-white border border-border-light rounded-xl text-[9px] text-secondary-text">
            "Your allergy to penicillin precludes standard therapies. Transitioning consult to Dr. Jenkins for an optimized, safe alternative."
          </div>

          <div className="p-2 bg-accent-soft/30 border border-accent-soft rounded-lg text-center text-[10px] font-bold text-accent-emerald">
            Click here to accept secure hand-off
          </div>
        </div>
      )
    }
  ];

  const currentBenefit = benefits.find(b => b.id === activeCardId) || benefits[0];

  return (
    <section 
      id="before-emergencies" 
      className="relative py-12 md:py-16 px-6 md:px-12 bg-bg-warm flex flex-col justify-center items-center overflow-hidden border-t border-border-light/50"
    >
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl text-left">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-emerald font-bold">Safety & Integration</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">
            Before problems become emergencies.
          </h2>
          <p className="text-sm sm:text-base text-secondary-text font-light leading-relaxed">
            Medhee continuously executes diagnostic sweeps in the background. Instead of simple checklists, you get continuous safeguards.
          </p>
        </div>

        {/* Benefits Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Benefit selector column (6 items) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {benefits.map((benefit) => (
              <button
                key={benefit.id}
                onClick={() => setActiveCardId(benefit.id)}
                className={`w-full p-5 rounded-2xl text-left border transition-all duration-300 flex items-start gap-4 ${
                  activeCardId === benefit.id 
                    ? 'bg-bg-warm border-border-light shadow-sm' 
                    : 'bg-white border-transparent hover:bg-bg-warm/40'
                }`}
              >
                <div className={`p-2 rounded-xl bg-white border border-border-light shadow-sm flex-shrink-0 ${activeCardId === benefit.id ? 'text-accent-emerald' : 'text-secondary-text opacity-70'}`}>
                  {benefit.icon}
                </div>
                
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono uppercase text-secondary-text tracking-wider">{benefit.badge}</span>
                  <h3 className="text-sm font-bold text-primary-text mt-0.5">{benefit.title}</h3>
                  <p className="text-xs text-secondary-text font-light mt-1 truncate">{benefit.subtitle}</p>
                </div>

                <ChevronRight className={`w-4 h-4 text-secondary-text self-center transition-transform ${activeCardId === benefit.id ? 'translate-x-1 opacity-100' : 'opacity-40'}`} />
              </button>
            ))}
          </div>

          {/* Detailed Display Mockup Column */}
          <div className="lg:col-span-7 bg-bg-warm border border-border-light p-6 md:p-12 rounded-[32px] flex flex-col justify-between relative min-h-[460px]">
            
            {/* Background vector accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-accent-soft/30 blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-emerald font-bold">Active Benefit Profile</span>
              
              <div className="space-y-2">
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-primary-text leading-tight">
                  {currentBenefit.title}
                </h3>
                <p className="text-sm sm:text-base text-secondary-text font-light leading-relaxed max-w-xl">
                  {currentBenefit.description}
                </p>
              </div>
            </div>

            {/* High-fidelity Device Screen section representing actual product screenshot */}
            <div className="mt-8 bg-white border border-border-light rounded-2xl p-5 shadow-md max-w-md w-full mx-auto relative z-10 transition-all duration-300 hover:shadow-lg">
              
              {/* Fake App header */}
              <div className="flex items-center justify-between pb-3 border-b border-border-light/60 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-ping" />
                  <span className="text-[9px] font-mono text-secondary-text uppercase tracking-widest">Medhee System Interface</span>
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-border-light" />
                  <span className="w-1.5 h-1.5 rounded-full bg-border-light" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                </div>
              </div>

              {currentBenefit.uiMockup}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

const ChevronRight = ({ className, ...props }: { className?: string } & React.ComponentProps<'svg'>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);
