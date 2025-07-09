import { UserProfile, CareerRecommendation } from '../types';
import { mockCareerRecommendations } from '../data/mockData';

// Force USE_MOCK_DATA to true for now
const USE_MOCK_DATA = true;
console.info('Using mock data for Gemini API responses');

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Helper function to normalize strings for comparison
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove all non-alphanumeric characters
    .trim();
}

// Helper function to find the best matching career from mock data
function findBestMatchingCareer(title: string, mockCareers: CareerRecommendation[]): CareerRecommendation | null {
  const normalizedTitle = normalizeString(title);
  
  // First try exact match after normalization
  const exactMatch = mockCareers.find(
    career => normalizeString(career.title) === normalizedTitle
  );
  if (exactMatch) return exactMatch;

  // If no exact match, try finding a career that contains the title or vice versa
  const partialMatch = mockCareers.find(career => {
    const normalizedCareerTitle = normalizeString(career.title);
    return normalizedCareerTitle.includes(normalizedTitle) || 
           normalizedTitle.includes(normalizedCareerTitle);
  });
  if (partialMatch) return partialMatch;

  // If still no match, try finding similar careers based on keywords
  const keywords = normalizedTitle.split(/[^a-z0-9]+/);
  if (keywords.length > 1) {
    const keywordMatch = mockCareers.find(career => {
      const careerKeywords = normalizeString(career.title).split(/[^a-z0-9]+/);
      return keywords.some(keyword => 
        careerKeywords.some(careerKeyword => 
          careerKeyword.includes(keyword) || keyword.includes(careerKeyword)
        )
      );
    });
    if (keywordMatch) return keywordMatch;
  }

  return null;
}

// Helper function to generate mock career recommendations
function generateMockCareerRecommendations(userProfile: UserProfile): CareerRecommendation[] {
  // Get the top skills
  const topSkills = [...userProfile.skills]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(skill => skill.category.toLowerCase());

  // Filter and score careers based on skills match
  return mockCareerRecommendations
    .map(career => {
      const matchingSkills = career.keySkills
        .filter(skill => 
          topSkills.some(userSkill => 
            skill.toLowerCase().includes(userSkill) || 
            userSkill.includes(skill.toLowerCase())
          )
        );
      
      const matchPercentage = Math.min(100, Math.round((matchingSkills.length / topSkills.length) * 100));
      
      return {
        ...career,
        matchPercentage: matchPercentage
      };
    })
    .filter(career => career.matchPercentage > 0)
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 5);
}

// Helper function to generate mock personality analysis
function generateMockPersonalityAnalysis(userProfile: UserProfile): string {
  const topTraits = userProfile.personalityTraits
    .filter(trait => trait.score >= 4)
    .map(trait => trait.trait.toLowerCase());

  const traits = topTraits.length > 0 
    ? topTraits.join(', ') 
    : 'balanced personality traits';

  return `You demonstrate strong ${traits}. Your assessment results indicate that you have a well-rounded profile with potential for growth in various professional domains. Your combination of skills and traits positions you well for roles that align with your strengths.`;
}

