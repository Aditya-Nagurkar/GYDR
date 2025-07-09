import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, PieChart, Pie, Cell, Tooltip, PolarRadiusAxis
} from 'recharts';
import GlassMorphicBox from '../components/GlassMorphicBox';
import { UserProfile, CareerRecommendation } from '../types';
import { ArrowLeft } from 'lucide-react';
import { getPersonalityAnalysis, getCareerRecommendations } from '../utils/geminiApi';

interface ResultsProps {
  userProfile: UserProfile;
  updateUserProfile: (data: Partial<UserProfile>) => void;
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#facc15', '#84cc16', '#10b981'];

export default function Results({ userProfile, updateUserProfile }: ResultsProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'personality' | 'skills' | 'careers'>('personality');
  const [personalityAnalysis, setPersonalityAnalysis] = useState<string>('');
  const [careerMatches, setCareerMatches] = useState<CareerRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');
        console.log('Fetching data with userProfile:', userProfile);
        
        // Check localStorage for existing analysis
        const storedAnalysis = localStorage.getItem('personalityAnalysis');
        console.log('Stored analysis:', storedAnalysis);
        
        const [analysis, careers] = await Promise.all([
          storedAnalysis ? Promise.resolve(storedAnalysis) : getPersonalityAnalysis(userProfile),
          getCareerRecommendations(userProfile)
        ]);

        console.log('Fetched analysis:', analysis);
        console.log('Fetched careers:', careers);

        // Store new analysis if it was generated
        if (!storedAnalysis && analysis) {
          localStorage.setItem('personalityAnalysis', analysis);
        }

        setPersonalityAnalysis(analysis);
        setCareerMatches(careers);
        
        // Update the user profile with the best career match
        if (careers && careers.length > 0) {
          console.log('Updating user profile with best match:', careers[0]);
          updateUserProfile({ careerMatch: careers[0] });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load results. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if we have personality traits and skills
    if (userProfile.personalityTraits.some(trait => trait.score > 0) && 
        userProfile.skills.some(skill => skill.score > 0)) {
      console.log('User profile has required data, fetching...');
      fetchData();
    } else {
      console.log('User profile missing required data:', {
        hasPersonality: userProfile.personalityTraits.some(trait => trait.score > 0),
        hasSkills: userProfile.skills.some(skill => skill.score > 0)
      });
      setError('Please complete the personality and skills assessments first.');
      setIsLoading(false);
    }
  }, [userProfile, updateUserProfile]);

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
        <div className="mt-8 grid grid-cols-4 gap-y-3 max-w-2xl mx-auto px-4">
          {skillsData.map((skill, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full shrink-0" 
                style={{ backgroundColor: '#6366f1' }}
              />
              <span className="text-sm text-white/70 truncate">
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

        <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-6 bg-white/5 p-1.5 rounded-xl">
          <button
            className={`flex-1 px-4 py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
              activeTab === 'personality'
                ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/25'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
            onClick={() => setActiveTab('personality')}
          >
            Personality
          </button>
          <button
            className={`flex-1 px-4 py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
              activeTab === 'skills'
                ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/25'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
          <button
            className={`flex-1 px-4 py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
              activeTab === 'careers'
                ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/25'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
            onClick={() => setActiveTab('careers')}
          >
            Careers
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

            {activeTab === 'careers' && (
              <GlassMorphicBox className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Career Matches</h2>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5CF6]"></div>
                  </div>
                ) : error ? (
                  <p className="text-center text-white/60 py-8">{error}</p>
                ) : careerMatches.length > 0 ? (
                  <div className="space-y-4">
                    {careerMatches.map((career) => (
                      <div 
                        key={career.id}
                        className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-medium text-[#8B5CF6]">{career.title}</h3>
                          <span className="text-sm font-medium bg-[#8B5CF6] px-2 py-1 rounded">
                            {career.matchPercentage}% Match
                          </span>
                        </div>
                        <p className="text-sm text-white/70 mb-3">{career.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-white/50 mb-1">Salary Range</p>
                            <p className="text-white/90">{career.salary}</p>
                          </div>
                          <div>
                            <p className="text-white/50 mb-1">Growth</p>
                            <p className="text-white/90">{career.growth}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-white/50 mb-2">Key Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {career.keySkills.map((skill, index) => (
                              <span 
                                key={index}
                                className="text-xs bg-white/10 text-white/90 px-2 py-1 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-white/50 mb-2">Required Education</p>
                          <ul className="list-disc list-inside text-sm text-white/90 space-y-1">
                            {career.education.map((edu, index) => (
                              <li key={index}>{edu}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-white/60 py-8">
                    No career matches found. Please complete all assessments.
                  </p>
                )}
              </GlassMorphicBox>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
