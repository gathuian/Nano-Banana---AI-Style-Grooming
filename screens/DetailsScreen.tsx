
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, Share2, Wrench, Calendar } from 'lucide-react';

const DetailsScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen pb-24">
      <nav className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate('/results')} className="text-black dark:text-white flex items-center gap-4">
          <ChevronLeft />
          <h2 className="text-xl font-bold">Details</h2>
        </button>
      </nav>
      
      <main className="px-4">
        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-center bg-cover" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=800")'}}>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
        </div>
        
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-black dark:text-white">Neon Textured Crop</h1>
          <p className="text-gray-500 mt-1">Experimental Series • Style #402</p>
          
          <div className="flex gap-4 mt-6">
            <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-background-dark py-3 rounded-xl font-bold">
              <Heart size={20} /> Save
            </button>
            <button className="bg-gray-200 dark:bg-surface-dark text-white p-3 rounded-xl border border-white/10">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold flex items-center gap-2 text-black dark:text-white">
                <Wrench className="text-primary" size={20} /> Maintenance
              </h3>
              <span className="text-primary font-bold">Medium</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-surface-dark h-3 rounded-full overflow-hidden flex">
              <div className="h-full bg-primary w-2/3"></div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-black dark:text-white mb-3">Best For</h3>
            <div className="flex flex-wrap gap-2">
              {['Heart-shaped Faces', 'Medium Hair', 'High Cheekbones'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-200 dark:bg-surface-dark rounded-lg text-sm font-medium text-black dark:text-white">{tag}</span>
              ))}
            </div>
          </section>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/95 dark:bg-background-dark/95 border-t border-white/5 flex gap-3 max-w-[430px] mx-auto z-50">
        <button className="flex-1 bg-primary text-background-dark py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg">
          <Calendar size={20} /> Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DetailsScreen;
