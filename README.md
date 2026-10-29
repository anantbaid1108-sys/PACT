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
* **Deck (The Swiper):** Full-screen card stack featuring 15 distinct profiles with multi-photo carousels and captions, lifestyle badges (drinking, smoking, faith), reciprocal 3-word traits, and interest tags against an ambient soft-pink background with floating decorative bees (🐝) and balloons (🎈).
  * **Visual Palette:** Soft pastel pink ambient background (`#FFF0F5`) accented with gentle floating decorative bees (🐝) and pastel balloons (🎈).
  * **Strictly Visual:** Pure visual ambient experience with zero audio tracks, background music (BGM), or sound toggles.
  * **Responsive Viewport Layout:**
    * **Mobile (<768px):** Floating quick `SUPERPACT` trigger button anchored at the bottom-right for instant engagement, with the full action bar (`[✕]`, `[⚡]`, `[❤️]`) positioned naturally at the bottom of the scrollable profile.
    * **Tablet (768px–1024px):** Optimized all-in-one non-scrolling card frame with photos and details side-by-side and pinned bottom action controls.
    * **Desktop (≥1024px):** Full-screen gesture-driven card swiper with fluid micro-interactions.
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
* **Post-Game Banter Engine:** Bi-directional post-match meme exchange engine with resilient CSS/SVG asset fallbacks (`onError` boundary handler) ensuring meme cards never render broken images. Directly dispatches contextual outcome memes into the match chat:
  * **User Wins:** *"You won... but at what cost?"*
  * **User Loses:** *"Personally, I wouldn't take that level of disrespect"*
  * **Opponent Wins:** *"How people feel after winning by a hunch 🗿"*
  * **Opponent Loses:** *"I wouldn't have lost this bad 😭💀"*

### 4. Client-Side Session Management & Onboarding Routing
* **First-Time Session Routing:** App checks `localStorage` for `pact_user_profile` upon initial visit. First-time visitors and incognito sessions land directly on the multi-step Onboarding & Profile Setup flow instead of loading a hardcoded default profile.
* **Session Persistence:** Completed user profiles persist locally across page refreshes and browser restarts.
* **Judge / Demo Reset Workflow:** Added a quick reset/logout control in settings and the sidebar footer that purges local session storage and reloads the app back to the onboarding screen, enabling evaluators to test profile creation from scratch.
* **Strict Dating Filters:** Strict gender preference and dynamic dual-thumb age range matching (18–80).
* **Multi-Photo Studio:** Up to 6 photos with designated primary DP selection, caption editing, and reordering.
* **100+ Categorized Interest Cloud:** Spanning Anime, Gaming, Music, Tech, Outdoors, and Creative Arts.
* **Top 4 Global Artists Autocomplete:** Real-time prefix filtering featuring global creators with visual artist avatars.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React (Vite) (JavaScript / JSX)
* **Styling & Design System:** Tailwind CSS (Romantic pastel deck & dark tactical game UI, custom glassmorphism, responsive layout)
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

4. **Access the application:**
   Navigate to `http://localhost:5173` in your browser.

---

## 📜 Compliance, Safety & Legal

* Developed during **Affecio Hacks ’26** (October 21–28, 2026).
* Built strictly adhering to open-source guidelines without uncredited proprietary assets.
* Standalone legal compliance routes (`/privacy` and `/terms`) detail ephemeral canvas storage, zero credential exposure, location masking, and 18+ community safety guidelines.
