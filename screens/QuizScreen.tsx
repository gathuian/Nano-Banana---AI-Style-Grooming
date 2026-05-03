
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Dog, Check, Zap, Gem, Leaf, PartyPopper, ArrowRight, User, Sparkles } from 'lucide-react';
import { UserPreference, VibeType, SpeciesType, GenderType } from '../types';

interface QuizProps {
  onUpdatePrefs: (prefs: Partial<UserPreference>) => void;
  currentPrefs: UserPreference;
}

const QuizScreen: React.FC<QuizProps> = ({ onUpdatePrefs, currentPrefs }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const vibes: { id: VibeType; label: string; icon: any; img: string; petLabel?: string }[] = [
    { id: 'bold', label: 'Bold & Edgy', icon: Zap, img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400', petLabel: 'Fierce & Wild' },
    { id: 'classic', label: 'Classic & Elegant', icon: Gem, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', petLabel: 'Posh & Polished' },
    { id: 'natural', label: 'Natural & Soft', icon: Leaf, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', petLabel: 'Sweet & Simple' },
    { id: 'fun', label: 'Fun & Quirky', icon: PartyPopper, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', petLabel: 'Playful & Bright' },
    { id: 'wild', label: 'Wild & Adventurous', icon: Sparkles, img: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&q=80&w=400', petLabel: 'Exotic & Brave' }
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/scan');
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center p-4 justify-between sticky top-0 z-10 bg-background-light dark:bg-background-dark">
        <button onClick={handleBack} className="text-black dark:text-white flex size-12 items-center justify-start">
          <ChevronLeft />
        </button>
        <h2 className="text-black dark:text-white text-lg font-bold flex-1 text-center">Style Quiz</h2>
        <div className="size-12 flex items-center justify-end text-primary">
          {currentPrefs.species === 'Pet' ? <Dog /> : <User />}
        </div>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between items-end">
          <p className="text-black dark:text-white text-base font-medium">Step {step} of 3</p>
          <p className="text-gray-500 text-sm">{Math.round((step / 3) * 100)}% Complete</p>
        </div>
        <div className="rounded-full bg-gray-200 dark:bg-[#54503b] h-2 w-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{width: `${(step / 3) * 100}%`}}></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 pb-2">
        {step === 1 && (
          <>
            <h2 className="text-black dark:text-white text-[32px] font-bold leading-tight">Who are we styling?</h2>
            <div className="grid grid-cols-1 gap-4 mt-8">
              {(['Human', 'Pet'] as SpeciesType[]).map(s => (
                <button
                  key={s}
                  onClick={() => onUpdatePrefs({ species: s })}
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${currentPrefs.species === s ? 'border-primary bg-primary/10' : 'border-gray-200 dark:border-white/10'}`}
                >
                  <div className="flex items-center gap-4">
                    {s === 'Human' ? <User size={32} className="text-primary" /> : <Dog size={32} className="text-primary" />}
                    <span className="text-xl font-bold text-black dark:text-white">{s}</span>
                  </div>
                  {currentPrefs.species === s && <Check className="text-primary" />}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && currentPrefs.species === 'Human' && (
          <>
            <h2 className="text-black dark:text-white text-[32px] font-bold leading-tight">Select your style preference</h2>
            <div className="grid grid-cols-1 gap-4 mt-8">
              {(['Female', 'Male', 'Neutral'] as GenderType[]).map(g => (
                <button
                  key={g}
                  onClick={() => onUpdatePrefs({ gender: g })}
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${currentPrefs.gender === g ? 'border-primary bg-primary/10' : 'border-gray-200 dark:border-white/10'}`}
                >
                  <span className="text-xl font-bold text-black dark:text-white">{g} Styles</span>
                  {currentPrefs.gender === g && <Check className="text-primary" />}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && currentPrefs.species === 'Pet' && (
          <>
            <h2 className="text-black dark:text-white text-[32px] font-bold leading-tight">Tell us about your pet</h2>
            <div className="flex flex-col gap-6 mt-8">
              <div>
                <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Breed (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Golden Retriever"
                  value={currentPrefs.breed || ''}
                  onChange={(e) => onUpdatePrefs({ breed: e.target.value })}
                  className="w-full bg-white dark:bg-surface-dark border-2 border-gray-200 dark:border-white/10 rounded-xl px-4 py-4 text-black dark:text-white focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Fur Type</label>
                <select
                  value={currentPrefs.furType || ''}
                  onChange={(e) => onUpdatePrefs({ furType: e.target.value })}
                  className="w-full bg-white dark:bg-surface-dark border-2 border-gray-200 dark:border-white/10 rounded-xl px-4 py-4 text-black dark:text-white focus:border-primary outline-none"
                >
                  <option value="">Select Fur Type</option>
                  <option value="Short">Short & Smooth</option>
                  <option value="Long">Long & Silky</option>
                  <option value="Curly">Curly & Thick</option>
                  <option value="Wiry">Wiry & Rough</option>
                </select>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-black dark:text-white text-[32px] font-bold leading-tight">Choose your vibe</h2>
            <div className="grid grid-cols-2 gap-4 mt-6 mb-24">
              {vibes.map((opt) => {
                const Icon = opt.icon;
                return (
                  <div 
                    key={opt.id}
                    onClick={() => onUpdatePrefs({ vibe: opt.id })}
                    className={`relative group cursor-pointer transition-all rounded-xl overflow-hidden aspect-[3/4] flex flex-col justify-end p-4 bg-cover bg-center border-2 ${currentPrefs.vibe === opt.id ? 'border-primary bg-primary/10' : 'border-transparent'}`}
                    style={{backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 60%), url('${opt.img}')`}}
                  >
                    {currentPrefs.vibe === opt.id && (
                      <div className="absolute top-3 right-3 bg-primary rounded-full p-1">
                        <Check className="text-background-dark" size={12} strokeWidth={4} />
                      </div>
                    )}
                    <div className="mb-2">
                      <Icon className="text-primary" size={32} />
                    </div>
                    <p className="text-white text-lg font-bold leading-tight">
                      {currentPrefs.species === 'Pet' ? opt.petLabel : opt.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-gradient-to-t from-background-light dark:from-background-dark px-4 py-6 z-20">
        <button 
          onClick={handleNext}
          className="flex w-full items-center justify-center rounded-xl h-14 bg-primary text-background-dark text-lg font-bold shadow-lg"
        >
          <span>{step === 3 ? 'Start Styling' : 'Continue'}</span>
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;
