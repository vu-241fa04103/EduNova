import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { careerRoles } from '../data/mockData';
import {
  Compass,
  Bot,
  Code,
  BarChart,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BookOpen,
  Briefcase
} from 'lucide-react';

export default function Career() {
  const { setCurrentPage } = useLearning();
  const [selectedRole, setSelectedRole] = useState(careerRoles[0]);

  const getIcon = (type) => {
    switch (type) {
      case 'Bot':
        return <Bot className="h-5 w-5" />;
      case 'Code':
        return <Code className="h-5 w-5" />;
      default:
        return <BarChart className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-600"></span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Career & Skill Guidance
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            AI-driven job role matching and targeted skill acquisition roadmap based on your profile.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700 border border-purple-200 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
            AI Job Match Engine
          </span>
        </div>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {careerRoles.map((role) => {
          const isSelected = selectedRole.id === role.id;
          return (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role)}
              className={`rounded-3xl p-6 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-white ring-2 ring-indigo-600/20 shadow-lg -translate-y-1'
                  : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {getIcon(role.icon)}
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700 border border-emerald-200">
                    {role.matchPercentage}% Match
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  {role.badge}
                </span>

                <h3 className="text-lg font-bold text-slate-900 mt-2">{role.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {role.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>Industry Salary:</span>
                  <span className="font-bold text-slate-900">{role.avgSalary}</span>
                </div>
              </div>

              <div className="mt-5">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                  <div
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${role.matchPercentage}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-indigo-600 flex items-center justify-between">
                  <span>Skill Alignment</span>
                  <span>{role.matchPercentage}%</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Skill Alignment Breakdown for Selected Role */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900">{selectedRole.title} Roadmap</h2>
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
                {selectedRole.matchPercentage}% Readiness
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Bridging your current strengths to full career readiness.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('learning-path')}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition self-start sm:self-auto"
          >
            <span>Bridge Skill Gaps in Path</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Skills Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Acquired Skills */}
          <div className="rounded-2xl bg-emerald-50/70 p-5 border border-emerald-100 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span>Skills You Already Have ({selectedRole.acquiredSkills.length})</span>
            </div>
            <div className="space-y-2">
              {selectedRole.acquiredSkills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-emerald-200 text-xs font-bold text-emerald-900"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    {skill}
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full font-extrabold">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="rounded-2xl bg-rose-50/70 p-5 border border-rose-100 space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <AlertCircle className="h-5 w-5 text-rose-600" />
              <span>Skills Needed to Reach 100% Match ({selectedRole.missingSkills.length})</span>
            </div>
            <div className="space-y-2">
              {selectedRole.missingSkills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-rose-200 text-xs font-bold text-rose-900"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                    {skill}
                  </span>
                  <span className="text-[10px] text-rose-700 bg-rose-100/60 px-2 py-0.5 rounded-full font-extrabold">
                    Recommended
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Plan Guidance */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 p-5 border border-indigo-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1">
            Personalized Action Plan from AI Advisor
          </h4>
          <p className="text-xs sm:text-sm font-medium text-indigo-950 leading-relaxed">
            {selectedRole.actionPlan}
          </p>
        </div>
      </div>
    </div>
  );
}
