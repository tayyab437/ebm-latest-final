import React, { useState, useEffect } from "react";
import {
  Sparkles,
  FileText,
  Target,
  Map,
  Send,
  Loader2,
  FileCheck,
  AlertTriangle,
  Check,
  Copy,
  Trash2,
  Eye,
  BookOpen,
  Search,
  Filter,
  Clock,
  Plus,
  ChevronRight,
  X,
  Share2,
} from "lucide-react";
import Markdown from "react-markdown";

interface SavedLibraryItem {
  id: string;
  type: string; // "Lesson Plan" | "Worksheet" | "Grading Rubric" | "Custom Query"
  prompt: string;
  content: string;
  savedAt: string;
}

export function AITeacherAssistant() {
  const [activeTab, setActiveTab] = useState<"generator" | "library">("generator");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Library state
  const [savedItems, setSavedItems] = useState<SavedLibraryItem[]>([]);
  const [librarySearch, setLibrarySearch] = useState("");
  const [libraryFilter, setLibraryFilter] = useState("All");
  const [selectedLibraryItem, setSelectedLibraryItem] = useState<SavedLibraryItem | null>(null);

  // Curriculum publishing state
  const [showPublishModal, setShowPublishModal] = useState<SavedLibraryItem | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSubject, setPublishSubject] = useState("MATH");
  const [publishGrade, setPublishGrade] = useState("Grade 2");
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Load saved items from localStorage
  useEffect(() => {
    const loadLibrary = () => {
      const saved = localStorage.getItem("ebm_teacher_ai_library");
      if (saved) {
        try {
          setSavedItems(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse saved library items:", e);
        }
      }
    };
    loadLibrary();
  }, []);

  const handleGenerate = async (type: string) => {
    // Determine the actual prompt to send
    const activePrompt = prompt.trim() || (
      type === "Lesson Plan" ? "Introduction to Ratios & Proportions for Grade 6" :
      type === "Worksheet" ? "Multiplication of Fractions with Scaffolded Word Problems" :
      type === "Grading Rubric" ? "Analytical Persuasive Essay on Environmental Protection" :
      "General educational guidance on active classroom management"
    );

    // If prompt state was empty, pre-fill it so the user sees what's being generated
    if (!prompt.trim()) {
      setPrompt(activePrompt);
    }

    setIsGenerating(true);
    setResult(null);
    setError(null);
    setSaved(false);
    setCopied(false);

    try {
      const response = await fetch("/api/ai/teacher-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, prompt: activePrompt }),
      });
      
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setResult({
          type,
          prompt: activePrompt,
          content: data.content,
        });
      } else {
        throw new Error(data.error || "Failed to generate material.");
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An unexpected error occurred while contacting the EBM AI Engine.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    
    // Check if already saved
    const exists = savedItems.some(
      (item) => item.prompt.toLowerCase() === result.prompt.toLowerCase() && item.type === result.type
    );

    if (exists) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      return;
    }

    const newItem: SavedLibraryItem = {
      id: "ai_" + Date.now(),
      type: result.type,
      prompt: result.prompt,
      content: result.content,
      savedAt: new Date().toISOString(),
    };

    const updated = [newItem, ...savedItems];
    setSavedItems(updated);
    localStorage.setItem("ebm_teacher_ai_library", JSON.stringify(updated));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDeleteItem = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm("Are you sure you want to delete this resource from your library?")) return;

    const updated = savedItems.filter((item) => item.id !== id);
    setSavedItems(updated);
    localStorage.setItem("ebm_teacher_ai_library", JSON.stringify(updated));
    
    if (selectedLibraryItem?.id === id) {
      setSelectedLibraryItem(null);
    }
  };

  const handlePublishToCurriculum = async () => {
    if (!showPublishModal) return;
    setIsPublishing(true);
    try {
      const payload = {
        title: `${showPublishModal.type}: ${showPublishModal.prompt}`,
        subject: publishSubject,
        gradeLevel: publishGrade,
        unitTitle: showPublishModal.type,
        skillFocus: `AI Generated ${showPublishModal.type} on ${showPublishModal.prompt}`,
        lifeConnection: "Connecting classroom learning to modern practical applications.",
        content: showPublishModal.content,
        duration: 20,
        type: showPublishModal.type === "Worksheet" ? "PRACTICE_QUESTION" : "COMPREHENSION",
        questions: [] 
      };

      const res = await fetch("/api/curriculum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save to curriculum database");
      }

      setPublishSuccess(true);
      setTimeout(() => {
        setPublishSuccess(false);
        setShowPublishModal(null);
        // Dispatch custom event to notify curriculum manager to refresh
        window.dispatchEvent(new CustomEvent("curriculum-updated"));
      }, 2000);
    } catch (e: any) {
      alert("Error publishing: " + e.message);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleRefine = () => {
    if (result) {
      setPrompt(`Refine the previous ${result.type} on "${result.prompt}" to make it: `);
    }
  };

  // Filtered saved library items
  const filteredItems = savedItems.filter((item) => {
    const matchesSearch =
      item.prompt.toLowerCase().includes(librarySearch.toLowerCase()) ||
      item.content.toLowerCase().includes(librarySearch.toLowerCase());
    const matchesFilter = libraryFilter === "All" || item.type === libraryFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <Sparkles className="h-6 w-6 text-amber-500 animate-pulse shrink-0" />
            AI Teaching Assistant
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Leverage Gemini AI to generate customized lesson plans, worksheets, and grading rubrics instantly.
          </p>
        </div>

        {/* Tab Switching */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setActiveTab("generator")}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "generator"
                ? "bg-white text-blue-700 shadow-xs"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Generator
          </button>
          <button
            onClick={() => setActiveTab("library")}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 relative ${
              activeTab === "library"
                ? "bg-white text-blue-700 shadow-xs"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            My Saved Library
            {savedItems.length > 0 && (
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {savedItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === "generator" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <button
              onClick={() => handleGenerate("Lesson Plan")}
              disabled={isGenerating}
              className="w-full bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md hover:scale-[1.01] transition-all text-left group disabled:opacity-70"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-3 group-hover:scale-110 transition-transform">
                <Map className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Generate Lesson Plan</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Create a comprehensive lesson plan aligned with EBM accelerated learning benchmarks.
              </p>
            </button>

            <button
              onClick={() => handleGenerate("Worksheet")}
              disabled={isGenerating}
              className="w-full bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md hover:scale-[1.01] transition-all text-left group disabled:opacity-70"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Create Worksheet</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Generate highly structured math or English worksheets with comprehensive answer keys.
              </p>
            </button>

            <button
              onClick={() => handleGenerate("Grading Rubric")}
              disabled={isGenerating}
              className="w-full bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-400 hover:shadow-md hover:scale-[1.01] transition-all text-left group disabled:opacity-70"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                <FileCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Design Grading Rubric</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Generate highly objective grid tables for evaluation of essays, labs, and projects.
              </p>
            </button>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[650px]">
            <div className="p-4 border-b border-slate-100 bg-slate-50 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Describe what you need help with... (e.g. 'Create a quiz on Newton's laws')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && prompt.trim() && !isGenerating) {
                      handleGenerate("Custom Query");
                    }
                  }}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                />
                <button
                  onClick={() => handleGenerate("Custom Query")}
                  disabled={!prompt.trim() || isGenerating}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-xl font-bold flex items-center gap-2 transition-colors"
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Send
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
              {!isGenerating && !result && !error && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <Sparkles className="h-12 w-12 mb-4 text-slate-300 animate-pulse" />
                  <p className="font-medium text-center max-w-md text-sm text-slate-500">
                    Select an action on the left or type a custom topic above, then press Send to generate instant educational materials.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-md">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full cursor-pointer hover:bg-amber-50 transition-colors" onClick={() => setPrompt("Quadratic formula worksheet for high school math")}>
                      "Quadratic formula worksheet..."
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full cursor-pointer hover:bg-amber-50 transition-colors" onClick={() => setPrompt("Lesson plan on photosynthesis with lab experiment")}>
                      "Photosynthesis lesson..."
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full cursor-pointer hover:bg-amber-50 transition-colors" onClick={() => setPrompt("Expository essay rubrics for middle school english")}>
                      "English essay rubrics..."
                    </span>
                  </div>
                </div>
              )}

              {isGenerating && (
                <div className="h-full flex flex-col items-center justify-center text-amber-600">
                  <Loader2 className="h-12 w-12 mb-4 animate-spin" />
                  <p className="font-bold animate-pulse text-sm">
                    Generating high-quality resources with EBM AI...
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    This can take up to 10 seconds.
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-800 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Failed to generate content</h4>
                    <p className="text-xs mt-1 text-red-700">{error}</p>
                    <button
                      onClick={() => handleGenerate(result?.type || "Custom Query")}
                      className="mt-3 px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Retry Generation
                    </button>
                  </div>
                </div>
              )}

              {result && !isGenerating && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-in fade-in duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-amber-100">
                      <Sparkles className="h-3 w-3" />
                      Generated {result.type}
                    </div>
                    <span className="text-xs text-slate-400 font-medium truncate max-w-[200px] md:max-w-xs">
                      Topic: "{result.prompt}"
                    </span>
                  </div>
                  
                  <div className="markdown-body select-text">
                    <Markdown>{result.content}</Markdown>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap gap-2 justify-between items-center">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleCopy(result.content)}
                        className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy Markdown</span>
                          </>
                        )}
                      </button>
                      <button 
                        onClick={handleRefine}
                        className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                      >
                        Refine
                      </button>
                    </div>
                    
                    <button 
                      onClick={handleSave}
                      disabled={saved}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      {saved ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Saved to Library!</span>
                        </>
                      ) : (
                        <span>Save to Library</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Saved Library Tab View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400">Search & Filters</h3>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search saved materials..."
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-500">Filter by Type</label>
                <div className="flex flex-col gap-1">
                  {["All", "Lesson Plan", "Worksheet", "Grading Rubric", "Custom Query"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setLibraryFilter(type)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        libraryFilter === type
                          ? "bg-blue-50 text-blue-700 font-bold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>{type}</span>
                      {libraryFilter === type && <Check className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {savedItems.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to clear your entire saved AI library? This cannot be undone.")) {
                        setSavedItems([]);
                        localStorage.removeItem("ebm_teacher_ai_library");
                        setSelectedLibraryItem(null);
                      }
                    }}
                    className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider rounded-lg transition-colors border border-red-100 text-center"
                  >
                    Clear All Saved Items
                  </button>
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 text-xs text-slate-500 leading-relaxed">
              <p className="font-bold text-slate-700 mb-1">📂 Persistent Archive</p>
              <p>
                All items saved here are stored in your secure browser cache. You can also publish worksheets or lesson plans directly to the **School Curriculum Database** so they can be assigned to students.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {selectedLibraryItem ? (
              /* Detail Viewer */
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-in fade-in duration-200 flex flex-col min-h-[500px]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
                  <button
                    onClick={() => setSelectedLibraryItem(null)}
                    className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-bold"
                  >
                    ← Back to List
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowPublishModal(selectedLibraryItem)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      Publish to Curriculum
                    </button>
                    <button
                      onClick={() => handleCopy(selectedLibraryItem.content)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={() => handleDeleteItem(selectedLibraryItem.id)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-lg transition-colors"
                      title="Delete from Library"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1 mb-5">
                  <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 inline-block">
                    {selectedLibraryItem.type}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                    Topic: {selectedLibraryItem.prompt}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                    <Clock className="h-3 w-3" />
                    <span>Saved on {new Date(selectedLibraryItem.savedAt).toLocaleDateString()} at {new Date(selectedLibraryItem.savedAt).toLocaleTimeString()}</span>
                  </div>
                </div>

                <div className="markdown-body select-text flex-1 overflow-y-auto max-h-[500px] border border-slate-100 rounded-xl p-4 bg-slate-50/20">
                  <Markdown>{selectedLibraryItem.content}</Markdown>
                </div>
              </div>
            ) : (
              /* Item Grid List */
              <div className="space-y-4">
                {filteredItems.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
                    <BookOpen className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                    <p className="font-bold text-slate-700 text-sm">No saved materials found</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      {librarySearch || libraryFilter !== "All"
                        ? "Try adjusting your search query or filters to find what you are looking for."
                        : "Generate lesson plans, worksheets, or rubrics inside the AI Generator and click 'Save to Library' to store them here."}
                    </p>
                    {!(librarySearch || libraryFilter !== "All") && (
                      <button
                        onClick={() => setActiveTab("generator")}
                        className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                      >
                        Go to Generator
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredItems.map((item) => {
                      const badgeColor =
                        item.type === "Lesson Plan" ? "bg-amber-50 text-amber-800 border-amber-100" :
                        item.type === "Worksheet" ? "bg-blue-50 text-blue-800 border-blue-100" :
                        item.type === "Grading Rubric" ? "bg-emerald-50 text-emerald-800 border-emerald-100" :
                        "bg-purple-50 text-purple-800 border-purple-100";

                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedLibraryItem(item)}
                          className="bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md rounded-2xl p-5 transition-all cursor-pointer flex flex-col justify-between group h-[200px]"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${badgeColor}`}>
                                {item.type}
                              </span>
                              <button
                                onClick={(e) => handleDeleteItem(item.id, e)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 hover:text-red-600 text-slate-400 rounded-lg"
                                title="Delete from Library"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <h4 className="font-extrabold text-slate-900 text-xs leading-snug line-clamp-2">
                              {item.prompt}
                            </h4>
                            <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-3">
                              {item.content.replace(/[#*`\-]/g, "")}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 font-medium">
                            <span>{new Date(item.savedAt).toLocaleDateString()}</span>
                            <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                              Open Material
                              <ChevronRight className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Publish to School Curriculum Database Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-600 animate-pulse" />
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-wide">Publish to School Syllabus</h3>
              </div>
              <button
                onClick={() => setShowPublishModal(null)}
                className="p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {publishSuccess ? (
                <div className="py-8 flex flex-col items-center text-center space-y-3">
                  <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-100 animate-bounce">
                    <Check className="h-6 w-6" />
                  </div>
                  <h4 className="font-black text-slate-900 text-sm">Successfully Published!</h4>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    This material has been added to the School Curriculum database and is now accessible via the main Curriculum Manager tab!
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Convert your AI-generated **{showPublishModal.type}** into an official, persistent curriculum entry so students can read, reference, and utilize it in their dashboard.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Subject Area</label>
                      <select
                        value={publishSubject}
                        onChange={(e) => setPublishSubject(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 font-semibold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="MATH">Mathematics</option>
                        <option value="ENGLISH">English Language / Lit</option>
                        <option value="SCIENCE">Science & Discovery</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Target Grade Level</label>
                      <select
                        value={publishGrade}
                        onChange={(e) => setPublishGrade(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-800 font-semibold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Grade 1">Grade 1 Accelerated</option>
                        <option value="Grade 2">Grade 2 Accelerated</option>
                        <option value="Grade 3">Grade 3 Accelerated</option>
                        <option value="Grade 4">Grade 4 Accelerated</option>
                        <option value="Grade 5">Grade 5 Accelerated</option>
                        <option value="Grade 6">Grade 6 Accelerated</option>
                        <option value="Grade 7">Grade 7 Accelerated</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => setShowPublishModal(null)}
                      className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl transition-colors border border-slate-200 text-center"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePublishToCurriculum}
                      disabled={isPublishing}
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors text-center flex items-center justify-center gap-1.5"
                    >
                      {isPublishing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Publishing...</span>
                        </>
                      ) : (
                        <span>Confirm Publish</span>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
