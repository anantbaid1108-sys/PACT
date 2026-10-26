import React, { useState, useRef, useEffect } from 'react';
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
  Volume2
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
      // Auto export on timer expiry
      handleSendSticker();
    }
    return () => clearInterval(timer);
  }, [stickerCanvasOpen, canvasTimer]);

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
    <div className="h-[calc(100vh-2rem)] w-full flex flex-col bg-[#090C15] relative overflow-hidden rounded-2xl border border-slate-800/80 shadow-2xl">
      {/* 1. Header with "Launch Experience" Dropdown */}
      <div className="h-16 px-4 bg-sidebarBg/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative">
            <img 
              src={match.profile.photo} 
              alt={match.profile.name}
              className="w-10 h-10 rounded-full object-cover border border-amber-500/30" 
            />
            {match.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              {match.profile.name}
              <span className="text-[10px] text-slate-400 font-normal">({match.profile.age})</span>
            </h3>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <span>📍 {match.profile.location}</span> • <span>96% Trait Match</span>
            </p>
          </div>
        </div>

        {/* Circular Game Launcher Trigger (Pure Crisp White with Hot Pink Gamepad Icon) */}
        <div className="relative">
          <button
            onClick={() => setExperienceOpen(!experienceOpen)}
            className="w-10 h-10 rounded-full bg-white shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center justify-center border border-pink-200/50 group"
            title="Launch Mini-Game Arena"
          >
            <Gamepad2 className="w-5 h-5 text-pink-500 stroke-pink-500 stroke-[2.2] group-hover:rotate-12 transition-transform" />
          </button>

          {/* Dropdown Menu */}
          {experienceOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#131B2E] border border-slate-700/80 shadow-2xl p-2 z-50 animate-fade">
              <div className="p-2 border-b border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  🏆 Competitive Showdowns
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'akinator', title: 'Time-Trial Persona Guess' });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800/80 hover:text-amber-300 flex items-center justify-between transition-colors"
                  >
                    <span>⚡ Time-Trial Persona Guess</span>
                    <span className="text-[10px] text-slate-400">Speed Akinator</span>
                  </button>
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'number_duel', title: 'Number Duel (1 to 100)' });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800/80 hover:text-amber-300 flex items-center justify-between transition-colors"
                  >
                    <span>🔢 Number Duel (1 to 100)</span>
                    <span className="text-[10px] text-emerald-400">Turn-based</span>
                  </button>
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'doodle_duel', title: 'Doodle Duel (60s)' });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800/80 hover:text-amber-300 flex items-center justify-between transition-colors"
                  >
                    <span>🎨 Doodle Duel</span>
                    <span className="text-[10px] text-slate-400">60s Timer</span>
                  </button>
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'tap_race', title: 'Micro Reflex Tap Race' });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800/80 hover:text-amber-300 flex items-center justify-between transition-colors"
                  >
                    <span>⚡ Micro Reflex Tap Race</span>
                    <span className="text-[10px] text-slate-400">Reaction</span>
                  </button>
                </div>
              </div>

              <div className="p-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                  🤝 Co-Op Banter & Icebreakers
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'shared_canvas', title: 'Collaborative Shared Canvas' });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800/80 hover:text-rose-300 flex items-center justify-between transition-colors"
                  >
                    <span>🖌️ Collaborative Shared Canvas</span>
                    <span className="text-[10px] text-emerald-400">Sync stroke</span>
                  </button>
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'twenty_questions', title: '20 Questions Co-Op' });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800/80 hover:text-rose-300 flex items-center justify-between transition-colors"
                  >
                    <span>❓ 20 Questions Co-Op</span>
                    <span className="text-[10px] text-slate-400">AI GM</span>
                  </button>
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'imposter_ai', title: "Who's the Imposter? (AI)" });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800/80 hover:text-rose-300 flex items-center justify-between transition-colors"
                  >
                    <span>🕵️ Who's the Imposter?</span>
                    <span className="text-[10px] text-slate-400">Vote out bot</span>
                  </button>
                  <button
                    onClick={() => {
                      onLaunchGame({ type: 'spin_bottle', title: 'Spin the Bottle (Truth/Vibe)' });
                      setExperienceOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800/80 hover:text-rose-300 flex items-center justify-between transition-colors"
                  >
                    <span>🍾 Spin the Bottle</span>
                    <span className="text-[10px] text-slate-400">Dilemmas</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        <div className="text-center py-2">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            Pact formed • Experience-first connection unlocked
          </span>
        </div>

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
                  px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md
                  ${isMe 
                    ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-br-none' 
                    : 'bg-[#1E293B] text-slate-200 border border-slate-700/60 rounded-bl-none'
                  }
                `}>
                  {msg.text}
                </div>
              )}

              {/* Game Invite Card */}
              {msg.type === 'game_invite' && (
                <div className="bg-gradient-to-br from-[#161F30] to-[#1E293B] border border-amber-500/40 p-4 rounded-2xl shadow-xl space-y-3 text-left w-72">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Gamepad2 className="w-5 h-5" />
                    <span className="font-bold text-xs uppercase tracking-wider">Live Duel Challenge</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{msg.gameTitle}</h4>
                  <p className="text-xs text-slate-300">{msg.text}</p>
                  <button
                    onClick={() => onLaunchGame({ type: msg.gameType || 'number_duel', title: msg.gameTitle })}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-md shadow-orange-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" /> Accept Duel & Play
                  </button>
                </div>
              )}

              {/* Meme Message */}
              {msg.type === 'meme' && (
                <div className="bg-cardBg border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl max-w-xs">
                  <img src={msg.memeUrl} alt={msg.title} className="w-full h-44 object-cover" />
                  <div className="p-3 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">{msg.title}</span>
                    <p className="text-xs text-slate-200 mt-0.5">{msg.caption}</p>
                  </div>
                </div>
              )}

              {/* Custom Sticker Message */}
              {msg.type === 'sticker' && (
                <div className="bg-cardBg border border-slate-700/80 p-2 rounded-2xl shadow-xl max-w-[200px]">
                  <img src={msg.stickerUrl} alt="Custom Sticker" className="w-full h-auto rounded-xl" />
                  <span className="text-[10px] text-amber-400 font-semibold block text-center mt-1">🎨 5-Sec Custom Doodle</span>
                </div>
              )}

              {/* Voice Note Message */}
              {msg.type === 'voice' && (
                <div className="bg-[#1E293B] border border-slate-700/80 px-4 py-2.5 rounded-2xl shadow-md flex items-center gap-3">
                  <button className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center hover:bg-rose-500/30">
                    <Play className="w-4 h-4 fill-rose-400" />
                  </button>
                  <div className="flex items-center gap-1 h-5">
                    {[40, 75, 55, 90, 60, 85, 45, 95, 30, 70].map((h, i) => (
                      <span key={i} className="w-1 bg-rose-400/80 rounded-full" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{msg.duration || '0:04'}</span>
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

      {/* Quick Emojis Tray */}
      {emojiTrayOpen && (
        <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center gap-2 overflow-x-auto z-20">
          {quickEmojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                setInputText(prev => prev + emoji);
                setEmojiTrayOpen(false);
              }}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-lg transition-transform hover:scale-125"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* 3. Bottom Control Bar (Left-to-Right strictly) */}
      <div className="p-3 bg-sidebarBg/95 backdrop-blur-md border-t border-slate-800 z-20">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          {/* Button 1: Meme Vault button (😂) */}
          <button
            type="button"
            onClick={() => setMemeVaultOpen(true)}
            className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-xl flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all"
            title="Open Meme Vault"
          >
            😂
          </button>

          {/* Button 2: Emoji picker button */}
          <button
            type="button"
            onClick={() => setEmojiTrayOpen(!emojiTrayOpen)}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all ${
              emojiTrayOpen 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border-slate-700/80'
            }`}
            title="Emoji Quick Pick"
          >
            <Smile className="w-5 h-5" />
          </button>

          {/* Input 3: Auto-resizing message input */}
          <div className="flex-1 relative">
            {isRecording ? (
              <div className="w-full h-10 px-4 rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-between text-rose-300 text-xs font-semibold animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span>Recording Voice Note... ({recordDuration}s)</span>
                </div>
                <button
                  type="button"
                  onClick={handleSendVoiceNote}
                  className="px-3 py-1 rounded-lg bg-rose-500 text-white font-bold text-xs hover:bg-rose-600"
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
                className="w-full h-10 px-4 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 transition-colors"
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
            className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all ${
              isRecording 
                ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30' 
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border-slate-700/80'
            }`}
            title={isRecording ? 'Stop & Send Recording' : 'Record Voice Note'}
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Button 5: Custom Sticker drawer (🎨) -> 5-sec HTML5 mini canvas */}
          <button
            type="button"
            onClick={openStickerCanvas}
            className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-xl flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all"
            title="5-Second Custom Doodle Sticker"
          >
            🎨
          </button>

          {/* Send Action */}
          <button
            type="button"
            onClick={handleSendText}
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-md shadow-rose-500/20"
            title="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal: Slide-Up Meme Vault Drawer */}
      {memeVaultOpen && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col justify-end p-4 animate-fade">
          <div className="w-full max-w-2xl mx-auto bg-cardBg border border-slate-700 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[80%] space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">😂</span>
                <h3 className="text-base font-bold text-white">Meme Vault: Humor Compatibility</h3>
              </div>
              <button 
                onClick={() => setMemeVaultOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Select a meme to assess humor resonance with {match.profile.name}.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto pr-1">
              {MEME_VAULT.map((meme) => (
                <div
                  key={meme.id}
                  onClick={() => handleSendMeme(meme)}
                  className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-rose-500/60 transition-all hover:scale-[1.02]"
                >
                  <img src={meme.url} alt={meme.title} className="w-full h-28 object-cover" />
                  <div className="p-2">
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">{meme.category}</span>
                    <h5 className="text-xs font-semibold text-white truncate">{meme.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: 5-Second Custom Sticker HTML5 Canvas */}
      {stickerCanvasOpen && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade">
          <div className="max-w-md w-full mx-auto bg-cardBg border border-slate-700 rounded-3xl p-5 shadow-2xl space-y-4 text-center">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎨</span>
                <h4 className="text-sm font-bold text-white">5-Second Doodle Sticker</h4>
              </div>
              <div className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-bold font-mono">
                ⏱️ {canvasTimer}s Remaining
              </div>
            </div>

            <p className="text-xs text-slate-300">
              Draw a quick expressive sketch! It will automatically export into the chat stream when time runs out.
            </p>

            {/* HTML5 Canvas */}
            <div className="relative mx-auto rounded-2xl overflow-hidden border-2 border-slate-700 bg-[#0F172A] touch-none">
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

            {/* Drawing Tools */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1.5">
                {['#FF4D6D', '#F59E0B', '#10B981', '#38BDF8', '#FFFFFF'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setBrushColor(color)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${brushColor === color ? 'scale-125 border-white' : 'border-transparent'}`}
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
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleSendSticker}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-md"
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
