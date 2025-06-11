import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, PieChart, Pie, Cell
} from 'recharts';
import GlassMorphicBox from '../components/GlassMorphicBox';
import GradientButton from '../components/GradientButton';
import { mockCareerRecommendations } from '../data/mockData';
import { UserProfile, CareerRecommendation } from '../types';
import { ArrowLeft, BarChartBig, BookOpen, Briefcase } from 'lucide-react';
import { calculateCareerMatches } from '../utils/careerMatching';

interface ResultsProps {
  userProfile: UserProfile;
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#facc15', '#84cc16', '#10b981'];

export default function Results({ userProfile }: ResultsProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'personality' | 'skills' | 'careers'>('personality');
  const [careerMatches, setCareerMatches] = useState<CareerRecommendation[]>([]);

  useEffect(() => {
    // Calculate career matches when component mounts or userProfile changes
    const matches = calculateCareerMatches(userProfile, mockCareerRecommendations);
    setCareerMatches(matches);
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
              {personalityData.map((entry, index) => (
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

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <button
          className="flex items-center text-white/60 hover:text-white mb-6"
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
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'personality'
                ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
            onClick={() => setActiveTab('personality')}
          >
            Personality Traits
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'skills'
                ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
            onClick={() => setActiveTab('skills')}
          >
            Skills Assessment
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
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
              <div className="grid gap-6">
                {careerMatches.map((career, index) => (
                  <motion.div
                    key={career.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <GlassMorphicBox className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-semibold">{career.title}</h2>
                            <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full px-3 py-1 text-sm">
                              {career.matchPercentage}% Match
                            </div>
                          </div>
                          <p className="text-white/70 mb-4">{career.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h3 className="text-sm font-medium text-white/60 mb-2">Salary Range</h3>
                              <p className="text-white/90">{career.salary}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-white/60 mb-2">Growth Rate</h3>
                              <p className="text-white/90">{career.growth}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-white/60 mb-2">Key Skills</h3>
                              <div className="flex flex-wrap gap-2">
                                {career.keySkills.map((skill, i) => (
                                  <span
                                    key={i}
                                    className="bg-white/10 rounded-full px-3 py-1 text-sm"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-white/60 mb-2">Education & Requirements</h3>
                              <ul className="list-disc list-inside text-white/70 space-y-1">
                                {career.education.map((edu, i) => (
                                  <li key={i}>{edu}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassMorphicBox>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
