
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smile, Dog, Plus, Wand2, User } from 'lucide-react';

interface BottomNavProps {
  active: 'human' | 'pets' | 'explore' | 'profile';
}

const BottomNav: React.FC<BottomNavProps> = ({ active }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-background-light/90 dark:bg-background-dark/95 backdrop-blur-xl border-t border-black/5 dark:border-white/10 px-6 py-4 pb-8 z-50">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <button onClick={() => navigate('/results')} className={`flex flex-col items-center gap-1 ${active === 'human' ? 'text-primary' : 'text-gray-400'}`}>
          <Smile size={24} />
          <span className="text-[10px] font-bold uppercase">Human</span>
        </button>
        <button onClick={() => navigate('/scan')} className={`flex flex-col items-center gap-1 ${active === 'pets' ? 'text-primary' : 'text-gray-400'}`}>
          <Dog size={24} />
          <span className="text-[10px] font-bold uppercase">Pets</span>
        </button>
        <div 
          onClick={() => navigate('/scan')}
          className="h-12 w-12 bg-primary rounded-full flex items-center justify-center -translate-y-6 border-[6px] border-background-light dark:border-background-dark shadow-xl cursor-pointer"
        >
          <Plus className="text-black" size={24} strokeWidth={3} />
        </div>
        <button onClick={() => navigate('/explore')} className={`flex flex-col items-center gap-1 ${active === 'explore' ? 'text-primary' : 'text-gray-400'}`}>
          <Wand2 size={24} />
          <span className="text-[10px] font-bold uppercase">Tools</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <User size={24} />
          <span className="text-[10px] font-bold uppercase">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
