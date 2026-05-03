
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Sparkles, ArrowRight } from 'lucide-react';

const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center p-6 pb-2 justify-between">
        <div className="text-primary flex size-12 shrink-0 items-center justify-start">
          <Info size={32} />
        </div>
        <h2 className="text-black dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">Nano Banana</h2>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75"></div>
            <div 
              className="relative w-full aspect-square bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center overflow-hidden bg-primary/10 rounded-full border-4 border-primary/20 banana-glow" 
              style={{backgroundImage: 'url("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600")'}}
            >
              <div className="bg-background-dark/60 p-6 rounded-full backdrop-blur-md">
                <Sparkles className="text-primary" size={64} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-10 space-y-2">
          <h1 className="text-black dark:text-white tracking-tight text-[40px] font-bold leading-[1.1] text-center">
            Welcome to <span className="text-primary">Nano Banana</span>
          </h1>
          <p className="text-black dark:text-white text-xl font-medium leading-normal text-center pt-2">
            Your Style, Peeled to Perfection
          </p>
          <p className="text-gray-500 dark:text-[#bab59c] text-base font-normal leading-relaxed text-center px-4">
            AI-powered grooming analysis for humans and their furry companions.
          </p>
        </div>
      </div>
      <div className="p-6 space-y-6 pb-10">
        <div className="flex justify-center gap-2 mb-4">
          <div className="h-2 w-8 rounded-full bg-primary"></div>
          <div className="h-2 w-2 rounded-full bg-primary/20"></div>
          <div className="h-2 w-2 rounded-full bg-primary/20"></div>
        </div>
        <button 
          onClick={() => navigate('/quiz')}
          className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold text-lg py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          Get Started
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
