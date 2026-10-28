// src/mockData.js - 100+ Categorized Interests, Rich Artist Dataset with Visual Avatars, and 10 Expanded Mock Profiles

export const CATEGORIZED_INTERESTS = {
  "Anime & Pop Culture": [
    "Bleach", "Jujutsu Kaisen", "Dragon Ball", "One Piece", "Studio Ghibli",
    "Manga Collecting", "Cosplay", "Demon Slayer", "Attack on Titan",
    "Cyberpunk Edgerunners", "Chainsaw Man", "Death Note", "Neon Genesis",
    "Naruto", "Hunter x Hunter", "Spy x Family", "Tokyo Ghoul",
    "Jojo's Bizarre Adventure", "Berserk", "Fullmetal Alchemist", "Akira",
    "Spirited Away", "Cowboy Bebop", "Vinland Saga", "Sailor Moon"
  ],
  "Gaming": [
    "Action RPGs", "Valorant", "Fighting Games", "Steam Deck", "Retro Arcade",
    "Elden Ring", "eSports", "Chess", "Zelda", "Apex Legends",
    "League of Legends", "Overwatch 2", "Minecraft", "Genshin Impact",
    "Hollow Knight", "Cyberpunk 2077", "Baldur's Gate 3", "Super Smash Bros",
    "Dark Souls", "Speedrunning", "Final Fantasy", "Helldivers 2", "Hades",
    "Balatro", "CS:GO"
  ],
  "Sports & Outdoors": [
    "Football", "Bouldering", "Gym / Lifting", "Cycling", "Meditation",
    "Hiking", "Running", "Pilates", "Calisthenics", "Surfing",
    "Skateboarding", "Yoga", "Swimming", "Rock Climbing", "Martial Arts",
    "Tennis", "Badminton", "Trail Running", "Snowboarding", "Paddleboarding",
    "Powerlifting", "Scuba Diving", "Ultimate Frisbee", "Volleyball"
  ],
  "Music & Performance": [
    "Indie Rock", "Phonk", "Hip-Hop", "Techno", "Vinyl", "Electric Guitar",
    "Drumming", "Concerts", "Modular Synthesizers", "Shoegaze", "R&B",
    "Dream Pop", "Hyperpop", "House", "Jazz Fusion", "Metalcore",
    "Classical Piano", "DJing", "Karaoke", "Math Rock", "Ambient",
    "Lo-Fi Beats", "K-Pop", "City Pop", "Midwest Emo"
  ],
  "Tech & Innovation": [
    "Digital Illustration", "Coding", "UI/UX", "AI Prompting", "Film Photography",
    "Creative Writing", "3D Modeling", "Blender", "Pottery", "Video Editing",
    "Game Dev", "Mechanical Keyboards", "Open Source", "Poetry", "Zine Making",
    "Darkroom Printing", "Robotics", "VR / AR", "Pixel Art", "Calligraphy",
    "Architecture", "Graphic Design", "Hardware Hacking", "Creative Coding"
  ],
  "Creative Arts & Chill": [
    "Coffee Brewing", "Baking", "Cooking Experiments", "Ramen Trails",
    "Stargazing", "Board Games", "Matchamaking", "Specialty Tea", "Wine Tasting",
    "Street Food", "Plant Parenting", "Thrifting", "Book Clubs",
    "Late-night Drives", "Picnic Hopping", "Film Festivals", "Sourdough",
    "Fermentation", "Vintage Hunting", "Trivia Nights", "Craft Beer",
    "Boba Runs", "Sunset Chasing", "Museum Wandering"
  ]
};

// Flattened list of all interests
export const ALL_INTERESTS = Object.entries(CATEGORIZED_INTERESTS).flatMap(
  ([category, list]) => list.map(item => ({ name: item, category }))
);

