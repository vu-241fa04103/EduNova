import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialUserData,
  departmentLearningPaths,
  engineeringDepartments,
  subjectAnalytics as defaultAnalytics
} from '../data/mockData';

const LearningContext = createContext();

export const LearningProvider = ({ children }) => {
  // Auth & user state - Start at Login screen by default
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('edunova_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...initialUserData,
          ...parsed,
          department: parsed.department || 'ai_ds',
          selectedInterests: parsed.selectedInterests || initialUserData.selectedInterests
        };
      } catch (e) {
        return initialUserData;
      }
    }
    return initialUserData;
  });

  // Current Active Page
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Selected Language
  const [language, setLanguage] = useState('en');

  // Learning Path nodes state based on user's active department
  const [pathNodes, setPathNodes] = useState(() => {
    const saved = localStorage.getItem('edunova_path');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback below
      }
    }
    const dept = user?.department || 'ai_ds';
    return departmentLearningPaths[dept] || departmentLearningPaths.ai_ds;
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
    strongAreas: ['Core Concepts', 'Problem Solving'],
    weakAreas: ['Complex Formulations', 'Applied Analysis'],
    date: 'Recent'
  });

  // AI Tutor Messages
  const [messages, setMessages] = useState(() => [
    {
      id: 1,
      sender: 'ai',
      text: `Hello ${user?.name && user.name !== 'Student' ? user.name : 'there'}! 👋 I'm your EduNova AI Personal Tutor. I cover all engineering subjects across Computer Science, Electronics, Mechanical, Civil, Electrical, and AI. What are we studying today?`,
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

  // Switch engineering department & interest tracks
  const changeDepartment = (deptId, newInterests = null) => {
    const deptInfo = engineeringDepartments.find(d => d.id === deptId) || engineeringDepartments[0];
    const newPath = departmentLearningPaths[deptId] || departmentLearningPaths.ai_ds;
    const interests = newInterests || deptInfo.subjects.slice(0, 3);

    const updatedUser = {
      ...user,
      department: deptId,
      course: `B.Tech in ${deptInfo.name}`,
      selectedInterests: interests
    };

    setUser(updatedUser);
    setPathNodes(newPath);

    // Update analytics labels for that department
    setAnalytics([
      { id: "core1", name: interests[0] || deptInfo.subjects[0], score: 88, status: "Strong", color: "from-emerald-500 to-teal-600", trend: "+4%" },
      { id: "core2", name: interests[1] || deptInfo.subjects[1], score: 80, status: "Good", color: "from-indigo-500 to-blue-600", trend: "+6%" },
      { id: "core3", name: interests[2] || deptInfo.subjects[2] || "Applied Engineering", score: 72, status: "Average", color: "from-amber-500 to-orange-500", trend: "+2%" },
      { id: "gap", name: deptInfo.subjects[3] || "Advanced Core", score: 65, status: "Needs Improvement", color: "from-rose-500 to-red-600", trend: "-3%", isWeak: true }
    ]);
  };

  // Update Avatar from Camera or Gallery
  const updateAvatar = (newAvatarUrl) => {
    setUser(prev => ({
      ...prev,
      avatar: newAvatarUrl
    }));
  };

  const login = (email, password, customName) => {
    setIsAuthenticated(true);
    setUser(prev => ({
      ...prev,
      name: customName?.trim() || (prev.name && prev.name !== 'Student' ? prev.name : (email ? email.split('@')[0] : "Student")),
      email: email || prev.email
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

    // Update node status based on weak areas
    setPathNodes(prev =>
      prev.map(node => {
        const isTopicWeak = weakTopics.some(w => node.title.toLowerCase().includes(w.toLowerCase()) || node.subject.toLowerCase().includes(w.toLowerCase()));
        if (isTopicWeak || node.id === 4) {
          return {
            ...node,
            status: 'recommended',
            recommendedReason: `⚠ Priority Adaptive Review: Quiz detected difficulty in ${weakTopics[0] || 'core concepts'}. Review this before advancing.`
          };
        }
        return node;
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
        logout,
        changeDepartment,
        updateAvatar
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => useContext(LearningContext);
