# EduNova - Smart Education Platform
> **Smart India Hackathon 2026** • Smart Education Domain

An AI-driven continuous personalized learning platform designed to bridge knowledge gaps through real-time diagnostics, intelligent recommendations, and adaptive tutoring.

---

## 🔄 Core Learning Flow

```text
       Learn
         ↓
      Analyze
         ↓
     Recommend
         ↓
      Practice
         ↓
      Improve
```

1. **Learn**: Student learns concepts through structured curriculum and interactive study materials.
2. **Analyze**: Smart adaptive assessments evaluate question-by-question mastery and pinpoint precise weaknesses (e.g. PCA in Machine Learning).
3. **Recommend**: Personalized learning path dynamically updates, reprioritizing weak areas before moving to advanced topics.
4. **Practice & Resolve**: AI Personal Tutor clarifies difficult topics with intuitive analogies, code walkthroughs, voice input, and audio explanations.
5. **Improve**: Student re-takes quizzes, marks topics as mastered, and advances toward target career milestones (e.g., 87% Match for ML Engineer).

---

## 🌟 Key Features

- 🔐 **Student Authentication**: Login and Signup with one-click demo access for **Bhavya**.
- 📊 **Dynamic Dashboard**:
  - Live progress tracking (78%), lessons completed (12/16), average quiz score (85%), and study streak (5 days).
  - Highlighted continuous learning recommendation based on recent tests.
- 🤖 **AI Personal Tutor**:
  - Instant doubt solving with step-by-step logic, code snippets, and real-world analogies.
  - Interactive quick-prompts (PCA, Supervised vs Unsupervised, Gradient Descent, etc.).
  - 🎤 **Voice Input** using Web Speech API.
  - 🔊 **Text-to-Speech (TTS)** readout.
- 🎯 **Smart Adaptive Quizzes**:
  - Interactive assessments with real-time scoring.
  - Post-quiz diagnosis separating **Strong Areas** from **Identified Learning Gaps**.
  - Direct integration into the student's dynamic roadmap.
- 🗺️ **Personalized Learning Path**:
  - Visual node roadmap: Completed milestones, active/recommended modules, and locked capstone projects.
  - Detailed drawer with video links, code notebooks, and cheat sheets.
- 📈 **Performance Analytics**:
  - Domain mastery breakdown: Python (90%), ML (80%), Statistics (72%), DBMS (65%).
  - AI learning gap warning badges and weekly study hour trends.
- 🧭 **Career & Skill Guidance**:
  - AI job role matching: Machine Learning Engineer (87%), Full-Stack AI Developer (82%), Data Analyst (76%).
  - Acquired vs. required skill gap checklist with actionable next steps.
- 🌐 **Multilingual Support**:
  - Seamless English, Telugu (తెలుగు), and Hindi (हिन्दी) translations.

---

## 🚀 How to Run the Application

### 1. Navigate to the project directory:
```bash
cd EduNova
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Start the development server:
```bash
npm run dev
```

### 4. Open in browser:
```
http://localhost:3000
```

---

## 🏆 SIH 2026 Demo Script for Hackathon Judges

1. **Login Screen**: Click **"One-Click Demo Login as Bhavya"** to show instant student access.
2. **Dashboard**: Show Bhavya's 78% progress, study streak, and the **AI Recommendation banner** showing *Machine Learning (PCA)*.
3. **Take Quiz**:
   - Go to **Smart Quiz**.
   - Answer the 6 questions.
   - Click **Submit & Analyze Gaps**.
   - Show how the AI flags **Strong Areas** (Classification, Regression) and **Needs Improvement** (PCA).
4. **Adaptive Learning Path**:
   - Click **Practice Weak Topics**.
   - Show how Milestone 4 (PCA) is highlighted with **"Recommended Now"** because of the quiz gap!
5. **AI Tutor Doubt Solving**:
   - Click **Ask Doubt** or navigate to **AI Tutor**.
   - Click the prompt chip: *"Explain PCA in simple words"*.
   - Tap the **Speaker icon** to hear the AI explanation aloud!
   - Tap the **Microphone icon** to show voice question asking.
6. **Analytics & Career Match**:
   - Show the **Analytics** page with the DBMS / PCA gap alert and weekly study hours.
   - Show the **Career Guidance** page highlighting 87% match for Machine Learning Engineer.