// 160+ Iconic Global Music Artists & Creators with high-res avatar thumbnails
export const GLOBAL_ARTISTS = [
  // Michael Jackson (Explicitly Compulsory)
  {
    name: "Michael Jackson",
    genre: "Pop / R&B / Soul",
    avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80"
  },
  // The Weeknd
  {
    name: "The Weeknd",
    genre: "R&B / Synth-Pop",
    avatar: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=200&q=80"
  },
  // Arctic Monkeys
  {
    name: "Arctic Monkeys",
    genre: "Indie Rock",
    avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80"
  },
  // A$AP Rocky
  {
    name: "A$AP Rocky",
    genre: "Hip-Hop",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
  },
  // Daft Punk
  {
    name: "Daft Punk",
    genre: "Electronic / French House",
    avatar: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=200&q=80"
  },
  // Lana Del Rey
  {
    name: "Lana Del Rey",
    genre: "Dream Pop / Baroque",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  // Kendrick Lamar
  {
    name: "Kendrick Lamar",
    genre: "Hip-Hop / West Coast",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  // Radiohead
  {
    name: "Radiohead",
    genre: "Art Rock / Electronic",
    avatar: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=200&q=80"
  },
  // Frank Ocean
  {
    name: "Frank Ocean",
    genre: "R&B / Neo-Soul",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80"
  },
  // Ado
  {
    name: "Ado",
    genre: "J-Pop",
    avatar: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=200&q=80"
  },
  // Billie Eilish
  {
    name: "Billie Eilish",
    genre: "Alt Pop",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
  },
  // Tyler, The Creator
  {
    name: "Tyler, The Creator",
    genre: "Hip-Hop / Neo-Soul",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
  },
  // Tame Impala
  {
    name: "Tame Impala",
    genre: "Psychedelic Pop",
    avatar: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=200&q=80"
  },
  // Charli XCX
  {
    name: "Charli XCX",
    genre: "Hyperpop / Club",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
  },
  // Chappell Roan
  {
    name: "Chappell Roan",
    genre: "Synth-Pop",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  },
  // Deftones
  {
    name: "Deftones",
    genre: "Alt Metal / Shoegaze",
    avatar: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=200&q=80"
  },
  // Gorillaz
  {
    name: "Gorillaz",
    genre: "Alt / Electronic",
    avatar: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=200&q=80"
  },
  // Mitski
  {
    name: "Mitski",
    genre: "Indie Rock",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  // SZA
  {
    name: "SZA",
    genre: "R&B / Soul",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80"
  },
  // Taylor Swift
  {
    name: "Taylor Swift",
    genre: "Pop / Folk",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80"
  },
  // Travis Scott
  {
    name: "Travis Scott",
    genre: "Hip-Hop / Psychedelic",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  // Fred again..
  {
    name: "Fred again..",
    genre: "Electronic / House",
    avatar: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=200&q=80"
  },
  // Aphex Twin
  {
    name: "Aphex Twin",
    genre: "Electronic / IDM",
    avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80"
  },
  // Khruangbin
  {
    name: "Khruangbin",
    genre: "Psychedelic / Funk",
    avatar: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=200&q=80"
  },
  // Bon Iver
  {
    name: "Bon Iver",
    genre: "Indie Folk",
    avatar: "https://images.unsplash.com/photo-1445985543469-753ec9c0e7a4?auto=format&fit=crop&w=200&q=80"
  },
  // Fujii Kaze
  {
    name: "Fujii Kaze",
    genre: "J-Pop / Jazz",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
  },
  // Joji
  {
    name: "Joji",
    genre: "Lo-Fi / R&B",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  // Clairo
  {
    name: "Clairo",
    genre: "Bedroom Pop",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
  },
  // Boygenius
  {
    name: "Boygenius",
    genre: "Indie Rock",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
  },
  // Beach House
  {
    name: "Beach House",
    genre: "Dream Pop",
    avatar: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=200&q=80"
  },
  // Drake
  {
    name: "Drake",
    genre: "Hip-Hop / R&B",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  // Dua Lipa
  {
    name: "Dua Lipa",
    genre: "Disco-Pop",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  // Avicii
  {
    name: "Avicii",
    genre: "EDM / Melodic",
    avatar: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=200&q=80"
  },
  // Adele
  {
    name: "Adele",
    genre: "Soul / Pop",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  },
  // Coldplay
  {
    name: "Coldplay",
    genre: "Alt Rock / Pop",
    avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80"
  },
  // BTS
  {
    name: "BTS",
    genre: "K-Pop",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
  },
  // Blackpink
  {
    name: "Blackpink",
    genre: "K-Pop",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
  },
  // NewJeans
  {
    name: "NewJeans",
    genre: "K-Pop / R&B",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
  },
  // YOASOBI
  {
    name: "YOASOBI",
    genre: "J-Pop",
    avatar: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=200&q=80"
  },
  // Zach Bryan
  {
    name: "Zach Bryan",
    genre: "Country / Folk",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  // Dominic Fike
  {
    name: "Dominic Fike",
    genre: "Alt / Indie Rock",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
  },
  // Daniel Caesar
  {
    name: "Daniel Caesar",
    genre: "R&B / Soul",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
  },
  // Mac Miller
  {
    name: "Mac Miller",
    genre: "Hip-Hop / Jazz",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  // Phoebe Bridgers
  {
    name: "Phoebe Bridgers",
    genre: "Indie Folk",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  // Steve Lacy
  {
    name: "Steve Lacy",
    genre: "Lo-Fi / R&B",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80"
  },
  // Linkin Park
  {
    name: "Linkin Park",
    genre: "Nu Metal / Alt Rock",
    avatar: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=200&q=80"
  },
  // Blink-182
  {
    name: "Blink-182",
    genre: "Pop Punk",
    avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80"
  },
  // Nirvana
  {
    name: "Nirvana",
    genre: "Grunge / Rock",
    avatar: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=200&q=80"
  },
  // Olivia Rodrigo
  {
    name: "Olivia Rodrigo",
    genre: "Pop Punk / Pop",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
  },
  // Hozier
  {
    name: "Hozier",
    genre: "Indie Rock / Blues",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
  },
  // Harry Styles
  {
    name: "Harry Styles",
    genre: "Pop / Rock",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  // Post Malone
  {
    name: "Post Malone",
    genre: "Hip-Hop / Pop",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  // Eminem
  {
    name: "Eminem",
    genre: "Hip-Hop",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
  },
  // Queen
  {
    name: "Queen",
    genre: "Classic Rock",
    avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80"
  },
  // Fleetwood Mac
  {
    name: "Fleetwood Mac",
    genre: "Classic Rock",
    avatar: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=200&q=80"
  },
  // The Strokes
  {
    name: "The Strokes",
    genre: "Indie Rock",
    avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80"
  },
  // Cigarettes After Sex
  {
    name: "Cigarettes After Sex",
    genre: "Dream Pop",
    avatar: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=200&q=80"
  },
  // Alvvays
  {
    name: "Alvvays",
    genre: "Indie Pop",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
  },
  // Slowdive
  {
    name: "Slowdive",
    genre: "Shoegaze",
    avatar: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=200&q=80"
  },
  // Men I Trust
  {
    name: "Men I Trust",
    genre: "Dream Pop / Indie",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  }
];

// Default logged-in user profile
export const CURRENT_USER = {
  id: "user-me",
  name: "Anant Baid",
  age: 23,
  gender: "Man",
  pronouns: "he/him",
  datingPreferenceGender: "Everyone",
  preferredMinAge: 20,
  preferredMaxAge: 27,
  hometown: "San Francisco, CA",
  maxDistanceKm: 150,
  photos: [
    { 
      url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80", 
      caption: "Golden hour rooftop hackathon" 
    },
    { 
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80", 
      caption: "Bouldering session at Dogpatch" 
    },
    { 
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80", 
      caption: "Live modular synth performance" 
    }
  ],
  bio: "Creative technologist & strategy gamer. Always down for late-night bouldering or deep design rabbit holes.",
  faith: "Spiritual",
  connectionGoal: "Long-term",
  threeWords: ["Curious", "Spontaneous", "Caffeinated"],
  smoking: "Never",
  drinking: "Occasionally",
  heightCm: 180,
  weightKg: 72,
  occupationType: "Job",
  workplaceOrCollege: "Pact Labs",
  interests: ["Valorant", "Modular Synthesizers", "Bouldering", "Coding", "UI/UX", "Indie Rock"],
  topArtists: ["Frank Ocean", "Michael Jackson", "Tame Impala", "Arctic Monkeys"],
  onboardingComplete: true
};
// ============================================================================
// DIVERGENT PROFILE POOLS (100% DISJOINT ACROSS DECK, SPARKS, CHAT & NOTIFS)
// Strictly separated by gender: Women (28 profiles) & Men (28 profiles)
// ============================================================================

// ----------------------------------------------------------------------------
// 1. DECK / SWIPER POOL: 15 FEMALE PROFILES (5 with Multi-Photo Captioned Albums)
// ----------------------------------------------------------------------------
export const DECK_PROFILES_FEMALE = [
  {
    id: "deck-f-1",
    name: "Elena Rostova",
    age: 24,
    gender: "Woman",
    hometown: "Seattle, WA",
    location: "Seattle, WA",
    hometownDistanceKm: 18,
    distance: "18 km away",
    occupation: "Industrial Designer",
    school: "University of Washington",
    online: true,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        caption: "Studio prototyping split keyboards"
      },
      {
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        caption: "Sending a V6 boulder in Leavenworth"
      },
      {
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
        caption: "Post-climb espresso"
      }
    ],
    bio: "Sculpting ergonomic split mechanical keyboards by day, sending V6 boulder problems by night. Looking for someone who loves rapid banter, neon synthwave, and anime marathons.",
    selfTraits: ["Tactile", "Tenacious", "Playful"],
    threeWords: ["Tactile", "Tenacious", "Playful"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["Bouldering", "Mechanical Keyboards", "Cyberpunk Edgerunners", "Indie Rock", "Anime & Pop Culture"],
    topArtists: ["Arctic Monkeys", "Radiohead", "Deftones", "The Weeknd"],
    compatibility: 96,
    gamePrompt: "I bet you can't beat my 194ms reaction speed in Reflex Tap Race ⚡"
  },
  {
    id: "deck-f-2",
    name: "Aria Takahashi",
    age: 22,
    gender: "Woman",
    hometown: "San Francisco, CA",
    location: "San Francisco, CA",
    hometownDistanceKm: 6,
    distance: "6 km away",
    occupation: "Concept Artist",
    school: "Academy of Art University",
    online: true,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        caption: "Painting Ghibli-inspired cloudscapes"
      },
      {
        url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
        caption: "Weekend pottery fail"
      },
      {
        url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
        caption: "Flea market finds"
      }
    ],
    bio: "Concept artist building anime landscapes. High on matcha, low on sleep. Show me your most unhinged playlist.",
    selfTraits: ["Creative", "Ethereal", "Unfiltered"],
    threeWords: ["Creative", "Ethereal", "Unfiltered"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Studio Ghibli", "Digital Illustration", "Matchamaking", "Indie Rock", "Zelda"],
    topArtists: ["YOASOBI", "Tame Impala", "Mitski", "Frank Ocean"],
    compatibility: 95,
    gamePrompt: "Can you guess my favorite Studio Ghibli character in 20 Questions? 🐉"
  },
  {
    id: "deck-f-3",
    name: "Chloe Vance",
    age: 25,
    gender: "Woman",
    hometown: "Brooklyn, NY",
    location: "Brooklyn, NY",
    hometownDistanceKm: 12,
    distance: "12 km away",
    occupation: "Film Curator & Photographer",
    school: "NYU Tisch",
    online: true,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
        caption: "Darkroom film negatives review"
      },
      {
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
        caption: "Weekend pottery fail"
      },
      {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        caption: "Flea market finds"
      }
    ],
    bio: "Shooting 35mm film in underground concerts, hoarding vinyl records, and thrift shopping in Bushwick.",
    selfTraits: ["Artistic", "Spontaneous", "Vintage"],
    threeWords: ["Artistic", "Spontaneous", "Vintage"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["Film Photography", "Vinyl", "Thrifting", "Shoegaze", "Darkroom Printing"],
    topArtists: ["Slowdive", "The Strokes", "Alvvays", "Men I Trust"],
    compatibility: 93,
    gamePrompt: "Doodle Duel showdown: draw your signature film camera! 📷"
  },
  {
    id: "deck-f-4",
    name: "Maya Lin",
    age: 23,
    gender: "Woman",
    hometown: "Austin, TX",
    location: "Austin, TX",
    hometownDistanceKm: 8,
    distance: "8 km away",
    occupation: "Sound Designer & DJ",
    school: "UT Austin",
    online: true,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
        caption: "Live modular synth set at warehouse"
      },
      {
        url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
        caption: "Post-climb espresso"
      }
    ],
    bio: "Sampling analog synths and making warehouse crowds bounce. Also an undercover chess nerd.",
    selfTraits: ["Electric", "Rhythmic", "Geeky"],
    threeWords: ["Electric", "Rhythmic", "Geeky"],
    faith: "Spiritual",
    connectionGoal: "Short-term / Playful",
    interests: ["Modular Synthesizers", "DJing", "Chess", "Techno", "Specialty Tea"],
    topArtists: ["Fred again..", "Four Tet", "Daft Punk", "Kaytranada"],
    compatibility: 94,
    gamePrompt: "Number Duel challenge: can you outsmart my opening gambit?"
  },
  {
    id: "deck-f-5",
    name: "Zoe Sterling",
    age: 24,
    gender: "Woman",
    hometown: "Chicago, IL",
    location: "Chicago, IL",
    hometownDistanceKm: 14,
    distance: "14 km away",
    occupation: "Frontend Engineer & Gamer",
    school: "Northwestern University",
    online: true,
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
        caption: "Custom mechanical keyboard sound test"
      },
      {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        caption: "Ramen crawl in West Loop"
      }
    ],
    bio: "Building snappy web apps by day, climbing ranked Valorant ladders by night. Ante 11 in Balatro.",
    selfTraits: ["Witty", "Competitive", "Caffeinated"],
    threeWords: ["Witty", "Competitive", "Caffeinated"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["Valorant", "Balatro", "Coding", "UI/UX", "Ramen Trails"],
    topArtists: ["Porter Robinson", "NewJeans", "Charli xcx", "Chvrches"],
    compatibility: 95,
    gamePrompt: "I bet you can't beat my 10s Reflex Tap score!"
  },
  {
    id: "deck-f-6",
    name: "Nina Patel",
    age: 23,
    gender: "Woman",
    hometown: "Denver, CO",
    location: "Denver, CO",
    hometownDistanceKm: 22,
    distance: "22 km away",
    occupation: "Trail Runner & Plant Biologist",
    school: "CU Boulder",
    online: false,
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
        caption: "Sunrise run on Chautauqua Trail"
      }
    ],
    bio: "Sunrise trail running in the Flatirons followed by pour-over coffee experiments. Passionate about alpine flora.",
    selfTraits: ["Sunny", "Grounded", "Active"],
    threeWords: ["Sunny", "Grounded", "Active"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Trail Running", "Plant Parenting", "Coffee Brewing", "Hiking", "Meditation"],
    topArtists: ["Khruangbin", "Leon Bridges", "Fleet Foxes", "Bon Iver"],
    compatibility: 91,
    gamePrompt: "Can you guess my trail summit record in 20 Questions?"
  },
  {
    id: "deck-f-7",
    name: "Sienna Brooks",
    age: 25,
    gender: "Woman",
    hometown: "Los Angeles, CA",
    location: "Los Angeles, CA",
    hometownDistanceKm: 16,
    distance: "16 km away",
    occupation: "Fashion Stylist & Ceramist",
    school: "UCLA",
    online: true,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        caption: "Archival thrift pop-up in Silver Lake"
      }
    ],
    bio: "Curating archival streetwear and throwing wonky ceramic mugs. Let's debate the best matcha in Silver Lake.",
    selfTraits: ["Aesthetic", "Bubbly", "Chic"],
    threeWords: ["Aesthetic", "Bubbly", "Chic"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["Pottery", "Thrifting", "Matchamaking", "Architecture", "R&B"],
    topArtists: ["SZA", "Steve Lacy", "Frank Ocean", "Dominic Fike"],
    compatibility: 90,
    gamePrompt: "Doodle Duel: sketch your ideal vintage jacket!"
  },
  {
    id: "deck-f-8",
    name: "Tara Al-Mansoor",
    age: 24,
    gender: "Woman",
    hometown: "Portland, OR",
    location: "Portland, OR",
    hometownDistanceKm: 19,
    distance: "19 km away",
    occupation: "Book Conservator & Baker",
    school: "Reed College",
    online: false,
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
        caption: "Hand-binding leather poetry volumes"
      }
    ],
    bio: "Restoring antique manuscripts and fermenting sourdough starters. Obsessed with rainy Sunday book clubs.",
    selfTraits: ["Literary", "Thoughtful", "Warm"],
    threeWords: ["Literary", "Thoughtful", "Warm"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Book Clubs", "Sourdough", "Baking", "Poetry", "Specialty Tea"],
    topArtists: ["Phoebe Bridgers", "Sufjan Stevens", "Hozier", "Adrianne Lenker"],
    compatibility: 89,
    gamePrompt: "Tell me a book that made you question reality."
  },
  {
    id: "deck-f-9",
    name: "Riley Jenkins",
    age: 22,
    gender: "Woman",
    hometown: "Boston, MA",
    location: "Boston, MA",
    hometownDistanceKm: 11,
    distance: "11 km away",
    occupation: "Neuroscience Researcher",
    school: "MIT",
    online: true,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
        caption: "Laser microscopy lab session"
      }
    ],
    bio: "Mapping neural circuits with two-photon lasers. Spending weekends hanging off granite cliffs.",
    selfTraits: ["Analytical", "Adventurous", "Nerdy"],
    threeWords: ["Analytical", "Adventurous", "Nerdy"],
    faith: "Atheist",
    connectionGoal: "Long-term",
    interests: ["Rock Climbing", "Bouldering", "Robotics", "Trivia Nights", "Chess"],
    topArtists: ["Radiohead", "Muse", "Daft Punk", "Gorillaz"],
    compatibility: 92,
    gamePrompt: "Challenge me in Number Duel—winner buys the cannoli."
  },
  {
    id: "deck-f-10",
    name: "Jade Laurent",
    age: 26,
    gender: "Woman",
    hometown: "Montreal, QC",
    location: "Montreal, QC",
    hometownDistanceKm: 28,
    distance: "28 km away",
    occupation: "Urban Planner & Cyclist",
    school: "McGill University",
    online: true,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        caption: "Fixie bike cruise along Canal Lachine"
      }
    ],
    bio: "Designing car-free bike avenues and hunting down Montreal bagels. Fluent in French, sarcasm, and coffee.",
    selfTraits: ["Cosmopolitan", "Spirited", "Direct"],
    threeWords: ["Cosmopolitan", "Spirited", "Direct"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["Cycling", "Architecture", "Coffee Brewing", "Street Food", "Indie Rock"],
    topArtists: ["Arcade Fire", "Phoenix", "Men I Trust", "The 1975"],
    compatibility: 91,
    gamePrompt: "Can you guess my favorite Montreal neighborhood?"
  },
  {
    id: "deck-f-11",
    name: "Amara Chen",
    age: 23,
    gender: "Woman",
    hometown: "Toronto, ON",
    location: "Toronto, ON",
    hometownDistanceKm: 25,
    distance: "25 km away",
    occupation: "Indie Game Animator",
    school: "OCAD University",
    online: false,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        caption: "Pixel art boss animations in Aseprite"
      }
    ],
    bio: "Keyframing 2D fight animations for pixel roguelikes. Tell me your top 3 anime fight scenes.",
    selfTraits: ["Playful", "Expressive", "Geeky"],
    threeWords: ["Playful", "Expressive", "Geeky"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["Anime & Pop Culture", "Pixel Art", "Game Dev", "Chainsaw Man", "Hades"],
    topArtists: ["Eve", "Kenshi Yonezu", "Aimer", "Vaundy"],
    compatibility: 93,
    gamePrompt: "20 Questions: guess the anime weapon!"
  },
  {
    id: "deck-f-12",
    name: "Freya Lindqvist",
    age: 25,
    gender: "Woman",
    hometown: "Minneapolis, MN",
    location: "Minneapolis, MN",
    hometownDistanceKm: 32,
    distance: "32 km away",
    occupation: "Furniture Designer",
    school: "RISD",
    online: true,
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
        caption: "Welding brutalist steel side tables"
      }
    ],
    bio: "Welding steel and bentwood walnut tables. Passionate about brutalism, cold dips, and black coffee.",
    selfTraits: ["Craftsman", "Minimalist", "Calm"],
    threeWords: ["Craftsman", "Minimalist", "Calm"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Architecture", "Darkroom Printing", "Bouldering", "Vinyl", "Coffee Brewing"],
    topArtists: ["Bon Iver", "Sigur Rós", "Aphex Twin", "Brian Eno"],
    compatibility: 88,
    gamePrompt: "Doodle Duel: draw your dream chair!"
  },
  {
    id: "deck-f-13",
    name: "Kiera Walsh",
    age: 24,
    gender: "Woman",
    hometown: "San Diego, CA",
    location: "San Diego, CA",
    hometownDistanceKm: 15,
    distance: "15 km away",
    occupation: "Marine Biologist & Surfer",
    school: "UCSD",
    online: true,
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
        caption: "Dawn patrol at Black's Beach"
      }
    ],
    bio: "Surfing Black's Beach at 6 AM, studying bioluminescent plankton by afternoon. Sun-bleached hair and saltwater.",
    selfTraits: ["Sun-Drenched", "Daring", "Chill"],
    threeWords: ["Sun-Drenched", "Daring", "Chill"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Surfing", "Scuba Diving", "Swimming", "Stargazing", "Indie Pop"],
    topArtists: ["Dominic Fike", "Jack Johnson", "Ocean Alley", "Mac DeMarco"],
    compatibility: 90,
    gamePrompt: "Test your tap speed against a Pacific swell!"
  },
  {
    id: "deck-f-14",
    name: "Natasha Roman",
    age: 22,
    gender: "Woman",
    hometown: "Miami, FL",
    location: "Miami, FL",
    hometownDistanceKm: 20,
    distance: "20 km away",
    occupation: "3D Motion Designer",
    school: "Miami Ad School",
    online: false,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
        caption: "Neon cyberpunk render in Octane"
      }
    ],
    bio: "Making holographic render loops in Cinema4D. Obsessed with cyberpunk aesthetics and midnight drives.",
    selfTraits: ["Cyberpunk", "Bold", "Night-Owl"],
    threeWords: ["Cyberpunk", "Bold", "Night-Owl"],
    faith: "Agnostic",
    connectionGoal: "Short-term / Playful",
    interests: ["3D Modeling", "Blender", "Cyberpunk 2077", "Late-night Drives", "Hyperpop"],
    topArtists: ["Grimes", "Charli xcx", "SOPHIE", "Gesaffelstein"],
    compatibility: 92,
    gamePrompt: "Reflex race: can you match 120 FPS reaction time?"
  },
  {
    id: "deck-f-15",
    name: "Isla MacLeod",
    age: 26,
    gender: "Woman",
    hometown: "Vancouver, BC",
    location: "Vancouver, BC",
    hometownDistanceKm: 30,
    distance: "30 km away",
    occupation: "Landscape Architect",
    school: "UBC",
    online: true,
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
        caption: "Overlooking Garibaldi Lake summit"
      }
    ],
    bio: "Designing rooftop botanical sanctuaries. If there's an alpine lake within 15 km, I am hiking to it.",
    selfTraits: ["Earthy", "Resilient", "Adventurous"],
    threeWords: ["Earthy", "Resilient", "Adventurous"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Hiking", "Plant Parenting", "Rock Climbing", "Specialty Tea", "Indie Rock"],
    topArtists: ["The National", "Vampire Weekend", "Daughter", "The War on Drugs"],
    compatibility: 91,
    gamePrompt: "Can you guess the highest peak I've scrambled?"
  }
];

