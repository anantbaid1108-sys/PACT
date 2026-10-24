# ⚡ PACT — Make Connection an Experience

> **Affecio Hacks ’26 Official Submission**  
> **Theme:** Dating & Social Discovery  
> **Challenge:** Problem Statement #6 — *Make Connection an Experience*  
> **Repository:** [PACT](https://github.com/anantbaid1108-sys/PACT)  
> **Live Demo:** [Add Your Live Vercel Link Here]  

---

## 📌 Problem & Overview

Modern social discovery and dating applications have reduced human connection to an inventory catalog:
1. **Superficial Snap Judgments:** Choices rely almost entirely on curated static photos rather than personality, humor, or authentic dynamics.
2. **Swipe Fatigue & Ghosting:** Mindless scrolling without interactive engagement breeds conversational burnout.
3. **The "Dead Opener" Dilemma:** Matches rot in chat inboxes because dry *"Hey"* or *"What's up"* messages fail to ignite real banter.

### The Pact Solution
**Pact** is an **activity-first social chemistry platform**. Instead of evaluating static profiles in a vacuum, strangers discover mutual compatibility by doing things together in real time—dueling in mental deduction games, sketching on a collaborative canvas, and trading memes before deciding to unlock deeper profiles.

Instead of asking *"Do I like their photos?"*, Pact prompts users to ask *"Do we actually vibe when doing things together?"*

---

## ✨ Core Features & Architecture

### 1. Four-Pillar Social Discovery Engine
* **Deck (The Swiper):** Clean, high-density cards displaying bio details, lifestyle badges (drinking, smoking, faith), reciprocal 3-word self/partner traits, and interest tags. Mutual matches prompt an immediate icebreaker challenge instead of a blank chat.
* **Arcade (Instant Queue):** Fast 1v1 blind matchmaking that pairs two active online users into a game within 5 seconds without showing photos first.
* **Canvas Feed:** A community discovery board featuring user-submitted shared sketches, custom stickers, and meme-taste rankings.
* **Daily Sparks:** 3 curated profiles delivered every 24 hours calculated from reciprocal trait matrices and shared interest overlap.

### 2. Live Mini-Game Arena (In-Chat & Queue)
Accessible via the header dropdown in any active match or queue:

#### 🏆 Mode A: Competitive Showdowns
* **Time-Trial Persona Guess (Speed Akinator):** Players interrogate an AI referee (answering strictly *Yes / No / Irrelevant*) to deduct a secret figure; the fastest correct buzz-in wins.
* **Number Duel (1 to 100):** Hidden integer mind game with alternating turns, real-time *Higher / Lower* feedback, and an active move log.
* **Doodle Duel:** Fast-paced draw-and-guess showdown against a 60-second timer.
* **Micro Reflex Tap Race:** Millisecond-precision reaction showdown with randomized light gates.

#### 🤝 Mode B: Co-Op Banter & Icebreakers
* **Collaborative Shared Canvas:** Synchronous HTML5 canvas where both users sketch on the same board and can export the artwork directly into the chat stream as an in-line custom sticker.
* **20 Questions Co-Op:** Players collaborate against an AI Game Master (*Yes / No / Warm / Cold*) to discover a mystery figure in 20 shared questions.
* **Who's the Imposter? (AI Edition):** Both players and a hidden AI submit responses to a quirky scenario; the pair must collaborate to spot and vote out the bot.
* **Spin the Bottle:** Dynamic SVG bottle selector serving personalized hypothetical dilemmas generated from mutual profile tags.

### 3. Integrated Chat & Media Engine
* **Meme Vault (`😂`):** Integrated pop-culture, gaming, and dating meme drawer to assess mutual humor compatibility.
* **Custom Sticker Creator (`🎨`):** Micro-canvas allowing users to draw a 5-second hand sketch and instantly post it into the chat stream as an image message.
* **Voice Notes (`🎙️`):** Audio messaging with visual waveform playback.

### 4. Comprehensive Onboarding Wizard
* **Identity & Verification:** Age verification (strictly 18+), gender, orientation, and location coordinates.
* **Lifestyle & Habits:** Relationship intent, status, religion, and habit pills (drinking/smoking).
* **3-Word Coordinates:** Dedicated matrices for *"Describe Yourself in 3 Words"* and *"Looking for in a Partner in 3 Words"*.
* **1,000+ Tag Cloud:** Searchable categorization across Anime, Gaming, Sports, Tech, Music, and Art.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React (Vite) / Next.js with TypeScript
* **Styling & UI:** Tailwind CSS (Tactical dark theme, mobile-first responsive layout)
* **Icons & Micro-Interactions:** Lucide React, Framer Motion
* **Canvas Engine:** HTML5 Canvas API (Synchronous stroke rendering & sticker export pipeline)
* **Hosting & CI/CD:** Vercel

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18.x or higher
* npm or pnpm

### Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anantbaid1108-sys/PACT.git
   cd PACT
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production bundle:**
   ```bash
   npm run preview
   ```

---

## 🛡️ Safety & Trust Features

* **Strict 18+ Age Gating:** Built-in age verification safeguards.
* **Contextual Safety Modal:** Accessible from any profile card or chat header.
* **Instant Disconnect & Block:** Immediate conversation freezing and report logging.
* **No Unsolicited Media:** Photo sharing is strictly gated behind verified mutual engagement and in-chat interactive tools (Sticker Creator and Meme Vault).

---

## 👥 Hackathon Submission

* **Team:** UltraInstinct
* **Hackathon:** Affecio Hacks ’26
* **Problem Statement:** #6 — *Make Connection an Experience*
* **License:** MIT License
