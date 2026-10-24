// src/data.js - Clean Data Matrices & Curated Profiles for Pact

export const CATEGORIZED_TAGS = {
  Gaming: [
    "Valorant", "Counter-Strike 2", "Apex Legends", "Overwatch 2", "Rainbow Six Siege", "Halo Infinite", "Team Fortress 2", "Call of Duty", "Battlefield", "Escape from Tarkov", "Hunt: Showdown", "The Finals", "Titanfall 2", "Destiny 2", "Helldivers 2", "Deep Rock Galactic", "Ready or Not", "DOOM Eternal", "Ultrakill",
    "Elden Ring", "Dark Souls", "Bloodborne", "Sekiro", "Lies of P", "Monster Hunter", "Dragon's Dogma 2", "The Witcher 3", "Cyberpunk 2077", "Horizon", "God of War", "Ghost of Tsushima", "Fallout", "Skyrim", "Mass Effect", "Nier: Automata",
    "Baldur's Gate 3", "Persona 5 Royal", "Final Fantasy XIV", "Final Fantasy VII", "Chrono Trigger", "Yakuza / Like a Dragon", "Fire Emblem", "XCOM 2", "Civilization VI", "Crusader Kings III", "Stellaris", "StarCraft II", "Total War", "RimWorld", "Factorio", "Satisfactory",
    "Tekken 8", "Street Fighter 6", "Guilty Gear Strive", "Super Smash Bros", "Mortal Kombat 1", "Granblue Fantasy", "Fightcade",
    "Hollow Knight", "Hades", "Hades II", "Dead Cells", "Celeste", "Ori", "Balatro", "Slay the Spire", "Inscryption", "Subnautica", "Outer Wilds", "Disco Elysium", "Signalis", "Dave the Diver", "Terraria", "Stardew Valley", "Minecraft", "Valheim", "Rust"
  ],
  "Anime & Manga": [
    "Neon Genesis Evangelion", "Cowboy Bebop", "Akira", "Ghost in the Shell", "Berserk", "Princess Mononoke", "Spirited Away", "Perfect Blue", "Serial Experiments Lain", "FLCL", "Samurai Champloo", "Space Dandy", "Ergo Proxy",
    "Monster", "20th Century Boys", "Pluto", "Death Note", "Psycho-Pass", "Steins;Gate", "Made in Abyss", "Madoka Magica", "Fate/Zero", "Vinland Saga", "Chainsaw Man", "Jujutsu Kaisen", "Attack on Titan", "Tokyo Ghoul", "Goodnight Punpun", "Dorohedoro",
    "Hunter x Hunter", "Fullmetal Alchemist", "Mob Psycho 100", "One Punch Man", "Bleach", "Demon Slayer", "DanDaDan", "Kaiju No. 8", "Solo Leveling", "JoJo's Bizarre Adventure",
    "Frieren: Beyond Journey's End", "Delicious in Dungeon", "The Apothecary Diaries", "Mushishi", "Vagabond", "Kingdom", "March Comes In Like a Lion", "Haikyuu!!", "Blue Lock", "Slam Dunk", "Bocchi the Rock!", "Yuru Camp", "Spy x Family", "Skip and Loafer", "Gunpla Building", "Manga Collecting"
  ],
  "Sports & Outdoors": [
    "Bouldering", "Lead Climbing", "Trad Climbing", "Powerlifting", "Olympic Weightlifting", "Calisthenics", "Gymnastic Rings", "CrossFit", "Mobility Training",
    "Brazilian Jiu-Jitsu", "Muay Thai", "Boxing", "Judo", "Kickboxing", "Mixed Martial Arts (MMA)",
    "Trail Running", "Marathon Training", "Gravel Biking", "Road Cycling", "Mountain Biking", "Bikepacking", "Triathlon", "Open Water Swimming", "Scuba Diving", "Surfing", "Snowboarding", "Downhill Skiing", "Backpacking", "Hiking",
    "Formula 1", "Sim Racing (iRacing)", "Go-Karting", "Skateboarding", "Padel Tennis", "Pickleball", "Badminton", "Volleyball"
  ],
  "Tech & Craft": [
    "Rust Language", "Systems Programming (C/C++)", "Linux / Open Source", "Custom Mechanical Keyboards", "Keycap Modding", "3D Printing (Voron/Bambu)", "CAD & Fusion 360", "Woodworking", "Leathercraft", "Electronics & Soldering", "Embedded Systems (ESP32/RP2040)", "Homelab & Self-Hosting", "Cybersecurity", "Terminal / Neovim", "WebGPU & Creative Coding", "Local AI / LLMs", "FPV Drones", "Mechanical Watches"
  ],
  "Music & Audio": [
    "Modular Synthesizers (Eurorack)", "Ambient Techno", "Synthwave", "Darkwave", "Industrial & EBM", "IDM (Aphex Twin / Autechre)", "Drum & Bass", "Deep House", "Lo-Fi Beats",
    "Post-Punk & New Wave", "Shoegaze & Dream Pop", "Math Rock", "Midwest Emo", "Post-Rock", "Progressive Metal", "Indie Rock", "90s Alternative",
    "Vinyl Record Collecting", "Audiophile Headphones", "DACs & Tube Amps", "Field Recording", "Ableton Live Music Production", "Guitar Pedals", "Bass Guitar", "Japanese City Pop"
  ],
  "Art & Visuals": [
    "Modern Architecture", "Minimalist Graphic Design", "Typography", "Analog 35mm Film Photography", "Medium Format (120mm)", "Darkroom Printing", "Street Photography", "Cinematography", "Digital Painting & Procreate", "Vector Illustration", "Pixel Art", "3D Blender Modeling", "Screenprinting & Risograph", "Ceramics & Pottery", "Zine Making"
  ]
};