// ----------------------------------------------------------------------------
// 2. DECK / SWIPER POOL: 15 MALE PROFILES (5 with Multi-Photo Captioned Albums)
// ----------------------------------------------------------------------------
export const DECK_PROFILES_MALE = [
  {
    id: "deck-m-1",
    name: "Marcus Rivera",
    age: 24,
    gender: "Man",
    hometown: "Austin, TX",
    location: "Austin, TX",
    hometownDistanceKm: 15,
    distance: "15 km away",
    occupation: "Sound Engineer & Synth Builder",
    school: "UT Austin",
    online: true,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        caption: "Soldering synth module Eurorack"
      },
      {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
        caption: "Post-climb espresso"
      },
      {
        url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
        caption: "Retro arcade street fighter duel"
      }
    ],
    bio: "Building modular synthesizer cases from reclaimed walnut, dialing in vintage delay pedals, and climbing limestone crags in Austin.",
    selfTraits: ["Tactile", "Mellow", "Analog"],
    threeWords: ["Tactile", "Mellow", "Analog"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Modular Synthesizers", "Electric Guitar", "Bouldering", "Vinyl", "Coffee Brewing"],
    topArtists: ["Tame Impala", "Radiohead", "Khruangbin", "Michael Jackson"],
    compatibility: 96,
    gamePrompt: "Bet you can't beat my 10s tap race score! ⚡"
  },
  {
    id: "deck-m-2",
    name: "Dev Sharma",
    age: 23,
    gender: "Man",
    hometown: "San Francisco, CA",
    location: "San Francisco, CA",
    hometownDistanceKm: 7,
    distance: "7 km away",
    occupation: "Graphics Programmer",
    school: "UC Berkeley",
    online: true,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
        caption: "Debugging shaders at 2 AM"
      },
      {
        url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
        caption: "Weekend pottery fail"
      },
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        caption: "Bouldering session at Mission Cliffs"
      }
    ],
    bio: "Writing compute shaders for procedural worlds. When I'm not in OpenGL, I'm playing fighting games and making cold brew.",
    selfTraits: ["Analytical", "Playful", "Inventive"],
    threeWords: ["Analytical", "Playful", "Inventive"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["Coding", "Fighting Games", "Bouldering", "Retro Arcade", "Anime & Pop Culture"],
    topArtists: ["Daft Punk", "Porter Robinson", "The Strokes", "Arctic Monkeys"],
    compatibility: 95,
    gamePrompt: "20 Questions co-op: guess the video game boss!"
  },
  {
    id: "deck-m-3",
    name: "Kai Thorne",
    age: 25,
    gender: "Man",
    hometown: "Brooklyn, NY",
    location: "Brooklyn, NY",
    hometownDistanceKm: 13,
    distance: "13 km away",
    occupation: "Ceramist & Barista",
    school: "Pratt Institute",
    online: true,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
        caption: "Ceramics wheel spinning"
      },
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        caption: "Flea market finds"
      },
      {
        url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
        caption: "Pour-over chemex ritual"
      }
    ],
    bio: "Throwing stoneware mugs on the wheel, cupping single-origin roasts, and wandering record stores in Greenpoint.",
    selfTraits: ["Artistic", "Present", "Grounded"],
    threeWords: ["Artistic", "Present", "Grounded"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["Pottery", "Coffee Brewing", "Vinyl", "Specialty Tea", "Darkroom Printing"],
    topArtists: ["Frank Ocean", "Bon Iver", "Mac DeMarco", "Alvvays"],
    compatibility: 94,
    gamePrompt: "Doodle Duel match: draw the weirdest coffee mug!"
  },
  {
    id: "deck-m-4",
    name: "Liam Mercer",
    age: 24,
    gender: "Man",
    hometown: "Seattle, WA",
    location: "Seattle, WA",
    hometownDistanceKm: 9,
    distance: "9 km away",
    occupation: "Wildlife Photographer",
    school: "University of Washington",
    online: true,
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
        caption: "Trail running through Mt. Rainier mist"
      },
      {
        url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
        caption: "Acoustic indie folk songwriting"
      }
    ],
    bio: "Tracking bald eagles in the North Cascades with a telephoto lens. Acoustic fingerstyle guitar around the campfire.",
    selfTraits: ["Adventurous", "Gentle", "Soulful"],
    threeWords: ["Adventurous", "Gentle", "Soulful"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Trail Running", "Film Photography", "Hiking", "Electric Guitar", "Stargazing"],
    topArtists: ["Fleet Foxes", "Hozier", "Gregory Alan Isakov", "Lord Huron"],
    compatibility: 93,
    gamePrompt: "Can you beat me in Number Duel?"
  },
  {
    id: "deck-m-5",
    name: "Julian Ortiz",
    age: 25,
    gender: "Man",
    hometown: "Denver, CO",
    location: "Denver, CO",
    hometownDistanceKm: 20,
    distance: "20 km away",
    occupation: "Industrial Designer",
    school: "CU Boulder",
    online: true,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        caption: "Backcountry splitboarding in Vail"
      },
      {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
        caption: "Espresso bar testing roast profiles"
      }
    ],
    bio: "Prototyping technical outdoor gear. First tracks on powder days, flat whites on rest days.",
    selfTraits: ["Driven", "Tenacious", "Spontaneous"],
    threeWords: ["Driven", "Tenacious", "Spontaneous"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["Snowboarding", "Bouldering", "Architecture", "Coffee Brewing", "Industrial Design"],
    topArtists: ["Kaytranada", "RÜFÜS DU SOL", "Gorillaz", "Justice"],
    compatibility: 94,
    gamePrompt: "Reflex duel: let's test your reaction time!"
  },
  {
    id: "deck-m-6",
    name: "Ethan Cooper",
    age: 23,
    gender: "Man",
    hometown: "Chicago, IL",
    location: "Chicago, IL",
    hometownDistanceKm: 12,
    distance: "12 km away",
    occupation: "Fintech Dev & Chess Enthusiast",
    school: "University of Chicago",
    online: false,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
        caption: "Blitz chess at Lincoln Park"
      }
    ],
    bio: "High-frequency code architecture by day, blitz chess and deep dish pizza by night.",
    selfTraits: ["Sharp", "Witty", "Direct"],
    threeWords: ["Sharp", "Witty", "Direct"],
    faith: "Atheist",
    connectionGoal: "Long-term",
    interests: ["Chess", "Coding", "Trivia Nights", "Retro Arcade", "Indie Rock"],
    topArtists: ["Radiohead", "The Strokes", "Arctic Monkeys", "Interpol"],
    compatibility: 91,
    gamePrompt: "Can you beat my blitz chess puzzle score?"
  },
  {
    id: "deck-m-7",
    name: "Lucas Vance",
    age: 24,
    gender: "Man",
    hometown: "Portland, OR",
    location: "Portland, OR",
    hometownDistanceKm: 17,
    distance: "17 km away",
    occupation: "Specialty Baker & Fermenter",
    school: "Lewis & Clark College",
    online: true,
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
        caption: "Laminating flaky croissants"
      }
    ],
    bio: "Laminating flaky croissants and brewing wild kombucha. Let's trade favorite recipes and obscure movie recs.",
    selfTraits: ["Foodie", "Patient", "Warm"],
    threeWords: ["Foodie", "Patient", "Warm"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Sourdough", "Baking", "Cooking Experiments", "Specialty Tea", "Book Clubs"],
    topArtists: ["Japanese Breakfast", "Snail Mail", "Phoebe Bridgers", "Clairo"],
    compatibility: 90,
    gamePrompt: "Guess the secret ingredient in my sourdough!"
  },
  {
    id: "deck-m-8",
    name: "Noah Tanaka",
    age: 26,
    gender: "Man",
    hometown: "Los Angeles, CA",
    location: "Los Angeles, CA",
    hometownDistanceKm: 14,
    distance: "14 km away",
    occupation: "Anime Storyboard Artist",
    school: "CalArts",
    online: false,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
        caption: "Storyboarding combat beats"
      }
    ],
    bio: "Storyboarding dynamic shonen fight sequences. Always down for late-night ramen runs and retro arcade fighting games.",
    selfTraits: ["Visionary", "Dynamic", "Nocturnal"],
    threeWords: ["Visionary", "Dynamic", "Nocturnal"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["Anime & Pop Culture", "Bleach", "Digital Illustration", "Fighting Games", "Ramen Trails"],
    topArtists: ["Asian Kung-Fu Generation", "YOASOBI", "King Gnu", "Vaundy"],
    compatibility: 92,
    gamePrompt: "Akinator challenge: can the AI guess my favorite anime director?"
  },
  {
    id: "deck-m-9",
    name: "Rowan Bennett",
    age: 22,
    gender: "Man",
    hometown: "Boston, MA",
    location: "Boston, MA",
    hometownDistanceKm: 10,
    distance: "10 km away",
    occupation: "Roboticist & Rower",
    school: "Harvard University",
    online: true,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        caption: "Testing drone flight PID controllers"
      }
    ],
    bio: "Building quadruped walking robots and rowing on the Charles River at sunrise.",
    selfTraits: ["Tenacious", "Geeky", "Athletic"],
    threeWords: ["Tenacious", "Geeky", "Athletic"],
    faith: "Atheist",
    connectionGoal: "Long-term",
    interests: ["Robotics", "Rowing", "Gym / Lifting", "Hardware Hacking", "Coding"],
    topArtists: ["Muse", "Daft Punk", "CHVRCHES", "deadmau5"],
    compatibility: 90,
    gamePrompt: "Tap duel: test your reaction speed against my reflex code!"
  },
  {
    id: "deck-m-10",
    name: "Aaron Zhang",
    age: 25,
    gender: "Man",
    hometown: "San Jose, CA",
    location: "San Jose, CA",
    hometownDistanceKm: 18,
    distance: "18 km away",
    occupation: "Keyboard Designer & Climber",
    school: "San Jose State University",
    online: true,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
        caption: "CNC milling aluminum keyboard case"
      }
    ],
    bio: "Milling custom aluminum keyboard cases and lubing switches. Sending boulder problems at Dogpatch.",
    selfTraits: ["Tactile", "Methodical", "Playful"],
    threeWords: ["Tactile", "Methodical", "Playful"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["Mechanical Keyboards", "Bouldering", "3D Modeling", "UI/UX", "Balatro"],
    topArtists: ["Tame Impala", "Deftones", "Frank Ocean", "The Weeknd"],
    compatibility: 93,
    gamePrompt: "Show me your fastest tap score!"
  },
  {
    id: "deck-m-11",
    name: "Gabriel Rossi",
    age: 24,
    gender: "Man",
    hometown: "New York, NY",
    location: "New York, NY",
    hometownDistanceKm: 11,
    distance: "11 km away",
    occupation: "Jazz Drummer & Vinyl Collector",
    school: "Juilliard",
    online: true,
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
        caption: "Drumming late night session at Smalls"
      }
    ],
    bio: "Polyrhythms on the kit and digging through dusty jazz vinyl bins in Greenwich Village.",
    selfTraits: ["Rhythmic", "Soulful", "Spontaneous"],
    threeWords: ["Rhythmic", "Soulful", "Spontaneous"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Drumming", "Jazz Fusion", "Vinyl", "Concerts", "Coffee Brewing"],
    topArtists: ["Miles Davis", "Snarky Puppy", "Thundercat", "Kamasi Washington"],
    compatibility: 91,
    gamePrompt: "Doodle Duel: draw your favorite instrument!"
  },
  {
    id: "deck-m-12",
    name: "Felix Lind",
    age: 23,
    gender: "Man",
    hometown: "Minneapolis, MN",
    location: "Minneapolis, MN",
    hometownDistanceKm: 26,
    distance: "26 km away",
    occupation: "Indie Game Dev & Synthesist",
    school: "University of Minnesota",
    online: false,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
        caption: "Composing chiptune soundtrack"
      }
    ],
    bio: "Solo developing a cozy roguelike deckbuilder with hand-coded synth music.",
    selfTraits: ["Inventive", "Chill", "Creative"],
    threeWords: ["Inventive", "Chill", "Creative"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["Game Dev", "Balatro", "Modular Synthesizers", "Pixel Art", "Lo-Fi Beats"],
    topArtists: ["Disasterpeace", "Lena Raine", "C418", "Toby Fox"],
    compatibility: 92,
    gamePrompt: "Can you guess my secret game mechanic in 20 Questions?"
  },
  {
    id: "deck-m-13",
    name: "Samira 'Sam' O'Connor",
    age: 25,
    gender: "Man",
    hometown: "San Diego, CA",
    location: "San Diego, CA",
    hometownDistanceKm: 14,
    distance: "14 km away",
    occupation: "Kite Surfer & Marine Tech",
    school: "SDSU",
    online: true,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        caption: "Catching air on kiteboard at Mission Bay"
      }
    ],
    bio: "Harnessing Pacific winds on a kiteboard and mapping coral reefs with autonomous underwater sensors.",
    selfTraits: ["Free-Spirited", "Daring", "Warm"],
    threeWords: ["Free-Spirited", "Daring", "Warm"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Surfing", "Scuba Diving", "Robotics", "Sunset Chasing", "Indie Rock"],
    topArtists: ["Dominic Fike", "Still Woozy", "Glass Animals", "Vampire Weekend"],
    compatibility: 89,
    gamePrompt: "Number Duel: can you guess my lucky swell height?"
  },
  {
    id: "deck-m-14",
    name: "Zane Wilder",
    age: 26,
    gender: "Man",
    hometown: "Miami, FL",
    location: "Miami, FL",
    hometownDistanceKm: 21,
    distance: "21 km away",
    occupation: "Electronic Music Producer",
    school: "University of Miami",
    online: true,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
        caption: "Late night mastering session in studio"
      }
    ],
    bio: "Producing dark synthwave and phonk tracks. Late night coastal drives and arcade fighting games.",
    selfTraits: ["Electric", "Bold", "Night-Owl"],
    threeWords: ["Electric", "Bold", "Night-Owl"],
    faith: "Agnostic",
    connectionGoal: "Short-term / Playful",
    interests: ["Phonk", "Techno", "Late-night Drives", "Retro Arcade", "Modular Synthesizers"],
    topArtists: ["Kavinsky", "Carpenter Brut", "Gesaffelstein", "Justice"],
    compatibility: 90,
    gamePrompt: "Reflex Tap Race: let's test your bpm timing!"
  },
  {
    id: "deck-m-15",
    name: "Elliot Morales",
    age: 22,
    gender: "Man",
    hometown: "Atlanta, GA",
    location: "Atlanta, GA",
    hometownDistanceKm: 16,
    distance: "16 km away",
    occupation: "Film Director & Zine Creator",
    school: "Emory University",
    online: false,
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
        caption: "Shooting 16mm indie film on location"
      }
    ],
    bio: "Directing indie music videos on vintage Super 8 film and printing Risograph zines.",
    selfTraits: ["Artistic", "Eloquent", "Expressive"],
    threeWords: ["Artistic", "Eloquent", "Expressive"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Film Photography", "Video Editing", "Zine Making", "Poetry", "Indie Rock"],
    topArtists: ["Steve Lacy", "Tyler, The Creator", "Frank Ocean", "The 1975"],
    compatibility: 91,
    gamePrompt: "Doodle Duel: sketch an indie movie poster!"
  }
];

