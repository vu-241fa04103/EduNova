export const initialUserData = {
  name: "Bhavya",
  email: "bhavya.sih@edunova.edu",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  course: "B.Tech in Artificial Intelligence & Data Science",
  college: "Smart India Hackathon 2026 Finalist Team",
  overallProgress: 78,
  completedLessons: 12,
  totalLessons: 16,
  averageQuizScore: 85,
  streakDays: 5,
  targetGoal: "Machine Learning Engineer",
  preferredLanguage: "en", // en, te, hi
};

export const subjectAnalytics = [
  { id: "python", name: "Python Programming", score: 90, status: "Strong", color: "from-emerald-500 to-teal-600", trend: "+5%" },
  { id: "ml", name: "Machine Learning", score: 80, status: "Good", color: "from-indigo-500 to-blue-600", trend: "+8%" },
  { id: "stats", name: "Statistics & Prob", score: 72, status: "Average", color: "from-amber-500 to-orange-500", trend: "+2%" },
  { id: "dbms", name: "DBMS & SQL", score: 65, status: "Needs Improvement", color: "from-rose-500 to-red-600", trend: "-3%", isWeak: true },
];

export const learningPathNodes = [
  {
    id: 1,
    title: "Python Basics & OOP",
    subject: "Python Programming",
    status: "completed",
    score: 95,
    duration: "4 hrs",
    summary: "Variables, loops, functions, OOP, and data structures.",
    topics: ["Syntax & Control Flow", "OOP Principles", "List Comprehensions", "Error Handling"]
  },
  {
    id: 2,
    title: "Applied Statistics",
    subject: "Statistics",
    status: "completed",
    score: 72,
    duration: "6 hrs",
    summary: "Distributions, hypothesis testing, mean, variance, and p-values.",
    topics: ["Normal Distribution", "Hypothesis Testing", "Correlation vs Causation"]
  },
  {
    id: 3,
    title: "Linear & Logistic Regression",
    subject: "Machine Learning",
    status: "completed",
    score: 88,
    duration: "5 hrs",
    summary: "Supervised modeling, cost functions, gradient descent, evaluation metrics.",
    topics: ["Ordinary Least Squares", "Sigmoid Activation", "MSE & Cross Entropy"]
  },
  {
    id: 4,
    title: "PCA (Principal Component Analysis)",
    subject: "Machine Learning",
    status: "recommended",
    recommendedReason: "Identified gap from your recent Quiz. Essential for high-dimensional data.",
    duration: "3 hrs",
    summary: "Dimensionality reduction, eigenvalues, eigenvectors, covariance matrix.",
    topics: ["Curse of Dimensionality", "Covariance Matrix", "Eigenvalues & Eigenvectors", "Variance Ratio"],
    materials: [
      { title: "PCA Intuition & Math in 15 mins", type: "Video", duration: "14 min" },
      { title: "Step-by-Step PCA in Scikit-Learn", type: "Code Walkthrough", duration: "25 min" },
      { title: "Dimensionality Reduction Cheat Sheet", type: "PDF Guide", duration: "5 min read" }
    ]
  },
  {
    id: 5,
    title: "Unsupervised Clustering & K-Means",
    subject: "Machine Learning",
    status: "locked",
    duration: "4 hrs",
    summary: "Centroids, elbow method, silhouette analysis, and hierarchical clustering.",
    topics: ["K-Means Algorithm", "Elbow Method", "DBSCAN", "Hierarchical Clustering"]
  },
  {
    id: 6,
    title: "End-to-End ML Capstone Project",
    subject: "Machine Learning",
    status: "locked",
    duration: "10 hrs",
    summary: "Building, training, evaluating, and deploying a predictive AI pipeline.",
    topics: ["Data Preprocessing", "Model Pipeline", "Hyperparameter Tuning", "Streamlit/FastAPI Deployment"]
  }
];

export const mlQuizQuestions = [
  {
    id: 1,
    topic: "PCA",
    question: "Which mathematical technique is primarily used for linear dimensionality reduction in machine learning?",
    options: [
      "Linear Regression",
      "Principal Component Analysis (PCA)",
      "Decision Trees",
      "Naive Bayes"
    ],
    correctAnswer: 1,
    explanation: "PCA reduces the dimensionality of datasets while preserving as much variance as possible by finding orthogonal eigenvectors."
  },
  {
    id: 2,
    topic: "Classification",
    question: "Which evaluation metric is best suited for an imbalanced classification dataset?",
    options: [
      "Accuracy",
      "F1-Score / PR-AUC",
      "Mean Squared Error",
      "R-Squared"
    ],
    correctAnswer: 1,
    explanation: "When classes are severely imbalanced, standard accuracy is misleading. F1-Score (harmonic mean of Precision & Recall) provides a balanced picture."
  },
  {
    id: 3,
    topic: "PCA",
    question: "In PCA, what do the eigenvectors of the covariance matrix represent?",
    options: [
      "The directions of maximum variance (Principal Components)",
      "The magnitude of reconstruction error",
      "The classification boundaries",
      "The learning rate of the model"
    ],
    correctAnswer: 0,
    explanation: "Eigenvectors point in the directions of maximum variance in the feature space, while eigenvalues indicate the magnitude of variance in those directions."
  },
  {
    id: 4,
    topic: "Clustering",
    question: "What is the common technique used to determine the optimal number of clusters (K) in K-Means?",
    options: [
      "Backpropagation",
      "Elbow Method / Silhouette Analysis",
      "L1 Regularization",
      "Dropout"
    ],
    correctAnswer: 1,
    explanation: "The Elbow method plots inertia (WCSS) against K values to find the point where inertia decrease flattens out, indicating the optimal K."
  },
  {
    id: 5,
    topic: "Regression",
    question: "What type of regularization adds a penalty equal to the sum of the absolute values of the coefficients (L1 penalty)?",
    options: [
      "Ridge Regression",
      "Lasso Regression",
      "ElasticNet",
      "Polynomial Regression"
    ],
    correctAnswer: 1,
    explanation: "Lasso (L1) creates sparse models by driving less important feature weights strictly to zero, effectively acting as feature selection."
  },
  {
    id: 6,
    topic: "Clustering",
    question: "Is K-Means clustering a supervised or unsupervised learning algorithm?",
    options: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Reinforcement Learning",
      "Semi-Supervised Learning"
    ],
    correctAnswer: 1,
    explanation: "K-Means works strictly on unlabeled input features without target output labels, discovering natural groupings within the data."
  }
];

