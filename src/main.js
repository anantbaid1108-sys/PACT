// src/main.js - Clean App Shell & Navigation Orchestrator

import { store } from "./store.js";
import { OnboardingWizard } from "./onboarding.js";
import { DiscoveryManager } from "./discovery.js";
import { ChatroomManager } from "./chat.js";
import { GameArenaManager } from "./games.js";
import { LegalManager } from "./legal.js";
import { ProfileDrawer } from "./drawer.js";

class PactApp {
  constructor() {
    this.rootEl = document.getElementById("app");
    this.discoveryManager = null;
    this.chatroomManager = null;
    this.gameArenaManager = null;
    this.legalManager = null;
    this.profileDrawer = null;
    this.onboardingWizard = null;
  }

  init() {
    this.renderAppShell();
    this.initComponents();
    this.attachGlobalEvents();

    if (store.isOnboardingOpen || !store.user.onboardingCompleted) {
      this.openOnboarding();
    } else {
      this.switchChannel(store.activeChannel);
    }
  }

  renderAppShell() {
    this.rootEl.innerHTML = `
      <div class="app-layout" id="appLayout">
        <!-- Modern Social Header -->
        <header class="app-global-header">
          <div class="header-left">
            <button class="mobile-menu-btn" id="btnToggleMobileSidebar" title="Toggle Menu">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>

            <div class="brand-cluster" id="btnBrandHome">
              <div class="brand-logo-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FF4D6D" stroke-width="2.5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div class="brand-text-block">
                <span class="brand-title">PACT</span>
                <span class="brand-tagline">Make Connection an Experience</span>
              </div>
            </div>
          </div>

          <div class="header-center">
            <div class="header-online-pill">
              <span class="pulse-indicator-emerald"></span>
              <span class="telemetry-label">98.4k members online</span>
            </div>
          </div>

          <div class="header-right">
            <button class="header-user-btn" id="btnOpenUserProfile">
              <img src="${store.user.photo}" alt="${store.user.name}" class="mini-avatar-img rounded-full" />
              <span>${store.user.name.split(' ')[0]}</span>
            </button>
            <button class="header-link-btn" id="btnHeaderTerms">Terms</button>
            <button class="header-link-btn" id="btnHeaderPrivacy">Privacy</button>
          </div>
        </header>

        <!-- Main Panes Container -->
        <div class="app-panes-container">
          <!-- LEFT PANE: NAVIGATION & MATCHES -->
          <aside class="left-pane" id="leftPane">
            <!-- User Mini Card -->
            <div class="user-mini-card">
              <div class="user-mini-avatar-wrap">
                <img src="${store.user.photo}" alt="${store.user.name}" class="user-mini-avatar rounded-full" />
                <span class="online-indicator-dot"></span>
              </div>
              <div class="user-mini-meta">
                <strong class="user-mini-name">${store.user.name}</strong>
                <span class="user-mini-handle">@${store.user.username}</span>
              </div>
              <button class="btn-icon-edit" id="btnEditProfile" title="Edit Profile">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </button>
            </div>

            <!-- CHANNELS NAVIGATION -->
            <div class="nav-section-label">CHANNELS</div>
            <nav class="channel-nav">
              <button class="channel-nav-btn ${store.activeChannel === 'deck' ? 'active' : ''}" data-channel="deck">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="4" y="4" width="16" height="16" rx="3"/>
                  <line x1="9" y1="2" x2="15" y2="2"/>
                </svg>
                <div class="nav-btn-text">
                  <span>Discover</span>
                  <small>Card deck & mutual match</small>
                </div>
              </button>

              <button class="channel-nav-btn ${store.activeChannel === 'arcade' ? 'active' : ''}" data-channel="arcade">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                <div class="nav-btn-text">
                  <span>Arcade</span>
                  <small>Instant mini-game pairing</small>
                </div>
              </button>

              <button class="channel-nav-btn ${store.activeChannel === 'feed' ? 'active' : ''}" data-channel="feed">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="14" width="7" height="7" rx="1.5"/>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                </svg>
                <div class="nav-btn-text">
                  <span>Vibe Feed</span>
                  <small>Doodles & community ratings</small>
                </div>
              </button>

              <button class="channel-nav-btn ${store.activeChannel === 'daily3' ? 'active' : ''}" data-channel="daily3">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <div class="nav-btn-text">
                  <span>Daily Picks</span>
                  <small>High compatibility matches</small>
                </div>
              </button>
            </nav>

            <!-- MATCHES & CHATS -->
            <div class="nav-section-label">
              <span>MATCHES & CHATS</span>
              <span class="count-tag" id="activePactsCount">${Object.keys(store.chats).length}</span>
            </div>
            <div class="pacts-list" id="pactsList">
              ${this.renderPactsListHTML()}
            </div>

            <!-- SIDEBAR FOOTER -->
            <div class="sidebar-footer">
              <div class="footer-links-row">
                <button type="button" class="footer-link-btn" id="btnFooterPrivacy">Privacy</button>
                <span class="sep">•</span>
                <button type="button" class="footer-link-btn" id="btnFooterTerms">Terms</button>
                <span class="sep">•</span>
                <button type="button" class="footer-link-btn" id="btnFooterReset">Reset Stack</button>
              </div>
            </div>
          </aside>

          <!-- CENTER PANE: PRIMARY VIEW -->
          <main class="center-pane" id="centerPane">
            <!-- Dynamic channel content renders here -->
          </main>

          <!-- RIGHT PANE: CONVERSATION DETAILS (ONLY SHOWN IN CHAT) -->
          <aside class="right-pane ${store.activeChannel === 'chat' && store.isProfileDrawerOpen ? 'drawer-open' : 'drawer-hidden'}" id="rightPane">
            <!-- Details render here when chat is active -->
          </aside>
        </div>

        <!-- MOBILE BOTTOM TAB BAR -->
        <nav class="mobile-bottom-nav">
          <button class="mobile-tab-btn ${store.activeChannel === 'deck' ? 'active' : ''}" data-channel="deck">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="4" y="4" width="16" height="16" rx="3"/>
            </svg>
            <span>Discover</span>
          </button>
          <button class="mobile-tab-btn ${store.activeChannel === 'arcade' ? 'active' : ''}" data-channel="arcade">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            <span>Arcade</span>
          </button>
          <button class="mobile-tab-btn ${store.activeChannel === 'feed' ? 'active' : ''}" data-channel="feed">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5"/>
              <rect x="14" y="3" width="7" height="7" rx="1.5"/>
            </svg>
            <span>Feed</span>
          </button>
          <button class="mobile-tab-btn ${store.activeChannel === 'chat' ? 'active' : ''}" data-channel="chat">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>Chat</span>
          </button>
        </nav>

        <!-- MODAL & ARENA INJECTION CONTAINER -->
        <div id="modalContainer"></div>
      </div>
    `;
  }