export async function getCareerRecommendations(userProfile: UserProfile): Promise<CareerRecommendation[]> {
  if (USE_MOCK_DATA) {
    return generateMockCareerRecommendations(userProfile);
  }

  try {
    // Prepare the prompt for Gemini
    const prompt = `You are a career recommendation system. Based on the following user assessment data, analyze and recommend the most suitable careers from this list of available careers:

${mockCareerRecommendations.map(career => career.title).join(', ')}

User Profile:
Personality Traits:
${userProfile.personalityTraits.map(trait => `${trait.trait}: ${trait.score}/5`).join('\n')}

Skills:
${userProfile.skills.map(skill => `${skill.category}: ${skill.score}/5`).join('\n')}

Interests:
${userProfile.interests.join(', ')}

Analyze the profile and return a JSON array of career recommendations. Each recommendation should include the career title (exactly as shown in the list above) and a match percentage (0-100).

Example format:
[
  {
    "title": "Software Developer",
    "matchPercentage": 85
  }
]

Return ONLY the JSON array, no other text.`;

    console.log('Sending request to Gemini API...');
    
    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        }
      })
    });

    console.log('Received response from Gemini API');
    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
    
    if (!response.ok) {
      console.error('API Error Response:', data);
      throw new Error(`API Error: ${data.error?.message || 'Unknown error'}`);
    }

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid API Response Structure:', data);
      throw new Error('Invalid response structure from Gemini API');
    }

    // Parse Gemini's response to extract career recommendations
    const geminiText = data.candidates[0].content.parts[0].text;
    console.log('Gemini Response Text:', geminiText);

    let recommendations;
    try {
      // Try to clean the response text before parsing
      const cleanedText = geminiText
        .replace(/^```json\s*/, '') // Remove potential JSON code block start
        .replace(/\s*```$/, '')     // Remove potential JSON code block end
        .trim();
      
      recommendations = JSON.parse(cleanedText);
      
      if (!Array.isArray(recommendations)) {
        console.error('Parsed response is not an array:', recommendations);
        throw new Error('Response is not an array');
      }
      
      console.log('Parsed Recommendations:', recommendations);
    } catch (parseError: any) {
      console.error('JSON Parse Error:', parseError);
      console.error('Failed to parse response text:', geminiText);
      throw new Error(`Failed to parse API response: ${parseError.message || 'Unknown parsing error'}`);
    }

    // Validate and transform recommendations
    const validRecommendations = recommendations
      .filter((rec: any) => {
        const isValid = rec && 
          typeof rec.title === 'string' && 
          typeof rec.matchPercentage === 'number' &&
          rec.title.trim() !== '';
        
        if (!isValid) {
          console.warn('Filtered out invalid recommendation:', rec);
        }
        return isValid;
      })
      .map((rec: { title: string; matchPercentage: number }) => {
        // Find the full career details from our mock data using the improved matching
        const careerDetails = findBestMatchingCareer(rec.title, mockCareerRecommendations);
        const matchPercentage = Math.min(100, Math.max(0, Math.round(rec.matchPercentage)));

        if (!careerDetails) {
          console.warn(`Career details not found for: ${rec.title}`);
          return {
            id: `generated_${Math.random().toString(36).substr(2, 9)}`,
            title: rec.title,
            matchPercentage,
            description: 'Career details not available',
            salary: 'Salary information not available',
            growth: 'Growth information not available',
            keySkills: [],
            education: []
          };
        }

        return {
          ...careerDetails,
          matchPercentage
        };
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    if (validRecommendations.length === 0) {
      throw new Error('No valid career recommendations generated');
    }

    console.log(`Generated ${validRecommendations.length} valid career recommendations`);
    return validRecommendations;

  } catch (error) {
    console.error('Error in getCareerRecommendations:', error);
    throw error;
  }
}

export async function getPersonalityAnalysis(userProfile: UserProfile): Promise<string> {
  if (USE_MOCK_DATA) {
    return generateMockPersonalityAnalysis(userProfile);
  }

  try {
    const prompt = `Based on the following personality trait scores, provide a brief, positive, and professional 2-3 sentence analysis of the person's personality. Write directly to the person using "you" and "your". Focus on their strengths and potential.

Personality Traits:
${userProfile.personalityTraits.map(trait => `${trait.trait}: ${trait.score}/5`).join('\n')}

Keep the response concise, encouraging, and personal. Address the person directly using second person pronouns (you/your). Do not mention the numerical scores directly. Example style: "You demonstrate strong..." instead of "This individual demonstrates..."`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 32,
          topP: 1,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`API Error: ${data.error?.message || 'Unknown error'}`);
    }

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response structure from Gemini API');
    }

    return data.candidates[0].content.parts[0].text.trim();

  } catch (error) {
    console.error('Error in getPersonalityAnalysis:', error);
    throw error;
  }
} 