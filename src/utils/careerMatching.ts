import { UserProfile, CareerRecommendation } from '../types';

interface TraitWeight {
  trait: string;
  weight: number;
  minScore: number;
}

interface TraitWeights {
  personality: TraitWeight[];
  skills: TraitWeight[];
}

// Define trait importance for each career
const careerTraitWeights: Record<string, TraitWeights> = {
  'Software Developer': {
    personality: [
      { trait: 'Problem Solving', weight: 0.3, minScore: 3 },
      { trait: 'Openness', weight: 0.2, minScore: 3 },
      { trait: 'Conscientiousness', weight: 0.2, minScore: 3 }
    ],
    skills: [
      { trait: 'Technical', weight: 0.4, minScore: 3 },
      { trait: 'Problem Solving', weight: 0.3, minScore: 3 },
      { trait: 'Analytical', weight: 0.3, minScore: 3 }
    ]
  },
  'Medical Doctor': {
    personality: [
      { trait: 'Conscientiousness', weight: 0.4, minScore: 4 },
      { trait: 'Agreeableness', weight: 0.3, minScore: 4 },
      { trait: 'Problem Solving', weight: 0.3, minScore: 3 }
    ],
    skills: [
      { trait: 'Analytical', weight: 0.3, minScore: 4 },
      { trait: 'Communication', weight: 0.4, minScore: 4 },
      { trait: 'Problem Solving', weight: 0.3, minScore: 4 }
    ]
  },
  'Agricultural Scientist': {
    personality: [
      { trait: 'Conscientiousness', weight: 0.3, minScore: 3 },
      { trait: 'Openness', weight: 0.3, minScore: 3 },
      { trait: 'Problem Solving', weight: 0.2, minScore: 3 }
    ],
    skills: [
      { trait: 'Analytical', weight: 0.3, minScore: 3 },
      { trait: 'Technical', weight: 0.2, minScore: 2 },
      { trait: 'Problem Solving', weight: 0.3, minScore: 3 }
    ]
  },
  'Farmer': {
    personality: [
      { trait: 'Conscientiousness', weight: 0.4, minScore: 3 },
      { trait: 'Problem Solving', weight: 0.3, minScore: 3 },
      { trait: 'Openness', weight: 0.2, minScore: 2 }
    ],
    skills: [
      { trait: 'Technical', weight: 0.2, minScore: 2 },
      { trait: 'Problem Solving', weight: 0.3, minScore: 3 },
      { trait: 'Management', weight: 0.3, minScore: 3 }
    ]
  },
  'Nurse': {
    personality: [
      { trait: 'Agreeableness', weight: 0.4, minScore: 4 },
      { trait: 'Conscientiousness', weight: 0.3, minScore: 3 },
      { trait: 'Problem Solving', weight: 0.2, minScore: 3 }
    ],
    skills: [
      { trait: 'Communication', weight: 0.4, minScore: 4 },
      { trait: 'Problem Solving', weight: 0.3, minScore: 3 },
      { trait: 'Technical', weight: 0.2, minScore: 2 }
    ]
  },
  'Teacher': {
    personality: [
      { trait: 'Communication', weight: 0.4, minScore: 4 },
      { trait: 'Agreeableness', weight: 0.3, minScore: 3 },
      { trait: 'Openness', weight: 0.2, minScore: 3 }
    ],
    skills: [
      { trait: 'Communication', weight: 0.4, minScore: 4 },
      { trait: 'Problem Solving', weight: 0.2, minScore: 3 },
      { trait: 'Management', weight: 0.3, minScore: 3 }
    ]
  },
  'Chef': {
    personality: [
      { trait: 'Creativity', weight: 0.4, minScore: 4 },
      { trait: 'Conscientiousness', weight: 0.3, minScore: 3 },
      { trait: 'Problem Solving', weight: 0.2, minScore: 3 }
    ],
    skills: [
      { trait: 'Creativity', weight: 0.3, minScore: 4 },
      { trait: 'Management', weight: 0.3, minScore: 3 },
      { trait: 'Technical', weight: 0.2, minScore: 3 }
    ]
  },
  'Data Scientist': {
    personality: [
      { trait: 'Problem Solving', weight: 0.3, minScore: 4 },
      { trait: 'Openness', weight: 0.2, minScore: 3 },
      { trait: 'Conscientiousness', weight: 0.2, minScore: 3 }
    ],
    skills: [
      { trait: 'Analytical', weight: 0.4, minScore: 4 },
      { trait: 'Technical', weight: 0.3, minScore: 3 },
      { trait: 'Problem Solving', weight: 0.3, minScore: 4 }
    ]
  },
  'UX/UI Designer': {
    personality: [
      { trait: 'Creativity', weight: 0.4, minScore: 4 },
      { trait: 'Openness', weight: 0.3, minScore: 3 },
      { trait: 'Agreeableness', weight: 0.2, minScore: 3 }
    ],
    skills: [
      { trait: 'Creativity', weight: 0.4, minScore: 4 },
      { trait: 'Communication', weight: 0.3, minScore: 3 },
      { trait: 'Technical', weight: 0.2, minScore: 2 }
    ]
  }
  // Add more career weights as needed
};

// Calculate trait match score
const calculateTraitMatchScore = (
  userTraits: { trait: string; score: number; }[] | { category: string; score: number; }[],
  careerTraits: TraitWeight[]
): number => {
  let totalScore = 0;
  let totalWeight = 0;

  careerTraits.forEach(careerTrait => {
    const userTrait = userTraits.find(t => 
      'trait' in t ? t.trait === careerTrait.trait : t.category === careerTrait.trait
    );
    
    if (userTrait) {
      const traitScore = userTrait.score >= careerTrait.minScore
        ? userTrait.score / 5 // Normalize to 0-1 range
        : (userTrait.score / careerTrait.minScore) * 0.8; // Penalty for not meeting minimum
      totalScore += traitScore * careerTrait.weight;
      totalWeight += careerTrait.weight;
    }
  });

  return totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;
};

// Calculate interest match based on selected interests
const calculateInterestMatch = (
  userInterests: string[],
  careerSkills: string[]
): number => {
  if (!userInterests.length || !careerSkills.length) return 0;
  
  const matchingInterests = userInterests.filter(interest =>
    careerSkills.some(skill => skill.toLowerCase().includes(interest.toLowerCase()))
  );
  
  return (matchingInterests.length / Math.max(userInterests.length, careerSkills.length)) * 100;
};

export const calculateCareerMatches = (
  userProfile: UserProfile,
  careers: CareerRecommendation[]
): CareerRecommendation[] => {
  return careers.map(career => {
    const careerWeights = careerTraitWeights[career.title] || {
      personality: [],
      skills: []
    };

    // Calculate personality match
    const personalityScore = calculateTraitMatchScore(
      userProfile.personalityTraits,
      careerWeights.personality
    );

    // Calculate skills match
    const skillsScore = calculateTraitMatchScore(
      userProfile.skills,
      careerWeights.skills
    );

    // Calculate interest match
    const interestScore = calculateInterestMatch(
      userProfile.interests,
      career.keySkills
    );

    // Calculate weighted average of all scores
    const matchPercentage = Math.round(
      (personalityScore * 0.4) + (skillsScore * 0.4) + (interestScore * 0.2)
    );

    return {
      ...career,
      matchPercentage: Math.min(100, Math.max(0, matchPercentage)) // Ensure between 0-100
    };
  })
  .sort((a, b) => b.matchPercentage - a.matchPercentage); // Sort by match percentage
}; 