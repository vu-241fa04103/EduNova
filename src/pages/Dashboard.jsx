import React from 'react';
import { useLearning } from '../context/LearningContext';
import { multilingualTranslations, getLocalizedWelcome } from '../data/mockData';
import {
  TrendingUp,
  BookOpen,
  HelpCircle,
  Flame,
  ArrowRight,
  Bot,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Compass,
  PlayCircle
} from 'lucide-react';

export default function Dashboard() {
  const {
    user,
    language,
    setCurrentPage,
    lastQuizResult,
    pathNodes,
    completedLessonsCount,
    totalLessonsCount,
    overallProgressPercent,
    quizAccuracyAvg,
    enrolledSubjectMastery,
    identifiedWeakAreaTopic,
    departmentTasks,
    completeStudentTask
  } = useLearning();
  const t = multilingualTranslations[language] || multilingualTranslations.en;

  // Find currently recommended topic
  const recommendedNode = pathNodes.find(n => n.status === 'recommended') || pathNodes[0] || {};

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 p-6 sm:p-8 text-white shadow-xl shadow-indigo-100">
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>Smart India Hackathon 2026</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/40 px-3 py-1 text-xs font-semibold backdrop-blur-md border border-white/20">
                <span>{user.course || "B.Tech Engineering"}</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {getLocalizedWelcome(language, user?.name)}
            </h1>
            <p className="mt-1 text-sm sm:text-base text-indigo-100 max-w-xl">
              {t.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentPage('ai-tutor')}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-indigo-700 shadow-md hover:bg-indigo-50 transition"
            >
              <Bot className="h-4 w-4" />
              <span>Ask AI Tutor</span>
            </button>
            <button
              onClick={() => setCurrentPage('quiz')}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500/40 border border-white/20 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-indigo-500/60 transition backdrop-blur-sm"
            >
              <HelpCircle className="h-4 w-4" />
              <span>{t.startQuiz}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid - Dynamic Real-Time Values */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Progress */}
        <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Overall Progress</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-slate-900">{overallProgressPercent}%</p>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${overallProgressPercent}%` }} />
          </div>
          <span className="mt-2 block text-[11px] font-medium text-emerald-600">
            {overallProgressPercent > 0 ? `${overallProgressPercent}% track completed` : 'Start with your 1st lesson'}
          </span>
        </div>

        {/* Completed Lessons */}
        <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Completed Lessons</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-slate-900">
            {completedLessonsCount} <span className="text-sm font-medium text-slate-400">/ {totalLessonsCount}</span>
          </p>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${totalLessonsCount > 0 ? (completedLessonsCount / totalLessonsCount) * 100 : 0}%` }}
            />
          </div>
          <span className="mt-2 block text-[11px] font-medium text-slate-500">
            {totalLessonsCount - completedLessonsCount} modules remaining
          </span>
        </div>

        {/* Avg Quiz Score */}
        <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Avg Quiz Score</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <HelpCircle className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-slate-900">
            {quizAccuracyAvg > 0 ? `${quizAccuracyAvg}%` : '0%'}
          </p>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${quizAccuracyAvg}%` }}
            />
          </div>
          <span className="mt-2 block text-[11px] font-medium text-indigo-600">
            {user?.quizHistory?.length ? `Based on ${user.quizHistory.length} tests taken` : 'Take quiz to evaluate'}
          </span>
        </div>

        {/* Study Streak */}
        <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Study Streak</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <Flame className="h-5 w-5 fill-orange-500" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-slate-900">{user.streakDays || 1} Days</p>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <div
                key={d}
                className={`flex-1 h-1.5 rounded-full ${
                  d <= (user.streakDays || 1) ? 'bg-orange-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="mt-2 block text-[11px] font-medium text-orange-600">
            {(user.streakDays || 1) >= 5 ? 'Top 10% consistent learner' : 'Keep studying to build streak'}
          </span>
        </div>
      </div>

      {/* Main Content Grid: Personalized Recommendation & Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Personalized Next Step */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-600"></span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {t.recommendationTitle}
                </h2>
              </div>
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                Continuous Learning Loop
              </span>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-indigo-50/70 via-slate-50 to-purple-50/50 p-5 border border-indigo-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-block rounded-lg bg-indigo-600 px-2.5 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider mb-2">
                    {recommendedNode.subject || user.selectedInterests?.[0] || "Core Engineering"}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {recommendedNode.title || "Foundational Concepts & Principles"}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-lg">
                    {recommendedNode.recommendedReason || "Recommended next step based on your diagnostic evaluation and selected curriculum."}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span>⏱️ Est. time: {recommendedNode.duration || "4 hrs"}</span>
                    <span>•</span>
                    <span>{recommendedNode.topics?.length || 4} Core Concepts</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-semibold">Ready to Study</span>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0">
                  <button
                    onClick={() => setCurrentPage('learning-path')}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition"
                  >
                    <span>{t.continueLearning}</span>
                  </button>
                  <button
                    onClick={() => setCurrentPage('ai-tutor')}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-3 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-50 transition"
                  >
                    <Bot className="h-3.5 w-3.5" />
                    <span>Ask Doubt</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setCurrentPage('quiz')}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-100 hover:border-indigo-200 transition text-left group"
              >
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Adaptive Quiz</p>
                  <p className="text-[10px] text-slate-500">Test Your Selected Courses</p>
                </div>
              </button>

              <button
                onClick={() => setCurrentPage('learning-path')}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-100 hover:border-indigo-200 transition text-left group"
              >
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Learning Path</p>
                  <p className="text-[10px] text-slate-500">{pathNodes.length} Roadmap Milestones</p>
                </div>
              </button>

              <button
                onClick={() => setCurrentPage('career')}
                className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-100 hover:border-indigo-200 transition text-left group"
              >
                <div className="p-2 rounded-lg bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition">
                  <Compass className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Career Match</p>
                  <p className="text-[10px] text-slate-500">{user.targetGoal || "Engineering Role"}</p>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Performance Diagnostics */}
          <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Latest Assessment Insights
              </h2>
              <span className="text-xs font-semibold text-slate-400">
                {lastQuizResult.taken ? `Score: ${lastQuizResult.percentage}% (${lastQuizResult.score}/${lastQuizResult.total})` : "Diagnostic Ready"}
              </span>
            </div>

            {lastQuizResult.taken && (lastQuizResult.strongAreas?.length > 0 || lastQuizResult.weakAreas?.length > 0) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-emerald-50/80 p-4 border border-emerald-100">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Strong Areas Mastered</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-emerald-900">
                    {lastQuizResult.strongAreas.map((area, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 font-medium">
                        <span className="text-emerald-500 font-bold">✓</span> {area}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-rose-50/80 p-4 border border-rose-100">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-xs mb-2">
                    <AlertTriangle className="h-4 w-4 text-rose-600" />
                    <span>Needs Practice (Gaps Identified)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-rose-900">
                    {lastQuizResult.weakAreas.map((area, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 font-medium">
                        <span className="text-rose-500 font-bold">⚠</span> {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200 text-center">
                <HelpCircle className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-800">No Assessment Taken Yet</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Take your first smart adaptive quiz to diagnose strengths, identify learning gaps, and tailor your roadmap.
                </p>
                <button
                  onClick={() => setCurrentPage('quiz')}
                  className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow hover:bg-indigo-700 transition"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Start Diagnostic Quiz</span>
                </button>
              </div>
            )}
          </div>

          {/* Faculty Assigned Domain Tasks */}
          <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Faculty Assigned Domain Tasks
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tasks assigned by faculty specifically for {user.course || 'your department'}.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 shrink-0">
                {(departmentTasks || []).filter(t => (t.department === user.department || t.department === 'all') && user.completedTaskIds?.includes(t.id)).length} / {(departmentTasks || []).filter(t => t.department === user.department || t.department === 'all').length} Done
              </span>
            </div>

            <div className="space-y-3">
              {(departmentTasks || [])
                .filter(t => t.department === user.department || t.department === 'all')
                .map((task) => {
                  const isDone = user.completedTaskIds?.includes(task.id);
                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isDone
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-slate-50 hover:bg-indigo-50/30 border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {task.skillTag || task.topic}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400">
                              ⏱ Due in {task.deadline}
                            </span>
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                              +{task.points || 50} XP
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            {task.title}
                          </h4>
                          <p className="text-xs text-slate-600">
                            {task.description}
                          </p>
                          <span className="text-[10px] text-slate-400 block">
                            Assigned by: {task.assignedBy || 'Faculty Mentor'}
                          </span>
                        </div>

                        <div className="shrink-0">
                          {isDone ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-300">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                              <span>Submitted & Completed</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => completeStudentTask(task.id)}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition"
                            >
                              <span>Complete & Submit</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

              {(departmentTasks || []).filter(t => t.department === user.department || t.department === 'all').length === 0 && (
                <div className="p-4 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl">
                  No pending domain tasks assigned by faculty for your branch yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Subject Mastery tailored ONLY to selected courses */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900">Selected Courses Mastery</h3>
                <p className="text-[11px] text-slate-400">Showing only your enrolled subjects</p>
              </div>
              <button
                onClick={() => setCurrentPage('profile')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Edit Courses →
              </button>
            </div>

            <div className="space-y-4">
              {enrolledSubjectMastery.map((sub) => (
                <div key={sub.id} className="p-2.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span className="truncate pr-2">{sub.name}</span>
                    <span className="flex items-center gap-1 shrink-0">
                      {sub.score}%
                      <span className={`text-[10px] font-normal ${sub.trend.startsWith('+') ? 'text-emerald-600' : sub.trend.startsWith('-') ? 'text-rose-600' : 'text-slate-400'}`}>
                        ({sub.trend})
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${sub.color} transition-all duration-500`}
                      style={{ width: `${sub.score}%` }}
                    />
                  </div>
                  {sub.isWeak && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 mt-1">
                      ⚠ Identified Weak Area: Practice {sub.name}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {identifiedWeakAreaTopic && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-start gap-2 text-rose-700 bg-rose-50 p-2.5 rounded-xl text-xs">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                  <div>
                    <span className="font-bold block">AI Diagnostic Gap:</span>
                    <span>{identifiedWeakAreaTopic}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Tutor Quick Launcher Card */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/30 text-indigo-300 border border-indigo-400/20">
                <Bot className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">AI Personal Tutor</h3>
                <p className="text-[11px] text-indigo-300">Available 24/7 for instant doubts</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              "Stuck on any concept in your enrolled subjects? Ask me to explain it using simple real-world analogies or step-by-step logic!"
            </p>
            <button
              onClick={() => setCurrentPage('ai-tutor')}
              className="w-full rounded-xl bg-indigo-600 py-2.5 px-4 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition flex items-center justify-center gap-2"
            >
              <span>Open Doubt Solver</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
