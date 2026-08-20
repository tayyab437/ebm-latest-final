# EBM (Evidence-Based Learning) Ecosystem - Feature Documentation

## 1. Executive Summary & Core Platform Mission

**EBM (Evidence-Based Learning)** is a full-stack, enterprise-grade EdTech platform engineered specifically for **Grade 1 to O/A Levels** learning support.

### Academic Focus
EBM is strictly focused on two primary academic pillars:
1. **Mathematics**: Fundamentals (Grade 1-5), Pre-Algebra & Decimals (Grade 6-8), Algebra & Geometry (Pre-O), and O/A Level Pure & Applied Mathematics.
2. **English Comprehension**: Reading Fluency, Contextual Vocabulary, Inferential Thinking, Textual Evidence Analysis, and O/A Level English Literature & Language.

### Core Philosophy
- **Evidence-Based Diagnostics**: Continuous skill measurement, gap identification, and personalized next-step recommendations.
- **One Diagnostic, Three Perspectives**: Tailored dashboards for **Students**, **Parents**, and **Educators/Schools**.
- **Unified Academic Ecosystem**: Seamless connection between diagnostic assessment, learning support, teacher intervention, parent visibility, and administrative ERP operations.

---

## 2. User Roles & Access Control Matrix

| Feature / Module | Student | Parent | Educator / Teacher | School Admin |
| :--- | :---: | :---: | :---: | :---: |
| **Personal Diagnostic Dashboard** | ✅ | 👁️ (Child View) | 👁️ (Class View) | 👁️ (School View) |
| **Interactive AI Tutor (Gemini)** | ✅ | — | 👁️ (Activity) | — |
| **Course Modules & Lessons** | ✅ | 👁️ Progress | ✅ Manage | ✅ Override |
| **Adaptive Learning Path** | ✅ | 👁️ Insights | ✅ Assign | ✅ Configure |
| **Exam & Certification Center** | ✅ | 👁️ Grades | ✅ Create/Grade | ✅ System-wide |
| **Parent Feed & Growth Tracking** | — | ✅ | 💬 Message | — |
| **Class Cohort Analytics** | — | — | ✅ | ✅ |
| **Assessment Creator & Gradebook** | — | — | ✅ | ✅ |
| **Admin ERP Portal & Finance** | — | — | — | ✅ |
| **Curriculum & Syllabus Builder** | — | — | 👁️ | ✅ |
| **Cloudflare R2 Storage Manager** | — | — | ✅ Upload | ✅ Administer |

---

## 3. Platform Layout & Navigation Architecture

### Global Header (`ebm-header`)
- **Responsive Topbar**: Glassy backdrop blur (`bg-white/85 backdrop-blur-md`), high contrast typography, and custom brand logo support (Image or Icon).
- **Navigation Menu Items**:
  - `Home` (`/`)
  - `Assessment` (`/assessment`)
  - `Analytics` (`/analytics`)
  - `Inspiration` (`/inspiration`)
  - `Contact` (`/contact`)
  - `Case Studies` (`/casestudies`)
- **Action Buttons**: Slanted geometric parallelogram design (`transform -skew-x-[18deg]`) in signature EBM Blue (`#00a3e0`):
  - **Sign In** (Solid `#00a3e0` button)
  - **Registration / Logout** (Outlined `#00a3e0` button)

### Mobile Navigation
- Horizontal scrolling pill container for effortless single-touch access across all public tabs on touch devices.

---

## 4. Public Landing Pages

### 4.1 Homepage (`/`)
- **Announcement Bar**: Sticky notification banner with real-time updates and quick links.
- **Hero Cloud Banners**:
  1. *Learning Support from Grade 1 to O/A Levels* (Subtitle: Mathematics • English)
  2. *From Learning to Real-World Results* (Subtitle: Practical Methods • Educator Support • Learner Growth)
  3. *AI-Enhanced Learning* (Subtitle: Personalized Guidance • Smart Learning Support • Insights • AI Tools)
- **Grade & Skill Selection Hub**: Filters by Grade 1-5, Grade 6-8, Pre-O Level, and O/A Levels.
- **Why Choose EBM**: 4 core evidence-based pillars:
  - Diagnostic Accuracy
  - Adaptive Learning Roadmap
  - Educator-Led Guidance
  - Real-World Academic Outcomes
- **Student & Teacher Testimonials**: Social proof, verified success stories, and grade improvement metrics.
- **Admissions & Interactive Roadmap**: Step-by-step onboarding guide for individual learners and institutional school partnerships.

