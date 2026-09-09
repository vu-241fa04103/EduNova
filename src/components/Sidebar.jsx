import React from 'react';
import { useLearning } from '../context/LearningContext';
import {
  LayoutDashboard,
  Bot,
  MapPin,
  HelpCircle,
  BarChart2,
  Compass,
  User,
  Flame,
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { currentPage, setCurrentPage, user } = useLearning();

  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'ai-tutor', name: 'AI Tutor', icon: Bot, badge: 'Smart AI', badgeColor: 'bg-indigo-100 text-indigo-700' },
    { id: 'learning-path', name: 'Learning Path', icon: MapPin, badge: 'Adaptive', badgeColor: 'bg-emerald-100 text-emerald-700' },
    { id: 'quiz', name: 'Smart Quiz', icon: HelpCircle, badge: null },
    { id: 'analytics', name: 'Analytics', icon: BarChart2, badge: 'Insights', badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'career', name: 'Career Guidance', icon: Compass, badge: null },
    { id: 'profile', name: 'My Profile', icon: User, badge: null },
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand in sidebar for mobile */}
        <div className="flex items-center justify-between border-b border-slate-100 p-4 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">
              EN
            </div>
            <span className="font-bold text-slate-800">EduNova</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            ✕
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Main Menu
          </div>
          <nav className="space-y-1.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-200'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Motivational Card / Study Streak */}
        <div className="p-4 border-t border-slate-100">
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-3.5 border border-amber-200/60 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
                Study Streak
              </span>
              <span className="text-xs font-extrabold text-orange-600">
                {user.streakDays} Days!
              </span>
            </div>
            <p className="text-[11px] text-amber-800 leading-snug">
              Keep it up! 3 lessons completed this week. You're on track for your ML goal.
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
            <span>EduNova v1.0</span>
            <span className="text-indigo-600 font-medium">SIH 2026</span>
          </div>
        </div>
      </aside>
    </>
  );
}
