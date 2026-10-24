// src/discovery.js - Modern Social Discovery Channels: Discover, Arcade, Feed, Daily Picks

import { store } from "./store.js";
import { renderAvatarHTML } from "./data.js";

export class DiscoveryManager {
  constructor(containerEl) {
    this.container = containerEl;
    this.radarAnimFrame = null;
    this.queueMatchedOpponent = null;
    this._deckKeyHandler = null;
  }

  render(channel = "deck") {
    this.container.innerHTML = "";
    if (this.radarAnimFrame) {
      cancelAnimationFrame(this.radarAnimFrame);
      this.radarAnimFrame = null;
    }

    switch (channel) {
      case "deck":
        this.renderDeck();
        break;
      case "arcade":
        this.renderArcade();
        break;
      case "feed":
        this.renderFeed();
        break;
      case "daily3":
        this.renderDaily3();
        break;
      default:
        this.renderDeck();
    }
  }

  // ==========================================
  // CHANNEL 1: DISCOVER (MAIN CARD DECK)
  // ==========================================
  renderDeck() {
    const unswiped = store.profiles.filter(p =>
      !store.swipedProfiles.passed.includes(p.id) &&
      !store.swipedProfiles.matched.includes(p.id)
    );

    const profile = unswiped[0];

    this.container.innerHTML = `
      <div class="deck-view h-[calc(100vh-4rem)] overflow-y-auto p-4 flex items-center justify-center animate-fade">
        <div class="w-full max-w-md mx-auto flex flex-col gap-3">
          <div class="channel-top-bar flex items-center justify-between pb-1">
            <div class="channel-title-group">
              <h2 class="channel-main-title text-xl font-bold text-white">Discover</h2>
              <span class="channel-subtitle text-xs text-slate-400">Activity-first connections based on shared traits</span>
            </div>
            <div class="deck-counter-badge bg-slate-800/80 border border-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full">
              <span>${unswiped.length} profiles nearby</span>
            </div>
          </div>

          ${profile ? `
            <div class="deck-card-wrapper max-w-md w-full mx-auto overflow-hidden">
              <div class="dating-card max-w-md w-full mx-auto bg-[#131B2E] border border-slate-700/60 rounded-3xl p-5 shadow-2xl space-y-4 overflow-hidden" id="activeSwipeCard" data-id="${profile.id}">
                <!-- ✅ FIXED & BOUNDED CARD PHOTO CONTAINER (h-[380px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl) -->
                <div class="dating-photo-container relative w-full h-[380px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
                  <img 
                    src="${profile.photo || profile.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}" 
                    alt="Profile" 
                    class="dating-photo-img w-full h-full object-cover object-center"
                  />
                  
                  <!-- Dark gradient vignette over bottom for readable text -->
                  <div class="photo-gradient-overlay absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/20 to-transparent pointer-events-none"></div>
                  
                  <!-- Profile details pinned inside bottom of photo -->
                  <div class="photo-title-area absolute bottom-4 left-4 right-4 text-left z-10 pointer-events-auto">
                    <div class="flex items-center gap-2">
                      <h2 class="text-2xl font-bold text-white tracking-tight">
                        ${profile.name}, <span class="text-slate-300 font-normal">${profile.age}</span>
                      </h2>
                      <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                    <p class="text-xs font-semibold text-rose-400 mt-1 flex items-center gap-1">
                      <span>📍</span> ${profile.location} • <span class="text-slate-400">${profile.education || profile.occupation || "Berklee College of Music"}</span>
                    </p>
                  </div>
                </div>

                <!-- Bio Text -->
                <div class="bio-block pt-1">
                  <p class="bio-text text-xs text-slate-300 leading-relaxed">${profile.bio}</p>
                </div>

                <!-- Ditch Flat Blue on the Trait Chips -->
                <div class="space-y-3 pt-1">
                  <!-- Self-trait chips: Warm Amber Glow -->
                  <div class="space-y-1.5">
                    <span class="text-[11px] font-bold uppercase tracking-wider text-amber-400/90 block">Self Traits</span>
                    <div class="chips-row flex flex-wrap gap-2">
                      ${profile.selfWords.map(w => `
                        <span class="word-chip word-chip-self bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-lg text-xs font-medium">${w}</span>
                      `).join('')}
                    </div>
                  </div>

                  <!-- Interest chips: Warm Coral/Rose Glow -->
                  <div class="space-y-1.5">
                    <span class="text-[11px] font-bold uppercase tracking-wider text-rose-400/90 block">Interests & Vibes</span>
                    <div class="tags-row flex flex-wrap gap-2">
                      ${profile.tags.map(t => `
                        <span class="interest-pill bg-rose-500/10 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-lg text-xs font-medium">${t}</span>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <!-- Bottom Action Buttons (High Energy Contrast) -->
                <div class="dating-action-bar flex items-center justify-between gap-3 pt-2">
                  <!-- Pass -->
                  <button class="action-btn btn-action-pass flex-1 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold hover:bg-rose-500/20 transition-all text-sm" id="btnDeckPass" title="Pass">
                    ✕ Pass
                  </button>

                  <!-- Instant Challenge (Middle Highlight) -->
                  <button class="action-btn btn-action-challenge flex-[1.4] py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-transform text-sm" id="btnDeckChallenge" title="Instant Mini-Game Challenge">
                    ⚡ Challenge
                  </button>

                  <!-- Pact / Like -->
                  <button class="action-btn btn-action-like flex-1 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold hover:bg-emerald-500/20 transition-all text-sm" id="btnDeckPact" title="Like / Match">
                    💚 Pact
                  </button>
                </div>
              </div>
            </div>
          ` : `
            <div class="empty-deck-card rounded-2xl bg-[#161F30] border border-slate-700/60 p-8 text-center flex flex-col items-center gap-4 max-w-md w-full mx-auto">
              <div class="empty-icon-wrap w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white">You've seen everyone nearby!</h3>
              <p class="text-sm text-slate-400 leading-relaxed">Check back later for new people, explore the Vibe Feed, or jump into the Arcade for instant activity matchmaking.</p>
              <div class="empty-btn-row flex gap-3 mt-2">
                <button class="btn bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs uppercase" id="btnResetDeck">Reset Cards</button>
                <button class="btn bg-slate-800 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-xs uppercase" id="btnGotoArcade">Try Arcade</button>
              </div>
            </div>
          `}
        </div>
      </div>
    `;

    this.attachDeckEvents(profile);
  }

  attachDeckEvents(profile) {
    if (!profile) {
      this.container.querySelector("#btnResetDeck")?.addEventListener("click", () => {
        store.swipedProfiles = { passed: [], matched: ["user-elena"] };
        store.saveSwipes();
        this.renderDeck();
      });
      this.container.querySelector("#btnGotoArcade")?.addEventListener("click", () => {
        store.setActiveChannel("arcade");
      });
      return;
    }

    const card = this.container.querySelector("#activeSwipeCard");
    const btnPass = this.container.querySelector("#btnDeckPass");
    const btnLike = this.container.querySelector("#btnDeckPact");
    const btnChallenge = this.container.querySelector("#btnDeckChallenge");

    const doSwipe = (action) => {
      if (!card) return;
      card.style.transform = action === "match" ? "translateX(120%) rotate(12deg)" : "translateX(-120%) rotate(-12deg)";
      card.style.opacity = "0";
      card.style.transition = "transform 0.35s ease, opacity 0.35s ease";

      setTimeout(() => {
        store.swipeProfile(profile.id, action);
        if (action === "match") {
          this.showMutualMatchModal(profile);
        } else {
          this.renderDeck();
        }
      }, 350);
    };

    btnPass?.addEventListener("click", () => doSwipe("pass"));
    btnLike?.addEventListener("click", () => doSwipe("match"));
    btnChallenge?.addEventListener("click", () => {
      doSwipe("match");
    });

    // Keyboard navigation: Left/Right arrows
    const handleKey = (e) => {
      if (store.activeChannel !== "deck") return;
      if (e.key === "ArrowLeft") doSwipe("pass");
      if (e.key === "ArrowRight") doSwipe("match");
    };
    window.removeEventListener("keydown", this._deckKeyHandler);
    this._deckKeyHandler = handleKey;
    window.addEventListener("keydown", this._deckKeyHandler);
  }

  showMutualMatchModal(profile) {
    const modalEl = document.createElement("div");
    modalEl.className = "modal-overlay animate-fade";
    modalEl.innerHTML = `
      <div class="match-popup-card rounded-2xl shadow-2xl">
        <div class="match-sparkle-pill">
          <span>✨ IT'S A MATCH!</span>
        </div>

        <div class="matched-users-row">
          <div class="user-circle">
            <img src="${store.user.photo}" alt="${store.user.name}" class="matched-photo" />
            <span class="user-name">You</span>
          </div>
          <div class="match-heart-badge">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="#10B981">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div class="user-circle">
            <img src="${profile.photo}" alt="${profile.name}" class="matched-photo" />
            <span class="user-name">${profile.name}</span>
          </div>
        </div>

        <h2 class="match-heading">You and ${profile.name} liked each other!</h2>
        <p class="match-subheading">Skip the boring small talk—break the ice with an activity or dive straight into chat.</p>

        <div class="icebreaker-list">
          <button class="icebreaker-option" data-game="number_duel">
            <span class="game-emoji">🎯</span>
            <div class="game-details">
              <strong>Play Number Duel</strong>
              <span>Fast 1-to-100 deduction showdown</span>
            </div>
          </button>

          <button class="icebreaker-option" data-game="shared_canvas">
            <span class="game-emoji">🎨</span>
            <div class="game-details">
              <strong>Collaborative Canvas</strong>
              <span>Draw and doodle together in real time</span>
            </div>
          </button>

          <button class="icebreaker-option" data-game="persona_guess">
            <span class="game-emoji">⏱</span>
            <div class="game-details">
              <strong>Speed Persona Guess</strong>
              <span>Fast 60-second trivia showdown</span>
            </div>
          </button>
        </div>

        <div class="match-btn-row">
          <button class="btn btn-primary btn-block" id="btnGoToChatNow">
            Open Chat with ${profile.name.split(' ')[0]}
          </button>
          <button class="btn btn-secondary btn-block" id="btnContinueSwiping">
            Keep Swiping
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    modalEl.querySelectorAll(".icebreaker-option").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const gameId = e.currentTarget.dataset.game;
        modalEl.remove();
        store.setActiveChannel("chat", { partnerId: profile.id, autoLaunchGame: gameId });
      });
    });

    modalEl.querySelector("#btnGoToChatNow")?.addEventListener("click", () => {
      modalEl.remove();
      store.setActiveChannel("chat", { partnerId: profile.id });
    });

    modalEl.querySelector("#btnContinueSwiping")?.addEventListener("click", () => {
      modalEl.remove();
      this.renderDeck();
    });
  }

  // ==========================================
  // CHANNEL 2: ARCADE (INSTANT MATCHMAKING)
  // ==========================================
  renderArcade() {
    this.container.innerHTML = `
      <div class="arcade-view animate-fade">
        <div class="channel-top-bar">
          <div class="channel-title-group">
            <h2 class="channel-main-title">Arcade Matchmaking</h2>
            <span class="channel-subtitle">Match into a 60-second mini-game first—reveal profiles only if you both click opt-in!</span>
          </div>
          <div class="arcade-pill">
            <span class="dot-online"></span>
            <span>142 players in queue</span>
          </div>
        </div>

        <div class="arcade-container">
          <div class="radar-box rounded-2xl">
            <canvas id="arcadeRadarCanvas" width="340" height="340" class="radar-canvas"></canvas>
            
            <div class="radar-center-button-wrap">
              <button class="radar-start-btn" id="btnFindOpponent">
                <div class="radar-pulse"></div>
                <div class="start-btn-content">
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                  <span class="btn-text">FIND MATCH</span>
                  <small>Under 5s</small>
                </div>
              </button>
            </div>
          </div>

          <div class="arcade-stage-card rounded-2xl" id="arcadeMatchStage">
            <div class="arcade-intro">
              <span class="intro-badge">ACTIVITY FIRST</span>
              <h3>How Arcade Works</h3>
              <p>Photos and full bios are hidden during the match. You're paired into a quick reaction game in under 5 seconds. Once the game ends, you both decide if you want to connect and reveal profiles!</p>
              
              <div class="arcade-perks-list">
                <div class="perk-item">
                  <span class="perk-icon">⚡</span>
                  <div>
                    <strong>Zero Waiting</strong>
                    <span>Instant pairing into a quick micro-game</span>
                  </div>
                </div>
                <div class="perk-item">
                  <span class="perk-icon">🎭</span>
                  <div>
                    <strong>Blind Chemistry</strong>
                    <span>Connect based on play and energy before photos</span>
                  </div>
                </div>
                <div class="perk-item">
                  <span class="perk-icon">🤝</span>
                  <div>
                    <strong>Dual Opt-In</strong>
                    <span>Chat only opens if you both want to connect</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initRadarCanvas();
    this.attachArcadeEvents();
  }

  initRadarCanvas() {
    const canvas = this.container.querySelector("#arcadeRadarCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = width / 2 - 16;
    let angle = 0;

    const blips = [
      { r: radius * 0.4, a: 0.8 },
      { r: radius * 0.7, a: 2.3 },
      { r: radius * 0.85, a: 4.1 },
      { r: radius * 0.55, a: 5.2 }
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Circles
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1;
      [0.3, 0.6, 0.9].forEach(frac => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * frac, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Sweep
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const sweep = ctx.createLinearGradient(0, 0, radius, 0);
      sweep.addColorStop(0, "rgba(37, 99, 235, 0.45)");
      sweep.addColorStop(1, "rgba(37, 99, 235, 0.0)");
      ctx.fillStyle = sweep;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, 0, Math.PI / 4);
      ctx.lineTo(0, 0);
      ctx.fill();

      ctx.strokeStyle = "#3B82F6";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius, 0);
      ctx.stroke();
      ctx.restore();

      // Blips
      blips.forEach(b => {
        const bx = cx + Math.cos(b.a) * b.r;
        const by = cy + Math.sin(b.a) * b.r;
        ctx.fillStyle = "#10B981";
        ctx.beginPath();
        ctx.arc(bx, by, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      angle += 0.035;
      this.radarAnimFrame = requestAnimationFrame(draw);
    };

    draw();
  }

  attachArcadeEvents() {
    const btnFind = this.container.querySelector("#btnFindOpponent");
    const stage = this.container.querySelector("#arcadeMatchStage");
    if (!btnFind || !stage) return;

    btnFind.addEventListener("click", () => {
      btnFind.disabled = true;
      btnFind.querySelector(".btn-text").textContent = "PAIRING...";

      let countdown = 3;
      const timer = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          btnFind.querySelector(".btn-text").textContent = `READY IN 0${countdown}...`;
        } else {
          clearInterval(timer);
          this.executeArcadeMatch(stage);
        }
      }, 900);
    });
  }

  executeArcadeMatch(stage) {
    const opponent = store.profiles[0] || store.profiles[1];
    this.queueMatchedOpponent = opponent;

    stage.innerHTML = `
      <div class="arcade-showdown animate-fade">
        <div class="showdown-header">
          <span class="badge-intent">OPPONENT FOUND!</span>
          <h3>Micro Reflex Tap Race</h3>
          <p>Tap as fast as you can when the red light turns green! Best of 3 rounds.</p>
        </div>

        <div class="reflex-arena rounded-xl" id="arcadeReflexBox">
          <span class="reflex-text" id="arcadeReflexText">WAIT FOR GREEN...</span>
        </div>

        <button class="btn btn-primary btn-block btn-lg" id="arcadeBtnTap">
          TAP HERE AS SOON AS IT TURNS GREEN!
        </button>
      </div>
    `;

    this.runReflexLogic();
  }

  runReflexLogic() {
    const box = this.container.querySelector("#arcadeReflexBox");
    const text = this.container.querySelector("#arcadeReflexText");
    const btnTap = this.container.querySelector("#arcadeBtnTap");
    if (!box || !btnTap) return;

    let isArmed = false;
    let startTime = 0;
    let timerId = null;

    const arm = () => {
      box.className = "reflex-arena rounded-xl state-standby";
      text.textContent = "WAIT FOR GREEN...";
      isArmed = false;

      const delay = 1400 + Math.random() * 2200;
      timerId = setTimeout(() => {
        box.className = "reflex-arena rounded-xl state-ready";
        text.textContent = "TAP NOW!!";
        isArmed = true;
        startTime = performance.now();
      }, delay);
    };

    arm();

    btnTap.addEventListener("click", () => {
      if (!isArmed) {
        clearTimeout(timerId);
        box.className = "reflex-arena rounded-xl state-fault";
        text.textContent = "Too early! False start.";
        setTimeout(() => this.finishArcadeGame(false, 350, 220), 1400);
        return;
      }

      const youMs = Math.round(performance.now() - startTime);
      const oppMs = Math.round(180 + Math.random() * 90);
      const won = youMs <= oppMs;

      box.className = won ? "reflex-arena rounded-xl state-win" : "reflex-arena rounded-xl state-loss";
      text.innerHTML = `
        <div>${won ? 'You Won!' : 'Opponent was faster!'}</div>
        <small style="font-size:13px; margin-top:4px; display:block">Your time: ${youMs}ms • Opponent: ${oppMs}ms</small>
      `;

      setTimeout(() => this.finishArcadeGame(won, youMs, oppMs), 1600);
    });
  }

  finishArcadeGame(won, youMs = 210, oppMs = 240) {
    const stage = this.container.querySelector("#arcadeMatchStage");
    if (!stage) return;
    const opp = this.queueMatchedOpponent;

    stage.innerHTML = `
      <div class="optin-card rounded-2xl animate-fade">
        <span class="badge-intent">GAME COMPLETE</span>
        <h2>Great game! Want to connect?</h2>
        <p>Both players tested their speed. Would you like to reveal profiles and open chat?</p>

        <div class="result-stats-row">
          <div class="result-stat-box">
            <span class="stat-lbl">YOUR TIME</span>
            <span class="stat-val text-emerald">${youMs} ms</span>
          </div>
          <div class="stat-vs">VS</div>
          <div class="result-stat-box">
            <span class="stat-lbl">THEIR TIME</span>
            <span class="stat-val">${oppMs} ms</span>
          </div>
        </div>

        <div class="optin-btn-row">
          <button class="btn btn-secondary" id="btnArcadePass">Pass</button>
          <button class="btn btn-primary" id="btnArcadePactUp">
            Reveal & Connect
          </button>
        </div>
      </div>
    `;

    stage.querySelector("#btnArcadePass")?.addEventListener("click", () => {
      this.renderArcade();
    });

    stage.querySelector("#btnArcadePactUp")?.addEventListener("click", () => {
      store.swipeProfile(opp.id, "match");
      stage.innerHTML = `
        <div class="unmasked-card rounded-2xl animate-fade">
          <img src="${opp.photo}" alt="${opp.name}" class="unmasked-photo rounded-full" />
          <h3>Connected with ${opp.name}!</h3>
          <p>${opp.bio.slice(0, 100)}...</p>
          <button class="btn btn-primary btn-block" id="btnEnterArcadeChat">
            Chat with ${opp.name.split(' ')[0]}
          </button>
        </div>
      `;
      stage.querySelector("#btnEnterArcadeChat")?.addEventListener("click", () => {
        store.setActiveChannel("chat", { partnerId: opp.id });
      });
    });
  }

  // ==========================================
  // CHANNEL 3: FEED (VIBE BOARD)
  // ==========================================
  renderFeed() {
    this.container.innerHTML = `
      <div class="feed-view animate-fade">
        <div class="channel-top-bar">
          <div class="channel-title-group">
            <h2 class="channel-main-title">Vibe Feed</h2>
            <span class="channel-subtitle">Share quick doodles, gaming setups, and rate community vibes</span>
          </div>
          <button class="btn btn-primary btn-sm" id="btnCreateVibe">
            + Post a Vibe
          </button>
        </div>

        <div class="feed-masonry-grid">
          ${store.feedPosts.map(post => this.renderFeedItem(post)).join('')}
        </div>
      </div>
    `;

    this.attachFeedEvents();
  }

  renderFeedItem(post) {
    return `
      <div class="vibe-post-card rounded-2xl">
        <div class="vibe-post-header">
          <img src="${post.authorPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}" alt="${post.authorName}" class="vibe-author-avatar rounded-full" />
          <div class="vibe-author-meta">
            <strong class="vibe-author-name">${post.authorName || post.author}</strong>
            <span class="vibe-post-time">@${post.author} • ${post.timeAgo}</span>
          </div>
        </div>

        <div class="vibe-post-body">
          <h4 class="vibe-post-title">${post.title}</h4>
          <p class="vibe-post-prompt">"${post.prompt}"</p>
          ${post.ratingScore ? `
            <div class="vibe-score-badge">
              <span class="score-number">${post.ratingScore}</span>
              <span class="score-caption">/ 10 community rating</span>
            </div>
          ` : ''}
          ${post.doodleDataUrl ? `<img src="${post.doodleDataUrl}" alt="${post.title}" class="vibe-doodle-preview rounded-xl" />` : ''}
        </div>

        <div class="vibe-post-actions">
          <button class="vibe-btn btn-like-vibe" data-id="${post.id}">
            ❤️ <span class="like-num">${post.likes}</span>
          </button>
          <button class="vibe-btn btn-reply-vibe" data-author="${post.author}">
            💬 ${post.replies} replies
          </button>
          <button class="vibe-btn btn-challenge-author" data-author="${post.author}">
            ⚡ Challenge
          </button>
        </div>
      </div>
    `;
  }

  attachFeedEvents() {
    this.container.querySelector("#btnCreateVibe")?.addEventListener("click", () => this.openCreateVibeModal());

    this.container.querySelectorAll(".btn-like-vibe").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const num = e.currentTarget.querySelector(".like-num");
        if (num) {
          num.textContent = parseInt(num.textContent) + 1;
          e.currentTarget.style.color = "#10B981";
        }
      });
    });

    this.container.querySelectorAll(".btn-challenge-author").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const author = e.currentTarget.dataset.author;
        const profile = store.profiles.find(p => p.username === author);
        if (profile) {
          store.swipeProfile(profile.id, "match");
          store.setActiveChannel("chat", { partnerId: profile.id, autoLaunchGame: "doodle_duel" });
        }
      });
    });

    this.container.querySelectorAll(".btn-reply-vibe").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const author = e.currentTarget.dataset.author;
        const profile = store.profiles.find(p => p.username === author);
        if (profile) {
          store.setActiveChannel("chat", { partnerId: profile.id });
        }
      });
    });
  }

  openCreateVibeModal() {
    const modalEl = document.createElement("div");
    modalEl.className = "modal-overlay animate-fade";
    modalEl.innerHTML = `
      <div class="modal-card rounded-2xl">
        <div class="modal-card-header">
          <h3>Post a Vibe</h3>
          <button class="btn-icon-close" id="btnCloseVibeModal">✕</button>
        </div>

        <div class="form-group">
          <label class="form-label">Caption or Question</label>
          <input type="text" id="inpVibeTitle" class="form-input" placeholder="e.g. My late night desk setup" required />
        </div>

        <div class="form-group">
          <label class="form-label">Quick Doodle (Canvas)</label>
          <div class="vibe-canvas-box">
            <canvas id="vibeDrawCanvas" width="460" height="240" class="draw-canvas rounded-xl"></canvas>
            <div class="canvas-palette">
              <button type="button" class="color-dot active" data-color="#2563EB" style="background:#2563EB"></button>
              <button type="button" class="color-dot" data-color="#10B981" style="background:#10B981"></button>
              <button type="button" class="color-dot" data-color="#F59E0B" style="background:#F59E0B"></button>
              <button type="button" class="color-dot" data-color="#EF4444" style="background:#EF4444"></button>
              <button type="button" class="color-dot" data-color="#F8FAFC" style="background:#F8FAFC"></button>
              <button type="button" class="btn btn-secondary btn-sm" id="btnClearVibe">Clear</button>
            </div>
          </div>
        </div>

        <div class="modal-card-footer">
          <button class="btn btn-secondary" id="btnCancelVibe">Cancel</button>
          <button class="btn btn-primary" id="btnPublishVibe">Publish Vibe</button>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    const canvas = modalEl.querySelector("#vibeDrawCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let currentColor = "#2563EB";
    let isDrawing = false;
    let lx = 0, ly = 0;

    modalEl.querySelectorAll(".color-dot").forEach(dot => {
      dot.addEventListener("click", (e) => {
        modalEl.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
        e.currentTarget.classList.add("active");
        currentColor = e.currentTarget.dataset.color;
      });
    });

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: (cx - rect.left) * scaleX, y: (cy - rect.top) * scaleY };
    };

    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;
      const p = getPos(e);
      lx = p.x; ly = p.y;
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!isDrawing) return;
      const p = getPos(e);
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      lx = p.x; ly = p.y;
    });

    const stopD = () => isDrawing = false;
    canvas.addEventListener("mouseup", stopD);
    canvas.addEventListener("mouseleave", stopD);

    modalEl.querySelector("#btnClearVibe")?.addEventListener("click", () => {
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    const close = () => modalEl.remove();
    modalEl.querySelector("#btnCloseVibeModal")?.addEventListener("click", close);
    modalEl.querySelector("#btnCancelVibe")?.addEventListener("click", close);

    modalEl.querySelector("#btnPublishVibe")?.addEventListener("click", () => {
      const title = modalEl.querySelector("#inpVibeTitle")?.value.trim() || "My Vibe Sketch";
      const dataUrl = canvas.toDataURL("image/png");
      store.addFeedPost({
        title,
        type: "doodle",
        prompt: "Shared doodle",
        doodleDataUrl: dataUrl
      });
      close();
      this.renderFeed();
    });
  }

  // ==========================================
  // CHANNEL 4: DAILY PICKS
  // ==========================================
  renderDaily3() {
    const dailyProfiles = store.profiles.slice(0, 3);

    this.container.innerHTML = `
      <div class="daily3-view animate-fade">
        <div class="channel-top-bar">
          <div class="channel-title-group">
            <h2 class="channel-main-title">Daily Matches</h2>
            <span class="channel-subtitle">Handpicked matches based on your 3-word traits and mutual tags</span>
          </div>
          <div class="daily-pill">
            <span>Refreshes in 14h 28m</span>
          </div>
        </div>

        <div class="daily-cards-container">
          ${dailyProfiles.map((p, idx) => {
            const matchScore = 96 - idx * 4;
            const mutualTags = p.tags.filter(t => store.user.tags?.includes(t));

            return `
              <div class="daily-match-card rounded-2xl shadow-lg">
                <div class="daily-match-photo-wrap">
                  <img src="${p.photo}" alt="${p.name}" class="daily-match-photo" />
                  <div class="daily-match-score-pill">
                    <strong>${matchScore}%</strong> Match
                  </div>
                </div>

                <div class="daily-match-info">
                  <div class="daily-match-name-row">
                    <h3>${p.name}, ${p.age}</h3>
                    <span class="daily-loc">📍 ${p.location}</span>
                  </div>

                  <p class="daily-bio-p">"${p.bio.slice(0, 120)}..."</p>

                  <div class="daily-words-row">
                    ${p.selfWords.map(w => `<span class="word-chip bg-slate-800 text-slate-200 px-3 py-1 rounded-full text-xs font-medium">${w}</span>`).join('')}
                  </div>

                  <div class="daily-mutual-tags">
                    <span class="tags-hint">${mutualTags.length} mutual interests:</span>
                    <div class="tags-row">
                      ${mutualTags.map(t => `<span class="interest-pill mutual-interest">${t}</span>`).join('')}
                    </div>
                  </div>

                  <div class="daily-card-actions">
                    <button class="btn btn-secondary btn-sm btn-challenge-daily" data-id="${p.id}">
                      ⚡ Challenge
                    </button>
                    <button class="btn btn-primary btn-sm btn-like-daily" data-id="${p.id}">
                      💚 Connect
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    this.container.querySelectorAll(".btn-like-daily").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;
        const profile = store.profiles.find(p => p.id === id);
        if (profile) {
          store.swipeProfile(id, "match");
          this.showMutualMatchModal(profile);
        }
      });
    });

    this.container.querySelectorAll(".btn-challenge-daily").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;
        store.swipeProfile(id, "match");
        store.setActiveChannel("chat", { partnerId: id, autoLaunchGame: "number_duel" });
      });
    });
  }
}