export const ALL_TAGS = Object.entries(CATEGORIZED_TAGS).flatMap(([category, tags]) =>
  tags.map(name => ({ name, category }))
);

// High-end clean Unsplash avatars & profile photos
export const INITIAL_DISCOVERY_PROFILES = [
  {
    id: "user-elena",
    username: "elena_r",
    name: "Elena Rostova",
    age: 26,
    gender: "Woman",
    seeking: "Everyone",
    location: "Seattle, WA",
    distance: "2 miles away",
    online: true,
    statusText: "Online • Looking to game",
    education: "UW Human-Computer Interaction",
    occupation: "Firmware Engineer",
    intent: "Gaming & Activity Partner",
    relationshipStatus: "Single",
    faith: "Agnostic",
    drinking: "Socially",
    smoking: "Never",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    initials: "ER",
    bio: "Building custom split keyboards by day, running high-tier dungeons in Elden Ring and climbing V6s by night. Looking for someone who stays calm under pressure, loves banter, and is down for spontaneous weekend hikes.",
    selfWords: ["Analytical", "Tenacious", "Caffeinated"],
    seekWords: ["Playful", "Direct", "Resilient"],
    tags: ["Rust Language", "Bouldering", "Elden Ring", "Custom Mechanical Keyboards", "Ambient Techno", "Hades II", "Trail Running"]
  },
  {
    id: "user-marcus",
    username: "marcus_v",
    name: "Marcus Vance",
    age: 28,
    gender: "Man",
    seeking: "Women",
    location: "Seattle, WA",
    distance: "3 miles away",
    online: true,
    statusText: "Active now",
    education: "Berklee College of Music",
    occupation: "Sound Designer & Musician",
    intent: "Long-term relationship",
    relationshipStatus: "Single",
    faith: "Spiritual",
    drinking: "Socially",
    smoking: "Never",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    initials: "MV",
    bio: "Eurorack synth rack takes up half my living room. Big fan of 90s anime soundtracks, dark ambient techno, and analog 35mm film photography. Let's trade favorite obscure manga chapters or sketch together over coffee.",
    selfWords: ["Creative", "Thoughtful", "Nocturnal"],
    seekWords: ["Curious", "Grounded", "Witty"],
    tags: ["Modular Synthesizers (Eurorack)", "Neon Genesis Evangelion", "Analog 35mm Film Photography", "Berserk", "Signalis", "IDM (Aphex Twin / Autechre)"]
  },
  {
    id: "user-aria",
    username: "aria_t",
    name: "Aria Thorne",
    age: 25,
    gender: "Woman",
    seeking: "Men",
    location: "Bellevue, WA",
    distance: "6 miles away",
    online: true,
    statusText: "Ready for a duel",
    education: "Carnegie Mellon CS",
    occupation: "Graphics & Game Engine Dev",
    intent: "Casual dating",
    relationshipStatus: "Exploring",
    faith: "Atheist",
    drinking: "Never",
    smoking: "Never",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    initials: "AT",
    bio: "Currently porting a physics engine to WebGPU. Tekken 8 main with high prowess. If you can react to mixups and appreciate great design, we'll get along easily. Always up for bouldering or arcade games.",
    selfWords: ["Competitive", "Sharp", "Spontaneous"],
    seekWords: ["Witty", "Driven", "Playful"],
    tags: ["Tekken 8", "WebGPU & Creative Coding", "Systems Programming (C/C++)", "Cyberpunk 2077", "Vinland Saga", "Sim Racing (iRacing)"]
  },
  {
    id: "user-darius",
    username: "darius_s",
    name: "Darius Sterling",
    age: 29,
    gender: "Man",
    seeking: "Everyone",
    location: "Tacoma, WA",
    distance: "12 miles away",
    online: false,
    statusText: "Last active 20m ago",
    education: "RISD Industrial Design",
    occupation: "Architect & 3D Artist",
    intent: "Long-term relationship",
    relationshipStatus: "Single",
    faith: "Agnostic",
    drinking: "Socially",
    smoking: "Never",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    initials: "DS",
    bio: "Designing architectural models and 3D printing custom mechanical projects. Big on espresso profiling, bouldering, and quiet road trips with post-rock playlists. Let's see who has the quicker reflex tap time.",
    selfWords: ["Meticulous", "Warm", "Patient"],
    seekWords: ["Empathetic", "Expressive", "Organized"],
    tags: ["3D Printing (Voron/Bambu)", "Modern Architecture", "Post-Rock", "CAD & Fusion 360", "Bouldering", "Disco Elysium"]
  },
  {
    id: "user-sora",
    username: "sora_t",
    name: "Sora Tanaka",
    age: 27,
    gender: "Non-binary",
    seeking: "Everyone",
    location: "Seattle, WA",
    distance: "1.5 miles away",
    online: true,
    statusText: "In In-Chat Arena",
    education: "CalArts Animation",
    occupation: "Pixel Artist & Art Director",
    intent: "Gaming & Activity Partner",
    relationshipStatus: "Single",
    faith: "Atheist",
    drinking: "Socially",
    smoking: "Regularly",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    initials: "ST",
    bio: "Drawing 16-bit animations frame-by-frame and collecting retro gaming soundtracks. Always down for late-night doodle duels, spicy dilemma questions, and quick reaction showdowns.",
    selfWords: ["Eccentric", "Passionate", "Perceptive"],
    seekWords: ["Authentic", "Playful", "Challenger"],
    tags: ["Pixel Art", "Signalis", "Chainsaw Man", "Post-Punk & New Wave", "Frieren: Beyond Journey's End", "Darkwave"]
  }
];

