import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, 
  Smile, 
  Mic, 
  Palette, 
  Send, 
  ChevronDown, 
  Sparkles, 
  Play, 
  Square, 
  X, 
  ArrowLeft,
  Flame,
  Volume2,
  Heart,
  Bot,
  Brain,
  Wand2,
  Copy,
  Check,
  MessageSquareCode,
  Zap,
  Lightbulb
} from 'lucide-react';
import { MEME_VAULT } from '../mockData';

export default function ChatRoom({ 
  match, 
  messages = [], 
  onSendMessage, 
  onLaunchGame, 
  onBack 
}) {
  const [inputText, setInputText] = useState('');
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [memeVaultOpen, setMemeVaultOpen] = useState(false);
  const [stickerCanvasOpen, setStickerCanvasOpen] = useState(false);
  const [emojiTrayOpen, setEmojiTrayOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);

  // In-Chat AI Dating Wingman ("Cupid AI") state
  const [cupidOpen, setCupidOpen] = useState(false);
  const [cupidTool, setCupidTool] = useState('vibe'); // 'vibe' | 'decode' | 'rizz' | 'comeback'
  const [copiedText, setCopiedText] = useState(null);

  // Sticker Canvas state
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#FF4D6D');
  const [brushSize, setBrushSize] = useState(4);
  const [canvasTimer, setCanvasTimer] = useState(5);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Voice recording timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordDuration(prev => prev + 1);
      }, 1000);
    } else {
      setRecordDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // 5-second Sticker Canvas countdown
  useEffect(() => {
    let timer;
    if (stickerCanvasOpen && canvasTimer > 0) {
      timer = setInterval(() => {
        setCanvasTimer(prev => prev - 1);
      }, 1000);
    } else if (stickerCanvasOpen && canvasTimer === 0) {
      handleSendSticker();
    }
    return () => clearInterval(timer);
  }, [stickerCanvasOpen, canvasTimer]);

  // =========================================================
  // CUPID AI DATING WINGMAN INTELLIGENCE ENGINES
  // =========================================================
  const profile = match?.profile || {};
  const themMessages = messages.filter(m => m.sender === 'them');
  const lastThemMsg = themMessages[themMessages.length - 1]?.text || match?.lastMessage || "Let's start our conversation!";

  const vibeAnalysis = useMemo(() => {
    const traits = profile.threeWords || profile.selfTraits || ['Curious', 'Tactile', 'Playful'];
    const interests = profile.interests || ['Music', 'Art'];
    return {
      briefing: `${profile.name} values dry humor, creative design, and authentic depth. Communicates with ${traits[2]?.toLowerCase() || 'playful sarcasm'} and values high-taste banter over superficial small talk.`,
      traits,
      interests,
      style: "Playfully competitive • Sarcastic banter • Values shared creative interests",
      advice: `Invite ${profile.name.split(' ')[0]} to an arcade duel or ask about their ${interests[0] || 'interests'}!`
    };
  }, [profile]);

  const messageDecode = useMemo(() => {
    const textLower = lastThemMsg.toLowerCase();
    let subtext = "They are opening up friendly banter and testing your spontaneity. They want an engaging, witty response that matches their energy.";
    let tone = "Playful & Curious";

    if (textLower.includes('challenge') || textLower.includes('round') || textLower.includes('beat') || textLower.includes('scared') || textLower.includes('game')) {
      tone = "Playfully Competitive & Flirtatious";
      subtext = "They're actively teasing you and testing your confidence. They want you to accept their challenge with banter, not back down!";
    } else if (textLower.includes('music') || textLower.includes('album') || textLower.includes('vinyl') || textLower.includes('soundtrack') || textLower.includes('piano')) {
      tone = "Culturally Curious & Taste-Testing";
      subtext = "Music is deeply personal to them. They're checking if your cultural wavelength aligns with theirs. Share an authentic favorite with flair.";
    } else if (textLower.includes('keyboard') || textLower.includes('code') || textLower.includes('boulder') || textLower.includes('climb') || textLower.includes('coffee')) {
      tone = "Niche Passion Bonding";
      subtext = "They found a mutual hyper-fixation! They're excited to skip superficial small talk and dive straight into shared passion.";
    }

    return {
      lastMessage: lastThemMsg,
      tone,
      subtext,
      signal: "🔥 96% Romantic & Playful Resonance"
    };
  }, [lastThemMsg, profile]);

  const smoothRizzLines = useMemo(() => {
    const firstInterest = profile.interests?.[0] || 'arcade games';
    const trait = profile.threeWords?.[0] || 'playful';

    return [
      `I saw you're into ${firstInterest}—does that mean you're ready to lose to me in an arcade duel, or should I go easy on you? 😉`,
      `Your profile gave off an effortless ${trait.toLowerCase()} aesthetic. Exactly what kind of chaos should I prepare for?`,
      `I have a strict rule about only sharing aux cord privileges with elite music nerds. What track are you putting on first? 🎵`
    ];
  }, [profile]);

  const flirtyComebacks = useMemo(() => {
    return [
      `Careful what you wish for—I don't play to lose, especially when bragging rights are on the line. ⚡`,
      `You talk a big game for someone who hasn't witnessed my reaction speed yet! Let's test that theory right now. 🎮`,
      `If you banter this well over text, I can only imagine how fun our first coffee duel is going to be. ☕`
    ];
  }, [lastThemMsg]);

  const handlePopulateInput = (text) => {
    setInputText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSendText = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage({
      id: `m-${Date.now()}`,
      sender: 'me',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    setInputText('');
  };

  const handleSendMeme = (meme) => {
    onSendMessage({
      id: `m-${Date.now()}`,
      sender: 'me',
      type: 'meme',
      memeUrl: meme.url,
      caption: meme.caption,
      title: meme.title,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    setMemeVaultOpen(false);
  };

  const handleSendVoiceNote = () => {
    setIsRecording(false);
    onSendMessage({
      id: `m-${Date.now()}`,
      sender: 'me',
      type: 'voice',
      duration: `${recordDuration || 3}s`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  // Sticker Canvas handlers
  const openStickerCanvas = () => {
    setStickerCanvasOpen(true);
    setCanvasTimer(5);
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }, 50);
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSendSticker = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');

    onSendMessage({
      id: `m-${Date.now()}`,
      sender: 'me',
      type: 'sticker',
      stickerUrl: dataUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    setStickerCanvasOpen(false);
  };

  const quickEmojis = ['🔥', '😂', '💚', '⚡', '✨', '💀', '👀', '🎮'];

  return (
    <div className="h-[calc(100vh-2rem)] w-full flex flex-col bg-[#FDFBF7] relative overflow-hidden rounded-3xl border border-slate-200/90 shadow-2xl">
      
      {/* ========================================================= */}
      {/* 1. TOP HEADER: CRISP WARM PORCELAIN STYLE                 */}
      {/* ========================================================= */}
      <div className="h-16 px-5 bg-white/95 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="lg:hidden p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <img 
              src={match.profile.photo} 
              alt={match.profile.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-rose-300 shadow-sm" 
            />
            {match.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </div>

          <div className="text-left">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
              {match.profile.name}
              <span className="text-[11px] text-slate-400 font-normal">({match.profile.age})</span>
            </h3>
            <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
              <span>📍 {match.profile.location}</span> • <span>96% Chemistry</span>
            </p>
          </div>
        </div>

        {/* Circular Game Launcher Trigger */}
        <div className="relative">
          <button
            onClick={() => setExperienceOpen(!experienceOpen)}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center justify-center border border-rose-200/60 group"
            title="Launch Mini-Game Arena"
          >
            <Gamepad2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>

          {/* Mini-Games Dropdown Menu */}
          {experienceOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2.5 z-50 animate-fade text-left">
              <div className="p-2 border-b border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-500 block mb-1">
                  🏆 Competitive Showdowns
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'akinator', title: 'AI Akinator Guess' });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-between transition-colors"
                  >
                    <span>🔮 AI Akinator Guess</span>
                    <span className="text-[10px] text-slate-400">Oracle</span>
                  </button>
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'spin_bottle', title: 'Interactive Spin the Bottle' });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-between transition-colors"
                  >
                    <span>🍾 Spin the Bottle</span>
                    <span className="text-[10px] text-amber-500 font-bold">Glass 3D</span>
                  </button>
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'twenty_q', title: '20 Questions Co-Op' });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-between transition-colors"
                  >
                    <span>❓ 20 Questions Co-Op</span>
                    <span className="text-[10px] text-slate-400">Relay</span>
                  </button>
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'two_truths', title: 'Two Truths and a Lie' });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-between transition-colors"
                  >
                    <span>🤥 2 Truths 1 Lie</span>
                    <span className="text-[10px] text-emerald-500 font-bold">New!</span>
                  </button>
                </div>
              </div>

              <div className="p-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 block mb-1">
                  🤝 Creative Studio & Reflex
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'doodle_duel', title: 'Doodle Duel (Skribbl.io)' });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-600 flex items-center justify-between transition-colors"
                  >
                    <span>🎨 Doodle Duel</span>
                    <span className="text-[10px] text-rose-500 font-bold">Skribbl</span>
                  </button>
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'shared_canvas', title: 'Creative Studio Canvas 2.0' });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-600 flex items-center justify-between transition-colors"
                  >
                    <span>🖌️ Studio Canvas 2.0</span>
                    <span className="text-[10px] text-slate-400">12 Colors</span>
                  </button>
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'tap_race', title: 'Micro Reflex Tap Race' });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-600 flex items-center justify-between transition-colors"
                  >
                    <span>⚡ Reflex Tap Race</span>
                    <span className="text-[10px] text-slate-400">Reaction</span>
                  </button>
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'number_duel', title: 'Number Duel (1 to 100)' });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-600 flex items-center justify-between transition-colors"
                  >
                    <span>🔢 Number Duel</span>
                    <span className="text-[10px] text-slate-400">1–100</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MESSAGES STREAM WITH CUTE PETS & LOVE SIGNS WALLPAPER  */}
      {/* ========================================================= */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
        {/* Seamless Translucent SVG Doodle Wallpaper Pattern (Bunnies, Cats, Dogs, Paws, Coffee, Stars, Hearts) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.07] text-slate-900 select-none overflow-hidden z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cuteDoodlesPattern" width="180" height="180" patternUnits="userSpaceOnUse">
                {/* Cat with Whiskers */}
                <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M 22 42 C 22 32 28 24 38 28 C 48 24 54 32 54 42 C 54 52 48 58 38 58 C 28 58 22 52 22 42 Z" />
                  <path d="M 26 28 L 22 18 L 32 24" />
                  <path d="M 50 28 L 54 18 L 44 24" />
                  <circle cx="33" cy="40" r="1.5" fill="currentColor" />
                  <circle cx="43" cy="40" r="1.5" fill="currentColor" />
                  <path d="M 37 45 L 39 45" />
                  <path d="M 18 42 L 28 42" />
                  <path d="M 48 42 L 58 42" />
                </g>

                {/* Playful Bunny with Tall Ears */}
                <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <ellipse cx="125" cy="56" rx="14" ry="12" />
                  <path d="M 119 45 C 119 28 122 16 124 16 C 126 16 128 28 128 45" />
                  <path d="M 128 45 C 129 28 132 16 134 16 C 136 16 137 28 136 45" />
                  <circle cx="121" cy="54" r="1.2" fill="currentColor" />
                  <circle cx="129" cy="54" r="1.2" fill="currentColor" />
                </g>

                {/* Cute Dog with Floppy Ears */}
                <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <ellipse cx="65" cy="136" rx="15" ry="13" />
                  <path d="M 52 128 C 45 132 44 144 50 148 C 53 145 54 138 55 132" fill="none" />
                  <path d="M 78 128 C 85 132 86 144 80 148 C 77 145 76 138 75 132" fill="none" />
                  <circle cx="60" cy="134" r="1.3" fill="currentColor" />
                  <circle cx="70" cy="134" r="1.3" fill="currentColor" />
                  <ellipse cx="65" cy="140" rx="2" ry="1.5" fill="currentColor" />
                </g>

                {/* Paw Prints */}
                <g fill="currentColor">
                  <ellipse cx="150" cy="136" rx="5" ry="4" />
                  <circle cx="143" cy="127" r="2.2" />
                  <circle cx="150" cy="124" r="2.2" />
                  <circle cx="157" cy="127" r="2.2" />
                </g>

                {/* Steaming Coffee Cup */}
                <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M 88 48 L 88 64 C 88 70 102 70 102 64 L 102 48 Z" />
                  <path d="M 102 52 C 107 52 107 60 102 60" />
                  <path d="M 84 72 L 106 72" />
                  <path d="M 93 42 C 93 39 96 39 96 36" />
                </g>

                {/* Sparkling Stars */}
                <g fill="currentColor">
                  <path d="M 30 100 L 32 105 L 37 107 L 32 109 L 30 114 L 28 109 L 23 107 L 28 105 Z" />
                  <path d="M 158 35 L 159 38 L 163 39 L 159 40 L 158 43 L 157 40 L 153 39 L 157 38 Z" />
                </g>

                {/* Floating Love Hearts */}
                <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M 142 86 C 142 81 137 77 132 82 C 127 77 122 81 122 86 C 122 93 132 99 132 99 C 132 99 142 93 142 86 Z" />
                  <path d="M 76 82 C 76 78 72 75 68 79 C 64 75 60 78 60 82 C 60 88 68 93 68 93 C 68 93 76 88 76 82 Z" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cuteDoodlesPattern)" />
          </svg>
        </div>

        {/* Pact Formed Header Note */}
        <div className="text-center py-2 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-[11px] font-bold text-slate-500 shadow-sm">
            ✨ Pact Formed • Activity-First Banter Unlocked
          </span>
        </div>

        {/* Messages List with Upgraded Bubble Styling */}
        <div className="space-y-3.5 relative z-10">
          {messages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <div 
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[70%] ${isMe ? 'ml-auto' : 'mr-auto'}`}
              >
                {/* Regular Text Message */}
                {!msg.type && (
                  <div className={`
                    px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${isMe 
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-tr-none shadow-rose-500/20' 
                      : 'bg-white text-slate-800 border border-slate-200/80 shadow-slate-200/60 rounded-tl-none font-medium'
                    }
                  `}>
                    {msg.text}
                  </div>
                )}

                {/* Game Invite Card */}
                {msg.type === 'game_invite' && (
                  <div className="bg-white border border-rose-200 p-4 rounded-2xl shadow-md space-y-3 text-left w-72">
                    <div className="flex items-center gap-2 text-rose-500">
                      <Gamepad2 className="w-5 h-5" />
                      <span className="font-extrabold text-xs uppercase tracking-wider">Live Duel Challenge</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{msg.gameTitle}</h4>
                    <p className="text-xs text-slate-600">{msg.text}</p>
                    <button
                      onClick={() => onLaunchGame({ type: msg.gameType || 'number_duel', title: msg.gameTitle })}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold text-xs shadow-md shadow-rose-500/25 hover:scale-[1.02] transition-transform flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" /> Accept Challenge
                    </button>
                  </div>
                )}

                {/* Meme Message */}
                {msg.type === 'meme' && (
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md max-w-xs">
                    <img src={msg.memeUrl} alt={msg.title} className="w-full h-44 object-cover" />
                    <div className="p-3 text-left">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">{msg.title}</span>
                      <p className="text-xs text-slate-700 mt-0.5 font-medium">{msg.caption}</p>
                    </div>
                  </div>
                )}

                {/* Custom Sticker Message */}
                {msg.type === 'sticker' && (
                  <div className="bg-white border border-slate-200 p-2 rounded-2xl shadow-md max-w-[200px]">
                    <img src={msg.stickerUrl} alt="Custom Sticker" className="w-full h-auto rounded-xl" />
                    <span className="text-[10px] text-rose-500 font-bold block text-center mt-1">🎨 Shared Artwork</span>
                  </div>
                )}

                {/* Voice Note Message */}
                {msg.type === 'voice' && (
                  <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-3">
                    <button className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center hover:bg-rose-500/20">
                      <Play className="w-4 h-4 fill-rose-500" />
                    </button>
                    <div className="flex items-center gap-1 h-5">
                      {[40, 75, 55, 90, 60, 85, 45, 95, 30, 70].map((h, i) => (
                        <span key={i} className="w-1 bg-rose-500/70 rounded-full" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 font-mono font-bold">{msg.duration || '0:04'}</span>
                  </div>
                )}

                <span className="text-[10px] text-slate-400 px-1 mt-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Emojis Tray */}
      {emojiTrayOpen && (
        <div className="px-4 py-2 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center gap-2 overflow-x-auto z-20">
          {quickEmojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                setInputText(prev => prev + emoji);
                setEmojiTrayOpen(false);
              }}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-lg transition-transform hover:scale-125"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. BOTTOM CONTROL BAR: CRISP FLOATING PILL INPUT          */}
      {/* ========================================================= */}
      <div className="p-3.5 bg-white/95 backdrop-blur-md border-t border-slate-200/80 z-20 shadow-sm">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          {/* Button 1: Meme Vault button (😂) */}
          <button
            type="button"
            onClick={() => setMemeVaultOpen(true)}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-lg flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all shadow-sm"
            title="Open Meme Vault"
          >
            😂
          </button>

          {/* Button 2: Emoji picker button */}
          <button
            type="button"
            onClick={() => setEmojiTrayOpen(!emojiTrayOpen)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all shadow-sm ${
              emojiTrayOpen 
                ? 'bg-rose-50 text-rose-500 border-rose-300' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
            }`}
            title="Emoji Quick Pick"
          >
            <Smile className="w-5 h-5" />
          </button>

          {/* Input 3: Floating Pill Message Input */}
          <div className="flex-1 relative">
            {isRecording ? (
              <div className="w-full h-11 px-4 rounded-full bg-rose-50 border border-rose-300 flex items-center justify-between text-rose-600 text-xs font-bold animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span>Recording Voice Note... ({recordDuration}s)</span>
                </div>
                <button
                  type="button"
                  onClick={handleSendVoiceNote}
                  className="px-3.5 py-1 rounded-full bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 shadow-sm"
                >
                  Send Note
                </button>
              </div>
            ) : (
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendText(e)}
                placeholder={`Message ${match.profile.name}...`}
                className="w-full h-11 px-5 rounded-full bg-white border border-slate-200/90 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all shadow-inner"
              />
            )}
          </div>

          {/* Button 4: Voice note toggle button (🎙️) */}
          <button
            type="button"
            onClick={() => {
              if (isRecording) {
                handleSendVoiceNote();
              } else {
                setIsRecording(true);
              }
            }}
            className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all shadow-sm ${
              isRecording 
                ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
            }`}
            title={isRecording ? 'Stop & Send Recording' : 'Record Voice Note'}
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Button 5: Custom Sticker drawer (🎨) */}
          <button
            type="button"
            onClick={openStickerCanvas}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-lg flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all shadow-sm"
            title="5-Second Custom Doodle Sticker"
          >
            🎨
          </button>

          {/* Send Action */}
          <button
            type="button"
            onClick={handleSendText}
            disabled={!inputText.trim()}
            className="w-11 h-11 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-md shadow-rose-500/25"
            title="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Cupid AI Co-Pilot Bot Button (Above Typing Bar, Bottom-Right) */}
      <button
        type="button"
        onClick={() => setCupidOpen(!cupidOpen)}
        className="absolute bottom-16 right-4 z-20 bg-gradient-to-tr from-fuchsia-600 to-pink-500 text-white shadow-lg shadow-fuchsia-500/30 hover:scale-110 active:scale-95 transition-transform p-3 rounded-full cursor-pointer flex items-center justify-center group"
        title="Cupid AI Wingman"
      >
        <Sparkles className="w-5 h-5 text-white animate-pulse" />
        <span className="sr-only">Cupid AI Wingman</span>
      </button>

      {/* Slide-Up Cupid AI Wingman Flyout Card */}
      <AnimatePresence>
        {cupidOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="absolute bottom-28 right-3 sm:right-6 w-[400px] max-w-[calc(100vw-2rem)] max-h-[520px] bg-[#120F1F]/95 backdrop-blur-2xl border border-fuchsia-500/40 rounded-3xl p-4 shadow-2xl shadow-fuchsia-950/80 z-30 flex flex-col space-y-3 text-left overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-fuchsia-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-fuchsia-500/30">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-black text-white">Cupid AI Wingman</h3>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-extrabold uppercase border border-fuchsia-500/30">
                      Co-Pilot
                    </span>
                  </div>
                  <p className="text-[11px] text-fuchsia-200/70 font-medium">
                    Intelligence for {profile.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCupidOpen(false)}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Tool Selector Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-black/40 border border-white/5 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setCupidTool('vibe')}
                className={`py-1.5 px-1 rounded-xl flex items-center justify-center gap-1 transition-all ${
                  cupidTool === 'vibe'
                    ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vibe</span>
              </button>

              <button
                type="button"
                onClick={() => setCupidTool('decode')}
                className={`py-1.5 px-1 rounded-xl flex items-center justify-center gap-1 transition-all ${
                  cupidTool === 'decode'
                    ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquareCode className="w-3.5 h-3.5" />
                <span>Decode</span>
              </button>

              <button
                type="button"
                onClick={() => setCupidTool('rizz')}
                className={`py-1.5 px-1 rounded-xl flex items-center justify-center gap-1 transition-all ${
                  cupidTool === 'rizz'
                    ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Rizz</span>
              </button>

              <button
                type="button"
                onClick={() => setCupidTool('comeback')}
                className={`py-1.5 px-1 rounded-xl flex items-center justify-center gap-1 transition-all ${
                  cupidTool === 'comeback'
                    ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Comeback</span>
              </button>
            </div>

            {/* Tool Content Panels */}
            <div className="overflow-y-auto max-h-[340px] pr-1 space-y-3 text-xs">
              {/* Tool 1: Analyze Vibe & Personality */}
              {cupidTool === 'vibe' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-fuchsia-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 text-fuchsia-300 font-bold text-[11px] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Personality & Vibe Briefing</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed font-normal">
                      {vibeAnalysis.briefing}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Core Persona Traits
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {vibeAnalysis.traits.map((trait, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 font-semibold text-[11px]">
                          ✨ {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-gradient-to-r from-fuchsia-950/40 to-pink-950/40 border border-fuchsia-500/30 space-y-2">
                    <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Co-Pilot Strategic Advice</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {vibeAnalysis.advice}
                    </p>
                  </div>
                </div>
              )}

              {/* Tool 2: Decode Their Message */}
              {cupidTool === 'decode' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Last Message Received
                    </span>
                    <blockquote className="italic text-slate-200 border-l-2 border-fuchsia-500 pl-2.5 py-0.5">
                      "{messageDecode.lastMessage}"
                    </blockquote>
                  </div>

                  <div className="p-3 rounded-2xl bg-fuchsia-950/30 border border-fuchsia-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-400">
                        Underlying Tone
                      </span>
                      <span className="text-[10px] font-extrabold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                        {messageDecode.tone}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-1">
                        Psychological Subtext
                      </span>
                      <p className="text-slate-200 leading-relaxed font-normal">
                        {messageDecode.subtext}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-emerald-300">
                      <span>{messageDecode.signal}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tool 3: Generate Smooth Rizz Lines */}
              {cupidTool === 'rizz' && (
                <div className="space-y-2.5">
                  <div className="text-[11px] text-fuchsia-300/80 font-medium px-1">
                    Contextual opening & reply lines tailored to their mutual tags (tap to auto-fill):
                  </div>
                  {smoothRizzLines.map((line, idx) => (
                    <div
                      key={idx}
                      onClick={() => handlePopulateInput(line)}
                      className="group cursor-pointer p-3 rounded-2xl bg-white/[0.04] hover:bg-fuchsia-950/40 border border-white/10 hover:border-fuchsia-500/50 transition-all flex flex-col justify-between gap-2 shadow-sm"
                    >
                      <p className="text-slate-200 text-xs leading-relaxed group-hover:text-white">
                        "{line}"
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-bold text-fuchsia-400 pt-1">
                        <span className="flex items-center gap-1">
                          <Wand2 className="w-3 h-3" />
                          <span>Option {idx + 1}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-fuchsia-500/20 group-hover:bg-fuchsia-500 group-hover:text-white transition-colors">
                          {copiedText === line ? '✓ Populated into Chat!' : 'Use This Line ✍️'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tool 4: Flirty Comeback */}
              {cupidTool === 'comeback' && (
                <div className="space-y-2.5">
                  <div className="text-[11px] text-pink-300/80 font-medium px-1">
                    Witty, charming banter replies tailored to their last message (tap to auto-fill):
                  </div>
                  {flirtyComebacks.map((line, idx) => (
                    <div
                      key={idx}
                      onClick={() => handlePopulateInput(line)}
                      className="group cursor-pointer p-3 rounded-2xl bg-white/[0.04] hover:bg-pink-950/40 border border-white/10 hover:border-pink-500/50 transition-all flex flex-col justify-between gap-2 shadow-sm"
                    >
                      <p className="text-slate-200 text-xs leading-relaxed group-hover:text-white">
                        "{line}"
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-bold text-pink-400 pt-1">
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          <span>Witty Comeback {idx + 1}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-pink-500/20 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                          {copiedText === line ? '✓ Populated into Chat!' : 'Use This Line ✍️'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal: Slide-Up Meme Vault Drawer */}
      {memeVaultOpen && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col justify-end p-4 animate-fade">
          <div className="w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[80%] space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">😂</span>
                <h3 className="text-base font-black text-slate-900">Meme Vault: Humor Chemistry</h3>
              </div>
              <button 
                onClick={() => setMemeVaultOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 text-left">
              Select a meme to assess humor resonance with {match.profile.name}.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto pr-1">
              {MEME_VAULT.map((meme) => (
                <div
                  key={meme.id}
                  onClick={() => handleSendMeme(meme)}
                  className="group cursor-pointer rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden hover:border-rose-400 transition-all hover:scale-[1.02] shadow-sm"
                >
                  <img src={meme.url} alt={meme.title} className="w-full h-28 object-cover" />
                  <div className="p-2.5 text-left">
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">{meme.category}</span>
                    <h5 className="text-xs font-bold text-slate-800 truncate">{meme.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: 5-Second Custom Sticker HTML5 Canvas */}
      {stickerCanvasOpen && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade">
          <div className="max-w-md w-full mx-auto bg-white border border-slate-200 rounded-3xl p-5 shadow-2xl space-y-4 text-center">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎨</span>
                <h4 className="text-sm font-black text-slate-900">5-Second Doodle Sticker</h4>
              </div>
              <div className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-black font-mono">
                ⏱️ {canvasTimer}s Left
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Draw a quick sketch! It will automatically export into the chat stream when time runs out.
            </p>

            <div className="relative mx-auto rounded-2xl overflow-hidden border-2 border-slate-200 bg-[#0F172A] touch-none">
              <canvas
                ref={canvasRef}
                width={320}
                height={240}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="cursor-crosshair w-full max-w-[320px] h-[240px]"
              />
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1.5">
                {['#FF4D6D', '#F59E0B', '#10B981', '#38BDF8', '#FFFFFF'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setBrushColor(color)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${brushColor === color ? 'scale-125 border-slate-800' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const canvas = canvasRef.current;
                    if (canvas) {
                      const ctx = canvas.getContext('2d');
                      ctx.fillStyle = '#0F172A';
                      ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-bold"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleSendSticker}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs shadow-md"
                >
                  Send Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