// ----------------------------------------------------------------------------
// 3. DAILY SPARKS POOL: 5 CURATED DISTINCT PROFILES PER GENDER (94%–98% Resonance)
// None of these profiles appear in Deck!
// ----------------------------------------------------------------------------
export const SPARKS_PROFILES_FEMALE = [
  {
    id: "sparks-f-1",
    name: "Valentina Cruz",
    age: 24,
    gender: "Woman",
    hometown: "San Francisco, CA",
    location: "San Francisco, CA",
    hometownDistanceKm: 5,
    distance: "5 km away",
    occupation: "Acoustic Ecologist & VR Audio",
    school: "Stanford University",
    online: true,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        caption: "Binaural sound recording in Muir Woods"
      }
    ],
    bio: "Acoustic ecologist & VR sound designer. I sample bird songs and modular synth drones in redwood forests. Let's make spatial soundscapes.",
    selfTraits: ["Resonant", "Playful", "Curious"],
    threeWords: ["Resonant", "Playful", "Curious"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Sound Design", "VR / AR", "Modular Synthesizers", "Stargazing", "Indie Rock"],
    topArtists: ["Aphex Twin", "Brian Eno", "Four Tet", "Tame Impala"],
    compatibility: 98,
    breakdownTag: "Modular Audio & VR Synergy",
    breakdownMusic: "Four Tet & Ambient",
    breakdownTrait: "Playful",
    gamePrompt: "I challenge you to Reflex Tap Race! Let's see your acoustic rhythm 🎵"
  },
  {
    id: "sparks-f-2",
    name: "Camille Dubois",
    age: 23,
    gender: "Woman",
    hometown: "New York, NY",
    location: "New York, NY",
    hometownDistanceKm: 9,
    distance: "9 km away",
    occupation: "Architectural Ceramist",
    school: "Columbia University",
    online: true,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        caption: "Sculpting ceramic facade tiles"
      }
    ],
    bio: "Architectural ceramist & indie coffee snob. If we go to an art gallery, I will critique the lighting. Obsessed with brutalist concrete & stoneware.",
    selfTraits: ["Curious", "Tactile", "Eloquent"],
    threeWords: ["Curious", "Tactile", "Eloquent"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["Architecture", "Pottery", "Coffee Brewing", "Specialty Tea", "Art & Chill"],
    topArtists: ["Alvvays", "Men I Trust", "The Japanese House", "Radiohead"],
    compatibility: 97,
    breakdownTag: "Creative Craft Synergy",
    breakdownMusic: "Alvvays & Men I Trust",
    breakdownTrait: "Curious",
    gamePrompt: "Can you guess my favorite architectural movement in 20 Questions?"
  },
  {
    id: "sparks-f-3",
    name: "Priya Sen",
    age: 25,
    gender: "Woman",
    hometown: "Austin, TX",
    location: "Austin, TX",
    hometownDistanceKm: 7,
    distance: "7 km away",
    occupation: "Bio-Computation Researcher",
    school: "UT Austin",
    online: true,
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
        caption: "Night cycling on Lady Bird Lake Trail"
      }
    ],
    bio: "Bio-computation researcher & night cyclist. Ask me about CRISPR algorithms or the best midnight breakfast tacos in town.",
    selfTraits: ["Spontaneous", "Witty", "Driven"],
    threeWords: ["Spontaneous", "Witty", "Driven"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Cycling", "Coding", "Street Food", "Indie Rock", "Trivia Nights"],
    topArtists: ["The Strokes", "Arctic Monkeys", "Yeah Yeah Yeahs", "Khruangbin"],
    compatibility: 96,
    breakdownTag: "High Energy Code & Cycling",
    breakdownMusic: "The Strokes & Indie Rock",
    breakdownTrait: "Spontaneous",
    gamePrompt: "Number Duel duel right now: winner picks our taco truck stop!"
  },
  {
    id: "sparks-f-4",
    name: "Hana Murakami",
    age: 22,
    gender: "Woman",
    hometown: "Seattle, WA",
    location: "Seattle, WA",
    hometownDistanceKm: 10,
    distance: "10 km away",
    occupation: "Type Designer & Anime Archivist",
    school: "University of Washington",
    online: true,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
        caption: "Collecting rare 90s anime animation cels"
      }
    ],
    bio: "Type designer & anime archivist. Drawing geometric kanji glyphs and collecting rare 90s animation cels. Heavy ramen consumer.",
    selfTraits: ["Tactile", "Aesthetic", "Perceptive"],
    threeWords: ["Tactile", "Aesthetic", "Perceptive"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["UI/UX", "Anime & Pop Culture", "Graphic Design", "Ramen Trails", "Jujutsu Kaisen"],
    topArtists: ["YOASOBI", "Eve", "King Gnu", "Asian Kung-Fu Generation"],
    compatibility: 95,
    breakdownTag: "Anime & Typography Alignment",
    breakdownMusic: "YOASOBI & J-Rock",
    breakdownTrait: "Tactile",
    gamePrompt: "Doodle Duel match: let's sketch our favorite anime mascot!"
  },
  {
    id: "sparks-f-5",
    name: "Astrid Lindgren",
    age: 24,
    gender: "Woman",
    hometown: "Portland, OR",
    location: "Portland, OR",
    hometownDistanceKm: 12,
    distance: "12 km away",
    occupation: "Bouldering Coach & Baker",
    school: "Reed College",
    online: false,
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
        caption: "Crag climbing in Smith Rock"
      }
    ],
    bio: "Bouldering coach & sourdough alchemist. I judge climbing gyms by their playlist quality. Let's send problems and split a loaf.",
    selfTraits: ["Tenacious", "Warm", "Adventurous"],
    threeWords: ["Tenacious", "Warm", "Adventurous"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Bouldering", "Sourdough", "Rock Climbing", "Vinyl", "Coffee Brewing"],
    topArtists: ["Phoebe Bridgers", "Deftones", "Boygenius", "Frank Ocean"],
    compatibility: 94,
    breakdownTag: "Bouldering & Vinyl Overlap",
    breakdownMusic: "Phoebe Bridgers & Deftones",
    breakdownTrait: "Tenacious",
    gamePrompt: "Can you beat my reaction score in Reflex Tap Race?"
  }
];

