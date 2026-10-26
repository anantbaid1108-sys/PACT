import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  Zap, 
  Flame, 
  Gamepad2, 
  CheckCircle2,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import OnboardingWizard from './OnboardingWizard';
import { CURRENT_USER } from '../mockData';

export default function AuthModal({ onLoginSuccess }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'onboarding'
  const [email, setEmail] = useState('anant@pact.love');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    e?.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide your email and password.');
      return;
    }

    // Check existing stored user or build clean user profile
    const existing = localStorage.getItem('pact_user');
    let authenticatedUser;
    try {
      authenticatedUser = existing ? JSON.parse(existing) : null;
    } catch {
      authenticatedUser = null;
    }

    if (!authenticatedUser) {
      authenticatedUser = {
        ...CURRENT_USER,
        email: email.trim(),
      };
    }

    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#FF3366', '#D946EF', '#10B981']
    });

    localStorage.setItem('pact_user', JSON.stringify(authenticatedUser));
    onLoginSuccess(authenticatedUser);
  };

  const handleDemoLogin = () => {
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#FF3366', '#D946EF', '#10B981']
    });

    localStorage.setItem('pact_user', JSON.stringify(CURRENT_USER));
    onLoginSuccess(CURRENT_USER);
  };

  // If user clicks "Create Account / Register", render the 5-step Onboarding Wizard!
  if (mode === 'onboarding') {
    return (
      <OnboardingWizard
        initialData={null}
        onComplete={(newUser) => {
          onLoginSuccess(newUser);
        }}
        onCancel={() => setMode('signin')}
      />
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-x-hidden bg-[#0B0A10] text-slate-100 selection:bg-rose-500 selection:text-white px-4 py-8 sm:py-12">
      {/* Vibrant Ambient Glows */}
      <div className="fixed top-12 left-1/4 w-[450px] h-[450px] bg-[#F59E0B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-12 right-1/4 w-[500px] h-[500px] bg-[#FF3366]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#D946EF]/10 rounded-full blur-[170px] pointer-events-none" />

      {/* Full-Screen Modern Hero Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-4xl z-10 grid grid-cols-1 lg:grid-cols-12 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-rose-950/30 overflow-hidden"
      >
        {/* Left Column: Energetic Brand Canvas & Feature Highlights */}
        <div className="lg:col-span-5 p-8 sm:p-10 bg-gradient-to-br from-[#161224]/90 via-[#100D1C]/95 to-[#0A0912] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle accent light inside card */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-6 relative z-10">
            {/* Logo & Name */}
            <div className="flex items-center gap-3">
              <div className="relative group cursor-pointer">
                <img 
                  src="/pact-logo.png" 
                  alt="Pact Logo" 
                  className="w-12 h-12 object-contain drop-shadow-lg group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-wider text-white flex items-center gap-2">
                  PACT
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 tracking-widest">
                    V2.0
                  </span>
                </span>
                <p className="text-xs text-slate-400 font-medium">Make Connection an Experience</p>
              </div>
            </div>

            {/* Romantic Punchy Quote */}
            <blockquote className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed italic border-l-2 border-rose-500 pl-3">
              "Where sparks are earned through activity and banter, not mindlessly appraising static catalog photos."
            </blockquote>

            {/* Feature Bullets */}
            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                  <Gamepad2 className="w-3.5 h-3.5" />
                </div>
                <span>Async & Real-time Mini-Game Icebreakers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span>SUPERPACT Score Duels & Shared Canvas</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-fuchsia-500/20 text-fuchsia-300 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span>100+ Interest Tags & 150+ Artist Compatibility</span>
              </div>
            </div>
          </div>

          <div className="pt-8 text-[11px] text-slate-500 flex items-center gap-2 relative z-10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Strict 18+ Verification & Encrypted Profiles</span>
          </div>
        </div>

        {/* Right Column: Sign In Form & Register Gateway */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Welcome to the Experience
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Sign in with your credentials or launch our multi-step Onboarding Wizard to create a custom profile.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-bold text-sm hover:opacity-95 shadow-lg shadow-rose-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In to Pact</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative px-3 bg-[#110F1C] text-[11px] font-mono text-slate-500 uppercase">
              Or Explore Instantly
            </span>
          </div>

          {/* 1-Click Demo Login */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all group"
          >
            <Compass className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
            <span>1-Click Instant Demo Login (Anant Baid)</span>
          </button>

          {/* Switch to 5-Step Guided Onboarding Wizard */}
          <div className="pt-2 text-center text-xs text-slate-400">
            <span>Don't have a profile yet? </span>
            <button
              type="button"
              onClick={() => setMode('onboarding')}
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400 hover:underline inline-flex items-center gap-1"
            >
              Start 5-Step Onboarding Wizard ✨
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
