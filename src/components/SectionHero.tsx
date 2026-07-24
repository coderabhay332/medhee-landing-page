/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Pill, 
  ShieldAlert, 
  FileText, 
  Activity, 
  Apple, 
  Sparkles, 
  ChevronRight, 
  UserPlus, 
  CheckCircle2, 
  ArrowRight,
  Stethoscope
} from 'lucide-react';
import { HealthCard } from '../types';

const INITIAL_CARDS: HealthCard[] = [
  { id: '1', type: 'chronic', label: 'Chronic Condition', value: 'Type 2 Diabetes', meta: 'Diagnosed 2024', iconName: 'Activity' },
  { id: '2', type: 'medication', label: 'Active Medication', value: 'Metformin 500mg', meta: 'Twice daily', iconName: 'Pill' },
  { id: '3', type: 'allergy', label: 'Allergy profile', value: 'Penicillin severe', meta: 'Anaphylaxis risk', iconName: 'ShieldAlert' },
  { id: '4', type: 'report', label: 'Blood Report', value: 'HbA1c 6.8%', meta: 'Tested 2 weeks ago', iconName: 'FileText' },
  { id: '5', type: 'diet', label: 'Dietary Plan', value: 'Low Glycemic', meta: 'Custom nutritionist plan', iconName: 'Apple' },
  { id: '6', type: 'symptom', label: 'Current Symptom', value: 'Acute nausea', meta: 'Onset 4 hours ago', iconName: 'Sparkles' }
];

