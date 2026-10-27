import React, { useState, useEffect } from 'react';
import { Gamepad2, Zap, Users, ShieldAlert, Sparkles, Trophy, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

const ARCADE_GAMES = [
  { id: 'akinator', title: 'AI Akinator Guess', badge: 'Oracle Bot', icon: '🔮', desc: 'Genie deduces your secret identity with 5 real-world reaction states.' },
  { id: 'doodle_duel', title: 'Doodle Duel', badge: '60s Alternating', icon: '🎨', desc: 'Turn-based drawing rounds with live guesses and scoreboards.' },
  { id: 'twenty_q', title: '20 Questions Co-Op', badge: 'Celebrity Switch', icon: '❓', desc: 'Symmetric mystery figures. Rapid response pills to crack identity.' },
  { id: 'two_truths', title: 'Two Truths & a Lie', badge: 'New!', icon: '🤥', desc: 'Set 2 truths and 1 lie; opponent guesses with dramatic reveals.' },
  { id: 'spin_bottle', title: 'Interactive Spin Bottle', badge: 'Truth & Scenarios', icon: '🍾', desc: 'Physics-based rotating bottle for spicy personal truths and dilemma calls.' },
  { id: 'shared_canvas', title: 'Creative Studio Canvas', badge: '12 Colors', icon: '🖌️', desc: 'Pen, Neon, Highlighter, pre-stamps, and export to chat.' },
  { id: 'tap_race', title: 'Micro Reflex Tap Race', badge: 'Millisecond Precision', icon: '⚡', desc: 'Tense red light gates and millisecond reaction showdowns.' },
  { id: 'number_duel', title: 'Number Duel (1–100)', badge: '1 to 100', icon: '🔢', desc: 'Deduce the secret number with animated higher/lower guidance.' },
];

export default function ArcadeView({ onStartGameWithOpponent }) {
  const [selectedGame, setSelectedGame] = useState('akinator');
  const [inQueue, setInQueue] = useState(false);
  const [queueTimer, setQueueTimer] = useState(0);
  const [matchedOpponent, setMatchedOpponent] = useState(null);

  useEffect(() => {
    let interval;
    if (inQueue && !matchedOpponent) {
      interval = setInterval(() => {
        setQueueTimer(prev => {
          if (prev >= 2) {
            // Found a match after 2 seconds!
            const opponent = {
              name: "CyberStriker (Anonymous)",
              age: 24,
              location: "Seattle, WA",
              vibe: "Modular Synth & Bouldering",
              tags: ["Valorant", "Balatro", "Elden Ring"],
              photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
              compatibility: 96
            };
            setMatchedOpponent(opponent);
            confetti({ particleCount: 65, spread: 65, origin: { y: 0.6 } });
            return prev + 1;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [inQueue, matchedOpponent]);

  const handleStartQueue = (gameId) => {
    if (gameId) setSelectedGame(gameId);
    setInQueue(true);
    setQueueTimer(0);
    setMatchedOpponent(null);
  };

  const handleCancelQueue = () => {
    setInQueue(false);
    setQueueTimer(0);
    setMatchedOpponent(null);
  };

  const activeGameConfig = ARCADE_GAMES.find(g => g.id === selectedGame) || ARCADE_GAMES[0];

  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-y-auto p-4 flex flex-col items-center">
      <div className="max-w-4xl w-full mx-auto space-y-6">
        {/* Header Banner */}
        <div className="p-6 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-2xl shadow-rose-950/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-500 p-[1.5px] shrink-0 shadow-lg shadow-rose-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Gamepad2 className="w-7 h-7 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
                  ⚡ 8 Interactive Mini-Games
                </span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  158 Players Online
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Pact Live Arcade Arena
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Activity-first chemistry. Bond over high-stakes play before judging photos.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleStartQueue(selectedGame)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-black text-xs shadow-xl shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all shrink-0 flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Quick Match ({activeGameConfig.title})</span>
          </button>
        </div>

        {/* In-Queue / Matched Opponent Modal Overlay or Card */}
        {inQueue && (
          <div className="p-6 rounded-3xl bg-slate-900/95 border border-amber-400/30 text-center space-y-4 shadow-2xl">
            {matchedOpponent ? (
              <div className="space-y-4 animate-fade max-w-md mx-auto">
                <div className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold inline-flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Opponent Locked In!
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-800/80 border border-white/10 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-md">
                    👾
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{matchedOpponent.name}</h4>
                    <p className="text-xs text-slate-400">📍 {matchedOpponent.location} • {matchedOpponent.vibe}</p>
                    <span className="text-[10px] text-amber-300 font-semibold mt-0.5 block">
                      Game: {activeGameConfig.title}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onStartGameWithOpponent(matchedOpponent, selectedGame, activeGameConfig.title)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Trophy className="w-4 h-4" /> Launch Arena Now
                </button>
              </div>
            ) : (
              <div className="space-y-3 py-4 max-w-sm mx-auto">
                <div className="w-10 h-10 mx-auto rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                <div className="text-sm font-black text-amber-300">
                  Searching Blind Queue for "{activeGameConfig.title}" ({queueTimer}s)...
                </div>
                <p className="text-xs text-slate-400">
                  Pairing with an active member in your frequency band.
                </p>
                <button
                  onClick={handleCancelQueue}
                  className="px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                >
                  Cancel Matchmaking
                </button>
              </div>
            )}
          </div>
        )}

        {/* 8 Mini-Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {ARCADE_GAMES.map((g) => (
            <div
              key={g.id}
              onClick={() => setSelectedGame(g.id)}
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between group ${
                selectedGame === g.id
                  ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.03] border-amber-400/50 shadow-xl shadow-rose-950/30 ring-1 ring-amber-400/30'
                  : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-2xl select-none group-hover:scale-110 transition-transform">
                    {g.icon}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedGame === g.id
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                      : 'bg-white/5 text-slate-400 border border-white/5'
                  }`}>
                    {g.badge}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                    {g.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {g.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">Instant 1v1</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartQueue(g.id);
                  }}
                  className="px-3 py-1 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all"
                >
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
