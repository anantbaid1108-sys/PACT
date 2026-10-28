import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  HelpCircle, 
  Send, 
  Sparkles, 
  Trophy, 
  RotateCcw, 
  Share2, 
  CheckCircle2, 
  XCircle,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import PlayfulBanterDrawer from './PlayfulBanterDrawer';
import { POST_GAME_MEMES } from '../mockData';

const CELEBRITY_SECRET_POOL = [
  { name: "Michael Jackson", hint: "Music Legend / King of Pop", category: "Music" },
  { name: "Gojo Satoru", hint: "Anime Sorcerer / Six Eyes / Blindfold", category: "Anime" },
  { name: "Lionel Messi", hint: "World Champion Footballer / 8 Ballon d'Or", category: "Sports" },
  { name: "Spider-Man", hint: "Marvel Web-Slinger / Peter Parker", category: "Cinema / Comics" },
  { name: "Taylor Swift", hint: "Pop Superstar / The Eras Tour", category: "Music" },
  { name: "MrBeast", hint: "YouTube Philanthropist / Extreme Challenges", category: "YouTube" },
  { name: "Tony Stark", hint: "Marvel Hero / Iron Man / Billionaire", category: "Cinema" },
  { name: "Son Goku", hint: "Dragon Ball Z / Saiyan Warrior", category: "Anime" }
];

