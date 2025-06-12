import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import Welcome from './pages/Welcome';
import { UserProfile } from './types';
import { mockUserProfile } from './data/mockData';
import Background from './components/Background';

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    // Load saved user data
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleSetUserName = (name: string) => {
    setUserName(name);
    localStorage.setItem('userName', name);
    setUserProfile(prev => {
      const updated = { ...prev, name };
      localStorage.setItem('userProfile', JSON.stringify(updated));
      return updated;
    });
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const updated = { ...prev, ...data };
      localStorage.setItem('userProfile', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <Router>
      <div className="relative min-h-screen">
        <Background />
        <div className="relative z-10">
          <Routes>
            <Route 
              path="/" 
              element={userName ? <Navigate to="/dashboard" /> : <Welcome onSetUserName={handleSetUserName} />} 
            />
            <Route
              path="/dashboard" 
              element={userName ? <Dashboard userName={userName} userProfile={userProfile} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/assessment/:id" 
              element={userName ? <Assessment userProfile={userProfile} updateUserProfile={updateUserProfile} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/results" 
              element={userName ? <Results userProfile={userProfile} updateUserProfile={updateUserProfile} /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
