import { motion, HTMLMotionProps } from 'framer-motion';

type GradientButtonProps = HTMLMotionProps<"button"> & {
  children: React.ReactNode;
  className?: string;
};

export default function GradientButton({
  children,
  className = '',
  disabled = false,
  ...props
}: GradientButtonProps) {
  return (
    <motion.button
      whileHover={!disabled ? {
        scale: 1.02,
        transition: { duration: 0.2 }
      } : undefined}
      whileTap={!disabled ? {
        scale: 0.98,
        transition: { duration: 0.1 }
      } : undefined}
      className={`
        relative overflow-hidden
        px-6 py-3 rounded-full
        font-medium text-white
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        before:absolute before:inset-0 
        before:bg-gradient-to-r before:from-[#6366f1] before:to-[#8b5cf6]
        before:transition-opacity before:duration-300
        after:absolute after:inset-0 
        after:bg-gradient-to-r after:from-[#8b5cf6] after:to-[#6366f1]
        after:opacity-0 after:transition-opacity after:duration-300
        hover:after:opacity-100
        hover:shadow-lg hover:shadow-indigo-500/25
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
}
