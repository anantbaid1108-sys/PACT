import React, { useState } from 'react';
import { MapPin, Sparkles, Zap, Heart, X, RefreshCw, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Deck({ 
  profiles, 
  onPass, 
  onLike, 
  onInstantChallenge 
}) {
  const [deck, setDeck] = useState(profiles);
  const [swipeAnim, setSwipeAnim] = useState(null); // 'pass' | 'like' | 'challenge'

  const currentProfile = deck[0];

  const handleAction = (type) => {
    if (!currentProfile) return;
    setSwipeAnim(type);

    if (type === 'like') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10B981', '#34D399', '#F59E0B']
      });
    }

    setTimeout(() => {
      if (type === 'pass') {
        onPass(currentProfile);
      } else if (type === 'like') {
        onLike(currentProfile);
      } else if (type === 'challenge') {
        onInstantChallenge(currentProfile);
      }
      setDeck(prev => (prev.length > 1 ? prev.slice(1) : profiles));
      setSwipeAnim(null);
    }, 280);
  };

  if (!currentProfile) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="max-w-md w-full mx-auto bg-cardBg border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <Flame className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Deck Cleared!</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            You've explored all active profiles nearby for now. Try the Arcade Queue for instant 1v1 matchmaking or reset the deck!
          </p>
          <button 
            onClick={() => setDeck(profiles)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-transform"
          >
            <RefreshCw className="w-4 h-4" /> Reset Deck
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-y-auto p-4 flex flex-col items-center justify-center">
      {/* Top Deck Info Bar */}
      <div className="max-w-sm sm:max-w-md w-full mx-auto flex items-center justify-between pb-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-300">Activity-First Discover</span>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
          {deck.length} profiles nearby
        </div>
      </div>

      {/* Strict Card Wrapper */}
      <div 
        className={`
          max-w-sm sm:max-w-md w-full mx-auto bg-cardBg border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4
          transition-all duration-300 transform
          ${swipeAnim === 'pass' ? '-translate-x-full -rotate-12 opacity-0' : ''}
          ${swipeAnim === 'like' ? 'translate-x-full rotate-12 opacity-0' : ''}
          ${swipeAnim === 'challenge' ? 'scale-105 -translate-y-4 opacity-0 ring-2 ring-amber-500' : ''}
        `}
      >
        {/* Photo Container (Fix the giant image bug completely) */}
        <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
          <img 
            src={currentProfile.photo} 
            alt={currentProfile.name}
            className="w-full h-full object-cover" 
          />

          {/* Dark gradient vignette over bottom for readable text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/25 to-transparent pointer-events-none" />

          {/* Top Compatibility Badge */}
          {currentProfile.compatibility && (
            <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              <span>{currentProfile.compatibility}% Vibe Match</span>
            </div>
          )}

          {/* Profile details pinned inside bottom of photo */}
          <div className="absolute bottom-4 left-4 right-4 text-left z-10">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {currentProfile.name}, <span className="text-slate-300 font-normal">{currentProfile.age}</span>
              </h2>
              {currentProfile.online && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </div>
            <p className="text-xs font-semibold text-rose-400 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{currentProfile.location}</span> • <span className="text-slate-400">{currentProfile.school || currentProfile.occupation}</span>
            </p>
          </div>
        </div>

        {/* Bio Text */}
        {currentProfile.bio && (
          <p className="text-xs text-slate-300 leading-relaxed pt-0.5">
            {currentProfile.bio}
          </p>
        )}

        {/* Clean tags with contrast colors (amber, teal, rose) */}
        <div className="space-y-3 pt-1">
          {/* Amber for Self-Traits */}
          {currentProfile.selfTraits && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 block">
                Self Traits
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentProfile.selfTraits.map((trait, idx) => (
                  <span 
                    key={idx}
                    className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-lg text-xs font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Teal for Partner Criteria */}
          {currentProfile.seekTraits && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400/90 block">
                Seeking in a Partner
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentProfile.seekTraits.map((trait, idx) => (
                  <span 
                    key={idx}
                    className="bg-teal-500/10 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-lg text-xs font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rose for Interests */}
          {currentProfile.interests && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400/90 block">
                Interests & Passions
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentProfile.interests.map((interest, idx) => (
                  <span 
                    key={idx}
                    className="bg-rose-500/10 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-lg text-xs font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action Row: [Pass ✕] (rose-500/20), [⚡ Instant Challenge] (amber-to-orange gradient), [💚 Pact] (emerald-500/20) */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {/* Pass */}
          <button 
            type="button"
            onClick={() => handleAction('pass')}
            className="flex-1 py-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-semibold hover:bg-rose-500/30 hover:border-rose-500/60 transition-all flex items-center justify-center gap-1.5 text-sm active:scale-95 shadow-md shadow-rose-500/10"
            title="Pass to next profile"
          >
            <X className="w-4 h-4" /> Pass
          </button>

          {/* Instant Challenge (Middle Highlight) */}
          <button 
            type="button"
            onClick={() => handleAction('challenge')}
            className="flex-[1.4] py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-1.5 text-sm"
            title="Launch an Instant Mini-Game Duel"
          >
            <Zap className="w-4 h-4 fill-slate-950 text-slate-950" /> Challenge
          </button>

          {/* Pact / Like */}
          <button 
            type="button"
            onClick={() => handleAction('like')}
            className="flex-1 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-semibold hover:bg-emerald-500/30 hover:border-emerald-500/60 transition-all flex items-center justify-center gap-1.5 text-sm active:scale-95 shadow-md shadow-emerald-500/10"
            title="Pact / Match with profile"
          >
            <Heart className="w-4 h-4 fill-emerald-400 text-emerald-400" /> Pact
          </button>
        </div>
      </div>
    </div>
  );
}
