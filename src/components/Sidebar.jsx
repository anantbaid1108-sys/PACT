import React from 'react';
import { 
  Flame, 
  Gamepad2, 
  Sparkles, 
  Calendar, 
  MessageCircle, 
  ShieldCheck, 
  Zap, 
  ChevronRight,
  User,
  SlidersHorizontal,
  Bell,
  LogOut
} from 'lucide-react';

export default function Sidebar({ 
  user,
  onSignOut,
  currentChannel, 
  onSelectChannel, 
  matches, 
  activeMatchId, 
  onSelectMatch,
  isMobileOpen,
  setIsMobileOpen,
  unreadNotifCount = 0,
  onOpenNotifications,
  onOpenEditProfile
}) {
  const channels = [
    { id: 'deck', label: 'Discover / Deck', icon: Flame, badge: 'Hot' },
    { id: 'arcade', label: 'Arcade Queue', icon: Gamepad2, badge: 'Live' },
    { id: 'feed', label: 'Vibe Feed', icon: Sparkles, badge: null },
    { id: 'daily', label: 'Daily Sparks', icon: Calendar, badge: '3 New' },
  ];

  const currentUser = user || {
    name: 'You (Anant)',
    handle: '@anant_b',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 sm:w-80 bg-sidebarBg border-r border-slate-800/80 
        flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header / Brand Logo & Notifications */}
        <div className="h-16 px-4 border-b border-slate-800/80 flex items-center justify-between bg-[#0B0E17]">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onSelectChannel('deck')}>
            <div className="relative group">
              <img 
                src="/pact-logo.png" 
                alt="Pact Logo" 
                className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-200"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>
            <div>
              <span className="text-lg font-black tracking-wider text-white flex items-center gap-1.5">
                PACT
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 tracking-widest">
                  APP
                </span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">Make Connection an Experience</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Notifications & Challenges"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-black flex items-center justify-center animate-pulse shadow-md shadow-pink-500/50">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60"
            >
              ✕
            </button>
          </div>
        </div>

        {/* User Mini-Profile with Edit Profile trigger & Sign Out */}
        <div className="p-3 mx-3 mt-3 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 flex items-center justify-between group hover:border-rose-500/40 transition-all">
          <div 
            onClick={onOpenEditProfile}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
            title="Click to edit profile & preferences"
          >
            <div className="relative shrink-0">
              <img 
                src={currentUser.photos?.[0]?.url || currentUser.photo || currentUser.avatar} 
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover border border-amber-400/50 group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-white tracking-tight leading-none truncate group-hover:text-amber-300 transition-colors">
                  {currentUser.name}
                </h4>
                {currentUser.age && (
                  <span className="text-[11px] font-mono font-bold text-amber-400 shrink-0">
                    {currentUser.age}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 font-mono truncate flex items-center gap-1">
                <span>{currentUser.handle || '@user'}</span>
                <span className="text-rose-400 font-bold">• Edit</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0 ml-1">
            <button
              onClick={onOpenEditProfile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 transition-colors"
              title="Edit Profile & Dating Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <button
              onClick={onSignOut}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Channels Navigation */}
        <div className="px-3 py-3 border-b border-slate-800/60">
          <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Channels
          </span>
          <nav className="space-y-1">
            {channels.map((channel) => {
              const Icon = channel.icon;
              const isActive = currentChannel === channel.id && !activeMatchId;
              return (
                <button
                  key={channel.id}
                  onClick={() => {
                    onSelectChannel(channel.id);
                    setIsMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold
                    transition-all duration-200 group
                    ${isActive 
                      ? 'bg-rose-500/15 text-white border border-rose-500/30 shadow-md shadow-rose-500/5' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span>{channel.label}</span>
                  </div>
                  {channel.badge && (
                    <span className={`
                      text-[10px] px-2 py-0.5 rounded-full font-bold
                      ${channel.badge === 'Live' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse'
                        : channel.badge === 'Hot'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }
                    `}>
                      {channel.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Active Matches / Conversations Section */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          <div className="flex items-center justify-between px-3 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Active Matches ({matches.length})
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              {matches.filter(m => m.online).length} online
            </span>
          </div>

          {matches.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">
              No matches yet. Swipe on Deck or send a SUPERPACT to ignite sparks!
            </div>
          ) : (
            matches.map((match) => {
              const isSelected = activeMatchId === match.id;
              return (
                <button
                  key={match.id}
                  onClick={() => {
                    onSelectMatch(match.id);
                    setIsMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 p-2.5 rounded-2xl text-left transition-all
                    ${isSelected 
                      ? 'bg-cardBg border border-slate-700/80 shadow-lg text-white' 
                      : 'hover:bg-slate-800/40 text-slate-300 border border-transparent'
                    }
                  `}
                >
                  <div className="relative shrink-0">
                    <img 
                      src={match.profile.photo} 
                      alt={match.profile.name}
                      className="w-11 h-11 rounded-2xl object-cover border border-slate-700" 
                    />
                    {match.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white truncate">{match.profile.name}</span>
                      <span className="text-[10px] text-slate-400 shrink-0">{match.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{match.lastMessage}</p>
                  </div>
                  {match.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {match.unread}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer Quick Links & Safety */}
        <div className="p-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>18+ Verified Platform</span>
          </div>
          <span className="font-mono text-slate-400">v2.0.0</span>
        </div>
      </aside>
    </>
  );
}
