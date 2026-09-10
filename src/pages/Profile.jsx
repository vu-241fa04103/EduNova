import React, { useState, useRef } from 'react';
import { useLearning } from '../context/LearningContext';
import { engineeringDepartments } from '../data/mockData';
import CameraModal from '../components/CameraModal';
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
  LogOut,
  Camera,
  Image as ImageIcon,
  CheckSquare,
  Square,
  Layers
} from 'lucide-react';

export default function Profile() {
  const { user, setUser, language, setLanguage, logout, changeDepartment, updateAvatar, departments } = useLearning();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Local form state
  const [studentName, setStudentName] = useState(user.name || '');
  const [studentEmail, setStudentEmail] = useState(user.email || '');
  const [selectedDept, setSelectedDept] = useState(user.department || 'ai_ds');
  const [interests, setInterests] = useState(user.selectedInterests || []);

  const activeDeptInfo = departments?.find(d => d.id === selectedDept) || departments?.[0] || {};

  // Handle department change in dropdown
  const handleDepartmentChange = (deptId) => {
    setSelectedDept(deptId);
    const newDept = departments?.find(d => d.id === deptId);
    if (newDept) {
      setInterests(newDept.subjects.slice(0, 3)); // default select first 3
    }
  };

  // Toggle subject interest checkbox
  const toggleInterest = (subject) => {
    if (interests.includes(subject)) {
      setInterests(interests.filter(s => s !== subject));
    } else {
      setInterests([...interests, subject]);
    }
  };

  // Handle file upload from gallery / local disk
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert("Please select a valid image file (PNG, JPG, JPEG, WEBP).");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        if (dataUrl) {
          updateAvatar(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaptureCamera = (capturedDataUrl) => {
    updateAvatar(capturedDataUrl);
  };

  const handleResetDemo = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: studentName,
      email: studentEmail
    }));
    changeDepartment(selectedDept, interests);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hidden file input for Gallery upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Camera modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCaptureCamera}
      />

      {/* Profile Header Card with Avatar Change Options */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar Container with Hover Actions */}
          <div className="relative group">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-28 w-28 rounded-3xl object-cover ring-4 ring-indigo-500/20 shadow-lg group-hover:opacity-90 transition"
            />
            {/* Action buttons under / overlaying avatar */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsCameraOpen(true)}
                className="inline-flex items-center gap-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-[11px] font-bold px-2.5 py-1.5 rounded-xl border border-slate-200 transition shadow-2xs"
                title="Take photo using camera"
              >
                <Camera className="h-3.5 w-3.5 text-indigo-600" />
                <span>Camera</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-[11px] font-bold px-2.5 py-1.5 rounded-xl border border-slate-200 transition shadow-2xs"
                title="Upload from device gallery"
              >
                <ImageIcon className="h-3.5 w-3.5 text-emerald-600" />
                <span>Gallery</span>
              </button>
            </div>
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-2xl font-black text-slate-900">{user.name || "Student"}</h1>
              <span className="rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200">
                Verified Student
              </span>
              <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-bold text-purple-700 border border-purple-200">
                {activeDeptInfo.shortName}
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
                SIH 2026 Ready
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200">
                <Layers className="h-4 w-4 text-slate-500" />
                {interests.length} Focused Subjects
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Department & Interest Selection (Universal Platform) */}
      <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600" />
            <span>Engineering Department & Personalized Subject Track</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select your engineering branch and the exact subjects you want EduNova's AI to prioritize in your adaptive roadmap.
          </p>
        </div>

        <div className="space-y-4">
          {/* Department Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Select Your Engineering Branch / Domain
            </label>
            <select
              value={selectedDept}
              onChange={(e) => handleDepartmentChange(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 focus:border-indigo-600 focus:bg-white focus:outline-none transition cursor-pointer"
            >
              {departments?.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name} ({dept.shortName})
                </option>
              ))}
            </select>
          </div>

          {/* Subjects of Interest Checkbox Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Select Subjects You Want to Learn & Master ({activeDeptInfo.shortName})
              </label>
              <span className="text-[11px] text-indigo-600 font-semibold">
                {interests.length} selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeDeptInfo.subjects.map((subj) => {
                const isChecked = interests.includes(subj);
                return (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => toggleInterest(subj)}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-left text-xs font-semibold transition ${
                      isChecked
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{subj}</span>
                    {isChecked ? (
                      <CheckSquare className="h-4 w-4 text-indigo-600 shrink-0" />
                    ) : (
                      <Square className="h-4 w-4 text-slate-300 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Selecting your focus subjects will automatically update your **Personalized Learning Path**, **Adaptive Quizzes**, and **Career Guidance**.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Details & Save Form */}
      <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900">
          Personal Details & Settings
        </h2>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student Name</label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Vaishnavi"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Email</label>
              <input
                type="email"
                required
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
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
              className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Save Profile & Update Learning Path</span>
            </button>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-pulse">
                <CheckCircle2 className="h-4 w-4" /> Profile & Department Updated!
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