export default function TwentyQuestions({ 
  partner, 
  onClose, 
  onExportToChat 
}) {
  const partnerName = partner?.name || 'Partner';
  const [banterDrawerOpen, setBanterDrawerOpen] = useState(false);

  // Secret identities:
  // Secret A is assigned to You, but displayed ONLY to Partner.
  // Secret B is assigned to Partner, but displayed ONLY to You.
  const [secretIdentityA, setSecretIdentityA] = useState(() => CELEBRITY_SECRET_POOL[0]);
  const [secretIdentityB, setSecretIdentityB] = useState(() => CELEBRITY_SECRET_POOL[1]);

  const [questionTokens, setQuestionTokens] = useState(20);
  const [activeTurn, setActiveTurn] = useState('user'); // 'user' | 'partner'
  const [awaitingAnswer, setAwaitingAnswer] = useState(false);
  const [currentPendingQuestion, setCurrentPendingQuestion] = useState(null);
  const [inputQuestion, setInputQuestion] = useState('');
  const [guessInput, setGuessInput] = useState('');
  const [solveMode, setSolveMode] = useState(false);
  
  // Game Termination State
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null); // 'You' | partnerName
  const [solvedWord, setSolvedWord] = useState('');

  // Relay Log
  const [relayLog, setRelayLog] = useState([
    { asker: partnerName, question: "Am I a real-life human being?", answer: "Yes", time: "Start" }
  ]);

  // Points
  const [scoreEarned, setScoreEarned] = useState(0);

  // Restart
  const handleRestart = () => {
    const pool = [...CELEBRITY_SECRET_POOL].sort(() => 0.5 - Math.random());
    setSecretIdentityA(pool[0]);
    setSecretIdentityB(pool[1]);
    setQuestionTokens(20);
    setActiveTurn('user');
    setAwaitingAnswer(false);
    setCurrentPendingQuestion(null);
    setInputQuestion('');
    setGuessInput('');
    setSolveMode(false);
    setGameOver(false);
    setWinner(null);
    setSolvedWord('');
    setScoreEarned(0);
    setRelayLog([
      { asker: partnerName, question: "Am I a real-life human being?", answer: "Yes", time: "Start" }
    ]);
  };

  // Immediate Victory Trigger on Correct Guess
  const triggerVictory = (winningPlayer, targetIdentityName) => {
    setGameOver(true);
    setWinner(winningPlayer);
    setSolvedWord(targetIdentityName);
    setAwaitingAnswer(false);
    setCurrentPendingQuestion(null);
    setSolveMode(false);

    const calculatedPoints = Math.max(150, questionTokens * 25 + 200);
    setScoreEarned(calculatedPoints);

    // Instant celebration explosion
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.55 }
    });
  };

  // Step 1: User submits question
  const handleUserAskSubmit = (e) => {
    e?.preventDefault();
    if (!inputQuestion.trim() || questionTokens <= 0 || gameOver || awaitingAnswer) return;

    const q = inputQuestion.trim();
    setInputQuestion('');
    setCurrentPendingQuestion({ asker: 'You', question: q });
    setAwaitingAnswer(true);

    // Deduct 1 token
    setQuestionTokens(prev => Math.max(0, prev - 1));

    // Simulated partner receives question and replies with instant pill
    setTimeout(() => {
      if (gameOver) return; // Prevent state leak if already won
      const simulatedReplies = ['Yes', 'Partially', 'No'];
      const reply = simulatedReplies[Math.floor(Math.random() * simulatedReplies.length)];
      
      appendRelay('You', q, reply);
      setAwaitingAnswer(false);
      setCurrentPendingQuestion(null);

      // Now partner asks a question
      setActiveTurn('partner');
      triggerPartnerTurn();
    }, 1200);
  };

  const triggerPartnerTurn = () => {
    if (gameOver) return;
    setTimeout(() => {
      if (gameOver) return;
      const partnerQs = [
        "Do I possess superhuman or mystical abilities?",
        "Am I globally recognized in modern pop culture?",
        "Am I associated with sports or competitive athletics?",
        "Do I wear an iconic costume, mask, or trademark outfit?"
      ];
      const selectedQ = partnerQs[Math.floor(Math.random() * partnerQs.length)];
      setCurrentPendingQuestion({ asker: partnerName, question: selectedQ });
      setAwaitingAnswer(true);

      // Random chance partner guesses correctly after several questions
      if (questionTokens <= 14 && Math.random() > 0.65) {
        setTimeout(() => {
          triggerVictory(partnerName, secretIdentityB.name);
        }, 1800);
      }
    }, 1000);
  };

  // Step 2: User answers partner's question
  const handleAnswerPartnerQuestion = (pillAnswer) => {
    if (!currentPendingQuestion || gameOver) return;
    appendRelay(partnerName, currentPendingQuestion.question, pillAnswer);
    setAwaitingAnswer(false);
    setCurrentPendingQuestion(null);
    setActiveTurn('user');
    setQuestionTokens(prev => Math.max(0, prev - 1));
  };

  const appendRelay = (asker, question, answer) => {
    setRelayLog(prev => [
      {
        asker,
        question,
        answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      ...prev
    ]);
  };

  // User submits Final Persona Guess
  const handleFinalGuess = (e) => {
    e?.preventDefault();
    if (!guessInput.trim() || gameOver) return;

    const guess = guessInput.trim().toLowerCase();
    const targetName = secretIdentityA.name.toLowerCase();

    // Check if correct (fuzzy matches first/last name)
    const parts = targetName.split(' ').filter(p => p.length > 2);
    const isCorrect = guess === targetName || parts.some(p => guess.includes(p));

    if (isCorrect) {
      triggerVictory('You', secretIdentityA.name);
    } else {
      // Penalty of 2 tokens for incorrect guess
      setQuestionTokens(prev => Math.max(0, prev - 2));
      alert(`Wrong deduction! That penalty cost 2 questions. Keep asking!`);
      setGuessInput('');
      setSolveMode(false);
    }
  };

  const handleExportBanterMeme = (isWinner) => {
    setBanterDrawerOpen(true);
  };

  const isUserWinner = winner === 'You';

  return (
    <div className="max-w-3xl mx-auto space-y-5 text-left">
      {/* ------------------------------------------------------------- */}
      {/* Header Info & Token Counter                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="p-4 rounded-3xl bg-slate-900/90 border border-white/10 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-xl shadow-md">
            ❓
          </div>
          <div>
            <h3 className="text-sm font-black text-white">20 Questions Co-Op</h3>
            <p className="text-xs text-slate-400">
              Symmetric mystery figures. Inquire carefully and crack the identity!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-950 border border-white/10">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-black text-amber-300">
              Tokens: {questionTokens} / 20
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-white">
            Turn: <strong className={activeTurn === 'user' ? 'text-emerald-400' : 'text-amber-400'}>
              {gameOver ? 'Game Over' : (activeTurn === 'user' ? 'Your Move' : `${partnerName}'s Move`)}
            </strong>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Symmetric Secret Identity Cards                               */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Your Secret Identity (Hidden from you unless game over) */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-amber-400/30">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
            Your Secret Identity
          </span>
          <h4 className="text-sm font-bold text-white mt-1">
            {gameOver && winner === 'You' ? (
              <span className="text-emerald-400">🎯 {secretIdentityA.name} ({secretIdentityA.category})</span>
            ) : (
              "🔒 [Hidden from You - Inquire to Deduce]"
            )}
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Only {partnerName} knows this! Ask Yes/No questions to find out.
          </p>
        </div>

        {/* Partner's Secret Identity (Visible to you) */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/30">
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block">
            You Know {partnerName}'s Secret!
          </span>
          <h4 className="text-sm font-bold text-white mt-1">
            🎯 {secretIdentityB.name}
          </h4>
          <p className="text-[11px] text-rose-300/80 mt-0.5">
            Hint: {secretIdentityB.hint}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Active Questioning State & Instant Win Handling                */}
      {/* ------------------------------------------------------------- */}
      {!gameOver ? (
        <div className="space-y-4">
          {/* User's Turn to Ask */}
          {activeTurn === 'user' && !awaitingAnswer && (
            <div className="space-y-3">
              <form onSubmit={handleUserAskSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a Yes/No question (e.g. 'Am I a music icon?')..."
                  value={inputQuestion}
                  onChange={(e) => setInputQuestion(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 text-white font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  Ask
                </button>
              </form>

              {/* Ready to Solve Trigger */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setSolveMode(!solveMode)}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4"
                >
                  {solveMode ? "Back to Inquiry Questions" : "Ready to Solve? Make Final Deduction 🎯"}
                </button>
              </div>
            </div>
          )}

          {/* Final Guess Input Form */}
          {solveMode && activeTurn === 'user' && (
            <form onSubmit={handleFinalGuess} className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 to-rose-500/15 border border-amber-400/40 flex items-center gap-2 animate-fade">
              <input
                type="text"
                placeholder="Type your final identity guess (e.g. 'Michael Jackson')..."
                value={guessInput}
                onChange={(e) => setGuessInput(e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                Solve Now!
              </button>
            </form>
          )}

          {/* Instant Response Pills when Partner Asks */}
          {currentPendingQuestion && currentPendingQuestion.asker === partnerName && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/40 space-y-2 animate-fade">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block">
                {partnerName} asks about their identity ({secretIdentityB.name}):
              </span>
              <h4 className="text-sm font-bold text-white">"{currentPendingQuestion.question}"</h4>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => handleAnswerPartnerQuestion('Yes')}
                  className="flex-1 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all hover:scale-105 active:scale-95"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAnswerPartnerQuestion('No')}
                  className="flex-1 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all hover:scale-105 active:scale-95"
                >
                  No
                </button>
                <button
                  onClick={() => handleAnswerPartnerQuestion('Partially')}
                  className="flex-1 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all hover:scale-105 active:scale-95"
                >
                  Partially
                </button>
              </div>
            </div>
          )}

          {/* Waiting Feedback */}
          {awaitingAnswer && currentPendingQuestion?.asker === 'You' && (
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-center text-xs text-amber-300 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Waiting for {partnerName}'s rapid response...</span>
            </div>
          )}
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* INSTANT GAME OVER & BANTER MEMES SCREEN                       */
        /* ------------------------------------------------------------- */
        <div className="p-6 rounded-3xl bg-slate-900/95 border border-white/15 text-center space-y-6 shadow-2xl animate-fade">
          <div className="space-y-2">
            <Trophy className="w-14 h-14 mx-auto text-amber-400 animate-bounce" />
            <h2 className="text-2xl font-black text-white">
              {isUserWinner ? "VICTORY! You Cracked Your Identity!" : `${partnerName} Cracked The Identity!`}
            </h2>
            <p className="text-xs text-emerald-300">
              {isUserWinner 
                ? `You correctly deduced that you were ${solvedWord}! (+${scoreEarned} pts)` 
                : `${partnerName} deduced their secret identity first!`}
            </p>
          </div>

          {/* Winner vs Loser Banter Meme Cards */}
          {isUserWinner ? (
            <div className="p-4 rounded-3xl bg-gradient-to-b from-purple-950/40 to-slate-950 border border-purple-500/40 text-left space-y-3 shadow-2xl max-w-md mx-auto">
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
            <div className="p-4 rounded-3xl bg-gradient-to-b from-rose-950/40 to-slate-950 border border-rose-500/40 text-left space-y-3 shadow-2xl max-w-md mx-auto">
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

          {/* Action Buttons: Rematch & Send Banter */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
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

      {/* ------------------------------------------------------------- */}
      {/* Inquiry Relay History Stream                                  */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-1.5 max-h-52 overflow-y-auto pt-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block pb-1">
          Inquiry History Relay
        </span>
        {relayLog.map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">
              <strong>{item.asker}:</strong> "{item.question}"
            </span>
            <span className={`px-2.5 py-0.5 rounded-md font-bold text-xs ${
              item.answer === 'Yes' ? 'bg-emerald-500/20 text-emerald-300' :
              item.answer === 'No' ? 'bg-rose-500/20 text-rose-300' :
              'bg-amber-500/20 text-amber-300'
            }`}>
              {item.answer}
            </span>
          </div>
        ))}
      </div>

      {/* Playful Banter Drawer */}
      <PlayfulBanterDrawer
        isOpen={banterDrawerOpen}
        onClose={() => setBanterDrawerOpen(false)}
        isWinner={isUserWinner}
        partnerName={partnerName}
        gameTitle="20 Questions Co-Op"
        onSendBanter={(meme) => {
          if (onExportToChat) {
            onExportToChat({
              ...meme,
              partner,
              sender: 'user',
              gameTitle: '20 Questions Co-Op'
            });
          }
        }}
      />
    </div>
  );
}
