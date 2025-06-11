import { useNavigate } from 'react-router-dom';
import GlassMorphicBox from '../components/GlassMorphicBox';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
      <GlassMorphicBox>
        <div className="text-center">
          <h1 className="text-3xl md:text-[48px] font-normal mb-4">
            Welcome to GYDR
          </h1>
          <p className="text-[#8B9FBF] text-base md:text-lg max-w-[80%] mx-auto mb-8">
            Guide Your Dream Role - Your AI-powered career compass
          </p>
          <button
            onClick={() => navigate('/welcome')}
            className="w-full py-3 px-6 bg-transparent border border-white/20 rounded-full text-white hover:bg-white/5 transition-colors"
          >
            Get Started
          </button>
        </div>
      </GlassMorphicBox>
    </div>
  );
} 