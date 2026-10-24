// src/mockData.js - Curated profiles, mock matches, and seed experiences for Pact

export const CURRENT_USER = {
  id: "user-me",
  name: "You (Anant)",
  handle: "@anant_b",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
  bio: "Creative technologist & strategy gamer. Always down for late-night bouldering or deep design rabbit holes.",
  selfTraits: ["Strategic", "Curious", "Night-Owl"],
  seekTraits: ["Witty", "Direct", "Spontaneous"],
  interests: ["Valorant", "Modular Synth", "Bouldering", "Rust", "Indie Rock"],
  online: true,
};

export const PROFILES = [
  {
    id: "user-alex",
    name: "Alex Chen",
    age: 24,
    gender: "Non-binary",
    location: "Seattle, WA",
    distance: "1.8 miles away",
    school: "Berklee College of Music",
    occupation: "Ambient Sound Designer",
    online: true,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Synthesizer collector, modular sound designer & bouldering enthusiast. Looking for co-op gaming partners and spontaneous late-night coffee banter.",
    selfTraits: ["Curious", "Tactical", "Night-Owl"],
    seekTraits: ["Creative", "Direct", "Playful"],
    interests: ["Valorant", "Modular Synth", "Bouldering", "Post-Rock"],
    compatibility: 96,
  },
  {
    id: "user-elena",
    name: "Elena Rostova",
    age: 26,
    gender: "Woman",
    location: "Seattle, WA",
    distance: "2.4 miles away",
    school: "UW Human-Computer Interaction",
    occupation: "Firmware Engineer",
    online: true,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bio: "Building custom split keyboards by day, running high-tier dungeons in Elden Ring by night. Looking for someone who stays calm under pressure and loves banter.",
    selfTraits: ["Analytical", "Tenacious", "Caffeinated"],
    seekTraits: ["Playful", "Direct", "Resilient"],
    interests: ["Elden Ring", "Rust", "Bouldering", "Custom Keyboards", "Ambient Techno"],
    compatibility: 92,
  },
  {
    id: "user-marcus",
    name: "Marcus Vance",
    age: 28,
    gender: "Man",
    location: "Seattle, WA",
    distance: "3.1 miles away",
    school: "Cornish College of the Arts",
    occupation: "Analog Photographer & Producer",
    online: false,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bio: "Eurorack synth rack takes up half my living room. Big fan of 90s anime soundtracks, dark ambient techno, and analog 35mm film photography.",
    selfTraits: ["Creative", "Thoughtful", "Nocturnal"],
    seekTraits: ["Curious", "Grounded", "Witty"],
    interests: ["Eurorack", "Evangelion", "Analog 35mm", "Signalis", "IDM"],
    compatibility: 88,
  },
  {
    id: "user-aria",
    name: "Aria Thorne",
    age: 25,
    gender: "Woman",
    location: "Bellevue, WA",
    distance: "5.0 miles away",
    school: "DigiPen Institute of Technology",
    occupation: "Game Engine Programmer",
    online: true,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    bio: "Obsessed with roguelikes, math rock, and climbing V5s. Let's do a Doodle Duel or trade obscure synth tracks before deciding to grab boba.",
    selfTraits: ["Competitive", "Geeky", "Energetic"],
    seekTraits: ["Authentic", "Quick-Witted", "Adventurous"],
    interests: ["Hades II", "Bouldering", "Math Rock", "C++", "Balatro"],
    compatibility: 94,
  },
  {
    id: "user-kaito",
    name: "Kaito Tanaka",
    age: 27,
    gender: "Man",
    location: "Seattle, WA",
    distance: "4.2 miles away",
    school: "ArtCenter College of Design",
    occupation: "Motion Designer",
    online: true,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    bio: "Obsessed with Akira, 3D procedural animations, and coffee brewing rituals. I challenge you to a Persona guessing match!",
    selfTraits: ["Observant", "Patient", "Passionate"],
    seekTraits: ["Artistic", "Playful", "Open-Minded"],
    interests: ["Blender 3D", "Cyberpunk", "Specialty Coffee", "City Pop"],
    compatibility: 89,
  }
];