export const SPARKS_PROFILES_MALE = [
  {
    id: "sparks-m-1",
    name: "Matteo Ricci",
    age: 24,
    gender: "Man",
    hometown: "San Francisco, CA",
    location: "San Francisco, CA",
    hometownDistanceKm: 6,
    distance: "6 km away",
    occupation: "Robotics Engineer & Jazz Guitarist",
    school: "Stanford University",
    online: true,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        caption: "Prototyping drone avionics & jazz licks"
      }
    ],
    bio: "Robotics engineer & jazz guitarist. Building autonomous drones by day and improvising over bebop changes by night.",
    selfTraits: ["Curious", "Playful", "Inventive"],
    threeWords: ["Curious", "Playful", "Inventive"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["Robotics", "Electric Guitar", "Coding", "Jazz Fusion", "Modular Synthesizers"],
    topArtists: ["Snarky Puppy", "Miles Davis", "Daft Punk", "Tame Impala"],
    compatibility: 98,
    breakdownTag: "Robotics & Jazz Improvisation",
    breakdownMusic: "Snarky Puppy & Daft Punk",
    breakdownTrait: "Playful",
    gamePrompt: "Tap race battle: see if you have jazz timing chops!"
  },
  {
    id: "sparks-m-2",
    name: "Soren Kjaer",
    age: 25,
    gender: "Man",
    hometown: "Brooklyn, NY",
    location: "Brooklyn, NY",
    hometownDistanceKm: 8,
    distance: "8 km away",
    occupation: "Typography Designer & Coffee Roaster",
    school: "Pratt Institute",
    online: true,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
        caption: "Letterpress printing wood type posters"
      }
    ],
    bio: "Typography designer & specialty coffee roaster. Obsessed with Swiss modernist posters and natural processed Ethiopians.",
    selfTraits: ["Methodical", "Tactile", "Calm"],
    threeWords: ["Methodical", "Tactile", "Calm"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["UI/UX", "Coffee Brewing", "Graphic Design", "Vinyl", "Architecture"],
    topArtists: ["Radiohead", "Bon Iver", "The National", "Alvvays"],
    compatibility: 97,
    breakdownTag: "Swiss Design & Specialty Roasts",
    breakdownMusic: "Radiohead & Indie Rock",
    breakdownTrait: "Tactile",
    gamePrompt: "Doodle Duel: sketch your ideal font ligature!"
  },
  {
    id: "sparks-m-3",
    name: "Kenji Sato",
    age: 23,
    gender: "Man",
    hometown: "Seattle, WA",
    location: "Seattle, WA",
    hometownDistanceKm: 11,
    distance: "11 km away",
    occupation: "Indie Game Dev & Handheld Modder",
    school: "University of Washington",
    online: true,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
        caption: "Modding Game Boy with IPS backlights"
      }
    ],
    bio: "Indie game programmer & retro handheld modder. Building cozy pixel-art RPGs with lo-fi soundtracks.",
    selfTraits: ["Witty", "Creative", "Nocturnal"],
    threeWords: ["Witty", "Creative", "Nocturnal"],
    faith: "Agnostic",
    connectionGoal: "Long-term",
    interests: ["Game Dev", "Retro Arcade", "Action RPGs", "Lo-Fi Beats", "Balatro"],
    topArtists: ["Disasterpeace", "Porter Robinson", "Chvrches", "Mac DeMarco"],
    compatibility: 96,
    breakdownTag: "Retro Arcade & Pixel Game Sync",
    breakdownMusic: "Porter Robinson & Chvrches",
    breakdownTrait: "Witty",
    gamePrompt: "Can you guess my favorite retro console in 20 Questions?"
  },
  {
    id: "sparks-m-4",
    name: "Leo Castillo",
    age: 24,
    gender: "Man",
    hometown: "Austin, TX",
    location: "Austin, TX",
    hometownDistanceKm: 9,
    distance: "9 km away",
    occupation: "Renewable Energy Engineer",
    school: "UT Austin",
    online: false,
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
        caption: "Trail running Barton Creek Greenbelt"
      }
    ],
    bio: "Solar energy engineer & trail runner. Sunrise runs followed by intense breakfast taco debates.",
    selfTraits: ["High-Energy", "Adventurous", "Sunny"],
    threeWords: ["High-Energy", "Adventurous", "Sunny"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Trail Running", "Gym / Lifting", "Street Food", "Indie Rock", "Cycling"],
    topArtists: ["The Strokes", "Arctic Monkeys", "Leon Bridges", "Khruangbin"],
    compatibility: 95,
    breakdownTag: "Endurance & Trail Resonance",
    breakdownMusic: "The Strokes & Leon Bridges",
    breakdownTrait: "Adventurous",
    gamePrompt: "Number Duel duel: winner picks the running trail!"
  },
  {
    id: "sparks-m-5",
    name: "Adrian Blake",
    age: 26,
    gender: "Man",
    hometown: "Denver, CO",
    location: "Denver, CO",
    hometownDistanceKm: 17,
    distance: "17 km away",
    occupation: "Outdoor Film Director & Climber",
    school: "CU Boulder",
    online: true,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        caption: "Shooting 16mm film on Eldorado Canyon"
      }
    ],
    bio: "Outdoor film director & climber. Chasing golden hour light across granite crags with a 16mm camera.",
    selfTraits: ["Tenacious", "Soulful", "Daring"],
    threeWords: ["Tenacious", "Soulful", "Daring"],
    faith: "Spiritual",
    connectionGoal: "Long-term",
    interests: ["Film Photography", "Bouldering", "Hiking", "Ambient", "Rock Climbing"],
    topArtists: ["Brian Eno", "Fleet Foxes", "Lord Huron", "Bon Iver"],
    compatibility: 94,
    breakdownTag: "Granite Crags & Analog Cinema",
    breakdownMusic: "Brian Eno & Fleet Foxes",
    breakdownTrait: "Tenacious",
    gamePrompt: "Reflex duel: let's test your shutter finger speed!"
  }
];

