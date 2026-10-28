import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Trophy, 
  RotateCcw, 
  Send, 
  Sparkles, 
  Palette, 
  CheckCircle2, 
  ArrowUp, 
  ArrowDown, 
  Zap, 
  Clock,
  Play,
  Flame,
  HelpCircle,
  Undo2,
  Trash2,
  Share2,
  Gamepad2,
  Bot,
  User,
  ShieldCheck,
  AlertCircle,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import DoodleDuel from './DoodleDuel';
import TwentyQuestions from './TwentyQuestions';
import PlayfulBanterDrawer from './PlayfulBanterDrawer';
import { POST_GAME_MEMES } from '../mockData';

// =========================================================================
// 1. EXPANDED 33+ CHARACTER DATASET FOR UNLIMITED AKINATOR DEDUCTION
// =========================================================================
export const AKINATOR_CHARACTERS = [
  // Anime / Manga (8)
  {
    id: 'gojo',
    name: 'Gojo Satoru',
    category: 'Anime / Jujutsu Kaisen',
    photo: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: false, isAnime: true, isYouTuber: false, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: true, playsFootball: false, usesMagic: true,
      isFictional: true, fromJapan: true, richOrBillionaire: false, blindfoldOrMask: true,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'goku',
    name: 'Son Goku',
    category: 'Anime / Dragon Ball Z',
    photo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: false, isAnime: true, isYouTuber: false, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: true, playsFootball: false, usesMagic: false,
      isFictional: true, fromJapan: true, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'luffy',
    name: 'Monkey D. Luffy',
    category: 'Anime / One Piece',
    photo: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: false, isAnime: true, isYouTuber: false, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: true, playsFootball: false, usesMagic: false,
      isFictional: true, fromJapan: true, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'naruto',
    name: 'Naruto Uzumaki',
    category: 'Anime / Naruto Shippuden',
    photo: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: false, isAnime: true, isYouTuber: false, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: true, playsFootball: false, usesMagic: true,
      isFictional: true, fromJapan: true, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'levi',
    name: 'Levi Ackerman',
    category: 'Anime / Attack on Titan',
    photo: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: false, isAnime: true, isYouTuber: false, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: true, fromJapan: true, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: true, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'eren',
    name: 'Eren Yeager',
    category: 'Anime / Attack on Titan',
    photo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: false, isAnime: true, isYouTuber: false, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: true, playsFootball: false, usesMagic: false,
      isFictional: true, fromJapan: true, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: true, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'tanjiro',
    name: 'Tanjiro Kamado',
    category: 'Anime / Demon Slayer',
    photo: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: false, isAnime: true, isYouTuber: false, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: true, playsFootball: false, usesMagic: false,
      isFictional: true, fromJapan: true, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: true, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'sailormoon',
    name: 'Sailor Moon (Usagi Tsukino)',
    category: 'Anime / Magical Girl Icon',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: false, isAnime: true, isYouTuber: false, isAthlete: false, isMusician: false,
      isFemale: true, hasSuperpowers: true, playsFootball: false, usesMagic: true,
      isFictional: true, fromJapan: true, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },

  // YouTube / Creators (6)
  {
    id: 'mrbeast',
    name: 'MrBeast (Jimmy Donaldson)',
    category: 'Creator / YouTube Philanthropy',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: true, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: true, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'pewdiepie',
    name: 'PewDiePie (Felix Kjellberg)',
    category: 'Creator / Gaming Legend',
    photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: true, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: true, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'ishowspeed',
    name: 'IShowSpeed (Darren Watkins Jr.)',
    category: 'Creator / Livestreamer',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: true, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: false, playsFootball: true, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'markiplier',
    name: 'Markiplier (Mark Fischbach)',
    category: 'Creator / Horror & Cinema',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: true, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'kaicenat',
    name: 'Kai Cenat',
    category: 'Creator / Streamer of the Year',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: true, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'pokimane',
    name: 'Pokimane (Imane Anys)',
    category: 'Creator / Twitch Pioneer',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: true, isAthlete: false, isMusician: false,
      isFemale: true, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },

  // Athletes (6)
  {
    id: 'messi',
    name: 'Lionel Messi',
    category: 'Sports / Football (Soccer) GOAT',
    photo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: false, isAthlete: true, isMusician: false,
      isFemale: false, hasSuperpowers: false, playsFootball: true, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: true, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'ronaldo',
    name: 'Cristiano Ronaldo',
    category: 'Sports / Football Icon',
    photo: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: false, isAthlete: true, isMusician: false,
      isFemale: false, hasSuperpowers: false, playsFootball: true, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: true, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'kohli',
    name: 'Virat Kohli',
    category: 'Sports / Cricket Legend',
    photo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: false, isAthlete: true, isMusician: false,
      isFemale: false, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: true, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'lebron',
    name: 'LeBron James',
    category: 'Sports / Basketball King',
    photo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: false, isAthlete: true, isMusician: false,
      isFemale: false, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: true, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: true
    }
  },
  {
    id: 'serena',
    name: 'Serena Williams',
    category: 'Sports / Tennis Legend',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: false, isAthlete: true, isMusician: false,
      isFemale: true, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: true, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'jordan',
    name: 'Michael Jordan',
    category: 'Sports / NBA GOAT & Billionaire',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: false, isAthlete: true, isMusician: false,
      isFemale: false, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: true, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: true
    }
  },

  // Cinema / Fiction (6)
  {
    id: 'batman',
    name: 'Batman (Bruce Wayne)',
    category: 'Fiction / DC Comics',
    photo: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: false, isAnime: false, isYouTuber: false, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: true, fromJapan: false, richOrBillionaire: true, blindfoldOrMask: true,
      playsCricket: false, fromMarvelDC: true, hasSwordOrWeapon: true, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'ironman',
    name: 'Tony Stark (Iron Man)',
    category: 'Fiction / Marvel Studios',
    photo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: false, isAnime: false, isYouTuber: false, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: true, fromJapan: false, richOrBillionaire: true, blindfoldOrMask: true,
      playsCricket: false, fromMarvelDC: true, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'harry',
    name: 'Harry Potter',
    category: 'Fiction / Wizarding World',
    photo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: false, isAnime: false, isYouTuber: false, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: true, playsFootball: false, usesMagic: true,
      isFictional: true, fromJapan: false, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'spiderman',
    name: 'Spider-Man (Peter Parker)',
    category: 'Fiction / Marvel Comics',
    photo: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: false, isAnime: false, isYouTuber: false, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: true, playsFootball: false, usesMagic: false,
      isFictional: true, fromJapan: false, richOrBillionaire: false, blindfoldOrMask: true,
      playsCricket: false, fromMarvelDC: true, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'keanu',
    name: 'Keanu Reeves (John Wick / Neo)',
    category: 'Cinema / Action Icon',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: false, isAthlete: false, isMusician: false,
      isFemale: false, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: true, isGrammyWinner: false,
      playsBasketball: false
    }
  },
  {
    id: 'zendaya',
    name: 'Zendaya',
    category: 'Cinema / Emmy-Winning Actress',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: false, isAthlete: false, isMusician: false,
      isFemale: true, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: false,
      playsBasketball: false
    }
  },

  // Music (7)
  {
    id: 'taylor',
    name: 'Taylor Swift',
    category: 'Music / Pop & Country Icon',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: false, isAthlete: false, isMusician: true,
      isFemale: true, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: true, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: true,
      playsBasketball: false
    }
  },
  {
    id: 'mj',
    name: 'Michael Jackson',
    category: 'Music / King of Pop',
    photo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: false, isAthlete: false, isMusician: true,
      isFemale: false, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: true, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: true,
      playsBasketball: false
    }
  },
  {
    id: 'billie',
    name: 'Billie Eilish',
    category: 'Music / Alt-Pop Superstar',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: false, isAthlete: false, isMusician: true,
      isFemale: true, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: true,
      playsBasketball: false
    }
  },
  {
    id: 'weeknd',
    name: 'The Weeknd (Abel Tesfaye)',
    category: 'Music / R&B & Synth-Pop Icon',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: false, isAthlete: false, isMusician: true,
      isFemale: false, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: true, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: true,
      playsBasketball: false
    }
  },
  {
    id: 'drake',
    name: 'Drake (Aubrey Graham)',
    category: 'Music / Hip-Hop & Rap Titan',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: false, isAthlete: false, isMusician: true,
      isFemale: false, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: true, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: true,
      playsBasketball: false
    }
  },
  {
    id: 'beyonce',
    name: 'Beyoncé (Queen Bey)',
    category: 'Music / Cultural Icon & 32x Grammy Winner',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: false, isAthlete: false, isMusician: true,
      isFemale: true, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: true, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: true,
      playsBasketball: false
    }
  },
  {
    id: 'freddie',
    name: 'Freddie Mercury',
    category: 'Music / Queen Frontman & Rock Legend',
    photo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
    traits: {
      isReal: true, isAnime: false, isYouTuber: false, isAthlete: false, isMusician: true,
      isFemale: false, hasSuperpowers: false, playsFootball: false, usesMagic: false,
      isFictional: false, fromJapan: false, richOrBillionaire: false, blindfoldOrMask: false,
      playsCricket: false, fromMarvelDC: false, hasSwordOrWeapon: false, isGrammyWinner: true,
      playsBasketball: false
    }
  }
];

