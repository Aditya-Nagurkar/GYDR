import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, PieChart, Pie, Cell, Tooltip
} from 'recharts';
import GlassMorphicBox from '../components/GlassMorphicBox';
import { UserProfile } from '../types';
import { ArrowLeft } from 'lucide-react';
import { calculateCareerMatches, CareerMatch } from '../services/geminiService';

interface ResultsProps {
  userProfile: UserProfile;
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#facc15', '#84cc16', '#10b981'];

export default function Results({ userProfile }: ResultsProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'personality' | 'skills' | 'careers'>('personality');
  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCareerMatches = async () => {
      try {
        setIsLoading(true);
        const matches = await calculateCareerMatches(userProfile);
        setCareerMatches(matches);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to calculate career matches');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareerMatches();
  }, [userProfile]);

  const renderPersonalityChart = () => {
    const personalityData = userProfile.personalityTraits.map(trait => ({
      name: trait.trait,
      value: trait.score
    }));

    return (
      <div className="h-[400px] w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={personalityData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {personalityData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderSkillsChart = () => {
    const skillsData = userProfile.skills.map(skill => ({
      subject: skill.category,
      score: skill.score,
      fullMark: 5
    }));

    return (
      <div className="h-[400px] w-full">
        <ResponsiveContainer>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <Radar
              name="Skills"
              dataKey="score"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderCareerMatches = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6366f1]"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-6">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#6366f1] rounded-lg hover:bg-[#5457ea] transition-colors"
          >
            Retry Analysis
          </button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4">
        {careerMatches.map((career, index) => (
          <motion.div
            key={career.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-xl rounded-lg p-4 border border-white/10"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Left Section - Title, Description, and Match */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">{career.title}</h3>
                  <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full px-3 py-1 text-sm">
                    {career.matchPercentage}% Match
                  </div>
                </div>
                <p className="text-white/70 text-sm mb-3">{career.description}</p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="text-sm">
                    <span className="text-white/60 block mb-1">Salary Range</span>
                    <span className="font-medium">{career.salary}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-white/60 block mb-1">Growth Rate</span>
                    <span className="font-medium">{career.growth}</span>
                  </div>
                </div>
              </div>

              {/* Right Section - Skills and Education */}
              <div className="md:w-1/3 space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-white/60 mb-2">Key Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {career.keySkills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-white/10 rounded-full px-2 py-0.5 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/60 mb-2">Education</h4>
                  <ul className="text-sm space-y-1">
                    {career.education.map((edu, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#6366f1] mt-1.5 mr-1.5"></span>
                        <span className="text-white/80">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <button
          className="flex items-center text-white/60 hover:text-white mb-6 backdrop-blur-xl"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">GYDR Assessment Results</h1>
          <p className="text-white/60">
            Guide Your Dream Role - View your personality traits, skills, and career matches based on your assessment results.
          </p>
        </header>

        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg transition-colors backdrop-blur-xl ${
              activeTab === 'personality' 
                ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
            onClick={() => setActiveTab('personality')}
          >
            Personality Traits
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors backdrop-blur-xl ${
              activeTab === 'skills' 
                ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
            onClick={() => setActiveTab('skills')}
          >
            Skills Assessment
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors backdrop-blur-xl ${
              activeTab === 'careers' 
                ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
            onClick={() => setActiveTab('careers')}
          >
            Career Matches
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'personality' && (
              <GlassMorphicBox className="p-6">
                <h2 className="text-xl font-semibold mb-6">Personality Traits Analysis</h2>
                {renderPersonalityChart()}
              </GlassMorphicBox>
            )}

            {activeTab === 'skills' && (
              <GlassMorphicBox className="p-6">
                <h2 className="text-xl font-semibold mb-6">Skills Assessment Results</h2>
                {renderSkillsChart()}
              </GlassMorphicBox>
            )}

            {activeTab === 'careers' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Career Matches</h2>
                {renderCareerMatches()}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
