// src/store.js - Central State Management & Persistence for Pact

import { INITIAL_DISCOVERY_PROFILES, INITIAL_FEED_POSTS } from "./data.js";

const STORAGE_KEY_USER = "pact_user_profile_v2";
const STORAGE_KEY_CHATS = "pact_chat_threads_v2";
const STORAGE_KEY_FEED = "pact_feed_posts_v2";
const STORAGE_KEY_SWIPES = "pact_swiped_profiles_v2";

export const DEFAULT_USER = {
  name: "Alex Chen",
  username: "alex_c",
  dob: "2000-04-18",
  age: 24,
  gender: "Non-binary",
  seeking: "Everyone",
  location: "Seattle, WA",
  education: "UW Systems Engineering",
  occupation: "Software Engineer",
  intent: "Gaming & Activity Partner",
  relationshipStatus: "Single",
  faith: "Agnostic",
  drinking: "Socially",
  smoking: "Never",
  photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
  initials: "AC",
  bio: "Tuning micro-benchmarks, grinding Elden Ring challenge runs, and bouldering on weekends. Looking for someone to trade technical banter, play mini-games, and explore Pacific Northwest coffee spots.",
  selfWords: ["Curious", "Strategic", "Playful"],
  seekWords: ["Witty", "Spontaneous", "Empathetic"],
  tags: [
    "Rust Language",
    "Elden Ring",
    "Custom Mechanical Keyboards",
    "Bouldering",
    "Neon Genesis Evangelion",
    "Ambient Techno"
  ],
  onboardingCompleted: true
};

