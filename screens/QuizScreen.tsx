
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Dog, Check, Zap, Gem, Leaf, PartyPopper, ArrowRight } from 'lucide-react';

interface QuizProps {
  onSelectVibe: (vibe: string) => void;
  currentVibe: string;
}

const QuizScreen: React.FC<QuizProps> = ({ onSelectVibe, currentVibe }) => {
  const navigate = useNavigate();

  const options = [
    { id: 'bold', label: 'Bold & Edgy', icon: Zap, img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400' },
    { id: 'classic', label: 'Classic & Elegant', icon: Gem, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
    { id: 'natural', label: 'Natural & Soft', icon: Leaf, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' },
    { id: 'fun', label: 'Fun & Quirky', icon: PartyPopper, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center p-4 justify-between sticky top-0 z-10 bg-background-light dark:bg-background-dark">
        <button onClick={() => navigate('/')} className="text-black dark:text-white flex size-12 items-center justify-start">
          <ChevronLeft />
        </button>
        <h2 className="text-black dark:text-white text-lg font-bold flex-1 text-center">Personality Quiz</h2>
        <div className="size-12 flex items-center justify-end text-primary">
          <Dog />
        </div>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between items-end">
          <p className="text-black dark:text-white text-base font-medium">Step 3 of 10</p>
          <p className="text-gray-500 text-sm">30% Complete</p>
        </div>
        <div className="rounded-full bg-gray-200 dark:bg-[#54503b] h-2 w-full overflow-hidden">
          <div className="h-full bg-primary" style={{width: '30%'}}></div>
        </div>
      </div>
      <div className="px-4 pt-6 pb-2">
        <h2 className="text-black dark:text-white text-[32px] font-bold leading-tight">
          How would you describe your vibe?
        </h2>
        <p className="text-gray-500 mt-2 text-base">Tailor styles to your unique personality.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4 mb-24">
        {options.map((opt) => {
          const Icon = opt.icon;
          return (
            <div 
              key={opt.id}
              onClick={() => onSelectVibe(opt.id)}
              className={`relative group cursor-pointer transition-all rounded-xl overflow-hidden aspect-[3/4] flex flex-col justify-end p-4 bg-cover bg-center border-2 ${currentVibe === opt.id ? 'border-primary bg-primary/10' : 'border-transparent'}`}
              style={{backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 60%), url('${opt.img}')`}}
            >
              {currentVibe === opt.id && (
                <div className="absolute top-3 right-3 bg-primary rounded-full p-1">
                  <Check className="text-background-dark" size={12} strokeWidth={4} />
                </div>
              )}
              <div className="mb-2">
                <Icon className="text-primary" size={32} />
              </div>
              <p className="text-white text-lg font-bold leading-tight">{opt.label}</p>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-gradient-to-t from-background-light dark:from-background-dark px-4 py-6">
        <button 
          onClick={() => navigate('/scan')}
          className="flex w-full items-center justify-center rounded-xl h-14 bg-primary text-background-dark text-lg font-bold shadow-lg"
        >
          <span>Continue</span>
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;
