import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassMorphicBox from '../components/GlassMorphicBox';
import { useNavigate } from 'react-router-dom';

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
  };

  const handleStart = () => {
    onSetUserName('Demo User');
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
        <GlassMorphicBox>
          <div className="text-center">
            <h1 className="text-3xl md:text-[48px] font-normal mb-4">
              Welcome to GYDR
            </h1>
            <p className="text-[#8B9FBF] text-base md:text-lg max-w-[80%] mx-auto">
              Your AI-powered career compass! Let's guide you to a meaningful, 
              tailored career path that matches your personality, skills, and interests.
            </p>
          </div>

          <button
            onClick={handleStart}
            className="w-full mt-8 py-3 px-6 bg-transparent border border-white/20 rounded-full text-white hover:bg-white/5 transition-colors"
          >
            Start my journey
          </button>
        </GlassMorphicBox>
      </motion.div>
    </div>
  );
}