  renderPactsListHTML() {
    const chatKeys = Object.keys(store.chats);
    if (chatKeys.length === 0) {
      return `<div class="empty-pacts-notice">No matches yet. Like someone in Discover to connect!</div>`;
    }

    return chatKeys.map(partnerId => {
      const partner = store.profiles.find(p => p.id === partnerId) || { name: "Match", username: partnerId, photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" };
      const chat = store.chats[partnerId];
      const lastMsg = chat.messages[chat.messages.length - 1];
      const snippet = lastMsg ? (lastMsg.type === 'text' ? lastMsg.content : `[${lastMsg.type.toUpperCase()}]`) : "Matched!";
      const isSelected = store.activeChannel === "chat" && store.activeChatPartnerId === partnerId;

      return `
        <button class="pact-thread-btn ${isSelected ? 'selected' : ''}" data-partner-id="${partnerId}">
          <div class="thread-avatar-wrap">
            <img src="${partner.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}" alt="${partner.name}" class="thread-avatar rounded-full" />
            ${partner.online ? `<span class="thread-online-dot"></span>` : ''}
          </div>
          <div class="thread-info">
            <div class="thread-name-row">
              <strong class="thread-name">${partner.name}</strong>
              <span class="thread-time">${chat.lastActivity || ''}</span>
            </div>
            <div class="thread-snippet-row">
              <span class="thread-snippet">${snippet}</span>
              ${chat.unread > 0 ? `<span class="unread-pill">${chat.unread}</span>` : ''}
            </div>
          </div>
        </button>
      `;
    }).join('');
  }

  initComponents() {
    const centerPane = document.getElementById("centerPane");
    const rightPane = document.getElementById("rightPane");
    const modalContainer = document.getElementById("modalContainer");

    this.gameArenaManager = new GameArenaManager(document.createElement("div"));
    this.discoveryManager = new DiscoveryManager(centerPane);
    this.chatroomManager = new ChatroomManager(centerPane, this.gameArenaManager);
    this.legalManager = new LegalManager(centerPane);
    this.profileDrawer = new ProfileDrawer(rightPane, this.gameArenaManager);
    this.onboardingWizard = new OnboardingWizard(modalContainer);

    this.profileDrawer.render(store.activeChatPartnerId);
  }

  attachGlobalEvents() {
    this.rootEl.querySelectorAll(".channel-nav-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const channel = e.currentTarget.dataset.channel;
        store.setActiveChannel(channel);
      });
    });

    this.rootEl.querySelectorAll(".mobile-tab-btn[data-channel]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const channel = e.currentTarget.dataset.channel;
        store.setActiveChannel(channel);
      });
    });

    document.getElementById("btnToggleMobileSidebar")?.addEventListener("click", () => {
      document.getElementById("leftPane")?.classList.toggle("mobile-open");
    });

    document.getElementById("btnBrandHome")?.addEventListener("click", () => {
      store.setActiveChannel("deck");
    });

    document.getElementById("btnHeaderPrivacy")?.addEventListener("click", () => {
      store.setActiveChannel("privacy");
    });
    document.getElementById("btnHeaderTerms")?.addEventListener("click", () => {
      store.setActiveChannel("terms");
    });

    document.getElementById("btnFooterPrivacy")?.addEventListener("click", () => {
      store.setActiveChannel("privacy");
    });
    document.getElementById("btnFooterTerms")?.addEventListener("click", () => {
      store.setActiveChannel("terms");
    });
    document.getElementById("btnFooterReset")?.addEventListener("click", () => {
      store.swipedProfiles = { passed: [], matched: ["user-elena"] };
      store.saveSwipes();
      store.setActiveChannel("deck");
    });

    document.getElementById("btnEditProfile")?.addEventListener("click", () => {
      this.openOnboarding();
    });
    document.getElementById("btnOpenUserProfile")?.addEventListener("click", () => {
      this.openOnboarding();
    });

    this.bindPactListClicks();

    store.subscribe("channel:changed", ({ channel, meta }) => {
      this.switchChannel(channel, meta);
    });

    store.subscribe("chats:updated", () => {
      this.updatePactsList();
    });

    store.subscribe("drawer:toggled", (isOpen) => {
      const rightPane = document.getElementById("rightPane");
      if (rightPane) {
        if (store.activeChannel === "chat" && isOpen) {
          rightPane.classList.remove("drawer-hidden");
          rightPane.classList.add("drawer-open");
        } else {
          rightPane.classList.remove("drawer-open");
          rightPane.classList.add("drawer-hidden");
        }
      }
    });

    store.subscribe("user:updated", () => {
      this.refreshUserMiniCard();
    });

    store.subscribe("onboarding:completed", () => {
      this.refreshUserMiniCard();
      store.setActiveChannel("deck");
    });
  }

  bindPactListClicks() {
    this.rootEl.querySelectorAll(".pact-thread-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const partnerId = e.currentTarget.dataset.partnerId;
        store.setActiveChannel("chat", { partnerId });
        document.getElementById("leftPane")?.classList.remove("mobile-open");
      });
    });
  }

  updatePactsList() {
    const listEl = document.getElementById("pactsList");
    const countEl = document.getElementById("activePactsCount");
    if (listEl) {
      listEl.innerHTML = this.renderPactsListHTML();
      this.bindPactListClicks();
    }
    if (countEl) {
      countEl.textContent = Object.keys(store.chats).length;
    }
  }

  refreshUserMiniCard() {
    const miniName = this.rootEl.querySelector(".user-mini-name");
    const miniHandle = this.rootEl.querySelector(".user-mini-handle");
    const miniAvatar = this.rootEl.querySelector(".user-mini-avatar");
    const headerAvatar = this.rootEl.querySelector(".header-user-btn img");
    const headerName = this.rootEl.querySelector(".header-user-btn span");

    if (miniName) miniName.textContent = store.user.name;
    if (miniHandle) miniHandle.textContent = `@${store.user.username}`;
    if (miniAvatar) miniAvatar.src = store.user.photo;
    if (headerAvatar) headerAvatar.src = store.user.photo;
    if (headerName) headerName.textContent = store.user.name.split(' ')[0];
  }

  openOnboarding() {
    const modalContainer = document.getElementById("modalContainer");
    this.onboardingWizard = new OnboardingWizard(modalContainer);
    this.onboardingWizard.init();
  }

  switchChannel(channel, meta = {}) {
    this.rootEl.querySelectorAll(".channel-nav-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.channel === channel);
    });
    this.rootEl.querySelectorAll(".mobile-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.channel === channel);
    });

    const rightPane = document.getElementById("rightPane");
    if (channel !== "chat") {
      // Hide right drawer completely on Deck, Arcade, Feed, Daily 3
      if (rightPane) {
        rightPane.classList.add("drawer-hidden");
        rightPane.classList.remove("drawer-open");
      }
    } else {
      if (meta.partnerId) {
        this.profileDrawer.render(meta.partnerId);
      }
    }

    document.getElementById("leftPane")?.classList.remove("mobile-open");

    if (channel === "privacy" || channel === "terms") {
      this.legalManager.render(channel);
    } else if (channel === "chat") {
      this.chatroomManager.setPartner(meta.partnerId || store.activeChatPartnerId);
      if (meta.autoLaunchGame) {
        setTimeout(() => {
          const slot = document.getElementById("inChatArenaSlot");
          if (slot) {
            this.gameArenaManager.container = slot;
            this.gameArenaManager.launchGame(meta.autoLaunchGame, meta.partnerId || store.activeChatPartnerId);
          }
        }, 150);
      }
    } else {
      this.discoveryManager.render(channel);
    }

    this.updatePactsList();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new PactApp();
  app.init();
  window.__PACT_APP__ = app;
});