// Clean Avatar HTML helper with guaranteed fallback
export function renderAvatarHTML(userOrPhoto, sizeClass = "w-10 h-10", initials = "U") {
  const photo = typeof userOrPhoto === "string" ? userOrPhoto : (userOrPhoto?.photo || "");
  const init = typeof userOrPhoto === "object" ? (userOrPhoto?.initials || userOrPhoto?.name?.slice(0, 2).toUpperCase() || initials) : initials;

  if (photo) {
    return `
      <div class="avatar-wrap ${sizeClass}">
        <img src="${photo}" alt="Avatar" class="avatar-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <div class="avatar-fallback" style="display:none;">${init}</div>
      </div>
    `;
  }
  return `
    <div class="avatar-wrap ${sizeClass}">
      <div class="avatar-fallback">${init}</div>
    </div>
  `;
}

// Curated Memes for the Meme Vault
export const MEME_VAULT = [
  {
    id: "meme-1",
    category: "Gaming",
    title: "1 HP Clutch",
    caption: "Heart rate hitting 180 BPM in 1v3 overtime",
    svgIcon: `
      <svg viewBox="0 0 100 80" width="100%" height="80" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="80" rx="8" fill="#1E293B"/>
        <path d="M 10 40 L 30 40 L 40 15 L 50 65 L 60 30 L 70 45 L 80 40 L 90 40" fill="none" stroke="#EF4444" stroke-width="2.5"/>
        <text x="50" y="74" text-anchor="middle" font-size="9" fill="#94A3B8" font-weight="bold" font-family="sans-serif">HP: 01 // OVERTIME</text>
      </svg>
    `
  },
  {
    id: "meme-2",
    category: "Gaming",
    title: "Malenia Stagger Fail",
    caption: "Me buffed to max using ultimate combo vs boss",
    svgIcon: `
      <svg viewBox="0 0 100 80" width="100%" height="80" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="80" rx="8" fill="#1E293B"/>
        <polygon points="50,15 80,60 20,60" fill="none" stroke="#F59E0B" stroke-width="2"/>
        <circle cx="50" cy="45" r="8" fill="#2563EB"/>
        <text x="50" y="74" text-anchor="middle" font-size="9" fill="#F8FAFC" font-weight="bold" font-family="sans-serif">0.001% DMG DEALT</text>
      </svg>
    `
  },
  {
    id: "meme-3",
    category: "Anime",
    title: "Canon Evidence",
    caption: "When someone asks for proof in any anime debate",
    svgIcon: `
      <svg viewBox="0 0 100 80" width="100%" height="80" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="80" rx="8" fill="#1E293B"/>
        <rect x="25" y="15" width="50" height="42" rx="4" fill="#0F172A" stroke="#2563EB" stroke-width="1.5"/>
        <line x1="32" y1="26" x2="68" y2="26" stroke="#94A3B8" stroke-width="2"/>
        <line x1="32" y1="36" x2="68" y2="36" stroke="#94A3B8" stroke-width="2"/>
        <line x1="32" y1="46" x2="55" y2="46" stroke="#10B981" stroke-width="2"/>
        <text x="50" y="73" text-anchor="middle" font-size="8" fill="#94A3B8" font-weight="bold" font-family="sans-serif">IT WAS STATED IN CFYOW</text>
      </svg>
    `
  },
  {
    id: "meme-4",
    category: "Dating",
    title: "Activity First",
    caption: "Skipping small talk straight to high-stakes Number Duel",
    svgIcon: `
      <svg viewBox="0 0 100 80" width="100%" height="80" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="80" rx="8" fill="#1E293B"/>
        <circle cx="35" cy="35" r="14" fill="none" stroke="#2563EB" stroke-width="2"/>
        <circle cx="65" cy="35" r="14" fill="none" stroke="#10B981" stroke-width="2"/>
        <path d="M 45 35 L 55 35" stroke="#F8FAFC" stroke-width="2"/>
        <text x="50" y="72" text-anchor="middle" font-size="9" fill="#10B981" font-weight="bold" font-family="sans-serif">PACT LOCKED IN</text>
      </svg>
    `
  }
];

