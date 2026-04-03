import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Play, Volume2, VolumeX, Cake, Heart, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

const IMAGES = [
  '/photo1.png',
  '/photo2.png',
  '/photo3.png',
];

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [wishMade, setWishMade] = useState(false);
  const audioRef = useRef(null);

  // Auto-play music when started or when the wish state changes
  useEffect(() => {
    if (hasStarted && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log('Audio play failed', e));
    }
  }, [hasStarted, wishMade]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const handleStart = () => {
    setHasStarted(true);
    fireConfetti();
  };

  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffb703', '#fb8500', '#8ecae6', '#219ebc']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffb703', '#fb8500', '#8ecae6', '#219ebc']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleMakeWish = () => {
    if (!wishMade) {
      setWishMade(true);
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 }
      });
    }
  };

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % IMAGES.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  };

  return (
    <div className="w-full h-screen bg-black text-white relative overflow-hidden font-['Outfit']">
      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        loop 
        src={wishMade 
          ? "/song2.mp4" 
          : "/song1.mp4"
        } 
      />

      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div 
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 playfair text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">
                A Special Day
              </h1>
              <p className="text-gray-400 mb-12 text-lg md:text-xl max-w-md mx-auto">
                Turn up your volume and step inside for a very special celebration.
              </p>
              
              <button 
                onClick={handleStart}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-amber-500/20 border border-amber-500/50 rounded-full hover:bg-amber-500 hover:text-black overflow-hidden"
              >
                <div className="absolute inset-0 w-0 bg-amber-500 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative flex items-center gap-2">
                  <Play size={20} fill="currentColor" /> Enter Celebration
                </span>
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 flex flex-col items-center justify-between py-10 px-4 md:px-20 h-screen overflow-y-auto"
            style={{
              background: 'radial-gradient(circle at top right, rgba(82, 0, 255, 0.1), transparent), radial-gradient(circle at bottom left, rgba(255, 183, 3, 0.1), transparent)',
            }}
          >
            {/* Nav / Controls */}
            <div className="w-full flex justify-between items-center px-6 py-4 absolute top-0 left-0 z-40">
              <div className="flex gap-2 items-center">
                <Sparkles className="text-amber-400" />
                <span className="font-semibold tracking-wider text-sm uppercase">Happy Birthday</span>
              </div>
              <button 
                onClick={toggleMute}
                className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/20 transition-all"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>

            <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center justify-center h-full gap-12 pt-16">
              
              {/* Left Column: Interactive Cake & Message */}
              <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-8 z-10">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <h2 className="text-4xl md:text-6xl font-black playfair leading-tight">
                    Cheers to <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200">
                      Another Year!
                    </span>
                  </h2>
                  <p className="mt-4 text-gray-300 text-lg leading-relaxed max-w-sm">
                    Wishing you an unforgettable day filled with love, laughter, and everything your heart desires.MAA cake ta courier koro😋.
                  </p>
                </motion.div>

                {/* Cake Interaction */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg flex flex-col items-center"
                >
                  <div className="text-6xl mb-6 relative">
                    🎂
                    {!wishMade && (
                      <motion.div 
                        className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-6 bg-orange-400 rounded-full flame blur-[2px]"
                        style={{ boxShadow: '0 0 20px 5px rgba(255, 165, 0, 0.6)' }}
                      />
                    )}
                  </div>
                  
                  <button 
                    onClick={handleMakeWish}
                    disabled={wishMade}
                    className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
                      wishMade 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50 cursor-default' 
                        : 'bg-amber-500 text-black hover:bg-amber-400 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                    }`}
                  >
                    <Cake size={20} />
                    {wishMade ? "Wish Granted! ✨" : "Blow Candles & Make a Wish"}
                  </button>
                </motion.div>
              </div>

              {/* Right Column: Photo Gallery */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="w-full md:w-1/2 flex justify-center relative"
              >
                <div className="relative w-72 h-96 md:w-96 md:h-[32rem] rounded-2xl overflow-hidden group shadow-2xl shadow-amber-500/10 border border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentPhoto}
                      src={IMAGES[currentPhoto]}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </AnimatePresence>
                  
                  {/* Gallery Controls overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                    <button onClick={prevPhoto} className="p-3 bg-white/20 backdrop-blur border border-white/30 rounded-full hover:bg-white/40 transition">
                      <ChevronLeft size={24} />
                    </button>
                    <div className="flex gap-2">
                       {IMAGES.map((_, i) => (
                         <div key={i} className={`h-2 w-2 rounded-full transition-all ${i === currentPhoto ? 'bg-amber-400 w-6' : 'bg-white/50'}`} />
                       ))}
                    </div>
                    <button onClick={nextPhoto} className="p-3 bg-white/20 backdrop-blur border border-white/30 rounded-full hover:bg-white/40 transition">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
                
                {/* Decorative elements around photo */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -right-10 text-amber-500/30 text-8xl"
                >
                  <Sparkles />
                </motion.div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
