import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, PieChart, Pie, Cell, Tooltip, PolarRadiusAxis
} from 'recharts';
import GlassMorphicBox from '../components/GlassMorphicBox';
import { UserProfile } from '../types';
import { ArrowLeft } from 'lucide-react';
import { getPersonalityAnalysis } from '../utils/geminiApi';

interface ResultsProps {
  userProfile: UserProfile;
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#facc15', '#84cc16', '#10b981'];

export default function Results({ userProfile }: ResultsProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'personality' | 'skills'>('personality');
  const [personalityAnalysis, setPersonalityAnalysis] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analysis = await getPersonalityAnalysis(userProfile);
        setPersonalityAnalysis(analysis);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [userProfile]);

  const renderPersonalityChart = () => {
    const personalityData = userProfile.personalityTraits
      .filter(trait => trait.score > 0)
      .map(trait => ({
        name: trait.trait,
        value: trait.score
      }));

    return (
      <div className="h-[300px] sm:h-[350px] md:h-[400px] w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={personalityData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="70%"
              fill="#8884d8"
              dataKey="value"
              label={({ name, value, cx, cy, midAngle, outerRadius }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius * 1.2;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    className="text-[10px] sm:text-xs md:text-sm"
                  >
                    {`${name}: ${value}`}
                  </text>
                );
              }}
            >
              {personalityData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderSkillsChart = () => {
    const levels = [1, 2, 3, 4, 5];
    
    const skillsData = userProfile.skills
      .filter(skill => skill.score >= 0)
      .map(skill => ({
        subject: skill.category,
        score: skill.score,
        fullMark: 5
      }));

    return (
      <div className="h-[300px] sm:h-[350px] md:h-[400px] w-full">
        <ResponsiveContainer>
          <RadarChart 
            cx="50%" 
            cy="50%" 
            outerRadius="70%" 
            data={skillsData}
            startAngle={90}
            endAngle={-270}
          >
            {levels.map(level => (
              <PolarGrid
                key={level}
                gridType="polygon"
                radialLines={true}
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth={1}
              />
            ))}
            <PolarAngleAxis
              dataKey="subject"
              tick={{ 
                fill: 'white', 
                fontSize: '10px',
                className: 'sm:text-xs md:text-sm'
              }}
              stroke="rgba(255, 255, 255, 0.3)"
              tickLine={false}
            />
            <PolarRadiusAxis
              domain={[0, 5]}
              axisLine={false}
              tick={false}
              tickCount={6}
            />
            <Radar
              name="Skills"
              dataKey="score"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.3}
              strokeWidth={2}
              dot
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                fontSize: '12px'
              }}
              formatter={(value: number) => [`Score: ${value}/5`, 'Skills']}
            />
          </RadarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
          {skillsData.map((skill, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" 
                style={{ backgroundColor: '#6366f1' }}
              />
              <span className="text-xs sm:text-sm text-white/70">
                {skill.subject}: {skill.score}/5
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          className="flex items-center text-white/60 hover:text-white mb-4 sm:mb-6"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">GYDR Assessment Results</h1>
          <p className="text-sm sm:text-base text-white/60">
            Guide Your Dream Role - View your personality traits, skills, and career matches based on your assessment results.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-3 mb-6">
          <button
            className={`flex-1 px-4 py-2 rounded-lg text-sm sm:text-base transition-colors ${
              activeTab === 'personality'
                ? 'bg-[#8B5CF6] text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
            onClick={() => setActiveTab('personality')}
          >
            Personality
          </button>
          <button
            className={`flex-1 px-4 py-2 rounded-lg text-sm sm:text-base transition-colors ${
              activeTab === 'skills'
                ? 'bg-[#8B5CF6] text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
            onClick={() => setActiveTab('skills')}
          >
            Skills
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
              <GlassMorphicBox className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Personality Traits Analysis</h2>
                {personalityAnalysis && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white/5 rounded-lg">
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed">{personalityAnalysis}</p>
                  </div>
                )}
                {renderPersonalityChart()}
              </GlassMorphicBox>
            )}

            {activeTab === 'skills' && (
              <GlassMorphicBox className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Skills Assessment Results</h2>
                {renderSkillsChart()}
              </GlassMorphicBox>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