// ----------------------------------------------------------------------------
// 4. ACTIVE MATCHES / CHATBOX POOL (4 Distinct Threads per Gender)
// 100% DISTINCT from Deck and Sparks! Pre-populated with icebreaker banter.
// ----------------------------------------------------------------------------
export const MATCH_PROFILES_FEMALE = [
  {
    id: "match-mira",
    profile: {
      id: "chat-f-1",
      name: "Mira Solis",
      age: 24,
      gender: "Woman",
      hometown: "San Francisco, CA",
      location: "San Francisco, CA",
      occupation: "Game UI Designer & Pixel Artist",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      bio: "Game UI designer & pixel artist. Can usually be found ranking matcha lattes or replaying Chrono Trigger with a cat on my lap.",
      selfTraits: ["Witty", "Perceptive", "Creative"],
      threeWords: ["Witty", "Perceptive", "Creative"],
      interests: ["UI/UX", "Pixel Art", "Matchamaking", "Indie Rock", "Balatro"],
      topArtists: ["Radiohead", "Tame Impala", "Mitski", "Porter Robinson"],
      compatibility: 97
    },
    lastMessage: "I accept your challenge! Round 2 is ON 🎮",
    time: "2m ago",
    unread: 1,
    online: true
  },
  {
    id: "match-roxie",
    profile: {
      id: "chat-f-2",
      name: "Roxie Chen",
      age: 23,
      gender: "Woman",
      hometown: "Seattle, WA",
      location: "Seattle, WA",
      occupation: "Film Editor & Indie Guitarist",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      bio: "Film editor & indie rock guitarist. Looking for someone who doesn't skip movie credits and loves basement gigs.",
      selfTraits: ["Playful", "Expressive", "Caffeinated"],
      threeWords: ["Playful", "Expressive", "Caffeinated"],
      interests: ["Electric Guitar", "Video Editing", "Concerts", "Vinyl", "City Pop"],
      topArtists: ["The Strokes", "Alvvays", "Slowdive", "Men I Trust"],
      compatibility: 95
    },
    lastMessage: "Wait, you actually listen to Taeko Onuki too?!",
    time: "15m ago",
    unread: 0,
    online: true
  },
  {
    id: "match-talia",
    profile: {
      id: "chat-f-3",
      name: "Talia Vance",
      age: 25,
      gender: "Woman",
      hometown: "Austin, TX",
      location: "Austin, TX",
      occupation: "Backend Architect & Boulderer",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      bio: "Backend architect & competitive boulderer. Equal parts caffeine, code, and climbing chalk.",
      selfTraits: ["Direct", "Adventurous", "Dry-Humor"],
      threeWords: ["Direct", "Adventurous", "Dry-Humor"],
      interests: ["Bouldering", "Coding", "Trivia Nights", "Calisthenics", "Street Food"],
      topArtists: ["Arctic Monkeys", "Deftones", "Khruangbin", "Gorillaz"],
      compatibility: 94
    },
    lastMessage: "Flashed a V6 today! Winner of tap race gets brag rights.",
    time: "1h ago",
    unread: 0,
    online: false
  },
  {
    id: "match-celeste",
    profile: {
      id: "chat-f-4",
      name: "Celeste Laurent",
      age: 24,
      gender: "Woman",
      hometown: "New York, NY",
      location: "New York, NY",
      occupation: "Editorial Illustrator",
      photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
      bio: "Editorial illustrator & vintage bookstore stalker. I will judge you by your favourite Studio Ghibli soundtrack.",
      selfTraits: ["Dreamy", "Eloquent", "Artistic"],
      threeWords: ["Dreamy", "Eloquent", "Artistic"],
      interests: ["Digital Illustration", "Studio Ghibli", "Thrifting", "Book Clubs", "Specialty Tea"],
      topArtists: ["Joe Hisaishi", "Phoebe Bridgers", "Sufjan Stevens", "Frank Ocean"],
      compatibility: 96
    },
    lastMessage: "Spirited Away soundtrack or nothing! ✨",
    time: "3h ago",
    unread: 0,
    online: true
  }
];

