
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paintbrush, X, User, Dog, CameraOff, Upload, Image, Camera } from 'lucide-react';
import { generateStyleVisualization } from '../services/geminiService';

interface ScanProps {
  vibe: string;
  onAnalysisComplete: (result: any, image: string) => void;
}

const ScanScreen: React.FC<ScanProps> = ({ vibe, onAnalysisComplete }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'Human' | 'Pet'>('Human');
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
        video: { 
          facingMode: 'user', 
          width: { ideal: 1280 }, 
          height: { ideal: 720 } 
        }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Error accessing camera:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionError("Camera access denied. Please enable camera permissions or upload a photo.");
      } else {
        setPermissionError("Could not access camera. Please try uploading a photo instead.");
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const processImage = async (imageData: string) => {
    setIsAnalyzing(true);
    try {
      const result = await generateStyleVisualization(imageData, mode, vibe);
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || isAnalyzing) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      processImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current || isAnalyzing) return;
    if (videoRef.current.readyState < 2) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      processImage(imageData);
    }
  };

  return (
    <div className="relative h-screen bg-background-dark flex flex-col overflow-hidden">
      {isAnalyzing && (
        <div className="absolute inset-0 z-[100] bg-background-dark/90 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center">
          <div className="relative size-32 mb-8">
             <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
             <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <Paintbrush className="text-primary animate-pulse" size={64} />
             </div>
          </div>
          <h2 className="text-white text-2xl font-bold mb-2 tracking-tight">Nano Banana is Peeling...</h2>
          <p className="text-gray-400 text-sm max-w-xs">Generating your hyper-realistic style visualization using Gemini AI.</p>
          <div className="mt-8 flex gap-1">
             {[0,1,2].map(i => <div key={i} className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" style={{animationDelay: `${i*0.2}s`}}></div>)}
          </div>
        </div>
      )}

      <div className="flex items-center p-4 justify-between z-20">
        <button onClick={() => navigate('/quiz')} className="text-white size-12 flex items-center justify-start">
          <X />
        </button>
        <h2 className="text-white text-lg font-bold">Style Scanner</h2>
        <div className="w-12"></div>
      </div>

      <div className="flex px-10 py-4 z-20">
        <div className="flex h-12 flex-1 items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm p-1 border border-white/10">
          <button 
            onClick={() => setMode('Human')}
            className={`flex flex-1 items-center justify-center rounded-lg h-full transition-all gap-2 text-sm font-bold ${mode === 'Human' ? 'bg-primary text-black' : 'text-white/60'}`}
          >
            <User size={18} /> Human
          </button>
          <button 
            onClick={() => setMode('Pet')}
            className={`flex flex-1 items-center justify-center rounded-lg h-full transition-all gap-2 text-sm font-bold ${mode === 'Pet' ? 'bg-primary text-black' : 'text-white/60'}`}
          >
            <Dog size={18} /> Pet
          </button>
        </div>
      </div>

      <div className="relative flex-1 bg-black">
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
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale-[0.2]" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute inset-0 scan-overlay flex flex-col items-center justify-center">
              <div className="relative w-64 h-80 border-2 border-primary/40 rounded-[100px] flex items-center justify-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary px-3 py-1 rounded-full text-[10px] font-black text-black uppercase tracking-widest">Nano AI</div>
                <div className="absolute w-full h-[2px] bg-primary shadow-[0_0_15px_#f4d125] animate-scan"></div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="bg-background-dark p-8 pb-12 z-20 flex flex-col items-center gap-6">
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
        <div className="flex items-center justify-center gap-8 w-full">
          <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-1 text-white/60 hover:text-primary transition-colors">
            <Image size={32} />
            <span className="text-[10px] font-bold uppercase">Library</span>
          </button>
          <button onClick={captureAndAnalyze} disabled={isAnalyzing} className={`relative size-20 rounded-full flex items-center justify-center transition-all active:scale-95 ${isAnalyzing ? 'bg-gray-600' : 'bg-primary shadow-[0_0_30px_rgba(244,209,37,0.4)]'}`}>
            <Camera className="text-black" size={40} />
          </button>
          <div className="w-[50px]"></div>
        </div>
      </div>
    </div>
  );
};

export default ScanScreen;
