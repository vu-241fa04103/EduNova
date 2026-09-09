import React, { useState, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import { engineeringDepartments } from '../data/mockData';
import {
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Bot,
  Play,
  FileText,
  Code2,
  BookOpen,
  Info,
  HelpCircle,
  Cpu,
  Layers
} from 'lucide-react';

export default function LearningPath() {
  const { pathNodes, setPathNodes, setCurrentPage, user, changeDepartment } = useLearning();
  const [selectedNode, setSelectedNode] = useState(() => pathNodes.find(n => n.status === 'recommended') || pathNodes[0]);

  // Sync selectedNode when pathNodes changes (e.g. department switch)
  useEffect(() => {
    setSelectedNode(pathNodes.find(n => n.status === 'recommended') || pathNodes[0]);
  }, [pathNodes]);

  const activeDeptInfo = engineeringDepartments.find(d => d.id === user.department) || engineeringDepartments[0];

  const handleMarkComplete = (nodeId) => {
    setPathNodes(prev =>
      prev.map(node => {
        if (node.id === nodeId) {
          return { ...node, status: 'completed', score: 92 };
        }
        if (node.id === nodeId + 1 && node.status === 'locked') {
          return {
            ...node,
            status: 'recommended',
            recommendedReason: 'Unlocked! Next sequential milestone in your engineering track.'
          };
        }
        return node;
      })
    );
    setSelectedNode(prev => ({ ...prev, status: 'completed', score: 92 }));
  };

  const completedCount = pathNodes.filter(n => n.status === 'completed').length;
  const activeCount = pathNodes.filter(n => n.status === 'recommended').length;
  const lockedCount = pathNodes.filter(n => n.status === 'locked').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-600"></span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Personalized Engineering Roadmap
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Adaptive curriculum for <strong>{activeDeptInfo.name}</strong>, dynamically prioritized based on your diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            <span>{completedCount} Done</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 animate-ping"></span>
            <span>{activeCount} Active</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-xl">
            <Lock className="h-3 w-3" />
            <span>{lockedCount} Locked</span>
          </div>
        </div>
      </div>

      {/* Engineering Branch Track Selector Bar */}
      <div className="rounded-2xl bg-white p-3 border border-slate-200/70 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2 pr-1 shrink-0 flex items-center gap-1">
            <Layers className="h-3.5 w-3.5 text-indigo-600" />
            Track:
          </span>
          {engineeringDepartments.map((dept) => {
            const isCurrent = user.department === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => changeDepartment(dept.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                }`}
              >
                {dept.shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Visual Roadmap on Left, Resource Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Roadmap (7 Cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              {activeDeptInfo.shortName} Learning Sequence
            </h2>
            <span className="text-xs font-semibold text-indigo-600">
              Flow: Foundations → Domain Capstone
            </span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-6 pt-2">
            {/* Vertical connector line */}
            <div className="absolute left-[1.35rem] sm:left-[1.85rem] top-4 bottom-4 w-0.5 bg-slate-200"></div>

            {pathNodes.map((node, index) => {
              const isSelected = selectedNode?.id === node.id;
              const isCompleted = node.status === 'completed';
              const isRecommended = node.status === 'recommended';
              const isLocked = node.status === 'locked';

              return (
                <div
                  key={node.id}
                  onClick={() => !isLocked && setSelectedNode(node)}
                  className={`relative flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                    isLocked
                      ? 'border-slate-100 bg-slate-50/60 opacity-60 cursor-not-allowed'
                      : isSelected
                      ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/20 shadow-md cursor-pointer'
                      : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 cursor-pointer'
                  }`}
                >
                  {/* Status Indicator Icon along vertical line */}
                  <div className="relative z-10 shrink-0 -ml-8 sm:-ml-10">
                    {isCompleted && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-200">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    )}
                    {isRecommended && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-300 ring-4 ring-indigo-100 animate-pulse">
                        <Sparkles className="h-4 w-4" />
                      </div>
                    )}
                    {isLocked && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                        <Lock className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  {/* Node details */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Milestone {node.id} • {node.subject}
                      </span>
                      {isCompleted && (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Mastered ({node.score}%)
                        </span>
                      )}
                      {isRecommended && (
                        <span className="text-[11px] font-extrabold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                          🔵 Recommended Focus
                        </span>
                      )}
                      {isLocked && (
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                          <Lock className="h-3 w-3" /> Locked
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      {node.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {node.summary}
                    </p>

                    {node.recommendedReason && (
                      <div className="mt-2.5 rounded-xl bg-amber-50 p-2.5 border border-amber-200 text-[11px] text-amber-900 font-medium">
                        {node.recommendedReason}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Milestone Details & Study Material (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {selectedNode ? (
            <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Topic Detail View
                </span>
                <span className="text-xs text-slate-400">Est. {selectedNode.duration}</span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {selectedNode.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {selectedNode.summary}
                </p>
              </div>

              {/* Concepts List */}
              {selectedNode.topics && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Concepts Covered
                  </h4>
                  <div className="grid grid-cols-1 gap-1.5">
                    {selectedNode.topics.map((t, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 text-xs font-semibold text-slate-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Study Materials */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Curated Engineering Resources
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-50 transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white">
                        <Play className="h-4 w-4 fill-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Mastery Video Lecture</p>
                        <p className="text-[10px] text-slate-500">Curated Concept Animation • 15 mins</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-indigo-600" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white">
                        <Code2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Practical Lab & Code Notebook</p>
                        <p className="text-[10px] text-slate-500">Interactive Simulation & Exercises</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-600 text-white">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Engineering Formula Cheat Sheet</p>
                        <p className="text-[10px] text-slate-500">PDF Summary Guide • 5 min read</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                {selectedNode.status === 'recommended' && (
                  <button
                    onClick={() => handleMarkComplete(selectedNode.id)}
                    className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-3 text-xs font-bold text-white shadow-md shadow-emerald-200 hover:from-emerald-700 hover:to-teal-700 transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Mark as Completed & Unlock Next</span>
                  </button>
                )}

                <button
                  onClick={() => setCurrentPage('ai-tutor')}
                  className="w-full rounded-xl bg-indigo-50 border border-indigo-200 p-3 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition flex items-center justify-center gap-2"
                >
                  <Bot className="h-4 w-4" />
                  <span>Ask AI Tutor Doubts on this Topic</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-8 border border-slate-200 text-center text-slate-400">
              Select a milestone to view learning resources
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
