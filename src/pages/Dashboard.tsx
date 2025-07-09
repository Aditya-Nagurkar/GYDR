import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassMorphicBox from '../components/GlassMorphicBox';
import { mockAssessments } from '../data/mockData';
import { UserProfile } from '../types';
import { Brain, Code2, Heart, Trophy } from 'lucide-react';

interface DashboardProps {
  userName: string;
  userProfile: UserProfile;
}

export default function Dashboard({ userName, userProfile }: DashboardProps) {
  const navigate = useNavigate();

  const getAssessmentIcon = (icon: string) => {
    switch (icon) {
      case 'brain':
        return <Brain className="w-5 h-5 md:w-6 md:h-6" />;
      case 'code-2':
        return <Code2 className="w-5 h-5 md:w-6 md:h-6" />;
      case 'heart':
        return <Heart className="w-5 h-5 md:w-6 md:h-6" />;
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

  const areAllAssessmentsCompleted = userProfile.completedAssessments.length === userProfile.totalAssessments;

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

        {areAllAssessmentsCompleted ? (
          <GlassMorphicBox className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#8B5CF6]">
                <Trophy className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <h2 className="text-lg md:text-xl font-medium">Your Best Match</h2>
            </div>
            <div className="bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)] rounded-2xl p-6">
              <h3 className="text-xl font-medium text-[#8B5CF6] mb-3">
                {userProfile.careerMatch?.title || "Software Engineer"}
              </h3>
              <p className="text-[#94A3B8] text-sm md:text-base mb-4">
                Based on your assessment results, this career aligns perfectly with your skills, interests, and personality traits.
              </p>
              <button
                onClick={() => navigate('/results')}
                className="w-full py-3 md:py-4 bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-2xl font-medium transition-colors text-sm md:text-base"
              >
                View Detailed Results
              </button>
            </div>
          </GlassMorphicBox>
        ) : (
        <GlassMorphicBox className="p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-medium mb-6">Your Progress</h2>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#94A3B8]">Assessments Completed</span>
              <span className="text-white">
                {userProfile.completedAssessments.length} of {userProfile.totalAssessments}
              </span>
            </div>
            <div className="h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#8B5CF6]"
                initial={{ width: 0 }}
                animate={{ width: `${(userProfile.completedAssessments.length / userProfile.totalAssessments) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
            {mockAssessments.map((assessment) => {
              const completed = isAssessmentCompleted(assessment.id);
              return (
                <div
                  key={assessment.id}
                  className={`p-3 md:p-4 rounded-2xl ${
                    completed 
                      ? 'bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)]' 
                      : 'bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className={`p-2 rounded-xl ${
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
            className="w-full py-3 md:py-4 bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-2xl font-medium transition-colors text-sm md:text-base"
          >
            Continue Assessment
          </button>
        </GlassMorphicBox>
        )}

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
                  <div className={`p-2 md:p-3 rounded-xl ${
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
                        <span className="px-2 md:px-3 py-1 bg-[rgba(255,255,255,0.1)] rounded-full text-xs md:text-sm">
                          Completed
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[#94A3B8] text-xs md:text-sm">
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
