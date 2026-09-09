import React, { useState } from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AITutor from './pages/AITutor';
import LearningPath from './pages/LearningPath';
import Quiz from './pages/Quiz';
import Analytics from './pages/Analytics';
import Career from './pages/Career';
import Profile from './pages/Profile';

function AppContent() {
  const { isAuthenticated, currentPage } = useLearning();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // If not authenticated, render auth views
  if (!isAuthenticated) {
    return currentPage === 'signup' ? <Signup /> : <Login />;
  }

  // Render active page
  const renderActivePage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'ai-tutor':
        return <AITutor />;
      case 'learning-path':
        return <LearningPath />;
      case 'quiz':
        return <Quiz />;
      case 'analytics':
        return <Analytics />;
      case 'career':
        return <Career />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LearningProvider>
      <AppContent />
    </LearningProvider>
  );
}
