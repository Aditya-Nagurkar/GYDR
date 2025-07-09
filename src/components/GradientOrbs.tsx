import { motion } from 'framer-motion';

export default function GradientOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10 bg-[#090B16]">
      {/* Blue Orb */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-[#0055FF] opacity-90 blur-[20px]"
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        style={{
          left: '-15%',
          bottom: '-25%',
          background: 'radial-gradient(circle at center, #0055FF 0%, rgba(0,85,255,0.8) 50%, rgba(0,85,255,0) 100%)'
        }}
      />

      {/* Magenta Orb */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] rounded-full bg-[#FF00FF] opacity-90 blur-[20px]"
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        style={{
          left: '-20%',
          top: '-40%',
          background: 'radial-gradient(circle at center, #FF00FF 0%, rgba(255,0,255,0.8) 50%, rgba(255,0,255,0) 100%)'
        }}
      />

      {/* Red Orb */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full bg-[#FF2D55] opacity-90 blur-[20px]"
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        style={{
          right: '-15%',
          top: '-15%',
          background: 'radial-gradient(circle at center, #FF2D55 0%, rgba(255,45,85,0.8) 50%, rgba(255,45,85,0) 100%)'
        }}
      />

      {/* Subtle overlay for better contrast */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(9,11,22,0) 0%, rgba(9,11,22,0.2) 100%)'
        }}
      />
    </div>
  );
} 