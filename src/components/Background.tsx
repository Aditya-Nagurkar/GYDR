import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Background() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.05;
      const moveY = (clientY - window.innerHeight / 2) * 0.05;
      setMousePosition({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#090B16]">
      {/* Main gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
          x: isMobile ? 0 : mousePosition.x * 1.5,
          y: isMobile ? 0 : mousePosition.y * 1.5,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          x: { duration: 0.5 },
          y: { duration: 0.5 },
        }}
        className="absolute md:top-[10%] md:left-[20%] top-[5%] left-[10%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full bg-gradient-to-br from-[#00C2FF] via-[#CC00FF] to-[#00C2FF] opacity-50 "
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
          x: isMobile ? 0 : mousePosition.x * -1,
          y: isMobile ? 0 : mousePosition.y * -1,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
          x: { duration: 0.5 },
          y: { duration: 0.5 },
        }}
        className="absolute md:top-[40%] md:right-[20%] top-[60%] right-[10%] w-[150px] h-[150px] md:w-[250px] md:h-[250px] rounded-full bg-gradient-to-br from-[#00C2FF] to-[#CC00FF] opacity-40 blur-[1px]"
      />
      
      {/* Smaller orbs */}
      {[...Array(isMobile ? 4 : 6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
            x: isMobile ? 0 : mousePosition.x * (i % 2 === 0 ? 0.5 : -0.5),
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
            x: { duration: 0.3 },
          }}
          className="absolute w-[40px] h-[40px] md:w-[80px] md:h-[80px] rounded-full bg-gradient-to-r from-[#00C2FF] to-[#CC00FF] opacity-30 blur-[5px]"
          style={{
            left: `${isMobile ? (20 + i * 20) : (15 + i * 15)}%`,
            top: `${isMobile ? (30 + (i % 2) * 30) : (20 + (i % 3) * 20)}%`,
          }}
        />
      ))}

      {/* Grid pattern */}
      <motion.div 
        animate={{
          x: isMobile ? 0 : mousePosition.x * 0.1,
          y: isMobile ? 0 : mousePosition.y * 0.1,
        }}
        transition={{
          duration: 0.5,
          ease: "linear"
        }}
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)`,
          backgroundSize: isMobile ? '30px 30px' : '50px 50px'
        }}
      />
    </div>
  );
} 