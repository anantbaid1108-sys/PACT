import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Trophy, 
  RotateCcw, 
  Send, 
  Sparkles, 
  HelpCircle, 
  Palette, 
  CheckCircle2, 
  ArrowUp, 
  ArrowDown, 
  Zap, 
  Timer,
  Play,
  RotateCw,
  Compass,
  MessageSquare,
  Flame,
  AlertCircle,
  HelpCircle as QuestionIcon,
  Bot,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GameModal({ 
  game, 
  partner, 
  onClose, 
  onExportToChat,
  counterChallengeData = null 
}) {
  const [activeTab, setActiveTab] = useState(game.type || 'number_duel');

  // ==========================================
  // GAME 1: NUMBER DUEL (1 to 100)
  // ==========================================
  const [targetNumber, setTargetNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guessInput, setGuessInput] = useState('');
  const [currentTurn, setCurrentTurn] = useState('user');
  const [guessHistory, setGuessHistory] = useState([]);
  const [duelGameOver, setDuelGameOver] = useState(false);
  const [duelWinner, setDuelWinner] = useState(null);
  const [minBound, setMinBound] = useState(1);
  const [maxBound, setMaxBound] = useState(100);

  const handleGuessSubmit = (e) => {
    e?.preventDefault();
    const num = parseInt(guessInput, 10);
    if (isNaN(num) || num < 1 || num > 100 || duelGameOver) return;

    let hint = '';
    if (num === targetNumber) {
      hint = 'EXACT MATCH! 🎯';
      setDuelGameOver(true);
      setDuelWinner(currentTurn === 'user' ? 'You' : partner.name);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } else if (num < targetNumber) {
      hint = 'HIGHER ⬆️';
      setMinBound(prev => Math.max(prev, num + 1));
    } else {
      hint = 'LOWER ⬇️';
      setMaxBound(prev => Math.min(prev, num - 1));
    }

    const newLog = {
      player: currentTurn === 'user' ? 'You' : partner.name,
      guess: num,
      hint,
      isCorrect: num === targetNumber,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setGuessHistory(prev => [newLog, ...prev]);
    setGuessInput('');

    if (num !== targetNumber) {
      if (currentTurn === 'user') {
        setCurrentTurn('partner');
        setTimeout(() => {
          simulatePartnerGuess(num, targetNumber);
        }, 1200);
      }
    }
  };

  const simulatePartnerGuess = (lastUserGuess, target) => {
    let partnerGuess;
    if (lastUserGuess < target) {
      partnerGuess = Math.min(maxBound, lastUserGuess + Math.floor(Math.random() * 12) + 1);
    } else {
      partnerGuess = Math.max(minBound, lastUserGuess - Math.floor(Math.random() * 12) - 1);
    }

    let hint = partnerGuess === target ? 'EXACT MATCH! 🎯' : (partnerGuess < target ? 'HIGHER ⬆️' : 'LOWER ⬇️');
    if (partnerGuess < target) setMinBound(prev => Math.max(prev, partnerGuess + 1));
    if (partnerGuess > target) setMaxBound(prev => Math.min(prev, partnerGuess - 1));
    
    setGuessHistory(prev => [
      {
        player: partner.name,
        guess: partnerGuess,
        hint,
        isCorrect: partnerGuess === target,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      },
      ...prev
    ]);

    if (partnerGuess === target) {
      setDuelGameOver(true);
      setDuelWinner(partner.name);
    } else {
      setCurrentTurn('user');
    }
  };

  const resetNumberDuel = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuessInput('');
    setCurrentTurn('user');
    setGuessHistory([]);
    setDuelGameOver(false);
    setDuelWinner(null);
    setMinBound(1);
    setMaxBound(100);
  };

  // ==========================================
  // GAME 2: MICRO REFLEX TAP RACE
  // ==========================================
  const [tapState, setTapState] = useState('idle'); // 'idle' | 'waiting' | 'ready' | 'finished'
  const [reactionTime, setReactionTime] = useState(null);
  const startTimeRef = useRef(null);
  const timeoutRef = useRef(null);

  const startTapRace = () => {
    setTapState('waiting');
    setReactionTime(null);
    const delay = Math.floor(Math.random() * 2500) + 1500;
    timeoutRef.current = setTimeout(() => {
      setTapState('ready');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleTap = () => {
    if (tapState === 'waiting') {
      clearTimeout(timeoutRef.current);
      setTapState('idle');
      alert('Too early! Wait for the light gate to turn GREEN.');
    } else if (tapState === 'ready') {
      const diff = Date.now() - startTimeRef.current;
      setReactionTime(diff);
      setTapState('finished');
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    }
  };

  const getReflexRating = (ms) => {
    if (ms < 200) return { title: '⚡ GODLIKE (Pro Esports Tier)', color: 'text-amber-400' };
    if (ms < 275) return { title: '🔥 LIGHTNING FAST (Top 5%)', color: 'text-emerald-400' };
    if (ms < 350) return { title: '✨ SOLID REFLEXES', color: 'text-teal-400' };
    return { title: '🐢 SLUGGISH (Need Coffee!)', color: 'text-rose-400' };
  };

  // ==========================================
  // GAME 3: COLLABORATIVE CANVAS & DOODLE DUEL
  // ==========================================
  const canvasRef = useRef(null);
  const [canvasDrawing, setCanvasDrawing] = useState(false);
  const [color, setColor] = useState('#FF4D6D');
  const [size, setSize] = useState(4);
  const [undoStack, setUndoStack] = useState([]);
  const [doodleTimer, setDoodleTimer] = useState(60);
  const [doodleTimerActive, setDoodleTimerActive] = useState(false);
  const [guessInputDoodle, setGuessInputDoodle] = useState('');
  const [doodleGuesses, setDoodleGuesses] = useState([
    { sender: partner.name, text: 'Is that a cyberpunk cat? 🐱' }
  ]);

  useEffect(() => {
    if (activeTab === 'shared_canvas' || activeTab === 'doodle_duel') {
      const timer = setTimeout(() => {
        const cvs = canvasRef.current;
        if (cvs) {
          const ctx = cvs.getContext('2d');
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(0, 0, cvs.width, cvs.height);

          // Simulated initial friendly doodle from partner
          ctx.strokeStyle = '#38BDF8';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(cvs.width / 2, cvs.height / 2, 45, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = '#94A3B8';
          ctx.font = '12px system-ui';
          ctx.fillText(`${partner.name}'s initial stroke • Draw together!`, cvs.width / 2 - 80, cvs.height / 2 + 70);
        }
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  useEffect(() => {
    let t;
    if (doodleTimerActive && doodleTimer > 0) {
      t = setInterval(() => setDoodleTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(t);
  }, [doodleTimerActive, doodleTimer]);

  const startCanvas = (e) => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const ctx = cvs.getContext('2d');
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setCanvasDrawing(true);
  };

  const drawCanvas = (e) => {
    if (!canvasDrawing) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const ctx = cvs.getContext('2d');
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopCanvas = () => {
    setCanvasDrawing(false);
  };

  const handleExportCanvas = () => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const dataUrl = cvs.toDataURL('image/png');

    onExportToChat({
      type: 'sticker',
      stickerUrl: dataUrl,
      caption: `Shared Canvas artwork with ${partner.name}! 🎨`
    });

    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    onClose();
  };

  const handleDoodleGuess = (e) => {
    e?.preventDefault();
    if (!guessInputDoodle.trim()) return;
    setDoodleGuesses(prev => [{ sender: 'You', text: guessInputDoodle.trim() }, ...prev]);
    setGuessInputDoodle('');
  };

  // ==========================================
  // GAME 4: TIME-TRIAL PERSONA GUESS (Akinator)
  // ==========================================
  const [personaTimer, setPersonaTimer] = useState(60);
  const [personaActive, setPersonaActive] = useState(true);
  const [qaLog, setQaLog] = useState([
    { question: 'Do they have superhuman abilities?', answer: 'YES 🔥' },
    { question: 'Are they based in Tokyo or Neo-Tokyo?', answer: 'NO ❌' },
    { question: 'Do they wear a mask?', answer: 'YES 🔥' },
  ]);
  const [personaCustomQ, setPersonaCustomQ] = useState('');
  const [buzzInGuess, setBuzzInGuess] = useState('');
  const [personaWon, setPersonaWon] = useState(false);

  useEffect(() => {
    let t;
    if (personaActive && personaTimer > 0 && !personaWon) {
      t = setInterval(() => setPersonaTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(t);
  }, [personaActive, personaTimer, personaWon]);

  const presetQuestions = [
    'Are they from an anime/manga?',
    'Are they a hero or protagonist?',
    'Do they fight with magical weapons?',
    'Are they from a video game franchise?'
  ];

  const askPersona = (q) => {
    if (!q.trim()) return;
    const answers = ['YES 🔥', 'NO ❌', 'WARM ⚡', 'IRRELEVANT 🌀'];
    const ans = answers[Math.floor(Math.random() * answers.length)];
    setQaLog(prev => [{ question: q, answer: ans }, ...prev]);
    setPersonaCustomQ('');
  };

  const handleBuzzIn = (e) => {
    e?.preventDefault();
    if (!buzzInGuess.trim()) return;
    setPersonaWon(true);
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
  };

  // ==========================================
  // GAME 5: SPIN THE BOTTLE (Physics Dilemmas)
  // ==========================================
  const [bottleRotation, setBottleRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentDilemma, setCurrentDilemma] = useState(
    'Would you rather play 48 hours of uninterrupted roguelikes or do a multi-pitch outdoor trad climb with zero GPS?'
  );

  const dilemmas = [
    `If you had to listen to only one synth album on repeat during a 10-hour road trip with ${partner.name}, which one?`,
    'Would you rather build a custom mechanical keyboard with clicky blue switches or silent linears?',
    'Hot take: What is one universally loved video game that you secretly think is completely overrated?',
    'Would you rather survive a zombie apocalypse in Seattle or an alien invasion in Tokyo?',
    'Truth: Have you ever rage-quit a competitive 1v1 match in the last 6 months?'
  ];

  const spinBottle = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const extraSpins = 360 * 4 + Math.floor(Math.random() * 360);
    const newRotation = bottleRotation + extraSpins;
    setBottleRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const nextDilemma = dilemmas[Math.floor(Math.random() * dilemmas.length)];
      setCurrentDilemma(nextDilemma);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }, 2400);
  };

  // ==========================================
  // GAME 6: 20 QUESTIONS AI
  // ==========================================
  const [twentyQuestionsLeft, setTwentyQuestionsLeft] = useState(17);
  const [twentyLog, setTwentyLog] = useState([
    { q: 'Is it an inanimate object?', a: 'YES' },
    { q: 'Can it be found in a music studio?', a: 'WARM' },
    { q: 'Does it produce electric sound?', a: 'YES' },
  ]);
  const [twentyInput, setTwentyInput] = useState('');

  const submitTwentyQ = (e) => {
    e?.preventDefault();
    if (!twentyInput.trim() || twentyQuestionsLeft <= 0) return;
    const answers = ['YES', 'NO', 'WARM', 'COLD'];
    const ans = answers[Math.floor(Math.random() * answers.length)];
    setTwentyLog(prev => [{ q: twentyInput.trim(), a: ans }, ...prev]);
    setTwentyQuestionsLeft(prev => prev - 1);
    setTwentyInput('');
  };

  // ==========================================
  // GAME 7: WHO'S THE IMPOSTER? (AI Edition)
  // ==========================================
  const [imposterPrompt] = useState('Describe your ideal rainy Sunday afternoon in 1 sentence.');
  const [imposterAnswers, setImposterAnswers] = useState([
    { id: 1, author: 'Card A', text: 'Brewing pour-over Ethiopian coffee while lubing Boba U4T switches in dim amber lighting.', isAI: false, votes: 0 },
    { id: 2, author: 'Card B', text: 'Optimal relaxation includes watching drops on glass while executing synchronized algorithms.', isAI: true, votes: 0 },
    { id: 3, author: 'Card C', text: 'Napping with two cats on the couch with ambient Japanese city pop playing on the turntable.', isAI: false, votes: 0 }
  ]);
  const [imposterVoted, setImposterVoted] = useState(false);
  const [imposterResult, setImposterResult] = useState('');

  const voteCard = (card) => {
    setImposterVoted(true);
    if (card.isAI) {
      setImposterResult(`SUCCESS! 🕵️ ${card.author} was the AI Bot! You and ${partner.name} spotted the synthetic language.`);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } else {
      setImposterResult(`FALSE ACCUSATION! 😱 ${card.author} was actually human! The AI Bot was Card B.`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 animate-fade">
      <div className="max-w-2xl w-full bg-cardBg border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 bg-[#0F172A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 flex items-center justify-center text-slate-950 font-black shadow-md">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Pact Live Arena
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-semibold">
                  vs {partner.name}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Activity-first live chemistry challenge</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 7 Interactive Game Selector Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 border-b border-slate-800 overflow-x-auto">
          {[
            { id: 'number_duel', label: '🔢 Number Duel' },
            { id: 'tap_race', label: '⚡ Reflex Tap' },
            { id: 'shared_canvas', label: '🖌️ Canvas / Doodle' },
            { id: 'akinator', label: '❓ Persona Guess' },
            { id: 'spin_bottle', label: '🍾 Spin Bottle' },
            { id: 'twenty_q', label: '💡 20 Questions' },
            { id: 'imposter', label: '🕵️ Imposter AI' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Viewport */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 text-left">
          {/* ========================================================= */}
          {/* 1. NUMBER DUEL (Visual Hot-Cold Gauge, History Log)       */}
          {/* ========================================================= */}
          {activeTab === 'number_duel' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Target Number: 1 to 100</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Visual deduction gauge narrows as you & {partner.name} take turns.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block font-mono">Current Turn:</span>
                    <span className={`text-xs font-bold ${currentTurn === 'user' ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {currentTurn === 'user' ? '👉 Your Move' : `⏳ ${partner.name}'s Move...`}
                    </span>
                  </div>
                </div>

                {/* Hot-Cold Visual Gauge Bar */}
                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Min Possible: <strong className="text-amber-400">{minBound}</strong></span>
                    <span>Remaining Range: <strong className="text-white">{maxBound - minBound + 1} candidates</strong></span>
                    <span>Max Possible: <strong className="text-rose-400">{maxBound}</strong></span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 via-pink-500 to-rose-500 rounded-full transition-all duration-300"
                      style={{ 
                        marginLeft: `${minBound - 1}%`, 
                        width: `${Math.max(4, maxBound - minBound + 1)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>

              {duelGameOver ? (
                <div className="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-2">
                  <Trophy className="w-10 h-10 mx-auto text-amber-400 animate-bounce" />
                  <h3 className="text-lg font-bold text-white">{duelWinner} Won the Duel!</h3>
                  <p className="text-xs text-emerald-300">Target was {targetNumber} in {guessHistory.length} total moves.</p>
                  <button
                    onClick={resetNumberDuel}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md mt-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Rematch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGuessSubmit} className="flex gap-2">
                  <input
                    type="number"
                    min={minBound}
                    max={maxBound}
                    disabled={currentTurn !== 'user'}
                    value={guessInput}
                    onChange={(e) => setGuessInput(e.target.value)}
                    placeholder={currentTurn === 'user' ? `Enter guess (${minBound}-${maxBound})...` : `${partner.name} is calculating...`}
                    className="flex-1 h-11 px-4 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={currentTurn !== 'user' || !guessInput}
                    className="px-5 h-11 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                  >
                    Submit Guess
                  </button>
                </form>
              )}

              {/* History Log */}
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {guessHistory.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                      item.isCorrect 
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold' 
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{item.player}</span>
                      <span>guessed</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 font-mono font-bold text-amber-300">
                        {item.guess}
                      </span>
                    </div>
                    <span className="font-bold">{item.hint}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. MICRO REFLEX TAP RACE (Rank Ratings & Milliseconds)    */}
          {/* ========================================================= */}
          {activeTab === 'tap_race' && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-slate-300">
                Click Start. Wait for the light gate to turn <strong className="text-emerald-400">GREEN</strong>, then tap as fast as humanly possible!
              </p>

              <div 
                onClick={handleTap}
                className={`w-full h-48 rounded-3xl border-2 flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-150 ${
                  tapState === 'idle' 
                    ? 'bg-slate-900 border-slate-700 text-slate-400' :
                  tapState === 'waiting'
                    ? 'bg-rose-950/90 border-rose-500 text-rose-300 animate-pulse' :
                  tapState === 'ready'
                    ? 'bg-emerald-500 border-emerald-300 text-slate-950 font-black scale-102' :
                  'bg-fuchsia-950/90 border-fuchsia-500 text-fuchsia-200'
                }`}
              >
                {tapState === 'idle' && (
                  <div className="space-y-2">
                    <Timer className="w-10 h-10 mx-auto text-pink-400" />
                    <span className="text-sm font-bold text-white block">Click "Start Race" Below</span>
                  </div>
                )}
                {tapState === 'waiting' && (
                  <div className="space-y-1">
                    <span className="text-xl font-black block">WAIT FOR GREEN...</span>
                    <span className="text-xs text-rose-400">(Don't click yet!)</span>
                  </div>
                )}
                {tapState === 'ready' && (
                  <span className="text-4xl font-black tracking-widest text-slate-950">TAP NOW! ⚡</span>
                )}
                {tapState === 'finished' && (
                  <div className="space-y-1.5">
                    <span className="text-4xl font-extrabold text-white font-mono">{reactionTime} ms</span>
                    <span className={`text-sm font-black block ${getReflexRating(reactionTime).color}`}>
                      {getReflexRating(reactionTime).title}
                    </span>
                  </div>
                )}
              </div>

              {tapState === 'idle' || tapState === 'finished' ? (
                <button
                  onClick={startTapRace}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-transform"
                >
                  {tapState === 'finished' ? 'Test Again' : 'Start Race'}
                </button>
              ) : null}
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. COLLABORATIVE CANVAS & DOODLE DUEL                    */}
          {/* ========================================================= */}
          {(activeTab === 'shared_canvas' || activeTab === 'doodle_duel') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Both draw together on same synchronized board.</span>
                <button
                  onClick={() => setDoodleTimerActive(!doodleTimerActive)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 ${doodleTimerActive ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-slate-800 text-slate-400'}`}
                >
                  <Timer className="w-3.5 h-3.5" /> 60s Timer: {doodleTimer}s
                </button>
              </div>

              {/* Canvas Board */}
              <div className="relative mx-auto rounded-2xl overflow-hidden border-2 border-slate-700 bg-[#0F172A] touch-none flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={560}
                  height={260}
                  onMouseDown={startCanvas}
                  onMouseMove={drawCanvas}
                  onMouseUp={stopCanvas}
                  onMouseLeave={stopCanvas}
                  onTouchStart={startCanvas}
                  onTouchMove={drawCanvas}
                  onTouchEnd={stopCanvas}
                  className="cursor-crosshair w-full h-[240px] sm:h-[260px]"
                />
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-1.5">
                  {['#FF4D6D', '#F59E0B', '#10B981', '#38BDF8', '#A855F7', '#FFFFFF'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${color === c ? 'scale-125 border-white' : 'border-transparent'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const cvs = canvasRef.current;
                      if (cvs) {
                        const ctx = cvs.getContext('2d');
                        ctx.fillStyle = '#0F172A';
                        ctx.fillRect(0, 0, cvs.width, cvs.height);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                  >
                    Clear Board
                  </button>
                  <button
                    onClick={handleExportCanvas}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" /> Send to Chat
                  </button>
                </div>
              </div>

              {/* Guess Validation Bar */}
              <form onSubmit={handleDoodleGuess} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={guessInputDoodle}
                  onChange={(e) => setGuessInputDoodle(e.target.value)}
                  placeholder={`Guess what ${partner.name} is drawing...`}
                  className="flex-1 h-9 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
                <button
                  type="submit"
                  className="px-3 rounded-xl bg-pink-500 text-white font-bold text-xs"
                >
                  Guess
                </button>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. TIME-TRIAL PERSONA GUESS (Speed Akinator)              */}
          {/* ========================================================= */}
          {activeTab === 'akinator' && (
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">AI Referee Interrogation</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Deduce the secret pop-culture icon before time expires!</p>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold">
                  ⏱️ {personaTimer}s Left
                </div>
              </div>

              {personaWon ? (
                <div className="p-5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-2">
                  <Trophy className="w-8 h-8 mx-auto text-amber-400" />
                  <h3 className="text-base font-bold text-white">Correct! You Deduce: Miles Morales!</h3>
                  <p className="text-xs text-emerald-300">Chemistry score +15 points! Banter unlocked.</p>
                </div>
              ) : (
                <>
                  {/* Preset Quick Questions */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block">Quick Category Questions:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {presetQuestions.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => askPersona(q)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Buzz-In Deduction Box */}
                  <form onSubmit={handleBuzzIn} className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={buzzInGuess}
                      onChange={(e) => setBuzzInGuess(e.target.value)}
                      placeholder="Know the character? Buzz in to solve!"
                      className="flex-1 h-10 px-3 rounded-xl bg-slate-900 border border-pink-500/50 text-xs text-white font-bold"
                    />
                    <button
                      type="submit"
                      className="px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs"
                    >
                      ⚡ Buzz In!
                    </button>
                  </form>

                  {/* Log */}
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {qaLog.map((item, i) => (
                      <div key={i} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
                        <span className="text-slate-300">Q: {item.question}</span>
                        <span className="font-black px-2 py-0.5 rounded-md bg-slate-800 text-amber-300">{item.answer}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. SPIN THE BOTTLE (360 Physics & Mutual Dilemmas)        */}
          {/* ========================================================= */}
          {activeTab === 'spin_bottle' && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-slate-300">
                Spin the interactive bottle to serve personalized dilemmas based on your & {partner.name}'s profile tags!
              </p>

              {/* Interactive Spinning Bottle Graphics */}
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-pink-500/30 animate-[spin_20s_linear_infinite]" />
                <div 
                  onClick={spinBottle}
                  className="w-16 h-36 cursor-pointer select-none transition-transform duration-[2400ms] ease-out flex items-center justify-center"
                  style={{ transform: `rotate(${bottleRotation}deg)` }}
                >
                  {/* SVG Bottle */}
                  <svg viewBox="0 0 40 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                    <rect x="15" y="5" width="10" height="20" rx="3" fill="#EC4899" />
                    <rect x="13" y="2" width="14" height="5" rx="2" fill="#F43F5E" />
                    <path d="M 15 25 C 8 35, 6 45, 6 60 L 6 90 C 6 95, 34 95, 34 90 L 34 60 C 34 45, 32 35, 25 25 Z" fill="#F43F5E" />
                    <circle cx="20" cy="65" r="7" fill="#FDE047" />
                  </svg>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-pink-500/30 text-left space-y-1">
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block">Generated Dilemma:</span>
                <p className="text-xs sm:text-sm text-white font-medium leading-relaxed italic">
                  "{currentDilemma}"
                </p>
              </div>

              <button
                type="button"
                onClick={spinBottle}
                disabled={isSpinning}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
              >
                <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>{isSpinning ? 'Spinning...' : 'Spin Bottle Again 🍾'}</span>
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. 20 QUESTIONS AI TERMINAL                               */}
          {/* ========================================================= */}
          {activeTab === 'twenty_q' && (
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">20 Questions AI Game Master</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Collaborate to isolate the hidden target in under 20 questions.</p>
                </div>
                <div className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                  {twentyQuestionsLeft} Qs Remaining
                </div>
              </div>

              <form onSubmit={submitTwentyQ} className="flex gap-2">
                <input
                  type="text"
                  value={twentyInput}
                  onChange={(e) => setTwentyInput(e.target.value)}
                  placeholder="Ask a question (Yes/No/Warm/Cold)..."
                  className="flex-1 h-10 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
                <button
                  type="submit"
                  disabled={!twentyInput.trim()}
                  className="px-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Ask AI
                </button>
              </form>

              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {twentyLog.map((log, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
                    <span className="text-slate-200">Q: {log.q}</span>
                    <span className="font-bold px-2 py-0.5 rounded-md bg-slate-800 text-emerald-400">{log.a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 7. WHO'S THE IMPOSTER? (AI Edition)                       */}
          {/* ========================================================= */}
          {activeTab === 'imposter' && (
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block">Quirky Scenario:</span>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-1">"{imposterPrompt}"</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Two answers were written by humans; one was generated by an AI bot. Vote out the bot!
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {imposterAnswers.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => !imposterVoted && voteCard(card)}
                    className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                      imposterVoted 
                        ? (card.isAI ? 'bg-rose-500/20 border-rose-500' : 'bg-slate-900/60 border-slate-800')
                        : 'bg-[#131B2E] border-slate-700/80 hover:border-pink-500 hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-xs font-bold text-white">{card.author}</span>
                      {imposterVoted && (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${card.isAI ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-slate-950'}`}>
                          {card.isAI ? '🤖 THE IMPOSTER' : '👤 HUMAN'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic">"{card.text}"</p>
                  </div>
                ))}
              </div>

              {imposterResult && (
                <div className="p-3 rounded-xl bg-slate-900 border border-pink-500/40 text-xs font-bold text-pink-300 text-center animate-fade">
                  {imposterResult}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
