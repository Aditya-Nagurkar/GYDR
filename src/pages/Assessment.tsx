import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassMorphicBox from '../components/GlassMorphicBox';
import GradientButton from '../components/GradientButton';
import { mockQuestions, mockAssessments } from '../data/mockData';
import { UserProfile } from '../types';
import { ArrowLeft } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';

interface AssessmentProps {
  userProfile: UserProfile;
  updateUserProfile: (data: Partial<UserProfile>) => void;
}

export default function Assessment({ userProfile, updateUserProfile }: AssessmentProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  
  const questions = id ? mockQuestions[id] : [];
  const currentQuestion = questions[currentQuestionIndex];
  const currentAssessment = id ? mockAssessments.find(a => a.id === id) : null;

  useEffect(() => {
    if (!id || !mockQuestions[id]) {
      navigate('/dashboard');
    }
  }, [id, navigate]);

  const handleAnswer = (answer: number | string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleMultiSelect = (option: string) => {
    const currentAnswer = answers[currentQuestion.id] as string[] || [];
    const newAnswer = currentAnswer.includes(option)
      ? currentAnswer.filter(item => item !== option)
      : [...currentAnswer, option];
    handleAnswer(newAnswer);
  };

  const calculateTraits = () => {
    // Create deep copies of the arrays to modify
    const personalityTraits = [...userProfile.personalityTraits];
    const skills = [...userProfile.skills];
    let interests = [...userProfile.interests];
    
    // Calculate personality traits based on answers
    Object.entries(answers).forEach(([questionId, answer]) => {
      if (typeof answer === 'number') {
        // Scale questions affect traits directly
        if (questionId.startsWith('p')) {
          // Update personality traits
          if (questionId === 'p1' || questionId === 'p2') {
            const extraversion = personalityTraits.find(t => t.trait === 'Extraversion');
            if (extraversion) {
              extraversion.score = Math.round((extraversion.score + answer) / 2);
            }
          } else if (questionId === 'p3' || questionId === 'p14') {
            const conscientiousness = personalityTraits.find(t => t.trait === 'Conscientiousness');
            if (conscientiousness) {
              conscientiousness.score = Math.round((conscientiousness.score + answer) / 2);
            }
          } else if (questionId === 'p5' || questionId === 'p10') {
            const openness = personalityTraits.find(t => t.trait === 'Openness');
            if (openness) {
              openness.score = Math.round((openness.score + answer) / 2);
    }
          } else if (questionId === 'p12') {
            const agreeableness = personalityTraits.find(t => t.trait === 'Agreeableness');
            if (agreeableness) {
              agreeableness.score = Math.round((agreeableness.score + answer) / 2);
            }
          } else if (questionId === 'p7') {
            const neuroticism = personalityTraits.find(t => t.trait === 'Neuroticism');
            if (neuroticism) {
              neuroticism.score = Math.round((neuroticism.score + answer) / 2);
            }
          }
        }
        // Update skills
        if (questionId === 's1') {
          const technical = skills.find(s => s.category === 'Technical');
          if (technical) {
            technical.score = answer;
          }
        } else if (questionId === 's2') {
          const communication = skills.find(s => s.category === 'Communication');
          if (communication) {
            communication.score = answer;
          }
        }
      } else if (Array.isArray(answer)) {
        // Handle multiselect answers (interests)
        if (questionId === 'i5') {
          // Add selected industries to interests
          interests = [...new Set([...interests, ...answer])];
        }
      } else if (typeof answer === 'string') {
        // Choice questions affect multiple traits
        if (questionId === 'p4') {
          const conscientiousness = personalityTraits.find(t => t.trait === 'Conscientiousness');
          const neuroticism = personalityTraits.find(t => t.trait === 'Neuroticism');
          const extraversion = personalityTraits.find(t => t.trait === 'Extraversion');
          const openness = personalityTraits.find(t => t.trait === 'Openness');

          switch (answer) {
            case 'I take a break and return later':
              if (conscientiousness) conscientiousness.score = Math.min(5, conscientiousness.score + 1);
              break;
            case 'I push through until the task is complete':
              if (neuroticism) neuroticism.score = Math.min(5, neuroticism.score + 1);
              break;
            case 'I seek help from others':
              if (extraversion) extraversion.score = Math.min(5, extraversion.score + 1);
              break;
            case 'I break the problem into smaller parts':
              if (openness) openness.score = Math.min(5, openness.score + 1);
              break;
          }
        } else if (questionId === 'i3') {
          // Add selected activity as an interest
          interests.push(answer);
        }
      }
    });

    return {
      personalityTraits,
      skills,
      interests
    };
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate final traits and update profile
      const results = calculateTraits();
      
    updateUserProfile({
      assessmentsCompleted: userProfile.assessmentsCompleted + 1,
        completedAssessments: [...userProfile.completedAssessments, id || ''],
        personalityTraits: results.personalityTraits,
        skills: results.skills,
        interests: results.interests
    });
    
      // Only navigate to results if all assessments are completed
      if (userProfile.assessmentsCompleted + 1 === userProfile.totalAssessments) {
      navigate('/results');
      } else {
        navigate('/dashboard');
      }
    }
  };

    if (!currentQuestion) return null;

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

        return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-white/60 hover:text-white mb-4 backdrop-blur-xl rounded-lg px-4 py-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          <div className="backdrop-blur-xl bg-white/5 rounded-lg p-4 mb-4">
            <h1 className="text-xl font-semibold mb-2">{currentAssessment?.title}</h1>
            <p className="text-white/60">{currentAssessment?.description}</p>
          </div>
          <ProgressBar
            progress={currentQuestionIndex + 1}
            total={questions.length}
          />
        </div>

        <GlassMorphicBox className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>

          {currentQuestion.type === 'scale' && (
            <div className="space-y-6">
              <div className="flex justify-between text-sm text-white/60 backdrop-blur-xl bg-white/5 rounded-lg p-2">
                <span>{currentQuestion.minLabel}</span>
                <span>{currentQuestion.maxLabel}</span>
              </div>
              <div className="flex justify-between gap-2">
                {Array.from({ length: (currentQuestion.max || 5) - (currentQuestion.min || 1) + 1 }).map((_, index) => {
                  const value = (currentQuestion.min || 1) + index;
                  return (
                    <button
                      key={value}
                      className={`flex-1 py-3 rounded-lg transition-colors backdrop-blur-xl ${
                        answers[currentQuestion.id] === value
                          ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white'
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                      onClick={() => handleAnswer(value)}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentQuestion.type === 'choice' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-4 rounded-lg text-left transition-colors backdrop-blur-xl ${
                    answers[currentQuestion.id] === option
                      ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'multiselect' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => {
                const selectedAnswers = (answers[currentQuestion.id] as string[]) || [];
                return (
                  <button
                    key={index}
                    className={`w-full p-4 rounded-lg text-left transition-colors backdrop-blur-xl ${
                      selectedAnswers.includes(option)
                        ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                    onClick={() => handleMultiSelect(option)}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded border backdrop-blur-xl ${
                        selectedAnswers.includes(option)
                          ? 'border-white bg-white/20'
                          : 'border-white/40'
                      } mr-3 flex items-center justify-center`}>
                        {selectedAnswers.includes(option) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                          </svg>
                        )}
                      </div>
                      {option}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </GlassMorphicBox>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors backdrop-blur-xl"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#5457ea] hover:to-[#7c4deb] transition-colors backdrop-blur-xl"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Complete'}
          </button>
        </div>
      </div>
    </div>
  );
}
