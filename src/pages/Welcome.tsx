import { useState } from 'react';
import GradientButton from '../components/GradientButton';
import { motion } from 'framer-motion';

interface WelcomeProps {
  onSetUserName: (name: string) => void;
}

export default function Welcome({ onSetUserName }: WelcomeProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Please enter a valid name (minimum 2 characters)');
      return;
    }
    onSetUserName(name.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-transparent bg-clip-text">
            Welcome to GYDR
          </h1>
          <p className="text-white/60">
            Guide Your Dream Role - Discover your perfect career path through personalized assessments
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
              What's your name?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-colors"
              placeholder="Enter your name"
            />
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          </div>

          <GradientButton type="submit" className="w-full">
            Get Started
          </GradientButton>
        </form>
      </motion.div>
    </div>
  );
}
