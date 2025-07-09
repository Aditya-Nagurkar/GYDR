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
  animate
}: GlassMorphicBoxProps) {
  return (
    <motion.div
      className={`
        relative rounded-2xl
        bg-gradient-to-b from-white/[0.15] to-white/[0.05]
        backdrop-blur-[12px]
        border border-white/[0.15]
        shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]
        transition-transform duration-200
        ${className}
      `}
      onClick={onClick}
      whileHover={whileHover || (onClick ? { scale: 1.02 } : undefined)}
      whileTap={whileTap || (onClick ? { scale: 0.98 } : undefined)}
      initial={initial}
      animate={animate}
    >
      {children}
    </motion.div>
  );
}
