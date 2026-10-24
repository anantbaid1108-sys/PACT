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
        <div className="space-y-4">
          {feed.map((item) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
