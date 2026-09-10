import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { Sparkles, ArrowRight, ShieldCheck, UserCheck, Lock, AlertCircle, KeyRound, Check } from 'lucide-react';

export default function Login() {
  const { login, setCurrentPage } = useLearning();
  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const result = login(email, password);
    if (!result.success) {
      setErrorMessage(result.message);
    }
  };

  const handleQuickLogin = (demoEmail, demoPassword, role) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setActiveTab(role);
    setErrorMessage('');
    login(demoEmail, demoPassword);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Left Branding Panel */}
      <div className="md:w-1/2 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white p-8 md:p-14 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-indigo-700 font-bold text-xl shadow-lg">
              <Sparkles className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white">EduNova</span>
              <span className="ml-2 rounded-full bg-indigo-500/30 px-2.5 py-0.5 text-xs font-semibold text-indigo-200 border border-indigo-400/30">
                SIH 2026
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
            Continuous Personalized Engineering Learning.
          </h1>
          <p className="text-indigo-200 text-base max-w-md leading-relaxed mb-8">
            Adaptive quizzes diagnose exact learning gaps, real-time metrics update dynamically, and faculty administrators monitor student growth.
          </p>

          {/* Quick Demo Access Badges */}
          <div className="space-y-3 max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              🔑 Saved Demo Accounts (Ready to Test):
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-black/20 p-2.5 rounded-xl border border-white/10">
                <div>
                  <span className="font-bold text-white block">Student Demo (AI/DS):</span>
                  <span className="text-indigo-200">student@edunova.edu / demo123</span>
                </div>
                <button
                  onClick={() => handleQuickLogin('student@edunova.edu', 'demo123', 'student')}
                  className="px-2.5 py-1 bg-white text-indigo-800 font-bold rounded-lg text-[11px] hover:bg-indigo-50 shadow"
                >
                  Load
                </button>
              </div>

              <div className="flex items-center justify-between bg-black/20 p-2.5 rounded-xl border border-white/10">
                <div>
                  <span className="font-bold text-white block">Student Demo (ECE):</span>
                  <span className="text-indigo-200">rahul.ece@edunova.edu / rahul123</span>
                </div>
                <button
                  onClick={() => handleQuickLogin('rahul.ece@edunova.edu', 'rahul123', 'student')}
                  className="px-2.5 py-1 bg-white text-indigo-800 font-bold rounded-lg text-[11px] hover:bg-indigo-50 shadow"
                >
                  Load
                </button>
              </div>

              <div className="flex items-center justify-between bg-amber-500/20 p-2.5 rounded-xl border border-amber-300/30">
                <div>
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Admin Portal Demo:
                  </span>
                  <span className="text-amber-100">admin@edunova.edu / admin123</span>
                </div>
                <button
                  onClick={() => handleQuickLogin('admin@edunova.edu', 'admin123', 'admin')}
                  className="px-2.5 py-1 bg-amber-400 text-slate-900 font-bold rounded-lg text-[11px] hover:bg-amber-300 shadow"
                >
                  Load Admin
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-indigo-700/50 flex items-center justify-between text-xs text-indigo-300">
          <span>Smart Education Platform</span>
          <span>Smart India Hackathon 2026</span>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/60 border border-slate-100">
          {/* Portal Switcher Tabs */}
          <div className="flex rounded-2xl bg-slate-100 p-1.5 mb-6 border border-slate-200/80">
            <button
              type="button"
              onClick={() => { setActiveTab('student'); setErrorMessage(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'student'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="h-4 w-4" />
              <span>Student Portal</span>
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('admin'); setErrorMessage(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin Portal</span>
            </button>
          </div>

          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              {activeTab === 'admin' ? 'Admin / Faculty Login' : 'Student Account Login'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {activeTab === 'admin'
                ? 'Sign in with administrator credentials to manage courses & student metrics'
                : 'Enter your credentials to access your personalized learning roadmap'}
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-700">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={activeTab === 'admin' ? "admin@edunova.edu" : "student@edunova.edu"}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 transition"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500" />
                Remember me
              </label>
              <span className="text-[11px] text-slate-400">Credentials stored securely</span>
            </div>

            <button
              type="submit"
              className={`w-full rounded-xl p-3 text-sm font-bold text-white shadow-lg transition flex items-center justify-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-amber-200'
                  : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-indigo-200'
              }`}
            >
              <span>{activeTab === 'admin' ? 'Access Admin Console' : 'Login to Student Portal'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {activeTab === 'student' && (
            <div className="mt-6 text-center text-xs text-slate-500">
              Don't have an account yet?{' '}
              <button
                onClick={() => setCurrentPage('signup')}
                className="font-bold text-indigo-600 hover:text-indigo-700"
              >
                Sign Up as New Student
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
