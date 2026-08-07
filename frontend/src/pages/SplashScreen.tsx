import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] bg-[#010804] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Dynamic Gold Dust Background */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#D4AF37] rounded-full blur-[1px]"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.5 + 0.2
              }}
              animate={{
                y: [null, Math.random() * -200 - 100],
                opacity: [null, 0]
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Central Core */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 2, type: "spring", bounce: 0.4 }}
            className="w-32 h-32 relative flex items-center justify-center mb-8"
          >
            {/* Outer Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-[#10B981]/30 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border border-[#D4AF37]/50 rounded-full"
            />
            
            {/* Inner Glowing Core */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], filter: ["blur(4px)", "blur(8px)", "blur(4px)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 bg-gradient-to-tr from-[#10B981] to-[#D4AF37] rounded-full opacity-80"
            />
            
            <ShieldIcon className="absolute w-8 h-8 text-[#010804] z-10" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-3xl tracking-[0.2em] font-light text-white uppercase mb-2"
          >
            DocuGuard <span className="font-bold text-[#D4AF37]">AI</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex items-center gap-3 text-xs text-[#10B981] uppercase tracking-widest"
          >
            <span className="w-1 h-1 bg-[#10B981] rounded-full animate-pulse"></span>
            Initializing Enterprise Core
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
