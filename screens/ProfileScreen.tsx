
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, LogOut, Heart, Settings, User, Trash2 } from 'lucide-react';
import { FavoriteItem } from '../types';
import BottomNav from '../components/BottomNav';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('nano_banana_favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter(f => f.id !== id);
    setFavorites(updated);
    localStorage.setItem('nano_banana_favorites', JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col min-h-screen pb-32">
      {/* Header */}
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/explore')} className="size-10 rounded-full bg-gray-100 dark:bg-surface-dark flex items-center justify-center">
            <ChevronLeft size={20} className="text-black dark:text-white" />
          </button>
          <h2 className="text-xl font-bold text-black dark:text-white">Profile</h2>
          <button className="size-10 rounded-full bg-gray-100 dark:bg-surface-dark flex items-center justify-center">
            <Settings size={20} className="text-black dark:text-white" />
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-4 mb-8 p-4 bg-primary rounded-3xl">
          <div className="size-16 rounded-full bg-background-dark border-4 border-white/20 flex items-center justify-center">
            <User size={32} className="text-primary" />
          </div>
          <div>
            <h3 className="text-background-dark text-xl font-bold">Nano Stylist</h3>
            <p className="text-background-dark/70 text-sm font-medium">Joined May 2026</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 p-4 bg-white dark:bg-surface-dark rounded-2xl border-2 border-primary">
            <div className="flex items-center gap-2 mb-1">
              <Heart size={16} className="text-primary fill-primary" />
              <span className="text-sm font-bold text-black dark:text-white">Favorites</span>
            </div>
            <span className="text-2xl font-bold text-black dark:text-white">{favorites.length}</span>
          </div>
          <div className="flex-1 p-4 bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <LogOut size={16} className="text-gray-400" />
              <span className="text-sm font-bold text-gray-400">Styles</span>
            </div>
            <span className="text-2xl font-bold text-gray-400">12</span>
          </div>
        </div>

        {/* Favorites List */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold text-black dark:text-white">Saved Looks</h4>
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-gray-100 dark:bg-surface-dark rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10">
              <Heart size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium lowercase italic">"Nothing saved yet. Time to go bananas with some styles!"</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {favorites.map((fav) => (
                <div key={fav.id} className="relative group rounded-2xl overflow-hidden aspect-square shadow-sm">
                  <img 
                    src={fav.generatedImage} 
                    alt={fav.styleName} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                    <p className="text-white text-xs font-bold leading-tight line-clamp-2 mb-2">{fav.styleName}</p>
                    <button 
                      onClick={() => removeFavorite(fav.id)}
                      className="bg-red-500/80 backdrop-blur-md text-white p-2 rounded-lg self-end"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
};

export default ProfileScreen;
