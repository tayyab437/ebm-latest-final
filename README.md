# EBM Digital Learning Ecosystem

An AI-powered online education platform enabling Grade 5 to CIE O-Level acceleration in approximately 3 years using the **Ejaz Bukhari Method (EBM)**.

## 🌟 Key Modules Included

1. **Pedagogy & 3-Year Syllabus Roadmap**: Interactive bento-grid detailing Year 1 (Fundamental Acceleration), Year 2 (Scientific Rigor), and Year 3 (CIE exam focus) with standard target equivalents.
2. **Student Daily Planner & Tracker**: Interactive daily checklists coupled with study statistics, streak tracking, and attendance validation.
3. **Gemini AI Tutor Chat**: A conversational helper trained to guide parents, students, and teachers on high-yield curriculum points.
4. **Parent Monitoring & Metrics**: Real-time progress trackers, customized SVGs depicting study times, notifications, and incentive pledges.
5. **Teacher Course Dashboard**: Interactive class list, student count diagnostics, and a homework assigner to deploy syllabus targets directly onto student planners.
6. **Cloudflare R2 Storage**: Drag-and-drop digital asset uploader with mock database logging to preview distributed file storage URLs.

---

## 🚀 Getting Started

### 1. Configure Secrets
Ensure you define your Gemini API Key in your environment configurations:
```env
GEMINI_API_KEY="YOUR_API_KEY"
```

### 2. Development Execution
Start the server and live client interface in development mode:
```bash
npm run dev
```

### 3. Production Deployment Build
Compile and bundle client static files and Node server script:
```bash
npm run build
npm start
```