export default function SectionHero() {
  const [activeCards, setActiveCards] = useState<string[]>(['1', '2', '3', '4', '5', '6']);
  const [triageStatus, setTriageStatus] = useState<'compiling' | 'resolved'>('resolved');
  const [activeTab, setActiveTab] = useState<'all' | 'custom'>('all');

  const toggleCard = (id: string) => {
    setTriageStatus('compiling');
    setActiveCards(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (triageStatus === 'compiling') {
      const timer = setTimeout(() => {
        setTriageStatus('resolved');
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [triageStatus]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-4 h-4 text-accent-emerald" />;
      case 'Pill': return <Pill className="w-4 h-4 text-accent-emerald" />;
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4 text-accent-red" />;
      case 'FileText': return <FileText className="w-4 h-4 text-accent-emerald" />;
      case 'Apple': return <Apple className="w-4 h-4 text-accent-emerald" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-accent-amber animate-pulse" />;
      default: return <Activity className="w-4 h-4 text-accent-emerald" />;
    }
  };

  const handleQuickDemo = (mode: 'all' | 'clean') => {
    setTriageStatus('compiling');
    if (mode === 'all') {
      setActiveCards(['1', '2', '3', '4', '5', '6']);
      setActiveTab('all');
    } else {
      setActiveCards(['6']); // only current symptom, no context
      setActiveTab('custom');
    }
  };

  return (
    <section 
      id="hero" 
      className="relative pt-24 md:pt-28 pb-12 md:pb-16 px-6 md:px-12 flex flex-col justify-center items-center bg-bg-warm overflow-hidden"
    >
      {/* Soft, calm background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-radial from-accent-soft/40 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left column: Text Content */}
        <div className="lg:col-span-7 space-y-6 flex flex-col items-start text-left">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border-light text-xs font-medium text-secondary-text"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
            Introducing the Personal Health OS
          </motion.div>

          <div className="space-y-4 max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary-text leading-[1.08]"
            >
              Healthcare that <br />
              <span className="text-accent-emerald font-semibold">remembers you.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-secondary-text leading-relaxed font-light"
            >
              Medhee is the world’s first Personal Health Operating System. It continuously keeps your medications, allergies, health history, and previous consultations organized, so every healthcare decision starts with full context instead of repetitive questions.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <button 
              onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3.5 rounded-full bg-primary-text hover:bg-accent-emerald text-white text-sm font-medium transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group"
            >
              Download Medhee
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => document.getElementById('meet-rahul')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-bg-warm text-primary-text border border-border-light text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore the Story
            </button>
          </motion.div>

          {/* Value-add selector to demonstrate the concept right on the hero text */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="pt-6 border-t border-border-light/60 w-full"
          >
            <p className="text-xs font-semibold text-primary-text uppercase tracking-wider mb-3">Interactive Concept Playground</p>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleQuickDemo('all')}
                className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${activeTab === 'all' ? 'bg-accent-emerald text-white font-medium' : 'bg-white text-secondary-text border border-border-light hover:bg-bg-warm'}`}
              >
                1. Full Memory Context (Safe Triage)
              </button>
              <button 
                onClick={() => handleQuickDemo('clean')}
                className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${activeTab === 'custom' ? 'bg-accent-emerald text-white font-medium' : 'bg-white text-secondary-text border border-border-light hover:bg-bg-warm'}`}
              >
                2. Symptom Only (Blind Guessing)
              </button>
            </div>
            <p className="text-xs text-secondary-text mt-2 italic">
              {activeTab === 'all' 
                ? "With full medical history active, Medhee recognizes Penicillin risk and Metformin usage to trigger smart doctor handoffs." 
                : "Without Medhee context, standard health apps don't know your history, forcing you to start from scratch."}
            </p>
          </motion.div>
        </div>

        {/* Right column: iPhone Interactive Mockup */}
        <div className="lg:col-span-5 flex justify-center items-center w-full relative">
          
          {/* Subtle glow behind the phone */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-accent-soft/20 blur-2xl -z-10 pointer-events-none" />

          {/* Interactive Floating Cards Wrapper (Desktop absolute, mobile layout) */}
          <div className="relative w-full max-w-[340px] md:max-w-[400px] h-[560px] flex items-center justify-center">
            
            {/* The iPhone frame */}
            <div className="absolute inset-0 bg-[#0c0c0d] rounded-[52px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-[#2d2d30] overflow-hidden flex flex-col">
              
              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#111] absolute left-3" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#141416] absolute right-6" />
              </div>

              {/* iPhone screen content */}
              <div className="flex-1 bg-bg-warm rounded-[42px] overflow-hidden p-5 pt-12 flex flex-col justify-between relative select-none">
                
                {/* Header */}
                <div className="flex justify-between items-center pb-3 border-b border-border-light/50">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-secondary-text">MEDHEE OS v1.0</span>
                    <h3 className="text-xs font-bold text-primary-text">Health Co-Pilot</h3>
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-white border border-border-light text-[9px] font-medium text-accent-emerald">
                    Sync Complete
                  </div>
                </div>

                {/* iPhone Core Area: Living Health Context Compilation */}
                <div className="flex-1 flex flex-col justify-center gap-3 py-4 overflow-y-auto no-scrollbar">
                  
                  <div className="text-center space-y-1 mb-2">
                    <p className="text-[10px] text-secondary-text font-medium uppercase tracking-wider">Active Health Stream</p>
                    <p className="text-xs text-primary-text font-semibold">Generating Real-time Context</p>
                  </div>

                  {/* Context Cards Flowing inside the mockup */}
                  <div className="space-y-2">
                    <AnimatePresence>
                      {INITIAL_CARDS.map((card) => {
                        const isActive = activeCards.includes(card.id);
                        if (!isActive) return null;
                        
                        return (
                          <motion.div
                            key={card.id}
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -10 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => toggleCard(card.id)}
                            className="bg-white border border-border-light hover:border-accent-emerald p-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] transition-all duration-200"
                          >
                            <div className="p-1.5 rounded-lg bg-bg-warm flex-shrink-0">
                              {getIcon(card.iconName)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[9px] text-secondary-text font-medium uppercase tracking-wider">{card.label}</p>
                              <p className="text-xs font-semibold text-primary-text truncate">{card.value}</p>
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                </div>

                {/* Simulated AI Core + Decision Output */}
                <div className="bg-white border border-border-light rounded-2xl p-3.5 space-y-3 shadow-md">
                  
                  {/* Central Node Visualizer */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-accent-soft flex items-center justify-center">
                        <Sparkles className="w-2.5 h-2.5 text-accent-emerald" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary-text">Medhee Engine</span>
                    </div>
                    <div className="text-[9px] text-secondary-text font-mono">
                      {activeCards.length} inputs active
                    </div>
                  </div>

                  {/* Compilation State Visualizer */}
                  {triageStatus === 'compiling' ? (
                    <div className="py-2 flex flex-col items-center justify-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-accent-emerald animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-accent-emerald animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-accent-emerald animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-[10px] font-mono text-secondary-text">Synthesizing history...</span>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-2.5"
                    >
                      {activeCards.includes('3') && activeCards.includes('6') ? (
                        /* Allergy alert + Symptom active = Doctor handoff recommendation */
                        <div className="p-2.5 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2">
                          <Stethoscope className="w-4 h-4 text-accent-red mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-[11px] font-bold text-accent-red">Moderate Risk Detected</p>
                            <p className="text-[9px] text-secondary-text mt-0.5">Penicillin allergy & metformin requires physician validation. Handoff initialized.</p>
                          </div>
                        </div>
                      ) : activeCards.length === 1 && activeCards.includes('6') ? (
                        /* Symptom active, but no background context = Warning or standard path */
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-accent-amber mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-[11px] font-bold text-accent-amber">Incomplete Context</p>
                            <p className="text-[9px] text-secondary-text mt-0.5">Blind diagnostics. Enable full Medhee Profile for safe triage guidelines.</p>
                          </div>
                        </div>
                      ) : activeCards.length === 0 ? (
                        <div className="py-2 text-center text-[10px] text-secondary-text font-mono">
                          Select background inputs to test triage
                        </div>
                      ) : (
                        /* Normal compiled overview */
                        <div className="p-2.5 rounded-xl bg-accent-soft/40 border border-accent-soft flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent-emerald mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-[11px] font-bold text-accent-emerald">Verified Safe Assessment</p>
                            <p className="text-[9px] text-secondary-text mt-0.5">Historical parameters analyzed. AI assistant safe triage is now active.</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-border-light/60">
                        <span className="text-secondary-text">Recommendation:</span>
                        <span className="font-bold text-primary-text">
                          {activeCards.includes('3') && activeCards.includes('6') ? 'Connect to Doctor' : 'Assisted Care Guidelines'}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>

              </div>
            </div>

            {/* Tap Instruction Bubble */}
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="absolute -bottom-4 bg-white border border-border-light px-3 py-1.5 rounded-full shadow-md text-[10px] font-medium text-secondary-text z-40 flex items-center gap-1 cursor-default"
            >
              <Sparkles className="w-3 h-3 text-accent-emerald" />
              Tap phone cards to toggling memory context
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
