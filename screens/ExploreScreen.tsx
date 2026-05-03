
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Lock, Zap, ArrowRight, Plus, BarChart2 } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const ExploreScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'fashion',
      title: 'Fashion Match',
      desc: 'AI Wardrobe Coordination',
      img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
      locked: true,
      hint: 'Coming in v2.0'
    },
    {
      id: 'makeup',
      title: 'Makeup Magic',
      desc: 'Virtual Try-on',
      img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=400',
      locked: false,
      action: () => navigate('/scan') // Redirecting to scan as the foundation for vision tools
    },
    {
      id: 'beard',
      title: 'Beard Sculptor',
      desc: 'Facial Hair Preview',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
      locked: false,
      action: () => navigate('/scan')
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-32">
      <header className="p-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between sticky top-0 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md z-10">
        <Menu className="text-black dark:text-white cursor-pointer" />
        <div className="text-center">
          <h2 className="text-lg font-bold text-black dark:text-white">Nano Banana</h2>
          <span className="text-[10px] uppercase text-primary font-bold tracking-widest">Labs</span>
        </div>
        <div className="relative">
          <Bell className="text-primary cursor-pointer" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-background-dark"></span>
        </div>
      </header>

      <section className="px-6 pt-8 pb-4">
        <h1 className="text-4xl font-bold text-black dark:text-white tracking-tight">
          Explore <span className="text-primary italic">Future</span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm">Unlock your potential with our upcoming AI style modules.</p>
      </section>

      <div className="px-6 py-4 space-y-6">
        {/* Featured Tool */}
        <div 
          onClick={() => tools[0].locked ? setActiveTool(tools[0].id) : tools[0].action?.()}
          className="group relative overflow-hidden rounded-2xl bg-cover bg-center aspect-[16/10] shadow-2xl cursor-pointer transition-transform active:scale-[0.98]" 
          style={{backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 60%), url("${tools[0].img}")`}}
        >
          <div className="absolute top-4 right-4 bg-black/60 p-2 rounded-full backdrop-blur-md border border-white/10">
            {tools[0].locked ? <Lock className="text-white" size={16} /> : <Zap className="text-white" size={16} />}
          </div>
          <div className="absolute bottom-4 left-6">
            <h3 className="text-white text-2xl font-bold">{tools[0].title}</h3>
            <p className="text-white/70 text-sm font-medium">{tools[0].desc}</p>
            {activeTool === tools[0].id && (
              <p className="mt-2 text-primary text-xs font-bold uppercase tracking-widest animate-pulse">
                {tools[0].hint}
              </p>
            )}
          </div>
        </div>

        {/* Grid Tools */}
        <div className="grid grid-cols-2 gap-4">
          {tools.slice(1).map((tool) => (
            <div 
              key={tool.id}
              onClick={() => tool.action?.()}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-center bg-cover shadow-lg cursor-pointer transition-all hover:ring-2 hover:ring-primary group"
              style={{backgroundImage: `url("${tool.img}")`}}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 transition-opacity group-hover:from-black/90">
                <p className="text-white font-bold text-sm leading-tight">{tool.title}</p>
                <p className="text-white/60 text-[10px] uppercase font-bold tracking-tighter mt-1">Available Now</p>
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="text-primary" size={16} />
                </div>
              </div>
            </div>
          ))}
          
          <div 
            className="border-2 border-dashed border-primary/30 bg-primary/5 rounded-2xl flex flex-col items-center justify-center p-4 hover:bg-primary/10 transition-colors cursor-pointer group"
          >
            <div className="bg-primary/20 p-3 rounded-full group-hover:scale-110 transition-transform">
              <Plus className="text-primary" size={24} />
            </div>
            <p className="text-primary font-bold mt-3 text-xs uppercase tracking-widest">Suggest Tool</p>
          </div>
        </div>

        {/* Lab Stats */}
        <div className="bg-surface-dark/40 border border-white/5 rounded-2xl p-6 mt-4">
          <h4 className="text-white text-sm font-bold flex items-center gap-2 mb-4">
            <BarChart2 className="text-primary" size={18} />
            Banana Lab Stats
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-gray-500 text-[10px] uppercase font-black">AI Accuracy</span>
              <span className="text-white text-xl font-bold tracking-tighter">99.2%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-[10px] uppercase font-black">Processing</span>
              <span className="text-white text-xl font-bold tracking-tighter">&lt; 1.2s</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="explore" />
    </div>
  );
};

export default ExploreScreen;
