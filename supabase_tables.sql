CREATE TABLE classes (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  "gradeLevel" VARCHAR(100) NOT NULL,
  "studentCount" INTEGER DEFAULT 0,
  schedule VARCHAR(255) NOT NULL,
  room VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'ACTIVE'
);

CREATE TABLE students (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  "passwordHash" VARCHAR(255),
  "gradeLevel" VARCHAR(100) NOT NULL,
  "performanceScore" INTEGER DEFAULT 80,
  "attendanceRate" INTEGER DEFAULT 100,
  "riskStatus" VARCHAR(50) DEFAULT 'LOW',
  "lastActive" TIMESTAMP,
  "classIds" JSONB
);

CREATE TABLE assignments (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  "classId" VARCHAR(100) NOT NULL,
  "dueDate" TIMESTAMP,
  status VARCHAR(50) DEFAULT 'PUBLISHED'
);

CREATE TABLE submissions (
  id VARCHAR(100) PRIMARY KEY,
  "studentId" VARCHAR(100) NOT NULL,
  "studentName" VARCHAR(255),
  "classId" VARCHAR(100),
  "assignmentId" VARCHAR(100),
  "assessmentId" VARCHAR(100),
  type VARCHAR(50) NOT NULL,
  content TEXT,
  "submittedAt" TIMESTAMP,
  status VARCHAR(50) DEFAULT 'SUBMITTED',
  score INTEGER,
  feedback TEXT
);

CREATE TABLE attendance_records (
  id VARCHAR(100) PRIMARY KEY,
  "classId" VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  statuses JSONB,
  notes JSONB,
  "submittedAt" TIMESTAMP
);
