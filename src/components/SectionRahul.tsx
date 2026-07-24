/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Activity, 
  ShieldAlert, 
  FileText, 
  MessageSquare, 
  Sparkles, 
  Stethoscope, 
  Clock, 
  Pill, 
  CheckCircle,
  Eye
} from 'lucide-react';

interface FrameData {
  id: number;
  phase: string;
  title: string;
  description: string;
  highlight: string;
  mockupState: {
    title: string;
    subtitle: string;
    type: 'wakeup' | 'history' | 'symptom' | 'analysis' | 'doctor' | 'prescription';
    badge: string;
    badgeColor: string;
  };
}

const STORY_FRAMES: FrameData[] = [
  {
    id: 1,
    phase: "01 / Wake Up",
    title: "Rahul feels sick.",
    description: "It’s 4:00 AM. Rahul wakes up with acute vomiting and stomach distress. Under normal circumstances, anxiety would set in. He would guess medicines, call a sleeping relative, or prepare for an exhausting waiting room.",
    highlight: "Instead, he simply opens Medhee.",
    mockupState: {
      title: "Medhee OS v1.0",
      subtitle: "Active Memory Session",
      type: "wakeup",
      badge: "Secure Sync",
      badgeColor: "bg-accent-soft text-accent-emerald border-accent-soft"
    }
  },
  {
    id: 2,
    phase: "02 / The Invisible Foundation",
    title: "Medhee already knows.",
    description: "Medhee is not starting from a blank page. The operating system continuously remembers his chronic condition (Type 2 Diabetes), his active drug prescriptions (Metformin), and his severe anaphylaxis allergy (Penicillin).",
    highlight: "Context is preserved, never forgotten.",
    mockupState: {
      title: "Historical Context",
      subtitle: "Verified Profile Blueprints",
      type: "history",
      badge: "5 Safe Credentials",
      badgeColor: "bg-accent-soft text-accent-emerald border-accent-soft"
    }
  },
  {
    id: 3,
    phase: "03 / Immediate Intake",
    title: "Rahul types a single symptom.",
    description: "No tedious onboarding forms. No 30-click checklists. Rahul simply inputs: \"I've been vomiting for the past four hours and feel extremely weak.\"",
    highlight: "Symptom captured in plain natural language.",
    mockupState: {
      title: "Medhee Chat",
      subtitle: "Direct Patient Entry",
      type: "symptom",
      badge: "Active Typing",
      badgeColor: "bg-amber-100 text-accent-amber border-amber-200"
    }
  },
  {
    id: 4,
    phase: "04 / Deep Historical Synthesis",
    title: "The engine synthesizes.",
    description: "In milliseconds, the AI maps \"vomiting\" against Metformin usage (which carries stomach side-effect warnings) and Type 2 Diabetes (elevating dehydration and ketoacidosis risk factors). It flags Penicillin allergy for future drug decisions.",
    highlight: "Intelligent correlation, not simple matching.",
    mockupState: {
      title: "Medhee Core Engine",
      subtitle: "Triaging Risk Parameters",
      type: "analysis",
      badge: "Synthesizing Core",
      badgeColor: "bg-red-100 text-accent-red border-red-200"
    }
  },
  {
    id: 5,
    phase: "05 / Frictionless Doctor Entry",
    title: "Dr. Jenkins joins.",
    description: "Risk levels are marked as Moderate. Medhee immediately connects Rahul to a verified on-call doctor. Dr. Sarah Jenkins joins. She doesn't ask \"What happened?\" or \"Any medications?\" Her dashboard already displays his synthesized history.",
    highlight: "Doctors never start consultations from zero.",
    mockupState: {
      title: "Dr. Sarah Jenkins",
      subtitle: "Verified Physician Joined",
      type: "doctor",
      badge: "Consultation Live",
      badgeColor: "bg-red-100 text-accent-red border-red-200"
    }
  },
  {
    id: 6,
    phase: "06 / Safe Closure",
    title: "Profile updates automatically.",
    description: "Dr. Jenkins prescribes a safe antiemetic compatible with diabetes, explicitly avoiding allergy hazards. The consultation concludes safely. The digital prescription automatically drops into Rahul's profile for future context.",
    highlight: "The healthcare loop is closed and remembered.",
    mockupState: {
      title: "Treatment Closed",
      subtitle: "Prescription Recorded",
      type: "prescription",
      badge: "Profile Updated",
      badgeColor: "bg-accent-soft text-accent-emerald border-accent-soft"
    }
  }
];

