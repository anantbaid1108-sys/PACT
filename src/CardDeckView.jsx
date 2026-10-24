import React, { useState } from "react";

/**
 * CardDeckView - Tactical & Activity-First Dating Card Deck for "Pact"
 * 
 * Implements Step 1 (Bounded Card Photo Container) and Step 2 (Rich Color Contrast):
 * - Photo Container: relative w-full h-[380px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl
 * - Card Wrapper: max-w-md w-full mx-auto bg-[#131B2E] border border-slate-700/60 rounded-3xl p-5 shadow-2xl space-y-4
 * - Self-Trait Chips: bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-lg text-xs font-medium
 * - Interest Chips: bg-rose-500/10 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-lg text-xs font-medium
 * - Action Buttons: Pass (rose), Challenge (amber-to-orange gradient), Pact (emerald)
 */
export default function CardDeckView({ 
  profiles = [
    {
      id: "user-alex",
      name: "Alex Chen",
      age: 24,
      location: "Seattle, WA",
      school: "Berklee College of Music",
      online: true,
      bio: "Synthesizer collector, ambient sound designer & bouldering enthusiast. Looking for co-op gaming partners and creative sparks.",
      selfTraits: ["Curious", "Tactical", "Night-Owl"],
      interests: ["Valorant", "Modular Synth", "Bouldering", "Post-Rock"],
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
    }
  ], 
  onSwipe = () => {},
  onChallenge = () => {}
}) {
  const [deck, setDeck] = useState(profiles);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const currentProfile = deck[0] || profiles[0];

  const handleAction = (direction) => {
    if (!currentProfile) return;
    setSwipeDirection(direction);

    setTimeout(() => {
      onSwipe(currentProfile, direction);
      setDeck((prev) => (prev.length > 1 ? prev.slice(1) : profiles));
      setSwipeDirection(null);
    }, 300);
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-y-auto p-4 flex items-center justify-center bg-[#0B0E17]">
      {/* Card Container Width & Background */}
      <div 
        className={`max-w-md w-full mx-auto bg-[#131B2E] border border-slate-700/60 rounded-3xl p-5 shadow-2xl space-y-4 transition-all duration-300 ${
          swipeDirection === "pass" 
            ? "-translate-x-full -rotate-12 opacity-0" 
            : swipeDirection === "like" || swipeDirection === "challenge"
            ? "translate-x-full rotate-12 opacity-0" 
            : ""
        }`}
      >
        {/* ✅ FIXED & BOUNDED CARD PHOTO CONTAINER */}
        <div className="relative w-full h-[380px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
          <img 
            src={currentProfile.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"} 
            alt="Profile" 
            className="w-full h-full object-cover object-center"
          />
          
          {/* Dark gradient vignette over bottom for readable text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/20 to-transparent" />
          
          {/* Profile details pinned inside bottom of photo */}
          <div className="absolute bottom-4 left-4 right-4 text-left z-10">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {currentProfile.name}, <span className="text-slate-300 font-normal">{currentProfile.age}</span>
              </h2>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs font-semibold text-rose-400 mt-1 flex items-center gap-1">
              <span>📍</span> {currentProfile.location} • <span className="text-slate-400">{currentProfile.school || "Berklee College of Music"}</span>
            </p>
          </div>
        </div>

        {/* Bio Text */}
        {currentProfile.bio && (
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            {currentProfile.bio}
          </p>
        )}

        {/* Ditch Flat Blue on the Trait Chips */}
        <div className="space-y-3 pt-1">
          {/* Self-trait chips: Warm Amber Glow */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90 block">
              Self Traits
            </span>
            <div className="flex flex-wrap gap-2">
              {(currentProfile.selfTraits || ["Curious", "Tactical", "Night-Owl"]).map((trait, idx) => (
                <span 
                  key={idx}
                  className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-lg text-xs font-medium"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Interest chips: Warm Coral/Rose Glow */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400/90 block">
              Interests & Vibes
            </span>
            <div className="flex flex-wrap gap-2">
              {(currentProfile.interests || ["Valorant", "Modular Synth", "Bouldering", "Post-Rock"]).map((interest, idx) => (
                <span 
                  key={idx}
                  className="bg-rose-500/10 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-lg text-xs font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons (High Energy Contrast) */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {/* Pass */}
          <button 
            type="button"
            onClick={() => handleAction("pass")}
            className="flex-1 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold hover:bg-rose-500/20 transition-all text-sm"
          >
            ✕ Pass
          </button>

          {/* Instant Challenge (Middle Highlight) */}
          <button 
            type="button"
            onClick={() => {
              onChallenge(currentProfile);
              handleAction("challenge");
            }}
            className="flex-[1.4] py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-transform text-sm"
          >
            ⚡ Challenge
          </button>

          {/* Pact / Like */}
          <button 
            type="button"
            onClick={() => handleAction("like")}
            className="flex-1 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold hover:bg-emerald-500/20 transition-all text-sm"
          >
            💚 Pact
          </button>
        </div>

      </div>
    </div>
  );
}