### 4.2 Diagnostic Assessment Page (`/assessment`)
- **EBM Diagnostic Overview**: 45-minute continuous skill evaluation for Math and English Comprehension.
- **ONE DIAGNOSTIC. THREE PERSPECTIVES Section**:
  - **For Students**: Personal Level cards (e.g., Math Level 780, English Level 810), strengths (Fractions & Decimals, Inferencing), next steps, and EBM Student Insight. CTA: *Start the EBM Diagnostic*.
  - **For Parents**: Reassuring growth overview, multi-check level history (+90 pts growth), positive strengths vs growth opportunities, and plain-language EBM Parent Insight. CTA: *Start Your Child's Diagnostic*.
  - **For Educators & Schools**: Grade cohort averages, proficiency distribution (Performing Strongly, Progressing, Requiring Support), major curriculum focus areas, and EBM Educator Insight. CTA: *Explore EBM for Educators*.
- **Interactive Arena Mockup**: Live comparison between Math diagnostic questions and English Comprehension text passages.

### 4.3 Analytics Page (`/analytics`)
- **Real-Time Learning Analytics**: Visual velocity graphs, mastery distribution, learning time breakdown, and weak area heatmaps.
- **Skill Gap Identification Engine**: Highlights specific topic gaps before they impact exam performance.

### 4.4 Inspiration Hub Page (`/inspiration`)
- **Pedagogical Insights**: Articles, evidence-based teaching frameworks, student motivation guides, and educational research papers.

### 4.5 Case Studies & Success Stories Page (`/casestudies`)
- **Video Library**: 8+ embedded video case studies featuring real students, parents, and school principals.
- **Filtering System**: Filter by category (*All*, *Students*, *Parents*, *Schools*).
- **Impact Metrics**: Key statistics showcasing 94% grade improvement, 88% engagement boost, and 3x faster gap closure.

### 4.6 Contact & Support Page (`/contact`)
- **Inquiry Form**: Direct form for parent inquiries, school partnership requests, and technical support.
- **Campus & Regional Office Locator**: Interactive map locations and direct helpline details.

---

## 5. Student Portal & Learning Ecosystem

When signed in as a **Student**, the portal unlocks an end-to-end interactive learning environment:

### 5.1 Student Personal Dashboard (`/dashboard`)
- **Diagnostic Level Indicators**: Real-time scores for Mathematics and English Comprehension.
- **Daily Streak & Velocity Counter**: Encourages daily study habits with streak multipliers and fire badges.
- **Study Minutes Tracker**: Weekly bar charts comparing target study time vs. actual practice.
- **Upcoming Assignments & Deadlines**: List of pending quizzes, revision tasks, and practice sets.
- **Promotion Celebration Modal**: Animated modal celebrating milestone achievements and grade-level promotions.

### 5.2 My Classes & Course Modules (`/learning`)
- **Syllabus Categorization**: Organized by EBM Year 1 (Grade 5-7), Year 2 (Pre-O Level), and Year 3 (O Level).
- **Multimedia Lessons**: High-definition video lectures, downloadable PDF summary guides, and practice worksheets.
- **Interactive Quizzes**: Auto-graded assessments with immediate feedback and explanation keys.

### 5.3 AI Tutor (`/ai-tutor`)
- **Powered by Gemini API**: Intelligent, patient AI learning companion.
- **Math Solver**: Step-by-step problem solver for algebraic equations, fraction arithmetic, and geometry.
- **English Reading Assistant**: Explains difficult vocabulary in context, breaks down complex reading passages, and guides inferential reasoning.

### 5.4 Adaptive Learning Path (`/adaptive`)
- **Dynamic Recommendations**: Automatically injects targeted practice tasks into the student's daily planner based on diagnostic gaps.

### 5.5 Virtual Live Classes (`/live`)
- **Interactive Live Sessions**: Class schedules, video room launcher, chat Q&A with live teachers, and recorded archive access.

### 5.6 Exam Dashboard & Certification Center (`/exams`)
- **Timed Mock Exams**: Simulates O/A Level exam environments with countdown timers and section limits.
- **Certificate Center**: Generates verified, downloadable PDF completion certificates for completed courses and diagnostic levels.

### 5.7 Student Growth & Milestone Tracking (`/growth`)
- **Historical Growth Velocity**: Long-term trajectory charts showing progress across multiple terms.
- **Badge Showcase**: Visual trophy cabinet displaying earned badges for consistency, high accuracy, and subject mastery.

