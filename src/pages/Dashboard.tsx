import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassMorphicBox from '../components/GlassMorphicBox';
import { mockAssessments } from '../data/mockData';
import { UserProfile } from '../types';
import { Brain, Code2, Heart, TrendingUp, Building2, GraduationCap } from 'lucide-react';

interface DashboardProps {
  userName: string;
  userProfile: UserProfile;
}

export default function Dashboard({ userName, userProfile }: DashboardProps) {
  const navigate = useNavigate();

  const getAssessmentIcon = (icon: string) => {
    switch (icon) {
      case 'brain':
        return <Brain className="w-4 h-4 text-white" />;
      case 'code':
        return <Code2 className="w-4 h-4 text-white" />;
      case 'heart':
        return <Heart className="w-4 h-4 text-white" />;
      default:
        return null;
    }
  };

  const isAssessmentCompleted = (assessmentId: string) => {
    return userProfile.completedAssessments.includes(assessmentId);
  };

  const getNextIncompleteAssessment = () => {
    return mockAssessments.find(assessment => !isAssessmentCompleted(assessment.id));
  };

  const bestMatch = userProfile.careerMatches?.[0];

  return (
    <div className="min-h-screen p-4 sm:p-6 font-['Inter']">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        <GlassMorphicBox className="p-6 md:p-8">
          <h1 className="text-2xl md:text-[32px] font-medium mb-2">
            Welcome to GYDR, {' '}
            <span className="text-[#8B5CF6]">{userName}</span>!
          </h1>
          <p className="text-[#94A3B8] text-sm md:text-base">
            Guide Your Dream Role - Complete all assessments to discover your ideal career path.
          </p>
        </GlassMorphicBox>

        <div className={bestMatch ? 'grid md:grid-cols-2 gap-6' : ''}>
          <GlassMorphicBox className="p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-medium mb-6">Your Progress</h2>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#94A3B8]">Assessments Completed</span>
                <span className="text-white">
                  {userProfile.completedAssessments.length} of {userProfile.totalAssessments}
                </span>
              </div>
              <div className="h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden backdrop-blur-xl">
                <motion.div
                  className="h-full bg-[#8B5CF6] backdrop-blur-xl"
                  initial={{ width: 0 }}
                  animate={{ width: `${(userProfile.completedAssessments.length / userProfile.totalAssessments) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className={`grid gap-3 md:gap-4 mb-6 ${bestMatch ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
              {mockAssessments.slice(0, bestMatch ? 4 : 8).map((assessment) => {
                const completed = isAssessmentCompleted(assessment.id);
                return (
                  <div
                    key={assessment.id}
                    className={`p-3 md:p-4 rounded-2xl backdrop-blur-xl ${
                      completed 
                        ? 'bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)]' 
                        : 'bg-[rgba(255,255,255,0.05)]'
                    }`}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className={`p-2 rounded-xl backdrop-blur-xl ${
                        completed ? 'bg-[#8B5CF6]' : 'bg-[rgba(255,255,255,0.1)]'
                      }`}>
                        {getAssessmentIcon(assessment.icon)}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{assessment.title}</h3>
                        {completed && (
                          <span className="text-xs text-[#8B5CF6]">Completed</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                const nextAssessment = getNextIncompleteAssessment();
                if (nextAssessment) {
                  navigate(`/assessment/${nextAssessment.id}`);
                }
              }}
              className="w-full py-3 md:py-4 bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-2xl font-medium transition-colors text-sm md:text-base backdrop-blur-xl"
            >
              Continue Assessment
            </button>
          </GlassMorphicBox>

          {bestMatch && (
            <GlassMorphicBox className="p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-medium mb-6">Best Career Match</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] backdrop-blur-xl">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold">{bestMatch.title}</h3>
                      <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full px-3 py-1 text-sm backdrop-blur-xl">
                        {bestMatch.matchPercentage}% Match
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">{bestMatch.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-xl bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-[#6366f1]" />
                      <span className="text-sm text-white/60">Growth Rate</span>
                    </div>
                    <span className="font-medium">{bestMatch.growth}</span>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-4 h-4 text-[#6366f1]" />
                      <span className="text-sm text-white/60">Education</span>
                    </div>
                    <span className="font-medium">{bestMatch.education[0]}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white/60 mb-2">Key Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {bestMatch.keySkills.slice(0, 4).map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="bg-white/10 backdrop-blur-xl rounded-full px-2 py-0.5 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate('/results')}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-2xl font-medium transition-colors text-sm backdrop-blur-xl"
                >
                  View Full Results
                </button>
              </div>
            </GlassMorphicBox>
          )}
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-medium mb-4 md:mb-6 px-1">Assessments</h2>
          <div className="space-y-3 md:space-y-4">
            {mockAssessments.map((assessment) => (
              <GlassMorphicBox
                key={assessment.id}
                className="p-4 md:p-6 cursor-pointer"
                onClick={() => navigate(`/assessment/${assessment.id}`)}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`p-2 md:p-3 rounded-xl backdrop-blur-xl ${
                    isAssessmentCompleted(assessment.id) ? 'bg-[#8B5CF6]' : 'bg-[rgba(255,255,255,0.1)]'
                  }`}>
                    {getAssessmentIcon(assessment.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base md:text-lg font-medium mb-1 md:mb-2">{assessment.title}</h3>
                        <p className="text-[#94A3B8] text-sm md:text-base mb-3 md:mb-4">{assessment.description}</p>
                      </div>
                      {isAssessmentCompleted(assessment.id) && (
                        <span className="px-2 md:px-3 py-1 bg-[rgba(255,255,255,0.1)] rounded-full text-xs md:text-sm backdrop-blur-xl">
                          Completed
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[#94A3B8] text-xs md:text-sm backdrop-blur-xl rounded-lg p-2">
                      <span>{assessment.totalQuestions} questions</span>
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </GlassMorphicBox>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
