/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Pill, 
  FileText, 
  ShieldAlert, 
  Activity, 
  Sparkles, 
  Clock, 
  ExternalLink, 
  Stethoscope, 
  ChevronRight,
  TrendingUp,
  Sliders,
  CheckCircle2,
  Trash2,
  Plus
} from 'lucide-react';

export default function SectionDashboard() {
  const [prescribedMed, setPrescribedMed] = useState<string>('');
  const [prescriptionList, setPrescriptionList] = useState<string[]>([
    'Ondansetron 4mg (Compatible antiemetic)'
  ]);

  const addPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (prescribedMed.trim()) {
      setPrescriptionList([...prescriptionList, prescribedMed]);
      setPrescribedMed('');
    }
  };

  const removePrescription = (index: number) => {
    setPrescriptionList(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <section 
      id="doctor-dashboard" 
      className="relative py-12 md:py-16 px-6 md:px-12 bg-bg-warm overflow-hidden flex flex-col justify-center items-center border-b border-border-light/40"
    >
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl text-left">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-emerald font-bold">The Clinical Interface</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">
            The Doctor’s Dashboard
          </h2>
          <p className="text-sm sm:text-base text-secondary-text font-light leading-relaxed">
            Doctors shouldn't have to behave like data entry clerks. Our custom clinical dashboard aggregates everything on a single, responsive screen.
          </p>
        </div>

        {/* Desktop Interface Mockup */}
        <div className="w-full bg-white border border-[#E8E8E8] rounded-3xl overflow-hidden shadow-lg flex flex-col min-h-[640px]">
          
          {/* Browser Window Header Control bar */}
          <div className="bg-[#FAF9F6] border-b border-[#E8E8E8] px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
              <div className="h-5 w-px bg-border-light/80 mx-2" />
              <div className="bg-white border border-border-light/50 px-3 py-0.5 rounded text-[10px] font-mono text-secondary-text flex items-center gap-1">
                <span>portal.medhee.md/consults/active-session</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-accent-emerald bg-accent-soft/30 px-2.5 py-0.5 rounded-full border border-accent-soft/30 font-bold">
                ● Connected to Patient Node
              </span>
              <div className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center font-display text-xs font-bold text-accent-emerald border border-accent-soft">
                SJ
              </div>
            </div>
          </div>

          {/* Core Dashboard Workspace */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-px bg-[#E8E8E8]">
            
            {/* Left Column: Patient clinical blueprint summary */}
            <div className="lg:col-span-3 bg-[#FCFCFA] p-6 space-y-6 flex flex-col justify-start">
              
              {/* Patient Basic Card */}
              <div className="space-y-2 text-left">
                <span className="text-[9px] font-mono uppercase text-secondary-text tracking-widest">Active Consultation</span>
                <h3 className="text-base font-bold text-primary-text">Rahul Sharma</h3>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-secondary-text pt-1 font-light">
                  <div>Age: <strong>34M</strong></div>
                  <div>Blood: <strong>O Positive</strong></div>
                  <div>ID: <strong>MED-8840</strong></div>
                  <div>Weight: <strong>78 kg</strong></div>
                </div>
              </div>

              {/* Critical Drug Allergy Alerts */}
              <div className="space-y-2 text-left">
                <span className="text-[9px] font-mono uppercase text-accent-red font-bold tracking-widest">Clinical Allergies</span>
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl space-y-1">
                  <p className="text-xs font-bold text-[#A82522] flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Penicillin severe
                  </p>
                  <p className="text-[9px] text-secondary-text">Anaphylaxis hazard. Restrict all beta-lactam therapies.</p>
                </div>
                <div className="p-2 bg-[#FCF8E3] border border-[#FBEED5] rounded-lg text-[9px] text-[#C09853] flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  Sulfa Drugs • Mild skin rashes
                </div>
              </div>

              {/* Active medications */}
              <div className="space-y-2 text-left">
                <span className="text-[9px] font-mono uppercase text-secondary-text tracking-widest">Medications Log</span>
                <div className="space-y-1.5">
                  <div className="bg-white border border-border-light p-2.5 rounded-xl flex items-center gap-2">
                    <Pill className="w-3.5 h-3.5 text-accent-emerald flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-primary-text truncate">Metformin 500mg</p>
                      <p className="text-[9px] text-secondary-text">1 tablet twice daily • Diabetes</p>
                    </div>
                  </div>
                  <div className="bg-white border border-border-light p-2.5 rounded-xl flex items-center gap-2">
                    <Pill className="w-3.5 h-3.5 text-secondary-text flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-primary-text truncate">Daily Multivitamins</p>
                      <p className="text-[9px] text-secondary-text">OTC dietary supplement</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Middle Column: Pre-Triage AI Assessment & Timeline */}
            <div className="lg:col-span-5 bg-white p-6 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-5 text-left">
                
                {/* AI Triage Banner */}
                <div className="p-4 bg-accent-soft/20 border border-accent-soft rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-accent-emerald font-bold uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Medhee AI Pre-Triage Assessment
                    </span>
                    <span className="text-[8px] bg-accent-soft text-accent-emerald px-1.5 py-0.5 rounded font-mono">Matched context</span>
                  </div>
                  
                  <p className="text-xs text-primary-text leading-relaxed font-light">
                    Patient presents with <strong>acute vomiting (onset 4h ago)</strong>. <br />
                    AI engine crossed this with Metformin usage and historical diabetes:
                  </p>
                  
                  <div className="grid grid-cols-1 gap-1.5 pt-1 text-[10px] text-secondary-text">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-accent-red" />
                      <span>Metformin is known to exacerbate abdominal discomfort.</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-accent-amber" />
                      <span>Type 2 Diabetes patient warrants monitoring for ketoacidosis.</span>
                    </div>
                  </div>
                </div>

                {/* Patient Active Symptom Timeline */}
                <div className="space-y-3">
                  <span className="text-[9px] font-mono uppercase text-secondary-text tracking-widest">Active Symptom Timeline</span>
                  
                  <div className="space-y-3 relative pl-3 border-l border-border-light">
                    
                    <div className="relative">
                      <div className="absolute -left-[16px] top-1.5 w-2 h-2 rounded-full bg-accent-red" />
                      <div className="text-[9px] font-mono text-secondary-text">04:00 AM</div>
                      <p className="text-xs font-bold text-primary-text">Rahul reports acute vomiting</p>
                      <p className="text-[10px] text-secondary-text font-light">Entered: "I've been vomiting for the past four hours and feel weak."</p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[16px] top-1.5 w-2 h-2 rounded-full bg-accent-emerald" />
                      <div className="text-[9px] font-mono text-secondary-text">04:02 AM</div>
                      <p className="text-xs font-semibold text-primary-text">Medhee Engine aggregates history blueprint</p>
                      <p className="text-[10px] text-secondary-text font-light">Transferred active Metformin logs and penicillin warnings.</p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[16px] top-1.5 w-2 h-2 rounded-full bg-accent-amber" />
                      <div className="text-[9px] font-mono text-secondary-text">04:05 AM</div>
                      <p className="text-xs font-semibold text-primary-text">Consultation initialized with Dr. Jenkins</p>
                    </div>

                  </div>
                </div>

              </div>

              {/* Bottom quick chat or secure consultation action info */}
              <div className="pt-4 border-t border-border-light flex justify-between items-center text-[10px] text-secondary-text font-light">
                <span>Video Connection: <strong>Enabled</strong></span>
                <span>Signal Strength: <strong>Perfect (12ms latency)</strong></span>
              </div>

            </div>

            {/* Right Column: Lab Reports & Rx Prescriber Hub */}
            <div className="lg:col-span-4 bg-[#FCFCFA] p-6 space-y-6 flex flex-col justify-start">
              
              {/* Lab Reports Integration */}
              <div className="space-y-2.5 text-left">
                <span className="text-[9px] font-mono uppercase text-secondary-text tracking-widest">Disparate Lab Records</span>
                
                <div className="p-3 bg-white border border-border-light rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-accent-emerald">
                      <FileText className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">HbA1c Glucose test</span>
                    </div>
                    <span className="text-[9px] font-mono text-secondary-text">06/20/2026</span>
                  </div>
                  
                  {/* Small visual progress indicator */}
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-secondary-text font-light">Value: <strong>6.8%</strong></span>
                    <span className="text-[8px] bg-amber-50 text-accent-amber border border-amber-100 px-1.5 py-0.5 rounded uppercase font-bold">Elevated</span>
                  </div>
                </div>

                <div className="p-3 bg-white border border-border-light rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-secondary-text">
                      <FileText className="w-3.5 h-3.5" />
                      <span className="text-xs font-semibold">Kidney Panel (eGFR)</span>
                    </div>
                    <span className="text-[9px] font-mono text-secondary-text">03/12/2026</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-secondary-text font-light">Value: <strong>92 mL/min</strong></span>
                    <span className="text-[8px] bg-accent-soft text-accent-emerald border border-accent-soft px-1.5 py-0.5 rounded uppercase font-bold">Normal</span>
                  </div>
                </div>
              </div>

              {/* Secure Rx Prescription Constructor */}
              <div className="space-y-3 text-left pt-2 border-t border-border-light">
                <span className="text-[9px] font-mono uppercase text-secondary-text tracking-widest">Secure Prescriber Hub</span>
                
                <form onSubmit={addPrescription} className="flex gap-2">
                  <input 
                    type="text" 
                    value={prescribedMed}
                    onChange={(e) => setPrescribedMed(e.target.value)}
                    placeholder="Type prescription (e.g., Ondansetron)..."
                    className="flex-1 bg-white border border-border-light rounded-xl px-3 py-1.5 text-xs outline-none focus:border-accent-emerald"
                  />
                  <button 
                    type="submit"
                    className="p-1.5 rounded-xl bg-primary-text hover:bg-accent-emerald text-white transition-colors duration-200"
                    aria-label="Add prescription"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </form>

                {/* Prescription List rendering */}
                <div className="space-y-1.5">
                  {prescriptionList.map((med, idx) => (
                    <div key={idx} className="p-2.5 bg-white border border-border-light rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald flex-shrink-0" />
                        <span className="text-xs font-bold text-primary-text truncate">{med}</span>
                      </div>
                      <button 
                        onClick={() => removePrescription(idx)}
                        className="p-1 text-secondary-text hover:text-accent-red rounded transition-colors"
                        aria-label="Delete prescription"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button 
                    type="button"
                    onClick={() => alert('Consultation completed securely. Prescription recorded to patient context blueprint.')}
                    className="w-full py-2.5 rounded-full bg-accent-emerald hover:opacity-90 text-white text-xs font-bold transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Authorize & Sync Blueprint
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