export const MATCH_PROFILES_MALE = [
  {
    id: "match-rowan",
    profile: {
      id: "chat-m-1",
      name: "Rowan Mercer",
      age: 24,
      gender: "Man",
      hometown: "San Francisco, CA",
      location: "San Francisco, CA",
      occupation: "Creative Dev & Synthesist",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      bio: "Creative developer & synthesizer tinkerer. Designing interactive websites by day, coding generative art by night.",
      selfTraits: ["Inventive", "Chill", "Curious"],
      threeWords: ["Inventive", "Chill", "Curious"],
      interests: ["Coding", "Modular Synthesizers", "UI/UX", "Ambient", "Indie Rock"],
      topArtists: ["Tame Impala", "Aphex Twin", "Radiohead", "Four Tet"],
      compatibility: 97
    },
    lastMessage: "Sent you that West Coast modular patch! 🎹",
    time: "4m ago",
    unread: 1,
    online: true
  },
  {
    id: "match-dylan",
    profile: {
      id: "chat-m-2",
      name: "Dylan Hayes",
      age: 23,
      gender: "Man",
      hometown: "Seattle, WA",
      location: "Seattle, WA",
      occupation: "Industrial Designer & Barista",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      bio: "Industrial designer & espresso mechanic. If your pour-over brew ratio isn't 1:16, we need to talk.",
      selfTraits: ["Precise", "Playful", "Tenacious"],
      threeWords: ["Precise", "Playful", "Tenacious"],
      interests: ["Coffee Brewing", "Bouldering", "3D Modeling", "Indie Rock", "Specialty Tea"],
      topArtists: ["The Strokes", "Fleet Foxes", "Khruangbin", "Mac DeMarco"],
      compatibility: 95
    },
    lastMessage: "Dialed in an anaerobic natural Ethiopian ☕",
    time: "25m ago",
    unread: 0,
    online: true
  },
  {
    id: "match-caleb",
    profile: {
      id: "chat-m-3",
      name: "Caleb Kim",
      age: 25,
      gender: "Man",
      hometown: "Austin, TX",
      location: "Austin, TX",
      occupation: "Game Audio & Fighter",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      bio: "Game sound designer & fighting game enthusiast. Hit me with your best Balatro or Street Fighter strategy.",
      selfTraits: ["Strategic", "High-Energy", "Witty"],
      threeWords: ["Strategic", "High-Energy", "Witty"],
      interests: ["Fighting Games", "Balatro", "eSports", "Phonk", "Retro Arcade"],
      topArtists: ["Daft Punk", "Kaytranada", "Justice", "Carpenter Brut"],
      compatibility: 94
    },
    lastMessage: "I challenge you in Number Duel right now!",
    time: "1h ago",
    unread: 0,
    online: false
  },
  {
    id: "match-jasper",
    profile: {
      id: "chat-m-4",
      name: "Jasper Cole",
      age: 24,
      gender: "Man",
      hometown: "New York, NY",
      location: "New York, NY",
      occupation: "Analog Photographer & Zine Maker",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      bio: "Analog photographer & indie magazine publisher. Darkroom chemicals and live basement rock shows.",
      selfTraits: ["Observant", "Creative", "Spontaneous"],
      threeWords: ["Observant", "Creative", "Spontaneous"],
      interests: ["Film Photography", "Vinyl", "Concerts", "Zine Making", "Darkroom Printing"],
      topArtists: ["Slowdive", "Bon Iver", "Alvvays", "The 1975"],
      compatibility: 96
    },
    lastMessage: "Let's do a photo walk or sketch on the canvas sometime!",
    time: "4h ago",
    unread: 0,
    online: true
  }
];

// Pre-populated rich message threads
export const INITIAL_CHAT_MESSAGES = {
  "match-mira": [
    {
      id: "m-m1",
      sender: "them",
      text: "Okay honest question: did you also spend 30 hours perfecting your desk cable management, or are you normal?",
      timestamp: "10:14 PM"
    },
    {
      id: "m-m2",
      sender: "me",
      text: "I literally used magnetic channels and custom sleeves. It’s an art form.",
      timestamp: "10:16 PM"
    },
    {
      id: "m-m3",
      sender: "them",
      text: "YES!! I knew you were my kind of nerd. I demand an AI Akinator showdown—winner picks our first boba order 🧋",
      timestamp: "10:18 PM"
    }
  ],
  "match-roxie": [
    {
      id: "m-r1",
      sender: "them",
      text: "Your music taste on your card is immaculate. Have you heard that new Japanese city pop reissue?",
      timestamp: "8:30 PM"
    },
    {
      id: "m-r2",
      sender: "me",
      text: "The Taeko Onuki repress? Ordered the vinyl the second it dropped.",
      timestamp: "8:34 PM"
    },
    {
      id: "m-r3",
      sender: "them",
      text: "NO WAY. We are officially destined to share aux cord privileges.",
      timestamp: "8:35 PM"
    }
  ],
  "match-talia": [
    {
      id: "m-t1",
      sender: "them",
      text: "Flashed a V6 today and celebrated with street tacos. You ready for a Reflex Tap Race duel or are you scared?",
      timestamp: "4:12 PM"
    },
    {
      id: "m-t2",
      sender: "me",
      text: "I never back down from a reflex challenge. Let's see your best score.",
      timestamp: "4:15 PM"
    },
    {
      id: "m-t3",
      sender: "them",
      text: "Bold words! Don't cry when my 10-second tap counter leaves you in the dust 🔥",
      timestamp: "4:16 PM"
    }
  ],
  "match-celeste": [
    {
      id: "m-c1",
      sender: "them",
      text: "Howl’s Moving Castle theme on piano hits different at 1 AM. Do you have a comfort album?",
      timestamp: "Yesterday"
    },
    {
      id: "m-c2",
      sender: "me",
      text: "Spirited Away soundtrack or anything by Joe Hisaishi, hands down.",
      timestamp: "Yesterday"
    },
    {
      id: "m-c3",
      sender: "them",
      text: "Taste verified. We should collaborate on that shared canvas and doodle soot sprites ✨",
      timestamp: "Yesterday"
    }
  ],
  "match-rowan": [
    {
      id: "m-ro1",
      sender: "them",
      text: "Hey! Saw your modular synth tags. Are you doing subtractive synthesis or FM patches mostly?",
      timestamp: "10:10 PM"
    },
    {
      id: "m-ro2",
      sender: "me",
      text: "Mostly West Coast modular—complex wavefolders and FM pinging!",
      timestamp: "10:12 PM"
    },
    {
      id: "m-ro3",
      sender: "them",
      text: "A person of refined acoustic taste! We need to trade patches or do a collaborative canvas doodle.",
      timestamp: "10:15 PM"
    }
  ],
  "match-dylan": [
    {
      id: "m-dy1",
      sender: "them",
      text: "What's your current coffee bean rotation? I just dialed in an anaerobic natural Ethiopian.",
      timestamp: "7:40 PM"
    },
    {
      id: "m-dy2",
      sender: "me",
      text: "A washed Colombian with peach and bergamot notes. Incredible acidity.",
      timestamp: "7:44 PM"
    },
    {
      id: "m-dy3",
      sender: "them",
      text: "Alright, coffee test passed with flying colors! Ready for a friendly duel?",
      timestamp: "7:46 PM"
    }
  ],
  "match-caleb": [
    {
      id: "m-ca1",
      sender: "them",
      text: "Ready for an arcade showdown? I challenge you in Number Duel right now!",
      timestamp: "2:10 PM"
    },
    {
      id: "m-ca2",
      sender: "me",
      text: "Challenge accepted. You won't guess my number in under 4 turns.",
      timestamp: "2:15 PM"
    },
    {
      id: "m-ca3",
      sender: "them",
      text: "We'll see about that! Game on 🕹️",
      timestamp: "2:18 PM"
    }
  ],
  "match-jasper": [
    {
      id: "m-ja1",
      sender: "them",
      text: "Do you shoot 35mm or medium format? Saw the film grain in your profile photo.",
      timestamp: "Yesterday"
    },
    {
      id: "m-ja2",
      sender: "me",
      text: "Both! 35mm for street candids, 120 for portraits.",
      timestamp: "Yesterday"
    },
    {
      id: "m-ja3",
      sender: "them",
      text: "Love that. Let's do a photo walk or sketch on the canvas sometime!",
      timestamp: "Yesterday"
    }
  ]
};