export const careerRoles = [
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    icon: "Bot",
    matchPercentage: 87,
    avgSalary: "₹12 - 24 LPA",
    badge: "Top Fit for You",
    description: "Designs, builds, and deploys intelligent models into production architectures.",
    acquiredSkills: ["Python Programming (90%)", "Linear & Logistic Regression", "Model Evaluation"],
    missingSkills: ["PCA & Dimensionality Reduction", "Deep Learning / PyTorch", "MLOps & Docker"],
    actionPlan: "Focus next on PCA and Unsupervised Learning, then proceed with PyTorch neural networks."
  },
  {
    id: "software-dev",
    title: "Full-Stack AI Developer",
    icon: "Code",
    matchPercentage: 82,
    avgSalary: "₹10 - 20 LPA",
    badge: "High Growth",
    description: "Integrates AI APIs, web dashboards, and robust backend services.",
    acquiredSkills: ["React / Frontend", "Python Basics", "REST API concepts"],
    missingSkills: ["Advanced DBMS & SQL", "System Design", "Cloud Deployment"],
    actionPlan: "Revise DBMS SQL queries and relational normalization to strengthen backend aptitude."
  },
  {
    id: "data-analyst",
    title: "Data Scientist / Analyst",
    icon: "BarChart",
    matchPercentage: 76,
    avgSalary: "₹8 - 16 LPA",
    badge: "In Demand",
    description: "Transforms raw data into actionable business insights, dashboards, and forecasts.",
    acquiredSkills: ["Python Data Structures", "Applied Statistics (72%)", "Data Visualization"],
    missingSkills: ["Advanced SQL Joins", "A/B Testing", "Tableau / PowerBI"],
    actionPlan: "Complete SQL practice modules and deepen hypothesis testing concepts."
  }
];

export const multilingualTranslations = {
  en: {
    welcome: "Good Morning, Bhavya 👋",
    subtitle: "Ready to continue your AI & Data Science journey? Here is your personalized plan for today.",
    askAiPlaceholder: "Ask me anything about your studies... (e.g. Explain PCA in simple words)",
    askButton: "Ask AI Tutor",
    voiceBtn: "Voice Input",
    listening: "Listening...",
    recommendationTitle: "Personalized Recommendation",
    startQuiz: "Take Adaptive Quiz",
    continueLearning: "Continue Learning →",
    weakAreaNotice: "Targeted Gap Detected: Review PCA before starting Clustering."
  },
  te: {
    welcome: "శుభోదయం, భవ్య 👋",
    subtitle: "మీ AI & Data Science ప్రయాణాన్ని కొనసాగించడానికి సిద్ధంగా ఉన్నారా? మీ రోజువారీ ప్రణాళిక ఇక్కడ ఉంది.",
    askAiPlaceholder: "మీ చదువుల గురించి ఏదైనా సందేహం అడగండి... (ఉదా: PCA ని సులభంగా వివరించు)",
    askButton: "AI ట్యూటర్‌ని అడగండి",
    voiceBtn: "వాయిస్ ఇన్పుట్",
    listening: "వింటున్నాను...",
    recommendationTitle: "వ్యక్తిగతీకరించిన సిఫార్సు",
    startQuiz: "క్విజ్ ప్రారంభించండి",
    continueLearning: "నేర్చుకోవడం కొనసాగించండి →",
    weakAreaNotice: "పరిశీలించాల్సిన విభాగం: క్లస్టరింగ్ ప్రారంభించే ముందు PCA ని సమీక్షించండి."
  },
  hi: {
    welcome: "शुभ प्रभात, भव्या 👋",
    subtitle: "क्या आप अपनी AI और डेटा साइंस यात्रा जारी रखने के लिए तैयार हैं? यह आज की आपकी व्यक्तिगत योजना है।",
    askAiPlaceholder: "अपनी पढ़ाई के बारे में कुछ भी पूछें... (उदा. PCA को सरल शब्दों में समझाएं)",
    askButton: "AI ट्यूटर से पूछें",
    voiceBtn: "वॉयस इनपुट",
    listening: "सुन रहा हूँ...",
    recommendationTitle: "व्यक्तिगत अनुशंसा",
    startQuiz: "क्विज़ शुरू करें",
    continueLearning: "सीखना जारी रखें →",
    weakAreaNotice: "कमज़ोर क्षेत्र की पहचान: क्लस्टरिंग शुरू करने से पहले PCA का अभ्यास करें।"
  }
};
