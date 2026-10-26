import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Sparkles, 
  Zap, 
  Heart, 
  X, 
  RefreshCw, 
  Gamepad2, 
  Music, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Deck({ 
  user,
  profiles = [], 
  onPass, 
  onLike, 
  onSuperpact,
  onOpenEditProfile
}) {
  // Candidate photo index within active profile card
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [activeEffect, setActiveEffect] = useState(null); // 'pass' | 'superpact' | 'pact'
  const [floatingIcons, setFloatingIcons] = useState([]);

  // Compute filtered candidates based on strict user preferences
  const filterCandidates = (profileList) => {
    if (!profileList || !profileList.length) return [];
    const minAge = user?.preferredMinAge ?? 18;
    const maxAge = user?.preferredMaxAge ?? 80;
    const prefGender = user?.datingPreferenceGender ?? 'Everyone';

    return profileList.filter(p => {
      // 1. Strict Age Range
      const matchesAge = p.age >= minAge && p.age <= maxAge;
      if (!matchesAge) return false;

      // 2. Strict Gender
      if (prefGender !== 'Everyone') {
        if (prefGender === 'Women' && p.gender !== 'Woman') return false;
        if (prefGender === 'Men' && p.gender !== 'Man') return false;
      }

      return true;
    });
  };

  const [activeDeck, setActiveDeck] = useState(() => filterCandidates(profiles));

  // Sync if profiles or user filters change
  useEffect(() => {
    setActiveDeck(filterCandidates(profiles));
    setCurrentPhotoIdx(0);
  }, [user?.preferredMinAge, user?.preferredMaxAge, user?.datingPreferenceGender, profiles]);

  const currentProfile = activeDeck[0];

  // Reset photo index when current card changes
  useEffect(() => {
    setCurrentPhotoIdx(0);
  }, [currentProfile?.id]);

  const photosList = currentProfile?.photos?.length 
    ? currentProfile.photos 
    : [{ url: currentProfile?.photo, caption: "Primary DP" }];

  const activePhoto = photosList[currentPhotoIdx] || photosList[0];

  const handlePassAction = () => {
    if (!currentProfile || activeEffect) return;
    setActiveEffect('pass');

    setTimeout(() => {
      onPass(currentProfile);
      setActiveDeck(prev => (prev.length > 1 ? prev.slice(1) : []));
      setActiveEffect(null);
    }, 420);
  };

  const handleSuperpactAction = () => {
    if (!currentProfile || activeEffect) return;
    setActiveEffect('superpact');

    // Burst retro gaming icons
    const icons = ['🎮', '⚡', '🏆', '🎯', '👾', '🕹️'];
    const generated = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      x: (Math.random() - 0.5) * 160,
      y: -(Math.random() * 120 + 80),
      rotate: (Math.random() - 0.5) * 60,
    }));
    setFloatingIcons(generated);

    setTimeout(() => {
      onSuperpact(currentProfile);
      setActiveEffect(null);
      setFloatingIcons([]);
    }, 420);
  };

  const handlePactAction = () => {
    if (!currentProfile || activeEffect) return;
    setActiveEffect('pact');

    confetti({
      particleCount: 55,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#F59E0B', '#FF3366', '#10B981']
    });

    const hearts = ['💚', '❤️', '💖', '✨', '💕'];
    const generated = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      icon: hearts[i % hearts.length],
      x: (Math.random() - 0.5) * 160,
      y: -(Math.random() * 120 + 80),
      rotate: (Math.random() - 0.5) * 45,
    }));
    setFloatingIcons(generated);

    setTimeout(() => {
      onLike(currentProfile);
      setActiveDeck(prev => (prev.length > 1 ? prev.slice(1) : []));
      setActiveEffect(null);
      setFloatingIcons([]);
    }, 420);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhotoIdx(prev => (prev > 0 ? prev - 1 : photosList.length - 1));
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhotoIdx(prev => (prev < photosList.length - 1 ? prev + 1 : 0));
  };

  // If no matching candidates
  if (!currentProfile) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
        <div className="max-w-md w-full mx-auto bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center space-y-5 shadow-2xl shadow-rose-950/20">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-400/10">
            <SlidersHorizontal className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">No Matching Profiles in Range</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              No candidates currently meet your strict filter of <span className="text-amber-400 font-bold">{user?.datingPreferenceGender || 'Everyone'}</span> aged <span className="text-rose-400 font-bold">{user?.preferredMinAge ?? 18}–{user?.preferredMaxAge ?? 80}</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button 
              onClick={onOpenEditProfile}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-bold text-xs shadow-lg shadow-rose-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" /> Adjust Filters
            </button>
            <button 
              onClick={() => setActiveDeck(profiles)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-white/10"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset View
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Find overlapping interests with user
  const userInterests = user?.interests || [];
  const candidateInterests = currentProfile.interests || [];
  const candidateTraits = currentProfile.threeWords || currentProfile.selfTraits || [];

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-2 sm:p-4 min-h-[calc(100vh-5rem)]">
      {/* Floating Animated Reaction Sprites */}
      <AnimatePresence>
        {floatingIcons.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.8 }}
            animate={{ 
              opacity: 0, 
              x: item.x, 
              y: item.y, 
              scale: 1.6, 
              rotate: item.rotate 
            }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 pointer-events-none text-3xl sm:text-4xl z-50 drop-shadow-lg"
          >
            {item.icon}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Dating Profile Card */}
      <motion.div
        key={currentProfile.id}
        initial={{ scale: 0.96, opacity: 0, y: 15 }}
        animate={{ 
          scale: activeEffect === 'pass' ? 0.9 : activeEffect === 'pact' || activeEffect === 'superpact' ? 1.02 : 1, 
          opacity: activeEffect ? 0.4 : 1,
          x: activeEffect === 'pass' ? -180 : activeEffect === 'pact' ? 180 : 0,
          rotate: activeEffect === 'pass' ? -12 : activeEffect === 'pact' ? 12 : 0,
          y: activeEffect === 'superpact' ? -40 : 0
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-rose-950/20 flex flex-col"
      >
        {/* Photo Stage (Bounded & Contained with Carousel Support) */}
        <div className="relative w-full h-[380px] sm:h-[440px] bg-slate-950 overflow-hidden select-none">
          <img
            src={activePhoto.url}
            alt={currentProfile.name}
            className="w-full h-full object-cover object-center transition-all duration-300"
          />

          {/* Vignette Gradients for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A10] via-transparent to-black/40" />

          {/* Top Info Bar (Match Compatibility + Multi-Photo Indicator) */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentProfile.compatibility || 94}% Chemistry</span>
            </div>

            {/* Photo Segment Indicators */}
            {photosList.length > 1 && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                {photosList.map((_, pIdx) => (
                  <div
                    key={pIdx}
                    className={`h-1.5 rounded-full transition-all ${
                      pIdx === currentPhotoIdx ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Carousel Left/Right Touch Trigger Overlays */}
          {photosList.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Photo Caption Badge (Slots 2–6) */}
          {activePhoto.caption && (
            <div className="absolute bottom-20 left-4 z-10">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-medium text-amber-200">
                📷 {activePhoto.caption}
              </span>
            </div>
          )}

          {/* Bottom Card Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {currentProfile.name}
              </h2>
              <span className="text-xl sm:text-2xl font-bold text-amber-400 font-mono">
                {currentProfile.age}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1 font-medium">
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {currentProfile.hometown || currentProfile.location}
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">
                {currentProfile.distance}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Content Body */}
        <div className="p-5 sm:p-6 space-y-5 text-left bg-gradient-to-b from-[#110E1C] to-[#0D0B14]">
          {/* 3-Word Traits Badges */}
          {candidateTraits.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                In 3 Words:
              </span>
              {candidateTraits.map((word, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-200"
                >
                  #{word}
                </span>
              ))}
            </div>
          )}

          {/* Bio */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {currentProfile.bio}
          </p>

          {/* Top 4 Global Artists Display */}
          {currentProfile.topArtists?.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-amber-400" /> Top Music Artists
              </span>
              <div className="flex flex-wrap gap-2">
                {currentProfile.topArtists.map((artist) => (
                  <span
                    key={artist}
                    className="px-3 py-1 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>♫</span> {artist}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Categorized Interests with Mutual Spark Highlight */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Passions & Sparks
            </span>
            <div className="flex flex-wrap gap-2">
              {candidateInterests.map((interest) => {
                const isMutual = userInterests.includes(interest);
                return (
                  <span
                    key={interest}
                    className={`px-3 py-1 rounded-xl text-xs font-medium border transition-all ${
                      isMutual
                        ? 'bg-gradient-to-r from-amber-400/20 via-rose-500/20 to-pink-500/20 border-rose-500/50 text-white font-bold shadow-sm'
                        : 'bg-white/5 border-white/10 text-slate-300'
                    }`}
                  >
                    {isMutual && '✨ '}
                    {interest}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Mini-Game Challenge Invitation Banner */}
          {currentProfile.gamePrompt && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-violet-950/40 via-rose-950/40 to-slate-900 border border-rose-500/30 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block">
                  Icebreaker Challenge
                </span>
                <p className="text-xs text-white font-medium truncate">
                  "{currentProfile.gamePrompt}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 3 Main Action Triggers */}
        <div className="p-4 sm:p-5 bg-[#0B0912] border-t border-white/10 flex items-center justify-center gap-4 sm:gap-6">
          {/* 1. Pass Button */}
          <button
            type="button"
            onClick={handlePassAction}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-white flex items-center justify-center shadow-lg transition-transform active:scale-90"
            title="Pass (Swipe Left)"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* 2. SUPERPACT Button (Mini-game Challenge Trigger) */}
          <button
            type="button"
            onClick={handleSuperpactAction}
            className="px-5 sm:px-7 h-14 sm:h-16 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-rose-500/30 hover:opacity-95 transition-all flex items-center gap-2 active:scale-95 group"
            title="Send SUPERPACT Mini-Game Duel"
          >
            <Zap className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
            <span className="tracking-wide">SUPERPACT</span>
          </button>

          {/* 3. Pact / Like Button */}
          <button
            type="button"
            onClick={handlePactAction}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white flex items-center justify-center shadow-xl shadow-emerald-500/25 transition-transform active:scale-90"
            title="Form a Pact (Like)"
          >
            <Heart className="w-6 h-6 fill-white stroke-none" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
