// Persistent Database Service for EduNova (SIH 2026)
import {
  engineeringDepartments as initialDepartments,
  departmentLearningPaths as initialPaths,
  departmentQuizzes as initialQuizzes
} from '../data/mockData';

const STORAGE_KEYS = {
  USERS: 'edunova_db_users',
  TASKS: 'edunova_db_department_tasks',
  QUIZZES: 'edunova_db_quizzes',
  DEPARTMENTS: 'edunova_db_departments',
  ACTIVE_SESSION: 'edunova_db_session'
};

// Initial Seed Tasks assigned by Faculty across departments
const defaultDepartmentTasks = [
  {
    id: 'task-1',
    department: 'ai_ds',
    title: 'Implement PCA & Dimensionality Reduction in Python',
    description: 'Build Principal Component Analysis from scratch using NumPy to project 4D Iris dataset into 2D.',
    topic: 'Machine Learning',
    skillTag: 'PCA & Linear Algebra',
    priority: 'High',
    deadline: '3 Days',
    points: 50,
    assignedBy: 'Faculty Dean (AI/DS)',
    createdAt: '2026-09-08'
  },
  {
    id: 'task-2',
    department: 'ai_ds',
    title: 'Evaluate Logistic Regression vs Random Forest on Imbalanced Data',
    description: 'Calculate Precision, Recall, F1-Score, and ROC-AUC curve on the credit fraud dataset.',
    topic: 'Statistics & Probability',
    skillTag: 'Model Evaluation',
    priority: 'Medium',
    deadline: '5 Days',
    points: 35,
    assignedBy: 'Faculty Dean (AI/DS)',
    createdAt: '2026-09-09'
  },
  {
    id: 'task-3',
    department: 'ece',
    title: 'Design & Simulate 4-bit ALU in Verilog HDL',
    description: 'Write behavioral Verilog code for arithmetic and logic operations and verify with testbench waveforms.',
    topic: 'VLSI Design & Verilog',
    skillTag: 'Digital Design',
    priority: 'High',
    deadline: '4 Days',
    points: 50,
    assignedBy: 'ECE Department HOD',
    createdAt: '2026-09-08'
  },
  {
    id: 'task-4',
    department: 'ece',
    title: 'Interfacing DHT11 Sensor with ESP32 via I2C/SPI',
    description: 'Read temperature and humidity values and transmit them over MQTT broker protocol.',
    topic: 'Internet of Things (IoT)',
    skillTag: 'Embedded Protocols',
    priority: 'Medium',
    deadline: '6 Days',
    points: 40,
    assignedBy: 'ECE Department HOD',
    createdAt: '2026-09-09'
  },
  {
    id: 'task-5',
    department: 'cse',
    title: 'Implement LRU Cache with O(1) Time Complexity',
    description: 'Use Doubly Linked List and Hash Map data structures to achieve constant time lookups and evictions.',
    topic: 'Data Structures & Algorithms',
    skillTag: 'System Design',
    priority: 'High',
    deadline: '3 Days',
    points: 45,
    assignedBy: 'CSE Lead Professor',
    createdAt: '2026-09-08'
  },
  {
    id: 'task-6',
    department: 'cse',
    title: 'B-Tree Indexing Simulation in Relational Database',
    description: 'Demonstrate tree balancing during high-concurrency inserts and measure query latency improvement.',
    topic: 'Database Management Systems (DBMS)',
    skillTag: 'Indexing & Transactions',
    priority: 'Medium',
    deadline: '5 Days',
    points: 40,
    assignedBy: 'CSE Lead Professor',
    createdAt: '2026-09-09'
  }
];

// Initial seed student accounts
const defaultStudents = [
  {
    id: 'student-demo-1',
    name: 'Vaishnavi',
    email: 'student@edunova.edu',
    password: 'password123',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'ai_ds',
    course: 'B.Tech in Artificial Intelligence & Data Science',
    college: 'Smart India Hackathon Finalist Team',
    selectedInterests: ['Machine Learning', 'Statistics & Probability', 'Python for Data Science'],
    overallProgress: 0,
    completedLessons: 0,
    totalLessons: 6,
    completedTaskIds: [],
    averageQuizScore: 0,
    streakDays: 1,
    targetGoal: 'Machine Learning Engineer',
    preferredLanguage: 'en',
    quizHistory: []
  },
  {
    id: 'student-demo-2',
    name: 'Rahul Varma',
    email: 'rahul.ece@edunova.edu',
    password: 'password123',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    department: 'ece',
    course: 'B.Tech in Electronics & Communication',
    college: 'National Institute of Technology',
    selectedInterests: ['Embedded Systems & Microcontrollers', 'VLSI Design & Verilog', 'Internet of Things (IoT)'],
    overallProgress: 0,
    completedLessons: 0,
    totalLessons: 6,
    completedTaskIds: [],
    averageQuizScore: 0,
    streakDays: 1,
    targetGoal: 'Embedded Systems Engineer',
    preferredLanguage: 'en',
    quizHistory: []
  }
];

