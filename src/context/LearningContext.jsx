import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  defaultUsers,
  createNewStudentTemplate,
  engineeringDepartments as initialDepartments,
  departmentLearningPaths as initialPaths,
  departmentQuizzes as initialQuizzes,
  subjectAnalytics as defaultAnalytics
} from '../data/mockData';

const LearningContext = createContext();

export const LearningProvider = ({ children }) => {
  // 1. Persistent Users DB
  const [usersDb, setUsersDb] = useState(() => {
    const saved = localStorage.getItem('edunova_users_db');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Error loading users DB", e);
      }
    }
    return defaultUsers;
  });

  // Save usersDb to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('edunova_users_db', JSON.stringify(usersDb));
  }, [usersDb]);

  // 2. Persistent Custom Quizzes & Departments
  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem('edunova_departments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialDepartments;
  });

  const [quizzes, setQuizzes] = useState(() => {
    const saved = localStorage.getItem('edunova_quizzes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialQuizzes;
  });

  useEffect(() => {
    localStorage.setItem('edunova_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('edunova_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  // 3. Auth & Active User State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('edunova_auth') === 'true';
  });

  const [user, setUser] = useState(() => {
    const savedUserId = localStorage.getItem('edunova_current_user_id');
    if (savedUserId) {
      const found = usersDb.find(u => u.id === savedUserId || u.email === savedUserId);
      if (found) return found;
    }
    return defaultUsers[0]; // Default to first user (Vaishnavi)
  });

  // 4. Current Active Navigation Page
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem('edunova_page');
    return saved || 'dashboard';
  });

  useEffect(() => {
    localStorage.setItem('edunova_page', currentPage);
  }, [currentPage]);

  // 5. Selected Language
  const [language, setLanguage] = useState('en');

  // 6. User's Specific Roadmap / Path Nodes
  const [pathNodes, setPathNodes] = useState(() => {
    if (user?.id) {
      const savedUserPath = localStorage.getItem(`edunova_path_${user.id}`);
      if (savedUserPath) {
        try { return JSON.parse(savedUserPath); } catch (e) {}
      }
    }
    const dept = user?.department || 'ai_ds';
    return initialPaths[dept] || initialPaths.ai_ds;
  });

  // Sync roadmap when user changes
  useEffect(() => {
    if (user?.id) {
      const savedUserPath = localStorage.getItem(`edunova_path_${user.id}`);
      if (savedUserPath) {
        try {
          setPathNodes(JSON.parse(savedUserPath));
          return;
        } catch (e) {}
      }
      const dept = user?.department || 'ai_ds';
      const baseNodes = initialPaths[dept] || initialPaths.ai_ds;
      // If newly registered student with 0 completed lessons, reset nodes to clean state
      if (user.completedLessons === 0) {
        const freshNodes = baseNodes.map((n, idx) => ({
          ...n,
          status: idx === 0 ? 'recommended' : 'locked',
          score: null,
          recommendedReason: idx === 0 ? 'Start here! First foundational milestone in your selected curriculum.' : undefined
        }));
        setPathNodes(freshNodes);
      } else {
        setPathNodes(baseNodes);
      }
    }
  }, [user?.id, user?.department]);

  // Save user's path nodes
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`edunova_path_${user.id}`, JSON.stringify(pathNodes));
    }
  }, [pathNodes, user?.id]);

  // 7. Last Quiz Result
  const [lastQuizResult, setLastQuizResult] = useState(() => {
    if (user?.quizHistory && user.quizHistory.length > 0) {
      const last = user.quizHistory[0];
      return {
        taken: true,
        score: last.score,
        total: last.total,
        percentage: last.percentage,
        strongAreas: last.strongAreas || ['Foundational Logic'],
        weakAreas: last.weakAreas || ['Advanced Application'],
        date: last.date || 'Recent'
      };
    }
    return {
      taken: false,
      score: 0,
      total: 0,
      percentage: 0,
      strongAreas: [],
      weakAreas: [],
      date: 'No tests taken yet'
    };
  });

  // 8. Dynamic Metrics Calculation
  const completedLessonsCount = useMemo(() => {
    return pathNodes.filter(n => n.status === 'completed').length;
  }, [pathNodes]);

  const totalLessonsCount = useMemo(() => {
    return pathNodes.length || 6;
  }, [pathNodes]);

  const overallProgressPercent = useMemo(() => {
    if (totalLessonsCount === 0) return 0;
    return Math.round((completedLessonsCount / totalLessonsCount) * 100);
  }, [completedLessonsCount, totalLessonsCount]);

  const quizAccuracyAvg = useMemo(() => {
    if (!user?.quizHistory || user.quizHistory.length === 0) return 0;
    const sum = user.quizHistory.reduce((acc, q) => acc + q.percentage, 0);
    return Math.round(sum / user.quizHistory.length);
  }, [user?.quizHistory]);

  // 9. Subject Mastery filtered strictly by user's selected courses / subjects
  const enrolledSubjectMastery = useMemo(() => {
    const selectedInterests = user?.selectedInterests && user.selectedInterests.length > 0
      ? user.selectedInterests
      : (departments.find(d => d.id === user?.department)?.subjects.slice(0, 3) || ["Machine Learning"]);

    const colorGradients = [
      "from-emerald-500 to-teal-600",
      "from-indigo-500 to-blue-600",
      "from-amber-500 to-orange-500",
      "from-purple-500 to-pink-600",
      "from-cyan-500 to-blue-600",
      "from-rose-500 to-red-600"
    ];

    const hasQuizzes = user?.quizHistory && user.quizHistory.length > 0;
    const latestQuiz = hasQuizzes ? user.quizHistory[0] : null;

    return selectedInterests.map((subjectName, idx) => {
      // Calculate score based on user's quiz accuracy and completed lessons in this department
      let score = 0;
      let trend = "+0%";
      let isWeak = false;

      if (hasQuizzes) {
        // Check if subject is mentioned in weak areas
        const isTopicFlaggedWeak = latestQuiz?.weakAreas?.some(w =>
          w.toLowerCase().includes(subjectName.toLowerCase()) || subjectName.toLowerCase().includes(w.toLowerCase())
        );

        if (isTopicFlaggedWeak) {
          score = Math.max(45, Math.round(latestQuiz.percentage * 0.75));
          trend = "-4%";
          isWeak = true;
        } else if (latestQuiz?.strongAreas?.some(s => s.toLowerCase().includes(subjectName.toLowerCase()))) {
          score = Math.min(96, Math.max(82, latestQuiz.percentage + 8));
          trend = "+6%";
        } else {
          // Standard distributed score from overall quiz score & completed lessons
          const base = (latestQuiz.percentage * 0.7) + (overallProgressPercent * 0.3);
          score = Math.min(95, Math.max(30, Math.round(base - (idx * 5))));
          trend = "+3%";
        }
      } else if (completedLessonsCount > 0) {
        score = Math.min(90, Math.round(overallProgressPercent * (1 - idx * 0.1)));
        trend = "+2%";
      } else {
        // Brand new learner with 0 tests and 0 lessons
        score = 0;
        trend = "New";
      }

      return {
        id: `subject-${idx}`,
        name: subjectName,
        score,
        status: score >= 80 ? "Strong" : score >= 60 ? "Good" : score > 0 ? "Needs Improvement" : "Not Started",
        color: colorGradients[idx % colorGradients.length],
        trend,
        isWeak
      };
    });
  }, [user?.selectedInterests, user?.department, user?.quizHistory, overallProgressPercent, completedLessonsCount, departments]);

  // Weak area dynamic diagnosis
  const identifiedWeakAreaTopic = useMemo(() => {
    if (user?.quizHistory && user.quizHistory.length > 0 && user.quizHistory[0].weakAreas?.length > 0) {
      return user.quizHistory[0].weakAreas[0];
    }
    const weakSub = enrolledSubjectMastery.find(s => s.isWeak);
    if (weakSub) return `Review ${weakSub.name} fundamentals`;
    return null;
  }, [user?.quizHistory, enrolledSubjectMastery]);

  // Sync user state changes back to DB
  const updateUserInDb = (updatedUser) => {
    setUser(updatedUser);
    setUsersDb(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    localStorage.setItem('edunova_current_user_id', updatedUser.id);
  };

  // 10. AI Tutor Chat Messages
  const [messages, setMessages] = useState(() => [
    {
      id: 1,
      sender: 'ai',
      text: `Hello ${user?.name && user.name !== 'Student' ? user.name : 'there'}! 👋 I'm your EduNova AI Personal Tutor. I cover all engineering subjects across Computer Science, Electronics, Mechanical, Civil, Electrical, and AI. What are we studying today?`,
      timestamp: '10:00 AM'
    }
  ]);

  // 11. Auth Functions: Login, Signup, Logout
  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const matchedUser = usersDb.find(u => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword);

    if (matchedUser) {
      setIsAuthenticated(true);
      localStorage.setItem('edunova_auth', 'true');
      localStorage.setItem('edunova_current_user_id', matchedUser.id);
      setUser(matchedUser);

      // Route Admin directly to Admin Portal, students to Dashboard
      if (matchedUser.role === 'admin') {
        setCurrentPage('admin-dashboard');
      } else {
        setCurrentPage('dashboard');
      }
      return { success: true, user: matchedUser };
    } else {
      return {
        success: false,
        message: 'Invalid email or password. Please check your credentials or click a Demo Login.'
      };
    }
  };

  const signup = (formData) => {
    const cleanEmail = formData.email.trim().toLowerCase();
    const exists = usersDb.some(u => u.email.toLowerCase() === cleanEmail);

    if (exists) {
      return {
        success: false,
        message: `An account with email "${cleanEmail}" already exists. Please log in instead.`
      };
    }

    const newUser = createNewStudentTemplate(formData);
    const updatedDb = [...usersDb, newUser];

    setUsersDb(updatedDb);
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('edunova_auth', 'true');
    localStorage.setItem('edunova_current_user_id', newUser.id);
    setCurrentPage('dashboard');

    return { success: true, user: newUser };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('edunova_auth');
    setCurrentPage('login');
  };

  // Switch engineering department & interest tracks
  const changeDepartment = (deptId, newInterests = null) => {
    const deptInfo = departments.find(d => d.id === deptId) || departments[0];
    const newPath = initialPaths[deptId] || initialPaths.ai_ds;
    const interests = newInterests || deptInfo.subjects.slice(0, 3);

    const updatedUser = {
      ...user,
      department: deptId,
      course: `B.Tech in ${deptInfo.name}`,
      selectedInterests: interests,
      completedLessons: 0,
      overallProgress: 0
    };

    updateUserInDb(updatedUser);
    setPathNodes(newPath);
  };

  // Update Avatar from Camera or Gallery
  const updateAvatar = (newAvatarUrl) => {
    const updatedUser = {
      ...user,
      avatar: newAvatarUrl
    };
    updateUserInDb(updatedUser);
  };

  // Mark a lesson/milestone as completed in real time
  const markLessonComplete = (nodeId) => {
    const updatedNodes = pathNodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, status: 'completed', score: 95 };
      }
      if (node.id === nodeId + 1 && node.status === 'locked') {
        return {
          ...node,
          status: 'recommended',
          recommendedReason: 'Unlocked! Next sequential milestone in your engineering track.'
        };
      }
      return node;
    });

    setPathNodes(updatedNodes);

    const newCompletedCount = updatedNodes.filter(n => n.status === 'completed').length;
    const newProgress = Math.round((newCompletedCount / updatedNodes.length) * 100);

    const updatedUser = {
      ...user,
      completedLessons: newCompletedCount,
      overallProgress: newProgress,
      streakDays: (user.streakDays || 1) + 1
    };

    updateUserInDb(updatedUser);
  };

  // Called when quiz is completed to update learning path and user history adaptively
  const processQuizResults = (score, total, weakTopics, strongTopics, deptId = null) => {
    const percentage = Math.round((score / total) * 100);
    const quizEntry = {
      id: Date.now(),
      department: deptId || user.department || 'ai_ds',
      score,
      total,
      percentage,
      date: 'Just now',
      strongAreas: strongTopics,
      weakAreas: weakTopics
    };

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
        const isTopicWeak = weakTopics.some(w =>
          node.title.toLowerCase().includes(w.toLowerCase()) ||
          node.subject.toLowerCase().includes(w.toLowerCase())
        );
        if (isTopicWeak || (percentage < 70 && node.id === 4)) {
          return {
            ...node,
            status: 'recommended',
            recommendedReason: `⚠ Priority Adaptive Review: Quiz detected difficulty in "${weakTopics[0] || 'core concepts'}". Review this topic to strengthen fundamentals.`
          };
        }
        return node;
      })
    );

    // Save quiz attempt in user's quizHistory
    const updatedQuizHistory = [quizEntry, ...(user.quizHistory || [])];
    const newAvg = Math.round(updatedQuizHistory.reduce((acc, q) => acc + q.percentage, 0) / updatedQuizHistory.length);

    const updatedUser = {
      ...user,
      quizHistory: updatedQuizHistory,
      averageQuizScore: newAvg,
      streakDays: (user.streakDays || 1) + 1
    };

    updateUserInDb(updatedUser);
  };

  // --- Admin Methods ---
  const getAllStudents = () => {
    return usersDb.filter(u => u.role === 'student');
  };

  const deleteStudent = (studentId) => {
    setUsersDb(prev => prev.filter(u => u.id !== studentId));
  };

  const addQuizQuestion = (deptId, questionObj) => {
    setQuizzes(prev => {
      const existing = prev[deptId] || [];
      return {
        ...prev,
        [deptId]: [...existing, questionObj]
      };
    });
  };

  const deleteQuizQuestion = (deptId, questionIdx) => {
    setQuizzes(prev => {
      const existing = prev[deptId] || [];
      return {
        ...prev,
        [deptId]: existing.filter((_, idx) => idx !== questionIdx)
      };
    });
  };

  const addDepartmentSubject = (deptId, subjectName) => {
    setDepartments(prev =>
      prev.map(dept => {
        if (dept.id === deptId && !dept.subjects.includes(subjectName)) {
          return {
            ...dept,
            subjects: [...dept.subjects, subjectName]
          };
        }
        return dept;
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
        usersDb,
        currentPage,
        setCurrentPage,
        language,
        setLanguage,
        departments,
        quizzes,
        pathNodes,
        setPathNodes,
        markLessonComplete,
        lastQuizResult,
        processQuizResults,
        // Computed metrics
        completedLessonsCount,
        totalLessonsCount,
        overallProgressPercent,
        quizAccuracyAvg,
        enrolledSubjectMastery,
        identifiedWeakAreaTopic,
        // Messages
        messages,
        setMessages,
        // Auth methods
        login,
        signup,
        logout,
        changeDepartment,
        updateAvatar,
        // Admin methods
        getAllStudents,
        deleteStudent,
        addQuizQuestion,
        deleteQuizQuestion,
        addDepartmentSubject
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => useContext(LearningContext);