---

## 6. Parent Portal & Family Visibility

Designed specifically to keep parents informed without overwhelming jargon:

### 6.1 Multi-Child Dashboard (`/parent-feed`)
- **Child Selector**: Easily toggle between multiple enrolled siblings.
- **EBM Parent Insights**: Plain-language summaries generated after each assessment.
- **Strengths & Growth Opportunities**: Encouraging breakdown of topics the child has mastered versus recommended home practice areas.
- **Multi-Check Level History**: Visual timeline showing diagnostic level growth over time (+90 pts average growth).
- **Attendance & Activity Log**: Monitored view of login frequency, video completion, and quiz scores.
- **Direct Teacher Messaging**: Secure messaging box to contact subject teachers directly.

---

## 7. Teacher & Educator Portal

Empowers teachers with actionable class insights and automated workflow tools:

### 7.1 Teacher Management Panel (`/teacher-panel`)
- **Class Roster Overview**: Student lists, active status, individual diagnostic scores, and attendance rates.
- **Cohort Analytics**: Class average levels in Mathematics and English Comprehension.
- **Proficiency Distribution Breakdown**:
  - *Performing Strongly* (Ready for enrichment)
  - *Progressing Steady* (On benchmark)
  - *Requiring Additional Support* (Targeted intervention group)
- **Major Curriculum Attention Areas**: Class-wide heatmaps showing collective struggles (e.g. Rational Fractions, Inferential Themes).
- **EBM Educator Insight Generator**: AI-assisted cohort recommendations for small-group instruction.

### 7.2 Assessment Creator & Homework Planner
- **Custom Quiz Builder**: Create diagnostic assessments, weekly homework, and topic quizzes with custom point values.
- **Automated Grading Engine**: Instantly grades objective questions and populates student progress records.

### 7.3 Gradebook & Attendance Tracker
- **Digital Gradebook**: Full score logs with export options for report cards.
- **Attendance Logging**: Single-click roll call tracking with automated parent notification triggers.

---

## 8. School Admin & ERP Operations Portal

Comprehensive enterprise administrative suite for institution-wide governance:

### 8.1 Admin ERP Dashboard (`/admin-erp`)
- **School-Wide Health Metrics**: Total student count, faculty size, course count, and total fee collections.
- **User Management Hub**: Add, edit, assign roles (Student, Parent, Teacher, Admin), and update grade/year placements.
- **Department Roster Control**: Assign teachers to specific classes and subject departments.

### 8.2 Curriculum & Syllabus Builder (`/curriculum`)
- **Syllabus Mapping**: Define weekly learning objectives, align with Cambridge / National Standards, and link assessment benchmarks for Grade 1 through O/A Levels.

### 8.3 Cloudflare R2 Storage Manager (`/r2-storage`)
- **Cloud Asset Library**: Upload, manage, and distribute lesson PDFs, video recordings, exam papers, and audio listening tests.
- **Secure CDN URLs**: Generates fast, secure asset links stored on Cloudflare R2.

### 8.4 Finance & Fee Management
- **Invoicing & Tuition Tracking**: Monitor payment statuses (Paid, Pending, Overdue), issue fee vouchers, and manage scholarship grants.
- **Financial Analytics**: Monthly collection reports and revenue forecasting.

### 8.5 System Audit & Security Logs
- **Security Trail**: Real-time logging of login attempts, role adjustments, content edits, and system configuration updates.

---

## 9. Communication & Messaging System

- **Global Inbox (`/inbox`)**: Centralized messaging hub for internal student-teacher-parent communication.
- **Announcement Center (`/announcements`)**: School-wide broadcast system for emergency notices, exam schedules, and holiday announcements.
- **Automated Notifications**: Triggered alerts for low scores, missed assignments, upcoming live classes, and diagnostic updates.

---

## 10. Technical Stack & Infrastructure

- **Frontend**: React 18+, TypeScript, Vite
- **Styling**: Tailwind CSS, Motion (`motion/react`) for smooth animations
- **Iconography**: Lucide React (`lucide-react`)
- **AI Integration**: Server-side Google Gemini API (`@google/genai`) for AI Tutor and diagnostic insights
- **Storage**: Cloudflare R2 object storage for media assets
- **Data Architecture**: Fully modular design with clean type separation in `/src/types.ts` and centralized state management stores
- **Port & Ingress**: Configured for Cloud Run / Container deployment on Port 3000

---
*Document Version: 2.4.0 • EBM Digital Learning Platform Documentation*
