import React from 'react';
import { useLearning } from '../context/LearningContext';
import { Bell, Globe, Sparkles, User, BookOpen, LogOut } from 'lucide-react';

export default function Navbar({ onToggleSidebar }) {
  const { user, language, setLanguage, setCurrentPage, logout } = useLearning();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 py-3 sm:px-6 shadow-sm">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div
          onClick={() => setCurrentPage('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-200 transition group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900">EduNova</span>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                SIH 2026
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 hidden sm:block">Learn • Analyze • Recommend • Practice • Improve</p>
          </div>
        </div>
      </div>

      {/* Right Controls: Multilingual, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Language Selector */}
        <div className="relative flex items-center">
          <Globe className="absolute left-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-8 text-xs font-semibold text-slate-700 hover:bg-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer transition"
          >
            <option value="en">English (US)</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="hi">हिन्दी (Hindi)</option>
          </select>
          <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
            ▼
          </div>
        </div>

        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
        </button>

        {/* Profile Pill */}
        <div
          onClick={() => setCurrentPage('profile')}
          className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50/80 p-1 pr-3 cursor-pointer hover:bg-slate-100 transition shadow-sm"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="h-7 w-7 rounded-full object-cover ring-2 ring-indigo-500/20"
          />
          <div className="hidden text-left md:block">
            <p className="text-xs font-bold text-slate-800 leading-tight">{user?.name || "Student"}</p>
            <p className="text-[10px] text-slate-500 leading-none">
              {user?.role === 'admin' ? (
                <span className="font-bold text-amber-600">Admin / Faculty</span>
              ) : (
                'Student'
              )}
            </p>
          </div>
        </div>

        {/* Quick Logout button for demo */}
        <button
          onClick={logout}
          title="Sign Out"
          className="hidden sm:flex items-center justify-center p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
