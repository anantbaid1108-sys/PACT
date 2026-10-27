import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Sparkles, Plus } from 'lucide-react';
import { COMMUNITY_FEED_ITEMS } from '../mockData';

export default function VibeFeed({ onOpenCanvas }) {
  const [feed, setFeed] = useState(COMMUNITY_FEED_ITEMS);

  const handleLike = (id) => {
    setFeed(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, likes: item.likes + 1, userLiked: !item.userLiked };
      }
      return item;
    }));
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-y-auto p-4 flex flex-col items-center">
      <div className="max-w-xl w-full mx-auto space-y-4">
        {/* Header Banner */}
        <div className="p-4 rounded-3xl bg-cardBg border border-slate-800 flex items-center justify-between shadow-xl">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Community Vibe Feed
            </h2>
            <p className="text-xs text-slate-400">Collaborative canvases, duel highlights, and custom stickers</p>
          </div>
          <button
            onClick={onOpenCanvas}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Draw Doodle
          </button>
        </div>

        {/* Feed Cards */}
        <div className="space-y-5">
          {feed.map((item) => {
            const isShowpiece = item.isShowpiece || item.id === 'feed-showpiece';

            if (isShowpiece) {
              return (
                <div 
                  key={item.id}
                  className="bg-gradient-to-b from-[#161226] to-[#0E0C17] border-2 border-fuchsia-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-fuchsia-950/40 space-y-4"
                >
                  {/* Showpiece Banner Header */}
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-fuchsia-500/30">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-black text-white">{item.author}</h3>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-extrabold uppercase border border-fuchsia-500/30">
                            Live Canvas
                          </span>
                        </div>
                        <span className="text-[11px] text-amber-400 font-semibold">{item.type} • {item.time}</span>
                      </div>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      142 Active Doodlers
                    </span>
                  </div>

                  {/* Artwork Media: Community Doodle Board Preview */}
                  <div className="w-full h-72 sm:h-88 bg-slate-950 overflow-hidden relative group">
                    <img 
                      src={item.image} 
                      alt={item.caption} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C17] via-transparent to-black/30" />

                    {/* Floating Neon Doodle Watermarks */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-fuchsia-500/40 text-[11px] font-bold text-fuchsia-300">
                        ✨ Neon Sketches
                      </span>
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/40 text-[11px] font-bold text-amber-300">
                        📝 Sticky Notes
                      </span>
                    </div>

                    {/* Interactive "Jump Into Canvas" Button Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <button
                        type="button"
                        onClick={onOpenCanvas}
                        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-black text-sm shadow-xl shadow-pink-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/20"
                      >
                        <Sparkles className="w-5 h-5 fill-white text-white animate-spin-slow" />
                        <span>Jump Into Canvas 🎨</span>
                      </button>
                    </div>
                  </div>

                  {/* Content & Reactions */}
                  <div className="px-5 pb-4 space-y-3">
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {item.caption}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] text-fuchsia-300 bg-fuchsia-500/10 border border-fuchsia-500/20 px-2.5 py-0.5 rounded-lg font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                      <button 
                        onClick={() => handleLike(item.id)}
                        className={`flex items-center gap-1.5 transition-colors ${item.userLiked ? 'text-rose-400 font-bold' : 'hover:text-slate-200'}`}
                      >
                        <Heart className={`w-4 h-4 ${item.userLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                        <span>{item.likes} Hearts & Doodles</span>
                      </button>
                      <button 
                        onClick={onOpenCanvas}
                        className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                      >
                        <span>Collaborate Now</span> →
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={item.id}
                className="bg-cardBg border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-3"
              >
                {/* Card Header */}
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.author}</h4>
                    <span className="text-[10px] text-amber-400 font-semibold">{item.type} • {item.time}</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                    Verified Vibe
                  </span>
                </div>

                {/* Artwork Media */}
                <div className="w-full h-64 sm:h-80 bg-slate-900 overflow-hidden relative">
                  <img src={item.image} alt={item.caption} className="w-full h-full object-cover" />
                </div>

              {/* Content & Reactions */}
              <div className="px-5 pb-4 space-y-2.5">
                <p className="text-xs text-slate-200 leading-relaxed">{item.caption}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded-md font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                  <button 
                    onClick={() => handleLike(item.id)}
                    className={`flex items-center gap-1.5 transition-colors ${item.userLiked ? 'text-rose-400 font-bold' : 'hover:text-slate-200'}`}
                  >
                    <Heart className={`w-4 h-4 ${item.userLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                    <span>{item.likes} Resonances</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>Discuss Banter</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
