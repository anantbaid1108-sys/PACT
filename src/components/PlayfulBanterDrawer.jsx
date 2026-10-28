import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { POST_GAME_MEMES } from '../mockData';

export default function PlayfulBanterDrawer({
  isOpen,
  onClose,
  isWinner = true,
  partnerName = 'Your Match',
  gameTitle = 'Mini-Game Duel',
  onSendBanter
}) {
  const [selectedMemeKey, setSelectedMemeKey] = useState(isWinner ? 'victory' : 'defeat');
  const [imgError, setImgError] = useState(false);

  if (!isOpen) return null;

  const currentMeme = POST_GAME_MEMES[selectedMemeKey] || POST_GAME_MEMES.victory;

  const handleSend = () => {
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#FF3366', '#A855F7']
    });

    if (onSendBanter) {
      onSendBanter({
        ...currentMeme,
        isWinner: selectedMemeKey === 'victory',
        gameTitle,
        sender: 'user'
      });
    }

    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 260 }}
          className="relative z-10 w-full max-w-lg bg-gradient-to-b from-[#161226] to-[#0D0B14] border-t border-purple-500/30 rounded-t-3xl p-5 sm:p-6 shadow-2xl text-left space-y-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎭</span>
              <div>
                <h3 className="text-base font-black text-white tracking-wide">
                  Send Playful Banter
                </h3>
                <p className="text-[11px] text-slate-400">
                  Drop a contextual reaction meme directly into your chat with <span className="text-amber-400 font-bold">{partnerName}</span>.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Banter Card Selector Pills */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setSelectedMemeKey('victory'); setImgError(false); }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                selectedMemeKey === 'victory'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-md shadow-purple-500/25'
                  : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
              }`}
            >
              🏆 Victory Card
            </button>

            <button
              type="button"
              onClick={() => { setSelectedMemeKey('defeat'); setImgError(false); }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                selectedMemeKey === 'defeat'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white border-rose-400 shadow-md shadow-rose-500/25'
                  : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
              }`}
            >
              👀 Defeat Card
            </button>
          </div>

          {/* Meme Card Preview with Asset Error Fallback */}
          <div className="rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900/90 shadow-xl">
            {!imgError ? (
              <img
                src={currentMeme.imageUrl}
                alt={currentMeme.text}
                className="w-full h-48 object-cover border-b border-slate-700/60"
                onError={() => setImgError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-44 rounded-t-xl bg-gradient-to-br from-purple-900/60 to-slate-900 border-b border-purple-500/30 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-3xl mb-1">🎭</span>
                <p className="font-bold text-white text-sm uppercase">{currentMeme.text}</p>
                <p className="text-xs text-slate-300 mt-1">{currentMeme.subtext}</p>
              </div>
            )}

            <div className="p-3.5 bg-slate-950/90 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                {selectedMemeKey === 'victory' ? "Winner's Contemplation" : "Loser's Dignity Check"}
              </span>
              <h4 className="text-sm font-black text-white">
                "{currentMeme.text}"
              </h4>
              <p className="text-xs text-slate-300 italic">
                {currentMeme.subtext}
              </p>
            </div>
          </div>

          {/* Reciprocal Opponent Counter-Roast Notice */}
          <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center gap-2.5 text-xs text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Reciprocal Banter:</strong> {partnerName} will automatically respond with a counter-meme 2 seconds after delivery!
            </span>
          </div>

          {/* Action Triggers */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs border border-white/10 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSend}
              className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-black text-xs shadow-lg shadow-rose-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Banter to Chat 💬</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
