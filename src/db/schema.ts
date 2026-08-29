import { mysqlTable, varchar, int, text, timestamp, json, date } from 'drizzle-orm/mysql-core';

export const classes = mysqlTable('classes', {
  id: varchar('id', { length: 100 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  subjects: json('subjects'), // Array of subjects e.g. ['Mathematics', 'Science']
  gradeLevel: varchar('gradeLevel', { length: 100 }).notNull(),
  studentCount: int('studentCount').default(0),
  schedule: varchar('schedule', { length: 255 }).notNull(),
  room: varchar('room', { length: 100 }).notNull(),
  status: varchar('status', { length: 50 }).default('ACTIVE'),
});

export const students = mysqlTable('students', {
  id: varchar('id', { length: 100 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  passwordHash: varchar('passwordHash', { length: 255 }),
  gradeLevel: varchar('gradeLevel', { length: 100 }).notNull(),
  ebmYear: varchar('ebmYear', { length: 100 }), // Added by user recommendation
  performanceScore: int('performanceScore').default(80),
  attendanceRate: int('attendanceRate').default(100),
  riskStatus: varchar('riskStatus', { length: 50 }).default('LOW'),
  lastActive: timestamp('lastActive'),
  classIds: json('classIds'),
  onboardingComplete: int('onboardingComplete').default(0),
  parentEmail: varchar('parentEmail', { length: 255 }),
  unlockedDiagnostics: json('unlockedDiagnostics'),
  profilePictureUrl: text('profilePictureUrl'),
  loginHistory: json('loginHistory'),
});

export const parents = mysqlTable('parents', {
  id: varchar('id', { length: 100 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  passwordHash: varchar('passwordHash', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  lastActive: timestamp('lastActive'),
  onboardingComplete: int('onboardingComplete').default(0),
  profilePictureUrl: text('profilePictureUrl'),
});

export const teachers = mysqlTable('teachers', {
  id: varchar('id', { length: 100 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  passwordHash: varchar('passwordHash', { length: 255 }),
  department: varchar('department', { length: 100 }),
  title: varchar('title', { length: 100 }), // e.g. Senior Instructor
  lastActive: timestamp('lastActive'),
  classIds: json('classIds'),
  profilePictureUrl: text('profilePictureUrl'),
});

export const student_personalization = mysqlTable('student_personalization', {
  studentId: varchar('studentId', { length: 100 }).primaryKey(),
  profile: json('profile'),
  academic: json('academic'),
  preferences: json('preferences'),
  goals: json('goals'),
  availability: json('availability'),
  technology: json('technology'),
  currentStep: varchar('currentStep', { length: 50 }).default('WELCOME'),
  completedSteps: json('completedSteps'),
  isComplete: int('isComplete').default(0),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

export const assignments = mysqlTable('assignments', {
  id: varchar('id', { length: 100 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  classId: varchar('classId', { length: 100 }).notNull(),
  dueDate: timestamp('dueDate'),
  status: varchar('status', { length: 50 }).default('PUBLISHED'),
});

export const submissions = mysqlTable('submissions', {
  id: varchar('id', { length: 100 }).primaryKey(),
  studentId: varchar('studentId', { length: 100 }).notNull(),
  studentName: varchar('studentName', { length: 255 }),
  classId: varchar('classId', { length: 100 }),
  assignmentId: varchar('assignmentId', { length: 100 }),
  assessmentId: varchar('assessmentId', { length: 100 }),
  type: varchar('type', { length: 50 }).notNull(),
  content: text('content'),
  submittedAt: timestamp('submittedAt'),
  status: varchar('status', { length: 50 }).default('SUBMITTED'),
  score: int('score'),
  feedback: text('feedback'),
});

export const attendance = mysqlTable('attendance_records', {
  id: varchar('id', { length: 100 }).primaryKey(),
  classId: varchar('classId', { length: 100 }).notNull(),
  date: date('date').notNull(),
  statuses: json('statuses'),
  notes: json('notes'),
  submittedAt: timestamp('submittedAt'),
});

export const files = mysqlTable('files', {
  id: varchar('id', { length: 100 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  url: text('url').notNull(),
  type: varchar('type', { length: 100 }),
  size: int('size'),
  uploadedAt: timestamp('uploadedAt'),
});

export const planner_tasks = mysqlTable('planner_tasks', {
  id: varchar('id', { length: 100 }).primaryKey(),
  studentId: varchar('studentId', { length: 100 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  subject: varchar('subject', { length: 255 }),
  type: varchar('type', { length: 50 }),
  status: varchar('status', { length: 50 }).default('PENDING'),
  estimatedMinutes: int('estimatedMinutes'),
  date: date('date'),
});

export const notifications = mysqlTable('notifications', {
  id: varchar('id', { length: 100 }).primaryKey(),
  userId: varchar('userId', { length: 100 }).notNull(),
  studentId: varchar('studentId', { length: 100 }),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  type: varchar('type', { length: 50 }),
  isRead: int('isRead').default(0), // 0 for false, 1 for true
  createdAt: timestamp('createdAt').defaultNow(),
});

export const curriculum = mysqlTable('curriculum', {
  id: varchar('id', { length: 100 }).primaryKey(),
  classId: varchar('classId', { length: 100 }),
  title: varchar('title', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 100 }).notNull(), // 'MATH' or 'ENGLISH'
  gradeLevel: varchar('gradeLevel', { length: 100 }),
  type: varchar('type', { length: 50 }), // PRACTICE_QUESTION or COMPREHENSION
  unitTitle: varchar('unitTitle', { length: 255 }),
  testNumber: varchar('testNumber', { length: 100 }),
  skillFocus: text('skillFocus'),
  lifeConnection: text('lifeConnection'),
  content: text('content'), // The reading passage or instructions
  questions: json('questions'), // [{ id, question, type: 'MCQ'|'SHORT', options?: string[], correctAnswer?: string }]
  duration: int('duration'), // duration in minutes
  thumbnailUrl: text('thumbnailUrl'),
  isDiagnostic: int('isDiagnostic').default(0),
  price: varchar('price', { length: 50 }),
  whatsappNumber: varchar('whatsappNumber', { length: 20 }),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const completed_lessons = mysqlTable('completed_lessons', {
  id: varchar('id', { length: 100 }).primaryKey(),
  studentId: varchar('studentId', { length: 100 }).notNull(),
  lessonId: varchar('lessonId', { length: 100 }).notNull(),
  completedAt: timestamp('completedAt').defaultNow(),
});

export const certificates = mysqlTable('certificates', {
  id: varchar('id', { length: 100 }).primaryKey(),
  studentId: varchar('studentId', { length: 100 }).notNull(),
  gradeLevel: varchar('gradeLevel', { length: 100 }).notNull(),
  issuedAt: timestamp('issuedAt').defaultNow(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
});

export const achievements = mysqlTable('achievements', {
  id: varchar('id', { length: 100 }).primaryKey(),
  studentId: varchar('studentId', { length: 100 }).notNull(),
  badgeId: varchar('badgeId', { length: 100 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 100 }),
  earnedAt: timestamp('earnedAt').defaultNow(),
});

export const parenting_resources = mysqlTable('parenting_resources', {
  id: varchar('id', { length: 100 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  type: varchar('type', { length: 50 }).notNull(), // 'GUIDE' or 'LESSON'
  content: text('content'),
  category: varchar('category', { length: 100 }),
  thumbnailUrl: text('thumbnailUrl'),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const announcements = mysqlTable('announcements', {
  id: varchar('id', { length: 100 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  authorId: varchar('authorId', { length: 100 }).notNull(),
  authorName: varchar('authorName', { length: 255 }).notNull(),
  authorRole: varchar('authorRole', { length: 50 }).notNull(),
  targetAudience: json('targetAudience'), // Array of target audiences, e.g. ["ALL"], ["STUDENT"], ["PARENT"]
  priority: varchar('priority', { length: 50 }).default('INFO'),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const global_announcement_bar = mysqlTable('global_announcement_bar', {
  id: varchar('id', { length: 100 }).primaryKey(),
  text: text('text').notNull(),
  ctaText: varchar('ctaText', { length: 255 }),
  ctaUrl: text('ctaUrl'),
  isActive: int('isActive').default(1),
  targetRole: varchar('targetRole', { length: 100 }).default('ALL'), // "PARENT", "STUDENT", "TEACHER", "ALL"
  scheduledStart: varchar('scheduledStart', { length: 100 }),
  scheduledUntil: varchar('scheduledUntil', { length: 100 }),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const conversations = mysqlTable('conversations', {
  id: varchar('id', { length: 100 }).primaryKey(),
  type: varchar('type', { length: 50 }).default('DIRECT'),
  participants: json('participants'), // Array of UserSnippet e.g. [{id, name, role}]
  groupName: varchar('groupName', { length: 255 }),
  unreadCount: int('unreadCount').default(0),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

export const messages = mysqlTable('messages', {
  id: varchar('id', { length: 100 }).primaryKey(),
  conversationId: varchar('conversationId', { length: 100 }).notNull(),
  senderId: varchar('senderId', { length: 100 }).notNull(),
  senderName: varchar('senderName', { length: 255 }).notNull(),
  senderRole: varchar('senderRole', { length: 50 }).notNull(),
  content: text('content').notNull(),
  type: varchar('type', { length: 50 }).default('DIRECT'),
  status: varchar('status', { length: 50 }).default('SENT'),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const timetable = mysqlTable('timetable', {
  id: varchar('id', { length: 100 }).primaryKey(),
  classId: varchar('classId', { length: 100 }).notNull(),
  day: varchar('day', { length: 50 }).notNull(),
  timeSlot: varchar('timeSlot', { length: 100 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  topic: varchar('topic', { length: 255 }),
  teacherId: varchar('teacherId', { length: 100 }),
  room: varchar('room', { length: 100 }),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const auditLogs = mysqlTable('auditLogs', {
  id: varchar('id', { length: 50 }).primaryKey(),
  timestamp: timestamp('timestamp').defaultNow(),
  actor: varchar('actor', { length: 100 }),
  role: varchar('role', { length: 50 }),
  action: varchar('action', { length: 100 }),
  details: text('details'),
  ip: varchar('ip', { length: 50 }),
});

export const admissions = mysqlTable('admissions', {
  id: varchar('id', { length: 100 }).primaryKey(),
  studentName: varchar('studentName', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  gradeLevel: varchar('gradeLevel', { length: 50 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(), // PENDING, REVIEWING, INTERVIEWED, OFFERED, ENROLLED, REJECTED
  appliedDate: timestamp('appliedDate').defaultNow(),
  notes: text('notes'),
  parentName: varchar('parentName', { length: 255 }),
  parentPhone: varchar('parentPhone', { length: 50 }),
});

export const exams = mysqlTable('exams', {
  id: varchar('id', { length: 100 }).primaryKey(),
  classId: varchar('classId', { length: 100 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  examDate: varchar('examDate', { length: 100 }).notNull(),
  durationMinutes: int('durationMinutes').default(60),
  totalMarks: int('totalMarks').default(100),
  passingMarks: int('passingMarks').default(40),
  status: varchar('status', { length: 50 }).default('SCHEDULED'),
  room: varchar('room', { length: 100 }),
  syllabus: text('syllabus'),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const exam_results = mysqlTable('exam_results', {
  id: varchar('id', { length: 100 }).primaryKey(),
  examId: varchar('examId', { length: 100 }).notNull(),
  studentId: varchar('studentId', { length: 100 }).notNull(),
  marksObtained: int('marksObtained').default(0),
  status: varchar('status', { length: 50 }).default('GRADED'),
  teacherFeedback: text('teacherFeedback'),
  gradedAt: timestamp('gradedAt').defaultNow(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const meetings = mysqlTable('meetings', {
  id: varchar('id', { length: 100 }).primaryKey(),
  parentId: varchar('parentId', { length: 100 }).notNull(),
  parentName: varchar('parentName', { length: 255 }),
  teacherId: varchar('teacherId', { length: 100 }).notNull(),
  teacherName: varchar('teacherName', { length: 255 }),
  studentId: varchar('studentId', { length: 100 }),
  studentName: varchar('studentName', { length: 255 }),
  subject: varchar('subject', { length: 255 }).notNull(),
  date: varchar('date', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).default('PENDING'),
  proposedBy: varchar('proposedBy', { length: 50 }).default('PARENT'),
  notes: text('notes'),
  meetingLink: text('meetingLink'),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const featured_journeys = mysqlTable('featured_journeys', {
  id: varchar('id', { length: 100 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  avatarUrl: text('avatarUrl'),
  currentGrade: varchar('currentGrade', { length: 255 }).notNull(),
  previousSchool: varchar('previousSchool', { length: 255 }).notNull(),
  goals: json('goals').notNull(),
  challenges: json('challenges').notNull(),
  journey: text('journey').notNull(),
  achievements: json('achievements').notNull(),
  favouriteSubject: varchar('favouriteSubject', { length: 255 }).notNull(),
  favouriteAITool: varchar('favouriteAITool', { length: 255 }).notNull(),
  futureDream: varchar('futureDream', { length: 255 }).notNull(),
  parentComment: text('parentComment').notNull(),
  teacherComment: text('teacherComment').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const parent_testimonials = mysqlTable('parent_testimonials', {
  id: varchar('id', { length: 100 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  occupation: varchar('occupation', { length: 255 }).notNull(),
  childGrade: varchar('childGrade', { length: 255 }).notNull(),
  rating: int('rating').default(5).notNull(),
  review: text('review').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  childrenEnrolled: int('childrenEnrolled').default(1).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const branding_settings = mysqlTable('branding_settings', {
  id: varchar('id', { length: 100 }).primaryKey(),
  logoText: varchar('logoText', { length: 255 }).notNull(),
  logoType: varchar('logoType', { length: 50 }).notNull(),
  logoIcon: varchar('logoIcon', { length: 100 }),
  logoImageUrl: text('logoImageUrl'),
  faviconUrl: text('faviconUrl'),
  heroBackgroundImage: text('heroBackgroundImage'),
  heroSlides: json('heroSlides'),
  showThemeToggle: int('showThemeToggle').default(1),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

export const blog_categories = mysqlTable('blog_categories', {
  id: varchar('id', { length: 100 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  description: text('description'),
  seoTitle: varchar('seoTitle', { length: 255 }),
  seoDescription: text('seoDescription'),
  color: varchar('color', { length: 50 }),
  icon: varchar('icon', { length: 100 }),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const blog_authors = mysqlTable('blog_authors', {
  id: varchar('id', { length: 100 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  bio: text('bio'),
  role: varchar('role', { length: 255 }),
  avatarUrl: text('avatarUrl'),
  email: varchar('email', { length: 255 }),
  socialLinks: json('socialLinks'),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const blog_posts = mysqlTable('blog_posts', {
  id: varchar('id', { length: 100 }).primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  slug: varchar('slug', { length: 500 }).notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  categoryId: varchar('categoryId', { length: 100 }).notNull(),
  secondaryCategoryIds: json('secondaryCategoryIds'),
  featuredImage: text('featuredImage'),
  featuredImageAlt: text('featuredImageAlt'),
  featuredImageCaption: text('featuredImageCaption'),
  authorId: varchar('authorId', { length: 100 }),
  status: varchar('status', { length: 50 }).default('draft').notNull(), // 'draft', 'published', 'archived', 'scheduled'
  isFeatured: int('isFeatured').default(0).notNull(),
  publishedAt: timestamp('publishedAt'),
  updatedAt: timestamp('updatedAt').defaultNow(),
  createdAt: timestamp('createdAt').defaultNow(),
  seoTitle: varchar('seoTitle', { length: 500 }),
  seoDescription: text('seoDescription'),
  ogImage: text('ogImage'),
  canonicalUrl: text('canonicalUrl'),
  readingTime: int('readingTime').default(5),
  tags: json('tags'),
  relatedPostIds: json('relatedPostIds'),
  noindex: int('noindex').default(0),
  views: int('views').default(0),
  ctaType: varchar('ctaType', { length: 50 }),
  ctaLink: text('ctaLink'),
  ctaText: varchar('ctaText', { length: 255 }),
});

export const blog_redirects = mysqlTable('blog_redirects', {
  id: varchar('id', { length: 100 }).primaryKey(),
  sourceSlug: varchar('sourceSlug', { length: 500 }).notNull(),
  targetSlug: varchar('targetSlug', { length: 500 }).notNull(),
  statusCode: int('statusCode').default(301).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});




