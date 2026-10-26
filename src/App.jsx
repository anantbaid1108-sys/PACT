import React, { useState } from 'react';
import { Menu, Zap, Sparkles, MessageCircle } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Deck from './components/Deck';
import ChatRoom from './components/ChatRoom';
import GameModal from './components/GameModal';
import ArcadeView from './components/ArcadeView';
import VibeFeed from './components/VibeFeed';
import DailyPicks from './components/DailyPicks';
import { 
  PROFILES, 
  INITIAL_MATCHES, 
  INITIAL_CHAT_MESSAGES 
} from './mockData';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentChannel, setCurrentChannel] = useState('deck');
  const [matches, setMatches] = useState(INITIAL_MATCHES);
  const [activeMatchId, setActiveMatchId] = useState(null);
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);
  const [activeGame, setActiveGame] = useState(null); // { type, title, partner }
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Active match object
  const activeMatch = matches.find(m => m.id === activeMatchId);

  // Handlers for Deck actions
  const handlePass = (profile) => {
    // profile skipped
  };

  const handleLike = (profile) => {
    // Check if match already exists
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

      // Seed initial welcoming message
      setChatMessages(prev => ({
        ...prev,
        [newMatch.id]: [
          {
            id: `m-init-${Date.now()}`,
            sender: 'them',
            text: `Hey! Excited we matched on ${profile.interests[0] || 'our vibes'}. Are you down for a quick challenge?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }));

      // Switch to match chat
      setActiveMatchId(newMatch.id);
    }
  };

  const handleInstantChallenge = (profile) => {
    setActiveGame({
      type: 'number_duel',
      title: 'Number Duel (1 to 100)',
      partner: profile,
    });
  };

  const handleSendMessage = (message) => {
    if (!activeMatchId) return;

    setChatMessages(prev => ({
      ...prev,
      [activeMatchId]: [...(prev[activeMatchId] || []), message]
    }));

    // Update last message in sidebar
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

    // Simulated responsive banter from match
    if (message.text && !message.text.startsWith('I challenge')) {
      setTimeout(() => {
        const responses = [
          "Haha totally agree! Have you played Hades II yet?",
          "That's so true. Also I demand a rematch on Number Duel!",
          "Wait, you're into modular synths too?! That's so rare.",
          "We should collaborate on that shared canvas again soon!",
          "100%! What's your top game of all time?"
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
      }, 1400);
    }
  };

  const handleExportGameToChat = (payload) => {
    const targetMatchId = activeMatchId || (matches[0] && matches[0].id);
    if (!targetMatchId) return;

    const message = {
      id: `m-export-${Date.now()}`,
      sender: 'me',
      type: payload.type || 'sticker',
      stickerUrl: payload.stickerUrl,
      text: payload.caption || 'Shared game achievement exported to chat!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => ({
      ...prev,
      [targetMatchId]: [...(prev[targetMatchId] || []), message]
    }));
  };

  return (
    <div className="min-h-screen bg-darkBg text-slate-100 flex overflow-x-hidden font-sans">
      {/* 1. Left Fixed Sidebar */}
      <Sidebar
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
      />

      {/* 2. Main Content Viewport */}
      <main className="flex-1 lg:ml-80 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Bar for Mobile & Quick Status */}
        <header className="h-14 px-4 bg-sidebarBg/70 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between lg:justify-end shrink-0 z-20">
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

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Affecio Hacks ’26</span>
            </span>
            <div className="px-2.5 py-1 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
              Problem #6: Make Connection an Experience
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
              profiles={PROFILES}
              onPass={handlePass}
              onLike={handleLike}
              onInstantChallenge={handleInstantChallenge}
            />
          ) : currentChannel === 'arcade' ? (
            <ArcadeView
              onStartGameWithOpponent={(opponent) => {
                setActiveGame({
                  type: 'number_duel',
                  title: 'Number Duel (1 to 100)',
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
                  partner: PROFILES[0],
                });
              }}
            />
          ) : currentChannel === 'daily' ? (
            <DailyPicks
              onChallengeProfile={handleInstantChallenge}
              onMatchProfile={handleLike}
            />
          ) : null}
        </div>
      </main>

      {/* 3. Global Overlay Game Modal */}
      {activeGame && (
        <GameModal
          game={activeGame}
          partner={activeGame.partner || PROFILES[0]}
          onClose={() => setActiveGame(null)}
          onExportToChat={handleExportGameToChat}
        />
      )}
    </div>
  );
}
