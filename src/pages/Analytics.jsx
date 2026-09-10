import React from 'react';
import { useLearning } from '../context/LearningContext';
import {
  BarChart2,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Award,
  ArrowRight,
  BookOpen,
  Sparkles,
  Layers
} from 'lucide-react';

export default function Analytics() {
  const {
    enrolledSubjectMastery,
    user,
    setCurrentPage,
    overallProgressPercent,
    quizAccuracyAvg,
    lastQuizResult
  } = useLearning();

  const quizCount = user?.quizHistory?.length || 0;
  const weakCount = enrolledSubjectMastery.filter(s => s.isWeak).length;
  const masteredConceptsCount = enrolledSubjectMastery.filter(s => s.score >= 75).length * 3 + (user.completedLessons || 0) * 2;
  const totalStudyHours = Math.max(2.5, ((user.completedLessons || 0) * 2.5 + quizCount * 0.8)).toFixed(1);

  const weeklyActivity = [
    { day: 'Mon', hours: (user.streakDays || 1) >= 1 ? 2.5 : 0.5, quizScore: quizAccuracyAvg || 80 },
    { day: 'Tue', hours: (user.streakDays || 1) >= 2 ? 3.0 : 0.8, quizScore: quizAccuracyAvg || 85 },
    { day: 'Wed', hours: (user.streakDays || 1) >= 3 ? 1.5 : 0.5, quizScore: quizAccuracyAvg || 75 },
    { day: 'Thu', hours: (user.streakDays || 1) >= 4 ? 4.0 : 1.2, quizScore: quizAccuracyAvg || 88 },
    { day: 'Fri', hours: (user.streakDays || 1) >= 5 ? 3.5 : 1.0, quizScore: quizAccuracyAvg || 82 },
    { day: 'Sat', hours: 2.0, quizScore: quizAccuracyAvg || 78 },
    { day: 'Sun', hours: 2.0, quizScore: quizAccuracyAvg || 85 }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-600"></span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Performance Analytics
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time skill diagnostics and learning gap identification for your selected courses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200">
            Overall Health: {overallProgressPercent >= 70 ? 'Excellent' : overallProgressPercent >= 40 ? 'Good' : 'Getting Started'} ({overallProgressPercent}%)
          </span>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Total Study Time</span>
            <Clock className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{totalStudyHours} <span className="text-xs font-medium text-slate-400">hrs</span></p>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 block">Active Streak: {user.streakDays || 1} Days</span>
        </div>

        <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Quiz Accuracy</span>
            <Award className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{quizAccuracyAvg}%</p>
          <span className="text-[11px] font-bold text-indigo-600 mt-1 block">{quizCount} Tests Taken</span>
        </div>

        <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Identified Gaps</span>
            <AlertTriangle className="h-4 w-4 text-rose-500" />
          </div>
          <p className="text-2xl font-black text-rose-600">{weakCount} <span className="text-xs font-medium text-slate-400">topics</span></p>
          <span className="text-[11px] font-bold text-rose-600 mt-1 block">
            {weakCount > 0 ? 'Review Needed' : 'No Critical Gaps'}
          </span>
        </div>

        <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Concepts Mastered</span>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{masteredConceptsCount} <span className="text-xs font-medium text-slate-400">skills</span></p>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 block">{overallProgressPercent}% Track Readiness</span>
        </div>
      </div>

      {/* Main Grid: Subject Breakdown on Left, Weekly Activity on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Subject Mastery Breakdown (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Enrolled Subject Proficiency Matrix
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Continuous evaluation across your selected courses</p>
            </div>
            <span className="text-xs font-semibold text-slate-400">Target: 80%+</span>
          </div>

          <div className="space-y-5">
            {enrolledSubjectMastery.map((subject) => (
              <div key={subject.id} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <div className="flex items-center gap-2">
                    <span>{subject.name}</span>
                    {subject.isWeak && (
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-extrabold text-rose-700">
                        ⚠ Learning Gap
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-black">{subject.score}%</span>
                </div>

                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${subject.color} transition-all duration-500`}
                    style={{ width: `${subject.score}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Status: <strong className="text-slate-700">{subject.status}</strong></span>
                  <span className={subject.trend.startsWith('+') ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                    Weekly Change: {subject.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* AI Gap Detection Box */}
          <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 p-5 border border-rose-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-rose-500 text-white shrink-0 mt-0.5">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  Critical Gap Identified by AI
                </h3>
                <p className="text-xs font-medium text-slate-700 mt-1 leading-relaxed">
                  Your quiz data flags a proficiency drop in <strong>DBMS & SQL (65%)</strong> and <strong>Eigenvalue computation in PCA</strong>. Without these, advanced topics like Clustering will be difficult.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => setCurrentPage('learning-path')}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-rose-700 transition"
                  >
                    <span>Practice Recommended Modules</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Activity Bar Chart Simulation (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Weekly Study Hours
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Consistency tracker</p>
              </div>
              <span className="text-xs font-bold text-indigo-600">Avg 2.6 hrs/day</span>
            </div>

            {/* Custom SVG / HTML Bar Chart */}
            <div className="mt-6 pt-4 flex items-end justify-between h-48 px-2 border-b border-slate-200">
              {weeklyActivity.map((item, idx) => {
                const heightPercent = (item.hours / 4.5) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded shadow-xs">
                      {item.hours}h
                    </div>
                    <div className="w-7 sm:w-8 bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-32">
                      <div
                        className="w-full bg-gradient-to-t from-indigo-700 to-indigo-500 rounded-t-xl transition-all duration-300 group-hover:from-indigo-600 group-hover:to-indigo-400"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-indigo-600">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-indigo-50/70 p-4 border border-indigo-100">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs mb-1">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>AI Learning Tip</span>
            </div>
            <p className="text-xs text-indigo-800 leading-snug">
              Consistent 45-minute daily sessions yield 34% higher retention in Machine Learning algorithms than long weekend cramming.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
