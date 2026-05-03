
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, Download, RefreshCcw, Info, Heart, ThumbsUp, ThumbsDown, Send, X } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { GenerationResult, UserPreference, FavoriteItem } from '../types';

interface ResultsProps {
  results: GenerationResult[];
  capturedImage: string | null;
  prefs: UserPreference;
}

const ResultsScreen: React.FC<ResultsProps> = ({ results, capturedImage, prefs }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const currentResult = results && results.length > 0 ? results[currentIndex] : null;

  const handleSave = () => {
    if (!currentResult) return;
    
    const favorite: FavoriteItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      styleName: currentResult.styleName,
      description: currentResult.description,
      originalImage: capturedImage,
      generatedImage: currentResult.imageUrl,
      vibe: prefs.vibe,
      species: prefs.species
    };

    const saved = localStorage.getItem('nano_banana_favorites');
    const favorites = saved ? JSON.parse(saved) : [];
    localStorage.setItem('nano_banana_favorites', JSON.stringify([...favorites, favorite]));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const submitFeedback = () => {
    console.log("Feedback submitted:", { type: feedbackType, text: feedbackText, style: currentResult?.styleName });
    setShowFeedback(false);
    setFeedbackText('');
    setFeedbackType(null);
    alert("Thanks for your peeling feedback! 🍌");
  };

  if (!results || results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-background-dark">
        <RefreshCcw size={48} className="text-gray-500 mb-4 animate-spin" />
        <h2 className="text-white text-xl font-bold mb-2">No results found</h2>
        <button onClick={() => navigate('/scan')} className="text-primary font-bold underline">Try scanning again</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-32 bg-background-light dark:bg-background-dark relative">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/scan')} className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10">
            <ChevronLeft size={20} className="text-black dark:text-white" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xs font-bold uppercase tracking-widest text-primary leading-none">Nano Banana</h1>
            <span className="text-[10px] text-gray-500 font-bold uppercase mt-1">Result {currentIndex + 1} of {results.length}</span>
          </div>
        </div>
        <button onClick={handleSave} className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isSaved ? 'bg-primary' : 'bg-black/5 dark:bg-white/10'}`}>
          <Heart size={20} className={isSaved ? 'text-background-dark fill-background-dark' : 'text-black dark:text-white'} />
        </button>
      </div>

      <div className="flex flex-col flex-1">
        {/* Image Carousel Area */}
        <div className="relative aspect-square w-full bg-black">
          {currentResult && (
            <img 
              src={currentResult.imageUrl} 
              alt="AI Visualization" 
              className="w-full h-full object-cover animate-in fade-in duration-500"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 bg-primary px-3 py-1.5 rounded-full shadow-lg">
              <Sparkles size={14} className="text-black" />
              <span className="text-black text-[10px] font-bold uppercase tracking-tighter">AI Visualized</span>
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {results.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentIndex ? 'w-4 bg-primary' : 'w-1.5 bg-white/40'}`}></div>
            ))}
          </div>

          {/* Nav Controls */}
          {results.length > 1 && (
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
              <button 
                onClick={() => setCurrentIndex(prev => (prev > 0 ? prev - 1 : results.length - 1))}
                className="size-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center pointer-events-auto active:scale-90 border border-white/10"
              >
                <ChevronLeft size={24} className="text-white" />
              </button>
              <button 
                onClick={() => setCurrentIndex(prev => (prev < results.length - 1 ? prev + 1 : 0))}
                className="size-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center pointer-events-auto active:scale-90 border border-white/10"
              >
                <ChevronLeft size={24} className="text-white rotate-180" />
              </button>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="px-6 py-8">
          <h3 className="text-black dark:text-white text-2xl font-bold leading-tight mb-2">
            {currentResult?.styleName || 'Stylish Look'}
          </h3>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed italic">
            "{currentResult?.description || 'Your perfect new look.'}"
          </p>
          
          <div className="flex gap-3 mb-8">
            <button className="flex-1 bg-primary text-black font-bold px-4 py-4 rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-primary/20">
              <Download size={20} /> Download
            </button>
            <button 
              onClick={() => navigate('/scan')}
              className="px-6 bg-gray-100 dark:bg-surface-dark text-black dark:text-white font-bold rounded-2xl flex items-center justify-center transition-transform active:scale-95 border border-gray-200 dark:border-white/5"
            >
              <RefreshCcw size={20} />
            </button>
          </div>

          {/* Feedback & Info */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-surface-dark/5 dark:bg-surface-dark/40 border border-black/5 dark:border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Info className="text-primary" size={20} />
                  </div>
                  <h4 className="text-black dark:text-white font-bold text-sm">Style Profile</h4>
                </div>
                <button 
                  onClick={() => setShowFeedback(true)}
                  className="text-[10px] uppercase font-bold text-primary tracking-widest border border-primary/30 px-3 py-1 rounded-full"
                >
                  Feedback
                </button>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                This {prefs.vibe} look was tailored for a {prefs.species.toLowerCase()} {prefs.gender !== 'Neutral' ? `(${prefs.gender.toLowerCase()})` : ''}.
                The visualization maintain your likeness while exploring professional style possibilities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal Overlay */}
      {showFeedback && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-[400px] mb-20 bg-white dark:bg-surface-dark rounded-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-black dark:text-white">Help us improve</h3>
              <X className="text-gray-400 cursor-pointer" onClick={() => setShowFeedback(false)} />
            </div>
            
            <p className="text-sm text-gray-500 mb-6">How was this AI generation? Your feedback helps us stay fresh!</p>
            
            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setFeedbackType('positive')}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${feedbackType === 'positive' ? 'border-primary bg-primary/10' : 'border-gray-100 dark:border-white/5'}`}
              >
                <ThumbsUp className={feedbackType === 'positive' ? 'text-primary' : 'text-gray-400'} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${feedbackType === 'positive' ? 'text-primary' : 'text-gray-400'}`}>Spot On</span>
              </button>
              <button 
                onClick={() => setFeedbackType('negative')}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${feedbackType === 'negative' ? 'border-red-500 bg-red-500/10' : 'border-gray-100 dark:border-white/5'}`}
              >
                <ThumbsDown className={feedbackType === 'negative' ? 'text-red-500' : 'text-gray-400'} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${feedbackType === 'negative' ? 'text-red-500' : 'text-gray-400'}`}>Not Quite</span>
              </button>
            </div>

            <textarea 
              placeholder="Any specifics? (style, accuracy, etc...)"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full bg-gray-50 dark:bg-background-dark/50 p-4 rounded-2xl border-2 border-gray-100 dark:border-white/5 outline-none focus:border-primary text-sm text-black dark:text-white mb-6"
              rows={3}
            />

            <button 
              disabled={!feedbackType}
              onClick={submitFeedback}
              className="w-full h-14 bg-primary text-background-dark font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send size={18} /> Submit Feedback
            </button>
          </div>
        </div>
      )}

      <BottomNav active={prefs.species === 'Pet' ? 'pets' : 'human'} />
    </div>
  );
};

export default ResultsScreen;
