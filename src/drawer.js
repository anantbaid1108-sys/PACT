// src/drawer.js - Profile Details Inspector (Shown only when chat is open)

import { store } from "./store.js";

export class ProfileDrawer {
  constructor(containerEl, gameArenaManager) {
    this.container = containerEl;
    this.gameArena = gameArenaManager;
  }

  render(partnerId) {
    const partner = store.profiles.find(p => p.id === (partnerId || store.activeChatPartnerId)) || store.profiles[0];
    const mutualTags = partner.tags.filter(t => store.user.tags?.includes(t));

    this.container.innerHTML = `
      <div class="drawer-inner-content">
        <div class="drawer-top-bar">
          <div class="drawer-title-row">
            <span class="drawer-title">Profile Details</span>
          </div>
          <button class="btn-icon-close" id="btnCloseDrawer">✕</button>
        </div>

        <div class="drawer-scroll-body">
          <!-- Profile Card Header -->
          <div class="drawer-profile-card rounded-2xl overflow-hidden shadow-md">
            <img src="${partner.photo}" alt="${partner.name}" class="drawer-cover-img" />
            <div class="drawer-profile-info">
              <div class="drawer-name-row">
                <h3>${partner.name}, ${partner.age}</h3>
                ${partner.online ? `<span class="online-indicator-pill">● Online</span>` : ''}
              </div>
              <span class="drawer-loc">📍 ${partner.location} • ${partner.distance}</span>
              <span class="drawer-intent-pill">🎯 ${partner.intent}</span>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div class="drawer-quick-actions">
            <button class="btn btn-primary btn-sm btn-drawer-challenge" data-partner="${partner.id}">
              ⚡ Challenge to Game
            </button>
            <button class="btn btn-secondary btn-sm" id="btnDrawerAudio">
              📞 Voice Call
            </button>
          </div>

          <!-- Bio -->
          <div class="drawer-section">
            <span class="section-label">ABOUT ${partner.name.split(' ')[0].toUpperCase()}</span>
            <p class="drawer-bio-p">${partner.bio}</p>
          </div>

          <!-- 3-Word Alignment -->
          <div class="drawer-section">
            <span class="section-label">3-WORD ALIGNMENT</span>
            <div class="alignment-box rounded-xl">
              <div class="align-group">
                <span class="align-title">Their 3 Words:</span>
                <div class="chips-row">
                  ${partner.selfWords.map(w => `<span class="word-chip bg-slate-800 text-slate-200 px-3 py-1 rounded-full text-xs font-medium">${w}</span>`).join('')}
                </div>
              </div>
              <div class="align-group">
                <span class="align-title">Looking For:</span>
                <div class="chips-row">
                  ${partner.seekWords.map(w => `<span class="word-chip chip-partner bg-slate-800 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">${w}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Lifestyle -->
          <div class="drawer-section">
            <span class="section-label">LIFESTYLE</span>
            <div class="drawer-lifestyle-grid">
              <div class="habit-item">
                <span class="h-label">Status</span>
                <strong>${partner.relationshipStatus}</strong>
              </div>
              <div class="habit-item">
                <span class="h-label">Drinking</span>
                <strong>${partner.drinking}</strong>
              </div>
              <div class="habit-item">
                <span class="h-label">Smoking</span>
                <strong>${partner.smoking}</strong>
              </div>
              <div class="habit-item">
                <span class="h-label">Faith</span>
                <strong>${partner.faith}</strong>
              </div>
            </div>
          </div>

          <!-- Mutual Interests -->
          <div class="drawer-section">
            <span class="section-label">MUTUAL INTERESTS (${mutualTags.length})</span>
            <div class="drawer-tags-wrap">
              ${partner.tags.map(t => {
                const isMut = store.user.tags?.includes(t);
                return `<span class="interest-pill ${isMut ? 'mutual-interest' : ''}">${t} ${isMut ? '★' : ''}</span>`;
              }).join('')}
            </div>
          </div>

          <!-- Unpair -->
          <div class="drawer-danger-zone">
            <button class="btn btn-secondary btn-block btn-sm" id="btnReportUser">Unmatch / Remove</button>
          </div>
        </div>
      </div>
    `;

    this.container.querySelector("#btnCloseDrawer")?.addEventListener("click", () => {
      store.toggleProfileDrawer(false);
    });

    this.container.querySelector(".btn-drawer-challenge")?.addEventListener("click", () => {
      store.setActiveChannel("chat", { partnerId: partner.id, autoLaunchGame: "number_duel" });
    });

    this.container.querySelector("#btnDrawerAudio")?.addEventListener("click", () => {
      store.setActiveChannel("chat", { partnerId: partner.id });
    });

    this.container.querySelector("#btnReportUser")?.addEventListener("click", () => {
      if (confirm(`Are you sure you want to unmatch with ${partner.name}?`)) {
        delete store.chats[partner.id];
        store.saveChats();
        store.setActiveChannel("deck");
      }
    });
  }
}
