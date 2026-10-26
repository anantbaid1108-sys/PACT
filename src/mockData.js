// src/mockData.js - 100+ Categorized Interests, 150+ Global Artists, and Rich Profiles for Pact

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
  "Music & Performance": [
    "Indie Rock", "Phonk", "Hip-Hop", "Techno", "Vinyl", "Electric Guitar",
    "Drumming", "Concerts", "Modular Synthesizers", "Shoegaze", "R&B",
    "Dream Pop", "Hyperpop", "House", "Jazz Fusion", "Metalcore",
    "Classical Piano", "DJing", "Karaoke", "Math Rock", "Ambient",
    "Lo-Fi Beats", "K-Pop", "City Pop", "Midwest Emo"
  ],
  "Creativity & Tech": [
    "Digital Illustration", "Coding", "UI/UX", "AI Prompting", "Film Photography",
    "Creative Writing", "3D Modeling", "Blender", "Pottery", "Video Editing",
    "Game Dev", "Mechanical Keyboards", "Open Source", "Poetry", "Zine Making",
    "Darkroom Printing", "Robotics", "VR / AR", "Pixel Art", "Calligraphy",
    "Architecture", "Graphic Design", "Hardware Hacking", "Creative Coding"
  ],
  "Fitness & Outdoors": [
    "Football", "Bouldering", "Gym / Lifting", "Cycling", "Meditation",
    "Hiking", "Running", "Pilates", "Calisthenics", "Surfing",
    "Skateboarding", "Yoga", "Swimming", "Rock Climbing", "Martial Arts",
    "Tennis", "Badminton", "Trail Running", "Snowboarding", "Paddleboarding",
    "Powerlifting", "Scuba Diving", "Ultimate Frisbee", "Volleyball"
  ],
  "Food & Chill": [
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

// 160+ Iconic Global Music Artists & Creators across diverse genres
export const GLOBAL_ARTISTS = [
  // A
  { name: "Arctic Monkeys", genre: "Indie Rock" },
  { name: "A$AP Rocky", genre: "Hip-Hop" },
  { name: "Ado", genre: "J-Pop" },
  { name: "Avicii", genre: "EDM" },
  { name: "Ariana Grande", genre: "Pop / R&B" },
  { name: "Adele", genre: "Soul / Pop" },
  { name: "ABBA", genre: "Pop / Disco" },
  { name: "Anirudh Ravichander", genre: "World / Film" },
  { name: "Alicia Keys", genre: "R&B / Soul" },
  { name: "Anderson .Paak", genre: "Funk / R&B" },
  { name: "Aphex Twin", genre: "Electronic / IDM" },
  { name: "Alan Walker", genre: "Electronic" },
  { name: "AURORA", genre: "Art Pop" },
  { name: "Alvvays", genre: "Indie Pop" },
  { name: "Arcade Fire", genre: "Indie Rock" },
  { name: "Arlo Parks", genre: "Indie / Neo-Soul" },

  // B
  { name: "Billie Eilish", genre: "Alt Pop" },
  { name: "BTS", genre: "K-Pop" },
  { name: "Beyoncé", genre: "R&B / Pop" },
  { name: "Bruno Mars", genre: "Funk / Pop" },
  { name: "Blackpink", genre: "K-Pop" },
  { name: "Bad Bunny", genre: "Reggaeton / Latin" },
  { name: "Bon Iver", genre: "Indie Folk" },
  { name: "Blink-182", genre: "Pop Punk" },
  { name: "Blur", genre: "Britpop" },
  { name: "Boygenius", genre: "Indie Rock" },
  { name: "Beach House", genre: "Dream Pop" },
  { name: "Beabadoobee", genre: "Indie Rock" },
  { name: "Bring Me The Horizon", genre: "Alt Rock / Metal" },
  { name: "Baby Keem", genre: "Hip-Hop" },
  { name: "Brent Faiyaz", genre: "R&B" },

  // C
  { name: "Coldplay", genre: "Alt Rock / Pop" },
  { name: "Charli XCX", genre: "Hyperpop / Club" },
  { name: "Childish Gambino", genre: "Hip-Hop / Funk" },
  { name: "Chappell Roan", genre: "Synth-Pop" },
  { name: "Conan Gray", genre: "Indie Pop" },
  { name: "Clairo", genre: "Bedroom Pop" },
  { name: "Cage The Elephant", genre: "Alt Rock" },
  { name: "Cigarettes After Sex", genre: "Dream Pop" },
  { name: "Cuco", genre: "Lo-Fi / Latin" },
  { name: "Calvin Harris", genre: "EDM / Dance" },
  { name: "Current Joys", genre: "Post-Punk" },

  // D
  { name: "Drake", genre: "Hip-Hop / R&B" },
  { name: "Dua Lipa", genre: "Disco-Pop" },
  { name: "Doja Cat", genre: "Hip-Hop / Pop" },
  { name: "Deftones", genre: "Alt Metal / Shoegaze" },
  { name: "Daft Punk", genre: "Electronic / French House" },
  { name: "Dominic Fike", genre: "Alt / Indie Rock" },
  { name: "Daniel Caesar", genre: "R&B / Soul" },
  { name: "David Bowie", genre: "Art Rock" },
  { name: "Denzel Curry", genre: "Hip-Hop" },
  { name: "Dean Blunt", genre: "Experimental" },
  { name: "Djo", genre: "Psychedelic Pop" },

  // E
  { name: "Eminem", genre: "Hip-Hop" },
  { name: "Ed Sheeran", genre: "Pop / Acoustic" },
  { name: "Elton John", genre: "Pop / Rock" },
  { name: "Ethel Cain", genre: "Alt / Ambient Pop" },
  { name: "Erykah Badu", genre: "Neo-Soul" },
  { name: "Evanescence", genre: "Alt Metal" },
  { name: "Earth, Wind & Fire", genre: "Funk / Disco" },

  // F
  { name: "Frank Ocean", genre: "R&B / Neo-Soul" },
  { name: "Fleetwood Mac", genre: "Classic Rock" },
  { name: "Florence + The Machine", genre: "Indie Rock" },
  { name: "Freddie Mercury", genre: "Rock" },
  { name: "Fujii Kaze", genre: "J-Pop / Jazz" },
  { name: "Fred again..", genre: "Electronic / House" },
  { name: "Faye Webster", genre: "Indie Folk / R&B" },
  { name: "Foals", genre: "Indie Rock / Math" },
  { name: "Fontaines D.C.", genre: "Post-Punk" },

  // G
  { name: "Gorillaz", genre: "Alt / Electronic" },
  { name: "Gracie Abrams", genre: "Indie Pop" },
  { name: "Glass Animals", genre: "Psychedelic Pop" },
  { name: "Green Day", genre: "Punk Rock" },
  { name: "Girl in Red", genre: "Indie Pop" },
  { name: "Giveon", genre: "R&B" },

  // H
  { name: "Harry Styles", genre: "Pop / Rock" },
  { name: "Hozier", genre: "Indie Rock / Blues" },
  { name: "Hayley Williams", genre: "Alt Pop" },
  { name: "Hans Zimmer", genre: "Cinematic Score" },
  { name: "Hiatus Kaiyote", genre: "Neo-Soul / Jazz" },
  { name: "Halsey", genre: "Alt Pop" },

  // I
  { name: "Imagine Dragons", genre: "Pop Rock" },
  { name: "IU", genre: "K-Pop / Ballad" },
  { name: "Interpol", genre: "Post-Punk" },
  { name: "IDLES", genre: "Post-Punk" },
  { name: "Ice Spice", genre: "Drill / Hip-Hop" },

  // J
  { name: "J. Cole", genre: "Hip-Hop" },
  { name: "Juice WRLD", genre: "Emo Rap" },
  { name: "JPEGMAFIA", genre: "Experimental Hip-Hop" },
  { name: "The Japanese House", genre: "Dream Pop" },
  { name: "Joji", genre: "Lo-Fi / R&B" },
  { name: "Joy Division", genre: "Post-Punk" },
  { name: "Jack White", genre: "Blues Rock" },

  // K
  { name: "Kendrick Lamar", genre: "Hip-Hop" },
  { name: "Kanye West", genre: "Hip-Hop" },
  { name: "Kali Uchis", genre: "R&B / Latin" },
  { name: "King Krule", genre: "Jazz / Indie Rock" },
  { name: "Khruangbin", genre: "Psychedelic / Funk" },
  { name: "Keshi", genre: "Lo-Fi / R&B" },
  { name: "Kaytranada", genre: "House / Hip-Hop" },
  { name: "Kenshi Yonezu", genre: "J-Pop" },

  // L
  { name: "Lana Del Rey", genre: "Dream Pop / Baroque" },
  { name: "Lorde", genre: "Alt Pop" },
  { name: "Lady Gaga", genre: "Pop / Dance" },
  { name: "Linkin Park", genre: "Nu Metal / Alt Rock" },
  { name: "Laufey", genre: "Traditional Pop / Jazz" },
  { name: "LCD Soundsystem", genre: "Dance-Punk" },
  { name: "Lil Nas X", genre: "Pop Rap" },
  { name: "The Lumineers", genre: "Folk Rock" },

  // M
  { name: "Mac Miller", genre: "Hip-Hop / Jazz" },
  { name: "Mitski", genre: "Indie Rock" },
  { name: "Men I Trust", genre: "Dream Pop / Indie" },
  { name: "Metro Boomin", genre: "Hip-Hop / Trap" },
  { name: "Muse", genre: "Alt Rock" },
  { name: "Metallica", genre: "Heavy Metal" },
  { name: "M83", genre: "Synth-Pop / Ambient" },
  { name: "My Chemical Romance", genre: "Emo / Alt Rock" },
  { name: "Magdalena Bay", genre: "Synth-Pop" },

  // N
  { name: "Nirvana", genre: "Grunge" },
  { name: "NewJeans", genre: "K-Pop" },
  { name: "Nine Inch Nails", genre: "Industrial Rock" },
  { name: "Nothing But Thieves", genre: "Alt Rock" },
  { name: "New Order", genre: "Synth-Pop / New Wave" },
  { name: "Noah Kahan", genre: "Folk-Pop" },
  { name: "Nujabes", genre: "Lo-Fi / Instrumental" },

  // O
  { name: "Olivia Rodrigo", genre: "Pop Punk / Pop" },
  { name: "Oasis", genre: "Britpop" },
  { name: "OneRepublic", genre: "Pop Rock" },
  { name: "Outkast", genre: "Hip-Hop / Funk" },
  { name: "Omar Apollo", genre: "R&B / Bedroom Pop" },

  // P
  { name: "Post Malone", genre: "Hip-Hop / Pop" },
  { name: "Phoebe Bridgers", genre: "Indie Folk" },
  { name: "Paramore", genre: "Pop Punk / Alt Rock" },
  { name: "Pink Floyd", genre: "Progressive Rock" },
  { name: "Playboi Carti", genre: "Trap / Rage" },
  { name: "Peggy Gou", genre: "Electronic / Tech House" },
  { name: "Porter Robinson", genre: "Electronic / Synth-Pop" },

  // Q & R
  { name: "Queen", genre: "Classic Rock" },
  { name: "Radiohead", genre: "Art Rock / Electronic" },
  { name: "Rihanna", genre: "Pop / R&B" },
  { name: "Rex Orange County", genre: "Bedroom Pop" },
  { name: "Remi Wolf", genre: "Hyper-Soul" },
  { name: "Red Hot Chili Peppers", genre: "Funk Rock" },
  { name: "Rina Sawayama", genre: "Alt Pop" },
  { name: "Rosalía", genre: "Flamenco / Reggaeton" },

  // S
  { name: "SZA", genre: "R&B / Soul" },
  { name: "Steve Lacy", genre: "Lo-Fi / R&B" },
  { name: "Stray Kids", genre: "K-Pop" },
  { name: "Sabrina Carpenter", genre: "Pop" },
  { name: "Sampha", genre: "Soul / Electronic" },
  { name: "Slowdive", genre: "Shoegaze" },
  { name: "The Strokes", genre: "Indie Rock" },
  { name: "Sufjan Stevens", genre: "Indie Folk / Baroque" },

  // T
  { name: "Taylor Swift", genre: "Pop / Folk" },
  { name: "Travis Scott", genre: "Hip-Hop / Psychedelic" },
  { name: "Tyler, The Creator", genre: "Hip-Hop / Neo-Soul" },
  { name: "The Weeknd", genre: "R&B / Synth-Pop" },
  { name: "Tame Impala", genre: "Psychedelic Pop" },
  { name: "The 1975", genre: "Indie Pop" },
  { name: "The Smiths", genre: "Post-Punk" },
  { name: "TWICE", genre: "K-Pop" },
  { name: "Two Door Cinema Club", genre: "Indie Rock" },

  // V, W, Y, Z
  { name: "Vampire Weekend", genre: "Indie Rock" },
  { name: "V (BTS)", genre: "R&B / Jazz" },
  { name: "Vince Staples", genre: "Hip-Hop" },
  { name: "Vulfpeck", genre: "Funk" },
  { name: "Weezer", genre: "Alt Rock / Power Pop" },
  { name: "Wet Leg", genre: "Indie Rock" },
  { name: "Wallows", genre: "Indie Pop" },
  { name: "The xx", genre: "Indie Electronic" },
  { name: "Yeat", genre: "Trap" },
  { name: "Yves Tumor", genre: "Experimental Rock" },
  { name: "YOASOBI", genre: "J-Pop" },
  { name: "Zayn", genre: "R&B / Pop" },
  { name: "Zach Bryan", genre: "Country / Folk" }
];

// Rich default user profile with full onboarding schema
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
  connectionGoal: "Long-term relationship",
  threeWords: ["Curious", "Spontaneous", "Caffeinated"],
  smoking: "Never",
  drinking: "Occasionally",
  heightCm: 180,
  weightKg: 72,
  occupationType: "Job",
  workplaceOrCollege: "Pact Labs",
  interests: ["Valorant", "Modular Synthesizers", "Bouldering", "Coding", "UI/UX", "Indie Rock"],
  topArtists: ["Frank Ocean", "Tame Impala", "Arctic Monkeys", "Radiohead"],
  onboardingComplete: true
};

