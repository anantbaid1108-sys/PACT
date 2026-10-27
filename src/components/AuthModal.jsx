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
  Compass,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import OnboardingWizard from './OnboardingWizard';
import { CURRENT_USER } from '../mockData';

export default function AuthModal({ onLoginSuccess }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup' | 'onboarding'
  const [email, setEmail] = useState('anant@pact.love');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Handle Sign In submission
  const handleSignIn = (e) => {
    e?.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both your email and password.');
      return;
    }

    // Check localStorage
    const saved = localStorage.getItem('pact_user');
    let authenticatedUser = null;
    try {
      authenticatedUser = saved ? JSON.parse(saved) : null;
    } catch {
      authenticatedUser = null;
    }

    // If existing completed user profile found
    if (authenticatedUser && authenticatedUser.onboardingComplete) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FF3366', '#D946EF', '#10B981']
      });
      onLoginSuccess(authenticatedUser);
      return;
    }

    // If user exists but hasn't completed onboarding, route to wizard
    if (authenticatedUser && !authenticatedUser.onboardingComplete) {
      setMode('onboarding');
      return;
    }

    // If no existing user session found in localStorage, notify or launch onboarding
    setError('No existing account found with this email. Click "Create Account" to build your profile, or use 1-Click Demo Login below.');
  };

  // Handle Create Account submission
  const handleCreateAccount = (e) => {
    e?.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both your email and password.');
      return;
    }

    // Route immediately into the mandatory 5-step Profile Creation Wizard!
    setMode('onboarding');
  };

  // 1-Click Demo Login for evaluators
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

  // If in Onboarding Wizard flow
  if (mode === 'onboarding') {
    return (
      <OnboardingWizard
        initialData={{
          name: name.trim() || 'New Explorer',
          email: email.trim() || 'explorer@pact.love'
        }}
        onComplete={(newUser) => {
          onLoginSuccess(newUser);
        }}
        onCancel={() => setMode('signin')}
      />
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row relative overflow-x-hidden bg-[#0B0A10] text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Ambient background glows across the whole canvas */}
      <div className="fixed top-12 left-10 w-[450px] h-[450px] bg-[#F59E0B]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-10 left-1/3 w-[500px] h-[500px] bg-[#FF3366]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed top-1/3 right-10 w-[550px] h-[550px] bg-[#D946EF]/10 rounded-full blur-[170px] pointer-events-none" />

      {/* ================= LEFT COLUMN: 50% BRAND SHOWPIECE ================= */}
      <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative z-10 overflow-hidden">
        {/* Subtle interior radial vignette */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#120F1F]/80 via-transparent to-black/60 pointer-events-none" />

        {/* Top Brand Tag */}
        <div className="relative z-10 flex items-center gap-3">
          <span className="text-2xl font-black tracking-widest text-white flex items-center gap-2">
            PACT
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 text-white tracking-widest shadow-md">
              v0.1
            </span>
          </span>
        </div>

        {/* Center: Prominent Large Logo with Subtle Breathing Pulse */}
        <div className="my-auto py-12 relative z-10 flex flex-col items-center text-center space-y-8">
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
              filter: [
                'drop-shadow(0 0 25px rgba(245, 158, 11, 0.35))',
                'drop-shadow(0 0 45px rgba(255, 51, 102, 0.55))',
                'drop-shadow(0 0 25px rgba(245, 158, 11, 0.35))'
              ]
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative cursor-pointer"
          >
            {/* Glowing ring under logo */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-amber-400/30 via-rose-500/30 to-fuchsia-500/30 blur-xl opacity-75" />
            <img 
              src="/pact-logo.png" 
              alt="Pact Logo" 
              className="w-36 h-36 sm:w-44 sm:h-44 object-contain relative z-10 drop-shadow-2xl"
            />
          </motion.div>

          {/* Romantic Tagline */}
          <div className="max-w-md space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
              Where sparks aren't left to chance, but{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500">
                forged in play.
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
              Ditch the sterile catalogue appraisal. Connect authentically through real-time mini-games, shared doodles, and mutual passions.
            </p>
          </div>

          {/* Three Glowing Trait Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {[
              { label: "Playful", color: "from-amber-400/20 to-amber-500/10 text-amber-300 border-amber-400/30" },
              { label: "Intentional", color: "from-rose-500/20 to-rose-600/10 text-rose-300 border-rose-500/30" },
              { label: "Electric", color: "from-fuchsia-500/20 to-pink-500/10 text-pink-300 border-fuchsia-500/30" }
            ].map((trait, i) => (
              <span
                key={trait.label}
                className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${trait.color} border text-xs sm:text-sm font-black tracking-wide shadow-lg backdrop-blur-md flex items-center gap-1.5`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{trait.label}</span>
                {i < 2 && <span className="opacity-40 ml-1">•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Corner Badge (Strictly v0.1) */}
        <div className="relative z-10 pt-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/5 font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>18+ Encrypted Social Protocol</span>
          </div>
          <span className="text-amber-400 font-bold px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20">
            Pact Engine v0.1 // Affecio Hacks '26
          </span>
        </div>
      </div>

      {/* ================= RIGHT COLUMN: 50% AUTH CARD ================= */}
      <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen bg-[#131B2E]/70 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-slate-800 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10">
        <div className="max-w-md w-full mx-auto space-y-7">
          
          {/* Header & Toggle */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {mode === 'signup'
                  ? 'Sign up to build your custom profile in our 5-step onboarding wizard.'
                  : 'Enter your credentials to access your active matches and arcade.'}
              </p>
            </div>

            {/* Clean Toggle Pills */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-900/80 border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError('');
                }}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  mode === 'signin'
                    ? 'bg-gradient-to-r from-amber-400 to-rose-500 text-white shadow-lg shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  mode === 'signup'
                    ? 'bg-gradient-to-r from-amber-400 to-rose-500 text-white shadow-lg shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form 
            onSubmit={mode === 'signup' ? handleCreateAccount : handleSignIn}
            className="space-y-4"
          >
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors text-sm"
                  />
                </div>
              </div>
            )}

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
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors text-sm"
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
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-bold text-sm hover:opacity-95 shadow-lg shadow-rose-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>{mode === 'signup' ? 'Start Profile Setup Wizard ⚡' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <span className="relative px-3 bg-[#131B2E] text-[11px] font-mono text-slate-400 uppercase">
              Or Instant Evaluator Preview
            </span>
          </div>

          {/* 1-Click Demo Login */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all group shadow-md"
          >
            <Compass className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
            <span>1-Click Demo Login (Anant Baid — Full Profile)</span>
          </button>

          {/* Direct link to start onboarding wizard */}
          <div className="text-center text-xs text-slate-400 pt-1">
            <span>Want to test the full wizard from scratch? </span>
            <button
              type="button"
              onClick={() => setMode('onboarding')}
              className="font-bold text-amber-400 hover:text-amber-300 underline inline-flex items-center gap-1"
            >
              Launch Onboarding Wizard ✨
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
