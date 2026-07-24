/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Pill, 
  FileText, 
  User, 
  Clock, 
  ShieldAlert, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Apple, 
  Calendar, 
  Activity, 
  Camera, 
  Upload, 
  MessageSquare, 
  Bell, 
  Mic, 
  Plus, 
  Search, 
  Filter, 
  ArrowRight,
  RotateCcw,
  Info,
  Check,
  X,
  Share2,
  PhoneCall,
  Heart
} from 'lucide-react';

type ScreenKey = 'home' | 'timeline' | 'interaction' | 'diet';

export default function SectionAppShowcase() {
  const [activeScreen, setActiveScreen] = useState<ScreenKey>('home');
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  // Screen 1: Home State
  const [medsTaken, setMedsTaken] = useState<{ [key: string]: boolean }>({
    med1: false,
    med2: false
  });
  const [activeMember, setActiveMember] = useState<'Abhay' | 'Family'>('Abhay');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Screen 2: Timeline State
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'active' | 'moderate'>('all');
  const [expandedTimelineId, setExpandedTimelineId] = useState<string | null>('1');

  // Screen 3: Interaction State
  const [selectedTimelineHour, setSelectedTimelineHour] = useState<number>(12); // 8, 9, 12, 18
  const [checkedActions, setCheckedActions] = useState<{ [key: string]: boolean }>({
    act1: true,
    act2: true
  });

  // Screen 4: Diet State
  const [dietTab, setDietTab] = useState<'eat' | 'avoid' | 'summary'>('eat');

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlay) return;
    const screens: ScreenKey[] = ['home', 'timeline', 'interaction', 'diet'];
    const interval = setInterval(() => {
      setActiveScreen(prev => {
        const nextIdx = (screens.indexOf(prev) + 1) % screens.length;
        return screens[nextIdx];
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleMed = (id: string) => {
    setMedsTaken(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      const takenCount = Object.values(updated).filter(Boolean).length;
      if (updated[id]) {
        showToast(`Dose marked as taken! (${takenCount}/2 completed)`);
      }
      return updated;
    });
  };

  const takenCount = Object.values(medsTaken).filter(Boolean).length;
  const progressPercent = Math.round((takenCount / 2) * 100);

  return (
    <section id="app-showcase" className="relative py-12 md:py-16 px-6 md:px-12 bg-bg-warm border-t border-border-light overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-radial from-accent-soft/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border-light text-xs font-semibold uppercase tracking-widest text-accent-emerald">
            <Sparkles className="w-3.5 h-3.5" />
            Live Application Simulator
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary-text tracking-tight">
            Designed for clarity. <br />
            <span className="text-accent-emerald">Powered by continuous context.</span>
          </h2>

          <p className="text-base sm:text-lg text-secondary-text font-light leading-relaxed">
            Experience the real Medhee user interface. Click through the 4 live screens below or interact with the smartphone controls directly.
          </p>
        </div>

        {/* Screen Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white border border-border-light rounded-2xl max-w-4xl mx-auto shadow-2xs">
          {[
            { key: 'home', label: 'Home Dashboard', icon: Home, desc: 'Schedule & Safety' },
            { key: 'timeline', label: 'Health Timeline', icon: Activity, desc: 'Symptom Records' },
            { key: 'interaction', label: 'Interaction Radar', icon: ShieldAlert, desc: 'Drug Matrix' },
            { key: 'diet', label: 'Dietary Plan', icon: Apple, desc: 'Food Guidance' },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveScreen(item.key as ScreenKey);
                  setIsAutoPlay(false);
                }}
                className={`flex-1 min-w-[170px] flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-accent-emerald text-white shadow-xs font-semibold' 
                    : 'text-secondary-text hover:text-primary-text hover:bg-bg-warm'
                }`}
              >
                <div className={`p-1.5 rounded-lg flex-shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-bg-warm text-secondary-text'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left leading-tight truncate">
                  <p className="font-bold truncate">{item.label}</p>
                  <p className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-secondary-text'}`}>{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Showcase Grid: Left Info Panel + Center Smartphone + Right Interactive Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Context Explanation */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-border-light rounded-2xl p-6 shadow-2xs space-y-5 text-left">
              <AnimatePresence mode="wait">
                {activeScreen === 'home' && (
                  <motion.div
                    key="home-info"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-accent-soft text-accent-emerald text-xs font-bold font-mono">
                      <span>01</span>
                      <span className="w-1 h-1 rounded-full bg-accent-emerald" />
                      <span>MODULE</span>
                    </div>
                    <h3 className="text-lg font-bold text-primary-text leading-tight">Daily Health Hub</h3>
                    <p className="text-xs text-secondary-text leading-relaxed font-light">
                      Clear visibility over daily dosages, upcoming reminders, and quick safety status. Never miss a pill or wonder if a medicine is safe.
                    </p>
                    <div className="p-3 rounded-xl bg-bg-warm border border-border-light text-xs space-y-1">
                      <p className="font-bold text-primary-text flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald" />
                        Live Progress Counter
                      </p>
                      <p className="text-[11px] text-secondary-text font-light">Click "Take Now" on the phone screen to simulate marking doses taken.</p>
                    </div>
                  </motion.div>
                )}

                {activeScreen === 'timeline' && (
                  <motion.div
                    key="timeline-info"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-accent-soft text-accent-emerald text-xs font-bold font-mono">
                      <span>02</span>
                      <span className="w-1 h-1 rounded-full bg-accent-emerald" />
                      <span>MODULE</span>
                    </div>
                    <h3 className="text-lg font-bold text-primary-text leading-tight">Unified Health Timeline</h3>
                    <p className="text-xs text-secondary-text leading-relaxed font-light">
                      Chronological record of every symptom, assessment, and resolution. Medhee groups events by date and triage risk level.
                    </p>
                    <div className="p-3 rounded-xl bg-bg-warm border border-border-light text-xs space-y-1">
                      <p className="font-bold text-primary-text flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-accent-emerald" />
                        Expandable History
                      </p>
                      <p className="text-[11px] text-secondary-text font-light">Click "View Details" on any timeline event card to expand notes and advice.</p>
                    </div>
                  </motion.div>
                )}

                {activeScreen === 'interaction' && (
                  <motion.div
                    key="interaction-info"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold font-mono">
                      <span>03</span>
                      <span className="w-1 h-1 rounded-full bg-amber-600" />
                      <span>MODULE</span>
                    </div>
                    <h3 className="text-lg font-bold text-primary-text leading-tight">Drug Interaction Radar</h3>
                    <p className="text-xs text-secondary-text leading-relaxed font-light">
                      Automatic cross-checking whenever multiple drugs are prescribed. Displays risk levels, warning symptoms, and safety timelines.
                    </p>
                    <div className="p-3 rounded-xl bg-bg-warm border border-border-light text-xs space-y-1">
                      <p className="font-bold text-primary-text flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        Time-Decay Curve
                      </p>
                      <p className="text-[11px] text-secondary-text font-light">Tap timestamps on the phone's timeline stepper to observe risk changes over 12 hours.</p>
                    </div>
                  </motion.div>
                )}

                {activeScreen === 'diet' && (
                  <motion.div
                    key="diet-info"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-accent-soft text-accent-emerald text-xs font-bold font-mono">
                      <span>04</span>
                      <span className="w-1 h-1 rounded-full bg-accent-emerald" />
                      <span>MODULE</span>
                    </div>
                    <h3 className="text-lg font-bold text-primary-text leading-tight">Personalized Dietary Plan</h3>
                    <p className="text-xs text-secondary-text leading-relaxed font-light">
                      Food recommendations tailored to active conditions and active prescription drug interactions (e.g. GERD, Diabetes Type II).
                    </p>
                    <div className="p-3 rounded-xl bg-bg-warm border border-border-light text-xs space-y-1">
                      <p className="font-bold text-primary-text flex items-center gap-1.5">
                        <Apple className="w-3.5 h-3.5 text-accent-emerald" />
                        Eat vs. Avoid Categories
                      </p>
                      <p className="text-[11px] text-secondary-text font-light">Toggle between "Eat" and "Avoid" tabs on the device to see safe vs restricted foods.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Auto Play Toggle */}
              <div className="pt-3 border-t border-border-light flex items-center justify-between">
                <span className="text-xs text-secondary-text font-medium">Auto-Switch</span>
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                    isAutoPlay ? 'bg-accent-soft text-accent-emerald border border-accent-soft' : 'bg-bg-warm text-secondary-text border border-border-light'
                  }`}
                >
                  {isAutoPlay ? 'Playing (8s)' : 'Paused'}
                </button>
              </div>
            </div>
          </div>

          {/* Center Column: Phone Frame with Live UI */}
          <div className="lg:col-span-6 flex justify-center items-center">
            
            {/* iPhone Shell */}
            <div className="relative w-full max-w-[360px] sm:max-w-[380px] h-[720px] bg-[#0c0c0d] rounded-[52px] p-[10px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)] border-4 border-[#2d2d30] overflow-hidden flex flex-col select-none">
              
              {/* Dynamic Island & Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1d]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#0a5c43]/80 animate-pulse" />
              </div>

              {/* Status Bar */}
              <div className="absolute top-3 left-7 right-7 flex justify-between items-center text-[11px] font-semibold text-gray-800 z-30 pointer-events-none">
                <span>1:30</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px]">5G</span>
                  <div className="w-4 h-2 border border-gray-800 rounded-sm p-0.5 flex items-center">
                    <div className="w-full h-full bg-gray-800 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Toast Notification Container */}
              <AnimatePresence>
                {toastMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="absolute top-12 left-4 right-4 z-50 bg-primary-text text-white text-[11px] px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 border border-gray-700"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-accent-emerald flex-shrink-0" />
                    <span className="truncate">{toastMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Screen Body Container */}
              <div className="flex-1 bg-white rounded-[42px] overflow-hidden pt-10 flex flex-col justify-between relative">
                
                {/* SCREEN 1: HOME DASHBOARD */}
                {activeScreen === 'home' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col overflow-y-auto no-scrollbar p-4 space-y-4 text-left"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-bg-warm border border-border-light flex items-center justify-center">
                          <div className="w-3 h-0.5 bg-secondary-text rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Bell className="w-4 h-4 text-primary-text" />
                          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-accent-red rounded-full" />
                        </div>
                        <img 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" 
                          alt="Avatar" 
                          className="w-7 h-7 rounded-full object-cover border border-border-light"
                        />
                      </div>
                    </div>

                    {/* Greeting */}
                    <div>
                      <h3 className="text-base font-bold text-primary-text leading-tight">
                        Good evening, <span className="text-accent-emerald">{activeMember}!</span> 👋
                      </h3>
                      <p className="text-[10px] text-secondary-text">Let's keep you healthy and safe.</p>
                    </div>

                    {/* Profile switcher */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setActiveMember('Abhay')}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                          activeMember === 'Abhay' ? 'bg-accent-soft text-accent-emerald border-accent-soft' : 'bg-bg-warm text-secondary-text border-border-light'
                        }`}
                      >
                        <span>Abhay</span>
                        <Check className="w-3 h-3 text-accent-emerald" />
                      </button>
                      <button 
                        onClick={() => showToast('Family Profile Switcher Opened')}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium text-secondary-text border border-dashed border-border-light bg-bg-warm hover:bg-white"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Member</span>
                      </button>
                    </div>

                    {/* Safety Banner */}
                    <div className="bg-accent-soft/60 border border-accent-soft rounded-2xl p-3 space-y-2">
                      <div className="flex items-center gap-2 text-accent-emerald">
                        <ShieldAlert className="w-4 h-4 text-accent-emerald" />
                        <div className="text-[11px] font-bold">You're safe today</div>
                      </div>
                      <p className="text-[9px] text-accent-emerald font-medium">No severe drug interactions detected in your active schedule.</p>

                      {/* Meds progress */}
                      <div className="pt-1 space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-secondary-text font-medium">Today's progress</span>
                          <span className="font-bold text-primary-text">{takenCount}/2 meds taken ({progressPercent}%)</span>
                        </div>
                        <div className="w-full h-1.5 bg-accent-soft rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent-emerald transition-all duration-500 rounded-full" 
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-accent-emerald pt-1 border-t border-accent-soft">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-accent-emerald" />
                          Next: Levocetirizine • 8:00 AM
                        </span>
                        <ChevronRight className="w-3 h-3 text-accent-emerald" />
                      </div>
                    </div>

                    {/* Diet Banner */}
                    <div className="rounded-2xl p-3 text-white bg-primary-text flex items-center justify-between gap-2 shadow-sm border border-border-light">
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold leading-tight">Your Diet, Your Medicine's Best Friend</p>
                        <p className="text-[9px] opacity-80 font-light">Personalized diet tips aligned with your prescriptions.</p>
                        <button 
                          onClick={() => setActiveScreen('diet')}
                          className="mt-1 px-2.5 py-1 bg-accent-emerald text-white rounded-lg text-[9px] font-bold hover:bg-emerald-700 transition-colors"
                        >
                          View Diet Plan &gt;
                        </button>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/10 p-1 flex items-center justify-center flex-shrink-0">
                        <Apple className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Today's Schedule */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-bold text-primary-text">Today's Schedule</span>
                        <button onClick={() => showToast('Full schedule view')} className="text-accent-emerald font-semibold text-[10px] hover:underline">View all &gt;</button>
                      </div>

                      {/* Dose 1 */}
                      <div className="bg-bg-warm border border-border-light rounded-xl p-2.5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${medsTaken.med1 ? 'bg-accent-emerald text-white' : 'bg-accent-soft text-accent-emerald'}`}>
                            <Pill className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-primary-text leading-snug">Levocetirizine + Montelukast</p>
                            <p className="text-[9px] text-secondary-text">09:30 AM • 1 dose after food</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleMed('med1')}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            medsTaken.med1 ? 'bg-accent-emerald text-white' : 'bg-primary-text text-white hover:bg-accent-emerald'
                          }`}
                        >
                          {medsTaken.med1 ? '✓ Taken' : 'Take now'}
                        </button>
                      </div>

                      {/* Dose 2 */}
                      <div className="bg-bg-warm border border-border-light rounded-xl p-2.5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${medsTaken.med2 ? 'bg-accent-emerald text-white' : 'bg-accent-soft text-accent-emerald'}`}>
                            <Pill className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-primary-text leading-snug">Pantoprazole + Domperidone</p>
                            <p className="text-[9px] text-secondary-text">02:00 PM • 30 min before meal</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleMed('med2')}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            medsTaken.med2 ? 'bg-accent-emerald text-white' : 'bg-primary-text text-white hover:bg-accent-emerald'
                          }`}
                        >
                          {medsTaken.med2 ? '✓ Taken' : 'Take'}
                        </button>
                      </div>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[10px] font-bold text-secondary-text uppercase tracking-wider">Quick Actions</p>
                      <div className="grid grid-cols-5 gap-1.5 text-center">
                        {[
                          { icon: Camera, label: 'Scan', action: 'Camera scanner ready' },
                          { icon: Upload, label: 'Report', action: 'Upload lab report' },
                          { icon: MessageSquare, label: 'Chat', action: 'Opening Medhee Chat' },
                          { icon: Bell, label: 'Alerts', action: 'Reminder preferences' },
                          { icon: ShieldAlert, label: 'SOS', action: 'Emergency contact line' },
                        ].map((act, i) => {
                          const Icon = act.icon;
                          return (
                            <button 
                              key={i} 
                              onClick={() => showToast(act.action)}
                              className="flex flex-col items-center gap-1 p-1.5 rounded-xl bg-bg-warm border border-border-light hover:bg-white transition-colors"
                            >
                              <div className="w-7 h-7 rounded-lg bg-accent-soft text-accent-emerald flex items-center justify-center">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[8px] font-medium text-primary-text">{act.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* AI Assistant Bottom Banner */}
                    <div className="p-2.5 rounded-2xl bg-bg-warm border border-border-light flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-accent-emerald text-white flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-primary-text">Hi! I'm Medhee AI ✨</p>
                          <p className="text-[8px] text-secondary-text">Ask anything about your health context</p>
                        </div>
                      </div>
                      <Mic className="w-4 h-4 text-accent-emerald" />
                    </div>

                  </motion.div>
                )}

                {/* SCREEN 2: HEALTH TIMELINE */}
                {activeScreen === 'timeline' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col overflow-y-auto no-scrollbar p-4 space-y-4 text-left"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center pb-2 border-b border-border-light">
                      <h3 className="text-xs font-bold text-primary-text flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-accent-emerald" />
                        Health Timeline
                      </h3>
                      <button onClick={() => showToast('Timeline options')} className="text-[10px] text-secondary-text flex items-center gap-1 bg-bg-warm border border-border-light px-2 py-0.5 rounded-md">
                        June 2026 ▼
                      </button>
                    </div>

                    {/* Top Stats Widget */}
                    <div className="bg-bg-warm border border-border-light rounded-2xl p-3 flex justify-between items-center">
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-bold text-primary-text">Your Health Journey</p>
                        <p className="text-[8px] text-secondary-text">Track, understand and improve health.</p>
                      </div>
                      <div className="flex gap-3 text-center">
                        <div>
                          <p className="text-xs font-bold text-accent-emerald">2</p>
                          <p className="text-[7px] text-secondary-text uppercase font-semibold">Assessments</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-accent-emerald">2</p>
                          <p className="text-[7px] text-secondary-text uppercase font-semibold">Active</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-primary-text">0</p>
                          <p className="text-[7px] text-secondary-text uppercase font-semibold">Advised</p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline List */}
                    <div className="space-y-3 relative pl-4 border-l-2 border-border-light ml-2">
                      
                      {/* Item 1 */}
                      <div className="relative">
                        <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent-emerald border-2 border-white shadow-xs" />
                        <div className="bg-white border border-border-light rounded-xl p-2.5 shadow-2xs space-y-1.5">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold text-accent-emerald bg-accent-soft px-2 py-0.5 rounded-full">Low Risk • Active</span>
                            <span className="text-[8px] text-secondary-text">9 Jun (Today) 10:30 AM</span>
                          </div>
                          <h4 className="text-xs font-bold text-primary-text">Loose motion</h4>
                          <p className="text-[9px] text-secondary-text leading-normal font-light">
                            Experiencing loose motion with abdominal cramping following consumption of street food.
                          </p>
                          <div className="flex items-center justify-between text-[9px] pt-1 border-t border-border-light text-accent-emerald font-semibold">
                            <span>📈 Symptoms improving</span>
                            <button 
                              onClick={() => setExpandedTimelineId(expandedTimelineId === '1' ? null : '1')}
                              className="text-accent-emerald hover:underline"
                            >
                              {expandedTimelineId === '1' ? 'Hide Details' : 'View Details >'}
                            </button>
                          </div>

                          {expandedTimelineId === '1' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="pt-2 border-t border-border-light text-[9px] text-secondary-text space-y-1">
                              <p className="font-semibold text-primary-text">Care Advice:</p>
                              <p>• Stay hydrated with ORS solution</p>
                              <p>• Continue prescribed Pantoprazole before meals</p>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div className="relative">
                        <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent-amber border-2 border-white shadow-xs" />
                        <div className="bg-white border border-border-light rounded-xl p-2.5 shadow-2xs space-y-1.5">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold text-amber-800 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">Moderate Risk • Monitoring</span>
                            <span className="text-[8px] text-secondary-text">8 Jun 08:15 PM</span>
                          </div>
                          <h4 className="text-xs font-bold text-primary-text">Headache</h4>
                          <p className="text-[9px] text-secondary-text leading-normal font-light">
                            Headache and mild fatigue reported after poor sleep and long screen time.
                          </p>
                          <div className="flex items-center justify-between text-[9px] pt-1 border-t border-border-light">
                            <span className="text-accent-amber font-semibold">👀 Monitoring for 24h</span>
                            <button 
                              onClick={() => setExpandedTimelineId(expandedTimelineId === '2' ? null : '2')}
                              className="text-accent-emerald hover:underline font-semibold"
                            >
                              {expandedTimelineId === '2' ? 'Hide Details' : 'View Details >'}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Item 3 */}
                      <div className="relative">
                        <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent-emerald border-2 border-white shadow-xs" />
                        <div className="bg-white border border-border-light rounded-xl p-2.5 shadow-2xs space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold text-primary-text bg-bg-warm border border-border-light px-2 py-0.5 rounded-full">Resolved</span>
                            <span className="text-[8px] text-secondary-text">5 Jun 06:40 PM</span>
                          </div>
                          <h4 className="text-xs font-bold text-primary-text">Fever</h4>
                          <p className="text-[9px] text-secondary-text">Treated and symptoms completely resolved.</p>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Habit Banner */}
                    <div className="p-2.5 rounded-xl bg-bg-warm border border-border-light flex items-center justify-between">
                      <span className="text-[9px] font-bold text-primary-text">Keep building healthy habits</span>
                      <button onClick={() => showToast('Opening Insights')} className="text-[9px] font-bold text-accent-emerald bg-white px-2 py-1 rounded-md border border-border-light hover:bg-bg-warm">View Insights &gt;</button>
                    </div>

                  </motion.div>
                )}

                {/* SCREEN 3: INTERACTION RADAR */}
                {activeScreen === 'interaction' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col overflow-y-auto no-scrollbar p-4 space-y-3 text-left"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center pb-2 border-b border-border-light">
                      <h3 className="text-xs font-bold text-primary-text">Interaction Details</h3>
                      <Share2 className="w-3.5 h-3.5 text-secondary-text" />
                    </div>

                    {/* Risk Badge */}
                    <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3 text-center space-y-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[9px] uppercase tracking-wider">
                        Moderate Risk
                      </span>
                      <h4 className="text-xs font-bold text-primary-text">Livobid 10mg + FOLIOS NVP</h4>
                      <p className="text-[9px] text-amber-900">This combination may increase drowsiness and dizziness.</p>

                      {/* Animated Gauge scale */}
                      <div className="pt-2 space-y-1">
                        <div className="flex justify-between text-[8px] font-bold text-secondary-text">
                          <span className="text-accent-emerald">Low</span>
                          <span className="text-amber-800">Moderate</span>
                          <span className="text-accent-red">High</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-gradient-to-r from-accent-emerald via-amber-400 to-accent-red relative">
                          <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-amber-600 shadow-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Pills matchup */}
                    <div className="flex items-center justify-center gap-2 text-[10px]">
                      <div className="px-2.5 py-1 rounded-xl bg-accent-soft border border-accent-soft font-bold text-accent-emerald flex items-center gap-1">
                        <Pill className="w-3 h-3 text-accent-emerald" />
                        Livobid 10mg
                      </div>
                      <span className="font-bold text-secondary-text">+</span>
                      <div className="px-2.5 py-1 rounded-xl bg-red-50 border border-red-100 font-bold text-accent-red flex items-center gap-1">
                        <Pill className="w-3 h-3 text-accent-red" />
                        FOLIOS NVP
                      </div>
                    </div>

                    {/* Why this matters */}
                    <div className="p-2.5 rounded-xl bg-bg-warm border border-border-light space-y-1">
                      <p className="text-[10px] font-bold text-primary-text flex items-center gap-1">
                        <Info className="w-3.5 h-3.5 text-accent-emerald" />
                        Why this matters
                      </p>
                      <p className="text-[9px] text-secondary-text leading-normal font-light">
                        Both medicines cause central nervous system depression. Taking them simultaneously increases sleepiness and reduces alertness.
                      </p>
                    </div>

                    {/* Time Stepper */}
                    <div className="p-2.5 rounded-xl bg-bg-warm border border-border-light space-y-2">
                      <p className="text-[9px] font-bold text-primary-text uppercase tracking-wider">Interaction Risk Timeline</p>
                      <div className="flex justify-between items-center text-[8px] text-secondary-text">
                        {[
                          { h: 8, label: '8:00 AM', status: 'Taken' },
                          { h: 9, label: '9:00 AM', status: 'Starts' },
                          { h: 12, label: '12:00 PM', status: 'Peak Risk' },
                          { h: 18, label: '6:00 PM', status: 'Decreases' }
                        ].map((t) => (
                          <button 
                            key={t.h} 
                            onClick={() => setSelectedTimelineHour(t.h)}
                            className={`flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-md transition-all ${
                              selectedTimelineHour === t.h ? 'bg-accent-emerald text-white font-bold shadow-xs' : 'bg-white text-secondary-text border border-border-light'
                            }`}
                          >
                            <span>{t.label}</span>
                            <span className="text-[7px] opacity-80">{t.status}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Emergency Seek Help Banner */}
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-accent-red text-[9px] space-y-1">
                      <p className="font-bold flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-accent-red" />
                        Seek immediate help if:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-white/80 px-1.5 py-0.5 rounded border border-red-200 text-accent-red font-medium">Difficulty breathing</span>
                        <span className="bg-white/80 px-1.5 py-0.5 rounded border border-red-200 text-accent-red font-medium">Chest pain</span>
                        <span className="bg-white/80 px-1.5 py-0.5 rounded border border-red-200 text-accent-red font-medium">Confusion</span>
                      </div>
                    </div>

                  </motion.div>
                )}

                {/* SCREEN 4: DIETARY PLAN */}
                {activeScreen === 'diet' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col overflow-y-auto no-scrollbar p-4 space-y-3 text-left"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center pb-2 border-b border-border-light">
                      <h3 className="text-xs font-bold text-primary-text flex items-center gap-1.5">
                        <Apple className="w-4 h-4 text-accent-emerald" />
                        Dietary Plan
                      </h3>
                      <span className="text-[9px] font-bold text-secondary-text bg-bg-warm border border-border-light px-2 py-0.5 rounded-full">Diabetes & GERD</span>
                    </div>

                    {/* Personalized Banner */}
                    <div className="bg-bg-warm border border-border-light rounded-2xl p-3 text-center space-y-1">
                      <Apple className="w-6 h-6 text-accent-emerald mx-auto" />
                      <h4 className="text-xs font-bold text-primary-text">Your Personalized Diet</h4>
                      <p className="text-[8px] text-secondary-text">Based on 4 medications and 8 active conditions.</p>
                      
                      {/* Count Pills */}
                      <div className="flex justify-center gap-3 pt-1">
                        <span className="bg-accent-soft text-accent-emerald px-2.5 py-0.5 rounded-full font-bold text-[9px]">
                          7 Foods to Eat
                        </span>
                        <span className="bg-red-50 text-accent-red border border-red-100 px-2.5 py-0.5 rounded-full font-bold text-[9px]">
                          2 Foods to Avoid
                        </span>
                      </div>
                    </div>

                    {/* Segmented control */}
                    <div className="bg-bg-warm p-1 rounded-xl border border-border-light flex text-[10px] font-bold text-secondary-text">
                      <button 
                        onClick={() => setDietTab('eat')}
                        className={`flex-1 py-1 rounded-lg transition-all ${dietTab === 'eat' ? 'bg-accent-emerald text-white shadow-xs' : 'hover:text-primary-text'}`}
                      >
                        ✓ Eat (7)
                      </button>
                      <button 
                        onClick={() => setDietTab('avoid')}
                        className={`flex-1 py-1 rounded-lg transition-all ${dietTab === 'avoid' ? 'bg-accent-red text-white shadow-xs' : 'hover:text-primary-text'}`}
                      >
                        ❌ Avoid (2)
                      </button>
                    </div>

                    {/* Dish List */}
                    <div className="space-y-1.5">
                      {dietTab === 'eat' ? (
                        [
                          { name: 'Khichdi with ghee', category: 'Dish', desc: 'Easy digest • Gentle on stomach' },
                          { name: 'Dal and rice', category: 'Dish', desc: 'Balanced protein' },
                          { name: 'Idli with sambar', category: 'Dish', desc: 'Steam cooked • Low fat' },
                          { name: 'Poha with peanuts', category: 'Dish', desc: 'Low glycemic index' },
                          { name: 'Curd and rice', category: 'Dish', desc: 'Probiotic support' },
                          { name: 'Boiled vegetables with roti', category: 'Dish', desc: 'High fiber' },
                          { name: 'Lukewarm milk with honey', category: 'Beverage', desc: 'Soothing bedtime drink' }
                        ].map((dish, i) => (
                          <div key={i} className="p-2 rounded-xl bg-white border border-border-light flex items-center justify-between text-[10px]">
                            <div>
                              <p className="font-bold text-primary-text">{dish.name}</p>
                              <p className="text-[8px] text-secondary-text">{dish.category} • {dish.desc}</p>
                            </div>
                            <span className="text-[8px] font-bold text-accent-emerald bg-accent-soft px-2 py-0.5 rounded-full">
                              ✓ Recommended
                            </span>
                          </div>
                        ))
                      ) : (
                        [
                          { name: 'Spicy Pani Puri & Fried Pakora', category: 'Street Food', reason: 'Triggers severe gastric acid & disrupts Pantoprazole' },
                          { name: 'Unpasteurized Milk & Raw Cream', category: 'Dairy', reason: 'High bacterial risk during active loose motion recovery' }
                        ].map((dish, i) => (
                          <div key={i} className="p-2 rounded-xl bg-red-50/50 border border-red-100 flex items-center justify-between text-[10px]">
                            <div>
                              <p className="font-bold text-primary-text">{dish.name}</p>
                              <p className="text-[8px] text-accent-red font-medium">{dish.reason}</p>
                            </div>
                            <span className="text-[8px] font-bold text-accent-red bg-red-100 px-2 py-0.5 rounded-full flex-shrink-0">
                              ❌ Restricted
                            </span>
                          </div>
                        ))
                      )}
                    </div>

                  </motion.div>
                )}

                {/* Bottom Navigation Bar */}
                <div className="h-12 bg-white border-t border-border-light flex items-center justify-around text-secondary-text z-30">
                  <button 
                    onClick={() => setActiveScreen('home')}
                    className={`flex flex-col items-center text-[9px] font-medium transition-colors ${activeScreen === 'home' ? 'text-accent-emerald font-bold' : 'hover:text-primary-text'}`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </button>
                  <button 
                    onClick={() => setActiveScreen('timeline')}
                    className={`flex flex-col items-center text-[9px] font-medium transition-colors ${activeScreen === 'timeline' ? 'text-accent-emerald font-bold' : 'hover:text-primary-text'}`}
                  >
                    <Activity className="w-4 h-4" />
                    <span>Timeline</span>
                  </button>
                  <button 
                    onClick={() => showToast('Quick Add Menu')}
                    className="w-8 h-8 rounded-full bg-primary-text hover:bg-accent-emerald text-white flex items-center justify-center -mt-4 shadow-sm transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setActiveScreen('interaction')}
                    className={`flex flex-col items-center text-[9px] font-medium transition-colors ${activeScreen === 'interaction' ? 'text-accent-emerald font-bold' : 'hover:text-primary-text'}`}
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Radar</span>
                  </button>
                  <button 
                    onClick={() => setActiveScreen('diet')}
                    className={`flex flex-col items-center text-[9px] font-medium transition-colors ${activeScreen === 'diet' ? 'text-accent-emerald font-bold' : 'hover:text-primary-text'}`}
                  >
                    <Apple className="w-4 h-4" />
                    <span>Diet</span>
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Interactive Quick Control Sandbox */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <div className="bg-white border border-border-light rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-text">
                <Sparkles className="w-4 h-4 text-accent-emerald" />
                <span>Simulate App Actions</span>
              </div>
              <p className="text-xs text-secondary-text">
                Test how Medhee responds dynamically to user interactions in real-time.
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setActiveScreen('home');
                    toggleMed('med1');
                  }}
                  className="w-full text-left p-3 rounded-xl bg-bg-warm hover:bg-accent-soft/40 border border-border-light text-xs font-semibold text-primary-text flex items-center justify-between group transition-all"
                >
                  <span>1. Mark Dose Taken</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent-emerald group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    setActiveScreen('timeline');
                    setExpandedTimelineId('1');
                  }}
                  className="w-full text-left p-3 rounded-xl bg-bg-warm hover:bg-accent-soft/40 border border-border-light text-xs font-semibold text-primary-text flex items-center justify-between group transition-all"
                >
                  <span>2. Expand Loose Motion Event</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent-emerald group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    setActiveScreen('interaction');
                    setSelectedTimelineHour(12);
                  }}
                  className="w-full text-left p-3 rounded-xl bg-bg-warm hover:bg-accent-soft/40 border border-border-light text-xs font-semibold text-primary-text flex items-center justify-between group transition-all"
                >
                  <span>3. Check Livobid Interaction</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent-emerald group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    setActiveScreen('diet');
                    setDietTab('avoid');
                  }}
                  className="w-full text-left p-3 rounded-xl bg-bg-warm hover:bg-accent-soft/40 border border-border-light text-xs font-semibold text-primary-text flex items-center justify-between group transition-all"
                >
                  <span>4. Filter High Risk Foods</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent-emerald group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="pt-2 border-t border-border-light text-[11px] text-secondary-text">
                <p className="italic">💡 Tip: You can also tap directly on the mobile phone screen components on the left.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
