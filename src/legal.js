// src/legal.js - Module 5: Legal Compliance Pages (/privacy and /terms)

import { store } from "./store.js";

export class LegalManager {
  constructor(containerEl) {
    this.container = containerEl;
  }

  render(page = "privacy") {
    this.container.innerHTML = `
      <div class="legal-view animate-fade">
        <div class="legal-nav-bar">
          <div class="legal-tabs">
            <button class="legal-tab ${page === 'privacy' ? 'active' : ''}" id="tabPrivacy">
              PRIVACY POLICY
            </button>
            <button class="legal-tab ${page === 'terms' ? 'active' : ''}" id="tabTerms">
              TERMS & CONDITIONS
            </button>
          </div>
          <button class="btn btn-secondary btn-sm" id="btnExitLegal">
            BACK TO APP
          </button>
        </div>

        <div class="legal-document-content">
          ${page === 'privacy' ? this.renderPrivacyPolicy() : this.renderTermsOfService()}
        </div>
      </div>
    `;

    this.container.querySelector("#tabPrivacy")?.addEventListener("click", () => this.render("privacy"));
    this.container.querySelector("#tabTerms")?.addEventListener("click", () => this.render("terms"));
    this.container.querySelector("#btnExitLegal")?.addEventListener("click", () => {
      store.setActiveChannel("deck");
    });

    if (page === "privacy") {
      this.container.querySelector("#btnPurgeData")?.addEventListener("click", () => {
        const confirmed = confirm("Are you sure you want to permanently purge all profile, chat, and activity data from your device? This action is irreversible.");
        if (confirmed) {
          store.purgeAllData();
          alert("All local data has been permanently erased. Pact has been reset to initial state.");
          window.location.reload();
        }
      });
    }
  }

  renderPrivacyPolicy() {
    return `
      <article class="legal-article">
        <div class="article-header">
          <span class="legal-badge">SECURITY & PRIVACY DIRECTIVE // REV 2026.4</span>
          <h1>Privacy Policy & Ephemeral Data Architecture</h1>
          <p class="effective-date">Last Updated: October 2026 • Jurisdiction: Universal GDPR / CCPA Baseline</p>
        </div>

        <section class="legal-section">
          <h3>1. Ephemeral Canvas Sketches & In-Chat Mini-Game Data</h3>
          <p>
            At Pact, user expression is treated as a transient shared moment rather than permanent telemetry. 
            All sketches created in Collaborative Shared Canvas, Doodle Duel, and the Custom Sticker Creator are encoded client-side via HTML5 Canvas buffers. 
            Sketches transmitted in direct peer chat streams are preserved strictly within the client’s local browser sandbox storage (IndexedDB/localStorage) and are never ingested into centralized artificial intelligence training corpora or commercial vector embeddings without explicit, cryptographic dual-party consent.
          </p>
        </section>

        <section class="legal-section">
          <h3>2. Live Matchmaking & Arcade Radar Telemetry</h3>
          <p>
            During active matchmaking in the Arcade Radar Queue, connection tokens are routed via ephemeral WebSocket signaling relays. 
            At no point are precise raw GPS telemetry coordinates broadcast to external participants. Coordinates displayed in the user profile are intentionally obfuscated to a regional 1.0 km² precision bounding box (fuzzy geohashing). When matchmaking is cancelled or completed, all temporary queue node pointers are immediately dereferenced and purged from transient server memory.
          </p>
        </section>

        <section class="legal-section">
          <h3>3. Location Storage & Geolocation Boundaries</h3>
          <p>
            Pact stores city name and approximate coordinates solely to compute relative physical distance indicators between users. You retain full autonomy to manually override your displayed coordinates or toggle location masking in the Dossier settings at any time without forfeiture of platform functionality.
          </p>
        </section>

        <section class="legal-section">
          <h3>4. Audio & Video Call Permissions</h3>
          <p>
            Encrypted audio calls and video feeds initiate directly between verified matched clients over peer-to-peer WebRTC connections with DTLS-SRTP end-to-end encryption. 
            Pact does not record, archive, transcode, or wiretap audio or video streams. Call metadata (duration and timestamp) is logged exclusively on-device for the user’s personal activity record.
          </p>
        </section>

        <section class="legal-section">
          <h3>5. Absolute Right to Erasure (GDPR Art. 17 & CCPA)</h3>
          <p>
            You hold unconstrained sovereignty over your data. You may at any moment execute a total purge of all local storage entries, message transcripts, custom drawn stickers, and reciprocal word matrices.
          </p>
          <div class="data-purge-box">
            <div class="purge-info">
              <strong>PURGE ALL MY DATA</strong>
              <span>Immediately wipes local storage, cached chat histories, swiped states, and resets onboarding.</span>
            </div>
            <button class="btn btn-danger" id="btnPurgeData">
              EXECUTE PURGE
            </button>
          </div>
        </section>
      </article>
    `;
  }

  renderTermsOfService() {
    return `
      <article class="legal-article">
        <div class="article-header">
          <span class="legal-badge">PLATFORM COVENANT // REV 2026.4</span>
          <h1>Terms and Conditions & Community Covenant</h1>
          <p class="effective-date">Last Updated: October 2026 • Enforceable for all active sessions</p>
        </div>

        <section class="legal-section">
          <h3>1. Mandatory 18+ Age Requirement</h3>
          <p>
            Pact is strictly designed and maintained for adults aged eighteen (18) years or older. 
            During Module 1 Onboarding, age calculation is programmatically enforced. 
            Any user found misrepresenting their age or providing fraudulent birth data will face immediate, permanent disqualification and network blacklisting.
          </p>
        </section>

        <section class="legal-section">
          <h3>2. Zero-Tolerance Anti-Harassment & Tactical Conduct</h3>
          <p>
            "Make Connection an Experience" requires mutual respect. Pact strictly prohibits:
          </p>
          <ul class="legal-list">
            <li>Unsolicited sexually explicit canvas sketches or non-consensual media transmission.</li>
            <li>Hate speech, intimidation, stalking, doxxing, or harassment across any discovery channel or chat room.</li>
            <li>Botting, automated swipe manipulation, or script-driven radar queue spoofing.</li>
          </ul>
          <p>
            Violations result in instant termination of platform access.
          </p>
        </section>

        <section class="legal-section">
          <h3>3. Intellectual Property of Shared Artwork & Collaborative Canvases</h3>
          <p>
            Artwork produced within Collaborative Shared Canvas and Doodle Duel remains the joint creative property of the respective collaborating users under a reciprocal non-exclusive Creative Commons Attribution-NonCommercial (CC BY-NC 4.0) standard. Neither party may commercialize joint sketches without the written endorsement of the co-author.
          </p>
        </section>

        <section class="legal-section">
          <h3>4. Limitation of Liability & Platform Disclaimers</h3>
          <p>
            Pact is provided on an "as-is" and "as-available" basis. While we employ rigorous cryptographic protocols and client-side sanitization, Pact assumes no liability for offline meetups or independent user disputes. Users are strongly advised to exercise standard personal safety practices when meeting in physical environments.
          </p>
        </section>
      </article>
    `;
  }
}
