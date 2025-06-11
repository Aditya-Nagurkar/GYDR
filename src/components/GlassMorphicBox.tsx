import { ReactNode } from 'react';
import { motion, TargetAndTransition, VariantLabels } from 'framer-motion';

interface GlassMorphicBoxProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  whileHover?: TargetAndTransition | VariantLabels;
  whileTap?: TargetAndTransition | VariantLabels;
  initial?: TargetAndTransition | VariantLabels;
  animate?: TargetAndTransition | VariantLabels;
}

export default function GlassMorphicBox({
  children,
  className = '',
  onClick,
  whileHover,
  whileTap,
  initial,
  animate,
}: GlassMorphicBoxProps) {
  return (
    <motion.div
      className={`
        relative overflow-hidden
        bg-[rgba(255,255,255,0.1)]
        backdrop-blur-[10px]
        border border-[rgba(255,255,255,0.2)]
        rounded-[32px]
        transition-all duration-300
        hover:bg-[rgba(255,255,255,0.15)]
        hover:border-[rgba(255,255,255,0.3)]
        hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        p-4 md:p-12
        mx-4 md:mx-0
        ${className}
      `}
      onClick={onClick}
      whileHover={whileHover || { 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      whileTap={whileTap || { 
        scale: 0.98,
        transition: { duration: 0.2 }
      }}
      initial={initial || { opacity: 0, y: 20 }}
      animate={animate || { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5 }
      }}
    >
      {children}
    </motion.div>
  );
}
