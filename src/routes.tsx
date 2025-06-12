import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import { UserProfile } from './types';
import { mockUserProfile } from './data/mockData';

export default function AppRoutes() {
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const [userName, setUserName] = useState<string>('');

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...data
    }));
  };

  return (
    <Routes>
      <Route path="/" element={<Welcome onSetUserName={setUserName} />} />
      <Route 
        path="/dashboard" 
        element={
          <Dashboard 
            userProfile={userProfile}
            userName={userName}
          />
        } 
      />
      <Route 
        path="/assessment/:id" 
        element={
          <Assessment 
            userProfile={userProfile}
            updateUserProfile={updateUserProfile}
          />
        } 
      />
      <Route 
        path="/results" 
        element={
          <Results 
            userProfile={userProfile}
          />
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
} 