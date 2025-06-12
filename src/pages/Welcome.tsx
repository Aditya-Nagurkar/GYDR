import { motion } from 'framer-motion';
import GlassMorphicBox from '../components/GlassMorphicBox';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface WelcomeProps {
  onSetUserName: (name: string) => void;
}

export default function Welcome({ onSetUserName }: WelcomeProps) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    onSetUserName(name.trim());
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[600px]"
      >
        <GlassMorphicBox className="p-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-[48px] font-normal mb-4">
              Welcome to GYDR
            </h1>
            <p className="text-[#8B9FBF] text-base md:text-lg max-w-[80%] mx-auto mb-8">
              Your AI-powered career compass! Let's guide you to a meaningful, 
              tailored career path that matches your personality, skills, and interests.
            </p>
            <div className="mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="Enter your name"
                className="w-full max-w-[400px] px-4 py-3 bg-white/5 border border-white/20 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-white/40 backdrop-blur-xl"
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full mt-4 py-3 px-6 bg-transparent border border-white/20 rounded-full text-white hover:bg-white/5 transition-colors backdrop-blur-xl"
          >
            Start my journey
          </button>
        </GlassMorphicBox>
      </motion.div>
    </div>
  );
}