// Rich Candidate Profiles with multiple photos, captions, and complete filterable metadata
export const PROFILES = [
  {
    id: "user-elena",
    name: "Elena Rostova",
    age: 24,
    gender: "Woman",
    hometown: "Seattle, WA",
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
        caption: "Post-climb pour-over coffee"
      }
    ],
    bio: "Sculpting ergonomic split mechanical keyboards by day, sending V6 boulder problems by night. Looking for someone who doesn't take themselves too seriously and loves rapid banter.",
    selfTraits: ["Tactile", "Tenacious", "Playful"],
    threeWords: ["Tactile", "Tenacious", "Playful"],
    faith: "Agnostic",
    connectionGoal: "Long-term relationship",
    interests: ["Mechanical Keyboards", "Bouldering", "Elden Ring", "Post-Rock", "Coffee Brewing"],
    topArtists: ["Arctic Monkeys", "Radiohead", "Deftones", "Mitski"],
    compatibility: 96,
    gamePrompt: "I bet you can't beat my 194ms reaction speed in Reflex Tap Race ⚡"
  },
  {
    id: "user-marcus",
    name: "Marcus Vance",
    age: 26,
    gender: "Man",
    hometown: "Portland, OR",
    hometownDistanceKm: 42,
    distance: "42 km away",
    occupation: "Sound Architect",
    school: "Cornish College of the Arts",
    online: true,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        caption: "Eurorack synth patch bay chaos"
      },
      {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
        caption: "Field recording in Olympic National Park"
      }
    ],
    bio: "Patching Eurorack modular synthesizers, recording field audio in the rain, and collecting rare 35mm film lenses. Let's make an impromptu track or co-op a deduction puzzle.",
    selfTraits: ["Harmonic", "Observant", "Dreamer"],
    threeWords: ["Harmonic", "Observant", "Dreamer"],
    faith: "Spiritual",
    connectionGoal: "Short-term / Dating",
    interests: ["Modular Synthesizers", "Ambient", "Film Photography", "Chess", "Specialty Tea"],
    topArtists: ["Aphex Twin", "Khruangbin", "Bon Iver", "Fred again.."],
    compatibility: 91,
    gamePrompt: "Try guessing my secret Persona icon in under 5 questions!"
  },
  {
    id: "user-chloe",
    name: "Chloe Decker",
    age: 23,
    gender: "Woman",
    hometown: "Austin, TX",
    hometownDistanceKm: 28,
    distance: "28 km away",
    occupation: "Indie Game Dev",
    school: "UT Austin Game Lab",
    online: true,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        caption: "Fixing collision bugs at 2 AM"
      },
      {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        caption: "Street taco crawl downtown"
      }
    ],
    bio: "Coding pixel-art roguelites in Godot, practicing competitive fighting games, and hunting for the best street tacos. Looking for someone with dry humor and quick wits.",
    selfTraits: ["Reckless", "Witty", "Gamer"],
    threeWords: ["Reckless", "Witty", "Gamer"],
    faith: "Atheist",
    connectionGoal: "Casual vibe",
    interests: ["Game Dev", "Pixel Art", "Balatro", "Fighting Games", "Street Food"],
    topArtists: ["Charli XCX", "Chappell Roan", "Gorillaz", "Tyler, The Creator"],
    compatibility: 94,
    gamePrompt: "Number Duel showdown right now: I picked a number, you have 5 tries 😈"
  },
  {
    id: "user-liam",
    name: "Liam Tanaka",
    age: 25,
    gender: "Man",
    hometown: "San Francisco, CA",
    hometownDistanceKm: 8,
    distance: "8 km away",
    occupation: "Motion Graphics",
    school: "ArtCenter College of Design",
    online: false,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
        caption: "Blender kinetic sculpture render"
      },
      {
        url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
        caption: "Foggy midnight drive across Twin Peaks"
      }
    ],
    bio: "Animating kinetic typography and 3D kinetic sculptures in Blender. Obsessed with cyberpunk aesthetics, Japanese city pop, and night drives through fog.",
    selfTraits: ["Perfectionist", "Nocturnal", "Cinematic"],
    threeWords: ["Perfectionist", "Nocturnal", "Cinematic"],
    faith: "Agnostic",
    connectionGoal: "Deciding after connecting",
    interests: ["Blender", "Cyberpunk Edgerunners", "City Pop", "Graphic Design", "Late-night Drives"],
    topArtists: ["Fujii Kaze", "Daft Punk", "The Weeknd", "Joji"],
    compatibility: 89,
    gamePrompt: "Let's draw on the collaborative canvas—best doodle picks the next song."
  },
  {
    id: "user-tara",
    name: "Tara Sterling",
    age: 21,
    gender: "Woman",
    hometown: "Vancouver, BC",
    hometownDistanceKm: 65,
    distance: "65 km away",
    occupation: "Creative Technologist",
    school: "SFU Interactive Arts",
    online: true,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
        caption: "Wiring microcontrollers to bio-plants"
      },
      {
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        caption: "Herbal tea garden experiments"
      }
    ],
    bio: "Wiring microcontrollers to plants and programming generative visual shaders. If you love science fiction books, late-night tea, and cooperative puzzles, we will vibe.",
    selfTraits: ["Experimental", "Gentle", "Geeky"],
    threeWords: ["Experimental", "Gentle", "Geeky"],
    faith: "Spiritual",
    connectionGoal: "Long-term relationship",
    interests: ["Creative Coding", "AI Prompting", "Specialty Tea", "Bouldering", "Stargazing"],
    topArtists: ["AURORA", "Phoebe Bridgers", "Beach House", "Lorde"],
    compatibility: 95,
    gamePrompt: "20 Questions Co-Op: I bet we can guess the mystery figure in 12 questions flat."
  },
  {
    id: "user-julian",
    name: "Julian Reyes",
    age: 27,
    gender: "Man",
    hometown: "Denver, CO",
    hometownDistanceKm: 95,
    distance: "95 km away",
    occupation: "Coffee Roaster & Climber",
    school: "CU Boulder",
    online: true,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
        caption: "Cupping Ethiopian natural beans"
      },
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        caption: "Flatirons lead climbing day"
      }
    ],
    bio: "Dialing in light-roast Ethiopian pour-overs at 6 AM, projecting outdoor sandstone routes at 4 PM. Looking for a partner in crime for road trips and board game rivalries.",
    selfTraits: ["Grounded", "Adventurous", "Caffeinated"],
    threeWords: ["Grounded", "Adventurous", "Caffeinated"],
    faith: "Christian",
    connectionGoal: "Long-term relationship",
    interests: ["Coffee Brewing", "Rock Climbing", "Trail Running", "Board Games", "Vinyl"],
    topArtists: ["Zach Bryan", "Noah Kahan", "Fleetwood Mac", "The Lumineers"],
    compatibility: 88,
    gamePrompt: "Board game showdown or reaction test: winner picks the next coffee spot."
  },
  {
    id: "user-maya",
    name: "Maya Lin",
    age: 22,
    gender: "Non-binary",
    hometown: "Berkeley, CA",
    hometownDistanceKm: 14,
    distance: "14 km away",
    occupation: "Bio-Design Student",
    school: "UC Berkeley",
    online: true,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        caption: "Growing mycelium architectural models"
      },
      {
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
        caption: "Zine printing workshop"
      }
    ],
    bio: "Cultivating mycelium packaging and binding risograph art zines. Always on the search for matcha lattes, thrifted coats, and chaotic board games.",
    selfTraits: ["Inventive", "Thoughtful", "Chaotic"],
    threeWords: ["Inventive", "Thoughtful", "Chaotic"],
    faith: "Other",
    connectionGoal: "Long-term relationship",
    interests: ["Digital Illustration", "Zine Making", "Matchamaking", "Thrifting", "Indie Rock"],
    topArtists: ["Boygenius", "Clairo", "Alvvays", "Mitski"],
    compatibility: 93,
    gamePrompt: "Memory Duel: 8 pairs of retro cards. Show me what you've got!"
  },
  {
    id: "user-kaito",
    name: "Kaito Morita",
    age: 26,
    gender: "Man",
    hometown: "San Jose, CA",
    hometownDistanceKm: 52,
    distance: "52 km away",
    occupation: "Robotics Firmware Dev",
    school: "San Jose State",
    online: true,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
        caption: "Debugging motor controllers in C++"
      },
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        caption: "Late night ramen bowl in Japantown"
      }
    ],
    bio: "Hacking embedded microcontrollers, watching Jujutsu Kaisen on repeat, and climbing at the local gym. Seeking someone who appreciates witty puns and genuine curiosity.",
    selfTraits: ["Analytical", "Warm", "Nerdy"],
    threeWords: ["Analytical", "Warm", "Nerdy"],
    faith: "Agnostic",
    connectionGoal: "Deciding after connecting",
    interests: ["Robotics", "Jujutsu Kaisen", "Ramen Trails", "Bouldering", "Valorant"],
    topArtists: ["YOASOBI", "Fujii Kaze", "Ado", "Linkin Park"],
    compatibility: 92,
    gamePrompt: "Dare to challenge me in Number Duel? I know all the binary search tricks."
  }
];

