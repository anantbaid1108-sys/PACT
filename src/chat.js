// src/chat.js - Modern Social Chatroom & Mini-Game Controls

import { store } from "./store.js";
import { MEME_VAULT } from "./data.js";

export class ChatroomManager {
  constructor(containerEl, gameArenaManager) {
    this.container = containerEl;
    this.gameArena = gameArenaManager;
    this.partnerId = store.activeChatPartnerId || "user-elena";
    this.isMemeVaultOpen = false;
    this.isEmojiPickerOpen = false;
    this.isRecordingVoice = false;
    this.voiceRecordStartTime = 0;
    this.voiceAnimFrame = null;
    this.voiceSeconds = 0;
  }

  setPartner(partnerId) {
    this.partnerId = partnerId;
    this.render();
  }

  render() {
    const partner = store.profiles.find(p => p.id === this.partnerId) || store.profiles[0];
    const chatData = store.chats[this.partnerId] || { messages: [] };

    this.container.innerHTML = `
      <div class="chatroom-view animate-fade">
        <!-- TOP HEADER -->
        <div class="chat-top-header">
          <div class="chat-partner-info" id="btnToggleProfileHeader">
            <div class="avatar-wrap-header">
              <img src="${partner.photo}" alt="${partner.name}" class="chat-avatar rounded-full" />
              ${partner.online ? `<span class="online-pulse-dot" title="Online now"></span>` : ''}
            </div>
            <div class="partner-meta">
              <div class="name-row">
                <span class="partner-name">${partner.name}</span>
                <span class="partner-badge">CONNECTED</span>
              </div>
              <span class="partner-status">@${partner.username} • ${partner.statusText || 'Active now'}</span>
            </div>
          </div>

          <div class="chat-top-actions">
            <!-- Launch Experience Dropdown -->
            <div class="experience-dropdown-wrap" id="experienceDropdownWrap">
              <button class="btn btn-primary btn-sm btn-launch-exp" id="btnLaunchExp">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                PLAY MINI-GAME
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div class="experience-menu shadow-2xl rounded-xl" id="experienceMenu">
                <div class="menu-section-header comp-header">
                  <span>⚡ COMPETITIVE (PVP)</span>
                </div>
                <button class="exp-item" data-game="persona_guess">
                  <span class="exp-icon">⏱</span>
                  <div class="exp-text">
                    <strong>Speed Persona Guess</strong>
                    <small>Akinator-style 60s interrogation trivia</small>
                  </div>
                </button>
                <button class="exp-item" data-game="number_duel">
                  <span class="exp-icon">🎯</span>
                  <div class="exp-text">
                    <strong>Number Duel (1 to 100)</strong>
                    <small>Turn-based higher/lower deduction game</small>
                  </div>
                </button>
                <button class="exp-item" data-game="doodle_duel">
                  <span class="exp-icon">✏</span>
                  <div class="exp-text">
                    <strong>Doodle Duel</strong>
                    <small>Draw prompts & guess in real-time</small>
                  </div>
                </button>
                <button class="exp-item" data-game="reflex_race">
                  <span class="exp-icon">⚡</span>
                  <div class="exp-text">
                    <strong>Micro Reflex Tap Race</strong>
                    <small>Reaction test showdown in milliseconds</small>
                  </div>
                </button>

                <div class="menu-section-header coop-header">
                  <span>🤝 COOPERATIVE (SHARED PLAY)</span>
                </div>
                <button class="exp-item" data-game="shared_canvas">
                  <span class="exp-icon">🎨</span>
                  <div class="exp-text">
                    <strong>Collaborative Canvas</strong>
                    <small>Co-sketch together & export as sticker</small>
                  </div>
                </button>
                <button class="exp-item" data-game="twenty_questions">
                  <span class="exp-icon">❓</span>
                  <div class="exp-text">
                    <strong>20 Questions Co-Op</strong>
                    <small>Team up to guess the secret concept</small>
                  </div>
                </button>
                <button class="exp-item" data-game="imposter_ai">
                  <span class="exp-icon">🕵</span>
                  <div class="exp-text">
                    <strong>Who's the Imposter?</strong>
                    <small>Read answers and find the synthetic bot</small>
                  </div>
                </button>
                <button class="exp-item" data-game="spin_bottle">
                  <span class="exp-icon">🍾</span>
                  <div class="exp-text">
                    <strong>Spin the Bottle</strong>
                    <small>Dynamic prompt generator based on traits</small>
                  </div>
                </button>
              </div>
            </div>

            <!-- Audio Call Button -->
            <button class="header-action-btn" id="btnAudioCall" title="Start Voice Call">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </button>

            <!-- Video Call Placeholder Button -->
            <button class="header-action-btn" id="btnVideoCall" title="Start Video Call">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
            </button>

            <!-- Profile Details Toggle -->
            <button class="header-action-btn" id="btnToggleProfileDrawer" title="View Profile Details">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- IN-CHAT GAME ARENA INJECTION SLOT -->
        <div class="in-chat-arena-slot" id="inChatArenaSlot"></div>

        <!-- CHAT MESSAGE STREAM -->
        <div class="chat-message-stream" id="chatMessageStream">
          ${chatData.messages.map(msg => this.renderMessage(msg, partner)).join('')}
        </div>

        <!-- BOTTOM CONTROL BAR (STRICT ORDER)
             1. Meme Vault Button
             2. Emoji Picker
             3. Message Textarea
             4. Voice Note Button
             5. Custom Sticker Creator
        -->
        <div class="chat-bottom-control-bar">
          <!-- 1. Meme Vault Button -->
          <div class="control-item">
            <button type="button" class="ctrl-icon-btn ${this.isMemeVaultOpen ? 'active' : ''}" id="btnMemeVault" title="Open Meme Vault">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </button>
          </div>

          <!-- 2. Emoji Picker Button -->
          <div class="control-item">
            <button type="button" class="ctrl-icon-btn ${this.isEmojiPickerOpen ? 'active' : ''}" id="btnEmojiPicker" title="Open Emoji Palette">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </button>
          </div>

          <!-- 3. Message Textarea (Auto-resizing) -->
          <div class="control-item flex-grow">
            <div class="textarea-container">
              <textarea id="chatInputText" class="chat-textarea" placeholder="Type a message (Enter to send, Shift+Enter for new line)..." rows="1"></textarea>
              <button type="button" class="btn-send-message" id="btnSendText" title="Send message">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- 4. Voice Note Button -->
          <div class="control-item">
            <button type="button" class="ctrl-icon-btn ${this.isRecordingVoice ? 'recording-active' : ''}" id="btnVoiceNote" title="Record Voice Note">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </button>
          </div>

          <!-- 5. Custom Sticker Creator -->
          <div class="control-item">
            <button type="button" class="ctrl-icon-btn" id="btnCustomSticker" title="Draw 5-Second Custom Sticker">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- MEME VAULT SLIDE-UP SHEET -->
        <div class="meme-vault-sheet rounded-xl shadow-2xl" id="memeVaultSheet" style="display: none;">
          <div class="vault-header">
            <h4>Meme Vault</h4>
            <button class="btn-icon-close" id="btnCloseMemeVault">✕</button>
          </div>

          <div class="meme-cards-grid" id="memeVaultGrid">
            ${MEME_VAULT.map(m => `
              <div class="meme-vault-card rounded-lg" data-meme-id="${m.id}">
                <div class="meme-card-preview">${m.svgIcon}</div>
                <div class="meme-card-info">
                  <span class="meme-tag">${m.category}</span>
                  <strong>${m.title}</strong>
                  <p>${m.caption}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- EMOJI PICKER PANEL -->
        <div class="emoji-picker-panel rounded-xl shadow-2xl" id="emojiPickerPanel" style="display: none;">
          <div class="emoji-grid">
            ${[
              "✨", "🎯", "🔥", "❤️", "🎮", "🕹", "🎧", "☕", "🍕", "😎",
              "🚀", "🤝", "💡", "👋", "🥳", "🧩", "👾", "🏆", "👀", "🙌"
            ].map(em => `<button type="button" class="emoji-btn" data-emoji="${em}">${em}</button>`).join('')}
          </div>
        </div>

        <!-- VOICE NOTE RECORDING OVERLAY -->
        <div class="voice-recorder-tray rounded-xl" id="voiceRecorderTray" style="display: none;">
          <div class="recording-indicator">
            <span class="pulse-indicator-red"></span>
            <span class="rec-label">Recording Voice Message...</span>
            <span class="rec-timer" id="recTimerDigits">00:00</span>
          </div>
          <canvas id="voiceWaveCanvas" width="260" height="34" class="voice-wave-canvas rounded-lg"></canvas>
          <div class="rec-actions">
            <button type="button" class="btn btn-secondary btn-sm" id="btnCancelVoice">Cancel</button>
            <button type="button" class="btn btn-primary btn-sm" id="btnSendVoice">Send</button>
          </div>
        </div>
      </div>
    `;

    this.attachChatEvents(partner);
    this.scrollToBottom();
  }

  renderMessage(msg, partner) {
    const isUser = msg.sender === "user";
    const isSystem = msg.sender === "system";

    if (isSystem) {
      return `
        <div class="message-row system-row">
          <div class="system-message-bubble rounded-full">
            ${msg.content}
          </div>
        </div>
      `;
    }

    if (msg.type === "game_invite") {
      return `
        <div class="message-row ${isUser ? 'user-row' : 'partner-row'}">
          <div class="message-bubble game-invite-bubble rounded-2xl">
            <div class="invite-header">
              <span class="invite-icon">⚡</span>
              <strong>ACTIVITY CHALLENGE</strong>
            </div>
            <p>${msg.content}</p>
            <button class="btn btn-primary btn-sm btn-accept-invite" data-game="${msg.gameId || 'number_duel'}">
              Join Mini-Game
            </button>
            <span class="msg-time">${msg.time}</span>
          </div>
        </div>
      `;
    }

    if (msg.type === "meme") {
      const memeObj = MEME_VAULT.find(m => m.id === msg.memeId) || MEME_VAULT[0];
      return `
        <div class="message-row ${isUser ? 'user-row' : 'partner-row'}">
          <div class="message-bubble meme-bubble rounded-2xl">
            <div class="meme-rendered-svg">${memeObj.svgIcon}</div>
            <strong class="meme-title">${memeObj.title}</strong>
            <p class="meme-caption">"${memeObj.caption}"</p>
            <span class="msg-time">${msg.time}</span>
          </div>
        </div>
      `;
    }

    if (msg.type === "voice") {
      return `
        <div class="message-row ${isUser ? 'user-row' : 'partner-row'}">
          <div class="message-bubble voice-bubble rounded-2xl">
            <button type="button" class="btn-play-voice">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </button>
            <div class="voice-waveform-preview">
              <div class="wave-bar" style="height:40%"></div>
              <div class="wave-bar" style="height:80%"></div>
              <div class="wave-bar" style="height:60%"></div>
              <div class="wave-bar" style="height:100%"></div>
              <div class="wave-bar" style="height:70%"></div>
              <div class="wave-bar" style="height:35%"></div>
              <div class="wave-bar" style="height:90%"></div>
            </div>
            <span class="voice-duration">${msg.duration || '0:06'}</span>
            <span class="msg-time">${msg.time}</span>
          </div>
        </div>
      `;
    }

    if (msg.type === "sticker") {
      return `
        <div class="message-row ${isUser ? 'user-row' : 'partner-row'}">
          <div class="message-bubble sticker-bubble">
            <img src="${msg.content}" alt="Custom Sticker" class="sticker-img rounded-xl shadow-md" />
            <span class="msg-time">${msg.time}</span>
          </div>
        </div>
      `;
    }

    return `
      <div class="message-row ${isUser ? 'user-row' : 'partner-row'}">
        <div class="message-bubble text-bubble rounded-2xl">
          <p class="msg-text">${this.escapeHTML(msg.content)}</p>
          <span class="msg-time">${msg.time}</span>
        </div>
      </div>
    `;
  }

  escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  scrollToBottom() {
    const stream = this.container.querySelector("#chatMessageStream");
    if (stream) stream.scrollTop = stream.scrollHeight;
  }

  attachChatEvents(partner) {
    const btnLaunch = this.container.querySelector("#btnLaunchExp");
    const menu = this.container.querySelector("#experienceMenu");
    if (btnLaunch && menu) {
      btnLaunch.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("open");
      });

      document.addEventListener("click", () => menu.classList.remove("open"));

      menu.querySelectorAll(".exp-item").forEach(item => {
        item.addEventListener("click", (e) => {
          const gameId = e.currentTarget.dataset.game;
          menu.classList.remove("open");
          const slot = this.container.querySelector("#inChatArenaSlot");
          this.gameArena.container = slot;
          this.gameArena.launchGame(gameId, this.partnerId);
        });
      });
    }

    this.container.querySelectorAll(".btn-accept-invite").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const gameId = e.currentTarget.dataset.game;
        const slot = this.container.querySelector("#inChatArenaSlot");
        this.gameArena.container = slot;
        this.gameArena.launchGame(gameId, this.partnerId);
      });
    });

    this.container.querySelector("#btnToggleProfileDrawer")?.addEventListener("click", () => {
      store.toggleProfileDrawer();
    });
    this.container.querySelector("#btnToggleProfileHeader")?.addEventListener("click", () => {
      store.toggleProfileDrawer();
    });

    this.container.querySelector("#btnAudioCall")?.addEventListener("click", () => {
      this.openAudioCallModal(partner);
    });
    this.container.querySelector("#btnVideoCall")?.addEventListener("click", () => {
      this.openVideoCallModal(partner);
    });

    const textarea = this.container.querySelector("#chatInputText");
    const btnSend = this.container.querySelector("#btnSendText");

    const sendMessage = () => {
      const text = textarea.value.trim();
      if (!text) return;
      store.sendMessage(this.partnerId, {
        sender: "user",
        type: "text",
        content: text
      });
      textarea.value = "";
      textarea.style.height = "auto";
      this.render();
    };

    if (textarea) {
      textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
      });

      textarea.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    }

    if (btnSend) btnSend.addEventListener("click", sendMessage);

    const btnMeme = this.container.querySelector("#btnMemeVault");
    const memSheet = this.container.querySelector("#memeVaultSheet");
    if (btnMeme && memSheet) {
      btnMeme.addEventListener("click", () => {
        this.isMemeVaultOpen = !this.isMemeVaultOpen;
        memSheet.style.display = this.isMemeVaultOpen ? "flex" : "none";
        btnMeme.classList.toggle("active", this.isMemeVaultOpen);
      });

      this.container.querySelector("#btnCloseMemeVault")?.addEventListener("click", () => {
        this.isMemeVaultOpen = false;
        memSheet.style.display = "none";
        btnMeme.classList.remove("active");
      });

      memSheet.querySelectorAll(".meme-vault-card").forEach(c => {
        c.addEventListener("click", (e) => {
          const memeId = e.currentTarget.dataset.memeId;
          store.sendMessage(this.partnerId, {
            sender: "user",
            type: "meme",
            memeId
          });
          this.isMemeVaultOpen = false;
          memSheet.style.display = "none";
          this.render();
        });
      });
    }

    const btnEmoji = this.container.querySelector("#btnEmojiPicker");
    const emojiPanel = this.container.querySelector("#emojiPickerPanel");
    if (btnEmoji && emojiPanel) {
      btnEmoji.addEventListener("click", () => {
        this.isEmojiPickerOpen = !this.isEmojiPickerOpen;
        emojiPanel.style.display = this.isEmojiPickerOpen ? "block" : "none";
        btnEmoji.classList.toggle("active", this.isEmojiPickerOpen);
      });

      emojiPanel.querySelectorAll(".emoji-btn").forEach(b => {
        b.addEventListener("click", (e) => {
          const emoji = e.currentTarget.dataset.emoji;
          textarea.value += emoji;
          textarea.focus();
        });
      });
    }

    const btnVoice = this.container.querySelector("#btnVoiceNote");
    const voiceTray = this.container.querySelector("#voiceRecorderTray");
    if (btnVoice && voiceTray) {
      btnVoice.addEventListener("click", () => {
        this.isRecordingVoice = !this.isRecordingVoice;
        if (this.isRecordingVoice) {
          voiceTray.style.display = "flex";
          btnVoice.classList.add("recording-active");
          this.startVoiceRecording();
        } else {
          this.stopVoiceRecording(true);
        }
      });

      this.container.querySelector("#btnCancelVoice")?.addEventListener("click", () => {
        this.stopVoiceRecording(false);
      });

      this.container.querySelector("#btnSendVoice")?.addEventListener("click", () => {
        this.stopVoiceRecording(true);
      });
    }

    this.container.querySelector("#btnCustomSticker")?.addEventListener("click", () => {
      this.openStickerCreatorModal();
    });
  }

  startVoiceRecording() {
    this.voiceSeconds = 0;
    this.voiceRecordStartTime = Date.now();
    const timerDigits = this.container.querySelector("#recTimerDigits");
    const canvas = this.container.querySelector("#voiceWaveCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    this.voiceInterval = setInterval(() => {
      this.voiceSeconds++;
      const m = Math.floor(this.voiceSeconds / 60).toString().padStart(2, '0');
      const s = (this.voiceSeconds % 60).toString().padStart(2, '0');
      if (timerDigits) timerDigits.textContent = `${m}:${s}`;
    }, 1000);

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#10B981";
      const bars = 26;
      const barWidth = canvas.width / bars - 2;

      for (let i = 0; i < bars; i++) {
        const h = Math.random() * canvas.height * 0.9;
        const x = i * (barWidth + 2);
        const y = (canvas.height - h) / 2;
        ctx.fillRect(x, y, barWidth, h);
      }
      this.voiceAnimFrame = requestAnimationFrame(drawWave);
    };
    drawWave();
  }

  stopVoiceRecording(send = false) {
    this.isRecordingVoice = false;
    clearInterval(this.voiceInterval);
    if (this.voiceAnimFrame) {
      cancelAnimationFrame(this.voiceAnimFrame);
      this.voiceAnimFrame = null;
    }
    const voiceTray = this.container.querySelector("#voiceRecorderTray");
    const btnVoice = this.container.querySelector("#btnVoiceNote");
    if (voiceTray) voiceTray.style.display = "none";
    if (btnVoice) btnVoice.classList.remove("recording-active");

    if (send && this.voiceSeconds > 0) {
      const dur = `0:${this.voiceSeconds.toString().padStart(2, '0')}`;
      store.sendMessage(this.partnerId, {
        sender: "user",
        type: "voice",
        duration: dur
      });
      this.render();
    }
  }

  openStickerCreatorModal() {
    const modalEl = document.createElement("div");
    modalEl.className = "modal-overlay animate-fade";
    modalEl.innerHTML = `
      <div class="modal-card rounded-2xl">
        <div class="modal-card-header">
          <h3>Draw a 5-Second Sticker</h3>
          <button class="btn-icon-close" id="btnCloseStickerModal">✕</button>
        </div>

        <div class="sticker-draw-area">
          <canvas id="stickerDrawCanvas" width="300" height="300" class="draw-canvas rounded-2xl"></canvas>
          <div class="canvas-palette">
            <button type="button" class="color-dot active" data-color="#2563EB" style="background:#2563EB"></button>
            <button type="button" class="color-dot" data-color="#10B981" style="background:#10B981"></button>
            <button type="button" class="color-dot" data-color="#F59E0B" style="background:#F59E0B"></button>
            <button type="button" class="color-dot" data-color="#EF4444" style="background:#EF4444"></button>
            <button type="button" class="color-dot" data-color="#F8FAFC" style="background:#F8FAFC"></button>
            <button type="button" class="btn btn-secondary btn-sm" id="btnClearSticker">Clear</button>
          </div>
        </div>

        <div class="modal-card-footer">
          <button class="btn btn-secondary" id="btnCancelSticker">Cancel</button>
          <button class="btn btn-primary" id="btnInjectSticker">Send Sticker</button>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    const canvas = modalEl.querySelector("#stickerDrawCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let drawColor = "#2563EB";
    let isDrawing = false;
    let lx = 0, ly = 0;

    modalEl.querySelectorAll(".canvas-palette .color-dot").forEach(d => {
      d.addEventListener("click", (e) => {
        modalEl.querySelectorAll(".canvas-palette .color-dot").forEach(x => x.classList.remove("active"));
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
      ctx.lineWidth = 5;
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

    modalEl.querySelector("#btnClearSticker")?.addEventListener("click", () => {
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    const close = () => modalEl.remove();
    modalEl.querySelector("#btnCloseStickerModal")?.addEventListener("click", close);
    modalEl.querySelector("#btnCancelSticker")?.addEventListener("click", close);

    modalEl.querySelector("#btnInjectSticker")?.addEventListener("click", () => {
      const dataUrl = canvas.toDataURL("image/png");
      store.sendMessage(this.partnerId, {
        sender: "user",
        type: "sticker",
        content: dataUrl
      });
      close();
      this.render();
    });
  }

  openAudioCallModal(partner) {
    const modalEl = document.createElement("div");
    modalEl.className = "modal-overlay animate-fade";
    modalEl.innerHTML = `
      <div class="call-card rounded-2xl shadow-2xl">
        <div class="call-avatar-wrap">
          <img src="${partner.photo}" alt="${partner.name}" class="call-avatar rounded-full" />
          <div class="call-wave-ring"></div>
        </div>

        <h3 class="call-name">${partner.name}</h3>
        <span class="call-status-pill" id="callDuration">Connected • 00:14</span>

        <div class="call-audio-waves">
          ${[1,2,3,4,5,6,7,8,9,10,11,12].map(() => `<div class="vis-bar"></div>`).join('')}
        </div>

        <div class="call-actions-row">
          <button class="call-btn btn-mute" title="Mute">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="1" y1="1" x2="23" y2="23"/>
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>
          <button class="call-btn btn-hangup" id="btnEndAudioCall" title="End Call">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.996.996 0 0 1 0-1.41C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.39.39.39 1.02 0 1.41l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    let sec = 14;
    const timer = setInterval(() => {
      sec++;
      const m = Math.floor(sec / 60).toString().padStart(2, '0');
      const s = (sec % 60).toString().padStart(2, '0');
      const el = modalEl.querySelector("#callDuration");
      if (el) el.textContent = `Connected • ${m}:${s}`;
    }, 1000);

    modalEl.querySelector("#btnEndAudioCall")?.addEventListener("click", () => {
      clearInterval(timer);
      modalEl.remove();
    });
  }

  openVideoCallModal(partner) {
    const modalEl = document.createElement("div");
    modalEl.className = "modal-overlay animate-fade";
    modalEl.innerHTML = `
      <div class="video-call-card rounded-2xl overflow-hidden shadow-2xl">
        <div class="video-display-area">
          <img src="${partner.photo}" alt="${partner.name}" class="video-main-stream" />
          <div class="video-top-tag">
            <span>HD • Connected with ${partner.name}</span>
          </div>
          <div class="video-self-pip rounded-xl overflow-hidden shadow-lg">
            <img src="${store.user.photo}" alt="You" />
          </div>
        </div>

        <div class="video-bottom-controls">
          <button class="btn btn-danger btn-sm" id="btnEndVideoCall">End Video Call</button>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);
    modalEl.querySelector("#btnEndVideoCall")?.addEventListener("click", () => modalEl.remove());
  }
}
