import React from 'react';
import { Sparkles, Zap, Heart, MapPin } from 'lucide-react';
import { PROFILES } from '../mockData';

export default function DailyPicks({ onChallengeProfile, onMatchProfile }) {
  const dailySparks = PROFILES.slice(0, 3);

  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-y-auto p-4 flex flex-col items-center">
      <div className="max-w-2xl w-full mx-auto space-y-4">
        {/* Banner */}
        <div className="p-4 rounded-3xl bg-cardBg border border-slate-800 flex items-center justify-between shadow-xl">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
              Curated Trait Resonance
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Daily 3 Sparks
            </h2>
            <p className="text-xs text-slate-400">Resets every 24 hours based on reciprocal matrix analysis</p>
          </div>
          <div className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono font-bold">
            18:24:02 Left
          </div>
        </div>

        {/* 3 Sparks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {dailySparks.map((profile) => (
            <div 
              key={profile.id}
              className="bg-cardBg border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-slate-700 transition-all"
            >
              <div className="relative h-56 bg-slate-900 overflow-hidden">
                <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
                
                <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[11px] font-bold">
                  {profile.compatibility}% Match
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <h4 className="text-base font-bold text-white leading-tight">
                    {profile.name}, {profile.age}
                  </h4>
                  <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {profile.location}
                  </p>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {profile.bio}
                </p>

                <div className="flex flex-wrap gap-1">
                  {profile.interests.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] bg-rose-500/10 text-rose-300 border border-rose-500/20 px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => onChallengeProfile(profile)}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1"
                  >
                    <Zap className="w-3.5 h-3.5 fill-slate-950" /> Challenge
                  </button>
                  <button
                    onClick={() => onMatchProfile(profile)}
                    className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors"
                    title="Pact Like"
                  >
                    <Heart className="w-4 h-4 fill-emerald-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
