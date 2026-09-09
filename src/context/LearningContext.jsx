import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUserData, learningPathNodes as defaultNodes, subjectAnalytics as defaultAnalytics } from '../data/mockData';

const LearningContext = createContext();

export const LearningProvider = ({ children }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to logged in as Bhavya for instant test, can toggle
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('edunova_user');
    return saved ? JSON.parse(saved) : initialUserData;
  });

  // Current Active Page
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Selected Language
  const [language, setLanguage] = useState('en');

  // Learning Path nodes state
  const [pathNodes, setPathNodes] = useState(() => {
    const saved = localStorage.getItem('edunova_path');
    return saved ? JSON.parse(saved) : defaultNodes;
  });

  // Subject analytics state
  const [analytics, setAnalytics] = useState(() => {
    const saved = localStorage.getItem('edunova_analytics');
    return saved ? JSON.parse(saved) : defaultAnalytics;
  });

  // Last Quiz Results
  const [lastQuizResult, setLastQuizResult] = useState({
    taken: true,
    score: 8,
    total: 10,
    percentage: 80,
    strongAreas: ['Classification', 'Regression'],
    weakAreas: ['PCA', 'Clustering'],
    date: 'Recent'
  });

  // AI Tutor Messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello Bhavya! 👋 I'm your EduNova AI Personal Tutor. I can explain any topic, solve doubts step-by-step, or generate customized practice questions. What are we studying today?",
      timestamp: '10:00 AM'
    }
  ]);

  // Persist user changes
  useEffect(() => {
    localStorage.setItem('edunova_user', JSON.stringify(user));
  }, [user]);

  // Persist path changes
  useEffect(() => {
    localStorage.setItem('edunova_path', JSON.stringify(pathNodes));
  }, [pathNodes]);

  // Persist analytics changes
  useEffect(() => {
    localStorage.setItem('edunova_analytics', JSON.stringify(analytics));
  }, [analytics]);

  const login = (email, password) => {
    setIsAuthenticated(true);
    setUser(prev => ({
      ...prev,
      name: email.split('@')[0] || "Bhavya",
      email: email
    }));
    setCurrentPage('dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  // Called when quiz is completed to update learning path adaptively
  const processQuizResults = (score, total, weakTopics, strongTopics) => {
    const percentage = Math.round((score / total) * 100);
    setLastQuizResult({
      taken: true,
      score,
      total,
      percentage,
      weakAreas: weakTopics,
      strongAreas: strongTopics,
      date: 'Just now'
    });

    // Update nodes based on weak areas
    setPathNodes(prev =>
      prev.map(node => {
        if (weakTopics.includes('PCA') && node.id === 4) {
          return {
            ...node,
            status: 'recommended',
            recommendedReason: '⚠ Priority Review: Your quiz detected difficulty in Eigenvectors & Dimensionality Reduction.'
          };
        }
        return node;
      })
    );

    // Update analytics
    setAnalytics(prev =>
      prev.map(subject => {
        if (subject.id === 'ml') {
          return {
            ...subject,
            score: Math.min(100, Math.max(50, Math.round((subject.score + percentage) / 2))),
            trend: percentage >= 80 ? '+5%' : '-2%'
          };
        }
        return subject;
      })
    );
  };

  return (
    <LearningContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        currentPage,
        setCurrentPage,
        language,
        setLanguage,
        pathNodes,
        setPathNodes,
        analytics,
        setAnalytics,
        lastQuizResult,
        processQuizResults,
        messages,
        setMessages,
        login,
        logout
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => useContext(LearningContext);
