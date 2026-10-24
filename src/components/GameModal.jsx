import React, { useState, useRef, useEffect } from 'react';
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
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GameModal({ 
  game, 
  partner, 
  onClose, 
  onExportToChat 
}) {
  const [activeTab, setActiveTab] = useState(game.type || 'number_duel');

  // ==========================================
  // GAME 1: NUMBER DUEL (1 to 100)
  // ==========================================
  const [targetNumber, setTargetNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guessInput, setGuessInput] = useState('');
  const [currentTurn, setCurrentTurn] = useState('user'); // 'user' | 'partner'
  const [guessHistory, setGuessHistory] = useState([]);
  const [duelGameOver, setDuelGameOver] = useState(false);
  const [duelWinner, setDuelWinner] = useState(null);

  const handleGuessSubmit = (e) => {
    e?.preventDefault();
    const num = parseInt(guessInput, 10);
    if (isNaN(num) || num < 1 || num > 100 || duelGameOver) return;

    let hint = '';
    if (num === targetNumber) {
      hint = 'EXACT MATCH! 🎯';
      setDuelGameOver(true);
      setDuelWinner(currentTurn === 'user' ? 'You' : partner.name);
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } else if (num < targetNumber) {
      hint = 'HIGHER ⬆️';
    } else {
      hint = 'LOWER ⬇️';
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
      // Toggle to partner turn simulation after brief delay if user guessed
      if (currentTurn === 'user') {
        setCurrentTurn('partner');
        setTimeout(() => {
          simulatePartnerGuess(num, targetNumber);
        }, 1200);
      }
    }
  };

  const simulatePartnerGuess = (lastUserGuess, target) => {
    // Smart AI simulation for partner
    let partnerGuess;
    if (lastUserGuess < target) {
      partnerGuess = Math.min(100, lastUserGuess + Math.floor(Math.random() * 15) + 1);
    } else {
      partnerGuess = Math.max(1, lastUserGuess - Math.floor(Math.random() * 15) - 1);
    }

    let hint = partnerGuess === target ? 'EXACT MATCH! 🎯' : (partnerGuess < target ? 'HIGHER ⬆️' : 'LOWER ⬇️');
    
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
  };

  // ==========================================
  // GAME 2: SHARED FREEFORM CANVAS
  // ==========================================
  const canvasRef = useRef(null);
  const [canvasDrawing, setCanvasDrawing] = useState(false);
  const [color, setColor] = useState('#FF4D6D');
  const [size, setSize] = useState(5);

  useEffect(() => {
    if (activeTab === 'shared_canvas') {
      const timer = setTimeout(() => {
        const cvs = canvasRef.current;
        if (cvs) {
          const ctx = cvs.getContext('2d');
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(0, 0, cvs.width, cvs.height);

          // Simulated cooperative initial stroke from partner
          ctx.strokeStyle = '#38BDF8';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(cvs.width / 2, cvs.height / 2, 40, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = '#94A3B8';
          ctx.font = '12px system-ui';
          ctx.fillText(`${partner.name}'s circle • Draw together!`, cvs.width / 2 - 70, cvs.height / 2 + 65);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

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

    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    onClose();
  };

  // ==========================================
  // GAME 3: SPEED AKINATOR / PERSONA GUESS
  // ==========================================
  const [secretPersona] = useState({ name: 'Miles Morales (Spider-Man)', hint: 'Superhero from Brooklyn' });
  const [qaLog, setQaLog] = useState([
    { question: 'Is this character a musician?', answer: 'No' },
    { question: 'Do they have superpowers?', answer: 'Yes' },
    { question: 'Are they based in NYC?', answer: 'Yes' },
  ]);
  const [questionInput, setQuestionInput] = useState('');

  const askPersonaQuestion = (e) => {
    e?.preventDefault();
    if (!questionInput.trim()) return;

    const q = questionInput.trim();
    setQuestionInput('');

    // Simulated AI Referee response
    setTimeout(() => {
      const answers = ['Yes', 'No', 'Irrelevant', 'Warm', 'Extremely relevant'];
      const ans = answers[Math.floor(Math.random() * answers.length)];
      setQaLog(prev => [{ question: q, answer: ans }, ...prev]);
    }, 600);
  };

  // ==========================================
  // GAME 4: MICRO REFLEX TAP RACE
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
      alert('Too early! Wait for the screen to turn GREEN.');
    } else if (tapState === 'ready') {
      const diff = Date.now() - startTimeRef.current;
      setReactionTime(diff);
      setTapState('finished');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade">
      <div className="max-w-2xl w-full bg-cardBg border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-[#0F172A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Live Mini-Game Arena
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
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

        {/* Game Mode Selector Tabs */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border-b border-slate-800/80 overflow-x-auto">
          <button
            onClick={() => setActiveTab('number_duel')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'number_duel'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            🔢 Number Duel (1-100)
          </button>
          <button
            onClick={() => setActiveTab('shared_canvas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'shared_canvas'
                ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            🖌️ Shared Canvas
          </button>
          <button
            onClick={() => setActiveTab('akinator')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'akinator'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            ⚡ Persona Guess
          </button>
          <button
            onClick={() => setActiveTab('tap_race')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'tap_race'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            ⏱️ Reflex Tap Race
          </button>
        </div>

        {/* Modal Body / Active Game View */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* ========================================================= */}
          {/* 1. NUMBER DUEL (1-100 turn-based deduction with history log) */}
          {/* ========================================================= */}
          {activeTab === 'number_duel' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Target Number: 1 to 100</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Take alternating turns guessing. Real-time Higher / Lower clues!
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-mono">Current Turn:</span>
                  <span className={`text-sm font-bold ${currentTurn === 'user' ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {currentTurn === 'user' ? '👉 Your Turn' : `⏳ ${partner.name}'s Turn...`}
                  </span>
                </div>
              </div>

              {duelGameOver ? (
                <div className="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-2">
                  <Trophy className="w-10 h-10 mx-auto text-amber-400 animate-bounce" />
                  <h3 className="text-lg font-bold text-white">{duelWinner} Won the Duel!</h3>
                  <p className="text-xs text-emerald-300">Target was {targetNumber} in {guessHistory.length} combined turns.</p>
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
                    min="1"
                    max="100"
                    disabled={currentTurn !== 'user'}
                    value={guessInput}
                    onChange={(e) => setGuessInput(e.target.value)}
                    placeholder={currentTurn === 'user' ? "Enter your guess (1-100)..." : `${partner.name} is calculating...`}
                    className="flex-1 h-11 px-4 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={currentTurn !== 'user' || !guessInput}
                    className="px-5 h-11 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all"
                  >
                    Guess
                  </button>
                </form>
              )}

              {/* Guess History Log */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Move History ({guessHistory.length})
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {guessHistory.length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2 text-center">No guesses yet. First move is yours!</p>
                  ) : (
                    guessHistory.map((item, idx) => (
                      <div 
                        key={idx}
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                          item.isCorrect 
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-bold' 
                            : 'bg-slate-900/80 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{item.player}</span>
                          <span>guessed</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 font-mono font-bold text-amber-300">
                            {item.guess}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{item.hint}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. SHARED FREEFORM CANVAS (tools, color, export to chat)  */}
          {/* ========================================================= */}
          {activeTab === 'shared_canvas' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Both players draw on the same interactive HTML5 canvas.</span>
                <span className="text-emerald-400 font-semibold">Live Stroke Sync</span>
              </div>

              {/* Canvas Area */}
              <div className="relative mx-auto rounded-2xl overflow-hidden border-2 border-slate-700 bg-[#0F172A] touch-none flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={560}
                  height={320}
                  onMouseDown={startCanvas}
                  onMouseMove={drawCanvas}
                  onMouseUp={stopCanvas}
                  onMouseLeave={stopCanvas}
                  onTouchStart={startCanvas}
                  onTouchMove={drawCanvas}
                  onTouchEnd={stopCanvas}
                  className="cursor-crosshair w-full h-[280px] sm:h-[320px]"
                />
              </div>

              {/* Canvas Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                {/* Palette */}
                <div className="flex items-center gap-1.5">
                  {['#FF4D6D', '#F59E0B', '#10B981', '#38BDF8', '#A855F7', '#FFFFFF'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${color === c ? 'scale-125 border-white' : 'border-transparent'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>

                {/* Brush size */}
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span>Size:</span>
                  <input
                    type="range"
                    min="2"
                    max="18"
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value, 10))}
                    className="w-20 accent-rose-500"
                  />
                </div>

                {/* Actions */}
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
                    <Send className="w-3.5 h-3.5" /> Export to Chat
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. TIME-TRIAL PERSONA GUESS (Akinator mode)              */}
          {/* ========================================================= */}
          {activeTab === 'akinator' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block">AI Referee Mystery Target</span>
                <h4 className="text-sm font-bold text-white mt-1">Interrogate the AI Referee to deduce the pop-culture icon!</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Ask questions that can be answered with Yes / No / Irrelevant.
                </p>
              </div>

              <form onSubmit={askPersonaQuestion} className="flex gap-2">
                <input
                  type="text"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  placeholder="e.g. Is this character fictional? Are they in an anime?"
                  className="flex-1 h-11 px-4 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-teal-400"
                />
                <button
                  type="submit"
                  disabled={!questionInput.trim()}
                  className="px-4 h-11 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 transition-transform"
                >
                  Ask AI
                </button>
              </form>

              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Interrogation Log</span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {qaLog.map((log, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
                      <span className="text-slate-200">Q: {log.question}</span>
                      <span className={`font-bold px-2 py-0.5 rounded-md ${
                        log.answer === 'Yes' ? 'bg-emerald-500/20 text-emerald-400' :
                        log.answer === 'No' ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {log.answer}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. MICRO REFLEX TAP RACE                                  */}
          {/* ========================================================= */}
          {activeTab === 'tap_race' && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-slate-300">
                Click Start. Wait for the light gate to turn <span className="text-emerald-400 font-bold">GREEN</span>, then click as fast as humanly possible!
              </p>

              <div 
                onClick={handleTap}
                className={`w-full h-48 rounded-3xl border-2 flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-150 ${
                  tapState === 'idle' 
                    ? 'bg-slate-900 border-slate-700 text-slate-400' :
                  tapState === 'waiting'
                    ? 'bg-rose-950/80 border-rose-500/80 text-rose-300 animate-pulse' :
                  tapState === 'ready'
                    ? 'bg-emerald-500 border-emerald-300 text-slate-950 font-black scale-102' :
                  'bg-indigo-950 border-indigo-500 text-indigo-300'
                }`}
              >
                {tapState === 'idle' && (
                  <div className="space-y-2">
                    <Zap className="w-10 h-10 mx-auto text-amber-400" />
                    <span className="text-sm font-bold block text-white">Click "Start Race" Below</span>
                  </div>
                )}
                {tapState === 'waiting' && (
                  <div className="space-y-1">
                    <span className="text-lg font-bold block">WAIT FOR GREEN...</span>
                    <span className="text-xs text-rose-400">(Don't click yet!)</span>
                  </div>
                )}
                {tapState === 'ready' && (
                  <span className="text-3xl font-black tracking-widest">TAP NOW! ⚡</span>
                )}
                {tapState === 'finished' && (
                  <div className="space-y-1">
                    <span className="text-3xl font-extrabold text-white font-mono">{reactionTime} ms</span>
                    <span className="text-xs text-emerald-400 block font-semibold">Incredible reflexes!</span>
                  </div>
                )}
              </div>

              {tapState === 'idle' || tapState === 'finished' ? (
                <button
                  onClick={startTapRace}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-transform"
                >
                  {tapState === 'finished' ? 'Try Again' : 'Start Race'}
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
