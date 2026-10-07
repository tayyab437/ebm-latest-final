import React, { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
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
  FileText,
  Sparkles,
  ExternalLink,
  Search,
  X,
  Check,
  HelpCircle
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

// Helper to convert HTML to Markdown when switching modes
function htmlToMarkdown(html: string): string {
  if (!html) return "";
  let md = html;
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n");
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n");
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n");
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n");
  md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**");
  md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**");
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*");
  md = md.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*");
  md = md.replace(/<s[^>]*>([\s\S]*?)<\/s>/gi, "~~$1~~");
  md = md.replace(/<strike[^>]*>([\s\S]*?)<\/strike>/gi, "~~$1~~");
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, "\n```\n$1\n```\n");
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`");
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_m, p1) => {
    const lines = p1.replace(/<\/?p[^>]*>/gi, "\n").trim().split("\n");
    return "\n" + lines.map((l: string) => `> ${l}`).join("\n") + "\n";
  });
  md = md.replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");
  md = md.replace(/<img\s+[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*\/?>/gi, "![$2]($1)");
  md = md.replace(/<img\s+[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']+)["'][^>]*\/?>/gi, "![$1]($2)");
  md = md.replace(/<img\s+[^>]*src=["']([^"']+)["'][^>]*\/?>/gi, "![]($1)");
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n");
  md = md.replace(/<\/?ul[^>]*>/gi, "\n");
  md = md.replace(/<\/?ol[^>]*>/gi, "\n");
  md = md.replace(/<hr[^>]*\/?>/gi, "\n---\n");
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n$1\n");
  md = md.replace(/<br[^>]*\/?>/gi, "\n");
  md = md.replace(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/gi, "\n*$1*\n");
  md = md.replace(/<\/?figure[^>]*>/gi, "\n");
  md = md.replace(/<\/?div[^>]*>/gi, "\n");
  md = md.replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, "$1");
  md = md.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, " ");
  md = md.replace(/\n{3,}/g, "\n\n").trim();
  return md;
}

// Helper to convert Markdown to HTML using marked
function markdownToHtml(markdown: string): string {
  if (!markdown) return "";
  try {
    return marked.parse(markdown) as string;
  } catch (e) {
    return markdown;
  }
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const markdownTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [viewMode, setViewMode] = useState<"visual" | "markdown" | "html" | "preview">("visual");
  const [rawHtml, setRawHtml] = useState(value || "");
  const [markdownText, setMarkdownText] = useState(() => htmlToMarkdown(value || ""));
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(1);
  const [showMarkdownGuide, setShowMarkdownGuide] = useState(false);

  // Link Modal State
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [linkRel, setLinkRel] = useState("");
  const [linkSearchQuery, setLinkSearchQuery] = useState("");

  // Image Modal State
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageCaption, setImageCaption] = useState("");

  // Sync state with incoming value
  useEffect(() => {
    setRawHtml(value || "");
    calculateStats(value || "");
    if (editorRef.current && viewMode === "visual" && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const calculateStats = (textOrHtml: string) => {
    const plainText = textOrHtml.replace(/<[^>]*>/g, " ").replace(/[#*`_~[\]()]/g, " ").trim();
    const words = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
    setWordCount(words);
    setCharCount(plainText.length);
    setReadingTime(Math.max(1, Math.ceil(words / 200)));
  };

  const handleVisualInput = () => {
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

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const md = e.target.value;
    setMarkdownText(md);
    const convertedHtml = markdownToHtml(md);
    setRawHtml(convertedHtml);
    calculateStats(md);
    onChange(convertedHtml);
  };

  // Switch between visual, markdown, html, preview modes
  const handleModeSwitch = (newMode: "visual" | "markdown" | "html" | "preview") => {
    if (newMode === viewMode) return;

    if (newMode === "markdown") {
      // Convert current HTML to Markdown
      const md = htmlToMarkdown(rawHtml);
      setMarkdownText(md);
      calculateStats(md);
    } else if (newMode === "visual") {
      // In visual mode, editorRef will be hydrated with rawHtml
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = rawHtml || "";
        }
      }, 0);
    } else if (newMode === "html" || newMode === "preview") {
      calculateStats(rawHtml);
    }

    setViewMode(newMode);
  };

  // Visual formatting execution
  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    if (viewMode === "visual") {
      document.execCommand(command, false, arg);
      handleVisualInput();
    } else if (viewMode === "markdown") {
      applyMarkdownFormatting(command);
    }
  };

  // Markdown formatting helpers
  const applyMarkdownFormatting = (action: string) => {
    const textarea = markdownTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = markdownText.substring(start, end);
    let replacement = "";
    let cursorOffset = 0;

    switch (action) {
      case "bold":
        replacement = `**${selected || "bold text"}**`;
        cursorOffset = selected ? replacement.length : 2;
        break;
      case "italic":
        replacement = `*${selected || "italic text"}*`;
        cursorOffset = selected ? replacement.length : 1;
        break;
      case "h2":
        replacement = `\n## ${selected || "Section Heading"}\n`;
        cursorOffset = replacement.length;
        break;
      case "h3":
        replacement = `\n### ${selected || "Subsection Heading"}\n`;
        cursorOffset = replacement.length;
        break;
      case "list":
        replacement = `\n- ${selected || "List item"}\n`;
        break;
      case "numbered":
        replacement = `\n1. ${selected || "List item"}\n`;
        break;
      case "quote":
        replacement = `\n> ${selected || "Important quotation or insight"}\n`;
        break;
      case "code":
        replacement = selected.includes("\n")
          ? `\n\`\`\`\n${selected || "code snippet"}\n\`\`\`\n`
          : `\`${selected || "code"}\``;
        break;
      case "hr":
        replacement = `\n---\n`;
        break;
      case "table":
        replacement = `\n| Column 1 | Column 2 | Column 3 |\n| :--- | :--- | :--- |\n| Data A | Data B | Data C |\n| Data D | Data E | Data F |\n`;
        break;
      default:
        return;
    }

    const newMd = markdownText.substring(0, start) + replacement + markdownText.substring(end);
    setMarkdownText(newMd);
    const convertedHtml = markdownToHtml(newMd);
    setRawHtml(convertedHtml);
    calculateStats(newMd);
    onChange(convertedHtml);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + cursorOffset, start + cursorOffset);
    }, 10);
  };

  const insertHeading = (tag: "h2" | "h3" | "h4" | "p") => {
    if (viewMode === "visual") {
      document.execCommand("formatBlock", false, `<${tag}>`);
      handleVisualInput();
    } else if (viewMode === "markdown") {
      if (tag === "h2") applyMarkdownFormatting("h2");
      else if (tag === "h3") applyMarkdownFormatting("h3");
      else applyMarkdownFormatting("h3");
    }
  };

  const insertBlockquote = () => {
    if (viewMode === "visual") {
      document.execCommand("formatBlock", false, "<blockquote>");
      handleVisualInput();
    } else if (viewMode === "markdown") {
      applyMarkdownFormatting("quote");
    }
  };

  const insertCodeBlock = () => {
    if (viewMode === "visual") {
      const selectedText = window.getSelection()?.toString() || "code snippet here";
      const codeHtml = `<pre class="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm overflow-x-auto my-4"><code>${selectedText}</code></pre><p></p>`;
      document.execCommand("insertHTML", false, codeHtml);
      handleVisualInput();
    } else if (viewMode === "markdown") {
      applyMarkdownFormatting("code");
    }
  };

  const insertTable = () => {
    if (viewMode === "visual") {
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
      handleVisualInput();
    } else if (viewMode === "markdown") {
      applyMarkdownFormatting("table");
    }
  };

  const openLinkModal = () => {
    if (viewMode === "markdown" && markdownTextareaRef.current) {
      const textarea = markdownTextareaRef.current;
      const sel = markdownText.substring(textarea.selectionStart, textarea.selectionEnd);
      setLinkText(sel);
    } else {
      const sel = window.getSelection();
      setLinkText(sel?.toString() || "");
    }
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

    if (viewMode === "markdown") {
      const mdLink = `[${text}](${cleanUrl})`;
      if (markdownTextareaRef.current) {
        const textarea = markdownTextareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newMd = markdownText.substring(0, start) + mdLink + markdownText.substring(end);
        setMarkdownText(newMd);
        const converted = markdownToHtml(newMd);
        setRawHtml(converted);
        onChange(converted);
      } else {
        const newMd = markdownText + ` ${mdLink}`;
        setMarkdownText(newMd);
        const converted = markdownToHtml(newMd);
        setRawHtml(converted);
        onChange(converted);
      }
    } else if (viewMode === "visual") {
      const linkHtml = `<a href="${cleanUrl}"${relAttr}${targetAttr} class="text-blue-600 dark:text-blue-400 font-semibold hover:underline">${text}</a>`;
      document.execCommand("insertHTML", false, linkHtml);
      handleVisualInput();
    } else {
      const linkHtml = `<a href="${cleanUrl}"${relAttr}${targetAttr} class="text-blue-600 dark:text-blue-400 font-semibold hover:underline">${text}</a>`;
      setRawHtml((prev) => prev + linkHtml);
      onChange(rawHtml + linkHtml);
    }
    setShowLinkModal(false);
  };

  const applyImage = () => {
    if (!imageUrl) return;
    const cleanUrl = imageUrl.trim();
    const alt = imageAlt.trim() || "EBM article educational illustration";
    const caption = imageCaption.trim();

    if (viewMode === "markdown") {
      const mdImage = caption ? `\n![${alt}](${cleanUrl})\n*${caption}*\n` : `\n![${alt}](${cleanUrl})\n`;
      const newMd = markdownText + mdImage;
      setMarkdownText(newMd);
      const converted = markdownToHtml(newMd);
      setRawHtml(converted);
      onChange(converted);
    } else if (viewMode === "visual") {
      const imageHtml = caption
        ? `<figure class="my-8"><img src="${cleanUrl}" alt="${alt}" class="w-full h-auto rounded-2xl shadow-md object-cover max-h-[500px]" loading="lazy" referrerPolicy="no-referrer" /><figcaption class="mt-2 text-center text-xs text-slate-500 dark:text-slate-400 italic">${caption}</figcaption></figure><p></p>`
        : `<figure class="my-8"><img src="${cleanUrl}" alt="${alt}" class="w-full h-auto rounded-2xl shadow-md object-cover max-h-[500px]" loading="lazy" referrerPolicy="no-referrer" /></figure><p></p>`;
      document.execCommand("insertHTML", false, imageHtml);
      handleVisualInput();
    } else {
      const imageHtml = caption
        ? `<figure class="my-8"><img src="${cleanUrl}" alt="${alt}" class="w-full h-auto rounded-2xl shadow-md object-cover max-h-[500px]" loading="lazy" referrerPolicy="no-referrer" /><figcaption class="mt-2 text-center text-xs text-slate-500 dark:text-slate-400 italic">${caption}</figcaption></figure><p></p>`
        : `<figure class="my-8"><img src="${cleanUrl}" alt="${alt}" class="w-full h-auto rounded-2xl shadow-md object-cover max-h-[500px]" loading="lazy" referrerPolicy="no-referrer" /></figure><p></p>`;
      setRawHtml((prev) => prev + imageHtml);
      onChange(rawHtml + imageHtml);
    }

    setImageUrl("");
    setImageAlt("");
    setImageCaption("");
    setShowImageModal(false);
  };

  const filteredInternalLinks = STATIC_INTERNAL_LINKS.filter(
    (l) =>
      l.title.toLowerCase().includes(linkSearchQuery.toLowerCase()) ||
      l.path.toLowerCase().includes(linkSearchQuery.toLowerCase())
  );

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
      {/* Editor Toolbar Header */}
      <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 px-3 py-2.5 flex flex-wrap items-center justify-between gap-2 text-slate-700 dark:text-slate-200">
        {/* Formatting Actions */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Headings */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 shadow-xs">
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

          <div className="h-5 w-[1px] bg-slate-300 dark:bg-slate-700 mx-0.5" />

          {/* Basic Text Formatting */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 shadow-xs">
            <button
              type="button"
              title="Bold (Ctrl+B or **text**)"
              onClick={() => executeCommand("bold")}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Italic (Ctrl+I or *text*)"
              onClick={() => executeCommand("italic")}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Strikethrough (~~text~~)"
              onClick={() => executeCommand("strikeThrough")}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Strikethrough className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-5 w-[1px] bg-slate-300 dark:bg-slate-700 mx-0.5" />

          {/* Lists & Quotes */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 shadow-xs">
            <button
              type="button"
              title="Bullet List (- item)"
              onClick={() => (viewMode === "markdown" ? applyMarkdownFormatting("list") : executeCommand("insertUnorderedList"))}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Numbered List (1. item)"
              onClick={() => (viewMode === "markdown" ? applyMarkdownFormatting("numbered") : executeCommand("insertOrderedList"))}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Blockquote (> quote)"
              onClick={insertBlockquote}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Code Block (```code```)"
              onClick={insertCodeBlock}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              title="Horizontal Divider (---)"
              onClick={() => (viewMode === "markdown" ? applyMarkdownFormatting("hr") : executeCommand("insertHorizontalRule"))}
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

          <div className="h-5 w-[1px] bg-slate-300 dark:bg-slate-700 mx-0.5" />

          {/* Links & Images */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 shadow-xs">
            <button
              type="button"
              title="Insert Link [title](url)"
              onClick={openLinkModal}
              className="px-2 py-1.5 rounded text-xs font-semibold hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 transition flex items-center gap-1"
            >
              <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>Link</span>
            </button>
            <button
              type="button"
              title="Insert Image ![alt](url)"
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
            <span>{wordCount.toLocaleString()} words</span>
            <span>•</span>
            <span>{charCount.toLocaleString()} chars</span>
            <span>•</span>
            <span>~{readingTime} min read</span>
          </div>

          {/* Mode Switcher Tabs: Visual, Markdown, HTML, Preview */}
          <div className="flex items-center bg-slate-200/90 dark:bg-slate-700/80 p-0.5 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => handleModeSwitch("visual")}
              className={`px-3 py-1.5 rounded-lg transition ${
                viewMode === "visual"
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
              }`}
            >
              Visual
            </button>

            <button
              type="button"
              onClick={() => handleModeSwitch("markdown")}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                viewMode === "markdown"
                  ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs font-black"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3 h-3 text-purple-500" />
              <span>Markdown</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeSwitch("html")}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                viewMode === "html"
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>HTML</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeSwitch("preview")}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                viewMode === "preview"
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Markdown Guide Banner (Visible in Markdown mode) */}
      {viewMode === "markdown" && (
        <div className="bg-purple-50/70 dark:bg-purple-950/30 border-b border-purple-100 dark:border-purple-900/40 px-4 py-2 flex items-center justify-between text-xs text-purple-900 dark:text-purple-300">
          <div className="flex items-center gap-2">
            <span className="font-bold">⚡ Markdown Mode Active:</span>
            <span className="hidden md:inline">Use <code className="bg-purple-100 dark:bg-purple-900/50 px-1 py-0.5 rounded font-mono text-[11px]">## Heading</code>, <code className="bg-purple-100 dark:bg-purple-900/50 px-1 py-0.5 rounded font-mono text-[11px]">**bold**</code>, <code className="bg-purple-100 dark:bg-purple-900/50 px-1 py-0.5 rounded font-mono text-[11px]">- list</code>, or paste full markdown articles directly.</span>
          </div>
          <button
            type="button"
            onClick={() => setShowMarkdownGuide(!showMarkdownGuide)}
            className="font-bold underline hover:text-purple-700 flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showMarkdownGuide ? "Hide Guide" : "Cheat Sheet"}</span>
          </button>
        </div>
      )}

      {/* Quick Markdown Cheat Sheet Drawer */}
      {viewMode === "markdown" && showMarkdownGuide && (
        <div className="bg-slate-900 text-slate-200 border-b border-slate-800 p-4 text-xs font-mono grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="space-y-1">
            <div className="text-purple-400 font-bold font-sans">Headers:</div>
            <div>## Main Section</div>
            <div>### Subsection</div>
            <div>#### Minor Title</div>
          </div>
          <div className="space-y-1">
            <div className="text-purple-400 font-bold font-sans">Emphasis:</div>
            <div>**bold text**</div>
            <div>*italic text*</div>
            <div>~~strikethrough~~</div>
          </div>
          <div className="space-y-1">
            <div className="text-purple-400 font-bold font-sans">Lists &amp; Quotes:</div>
            <div>- Bullet item</div>
            <div>1. Numbered item</div>
            <div>&gt; Blockquote text</div>
          </div>
          <div className="space-y-1">
            <div className="text-purple-400 font-bold font-sans">Media &amp; Tables:</div>
            <div>[Link Text](/path)</div>
            <div>![Alt](image.jpg)</div>
            <div>| Col 1 | Col 2 |</div>
          </div>
        </div>
      )}

      {/* Editor Main Content Area */}
      <div className="min-h-[480px] p-6 text-slate-900 dark:text-slate-100 font-sans">
        {viewMode === "visual" && (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleVisualInput}
            onBlur={handleVisualInput}
            className="prose prose-slate dark:prose-invert max-w-none min-h-[440px] focus:outline-none focus:ring-0 leading-relaxed font-sans text-base overflow-visible"
            data-placeholder={placeholder || "Write your article content here..."}
          />
        )}

        {viewMode === "markdown" && (
          <textarea
            ref={markdownTextareaRef}
            value={markdownText}
            onChange={handleMarkdownChange}
            rows={22}
            className="w-full h-full min-h-[440px] font-mono text-sm leading-relaxed bg-slate-950 text-purple-200 p-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
            placeholder={`# Article Title\n\n## Introduction\nType or paste your complete markdown article here. Supports extensive, lengthy essays and academic guides without length limitations...`}
          />
        )}

        {viewMode === "html" && (
          <textarea
            value={rawHtml}
            onChange={handleRawHtmlChange}
            rows={22}
            className="w-full h-full min-h-[440px] font-mono text-xs leading-relaxed bg-slate-950 text-emerald-400 p-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            placeholder="<p>Write or paste your complete semantic HTML markup here...</p>"
          />
        )}

        {viewMode === "preview" && (
          <div className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none min-h-[440px] leading-relaxed p-4 bg-slate-50/50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800/80">
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
                        <div className={`text-[10px] ${linkUrl === item.path ? "text-blue-100" : "text-slate-400"}`}>
                          {item.path}
                        </div>
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
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
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
