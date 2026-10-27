import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  Heart, 
  MapPin, 
  SlidersHorizontal, 
  RefreshCw, 
  Music, 
  Tag, 
  Flame, 
  Clock,
  Compass
} from 'lucide-react';
import { PROFILES } from '../mockData';

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

export default function DailyPicks({ 
  user, 
  profiles = PROFILES, 
  onChallengeProfile, 
  onMatchProfile, 
  onOpenEditProfile 
}) {
  const minAge = user?.preferredMinAge ?? 18;
  const maxAge = user?.preferredMaxAge ?? 80;
  const prefGender = user?.datingPreferenceGender ?? 'Everyone';

  // 1. Strict Gender and Strict Age Filtering
  const filteredCandidates = useMemo(() => {
    return (profiles || []).filter((p) => {
      // Strict age check
      const matchesAge = p.age >= minAge && p.age <= maxAge;
      if (!matchesAge) return false;

      // Strict gender check
      if (prefGender === 'Women') {
        return p.gender === 'Woman' || p.gender === 'Female';
      }
      if (prefGender === 'Men') {
        return p.gender === 'Man' || p.gender === 'Male';
      }
      return true; // Everyone
    });
  }, [profiles, minAge, maxAge, prefGender]);

  // 2. 24-Hour Cycle & Selection Engine
  const [selectedIds, setSelectedIds] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(TWENTY_FOUR_HOURS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initialize or re-sync with localStorage
  const initOrRefreshSparks = (forceNew = false) => {
    if (filteredCandidates.length === 0) {
      setSelectedIds([]);
      return;
    }

    const savedTimestampStr = localStorage.getItem('pact_sparks_timestamp');
    const savedIdsStr = localStorage.getItem('pact_sparks_ids');
    const now = Date.now();
    let savedTimestamp = savedTimestampStr ? parseInt(savedTimestampStr, 10) : 0;
    let savedIds = [];

    try {
      savedIds = savedIdsStr ? JSON.parse(savedIdsStr) : [];
    } catch {
      savedIds = [];
    }

    const isExpired = !savedTimestamp || now - savedTimestamp >= TWENTY_FOUR_HOURS;
    // Check if saved IDs still exist in filteredCandidates
    const validSaved = savedIds.filter(id => filteredCandidates.some(c => c.id === id));

    if (forceNew || isExpired || validSaved.length < Math.min(5, filteredCandidates.length)) {
      // Pick 5 fresh high-resonance profiles from candidates
      const shuffled = [...filteredCandidates].sort(() => 0.5 - Math.random());
      const newPicks = shuffled.slice(0, 5).map(p => p.id);

      localStorage.setItem('pact_sparks_timestamp', now.toString());
      localStorage.setItem('pact_sparks_ids', JSON.stringify(newPicks));

      setSelectedIds(newPicks);
      setTimeRemaining(TWENTY_FOUR_HOURS);
    } else {
      // Retain active 24-hr batch
      setSelectedIds(validSaved.slice(0, 5));
      const elapsed = now - savedTimestamp;
      setTimeRemaining(Math.max(0, TWENTY_FOUR_HOURS - elapsed));
    }
  };

  useEffect(() => {
    initOrRefreshSparks(false);
  }, [filteredCandidates]);

  // 3. Live Ticking Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1000) {
          // Timer reached zero! Re-roll cycle
          initOrRefreshSparks(true);
          return TWENTY_FOUR_HOURS;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [filteredCandidates]);

  // Format milliseconds into HH:MM:SS
  const formatCountdown = (ms) => {
    const totalSecs = Math.max(0, Math.floor(ms / 1000));
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    initOrRefreshSparks(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Map selected IDs to candidate objects
  const dailySparks = useMemo(() => {
    const map = new Map(filteredCandidates.map(p => [p.id, p]));
    const list = selectedIds.map(id => map.get(id)).filter(Boolean);
    // If fewer than 3 and candidates exist, fill in
    if (list.length < 3 && filteredCandidates.length > list.length) {
      const remaining = filteredCandidates.filter(p => !list.some(item => item.id === p.id));
      return [...list, ...remaining.slice(0, 3 - list.length)];
    }
    return list;
  }, [selectedIds, filteredCandidates]);

  // ========================================================
  // DEEP COMPATIBILITY MATCHING BREAKDOWN HELPERS
  // ========================================================
  const getTopOverlappingTag = (candidate) => {
    const userInterests = user?.interests || [];
    const candidateInterests = candidate.interests || [];
    const match = userInterests.find(ui => 
      candidateInterests.some(ci => ci.toLowerCase() === ui.toLowerCase())
    );
    if (match) {
      return `Both passionate about ${match}`;
    }
    return `Shared passion for ${candidateInterests[0] || 'Authentic Play'}`;
  };

  const getSharedMusic = (candidate) => {
    const userArtists = user?.topArtists || [];
    const candidateArtists = candidate.topArtists || [];
    const shared = userArtists.find(ua => 
      candidateArtists.some(ca => ca.toLowerCase() === ua.toLowerCase())
    );
    if (shared) {
      return `Both listen to ${shared}`;
    }
    if (candidateArtists.length > 0) {
      return `Music vibe: ${candidateArtists[0]}`;
    }
    return `Vibe resonance in Indie & Alt`;
  };

  const getReciprocityMeter = (candidate) => {
    const userTraits = user?.threeWords || user?.selfTraits || ['Curious', 'Spontaneous', 'Caffeinated'];
    const candidateTraits = candidate.threeWords || candidate.selfTraits || ['Tactile', 'Playful', 'Tenacious'];
    const uTrait = userTraits[0] || 'Curious';
    const cTrait = candidateTraits[1] || candidateTraits[0] || 'Playful';
    return `Your trait "${uTrait}" matches their partner preference "${cTrait}"`;
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-y-auto p-3 sm:p-5 flex flex-col items-center relative overflow-x-hidden bg-[#07050B]">
      {/* Ambient Animated Romantic Fire & Love Canvas Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Warm Flame-Glow Radial Gradients */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/15 via-rose-600/15 to-transparent blur-3xl opacity-90" />
        <div className="absolute -bottom-32 right-1/4 w-[650px] h-[500px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-600/15 via-amber-600/10 to-transparent blur-3xl opacity-80" />

        {/* Soft Floating Ember / Firefly Particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={`ember-${i}`}
            className="absolute rounded-full bg-gradient-to-t from-amber-400 via-rose-400 to-amber-200 blur-[0.5px]"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              left: `${(i * 5.8 + 3) % 96}%`,
              bottom: '-20px',
            }}
            animate={{
              y: [0, -950],
              x: [(i % 2 === 0 ? 1 : -1) * 25, (i % 2 === 0 ? -1 : 1) * 25],
              opacity: [0, 0.75, 0.9, 0],
            }}
            transition={{
              duration: 11 + (i % 7) * 2,
              repeat: Infinity,
              delay: (i * 0.6) % 6,
              ease: 'linear',
            }}
          />
        ))}

        {/* Glowing Heart, Flame & Sparkle Silhouettes at Soft Opacity (15%) */}
        {[
          { icon: '❤️', x: '8%', delay: 0, duration: 24, size: 'text-2xl' },
          { icon: '🔥', x: '22%', delay: 4, duration: 18, size: 'text-xl' },
          { icon: '✨', x: '38%', delay: 2, duration: 26, size: 'text-lg' },
          { icon: '❤️', x: '58%', delay: 7, duration: 22, size: 'text-3xl' },
          { icon: '🔥', x: '75%', delay: 3, duration: 28, size: 'text-2xl' },
          { icon: '✨', x: '88%', delay: 8, duration: 20, size: 'text-xl' },
          { icon: '❤️', x: '16%', delay: 11, duration: 25, size: 'text-xl' },
          { icon: '🔥', x: '82%', delay: 6, duration: 21, size: 'text-2xl' },
          { icon: '❤️', x: '48%', delay: 13, duration: 23, size: 'text-2xl' },
        ].map((item, idx) => (
          <motion.div
            key={`float-symbol-${idx}`}
            className={`absolute select-none pointer-events-none opacity-15 filter blur-[0.3px] ${item.size}`}
            style={{ left: item.x, bottom: '-40px' }}
            animate={{
              y: [0, -1000],
              rotate: [0, idx % 2 === 0 ? 25 : -25, idx % 2 === 0 ? -15 : 15],
              opacity: [0, 0.15, 0.15, 0],
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

      <div className="max-w-5xl w-full mx-auto space-y-5 relative z-10">
        {/* Top Header Banner with Live Ticking Countdown */}
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-white/[0.05] backdrop-blur-xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl shadow-rose-950/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
                ⚡ 24-Hour Spark Engine
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                {prefGender} • {minAge}–{maxAge} yrs
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
              Daily Sparks (5 Curated Resonance Profiles)
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              Algorithmic resonance matching your exact frequency. Locked in for 24 hours to encourage intentional connection.
            </p>
          </div>

          {/* Right: Live Ticking Countdown Pill & Actions */}
          <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
            {/* Live Ticking Countdown */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-amber-400/30 shadow-inner">
              <Clock className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <div className="text-left font-mono">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-sans font-bold">
                  Next Spark Drop
                </span>
                <span className="text-xs sm:text-sm font-black text-amber-300 tracking-wider">
                  {formatCountdown(timeRemaining)}
                </span>
              </div>
            </div>

            {/* Quick Refresh Sparks Button */}
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className={`p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all ${
                isRefreshing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
              }`}
              title="Refresh Sparks"
            >
              <RefreshCw className={`w-4 h-4 text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>

            {/* Filter Drawer Trigger */}
            <button
              onClick={onOpenEditProfile}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:scale-105 active:scale-95 transition-all"
              title="Adjust Dating Filters"
            >
              <SlidersHorizontal className="w-4 h-4 text-rose-400" />
            </button>
          </div>
        </div>

        {/* If no candidates match strict filter */}
        {dailySparks.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/10 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-400/10">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">No Sparks in Current Filter</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                No profiles currently match your active criteria for <span className="text-amber-400 font-bold">{prefGender}</span> aged <span className="text-rose-400 font-bold">{minAge}–{maxAge}</span>.
              </p>
            </div>
            <button
              onClick={onOpenEditProfile}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-extrabold text-xs shadow-xl shadow-rose-500/25 hover:opacity-95 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Adjust Dating Filters</span>
            </button>
          </div>
        ) : (
          /* 5 Sparks Responsive Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dailySparks.map((profile) => {
              const topTag = profile.breakdownTag || getTopOverlappingTag(profile);
              const sharedMusic = profile.breakdownMusic || getSharedMusic(profile);
              const reciprocity = profile.breakdownTrait 
                ? `Reciprocal trait: "${profile.breakdownTrait}" matches your profile energy` 
                : getReciprocityMeter(profile);
              const score = profile.compatibility || 96;

              return (
                <div 
                  key={profile.id}
                  className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-rose-500/40 hover:shadow-rose-950/40 transition-all duration-300"
                >
                  {/* Photo Header with Vignette and Compatibility Pill */}
                  <div className="relative h-64 sm:h-72 bg-slate-950 overflow-hidden select-none">
                    <img 
                      src={profile.photo || profile.photos?.[0]?.url} 
                      alt={profile.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C17] via-transparent to-black/30" />
                    
                    {/* Exact Match Score Pill */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-xs font-black shadow-lg flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>{score}% Chemistry Resonance</span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-left">
                      <h4 className="text-xl font-black text-white leading-tight flex items-baseline gap-2">
                        <span>{profile.name}</span>
                        <span className="text-amber-400 font-mono text-base font-bold">{profile.age}</span>
                      </h4>
                      <p className="text-xs text-rose-300 flex items-center gap-1 mt-0.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{profile.hometown || profile.location}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-emerald-400 font-semibold">{profile.distance || 'Nearby'}</span>
                      </p>
                    </div>
                  </div>

                  {/* Body Content with Deep Resonance Breakdown */}
                  <div className="p-4 sm:p-5 space-y-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#0E0C17] to-[#0A0912]">
                    {/* Bio */}
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      "{profile.bio}"
                    </p>

                    {/* ======================================================== */}
                    {/* DEEP COMPATIBILITY MATCHING BREAKDOWN BADGES             */}
                    {/* ======================================================== */}
                    <div className="space-y-2 p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-left">
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" /> Resonance Breakdown
                      </span>

                      {/* 1. Top Overlapping Tag */}
                      <div className="flex items-start gap-2 text-[11px] text-slate-200">
                        <Tag className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span className="leading-tight font-medium">
                          {topTag}
                        </span>
                      </div>

                      {/* 2. Shared Music Taste */}
                      <div className="flex items-start gap-2 text-[11px] text-slate-200">
                        <Music className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-tight font-medium">
                          {sharedMusic}
                        </span>
                      </div>

                      {/* 3. 3-Word Reciprocity Meter */}
                      <div className="flex items-start gap-2 text-[11px] text-slate-300 pt-1 border-t border-white/5">
                        <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-tight text-[10px] text-slate-300 italic">
                          {reciprocity}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                      <button
                        onClick={() => onChallengeProfile(profile)}
                        className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-extrabold text-xs shadow-lg shadow-rose-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                      >
                        <Zap className="w-4 h-4 fill-white" />
                        <span>Launch Duel</span>
                      </button>
                      <button
                        onClick={() => onMatchProfile(profile)}
                        className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 hover:scale-105 active:scale-95 transition-all shadow-md"
                        title="Form Pact"
                      >
                        <Heart className="w-4 h-4 fill-emerald-400" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
