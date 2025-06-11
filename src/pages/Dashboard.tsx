import { useState } from 'react';
import { UserProfile } from '../types';

interface DashboardProps {
  userName: string;
  userProfile: UserProfile;
  updateUserProfile: (data: Partial<UserProfile>) => void;
}

export default function Dashboard({ 
  userName,
  userProfile,
  updateUserProfile 
}: DashboardProps) {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-medium mb-8">
          Welcome, {userName}
        </h1>
        
        <div className="space-y-6">
          <div className="bg-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-medium mb-4">Your Journey</h2>
            <p className="text-gray-300">
              Start exploring career paths tailored to your interests and skills.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-medium mb-4">Next Steps</h2>
            <button
              onClick={() => updateUserProfile({ hasStartedAssessment: true })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