// ----------------------------------------------------------------------------
// 5. NOTIFICATION CENTER POOL: 4 DISTINCT PROFILES PER GENDER
// 100% DISTINCT from Deck, Sparks, and Chat! Complete with [✓ Accept] & [✕ Decline].
// ----------------------------------------------------------------------------
export const NOTIF_PROFILES_FEMALE = [
  {
    id: "notif-f-1",
    type: "superpact",
    sender: {
      id: "notif-user-f1",
      name: "Maya Thorne",
      age: 23,
      gender: "Woman",
      location: "Seattle, WA",
      occupation: "Indie Sound Designer",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      interests: ["Modular Synthesizers", "Indie Rock", "Bouldering"]
    },
    gameType: "tap_race",
    gameTitle: "Reflex Tap Race (10s)",
    lockedScore: 82,
    time: "3m ago",
    status: "pending",
    unread: true
  },
  {
    id: "notif-f-2",
    type: "direct_pact",
    sender: {
      id: "notif-user-f2",
      name: "Nadia Rostova",
      age: 24,
      gender: "Woman",
      location: "Austin, TX",
      occupation: "Ceramist & Climber",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      interests: ["Pottery", "Bouldering", "Specialty Tea"]
    },
    time: "18m ago",
    status: "pending",
    unread: true
  },
  {
    id: "notif-f-3",
    type: "superpact",
    sender: {
      id: "notif-user-f3",
      name: "Clara Bell",
      age: 22,
      gender: "Woman",
      location: "San Francisco, CA",
      occupation: "AI Prompt Artist",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      interests: ["Digital Illustration", "Anime & Pop Culture", "Coding"]
    },
    gameType: "number_duel",
    gameTitle: "Number Duel (1 to 100)",
    lockedScore: 4,
    time: "45m ago",
    status: "pending",
    unread: true
  },
  {
    id: "notif-f-4",
    type: "direct_pact",
    sender: {
      id: "notif-user-f4",
      name: "Selene Wu",
      age: 25,
      gender: "Woman",
      location: "Brooklyn, NY",
      occupation: "Vinyl DJ & Curator",
      photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
      interests: ["Vinyl", "DJing", "Shoegaze"]
    },
    time: "2h ago",
    status: "pending",
    unread: true
  }
];

export const NOTIF_PROFILES_MALE = [
  {
    id: "notif-m-1",
    type: "superpact",
    sender: {
      id: "notif-user-m1",
      name: "Tristan Walker",
      age: 24,
      gender: "Man",
      location: "Seattle, WA",
      occupation: "Game Physics Programmer",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      interests: ["Game Dev", "Retro Arcade", "Coding"]
    },
    gameType: "tap_race",
    gameTitle: "Reflex Tap Race (10s)",
    lockedScore: 85,
    time: "5m ago",
    status: "pending",
    unread: true
  },
  {
    id: "notif-m-2",
    type: "direct_pact",
    sender: {
      id: "notif-user-m2",
      name: "Dante Reyes",
      age: 25,
      gender: "Man",
      location: "Austin, TX",
      occupation: "Hardware Hacker",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      interests: ["Hardware Hacking", "Robotics", "Bouldering"]
    },
    time: "22m ago",
    status: "pending",
    unread: true
  },
  {
    id: "notif-m-3",
    type: "superpact",
    sender: {
      id: "notif-user-m3",
      name: "Xavier Reed",
      age: 23,
      gender: "Man",
      location: "San Francisco, CA",
      occupation: "Analog Synth Tech",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      interests: ["Modular Synthesizers", "Electric Guitar", "Coffee Brewing"]
    },
    gameType: "number_duel",
    gameTitle: "Number Duel (1 to 100)",
    lockedScore: 4,
    time: "1h ago",
    status: "pending",
    unread: true
  },
  {
    id: "notif-m-4",
    type: "direct_pact",
    sender: {
      id: "notif-user-m4",
      name: "Milo Sterling",
      age: 24,
      gender: "Man",
      location: "Chicago, IL",
      occupation: "Specialty Roaster",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      interests: ["Coffee Brewing", "Vinyl", "Indie Rock"]
    },
    time: "3h ago",
    status: "pending",
    unread: true
  }
];

// Helper to provide divergent pools strictly filtered by user's dating preference
export function getDivergentPoolsForUser(user) {
  const pref = user?.datingPreferenceGender || 'Everyone';

  if (pref === 'Women') {
    return {
      deckProfiles: DECK_PROFILES_FEMALE,
      sparksProfiles: SPARKS_PROFILES_FEMALE,
      initialMatches: MATCH_PROFILES_FEMALE,
      initialNotifications: NOTIF_PROFILES_FEMALE
    };
  }

  if (pref === 'Men') {
    return {
      deckProfiles: DECK_PROFILES_MALE,
      sparksProfiles: SPARKS_PROFILES_MALE,
      initialMatches: MATCH_PROFILES_MALE,
      initialNotifications: NOTIF_PROFILES_MALE
    };
  }

  // 'Everyone': interleaved divergent pools
  return {
    deckProfiles: [...DECK_PROFILES_FEMALE, ...DECK_PROFILES_MALE],
    sparksProfiles: [...SPARKS_PROFILES_FEMALE, ...SPARKS_PROFILES_MALE],
    initialMatches: [...MATCH_PROFILES_FEMALE, ...MATCH_PROFILES_MALE],
    initialNotifications: [...NOTIF_PROFILES_FEMALE, ...NOTIF_PROFILES_MALE]
  };
}

// Legacy aliases for backward compatibility
export const PROFILES = DECK_PROFILES_FEMALE;
export const INITIAL_MATCHES = MATCH_PROFILES_FEMALE;
export const INITIAL_NOTIFICATIONS = NOTIF_PROFILES_FEMALE;

export const MEME_CARDS = [
  {
    id: "meme-1",
    title: "Keyboard Sound Check",
    category: "Mechanical Keyboards",
    url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    caption: "When the spacebar has zero rattle and the lube is perfectly balanced",
  },
  {
    id: "meme-2",
    title: "Bouldering Crux",
    category: "Climbing",
    url: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80",
    caption: "Telling yourself 'just one more try' for 3 straight hours",
  },
  {
    id: "meme-3",
    title: "Code at 3 AM",
    category: "Dev Humor",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    caption: "It compiles, the tests pass, but I have no idea why it works",
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

export const MEME_VAULT = MEME_CARDS;

export const POST_GAME_MEMES = {
  victory: {
    id: "meme-victory",
    type: "meme",
    title: "YOU WON... BUT AT WHAT COST?",
    text: "YOU WON... BUT AT WHAT COST?",
    caption: "Legend says winning on a dating app leads to being left on read forever...",
    subtext: "Legend says winning on a dating app leads to being left on read forever...",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    memeUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    fallbackColor: "from-purple-900/60 to-slate-900"
  },
  defeat: {
    id: "meme-defeat",
    type: "meme",
    title: "PERSONALLY, I WOULDN'T TAKE THAT LEVEL OF DISRESPECT",
    text: "PERSONALLY, I WOULDN'T TAKE THAT LEVEL OF DISRESPECT",
    caption: "Demand an immediate rematch or send a cheeky text to salvage your dignity!",
    subtext: "Demand an immediate rematch or send a cheeky text to salvage your dignity!",
    imageUrl: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=600&q=80",
    memeUrl: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=600&q=80",
    fallbackColor: "from-rose-900/60 to-slate-900"
  },
  opponentTaunt: {
    id: "meme-opp-taunt",
    type: "meme",
    sender: "partner",
    title: "I WOULDN'T HAVE LOST THIS BAD 😭💀",
    text: "I WOULDN'T HAVE LOST THIS BAD 😭💀",
    caption: "Maybe try guessing with your eyes open next round?",
    subtext: "Maybe try guessing with your eyes open next round?",
    imageUrl: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=600&q=80",
    memeUrl: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=600&q=80",
    fallbackColor: "from-red-900/60 to-slate-900"
  },
  opponentRealityCheck: {
    id: "meme-opp-reality-check",
    type: "meme",
    sender: "partner",
    title: "HOW PEOPLE FEEL AFTER WINNING BY A HUNCH 🗿",
    text: "HOW PEOPLE FEEL AFTER WINNING BY A HUNCH 🗿",
    caption: "Zero logic, 100% luck, but take your trophy.",
    subtext: "Zero logic, 100% luck, but take your trophy.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    memeUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    fallbackColor: "from-amber-900/60 to-slate-900"
  }
};

export const COMMUNITY_FEED_ITEMS = [
  {
    id: "feed-showpiece",
    author: "PACT Community Canvas",
    type: "Collaborative Board",
    time: "Live Right Now",
    likes: 342,
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    caption: "Live community doodle board: neon line sketches, handwritten sticky notes, playful character drawings, and hearts contributed by active pairs.",
    tags: ["#CommunityCanvas", "#LiveDoodle", "#NeonArt", "#ForgedInPlay"],
    isShowpiece: true
  },
  {
    id: "feed-1",
    author: "Elena & You",
    type: "Shared Canvas",
    time: "10 mins ago",
    likes: 42,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    caption: "Doodled during our 20 Questions match. We call it 'Neon Cyber-Owl'.",
    tags: ["#SharedCanvas", "#Cyberpunk", "#ArtDuel"]
  },
  {
    id: "feed-2",
    author: "Zoe & Marcus",
    type: "Arcade Showdown",
    time: "42 mins ago",
    likes: 89,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    caption: "Zoe guessed Number Duel on turn 3! Record time on the Austin leaderboard.",
    tags: ["#NumberDuel", "#BrainDuel", "#Arcade"]
  },
  {
    id: "feed-3",
    author: "Aria & Dev",
    type: "Custom Sticker",
    time: "2 hours ago",
    likes: 67,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    caption: "Hand-drawn meme sticker exported directly from in-chat canvas.",
    tags: ["#CustomSticker", "#DoodleDuel", "#Vibe"]
  }
];