export default function SectionRahul() {
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextFrame = () => {
    if (currentFrameIdx < STORY_FRAMES.length - 1) {
      setCurrentFrameIdx(prev => prev + 1);
    }
  };

  const prevFrame = () => {
    if (currentFrameIdx > 0) {
      setCurrentFrameIdx(prev => prev - 1);
    }
  };

  const currentFrame = STORY_FRAMES[currentFrameIdx];

  return (
    <section 
      id="meet-rahul" 
      className="relative py-12 md:py-16 px-6 md:px-12 bg-bg-warm flex flex-col justify-center items-center overflow-hidden border-b border-border-light/60"
    >
      <div className="w-full max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-light pb-8">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-emerald font-bold">Interactive Storyboard</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-text">
              Meet Rahul.
            </h2>
            <p className="text-sm md:text-base text-secondary-text max-w-lg font-light">
              This is not a feature list. This is the visual story of how an integrated health operating system transforms an emergency.
            </p>
          </div>
          
          {/* Framer Navigation Indicators */}
          <div className="flex items-center gap-4">
            <button 
              onClick={prevFrame}
              disabled={currentFrameIdx === 0}
              className={`p-3 rounded-full border transition-all duration-200 ${currentFrameIdx === 0 ? 'border-border-light text-border-light cursor-not-allowed' : 'border-primary-text text-primary-text hover:bg-bg-warm'}`}
              aria-label="Previous frame"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="text-xs font-mono text-secondary-text min-w-[50px] text-center">
              {currentFrameIdx + 1} of {STORY_FRAMES.length}
            </div>
            <button 
              onClick={nextFrame}
              disabled={currentFrameIdx === STORY_FRAMES.length - 1}
              className={`p-3 rounded-full border transition-all duration-200 ${currentFrameIdx === STORY_FRAMES.length - 1 ? 'border-border-light text-border-light cursor-not-allowed' : 'border-primary-text text-primary-text hover:bg-bg-warm'}`}
              aria-label="Next frame"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Storyboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Storyboard Narrative */}
          <div className="lg:col-span-6 space-y-8 lg:pr-6">
            
            <div className="inline-block text-xs font-mono text-accent-emerald font-semibold uppercase tracking-wider bg-accent-soft/30 px-3 py-1 rounded-full border border-accent-soft/30">
              {currentFrame.phase}
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.h3 
                  key={currentFrame.id + '-title'}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary-text"
                >
                  {currentFrame.title}
                </motion.h3>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p 
                  key={currentFrame.id + '-desc'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-base sm:text-lg text-secondary-text font-light leading-relaxed"
                >
                  {currentFrame.description}
                </motion.p>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={currentFrame.id + '-highlight'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="p-4 bg-bg-warm border-l-4 border-accent-emerald rounded-r-xl"
              >
                <p className="text-xs font-mono text-secondary-text uppercase tracking-wider">The Medhee Difference</p>
                <p className="text-sm font-semibold text-accent-emerald mt-1">{currentFrame.highlight}</p>
              </motion.div>
            </AnimatePresence>

            {/* Quick interactive frame jump */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border-light">
              {STORY_FRAMES.map((f, idx) => (
                <button
                  key={f.id}
                  onClick={() => setCurrentFrameIdx(idx)}
                  className={`text-[10px] font-mono px-2.5 py-1.5 rounded-full border transition-all duration-150 ${idx === currentFrameIdx ? 'bg-primary-text text-white border-primary-text font-bold' : 'bg-white text-secondary-text border-border-light hover:bg-bg-warm'}`}
                >
                  Step {f.id}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: High-fidelity Device Mockup representing the storyboard scene */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[340px] h-[580px] bg-[#0c0c0d] rounded-[48px] p-[8px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] border-4 border-[#2d2d30] overflow-hidden flex flex-col">
              
              {/* Dynamic Island */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5.5 bg-black rounded-full z-30" />

              {/* Mobile Screen Container */}
              <div className="flex-1 bg-bg-warm rounded-[38px] overflow-hidden p-4 pt-10 flex flex-col justify-between relative">
                
                {/* Mockup Top Header */}
                <div className="flex justify-between items-center pb-2.5 border-b border-border-light/40">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-emerald animate-ping" />
                    <span className="text-[10px] font-bold text-primary-text">{currentFrame.mockupState.title}</span>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full border text-[8px] font-mono font-medium ${currentFrame.mockupState.badgeColor}`}>
                    {currentFrame.mockupState.badge}
                  </div>
                </div>

                {/* Dynamic mockup content based on frame */}
                <div className="flex-1 py-4 flex flex-col justify-center overflow-y-auto no-scrollbar">
                  
                  {/* Scene 1: Rahul wakes up sick */}
                  {currentFrame.mockupState.type === 'wakeup' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4 text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-accent-soft flex items-center justify-center mx-auto text-accent-emerald shadow-sm">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-mono uppercase text-accent-amber font-bold">Time: 04:12 AM</p>
                        <h4 className="text-sm font-bold text-primary-text">Profile Restored In Silence</h4>
                      </div>
                      <div className="p-3 bg-white border border-border-light rounded-xl text-[10px] text-secondary-text max-w-[240px] mx-auto leading-relaxed">
                        Medhee remembers your medical footprint. Shake the stress, tap next to continue.
                      </div>
                    </motion.div>
                  )}

                  {/* Scene 2: Medhee remembers profile */}
                  {currentFrame.mockupState.type === 'history' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2.5"
                    >
                      <div className="text-center pb-1">
                        <span className="text-[9px] font-mono text-secondary-text uppercase tracking-wider">Continuous Storage State</span>
                        <h4 className="text-xs font-bold text-primary-text">Active Client Record</h4>
                      </div>

                      <div className="bg-white border border-border-light p-2.5 rounded-xl flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-accent-soft flex items-center justify-center flex-shrink-0 text-accent-emerald">
                          <Activity className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left">
                          <p className="text-[8px] uppercase text-secondary-text font-bold">Chronic Condition</p>
                          <p className="text-[11px] font-bold text-primary-text">Type 2 Diabetes</p>
                        </div>
                      </div>

                      <div className="bg-white border border-border-light p-2.5 rounded-xl flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-accent-soft flex items-center justify-center flex-shrink-0 text-accent-emerald">
                          <Pill className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left">
                          <p className="text-[8px] uppercase text-secondary-text font-bold">Medication Rx</p>
                          <p className="text-[11px] font-bold text-primary-text">Metformin • 500mg Daily</p>
                        </div>
                      </div>

                      <div className="bg-white border border-red-100 p-2.5 rounded-xl flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-red-50 flex items-center justify-center flex-shrink-0 text-accent-red">
                          <ShieldAlert className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left">
                          <p className="text-[8px] uppercase text-accent-red font-bold">Critical Allergy</p>
                          <p className="text-[11px] font-bold text-[#A82522]">Penicillin • Severe Risk</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Scene 3: Symptom entry */}
                  {currentFrame.mockupState.type === 'symptom' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="bg-white border border-border-light rounded-xl p-3 text-[10px] text-secondary-text self-start max-w-[200px] text-left">
                          Hello Rahul, how are you feeling today?
                        </div>
                        
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-accent-emerald text-white rounded-xl p-3 text-[10px] self-end ml-auto max-w-[210px] text-left shadow-sm"
                        >
                          I’ve been vomiting for the past four hours and feel extremely weak.
                        </motion.div>
                      </div>

                      <div className="bg-white border border-border-light p-2.5 rounded-xl flex items-center gap-2 text-left">
                        <div className="w-2 h-2 rounded-full bg-accent-amber animate-pulse" />
                        <span className="text-[9px] font-mono text-secondary-text">Analyzing symptom inputs against history...</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Scene 4: Synthesizing */}
                  {currentFrame.mockupState.type === 'analysis' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-3 text-left"
                    >
                      <div className="text-center pb-1">
                        <p className="text-[9px] font-mono text-secondary-text uppercase">Synthesis Core Analysis</p>
                        <p className="text-xs font-bold text-accent-red">Drug Interactions Flagged</p>
                      </div>

                      <div className="bg-white border border-[#E8E8E8] rounded-xl p-3 space-y-2">
                        <div className="flex justify-between items-center pb-2 border-b border-[#F0F0F0]">
                          <span className="text-[9px] font-mono text-secondary-text">Symptom</span>
                          <span className="text-[10px] font-bold text-primary-text">Acute Vomiting</span>
                        </div>
                        
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center gap-1.5 text-[9px] text-[#A82522]">
                            <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>Metformin side-effect interaction danger</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[9px] text-accent-amber">
                            <Activity className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>Type 2 Diabetes elevated dehydration warning</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-2.5 bg-red-50 border border-red-100 rounded-lg text-[9px] text-secondary-text">
                        <strong>Triage:</strong> AI-guidelines only are insufficient. Connection to Doctor is highly advised.
                      </div>
                    </motion.div>
                  )}

                  {/* Scene 5: Doctor joins */}
                  {currentFrame.mockupState.type === 'doctor' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-3"
                    >
                      <div className="bg-white border border-border-light rounded-xl p-3 flex items-center gap-3 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center text-accent-emerald flex-shrink-0">
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <h5 className="text-xs font-bold text-primary-text">Dr. Sarah Jenkins</h5>
                          <p className="text-[9px] text-secondary-text">Internal Medicine Specialist</p>
                        </div>
                      </div>

                      <div className="bg-white border border-border-light rounded-xl p-3 space-y-1.5 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] font-mono text-secondary-text uppercase">Transferred Profile</span>
                          <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent-soft text-accent-emerald font-bold">DPDP Secured</span>
                        </div>
                        <p className="text-[10px] text-secondary-text leading-relaxed">
                          "Hello Rahul. I see you're vomiting and taking Metformin for Diabetes. I'm reviewing your reports now; do not take Penicillin-derived medications. Let's prescribe a compatible treatment right away."
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Scene 6: Prescription recorded */}
                  {currentFrame.mockupState.type === 'prescription' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-3"
                    >
                      <div className="text-center">
                        <CheckCircle className="w-8 h-8 text-accent-emerald mx-auto mb-1" />
                        <span className="text-[9px] font-mono text-secondary-text uppercase">Consultation Safe</span>
                        <h4 className="text-xs font-bold text-primary-text">Prescription Validated</h4>
                      </div>

                      <div className="bg-white border border-[#E8E8E8] rounded-xl p-3 text-left space-y-2 shadow-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-bold text-accent-emerald">NEW MEDICATION RX</span>
                          <span className="text-[8px] text-secondary-text font-mono">ID: RX-2026</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-primary-text">Ondansetron 4mg</p>
                          <p className="text-[9px] text-secondary-text mt-0.5">Take 1 tablet every 8 hours as needed for nausea. Non-reactive with Metformin.</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <span className="text-[8px] text-secondary-text font-light block">Rahul's profile updated for future medical decisions.</span>
                      </div>
                    </motion.div>
                  )}

                </div>

                {/* iPhone Bottom Bar */}
                <div className="pt-2 border-t border-border-light/30 flex justify-between items-center">
                  <div className="text-[9px] text-secondary-text font-mono">
                    Frame {currentFrame.id} / 6
                  </div>
                  <div className="w-16 h-1 bg-primary-text rounded-full mx-auto" />
                  <div className="text-[9px] font-bold text-accent-emerald flex items-center gap-0.5">
                    <CheckCircle className="w-2.5 h-2.5" />
                    Encrypted
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
