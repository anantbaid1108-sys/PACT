import React, { useState, useEffect } from 'react';
import { Gamepad2, Zap, Users, ShieldAlert, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ArcadeView({ onStartGameWithOpponent }) {
  const [inQueue, setInQueue] = useState(false);
  const [queueTimer, setQueueTimer] = useState(0);
  const [matchedOpponent, setMatchedOpponent] = useState(null);

  useEffect(() => {
    let interval;
    if (inQueue && !matchedOpponent) {
      interval = setInterval(() => {
        setQueueTimer(prev => {
          if (prev >= 3) {
            // Found a match after 3 seconds!
            const opponent = {
              name: "CyberStriker (Anonymous)",
              age: 24,
              location: "Seattle, WA",
              vibe: "Modular Synth & Bouldering",
              tags: ["Valorant", "Balatro", "Elden Ring"],
              photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
            };
            setMatchedOpponent(opponent);
            confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
            return prev + 1;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [inQueue, matchedOpponent]);

  const handleStartQueue = () => {
    setInQueue(true);
    setQueueTimer(0);
    setMatchedOpponent(null);
  };

  const handleCancelQueue = () => {
    setInQueue(false);
    setQueueTimer(0);
    setMatchedOpponent(null);
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-y-auto p-4 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-cardBg border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 text-center">
        {/* Header Icon */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-[1.5px] shadow-xl shadow-orange-500/20">
          <div className="w-full h-full bg-[#0F172A] rounded-[14px] flex items-center justify-center">
            <Gamepad2 className="w-8 h-8 text-amber-400" />
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
            Activity-First Blind Arena
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">Instant Arcade Queue</h2>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Skip photo snap-judgments. Jump into a fast 1v1 mind duel with an active stranger and bond over victory before unlocking profiles.
          </p>
        </div>

        {/* Queue State Card */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          {!inQueue ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>142 Active Players in Matchmaking</span>
              </div>
              <button
                onClick={handleStartQueue}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-slate-950" /> Enter 1v1 Blind Queue
              </button>
            </div>
          ) : matchedOpponent ? (
            <div className="space-y-4 animate-fade">
              <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Opponent Locked!
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-left">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-xl font-bold text-white shrink-0">
                  👾
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{matchedOpponent.name}</h4>
                  <p className="text-xs text-slate-400">📍 {matchedOpponent.location} • {matchedOpponent.vibe}</p>
                </div>
              </div>

              <button
                onClick={() => onStartGameWithOpponent(matchedOpponent)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <Trophy className="w-4 h-4" /> Start Number Duel Showdown
              </button>
            </div>
          ) : (
            <div className="space-y-3 py-2">
              <div className="w-10 h-10 mx-auto rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
              <div className="text-sm font-bold text-amber-300">
                Searching for Opponent ({queueTimer}s)...
              </div>
              <p className="text-[11px] text-slate-400">
                Scanning trait vectors & reaction speeds in your area.
              </p>
              <button
                onClick={handleCancelQueue}
                className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Cancel Search
              </button>
            </div>
          )}
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 gap-2 text-left text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-amber-400 font-bold block">🔒 Blind Start</span>
            <span className="text-slate-400 text-[11px]">Photos revealed only after mutual banter.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-rose-400 font-bold block">⚡ 5-Sec Queue</span>
            <span className="text-slate-400 text-[11px]">Zero endless swiping or ghosted queues.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
