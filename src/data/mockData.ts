import { Assessment, Question, CareerRecommendation, UserProfile } from '../types';

export const mockAssessments: Assessment[] = [
  {
    id: 'personality',
    title: 'Personality Assessment',
    description: 'Discover your unique personality traits and work preferences.',
    progress: 0,
    totalQuestions: 15,
    completed: false,
    icon: 'brain'
  },
  {
    id: 'skills',
    title: 'Skills Assessment',
    description: 'Evaluate your technical and soft skills.',
    progress: 0,
    totalQuestions: 20,
    completed: false,
    icon: 'code-2'
  },
  {
    id: 'interests',
    title: 'Interest Profiling',
    description: 'Identify your career interests and preferences.',
    progress: 0,
    totalQuestions: 12,
    completed: false,
    icon: 'heart'
  }
];

export const mockQuestions: Record<string, Question[]> = {
  personality: [
    {
      id: 'p1',
      text: 'I enjoy being the center of attention in social situations.',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    {
      id: 'p2',
      text: 'I prefer working in teams rather than individually.',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    {
      id: 'p3',
      text: 'I prefer a structured and organized approach to work.',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    {
      id: 'p4',
      text: 'How do you typically handle stress?',
      type: 'choice',
      options: [
        'I take a break and return later',
        'I push through until the task is complete',
        'I seek help from others',
        'I break the problem into smaller parts'
      ]
    },
    {
      id: 'p5',
      text: 'I enjoy solving complex problems.',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    {
      id: 'p6',
      text: 'I find it easy to adapt to unexpected changes in plans or tasks.',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    {
      id: 'p7',
      text: 'I often worry about things that might go wrong.',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    {
      id: 'p8',
      text: 'In a work environment, I prefer:',
      type: 'choice',
      options: [
        'Clear instructions and established procedures',
        'Freedom to approach tasks in my own way',
        'A mix of structure and flexibility',
        'Different approaches depending on the task'
      ]
    },
    {
      id: 'p9',
      text: 'I tend to think carefully before making decisions.',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    {
      id: 'p10',
      text: 'I enjoy having deep conversations about abstract ideas and concepts.',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    {
      id: 'p11',
      text: 'How do you feel about working under tight deadlines?',
      type: 'choice',
      options: [
        'I thrive under pressure',
        'I can manage but prefer adequate time',
        'I find it stressful but can adapt',
        'I strongly prefer to avoid tight deadlines'
      ]
    },
    {
      id: 'p12',
      text: 'I find it easy to understand and empathize with others\' feelings.',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    {
      id: 'p13',
      text: 'When faced with criticism, I usually:',
      type: 'choice',
      options: [
        'Take it as an opportunity to improve',
        'Feel defensive initially but reflect later',
        'Analyze whether it\'s valid before accepting it',
        'Find it difficult to handle criticism well'
      ]
    },
    {
      id: 'p14',
      text: 'I tend to focus on details rather than the big picture.',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    {
      id: 'p15',
      text: 'I prefer environments where I can:',
      type: 'choice',
      options: [
        'Follow a consistent routine',
        'Experience variety and new challenges',
        'Balance between routine and novelty',
        'Focus on one major project at a time'
      ]
    }
  ],
  skills: [
    {
      id: 's1',
      text: 'Rate your programming skills',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Beginner',
      maxLabel: 'Expert'
    },
    {
      id: 's2',
      text: 'Rate your communication skills',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Beginner',
      maxLabel: 'Expert'
    },
    {
      id: 's3',
      text: 'Which of these technologies are you proficient in?',
      type: 'multiselect',
      options: [
        'JavaScript',
        'Python',
        'Java',
        'C++',
        'SQL',
        'Cloud Services',
        'Machine Learning',
        'Data Analysis'
      ]
    },
    {
      id: 's4',
      text: 'Rate your project management skills',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Beginner',
      maxLabel: 'Expert'
    },
    {
      id: 's5',
      text: 'Rate your problem-solving abilities',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Beginner',
      maxLabel: 'Expert'
    },
    {
      id: 's6',
      text: 'Which soft skills do you consider your strengths?',
      type: 'multiselect',
      options: [
        'Leadership',
        'Teamwork',
        'Time Management',
        'Conflict Resolution',
        'Adaptability',
        'Critical Thinking',
        'Emotional Intelligence',
        'Negotiation'
      ]
    },
    {
      id: 's7',
      text: 'What is your experience level with data visualization?',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Beginner',
      maxLabel: 'Expert'
    },
    {
      id: 's8',
      text: 'Rate your public speaking abilities',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Beginner',
      maxLabel: 'Expert'
    },
    {
      id: 's9',
      text: 'What is your highest level of education?',
      type: 'choice',
      options: [
        'High School',
        'Associate\'s Degree',
        'Bachelor\'s Degree',
        'Master\'s Degree',
        'Doctorate',
        'Professional Certification',
        'Self-taught'
      ]
    },
    {
      id: 's10',
      text: 'Which design tools are you familiar with?',
      type: 'multiselect',
      options: [
        'Adobe Photoshop',
        'Adobe Illustrator',
        'Figma',
        'Sketch',
        'Canva',
        'InDesign',
        'After Effects',
        'None of these'
      ]
    },
    {
      id: 's11',
      text: 'How experienced are you with remote work?',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'No Experience',
      maxLabel: 'Very Experienced'
    },
    {
      id: 's12',
      text: 'Rate your writing skills',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Beginner',
      maxLabel: 'Expert'
    },
    {
      id: 's13',
      text: 'Which business skills do you possess?',
      type: 'multiselect',
      options: [
        'Strategic Planning',
        'Market Analysis',
        'Financial Management',
        'Sales',
        'Customer Relationship Management',
        'Digital Marketing',
        'Business Development',
        'Process Optimization'
      ]
    },
    {
      id: 's14',
      text: 'How many years of professional work experience do you have?',
      type: 'choice',
      options: [
        'None',
        'Less than 1 year',
        '1-3 years',
        '3-5 years',
        '5-10 years',
        '10+ years'
      ]
    },
    {
      id: 's15',
      text: 'Rate your research abilities',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Beginner',
      maxLabel: 'Expert'
    },
    {
      id: 's16',
      text: 'Which languages do you speak fluently?',
      type: 'multiselect',
      options: [
        'English',
        'Spanish',
        'Mandarin',
        'French',
        'German',
        'Arabic',
        'Japanese',
        'Other'
      ]
    },
    {
      id: 's17',
      text: 'How comfortable are you with leading a team?',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Not Comfortable',
      maxLabel: 'Very Comfortable'
    },
    {
      id: 's18',
      text: 'What analytical tools are you proficient with?',
      type: 'multiselect',
      options: [
        'Excel/Spreadsheets',
        'Tableau',
        'Power BI',
        'R',
        'SPSS',
        'SAS',
        'Google Analytics',
        'None of these'
      ]
    },
    {
      id: 's19',
      text: 'Rate your ability to work under pressure',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Struggle',
      maxLabel: 'Thrive'
    },
    {
      id: 's20',
      text: 'Which project management methodologies are you familiar with?',
      type: 'multiselect',
      options: [
        'Agile',
        'Scrum',
        'Waterfall',
        'Kanban',
        'Lean',
        'Six Sigma',
        'PRINCE2',
        'None of these'
      ]
    }
  ],
  interests: [
    {
      id: 'i1',
      text: 'I enjoy working with data and statistics.',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    {
      id: 'i2',
      text: 'I prefer creative work over analytical work.',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    {
      id: 'i3',
      text: 'Which of these activities do you enjoy most?',
      type: 'choice',
      options: [
        'Designing and creating things',
        'Analyzing data and solving problems',
        'Helping and teaching others',
        'Managing and organizing people/projects'
      ]
    },
    {
      id: 'i4',
      text: 'I enjoy taking leadership roles.',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    {
      id: 'i5',
      text: 'Select industries you find interesting:',
      type: 'multiselect',
      options: [
        'Technology',
        'Healthcare',
        'Finance',
        'Education',
        'Creative Arts',
        'Science & Research',
        'Business',
        'Social Services'
      ]
    },
    {
      id: 'i6',
      text: 'I prefer working in an environment that:',
      type: 'choice',
      options: [
        'Is fast-paced and dynamic',
        'Is structured and predictable',
        'Offers a balance of both',
        'Is remote or flexible'
      ]
    },
    {
      id: 'i7',
      text: 'I value having a job that contributes to society.',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Not Important',
      maxLabel: 'Very Important'
    },
    {
      id: 'i8',
      text: 'Select the work values most important to you:',
      type: 'multiselect',
      options: [
        'High income potential',
        'Work-life balance',
        'Job security',
        'Career advancement',
        'Autonomy/independence',
        'Making a difference',
        'Recognition',
        'Challenging work'
      ]
    },
    {
      id: 'i9',
      text: 'I enjoy work that involves frequent interaction with others.',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    {
      id: 'i10',
      text: 'Which work environment would you prefer?',
      type: 'choice',
      options: [
        'Corporate/office setting',
        'Creative studio/workshop',
        'Outdoor/field work',
        'Home-based/remote work'
      ]
    },
    {
      id: 'i11',
      text: 'Select areas where you\'d like to develop skills:',
      type: 'multiselect',
      options: [
        'Technical expertise',
        'Leadership',
        'Creative expression',
        'Analysis and research',
        'Communication',
        'Entrepreneurship',
        'People management',
        'Innovation'
      ]
    },
    {
      id: 'i12',
      text: 'How important is geographical location in your career choices?',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Not Important',
      maxLabel: 'Very Important'
    }
  ]
};

export const mockCareerRecommendations: CareerRecommendation[] = [
  {
    id: 'md1',
    title: 'Medical Doctor',
    description: 'Diagnose and treat illnesses and injuries in patients. Work in hospitals, clinics, or private practices to provide essential healthcare services.',
    salary: '$208,000 - $400,000 per year',
    growth: '3% (Average growth rate)',
    keySkills: ['Clinical Knowledge', 'Patient Care', 'Diagnosis', 'Medical Procedures', 'Communication', 'Critical Thinking'],
    education: [
      'Doctor of Medicine (MD) or Doctor of Osteopathic Medicine (DO)',
      'Complete medical residency (3-7 years)',
      'State medical license',
      'Board certification in specialty (optional)'
    ],
    matchPercentage: 0
  },
  {
    id: 'ag1',
    title: 'Agricultural Scientist',
    description: 'Research and develop ways to improve crop yields, soil health, and farming efficiency while ensuring sustainable agricultural practices.',
    salary: '$65,000 - $120,000 per year',
    growth: '7% (Faster than average)',
    keySkills: ['Research', 'Data Analysis', 'Soil Science', 'Plant Biology', 'Sustainable Agriculture', 'Field Research'],
    education: [
      'Bachelor\'s degree in Agricultural Science or related field',
      'Master\'s degree for advanced positions',
      'Ph.D. for research positions',
      'Field experience'
    ],
    matchPercentage: 0
  },
  {
    id: 'fm1',
    title: 'Farmer',
    description: 'Manage agricultural operations, including crop planning, livestock care, and farm business management.',
    salary: '$45,000 - $120,000 per year',
    growth: '2% (Steady)',
    keySkills: ['Crop Management', 'Animal Husbandry', 'Equipment Operation', 'Business Management', 'Problem-Solving'],
    education: [
      'High school diploma or equivalent',
      'Associate\'s or Bachelor\'s degree in Agriculture (recommended)',
      'Practical experience',
      'Business management knowledge'
    ],
    matchPercentage: 0
  },
  {
    id: 'sd1',
    title: 'Software Developer',
    description: 'Design, develop, and maintain software applications and systems using various programming languages and tools.',
    salary: '$75,000 - $150,000 per year',
    growth: '22% (Much faster than average)',
    keySkills: ['Programming', 'Problem Solving', 'Software Design', 'Debugging', 'Team Collaboration'],
    education: [
      'Bachelor\'s degree in Computer Science or related field',
      'Relevant certifications',
      'Portfolio of projects',
      'Continuous learning of new technologies'
    ],
    matchPercentage: 0
  },
  {
    id: 'nr1',
    title: 'Nurse',
    description: 'Provide direct patient care, administer medications, and collaborate with healthcare teams in various medical settings.',
    salary: '$75,000 - $120,000 per year',
    growth: '6% (Faster than average)',
    keySkills: ['Patient Care', 'Medical Knowledge', 'Communication', 'Critical Thinking', 'Empathy'],
    education: [
      'Bachelor of Science in Nursing (BSN)',
      'Registered Nurse (RN) license',
      'Specialized certifications',
      'Continuing education'
    ],
    matchPercentage: 0
  },
  {
    id: 'tc1',
    title: 'Teacher',
    description: 'Educate students, develop curriculum, and create engaging learning environments in schools or educational institutions.',
    salary: '$45,000 - $85,000 per year',
    growth: '4% (Average growth rate)',
    keySkills: ['Instruction', 'Curriculum Development', 'Classroom Management', 'Communication', 'Assessment'],
    education: [
      'Bachelor\'s degree in Education or subject area',
      'Teaching certification/license',
      'Master\'s degree (for advancement)',
      'Continuing education credits'
    ],
    matchPercentage: 0
  },
  {
    id: 'cf1',
    title: 'Chef',
    description: 'Create menus, prepare meals, manage kitchen operations, and ensure food quality and safety standards.',
    salary: '$45,000 - $90,000 per year',
    growth: '5% (Average growth rate)',
    keySkills: ['Culinary Arts', 'Menu Planning', 'Kitchen Management', 'Food Safety', 'Team Leadership'],
    education: [
      'Culinary arts degree or certification',
      'Apprenticeship experience',
      'Food safety certifications',
      'Management training'
    ],
    matchPercentage: 0
  },
  {
    id: 'ds1',
    title: 'Data Scientist',
    description: 'Analyze complex data sets to help organizations make informed decisions using statistical methods and machine learning.',
    salary: '$85,000 - $165,000 per year',
    growth: '36% (Much faster than average)',
    keySkills: ['Statistics', 'Machine Learning', 'Programming', 'Data Analysis', 'Problem Solving'],
    education: [
      'Master\'s or Ph.D. in Data Science, Statistics, or related field',
      'Programming skills',
      'Machine learning expertise',
      'Industry certifications'
    ],
    matchPercentage: 0
  },
  {
    id: 'ux1',
    title: 'UX/UI Designer',
    description: 'Design user interfaces and experiences for digital products, focusing on usability and user satisfaction.',
    salary: '$65,000 - $130,000 per year',
    growth: '13% (Faster than average)',
    keySkills: ['User Research', 'Interface Design', 'Prototyping', 'Visual Design', 'User Testing'],
    education: [
      'Bachelor\'s degree in Design or related field',
      'UX/UI certifications',
      'Portfolio of work',
      'Industry tools expertise'
    ],
    matchPercentage: 0
  },
  {
    id: 'c13',
    title: 'Machine Learning Operations Engineer',
    matchPercentage: 0,
    description: 'Develop and maintain infrastructure for deploying machine learning models at scale.',
    salary: '$95,000 - $170,000',
    growth: '30% (much faster than average)',
    keySkills: ['MLOps', 'DevOps', 'Python', 'Kubernetes', 'Model Deployment'],
    education: ['Computer Science Degree', 'MLOps Certification', 'Cloud Platform Experience']
  },
  {
    id: 'c14',
    title: 'Blockchain Developer',
    matchPercentage: 0,
    description: 'Build and maintain blockchain applications and smart contracts.',
    salary: '$90,000 - $175,000',
    growth: '32% (much faster than average)',
    keySkills: ['Blockchain', 'Smart Contracts', 'Cryptography', 'Solidity', 'Web3'],
    education: ['Computer Science Degree', 'Blockchain Certification', 'Cryptography Knowledge']
  },
  {
    id: 'c15',
    title: 'Quantum Computing Researcher',
    matchPercentage: 0,
    description: 'Research and develop quantum computing algorithms and applications.',
    salary: '$100,000 - $200,000',
    growth: '25% (much faster than average)',
    keySkills: ['Quantum Mechanics', 'Algorithm Design', 'Mathematics', 'Programming', 'Research'],
    education: ['Physics Degree', 'PhD in Quantum Computing', 'Advanced Mathematics']
  },
  {
    id: 'c16',
    title: 'AR/VR Developer',
    matchPercentage: 0,
    description: 'Create immersive experiences using augmented and virtual reality technologies.',
    salary: '$80,000 - $150,000',
    growth: '27% (much faster than average)',
    keySkills: ['3D Modeling', 'Unity/Unreal', 'Mobile Development', 'UI/UX', 'Computer Vision'],
    education: ['Computer Science Degree', 'Game Development', '3D Design Experience']
  },
  {
    id: 'c17',
    title: 'Robotics Engineer',
    matchPercentage: 0,
    description: 'Design, build, and program robots for various applications.',
    salary: '$85,000 - $160,000',
    growth: '24% (much faster than average)',
    keySkills: ['Robotics', 'Control Systems', 'Programming', 'Electronics', 'Mechanical Design'],
    education: ['Robotics Engineering Degree', 'Mechanical Engineering', 'Electronics']
  },
  {
    id: 'c18',
    title: 'Bioinformatics Scientist',
    matchPercentage: 0,
    description: 'Apply computational techniques to analyze biological data and solve complex problems.',
    salary: '$75,000 - $145,000',
    growth: '21% (much faster than average)',
    keySkills: ['Bioinformatics', 'Data Analysis', 'Programming', 'Biology', 'Statistics'],
    education: ['Biology Degree', 'Bioinformatics Masters', 'Computer Science Background']
  },
  {
    id: 'c19',
    title: 'FinTech Solutions Architect',
    matchPercentage: 0,
    description: 'Design and implement financial technology solutions for banking and trading.',
    salary: '$110,000 - $190,000',
    growth: '29% (much faster than average)',
    keySkills: ['Financial Systems', 'Architecture', 'Security', 'APIs', 'Payment Systems'],
    education: ['Computer Science Degree', 'Finance Background', 'FinTech Certification']
  },
  {
    id: 'c20',
    title: 'Digital Health Consultant',
    matchPercentage: 0,
    description: 'Advise healthcare organizations on digital transformation and technology adoption.',
    salary: '$90,000 - $170,000',
    growth: '26% (much faster than average)',
    keySkills: ['Healthcare IT', 'Consulting', 'Project Management', 'Digital Strategy', 'Change Management'],
    education: ['Healthcare Administration', 'IT Degree', 'Healthcare IT Certification']
  },
  {
    id: 'c21',
    title: 'Sustainability Technology Manager',
    matchPercentage: 0,
    description: 'Implement and manage technology solutions for environmental sustainability.',
    salary: '$80,000 - $150,000',
    growth: '23% (much faster than average)',
    keySkills: ['Sustainability', 'Project Management', 'Environmental Science', 'Data Analysis', 'Green Tech'],
    education: ['Environmental Science Degree', 'Sustainability Certification', 'Technology Management']
  },
  {
    id: 'c22',
    title: 'IoT Solutions Engineer',
    matchPercentage: 0,
    description: 'Design and implement Internet of Things solutions for various industries.',
    salary: '$85,000 - $155,000',
    growth: '28% (much faster than average)',
    keySkills: ['IoT Platforms', 'Embedded Systems', 'Networking', 'Security', 'Cloud Integration'],
    education: ['Computer Engineering', 'IoT Certification', 'Electronics Background']
  },
  {
    id: 'c23',
    title: 'Digital Forensics Analyst',
    matchPercentage: 0,
    description: 'Investigate cybercrime and recover data from digital devices.',
    salary: '$75,000 - $140,000',
    growth: '25% (much faster than average)',
    keySkills: ['Digital Forensics', 'Security', 'Investigation', 'Data Recovery', 'Legal Knowledge'],
    education: ['Computer Science Degree', 'Digital Forensics Certification', 'Law Enforcement Background']
  },
  {
    id: 'c24',
    title: 'Cloud Security Architect',
    matchPercentage: 0,
    description: 'Design and implement security solutions for cloud infrastructure.',
    salary: '$120,000 - $200,000',
    growth: '31% (much faster than average)',
    keySkills: ['Cloud Security', 'Architecture', 'Risk Management', 'Compliance', 'Identity Management'],
    education: ['Computer Science Degree', 'Security Certifications', 'Cloud Platform Expertise']
  },
  {
    id: 'c25',
    title: 'Data Privacy Officer',
    matchPercentage: 0,
    description: 'Ensure organizational compliance with data protection regulations.',
    salary: '$90,000 - $160,000',
    growth: '24% (much faster than average)',
    keySkills: ['Privacy Laws', 'Compliance', 'Risk Management', 'Policy Development', 'Security'],
    education: ['Law Degree', 'Privacy Certifications', 'IT Security Background']
  },
  {
    id: 'c26',
    title: 'Edge Computing Engineer',
    matchPercentage: 0,
    description: 'Develop and maintain edge computing infrastructure and applications.',
    salary: '$95,000 - $165,000',
    growth: '29% (much faster than average)',
    keySkills: ['Edge Computing', 'Distributed Systems', 'IoT', 'Networking', 'Security'],
    education: ['Computer Engineering', 'Cloud Certifications', 'Networking Experience']
  },
  {
    id: 'c27',
    title: 'Digital Twin Developer',
    matchPercentage: 0,
    description: 'Create virtual replicas of physical systems for simulation and analysis.',
    salary: '$85,000 - $155,000',
    growth: '26% (much faster than average)',
    keySkills: ['3D Modeling', 'Simulation', 'Data Integration', 'IoT', 'Programming'],
    education: ['Computer Science Degree', 'Digital Twin Certification', '3D Modeling Experience']
  },
  {
    id: 'c28',
    title: 'Quantum Security Specialist',
    matchPercentage: 0,
    description: 'Develop and implement quantum-resistant security solutions.',
    salary: '$110,000 - $190,000',
    growth: '30% (much faster than average)',
    keySkills: ['Quantum Computing', 'Cryptography', 'Security', 'Mathematics', 'Programming'],
    education: ['Physics Degree', 'Cryptography Certification', 'Security Background']
  },
  {
    id: 'c29',
    title: 'Smart City Solutions Architect',
    matchPercentage: 0,
    description: 'Design technology solutions for smart city infrastructure.',
    salary: '$100,000 - $180,000',
    growth: '27% (much faster than average)',
    keySkills: ['Urban Planning', 'IoT', 'Data Analytics', 'Project Management', 'Systems Integration'],
    education: ['Urban Planning Degree', 'Technology Management', 'IoT Certification']
  },
  {
    id: 'c30',
    title: 'Autonomous Vehicle Engineer',
    matchPercentage: 0,
    description: 'Develop software and systems for self-driving vehicles.',
    salary: '$110,000 - $200,000',
    growth: '32% (much faster than average)',
    keySkills: ['Computer Vision', 'Machine Learning', 'Robotics', 'Control Systems', 'Sensor Integration'],
    education: ['Robotics Engineering', 'Computer Science Degree', 'Automotive Experience']
  },
  {
    id: 'c31',
    title: 'Space Systems Engineer',
    matchPercentage: 0,
    description: 'Design and develop systems for space exploration and satellite technology.',
    salary: '$95,000 - $180,000',
    growth: '25% (much faster than average)',
    keySkills: ['Aerospace Engineering', 'Systems Engineering', 'Control Systems', 'Programming', 'Physics'],
    education: ['Aerospace Engineering Degree', 'Space Systems Certification', 'Physics Background']
  },
  {
    id: 'c32',
    title: 'Neuromorphic Computing Engineer',
    matchPercentage: 0,
    description: 'Develop brain-inspired computing systems and algorithms.',
    salary: '$105,000 - $185,000',
    growth: '28% (much faster than average)',
    keySkills: ['Neural Networks', 'Hardware Design', 'Programming', 'Mathematics', 'Research'],
    education: ['Computer Engineering', 'Neuroscience Background', 'PhD in Related Field']
  },
  {
    id: 'c33',
    title: 'Digital Ethics Officer',
    matchPercentage: 0,
    description: 'Ensure ethical implementation of AI and digital technologies.',
    salary: '$95,000 - $170,000',
    growth: '24% (much faster than average)',
    keySkills: ['Ethics', 'Policy Development', 'AI Understanding', 'Communication', 'Research'],
    education: ['Philosophy Degree', 'Ethics Certification', 'Technology Background']
  },
  {
    id: 'c34',
    title: 'Synthetic Biology Engineer',
    matchPercentage: 0,
    description: 'Design and engineer biological systems for various applications.',
    salary: '$90,000 - $165,000',
    growth: '26% (much faster than average)',
    keySkills: ['Genetic Engineering', 'Programming', 'Biology', 'Lab Techniques', 'Data Analysis'],
    education: ['Bioengineering Degree', 'Synthetic Biology PhD', 'Programming Skills']
  },
  {
    id: 'c35',
    title: 'Human-Robot Interaction Specialist',
    matchPercentage: 0,
    description: 'Design and improve interactions between humans and robots.',
    salary: '$85,000 - $160,000',
    growth: '27% (much faster than average)',
    keySkills: ['Robotics', 'Psychology', 'UI/UX', 'Programming', 'Research'],
    education: ['Human-Computer Interaction Degree', 'Robotics Background', 'Psychology Knowledge']
  },
  {
    id: 'c36',
    title: 'Computational Linguist',
    matchPercentage: 0,
    description: 'Develop natural language processing systems and applications.',
    salary: '$90,000 - $170,000',
    growth: '29% (much faster than average)',
    keySkills: ['NLP', 'Machine Learning', 'Linguistics', 'Programming', 'Research'],
    education: ['Computational Linguistics Degree', 'Computer Science Background', 'Linguistics Knowledge']
  },
  {
    id: 'c37',
    title: 'Digital Agriculture Specialist',
    matchPercentage: 0,
    description: 'Apply technology solutions to agriculture and farming.',
    salary: '$75,000 - $140,000',
    growth: '23% (much faster than average)',
    keySkills: ['Agriculture Tech', 'Data Analysis', 'IoT', 'GIS', 'Project Management'],
    education: ['Agricultural Science Degree', 'Technology Certification', 'Farming Experience']
  },
  {
    id: 'c38',
    title: 'Quantum Algorithm Developer',
    matchPercentage: 0,
    description: 'Design and implement algorithms for quantum computers.',
    salary: '$115,000 - $195,000',
    growth: '31% (much faster than average)',
    keySkills: ['Quantum Computing', 'Algorithm Design', 'Mathematics', 'Programming', 'Physics'],
    education: ['Physics Degree', 'Quantum Computing PhD', 'Computer Science Background']
  },
  {
    id: 'c39',
    title: 'Brain-Computer Interface Developer',
    matchPercentage: 0,
    description: 'Develop systems that enable direct communication between brains and computers.',
    salary: '$100,000 - $180,000',
    growth: '28% (much faster than average)',
    keySkills: ['Neuroscience', 'Programming', 'Signal Processing', 'Hardware Design', 'Research'],
    education: ['Neuroscience Degree', 'Computer Science Background', 'BCI Experience']
  },
  {
    id: 'c40',
    title: 'Renewable Energy Systems Engineer',
    matchPercentage: 0,
    description: 'Design and implement renewable energy technology solutions.',
    salary: '$85,000 - $155,000',
    growth: '25% (much faster than average)',
    keySkills: ['Renewable Energy', 'Systems Engineering', 'Power Systems', 'Project Management', 'Sustainability'],
    education: ['Electrical Engineering', 'Renewable Energy Certification', 'Power Systems Experience']
  },
  {
    id: 'c41',
    title: 'Augmented Intelligence Designer',
    matchPercentage: 0,
    description: 'Design AI systems that enhance human intelligence and capabilities.',
    salary: '$95,000 - $175,000',
    growth: '29% (much faster than average)',
    keySkills: ['AI/ML', 'UX Design', 'Cognitive Science', 'Programming', 'Research'],
    education: ['Cognitive Science Degree', 'AI/ML Certification', 'UX Design Experience']
  },
  {
    id: 'c42',
    title: 'Digital Therapeutics Developer',
    matchPercentage: 0,
    description: 'Create software-based therapeutic interventions for medical conditions.',
    salary: '$90,000 - $165,000',
    growth: '26% (much faster than average)',
    keySkills: ['Healthcare IT', 'Programming', 'Clinical Research', 'FDA Compliance', 'UX Design'],
    education: ['Healthcare Informatics Degree', 'Clinical Background', 'Software Development']
  },
  {
    id: 'c43',
    title: 'Quantum Cryptography Engineer',
    matchPercentage: 0,
    description: 'Develop quantum-based cryptographic systems and protocols.',
    salary: '$105,000 - $185,000',
    growth: '30% (much faster than average)',
    keySkills: ['Quantum Physics', 'Cryptography', 'Security', 'Mathematics', 'Programming'],
    education: ['Physics Degree', 'Cryptography Certification', 'Security Background']
  },
  {
    id: 'c44',
    title: 'Biomechatronics Engineer',
    matchPercentage: 0,
    description: 'Design and develop robotic devices that interface with biological systems.',
    salary: '$95,000 - $175,000',
    growth: '27% (much faster than average)',
    keySkills: ['Robotics', 'Biomechanics', 'Electronics', 'Programming', 'Medical Knowledge'],
    education: ['Biomedical Engineering', 'Robotics Background', 'Medical Device Experience']
  },
  {
    id: 'c45',
    title: 'Cognitive Systems Engineer',
    matchPercentage: 0,
    description: 'Design systems that optimize human-machine interaction and cognitive performance.',
    salary: '$90,000 - $170,000',
    growth: '25% (much faster than average)',
    keySkills: ['Cognitive Science', 'Human Factors', 'UI/UX', 'Research', 'Programming'],
    education: ['Cognitive Engineering Degree', 'Human Factors Certification', 'Psychology Background']
  },
  {
    id: 'c46',
    title: 'Space Habitat Designer',
    matchPercentage: 0,
    description: 'Design living and working environments for space exploration.',
    salary: '$100,000 - $180,000',
    growth: '24% (much faster than average)',
    keySkills: ['Architecture', 'Space Systems', 'Environmental Systems', '3D Modeling', 'Engineering'],
    education: ['Aerospace Engineering', 'Architecture Degree', 'Space Systems Experience']
  },
  {
    id: 'c47',
    title: 'Neuromarketing Analyst',
    matchPercentage: 0,
    description: 'Apply neuroscience insights to marketing and consumer behavior analysis.',
    salary: '$80,000 - $150,000',
    growth: '22% (much faster than average)',
    keySkills: ['Neuroscience', 'Marketing', 'Data Analysis', 'Research', 'Psychology'],
    education: ['Neuroscience Degree', 'Marketing Background', 'Research Experience']
  },
  {
    id: 'c48',
    title: 'Quantum Machine Learning Engineer',
    matchPercentage: 0,
    description: 'Develop machine learning algorithms for quantum computers.',
    salary: '$110,000 - $190,000',
    growth: '32% (much faster than average)',
    keySkills: ['Quantum Computing', 'Machine Learning', 'Mathematics', 'Programming', 'Research'],
    education: ['Physics Degree', 'Machine Learning PhD', 'Quantum Computing Experience']
  },
  {
    id: 'c49',
    title: 'Bioprinting Engineer',
    matchPercentage: 0,
    description: 'Design and develop 3D printing systems for biological tissues.',
    salary: '$85,000 - $160,000',
    growth: '26% (much faster than average)',
    keySkills: ['Bioengineering', '3D Printing', 'Cell Biology', 'Materials Science', 'CAD'],
    education: ['Biomedical Engineering', 'Tissue Engineering Background', '3D Printing Experience']
  },
  {
    id: 'c50',
    title: 'Swarm Robotics Engineer',
    matchPercentage: 0,
    description: 'Develop systems for coordinating multiple robots in swarm behavior.',
    salary: '$95,000 - $175,000',
    growth: '28% (much faster than average)',
    keySkills: ['Robotics', 'Distributed Systems', 'AI/ML', 'Control Systems', 'Programming'],
    education: ['Robotics Engineering', 'Computer Science Degree', 'Multi-Agent Systems Experience']
  }
];

export const mockUserProfile: UserProfile = {
  name: '',
  assessmentsCompleted: 0,
  totalAssessments: 3,
  personalityTraits: [
    { trait: 'Openness', score: 0 },
    { trait: 'Conscientiousness', score: 0 },
    { trait: 'Extraversion', score: 0 },
    { trait: 'Agreeableness', score: 0 },
    { trait: 'Neuroticism', score: 0 },
    { trait: 'Problem Solving', score: 0 },
    { trait: 'Creativity', score: 0 },
    { trait: 'Leadership', score: 0 }
  ],
  skills: [
    { category: 'Technical', score: 0 },
    { category: 'Communication', score: 0 },
    { category: 'Leadership', score: 0 },
    { category: 'Creativity', score: 0 },
    { category: 'Analytical', score: 0 },
    { category: 'Project Management', score: 0 },
    { category: 'Problem Solving', score: 0 },
    { category: 'Teamwork', score: 0 }
  ],
  interests: [],
  completedAssessments: []
};
