import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading2,
  Heading3,
  Heading4,
  Pilcrow,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  Table as TableIcon,
  Eye,
  Code2,
  Undo,
  Redo,
  Sparkles,
  ExternalLink,
  Search,
  X,
  Check
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const STATIC_INTERNAL_LINKS = [
  { title: "Diagnostic Assessment Arena", path: "/assessment", desc: "Adaptive learning baseline evaluation" },
  { title: "Learning Analytics Dashboard", path: "/analytics", desc: "Student mastery and cognitive tracking" },
  { title: "Academic Programs (Grade 1 - O/A Level)", path: "/programs", desc: "Complete syllabus progression maps" },
  { title: "Learning Portal & Courses", path: "/learning", desc: "Interactive modules & syllabus plans" },
  { title: "Inspiration & Toolkits", path: "/inspiration", desc: "Educator & parent resources" },
  { title: "School Case Studies & Stories", path: "/case-studies", desc: "Measured student academic growth" },
  { title: "Pricing & Memberships", path: "/pricing", desc: "Transparent membership options" },
  { title: "About EBM Pedagogy", path: "/about", desc: "Our cognitive acceleration mission" },
  { title: "Contact Us & Consultations", path: "/contact", desc: "Academic consultations & support" }
];

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"visual" | "html" | "preview">("visual");
  const [rawHtml, setRawHtml] = useState(value);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(1);

  // Modals state
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [linkRel, setLinkRel] = useState("");
  const [linkSearchQuery, setLinkSearchQuery] = useState("");

  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageCaption, setImageCaption] = useState("");

  // Sync state with incoming value
  useEffect(() => {
    setRawHtml(value);
    calculateStats(value);
    if (editorRef.current && viewMode === "visual" && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const calculateStats = (html: string) => {
    const text = html.replace(/<[^>]*>/g, " ").trim();
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    setWordCount(words);
    setReadingTime(Math.max(1, Math.ceil(words / 200)));
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setRawHtml(html);
      calculateStats(html);
      onChange(html);
    }
  };

  const handleRawHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const html = e.target.value;
    setRawHtml(html);
    calculateStats(html);
    onChange(html);
  };

  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    if (viewMode !== "visual") return;
    document.execCommand(command, false, arg);
    handleEditorInput();
  };

  const insertHeading = (tag: "h2" | "h3" | "h4" | "p") => {
    if (viewMode !== "visual") return;
    document.execCommand("formatBlock", false, `<${tag}>`);
    handleEditorInput();
  };

  const insertBlockquote = () => {
    if (viewMode !== "visual") return;
    document.execCommand("formatBlock", false, "<blockquote>");
    handleEditorInput();
  };

  const insertCodeBlock = () => {
    if (viewMode !== "visual") return;
    const selectedText = window.getSelection()?.toString() || "code snippet here";
    const codeHtml = `<pre class="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm overflow-x-auto my-4"><code>${selectedText}</code></pre><p></p>`;
    document.execCommand("insertHTML", false, codeHtml);
    handleEditorInput();
  };

  const insertTable = () => {
    if (viewMode !== "visual") return;
    const tableHtml = `
      <div class="overflow-x-auto my-6">
        <table class="min-w-full border-collapse border border-slate-300 dark:border-slate-700 text-sm">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800">
              <th class="border border-slate-300 dark:border-slate-700 px-4 py-2 font-bold text-left">Header 1</th>
              <th class="border border-slate-300 dark:border-slate-700 px-4 py-2 font-bold text-left">Header 2</th>
              <th class="border border-slate-300 dark:border-slate-700 px-4 py-2 font-bold text-left">Header 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-300 dark:border-slate-700 px-4 py-2">Data Cell 1</td>
              <td class="border border-slate-300 dark:border-slate-700 px-4 py-2">Data Cell 2</td>
              <td class="border border-slate-300 dark:border-slate-700 px-4 py-2">Data Cell 3</td>
            </tr>
            <tr>
              <td class="border border-slate-300 dark:border-slate-700 px-4 py-2">Data Cell 4</td>
              <td class="border border-slate-300 dark:border-slate-700 px-4 py-2">Data Cell 5</td>
              <td class="border border-slate-300 dark:border-slate-700 px-4 py-2">Data Cell 6</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p></p>
    `;
    document.execCommand("insertHTML", false, tableHtml);
    handleEditorInput();
  };

  const openLinkModal = () => {
    const sel = window.getSelection();
    setLinkText(sel?.toString() || "");
    setLinkUrl("");
    setLinkRel("");
    setLinkSearchQuery("");
    setShowLinkModal(true);
  };

  const applyLink = () => {
    if (!linkUrl) return;
    const cleanUrl = linkUrl.trim();
    const text = linkText.trim() || cleanUrl;
    const relAttr = linkRel ? ` rel="${linkRel}"` : "";
    const isExternal = cleanUrl.startsWith("http");
    const targetAttr = isExternal ? ' target="_blank"' : "";

    const linkHtml = `<a href="${cleanUrl}"${relAttr}${targetAttr} class="text-blue-600 dark:text-blue-400 font-semibold hover:underline">${text}</a>`;
    
    if (viewMode === "visual") {
      document.execCommand("insertHTML", false, linkHtml);
      handleEditorInput();
    } else {
      setRawHtml(prev => prev + linkHtml);
      onChange(rawHtml + linkHtml);
    }
    setShowLinkModal(false);
  };

  const applyImage = () => {
    if (!imageUrl) return;
    const cleanUrl = imageUrl.trim();
    const alt = imageAlt.trim() || "EBM article educational illustration";
    const caption = imageCaption.trim();

    let imageHtml = "";
    if (caption) {
      imageHtml = `
        <figure class="my-8">
          <img src="${cleanUrl}" alt="${alt}" class="w-full h-auto rounded-2xl shadow-md object-cover max-h-[500px]" loading="lazy" referrerPolicy="no-referrer" />
          <figcaption class="mt-2 text-center text-xs text-slate-500 dark:text-slate-400 italic">${caption}</figcaption>
        </figure>
        <p></p>
      `;
    } else {
      imageHtml = `
        <figure class="my-8">
          <img src="${cleanUrl}" alt="${alt}" class="w-full h-auto rounded-2xl shadow-md object-cover max-h-[500px]" loading="lazy" referrerPolicy="no-referrer" />
        </figure>
        <p></p>
      `;
    }

    if (viewMode === "visual") {
      document.execCommand("insertHTML", false, imageHtml);
      handleEditorInput();
    } else {
      setRawHtml(prev => prev + imageHtml);
      onChange(rawHtml + imageHtml);
    }

    setImageUrl("");
    setImageAlt("");
    setImageCaption("");
    setShowImageModal(false);
  };

  const filteredInternalLinks = STATIC_INTERNAL_LINKS.filter(
    l => l.title.toLowerCase().includes(linkSearchQuery.toLowerCase()) || l.path.toLowerCase().includes(linkSearchQuery.toLowerCase())
  );

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
      
      {/* Editor Toolbar Header */}
      <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-slate-700 dark:text-slate-200">
        
        {/* Formatting Actions */}
        <div className="flex flex-wrap items-center gap-1">
          {/* Headings */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 shadow-xs">
            <button
              type="button"
              title="Paragraph text"
              onClick={() => insertHeading("p")}
              className="px-2 py-1 text-xs font-semibold rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Pilcrow className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Heading 2 (Main section - H1 is reserved for Title)"
              onClick={() => insertHeading("h2")}
              className="px-2 py-1 text-xs font-bold rounded hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 transition flex items-center gap-0.5"
            >
              <Heading2 className="w-3.5 h-3.5 text-blue-600" />
            </button>
            <button
              type="button"
              title="Heading 3 (Sub-section)"
              onClick={() => insertHeading("h3")}
              className="px-2 py-1 text-xs font-bold rounded hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 transition flex items-center gap-0.5"
            >
              <Heading3 className="w-3.5 h-3.5 text-blue-600" />
            </button>
            <button
              type="button"
              title="Heading 4 (Minor section)"
              onClick={() => insertHeading("h4")}
              className="px-2 py-1 text-xs font-bold rounded hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 transition flex items-center gap-0.5"
            >
              <Heading4 className="w-3.5 h-3.5 text-blue-600" />
            </button>
          </div>

          <div className="h-5 w-[1px] bg-slate-300 dark:bg-slate-700 mx-1" />

          {/* Basic Text Formatting */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 shadow-xs">
            <button
              type="button"
              title="Bold (Ctrl+B)"
              onClick={() => executeCommand("bold")}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Italic (Ctrl+I)"
              onClick={() => executeCommand("italic")}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Underline (Ctrl+U)"
              onClick={() => executeCommand("underline")}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Strikethrough"
              onClick={() => executeCommand("strikeThrough")}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Strikethrough className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-5 w-[1px] bg-slate-300 dark:bg-slate-700 mx-1" />

          {/* Lists & Quotes */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 shadow-xs">
            <button
              type="button"
              title="Bullet List"
              onClick={() => executeCommand("insertUnorderedList")}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Numbered List"
              onClick={() => executeCommand("insertOrderedList")}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Blockquote"
              onClick={insertBlockquote}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Code Block"
              onClick={insertCodeBlock}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Horizontal Divider"
              onClick={() => executeCommand("insertHorizontalRule")}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Insert Table"
              onClick={insertTable}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-5 w-[1px] bg-slate-300 dark:bg-slate-700 mx-1" />

          {/* Links & Images */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 shadow-xs">
            <button
              type="button"
              title="Insert Internal / External Link"
              onClick={openLinkModal}
              className="px-2 py-1.5 rounded text-xs font-semibold hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 transition flex items-center gap-1"
            >
              <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>Link</span>
            </button>
            <button
              type="button"
              title="Insert Image (with Alt Text)"
              onClick={() => setShowImageModal(true)}
              className="px-2 py-1.5 rounded text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/30 transition flex items-center gap-1"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Image</span>
            </button>
          </div>
        </div>

        {/* View Mode & Metrics */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500 font-mono hidden sm:flex items-center gap-2">
            <span>{wordCount} words</span>
            <span>•</span>
            <span>~{readingTime} min read</span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-200/80 dark:bg-slate-700 p-0.5 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode("visual")}
              className={`px-2.5 py-1 rounded-md transition ${viewMode === "visual" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600 dark:text-slate-300 hover:text-slate-900"}`}
            >
              Visual
            </button>
            <button
              type="button"
              onClick={() => setViewMode("html")}
              className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 ${viewMode === "html" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600 dark:text-slate-300 hover:text-slate-900"}`}
            >
              <Code2 className="w-3 h-3" />
              HTML
            </button>
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 ${viewMode === "preview" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600 dark:text-slate-300 hover:text-slate-900"}`}
            >
              <Eye className="w-3 h-3" />
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Editor Body */}
      <div className="min-h-[380px] p-6 text-slate-900 dark:text-slate-100 font-sans">
        {viewMode === "visual" && (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            onBlur={handleEditorInput}
            className="prose prose-slate dark:prose-invert max-w-none min-h-[360px] focus:outline-none focus:ring-0 leading-relaxed font-sans text-base"
            data-placeholder={placeholder || "Write your article content here..."}
          />
        )}

        {viewMode === "html" && (
          <textarea
            value={rawHtml}
            onChange={handleRawHtmlChange}
            rows={16}
            className="w-full h-full min-h-[360px] font-mono text-xs leading-relaxed bg-slate-950 text-emerald-400 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
            placeholder="<p>Write your semantic HTML markup here...</p>"
          />
        )}

        {viewMode === "preview" && (
          <div className="prose prose-slate dark:prose-invert max-w-none min-h-[360px] leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: rawHtml || "<p class='text-slate-400 italic'>No content yet to preview...</p>" }} />
          </div>
        )}
      </div>

      {/* ================== LINK MODAL ================== */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Insert Contextual Link</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Anchor Text
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. explore the EBM Diagnostic Assessment"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Target URL
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="e.g. /assessment or https://example.com"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              {/* Internal Pages Quick Select */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50/50 dark:bg-slate-800/50 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                  <span>Quick Link to EBM Core Pages:</span>
                  <div className="relative w-36">
                    <input
                      type="text"
                      value={linkSearchQuery}
                      onChange={(e) => setLinkSearchQuery(e.target.value)}
                      placeholder="Search pages..."
                      className="w-full text-[11px] px-2 py-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>

                <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                  {filteredInternalLinks.map((item) => (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => {
                        setLinkUrl(item.path);
                        if (!linkText) setLinkText(item.title);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition ${
                        linkUrl === item.path
                          ? "bg-blue-600 text-white font-bold"
                          : "hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{item.title}</div>
                        <div className={`text-[10px] ${linkUrl === item.path ? "text-blue-100" : "text-slate-400"}`}>{item.path}</div>
                      </div>
                      {linkUrl === item.path && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Rel attribute */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Rel Attribute (Optional)
                </label>
                <select
                  value={linkRel}
                  onChange={(e) => setLinkRel(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                >
                  <option value="">Default (Standard link)</option>
                  <option value="noopener noreferrer">noopener noreferrer (External links)</option>
                  <option value="nofollow">nofollow (Sponsored or unvetted external)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyLink}
                disabled={!linkUrl}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow-xs"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================== IMAGE MODAL ================== */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Insert Educational Image</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Image URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Descriptive Alt Text <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Describe the image content accurately for accessibility & SEO"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Visible subtitle or explanation under the visual"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Preview if URL entered */}
              {imageUrl && (
                <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-40 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <img
                    src={imageUrl}
                    alt={imageAlt || "Preview"}
                    className="max-h-40 object-cover w-full"
                    onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyImage}
                disabled={!imageUrl}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl shadow-xs"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
