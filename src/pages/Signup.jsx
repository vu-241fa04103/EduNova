import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { Sparkles, ArrowRight, BookOpen, Check } from 'lucide-react';

export default function Signup() {
  const { login, setCurrentPage } = useLearning();
  const [formData, setFormData] = useState({
    name: 'Bhavya',
    email: 'bhavya.sih@edunova.edu',
    password: '',
    targetCareer: 'Machine Learning Engineer',
    college: 'Smart India Hackathon 2026'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 sm:p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/60 border border-slate-100">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">EduNova</span>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Create Student Account</h2>
          <p className="text-xs text-slate-500 mt-1">
            Join the smart personalized learning platform powered by AI
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Career Interest</label>
            <select
              value={formData.targetCareer}
              onChange={(e) => setFormData({ ...formData, targetCareer: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
            >
              <option value="Machine Learning Engineer">Machine Learning Engineer</option>
              <option value="Full-Stack AI Developer">Full-Stack AI Developer</option>
              <option value="Data Scientist / Analyst">Data Scientist / Analyst</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 p-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-indigo-800 transition flex items-center justify-center gap-2"
          >
            <span>Complete Registration</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Already registered?{' '}
          <button
            onClick={() => setCurrentPage('login')}
            className="font-bold text-indigo-600 hover:text-indigo-700"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
