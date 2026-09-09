import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { mlQuizQuestions } from '../data/mockData';
import {
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Bot,
  MapPin,
  Trophy,
  Sparkles,
  Clock
} from 'lucide-react';

export default function Quiz() {
  const { processQuizResults, setCurrentPage, lastQuizResult } = useLearning();

  const [selectedSubject, setSelectedSubject] = useState('ml');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreReport, setScoreReport] = useState(null);

  const questions = mlQuizQuestions;
  const currentQ = questions[currentQuestionIdx];

  const handleSelectOption = (optIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: optIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    const topicStats = {};

    questions.forEach((q, idx) => {
      const isCorrect = selectedAnswers[idx] === q.correctAnswer;
      if (isCorrect) score += 1;

      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { total: 0, correct: 0 };
      }
      topicStats[q.topic].total += 1;
      if (isCorrect) topicStats[q.topic].correct += 1;
    });

    const strongAreas = [];
    const weakAreas = [];

    Object.keys(topicStats).forEach(topic => {
      const stats = topicStats[topic];
      if (stats.correct / stats.total >= 0.7) {
        strongAreas.push(topic);
      } else {
        weakAreas.push(topic);
      }
    });

    // Fallback if none in weak
    if (weakAreas.length === 0 && score < questions.length) {
      weakAreas.push("PCA");
    }

    const report = {
      score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      strongAreas: strongAreas.length > 0 ? strongAreas : ["General ML"],
      weakAreas: weakAreas.length > 0 ? weakAreas : ["Dimensionality Reduction"]
    };

    setScoreReport(report);
    setIsSubmitted(true);

    // Update global state & learning path
    processQuizResults(score, questions.length, report.weakAreas, report.strongAreas);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setIsSubmitted(false);
    setScoreReport(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Quiz Header */}
      <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-600"></span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                Smart Adaptive Assessment
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Evaluates current concepts and dynamically updates your personalized roadmap
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={isSubmitted}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
            >
              <option value="ml">Machine Learning (Advanced)</option>
              <option value="python">Python OOP & Data Structures</option>
              <option value="dbms">DBMS & SQL Architecture</option>
            </select>
          </div>
        </div>
      </div>

      {!isSubmitted ? (
        /* Active Quiz Card */
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          {/* Progress Bar & Counter */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span>Question {currentQuestionIdx + 1} of {questions.length}</span>
              <span className="inline-flex items-center gap-1 text-indigo-600">
                <Clock className="h-3.5 w-3.5" />
                Adaptive Mode
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Topic Pill */}
          <div>
            <span className="inline-block rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-bold text-indigo-700">
              Topic: {currentQ.topic}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestionIdx] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 flex items-center justify-between ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-600/20 text-indigo-950 font-semibold shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs font-bold ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm">{option}</span>
                  </div>
                  <div
                    className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600'
                        : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIdx === 0}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {currentQuestionIdx === questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={selectedAnswers[currentQuestionIdx] === undefined}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-200 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 transition"
              >
                <Trophy className="h-4 w-4" />
                <span>Submit & Analyze Gaps</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestionIdx] === undefined}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                <span>Next Question</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results Breakdown Card */
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center pb-6 border-b border-slate-100">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 mb-3">
              <Trophy className="h-8 w-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Quiz Completed! 🎉
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Your performance has been evaluated by the AI Learning Engine.
            </p>

            <div className="mt-4 inline-flex items-baseline gap-2 bg-indigo-50 border border-indigo-100 px-6 py-3 rounded-2xl">
              <span className="text-3xl font-black text-indigo-700">{scoreReport.score}</span>
              <span className="text-sm font-bold text-slate-500">/ {scoreReport.total}</span>
              <span className="ml-2 text-base font-extrabold text-indigo-600">({scoreReport.percentage}%)</span>
            </div>
          </div>

          {/* Diagnostics Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-emerald-50/70 p-5 border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>Strong Areas (Mastered)</span>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-emerald-800">
                {scoreReport.strongAreas.map((topic, i) => (
                  <li key={i} className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-rose-50/70 p-5 border border-rose-100">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm mb-3">
                <AlertTriangle className="h-5 w-5 text-rose-600" />
                <span>Needs Improvement (Learning Gaps)</span>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-rose-800">
                {scoreReport.weakAreas.map((topic, i) => (
                  <li key={i} className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-rose-200">
                    <span className="text-rose-600 font-bold">⚠</span>
                    <span>{topic} — (Dimensionality Reduction)</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Smart Recommendation Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 p-5 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                AI Adaptive Action
              </p>
              <h4 className="text-base font-bold text-slate-900">
                Personalized Learning Path Updated!
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                We've adjusted your roadmap to prioritize <strong>PCA</strong> before proceeding to Clustering.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button
                onClick={() => setCurrentPage('learning-path')}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition"
              >
                <MapPin className="h-4 w-4" />
                <span>Practice Weak Topics</span>
              </button>
              <button
                onClick={() => setCurrentPage('ai-tutor')}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-indigo-200 px-3 py-2.5 text-xs font-bold text-indigo-700 hover:bg-indigo-50 transition"
              >
                <Bot className="h-4 w-4" />
                <span>Ask AI Tutor</span>
              </button>
            </div>
          </div>

          {/* Retake Button */}
          <div className="pt-2 text-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
