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
import { GLOBAL_ARTISTS } from '../mockData';

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
      if (prefGender === 'Women') {
        const isWoman = p.gender === 'Woman' || p.gender === 'Female';
        if (!isWoman) return false;
      } else if (prefGender === 'Men') {
        const isMan = p.gender === 'Man' || p.gender === 'Male';
        if (!isMan) return false;
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

  // Find overlapping interests with user
  const userInterests = user?.interests || [];
  const candidateInterests = currentProfile?.interests || [];
  const candidateTraits = currentProfile?.threeWords || currentProfile?.selfTraits || [];

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] mx-auto flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 overflow-x-hidden bg-gradient-to-b from-[#2B0E1E] via-[#1A0A14] to-[#12070D]">
      {/* 1. Playful Pink Canvas with Drifting Bees (🐝) & Balloons (🎈) at opacity-20 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft-Pink Canvas Radial Ambient Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/15 via-rose-500/10 to-transparent blur-3xl opacity-90" />
        <div className="absolute -bottom-32 right-1/4 w-[750px] h-[550px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-500/15 via-pink-600/10 to-transparent blur-3xl opacity-80" />

        {[
          { icon: '🐝', x: '8%', delay: 0, duration: 18, size: 'text-2xl' },
          { icon: '🎈', x: '22%', delay: 3, duration: 22, size: 'text-3xl' },
          { icon: '🐝', x: '38%', delay: 6, duration: 16, size: 'text-xl' },
          { icon: '🎈', x: '55%', delay: 2, duration: 25, size: 'text-2xl' },
          { icon: '🐝', x: '72%', delay: 8, duration: 19, size: 'text-2xl' },
          { icon: '🎈', x: '88%', delay: 5, duration: 21, size: 'text-3xl' },
          { icon: '🐝', x: '16%', delay: 10, duration: 17, size: 'text-xl' },
          { icon: '🎈', x: '68%', delay: 9, duration: 24, size: 'text-2xl' },
          { icon: '🐝', x: '48%', delay: 4, duration: 20, size: 'text-xl' },
          { icon: '🎈', x: '32%', delay: 12, duration: 23, size: 'text-3xl' },
        ].map((item, idx) => (
          <motion.div
            key={`spring-ambient-${idx}`}
            className={`absolute select-none pointer-events-none opacity-20 filter blur-[0.2px] ${item.size}`}
            style={{ left: item.x, bottom: '-40px' }}
            animate={{
              y: [0, -1100],
              x: [(idx % 2 === 0 ? 1 : -1) * 35, (idx % 2 === 0 ? -1 : 1) * 35],
              rotate: [0, idx % 2 === 0 ? 25 : -25, 0],
              opacity: [0, 0.20, 0.20, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: 'easeInOut',
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

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

      {/* If no matching candidates */}
      {!currentProfile ? (
        <div className="relative z-10 w-full max-w-md mx-auto p-4 text-center">
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-5 shadow-2xl shadow-rose-950/20">
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
      ) : (
        <>
          {/* 2. Mobile Sticky Floating Quick SUPERPACT Trigger (< 768px) */}
          <motion.button
            type="button"
            onClick={handleSuperpactAction}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed bottom-20 right-4 z-30 md:hidden w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-500 text-white flex items-center justify-center shadow-2xl shadow-rose-500/50 border-2 border-white/30 group active:scale-90 transition-transform"
            title="Quick SUPERPACT Challenge"
          >
            <Zap className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 text-[9px] font-black items-center justify-center text-slate-950 shadow-sm">
                ⚡
              </span>
            </span>
          </motion.button>

          {/* 3. Main Dating Profile Card
              - Mobile (< 768px): Vertical stack, natural scroll, actions at bottom of card
              - Tablet (768px - 1024px): Side-by-side all-in-one view (no scroll needed)
              - Desktop (>= 1024px): Vertical stack preserving existing desktop design
          */}
          <motion.div
            key={currentProfile.id}
            className="w-full max-w-md md:max-w-4xl lg:max-w-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-rose-950/25 flex flex-col md:flex-row lg:flex-col md:h-[calc(100vh-140px)] md:max-h-[740px] lg:h-auto lg:max-h-none relative z-10"
            initial={{ scale: 0.96, opacity: 0, y: 15 }}
            animate={{ 
              scale: activeEffect === 'pass' ? 0.88 : activeEffect === 'pact' || activeEffect === 'superpact' ? 1.02 : 1, 
              opacity: activeEffect === 'pass' ? 0 : activeEffect ? 0.4 : 1,
              x: activeEffect === 'pass' ? -400 : activeEffect === 'pact' ? 180 : 0,
              rotate: activeEffect === 'pass' ? -18 : activeEffect === 'pact' ? 12 : 0,
              y: activeEffect === 'superpact' ? -40 : 0
            }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Animated Thick Neon-Red Double Cross (✕) Slashing Card on Pass */}
            <AnimatePresence>
              {activeEffect === 'pass' && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none bg-rose-950/25 backdrop-blur-[2px]"
                >
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-44 h-44 rounded-full bg-rose-600/40 blur-2xl animate-pulse" />
                    <svg
                      className="w-56 h-56 text-rose-500 filter drop-shadow-[0_0_35px_rgba(244,63,94,1)] drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                      viewBox="0 0 100 100"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="14"
                      strokeLinecap="round"
                    >
                      <line x1="22" y1="22" x2="78" y2="78" />
                      <line x1="78" y1="22" x2="22" y2="78" />
                    </svg>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Left Column (on tablet) / Top Stage (on mobile & desktop): Photo Carousel */}
            <div className="relative w-full md:w-1/2 lg:w-full h-[380px] sm:h-[420px] md:h-full lg:h-[440px] bg-slate-950 overflow-hidden select-none shrink-0">
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
                    title="Previous Photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-20"
                    title="Next Photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Photo Caption Badge */}
              {activePhoto.caption && (
                <div className="absolute bottom-20 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-medium text-amber-200">
                    📷 {activePhoto.caption}
                  </span>
                </div>
              )}

              {/* Bottom Card Title Overlay (Name, Age, Location, Distance) */}
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

            {/* Right Column (on tablet) / Bottom Stage (on mobile & desktop): Content + Actions */}
            <div className="w-full md:w-1/2 lg:w-full flex flex-col md:h-full lg:h-auto justify-between bg-gradient-to-b from-[#110E1C] to-[#0D0B14] overflow-hidden">
              {/* Profile Details Body (Scrollable inside on tablet, natural scroll on mobile, full view on desktop) */}
              <div className="p-5 sm:p-6 md:p-5 lg:p-6 space-y-4 sm:space-y-5 md:space-y-4 lg:space-y-5 text-left md:flex-1 md:overflow-y-auto lg:overflow-visible">
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
                      {currentProfile.topArtists.map((artistName) => {
                        const artistObj = GLOBAL_ARTISTS.find(
                          a => a.name.toLowerCase() === artistName.toLowerCase()
                        );
                        return (
                          <div
                            key={artistName}
                            className="inline-flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-slate-900/80 border border-amber-400/25 text-amber-300 text-xs font-semibold shadow-sm"
                          >
                            {artistObj?.avatar ? (
                              <img
                                src={artistObj.avatar}
                                alt={artistName}
                                className="w-5 h-5 rounded-full object-cover border border-amber-400/40"
                              />
                            ) : (
                              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-[10px]">♫</span>
                            )}
                            <span>{artistName}</span>
                          </div>
                        );
                      })}
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

              {/* 3 Main Action Triggers
                  - On Mobile: Placed at the very bottom of the card content
                  - On Tablet: Pinned at the base of the right column (always visible, no scroll needed)
                  - On Desktop: Pinned at the bottom of the card
              */}
              <div className="p-4 sm:p-5 md:p-4 lg:p-5 bg-[#0B0912] border-t border-white/10 flex items-center justify-center gap-4 sm:gap-6 md:gap-4 lg:gap-6 shrink-0">
                {/* 1. Pass Button */}
                <button
                  type="button"
                  onClick={handlePassAction}
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-13 md:h-13 lg:w-16 lg:h-16 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-white flex items-center justify-center shadow-lg transition-transform active:scale-90"
                  title="Pass (Swipe Left)"
                >
                  <X className="w-6 h-6 stroke-[2.5]" />
                </button>

                {/* 2. SUPERPACT Button */}
                <button
                  type="button"
                  onClick={handleSuperpactAction}
                  className="px-5 sm:px-7 md:px-5 lg:px-7 h-14 sm:h-16 md:h-13 lg:h-16 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-500 text-white font-black text-xs sm:text-sm md:text-xs lg:text-sm shadow-xl shadow-rose-500/30 hover:opacity-95 transition-all flex items-center gap-2 active:scale-95 group"
                  title="Send SUPERPACT Mini-Game Duel"
                >
                  <Zap className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                  <span className="tracking-wide">SUPERPACT</span>
                </button>

                {/* 3. Pact / Like Button */}
                <button
                  type="button"
                  onClick={handlePactAction}
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-13 md:h-13 lg:w-16 lg:h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white flex items-center justify-center shadow-xl shadow-emerald-500/25 transition-transform active:scale-90"
                  title="Form a Pact (Like)"
                >
                  <Heart className="w-6 h-6 fill-white stroke-none" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
