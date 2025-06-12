import { UserProfile } from '../types';

const GEMINI_API_KEY = 'AIzaSyAElluBfjmbf2J26u_jtglIxKMSO07mTWg';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface CareerMatch {
  id: string;
  title: string;
  matchPercentage: number;
  description: string;
  salary: string;
  growth: string;
  keySkills: string[];
  education: string[];
}

export const calculateCareerMatches = async (userProfile: UserProfile): Promise<CareerMatch[]> => {
  const prompt = `
    Based on this user profile data, calculate and provide career matches with detailed information:
    
    Personality Traits:
    ${userProfile.personalityTraits.map(trait => `${trait.trait}: ${trait.score}`).join('\n')}
    
    Skills:
    ${userProfile.skills.map(skill => `${skill.category}: ${skill.score}`).join('\n')}
    
    Interests:
    ${userProfile.interests.join(', ')}
    
    Please provide the career matches in the following JSON format:
    [
      {
        "id": "unique_id",
        "title": "Career Title",
        "matchPercentage": number between 0-100,
        "description": "Career description",
        "salary": "Salary range",
        "growth": "Growth rate/outlook",
        "keySkills": ["skill1", "skill2", ...],
        "education": ["education requirement 1", "education requirement 2", ...]
      }
    ]
    
    Return exactly 5 best matching careers based on the profile data.
    Ensure match percentages are calculated based on skill alignment, personality fit, and interest overlap.
  `;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get career matches from Gemini API');
    }

    const data = await response.json();
    const careerMatchesText = data.candidates[0]?.content?.parts[0]?.text;
    
    if (!careerMatchesText) {
      throw new Error('Invalid response format from Gemini API');
    }

    // Extract the JSON array from the response text
    const jsonMatch = careerMatchesText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const careerMatches = JSON.parse(jsonMatch[0]);
    return careerMatches;
  } catch (error) {
    console.error('Error calculating career matches:', error);
    throw error;
  }
}; 