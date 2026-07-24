/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Pill, 
  ShieldAlert, 
  Activity, 
  Apple, 
  Sparkles, 
  BrainCircuit, 
  Stethoscope, 
  ShieldCheck,
  Zap,
  ArrowDown
} from 'lucide-react';

interface BrainInputNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  active: boolean;
  sampleData: string;
}

export default function SectionBrain() {
  const [nodes, setNodes] = useState<BrainInputNode[]>([
    { id: 'reports', label: 'Health Reports', icon: <FileText className="w-4 h-4" />, color: 'text-accent-emerald', active: true, sampleData: 'HbA1c: 6.8% • Lipid Panel Active' },
    { id: 'meds', label: 'Medications', icon: <Pill className="w-4 h-4" />, color: 'text-accent-emerald', active: true, sampleData: 'Metformin 500mg • Lortadine 10mg' },
    { id: 'allergies', label: 'Allergies', icon: <ShieldAlert className="w-4 h-4" />, color: 'text-accent-red', active: true, sampleData: 'Penicillin severe • Sulfa drugs mild' },
    { id: 'conditions', label: 'Conditions', icon: <Activity className="w-4 h-4" />, color: 'text-accent-emerald', active: true, sampleData: 'Type 2 Diabetes • Mild Hypertension' },
    { id: 'diet', label: 'Dietary Log', icon: <Apple className="w-4 h-4" />, color: 'text-accent-emerald', active: true, sampleData: 'Low Glycemic Index • Low Carb' },
    { id: 'symptoms', label: 'Symptoms', icon: <Sparkles className="w-4 h-4" />, color: 'text-accent-amber', active: true, sampleData: 'Acute nausea • Mild fatigue' },
  ]);

  const [activeSignal, setActiveSignal] = useState<string | null>(null);
  const [syncedContext, setSyncedContext] = useState<string>('Comprehensive 6-layer medical blueprint ready');

  const toggleNode = (id: string) => {
    setActiveSignal(id);
    setNodes(prev => prev.map(n => n.id === id ? { ...n, active: !n.active } : n));
    setTimeout(() => setActiveSignal(null), 1000);
  };

  useEffect(() => {
    const activeCount = nodes.filter(n => n.active).length;
    if (activeCount === 0) {
      setSyncedContext('Blank state. Healthcare starting from zero.');
    } else if (activeCount <= 3) {
      setSyncedContext('Partial context. Risk of blind recommendations.');
    } else {
      setSyncedContext('Full Medhee Brain blueprint synchronizing with Doctor Portal.');
    }
  }, [nodes]);

  return (
    <section 
      id="medhee-brain" 
      className="relative py-12 md:py-16 px-6 md:px-12 bg-bg-warm overflow-hidden flex flex-col justify-center items-center border-y border-border-light/40"
    >
      <div className="w-full max-w-6xl mx-auto space-y-8 text-center relative z-10">
        
        {/* Section Header */}
        <div className="space-y-2.5 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-emerald font-bold">The Core Architecture</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">
            The Medhee Brain
          </h2>
          <p className="text-sm sm:text-base text-secondary-text font-light leading-relaxed">
            Standard health databases store records in isolated files. The Medhee Brain weaves them into a single, cohesive, living operating system.
          </p>
        </div>

        {/* Visual interactive diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-white border border-border-light p-6 md:p-8 rounded-[32px] shadow-xs relative">
          
          {/* Input Silos Column */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-left mb-2">
              <h4 className="text-xs font-mono uppercase text-secondary-text tracking-widest font-bold">01 / Isolated Silos</h4>
              <p className="text-xs text-secondary-text italic">Tap any layer to disconnect it</p>
            </div>

            <div className="space-y-2.5">
              {nodes.map((node) => (
                <div 
                  key={node.id}
                  onClick={() => toggleNode(node.id)}
                  className={`group p-3 rounded-xl border text-left cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    node.active 
                      ? 'bg-bg-warm border-border-light hover:border-accent-emerald shadow-sm' 
                      : 'bg-white border-dashed border-border-light opacity-50 hover:opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white border border-border-light flex-shrink-0 ${node.color}`}>
                      {node.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary-text">{node.label}</p>
                      <p className="text-[10px] text-secondary-text font-mono truncate max-w-[180px]">{node.active ? node.sampleData : 'Empty layer • Tap to connect'}</p>
                    </div>
                  </div>
                  
                  {/* Glowing Pulse indicator */}
                  {node.active && (
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald group-hover:scale-125 transition-transform" />
                      <Zap className={`w-3.5 h-3.5 text-accent-emerald ${activeSignal === node.id ? 'animate-bounce text-accent-amber' : 'opacity-30'}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SVG Connectors or Middle Transition flow */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center py-6 lg:py-0">
            <div className="relative flex flex-col items-center gap-3">
              <span className="text-[10px] font-mono uppercase text-secondary-text tracking-widest">02 / Synthesize</span>
              
              {/* Central flow graphic */}
              <div className="w-16 h-16 rounded-full bg-accent-soft/30 border border-accent-soft flex items-center justify-center relative">
                <BrainCircuit className="w-8 h-8 text-accent-emerald animate-pulse" />
                
                {/* Simulated flowing particle bubble along vector */}
                <span className="absolute w-2 h-2 rounded-full bg-accent-emerald animate-ping" />
              </div>

              {/* Dynamic Connecting Arrow with flow particle */}
              <div className="h-12 w-0.5 bg-gradient-to-b from-accent-emerald to-accent-emerald/40 relative">
                <span className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-2 rounded-full bg-accent-amber animate-bounce" />
              </div>
            </div>
          </div>

          {/* Combined Synthesis & Action Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-left">
              <h4 className="text-xs font-mono uppercase text-secondary-text tracking-widest font-bold">03 / The Living Health Context</h4>
              <p className="text-xs text-secondary-text">All parameters combined dynamically in real-time</p>
            </div>

            {/* Central Living context box */}
            <div className="bg-bg-warm border border-border-light rounded-2xl p-5 text-left space-y-4 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-border-light/60">
                <span className="text-[10px] font-mono text-secondary-text uppercase tracking-wider">Dynamic Memory Status</span>
                <span className="text-xs font-bold text-accent-emerald flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-ping" />
                  Synced
                </span>
              </div>

              <p className="text-xs text-primary-text leading-relaxed font-light bg-white border border-border-light/60 p-3 rounded-lg">
                {syncedContext}
              </p>

              {/* Connected pathways */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white border border-border-light rounded-xl flex flex-col gap-1.5 text-left shadow-sm">
                  <div className="flex items-center gap-1.5 text-accent-emerald">
                    <BrainCircuit className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">To Medhee AI</span>
                  </div>
                  <p className="text-[9px] text-secondary-text">Provides exact history to guard chatbot guidance with bulletproof context.</p>
                </div>

                <div className="p-3 bg-white border border-border-light rounded-xl flex flex-col gap-1.5 text-left shadow-sm">
                  <div className="flex items-center gap-1.5 text-accent-red">
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">To Dr. Dashboard</span>
                  </div>
                  <p className="text-[9px] text-secondary-text">Transfers entire medical history instantly under encrypted, verified hand-offs.</p>
                </div>
              </div>

              {/* End Result Node */}
              <div className="pt-3 border-t border-border-light/60 flex items-center justify-between text-xs">
                <span className="text-secondary-text">Target Outcome:</span>
                <span className="text-accent-emerald font-bold flex items-center gap-1 bg-accent-soft/30 px-2 py-0.5 rounded-full border border-accent-soft/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Safer Clinical Decisions
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Footnote statement */}
        <p className="text-xs text-secondary-text italic font-light max-w-lg mx-auto">
          "When you describe a symptom, you shouldn't have to explain your drugs or allergies again. Medhee organizes your historical blueprint automatically, making medicine secure."
        </p>

      </div>
    </section>
  );
}
