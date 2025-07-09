import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassMorphicBox from '../components/GlassMorphicBox';

interface WelcomeProps {
  onSetUserName: (name: string) => void;
}

export default function Welcome({ onSetUserName }: WelcomeProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Please enter a valid name (minimum 2 characters)');
      return;
    }
    onSetUserName(name.trim());
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <GlassMorphicBox className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Welcome to GYDR
            </h1>
            <p className="text-sm sm:text-base text-white/60">
              Guide Your Dream Role - Let's start by getting to know you
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm sm:text-base font-medium mb-2"
              >
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
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-colors text-sm sm:text-base"
                placeholder="Enter your name"
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs sm:text-sm text-red-400"
                >
                  {error}
                </motion.p>
              )}
          </div>

          <button
              type="submit"
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-lg font-medium text-sm sm:text-base hover:opacity-90 transition-opacity"
          >
              Get Started
          </button>
          </form>
        </GlassMorphicBox>
      </div>
    </div>
  );
}
