import { motion } from 'framer-motion';
import GlassMorphicBox from '../components/GlassMorphicBox';

interface WelcomeProps {
  onSetUserName: (name: string) => void;
}

export default function Welcome({ onSetUserName }: WelcomeProps) {
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
              Glass Morphism
            </h1>
            <p className="text-[#8B9FBF] text-base md:text-lg max-w-[80%] mx-auto">
              Skyline Motions presents, an awesome looking
              glass morphism effect that is super
              easy to create in after effects.
            </p>
          </div>

          <button
            onClick={() => onSetUserName('Demo User')}
            className="w-full mt-8 py-3 px-6 bg-transparent border border-white/20 rounded-full text-white hover:bg-white/5 transition-colors"
          >
            Start
          </button>
        </GlassMorphicBox>
      </motion.div>
    </div>
  );
}