export const INITIAL_MATCHES = [
  {
    id: "match-elena",
    profile: PROFILES[0],
    lastMessage: "I accept your challenge! Round 2 is ON 🎮",
    time: "2m ago",
    unread: 1,
    online: true,
  },
  {
    id: "match-chloe",
    profile: PROFILES[2],
    lastMessage: "Wait, you actually like modular synth music?!",
    time: "15m ago",
    unread: 0,
    online: true,
  },
  {
    id: "match-tara",
    profile: PROFILES[4],
    lastMessage: "Sent you a doodle in the shared canvas! 🎨",
    time: "1h ago",
    unread: 0,
    online: false,
  }
];

export const INITIAL_CHAT_MESSAGES = {
  "match-elena": [
    {
      id: "m-1",
      sender: "them",
      text: "Hey! Saw you're also into mechanical keyboards and bouldering. Have you tried outdoor rock yet?",
      timestamp: "10:14 PM"
    },
    {
      id: "m-2",
      sender: "me",
      text: "Yes! Spent last weekend bouldering in Leavenworth. Flashed a V5, but the friction was brutal.",
      timestamp: "10:16 PM"
    },
    {
      id: "m-3",
      sender: "them",
      text: "No way! That specific overhang problem is notorious. I challenge you to Reflex Tap Race right now—winner picks our first co-op session!",
      timestamp: "10:18 PM"
    }
  ],
  "match-chloe": [
    {
      id: "m-c1",
      sender: "them",
      text: "Balatro addicted too? What's your highest ante run?",
      timestamp: "8:30 PM"
    },
    {
      id: "m-c2",
      sender: "me",
      text: "Ante 12 with a holographic Baron setup! Completely wrecked the boss blind.",
      timestamp: "8:34 PM"
    }
  ],
  "match-tara": [
    {
      id: "m-t1",
      sender: "them",
      text: "Sent you a doodle in the shared canvas! 🎨 Let me know if you can guess what animal it is.",
      timestamp: "Yesterday"
    }
  ]
};

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "superpact",
    sender: PROFILES[0],
    gameType: "tap_race",
    gameTitle: "Reflex Tap Race (10s)",
    lockedScore: 78,
    time: "5m ago",
    status: "pending",
    unread: true,
  },
  {
    id: "notif-2",
    type: "pact",
    sender: PROFILES[1],
    time: "20m ago",
    status: "pending",
    unread: true,
  },
  {
    id: "notif-3",
    type: "superpact",
    sender: PROFILES[2],
    gameType: "number_duel",
    gameTitle: "Number Duel (1 to 100)",
    lockedScore: 4,
    time: "1h ago",
    status: "pending",
    unread: true,
  }
];

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

export const COMMUNITY_FEED_ITEMS = [
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
    author: "Chloe & Marcus",
    type: "Arcade Showdown",
    time: "42 mins ago",
    likes: 89,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    caption: "Chloe guessed Number Duel on turn 3! Record time on the Austin leaderboard.",
    tags: ["#NumberDuel", "#BrainDuel", "#Arcade"]
  },
  {
    id: "feed-3",
    author: "Tara & Dev",
    type: "Custom Sticker",
    time: "2 hours ago",
    likes: 67,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    caption: "Hand-drawn meme sticker exported directly from in-chat canvas.",
    tags: ["#CustomSticker", "#DoodleDuel", "#Vibe"]
  }
];