// 18 Highly-Differentiating Traits to dynamically ask questions
const AKINATOR_TRAIT_QUESTIONS = [
  { trait: 'isReal', question: "Is your character a real-life living or historical person?" },
  { trait: 'isAnime', question: "Is your character from an anime or manga universe?" },
  { trait: 'isAthlete', question: "Is your character a world-class professional athlete?" },
  { trait: 'isYouTuber', question: "Is your character famous as a YouTuber or live-streamer?" },
  { trait: 'hasSuperpowers', question: "Does your character have supernatural abilities or superpowers?" },
  { trait: 'isFemale', question: "Is your character female?" },
  { trait: 'isMusician', question: "Is your character famous for music, albums, or singing?" },
  { trait: 'playsFootball', question: "Does your character play professional football (soccer)?" },
  { trait: 'usesMagic', question: "Does your character use magic, spells, or jutsu?" },
  { trait: 'richOrBillionaire', question: "Is your character known for immense wealth or being a billionaire?" },
  { trait: 'fromMarvelDC', question: "Is your character a superhero from Marvel or DC Comics?" },
  { trait: 'fromJapan', question: "Is your character from Japan or based in Japan?" },
  { trait: 'playsCricket', question: "Does your character play international cricket?" },
  { trait: 'playsBasketball', question: "Is your character an NBA basketball superstar?" },
  { trait: 'blindfoldOrMask', question: "Does your character wear a mask, helmet, or blindfold?" },
  { trait: 'hasSwordOrWeapon', question: "Does your character fight with blades, swords, or lethal gear?" },
  { trait: 'isGrammyWinner', question: "Has your character won Grammy Awards for their music?" },
  { trait: 'isFictional', question: "Is your character completely fictional?" }
];

export const HIGH_CONTRAST_COLORS_12 = [
  '#FFFFFF', '#000000', '#FF3366', '#F59E0B', 
  '#10B981', '#06B6D4', '#3B82F6', '#8B5CF6', 
  '#EC4899', '#84CC16', '#F97316', '#E2E8F0'
];

