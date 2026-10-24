// src/games.js - In-Chat Game Arena: All 8 Mini-Games (Competitive & Co-Op)

import { store } from "./store.js";
import { PERSONA_DATABASE, IMPOSTER_DILEMMAS, SPICY_PROMPTS } from "./data.js";

export class GameArenaManager {
  constructor(containerEl) {
    this.container = containerEl;
    this.activeGameId = null;
    this.partnerId = null;
    this.gameInterval = null;
  }

  launchGame(gameId, partnerId) {
    this.activeGameId = gameId;
    this.partnerId = partnerId;
    this.stopActiveTimer();
    this.render();
  }

  stopActiveTimer() {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    }
  }

  closeArena() {
    this.stopActiveTimer();
    this.activeGameId = null;
    this.container.innerHTML = "";
    this.container.classList.remove("active");
  }

  render() {
    if (!this.activeGameId) {
      this.closeArena();
      return;
    }

    this.container.classList.add("active");
    const partner = store.profiles.find(p => p.id === this.partnerId) || store.profiles[0];

    const gameTitles = {
      persona_guess: "Time-Trial Persona Guess (Speed Akinator)",
      number_duel: "Number Duel (1 to 100)",
      doodle_duel: "Doodle Duel (Quick-Draw Sync)",
      reflex_race: "Micro Reflex Tap Race",
      shared_canvas: "Collaborative Shared Canvas",
      twenty_questions: "20 Questions Co-Op",
      imposter_ai: "Who's the Imposter? (AI Edition)",
      spin_bottle: "Spin the Bottle / Dynamic Prompts"
    };

    const isCompetitive = ["persona_guess", "number_duel", "doodle_duel", "reflex_race"].includes(this.activeGameId);

    this.container.innerHTML = `
      <div class="arena-window animate-fade">
        <div class="arena-top-banner">
          <div class="arena-meta">
            <span class="arena-mode-tag ${isCompetitive ? 'mode-comp' : 'mode-coop'}">
              ${isCompetitive ? '⚡ COMPETITIVE MODE' : '🤝 CO-OP MODE'}
            </span>
            <h3 class="arena-game-title">${gameTitles[this.activeGameId]}</h3>
            <span class="arena-partner-tag">with @${partner.username}</span>
          </div>

          <div class="arena-controls">
            <button class="btn btn-secondary btn-sm" id="btnMinimizeArena" title="Minimize game">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
            <button class="btn-icon-close" id="btnCloseArena" title="Exit Game Arena">×</button>
          </div>
        </div>

        <div class="arena-body" id="arenaGameStage">
          ${this.renderGameStage(partner)}
        </div>
      </div>
    `;

    this.container.querySelector("#btnCloseArena")?.addEventListener("click", () => this.closeArena());
    this.container.querySelector("#btnMinimizeArena")?.addEventListener("click", () => {
      this.container.classList.toggle("minimized");
    });

    this.initGameLogic(partner);
  }

  renderGameStage(partner) {
    switch (this.activeGameId) {
      case "persona_guess":
        return this.templatePersonaGuess(partner);
      case "number_duel":
        return this.templateNumberDuel(partner);
      case "doodle_duel":
        return this.templateDoodleDuel(partner);
      case "reflex_race":
        return this.templateReflexRace(partner);
      case "shared_canvas":
        return this.templateSharedCanvas(partner);
      case "twenty_questions":
        return this.templateTwentyQuestions(partner);
      case "imposter_ai":
        return this.templateImposterAI(partner);
      case "spin_bottle":
        return this.templateSpinBottle(partner);
      default:
        return `<div class="empty-arena">Select a game from Launch Experience.</div>`;
    }
  }

  // ==========================================
  // 1. TIME-TRIAL PERSONA GUESS (SPEED AKINATOR)
  // ==========================================
  templatePersonaGuess(partner) {
    return `
      <div class="game-stage persona-stage">
        <div class="persona-hud">
          <div class="timer-box">
            <span class="hud-label">TIME REMAINING:</span>
            <span class="timer-digits text-danger" id="personaTimer">60.00s</span>
          </div>
          <div class="persona-rules">
            Ask the AI Judge questions! Answers strictly: <strong>YES</strong>, <strong>NO</strong>, or <strong>IRRELEVANT</strong>. Hit Buzzer to solve.
          </div>
          <button class="btn btn-danger buzz-in-btn" id="btnBuzzIn">
            BUZZ IN TO GUESS
          </button>
        </div>

        <div class="interrogation-log" id="interrogationLog">
          <div class="log-entry system-entry">
            ⚡ Secret Persona locked in by AI Judge. Interrogation active.
          </div>
        </div>

        <form class="interrogation-form" id="personaQuestionForm">
          <input type="text" id="inpPersonaQuestion" class="form-input" placeholder="Ask question (e.g. Is this persona alive? Are they in tech?)..." required />
          <button type="submit" class="btn btn-primary">INTERROGATE</button>
        </form>
      </div>
    `;
  }

  initPersonaGuess(partner) {
    const persona = PERSONA_DATABASE[Math.floor(Math.random() * PERSONA_DATABASE.length)];
    let timeLeft = 60.0;
    const timerEl = this.container.querySelector("#personaTimer");
    const logEl = this.container.querySelector("#interrogationLog");
    const formEl = this.container.querySelector("#personaQuestionForm");
    const inpEl = this.container.querySelector("#inpPersonaQuestion");
    const btnBuzz = this.container.querySelector("#btnBuzzIn");

    this.gameInterval = setInterval(() => {
      timeLeft -= 0.1;
      if (timeLeft <= 0) {
        clearInterval(this.gameInterval);
        if (timerEl) timerEl.textContent = "00.00s";
        this.addLog(logEl, `TIME EXPIRED! The secret persona was: ${persona.name}`, "system-entry");
      } else if (timerEl) {
        timerEl.textContent = `${timeLeft.toFixed(2)}s`;
      }
    }, 100);

    formEl?.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = inpEl.value.trim();
      if (!q) return;
      inpEl.value = "";

      this.addLog(logEl, `You asked: "${q}"`, "user-entry");

      // Simple AI evaluation
      setTimeout(() => {
        let answer = "IRRELEVANT";
        const lq = q.toLowerCase();
        if (lq.includes("alive") || lq.includes("living")) {
          answer = persona.checks.alive ? "YES" : "NO";
        } else if (lq.includes("real") || lq.includes("human")) {
          answer = persona.checks.human ? "YES" : "NO";
        } else if (lq.includes("fictional") || lq.includes("character")) {
          answer = persona.checks.fictional ? "YES" : "NO";
        } else if (lq.includes("game") || lq.includes("gaming")) {
          answer = persona.checks.gaming ? "YES" : "NO";
        } else if (lq.includes("tech") || lq.includes("computer") || lq.includes("code")) {
          answer = persona.checks.tech ? "YES" : "NO";
        } else if (lq.includes("anime") || lq.includes("manga")) {
          answer = persona.checks.anime ? "YES" : "NO";
        } else {
          answer = Math.random() > 0.5 ? "YES" : "NO";
        }

        this.addLog(logEl, `AI JUDGE: [${answer}]`, answer === "YES" ? "judge-yes" : (answer === "NO" ? "judge-no" : "judge-irrelevant"));
      }, 500);
    });

    btnBuzz?.addEventListener("click", () => {
      clearInterval(this.gameInterval);
      const guess = prompt("Enter your Persona Guess:");
      if (!guess) return;

      if (guess.toLowerCase().includes(persona.name.toLowerCase().split(' ')[0])) {
        alert(`🏆 CORRECT! You identified ${persona.name}! Victory in ${(60 - timeLeft).toFixed(1)}s.`);
        this.addLog(logEl, `🏆 VICTORY! Correctly identified ${persona.name}!`, "win-entry");
        store.sendMessage(this.partnerId, {
          sender: "system",
          type: "game_result",
          content: `🏆 Speed Akinator Won! Persona: ${persona.name} discovered in ${(60 - timeLeft).toFixed(1)}s.`
        });
      } else {
        alert(`❌ Incorrect! The persona was ${persona.name}.`);
        this.addLog(logEl, `❌ Incorrect guess: "${guess}". Persona was ${persona.name}.`, "loss-entry");
      }
    });
  }

  // ==========================================
  // 2. NUMBER DUEL (1 TO 100)
  // ==========================================
  templateNumberDuel(partner) {
    return `
      <div class="game-stage number-stage">
        <div class="number-range-hud">
          <div class="range-indicator">
            <span class="range-bound" id="rangeLow">01</span>
            <div class="range-track">
              <div class="range-active-bar" id="rangeBar" style="left:0%; width:100%;"></div>
            </div>
            <span class="range-bound" id="rangeHigh">100</span>
          </div>
          <div class="turn-indicator" id="numberTurnText">Your Turn to Guess</div>
        </div>

        <div class="guess-history-stream" id="numberGuessStream">
          <div class="history-item system">Both players have locked a target number. Guess between 1 and 100!</div>
        </div>

        <form class="number-guess-form" id="formNumberGuess">
          <input type="number" id="inpGuessNum" class="form-input num-input" min="1" max="100" placeholder="Enter integer 1 - 100" required />
          <button type="submit" class="btn btn-primary" id="btnSubmitGuess">FIRE GUESS</button>
        </form>
      </div>
    `;
  }

  initNumberDuel(partner) {
    const target = Math.floor(Math.random() * 100) + 1;
    let minRange = 1;
    let maxRange = 100;
    const stream = this.container.querySelector("#numberGuessStream");
    const bar = this.container.querySelector("#rangeBar");
    const lowEl = this.container.querySelector("#rangeLow");
    const highEl = this.container.querySelector("#rangeHigh");
    const form = this.container.querySelector("#formNumberGuess");
    const inp = this.container.querySelector("#inpGuessNum");
    const turnText = this.container.querySelector("#numberTurnText");

    const updateRangeBar = () => {
      if (lowEl) lowEl.textContent = minRange.toString().padStart(2, '0');
      if (highEl) highEl.textContent = maxRange.toString().padStart(2, '0');
      if (bar) {
        const leftPercent = ((minRange - 1) / 99) * 100;
        const widthPercent = ((maxRange - minRange) / 99) * 100;
        bar.style.left = `${leftPercent}%`;
        bar.style.width = `${Math.max(4, widthPercent)}%`;
      }
    };

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = parseInt(inp.value, 10);
      if (isNaN(val) || val < 1 || val > 100) return;
      inp.value = "";

      if (val === target) {
        this.addHistory(stream, `🎯 YOU GUESSED EXACTLY ${val}! TARGET ELIMINATED!`, "win");
        turnText.textContent = "🏆 VICTORY ACHIEVED!";
        store.sendMessage(this.partnerId, {
          sender: "system",
          type: "game_result",
          content: `🎯 Number Duel Victory! Exact integer [${val}] hit.`
        });
        return;
      }

      if (val < target) {
        minRange = Math.max(minRange, val + 1);
        this.addHistory(stream, `You guessed ${val} ➔ HIGHER 🔼`, "user");
      } else {
        maxRange = Math.min(maxRange, val - 1);
        this.addHistory(stream, `You guessed ${val} ➔ LOWER 🔽`, "user");
      }
      updateRangeBar();

      // Partner simulated turn
      turnText.textContent = `${partner.name} is calculating...`;
      form.querySelector("button").disabled = true;

      setTimeout(() => {
        // Smart AI binary-ish guess
        const partnerGuess = Math.floor((minRange + maxRange) / 2);
        if (partnerGuess === target) {
          this.addHistory(stream, `🎯 @${partner.username} guessed ${partnerGuess} and WON!`, "opp-win");
          turnText.textContent = `@${partner.username} hit the number!`;
        } else if (partnerGuess < target) {
          minRange = Math.max(minRange, partnerGuess + 1);
          this.addHistory(stream, `@${partner.username} guessed ${partnerGuess} ➔ HIGHER 🔼`, "opp");
          turnText.textContent = "Your Turn to Guess";
        } else {
          maxRange = Math.min(maxRange, partnerGuess - 1);
          this.addHistory(stream, `@${partner.username} guessed ${partnerGuess} ➔ LOWER 🔽`, "opp");
          turnText.textContent = "Your Turn to Guess";
        }
        updateRangeBar();
        form.querySelector("button").disabled = false;
      }, 1200);
    });
  }

  // ==========================================
  // 3. DOODLE DUEL (QUICK-DRAW SYNC)
  // ==========================================
  templateDoodleDuel(partner) {
    return `
      <div class="game-stage doodle-stage">
        <div class="doodle-top-bar">
          <div class="prompt-box">
            <span class="hud-label">YOUR SECRET PROMPT:</span>
            <strong class="secret-prompt-text" id="doodleSecretPrompt">Mechanical Keyboard</strong>
          </div>
          <div class="doodle-timer-box">
            <span class="timer-digits text-warning" id="doodleTimer">60s</span>
          </div>
        </div>

        <div class="doodle-canvas-wrap">
          <canvas id="doodleCanvas" width="600" height="320" class="skribbl-canvas"></canvas>
          <div class="doodle-tools">
            <button type="button" class="color-dot active" data-color="#2563EB" style="background:#2563EB"></button>
            <button type="button" class="color-dot" data-color="#10B981" style="background:#10B981"></button>
            <button type="button" class="color-dot" data-color="#F59E0B" style="background:#F59E0B"></button>
            <button type="button" class="color-dot" data-color="#EF4444" style="background:#EF4444"></button>
            <button type="button" class="color-dot" data-color="#F8FAFC" style="background:#F8FAFC"></button>
            <button type="button" class="btn btn-secondary btn-sm" id="btnDoodleClear">CLEAR</button>
          </div>
        </div>

        <div class="doodle-guess-tray">
          <div class="guess-feed" id="doodleGuessFeed">
            <div class="guess-msg system">60 seconds active. Draw so @${partner.username} can guess!</div>
          </div>
          <form class="doodle-guess-form" id="formDoodleGuess">
            <input type="text" id="inpDoodleGuess" class="form-input" placeholder="Type partner's guess here..." />
            <button type="submit" class="btn btn-primary">SUBMIT GUESS</button>
          </form>
        </div>
      </div>
    `;
  }

  initDoodleDuel(partner) {
    const prompts = ["Mechanical Keyboard", "Elden Ring", "Bouldering Wall", "Cyber Cat", "Espresso Machine", "Space Shuttle", "Vinyl Turntable"];
    const secretPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    const promptEl = this.container.querySelector("#doodleSecretPrompt");
    if (promptEl) promptEl.textContent = secretPrompt;

    let timeLeft = 60;
    const timerEl = this.container.querySelector("#doodleTimer");
    const feed = this.container.querySelector("#doodleGuessFeed");
    const canvas = this.container.querySelector("#doodleCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let drawColor = "#2563EB";
    let isDrawing = false;
    let lx = 0, ly = 0;

    this.container.querySelectorAll(".doodle-tools .color-dot").forEach(d => {
      d.addEventListener("click", (e) => {
        this.container.querySelectorAll(".doodle-tools .color-dot").forEach(x => x.classList.remove("active"));
        e.currentTarget.classList.add("active");
        drawColor = e.currentTarget.dataset.color;
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
      ctx.strokeStyle = drawColor;
      ctx.lineWidth = 4;
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

    this.container.querySelector("#btnDoodleClear")?.addEventListener("click", () => {
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    this.gameInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(this.gameInterval);
        if (timerEl) timerEl.textContent = "00s";
        this.addHistory(feed, `⏰ TIME IS UP! The secret prompt was "${secretPrompt}".`, "system");
      } else if (timerEl) {
        timerEl.textContent = `${timeLeft}s`;
      }
    }, 1000);

    // Simulated guesses from partner over time
    setTimeout(() => {
      this.addHistory(feed, `@${partner.username}: Is it a computer?`, "opp");
    }, 12000);

    setTimeout(() => {
      this.addHistory(feed, `@${partner.username}: Looks like a ${secretPrompt.split(' ')[0]}!`, "opp");
    }, 28000);

    this.container.querySelector("#formDoodleGuess")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const inp = this.container.querySelector("#inpDoodleGuess");
      const guess = inp.value.trim();
      if (!guess) return;
      inp.value = "";

      this.addHistory(feed, `You guessed: "${guess}"`, "user");
      if (guess.toLowerCase() === secretPrompt.toLowerCase()) {
        clearInterval(this.gameInterval);
        this.addHistory(feed, `🎉 CORRECT! You guessed "${secretPrompt}"! +100 PTS!`, "win");
      }
    });
  }

  // ==========================================
  // 4. MICRO REFLEX TAP RACE
  // ==========================================
  templateReflexRace(partner) {
    return `
      <div class="game-stage reflex-stage">
        <div class="reflex-score-hud">
          <div class="hud-stat">
            <span>BEST OF 3 SHOWDOWN</span>
          </div>
          <div class="reflex-scoreboard">
            <span class="score-chip you" id="reflexYouScore">YOU: 0</span>
            <span class="score-chip opp" id="reflexOppScore">@${partner.username}: 0</span>
          </div>
        </div>

        <div class="reflex-trigger-arena state-standby" id="reflexArenaBox">
          <div class="trigger-beacon" id="reflexBeacon"></div>
          <h2 class="trigger-heading" id="reflexHeading">WAIT FOR GREEN TRIGGER...</h2>
          <p class="trigger-sub" id="reflexSub">Premature tap will trigger a false start penalty.</p>
        </div>

        <button class="btn btn-primary btn-block btn-lg" id="btnReflexTap">
          STRIKE TRIGGER (SPACEBAR / TAP)
        </button>
      </div>
    `;
  }

  initReflexRace(partner) {
    let round = 1;
    let youScore = 0;
    let oppScore = 0;
    let isArmed = false;
    let startTime = 0;
    let timeoutId = null;

    const box = this.container.querySelector("#reflexArenaBox");
    const heading = this.container.querySelector("#reflexHeading");
    const sub = this.container.querySelector("#reflexSub");
    const btn = this.container.querySelector("#btnReflexTap");
    const youEl = this.container.querySelector("#reflexYouScore");
    const oppEl = this.container.querySelector("#reflexOppScore");

    const arm = () => {
      isArmed = false;
      box.className = "reflex-trigger-arena state-standby";
      heading.textContent = `ROUND ${round} // WAIT FOR GREEN...`;
      sub.textContent = "Stand by for randomized light switch (1.5s - 4.5s)";

      const delay = 1500 + Math.random() * 2500;
      timeoutId = setTimeout(() => {
        isArmed = true;
        box.className = "reflex-trigger-arena state-ready";
        heading.textContent = "STRIKE NOW!!";
        sub.textContent = "TAP AS FAST AS HUMANLY POSSIBLE!";
        startTime = performance.now();
      }, delay);
    };

    arm();

    const strike = () => {
      if (!isArmed) {
        clearTimeout(timeoutId);
        box.className = "reflex-trigger-arena state-fault";
        heading.textContent = "FALSE START!";
        sub.textContent = "Tapped during red standby. Round awarded to opponent.";
        oppScore++;
        oppEl.textContent = `@${partner.username}: ${oppScore}`;
        nextRound();
        return;
      }

      const youMs = Math.round(performance.now() - startTime);
      const oppMs = Math.round(195 + Math.random() * 110);

      if (youMs <= oppMs) {
        youScore++;
        youEl.textContent = `YOU: ${youScore}`;
        box.className = "reflex-trigger-arena state-win";
        heading.textContent = `ROUND WON: ${youMs}ms vs ${oppMs}ms!`;
      } else {
        oppScore++;
        oppEl.textContent = `@${partner.username}: ${oppScore}`;
        box.className = "reflex-trigger-arena state-loss";
        heading.textContent = `ROUND LOST: ${youMs}ms vs ${oppMs}ms!`;
      }
      nextRound();
    };

    const nextRound = () => {
      round++;
      if (youScore >= 2 || oppScore >= 2) {
        setTimeout(() => {
          const wonMatch = youScore > oppScore;
          box.className = wonMatch ? "reflex-trigger-arena state-win" : "reflex-trigger-arena state-loss";
          heading.textContent = wonMatch ? "🏆 MATCH WON! 2-1" : "MATCH LOST! 1-2";
          sub.textContent = `Match recorded in Pact Activity History.`;
        }, 1500);
      } else {
        setTimeout(arm, 1800);
      }
    };

    btn?.addEventListener("click", strike);
  }

  // ==========================================
  // 5. COLLABORATIVE SHARED CANVAS (CO-OP)
  // ==========================================
  templateSharedCanvas(partner) {
    return `
      <div class="game-stage shared-canvas-stage">
        <div class="shared-canvas-toolbar">
          <div class="brush-settings">
            <span class="tool-label">PEN:</span>
            <input type="range" id="sharedPenSize" min="2" max="24" value="4" class="slider-pen" />
            <div class="shared-colors">
              <button type="button" class="color-dot active" data-color="#2563EB" style="background:#2563EB"></button>
              <button type="button" class="color-dot" data-color="#10B981" style="background:#10B981"></button>
              <button type="button" class="color-dot" data-color="#F59E0B" style="background:#F59E0B"></button>
              <button type="button" class="color-dot" data-color="#F8FAFC" style="background:#F8FAFC"></button>
              <button type="button" class="color-dot" data-color="#EF4444" style="background:#EF4444"></button>
            </div>
          </div>

          <div class="canvas-meta-status">
            <span class="pulse-indicator"></span>
            <span>Live Co-Op Sync with @${partner.username}</span>
          </div>

          <div class="shared-actions">
            <button type="button" class="btn btn-secondary btn-sm" id="btnSharedClear">CLEAR</button>
            <button type="button" class="btn btn-primary btn-sm" id="btnExportAsSticker">
              EXPORT TO CHAT AS STICKER
            </button>
          </div>
        </div>

        <div class="shared-canvas-container">
          <canvas id="sharedDrawCanvas" width="720" height="380" class="collab-canvas"></canvas>
          <div class="partner-cursor" id="partnerCursor">
            <span class="cursor-dot"></span>
            <span class="cursor-tag">@${partner.username}</span>
          </div>
        </div>
      </div>
    `;
  }

  initSharedCanvas(partner) {
    const canvas = this.container.querySelector("#sharedDrawCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let penColor = "#2563EB";
    let penSize = 4;
    let isDrawing = false;
    let lx = 0, ly = 0;

    const slider = this.container.querySelector("#sharedPenSize");
    slider?.addEventListener("input", (e) => { penSize = e.target.value; });

    this.container.querySelectorAll(".shared-colors .color-dot").forEach(d => {
      d.addEventListener("click", (e) => {
        this.container.querySelectorAll(".shared-colors .color-dot").forEach(x => x.classList.remove("active"));
        e.currentTarget.classList.add("active");
        penColor = e.currentTarget.dataset.color;
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
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
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

    // Simulated partner co-drawing strokes and cursor movement
    const partnerCursor = this.container.querySelector("#partnerCursor");
    let angle = 0;
    const partnerDrawInterval = setInterval(() => {
      if (!partnerCursor) return;
      angle += 0.08;
      const px = 360 + Math.cos(angle) * 120 + Math.sin(angle * 2) * 40;
      const py = 190 + Math.sin(angle) * 80;

      partnerCursor.style.left = `${(px / 720) * 100}%`;
      partnerCursor.style.top = `${(py / 380) * 100}%`;

      // Draw subtle partner accent dots
      ctx.fillStyle = "#10B981";
      ctx.beginPath();
      ctx.arc(px, py, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }, 60);

    this.container.querySelector("#btnSharedClear")?.addEventListener("click", () => {
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    this.container.querySelector("#btnExportAsSticker")?.addEventListener("click", () => {
      const dataUrl = canvas.toDataURL("image/png");
      store.sendMessage(this.partnerId, {
        sender: "user",
        type: "sticker",
        content: dataUrl
      });
      alert("✨ Canvas exported to chat stream as custom sticker!");
    });
  }

  // ==========================================
  // 6. 20 QUESTIONS CO-OP
  // ==========================================
  templateTwentyQuestions(partner) {
    return `
      <div class="game-stage twenty-questions-stage">
        <div class="hud-20-questions">
          <div class="q-counter-badge">
            <span class="q-num" id="qQuestionsLeft">20 / 20</span>
            <span class="q-label">QUESTIONS REMAINING</span>
          </div>
          <div class="coop-hint">
            Team up with @${partner.username} to guess the secret concept! AI responds: <strong>YES</strong>, <strong>NO</strong>, <strong>WARM</strong>, or <strong>COLD</strong>.
          </div>
          <button class="btn btn-secondary btn-sm" id="btnSolveSecret">SOLVE MYSTERY</button>
        </div>

        <div class="questions-stream" id="twentyQuestionsStream">
          <div class="q-item system">⚡ AI Game Master locked in a mystery concept. Ask your first shared question!</div>
        </div>

        <form class="q-input-form" id="twentyQuestionsForm">
          <input type="text" id="inpTwentyQuestion" class="form-input" placeholder="e.g. Is it an electronic device? Can you hold it in one hand?..." required />
          <button type="submit" class="btn btn-primary">SUBMIT TO GAME MASTER</button>
        </form>
      </div>
    `;
  }

  initTwentyQuestions(partner) {
    const secrets = [
      { name: "The International Space Station", category: "Technology & Space" },
      { name: "A Mechanical Watch", category: "Horology & Craft" },
      { name: "The Aurora Borealis", category: "Natural Phenomenon" },
      { name: "Quantum Computer", category: "Cutting-edge Computing" }
    ];
    const secret = secrets[Math.floor(Math.random() * secrets.length)];
    let questionsLeft = 20;

    const stream = this.container.querySelector("#twentyQuestionsStream");
    const countEl = this.container.querySelector("#qQuestionsLeft");
    const form = this.container.querySelector("#twentyQuestionsForm");
    const inp = this.container.querySelector("#inpTwentyQuestion");
    const btnSolve = this.container.querySelector("#btnSolveSecret");

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = inp.value.trim();
      if (!q) return;
      inp.value = "";

      questionsLeft--;
      if (countEl) countEl.textContent = `${questionsLeft} / 20`;
      this.addHistory(stream, `You asked: "${q}"`, "user");

      setTimeout(() => {
        const answers = ["YES", "NO", "WARM", "COLD"];
        const res = answers[Math.floor(Math.random() * answers.length)];
        this.addHistory(stream, `AI GAME MASTER: [${res}]`, "master");

        // Partner simulated turn occasionally
        if (questionsLeft > 2 && Math.random() > 0.4) {
          setTimeout(() => {
            questionsLeft--;
            if (countEl) countEl.textContent = `${questionsLeft} / 20`;
            this.addHistory(stream, `@${partner.username} asked: "Is it primarily made of metal?"`, "opp");
            setTimeout(() => {
              this.addHistory(stream, `AI GAME MASTER: [YES]`, "master");
            }, 600);
          }, 1400);
        }
      }, 600);
    });

    btnSolve?.addEventListener("click", () => {
      const guess = prompt("Enter your team's solution:");
      if (!guess) return;

      if (guess.toLowerCase().includes(secret.name.toLowerCase().split(' ')[0])) {
        alert(`🎉 SOLVED! Mystery was: ${secret.name}! Outstanding team synergy.`);
        this.addHistory(stream, `🎉 TEAM VICTORY! Mystery was "${secret.name}"!`, "win");
      } else {
        alert(`❌ Not quite! The mystery was: ${secret.name}.`);
        this.addHistory(stream, `❌ Mystery revealed: "${secret.name}".`, "system");
      }
    });
  }

  // ==========================================
  // 7. "WHO'S THE IMPOSTER?" (AI EDITION)
  // ==========================================
  templateImposterAI(partner) {
    return `
      <div class="game-stage imposter-stage">
        <div class="imposter-prompt-header">
          <span class="hud-label">THE DILEMMA:</span>
          <h3 class="imposter-dilemma-title" id="imposterDilemmaText">Loading dilemma...</h3>
          <p class="imposter-instructions">One answer was generated by an AI bot. Identify the synthetic imposter!</p>
        </div>

        <div class="imposter-cards-row" id="imposterCardsRow">
          <!-- Cards injected via JS -->
        </div>

        <div class="imposter-discussion-feed" id="imposterDiscussionFeed">
          <div class="history-item system">Both players review the 3 answers. Cast your vote below!</div>
        </div>
      </div>
    `;
  }

  initImposterAI(partner) {
    const dilemmaObj = IMPOSTER_DILEMMAS[Math.floor(Math.random() * IMPOSTER_DILEMMAS.length)];
    const titleEl = this.container.querySelector("#imposterDilemmaText");
    if (titleEl) titleEl.textContent = `"${dilemmaObj.dilemma}"`;

    const answers = [
      { id: "A", text: dilemmaObj.humanAnswers[0], isAi: false, author: "You" },
      { id: "B", text: dilemmaObj.humanAnswers[1], isAi: false, author: `@${partner.username}` },
      { id: "C", text: dilemmaObj.aiAnswer, isAi: true, author: "Synthetic AI Imposter" }
    ].sort(() => Math.random() - 0.5);

    const cardsRow = this.container.querySelector("#imposterCardsRow");
    if (cardsRow) {
      cardsRow.innerHTML = answers.map((ans, idx) => `
        <div class="imposter-card" data-is-ai="${ans.isAi}" data-id="${ans.id}" data-author="${ans.author}">
          <div class="card-id-badge">RESPONSE 0${idx + 1}</div>
          <p class="answer-text">"${ans.text}"</p>
          <button class="btn btn-secondary btn-vote-imposter">VOTE AS IMPOSTER</button>
        </div>
      `).join('');
    }

    const feed = this.container.querySelector("#imposterDiscussionFeed");

    this.container.querySelectorAll(".btn-vote-imposter").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const card = e.currentTarget.closest(".imposter-card");
        const isAi = card.dataset.isAi === "true";
        const author = card.dataset.author;

        this.container.querySelectorAll(".imposter-card").forEach(c => {
          c.classList.add(c.dataset.isAi === "true" ? "card-ai-revealed" : "card-human-revealed");
        });

        if (isAi) {
          this.addHistory(feed, `🏆 SPOT ON! Response 0${card.dataset.id} was indeed the AI Imposter!`, "win");
          alert("🏆 Imposter Terminated! You spotted the synthetic reasoning pattern.");
        } else {
          this.addHistory(feed, `❌ False Accusation! That was written by ${author}. The AI bot remains unmasked!`, "opp");
          alert(`❌ False Accusation! Written by ${author}.`);
        }
      });
    });
  }

  // ==========================================
  // 8. SPIN THE BOTTLE / SPICY PROMPTS
  // ==========================================
  templateSpinBottle(partner) {
    return `
      <div class="game-stage bottle-stage">
        <div class="bottle-intensity-bar">
          <span class="hud-label">INTENSITY LEVEL:</span>
          <div class="intensity-selectors">
            <button type="button" class="btn-pill active" data-lvl="Chill">Chill</button>
            <button type="button" class="btn-pill" data-lvl="Tactical">Tactical</button>
            <button type="button" class="btn-pill" data-lvl="Deep">Deep</button>
            <button type="button" class="btn-pill" data-lvl="Spicy">Spicy</button>
          </div>
        </div>

        <div class="bottle-arena">
          <div class="bottle-player-marker top-marker">
            <span class="marker-dot"></span>
            <strong>@${partner.username}</strong>
          </div>

          <div class="bottle-wheel-container">
            <svg id="svgSpinBottle" viewBox="0 0 100 100" width="160" height="160" class="tactical-bottle-svg">
              <circle cx="50" cy="50" r="46" fill="#0F172A" stroke="#334155" stroke-width="2" stroke-dasharray="4 2"/>
              <g id="bottleBody" transform="rotate(0 50 50)">
                <rect x="46" y="10" width="8" height="24" rx="2" fill="#2563EB" stroke="#60A5FA" stroke-width="1.5"/>
                <circle cx="50" cy="20" r="2" fill="#F8FAFC"/>
                <polygon points="50,6 56,12 44,12" fill="#60A5FA"/>
                <rect x="42" y="32" width="16" height="42" rx="6" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
                <line x1="50" y1="36" x2="50" y2="70" stroke="#2563EB" stroke-width="2"/>
              </g>
            </svg>
          </div>

          <div class="bottle-player-marker bottom-marker">
            <span class="marker-dot you-dot"></span>
            <strong>You (@${store.user.username})</strong>
          </div>
        </div>

        <div class="bottle-result-card" id="bottleResultCard">
          <span class="target-player-badge" id="bottleTargetBadge">TAP SPIN TO INITIALIZE</span>
          <p class="generated-prompt-text" id="bottlePromptText">Bottle trajectory will pick the target and generate a customized prompt from shared tags.</p>
          <div class="bottle-actions-row">
            <button class="btn btn-primary" id="btnSpinBottle">SPIN BOTTLE</button>
            <button class="btn btn-secondary" id="btnSubmitBottleAnswer" style="display:none">SEND PROMPT TO CHAT</button>
          </div>
        </div>
      </div>
    `;
  }

  initSpinBottle(partner) {
    let currentLevel = "Chill";
    let isSpinning = false;
    let rotation = 0;

    const bottleBody = this.container.querySelector("#bottleBody");
    const btnSpin = this.container.querySelector("#btnSpinBottle");
    const targetBadge = this.container.querySelector("#bottleTargetBadge");
    const promptText = this.container.querySelector("#bottlePromptText");
    const btnSubmit = this.container.querySelector("#btnSubmitBottleAnswer");

    this.container.querySelectorAll(".intensity-selectors .btn-pill").forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.container.querySelectorAll(".intensity-selectors .btn-pill").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        currentLevel = e.currentTarget.dataset.lvl;
      });
    });

    btnSpin?.addEventListener("click", () => {
      if (isSpinning) return;
      isSpinning = true;
      btnSpin.disabled = true;

      // Random spins
      const extraSpins = 4 + Math.floor(Math.random() * 6);
      const pointsToPartner = Math.random() > 0.5;
      const targetDeg = pointsToPartner ? 0 : 180;
      rotation += extraSpins * 360 + targetDeg;

      bottleBody.style.transition = "transform 2.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
      bottleBody.style.transform = `rotate(${rotation}deg)`;

      setTimeout(() => {
        isSpinning = false;
        btnSpin.disabled = false;

        const chosenTarget = pointsToPartner ? `@${partner.username}` : `You (@${store.user.username})`;
        targetBadge.textContent = `TARGET: ${chosenTarget.toUpperCase()}`;

        const matchingPrompts = SPICY_PROMPTS.filter(p => p.level === currentLevel);
        const selectedPrompt = matchingPrompts[Math.floor(Math.random() * matchingPrompts.length)] || SPICY_PROMPTS[0];

        promptText.textContent = `"${selectedPrompt.text}"`;
        if (btnSubmit) {
          btnSubmit.style.display = "inline-flex";
          btnSubmit.onclick = () => {
            store.sendMessage(this.partnerId, {
              sender: "system",
              type: "text",
              content: `🎲 Spin the Bottle prompt for ${chosenTarget}: "${selectedPrompt.text}"`
            });
            alert("Prompt injected into chat!");
          };
        }
      }, 2900);
    });
  }

  // Helper log function
  addLog(logEl, text, className) {
    if (!logEl) return;
    const item = document.createElement("div");
    item.className = `log-entry ${className || ''}`;
    item.textContent = text;
    logEl.appendChild(item);
    logEl.scrollTop = logEl.scrollHeight;
  }

  addHistory(streamEl, text, type) {
    if (!streamEl) return;
    const item = document.createElement("div");
    item.className = `history-item ${type || ''}`;
    item.textContent = text;
    streamEl.appendChild(item);
    streamEl.scrollTop = streamEl.scrollHeight;
  }

  initGameLogic(partner) {
    switch (this.activeGameId) {
      case "persona_guess":
        this.initPersonaGuess(partner);
        break;
      case "number_duel":
        this.initNumberDuel(partner);
        break;
      case "doodle_duel":
        this.initDoodleDuel(partner);
        break;
      case "reflex_race":
        this.initReflexRace(partner);
        break;
      case "shared_canvas":
        this.initSharedCanvas(partner);
        break;
      case "twenty_questions":
        this.initTwentyQuestions(partner);
        break;
      case "imposter_ai":
        this.initImposterAI(partner);
        break;
      case "spin_bottle":
        this.initSpinBottle(partner);
        break;
    }
  }
}
