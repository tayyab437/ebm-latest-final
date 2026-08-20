import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  RefreshCw, 
  Check, 
  X, 
  GraduationCap, 
  School, 
  Target, 
  AlertCircle, 
  Award, 
  BookOpen, 
  Heart, 
  User 
} from "lucide-react";

interface Journey {
  id: string;
  name: string;
  avatarUrl?: string;
  currentGrade: string;
  previousSchool: string;
  goals: string[] | string;
  challenges: string[] | string;
  journey: string;
  achievements: string[] | string;
  favouriteSubject: string;
  favouriteAITool: string;
  futureDream: string;
  parentComment: string;
  teacherComment: string;
}

export function FeaturedJourneysConfig() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingJourney, setEditingJourney] = useState<Partial<Journey> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form lists
  const [goalInput, setGoalInput] = useState("");
  const [challengeInput, setChallengeInput] = useState("");
  const [achievementInput, setAchievementInput] = useState("");

  const fetchJourneys = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/featured-journeys");
      const data = await res.json();
      if (data.success) {
        setJourneys(data.journeys || []);
      } else {
        setError(data.error || "Failed to load journeys");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJourneys();
  }, []);

  const handleEdit = (journey: Journey) => {
    const parsedGoals = typeof journey.goals === "string" ? JSON.parse(journey.goals) : journey.goals;
    const parsedChallenges = typeof journey.challenges === "string" ? JSON.parse(journey.challenges) : journey.challenges;
    const parsedAchievements = typeof journey.achievements === "string" ? JSON.parse(journey.achievements) : journey.achievements;

    setEditingJourney({
      ...journey,
      goals: parsedGoals,
      challenges: parsedChallenges,
      achievements: parsedAchievements
    });
    setIsNew(false);
  };

  const handleAddNew = () => {
    setEditingJourney({
      id: "",
      name: "",
      avatarUrl: "",
      currentGrade: "",
      previousSchool: "",
      goals: [],
      challenges: [],
      journey: "",
      achievements: [],
      favouriteSubject: "",
      favouriteAITool: "",
      futureDream: "",
      parentComment: "",
      teacherComment: ""
    });
    setIsNew(true);
  };

  const handleCancel = () => {
    setEditingJourney(null);
    setIsNew(false);
  };

  const handleSave = async () => {
    if (!editingJourney?.name || !editingJourney?.currentGrade || !editingJourney?.journey) {
      alert("Name, Grade, and Journey story are required!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/admin/featured-journeys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingJourney,
          goals: JSON.stringify(editingJourney.goals || []),
          challenges: JSON.stringify(editingJourney.challenges || []),
          achievements: JSON.stringify(editingJourney.achievements || [])
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(isNew ? "Created journey successfully!" : "Updated journey successfully!");
        setEditingJourney(null);
        setIsNew(false);
        fetchJourneys();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        alert(data.error || "Failed to save journey");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred while saving");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student journey?")) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/admin/featured-journeys/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Deleted journey successfully!");
        fetchJourneys();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        alert(data.error || "Failed to delete journey");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred while deleting");
    } finally {
      setLoading(false);
    }
  };

  const handleResetDefaults = async () => {
    if (!confirm("This will erase all custom journeys and sync/reset back to the 3 standard default student journeys. Continue?")) return;

    try {
      setLoading(true);
      const res = await fetch("/api/admin/featured-journeys/reset", {
        method: "POST"
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Synced and reset default journeys successfully!");
        fetchJourneys();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        alert(data.error || "Failed to reset journeys");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred while resetting");
    } finally {
      setLoading(false);
    }
  };

  // List helpers
  const addGoal = () => {
    if (!goalInput.trim()) return;
    const currentGoals = (editingJourney?.goals as string[]) || [];
    setEditingJourney({
      ...editingJourney,
      goals: [...currentGoals, goalInput.trim()]
    });
    setGoalInput("");
  };

  const removeGoal = (index: number) => {
    const currentGoals = (editingJourney?.goals as string[]) || [];
    setEditingJourney({
      ...editingJourney,
      goals: currentGoals.filter((_, i) => i !== index)
    });
  };

  const addChallenge = () => {
    if (!challengeInput.trim()) return;
    const currentChallenges = (editingJourney?.challenges as string[]) || [];
    setEditingJourney({
      ...editingJourney,
      challenges: [...currentChallenges, challengeInput.trim()]
    });
    setChallengeInput("");
  };

  const removeChallenge = (index: number) => {
    const currentChallenges = (editingJourney?.challenges as string[]) || [];
    setEditingJourney({
      ...editingJourney,
      challenges: currentChallenges.filter((_, i) => i !== index)
    });
  };

  const addAchievement = () => {
    if (!achievementInput.trim()) return;
    const currentAchievements = (editingJourney?.achievements as string[]) || [];
    setEditingJourney({
      ...editingJourney,
      achievements: [...currentAchievements, achievementInput.trim()]
    });
    setAchievementInput("");
  };

  const removeAchievement = (index: number) => {
    const currentAchievements = (editingJourney?.achievements as string[]) || [];
    setEditingJourney({
      ...editingJourney,
      achievements: currentAchievements.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            Featured Student Journeys (Home Page Sync)
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage the featured student stories displayed in the "Scholastic Spotlight" carousel on the home page.
          </p>
        </div>
        
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
            title="Reset/sync back to the default 3 student journeys in the database"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset Defaults
          </button>
          
          {!editingJourney && (
            <button
              onClick={handleAddNew}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-md shadow-blue-100"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Story
            </button>
          )}
        </div>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl flex items-center gap-2 text-xs font-bold animate-pulse">
          <Check className="h-4 w-4" />
          {successMessage}
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center gap-2 text-xs font-bold">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Editor Form */}
      {editingJourney ? (
        <div className="space-y-6 border border-slate-200 rounded-2xl p-6 bg-slate-50/50 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
              {isNew ? <Plus className="h-4 w-4 text-blue-500" /> : <Edit className="h-4 w-4 text-blue-500" />}
              {isNew ? "Create New Student Story" : `Edit Story: ${editingJourney.name}`}
            </h4>
            <button
              onClick={handleCancel}
              className="p-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Student Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={editingJourney.name || ""}
                  onChange={(e) => setEditingJourney({ ...editingJourney, name: e.target.value })}
                  placeholder="e.g. Aisha Al-Mansoor"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Grade / Current Stage</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={editingJourney.currentGrade || ""}
                  onChange={(e) => setEditingJourney({ ...editingJourney, currentGrade: e.target.value })}
                  placeholder="e.g. O Level / Grade 11"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Previous School</label>
              <div className="relative">
                <School className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={editingJourney.previousSchool || ""}
                  onChange={(e) => setEditingJourney({ ...editingJourney, previousSchool: e.target.value })}
                  placeholder="e.g. Beaconhouse International"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Avatar Image URL (Optional)</label>
              <input
                type="text"
                value={editingJourney.avatarUrl || ""}
                onChange={(e) => setEditingJourney({ ...editingJourney, avatarUrl: e.target.value })}
                placeholder="https://images.unsplash.com/... or blank for initial logo"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Favourite Subject</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={editingJourney.favouriteSubject || ""}
                  onChange={(e) => setEditingJourney({ ...editingJourney, favouriteSubject: e.target.value })}
                  placeholder="e.g. Additional Mathematics"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Favourite AI Tool</label>
              <div className="relative">
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={editingJourney.favouriteAITool || ""}
                  onChange={(e) => setEditingJourney({ ...editingJourney, favouriteAITool: e.target.value })}
                  placeholder="e.g. Socratic Equation Decomposer"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Future Academic/Career Dream</label>
              <div className="relative">
                <Target className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={editingJourney.futureDream || ""}
                  onChange={(e) => setEditingJourney({ ...editingJourney, futureDream: e.target.value })}
                  placeholder="e.g. Robotics and AI Researcher at NASA"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">The Student Journey Story</label>
              <textarea
                rows={4}
                value={editingJourney.journey || ""}
                onChange={(e) => setEditingJourney({ ...editingJourney, journey: e.target.value })}
                placeholder="Describe their transformation, how they used EBM Socratic methods, and their schedule..."
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
              />
            </div>

            {/* List configurations (Goals, Challenges, Achievements) */}
            <div className="space-y-3 p-4 bg-white border border-slate-200 rounded-2xl">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Student Goals</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  placeholder="Add goal..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGoal())}
                />
                <button
                  type="button"
                  onClick={addGoal}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1.5 pt-2">
                {((editingJourney.goals as string[]) || []).map((goal, idx) => (
                  <li key={idx} className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700">
                    <span>{goal}</span>
                    <button type="button" onClick={() => removeGoal(idx)} className="text-rose-500 hover:text-rose-600">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 p-4 bg-white border border-slate-200 rounded-2xl">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Original Challenges</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={challengeInput}
                  onChange={(e) => setChallengeInput(e.target.value)}
                  placeholder="Add challenge..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addChallenge())}
                />
                <button
                  type="button"
                  onClick={addChallenge}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1.5 pt-2">
                {((editingJourney.challenges as string[]) || []).map((challenge, idx) => (
                  <li key={idx} className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700">
                    <span>{challenge}</span>
                    <button type="button" onClick={() => removeChallenge(idx)} className="text-rose-500 hover:text-rose-600">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 p-4 bg-white border border-slate-200 rounded-2xl md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">EBM Milestones / Achievements</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={achievementInput}
                  onChange={(e) => setAchievementInput(e.target.value)}
                  placeholder="Add key milestone or achievement..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAchievement())}
                />
                <button
                  type="button"
                  onClick={addAchievement}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1.5 pt-2">
                {((editingJourney.achievements as string[]) || []).map((achievement, idx) => (
                  <li key={idx} className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-amber-500" />
                      <span>{achievement}</span>
                    </span>
                    <button type="button" onClick={() => removeAchievement(idx)} className="text-rose-500 hover:text-rose-600">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 md:col-span-2 p-4 bg-white border border-slate-200 rounded-2xl">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 text-rose-400" /> Parent Comment
              </label>
              <textarea
                rows={2}
                value={editingJourney.parentComment || ""}
                onChange={(e) => setEditingJourney({ ...editingJourney, parentComment: e.target.value })}
                placeholder="Parent feedback on student confidence and EBM progress..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2 p-4 bg-white border border-slate-200 rounded-2xl">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5 text-blue-400" /> Teacher Comment
              </label>
              <textarea
                rows={2}
                value={editingJourney.teacherComment || ""}
                onChange={(e) => setEditingJourney({ ...editingJourney, teacherComment: e.target.value })}
                placeholder="Teacher assessment of student's analytical skills and performance..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-md shadow-blue-100"
            >
              <Save className="h-4 w-4" />
              Save Story
            </button>
          </div>
        </div>
      ) : (
        /* Journeys List View */
        <div className="space-y-4">
          {loading && journeys.length === 0 ? (
            <div className="py-12 text-center text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
              Fetching student journeys...
            </div>
          ) : journeys.length === 0 ? (
            <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl p-8 bg-slate-50">
              <Sparkles className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest">No Student Stories Found</h4>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Create a custom student journey or sync with standard defaults to get started.
              </p>
              <button
                onClick={handleAddNew}
                className="mt-4 inline-flex items-center gap-1 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
              >
                <Plus className="h-4 w-4" /> Add Story
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {journeys.map((journey) => (
                <div
                  key={journey.id}
                  className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        {journey.avatarUrl ? (
                          <img
                            src={journey.avatarUrl}
                            alt={journey.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-sm">
                            {journey.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide leading-none">{journey.name}</h4>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
                            {journey.currentGrade}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity shrink-0">
                        <button
                          onClick={() => handleEdit(journey)}
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                          title="Edit student story"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(journey.id)}
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-rose-600 hover:bg-rose-50"
                          title="Delete student story"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-3">
                      {journey.journey}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[9px] font-bold text-slate-500">
                        🎯 {journey.favouriteSubject}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[9px] font-bold text-slate-500">
                        🤖 {journey.favouriteAITool}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/50 flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    <span>{journey.previousSchool || "Self-study"}</span>
                    <span className="text-emerald-500 font-extrabold flex items-center gap-0.5">
                      <Check className="h-3 w-3" /> EBM Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
