# ⚡ PACT — Make Connection an Experience

> **Affecio Hacks ’26 Official Submission**  
> **Team Name:** Ultra Instinct  
> **Theme:** Dating & Social Discovery  
> **Challenge:** Problem Statement #6 — *Make Connection an Experience*  
> **Repository:** [PACT](https://github.com/anantbaid1108-sys/PACT)  
> **Live Demo:** [https://pact-rust.vercel.app](https://pact-rust.vercel.app)  

---

## 👥 Team Ultra Instinct

| Name | Role | Responsibilities |
| :--- | :--- | :--- |
| **Abhinav Shavaran (C)** | Team Lead & Product Architect | Core system architecture, discovery algorithms, state coordination |
| **Anant Baid** | Frontend & Game Systems Engineer | Interactive mini-game arena, HTML5 canvas studio, onboarding pipeline |
| **Trisha Ghosh** | UI/UX & Conversational AI Lead | "Cupid AI" Wingman engine, theme aesthetics, chatroom micro-interactions |
| **Shaurya Kumar Shaw** | Integration & QA Engineer | User pool data architecture, session persistence, Vercel CI/CD deployment |

---

## 📌 Problem & Thesis

Modern dating platforms have reduced human connection to an inventory catalog:
1. **Superficial Snap Judgments:** Decisions rely almost entirely on static photos rather than personality, humor, or real-time dynamics.
2. **Swipe Fatigue & Ghosting:** Endless mindless scrolling without interactive engagement breeds conversational burnout.
3. **The "Dead Opener" Dilemma:** Matches rot in chat queues because dry *"Hey"* or *"What's up"* messages fail to spark authentic banter.

### The Pact Solution
**Pact** is an **activity-first social chemistry platform**. Instead of evaluating static profiles in a vacuum, strangers discover mutual compatibility by doing things together in real time—dueling in mental deduction games, sketching on a collaborative canvas, and trading banter before deciding to unlock deeper connections.

Instead of asking *"Do I like their photos?"*, Pact prompts users to ask *"Do we actually vibe when doing things together?"*

---

## ✨ System Architecture & Core Features

### 1. Multi-Tier Social Discovery Engine
* **Deck (The Swiper):** Full-screen card stack featuring 15 distinct profiles with multi-photo carousels and captions, lifestyle badges (drinking, smoking, faith), reciprocal 3-word traits, and interest tags against an ambient soft-pink canvas with drifting bees and balloons. Built with responsive viewport adaptation: mobile features a floating quick SUPERPACT trigger with full-action controls at the scroll bottom, while tablet mode optimizes dimensions into an all-in-one non-scrolling card view.
* **Daily Sparks (24-Hour Cycle):** 5 curated profiles separate from the swiper pool, refreshed every 24 hours via a persistent live countdown timer. Features chemistry resonance scores and trait alignment badges over an ambient fire-and-ember backdrop.
* **Vibe Feed (Community Canvas):** A showcase feed featuring user-submitted shared doodles, custom stickers, and interactive invitations to join the shared art board.
* **Notification Hub:** Async match inbox managing direct Pacts and incoming `SUPERPACT` challenges with one-click `[✓ Accept]` and `[✕ Decline]` workflows.

### 2. Conversational Intelligence: "Cupid AI" Wingman
Integrated directly above the chat message bar, an autonomous dating assistant provides contextual conversational tools:
* **Personality & Vibe Briefing:** Synthesizes the match's bio, 3-word traits, and interests into an actionable personality summary.
* **Message Decoder:** Analyzes incoming text to reveal tone, subtext, and playful intent.
* **Contextual Conversation & Flirt Prompts:** Generates high-taste opening lines and witty comebacks tailored to mutual interests, populating them directly into the input field with one click.

### 3. Full-Screen Interactive Mini-Game Arena
* **Doodle Duel:** Real-time alternating draw-and-guess showdown against a 60-second timer with instant word validation.
* **AI Akinator Oracle:** Branching deduction engine across 30+ pop-culture, gaming, and anime icons featuring reactive AI genie states (Thinking, Shocked, Smirking, Defeated).
* **Two Truths & a Lie:** Alternating bluffing challenge powered by an intense 10-second rapid-guess countdown bar.
* **20 Questions Co-Op:** Symmetric mystery exchange where each player knows the other's secret celebrity identity and alternates questions until an instant-win deduction occurs.
* **Number Duel (1 to 100):** Head-to-head deduction mind game with alternating guess logs and real-time Higher/Lower feedback.
* **Micro Reflex Tap Race:** Millisecond-precision reaction showdown with randomized light gates.
* **Collaborative Canvas 2.0:** Rich digital studio with a 12-color palette, stroke controls, highlighter, eraser, and an instant *"Export as Chat Sticker"* pipeline.
* **Physics Spin the Bottle:** Realistic decelerating glass bottle engine prompting targeted *"Spill the Truth"* or *"Situation Calls"* dilemmas.
* **Post-Game Banter Engine:** Bi-directional meme delivery system with built-in asset failover. After competitive matches, players and AI matches exchange contextual banter cards into the chat stream:
  * *Victory Card:* "You won... but at what cost?"
  * *Defeat Card:* "Personally, I wouldn't take that level of disrespect"
  * *Opponent Taunt (on user loss):* "I wouldn't have lost this bad 😭💀"
  * *Opponent Reality-Check (on user win):* "How people feel after winning by a hunch 🗿"

### 4. Comprehensive Onboarding & Personalization
* **Strict Dating Filters:** Strict gender preference and dynamic dual-thumb age range matching (18–80).
* **Multi-Photo Studio:** Up to 6 photos with designated primary DP selection, caption editing, and reordering.
* **100+ Categorized Interest Cloud:** Spanning Anime, Gaming, Music, Tech, Outdoors, and Creative Arts.
* **Top 4 Global Artists Autocomplete:** Real-time prefix filtering featuring global creators with visual artist avatars.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React (Vite) (JavaScript / JSX)
* **Styling & Design System:** Tailwind CSS (Dark tactical aesthetic, custom glassmorphism, responsive layout)
* **Animations & Micro-Interactions:** Framer Motion, Canvas Confetti
* **Graphics & Canvas:** HTML5 Canvas API (High-precision stroke rendering & sticker export)
* **Icons:** Lucide React
* **Deployment & CI/CD:** Vercel

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

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
