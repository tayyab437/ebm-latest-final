import React, { useState } from "react";
import { useStudentSuccessStore } from "./student-success.store";
import { 
  Target, CheckSquare, Square, Plus, Trash2, Calendar, 
  Sparkles, CheckCircle2, AlertTriangle, FileText, ChevronRight
} from "lucide-react";

export function ActionPlansView() {
  const { actionPlans, riskProfiles, createActionPlan, toggleTask, activeStudentId } = useStudentSuccessStore();
  const [showForm, setShowForm] = useState(false);

  const [studentId, setStudentId] = useState(activeStudentId || "s1");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [targetDate, setTargetDate] = useState("2026-08-15");

  const [taskTitle, setTaskTitle] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("Alex Mercer");
  const [taskDueDate, setTaskDueDate] = useState("2026-07-25");
  const [tasks, setTasks] = useState<any[]>([]);

  const handleAddGoal = () => {
    if (!goalInput.trim()) return;
    setGoals([...goals, goalInput.trim()]);
    setGoalInput("");
  };

  const handleRemoveGoal = (idx: number) => {
    setGoals(goals.filter((_, i) => i !== idx));
  };

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;
    setTasks([...tasks, {
      id: "t_" + Date.now(),
      title: taskTitle.trim(),
      assignee: { id: "user_1", name: taskAssignee, role: "STUDENT" },
      dueDate: taskDueDate,
      isCompleted: false
    }]);
    setTaskTitle("");
  };

  const handleRemoveTask = (idx: number) => {
    setTasks(tasks.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    createActionPlan({
      caseId: "c1",
      title,
      description,
      goals: goals.length > 0 ? goals : ["Improve academic standing"],
      tasks: tasks.length > 0 ? tasks : [
        {
          id: "task_d_" + Date.now(),
          title: "Initial consultation with mentor",
          assignee: { id: "t1", name: "Dr. Sarah Jenkins", role: "TEACHER" },
          dueDate: targetDate,
          isCompleted: false
        }
      ],
      targetDate
    });

    // Reset Form
    setTitle("");
    setDescription("");
    setGoals([]);
    setTasks([]);
    setShowForm(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <Target className="h-6 w-6 text-rose-500" /> Action Planner
          </h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
            Student-Centric Milestones, Action Goals & Accountability
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" /> {showForm ? "Close Planner" : "Formulate Action Plan"}
        </button>
      </div>

      {/* Plan formulation form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0A1120] border border-white/5 rounded-[2rem] p-8 space-y-6 animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/5 pb-4">
            New Strategic Action Plan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Student Focus</label>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
              >
                {riskProfiles.map(p => (
                  <option key={p.studentId} value={p.studentId}>
                    {p.studentName} ({p.grade})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Target Completion Date</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500/50 font-bold uppercase tracking-wider"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Plan Title</label>
              <input
                type="text"
                required
                placeholder="e.g., Extended English Critical Analysis Study Track"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Plan Overview / Description</label>
              <textarea
                rows={2}
                placeholder="What is the overall thesis/scope of this progress plan?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-xl p-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold resize-none"
              />
            </div>

            {/* Goals list config */}
            <div className="space-y-4 bg-black/10 border border-white/5 rounded-2xl p-5">
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Configure Objectives / Goals</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a target goal..."
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  className="flex-1 bg-black/30 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none placeholder-slate-600"
                />
                <button
                  type="button"
                  onClick={handleAddGoal}
                  className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-2">
                {goals.map((g, idx) => (
                  <li key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" /> {g}
                    </span>
                    <button type="button" onClick={() => handleRemoveGoal(idx)} className="text-slate-500 hover:text-rose-500">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Tasks list config */}
            <div className="space-y-4 bg-black/10 border border-white/5 rounded-2xl p-5">
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Assign Concrete Tasks</h4>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Task title..."
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full bg-black/30 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none placeholder-slate-600"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Assignee name..."
                    value={taskAssignee}
                    onChange={(e) => setTaskAssignee(e.target.value)}
                    className="bg-black/30 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none placeholder-slate-600"
                  />
                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="bg-black/30 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddTask}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer border border-white/5"
                >
                  Append Task &rarr;
                </button>
              </div>
              <ul className="space-y-2">
                {tasks.map((t, idx) => (
                  <li key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-slate-300">
                    <div>
                      <p className="font-semibold">{t.title}</p>
                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">By: {t.assignee.name} | Due: {t.dueDate}</p>
                    </div>
                    <button type="button" onClick={() => handleRemoveTask(idx)} className="text-slate-500 hover:text-rose-500 shrink-0 ml-2">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition cursor-pointer"
            >
              Commit Action Plan
            </button>
          </div>
        </form>
      )}

      {/* Action Plans Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {actionPlans.map(plan => {
          const totalTasks = plan.tasks.length;
          const completedTasks = plan.tasks.filter(t => t.isCompleted).length;
          const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

          return (
            <div key={plan.id} className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8 space-y-6 hover:border-white/10 transition-colors">
              <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">{plan.title}</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Status: {plan.status}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 justify-end">
                    <Calendar className="h-3.5 w-3.5 text-slate-600" /> Target: {plan.targetDate}
                  </span>
                </div>
              </div>

              {plan.description && (
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{plan.description}</p>
              )}

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500">Execution Progress</span>
                  <span className="text-emerald-400">{progressPercent}% ({completedTasks}/{totalTasks} Tasks)</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              {/* Objectives / Goals */}
              <div className="space-y-3 bg-black/20 rounded-2xl p-5 border border-white/5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Target className="h-4 w-4 text-rose-500" /> Plan Goals
                </h4>
                <ul className="space-y-2">
                  {plan.goals.map((g, index) => (
                    <li key={index} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Concrete Tasks checklist */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accountability Checklist</h4>
                <div className="space-y-2.5">
                  {plan.tasks.map(task => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(plan.id, task.id)}
                      className="p-3.5 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 flex items-center justify-between gap-4 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <button className="text-slate-400 hover:text-emerald-400 transition-colors">
                          {task.isCompleted ? (
                            <CheckSquare className="h-5 w-5 text-emerald-500" />
                          ) : (
                            <Square className="h-5 w-5" />
                          )}
                        </button>
                        <div>
                          <p className={`text-xs font-semibold ${task.isCompleted ? "line-through text-slate-500" : "text-white"}`}>
                            {task.title}
                          </p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                            Assigned to: {task.assignee.name} • Due: {task.dueDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {actionPlans.length === 0 && (
          <div className="col-span-2 text-center py-20 bg-[#0A1120] rounded-[2rem] border border-white/5">
            <Target className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">No action plans formulated yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
