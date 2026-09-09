import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, BookOpen } from 'lucide-react';

export default function Login() {
  const { login, setCurrentPage } = useLearning();
  const [email, setEmail] = useState('bhavya.sih@edunova.edu');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleDemoLogin = () => {
    login('bhavya.sih@edunova.edu', 'demo123');
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
            AI-Powered Personalized Learning for Every Student.
          </h1>
          <p className="text-indigo-200 text-base max-w-md leading-relaxed mb-8">
            Experience smart doubt solving, continuous performance analysis, adaptive quizzes, and tailored career pathways.
          </p>

          {/* Learning Flow Pills */}
          <div className="space-y-3 max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              The EduNova Learning Loop
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="bg-indigo-600/60 px-3 py-1.5 rounded-lg border border-indigo-400/30">1. Learn</span>
              <span>→</span>
              <span className="bg-indigo-600/60 px-3 py-1.5 rounded-lg border border-indigo-400/30">2. Analyze</span>
              <span>→</span>
              <span className="bg-indigo-600/60 px-3 py-1.5 rounded-lg border border-indigo-400/30">3. Recommend</span>
              <span>→</span>
              <span className="bg-indigo-600/60 px-3 py-1.5 rounded-lg border border-indigo-400/30">4. Practice</span>
              <span>→</span>
              <span className="bg-indigo-600/60 px-3 py-1.5 rounded-lg border border-indigo-400/30">5. Improve</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-indigo-700/50 flex items-center justify-between text-xs text-indigo-300">
          <span>Smart Education Category</span>
          <span>Smart India Hackathon</span>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/60 border border-slate-100">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900">Student Portal Login</h2>
            <p className="text-sm text-slate-500 mt-1">
              Enter your student credentials to access your dashboard
            </p>
          </div>

          {/* One-click demo login pill */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full mb-5 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/70 p-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-100/60 transition shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span>One-Click Demo Login as <strong>Bhavya</strong></span>
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-xs text-slate-400 uppercase font-medium">Or enter details</span>
          </div>

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
                placeholder="bhavya.sih@edunova.edu"
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
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-700">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 p-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-indigo-800 transition flex items-center justify-center gap-2"
            >
              <span>Login to EduNova</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <button
              onClick={() => setCurrentPage('signup')}
              className="font-bold text-indigo-600 hover:text-indigo-700"
            >
              Sign Up here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
