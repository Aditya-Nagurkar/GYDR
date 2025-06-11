import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassMorphicBoxProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  whileHover?: object;
  whileTap?: object;
  initial?: object;
  animate?: object;
}

export default function GlassMorphicBox({
  children,
  className = '',
  onClick,
  whileHover = { scale: 1.02 },
  whileTap = { scale: 0.98 },
  initial,
  animate,
}: GlassMorphicBoxProps) {
  return (
    <motion.div
      className={`backdrop-blur-md bg-white/20 rounded-2xl border border-white/20 shadow-lg overflow-hidden ${className}`}
      onClick={onClick}
      whileHover={whileHover}
      whileTap={whileTap}
      initial={initial}
      animate={animate}
    >
      {children}
    </motion.div>
  );
}
