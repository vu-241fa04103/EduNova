import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { Sparkles, ArrowRight, BookOpen, Check, AlertCircle, Layers, CheckSquare, Square } from 'lucide-react';

export default function Signup() {
  const { signup, setCurrentPage, departments } = useLearning();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: 'ai_ds',
    college: 'Smart India Hackathon 2026',
    targetCareer: 'Machine Learning Engineer',
    selectedInterests: ["Machine Learning", "Statistics & Probability", "Python for Data Science"]
  });
  const [errorMessage, setErrorMessage] = useState('');

  const currentDept = departments.find(d => d.id === formData.department) || departments[0];

  const handleDepartmentChange = (deptId) => {
    const dept = departments.find(d => d.id === deptId) || departments[0];
    setFormData(prev => ({
      ...prev,
      department: deptId,
      selectedInterests: dept.subjects.slice(0, 3)
    }));
  };

  const toggleSubject = (subj) => {
    setFormData(prev => {
      const exists = prev.selectedInterests.includes(subj);
      let updated;
      if (exists) {
        if (prev.selectedInterests.length <= 1) return prev; // Keep at least 1
        updated = prev.selectedInterests.filter(s => s !== subj);
      } else {
        updated = [...prev.selectedInterests, subj];
      }
      return { ...prev, selectedInterests: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!formData.selectedInterests || formData.selectedInterests.length === 0) {
      setErrorMessage('Please select at least one course / subject to enroll in.');
      return;
    }
    const result = signup(formData);
    if (!result.success) {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 sm:p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/60 border border-slate-100">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">EduNova</span>
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700">SIH 2026</span>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Create New Student Account</h2>
          <p className="text-xs text-slate-500 mt-1">
            Pick your engineering discipline and select the courses you want to study.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-700">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Priya Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">College / University</label>
              <input
                type="text"
                required
                placeholder="e.g. IIT Bombay"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="priya@college.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
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
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Engineering Branch</label>
              <select
                value={formData.department}
                onChange={(e) => handleDepartmentChange(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none font-medium"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name} ({dept.shortName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Career Goal</label>
              <input
                type="text"
                placeholder="e.g. AI Research Engineer"
                value={formData.targetCareer}
                onChange={(e) => setFormData({ ...formData, targetCareer: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Enrolled Courses Selection */}
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
                Select Enrolled Courses to Track (Progress is Isolated):
              </label>
              <span className="text-[11px] font-semibold text-indigo-600">
                {formData.selectedInterests.length} selected
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              Only selected courses will appear on your dashboard and subject mastery cards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentDept.subjects.map((subj) => {
                const isChecked = formData.selectedInterests.includes(subj);
                return (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => toggleSubject(subj)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-left text-xs font-semibold transition border ${
                      isChecked
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="h-4 w-4 text-indigo-600 shrink-0" />
                    ) : (
                      <Square className="h-4 w-4 text-slate-400 shrink-0" />
                    )}
                    <span className="truncate">{subj}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 p-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-indigo-800 transition flex items-center justify-center gap-2"
          >
            <span>Create Account & Start Learning</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <button
            onClick={() => setCurrentPage('login')}
            className="font-bold text-indigo-600 hover:text-indigo-700"
          >
            Log In here
          </button>
        </div>
      </div>
    </div>
  );
}
