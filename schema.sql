-- EBM Database Schema for phpMyAdmin (MySQL)
-- Execute these statements in your phpMyAdmin SQL tab

-- 1. Classes Table
CREATE TABLE IF NOT EXISTS classes (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  gradeLevel VARCHAR(100) NOT NULL,
  studentCount INT DEFAULT 0,
  schedule VARCHAR(255) NOT NULL,
  room VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'ACTIVE'
);

-- 2. Students Table
CREATE TABLE IF NOT EXISTS students (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  passwordHash VARCHAR(255),
  gradeLevel VARCHAR(100) NOT NULL,
  ebmYear VARCHAR(100),
  performanceScore INT DEFAULT 80,
  attendanceRate INT DEFAULT 100,
  riskStatus VARCHAR(50) DEFAULT 'LOW',
  lastActive TIMESTAMP NULL DEFAULT NULL,
  classIds JSON
);

-- 3. Assignments Table
CREATE TABLE IF NOT EXISTS assignments (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  classId VARCHAR(100) NOT NULL,
  dueDate TIMESTAMP NULL DEFAULT NULL,
  status VARCHAR(50) DEFAULT 'PUBLISHED'
);

-- 4. Submissions Table
CREATE TABLE IF NOT EXISTS submissions (
  id VARCHAR(100) PRIMARY KEY,
  studentId VARCHAR(100) NOT NULL,
  studentName VARCHAR(255),
  classId VARCHAR(100),
  assignmentId VARCHAR(100),
  assessmentId VARCHAR(100),
  type VARCHAR(50) NOT NULL,
  content TEXT,
  submittedAt TIMESTAMP NULL DEFAULT NULL,
  status VARCHAR(50) DEFAULT 'SUBMITTED',
  score INT,
  feedback TEXT
);

-- 5. Attendance Records Table
CREATE TABLE IF NOT EXISTS attendance_records (
  id VARCHAR(100) PRIMARY KEY,
  classId VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  statuses JSON,
  notes JSON,
  submittedAt TIMESTAMP NULL DEFAULT NULL
);
