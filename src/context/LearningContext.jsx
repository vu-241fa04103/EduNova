import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { db } from '../services/db';
import {
  departmentLearningPaths as initialPaths,
  subjectAnalytics as defaultAnalytics
} from '../data/mockData';

const LearningContext = createContext();

export const LearningProvider = ({ children }) => {
  // 1. Database Synced State: Students, Tasks, Quizzes, Departments
  const [students, setStudents] = useState(() => db.getUsers());
  const [departmentTasks, setDepartmentTasks] = useState(() => db.getDepartmentTasks());
  const [departments, setDepartments] = useState(() => db.getDepartments());
  const [quizzes, setQuizzes] = useState(() => db.getQuizzes());

  // 2. Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('edunova_auth') === 'true';
  });

  const [user, setUser] = useState(() => {
    const sessionStr = localStorage.getItem('edunova_current_user');
    if (sessionStr) {
      try { return JSON.parse(sessionStr); } catch (e) {}
    }
    // Default initial student (Vaishnavi)
    const initialList = db.getUsers();
    return initialList[0] || null;
  });

  // Sync user changes to localStorage session
  useEffect(() => {
    if (user) {
      localStorage.setItem('edunova_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('edunova_current_user');
    }
  }, [user]);

  // 3. Current Active Page
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem('edunova_page');
    return saved || 'dashboard';
  });

  useEffect(() => {
    localStorage.setItem('edunova_page', currentPage);
  }, [currentPage]);

  // 4. Selected Language
  const [language, setLanguage] = useState('en');

  // 5. User's Specific Roadmap Nodes
  const [pathNodes, setPathNodes] = useState(() => {
    if (user?.id) {
      const savedUserPath = localStorage.getItem(`edunova_path_${user.id}`);
      if (savedUserPath) {
        try { return JSON.parse(savedUserPath); } catch (e) {}
      }
    }
    const dept = user?.department || 'ai_ds';
    const baseNodes = initialPaths[dept] || initialPaths.ai_ds;
    // If student has 0 completed lessons, start all uncompleted
    return baseNodes.map((n, idx) => ({
      ...n,
      status: (user?.completedLessons || 0) > idx ? 'completed' : idx === (user?.completedLessons || 0) ? 'recommended' : 'locked',
      score: (user?.completedLessons || 0) > idx ? 95 : null,
      recommendedReason: idx === (user?.completedLessons || 0) ? 'Next active milestone in your curriculum.' : undefined
    }));
  });

  // Sync roadmap when user or department changes
  useEffect(() => {
    if (user?.id && user.role === 'student') {
      const savedUserPath = localStorage.getItem(`edunova_path_${user.id}`);
      if (savedUserPath) {
        try {
          setPathNodes(JSON.parse(savedUserPath));
          return;
        } catch (e) {}
      }
      const dept = user.department || 'ai_ds';
      const baseNodes = initialPaths[dept] || initialPaths.ai_ds;
      const nodes = baseNodes.map((n, idx) => ({
        ...n,
        status: (user.completedLessons || 0) > idx ? 'completed' : idx === (user.completedLessons || 0) ? 'recommended' : 'locked',
        score: (user.completedLessons || 0) > idx ? 95 : null,
        recommendedReason: idx === (user.completedLessons || 0) ? 'Start here! First foundational milestone in your curriculum.' : undefined
      }));
      setPathNodes(nodes);
    }
  }, [user?.id, user?.department]);

  // Save pathNodes for this specific student
  useEffect(() => {
    if (user?.id && user.role === 'student') {
      localStorage.setItem(`edunova_path_${user.id}`, JSON.stringify(pathNodes));
    }
  }, [pathNodes, user?.id]);

  // 6. Last Quiz Result
  const [lastQuizResult, setLastQuizResult] = useState(() => {
    if (user?.quizHistory && user.quizHistory.length > 0) {
      const last = user.quizHistory[0];
      return {
        taken: true,
        score: last.score,
        total: last.total,
        percentage: last.percentage,
        strongAreas: last.strongAreas || [],
        weakAreas: last.weakAreas || [],
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

  // 7. Dynamic Metrics Calculation (Strictly for Students; Admin has no personal progress)
  const completedLessonsCount = useMemo(() => {
    if (user?.role === 'admin') return 0;
    return pathNodes.filter(n => n.status === 'completed').length;
  }, [pathNodes, user?.role]);

  const totalLessonsCount = useMemo(() => {
    if (user?.role === 'admin') return 0;
    return pathNodes.length || 6;
  }, [pathNodes, user?.role]);

  const completedTasksCount = useMemo(() => {
    if (user?.role === 'admin') return 0;
    return user?.completedTaskIds?.length || 0;
  }, [user?.completedTaskIds, user?.role]);

  const quizAccuracyAvg = useMemo(() => {
    if (user?.role === 'admin' || !user?.quizHistory || user.quizHistory.length === 0) return 0;
    const sum = user.quizHistory.reduce((acc, q) => acc + q.percentage, 0);
    return Math.round(sum / user.quizHistory.length);
  }, [user?.quizHistory, user?.role]);

  // Overall Progress starts strictly at 0% for new learners!
  const overallProgressPercent = useMemo(() => {
    if (user?.role === 'admin') return 0;
    const quizCount = user?.quizHistory?.length || 0;
    if (completedLessonsCount === 0 && completedTasksCount === 0 && quizCount === 0) {
      return 0;
    }
    // Weighted progress from Lessons (60%) + Assigned Tasks (25%) + Quizzes (15%)
    const lessonContribution = totalLessonsCount > 0 ? (completedLessonsCount / totalLessonsCount) * 60 : 0;
    const taskContribution = Math.min(25, completedTasksCount * 12.5);
    const quizContribution = quizCount > 0 ? (quizAccuracyAvg / 100) * 15 : 0;
    return Math.min(100, Math.round(lessonContribution + taskContribution + quizContribution));
  }, [completedLessonsCount, totalLessonsCount, completedTasksCount, quizAccuracyAvg, user?.quizHistory, user?.role]);

  // 8. Enrolled Subject Mastery (Only for student's selected courses)
  const enrolledSubjectMastery = useMemo(() => {
    if (user?.role === 'admin') return [];

    const selectedInterests = user?.selectedInterests && user.selectedInterests.length > 0
      ? user.selectedInterests
      : (departments.find(d => d.id === user?.department)?.subjects.slice(0, 3) || ["Domain Core"]);

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
      let score = 0;
      let trend = "0%";
      let isWeak = false;

      if (hasQuizzes) {
        const isTopicFlaggedWeak = latestQuiz?.weakAreas?.some(w =>
          w.toLowerCase().includes(subjectName.toLowerCase()) || subjectName.toLowerCase().includes(w.toLowerCase())
        );

        if (isTopicFlaggedWeak) {
          score = Math.max(40, Math.round(latestQuiz.percentage * 0.7));
          trend = "-4%";
          isWeak = true;
        } else if (latestQuiz?.strongAreas?.some(s => s.toLowerCase().includes(subjectName.toLowerCase()))) {
          score = Math.min(95, Math.max(80, latestQuiz.percentage + 5));
          trend = "+6%";
        } else {
          score = Math.min(90, Math.max(35, Math.round(latestQuiz.percentage * 0.85)));
          trend = "+2%";
        }
      } else if (completedLessonsCount > 0 || completedTasksCount > 0) {
        score = Math.min(85, Math.round(overallProgressPercent * (1 - idx * 0.08)));
        trend = "+1%";
      } else {
        // Fresh student account: strictly 0%
        score = 0;
        trend = "New";
      }

      return {
        id: `subject-${idx}`,
        name: subjectName,
        score,
        status: score >= 80 ? "Strong" : score >= 60 ? "Good" : score > 0 ? "Needs Practice" : "Not Started",
        color: colorGradients[idx % colorGradients.length],
        trend,
        isWeak
      };
    });
  }, [user?.selectedInterests, user?.department, user?.quizHistory, user?.role, overallProgressPercent, completedLessonsCount, completedTasksCount, departments]);

  // Identified Weak Area Topic
  const identifiedWeakAreaTopic = useMemo(() => {
    if (user?.role === 'admin') return null;
    if (user?.quizHistory && user.quizHistory.length > 0 && user.quizHistory[0].weakAreas?.length > 0) {
      return user.quizHistory[0].weakAreas[0];
    }
    const weakSub = enrolledSubjectMastery.find(s => s.isWeak);
    if (weakSub) return `Review ${weakSub.name} fundamentals`;
    return null;
  }, [user?.quizHistory, user?.role, enrolledSubjectMastery]);

  // 9. AI Tutor Messages
  const [messages, setMessages] = useState(() => [
    {
      id: 1,
      sender: 'ai',
      text: `Hello ${user?.name && user.name !== 'Student' ? user.name : 'there'}! 👋 I'm your EduNova AI Personal Tutor. I cover all engineering subjects across Computer Science, Electronics, Mechanical, Civil, Electrical, and AI. What are we studying today?`,
      timestamp: '10:00 AM'
    }
  ]);

  // Sync user updates in DB & State
  const updateStudentProfile = (updatedStudent) => {
    setUser(updatedStudent);
    db.saveUser(updatedStudent);
    setStudents(db.getUsers());
  };

  // 10. Authentication Methods
  // Rule: ANY email with password === 'admin123' logs into Admin Portal!
  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      return { success: false, message: 'Please enter both your email address and password.' };
    }

    // A) Dynamic Admin Authentication for ANY email with password admin123
    if (cleanPassword === 'admin123') {
      const adminName = cleanEmail.includes('@')
        ? cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : 'Faculty Administrator';

      const adminUser = {
        id: `admin-${cleanEmail}`,
        name: `${adminName} (Faculty / Admin)`,
        email: cleanEmail,
        role: 'admin',
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80`,
        department: 'all',
        course: 'Faculty Administrator & Academic Mentor'
      };

      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem('edunova_auth', 'true');
      localStorage.setItem('edunova_current_user', JSON.stringify(adminUser));
      setCurrentPage('admin-dashboard');
      return { success: true, user: adminUser };
    }

    // B) Registered Student Authentication
    const matchedStudent = db.getUserByEmail(cleanEmail);
    if (matchedStudent && matchedStudent.password === cleanPassword) {
      setUser(matchedStudent);
      setIsAuthenticated(true);
      localStorage.setItem('edunova_auth', 'true');
      localStorage.setItem('edunova_current_user', JSON.stringify(matchedStudent));
      setCurrentPage('dashboard');
      return { success: true, user: matchedStudent };
    }

    return {
      success: false,
      message: 'Invalid credentials. If you are Faculty/Admin, log in with password "admin123". If you are a Student, please Sign Up or check your registered password.'
    };
  };

  const signup = (formData) => {
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanPassword = formData.password.trim();

    if (cleanPassword === 'admin123') {
      return {
        success: false,
        message: 'Password "admin123" is reserved for Faculty/Admin access. Please choose another password for your student account.'
      };
    }

    const existing = db.getUserByEmail(cleanEmail);
    if (existing) {
      return {
        success: false,
        message: `An account with email "${cleanEmail}" already exists. Please log in instead.`
      };
    }

    const deptInfo = departments.find(d => d.id === formData.department) || departments[0];
    const selectedInterests = formData.selectedInterests && formData.selectedInterests.length > 0
      ? formData.selectedInterests
      : deptInfo.subjects.slice(0, 3);

    // Fresh student account with STRICT 0% baseline progress
    const newStudent = {
      id: `student-${Date.now()}`,
      name: formData.name?.trim() || 'Student',
      email: cleanEmail,
      password: cleanPassword,
      role: 'student',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      department: formData.department || 'ai_ds',
      course: `B.Tech in ${deptInfo.name}`,
      college: formData.college?.trim() || 'Engineering Institute',
      selectedInterests: selectedInterests,
      overallProgress: 0,
      completedLessons: 0,
      totalLessons: 6,
      completedTaskIds: [],
      averageQuizScore: 0,
      streakDays: 1,
      targetGoal: formData.targetCareer || `${deptInfo.shortName} Engineer`,
      preferredLanguage: 'en',
      quizHistory: []
    };

    db.saveUser(newStudent);
    setStudents(db.getUsers());
    setUser(newStudent);
    setIsAuthenticated(true);
    localStorage.setItem('edunova_auth', 'true');
    localStorage.setItem('edunova_current_user', JSON.stringify(newStudent));
    setCurrentPage('dashboard');

    return { success: true, user: newStudent };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('edunova_auth');
    localStorage.removeItem('edunova_current_user');
    setCurrentPage('login');
  };

  // 11. Student Lesson & Quiz Progress
  const markLessonComplete = (nodeId) => {
    if (!user || user.role !== 'student') return;

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
    const updatedUser = {
      ...user,
      completedLessons: newCompletedCount,
      streakDays: Math.max(1, (user.streakDays || 1))
    };

    updateStudentProfile(updatedUser);
  };

  const processQuizResults = (score, total, weakTopics, strongTopics, deptId = null) => {
    if (!user || user.role !== 'student') return;

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

    const updatedHistory = [quizEntry, ...(user.quizHistory || [])];
    const newAvg = Math.round(updatedHistory.reduce((acc, q) => acc + q.percentage, 0) / updatedHistory.length);

    const updatedUser = {
      ...user,
      quizHistory: updatedHistory,
      averageQuizScore: newAvg
    };

    updateStudentProfile(updatedUser);
  };

  // 12. Faculty Domain Task Actions
  const completeStudentTask = (taskId) => {
    if (!user || user.role !== 'student') return;
    const completedList = user.completedTaskIds || [];
    if (completedList.includes(taskId)) return;

    const updatedTaskIds = [...completedList, taskId];
    const updatedUser = {
      ...user,
      completedTaskIds: updatedTaskIds
    };
    updateStudentProfile(updatedUser);
  };

  const addDepartmentTask = (taskObj) => {
    const newTask = db.addDepartmentTask(taskObj);
    setDepartmentTasks(db.getDepartmentTasks());
    return newTask;
  };

  const deleteDepartmentTask = (taskId) => {
    db.deleteDepartmentTask(taskId);
    setDepartmentTasks(db.getDepartmentTasks());
  };

  // 13. Admin Methods
  const deleteStudent = (studentId) => {
    db.deleteUser(studentId);
    setStudents(db.getUsers());
  };

  const addQuizQuestion = (deptId, questionObj) => {
    db.addQuestion(deptId, questionObj);
    setQuizzes(db.getQuizzes());
  };

  const deleteQuizQuestion = (deptId, questionIdx) => {
    db.deleteQuestion(deptId, questionIdx);
    setQuizzes(db.getQuizzes());
  };

  const addDepartmentSubject = (deptId, subjectName) => {
    db.addSubjectToDepartment(deptId, subjectName);
    setDepartments(db.getDepartments());
  };

  const changeDepartment = (deptId, newInterests = null) => {
    if (!user || user.role !== 'student') return;
    const deptInfo = departments.find(d => d.id === deptId) || departments[0];
    const newPath = initialPaths[deptId] || initialPaths.ai_ds;
    const interests = newInterests || deptInfo.subjects.slice(0, 3);

    const updatedUser = {
      ...user,
      department: deptId,
      course: `B.Tech in ${deptInfo.name}`,
      selectedInterests: interests,
      completedLessons: 0,
      completedTaskIds: [],
      overallProgress: 0
    };

    updateStudentProfile(updatedUser);
    setPathNodes(newPath);
  };

  const updateAvatar = (newAvatarUrl) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      avatar: newAvatarUrl
    };
    if (user.role === 'student') {
      updateStudentProfile(updatedUser);
    } else {
      setUser(updatedUser);
    }
  };

  return (
    <LearningContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        students,
        departmentTasks,
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
        // Computed metrics (for logged-in student)
        completedLessonsCount,
        totalLessonsCount,
        completedTasksCount,
        overallProgressPercent,
        quizAccuracyAvg,
        enrolledSubjectMastery,
        identifiedWeakAreaTopic,
        // Tasks
        completeStudentTask,
        addDepartmentTask,
        deleteDepartmentTask,
        // Messages
        messages,
        setMessages,
        // Auth
        login,
        signup,
        logout,
        changeDepartment,
        updateAvatar,
        // Admin
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

