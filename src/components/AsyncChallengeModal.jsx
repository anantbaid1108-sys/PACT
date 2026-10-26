import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Zap, 
  Trophy, 
  Sparkles, 
  Gamepad2, 
  Timer, 
  Send, 
  CheckCircle2, 
  Palette, 
  Hash, 
  HelpCircle,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AsyncChallengeModal({ 
  targetProfile, 
  onClose, 
  onDispatchSuperpact 
}) {
  const [selectedGame, setSelectedGame] = useState('tap_race'); // 'tap_race' | 'number_duel' | 'doodle_duel' | 'persona' | 'spin_bottle'
  const [step, setStep] = useState('play'); // 'play' | 'ready'

  // Tap Race State
  const [tapState, setTapState] = useState('idle');
  const [reactionTime, setReactionTime] = useState(null);
  const startTimeRef = useRef(null);
  const timeoutRef = useRef(null);

  // Number Duel State
  const [secretNumber, setSecretNumber] = useState(42);
  const [firstGuess, setFirstGuess] = useState(50);

  // Doodle State
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [doodlePrompt] = useState('Neon Cyber-Cat');

  // Persona State
  const [personaName, setPersonaName] = useState('Miles Morales');
  const [personaClue, setPersonaClue] = useState('Has electric venom strike and lives in Brooklyn');

  // Dilemma State
  const [dilemma, setDilemma] = useState('Would you rather stay awake for 48 hours jamming synths or get stranded on an outdoor V8 boulder problem?');

  const games = [
    { id: 'tap_race', title: 'Reflex Tap Race', badge: 'Reaction Speed', icon: Timer, color: 'from-purple-500 to-indigo-500' },
    { id: 'number_duel', title: 'Number Duel', badge: '1 to 100', icon: Hash, color: 'from-amber-500 to-orange-500' },
    { id: 'doodle_duel', title: 'Doodle Duel', badge: 'Sketch Clue', icon: Palette, color: 'from-rose-500 to-pink-500' },
    { id: 'persona', title: 'Persona Guess', badge: 'Speed Deduction', icon: HelpCircle, color: 'from-teal-500 to-emerald-500' },
    { id: 'spin_bottle', title: 'Spin Dilemma', badge: 'Vibe Check', icon: Sparkles, color: 'from-pink-500 to-fuchsia-500' }
  ];

  // Tap race triggers
  const startTapTest = () => {
    setTapState('waiting');
    setReactionTime(null);
    const delay = Math.floor(Math.random() * 2200) + 1400;
    timeoutRef.current = setTimeout(() => {
      setTapState('ready');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleTap = () => {
    if (tapState === 'waiting') {
      clearTimeout(timeoutRef.current);
      setTapState('idle');
      alert('Too early! Wait for GREEN.');
    } else if (tapState === 'ready') {
      const diff = Date.now() - startTimeRef.current;
      setReactionTime(diff);
      setTapState('finished');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  // Canvas drawing
  const startCanvas = (e) => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const ctx = cvs.getContext('2d');
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const drawCanvas = (e) => {
    if (!isDrawing) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const ctx = cvs.getContext('2d');
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    ctx.strokeStyle = '#FF4D6D';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopCanvas = () => {
    setIsDrawing(false);
  };

  const handleLockInAndDispatch = () => {
    let lockedScore = '';
    let gameTitle = '';

    if (selectedGame === 'tap_race') {
      gameTitle = 'Micro Reflex Tap Race';
      lockedScore = `${reactionTime || 214} ms`;
    } else if (selectedGame === 'number_duel') {
      gameTitle = 'Number Duel (1 to 100)';
      lockedScore = `Secret Target #${secretNumber} • Opening Guess ${firstGuess}`;
    } else if (selectedGame === 'doodle_duel') {
      gameTitle = 'Doodle Duel';
      lockedScore = `Sketch locked for prompt "${doodlePrompt}"`;
    } else if (selectedGame === 'persona') {
      gameTitle = 'Time-Trial Persona Guess';
      lockedScore = `Mystery Persona: ${personaName}`;
    } else {
      gameTitle = 'Spin the Bottle Dilemma';
      lockedScore = 'Personalized Tag Dilemma';
    }

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#EC4899', '#F43F5E', '#F59E0B', '#10B981']
    });

    onDispatchSuperpact({
      targetProfile,
      gameType: selectedGame,
      gameTitle,
      lockedScore,
      timestamp: 'Just now'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-cardBg border border-pink-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-[#0F172A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-fuchsia-500 flex items-center justify-center text-white font-black shadow-lg shadow-pink-500/25">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                SUPERPACT CHALLENGE
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold">
                  vs {targetProfile.name}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Lock in your opening turn now — opponent plays to counter!</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Game Tabs */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border-b border-slate-800 overflow-x-auto">
          {games.map((g) => {
            const Icon = g.icon;
            const isSelected = selectedGame === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setSelectedGame(g.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected 
                    ? `bg-gradient-to-r ${g.color} text-white shadow-md` 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{g.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Game Turn Execution Canvas/Inputs */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-left">
          {/* 1. REFLEX TAP RACE */}
          {selectedGame === 'tap_race' && (
            <div className="space-y-4 text-center">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block">Turn 1 Lock-In</span>
                <p className="text-xs text-slate-300 mt-0.5">
                  Click start below. When the screen flashes <strong className="text-emerald-400">GREEN</strong>, tap immediately to lock in your score for {targetProfile.name}!
                </p>
              </div>

              <div
                onClick={handleTap}
                className={`w-full h-44 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-150 ${
                  tapState === 'idle'
                    ? 'bg-slate-900 border-slate-700 text-slate-400'
                    : tapState === 'waiting'
                    ? 'bg-rose-950/90 border-rose-500 text-rose-300 animate-pulse'
                    : tapState === 'ready'
                    ? 'bg-emerald-500 border-emerald-300 text-slate-950 font-black'
                    : 'bg-fuchsia-950/80 border-fuchsia-500 text-fuchsia-200'
                }`}
              >
                {tapState === 'idle' && (
                  <div className="space-y-1">
                    <Timer className="w-8 h-8 mx-auto text-pink-400" />
                    <span className="text-sm font-bold text-white block">Click "Start Turn" Below</span>
                  </div>
                )}
                {tapState === 'waiting' && (
                  <span className="text-base font-black text-rose-400">WAIT FOR GREEN...</span>
                )}
                {tapState === 'ready' && (
                  <span className="text-3xl font-black text-slate-950">TAP NOW! ⚡</span>
                )}
                {tapState === 'finished' && (
                  <div className="space-y-1">
                    <span className="text-3xl font-extrabold text-white font-mono">{reactionTime} ms</span>
                    <span className="text-xs text-emerald-400 font-bold block">Score Ready to Dispatch!</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={startTapTest}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-bold text-xs"
                >
                  {tapState === 'finished' ? 'Re-Record Turn' : 'Start Turn'}
                </button>
              </div>
            </div>
          )}

          {/* 2. NUMBER DUEL */}
          {selectedGame === 'number_duel' && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Turn 1 Lock-In</span>
                <p className="text-xs text-slate-300 mt-0.5">
                  Pick your secret target number (1-100) and place your opening guess to start the duel!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <label className="text-[11px] font-bold text-slate-400">Secret Target # (1-100)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={secretNumber}
                    onChange={(e) => setSecretNumber(parseInt(e.target.value) || 50)}
                    className="w-full h-10 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold text-sm"
                  />
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <label className="text-[11px] font-bold text-slate-400">Opening Guess Clue</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={firstGuess}
                    onChange={(e) => setFirstGuess(parseInt(e.target.value) || 50)}
                    className="w-full h-10 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 3. DOODLE DUEL */}
          {selectedGame === 'doodle_duel' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Prompt: <strong className="text-rose-400">{doodlePrompt}</strong></span>
                <span className="text-[11px] text-slate-400 font-mono">Opponent will guess your sketch!</span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-[#0F172A] touch-none">
                <canvas
                  ref={canvasRef}
                  width={480}
                  height={200}
                  onMouseDown={startCanvas}
                  onMouseMove={drawCanvas}
                  onMouseUp={stopCanvas}
                  onMouseLeave={stopCanvas}
                  onTouchStart={startCanvas}
                  onTouchMove={drawCanvas}
                  onTouchEnd={stopCanvas}
                  className="w-full h-[180px] cursor-crosshair"
                />
              </div>
            </div>
          )}

          {/* 4. PERSONA GUESS */}
          {selectedGame === 'persona' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <label className="text-[11px] font-bold text-teal-400 block">Mystery Pop-Culture Icon</label>
                <input
                  type="text"
                  value={personaName}
                  onChange={(e) => setPersonaName(e.target.value)}
                  placeholder="e.g. Miles Morales, Geralt of Rivia, Sailor Moon"
                  className="w-full h-10 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold text-sm"
                />
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <label className="text-[11px] font-bold text-slate-400 block">Initial Clue for {targetProfile.name}</label>
                <input
                  type="text"
                  value={personaClue}
                  onChange={(e) => setPersonaClue(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>
          )}

          {/* 5. SPIN DILEMMA */}
          {selectedGame === 'spin_bottle' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <label className="text-[11px] font-bold text-pink-400 block">Mutual Dilemma / Hot Take</label>
                <textarea
                  rows={3}
                  value={dilemma}
                  onChange={(e) => setDilemma(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed"
                />
              </div>
            </div>
          )}
        </div>

        {/* Dispatch Action Footer */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleLockInAndDispatch}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-pink-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Lock In & Dispatch SUPERPACT ⚡</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
