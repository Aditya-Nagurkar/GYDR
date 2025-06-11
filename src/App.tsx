import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import Welcome from './pages/Welcome';
import FloatingElements from './components/FloatingElements';
import { mockUserProfile } from './data/mockData';
import { UserProfile } from './types';

const App = () => {
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingDelay, setLoadingDelay] = useState<number>(1500);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);

  useEffect(() => {
    // Load fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Load saved user data
    const timer = setTimeout(() => {
      const savedName = localStorage.getItem('userName');
      const savedProfile = localStorage.getItem('userProfile');
      
      if (savedName) {
        setUserName(savedName);
      }
      
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          setUserProfile(parsedProfile);
        } catch (error) {
          console.error('Error parsing saved profile:', error);
        }
      }
      
      setIsLoading(false);
      setLoadingDelay(0);
    }, loadingDelay);
    
    return () => clearTimeout(timer);
  }, [loadingDelay]);

  const handleSetUserName = (name: string) => {
    setUserName(name);
    localStorage.setItem('userName', name);
    setUserProfile(prev => {
      const updated = { ...prev, name };
      localStorage.setItem('userProfile', JSON.stringify(updated));
      return updated;
    });
  };

  const updateUserProfile = (newData: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('userProfile', JSON.stringify(updated));
      return updated;
    });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0f172a]">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-t-[#8b5cf6] border-white/20 rounded-full animate-spin mb-4"></div>
          <h1 className="text-white text-2xl font-bold mb-2">Pathways</h1>
          <p className="text-white/60">Loading your career journey...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="font-['Poppins',sans-serif] min-h-screen bg-[#0f172a] text-white overflow-x-hidden">
        <FloatingElements />
        <Routes>
          <Route 
            path="/" 
            element={
              userName ? (
                <Navigate to="/dashboard" />
              ) : (
                <Welcome onSetUserName={handleSetUserName} />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              userName ? (
                <Dashboard 
                  userName={userName} 
                  userProfile={userProfile}
                  updateUserProfile={updateUserProfile}
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/assessment/:id" 
            element={
              userName ? (
                <Assessment userProfile={userProfile} updateUserProfile={updateUserProfile} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/results" 
            element={
              userName && userProfile.completedAssessments.length === userProfile.totalAssessments ? (
                <Results userProfile={userProfile} />
              ) : (
                <Navigate to="/dashboard" />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