class EduNovaDatabase {
  constructor() {
    this.initDatabase();
  }

  initDatabase() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultStudents));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(defaultDepartmentTasks));
    }
    if (!localStorage.getItem(STORAGE_KEYS.QUIZZES)) {
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(initialQuizzes));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DEPARTMENTS)) {
      localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(initialDepartments));
    }
  }

  // --- Users CRUD ---
  getUsers() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : defaultStudents;
    } catch (e) {
      return defaultStudents;
    }
  }

  saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  getUserById(id) {
    const users = this.getUsers();
    return users.find(u => u.id === id);
  }

  getUserByEmail(email) {
    const users = this.getUsers();
    return users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  }

  saveUser(user) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    let updated;
    if (index >= 0) {
      updated = [...users];
      updated[index] = user;
    } else {
      updated = [...users, user];
    }
    this.saveUsers(updated);
    return user;
  }

  deleteUser(userId) {
    const users = this.getUsers();
    const updated = users.filter(u => u.id !== userId);
    this.saveUsers(updated);
    return updated;
  }

  // --- Department Tasks CRUD ---
  getDepartmentTasks(deptId = null) {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      const allTasks = data ? JSON.parse(data) : defaultDepartmentTasks;
      if (deptId && deptId !== 'all') {
        return allTasks.filter(t => t.department === deptId);
      }
      return allTasks;
    } catch (e) {
      return defaultDepartmentTasks;
    }
  }

  saveDepartmentTasks(tasks) {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }

  addDepartmentTask(taskObj) {
    const tasks = this.getDepartmentTasks();
    const newTask = {
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      ...taskObj
    };
    const updated = [newTask, ...tasks];
    this.saveDepartmentTasks(updated);
    return newTask;
  }

  deleteDepartmentTask(taskId) {
    const tasks = this.getDepartmentTasks();
    const updated = tasks.filter(t => t.id !== taskId);
    this.saveDepartmentTasks(updated);
    return updated;
  }

  // --- Quizzes CRUD ---
  getQuizzes() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZZES);
      return data ? JSON.parse(data) : initialQuizzes;
    } catch (e) {
      return initialQuizzes;
    }
  }

  saveQuizzes(quizzes) {
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
  }

  addQuestion(deptId, questionObj) {
    const quizzes = this.getQuizzes();
    const deptQuestions = quizzes[deptId] || [];
    const updated = {
      ...quizzes,
      [deptId]: [...deptQuestions, questionObj]
    };
    this.saveQuizzes(updated);
    return updated;
  }

  deleteQuestion(deptId, questionIdx) {
    const quizzes = this.getQuizzes();
    const deptQuestions = quizzes[deptId] || [];
    const updated = {
      ...quizzes,
      [deptId]: deptQuestions.filter((_, idx) => idx !== questionIdx)
    };
    this.saveQuizzes(updated);
    return updated;
  }

  // --- Departments & Courses CRUD ---
  getDepartments() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DEPARTMENTS);
      return data ? JSON.parse(data) : initialDepartments;
    } catch (e) {
      return initialDepartments;
    }
  }

  saveDepartments(departments) {
    localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(departments));
  }

  addSubjectToDepartment(deptId, subjectName) {
    const departments = this.getDepartments();
    const updated = departments.map(dept => {
      if (dept.id === deptId && !dept.subjects.includes(subjectName)) {
        return { ...dept, subjects: [...dept.subjects, subjectName] };
      }
      return dept;
    });
    this.saveDepartments(updated);
    return updated;
  }

  // --- Reset DB to Clean State ---
  resetToDefaults() {
    localStorage.clear();
    this.initDatabase();
  }
}

export const db = new EduNovaDatabase();
