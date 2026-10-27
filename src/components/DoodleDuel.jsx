import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  RotateCcw, 
  Send, 
  Sparkles, 
  Trophy, 
  Undo2, 
  Trash2, 
  Share2, 
  X,
  Palette,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

const SECRET_WORDS_POOL = [
  { word: "Cat with sunglasses", hints: ["Animal with shades", "Cool feline", "4 legs + dark glasses"] },
  { word: "Electric Guitar", hints: ["Musical instrument", "Rock and roll", "Strings and amplifier"] },
  { word: "Cyberpunk Ramen", hints: ["Neon noodles", "Futuristic soup", "Steaming bowl with chopsticks"] },
  { word: "Neon Pizza", hints: ["Glowing slice", "Melted cheese", "Italian fast food"] },
  { word: "Astronaut Dinosaur", hints: ["T-Rex in space", "Extinct creature in helmet", "Zero gravity reptile"] },
  { word: "Cupcake Castle", hints: ["Sweet dessert tower", "Frosting and sprinkle kingdom", "Bakery architecture"] },
  { word: "Flying Skateboard", hints: ["Hoverboard", "Deck with anti-gravity thrusters", "Skate in the sky"] },
  { word: "Disco Octopus", hints: ["8 tentacles on the dance floor", "Sea creature with mirror ball", "Underwater groove"] }
];

const HIGH_CONTRAST_COLORS = [
  '#FFFFFF', '#000000', '#FF3366', '#F59E0B', 
  '#10B981', '#06B6D4', '#3B82F6', '#8B5CF6', 
  '#EC4899', '#84CC16', '#F97316', '#E2E8F0'
];

const BRUSH_SIZES = [
  { label: 'Fine', size: 2 },
  { label: 'Regular', size: 6 },
  { label: 'Chunky', size: 14 },
  { label: 'Marker', size: 28 }
];