export const INITIAL_MATCHES = [
  {
    id: "match-alex",
    profile: PROFILES[0],
    lastMessage: "I challenge you to Number Duel! You won't guess under 5 tries 😈",
    time: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: "match-elena",
    profile: PROFILES[1],
    lastMessage: "That collaborative canvas turned out chaotic in the best way possible haha",
    time: "1h ago",
    unread: 0,
    online: true,
  },
  {
    id: "match-aria",
    profile: PROFILES[3],
    lastMessage: "Are you free for a co-op Hades run later?",
    time: "Yesterday",
    unread: 0,
    online: false,
  }
];

export const INITIAL_CHAT_MESSAGES = {
  "match-alex": [
    {
      id: "m-1",
      sender: "them",
      text: "Hey! Saw you're into modular synths and post-rock too. Did you record that ambient patch yourself?",
      timestamp: "10:24 PM",
    },
    {
      id: "m-2",
      sender: "me",
      text: "Yeah! Recorded it with a MicroFreak running into a stereo reverb pedal. Total happy accident.",
      timestamp: "10:25 PM",
    },
    {
      id: "m-3",
      sender: "them",
      type: "game_invite",
      gameTitle: "Number Duel",
      gameType: "number_duel",
      text: "I challenge you to Number Duel! You won't guess under 5 tries 😈",
      timestamp: "10:28 PM",
    }
  ],
  "match-elena": [
    {
      id: "m-e1",
      sender: "them",
      text: "Nice split keyboard build! What switches are you running on that board?",
      timestamp: "8:10 PM",
    },
    {
      id: "m-e2",
      sender: "me",
      text: "Lubed Boba U4Ts. Tactile bump is unmatched!",
      timestamp: "8:15 PM",
    },
    {
      id: "m-e3",
      sender: "them",
      text: "That collaborative canvas turned out chaotic in the best way possible haha",
      timestamp: "9:00 PM",
    }
  ],
  "match-aria": [
    {
      id: "m-a1",
      sender: "them",
      text: "Balatro high stakes run update: Ante 11 reached, feeling invincible 🔥",
      timestamp: "Yesterday",
    },
    {
      id: "m-a2",
      sender: "them",
      text: "Are you free for a co-op Hades run later?",
      timestamp: "Yesterday",
    }
  ]
};

export const MEME_VAULT = [
  {
    id: "meme-1",
    title: "Introvert at Parties",
    category: "Dating",
    url: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80",
    caption: "Me checking my phone in the corner pretending I'm reading an urgent work email",
  },
  {
    id: "meme-2",
    title: "Bug in Production",
    category: "Tech",
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
    caption: "It works on my local machine so it's not technically my fault",
  },
  {
    id: "meme-3",
    title: "Competitive Gaming Panic",
    category: "Gaming",
    url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80",
    caption: "One more game and then I sleep (it is currently 4:30 AM)",
  },
  {
    id: "meme-4",
    title: "First Date Anxiety",
    category: "Dating",
    url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80",
    caption: "Trying not to explain 4 hours of Evangelion lore on the first date",
  },
  {
    id: "meme-5",
    title: "Cat Stare",
    category: "Vibes",
    url: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=600&q=80",
    caption: "Waiting for you to reply to my meme with an equally cursed meme",
  },
  {
    id: "meme-6",
    title: "Synth Gear Addiction",
    category: "Music",
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    caption: "Just one more pedal and my sound will finally be complete, I promise",
  }
];

export const COMMUNITY_FEED_ITEMS = [
  {
    id: "feed-1",
    author: "Alex & You",
    type: "Shared Canvas",
    time: "10 mins ago",
    likes: 38,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    caption: "Doodled during our 20 Questions match. We call it 'Neon Cyber-Owl'.",
    tags: ["#SharedCanvas", "#Cyberpunk", "#ArtDuel"]
  },
  {
    id: "feed-2",
    author: "Elena & Marcus",
    type: "Arcade Showdown",
    time: "42 mins ago",
    likes: 74,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    caption: "Marcus guessed Number Duel on turn 3! Record time on the Seattle leaderboard.",
    tags: ["#NumberDuel", "#BrainDuel", "#Arcade"]
  },
  {
    id: "feed-3",
    author: "Aria & Kaito",
    type: "Custom Sticker",
    time: "2 hours ago",
    likes: 52,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    caption: "Hand-drawn meme sticker exported directly from in-chat canvas.",
    tags: ["#CustomSticker", "#DoodleDuel", "#Vibe"]
  }
];
