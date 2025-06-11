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
}

export default function Dashboard({ userName, userProfile }: DashboardProps) {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen p-6 font-['Inter']">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-[32px] font-medium mb-2">
            Welcome to GYDR, {' '}
            <span className="text-[#8B5CF6]">{userName}</span>!
          </h1>
          <p className="text-[#94A3B8]">
            Guide Your Dream Role - Complete all assessments to discover your ideal career path.
          </p>
        </header>

        <GlassMorphicBox className="p-8 mb-12">
          <h2 className="text-xl font-medium mb-6">Your Progress</h2>
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

          <div className="grid grid-cols-3 gap-4 mb-6">
            {mockAssessments.map((assessment) => {
              const completed = isAssessmentCompleted(assessment.id);
              return (
                <div
                  key={assessment.id}
                  className={`p-4 rounded-2xl ${
                    completed 
                      ? 'bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)]' 
                      : 'bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
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
            className="w-full py-4 bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-2xl font-medium transition-colors"
          >
            Continue Assessment
          </button>
        </GlassMorphicBox>

        <h2 className="text-xl font-medium mb-6">Assessments</h2>
        <div className="space-y-4">
          {mockAssessments.map((assessment) => (
            <GlassMorphicBox
              key={assessment.id}
              className="p-6 cursor-pointer"
              onClick={() => navigate(`/assessment/${assessment.id}`)}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  isAssessmentCompleted(assessment.id) ? 'bg-[#8B5CF6]' : 'bg-[rgba(255,255,255,0.1)]'
                }`}>
                  {getAssessmentIcon(assessment.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium mb-2">{assessment.title}</h3>
                      <p className="text-[#94A3B8] mb-4">{assessment.description}</p>
                    </div>
                    {isAssessmentCompleted(assessment.id) && (
                      <span className="px-3 py-1 bg-[rgba(255,255,255,0.1)] rounded-full text-sm">
                        Completed
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[#94A3B8] text-sm">
                    <span>{assessment.totalQuestions} questions</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  );
}
