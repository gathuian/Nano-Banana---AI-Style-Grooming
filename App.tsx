
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { UserPreference, GenerationResult } from './types';
import OnboardingScreen from './screens/OnboardingScreen';
import QuizScreen from './screens/QuizScreen';
import ScanScreen from './screens/ScanScreen';
import ResultsScreen from './screens/ResultsScreen';
import DetailsScreen from './screens/DetailsScreen';
import ExploreScreen from './screens/ExploreScreen';
import ProfileScreen from './screens/ProfileScreen';

const AnimatedRoutes = () => {
  const location = useLocation();
  const [userPrefs, setUserPrefs] = useState<UserPreference>({
    vibe: 'classic',
    species: 'Human',
    gender: 'Neutral'
  });
  const [analysisResults, setAnalysisResults] = useState<GenerationResult[]>([]);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const updatePrefs = (newPrefs: Partial<UserPreference>) => {
    setUserPrefs(prev => ({ ...prev, ...newPrefs }));
  };

  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
             <OnboardingScreen />
           </motion.div>
        } />
        <Route 
          path="/quiz" 
          element={
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.3 }}>
              <QuizScreen onUpdatePrefs={updatePrefs} currentPrefs={userPrefs} />
            </motion.div>
          } 
        />
        <Route 
          path="/scan" 
          element={
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <ScanScreen 
                prefs={userPrefs} 
                setPrefs={updatePrefs}
                onAnalysisComplete={(res, img) => {
                  setAnalysisResults(res);
                  setCapturedImage(img);
                }} 
              />
            </motion.div>
          } 
        />
        <Route 
          path="/results" 
          element={
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.3 }}>
              <ResultsScreen 
                results={analysisResults} 
                capturedImage={capturedImage} 
                prefs={userPrefs}
              />
            </motion.div>
          } 
        />
        <Route 
          path="/details" 
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <DetailsScreen />
            </motion.div>
          } 
        />
        <Route path="/explore" element={
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
             <ExploreScreen />
           </motion.div>
        } />
        <Route path="/profile" element={
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
             <ProfileScreen />
           </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark flex justify-center overflow-hidden">
      <div className="w-full max-w-[430px] bg-background-light dark:bg-background-dark relative shadow-2xl overflow-y-auto no-scrollbar">
        <HashRouter>
          <AnimatedRoutes />
        </HashRouter>
      </div>
    </div>
  );
};

export default App;
