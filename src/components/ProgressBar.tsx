import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  total: number;
  className?: string;
  showPercentage?: boolean;
  gradient?: 'purple-blue' | 'pink-orange' | 'teal-cyan';
}

export default function ProgressBar({
  progress,
  total,
  className = '',
  showPercentage = true,
  gradient = 'purple-blue',
}: ProgressBarProps) {
  const percentage = Math.round((progress / total) * 100);
  
  const gradientClasses = {
    'purple-blue': 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]',
    'pink-orange': 'bg-gradient-to-r from-[#ec4899] to-[#f97316]',
    'teal-cyan': 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2]',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-white/80">Progress</span>
        {showPercentage && <span className="text-sm text-white/80">{percentage}%</span>}
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${gradientClasses[gradient]}`}
          initial={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
