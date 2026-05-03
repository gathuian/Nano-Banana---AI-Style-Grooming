
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, Download, RefreshCcw, Info } from 'lucide-react';
import BottomNav from '../components/BottomNav';

interface ResultsProps {
  results: any;
  capturedImage: string | null;
}

const ResultsScreen: React.FC<ResultsProps> = ({ results, capturedImage }) => {
  const navigate = useNavigate();
  // results is now the GenerationResult object from geminiService
  const generatedImage = results?.imageUrl;
  const styleName = results?.styleName || 'Custom AI Look';

  return (
    <div className="flex flex-col min-h-screen pb-32 bg-background-light dark:bg-background-dark">
      <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/scan')} className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10">
            <ChevronLeft size={20} className="text-black dark:text-white" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xs font-bold uppercase tracking-widest text-primary">Nano Banana</h1>
            <h2 className="text-lg font-bold text-black dark:text-white tracking-tight">AI Generation</h2>
          </div>
        </div>
      </div>

      <main className="px-4 py-4 space-y-6">
        <div className="relative group overflow-hidden rounded-2xl shadow-2xl bg-surface-dark/10 border border-white/5">
          <div className="relative aspect-square">
            <img 
              src={generatedImage || 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=800'} 
              className="w-full h-full object-cover"
              alt="Generated Look"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-primary px-3 py-1.5 rounded-full shadow-lg">
                <Sparkles size={14} className="text-black" />
                <span className="text-black text-xs font-bold uppercase tracking-tighter">AI Visualized</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-white text-2xl font-bold leading-tight mb-4">{styleName}</h3>
              <div className="flex gap-3">
                <button className="flex-1 bg-primary text-black font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95">
                  <Download size={20} /> Save
                </button>
                <button 
                  onClick={() => navigate('/scan')}
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <RefreshCcw size={20} /> Retry
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-dark/40 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Info className="text-primary" size={20} />
            </div>
            <h4 className="text-white font-bold">About this generation</h4>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            {results?.description || "This look was generated using the Nano Banana Pro model, maintaining your facial features while applying style transformations."}
          </p>
        </div>
      </main>

      <BottomNav active="human" />
    </div>
  );
};

export default ResultsScreen;
