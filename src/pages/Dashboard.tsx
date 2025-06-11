import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassMorphicBox from '../components/GlassMorphicBox';
import GradientButton from '../components/GradientButton';
import { mockAssessments, mockCareerRecommendations } from '../data/mockData';
import { UserProfile, CareerRecommendation } from '../types';
import { Brain, Code2, Heart, ArrowRight } from 'lucide-react';
import { calculateCareerMatches } from '../utils/careerMatching';
import { useState, useEffect } from 'react';

interface DashboardProps {
  userName: string;
  userProfile: UserProfile;
  updateUserProfile: (data: Partial<UserProfile>) => void;
}

export default function Dashboard({ userName, userProfile, updateUserProfile }: DashboardProps) {
  const navigate = useNavigate();
  const [careerMatches, setCareerMatches] = useState<CareerRecommendation[]>([]);

  useEffect(() => {
    // Calculate career matches when userProfile changes
    const matches = calculateCareerMatches(userProfile, mockCareerRecommendations);
    setCareerMatches(matches);
  }, [userProfile]);

  const getAssessmentIcon = (icon: string) => {
    switch (icon) {
      case 'brain':
        return <Brain className="w-6 h-6" />;
      case 'code-2':
        return <Code2 className="w-6 h-6" />;
      case 'heart':
        return <Heart className="w-6 h-6" />;
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

  const allAssessmentsCompleted = userProfile.completedAssessments.length === userProfile.totalAssessments;

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome to GYDR, <span className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-transparent bg-clip-text">{userName}</span>!
          </h1>
          <p className="text-white/60">Guide Your Dream Role - Complete all assessments to discover your ideal career path.</p>
        </header>

        <div className={`grid gap-6 mb-8 ${allAssessmentsCompleted ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          <GlassMorphicBox className={`p-6 ${!allAssessmentsCompleted ? 'md:w-full' : ''}`}>
            <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Assessments Completed</span>
                <span>{userProfile.completedAssessments.length} of {userProfile.totalAssessments}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(userProfile.completedAssessments.length / userProfile.totalAssessments) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            {allAssessmentsCompleted ? (
              <div className="space-y-4">
                <GradientButton onClick={() => navigate('/results')} className="w-full">
                  View Your Results
                </GradientButton>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockAssessments.map((assessment) => {
                    const completed = isAssessmentCompleted(assessment.id);
                    return (
                      <div
                        key={assessment.id}
                        className={`p-4 rounded-lg ${
                          completed 
                            ? 'bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 border border-[#6366f1]/30' 
                            : 'bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${
                            completed ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]' : 'bg-white/10'
                          }`}>
                            {getAssessmentIcon(assessment.icon)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium truncate">{assessment.title}</h3>
                            {completed && (
                              <span className="text-xs text-[#6366f1]">Completed</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <GradientButton 
                  onClick={() => {
                    const nextAssessment = getNextIncompleteAssessment();
                    if (nextAssessment) {
                      navigate(`/assessment/${nextAssessment.id}`);
                    }
                  }}
                  className="w-full"
                >
                  Continue Assessment
                </GradientButton>
              </div>
            )}
          </GlassMorphicBox>

          {allAssessmentsCompleted && (
            <GlassMorphicBox className="p-6">
              <h2 className="text-xl font-semibold mb-4">Top Career Match</h2>
              {careerMatches.slice(0, 1).map((career) => (
                <div key={career.id}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium">{career.title}</h3>
                    <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full px-3 py-1 text-sm">
                      {career.matchPercentage}% Match
                    </div>
                  </div>
                  <p className="text-white/70 mb-4">{career.description}</p>
                  <div className="flex gap-4">
                    <GradientButton onClick={() => navigate('/results')} className="flex-1">
                      View Results
                    </GradientButton>
                  </div>
                </div>
              ))}
            </GlassMorphicBox>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Assessments</h2>
          {mockAssessments.map((assessment) => {
            const completed = isAssessmentCompleted(assessment.id);
            return (
              <GlassMorphicBox
                key={assessment.id}
                className={`p-6 transition-transform hover:scale-[1.02] ${completed ? 'bg-white/10' : ''}`}
                onClick={() => navigate(`/assessment/${assessment.id}`)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    completed ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]' : 'bg-white/10'
                  }`}>
                    {getAssessmentIcon(assessment.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium">{assessment.title}</h3>
                      {completed && (
                        <div className="bg-white/20 rounded-full px-3 py-1 text-sm">
                          Completed
                        </div>
                      )}
                    </div>
                    <p className="text-white/60 mb-4">{assessment.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/40">
                        {assessment.totalQuestions} questions
                      </span>
                      <ArrowRight className="w-5 h-5 text-white/40" />
                    </div>
                  </div>
                </div>
              </GlassMorphicBox>
            );
          })}
          {allAssessmentsCompleted && (
            <GlassMorphicBox
              className="p-6 transition-transform hover:scale-[1.02] cursor-pointer"
              onClick={() => {
                updateUserProfile({
                  assessmentsCompleted: 0,
                  completedAssessments: [],
                  personalityTraits: userProfile.personalityTraits.map(trait => ({ ...trait, score: 0 })),
                  skills: userProfile.skills.map(skill => ({ ...skill, score: 0 })),
                  interests: []
                });
              }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/10">
                  <ArrowRight className="w-6 h-6 rotate-180" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium">Reset Assessment</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      All progress will be reset
                    </span>
                    <ArrowRight className="w-5 h-5 text-white/40" />
                  </div>
                </div>
              </div>
            </GlassMorphicBox>
          )}
        </div>
      </div>
    </div>
  );
}
