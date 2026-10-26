import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  Check, 
  Zap, 
  Heart, 
  Sparkles, 
  Gamepad2, 
  Timer, 
  MessageCircle, 
  Clock 
} from 'lucide-react';

export default function NotificationsDrawer({ 
  isOpen, 
  onClose, 
  notifications, 
  onAcceptPact, 
  onDismissPact, 
  onAcceptSuperpact, 
  onDeclineSuperpact 
}) {
  if (!isOpen) return null;

  const directPacts = notifications.filter(n => n.type === 'direct_pact' && n.status === 'pending');
  const superpacts = notifications.filter(n => n.type === 'superpact' && n.status === 'pending');

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fade"
      />

      {/* Slide-over Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="fixed top-0 bottom-0 right-0 w-full max-w-md bg-sidebarBg border-l border-slate-800 z-50 flex flex-col shadow-2xl"
      >
        {/* Drawer Header */}
        <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between bg-[#0B0E17]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Activity & Challenges
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500 text-white font-black">
                  {directPacts.length + superpacts.length}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Direct pacts & incoming superpact duels</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Feed 1: SUPERPACT Challenges */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-pink-400" />
                SUPERPACT Duels ({superpacts.length})
              </span>
              <span className="text-[10px] text-slate-400">Locked-in Scores</span>
            </div>

            {superpacts.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60 text-center text-xs text-slate-400">
                No pending SUPERPACT challenges right now.
              </div>
            ) : (
              superpacts.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#131B2E] border border-pink-500/40 shadow-xl space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <img 
                      src={item.sender.photo} 
                      alt={item.sender.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-pink-500/40 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white truncate">{item.sender.name}</h4>
                        <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                      </div>
                      <span className="text-[11px] font-bold text-pink-300 block mt-0.5">
                        ⚡ {item.gameTitle}
                      </span>
                      {item.lockedScore && (
                        <div className="mt-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-300 flex items-center gap-1">
                          <span>Target/Score:</span>
                          <strong>{item.lockedScore}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    You have been just <strong className="text-pink-400">SUPERPACTED</strong> by {item.sender.name}! Counter their turn now.
                  </p>

                  {/* Actions: Green Tick (Accept Round 2) vs Red Cross (Decline) */}
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => onAcceptSuperpact(item)}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Accept & Counter Round 2</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeclineSuperpact(item.id)}
                      className="p-2.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 transition-colors"
                      title="Decline Challenge"
                    >
                      <X className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Feed 2: Direct Pacts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-emerald-400" />
                Direct Pacts ({directPacts.length})
              </span>
              <span className="text-[10px] text-slate-400">Mutual Sparks</span>
            </div>

            {directPacts.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60 text-center text-xs text-slate-400">
                No new direct pacts right now. Keep swiping!
              </div>
            ) : (
              directPacts.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#131B2E] border border-emerald-500/30 shadow-lg space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.sender.photo} 
                      alt={item.sender.name} 
                      className="w-11 h-11 rounded-xl object-cover border border-emerald-500/40 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white truncate">{item.sender.name}</h4>
                        <span className="text-[10px] text-slate-400">{item.time}</span>
                      </div>
                      <p className="text-xs text-slate-300 truncate mt-0.5">{item.message}</p>
                    </div>
                  </div>

                  {/* Actions: Accept Match & Open Chat vs Dismiss */}
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => onAcceptPact(item)}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Accept Match & Chat</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDismissPact(item.id)}
                      className="p-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
                      title="Dismiss"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