export default function DoodleDuel({ 
  partner, 
  onClose, 
  onExportToChat 
}) {
  const partnerName = partner?.name || 'Partner';
  
  // Game Flow States: 'lobby' | 'round1' | 'transition' | 'round2' | 'finished'
  const [gameState, setGameState] = useState('round1');
  const [roundNumber, setRoundNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerRunning, setTimerRunning] = useState(true);

  // Scores
  const [scores, setScores] = useState({ user: 0, partner: 0 });

  // Word selection
  const [round1WordObj, setRound1WordObj] = useState(() => SECRET_WORDS_POOL[0]);
  const [round2WordObj, setRound2WordObj] = useState(() => SECRET_WORDS_POOL[1]);

  // Current Guess Feed
  const [chatGuesses, setChatGuesses] = useState([]);
  const [userGuessInput, setUserGuessInput] = useState('');
  const [roundWinner, setRoundWinner] = useState(null);

  // Canvas Drawing Refs and States
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeColor, setActiveColor] = useState('#FF3366');
  const [activeBrushSize, setActiveBrushSize] = useState(6);
  const [activeTool, setActiveTool] = useState('pen'); // 'pen' | 'highlighter' | 'eraser'
  const [historyStack, setHistoryStack] = useState([]);
  const lastPointRef = useRef(null);

  // Track if round was correctly solved
  const [roundSolved, setRoundSolved] = useState(false);

  // Partner auto-drawing simulation in Round 2
  const partnerDrawingStepRef = useRef(0);
  const partnerIntervalRef = useRef(null);

  // -------------------------------------------------------------
  // Canvas Coordinate Translation & Drawing Handlers
  // -------------------------------------------------------------
  const getCoordinates = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
    
    // Scale correction: scale factor between internal bitmap and CSS display bounding rect
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }, []);

  const saveCanvasState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL();
      setHistoryStack(prev => [...prev.slice(-15), dataUrl]);
    } catch {
      // ignore
    }
  }, []);

  const handleUndo = () => {
    if (historyStack.length <= 1) {
      handleClearCanvas();
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const newStack = [...historyStack];
    newStack.pop(); // pop current
    const previous = newStack[newStack.length - 1];
    setHistoryStack(newStack);

    if (previous) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = previous;
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveCanvasState();
  };

  const startDrawing = (e) => {
    if (roundNumber === 2 || roundSolved || timeLeft <= 0) return; // In round 2, partner draws
    const coords = getCoordinates(e);
    if (!coords) return;
    setIsDrawing(true);
    lastPointRef.current = coords;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, activeBrushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = activeTool === 'eraser' ? '#0B0F19' : activeColor;
    ctx.fill();
  };

  const drawMove = (e) => {
    if (!isDrawing || roundNumber === 2 || roundSolved || timeLeft <= 0) return;
    const coords = getCoordinates(e);
    if (!coords || !lastPointRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = activeBrushSize;

    if (activeTool === 'eraser') {
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = '#0B0F19';
    } else if (activeTool === 'highlighter') {
      ctx.globalAlpha = 0.4;
      ctx.strokeStyle = activeColor;
    } else {
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = activeColor;
    }

    ctx.stroke();
    ctx.globalAlpha = 1.0;
    lastPointRef.current = coords;
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    lastPointRef.current = null;
    saveCanvasState();
  };

  // -------------------------------------------------------------
  // Round 1 Setup & Partner Guesses Simulation
  // -------------------------------------------------------------
  const initRound1 = useCallback(() => {
    setRoundNumber(1);
    setGameState('round1');
    setTimeLeft(60);
    setTimerRunning(true);
    setRoundSolved(false);
    setRoundWinner(null);
    setChatGuesses([
      { sender: 'System', text: `Round 1: You are drawing! Secret word: "${round1WordObj.word}". Keep it visual!`, isSystem: true }
    ]);
    setTimeout(() => handleClearCanvas(), 50);
  }, [round1WordObj]);

  // Round 2 Setup & Partner Drawing Procedural Simulation
  const initRound2 = useCallback(() => {
    setRoundNumber(2);
    setGameState('round2');
    setTimeLeft(60);
    setTimerRunning(true);
    setRoundSolved(false);
    setRoundWinner(null);
    setChatGuesses([
      { sender: 'System', text: `Round 2: ${partnerName} is drawing! Watch the canvas & type your guess fast.`, isSystem: true }
    ]);
    setTimeout(() => handleClearCanvas(), 50);
  }, [partnerName]);

  // Handle Turn Timer
  useEffect(() => {
    if (!timerRunning || timeLeft <= 0 || roundSolved || gameState === 'finished') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerRunning, timeLeft, roundSolved, gameState]);

  // Simulated partner guesses in Round 1
  useEffect(() => {
    if (gameState !== 'round1' || roundSolved || timeLeft <= 0) return;

    // Simulate partner guessing at progressive intervals
    const partnerGuessInterval = setInterval(() => {
      if (roundSolved || timeLeft <= 10) return;

      const randomHints = [
        "is it a cat?",
        "looks like some animal?",
        "wait are those sunglasses?!",
        "sunglasses cat?",
        "cat with sunglasses!"
      ];

      // As time ticks down, partner gets closer
      let simulatedGuess = "cool sketch!";
      if (timeLeft < 45 && timeLeft > 30) {
        simulatedGuess = "is it an animal?";
      } else if (timeLeft <= 30 && timeLeft > 18) {
        simulatedGuess = "cat with sunglasses?!";
      } else if (timeLeft <= 18) {
        simulatedGuess = round1WordObj.word.toLowerCase();
      }

      setChatGuesses(prev => [
        ...prev,
        {
          sender: partnerName,
          text: simulatedGuess,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      // Check if partner hit the word
      if (simulatedGuess.toLowerCase() === round1WordObj.word.toLowerCase()) {
        handleCorrectGuess(partnerName, round1WordObj.word);
      }
    }, 9000);

    return () => clearInterval(partnerGuessInterval);
  }, [gameState, roundSolved, timeLeft, partnerName, round1WordObj]);

  // Procedural Simulated Drawing in Round 2 (Partner drawing "Electric Guitar")
  useEffect(() => {
    if (gameState !== 'round2' || roundSolved || timeLeft <= 0) {
      if (partnerIntervalRef.current) clearInterval(partnerIntervalRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    partnerDrawingStepRef.current = 0;

    // Key points to draw an electric guitar
    const drawingPoints = [
      // Body
      { x: 300, y: 220, color: '#FF3366', size: 8, move: true },
      { x: 260, y: 260, color: '#FF3366', size: 8 },
      { x: 280, y: 320, color: '#FF3366', size: 8 },
      { x: 350, y: 330, color: '#FF3366', size: 8 },
      { x: 390, y: 290, color: '#FF3366', size: 8 },
      { x: 380, y: 230, color: '#FF3366', size: 8 },
      { x: 330, y: 210, color: '#FF3366', size: 8 },
      { x: 300, y: 220, color: '#FF3366', size: 8 },
      // Cutaway Horn
      { x: 260, y: 200, color: '#F59E0B', size: 6, move: true },
      { x: 240, y: 160, color: '#F59E0B', size: 6 },
      { x: 270, y: 190, color: '#F59E0B', size: 6 },
      // Neck
      { x: 340, y: 210, color: '#E2E8F0', size: 6, move: true },
      { x: 440, y: 120, color: '#E2E8F0', size: 6 },
      { x: 460, y: 100, color: '#06B6D4', size: 8 }, // Headstock
      { x: 480, y: 90, color: '#06B6D4', size: 8 },
      // Strings
      { x: 320, y: 260, color: '#FFFFFF', size: 2, move: true },
      { x: 450, y: 105, color: '#FFFFFF', size: 2 },
      { x: 325, y: 265, color: '#FFFFFF', size: 2, move: true },
      { x: 455, y: 110, color: '#FFFFFF', size: 2 },
      // Pickups & Knobs
      { x: 330, y: 250, color: '#10B981', size: 6, move: true },
      { x: 340, y: 260, color: '#10B981', size: 6 },
      // Music Notes
      { x: 220, y: 110, color: '#F59E0B', size: 4, move: true },
      { x: 225, y: 90, color: '#F59E0B', size: 4 },
      { x: 240, y: 85, color: '#F59E0B', size: 4 },
      { x: 500, y: 150, color: '#EC4899', size: 4, move: true },
      { x: 510, y: 130, color: '#EC4899', size: 4 }
    ];

    partnerIntervalRef.current = setInterval(() => {
      const idx = partnerDrawingStepRef.current;
      if (idx >= drawingPoints.length) {
        clearInterval(partnerIntervalRef.current);
        return;
      }

      const pt = drawingPoints[idx];
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = pt.size;
      ctx.strokeStyle = pt.color;

      if (pt.move || idx === 0) {
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
      } else {
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
      }

      partnerDrawingStepRef.current += 1;
    }, 180);

    return () => {
      if (partnerIntervalRef.current) clearInterval(partnerIntervalRef.current);
    };
  }, [gameState, roundSolved, timeLeft]);

  // Correct Guess Handler
  const handleCorrectGuess = (guesser, word) => {
    setRoundSolved(true);
    setTimerRunning(false);
    setRoundWinner(guesser);

    // Points calculation: Remaining seconds * 15 + 100 base
    const awarded = Math.max(100, (timeLeft * 15) + 100);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    if (guesser === 'You') {
      setScores(prev => ({ ...prev, user: prev.user + awarded }));
    } else {
      setScores(prev => ({ ...prev, partner: prev.partner + awarded }));
    }

    setChatGuesses(prev => [
      ...prev,
      {
        sender: 'System',
        text: `🎯 BINGO! ${guesser} guessed "${word}" correctly! (+${awarded} pts)`,
        isBingo: true
      }
    ]);

    // Advance to next round or finish
    setTimeout(() => {
      if (roundNumber === 1) {
        setGameState('transition');
      } else {
        setGameState('finished');
      }
    }, 2800);
  };

  const handleTimeExpired = () => {
    setTimerRunning(false);
    setChatGuesses(prev => [
      ...prev,
      {
        sender: 'System',
        text: `⏰ TIME'S UP! The word was "${roundNumber === 1 ? round1WordObj.word : round2WordObj.word}".`,
        isSystem: true
      }
    ]);

    setTimeout(() => {
      if (roundNumber === 1) {
        setGameState('transition');
      } else {
        setGameState('finished');
      }
    }, 2500);
  };

  // User submits guess in chat box
  const handleUserGuessSubmit = (e) => {
    e?.preventDefault();
    if (!userGuessInput.trim() || roundSolved || timeLeft <= 0) return;

    const guess = userGuessInput.trim();
    setUserGuessInput('');

    setChatGuesses(prev => [
      ...prev,
      {
        sender: 'You',
        text: guess,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    // Validation (Case-insensitive)
    const targetWord = (roundNumber === 1 ? round1WordObj.word : round2WordObj.word).toLowerCase();
    const cleanGuess = guess.toLowerCase();

    if (cleanGuess === targetWord || cleanGuess.includes(targetWord) || targetWord.includes(cleanGuess) && cleanGuess.length > 5) {
      handleCorrectGuess('You', roundNumber === 1 ? round1WordObj.word : round2WordObj.word);
    }
  };

  const handleExportDrawing = () => {
    const cvs = canvasRef.current;
    if (!cvs || !onExportToChat) return;
    onExportToChat({
      type: 'sticker',
      stickerUrl: cvs.toDataURL(),
      caption: `🎨 Doodle Duel Sketch: "${roundNumber === 1 ? round1WordObj.word : round2WordObj.word}"`
    });
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    alert("Artwork exported as a sticker into your chat thread!");
  };

  const handleExportBanterMeme = (isWinner) => {
    if (!onExportToChat) return;
    if (isWinner) {
      onExportToChat({
        type: 'meme',
        memeUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
        title: 'YOU WON... BUT AT WHAT COST?',
        caption: `Legend says winning ${scores.user} to ${scores.partner} on a dating app leads to being left on read forever...`
      });
    } else {
      onExportToChat({
        type: 'meme',
        memeUrl: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=600&q=80',
        title: "PERSONALLY, I WOULDN'T TAKE THAT LEVEL OF DISRESPECT.",
        caption: `Demanding a rematch to salvage dignity after that Doodle Duel showdown!`
      });
    }
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    alert("Banter meme dispatched to your chat thread!");
  };

  const handleRestartGame = () => {
    setScores({ user: 0, partner: 0 });
    const rand1 = SECRET_WORDS_POOL[Math.floor(Math.random() * SECRET_WORDS_POOL.length)];
    let rand2 = SECRET_WORDS_POOL[Math.floor(Math.random() * SECRET_WORDS_POOL.length)];
    while (rand2.word === rand1.word) {
      rand2 = SECRET_WORDS_POOL[Math.floor(Math.random() * SECRET_WORDS_POOL.length)];
    }
    setRound1WordObj(rand1);
    setRound2WordObj(rand2);
    initRound1();
  };

  const isUserWinner = scores.user >= scores.partner;

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto space-y-4">
      {/* ------------------------------------------------------------- */}
      {/* Top Game Bar: Round Indicator, Timers, Scores                */}
      {/* ------------------------------------------------------------- */}
      <div className="p-4 rounded-3xl bg-slate-900/90 border border-white/10 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-xl shadow-md">
            🎨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-white">Doodle Duel (Skribbl.io)</h3>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Round {roundNumber} of 2
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {roundNumber === 1 
                ? `You are drawing! ${partnerName} is guessing in live chat.` 
                : `${partnerName} is drawing! Watch carefully and type your guess.`}
            </p>
          </div>
        </div>

        {/* 60s Ticking Timer Bar */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-950 border border-white/10">
            <Clock className={`w-4 h-4 ${timeLeft <= 10 ? 'text-rose-500 animate-spin' : 'text-amber-400'}`} />
            <span className={`text-base font-black font-mono ${timeLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
              0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </span>
          </div>

          {/* Scores Display */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono">
            <span className="font-bold text-amber-300">You: {scores.user}</span>
            <span className="text-slate-500">|</span>
            <span className="font-bold text-rose-300">{partnerName}: {scores.partner}</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Secret Word Prompt Banner for Drawer (Round 1)               */}
      {/* ------------------------------------------------------------- */}
      {roundNumber === 1 && gameState === 'round1' && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border border-amber-400/30 flex items-center justify-between text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs text-slate-300">Your Secret Prompt:</span>
            <span className="text-sm font-black text-amber-300 tracking-wide">
              "{round1WordObj.word}"
            </span>
          </div>
          <span className="text-[10px] text-slate-400 hidden sm:inline">
            💡 Draw details! Don't write letters or numbers.
          </span>
        </div>
      )}

      {/* Secret Word Hidden for Guesser (Round 2) */}
      {roundNumber === 2 && gameState === 'round2' && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-500/15 to-rose-500/15 border border-purple-400/30 flex items-center justify-between text-left">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="text-xs text-slate-300">{partnerName}'s Secret Prompt:</span>
            <span className="text-sm font-black text-purple-300 font-mono tracking-widest">
              {round2WordObj.word.split('').map(char => char === ' ' ? '  ' : '_ ').join('')}
            </span>
            <span className="text-[10px] text-slate-400">({round2WordObj.word.length} letters)</span>
          </div>
          <span className="text-[10px] text-amber-400 font-bold hidden sm:inline">
            Hint: {round2WordObj.hints[0]}
          </span>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Main Play Area: Canvas (Left/Top) + Fast Chat (Right/Bottom)  */}
      {/* ------------------------------------------------------------- */}
      {gameState !== 'finished' && gameState !== 'transition' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
          {/* Canvas Studio Container (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col space-y-2">
            {/* Toolbar (Only active when User draws in Round 1) */}
            {roundNumber === 1 && (
              <div className="p-2.5 rounded-2xl bg-slate-900 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                {/* Tools */}
                <div className="flex items-center gap-1">
                  {[
                    { id: 'pen', label: '🖊️ Pen' },
                    { id: 'highlighter', label: '🖍️ Highlight (0.4)' },
                    { id: 'eraser', label: '🧹 Eraser' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTool(t.id)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                        activeTool === t.id
                          ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                          : 'bg-white/5 text-slate-300 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Brush Sizes */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400">Brush:</span>
                  {BRUSH_SIZES.map(b => (
                    <button
                      key={b.size}
                      onClick={() => setActiveBrushSize(b.size)}
                      className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        activeBrushSize === b.size
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {b.size}px
                    </button>
                  ))}
                </div>

                {/* Action Buttons: Undo, Clear, Sticker */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleUndo}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                    title="Undo Stroke"
                  >
                    <Undo2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleClearCanvas}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-rose-300"
                    title="Clear Board"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleExportDrawing}
                    className="px-2.5 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1"
                  >
                    <Share2 className="w-3 h-3" /> Sticker
                  </button>
                </div>
              </div>
            )}

            {/* 12 High-Contrast Color Swatches (Round 1) */}
            {roundNumber === 1 && (
              <div className="p-2 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-between gap-1 overflow-x-auto">
                <span className="text-[10px] text-slate-400 font-bold px-1 shrink-0">Palette:</span>
                <div className="flex items-center gap-2">
                  {HIGH_CONTRAST_COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => {
                        setActiveColor(color);
                        if (activeTool === 'eraser') setActiveTool('pen');
                      }}
                      className={`w-6 h-6 rounded-full transition-all shrink-0 ${
                        activeColor === color && activeTool !== 'eraser'
                          ? 'ring-2 ring-white scale-125 shadow-lg'
                          : 'opacity-80 hover:opacity-100 hover:scale-110'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Canvas Surface with Native HTML5 Mouse & Touch Bindings */}
            <div className="relative flex-1 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-[#0B0F19] min-h-[340px]">
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                onMouseDown={startDrawing}
                onMouseMove={drawMove}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={drawMove}
                onTouchEnd={stopDrawing}
                onTouchCancel={stopDrawing}
                className={`w-full h-full touch-none select-none ${
                  roundNumber === 1 ? 'cursor-crosshair' : 'cursor-default pointer-events-none'
                }`}
              />

              {/* Status Overlay in Round 2 */}
              {roundNumber === 2 && (
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-bold text-amber-300 flex items-center gap-2 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>{partnerName} is drawing live...</span>
                </div>
              )}
            </div>
          </div>

          {/* Fast Chat Box for Guesses (1 Col) */}
          <div className="p-4 rounded-3xl bg-slate-900/90 border border-white/10 flex flex-col h-[400px] lg:h-auto shadow-xl text-left">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                💬 Fast Guess Chat
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">Live Validation</span>
            </div>

            {/* Chat Stream */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2 text-xs">
              {chatGuesses.map((g, idx) => (
                <div 
                  key={idx}
                  className={`p-2 rounded-xl text-xs ${
                    g.isBingo 
                      ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-black animate-bounce'
                      : g.isSystem
                      ? 'bg-amber-400/10 border border-amber-400/20 text-amber-300 italic'
                      : g.sender === 'You'
                      ? 'bg-rose-500/20 text-rose-200 ml-auto border border-rose-500/30'
                      : 'bg-white/5 text-slate-300 mr-auto border border-white/5'
                  } max-w-[90%]`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-75 font-bold mb-0.5">
                    <span>{g.sender}</span>
                    {g.time && <span className="font-mono">{g.time}</span>}
                  </div>
                  <p className="font-semibold">{g.text}</p>
                </div>
              ))}
            </div>

            {/* Guess Input Form */}
            <form onSubmit={handleUserGuessSubmit} className="pt-2 border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder={roundNumber === 2 ? "Type your guess fast! (e.g. Electric Guitar)" : "Chat or cheer opponent..."}
                value={userGuessInput}
                onChange={(e) => setUserGuessInput(e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 text-white font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Round 1 -> Round 2 Transition Screen                         */}
      {/* ------------------------------------------------------------- */}
      {gameState === 'transition' && (
        <div className="p-8 rounded-3xl bg-slate-900/95 border border-amber-400/30 text-center space-y-4 max-w-lg mx-auto shadow-2xl animate-fade">
          <Sparkles className="w-12 h-12 mx-auto text-amber-400 animate-spin" />
          <h3 className="text-xl font-black text-white">Round 1 Complete! Roles Reversing!</h3>
          <p className="text-xs text-slate-300">
            Now <strong>{partnerName}</strong> will draw a secret prompt, and YOU will guess in the chat box!
          </p>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono font-bold text-amber-300">
            Current Standings: You ({scores.user}) — {partnerName} ({scores.partner})
          </div>
          <button
            onClick={initRound2}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 text-white font-black text-xs shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Start Round 2 🎨
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Final Game Over & Banter Memes Screen                         */}
      {/* ------------------------------------------------------------- */}
      {gameState === 'finished' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-white/15 text-center space-y-6 max-w-xl mx-auto shadow-2xl animate-fade">
          {/* Trophy Header */}
          <div className="space-y-2">
            <Trophy className="w-14 h-14 mx-auto text-amber-400 animate-bounce" />
            <h2 className="text-2xl font-black text-white">
              {isUserWinner ? "VICTORY! You Won Doodle Duel!" : `${partnerName} Took The Trophy!`}
            </h2>
            <p className="text-xs text-slate-300">
              Final Points Tally: <strong>You ({scores.user})</strong> vs <strong>{partnerName} ({scores.partner})</strong>
            </p>
          </div>

          {/* Authentic Winner vs Loser Banter Meme Cards */}
          {isUserWinner ? (
            <div className="p-4 rounded-3xl bg-gradient-to-b from-purple-950/40 to-slate-950 border border-purple-500/40 text-left space-y-3 shadow-2xl">
              <div className="rounded-2xl overflow-hidden border border-purple-400/30">
                <img
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
                  alt="Thanos At What Cost"
                  className="w-full h-44 object-cover"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                  🏆 Winner's Contemplation Card
                </span>
                <h4 className="text-base font-black text-white">
                  "YOU WON... BUT AT WHAT COST?"
                </h4>
                <p className="text-xs text-purple-200/80 italic">
                  (Legend says winning on a dating app leads to being left on read forever...)
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-3xl bg-gradient-to-b from-rose-950/40 to-slate-950 border border-rose-500/40 text-left space-y-3 shadow-2xl">
              <div className="rounded-2xl overflow-hidden border border-rose-400/30">
                <img
                  src="https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=600&q=80"
                  alt="Side Eye Disrespect"
                  className="w-full h-44 object-cover"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">
                  👀 Loser's Banter Card
                </span>
                <h4 className="text-base font-black text-white">
                  "PERSONALLY, I WOULDN'T TAKE THAT LEVEL OF DISRESPECT."
                </h4>
                <p className="text-xs text-rose-200/80 italic">
                  (Demand a rematch or send a cheeky text to salvage your dignity!)
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons: Rematch & Send Banter to Chat */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={handleRestartGame}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Rematch 🔄
            </button>
            <button
              onClick={() => handleExportBanterMeme(isUserWinner)}
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 hover:border-white/30 transition-all flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4 text-amber-400" /> Send Banter to Chat 💬
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
