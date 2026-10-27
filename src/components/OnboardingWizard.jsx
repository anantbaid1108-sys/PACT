import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Star, 
  MoveLeft, 
  MoveRight, 
  Search, 
  Music, 
  Plus, 
  MapPin, 
  Heart, 
  Flame, 
  ShieldCheck, 
  Zap,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATEGORIZED_INTERESTS, GLOBAL_ARTISTS } from '../mockData';

// Curated starter demo photos for one-click add
const SAMPLE_PHOTOS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
];

const FAITH_OPTIONS = [
  "Agnostic", "Atheist", "Spiritual", "Hindu", "Christian", "Muslim", "Buddhist", "Jewish", "Other"
];

const CONNECTION_GOALS = [
  "Long-term",
  "Casual",
  "Exploring",
  "Deciding after connecting"
];

const HABIT_OPTIONS = ["Never", "Occasionally", "Frequently"];

export default function OnboardingWizard({ initialData, onComplete, onCancel }) {
  const [step, setStep] = useState(1);
  const [validationError, setValidationError] = useState('');

  // Form State
  const [formData, setFormData] = useState(() => {
    const age = initialData?.age || 22;
    return {
      // Step 1
      name: initialData?.name || '',
      age: age,
      gender: initialData?.gender || 'Man',
      pronouns: initialData?.pronouns || 'he/him',
      customPronouns: '',
      datingPreferenceGender: initialData?.datingPreferenceGender || 'Everyone',
      preferredMinAge: initialData?.preferredMinAge || Math.max(18, age - 3),
      preferredMaxAge: initialData?.preferredMaxAge || Math.min(80, age + 4),
      hometown: initialData?.hometown || 'San Francisco, CA',
      maxDistanceKm: initialData?.maxDistanceKm || 80,

      // Step 2: 1 to 6 photos with captions
      photos: initialData?.photos?.length ? initialData.photos : [
        {
          url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
          caption: "Primary Display Picture"
        }
      ],
      newPhotoUrl: '',

      // Step 3: Intent, Lifestyle & Personal Metrics
      bio: initialData?.bio || '',
      faith: initialData?.faith || 'Spiritual',
      connectionGoal: initialData?.connectionGoal || 'Long-term relationship',
      threeWords: initialData?.threeWords?.length === 3 
        ? initialData.threeWords 
        : ['Curious', 'Spontaneous', 'Caffeinated'],
      smoking: initialData?.smoking || 'Never',
      drinking: initialData?.drinking || 'Occasionally',
      heightCm: initialData?.heightCm || 178,
      weightKg: initialData?.weightKg || 70,
      occupationType: initialData?.occupationType || 'Job',
      workplaceOrCollege: initialData?.workplaceOrCollege || '',

      // Step 4: Interests
      interests: initialData?.interests || ['Bouldering', 'Indie Rock', 'Coding', 'Valorant'],

      // Step 5: Top Artists
      topArtists: initialData?.topArtists || ['Arctic Monkeys', 'Frank Ocean', 'Tame Impala']
    };
  });

  // State for Step 4 filter & search
  const [interestSearch, setInterestSearch] = useState('');
  const [selectedInterestCategory, setSelectedInterestCategory] = useState('All');

  // State for Step 5 artist search
  const [artistSearch, setArtistSearch] = useState('');
  const [activeArtistSlot, setActiveArtistSlot] = useState(0);

  // Auto-default logic: when user age changes, preset preferred age range
  const handleUserAgeChange = (newAge) => {
    const validAge = Math.min(80, Math.max(18, parseInt(newAge) || 18));
    const autoMin = Math.max(18, validAge - 3);
    const autoMax = Math.min(80, validAge + 4);

    setFormData(prev => ({
      ...prev,
      age: validAge,
      preferredMinAge: autoMin,
      preferredMaxAge: autoMax
    }));
  };

  // Step 1 Validation
  const validateStep1 = () => {
    if (!formData.name.trim()) return "Full Name is required.";
    if (!formData.age || formData.age < 18 || formData.age > 80) return "Valid age between 18 and 80 is required.";
    if (!formData.gender) return "Please choose your gender.";
    const activePronouns = formData.pronouns === 'custom' ? formData.customPronouns.trim() : formData.pronouns;
    if (!activePronouns) return "Please provide your pronouns.";
    if (!formData.datingPreferenceGender) return "Please select your dating preference.";
    if (!formData.hometown.trim()) return "Hometown city/location is required.";
    if (formData.preferredMinAge > formData.preferredMaxAge) {
      return "Preferred minimum age cannot exceed maximum age.";
    }
    return '';
  };

  // Step 2 Validation
  const validateStep2 = () => {
    if (!formData.photos || formData.photos.length === 0) {
      return "At least 1 photo is compulsory.";
    }
    return '';
  };

  // Step 3 Validation
  const validateStep3 = () => {
    if (!formData.bio.trim() || formData.bio.trim().length < 8) {
      return "Please write a short bio (at least 8 characters).";
    }
    if (!formData.faith) return "Please select your religion/faith.";
    if (!formData.connectionGoal) return "Please select your connection goal.";
    if (!formData.threeWords[0]?.trim() || !formData.threeWords[1]?.trim() || !formData.threeWords[2]?.trim()) {
      return "All 3 words describing yourself are compulsory.";
    }
    return '';
  };

  // Step 4 Validation
  const validateStep4 = () => {
    if (!formData.interests || formData.interests.length < 2) {
      return "Please select at least 2 interests.";
    }
    return '';
  };

  // Step 5 Validation
  const validateStep5 = () => {
    if (!formData.topArtists || formData.topArtists.length < 1) {
      return "Please choose at least 1 favorite artist.";
    }
    return '';
  };

  // Handle Next step
  const handleNext = () => {
    setValidationError('');
    let error = '';

    if (step === 1) error = validateStep1();
    else if (step === 2) error = validateStep2();
    else if (step === 3) error = validateStep3();
    else if (step === 4) error = validateStep4();
    else if (step === 5) error = validateStep5();

    if (error) {
      setValidationError(error);
      return;
    }

    if (step < 5) {
      setStep(prev => prev + 1);
    } else {
      handleFinalSubmission();
    }
  };

  const handleBack = () => {
    setValidationError('');
    if (step > 1) {
      setStep(prev => prev - 1);
    } else if (onCancel) {
      onCancel();
    }
  };

  // Photo handlers
  const handleAddPhotoUrl = (url) => {
    if (!url.trim()) return;
    if (formData.photos.length >= 6) {
      setValidationError("Maximum 6 photos allowed.");
      return;
    }
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, { url: url.trim(), caption: "" }],
      newPhotoUrl: ''
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (formData.photos.length >= 6) {
      setValidationError("Maximum 6 photos allowed.");
      return;
    }
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
    setFormData(prev => {
      const updated = prev.photos.filter((_, i) => i !== index);
      return { ...prev, photos: updated };
    });
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

  const handleMovePhoto = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= formData.photos.length) return;
    setFormData(prev => {
      const updated = [...prev.photos];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
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

  // Toggle Interest Chip
  const toggleInterest = (interestName) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interestName);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(i => i !== interestName) };
      } else {
        return { ...prev, interests: [...prev.interests, interestName] };
      }
    });
  };

  // Artist handlers
  const handleSelectArtist = (artistName) => {
    setFormData(prev => {
      const current = [...prev.topArtists];
      if (current.includes(artistName)) {
        return prev;
      }
      if (current.length < 4) {
        current.push(artistName);
      } else {
        current[activeArtistSlot] = artistName;
      }
      return { ...prev, topArtists: current };
    });
    setArtistSearch('');
  };

  const handleRemoveArtist = (index) => {
    setFormData(prev => ({
      ...prev,
      topArtists: prev.topArtists.filter((_, i) => i !== index)
    }));
  };

  // Final submission
  const handleFinalSubmission = () => {
    const activePronouns = formData.pronouns === 'custom' 
      ? formData.customPronouns 
      : formData.pronouns;

    const completeUser = {
      id: initialData?.id || `user-${Date.now()}`,
      name: formData.name.trim(),
      age: Number(formData.age),
      gender: formData.gender,
      pronouns: activePronouns,
      datingPreferenceGender: formData.datingPreferenceGender,
      preferredMinAge: Number(formData.preferredMinAge),
      preferredMaxAge: Number(formData.preferredMaxAge),
      hometown: formData.hometown.trim(),
      maxDistanceKm: Number(formData.maxDistanceKm),
      photos: formData.photos,
      photo: formData.photos[0]?.url || '',
      avatar: formData.photos[0]?.url || '',
      bio: formData.bio.trim(),
      faith: formData.faith,
      connectionGoal: formData.connectionGoal,
      threeWords: formData.threeWords,
      selfTraits: formData.threeWords,
      smoking: formData.smoking,
      drinking: formData.drinking,
      heightCm: Number(formData.heightCm) || null,
      weightKg: Number(formData.weightKg) || null,
      occupationType: formData.occupationType,
      workplaceOrCollege: formData.workplaceOrCollege.trim(),
      interests: formData.interests,
      topArtists: formData.topArtists,
      handle: `@${formData.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      online: true,
      onboardingComplete: true
    };

    // Confetti shower
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#FF3366', '#D946EF', '#10B981']
    });

    localStorage.setItem('pact_user', JSON.stringify(completeUser));
    onComplete(completeUser);
  };

  // Filtered artists for autocomplete
  const filteredArtists = artistSearch.trim()
    ? GLOBAL_ARTISTS.filter(a => 
        a.name.toLowerCase().includes(artistSearch.toLowerCase().trim())
      ).slice(0, 8)
    : [];

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center relative overflow-x-hidden bg-[#0B0A10] text-slate-100 selection:bg-rose-500 selection:text-white px-4 py-6 sm:py-8">
      {/* Vibrant Ambient Glows */}
      <div className="fixed top-10 left-1/4 w-[480px] h-[480px] bg-[#F59E0B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-10 right-1/4 w-[520px] h-[520px] bg-[#FF3366]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D946EF]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Top Header & Step Progress Bar */}
      <div className="w-full max-w-3xl z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/pact-logo.png" alt="Pact" className="w-9 h-9 object-contain" />
            <div>
              <span className="text-xl font-black tracking-wider text-white">PACT</span>
              <span className="ml-2 text-xs text-amber-400 font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                Onboarding Wizard
              </span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            Step {step} of 5
          </span>
        </div>

        {/* Progress Line */}
        <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
          <motion.div 
            className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500"
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        </div>

        {/* Step Titles Indicator */}
        <div className="hidden sm:grid grid-cols-5 text-center text-[11px] font-bold text-slate-400">
          <span className={step >= 1 ? "text-amber-400" : ""}>1. Demographics</span>
          <span className={step >= 2 ? "text-rose-400" : ""}>2. Visuals</span>
          <span className={step >= 3 ? "text-pink-400" : ""}>3. Intent & Bio</span>
          <span className={step >= 4 ? "text-fuchsia-400" : ""}>4. Interests (100+)</span>
          <span className={step >= 5 ? "text-emerald-400" : ""}>5. Top 4 Artists</span>
        </div>
      </div>

      {/* Main Glass Card Form Container */}
      <div className="w-full max-w-3xl my-6 z-10">
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-rose-950/30">
          
          {/* Validation Banner */}
          {validationError && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <Zap className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{validationError}</span>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: Core Identity & Demographics */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Tell us about your core vibe ✨
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Set up your basic identity, age, and dating search criteria.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                      <span>Full Name</span>
                      <span className="text-rose-400 font-mono text-[10px]">*Compulsory</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anant Baid"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors text-sm"
                    />
                  </div>

                  {/* Age (Slider + Numerical Input) with Auto-Default Trigger */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                      <span>Your Age</span>
                      <span className="text-amber-400 font-mono font-bold">{formData.age} years</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="18"
                        max="80"
                        value={formData.age}
                        onChange={(e) => handleUserAgeChange(e.target.value)}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                      <input
                        type="number"
                        min="18"
                        max="80"
                        value={formData.age}
                        onChange={(e) => handleUserAgeChange(e.target.value)}
                        className="w-16 px-2 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Auto-sets dating preference to {Math.max(18, formData.age - 3)}–{Math.min(80, formData.age + 4)} yrs
                    </span>
                  </div>
                </div>

                {/* Gender Chips */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>Your Gender</span>
                    <span className="text-rose-400 font-mono text-[10px]">*Compulsory</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Man", "Woman", "Non-binary"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: g })}
                        className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                          formData.gender === g
                            ? "bg-gradient-to-r from-amber-400/20 to-rose-500/20 border-rose-500 text-white shadow-lg shadow-rose-500/10"
                            : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pronouns */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>Pronouns</span>
                    <span className="text-rose-400 font-mono text-[10px]">*Compulsory</span>
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {["he/him", "she/her", "they/them", "custom"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setFormData({ ...formData, pronouns: p })}
                        className={`py-2 px-4 rounded-xl text-xs font-semibold border transition-all ${
                          formData.pronouns === p
                            ? "bg-rose-500/20 border-rose-500 text-rose-300"
                            : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                        }`}
                      >
                        {p === "custom" ? "Custom..." : p}
                      </button>
                    ))}
                  </div>
                  {formData.pronouns === "custom" && (
                    <input
                      type="text"
                      placeholder="e.g. ze/zir, any pronouns"
                      value={formData.customPronouns}
                      onChange={(e) => setFormData({ ...formData, customPronouns: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-rose-500 mt-2"
                    />
                  )}
                </div>

                {/* Dating Preference Gender */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>Interested In Dating</span>
                    <span className="text-rose-400 font-mono text-[10px]">*Compulsory</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Women", "Men", "Everyone"].map((pref) => (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => setFormData({ ...formData, datingPreferenceGender: pref })}
                        className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                          formData.datingPreferenceGender === pref
                            ? "bg-gradient-to-r from-rose-500/20 to-pink-500/20 border-rose-500 text-white shadow-lg shadow-rose-500/10"
                            : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dual-Thumb Preferred Partner Age Range Slider (18 to 80) */}
                <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                        Preferred Partner Age Range
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Strictly matches profiles inside this range
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 font-mono font-bold text-xs">
                      {formData.preferredMinAge} – {formData.preferredMaxAge} yrs
                    </span>
                  </div>

                  {/* Dual Sliders with responsive highlight track */}
                  <div className="space-y-3 pt-2">
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

                {/* Hometown & Search Radius */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                      <span>Hometown / City</span>
                      <span className="text-rose-400 font-mono text-[10px]">*Compulsory</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. San Francisco, CA"
                        value={formData.hometown}
                        onChange={(e) => setFormData({ ...formData, hometown: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                      <span>Match Distance Radius</span>
                      <span className="text-amber-400 font-mono font-bold">{formData.maxDistanceKm} km</span>
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
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>5 km (Local)</span>
                      <span>500 km</span>
                      <span>1,000 km (Global)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Photos & Visual Curation (1 to 6 Photos) */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Visual Curation (1 to 6 Photos) 📸
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Slot 1 is your <span className="text-amber-400 font-bold">Primary DP</span>. Add captions to slots 2–6 to highlight your favorite memories!
                  </p>
                </div>

                {/* Add Photo Input Area */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="url"
                      placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
                      value={formData.newPhotoUrl}
                      onChange={(e) => setFormData({ ...formData, newPhotoUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-rose-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddPhotoUrl(formData.newPhotoUrl)}
                      className="w-full sm:w-auto shrink-0 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-rose-500/20"
                    >
                      <Plus className="w-4 h-4" /> Add URL
                    </button>
                    <label className="w-full sm:w-auto shrink-0 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors border border-white/10">
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>Upload File</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>

                  {/* One-click Demo Sample Photos */}
                  <div className="pt-2">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-2">
                      Or pick sample test portraits:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {SAMPLE_PHOTOS.map((sampleUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAddPhotoUrl(sampleUrl)}
                          className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 hover:scale-110 hover:border-amber-400 transition-all shrink-0"
                          title="Click to add photo"
                        >
                          <img src={sampleUrl} alt="sample" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 6 Grid Slots Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.photos.map((photo, index) => {
                    const isDP = index === 0;
                    return (
                      <div
                        key={index}
                        className={`relative rounded-2xl overflow-hidden border flex flex-col transition-all bg-slate-900/60 ${
                          isDP 
                            ? "border-amber-400/80 shadow-xl shadow-amber-500/15 ring-2 ring-amber-400/30" 
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        {/* Image Preview */}
                        <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                          <img
                            src={photo.url}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
                            }}
                          />
                          {/* DP Badge */}
                          {isDP ? (
                            <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] tracking-wide flex items-center gap-1 shadow-lg shadow-amber-400/50">
                              <Star className="w-3 h-3 fill-slate-950" /> Primary DP
                            </span>
                          ) : (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[10px]">
                              Slot #{index + 1}
                            </span>
                          )}

                          {/* Top Right Remove Button */}
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
                            className="absolute top-2 right-2 p-1.5 rounded-xl bg-black/60 hover:bg-rose-500 text-white backdrop-blur-md transition-colors"
                            title="Remove photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Controls & Editable Caption */}
                        <div className="p-3 flex-1 flex flex-col justify-between gap-2 bg-[#12111E]">
                          {!isDP ? (
                            <input
                              type="text"
                              placeholder="Add photo caption..."
                              value={photo.caption || ''}
                              onChange={(e) => handleCaptionChange(index, e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-rose-400"
                            />
                          ) : (
                            <span className="text-[11px] text-amber-300 font-medium italic">
                              Main display picture shown to everyone
                            </span>
                          )}

                          {/* Action Toolbar */}
                          <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px]">
                            {!isDP && (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryDP(index)}
                                className="text-amber-400 hover:text-amber-300 font-bold transition-colors"
                              >
                                Set as DP
                              </button>
                            )}

                            <div className="flex items-center gap-1 ml-auto">
                              <button
                                type="button"
                                disabled={index === 0}
                                onClick={() => handleMovePhoto(index, -1)}
                                className={`p-1 rounded-lg ${index === 0 ? "text-slate-600" : "text-slate-300 hover:bg-white/10"}`}
                                title="Move Left"
                              >
                                <MoveLeft className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={index === formData.photos.length - 1}
                                onClick={() => handleMovePhoto(index, 1)}
                                className={`p-1 rounded-lg ${index === formData.photos.length - 1 ? "text-slate-600" : "text-slate-300 hover:bg-white/10"}`}
                                title="Move Right"
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

                <div className="text-center text-xs text-slate-400">
                  {formData.photos.length} of 6 slots filled • Minimum 1 photo required.
                </div>
              </motion.div>
            )}

            {/* STEP 3: Intent, Lifestyle & Personal Metrics */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Intent, Lifestyle & Traits 🎯
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Authentic details make for memorable conversations and high-compatibility matches.
                  </p>
                </div>

                {/* Short Bio with Character Count */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                    <span>Short Bio</span>
                    <span className="text-rose-400 font-mono text-[10px]">
                      {formData.bio.length} / 250 characters
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={250}
                    placeholder="Tell us what excites you, what weird rabbit holes you explore, or what your ideal Sunday looks like..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors text-sm"
                  />
                </div>

                {/* Religion / Faith */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>Religion / Faith</span>
                    <span className="text-rose-400 font-mono text-[10px]">*Compulsory</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {FAITH_OPTIONS.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFormData({ ...formData, faith: f })}
                        className={`py-2 px-3.5 rounded-xl text-xs font-semibold border transition-all ${
                          formData.faith === f
                            ? "bg-rose-500/20 border-rose-500 text-rose-300 shadow-md shadow-rose-500/10"
                            : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Connection Goal */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>Connection Goal</span>
                    <span className="text-rose-400 font-mono text-[10px]">*Compulsory</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {CONNECTION_GOALS.map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setFormData({ ...formData, connectionGoal: goal })}
                        className={`p-3 rounded-2xl text-xs sm:text-sm font-bold border text-left transition-all ${
                          formData.connectionGoal === goal
                            ? "bg-gradient-to-r from-rose-500/20 to-pink-500/20 border-rose-500 text-white shadow-lg shadow-rose-500/10"
                            : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Describe Yourself in Exactly 3 Words (Row of 3 inputs) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>Describe Yourself in 3 Words</span>
                    <span className="text-rose-400 font-mono text-[10px]">*Compulsory (1 word each)</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[0, 1, 2].map((idx) => (
                      <input
                        key={idx}
                        type="text"
                        placeholder={idx === 0 ? "e.g. Curious" : idx === 1 ? "Spontaneous" : "Caffeinated"}
                        value={formData.threeWords[idx] || ''}
                        onChange={(e) => {
                          const updated = [...formData.threeWords];
                          updated[idx] = e.target.value.trim().split(' ')[0] || '';
                          setFormData({ ...formData, threeWords: updated });
                        }}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-center text-xs sm:text-sm font-semibold focus:outline-none focus:border-rose-500"
                      />
                    ))}
                  </div>
                </div>

                {/* Lifestyle Habits (Smoking & Drinking - Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Smoking <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {HABIT_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({ ...formData, smoking: opt })}
                          className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                            formData.smoking === opt
                              ? "bg-amber-400/20 border-amber-400 text-amber-300"
                              : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Drinking <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {HABIT_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({ ...formData, drinking: opt })}
                          className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                            formData.drinking === opt
                              ? "bg-amber-400/20 border-amber-400 text-amber-300"
                              : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Physical Metrics & Career (Optional, skippable) */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Physical Metrics & Career <span className="text-slate-500 font-normal">(Optional)</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] text-slate-400">Height (cm)</span>
                      <input
                        type="number"
                        placeholder="175"
                        value={formData.heightCm || ''}
                        onChange={(e) => setFormData({ ...formData, heightCm: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] text-slate-400">Weight (kg)</span>
                      <input
                        type="number"
                        placeholder="68"
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
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none"
                      >
                        <option value="Student">Student</option>
                        <option value="Job">Job / Employed</option>
                        <option value="Business">Business / Founder</option>
                        <option value="Self-employed">Self-employed / Freelance</option>
                      </select>
                    </div>
                  </div>

                  {/* Conditional Workplace / College Name Input */}
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
                      placeholder={formData.occupationType === 'Student' ? "e.g. Stanford University" : "e.g. Figma / Stripe"}
                      value={formData.workplaceOrCollege}
                      onChange={(e) => setFormData({ ...formData, workplaceOrCollege: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: 100+ Categorized Region of Interests (Compulsory at least 2) */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      100+ Interest Cloud ⚡
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                      Choose at least <span className="text-rose-400 font-bold">2 interests</span> that ignite spark for you.
                    </p>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono font-bold text-xs self-start sm:self-auto">
                    {formData.interests.length} selected (min 2)
                  </span>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search over 100+ interests (e.g. 'valorant', 'synth', 'boulder', 'ghibli')..."
                    value={interestSearch}
                    onChange={(e) => setInterestSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors text-xs sm:text-sm"
                  />
                </div>

                {/* Category Filter Tabs */}
                <div className="flex flex-wrap gap-1.5">
                  {["All", ...Object.keys(CATEGORIZED_INTERESTS)].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedInterestCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedInterestCategory === cat
                          ? "bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-400/20"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Categorized Cloud List */}
                <div className="space-y-5 max-h-[360px] overflow-y-auto pr-1">
                  {Object.entries(CATEGORIZED_INTERESTS).map(([category, items]) => {
                    if (selectedInterestCategory !== "All" && selectedInterestCategory !== category) {
                      return null;
                    }

                    const filteredItems = items.filter(i => 
                      !interestSearch || i.toLowerCase().includes(interestSearch.toLowerCase())
                    );

                    if (filteredItems.length === 0) return null;

                    return (
                      <div key={category} className="space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          {category} ({filteredItems.length})
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {filteredItems.map((item) => {
                            const isSelected = formData.interests.includes(item);
                            return (
                              <button
                                key={item}
                                type="button"
                                onClick={() => toggleInterest(item)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                                  isSelected
                                    ? "bg-gradient-to-r from-amber-400 to-rose-500 text-white font-bold border-transparent shadow-md shadow-rose-500/25 scale-[1.03]"
                                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                <span>{item}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 5: Top 4 Global Artists Autocomplete (Compulsory at least 1) */}
            {step === 5 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Top 4 Musical Pillars 🎧
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Musical taste reveals true social frequency. Pick 1 to 4 artists from over 150+ global creators.
                  </p>
                </div>

                {/* 4 Designated Artist Cards/Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[0, 1, 2, 3].map((slotIdx) => {
                    const artistName = formData.topArtists[slotIdx];
                    const isActive = activeArtistSlot === slotIdx;
                    return (
                      <div
                        key={slotIdx}
                        onClick={() => setActiveArtistSlot(slotIdx)}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                          artistName
                            ? "bg-gradient-to-b from-rose-500/15 to-pink-500/10 border-rose-500/40 shadow-lg shadow-rose-500/10"
                            : isActive
                            ? "bg-white/10 border-amber-400 ring-2 ring-amber-400/20"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>Slot #{slotIdx + 1}</span>
                          {artistName && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveArtist(slotIdx);
                              }}
                              className="text-slate-400 hover:text-rose-400 p-0.5"
                            >
                              ✕
                            </button>
                          )}
                        </div>

                        {artistName ? (
                          <div className="my-auto py-1 flex flex-col items-center">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-md shadow-amber-400/20 mb-1.5 shrink-0">
                              <img
                                src={GLOBAL_ARTISTS.find(a => a.name.toLowerCase() === artistName.toLowerCase())?.avatar || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80"}
                                alt={artistName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80";
                                }}
                              />
                            </div>
                            <span className="text-xs font-bold text-white block line-clamp-1 leading-tight">
                              {artistName}
                            </span>
                          </div>
                        ) : (
                          <div className="my-auto py-1 text-slate-500">
                            <Plus className="w-5 h-5 mx-auto mb-1 opacity-50" />
                            <span className="text-[11px] block">
                              {isActive ? "Search below..." : "Click to set"}
                            </span>
                          </div>
                        )}

                        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500">
                          {artistName ? "Selected" : "Empty"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Instant Prefix Search Autocomplete Input */}
                <div className="space-y-2 pt-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Type any artist name (e.g. 'Michael Jackson', 'Arctic', 'Frank', 'The Weeknd')..."
                      value={artistSearch}
                      onChange={(e) => setArtistSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 text-xs sm:text-sm"
                    />
                  </div>

                  {/* Autocomplete Dropdown List with Visual Avatars */}
                  {filteredArtists.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2 rounded-2xl bg-[#141220] border border-white/15 shadow-2xl space-y-1 max-h-56 overflow-y-auto"
                    >
                      {filteredArtists.map((artist) => (
                        <button
                          key={artist.name}
                          type="button"
                          onClick={() => handleSelectArtist(artist.name)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-white/10 transition-colors group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={artist.avatar}
                              alt={artist.name}
                              className="w-8 h-8 rounded-full object-cover border border-amber-400/50 shrink-0 group-hover:scale-105 transition-transform"
                            />
                            <div className="truncate">
                              <span className="text-xs sm:text-sm font-bold text-white block truncate">
                                {artist.name}
                              </span>
                              <span className="text-[10px] text-slate-400 block font-mono">
                                {artist.genre}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] text-amber-300 font-bold px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 shrink-0">
                            Select
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {/* Quick Pick Trending Artists (Featuring Michael Jackson!) */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Popular Global Picks:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {["Michael Jackson", "The Weeknd", "Arctic Monkeys", "Frank Ocean", "Tame Impala", "Charli XCX", "Kendrick Lamar", "Billie Eilish", "Daft Punk", "Lana Del Rey"].map((quick) => (
                        <button
                          key={quick}
                          type="button"
                          onClick={() => handleSelectArtist(quick)}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/10 hover:border-amber-400 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
                        >
                          <span>+</span>
                          <span>{quick}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Action Footer (Back & Next Buttons) */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{step === 1 ? "Cancel / Sign In" : "Back"}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-7 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-lg shadow-rose-500/25 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>{step === 5 ? "Complete & Launch Pact ⚡" : "Continue"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Safety & Compliance Badge */}
      <div className="z-10 text-center text-xs text-slate-500 flex items-center gap-2 font-mono">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Pact 18+ Encrypted & Verified Matching Protocol</span>
      </div>
    </div>
  );
}
