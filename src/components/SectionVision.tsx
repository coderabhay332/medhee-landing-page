/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  Layers, 
  Cpu, 
  Clock, 
  Activity, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake 
} from 'lucide-react';

interface TimelineItem {
  phase: 'today' | 'tomorrow';
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function SectionVision() {
  const [activeTab, setActiveTab] = useState<'all' | 'today' | 'tomorrow'>('all');

  const timeline: TimelineItem[] = [
    // Today
    {
      phase: 'today',
      label: "Today / Active core",
      title: "Medication Memory",
      description: "Continuous on-device ledger keeping strict, updated drug compatibility logs synchronized automatically.",
      icon: <Layers className="w-4 h-4 text-accent-emerald" />
    },
    {
      phase: 'today',
      label: "Today / Active core",
      title: "Reports Parsing",
      description: "Structural medical data mined from Quest, Labcorp, and physician PDF files, compiled into structured trendlines.",
      icon: <Cpu className="w-4 h-4 text-accent-emerald" />
    },
    {
      phase: 'today',
      label: "Today / Active core",
      title: "Context-Aware AI",
      description: "Triage chat restricted by your unique medical timeline to prevent standard chatbot hallucinations.",
      icon: <Sparkles className="w-4 h-4 text-accent-emerald" />
    },
    {
      phase: 'today',
      label: "Today / Active core",
      title: "Doctor Handoff Portal",
      description: "Instant medical consultations with board-certified physicians, initialized with complete context transfers.",
      icon: <HeartHandshake className="w-4 h-4 text-accent-emerald" />
    },
    // Tomorrow
    {
      phase: 'tomorrow',
      label: "Tomorrow / Platform Expansion",
      title: "Wearables & Telemetry Integration",
      description: "Live, continuous biometric parsing (ECG, blood glucose, sleep metrics) streamed straight to your encrypted memory card.",
      icon: <Activity className="w-4 h-4 text-accent-amber" />
    },
    {
      phase: 'tomorrow',
      label: "Tomorrow / Platform Expansion",
      title: "Family Health Architectures",
      description: "Coordinated records for dependents, infants, and elderly parents. Shared family contexts to simplify elder care.",
      icon: <Users className="w-4 h-4 text-accent-amber" />
    },
    {
      phase: 'tomorrow',
      label: "Tomorrow / Platform Expansion",
      title: "Insurance Layer Coordination",
      description: "Automated co-pay validation and pre-authorization processing during active doctor consultation streams.",
      icon: <ShieldCheck className="w-4 h-4 text-accent-amber" />
    },
    {
      phase: 'tomorrow',
      label: "Tomorrow / Platform Expansion",
      title: "Emergency EMT Responder Routing",
      description: "Instant physical routing and background medical profile transfers to dispatchers and critical care responders.",
      icon: <Clock className="w-4 h-4 text-accent-amber" />
    },
    {
      phase: 'tomorrow',
      label: "Tomorrow / Platform Expansion",
      title: "Continuous Preventive Intelligence",
      description: "Algorithmic health tracking that notices subtle anomalies across reports, triggering proactive clinical interventions.",
      icon: <Sparkles className="w-4 h-4 text-accent-amber" />
    }
  ];

  const filteredTimeline = timeline.filter(item => {
    if (activeTab === 'all') return true;
    return item.phase === activeTab;
  });

  return (
    <section 
      id="vision" 
      className="relative py-12 md:py-16 px-6 md:px-12 bg-white overflow-hidden flex flex-col justify-center items-center"
    >
      <div className="w-full max-w-6xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-light pb-8">
          <div className="space-y-3 text-left">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-emerald font-bold">The Strategic Roadmap</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">
              The Health Operating System
            </h2>
            <p className="text-sm sm:text-base text-secondary-text font-light max-w-xl">
              Medhee is more than an assistant. It is transitioning into the baseline layer for all personal clinical workflows.
            </p>
          </div>

          {/* Timeline filter controls */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-bg-warm p-1.5 rounded-full border border-border-light">
            <button 
              onClick={() => setActiveTab('all')}
              className={`text-xs px-4 py-1.5 rounded-full font-medium transition-all ${activeTab === 'all' ? 'bg-primary-text text-white shadow-sm' : 'text-secondary-text hover:text-primary-text'}`}
            >
              Full Vision
            </button>
            <button 
              onClick={() => setActiveTab('today')}
              className={`text-xs px-4 py-1.5 rounded-full font-medium transition-all ${activeTab === 'today' ? 'bg-accent-emerald text-white shadow-sm' : 'text-secondary-text hover:text-primary-text'}`}
            >
              Today
            </button>
            <button 
              onClick={() => setActiveTab('tomorrow')}
              className={`text-xs px-4 py-1.5 rounded-full font-medium transition-all ${activeTab === 'tomorrow' ? 'bg-[#D97706] text-white shadow-sm' : 'text-secondary-text hover:text-primary-text'}`}
            >
              Tomorrow
            </button>
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          
          {/* Vertical core trace line */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-px bg-border-light/80" />

          {/* Timeline nodes */}
          <div className="space-y-12">
            {filteredTimeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`flex flex-col md:flex-row relative items-start ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Timeline node icon */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1.5 w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center z-10 shadow-sm">
                  {item.icon}
                </div>

                {/* Content card */}
                <div className={`w-full md:w-[calc(50%-32px)] pl-14 md:pl-0 ${idx % 2 === 0 ? 'md:text-left md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <div className="bg-bg-warm border border-border-light p-6 rounded-2xl hover:border-accent-emerald hover:shadow-sm transition-all duration-300">
                    <span className={`text-[9px] font-mono uppercase tracking-wider font-bold ${item.phase === 'today' ? 'text-accent-emerald' : 'text-accent-amber'}`}>
                      {item.label}
                    </span>
                    <h3 className="text-base font-bold text-primary-text mt-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-secondary-text font-light mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Empty visual column to preserve grid geometry */}
                <div className="hidden md:block w-[calc(50%-32px)]" />

              </motion.div>
            ))}
          </div>

        </div>

        {/* Large Strategic Concluding Quote */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-bg-warm border border-border-light rounded-[32px] p-8 md:p-12 text-center max-w-4xl mx-auto space-y-4"
        >
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-emerald font-bold">The Continuous Care Horizon</span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-primary-text leading-snug">
            Becoming the benchmark layer for personal healthcare.
          </h3>
          <p className="text-xs sm:text-sm text-secondary-text max-w-2xl mx-auto leading-relaxed font-light">
            We are building a future where your healthcare decisions are never isolated. Through Wearables, Family Syncing, and Emergency response, Medhee turns clinical data into real-time health protection.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