export default function GameModal({ 
  game, 
  partner, 
  onClose, 
  onExportToChat,
  counterChallengeData = null 
}) {
  const normalizeTab = (type) => {
    if (type === 'persona_guess') return 'akinator';
    if (type === 'canvas' || type === 'collaborative_canvas') return 'shared_canvas';
    if (type === 'twenty_questions') return 'twenty_q';
    return type || 'akinator';
  };

  const [activeTab, setActiveTab] = useState(() => normalizeTab(game?.type));
  const partnerName = partner?.name || 'Partner';

  // =========================================================================
  // 1. UNLIMITED AI AKINATOR ENGINE (NO 10-QUESTION CAP)
  // =========================================================================
  const [candidateWeights, setCandidateWeights] = useState(() => {
    const initial = {};
    AKINATOR_CHARACTERS.forEach(c => { initial[c.id] = 10.0; });
    return initial;
  });
  const [askedTraits, setAskedTraits] = useState([]);
  const [akinatorQCount, setAkinatorQCount] = useState(0);
  const [akinatorHistory, setAkinatorHistory] = useState([]);
  
  // Akinator Decision Tree Reaction States:
  // 'inquiring' -> asking questions
  // 'confident_guess' -> asking "Is your character [Name]?"
  // 'triumphant' -> Smirking AI 😏
  // 'shocked' -> Shocked AI 😱 ("Do you want me to keep digging?")
  // 'defeated' -> Sad AI 😭 (Submitting custom character)
  const [akinatorState, setAkinatorState] = useState('inquiring');
  const [customCharacterName, setCustomCharacterName] = useState('');

  // Compute active candidates ranked by weight
  const rankedCandidates = useMemo(() => {
    const list = AKINATOR_CHARACTERS.map(c => ({
      ...c,
      weight: candidateWeights[c.id] || 0
    })).filter(c => c.weight > 0.01);
    list.sort((a, b) => b.weight - a.weight);
    return list;
  }, [candidateWeights]);

  const totalWeight = useMemo(() => {
    return rankedCandidates.reduce((acc, c) => acc + c.weight, 0);
  }, [rankedCandidates]);

  const topCandidate = rankedCandidates[0] || AKINATOR_CHARACTERS[0];
  const runnerUp = rankedCandidates[1];
  
  const confidenceScore = useMemo(() => {
    if (totalWeight <= 0) return 10;
    const ratio = Math.round((topCandidate.weight / totalWeight) * 100);
    return Math.min(100, Math.max(5, ratio));
  }, [topCandidate, totalWeight]);

  // Dynamic Avatar Reaction
  const genieEmoji = useMemo(() => {
    if (akinatorState === 'triumphant') return '😏'; // Smirking / Triumphant AI
    if (akinatorState === 'shocked') return '😱';    // Shocked / Flabbergasted AI
    if (akinatorState === 'defeated') return '😭';   // Sad / Crying AI
    if (akinatorState === 'confident_guess') return '🧐';
    if (confidenceScore >= 65) return '😲';
    if (confidenceScore >= 35) return '🤔';
    return '🔮';
  }, [akinatorState, confidenceScore]);

  // Pick the most differentiating trait among remaining candidates
  const currentQuestionConfig = useMemo(() => {
    const remainingTraits = AKINATOR_TRAIT_QUESTIONS.filter(q => !askedTraits.includes(q.trait));
    if (remainingTraits.length === 0 || rankedCandidates.length <= 1) {
      return null;
    }

    let bestTrait = remainingTraits[0];
    let minDiff = 999999;

    remainingTraits.forEach(t => {
      let trueWeight = 0;
      let falseWeight = 0;
      rankedCandidates.forEach(c => {
        if (c.traits[t.trait]) trueWeight += c.weight;
        else falseWeight += c.weight;
      });
      const diff = Math.abs(trueWeight - falseWeight);
      if (diff < minDiff) {
        minDiff = diff;
        bestTrait = t;
      }
    });

    return bestTrait;
  }, [askedTraits, rankedCandidates]);

  // Process user answer
  const handleAkinatorAnswer = (answerType) => {
    if (!currentQuestionConfig) {
      setAkinatorState('confident_guess');
      return;
    }

    const trait = currentQuestionConfig.trait;
    const questionText = currentQuestionConfig.question;

    setCandidateWeights(prev => {
      const nextWeights = { ...prev };
      AKINATOR_CHARACTERS.forEach(c => {
        const hasTrait = !!c.traits[trait];
        let multiplier = 1.0;

        switch (answerType) {
          case 'Yes':
            multiplier = hasTrait ? 2.8 : 0.05;
            break;
          case 'No':
            multiplier = hasTrait ? 0.05 : 2.8;
            break;
          case 'Probably':
            multiplier = hasTrait ? 1.9 : 0.3;
            break;
          case 'Probably Not':
            multiplier = hasTrait ? 0.3 : 1.9;
            break;
          case "Don't Know":
          default:
            multiplier = 1.0;
            break;
        }

        nextWeights[c.id] = (nextWeights[c.id] || 0) * multiplier;
      });
      return nextWeights;
    });

    const newCount = akinatorQCount + 1;
    setAkinatorQCount(newCount);
    setAskedTraits(prev => [...prev, trait]);
    setAkinatorHistory(prev => [{ question: questionText, answer: answerType }, ...prev]);

    // Check if confident consensus is reached (>80% or clear winner with no questions left)
    setTimeout(() => {
      // Re-check confidence with new weights
      if (confidenceScore >= 80 || (runnerUp && topCandidate.weight >= runnerUp.weight * 3.5) || askedTraits.length >= 16) {
        setAkinatorState('confident_guess');
      }
    }, 200);
  };

  const handleAkinatorConfirmGuess = (isCorrect) => {
    if (isCorrect) {
      setAkinatorState('triumphant');
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
    } else {
      setAkinatorState('shocked');
    }
  };

  const handleContinueGuessing = () => {
    // Reset confidence on failed top candidate to 0
    setCandidateWeights(prev => ({
      ...prev,
      [topCandidate.id]: 0
    }));
    setAkinatorState('inquiring');
  };

  const handleAdmitDefeat = () => {
    setAkinatorState('defeated');
  };

  const handleCustomCharacterSubmit = (e) => {
    e?.preventDefault();
    alert(`Fascinating! Adding "${customCharacterName || 'Your Character'}" to my neural index. You beat the Genie!`);
    resetAkinator();
  };

  const resetAkinator = () => {
    const initial = {};
    AKINATOR_CHARACTERS.forEach(c => { initial[c.id] = 10.0; });
    setCandidateWeights(initial);
    setAskedTraits([]);
    setAkinatorQCount(0);
    setAkinatorHistory([]);
    setAkinatorState('inquiring');
    setCustomCharacterName('');
  };

  // =========================================================================
  // 2. REALISTIC 2D/3D SPIN THE BOTTLE PHYSICS
  // =========================================================================
  const [bottleRotation, setBottleRotation] = useState(0);
  const [isBottleSpinning, setIsBottleSpinning] = useState(false);
  const [bottleHaltedTarget, setBottleHaltedTarget] = useState(null);
  const [bottleChoice, setBottleChoice] = useState(null);
  const [activeBottlePrompt, setActiveBottlePrompt] = useState(null);
  const [bottleAnswerInput, setBottleAnswerInput] = useState('');
  const [bottleFeed, setBottleFeed] = useState([]);

  const spinTheBottle = () => {
    if (isBottleSpinning) return;
    setIsBottleSpinning(true);
    setBottleHaltedTarget(null);
    setBottleChoice(null);
    setActiveBottlePrompt(null);
    setBottleAnswerInput('');

    const targetIsUser = Math.random() > 0.5;
    const targetPlayer = targetIsUser ? 'You' : partnerName;
    const targetAngle = targetIsUser ? 0 : 180;

    const extraSpins = 360 * 5;
    const wobbleOffset = (Math.random() - 0.5) * 30;
    const newRot = bottleRotation + extraSpins + (targetAngle - (bottleRotation % 360)) + wobbleOffset;

    setBottleRotation(newRot);

    setTimeout(() => {
      setIsBottleSpinning(false);
      setBottleHaltedTarget(targetPlayer);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }, 3800);
  };

  const handleSelectFate = (fate) => {
    setBottleChoice(fate);
    if (fate === 'truth') {
      const truths = [
        "What is the most vulnerable creative project or goal you haven't told anyone yet?",
        "What is a romantic green flag that instantly makes you melt?",
        "If you could relive any single evening of your life, which one would it be?"
      ];
      setActiveBottlePrompt(truths[Math.floor(Math.random() * truths.length)]);
    } else {
      const situations = [
        `Situation: You and ${partnerName} wake up in Neo-Tokyo with only 1,000 yen and 1 umbrella in a downpour. What's step one?`,
        `Situation: The aux cord is handed to you on an 8-hour late night coastal drive. What 3 songs define the trip?`,
        `Situation: A rogue AI challenges you both to a 2v2 arcade duel for freedom. Who takes player 1?`
      ];
      setActiveBottlePrompt(situations[Math.floor(Math.random() * situations.length)]);
    }
  };

  const handleBottleAnswerSubmit = (e) => {
    e?.preventDefault();
    if (!bottleAnswerInput.trim()) return;

    setBottleFeed(prev => [
      {
        target: bottleHaltedTarget,
        choice: bottleChoice,
        prompt: activeBottlePrompt,
        answer: bottleAnswerInput.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      ...prev
    ]);

    setBottleAnswerInput('');
    setBottleHaltedTarget(null);
    setBottleChoice(null);
    setActiveBottlePrompt(null);
  };

  // =========================================================================
  // 3. TWO TRUTHS AND A LIE: 10-SECOND RAPID GUESS TIMER
  // =========================================================================
  const [twoTruthsTurn, setTwoTruthsTurn] = useState(1); // 1 = User sets, partner guesses; 2 = Partner sets, user guesses
  const [statementA, setStatementA] = useState("I once built a custom analog synthesizer controller.");
  const [statementB, setStatementB] = useState("I've sent an outdoor V7 boulder problem in Joshua Tree.");
  const [statementC, setStatementC] = useState("I have never watched an episode of Studio Ghibli or Bleach.");
  const [lieIndex, setLieIndex] = useState(2);
  const [twoTruthsLocked, setTwoTruthsLocked] = useState(false);

  // 10-second rapid countdown state
  const [twoTruthsTimer, setTwoTruthsTimer] = useState(10);
  const [twoTruthsTimerActive, setTwoTruthsTimerActive] = useState(false);
  const [twoTruthsResult, setTwoTruthsResult] = useState(null); // { guessedIndex, isCorrect, timedOut }
  const [twoTruthsScore, setTwoTruthsScore] = useState({ user: 0, partner: 0 });

  // Partner turn 2 statements
  const partnerStatements = useMemo(() => [
    { text: `I speak conversational Japanese and lived in Kyoto for 3 months.`, isLie: false },
    { text: `I've performed guitar live on stage at a crowded indie festival.`, isLie: false },
    { text: `I am terrified of house cats and refuse to pet them.`, isLie: true }
  ], []);

  // Timer loop for 10-second rapid guess
  useEffect(() => {
    if (!twoTruthsTimerActive || twoTruthsTimer <= 0) return;

    const timer = setInterval(() => {
      setTwoTruthsTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTwoTruthsTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [twoTruthsTimerActive, twoTruthsTimer]);

  const handleLockInStatements = () => {
    setTwoTruthsLocked(true);
    setTwoTruthsTimer(10);
    setTwoTruthsTimerActive(true);
    setTwoTruthsResult(null);

    // Simulate partner guessing within the 10-second window
    const randomGuessDelay = Math.floor(Math.random() * 5000) + 3000; // 3 to 8 seconds
    setTimeout(() => {
      if (twoTruthsResult) return;
      // Partner guess: 50% chance of correctly identifying lie
      const partnerGuessedIdx = Math.random() > 0.4 ? lieIndex : (lieIndex === 0 ? 1 : 0);
      const isCorrect = partnerGuessedIdx === lieIndex;
      
      setTwoTruthsTimerActive(false);
      setTwoTruthsResult({
        guesser: partnerName,
        guessedIndex: partnerGuessedIdx,
        isCorrect,
        timedOut: false
      });

      if (isCorrect) {
        setTwoTruthsScore(prev => ({ ...prev, partner: prev.partner + 150 }));
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      }
    }, randomGuessDelay);
  };

  const handleTwoTruthsTimeout = () => {
    setTwoTruthsTimerActive(false);
    setTwoTruthsResult({
      guesser: twoTruthsTurn === 1 ? partnerName : 'You',
      guessedIndex: -1,
      isCorrect: false,
      timedOut: true
    });
  };

  const handleUserGuessLie = (chosenIdx) => {
    if (!twoTruthsTimerActive || twoTruthsTurn !== 2) return;
    setTwoTruthsTimerActive(false);
    
    const isCorrect = partnerStatements[chosenIdx].isLie;
    setTwoTruthsResult({
      guesser: 'You',
      guessedIndex: chosenIdx,
      isCorrect,
      timedOut: false
    });

    if (isCorrect) {
      setTwoTruthsScore(prev => ({ ...prev, user: prev.user + 150 }));
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    }
  };

  const advanceToTwoTruthsTurn2 = () => {
    setTwoTruthsTurn(2);
    setTwoTruthsLocked(false);
    setTwoTruthsTimer(10);
    setTwoTruthsTimerActive(true);
    setTwoTruthsResult(null);
  };

  // =========================================================================
  // 4. FIX SHARED CANVAS DRAWING ENGINE (FLAWLESS MOUSE/TOUCH MAPPING)
  // =========================================================================
  const canvasRef = useRef(null);
  const [brushTool, setBrushTool] = useState('pen'); // 'pen' | 'highlighter' | 'eraser'
  const [brushSize, setBrushSize] = useState(6);
  const [brushColor, setBrushColor] = useState('#FF3366');
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasHistory, setCanvasHistory] = useState([]);
  const lastCoordRef = useRef(null);

  const getCanvasCoords = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }, []);

  const saveCanvasSnapshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const data = canvas.toDataURL();
      setCanvasHistory(prev => [...prev.slice(-15), data]);
    } catch {
      // ignore
    }
  }, []);

  const handleCanvasUndo = () => {
    if (canvasHistory.length <= 1) {
      handleCanvasClear();
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const newStack = [...canvasHistory];
    newStack.pop();
    const prevSnapshot = newStack[newStack.length - 1];
    setCanvasHistory(newStack);

    if (prevSnapshot) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = prevSnapshot;
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleCanvasClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveCanvasSnapshot();
  };

  const onCanvasStart = (e) => {
    const coords = getCanvasCoords(e);
    if (!coords) return;
    setIsDrawing(true);
    lastCoordRef.current = coords;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = brushTool === 'eraser' ? '#0B0F19' : brushColor;
    ctx.fill();
  };

  const onCanvasMove = (e) => {
    if (!isDrawing) return;
    const coords = getCanvasCoords(e);
    if (!coords || !lastCoordRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(lastCoordRef.current.x, lastCoordRef.current.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;

    if (brushTool === 'eraser') {
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = '#0B0F19';
    } else if (brushTool === 'highlighter') {
      ctx.globalAlpha = 0.4;
      ctx.strokeStyle = brushColor;
    } else {
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = brushColor;
    }

    ctx.stroke();
    ctx.globalAlpha = 1.0;
    lastCoordRef.current = coords;
  };

  const onCanvasStop = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    lastCoordRef.current = null;
    saveCanvasSnapshot();
  };

  const handleSendCanvasSticker = () => {
    const cvs = canvasRef.current;
    if (!cvs || !onExportToChat) return;
    onExportToChat({
      type: 'sticker',
      stickerUrl: cvs.toDataURL(),
      caption: `Shared Studio Canvas sketch with ${partnerName}! 🎨`
    });
    confetti({ particleCount: 75, spread: 75, origin: { y: 0.6 } });
    alert("Sticker dispatched to your active chat thread!");
  };

  // =========================================================================
  // 5. REAL 2-PLAYER MECHANICS: REFLEX TAP RACE (BEST OF 3)
  // =========================================================================
  const [tapRaceState, setTapRaceState] = useState('idle'); // 'idle' | 'waiting' | 'ready' | 'round_over' | 'match_over'
  const [tapRoundScores, setTapRoundScores] = useState({ user: 0, partner: 0 });
  const [tapUserLatency, setTapUserLatency] = useState(null);
  const [tapPartnerLatency, setTapPartnerLatency] = useState(null);
  const tapStartTimeRef = useRef(null);
  const tapTimeoutRef = useRef(null);

  const startReflexRound = () => {
    setTapRaceState('waiting');
    setTapUserLatency(null);
    setTapPartnerLatency(null);

    // Random delay between 1.5s and 3.8s
    const delay = Math.floor(Math.random() * 2300) + 1500;
    tapTimeoutRef.current = setTimeout(() => {
      setTapRaceState('ready');
      tapStartTimeRef.current = Date.now();
    }, delay);
  };

  const handleReflexTap = () => {
    if (tapRaceState === 'waiting') {
      // False start!
      clearTimeout(tapTimeoutRef.current);
      setTapRaceState('idle');
      alert("FALSE START! Screen was still RED! Wait for the Green flash.");
      return;
    }

    if (tapRaceState === 'ready') {
      const userMs = Date.now() - tapStartTimeRef.current;
      // Partner simulated latency: 190ms - 290ms
      const partnerMs = Math.floor(Math.random() * 100) + 195;

      setTapUserLatency(userMs);
      setTapPartnerLatency(partnerMs);

      const userWonRound = userMs < partnerMs;
      const nextScores = {
        user: tapRoundScores.user + (userWonRound ? 1 : 0),
        partner: tapRoundScores.partner + (userWonRound ? 0 : 1)
      };
      setTapRoundScores(nextScores);

      confetti({ particleCount: 65, spread: 65, origin: { y: 0.6 } });

      if (nextScores.user >= 2 || nextScores.partner >= 2) {
        setTapRaceState('match_over');
      } else {
        setTapRaceState('round_over');
      }
    }
  };

  // =========================================================================
  // 6. REAL 2-PLAYER MECHANICS: NUMBER DUEL (1–100)
  // =========================================================================
  const [numberDuelPhase, setNumberDuelPhase] = useState('secret_lock'); // 'secret_lock' | 'dueling' | 'game_over'
  const [userSecretNumber, setUserSecretNumber] = useState(42);
  const [partnerSecretNumber, setPartnerSecretNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [userGuessInput, setUserGuessInput] = useState('');
  const [numberDuelTurn, setNumberDuelTurn] = useState('user'); // 'user' | 'partner'
  const [numberMin, setNumberMin] = useState(1);
  const [numberMax, setNumberMax] = useState(100);
  const [numberDuelLogs, setNumberDuelLogs] = useState([]);
  const [numberDuelWinner, setNumberDuelWinner] = useState(null);

  const handleLockSecretNumber = (e) => {
    e?.preventDefault();
    setNumberDuelPhase('dueling');
    setNumberDuelLogs([
      { player: 'System', text: `Both players locked their secret numbers! Range: 1 to 100.` }
    ]);
  };

  const handleUserNumberGuess = (e) => {
    e?.preventDefault();
    const val = parseInt(userGuessInput, 10);
    if (isNaN(val) || numberDuelPhase !== 'dueling' || numberDuelTurn !== 'user') return;

    setUserGuessInput('');

    let hint = 'EXACT MATCH! 🎯';
    if (val < partnerSecretNumber) {
      hint = 'HIGHER ⬆️';
      setNumberMin(prev => Math.max(prev, val + 1));
    } else if (val > partnerSecretNumber) {
      hint = 'LOWER ⬇️';
      setNumberMax(prev => Math.min(prev, val - 1));
    }

    setNumberDuelLogs(prev => [
      { player: 'You', guess: val, hint },
      ...prev
    ]);

    if (val === partnerSecretNumber) {
      setNumberDuelPhase('game_over');
      setNumberDuelWinner('You');
      confetti({ particleCount: 110, spread: 85, origin: { y: 0.6 } });
      return;
    }

    // Switch turn to Partner
    setNumberDuelTurn('partner');
    setTimeout(() => {
      // Partner automated intelligent binary search guess
      const mid = Math.floor((1 + 100) / 2) + Math.floor((Math.random() - 0.5) * 10);
      const pGuess = Math.min(100, Math.max(1, mid));

      let pHint = 'EXACT MATCH! 🎯';
      if (pGuess < userSecretNumber) {
        pHint = 'HIGHER ⬆️';
      } else if (pGuess > userSecretNumber) {
        pHint = 'LOWER ⬇️';
      }

      setNumberDuelLogs(prev => [
        { player: partnerName, guess: pGuess, hint: pHint },
        ...prev
      ]);

      if (pGuess === userSecretNumber) {
        setNumberDuelPhase('game_over');
        setNumberDuelWinner(partnerName);
      } else {
        setNumberDuelTurn('user');
      }
    }, 1400);
  };

  // =========================================================================
  // 7. BANTER MEMES & POINTS SYSTEM EXPORT (Playful Banter Drawer)
  // =========================================================================
  const [banterDrawerState, setBanterDrawerState] = useState({
    isOpen: false,
    isWinner: true,
    gameTitle: 'Mini-Game Duel'
  });

  const handleExportGameBanter = (isWinner, gameTitle) => {
    setBanterDrawerState({
      isOpen: true,
      isWinner,
      gameTitle
    });
  };

  // Arena Games Tab Navigation
  const ARENA_GAMES = [
    { id: 'akinator', label: '🔮 AI Akinator', badge: 'Decision Tree' },
    { id: 'doodle_duel', label: '🎨 Doodle Duel', badge: 'Skribbl.io' },
    { id: 'twenty_q', label: '❓ 20 Questions', badge: 'Instant Win' },
    { id: 'two_truths', label: '🤥 2 Truths 1 Lie', badge: '10s Rapid' },
    { id: 'spin_bottle', label: '🍾 Spin Bottle', badge: 'Glass Physics' },
    { id: 'shared_canvas', label: '🖌️ Studio Canvas', badge: '12 Colors' },
    { id: 'tap_race', label: '⚡ Reflex Tap Race', badge: 'Best of 3' },
    { id: 'number_duel', label: '🔢 Number Duel', badge: 'Head-to-Head' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#090C15]/95 backdrop-blur-xl flex flex-col p-3 sm:p-6 lg:p-8 overflow-y-auto selection:bg-rose-500 selection:text-white">
      {/* Ambient Radial Background Glows */}
      <div className="fixed top-12 left-1/4 w-[500px] h-[500px] bg-[#F59E0B]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-12 right-1/4 w-[500px] h-[500px] bg-[#FF3366]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Full-Screen Arena Frame */}
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-10">
        
        {/* Arena Header */}
        <div className="px-5 py-4 bg-slate-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={partner.photo || partner.photos?.[0]?.url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                alt={partnerName}
                className="w-11 h-11 rounded-2xl object-cover border border-amber-400/40 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">{partnerName}</h3>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/25">
                  Live Arena
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span>📍 {partner.hometown || partner.location || 'Connected'}</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">{partner.compatibility || 96}% Resonance</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-bold text-amber-300">
                👉 Live Session
              </span>
            </div>

            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:border-rose-500/50 text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
              title="Leave Match"
            >
              <X className="w-4 h-4" />
              <span>Leave Match</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation (8 Live Interactive Mini-Games) */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-950/70 border-b border-white/5 overflow-x-auto scrollbar-none">
          {ARENA_GAMES.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-md ${activeTab === tab.id ? 'bg-black/30 text-amber-200' : 'bg-white/5 text-slate-400'}`}>
                {tab.badge}
              </span>
            </button>
          ))}
        </div>

        {/* ========================================================= */}
        {/* ARENA CONTENT VIEWPORTS                                   */}
        {/* ========================================================= */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto text-left">
          
          {/* ========================================================= */}
          {/* 1. UNLIMITED AI AKINATOR (BRANCHING & REACTION STATES)    */}
          {/* ========================================================= */}
          {activeTab === 'akinator' && (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Genie Avatar with Reaction States */}
              <div className="text-center space-y-3">
                <div className="relative inline-block">
                  <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 p-[2px] shadow-2xl shadow-purple-500/30">
                    <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-5xl select-none animate-bounce-subtle">
                      {genieEmoji}
                    </div>
                  </div>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest shadow-md">
                    Neural Genie
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">The Omniscient Oracle</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Think of ANY famous figure (Anime, YouTuber, Athlete, Cinema, Music). Genie has no question cap!
                  </p>
                </div>

                {/* Progress / Confidence Meter */}
                <div className="space-y-1.5 max-w-md mx-auto pt-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Genie Confidence:</span>
                    <span className="font-black text-amber-400">{confidenceScore}% Weight Consensus</span>
                  </div>
                  <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-500 rounded-full transition-all duration-500"
                      style={{ width: `${confidenceScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* State 1: Confident Guess Trigger */}
              {akinatorState === 'confident_guess' && (
                <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-500/15 via-rose-500/10 to-transparent border border-amber-400/30 text-center space-y-4 shadow-2xl animate-fade">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                    🔮 I Have Reached Consensus!
                  </span>

                  <div className="w-28 h-28 mx-auto rounded-3xl overflow-hidden border-2 border-amber-400 shadow-2xl shadow-amber-500/30">
                    <img
                      src={topCandidate.photo}
                      alt={topCandidate.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-white">Is your character {topCandidate.name}?</h2>
                    <p className="text-xs text-amber-300 font-bold mt-1">{topCandidate.category}</p>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30">
                      {confidenceScore}% Certainty in {akinatorQCount} Inquiries
                    </span>
                  </div>

                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={() => handleAkinatorConfirmGuess(true)}
                      className="px-6 py-2.5 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
                    >
                      Yes, Correct! 🎉
                    </button>
                    <button
                      onClick={() => handleAkinatorConfirmGuess(false)}
                      className="px-6 py-2.5 rounded-2xl bg-rose-500 text-white font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
                    >
                      No, Wrong! ❌
                    </button>
                  </div>
                </div>
              )}

              {/* State 2: Triumphant Smirking AI 😏 */}
              {akinatorState === 'triumphant' && (
                <div className="p-6 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-4 animate-fade">
                  <h3 className="text-2xl font-black text-white">"Bravo! The Genie never misses." 😏</h3>
                  <p className="text-xs text-emerald-300">
                    Correctly deduced <strong>{topCandidate.name}</strong> in {akinatorQCount} inquiries! The Oracle's neural intuition remains undefeated.
                  </p>
                  <div className="flex justify-center gap-3 pt-1">
                    <button
                      onClick={resetAkinator}
                      className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 text-white font-black text-xs shadow-lg"
                    >
                      Play Another Round 🔄
                    </button>
                  </div>
                </div>
              )}

              {/* State 3: Shocked AI 😱 ("Do you want me to keep digging?") */}
              {akinatorState === 'shocked' && (
                <div className="p-6 rounded-3xl bg-rose-500/20 border border-rose-500/40 text-center space-y-4 animate-fade">
                  <h3 className="text-2xl font-black text-white">"Impossible! How did I miss that?!" 😱</h3>
                  <p className="text-xs text-rose-200">
                    My confidence weights faltered! Do you want me to keep digging or admit defeat?
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={handleContinueGuessing}
                      className="px-6 py-2.5 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
                    >
                      Continue Guessing 🔍
                    </button>
                    <button
                      onClick={handleAdmitDefeat}
                      className="px-6 py-2.5 rounded-2xl bg-slate-800 text-slate-200 font-bold text-xs border border-white/10 hover:bg-slate-700 transition-all"
                    >
                      End Game 🏳️
                    </button>
                  </div>
                </div>
              )}

              {/* State 4: Sad / Crying AI 😭 (Input your character) */}
              {akinatorState === 'defeated' && (
                <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 text-center space-y-4 animate-fade">
                  <h3 className="text-xl font-black text-white">"You've defeated the Genie..." 😭</h3>
                  <p className="text-xs text-slate-400">
                    Teach the neural network! Who was your character?
                  </p>
                  <form onSubmit={handleCustomCharacterSubmit} className="max-w-md mx-auto space-y-3">
                    <input
                      type="text"
                      placeholder="Enter character name (e.g. Eren Yeager, Drake)..."
                      value={customCharacterName}
                      onChange={(e) => setCustomCharacterName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <div className="flex justify-center gap-2">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shadow-md"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={resetAkinator}
                        className="px-5 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold"
                      >
                        Skip
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* State 5: Inquiring Questions Loop (Unlimited) */}
              {akinatorState === 'inquiring' && (
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-5 text-center shadow-xl">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Question #{akinatorQCount + 1} • {rankedCandidates.length} Active Deductions
                  </span>
                  
                  <h4 className="text-lg sm:text-xl font-bold text-white max-w-lg mx-auto leading-relaxed">
                    "{currentQuestionConfig ? currentQuestionConfig.question : "Is your character an internationally renowned legend?"}"
                  </h4>

                  {/* 5 Real-World Action Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                    <button
                      onClick={() => handleAkinatorAnswer('Yes')}
                      className="py-3 px-2 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-black transition-all hover:scale-105 active:scale-95"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleAkinatorAnswer('No')}
                      className="py-3 px-2 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-black transition-all hover:scale-105 active:scale-95"
                    >
                      No
                    </button>
                    <button
                      onClick={() => handleAkinatorAnswer("Don't Know")}
                      className="py-3 px-2 rounded-2xl bg-slate-700/40 hover:bg-slate-700/60 text-slate-300 border border-slate-600/40 text-xs font-black transition-all hover:scale-105 active:scale-95"
                    >
                      Don't Know
                    </button>
                    <button
                      onClick={() => handleAkinatorAnswer('Probably')}
                      className="py-3 px-2 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-black transition-all hover:scale-105 active:scale-95"
                    >
                      Probably
                    </button>
                    <button
                      onClick={() => handleAkinatorAnswer('Probably Not')}
                      className="py-3 px-2 rounded-2xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 text-xs font-black transition-all hover:scale-105 active:scale-95"
                    >
                      Probably Not
                    </button>
                  </div>
                </div>
              )}

              {/* Inquiry History Log */}
              {akinatorHistory.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Oracle Deduction Path
                  </span>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {akinatorHistory.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                        <span className="text-slate-300">{item.question}</span>
                        <span className="font-bold text-amber-400">{item.answer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. DOODLE DUEL (SKRIBBL.IO ENGINE)                        */}
          {/* ========================================================= */}
          {activeTab === 'doodle_duel' && (
            <DoodleDuel
              partner={partner}
              onClose={onClose}
              onExportToChat={onExportToChat}
            />
          )}

          {/* ========================================================= */}
          {/* 3. 20 QUESTIONS CO-OP (INSTANT WIN ON CORRECT GUESS)      */}
          {/* ========================================================= */}
          {activeTab === 'twenty_q' && (
            <TwentyQuestions
              partner={partner}
              onClose={onClose}
              onExportToChat={onExportToChat}
            />
          )}

          {/* ========================================================= */}
          {/* 4. TWO TRUTHS AND A LIE: 10-SECOND RAPID GUESS TIMER      */}
          {/* ========================================================= */}
          {activeTab === 'two_truths' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-left flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                    Two Truths & A Lie Banter
                  </span>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {twoTruthsTurn === 1 ? `You set 2 truths & 1 lie. ${partnerName} has 10 seconds to guess!` : `${partnerName} set 3 statements. You have 10 seconds to deduce the lie!`}
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-bold text-amber-300">
                  Scores: You ({twoTruthsScore.user}) vs {partnerName} ({twoTruthsScore.partner})
                </div>
              </div>

              {/* 10-Second Countdown Meter (Intense ticking pulse) */}
              {twoTruthsTimerActive && (
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-400/40 text-center space-y-2 animate-pulse">
                  <div className="flex justify-between items-center text-xs font-mono font-black">
                    <span className="text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Clock className="w-4 h-4 animate-spin text-rose-500" />
                      Rapid Guess Countdown
                    </span>
                    <span className="text-xl text-amber-300">{twoTruthsTimer}s</span>
                  </div>
                  <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-red-600 rounded-full transition-all duration-1000"
                      style={{ width: `${(twoTruthsTimer / 10) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Turn 1: User Sets 2 Truths & 1 Lie */}
              {twoTruthsTurn === 1 && !twoTruthsResult && (
                <div className="space-y-3">
                  {[
                    { label: 'Statement 1', val: statementA, set: setStatementA, idx: 0 },
                    { label: 'Statement 2', val: statementB, set: setStatementB, idx: 1 },
                    { label: 'Statement 3', val: statementC, set: setStatementC, idx: 2 },
                  ].map((item) => (
                    <div key={item.idx} className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-left">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-white">{item.label}</span>
                        <button
                          type="button"
                          onClick={() => setLieIndex(item.idx)}
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                            lieIndex === item.idx
                              ? 'bg-rose-500 text-white shadow-md'
                              : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {lieIndex === item.idx ? '🔴 Marked as Lie' : 'Mark as Lie'}
                        </button>
                      </div>
                      <input
                        type="text"
                        value={item.val}
                        onChange={(e) => item.set(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                      />
                    </div>
                  ))}

                  <button
                    onClick={handleLockInStatements}
                    disabled={twoTruthsLocked}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 text-white font-black text-xs shadow-lg hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
                  >
                    {twoTruthsLocked ? `⏳ 10-Second Timer Active for ${partnerName}...` : 'Lock In & Trigger 10s Timer 🔒'}
                  </button>
                </div>
              )}

              {/* Turn 2: User Guesses Partner's Lie within 10s */}
              {twoTruthsTurn === 2 && !twoTruthsResult && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-amber-300 block text-left">
                    Click the statement you believe is the LIE before 10 seconds run out:
                  </span>
                  {partnerStatements.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleUserGuessLie(idx)}
                      className="w-full p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-white/15 text-left text-xs font-semibold text-white transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-between"
                    >
                      <span>"{item.text}"</span>
                      <span className="text-[10px] text-amber-400 font-bold shrink-0 ml-2">Guess Lie</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Result & Banter Screen */}
              {twoTruthsResult && (
                <div className="p-6 rounded-3xl bg-slate-900 border border-white/15 text-center space-y-4 animate-fade">
                  {twoTruthsResult.timedOut ? (
                    <div className="space-y-2">
                      <Clock className="w-12 h-12 mx-auto text-rose-500 animate-spin" />
                      <h3 className="text-xl font-black text-white">⏰ TIMEOUT! Time Expired!</h3>
                      <p className="text-xs text-rose-300">
                        {twoTruthsTurn === 1 ? `${partnerName} failed to deduce your lie in time!` : `You ran out of time to identify the lie!`}
                      </p>
                    </div>
                  ) : twoTruthsResult.isCorrect ? (
                    <div className="space-y-2">
                      <Trophy className="w-12 h-12 mx-auto text-amber-400 animate-bounce" />
                      <h3 className="text-xl font-black text-white">🎯 SPOT ON! Lie Exposed!</h3>
                      <p className="text-xs text-emerald-300">
                        {twoTruthsResult.guesser} cracked the lie within 10 seconds! (+150 pts)
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <AlertCircle className="w-12 h-12 mx-auto text-rose-500" />
                      <h3 className="text-xl font-black text-white">❌ FOOLED! Wrong Guess!</h3>
                      <p className="text-xs text-slate-300">
                        That statement was completely true! The lie remains uncracked.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-center gap-3 pt-2">
                    {twoTruthsTurn === 1 ? (
                      <button
                        onClick={advanceToTwoTruthsTurn2}
                        className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 text-white font-black text-xs shadow-md"
                      >
                        Swap Roles: Round 2 (Your 10s Turn) 🔄
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setTwoTruthsTurn(1);
                            setTwoTruthsLocked(false);
                            setTwoTruthsResult(null);
                          }}
                          className="px-6 py-2.5 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs shadow-md"
                        >
                          Play Again 🔄
                        </button>
                        <button
                          onClick={() => handleExportGameBanter(twoTruthsScore.user >= twoTruthsScore.partner, "2 Truths & a Lie")}
                          className="px-6 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15"
                        >
                          Send Banter to Chat 💬
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. INTERACTIVE SPIN THE BOTTLE                            */}
          {/* ========================================================= */}
          {activeTab === 'spin_bottle' && (
            <div className="max-w-2xl mx-auto space-y-6 text-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto rounded-full bg-gradient-to-b from-[#131B2E] to-[#0A0D14] border-2 border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
                <div className="absolute inset-4 rounded-full border border-dashed border-white/10 pointer-events-none" />

                <div className={`absolute top-4 px-3 py-1 rounded-full transition-all duration-300 ${
                  bottleHaltedTarget === 'You'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/50 scale-110 ring-4 ring-amber-400/30'
                    : 'bg-white/5 text-amber-400 font-bold border border-white/10'
                }`}>
                  <span>You (North)</span>
                </div>

                <div className={`absolute bottom-4 px-3 py-1 rounded-full transition-all duration-300 ${
                  bottleHaltedTarget === partnerName
                    ? 'bg-rose-500 text-white font-black shadow-lg shadow-rose-500/50 scale-110 ring-4 ring-rose-500/30'
                    : 'bg-white/5 text-rose-300 font-bold border border-white/10'
                }`}>
                  <span>{partnerName} (South)</span>
                </div>

                <motion.div
                  animate={{ rotate: bottleRotation }}
                  transition={{ 
                    duration: 3.8, 
                    ease: [0.15, 0.85, 0.35, 1.0]
                  }}
                  className="relative w-20 h-48 select-none flex items-center justify-center cursor-pointer"
                  onClick={spinTheBottle}
                >
                  <svg
                    viewBox="0 0 100 240"
                    className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] filter"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40 10 C40 6 60 6 60 10 L60 45 C60 55 75 75 82 95 L82 205 C82 225 68 235 50 235 C32 235 18 225 18 205 L18 95 C25 75 40 55 40 45 Z"
                      fill="url(#bottleGradient)"
                      stroke="#10B981"
                      strokeWidth="2"
                    />
                    <path d="M42 2 L58 2 L57 12 L43 12 Z" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
                    <rect x="38" y="12" width="24" height="6" rx="2" fill="#047857" stroke="#065F46" />
                    <path d="M26 100 L26 200 C26 215 32 225 40 228" stroke="rgba(255,255,255,0.65)" strokeWidth="4" strokeLinecap="round" />
                    <rect x="28" y="120" width="44" height="50" rx="4" fill="#F59E0B" fillOpacity="0.85" stroke="#D97706" />
                    <text x="50" y="145" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="900" fontFamily="sans-serif">PACT</text>
                    <text x="50" y="158" textAnchor="middle" fill="#0F172A" fontSize="7" fontWeight="bold" fontFamily="sans-serif">SPIN 26</text>
                    <defs>
                      <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#064E3B" />
                        <stop offset="35%" stopColor="#059669" />
                        <stop offset="70%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#047857" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </div>

              <div>
                <button
                  onClick={spinTheBottle}
                  disabled={isBottleSpinning}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-black text-xs shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isBottleSpinning ? 'Bottle Decelerating... 🍾' : 'Spin the Glass Bottle 🍾'}
                </button>
              </div>

              {bottleHaltedTarget && !activeBottlePrompt && (
                <div className="p-5 rounded-3xl bg-slate-900 border border-amber-400/30 space-y-3 animate-fade max-w-lg mx-auto">
                  <h4 className="text-base font-black text-white">
                    Bottle pointed at: <span className="text-amber-400">{bottleHaltedTarget}</span>!
                  </h4>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleSelectFate('truth')}
                      className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs shadow-md"
                    >
                      Spill the Truth 💬
                    </button>
                    <button
                      onClick={() => handleSelectFate('situation')}
                      className="px-5 py-2.5 rounded-xl bg-rose-500 text-white font-black text-xs shadow-md"
                    >
                      Situation Calls 🎭
                    </button>
                  </div>
                </div>
              )}

              {activeBottlePrompt && (
                <form onSubmit={handleBottleAnswerSubmit} className="p-5 rounded-3xl bg-slate-900 border border-white/10 space-y-3 animate-fade text-left max-w-lg mx-auto">
                  <h4 className="text-sm font-bold text-white">"{activeBottlePrompt}"</h4>
                  <textarea
                    rows={2}
                    placeholder="Enter your response..."
                    value={bottleAnswerInput}
                    onChange={(e) => setBottleAnswerInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-white text-xs"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 text-white font-black text-xs shadow-md"
                  >
                    Submit & Advance Turn
                  </button>
                </form>
              )}

              {bottleFeed.length > 0 && (
                <div className="space-y-1.5 max-h-40 overflow-y-auto text-left max-w-lg mx-auto">
                  {bottleFeed.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1 text-xs">
                      <div className="flex justify-between font-bold">
                        <span className="text-amber-400">{item.target} • {item.choice === 'truth' ? 'Truth' : 'Situation'}</span>
                        <span className="text-slate-500 font-mono text-[10px]">{item.time}</span>
                      </div>
                      <p className="text-slate-300 italic">"{item.answer}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. STUDIO CANVAS 2.0 (FLAWLESS MOUSE/TOUCH DRAWING)        */}
          {/* ========================================================= */}
          {activeTab === 'shared_canvas' && (
            <div className="max-w-4xl mx-auto space-y-3">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-slate-900 border border-white/10">
                {/* Tools */}
                <div className="flex items-center gap-1">
                  {[
                    { id: 'pen', label: '🖊️ Pen' },
                    { id: 'highlighter', label: '🖍️ Highlight (0.4)' },
                    { id: 'eraser', label: '🧹 Eraser' }
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBrushTool(b.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        brushTool === b.id
                          ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                          : 'bg-white/5 text-slate-300 hover:text-white'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>

                {/* Brush Sizes */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400">Brush:</span>
                  {[
                    { label: 'Fine', size: 2 },
                    { label: 'Regular', size: 6 },
                    { label: 'Chunky', size: 14 },
                    { label: 'Marker', size: 28 }
                  ].map((s) => (
                    <button
                      key={s.size}
                      onClick={() => setBrushSize(s.size)}
                      className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold ${
                        brushSize === s.size ? 'bg-rose-500 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {s.size}px
                    </button>
                  ))}
                </div>

                {/* Actions: Undo, Clear, Send as Sticker */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCanvasUndo}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                    title="Undo"
                  >
                    <Undo2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCanvasClear}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-rose-300"
                    title="Clear Board"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSendCanvasSticker}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Send as Sticker
                  </button>
                </div>
              </div>

              {/* 12 High-Contrast Color Swatches */}
              <div className="p-2 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-between gap-1 overflow-x-auto">
                <span className="text-[10px] text-slate-400 font-bold px-1 shrink-0">12 Swatches:</span>
                <div className="flex items-center gap-2">
                  {HIGH_CONTRAST_COLORS_12.map(color => (
                    <button
                      key={color}
                      onClick={() => {
                        setBrushColor(color);
                        if (brushTool === 'eraser') setBrushTool('pen');
                      }}
                      className={`w-6 h-6 rounded-full transition-all shrink-0 ${
                        brushColor === color && brushTool !== 'eraser'
                          ? 'ring-2 ring-white scale-125 shadow-lg'
                          : 'opacity-80 hover:opacity-100 hover:scale-110'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Native HTML5 Canvas with Precision Mouse & Touch Handlers */}
              <div className="rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-[#0B0F19] min-h-[380px]">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={450}
                  onMouseDown={onCanvasStart}
                  onMouseMove={onCanvasMove}
                  onMouseUp={onCanvasStop}
                  onMouseLeave={onCanvasStop}
                  onTouchStart={onCanvasStart}
                  onTouchMove={onCanvasMove}
                  onTouchEnd={onCanvasStop}
                  onTouchCancel={onCanvasStop}
                  className="w-full h-[380px] touch-none cursor-crosshair select-none"
                />
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 7. REFLEX TAP RACE (BEST OF 3 HEAD-TO-HEAD)               */}
          {/* ========================================================= */}
          {activeTab === 'tap_race' && (
            <div className="max-w-xl mx-auto space-y-6 text-center">
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex justify-between items-center">
                <div className="text-left">
                  <h4 className="text-sm font-bold text-white">Reflex Tap Showdown (Best of 3)</h4>
                  <p className="text-xs text-slate-400">
                    Wait for Green flash. Lower millisecond latency takes each round!
                  </p>
                </div>
                <div className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-bold text-amber-300">
                  Rounds: You ({tapRoundScores.user}) — {partnerName} ({tapRoundScores.partner})
                </div>
              </div>

              <div
                onClick={handleReflexTap}
                className={`w-full h-64 rounded-3xl flex flex-col items-center justify-center cursor-pointer select-none transition-colors duration-200 border-2 shadow-2xl ${
                  tapRaceState === 'ready'
                    ? 'bg-emerald-500 border-emerald-300 text-slate-950 animate-pulse'
                    : tapRaceState === 'waiting'
                    ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                    : 'bg-slate-900 border-white/10 text-slate-400'
                }`}
              >
                {tapRaceState === 'idle' && (
                  <span className="text-sm font-bold text-white">Click "Start Reflex Duel" Below</span>
                )}
                {tapRaceState === 'waiting' && (
                  <span className="text-2xl font-black tracking-widest uppercase">WAIT FOR GREEN...</span>
                )}
                {tapRaceState === 'ready' && (
                  <span className="text-4xl font-black tracking-widest uppercase">TAP NOW! ⚡</span>
                )}
                {(tapRaceState === 'round_over' || tapRaceState === 'match_over') && (
                  <div className="space-y-2">
                    <div className="flex justify-center gap-6 font-mono">
                      <div>
                        <span className="text-xs block text-slate-400">Your Latency:</span>
                        <span className="text-3xl font-black text-amber-400">{tapUserLatency} ms</span>
                      </div>
                      <div>
                        <span className="text-xs block text-slate-400">{partnerName}:</span>
                        <span className="text-3xl font-black text-rose-400">{tapPartnerLatency} ms</span>
                      </div>
                    </div>
                    <span className="block text-xs font-bold text-emerald-400">
                      {tapUserLatency < tapPartnerLatency ? "🏆 You Won This Round!" : `⚡ ${partnerName} Won This Round!`}
                    </span>
                  </div>
                )}
              </div>

              {tapRaceState !== 'match_over' ? (
                <button
                  onClick={startReflexRound}
                  disabled={tapRaceState === 'waiting' || tapRaceState === 'ready'}
                  className="px-8 py-3 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  {tapRaceState === 'round_over' ? 'Next Round ⚡' : 'Start Reflex Duel ⚡'}
                </button>
              ) : (
                /* Winner vs Loser Banter Meme Screen */
                <div className="p-6 rounded-3xl bg-slate-900 border border-white/15 space-y-4 animate-fade">
                  <Trophy className="w-12 h-12 mx-auto text-amber-400 animate-bounce" />
                  <h3 className="text-xl font-black text-white">
                    {tapRoundScores.user >= 2 ? "VICTORY! Reflex Crown Secured!" : `${partnerName} Took The Crown!`}
                  </h3>
                  
                  {tapRoundScores.user >= 2 ? (
                    <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 text-left space-y-2">
                      <h4 className="text-sm font-black text-white">"YOU WON... BUT AT WHAT COST?"</h4>
                      <p className="text-xs text-purple-200/80 italic">
                        (Legend says out-reacting your match leads to being left on read forever...)
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-left space-y-2">
                      <h4 className="text-sm font-black text-white">"PERSONALLY, I WOULDN'T TAKE THAT LEVEL OF DISRESPECT."</h4>
                      <p className="text-xs text-rose-200/80 italic">
                        (Demand an immediate rematch to salvage your synaptic pride!)
                      </p>
                    </div>
                  )}

                  <div className="flex justify-center gap-3 pt-1">
                    <button
                      onClick={() => {
                        setTapRoundScores({ user: 0, partner: 0 });
                        setTapRaceState('idle');
                      }}
                      className="px-6 py-2.5 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs shadow-md"
                    >
                      Rematch 🔄
                    </button>
                    <button
                      onClick={() => handleExportGameBanter(tapRoundScores.user >= 2, "Reflex Tap Race")}
                      className="px-6 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15"
                    >
                      Send Banter to Chat 💬
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 8. NUMBER DUEL (1–100 HEAD-TO-HEAD)                       */}
          {/* ========================================================= */}
          {activeTab === 'number_duel' && (
            <div className="max-w-2xl mx-auto space-y-5 text-left">
              {/* Header */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-white">Number Duel (1 to 100)</h4>
                  <p className="text-xs text-slate-400">
                    Both secretly lock in numbers. Alternating guesses with Higher/Lower hints!
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-400">
                  {numberDuelPhase === 'dueling' && (numberDuelTurn === 'user' ? '👉 Your Move' : `⏳ ${partnerName}'s Move...`)}
                </span>
              </div>

              {/* Phase 1: Lock in Secret Number */}
              {numberDuelPhase === 'secret_lock' && (
                <form onSubmit={handleLockSecretNumber} className="p-6 rounded-3xl bg-slate-900 border border-amber-400/30 text-center space-y-4 animate-fade">
                  <h3 className="text-lg font-black text-white">Lock In Your Secret Number</h3>
                  <p className="text-xs text-slate-300">
                    Pick a number between 1 and 100 for {partnerName} to guess:
                  </p>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={userSecretNumber}
                    onChange={(e) => setUserSecretNumber(parseInt(e.target.value, 10) || 1)}
                    className="w-32 px-4 py-2.5 rounded-2xl bg-slate-950 border border-white/20 text-center text-xl font-mono font-black text-amber-400 mx-auto block"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 text-white font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    Lock Number & Start Duel 🔢
                  </button>
                </form>
              )}

              {/* Phase 2: Active Dueling */}
              {numberDuelPhase === 'dueling' && (
                <div className="space-y-4">
                  {/* Range Progress Indicator */}
                  <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                      <span>Deduction Window: {numberMin}</span>
                      <span>Target between 1–100</span>
                      <span>{numberMax}</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-full transition-all duration-300"
                        style={{ marginLeft: `${numberMin - 1}%`, width: `${Math.max(4, numberMax - numberMin + 1)}%` }}
                      />
                    </div>
                  </div>

                  {numberDuelTurn === 'user' ? (
                    <form onSubmit={handleUserNumberGuess} className="flex gap-2">
                      <input
                        type="number"
                        placeholder={`Guess ${partnerName}'s number (${numberMin}–${numberMax})...`}
                        value={userGuessInput}
                        onChange={(e) => setUserGuessInput(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-white/15 text-white text-xs font-mono placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 text-white font-black text-xs shadow-md"
                      >
                        Submit Guess
                      </button>
                    </form>
                  ) : (
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-amber-300 flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      <span>{partnerName} is computing their guess...</span>
                    </div>
                  )}

                  {/* Logs Feed */}
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {numberDuelLogs.map((log, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-xs">
                        <span className="text-slate-300"><strong>{log.player}:</strong> {log.guess !== undefined ? `Guessed ${log.guess}` : log.text}</span>
                        {log.hint && <span className="font-bold text-amber-400">{log.hint}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Phase 3: Game Over Screen with Banter Memes */}
              {numberDuelPhase === 'game_over' && (
                <div className="p-6 rounded-3xl bg-slate-900/95 border border-white/15 text-center space-y-4 animate-fade">
                  <Trophy className="w-12 h-12 mx-auto text-amber-400 animate-bounce" />
                  <h3 className="text-xl font-black text-white">
                    {numberDuelWinner === 'You' ? "VICTORY! You Cracked The Number First!" : `${partnerName} Cracked Your Number First!`}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Your Secret was <strong>{userSecretNumber}</strong> • {partnerName}'s Secret was <strong>{partnerSecretNumber}</strong>
                  </p>

                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setNumberDuelPhase('secret_lock');
                        setNumberMin(1);
                        setNumberMax(100);
                        setPartnerSecretNumber(Math.floor(Math.random() * 100) + 1);
                      }}
                      className="px-6 py-2.5 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs shadow-md"
                    >
                      Rematch 🔄
                    </button>
                    <button
                      onClick={() => handleExportGameBanter(numberDuelWinner === 'You', "Number Duel")}
                      className="px-6 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15"
                    >
                      Send Banter to Chat 💬
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Playful Banter Drawer */}
      <PlayfulBanterDrawer
        isOpen={banterDrawerState.isOpen}
        onClose={() => setBanterDrawerState(prev => ({ ...prev, isOpen: false }))}
        isWinner={banterDrawerState.isWinner}
        partnerName={partnerName}
        gameTitle={banterDrawerState.gameTitle}
        onSendBanter={(meme) => {
          if (onExportToChat) {
            onExportToChat({
              ...meme,
              partner,
              sender: 'user',
              gameTitle: banterDrawerState.gameTitle
            });
          }
        }}
      />
    </div>
  );
}
