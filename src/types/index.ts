export interface Assessment {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalQuestions: number;
  completed: boolean;
  icon: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'scale' | 'choice' | 'multiselect';
  options?: string[];
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  matchPercentage: number;
  description: string;
  salary: string;
  growth: string;
  keySkills: string[];
  education: string[];
}

export interface UserProfile {
  name: string;
  assessmentsCompleted: number;
  totalAssessments: number;
  personalityTraits: {
    trait: string;
    score: number;
  }[];
  skills: {
    category: string;
    score: number;
  }[];
  interests: string[];
  completedAssessments: string[];
  careerMatch?: CareerRecommendation;
}
