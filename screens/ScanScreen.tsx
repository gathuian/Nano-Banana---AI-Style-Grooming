
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paintbrush, X, User, Dog, CameraOff, Upload, Image, Camera, Sparkles } from 'lucide-react';
import { generateStyleVisualization } from '../services/geminiService';
import { UserPreference } from '../types';

interface ScanProps {
  prefs: UserPreference;
  setPrefs: (p: Partial<UserPreference>) => void;
  onAnalysisComplete: (result: any, image: string) => void;
}

const ScanScreen: React.FC<ScanProps> = ({ prefs, setPrefs, onAnalysisComplete }) => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    setPermissionError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setPermissionError("Camera access denied. Please upload a photo instead.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current || isAnalyzing) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    setIsAnalyzing(true);
    canvasRef.current.width = videoRef.current.videoWidth || 1024;
    canvasRef.current.height = videoRef.current.videoHeight || 1024;
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const imageData = canvasRef.current.toDataURL('image/jpeg');

    try {
      const result = await generateStyleVisualization(imageData, prefs);
      onAnalysisComplete(result, imageData);
      navigate('/results');
    } catch (error: any) {
      console.error("Generation failed:", error);
      const msg = error.message || "Unknown error";
      alert(`Nano Banana was unable to 'peel' your look. ${msg}. Please ensure the face is clear and try again.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isAnalyzing) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageData = event.target?.result as string;
      setIsAnalyzing(true);
      try {
        const result = await generateStyleVisualization(imageData, prefs);
        onAnalysisComplete(result, imageData);
        navigate('/results');
      } catch (error: any) {
        alert("Upload failed. Please try a clearer photo.");
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-hidden relative">
      {isAnalyzing && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-background-dark/95 backdrop-blur-2xl">
          <div className="relative size-32 mb-8">
             <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
             <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <Paintbrush className="text-primary animate-pulse" size={64} />
             </div>
          </div>
          <h2 className="text-white text-2xl font-bold mb-2 tracking-tight">Nano Banana is Peeling...</h2>
          <p className="text-primary font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Styling your {prefs.species} vibe</p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center p-4 justify-between z-20">
        <button onClick={() => navigate('/quiz')} className="text-white size-12 flex items-center justify-start">
          <X strokeWidth={3} />
        </button>
        <div className="flex bg-white/10 backdrop-blur-md rounded-xl p-1 w-48 h-10 border border-white/10">
          <button 
            onClick={() => setPrefs({ species: 'Human' })}
            className={`flex flex-1 items-center justify-center rounded-lg h-full transition-all gap-2 text-xs font-bold ${prefs.species === 'Human' ? 'bg-primary text-black' : 'text-white/60'}`}
          >
            <User size={14} /> Human
          </button>
          <button 
            onClick={() => setPrefs({ species: 'Pet' })}
            className={`flex flex-1 items-center justify-center rounded-lg h-full transition-all gap-2 text-xs font-bold ${prefs.species === 'Pet' ? 'bg-primary text-black' : 'text-white/60'}`}
          >
            <Dog size={14} /> Pet
          </button>
        </div>
        <div className="w-12"></div>
      </div>

      {/* Viewport */}
      <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
        {permissionError && !videoRef.current?.srcObject ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-background-dark">
            <CameraOff size={64} className="text-gray-500 mb-4" />
            <p className="text-white font-medium mb-6 text-sm">{permissionError}</p>
            <button onClick={() => fileInputRef.current?.click()} className="bg-primary text-black font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2">
              <Upload size={20} /> Upload Photo
            </button>
          </div>
        ) : (
          <>
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
            <div className="absolute inset-0 pointer-events-none">
               <div className="w-full h-full border-[60px] border-black/40"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[380px] border-2 border-primary/50 rounded-[40px]">
                  <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl"></div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl"></div>
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl"></div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl"></div>
                  <div className="absolute top-[20%] left-0 right-0 h-0.5 bg-primary/30 animate-scan"></div>
               </div>
            </div>
          </>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Action Controls */}
      <div className="bg-black/80 backdrop-blur-md p-8 pb-12 z-20">
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
        <div className="flex items-center justify-between w-full max-w-sm mx-auto">
          <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-1 text-white/60 hover:text-primary transition-colors">
            <Image size={32} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Library</span>
          </button>
          
          <button 
            onClick={captureAndAnalyze} 
            disabled={isAnalyzing} 
            className={`relative size-20 rounded-full flex items-center justify-center transition-all active:scale-95 ${isAnalyzing ? 'bg-gray-600' : 'bg-white shadow-[0_0_30px_rgba(255,255,255,0.3)]'}`}
          >
            <div className="size-16 rounded-full border-2 border-black/10 flex items-center justify-center">
              <Camera className="text-black" size={32} />
            </div>
          </button>

          <button onClick={() => navigate('/explore')} className="flex flex-col items-center gap-1 text-white/60 hover:text-primary transition-colors">
            <Sparkles size={32} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Explore</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanScreen;
