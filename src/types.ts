export interface UserProfile {
  name: string;
  completedAssessments: string[];
  totalAssessments: number;
  hasStartedAssessment: boolean;
  interests: string[];
  skills: string[];
  personalityTraits: string[];
}

export interface CareerRecommendation {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
  requiredSkills: string[];
  salary: {
    min: number;
    max: number;
  };
  growthPotential: number;
} 