class Store {
  constructor() {
    this.listeners = new Map();
    this.user = this.loadUser();
    this.chats = this.loadChats();
    this.feedPosts = this.loadFeed();
    this.swipedProfiles = this.loadSwipes();
    this.profiles = [...INITIAL_DISCOVERY_PROFILES];
    this.activeChannel = "deck"; // 'deck' | 'arcade' | 'feed' | 'daily3' | 'chat' | 'privacy' | 'terms'
    this.activeChatPartnerId = "user-elena";
    this.isProfileDrawerOpen = false;
    this.isOnboardingOpen = !this.user || !this.user.onboardingCompleted;
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.listeners.get(event).delete(callback);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => cb(data));
    }
    if (this.listeners.has("*")) {
      this.listeners.get("*").forEach(cb => cb({ event, data }));
    }
  }

  loadUser() {
    try {
      const saved = localStorage.getItem('pact_user') || localStorage.getItem('pact_user_profile') || localStorage.getItem(STORAGE_KEY_USER);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  }

  saveUser(newUser) {
    this.user = { ...this.user, ...newUser };
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(this.user));
    } catch (e) {}
    this.emit("user:updated", this.user);
  }

  loadSwipes() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SWIPES);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { passed: [], matched: ["user-elena"] };
  }

  saveSwipes() {
    try {
      localStorage.setItem(STORAGE_KEY_SWIPES, JSON.stringify(this.swipedProfiles));
    } catch (e) {}
  }

  swipeProfile(profileId, action) {
    if (action === "match") {
      if (!this.swipedProfiles.matched.includes(profileId)) {
        this.swipedProfiles.matched.push(profileId);
      }
      this.ensureChatExists(profileId);
    } else {
      if (!this.swipedProfiles.passed.includes(profileId)) {
        this.swipedProfiles.passed.push(profileId);
      }
    }
    this.saveSwipes();
    this.emit("swipe:action", { profileId, action });
  }

  loadChats() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHATS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    const defaultTime = "12:15 PM";
    const earlierTime = "11:45 AM";

    return {
      "user-elena": {
        partnerId: "user-elena",
        unread: 1,
        lastActivity: defaultTime,
        messages: [
          {
            id: "m-1",
            sender: "user-elena",
            time: earlierTime,
            type: "text",
            content: "Saw your tags: Rust + Elden Ring + Custom Keyboards. Immediate green flag! What kind of key switches are you running right now?"
          },
          {
            id: "m-2",
            sender: "user",
            time: earlierTime,
            type: "text",
            content: "Lubed Boba U4Ts on a 36-key split Corne. Takes about two weeks to adjust, but then your typing speed is unmatched."
          },
          {
            id: "m-3",
            sender: "user-elena",
            time: defaultTime,
            type: "game_invite",
            gameId: "number_duel",
            gameTitle: "Number Duel (1-100)",
            content: "Elena invited you to play Number Duel! Tap below to start."
          }
        ]
      },
      "user-marcus": {
        partnerId: "user-marcus",
        unread: 0,
        lastActivity: "2h ago",
        messages: [
          {
            id: "m-s1",
            sender: "user-marcus",
            time: "2h ago",
            type: "text",
            content: "That skyline sketch you posted on the Vibe Feed was great! What camera are you shooting film with?"
          },
          {
            id: "m-s2",
            sender: "user",
            time: "1h ago",
            type: "text",
            content: "Voigtländer 40mm on an analog Bessa R2! Love the vintage glass character."
          }
        ]
      }
    };
  }

  saveChats() {
    try {
      localStorage.setItem(STORAGE_KEY_CHATS, JSON.stringify(this.chats));
    } catch (e) {}
    this.emit("chats:updated", this.chats);
  }

  ensureChatExists(partnerId) {
    if (!this.chats[partnerId]) {
      this.chats[partnerId] = {
        partnerId,
        unread: 0,
        lastActivity: "Just now",
        messages: [
          {
            id: "m-welcome-" + Date.now(),
            sender: "system",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: "system",
            content: "🎉 You connected! Say hello or tap 'Play Mini-Game' above to break the ice."
          }
        ]
      };
      this.saveChats();
    }
  }

  sendMessage(partnerId, messageObj) {
    if (!this.chats[partnerId]) {
      this.ensureChatExists(partnerId);
    }
    const fullMsg = {
      id: "msg-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...messageObj
    };
    this.chats[partnerId].messages.push(fullMsg);
    this.chats[partnerId].lastActivity = fullMsg.time;
    this.saveChats();
    this.emit("message:sent", { partnerId, message: fullMsg });

    if (messageObj.sender === "user") {
      this.simulatePartnerResponse(partnerId, messageObj);
    }
  }

  simulatePartnerResponse(partnerId, userMsg) {
    const partner = this.profiles.find(p => p.id === partnerId);
    if (!partner) return;

    setTimeout(() => {
      let replyContent = "Nice! Ready for another round?";
      let replyType = "text";

      if (userMsg.type === "meme") {
        replyContent = "Hahaha this meme is so accurate!";
      } else if (userMsg.type === "voice") {
        replyContent = "Just listened to your voice message—great energy! We should definitely hang out soon.";
      } else if (userMsg.type === "sticker") {
        replyContent = "Did you draw that sticker just now? That's awesome!";
      } else {
        const replies = [
          "Totally agree with you on that! Have you tried the Reflex Tap game yet?",
          "That's so true. I love how this app skips the awkward small talk.",
          "Let's play Collaborative Canvas! I want to see what we end up sketching.",
          "Awesome! What other games are you into right now?"
        ];
        replyContent = replies[Math.floor(Math.random() * replies.length)];
      }

      const incomingMsg = {
        id: "msg-" + Date.now(),
        sender: partnerId,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: replyType,
        content: replyContent
      };

      if (this.chats[partnerId]) {
        this.chats[partnerId].messages.push(incomingMsg);
        this.chats[partnerId].lastActivity = incomingMsg.time;
        if (this.activeChannel !== "chat" || this.activeChatPartnerId !== partnerId) {
          this.chats[partnerId].unread = (this.chats[partnerId].unread || 0) + 1;
        }
        this.saveChats();
        this.emit("message:received", { partnerId, message: incomingMsg });
      }
    }, 1600);
  }

  loadFeed() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FEED);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [...INITIAL_FEED_POSTS];
  }

  addFeedPost(post) {
    const fullPost = {
      id: "post-" + Date.now(),
      author: this.user.username,
      authorName: this.user.name,
      timeAgo: "Just now",
      likes: 1,
      replies: 0,
      authorPhoto: this.user.photo,
      authorInitials: this.user.initials,
      ...post
    };
    this.feedPosts.unshift(fullPost);
    try {
      localStorage.setItem(STORAGE_KEY_FEED, JSON.stringify(this.feedPosts));
    } catch (e) {}
    this.emit("feed:updated", this.feedPosts);
  }

  setActiveChannel(channel, meta = {}) {
    this.activeChannel = channel;
    if (meta.partnerId) {
      this.activeChatPartnerId = meta.partnerId;
      if (this.chats[meta.partnerId]) {
        this.chats[meta.partnerId].unread = 0;
        this.saveChats();
      }
    }
    // Only allow profile drawer when inside chat
    if (channel !== "chat") {
      this.isProfileDrawerOpen = false;
    }
    this.emit("channel:changed", { channel, meta });
  }

  toggleProfileDrawer(forceState) {
    if (this.activeChannel !== "chat") {
      this.isProfileDrawerOpen = false;
    } else {
      this.isProfileDrawerOpen = typeof forceState === "boolean" ? forceState : !this.isProfileDrawerOpen;
    }
    this.emit("drawer:toggled", this.isProfileDrawerOpen);
  }

  purgeAllData() {
    try {
      localStorage.clear();
    } catch (e) {}
    this.user = { ...DEFAULT_USER, onboardingCompleted: false };
    this.chats = {};
    this.feedPosts = [...INITIAL_FEED_POSTS];
    this.swipedProfiles = { passed: [], matched: [] };
    this.activeChannel = "deck";
    this.isOnboardingOpen = true;
    this.emit("data:purged");
  }
}

export const store = new Store();
