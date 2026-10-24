// src/onboarding.js - Clean Multi-Step Onboarding Wizard

import { store } from "./store.js";
import { CATEGORIZED_TAGS, ALL_TAGS } from "./data.js";

export class OnboardingWizard {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentStep = 1;
    this.totalSteps = 4;
    this.formData = { ...store.user };
    this.selectedTags = new Set(this.formData.tags || []);
    this.activeCategory = "Gaming";
    this.searchQuery = "";
  }

  init() {
    this.render();
  }

  calculateAge(dobString) {
    if (!dobString) return 0;
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  render() {
    this.container.innerHTML = `
      <div class="modal-overlay" id="onboardingOverlay">
        <div class="onboarding-modal rounded-2xl shadow-2xl">
          <!-- Wizard Header -->
          <div class="onboarding-header">
            <div class="brand-row">
              <span class="brand-title">Pact • Set Up Your Profile</span>
            </div>
            <div class="wizard-steps-indicator">
              <span class="step-label">Step ${this.currentStep} of ${this.totalSteps}</span>
              <div class="step-bars">
                ${[1, 2, 3, 4].map(s => `
                  <div class="step-bar ${s <= this.currentStep ? 'active' : ''}"></div>
                `).join('')}
              </div>
            </div>
            <button class="btn-icon-close" id="btnCloseWizard" title="Close Setup">✕</button>
          </div>

          <!-- Wizard Body -->
          <div class="onboarding-body" id="onboardingBody">
            ${this.renderStepContent()}
          </div>

          <!-- Wizard Footer Controls -->
          <div class="onboarding-footer">
            ${this.currentStep > 1 ? `
              <button class="btn btn-secondary" id="btnPrevStep">
                ← Back
              </button>
            ` : `<div></div>`}

            <div class="footer-status" id="wizardStatusText">
              ${this.getStatusText()}
            </div>

            ${this.currentStep < this.totalSteps ? `
              <button class="btn btn-primary" id="btnNextStep">
                Next →
              </button>
            ` : `
              <button class="btn btn-primary" id="btnCompleteSetup" ${this.selectedTags.size < 5 || this.selectedTags.size > 15 ? 'disabled' : ''}>
                Complete Profile ✓
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  getStatusText() {
    if (this.currentStep === 1) return "Basic Details & Age";
    if (this.currentStep === 2) return "Intent & Lifestyle";
    if (this.currentStep === 3) return "Bio & Your 3 Words";
    if (this.currentStep === 4) {
      const count = this.selectedTags.size;
      const statusColor = count >= 5 && count <= 15 ? "#10B981" : "#EF4444";
      return `<span style="color:${statusColor}">${count} of 15 interests selected (min 5)</span>`;
    }
    return "";
  }

  renderStepContent() {
    switch (this.currentStep) {
      case 1:
        return this.renderStep1();
      case 2:
        return this.renderStep2();
      case 3:
        return this.renderStep3();
      case 4:
        return this.renderStep4();
      default:
        return "";
    }
  }

  renderStep1() {
    const age = this.calculateAge(this.formData.dob);
    const isUnderage = age > 0 && age < 18;

    return `
      <div class="step-pane animate-fade">
        <h2 class="step-title">Basic Details</h2>
        <p class="step-description">Tell people who you are. All members must be 18+ to connect on Pact.</p>

        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="inpFullName">Full Name</label>
            <input type="text" id="inpFullName" class="form-input" value="${this.formData.name || ''}" placeholder="e.g. Alex Chen" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="inpUsername">Username</label>
            <div class="input-prefix-wrap">
              <span class="input-prefix">@</span>
              <input type="text" id="inpUsername" class="form-input" value="${this.formData.username || ''}" placeholder="alex_c" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="inpDob">Date of Birth (18+ required)</label>
            <input type="date" id="inpDob" class="form-input ${isUnderage ? 'input-error' : ''}" value="${this.formData.dob || '2000-01-01'}" required />
            <div class="field-feedback ${isUnderage ? 'text-danger' : 'text-emerald'}" id="dobFeedback">
              ${age > 0 ? (isUnderage ? '⚠ You must be at least 18 years old to join Pact.' : `Verified: ${age} years old`) : ''}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="selGender">Gender Identity</label>
            <select id="selGender" class="form-select">
              <option value="Non-binary" ${this.formData.gender === 'Non-binary' ? 'selected' : ''}>Non-binary</option>
              <option value="Woman" ${this.formData.gender === 'Woman' ? 'selected' : ''}>Woman</option>
              <option value="Man" ${this.formData.gender === 'Man' ? 'selected' : ''}>Man</option>
              <option value="Agender" ${this.formData.gender === 'Agender' ? 'selected' : ''}>Agender</option>
              <option value="Other" ${this.formData.gender === 'Other' ? 'selected' : ''}>Other</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="selSeeking">Interested in Meeting</label>
            <select id="selSeeking" class="form-select">
              <option value="Everyone" ${this.formData.seeking === 'Everyone' ? 'selected' : ''}>Everyone (All Genders)</option>
              <option value="Women" ${this.formData.seeking === 'Women' ? 'selected' : ''}>Women</option>
              <option value="Men" ${this.formData.seeking === 'Men' ? 'selected' : ''}>Men</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="inpLocation">City / Location</label>
            <input type="text" id="inpLocation" class="form-input" value="${this.formData.location || 'Seattle, WA'}" placeholder="e.g. Seattle, WA" />
          </div>

          <div class="form-group">
            <label class="form-label" for="inpEducation">Education</label>
            <input type="text" id="inpEducation" class="form-input" value="${this.formData.education || ''}" placeholder="e.g. University of Washington" />
          </div>

          <div class="form-group">
            <label class="form-label" for="inpOccupation">Occupation</label>
            <input type="text" id="inpOccupation" class="form-input" value="${this.formData.occupation || ''}" placeholder="e.g. Software Engineer" />
          </div>
        </div>
      </div>
    `;
  }

  renderStep2() {
    return `
      <div class="step-pane animate-fade">
        <h2 class="step-title">Intent & Lifestyle</h2>
        <p class="step-description">Be clear about what you're looking for to find people on your wavelength.</p>

        <div class="form-grid">
          <div class="form-group col-span-2">
            <label class="form-label">What are you looking for?</label>
            <div class="radio-card-grid">
              ${[
                { id: "Gaming & Activity Partner", title: "Gaming & Activity Partner", desc: "Duos, co-op challenges, bouldering, maker projects" },
                { id: "Long-term relationship", title: "Long-Term Relationship", desc: "Deep connection, shared values, romantic partnership" },
                { id: "Casual dating", title: "Casual Dating", desc: "Low-pressure hangouts, dinners, fun activities" },
                { id: "Exploring", title: "Exploring & Socializing", desc: "Meeting new friends and seeing where things go" }
              ].map(opt => `
                <label class="radio-card ${this.formData.intent === opt.id ? 'selected' : ''}">
                  <input type="radio" name="primaryIntent" value="${opt.id}" ${this.formData.intent === opt.id ? 'checked' : ''} />
                  <div class="radio-card-content">
                    <span class="radio-card-title">${opt.title}</span>
                    <span class="radio-card-desc">${opt.desc}</span>
                  </div>
                </label>
              `).join('')}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="selRelStatus">Relationship Status</label>
            <select id="selRelStatus" class="form-select">
              <option value="Single" ${this.formData.relationshipStatus === 'Single' ? 'selected' : ''}>Single</option>
              <option value="Exploring" ${this.formData.relationshipStatus === 'Exploring' ? 'selected' : ''}>Exploring / Non-monogamous</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="selFaith">Religion / Faith</label>
            <select id="selFaith" class="form-select">
              <option value="Agnostic" ${this.formData.faith === 'Agnostic' ? 'selected' : ''}>Agnostic</option>
              <option value="Atheist" ${this.formData.faith === 'Atheist' ? 'selected' : ''}>Atheist</option>
              <option value="Spiritual" ${this.formData.faith === 'Spiritual' ? 'selected' : ''}>Spiritual</option>
              <option value="Christian" ${this.formData.faith === 'Christian' ? 'selected' : ''}>Christian</option>
              <option value="Jewish" ${this.formData.faith === 'Jewish' ? 'selected' : ''}>Jewish</option>
              <option value="Muslim" ${this.formData.faith === 'Muslim' ? 'selected' : ''}>Muslim</option>
              <option value="Hindu" ${this.formData.faith === 'Hindu' ? 'selected' : ''}>Hindu</option>
              <option value="Buddhist" ${this.formData.faith === 'Buddhist' ? 'selected' : ''}>Buddhist</option>
              <option value="Other" ${this.formData.faith === 'Other' ? 'selected' : ''}>Other</option>
              <option value="Prefer not to say" ${this.formData.faith === 'Prefer not to say' ? 'selected' : ''}>Prefer not to say</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Drinking</label>
            <div class="selector-pills" id="drinkSelector">
              ${["Never", "Socially", "Regularly"].map(val => `
                <button type="button" class="btn-pill ${this.formData.drinking === val ? 'active' : ''}" data-val="${val}">${val}</button>
              `).join('')}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Smoking / Vaping</label>
            <div class="selector-pills" id="smokeSelector">
              ${["Never", "Socially", "Regularly"].map(val => `
                <button type="button" class="btn-pill ${this.formData.smoking === val ? 'active' : ''}" data-val="${val}">${val}</button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderStep3() {
    const selfWords = this.formData.selfWords || ["", "", ""];
    const seekWords = this.formData.seekWords || ["", "", ""];
    const bioLength = (this.formData.bio || "").length;

    return `
      <div class="step-pane animate-fade">
        <h2 class="step-title">Self-Expression & 3 Words</h2>
        <p class="step-description">Introduce yourself with a bio and summarize your personality and ideal partner in 3 words each.</p>

        <div class="form-grid">
          <div class="form-group col-span-2">
            <div class="label-with-counter">
              <label class="form-label" for="inpBio">Short Bio (Up to 300 characters)</label>
              <span class="char-counter" id="bioCounter">${bioLength} / 300</span>
            </div>
            <textarea id="inpBio" class="form-textarea" maxlength="300" rows="3" placeholder="Tell people about your hobbies, favorite games, weekend rituals, and what you'd love to do together...">${this.formData.bio || ''}</textarea>
          </div>

          <!-- Describe Yourself in 3 Words (3 horizontal inline inputs in a single row) -->
          <div class="form-group col-span-2">
            <label class="form-label">Describe Yourself in 3 Words</label>
            <div class="tri-word-row">
              <div class="tri-word-col">
                <span class="tri-word-index">#1</span>
                <input type="text" id="selfWord1" class="form-input tri-input" value="${selfWords[0] || ''}" placeholder="e.g. Curious" maxlength="20" required />
              </div>
              <div class="tri-word-col">
                <span class="tri-word-index">#2</span>
                <input type="text" id="selfWord2" class="form-input tri-input" value="${selfWords[1] || ''}" placeholder="e.g. Strategic" maxlength="20" required />
              </div>
              <div class="tri-word-col">
                <span class="tri-word-index">#3</span>
                <input type="text" id="selfWord3" class="form-input tri-input" value="${selfWords[2] || ''}" placeholder="e.g. Playful" maxlength="20" required />
              </div>
            </div>
          </div>

          <!-- What You Seek in a Partner in 3 Words (3 horizontal inline inputs in a single row) -->
          <div class="form-group col-span-2">
            <label class="form-label">What You Seek in a Partner in 3 Words</label>
            <div class="tri-word-row">
              <div class="tri-word-col">
                <span class="tri-word-index">#1</span>
                <input type="text" id="seekWord1" class="form-input tri-input" value="${seekWords[0] || ''}" placeholder="e.g. Witty" maxlength="20" required />
              </div>
              <div class="tri-word-col">
                <span class="tri-word-index">#2</span>
                <input type="text" id="seekWord2" class="form-input tri-input" value="${seekWords[1] || ''}" placeholder="e.g. Spontaneous" maxlength="20" required />
              </div>
              <div class="tri-word-col">
                <span class="tri-word-index">#3</span>
                <input type="text" id="seekWord3" class="form-input tri-input" value="${seekWords[2] || ''}" placeholder="e.g. Empathetic" maxlength="20" required />
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderStep4() {
    const categories = Object.keys(CATEGORIZED_TAGS);
    const categoryTags = CATEGORIZED_TAGS[this.activeCategory] || [];
    
    const filteredTags = this.searchQuery.trim()
      ? ALL_TAGS.filter(t => t.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      : categoryTags.map(name => ({ name, category: this.activeCategory }));

    const count = this.selectedTags.size;
    const isReady = count >= 5 && count <= 15;

    return `
      <div class="step-pane animate-fade">
        <div class="step-header-row">
          <div>
            <h2 class="step-title">Select Interests & Passions</h2>
            <p class="step-description">Choose 5 to 15 interests across Gaming, Anime, Sports, Tech, Music, and Art.</p>
          </div>
          <div class="tag-counter-badge ${isReady ? 'badge-success' : 'badge-warning'}">
            <span>${count} / 15 Selected</span>
            <small>${count < 5 ? `(Select ${5 - count} more)` : (count > 15 ? 'Too many' : 'Good to go!')}</small>
          </div>
        </div>

        <!-- Selected Tags Tray -->
        <div class="selected-tags-tray rounded-xl">
          <div class="selected-chips-wrap">
            ${Array.from(this.selectedTags).length === 0 ? `
              <span class="empty-tray-notice">Tap interests below to add them to your profile.</span>
            ` : Array.from(this.selectedTags).map(tag => `
              <span class="chip-selected" data-tag="${tag}">
                ${tag}
                <button type="button" class="btn-remove-tag" data-tag="${tag}">✕</button>
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Search & Category Tabs -->
        <div class="tag-matrix-controls">
          <div class="search-input-wrap">
            <input type="text" id="inpTagSearch" class="form-input tag-search-input" value="${this.searchQuery}" placeholder="Search interests (e.g. Elden Ring, Bouldering, Synthesizers)..." />
            ${this.searchQuery ? `<button type="button" id="btnClearTagSearch" class="btn-clear-search">✕</button>` : ''}
          </div>

          <div class="category-tabs">
            ${categories.map(cat => `
              <button type="button" class="category-tab ${this.activeCategory === cat && !this.searchQuery ? 'active' : ''}" data-cat="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Tags Grid -->
        <div class="tag-matrix-grid">
          ${filteredTags.map(item => {
            const isSelected = this.selectedTags.has(item.name);
            return `
              <button type="button" class="tag-cell ${isSelected ? 'selected' : ''}" data-tag="${item.name}">
                <span class="tag-name">${item.name}</span>
                <span class="tag-check">${isSelected ? '✓' : '+'}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  attachEvents() {
    this.container.querySelector("#btnCloseWizard")?.addEventListener("click", () => {
      store.isOnboardingOpen = false;
      store.emit("onboarding:closed");
      this.container.innerHTML = "";
    });

    this.container.querySelector("#btnPrevStep")?.addEventListener("click", () => {
      this.saveCurrentStepInputs();
      if (this.currentStep > 1) {
        this.currentStep--;
        this.render();
      }
    });

    this.container.querySelector("#btnNextStep")?.addEventListener("click", () => {
      if (this.validateCurrentStep()) {
        this.saveCurrentStepInputs();
        if (this.currentStep < this.totalSteps) {
          this.currentStep++;
          this.render();
        }
      }
    });

    this.container.querySelector("#btnCompleteSetup")?.addEventListener("click", () => {
      if (this.selectedTags.size >= 5 && this.selectedTags.size <= 15) {
        this.saveCurrentStepInputs();
        this.formData.tags = Array.from(this.selectedTags);
        this.formData.onboardingCompleted = true;
        store.saveUser(this.formData);
        store.isOnboardingOpen = false;
        store.emit("onboarding:completed", this.formData);
        this.container.innerHTML = "";
      }
    });

    if (this.currentStep === 1) {
      const inpDob = this.container.querySelector("#inpDob");
      const feedback = this.container.querySelector("#dobFeedback");
      inpDob?.addEventListener("input", (e) => {
        const age = this.calculateAge(e.target.value);
        if (age < 18) {
          inpDob.classList.add("input-error");
          feedback.className = "field-feedback text-danger";
          feedback.textContent = "⚠ You must be at least 18 years old to join Pact.";
        } else {
          inpDob.classList.remove("input-error");
          feedback.className = "field-feedback text-emerald";
          feedback.textContent = `Verified: ${age} years old`;
        }
      });
    } else if (this.currentStep === 2) {
      this.container.querySelectorAll(".radio-card input").forEach(radio => {
        radio.addEventListener("change", (e) => {
          this.formData.intent = e.target.value;
          this.container.querySelectorAll(".radio-card").forEach(c => c.classList.remove("selected"));
          e.target.closest(".radio-card").classList.add("selected");
        });
      });

      this.container.querySelectorAll("#drinkSelector .btn-pill").forEach(btn => {
        btn.addEventListener("click", (e) => {
          this.formData.drinking = e.target.dataset.val;
          this.container.querySelectorAll("#drinkSelector .btn-pill").forEach(b => b.classList.remove("active"));
          e.target.classList.add("active");
        });
      });

      this.container.querySelectorAll("#smokeSelector .btn-pill").forEach(btn => {
        btn.addEventListener("click", (e) => {
          this.formData.smoking = e.target.dataset.val;
          this.container.querySelectorAll("#smokeSelector .btn-pill").forEach(b => b.classList.remove("active"));
          e.target.classList.add("active");
        });
      });
    } else if (this.currentStep === 3) {
      const inpBio = this.container.querySelector("#inpBio");
      const bioCounter = this.container.querySelector("#bioCounter");
      inpBio?.addEventListener("input", (e) => {
        bioCounter.textContent = `${e.target.value.length} / 300`;
      });
    } else if (this.currentStep === 4) {
      this.container.querySelectorAll(".category-tab").forEach(tab => {
        tab.addEventListener("click", (e) => {
          this.activeCategory = e.currentTarget.dataset.cat;
          this.searchQuery = "";
          this.renderStep4Update();
        });
      });

      const inpSearch = this.container.querySelector("#inpTagSearch");
      inpSearch?.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.renderStep4Update();
      });

      this.container.querySelector("#btnClearTagSearch")?.addEventListener("click", () => {
        this.searchQuery = "";
        this.renderStep4Update();
      });

      this.bindTagClicks();
    }
  }

  bindTagClicks() {
    this.container.querySelectorAll(".tag-cell").forEach(cell => {
      cell.addEventListener("click", (e) => {
        const tag = e.currentTarget.dataset.tag;
        if (this.selectedTags.has(tag)) {
          this.selectedTags.delete(tag);
        } else {
          if (this.selectedTags.size >= 15) {
            alert("Maximum 15 interests selected.");
            return;
          }
          this.selectedTags.add(tag);
        }
        this.renderStep4Update();
      });
    });

    this.container.querySelectorAll(".btn-remove-tag").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const tag = e.currentTarget.dataset.tag;
        this.selectedTags.delete(tag);
        this.renderStep4Update();
      });
    });
  }

  renderStep4Update() {
    const bodyEl = this.container.querySelector("#onboardingBody");
    if (bodyEl) {
      bodyEl.innerHTML = this.renderStep4();
      this.attachEvents();
    }
    const btnComplete = this.container.querySelector("#btnCompleteSetup");
    if (btnComplete) {
      const isReady = this.selectedTags.size >= 5 && this.selectedTags.size <= 15;
      btnComplete.disabled = !isReady;
    }
    const statusText = this.container.querySelector("#wizardStatusText");
    if (statusText) statusText.innerHTML = this.getStatusText();
  }

  saveCurrentStepInputs() {
    if (this.currentStep === 1) {
      const name = this.container.querySelector("#inpFullName")?.value;
      const username = this.container.querySelector("#inpUsername")?.value;
      const dob = this.container.querySelector("#inpDob")?.value;
      const gender = this.container.querySelector("#selGender")?.value;
      const seeking = this.container.querySelector("#selSeeking")?.value;
      const location = this.container.querySelector("#inpLocation")?.value;
      const education = this.container.querySelector("#inpEducation")?.value;
      const occupation = this.container.querySelector("#inpOccupation")?.value;

      this.formData = {
        ...this.formData,
        name,
        username,
        dob,
        age: this.calculateAge(dob),
        gender,
        seeking,
        location,
        education,
        occupation
      };
    } else if (this.currentStep === 2) {
      const relationshipStatus = this.container.querySelector("#selRelStatus")?.value;
      const faith = this.container.querySelector("#selFaith")?.value;
      this.formData = { ...this.formData, relationshipStatus, faith };
    } else if (this.currentStep === 3) {
      const bio = this.container.querySelector("#inpBio")?.value;
      const s1 = this.container.querySelector("#selfWord1")?.value || "";
      const s2 = this.container.querySelector("#selfWord2")?.value || "";
      const s3 = this.container.querySelector("#selfWord3")?.value || "";
      const k1 = this.container.querySelector("#seekWord1")?.value || "";
      const k2 = this.container.querySelector("#seekWord2")?.value || "";
      const k3 = this.container.querySelector("#seekWord3")?.value || "";

      this.formData = {
        ...this.formData,
        bio,
        selfWords: [s1, s2, s3],
        seekWords: [k1, k2, k3]
      };
    } else if (this.currentStep === 4) {
      this.formData.tags = Array.from(this.selectedTags);
    }
    store.saveUser(this.formData);
  }

  validateCurrentStep() {
    if (this.currentStep === 1) {
      const name = this.container.querySelector("#inpFullName")?.value.trim();
      const dob = this.container.querySelector("#inpDob")?.value;
      const age = this.calculateAge(dob);

      if (!name) {
        alert("Please enter your name.");
        return false;
      }
      if (!dob || age < 18) {
        alert("You must be at least 18 years old to join Pact.");
        return false;
      }
    } else if (this.currentStep === 3) {
      const s1 = this.container.querySelector("#selfWord1")?.value.trim();
      const s2 = this.container.querySelector("#selfWord2")?.value.trim();
      const s3 = this.container.querySelector("#selfWord3")?.value.trim();
      const k1 = this.container.querySelector("#seekWord1")?.value.trim();
      const k2 = this.container.querySelector("#seekWord2")?.value.trim();
      const k3 = this.container.querySelector("#seekWord3")?.value.trim();

      if (!s1 || !s2 || !s3) {
        alert("Please enter 3 words describing yourself.");
        return false;
      }
      if (!k1 || !k2 || !k3) {
        alert("Please enter 3 words you seek in a partner.");
        return false;
      }
    }
    return true;
  }
}
