import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import {
  ShieldCheck,
  Users,
  BookOpen,
  HelpCircle,
  BarChart2,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Search,
  Layers,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Award,
  ClipboardList
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    user,
    students: studentsList,
    departments,
    quizzes,
    departmentTasks,
    addDepartmentTask,
    deleteDepartmentTask,
    deleteStudent,
    addQuizQuestion,
    deleteQuizQuestion,
    addDepartmentSubject
  } = useLearning();

  const [activeTab, setActiveTab] = useState('students'); // 'students' | 'tasks' | 'questions' | 'courses' | 'analytics'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');

  // Task Form State
  const [taskDept, setTaskDept] = useState('ai_ds');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSkillTag, setTaskSkillTag] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('3 days');
  const [taskPoints, setTaskPoints] = useState(50);
  const [taskDescription, setTaskDescription] = useState('');
  const [taskAddedSuccess, setTaskAddedSuccess] = useState(false);

  // Question Form State
  const [selectedQuestionDept, setSelectedQuestionDept] = useState('ai_ds');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [newCorrectAnswer, setNewCorrectAnswer] = useState(0);
  const [newTopic, setNewTopic] = useState('');
  const [newExplanation, setNewExplanation] = useState('');
  const [questionAddedSuccess, setQuestionAddedSuccess] = useState(false);

  // Subject Form State
  const [selectedSubjectDept, setSelectedSubjectDept] = useState('ai_ds');
  const [newSubjectName, setNewSubjectName] = useState('');
  const [subjectAddedSuccess, setSubjectAddedSuccess] = useState(false);

  // Students list
  const students = (studentsList || []).filter(u => u.role === 'student');

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDeptFilter === 'all' || student.department === selectedDeptFilter;
    return matchesSearch && matchesDept;
  });

  // Global calculations across all students
  const totalStudents = students.length;
  const totalQuizzesTaken = students.reduce((sum, s) => sum + (s.quizHistory?.length || 0), 0);
  const globalAvgProgress = totalStudents > 0
    ? Math.round(students.reduce((sum, s) => sum + (s.overallProgress || 0), 0) / totalStudents)
    : 0;
  const globalAvgScore = totalStudents > 0
    ? Math.round(students.reduce((sum, s) => sum + (s.averageQuizScore || 0), 0) / totalStudents)
    : 0;

  // Handle Add Question
  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim() || newOptions.some(opt => !opt.trim()) || !newTopic.trim()) {
      alert("Please fill in all question fields and options.");
      return;
    }

    const questionObj = {
      id: Date.now(),
      topic: newTopic.trim(),
      question: newQuestionText.trim(),
      options: newOptions.map(o => o.trim()),
      correctAnswer: parseInt(newCorrectAnswer, 10),
      explanation: newExplanation.trim() || "Standard engineering formulation principles apply."
    };

    addQuizQuestion(selectedQuestionDept, questionObj);
    setNewQuestionText('');
    setNewOptions(['', '', '', '']);
    setNewTopic('');
    setNewExplanation('');
    setQuestionAddedSuccess(true);
    setTimeout(() => setQuestionAddedSuccess(false), 3000);
  };

  // Handle Add Subject
  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    addDepartmentSubject(selectedSubjectDept, newSubjectName.trim());
    setNewSubjectName('');
    setSubjectAddedSuccess(true);
    setTimeout(() => setSubjectAddedSuccess(false), 3000);
  };

  // Handle Add Domain Task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim() || !taskDescription.trim()) {
      alert("Please provide a task title and description.");
      return;
    }
    const newTask = {
      department: taskDept,
      title: taskTitle.trim(),
      skillTag: taskSkillTag.trim() || 'Core Engineering',
      deadline: taskDeadline.trim() || '3 days',
      points: Number(taskPoints) || 50,
      description: taskDescription.trim(),
      assignedBy: user.name || 'Faculty Mentor'
    };
    addDepartmentTask(newTask);
    setTaskTitle('');
    setTaskSkillTag('');
    setTaskDescription('');
    setTaskAddedSuccess(true);
    setTimeout(() => setTaskAddedSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Admin Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-400/30">
                <ShieldCheck className="h-4 w-4" />
                <span>Admin & Faculty Portal</span>
              </span>
              <span className="text-xs text-slate-400">SIH 2026 Live Controller</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {user.name || "Academic Dean / Administrator"}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
              Real-time monitoring of student cohorts, adaptive diagnostic questions, and department curriculum management.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-xl bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-2 text-xs font-bold text-emerald-300 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Sync Active
            </span>
          </div>
        </div>
      </div>

      {/* Admin Global KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Total Students</span>
            <Users className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{totalStudents}</p>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 block">Active across all branches</span>
        </div>

        <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Quizzes Completed</span>
            <HelpCircle className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{totalQuizzesTaken}</p>
          <span className="text-[11px] font-bold text-indigo-600 mt-1 block">Adaptive evaluations</span>
        </div>

        <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Avg Cohort Progress</span>
            <TrendingUp className="h-5 w-5 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{globalAvgProgress}%</p>
          <span className="text-[11px] font-bold text-slate-500 mt-1 block">Milestones completed</span>
        </div>

        <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Avg Assessment Accuracy</span>
            <Award className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{globalAvgScore}%</p>
          <span className="text-[11px] font-bold text-purple-600 mt-1 block">Cohort proficiency</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex rounded-2xl bg-white p-2 border border-slate-200/80 shadow-sm overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeTab === 'students'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Student Directory & Live Roster ({students.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeTab === 'tasks'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ClipboardList className="h-4 w-4" />
          <span>Faculty Domain Tasks ({(departmentTasks || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('questions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeTab === 'questions'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          <span>Question Bank Manager</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeTab === 'courses'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Department Curriculum & Courses</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeTab === 'analytics'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart2 className="h-4 w-4" />
          <span>Platform Health & Diagnostics</span>
        </button>
      </div>

      {/* TAB 1: Student Directory & Live Roster */}
      {activeTab === 'students' && (
        <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Registered Students Live Performance
              </h2>
              <p className="text-xs text-slate-500">
                Shows each student's isolated course progress, quiz diagnostic accuracy, and AI gap alerts.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-xl border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.shortName}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                  <th className="py-3 px-4 rounded-l-xl">Student Details</th>
                  <th className="py-3 px-4">Branch & Enrolled Courses</th>
                  <th className="py-3 px-4">Overall Progress</th>
                  <th className="py-3 px-4">Avg Quiz Score</th>
                  <th className="py-3 px-4">Streak</th>
                  <th className="py-3 px-4">AI Diagnosed Gaps</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => {
                    const latestGap = student.quizHistory?.[0]?.weakAreas?.[0];
                    return (
                      <tr key={student.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                            />
                            <div>
                              <p className="font-bold text-slate-900">{student.name}</p>
                              <p className="text-[11px] text-slate-400">{student.email}</p>
                              <p className="text-[10px] text-indigo-600 font-medium">{student.college}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <span className="inline-block rounded-lg bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 text-[10px] mb-1.5">
                            {student.course}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {student.selectedInterests?.map((subj, idx) => (
                              <span key={idx} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px]">
                                {subj}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-indigo-600 h-full rounded-full"
                                style={{ width: `${student.overallProgress || 0}%` }}
                              />
                            </div>
                            <span className="font-bold text-slate-800">{student.overallProgress || 0}%</span>
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {student.completedLessons || 0} / {student.totalLessons || 6} lessons
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900">{student.averageQuizScore || 0}%</span>
                          <p className="text-[10px] text-slate-400">{student.quizHistory?.length || 0} tests taken</p>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                            <Flame className="h-3 w-3 fill-orange-500" />
                            {student.streakDays || 1}d
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          {latestGap ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded-lg border border-rose-200">
                              <AlertTriangle className="h-3 w-3 text-rose-600 shrink-0" />
                              <span className="truncate max-w-[130px]">{latestGap}</span>
                            </span>
                          ) : (
                            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                              ✓ On Track
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete student "${student.name}"?`)) {
                                deleteStudent(student.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Delete Student"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-400">
                      No students found matching your filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: Faculty Domain Tasks Manager */}
      {activeTab === 'tasks' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: Assign Domain Task (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500"></span>
              <h3 className="font-bold text-slate-900">Assign New Department Task</h3>
            </div>
            <p className="text-xs text-slate-500">
              Create skill-building tasks for specific branch students (AI/DS, CSE, ECE, Mech, Civil, EEE) or all departments.
            </p>

            {taskAddedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Domain task successfully assigned to cohort!</span>
              </div>
            )}

            <form onSubmit={handleAddTask} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Department / Cohort
                </label>
                <select
                  value={taskDept}
                  onChange={(e) => setTaskDept(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none"
                >
                  <option value="all">All Engineering Departments (General)</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.name} ({dept.shortName})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement Linear Regression from scratch..."
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Skill Tag / Domain
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Machine Learning"
                    value={taskSkillTag}
                    onChange={(e) => setTaskSkillTag(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Deadline Window
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3 days"
                    value={taskDeadline}
                    onChange={(e) => setTaskDeadline(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Task Points (XP)
                </label>
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={taskPoints}
                  onChange={(e) => setTaskPoints(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Task Detailed Instructions & Deliverables
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the problem, input specifications, datasets to use, and expected code output..."
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                <span>Publish Domain Task to Students</span>
              </button>
            </form>
          </div>

          {/* Right: Active Assigned Tasks List (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Active Department Domain Tasks</h3>
                <p className="text-xs text-slate-500">Live task bank assigned to student cohorts</p>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                {(departmentTasks || []).length} Assigned Tasks
              </span>
            </div>

            <div className="space-y-3.5 max-h-[560px] overflow-y-auto pr-1">
              {(departmentTasks || []).map((task) => {
                const targetDeptName = task.department === 'all' 
                  ? 'All Engineering Branches' 
                  : (departments.find(d => d.id === task.department)?.name || task.department);
                const studentsInDept = students.filter(s => task.department === 'all' || s.department === task.department);
                const completedCount = studentsInDept.filter(s => s.completedTaskIds?.includes(task.id)).length;

                return (
                  <div key={task.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-all space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {targetDeptName}
                          </span>
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {task.skillTag}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500">
                            ⏱ {task.deadline}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            +{task.points || 50} XP
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">{task.title}</h4>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Delete task "${task.title}"?`)) {
                            deleteDepartmentTask(task.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Delete Task"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100">
                      {task.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>Assigned by: <strong>{task.assignedBy || 'Faculty Mentor'}</strong></span>
                      <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {completedCount} / {studentsInDept.length} Students Completed
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Question Bank Manager */}
      {activeTab === 'questions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: Add Question (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500"></span>
              <h3 className="font-bold text-slate-900">Add New Diagnostic Question</h3>
            </div>
            <p className="text-xs text-slate-500">
              New questions immediately appear in the student's adaptive assessment module.
            </p>

            {questionAddedSuccess && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Question successfully added to question bank!</span>
              </div>
            )}

            <form onSubmit={handleAddQuestion} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Department</label>
                <select
                  value={selectedQuestionDept}
                  onChange={(e) => setSelectedQuestionDept(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 font-medium focus:outline-none focus:border-indigo-600"
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.name} ({dept.shortName})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Topic / Concept Tag</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eigenvalues & PCA or Verilog Timing"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Question Text</label>
                <textarea
                  required
                  rows="3"
                  placeholder="What is the primary role of covariance matrix in PCA?"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-slate-700">4 Multiple Choice Options</label>
                {newOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-5 text-center font-bold text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                    <input
                      type="text"
                      required
                      placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                      value={opt}
                      onChange={(e) => {
                        const updated = [...newOptions];
                        updated[idx] = e.target.value;
                        setNewOptions(updated);
                      }}
                      className="flex-1 rounded-xl border border-slate-200 p-2 text-slate-800 focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Correct Answer</label>
                <select
                  value={newCorrectAnswer}
                  onChange={(e) => setNewCorrectAnswer(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-indigo-600"
                >
                  <option value={0}>Option A</option>
                  <option value={1}>Option B</option>
                  <option value={2}>Option C</option>
                  <option value={3}>Option D</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Diagnostic Explanation / Reason</label>
                <input
                  type="text"
                  placeholder="Explains why this answer is correct for the learning loop"
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow"
              >
                <Plus className="h-4 w-4" />
                <span>Save Question to Bank</span>
              </button>
            </form>
          </div>

          {/* Right Column: Existing Questions for Selected Department (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900">
                  Questions for: {(departments.find(d => d.id === selectedQuestionDept)?.name) || 'AI & Data Science'}
                </h3>
                <p className="text-xs text-slate-500">
                  {(quizzes[selectedQuestionDept] || []).length} active diagnostic questions
                </p>
              </div>

              <select
                value={selectedQuestionDept}
                onChange={(e) => setSelectedQuestionDept(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.shortName}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {(quizzes[selectedQuestionDept] || []).map((q, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      Q{idx + 1} • {q.topic}
                    </span>
                    <button
                      onClick={() => deleteQuizQuestion(selectedQuestionDept, idx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Delete Question"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">{q.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {q.options?.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-2 rounded-lg border ${
                          optIdx === q.correctAnswer
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}. {opt} {optIdx === q.correctAnswer && "✓"}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Department Curriculum & Courses */}
      {activeTab === 'courses' && (
        <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Department Curriculum & Subject Offerings
              </h2>
              <p className="text-xs text-slate-500">
                Manage all academic branches and add subjects that students can enroll in.
              </p>
            </div>

            {/* Quick Add Subject inline */}
            <form onSubmit={handleAddSubject} className="flex items-center gap-2">
              <select
                value={selectedSubjectDept}
                onChange={(e) => setSelectedSubjectDept(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.shortName}</option>
                ))}
              </select>
              <input
                type="text"
                required
                placeholder="New Subject Name..."
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow hover:bg-indigo-700 transition flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {subjectAddedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Subject successfully added to curriculum!</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((dept) => (
              <div key={dept.id} className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{dept.name}</span>
                  <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {dept.shortName}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Curriculum Subjects ({dept.subjects.length}):
                  </span>
                  {dept.subjects.map((subj, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs bg-white p-2 rounded-lg border border-slate-200 text-slate-700 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                      <span>{subj}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Platform Diagnostics & Health */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              Top Student Learning Gaps Across Institution
            </h3>
            <p className="text-xs text-slate-500">
              Aggregated from real-time student quiz diagnostic failures.
            </p>

            <div className="space-y-3">
              {[
                { topic: "Principal Component Analysis (PCA)", branch: "AI & Data Science", count: 4, severity: "High" },
                { topic: "Verilog Setup & Hold Time Violations", branch: "ECE", count: 3, severity: "Medium" },
                { topic: "Database Normalization & BCNF", branch: "CSE", count: 2, severity: "Medium" },
                { topic: "Bernoulli Equation Applications", branch: "Mechanical", count: 1, severity: "Low" }
              ].map((gap, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">{gap.topic}</span>
                    <span className="text-[11px] text-slate-500">{gap.branch}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-rose-600 text-xs block">{gap.count} students struggling</span>
                    <span className="text-[10px] text-slate-400">Severity: {gap.severity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              Branch Enrollment Distribution
            </h3>
            <p className="text-xs text-slate-500">
              Active engineering cohorts registered on EduNova.
            </p>

            <div className="space-y-3">
              {departments.slice(0, 5).map((dept, idx) => {
                const count = students.filter(s => s.department === dept.id).length;
                const pct = students.length > 0 ? Math.round((count / students.length) * 100) : 0;
                return (
                  <div key={dept.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>{dept.name}</span>
                      <span>{count} students ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}