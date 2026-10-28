import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Zap, Sparkles, Bell, CheckCircle2, Heart } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Deck from './components/Deck';
import ChatRoom from './components/ChatRoom';
import GameModal from './components/GameModal';
import ArcadeView from './components/ArcadeView';
import VibeFeed from './components/VibeFeed';
import DailyPicks from './components/DailyPicks';
import AuthModal from './components/AuthModal';
import AsyncChallengeModal from './components/AsyncChallengeModal';
import NotificationsDrawer from './components/NotificationsDrawer';
import EditProfileDrawer from './components/EditProfileDrawer';
import { 
  getDivergentPoolsForUser,
  PROFILES, 
  INITIAL_MATCHES, 
  INITIAL_CHAT_MESSAGES,
  INITIAL_NOTIFICATIONS,
  POST_GAME_MEMES
} from './mockData';
import confetti from 'canvas-confetti';

export default function App() {
  // 1. Persistent Auth via localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pact_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Divergent profile pools filtered strictly by datingPreferenceGender
  const activePools = useMemo(() => getDivergentPoolsForUser(user), [user?.datingPreferenceGender]);

  // Navigation & Channels
  const [currentChannel, setCurrentChannel] = useState('deck');
  const [matches, setMatches] = useState(() => activePools.initialMatches);
  const [activeMatchId, setActiveMatchId] = useState(null);
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);
  
  // Modals & Drawers
  const [activeGame, setActiveGame] = useState(null);
  const [superpactTarget, setSuperpactTarget] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => activePools.initialNotifications);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [floatingBanner, setFloatingBanner] = useState(null);

  // Sync matches and notifications when user dating preference updates
  useEffect(() => {
    setMatches(activePools.initialMatches);
    setNotifications(activePools.initialNotifications);
    setActiveMatchId(null);
  }, [activePools]);

  // Active Match
  const activeMatch = matches.find(m => m.id === activeMatchId);

  // Unread notifications count
  const unreadNotifCount = notifications.filter(n => n.unread && n.status === 'pending').length;

  const showFloatingBanner = (text) => {
    setFloatingBanner(text);
    setTimeout(() => {
      setFloatingBanner(null);
    }, 4000);
  };

  const handleSignOut = () => {
    localStorage.removeItem('pact_user');
    setUser(null);
    setActiveMatchId(null);
  };

  // Deck Actions
  const handlePass = (profile) => {
    // Passed
  };

  const handleLike = (profile) => {
    const existing = matches.find(m => m.profile.id === profile.id);
    if (!existing) {
      const newMatch = {
        id: `match-${profile.id}`,
        profile,
        lastMessage: "You formed a Pact! Launch a mini-game to break the ice ⚡",
        time: "Just now",
        unread: 1,
        online: true,
      };
      setMatches(prev => [newMatch, ...prev]);

      setChatMessages(prev => ({
        ...prev,
        [newMatch.id]: [
          {
            id: `m-init-${Date.now()}`,
            sender: 'them',
            text: `Hey ${user?.name?.split(' ')[0] || ''}! Excited we matched on ${profile.interests[0] || 'our vibes'}. Are you down for a quick challenge?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }));

      // Switch to match chat
      setActiveMatchId(newMatch.id);
    }
  };

  // SUPERPACT Action
  const handleSuperpactClick = (profile) => {
    setSuperpactTarget(profile);
  };

  const handleDispatchSuperpact = (payload) => {
    // Show animated floating banner
    showFloatingBanner(`⚡ SUPERPACT Sent to ${payload.targetProfile.name}! Your score (${payload.lockedScore}) is locked in.`);

    // Add match if not exists
    const existing = matches.find(m => m.profile.id === payload.targetProfile.id);
    if (!existing) {
      const newMatch = {
        id: `match-${payload.targetProfile.id}`,
        profile: payload.targetProfile,
        lastMessage: `⚡ You sent a SUPERPACT in ${payload.gameTitle}!`,
        time: "Just now",
        unread: 0,
        online: true,
      };
      setMatches(prev => [newMatch, ...prev]);

      // Seed chat with SUPERPACT challenge message
      setChatMessages(prev => ({
        ...prev,
        [newMatch.id]: [
          {
            id: `m-sp-${Date.now()}`,
            sender: 'me',
            type: 'game_invite',
            gameTitle: payload.gameTitle,
            gameType: payload.gameType,
            text: `I launched a SUPERPACT challenge in ${payload.gameTitle}! My turn is locked in (${payload.lockedScore}). Your turn to counter!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }));
    }
  };

  // Notifications Actions
  const handleAcceptPact = (notif) => {
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, status: 'accepted', unread: false } : n));
    
    // Add to matches if not present
    const existing = matches.find(m => m.profile.id === notif.sender.id);
    const matchId = existing ? existing.id : `match-${notif.sender.id}`;
    if (!existing) {
      const newMatch = {
        id: matchId,
        profile: notif.sender,
        lastMessage: "Pact accepted! Say hello or launch a duel.",
        time: "Just now",
        unread: 0,
        online: true,
      };
      setMatches(prev => [newMatch, ...prev]);
    }
    setActiveMatchId(matchId);
    setIsNotificationsOpen(false);
  };

  const handleDismissPact = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, status: 'declined', unread: false } : n));
  };

  const handleAcceptSuperpact = (notif) => {
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, status: 'accepted', unread: false } : n));
    setIsNotificationsOpen(false);

    // Launch Game directly into Round 2 counter mode!
    setActiveGame({
      type: notif.gameType,
      title: notif.gameTitle,
      partner: notif.sender,
      counterChallengeData: notif
    });
  };

  const handleDeclineSuperpact = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, status: 'declined', unread: false } : n));
  };

  // Chat message send
  const handleSendMessage = (message) => {
    if (!activeMatchId) return;

    setChatMessages(prev => ({
      ...prev,
      [activeMatchId]: [...(prev[activeMatchId] || []), message]
    }));

    setMatches(prev => prev.map(m => {
      if (m.id === activeMatchId) {
        return {
          ...m,
          lastMessage: message.text || message.caption || (message.type === 'sticker' ? '🎨 Sent a doodle' : 'Sent a media note'),
          time: 'Just now'
        };
      }
      return m;
    }));

    // Simulated responsive reply
    if (message.text && !message.text.startsWith('I challenge')) {
      setTimeout(() => {
        const responses = [
          "Haha totally agree! Have you tried climbing outdoor routes yet?",
          "That's so true. Also I demand a rematch on Number Duel!",
          "Wait, you're into modular synths too?! That's so rare.",
          "We should collaborate on that shared canvas again soon!",
          "100%! Ready for another round whenever you are 🔥"
        ];
        const replyText = responses[Math.floor(Math.random() * responses.length)];
        const replyMsg = {
          id: `m-reply-${Date.now()}`,
          sender: 'them',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatMessages(prev => ({
          ...prev,
          [activeMatchId]: [...(prev[activeMatchId] || []), replyMsg]
        }));
      }, 1300);
    }
  };

  const handleExportGameToChat = (payload) => {
    let targetMatchId = activeMatchId;
    if (!targetMatchId && payload?.partner) {
      const foundMatch = matches.find(m => m.profile?.name === payload.partner?.name || m.profile?.id === payload.partner?.id);
      if (foundMatch) targetMatchId = foundMatch.id;
    }
    if (!targetMatchId && matches[0]) {
      targetMatchId = matches[0].id;
    }
    if (!targetMatchId) return;

    const message = {
      id: `m-export-${Date.now()}`,
      sender: payload.sender || 'user',
      type: payload.type || 'meme',
      stickerUrl: payload.stickerUrl,
      imageUrl: payload.imageUrl || payload.memeUrl,
      memeUrl: payload.imageUrl || payload.memeUrl,
      text: payload.text || payload.title || 'Shared game achievement exported to chat!',
      title: payload.title || payload.text,
      subtext: payload.subtext || payload.caption || '',
      caption: payload.caption || payload.subtext,
      fallbackColor: payload.fallbackColor || (payload.isWinner ? 'from-purple-900/60 to-slate-900' : 'from-rose-900/60 to-slate-900'),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => ({
      ...prev,
      [targetMatchId]: [...(prev[targetMatchId] || []), message]
    }));

    // Reciprocal opponent banter reaction (dispatched 2s later)
    if (payload.type === 'meme' && payload.isWinner !== undefined) {
      setTimeout(() => {
        const oppData = payload.isWinner
          ? POST_GAME_MEMES.opponentRealityCheck
          : POST_GAME_MEMES.opponentTaunt;

        const oppReply = {
          id: `m-opp-${Date.now()}`,
          sender: 'partner',
          type: 'meme',
          text: oppData.text,
          title: oppData.title,
          subtext: oppData.subtext,
          caption: oppData.caption,
          imageUrl: oppData.imageUrl,
          memeUrl: oppData.imageUrl,
          fallbackColor: oppData.fallbackColor,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatMessages(prev => ({
          ...prev,
          [targetMatchId]: [...(prev[targetMatchId] || []), oppReply]
        }));
      }, 2000);
    }
  };

  // If no persistent user session or onboarding incomplete, render Auth / Onboarding
  if (!user || !user.onboardingComplete) {
    return <AuthModal onLoginSuccess={(u) => setUser(u)} />;
  }

  return (
    <div className="min-h-screen bg-[#0B0A10] text-slate-100 flex overflow-x-hidden font-sans relative selection:bg-rose-500 selection:text-white">
      {/* Energetic Ambient Radial Glows */}
      <div className="fixed top-1/4 left-1/4 w-[450px] h-[450px] bg-[#F59E0B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#FF3366]/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D946EF]/8 rounded-full blur-[180px] pointer-events-none" />

      {/* Animated Floating Confirmation Banner (SUPERPACT Sent) */}
      <AnimatePresence>
        {floatingBanner && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white font-extrabold text-xs sm:text-sm shadow-2xl shadow-pink-500/40 flex items-center gap-2 border border-white/20 backdrop-blur-md"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>{floatingBanner}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Left Fixed Sidebar */}
      <Sidebar
        user={user}
        onSignOut={handleSignOut}
        currentChannel={currentChannel}
        onSelectChannel={(ch) => {
          setCurrentChannel(ch);
          setActiveMatchId(null);
        }}
        matches={matches}
        activeMatchId={activeMatchId}
        onSelectMatch={(matchId) => {
          setActiveMatchId(matchId);
        }}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        unreadNotifCount={unreadNotifCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenEditProfile={() => setIsEditProfileOpen(true)}
      />

      {/* 2. Main Content Viewport */}
      <main className="flex-1 lg:ml-80 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <header className="h-14 px-4 bg-sidebarBg/70 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5">
              <img src="/pact-logo.png" alt="Pact Logo" className="w-7 h-7 object-contain drop-shadow" />
              <span className="font-extrabold text-sm text-white tracking-wide">
                PACT
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            {/* Top Bar Notification Bell with counter */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Affecio Hacks ’26</span>
            </span>

            <div className="px-2.5 py-1 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold">
              Forged in Play
            </div>
          </div>
        </header>

        {/* Dynamic Route View */}
        <div className="flex-1 flex flex-col p-2 sm:p-4 relative">
          {activeMatchId && activeMatch ? (
            <ChatRoom
              match={activeMatch}
              messages={chatMessages[activeMatchId] || []}
              onSendMessage={handleSendMessage}
              onLaunchGame={(game) => {
                setActiveGame({
                  ...game,
                  partner: activeMatch.profile,
                });
              }}
              onBack={() => setActiveMatchId(null)}
            />
          ) : currentChannel === 'deck' ? (
            <Deck
              user={user}
              profiles={activePools.deckProfiles}
              onPass={handlePass}
              onLike={handleLike}
              onSuperpact={handleSuperpactClick}
              onOpenEditProfile={() => setIsEditProfileOpen(true)}
            />
          ) : currentChannel === 'arcade' ? (
            <ArcadeView
              onStartGameWithOpponent={(opponent, gameType = 'akinator', gameTitle = 'AI Akinator Guess') => {
                setActiveGame({
                  type: gameType,
                  title: gameTitle,
                  partner: opponent,
                });
              }}
            />
          ) : currentChannel === 'feed' ? (
            <VibeFeed
              onOpenCanvas={() => {
                setActiveGame({
                  type: 'shared_canvas',
                  title: 'Collaborative Shared Canvas',
                  partner: activePools.deckProfiles[0],
                });
              }}
            />
          ) : currentChannel === 'daily' ? (
            <DailyPicks
              user={user}
              profiles={activePools.sparksProfiles}
              onChallengeProfile={handleSuperpactClick}
              onMatchProfile={handleLike}
              onOpenEditProfile={() => setIsEditProfileOpen(true)}
            />
          ) : null}
        </div>
      </main>

      {/* 3. Global Overlay Mini-Game Modal */}
      {activeGame && (
        <GameModal
          game={activeGame}
          partner={activeGame.partner || activePools.deckProfiles[0]}
          onClose={() => setActiveGame(null)}
          onExportToChat={handleExportGameToChat}
          counterChallengeData={activeGame.counterChallengeData}
        />
      )}

      {/* 4. Async SUPERPACT Challenge Dispatch Modal */}
      {superpactTarget && (
        <AsyncChallengeModal
          targetProfile={superpactTarget}
          onClose={() => setSuperpactTarget(null)}
          onDispatchSuperpact={handleDispatchSuperpact}
        />
      )}

      {/* 5. Notifications & Challenges Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onAcceptPact={handleAcceptPact}
        onDismissPact={handleDismissPact}
        onAcceptSuperpact={handleAcceptSuperpact}
        onDeclineSuperpact={handleDeclineSuperpact}
      />

      {/* 6. In-Depth Profile Edit Drawer */}
      <EditProfileDrawer
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        user={user}
        onSaveUser={(updatedUser) => {
          setUser(updatedUser);
        }}
      />
    </div>
  );
}
