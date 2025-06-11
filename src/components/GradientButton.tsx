import { ButtonHTMLAttributes } from 'react';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function GradientButton({ children, className = '', ...props }: GradientButtonProps) {
  return (
    <button
      className={`px-6 py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
