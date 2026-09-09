import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import {
  User,
  Award,
  BookOpen,
  Calendar,
  Flame,
  Globe,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  LogOut
} from 'lucide-react';

export default function Profile() {
  const { user, setUser, language, setLanguage, logout } = useLearning();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleResetDemo = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-24 w-24 rounded-3xl object-cover ring-4 ring-indigo-500/20 shadow-md"
          />

          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-2xl font-black text-slate-900">{user.name}</h1>
              <span className="rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200">
                Verified Student
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-600">{user.course}</p>
            <p className="text-xs text-slate-400 mt-0.5">{user.college}</p>

            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200">
                <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
                {user.streakDays} Day Streak
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200">
                <Award className="h-4 w-4 text-indigo-600" />
                SIH 2026 Finalist
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200">
                <Globe className="h-4 w-4 text-slate-500" />
                Lang: {language.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges and Milestones */}
      <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Earned Achievements & Badges
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-center">
            <div className="text-2xl mb-1">🚀</div>
            <p className="text-xs font-bold text-slate-900">SIH 2026 Ready</p>
            <p className="text-[10px] text-slate-500">Hackathon Prototype</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
            <div className="text-2xl mb-1">🐍</div>
            <p className="text-xs font-bold text-slate-900">Python Maestro</p>
            <p className="text-[10px] text-slate-500">90% Quiz Mastery</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 text-center">
            <div className="text-2xl mb-1">🔥</div>
            <p className="text-xs font-bold text-slate-900">Consistency King</p>
            <p className="text-[10px] text-slate-500">5-Day Active Streak</p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-center">
            <div className="text-2xl mb-1">🤖</div>
            <p className="text-xs font-bold text-slate-900">AI Inquirer</p>
            <p className="text-[10px] text-slate-500">10+ Doubts Resolved</p>
          </div>
        </div>
      </div>

      {/* Profile Details & Demo Preferences */}
      <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900">
          Student Preferences & Settings
        </h2>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Email</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Target Goal</label>
              <input
                type="text"
                value={user.targetGoal}
                onChange={(e) => setUser({ ...user, targetGoal: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Interface Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
              >
                <option value="en">English</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition"
            >
              Save Profile Changes
            </button>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Changes saved!
              </span>
            )}
          </div>
        </form>

        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleResetDemo}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 px-3 py-2 rounded-xl transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Demo State</span>
          </button>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl transition"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
