import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  Camera, 
  Trash2, 
  Star, 
  MoveLeft, 
  MoveRight, 
  Upload, 
  Plus, 
  Search, 
  Music, 
  Sparkles, 
  User, 
  SlidersHorizontal, 
  Heart,
  Save,
  Briefcase,
  GraduationCap,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATEGORIZED_INTERESTS, GLOBAL_ARTISTS } from '../mockData';

const FAITH_OPTIONS = [
  "Agnostic", "Atheist", "Spiritual", "Hindu", "Christian", "Muslim", "Buddhist", "Jewish", "Other"
];

const CONNECTION_GOALS = [
  "Long-term relationship",
  "Short-term / Dating",
  "Casual vibe",
  "Deciding after connecting"
];

const HABIT_OPTIONS = ["Never", "Occasionally", "Frequently"];

export default function EditProfileDrawer({ isOpen, onClose, user, onSaveUser }) {
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'identity' | 'dating' | 'interests'
  const [saveSuccessBanner, setSaveSuccessBanner] = useState(false);

  // Editable local state cloned from user
  const [formData, setFormData] = useState(() => ({
    name: user?.name || '',
    age: user?.age || 23,
    gender: user?.gender || 'Man',
    pronouns: user?.pronouns || 'he/him',
    datingPreferenceGender: user?.datingPreferenceGender || 'Everyone',
    preferredMinAge: user?.preferredMinAge || 19,
    preferredMaxAge: user?.preferredMaxAge || 28,
    hometown: user?.hometown || 'San Francisco, CA',
    maxDistanceKm: user?.maxDistanceKm || 80,
    photos: user?.photos?.length ? user.photos : [
      {
        url: user?.photo || user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        caption: "Primary DP"
      }
    ],
    newPhotoUrl: '',
    bio: user?.bio || '',
    faith: user?.faith || 'Spiritual',
    connectionGoal: user?.connectionGoal || 'Long-term relationship',
    threeWords: user?.threeWords?.length === 3 
      ? user.threeWords 
      : (user?.selfTraits?.length === 3 ? user.selfTraits : ['Curious', 'Spontaneous', 'Caffeinated']),
    smoking: user?.smoking || 'Never',
    drinking: user?.drinking || 'Occasionally',
    heightCm: user?.heightCm || 178,
    weightKg: user?.weightKg || 70,
    occupationType: user?.occupationType || 'Job',
    workplaceOrCollege: user?.workplaceOrCollege || '',
    interests: user?.interests || ['Bouldering', 'Indie Rock'],
    topArtists: user?.topArtists || ['Arctic Monkeys', 'Frank Ocean']
  }));

  // Interest search & Artist search
  const [interestSearch, setInterestSearch] = useState('');
  const [selectedInterestCat, setSelectedInterestCat] = useState('All');
  const [artistSearch, setArtistSearch] = useState('');

  // Handle Photo Actions
  const handleAddPhotoUrl = (url) => {
    if (!url.trim() || formData.photos.length >= 6) return;
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, { url: url.trim(), caption: "" }],
      newPhotoUrl: ''
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || formData.photos.length >= 6) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (base64) {
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, { url: base64, caption: "" }]
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (index) => {
    if (formData.photos.length <= 1) return; // Keep at least 1 photo
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSetPrimaryDP = (index) => {
    if (index === 0) return;
    setFormData(prev => {
      const updated = [...prev.photos];
      const [chosen] = updated.splice(index, 1);
      updated.unshift(chosen);
      return { ...prev, photos: updated };
    });
  };

  const handleMovePhoto = (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= formData.photos.length) return;
    setFormData(prev => {
      const updated = [...prev.photos];
      const temp = updated[index];
      updated[index] = updated[target];
      updated[target] = temp;
      return { ...prev, photos: updated };
    });
  };

  const handleCaptionChange = (index, caption) => {
    setFormData(prev => {
      const updated = [...prev.photos];
      updated[index] = { ...updated[index], caption };
      return { ...prev, photos: updated };
    });
  };

  // Toggle interest
  const toggleInterest = (name) => {
    setFormData(prev => {
      const exists = prev.interests.includes(name);
      if (exists) {
        if (prev.interests.length <= 2) return prev; // min 2
        return { ...prev, interests: prev.interests.filter(i => i !== name) };
      } else {
        return { ...prev, interests: [...prev.interests, name] };
      }
    });
  };

  // Artist handlers
  const handleSelectArtist = (name) => {
    setFormData(prev => {
      if (prev.topArtists.includes(name)) return prev;
      if (prev.topArtists.length < 4) {
        return { ...prev, topArtists: [...prev.topArtists, name] };
      } else {
        const updated = [...prev.topArtists];
        updated[0] = name;
        return { ...prev, topArtists: updated };
      }
    });
    setArtistSearch('');
  };

  const handleRemoveArtist = (index) => {
    if (formData.topArtists.length <= 1) return; // min 1
    setFormData(prev => ({
      ...prev,
      topArtists: prev.topArtists.filter((_, i) => i !== index)
    }));
  };

  // Save Changes
  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
      photo: formData.photos[0]?.url || user?.photo,
      avatar: formData.photos[0]?.url || user?.avatar,
      selfTraits: formData.threeWords,
      onboardingComplete: true
    };

    localStorage.setItem('pact_user', JSON.stringify(updatedUser));
    onSaveUser(updatedUser);

    setSaveSuccessBanner(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#FF3366', '#10B981']
    });

    setTimeout(() => {
      setSaveSuccessBanner(false);
      onClose();
    }, 1100);
  };

  const filteredArtists = artistSearch.trim()
    ? GLOBAL_ARTISTS.filter(a => 
        a.name.toLowerCase().includes(artistSearch.toLowerCase().trim())
      ).slice(0, 6)
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md"
      />

      {/* Main Slide-Over Drawer Container */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 260 }}
        className="relative w-full max-w-2xl h-full bg-[#0E0C17] border-l border-white/10 flex flex-col z-10 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 p-0.5 shadow-md">
              <img 
                src={formData.photos[0]?.url || user?.avatar} 
                alt="Avatar" 
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                Edit Profile & Preferences
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Live Sync
                </span>
              </h3>
              <p className="text-xs text-slate-400">Manage your photos, identity, and matching filters</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 p-2 bg-white/[0.02] border-b border-white/5 text-xs font-bold text-center">
          {[
            { id: 'photos', label: 'Photos (1–6)' },
            { id: 'identity', label: 'Identity & Bio' },
            { id: 'dating', label: 'Dating Filters' },
            { id: 'interests', label: 'Interests & Music' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* TAB 1: Photos Manager */}
          {activeTab === 'photos' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                  Photo Curation (1 to 6)
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Slot 1 is your active Primary DP. Use the arrows to reorder, or edit captions on slots 2–6.
                </p>
              </div>

              {/* Add Photo Tools */}
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  placeholder="Paste image URL..."
                  value={formData.newPhotoUrl}
                  onChange={(e) => setFormData({ ...formData, newPhotoUrl: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-rose-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddPhotoUrl(formData.newPhotoUrl)}
                  className="px-3 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 transition-colors"
                >
                  Add URL
                </button>
                <label className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-white/10">
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>Upload</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.photos.map((photo, index) => {
                  const isDP = index === 0;
                  return (
                    <div
                      key={index}
                      className={`relative rounded-2xl overflow-hidden border bg-slate-900/80 flex flex-col ${
                        isDP ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-white/10'
                      }`}
                    >
                      <div className="relative h-44 w-full bg-slate-950">
                        <img 
                          src={photo.url} 
                          alt="preview" 
                          className="w-full h-full object-cover"
                        />
                        {isDP ? (
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center gap-1">
                            <Star className="w-3 h-3 fill-slate-950" /> Primary DP
                          </span>
                        ) : (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-white font-mono text-[10px]">
                            Slot #{index + 1}
                          </span>
                        )}

                        {formData.photos.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
                            className="absolute top-2 right-2 p-1.5 rounded-xl bg-black/60 hover:bg-rose-500 text-white transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="p-2.5 bg-[#12101F] flex flex-col gap-2">
                        {!isDP ? (
                          <input
                            type="text"
                            placeholder="Add photo caption..."
                            value={photo.caption || ''}
                            onChange={(e) => handleCaptionChange(index, e.target.value)}
                            className="w-full px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500"
                          />
                        ) : (
                          <span className="text-[11px] text-amber-300 italic">
                            Main display picture shown in Deck
                          </span>
                        )}

                        <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px]">
                          {!isDP && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryDP(index)}
                              className="text-amber-400 hover:text-amber-300 font-bold"
                            >
                              Set as DP
                            </button>
                          )}
                          <div className="flex items-center gap-1 ml-auto">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => handleMovePhoto(index, -1)}
                              className={`p-1 rounded-lg ${index === 0 ? 'text-slate-600' : 'text-slate-300 hover:bg-white/10'}`}
                            >
                              <MoveLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={index === formData.photos.length - 1}
                              onClick={() => handleMovePhoto(index, 1)}
                              className={`p-1 rounded-lg ${index === formData.photos.length - 1 ? 'text-slate-600' : 'text-slate-300 hover:bg-white/10'}`}
                            >
                              <MoveRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Identity & Bio */}
          {activeTab === 'identity' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-rose-400">
                  Identity & Bio Details
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update your narrative, 3-word traits, and physical or career info.
                </p>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase">
                  <span>Bio</span>
                  <span className="text-rose-400 font-mono text-[10px]">{formData.bio.length} / 250</span>
                </div>
                <textarea
                  rows={3}
                  maxLength={250}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* 3 Words Description */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase block">
                  Describe Yourself in 3 Words
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {[0, 1, 2].map((idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={formData.threeWords[idx] || ''}
                      onChange={(e) => {
                        const updated = [...formData.threeWords];
                        updated[idx] = e.target.value.trim().split(' ')[0] || '';
                        setFormData({ ...formData, threeWords: updated });
                      }}
                      className="px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-center text-xs font-semibold text-white focus:outline-none focus:border-rose-500"
                    />
                  ))}
                </div>
              </div>

              {/* Faith & Connection Goal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-300 uppercase block">Religion / Faith</span>
                  <select
                    value={formData.faith}
                    onChange={(e) => setFormData({ ...formData, faith: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none"
                  >
                    {FAITH_OPTIONS.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-300 uppercase block">Connection Goal</span>
                  <select
                    value={formData.connectionGoal}
                    onChange={(e) => setFormData({ ...formData, connectionGoal: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none"
                  >
                    {CONNECTION_GOALS.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Height & Weight */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400">Height (cm)</span>
                  <input
                    type="number"
                    value={formData.heightCm || ''}
                    onChange={(e) => setFormData({ ...formData, heightCm: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400">Weight (kg)</span>
                  <input
                    type="number"
                    value={formData.weightKg || ''}
                    onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <span className="text-[11px] text-slate-400">Occupation Status</span>
                  <select
                    value={formData.occupationType}
                    onChange={(e) => setFormData({ ...formData, occupationType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                  >
                    <option value="Student">Student</option>
                    <option value="Job">Job / Employed</option>
                    <option value="Business">Business / Founder</option>
                    <option value="Self-employed">Self-employed / Freelance</option>
                  </select>
                </div>
              </div>

              {/* Conditional Workplace / College */}
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  {formData.occupationType === 'Student' ? (
                    <>
                      <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                      <span>College / University Name</span>
                    </>
                  ) : (
                    <>
                      <Briefcase className="w-3.5 h-3.5 text-rose-400" />
                      <span>Company / Workplace Name</span>
                    </>
                  )}
                </label>
                <input
                  type="text"
                  value={formData.workplaceOrCollege}
                  onChange={(e) => setFormData({ ...formData, workplaceOrCollege: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Dating Filters */}
          {activeTab === 'dating' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-pink-400">
                  Dating Discovery Filters
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Strictly determines which profiles appear on your Discovery Deck.
                </p>
              </div>

              {/* Dating Preference Gender */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase block">
                  Show Me Profiles For
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {["Women", "Men", "Everyone"].map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setFormData({ ...formData, datingPreferenceGender: pref })}
                      className={`py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                        formData.datingPreferenceGender === pref
                          ? "bg-gradient-to-r from-rose-500/20 to-pink-500/20 border-rose-500 text-white shadow-md shadow-rose-500/10"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dual Age Range Slider */}
              <div className="space-y-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 uppercase">
                    Partner Age Range Filter
                  </span>
                  <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 font-mono font-bold text-xs">
                    {formData.preferredMinAge} – {formData.preferredMaxAge} years
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-16">Min Age:</span>
                    <input
                      type="range"
                      min="18"
                      max="80"
                      value={formData.preferredMinAge}
                      onChange={(e) => {
                        const val = Math.min(parseInt(e.target.value) || 18, formData.preferredMaxAge);
                        setFormData({ ...formData, preferredMinAge: val });
                      }}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <span className="text-xs font-mono font-bold text-white w-8 text-right">
                      {formData.preferredMinAge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-16">Max Age:</span>
                    <input
                      type="range"
                      min="18"
                      max="80"
                      value={formData.preferredMaxAge}
                      onChange={(e) => {
                        const val = Math.max(parseInt(e.target.value) || 18, formData.preferredMinAge);
                        setFormData({ ...formData, preferredMaxAge: val });
                      }}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                    <span className="text-xs font-mono font-bold text-white w-8 text-right">
                      {formData.preferredMaxAge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hometown & Distance Radius */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-300 uppercase block">Hometown Location</span>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={formData.hometown}
                      onChange={(e) => setFormData({ ...formData, hometown: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase">
                    <span>Search Radius</span>
                    <span className="text-amber-400 font-mono">{formData.maxDistanceKm} km</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="1000"
                    step="5"
                    value={formData.maxDistanceKm}
                    onChange={(e) => setFormData({ ...formData, maxDistanceKm: parseInt(e.target.value) || 50 })}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Interests & Music */}
          {activeTab === 'interests' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                  Interests Cloud & Top 4 Artists
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Toggle tags from 100+ categories or swap your top music artists.
                </p>
              </div>

              {/* Top Artists Boxes */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Top 4 Artists ({formData.topArtists.length} of 4)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[0, 1, 2, 3].map((slot) => {
                    const artist = formData.topArtists[slot];
                    return (
                      <div
                        key={slot}
                        className={`p-3 rounded-xl border text-center flex flex-col justify-between min-h-[90px] ${
                          artist ? 'bg-rose-500/15 border-rose-500/40 text-white' : 'bg-white/5 border-white/10 text-slate-500'
                        }`}
                      >
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                          <span>#{slot + 1}</span>
                          {artist && (
                            <button
                              type="button"
                              onClick={() => handleRemoveArtist(slot)}
                              className="text-slate-400 hover:text-rose-400"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                        <span className="text-xs font-bold my-auto line-clamp-2">
                          {artist || "Empty"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Artist Search Autocomplete */}
                <div className="relative pt-1">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search 150+ global artists to add..."
                    value={artistSearch}
                    onChange={(e) => setArtistSearch(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500"
                  />
                  {filteredArtists.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 p-2 rounded-xl bg-[#141220] border border-white/15 shadow-2xl z-20 space-y-1">
                      {filteredArtists.map(a => (
                        <button
                          key={a.name}
                          type="button"
                          onClick={() => handleSelectArtist(a.name)}
                          className="w-full flex justify-between items-center px-3 py-1.5 rounded-lg text-left hover:bg-white/10 text-xs text-white"
                        >
                          <span className="font-bold">{a.name}</span>
                          <span className="text-[10px] text-slate-400">{a.genre}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Interests Cloud Filter */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Interests ({formData.interests.length} selected)
                  </span>
                  <input
                    type="text"
                    placeholder="Filter tags..."
                    value={interestSearch}
                    onChange={(e) => setInterestSearch(e.target.value)}
                    className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white text-xs w-40"
                  />
                </div>

                <div className="max-h-64 overflow-y-auto space-y-4 pr-1">
                  {Object.entries(CATEGORIZED_INTERESTS).map(([cat, tags]) => {
                    const filtered = tags.filter(t => 
                      !interestSearch || t.toLowerCase().includes(interestSearch.toLowerCase())
                    );
                    if (!filtered.length) return null;
                    return (
                      <div key={cat} className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-500">{cat}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {filtered.map(tag => {
                            const isSel = formData.interests.includes(tag);
                            return (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => toggleInterest(tag)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                                  isSel
                                    ? 'bg-gradient-to-r from-amber-400 to-rose-500 text-white border-transparent'
                                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                                }`}
                              >
                                {tag}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer with Save Changes Button */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
          {saveSuccessBanner ? (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-pulse">
              <Check className="w-4 h-4" /> Changes saved to localStorage!
            </span>
          ) : (
            <span className="text-[11px] text-slate-400">
              Updates your profile instantly without reload.
            </span>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-lg shadow-rose-500/25 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