// Initial Vibe Feed Posts
export const INITIAL_FEED_POSTS = [
  {
    id: "post-1",
    author: "elena_r",
    authorName: "Elena Rostova",
    timeAgo: "20m ago",
    type: "doodle",
    title: "Late night doodle of Gas Works skyline",
    prompt: "Prompt: Quick draw your favorite urban view",
    likes: 42,
    replies: 7,
    authorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    authorInitials: "ER"
  },
  {
    id: "post-2",
    author: "marcus_v",
    authorName: "Marcus Vance",
    timeAgo: "1h ago",
    type: "meme_rating",
    title: "Cable chaos vs Minimalist desk setup",
    prompt: "Rate the chaos level: 1 to 10",
    likes: 29,
    replies: 12,
    ratingScore: 9.4,
    authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    authorInitials: "MV"
  },
  {
    id: "post-3",
    author: "sora_t",
    authorName: "Sora Tanaka",
    timeAgo: "3h ago",
    type: "sticker",
    title: "Midnight Cat Coffee Sticker",
    prompt: "Hand-drawn sticker export directly from in-chat arena",
    likes: 68,
    replies: 15,
    authorPhoto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    authorInitials: "ST"
  }
];

// Mystery Personas for Speed Akinator
export const PERSONA_DATABASE = [
  {
    name: "Ada Lovelace",
    clues: ["First computer programmer", "Wrote algorithm for Babbage Engine"],
    checks: { human: true, alive: false, tech: true, fictional: false, gaming: false }
  },
  {
    name: "Hideo Kojima",
    clues: ["Visionary game creator", "Metal Gear Solid and Death Stranding"],
    checks: { human: true, alive: true, tech: true, fictional: false, gaming: true }
  },
  {
    name: "Master Chief",
    clues: ["Spartan-117 super soldier", "Green armor and Cortana companion"],
    checks: { human: false, alive: false, tech: true, fictional: true, gaming: true }
  },
  {
    name: "Alan Turing",
    clues: ["Father of computer science", "Cracked Enigma at Bletchley Park"],
    checks: { human: true, alive: false, tech: true, fictional: false, gaming: false }
  }
];

// Dilemmas for Imposter AI
export const IMPOSTER_DILEMMAS = [
  {
    dilemma: "If you could eliminate one minor human inconvenience forever, what would it be?",
    humanAnswers: [
      "Having one earbud catch on a doorknob and yank out of your ear.",
      "The awkward two-step dance when you try to pass someone on a narrow sidewalk."
    ],
    aiAnswer: "To optimize metabolic energy conservation, I would eliminate the requirement of blinking, freeing up approximately 28,000 involuntary eyelid contractions per day."
  },
  {
    dilemma: "What is humanity's weirdest invention that everyone accepts as normal?",
    humanAnswers: [
      "Lawn grass. We spend hours cutting green weeds we cannot eat so neighbors don't judge us.",
      "Alarm clocks that violently shock us awake out of deep sleep."
    ],
    aiAnswer: "Standardized paper currency tokens, as organic entities trade cellulose rectangles rather than direct nutrient blocks."
  }
];

// Spicy / Deep Prompts for Spin the Bottle
export const SPICY_PROMPTS = [
  { level: "Chill", text: "What is an unpopular opinion you hold in your primary hobby?" },
  { level: "Fun", text: "What's the funniest strategic mistake you ever made in a game or project?" },
  { level: "Deep", text: "What is a belief you held 5 years ago that you now realize was completely wrong?" },
  { level: "Spicy", text: "What is something people assume about you based on your aesthetic that is 100% false?" }
];
