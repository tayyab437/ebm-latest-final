import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema.js';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

let pool: mysql.Pool | null = null;
let db: any = null;
let dbPromise: Promise<any> | null = null;

async function initializeDb() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL missing");
    throw new Error("DATABASE_URL is not defined in environment variables. Please add it via Settings.");
  }
  
  try {
    console.log("Initializing MySQL connection pool...");
    pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 10000 // 10 seconds timeout
    });
    
    // Test connection
    const connection = await pool.getConnection();
    console.log("MySQL connection successful");
    
    // Auto-create tables if they don't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`files\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`name\` varchar(255) NOT NULL,
        \`url\` text NOT NULL,
        \`type\` varchar(100),
        \`size\` int,
        \`uploadedAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`planner_tasks\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`studentId\` varchar(100) NOT NULL,
        \`title\` varchar(255) NOT NULL,
        \`description\` text,
        \`subject\` varchar(255),
        \`type\` varchar(50),
        \`status\` varchar(50) DEFAULT 'PENDING',
        \`estimatedMinutes\` int,
        \`date\` date
      );
    `);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`notifications\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`userId\` varchar(100) NOT NULL,
        \`studentId\` varchar(100),
        \`title\` varchar(255) NOT NULL,
        \`message\` text NOT NULL,
        \`type\` varchar(50),
        \`isRead\` int DEFAULT 0,
        \`createdAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`curriculum\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`classId\` varchar(100),
        \`title\` varchar(255) NOT NULL,
        \`subject\` varchar(100) NOT NULL,
        \`gradeLevel\` varchar(100),
        \`type\` varchar(50),
        \`unitTitle\` varchar(255),
        \`testNumber\` varchar(100),
        \`skillFocus\` text,
        \`lifeConnection\` text,
        \`content\` text,
        \`questions\` json,
        \`duration\` int,
        \`thumbnailUrl\` text,
        \`isDiagnostic\` int DEFAULT 0,
        \`price\` varchar(50),
        \`whatsappNumber\` varchar(20),
        \`createdAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    try {
      await connection.query("ALTER TABLE `curriculum` ADD COLUMN `classId` varchar(100)");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `curriculum` ADD COLUMN `type` varchar(50)");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `curriculum` ADD COLUMN `duration` int");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `curriculum` ADD COLUMN `thumbnailUrl` text");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `curriculum` ADD COLUMN `isDiagnostic` int DEFAULT 0");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `curriculum` ADD COLUMN `price` varchar(50)");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `curriculum` ADD COLUMN `whatsappNumber` varchar(20)");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `curriculum` ADD COLUMN `testNumber` varchar(100)");
    } catch (e) {}

    // Auto-create missing teacher/student tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`classes\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`name\` varchar(255) NOT NULL,
        \`subjects\` json,
        \`gradeLevel\` varchar(100) NOT NULL,
        \`studentCount\` int DEFAULT 0,
        \`schedule\` varchar(255) NOT NULL,
        \`room\` varchar(100) NOT NULL,
        \`status\` varchar(50) DEFAULT 'ACTIVE'
      );
    `);

    try {
      await connection.query("ALTER TABLE `assignments` ADD COLUMN `classId` varchar(100) NOT NULL DEFAULT 'class_1'");
    } catch (e) {}
    
    // Ensure columns in classes exist
    try {
      await connection.query("ALTER TABLE `classes` ADD COLUMN `gradeLevel` varchar(100) NOT NULL DEFAULT 'Grade 10'");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `classes` ADD COLUMN `subjects` json");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `classes` ADD COLUMN `studentCount` int DEFAULT 0");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `classes` ADD COLUMN `schedule` varchar(255) NOT NULL DEFAULT 'TBD'");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `classes` ADD COLUMN `room` varchar(100) NOT NULL DEFAULT 'TBD'");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `classes` ADD COLUMN `status` varchar(50) DEFAULT 'ACTIVE'");
    } catch (e) {}

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`parents\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`name\` varchar(255) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`passwordHash\` varchar(255),
        \`phone\` varchar(50),
        \`lastActive\` timestamp NULL,
        \`onboardingComplete\` int DEFAULT 0
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`teachers\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`name\` varchar(255) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`passwordHash\` varchar(255),
        \`department\` varchar(100),
        \`title\` varchar(100),
        \`lastActive\` timestamp NULL,
        \`classIds\` json
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`students\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`name\` varchar(255) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`passwordHash\` varchar(255),
        \`gradeLevel\` varchar(100) NOT NULL,
        \`ebmYear\` varchar(100),
        \`performanceScore\` int DEFAULT 80,
        \`attendanceRate\` int DEFAULT 100,
        \`riskStatus\` varchar(50) DEFAULT 'LOW',
        \`lastActive\` timestamp NULL,
        \`classIds\` json,
        \`onboardingComplete\` int DEFAULT 0,
        \`parentEmail\` varchar(255),
        \`unlockedDiagnostics\` json
      );
    `);

    // Ensure columns in students exist
    try {
      await connection.query("ALTER TABLE `students` ADD COLUMN `profilePictureUrl` text");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `teachers` ADD COLUMN `profilePictureUrl` text");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `parents` ADD COLUMN `profilePictureUrl` text");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `students` ADD COLUMN `parentEmail` varchar(255)");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `students` ADD COLUMN `unlockedDiagnostics` json");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `students` ADD COLUMN `onboardingComplete` int DEFAULT 0");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `students` ADD COLUMN \`gradeLevel\` varchar(100) NOT NULL DEFAULT 'Grade 10'");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `students` ADD COLUMN \`ebmYear\` varchar(100)");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `students` ADD COLUMN \`passwordHash\` varchar(255)");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `students` ADD COLUMN \`performanceScore\` int DEFAULT 80");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `students` ADD COLUMN \`attendanceRate\` int DEFAULT 100");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `students` ADD COLUMN \`riskStatus\` varchar(50) DEFAULT 'LOW'");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `students` ADD COLUMN \`lastActive\` timestamp NULL");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `students` ADD COLUMN \`classIds\` json");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `students` ADD COLUMN \`loginHistory\` json");
    } catch (e) {}

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`assignments\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`title\` varchar(255) NOT NULL,
        \`description\` text,
        \`classId\` varchar(100) NOT NULL,
        \`dueDate\` timestamp NULL,
        \`status\` varchar(50) DEFAULT 'PUBLISHED'
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`student_personalization\` (
        \`studentId\` varchar(100) PRIMARY KEY,
        \`profile\` json,
        \`academic\` json,
        \`preferences\` json,
        \`goals\` json,
        \`availability\` json,
        \`technology\` json,
        \`currentStep\` varchar(50) DEFAULT 'WELCOME',
        \`completedSteps\` json,
        \`isComplete\` int DEFAULT 0,
        \`updatedAt\` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`submissions\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`studentId\` varchar(100) NOT NULL,
        \`studentName\` varchar(255),
        \`classId\` varchar(100),
        \`assignmentId\` varchar(100),
        \`assessmentId\` varchar(100),
        \`type\` varchar(50) NOT NULL,
        \`content\` text,
        \`submittedAt\` timestamp NULL,
        \`status\` varchar(50) DEFAULT 'SUBMITTED',
        \`score\` int,
        \`feedback\` text
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`meetings\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`parentId\` varchar(100) NOT NULL,
        \`parentName\` varchar(255),
        \`teacherId\` varchar(100) NOT NULL,
        \`teacherName\` varchar(255),
        \`studentId\` varchar(100),
        \`studentName\` varchar(255),
        \`subject\` varchar(255) NOT NULL,
        \`date\` varchar(255) NOT NULL,
        \`status\` varchar(50) DEFAULT 'PENDING',
        \`proposedBy\` varchar(50) DEFAULT 'PARENT',
        \`notes\` text,
        \`createdAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ensure columns in submissions exist
    try {
      await connection.query("ALTER TABLE `submissions` ADD COLUMN `studentName` varchar(255)");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `submissions` ADD COLUMN `classId` varchar(100)");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `submissions` ADD COLUMN `assignmentId` varchar(100) NULL");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `submissions` MODIFY COLUMN `assignmentId` varchar(100) NULL");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `submissions` ADD COLUMN `assessmentId` varchar(100)");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `submissions` ADD COLUMN `status` varchar(50) DEFAULT 'SUBMITTED'");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `submissions` ADD COLUMN `score` int");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `submissions` ADD COLUMN `feedback` text");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `submissions` ADD COLUMN `type` varchar(50) NOT NULL DEFAULT 'ASSIGNMENT'");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `submissions` ADD COLUMN `content` text");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE `meetings` ADD COLUMN `meetingLink` text");
    } catch (e) {}

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`announcements\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`title\` varchar(255) NOT NULL,
        \`content\` text NOT NULL,
        \`authorId\` varchar(100) NOT NULL,
        \`authorName\` varchar(255) NOT NULL,
        \`authorRole\` varchar(50) NOT NULL,
        \`targetAudience\` json,
        \`priority\` varchar(50) DEFAULT 'INFO',
        \`createdAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`global_announcement_bar\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`text\` text NOT NULL,
        \`ctaText\` varchar(255),
        \`ctaUrl\` text,
        \`isActive\` int DEFAULT 1,
        \`targetRole\` varchar(100) DEFAULT 'ALL',
        \`scheduledStart\` varchar(100),
        \`scheduledUntil\` varchar(100),
        \`createdAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`conversations\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`type\` varchar(50) DEFAULT 'DIRECT',
        \`participants\` json,
        \`groupName\` varchar(255),
        \`unreadCount\` int DEFAULT 0,
        \`updatedAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`messages\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`conversationId\` varchar(100) NOT NULL,
        \`senderId\` varchar(100) NOT NULL,
        \`senderName\` varchar(255) NOT NULL,
        \`senderRole\` varchar(50) NOT NULL,
        \`content\` text NOT NULL,
        \`type\` varchar(50) DEFAULT 'DIRECT',
        \`status\` varchar(50) DEFAULT 'SENT',
        \`createdAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`attendance_records\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`classId\` varchar(100) NOT NULL,
        \`date\` date NOT NULL,
        \`statuses\` json,
        \`notes\` json,
        \`submittedAt\` timestamp NULL
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`certificates\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`studentId\` varchar(100) NOT NULL,
        \`gradeLevel\` varchar(100) NOT NULL,
        \`issuedAt\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`title\` varchar(255) NOT NULL,
        \`description\` text
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`achievements\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`studentId\` varchar(100) NOT NULL,
        \`badgeId\` varchar(100) NOT NULL,
        \`title\` varchar(255) NOT NULL,
        \`description\` text,
        \`icon\` varchar(100),
        \`earnedAt\` timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`parenting_resources\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`title\` varchar(255) NOT NULL,
        \`description\` text,
        \`type\` varchar(50) NOT NULL,
        \`content\` text,
        \`category\` varchar(100),
        \`thumbnailUrl\` text,
        \`createdAt\` timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`completed_lessons\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`studentId\` varchar(100) NOT NULL,
        \`lessonId\` varchar(100) NOT NULL,
        \`completedAt\` timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`timetable\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`classId\` varchar(100) NOT NULL,
        \`day\` varchar(50) NOT NULL,
        \`timeSlot\` varchar(100) NOT NULL,
        \`subject\` varchar(255) NOT NULL,
        \`topic\` varchar(255),
        \`teacherId\` varchar(100),
        \`room\` varchar(100),
        \`createdAt\` timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`exams\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`classId\` varchar(100) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`subject\` varchar(255) NOT NULL,
        \`examDate\` varchar(100) NOT NULL,
        \`durationMinutes\` int DEFAULT 60,
        \`totalMarks\` int DEFAULT 100,
        \`passingMarks\` int DEFAULT 40,
        \`status\` varchar(50) DEFAULT 'SCHEDULED',
        \`room\` varchar(100),
        \`createdAt\` timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`exam_results\` (
        \`id\` varchar(100) PRIMARY KEY,
        \`examId\` varchar(100) NOT NULL,
        \`studentId\` varchar(100) NOT NULL,
        \`marksObtained\` int DEFAULT 0,
        \`status\` varchar(50) DEFAULT 'GRADED',
        \`teacherFeedback\` text,
        \`gradedAt\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`createdAt\` timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `);

    try {
      await connection.query("ALTER TABLE `exams` ADD COLUMN `syllabus` text");
    } catch (e) {}

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`auditLogs\` (
        \`id\` varchar(50) NOT NULL,
        \`timestamp\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        \`actor\` varchar(100) DEFAULT NULL,
        \`role\` varchar(50) DEFAULT NULL,
        \`action\` varchar(100) DEFAULT NULL,
        \`details\` text,
        \`ip\` varchar(50) DEFAULT NULL,
        PRIMARY KEY (\`id\`)
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`admissions\` (
        \`id\` varchar(100) NOT NULL,
        \`studentName\` varchar(255) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`gradeLevel\` varchar(50) NOT NULL,
        \`status\` varchar(50) NOT NULL,
        \`appliedDate\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        \`notes\` text,
        \`parentName\` varchar(255),
        \`parentPhone\` varchar(50),
        PRIMARY KEY (\`id\`)
      );
    `);

    // Seeding logic for classes if empty or missing grades
    try {
      const [existingClasses] = await connection.query("SELECT * FROM `classes`") as any[];
      const gradesInDb = new Set(existingClasses.map((c: any) => c.gradeLevel));
      
      const missingGrades = [];
      for (let i = 1; i <= 10; i++) {
        const grade = `Grade ${i}`;
        if (!gradesInDb.has(grade)) {
          missingGrades.push(grade);
        }
      }

      if (missingGrades.length > 0) {
        console.log(`Seeding missing grades: ${missingGrades.join(", ")}`);
        for (const grade of missingGrades) {
          const id = `class_${grade.replace(" ", "_").toLowerCase()}`;
          await connection.query(`
            INSERT IGNORE INTO \`classes\` (\`id\`, \`name\`, \`subjects\`, \`gradeLevel\`, \`studentCount\`, \`schedule\`, \`room\`, \`status\`) VALUES
            ('${id}', 'Class ${grade}', '["General"]', '${grade}', 0, 'Mon-Fri', 'Room ${grade.split(" ")[1]}', 'ACTIVE')
          `);
        }
      }
    } catch (e) {
      console.error("Error seeding classes:", e);
    }

    // Seeding logic for students
    try {
      console.log("Checking and seeding students table with 5 test students...");
      const passwordHash = await bcrypt.hash("password123", 10);
      
      const seedStudents = [
        {
          id: 'stu_1',
          name: 'Aisha Rahman',
          email: 'student1@ebm.edu',
          passwordHash,
          gradeLevel: 'Grade 10',
          ebmYear: 'YEAR_1',
          performanceScore: 92,
          attendanceRate: 98,
          riskStatus: 'LOW',
          classIds: JSON.stringify(['class_grade_10'])
        },
        {
          id: 'stu_2',
          name: 'Zain Malik',
          email: 'student2@ebm.edu',
          passwordHash,
          gradeLevel: 'Grade 10',
          ebmYear: 'YEAR_1',
          performanceScore: 68,
          attendanceRate: 82,
          riskStatus: 'HIGH',
          classIds: JSON.stringify(['class_grade_10'])
        },
        {
          id: 'stu_3',
          name: 'Sarah Khan',
          email: 'student3@ebm.edu',
          passwordHash,
          gradeLevel: 'Grade 10',
          ebmYear: 'YEAR_1',
          performanceScore: 88,
          attendanceRate: 95,
          riskStatus: 'LOW',
          classIds: JSON.stringify(['class_grade_10'])
        },
        {
          id: 'stu_4',
          name: 'Omar Farooq',
          email: 'student4@ebm.edu',
          passwordHash,
          gradeLevel: 'Grade 10',
          ebmYear: 'YEAR_1',
          performanceScore: 74,
          attendanceRate: 89,
          riskStatus: 'MEDIUM',
          classIds: JSON.stringify(['class_grade_10'])
        },
        {
          id: 'stu_5',
          name: 'Fatima Syed',
          email: 'student5@ebm.edu',
          passwordHash,
          gradeLevel: 'Grade 10',
          ebmYear: 'YEAR_1',
          performanceScore: 95,
          attendanceRate: 100,
          riskStatus: 'LOW',
          classIds: JSON.stringify(['class_grade_10'])
        },
        {
          id: 'student-1',
          name: 'Imran Khan',
          email: 'student@ebm.edu',
          passwordHash,
          gradeLevel: 'Grade 1',
          ebmYear: 'YEAR_1',
          performanceScore: 85,
          attendanceRate: 100,
          riskStatus: 'LOW',
          classIds: JSON.stringify(['class_grade_1']),
          parentEmail: 'parent@ebm.edu'
        },
        {
          id: 'student-3',
          name: 'Zoya Malik',
          email: 'student3@ebm.edu',
          passwordHash,
          gradeLevel: 'Grade 3',
          ebmYear: 'YEAR_3',
          performanceScore: 90,
          attendanceRate: 99,
          riskStatus: 'LOW',
          classIds: JSON.stringify(['class_grade_3']),
          parentEmail: null
        },
        {
          id: 'parent-1',
          name: 'Amjad Khan',
          email: 'parent@ebm.edu',
          passwordHash,
          gradeLevel: 'PARENT',
          ebmYear: null,
          performanceScore: null,
          attendanceRate: null,
          riskStatus: null,
          classIds: JSON.stringify([]),
          parentEmail: null
        }
      ];

      for (const s of seedStudents) {
        const [existing] = await connection.query("SELECT id FROM `students` WHERE `id` = ? OR `email` = ?", [s.id, s.email]) as any[];
        if (!existing || existing.length === 0) {
          console.log(`Seeding student/parent: ${s.name}`);
          await connection.query(
            "INSERT IGNORE INTO `students` (`id`, `name`, `email`, `passwordHash`, `gradeLevel`, `ebmYear`, `performanceScore`, `attendanceRate`, `riskStatus`, `classIds`, `parentEmail`, `lastActive`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
            [s.id, s.name, s.email, s.passwordHash, s.gradeLevel, s.ebmYear, s.performanceScore, s.attendanceRate, s.riskStatus, s.classIds, (s as any).parentEmail || null]
          );
        }
      }
    } catch (e) {
      console.error("Error seeding students:", e);
    }

    // Seeding logic for teachers
    try {
      console.log("Checking and seeding teachers table...");
      const passwordHash = await bcrypt.hash("password123", 10);
      const seedTeachers = [
        {
          id: "tea_1",
          name: "Dr. Arshad Khan",
          email: "arshad.k@ebm.edu",
          passwordHash,
          department: "Science",
          title: "Senior Physics Instructor",
          classIds: JSON.stringify(["class_grade_10"]),
        },
        {
          id: "tea_2",
          name: "Ms. Hiba Malik",
          email: "hiba.m@ebm.edu",
          passwordHash,
          department: "Mathematics",
          title: "Algebra Professor",
          classIds: JSON.stringify(["class_grade_10"]),
        },
        {
          id: "teacher-1",
          name: "Professor Bukhari",
          email: "teacher@ebm.edu",
          passwordHash,
          department: "General",
          title: "Lead Educator",
          classIds: JSON.stringify(["class_grade_1", "class_grade_10"]),
        },
      ];

      for (const t of seedTeachers) {
        const [existing] = await connection.query("SELECT id FROM `teachers` WHERE `id` = ? OR `email` = ?", [t.id, t.email]) as any[];
        if (!existing || existing.length === 0) {
          console.log(`Seeding teacher: ${t.name}`);
          await connection.query(
            "INSERT IGNORE INTO `teachers` (`id`, `name`, `email`, `passwordHash`, `department`, `title`, \`classIds\`) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [t.id, t.name, t.email, t.passwordHash, t.department, t.title, t.classIds]
          );
        }
      }
    } catch (e) {
      console.error("Error seeding teachers:", e);
    }

    // Seeding logic for assignments and submissions
    try {
      console.log("Checking and seeding assignments and submissions...");
      
      const seedAssignments = [
        {
          id: 'asn_1',
          title: 'Kinematics Worksheet 1',
          description: 'Basic introduction to velocity and acceleration vectors.',
          classId: 'class_grade_10',
          dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
          status: 'PUBLISHED'
        },
        {
          id: 'asn_2',
          title: 'Forces & Newton\'s Laws',
          description: 'Problems involving F=ma and frictional forces on inclined planes.',
          classId: 'class_grade_10',
          dueDate: new Date(Date.now() + 86400000 * 7).toISOString(),
          status: 'PUBLISHED'
        }
      ];

      for (const a of seedAssignments) {
        const [existing] = await connection.query("SELECT id FROM `assignments` WHERE `id` = ?", [a.id]) as any[];
        if (!existing || existing.length === 0) {
          console.log(`Seeding assignment: ${a.title}`);
          await connection.query(
            "INSERT IGNORE INTO `assignments` (`id`, `title`, `description`, `classId`, `dueDate`, `status`) VALUES (?, ?, ?, ?, ?, ?)",
            [a.id, a.title, a.description, a.classId, a.dueDate, a.status]
          );
        }
      }

      const seedSubmissions = [
        {
          id: 'sub_1',
          studentId: 'stu_1',
          studentName: 'Aisha Rahman',
          classId: 'class_grade_10',
          assignmentId: 'asn_1',
          type: 'ASSIGNMENT',
          content: 'Velocity is a vector quantity that includes both speed and direction. Acceleration is the rate of change of velocity.',
          submittedAt: new Date().toISOString(),
          status: 'SUBMITTED'
        },
        {
          id: 'sub_2',
          studentId: 'stu_2',
          studentName: 'Zain Malik',
          classId: 'class_grade_10',
          assignmentId: 'asn_1',
          type: 'ASSIGNMENT',
          content: 'I have completed the worksheet. Acceleration was calculated using v-u/t.',
          submittedAt: new Date().toISOString(),
          status: 'SUBMITTED'
        }
      ];

      for (const s of seedSubmissions) {
        const [existing] = await connection.query("SELECT id FROM `submissions` WHERE `id` = ?", [s.id]) as any[];
        if (!existing || existing.length === 0) {
          console.log(`Seeding submission for: ${s.studentName}`);
          await connection.query(
            "INSERT IGNORE INTO `submissions` (`id`, `studentId`, `studentName`, `classId`, `assignmentId`, `type`, `content`, `submittedAt`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [s.id, s.studentId, s.studentName, s.classId, s.assignmentId, s.type, s.content, s.submittedAt, s.status]
          );
        }
      }
    } catch (e) {
      console.error("Error seeding assignments/submissions:", e);
    }

    // Seeding default global announcement bar
    try {
      const [existing] = await connection.query("SELECT id FROM `global_announcement_bar` WHERE `id` = 'global_bar'") as any[];
      if (!existing || existing.length === 0) {
        console.log("Seeding default global announcement bar");
        await connection.query(`
          INSERT INTO \`global_announcement_bar\` (\`id\`, \`text\`, \`ctaText\`, \`ctaUrl\`, \`isActive\`, \`targetRole\`, \`scheduledStart\`, \`scheduledUntil\`)
          VALUES ('global_bar', 'Admissions Open for Session 2026 — Start your Grade 5 to O Level Journey Today!', 'Apply Now', '#pricing', 1, 'ALL', '', '')
        `);
      }
    } catch (e) {
      console.error("Error seeding global announcement bar:", e);
    }

    // Create featured_journeys table
    try {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS \`featured_journeys\` (
          \`id\` varchar(100) PRIMARY KEY,
          \`name\` varchar(255) NOT NULL,
          \`avatarUrl\` text,
          \`currentGrade\` varchar(255) NOT NULL,
          \`previousSchool\` varchar(255) NOT NULL,
          \`goals\` json NOT NULL,
          \`challenges\` json NOT NULL,
          \`journey\` text NOT NULL,
          \`achievements\` json NOT NULL,
          \`favouriteSubject\` varchar(255) NOT NULL,
          \`favouriteAITool\` varchar(255) NOT NULL,
          \`futureDream\` varchar(255) NOT NULL,
          \`parentComment\` text NOT NULL,
          \`teacherComment\` text NOT NULL,
          \`createdAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("featured_journeys table ready or created");
    } catch (e) {
      console.error("Error creating featured_journeys table:", e);
    }

    // Seed default featured journeys if none exist
    try {
      const [existingJourneys] = await connection.query("SELECT id FROM `featured_journeys` LIMIT 1") as any[];
      if (!existingJourneys || existingJourneys.length === 0) {
        console.log("Seeding default student journeys into featured_journeys...");
        const journeysToSeed = [
          {
            id: "story-1",
            name: "Aisha Al-Mansoor",
            avatarUrl: "",
            currentGrade: "O Level / Grade 11",
            previousSchool: "Standard Academy (Private)",
            goals: JSON.stringify(["A* in Additional Mathematics", "Admission to MIT", "Master AI Engineering"]),
            challenges: JSON.stringify(["Severely anxious during timed examinations", "Struggled to connect abstract formulas to real-world applications"]),
            journey: "Aisha struggled with Additional Math formulas, viewing them as purely memorized steps. On EBM, she engaged with interactive 3D graphs and consulted the Socratic AI Tutor to break down multi-step calculus. Step-by-step guidance rewired her approach from memorization to logical derivation.",
            achievements: JSON.stringify(["Achieved raw score of 98/100 in O Level Mathematics Mock exam", "Earned EBM Mathematics Scholar Medal", "Designed a custom web simulation for mechanics"]),
            favouriteSubject: "Additional Mathematics",
            favouriteAITool: "Socratic Equation Decomposer",
            futureDream: "Robotics and AI Researcher at NASA",
            parentComment: "Aisha went from crying over algebra papers to teaching our younger son geometry. The confidence change is breathtaking.",
            teacherComment: "Aisha now looks at equations as puzzles to solve rather than formulas to memorize. She is an exceptional mathematical thinker."
          },
          {
            id: "story-2",
            name: "Brandon Vance",
            avatarUrl: "",
            currentGrade: "O Level / Grade 10",
            previousSchool: "City Central Secondary School",
            goals: JSON.stringify(["Boost Chemistry grade from D to A*", "Build an outstanding science portfolio"]),
            challenges: JSON.stringify(["Inattentive in large conventional classes", "Failed to grasp molecular bonding concepts through standard textbook visuals"]),
            journey: "Brandon was easily distracted in a class of 30. EBM's modular, bite-sized curriculum and instant gamified feedback loop captured his attention. He used the organic chemistry 3D visualizers to interactively manipulate chemical structures and utilized AI to simulate lab experiments safely.",
            achievements: JSON.stringify(["Boosted performance from 42% to 91% within 5 months of joining EBM", "Won 1st Place in the Regional Chemistry Olympiad", "Accumulated a 120-day persistent learning streak"]),
            favouriteSubject: "Organic & Physical Chemistry",
            favouriteAITool: "Molecular Reaction Simulator",
            futureDream: "Cardiothoracic Surgeon & Medical Innovator",
            parentComment: "We tried three private tutors and saw no change. EBM's system hooked him instantly. He doesn't need to be nagged to study anymore.",
            teacherComment: "Brandon's analytical skills are superb. He utilizes the Socratic tutor to test hypotheses before completing physical assignments."
          },
          {
            id: "story-3",
            name: "Maya Lin",
            avatarUrl: "",
            currentGrade: "O Level / Grade 11",
            previousSchool: "Beacon International School",
            goals: JSON.stringify(["Overcome severe physics anxiety", "Perfect her analytical essay writing skills"]),
            challenges: JSON.stringify(["Excellent at humanities, but had massive mental block against physics calculations", "Lack of structured diagnostic tools to isolate missing concepts"]),
            journey: "Maya was convinced she lacked the 'math brain'. EBM's diagnostic engine pinpointed that her struggle was not with physics, but with standard fractions and vector manipulation. After 3 targeted mini-drills, physics concepts suddenly clicked.",
            achievements: JSON.stringify(["Achieved a straight A* in O Level Physics", "Published a physics-themed essay in the EBM Scholar Journal", "Perfect score in the Mechanics and Dynamics assessment"]),
            favouriteSubject: "Thermal & Classical Physics",
            favouriteAITool: "Math Pre-requisite Diagnostic Engine",
            futureDream: "Environmental Architect & Sustainability Designer",
            parentComment: "EBM removed the fear of failure. Maya learned that math was just a skill she hadn't practiced correctly, not an innate talent she lacked.",
            teacherComment: "Maya's written analyses of thermal systems show a brilliant synthesis of logic and description. She is exceptionally well-prepared."
          }
        ];

        for (const journey of journeysToSeed) {
          await connection.query(`
            INSERT INTO \`featured_journeys\` 
            (\`id\`, \`name\`, \`avatarUrl\`, \`currentGrade\`, \`previousSchool\`, \`goals\`, \`challenges\`, \`journey\`, \`achievements\`, \`favouriteSubject\`, \`favouriteAITool\`, \`futureDream\`, \`parentComment\`, \`teacherComment\`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            journey.id,
            journey.name,
            journey.avatarUrl,
            journey.currentGrade,
            journey.previousSchool,
            journey.goals,
            journey.challenges,
            journey.journey,
            journey.achievements,
            journey.favouriteSubject,
            journey.favouriteAITool,
            journey.futureDream,
            journey.parentComment,
            journey.teacherComment
          ]);
        }
        console.log("Successfully seeded 3 default featured journeys into DB");
      }
    } catch (e) {
      console.error("Error seeding featured_journeys:", e);
    }

    // Create parent_testimonials table
    try {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS \`parent_testimonials\` (
          \`id\` varchar(100) PRIMARY KEY,
          \`name\` varchar(255) NOT NULL,
          \`occupation\` varchar(255) NOT NULL,
          \`childGrade\` varchar(255) NOT NULL,
          \`rating\` int NOT NULL DEFAULT 5,
          \`review\` text NOT NULL,
          \`location\` varchar(255) NOT NULL,
          \`childrenEnrolled\` int NOT NULL DEFAULT 1,
          \`createdAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("parent_testimonials table ready or created");
    } catch (e) {
      console.error("Error creating parent_testimonials table:", e);
    }

    // Seed default parent testimonials if none exist
    try {
      const [existingTestimonials] = await connection.query("SELECT id FROM `parent_testimonials` LIMIT 1") as any[];
      if (!existingTestimonials || existingTestimonials.length === 0) {
        console.log("Seeding default parent testimonials into parent_testimonials...");
        const testimonialsToSeed = [
          {
            id: "parent-1",
            name: "Dr. Robert Chen",
            occupation: "Senior Consultant Cardiologist",
            childGrade: "Grade 11 (O Level Mathematics & Biology)",
            rating: 5,
            review: "As a physician, I value evidence-based methods. EBM's diagnostic analytics are incredibly rigorous. It doesn't just say 'study more'; it shows exactly which sub-concepts my son is struggling with. His scores moved from B to a strong A* in under a semester.",
            location: "Singapore",
            childrenEnrolled: 2
          },
          {
            id: "parent-2",
            name: "Sarah Jenkins",
            occupation: "Software Engineering Director",
            childGrade: "Grade 10 (O Level Science & English)",
            rating: 5,
            review: "The integration of Socratic AI is flawless. Unlike other platforms that just give answers, EBM guides my daughter to find the answer herself. She is developing real critical thinking skills instead of just rote memorization. Highly recommended for parents who care about long-term growth.",
            location: "London, UK",
            childrenEnrolled: 1
          },
          {
            id: "parent-3",
            name: "Fatimah Al-Mutawa",
            occupation: "Educational Psychologist",
            childGrade: "Grade 11 (O Level Chemistry & Physics)",
            rating: 5,
            review: "I was skeptical about another digital platform, but EBM's instructional design is flawless. The cognitive load is perfectly balanced, the feedback is immediate, and the gamified progression is genuinely motivating. It builds deep focus without the dopamine fatigue of cheap study games.",
            location: "Dubai, UAE",
            childrenEnrolled: 2
          },
          {
            id: "parent-4",
            name: "Marcus Thorne",
            occupation: "Managing Director, Thorne Investments",
            childGrade: "Grade 9 (Pre-O Level Science Foundations)",
            rating: 5,
            review: "The EBM parent portal is magnificent. I get actionable weekly reports detailing study habits, mastery percentages, and immediate action items. No more guessing how my kids are doing or waiting for parent-teacher conferences. I can support them dynamically.",
            location: "Cape Town, South Africa",
            childrenEnrolled: 3
          }
        ];

        for (const t of testimonialsToSeed) {
          await connection.query(`
            INSERT INTO \`parent_testimonials\` 
            (\`id\`, \`name\`, \`occupation\`, \`childGrade\`, \`rating\`, \`review\`, \`location\`, \`childrenEnrolled\`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `, [t.id, t.name, t.occupation, t.childGrade, t.rating, t.review, t.location, t.childrenEnrolled]);
        }
        console.log("Successfully seeded default parent testimonials into DB");
      }
    } catch (e) {
      console.error("Error seeding parent_testimonials:", e);
    }
    
    // Create branding_settings table
    try {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS \`branding_settings\` (
          \`id\` varchar(100) PRIMARY KEY,
          \`logoText\` varchar(255) NOT NULL,
          \`logoType\` varchar(50) NOT NULL,
          \`logoIcon\` varchar(100),
          \`logoImageUrl\` text,
          \`faviconUrl\` text,
          \`heroBackgroundImage\` text,
          \`heroSlides\` json,
          \`showThemeToggle\` int DEFAULT 1,
          \`updatedAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `);
      
      // Check and add column if not existing
      try {
        await connection.query(`ALTER TABLE \`branding_settings\` ADD COLUMN \`heroBackgroundImage\` text`);
      } catch (colErr) {
        // column already exists
      }
      
      console.log("branding_settings table ready or created");
    } catch (e) {
      console.error("Error creating branding_settings table:", e);
    }

    // Seed default branding settings if none exist
    try {
      const [existingBranding] = await connection.query("SELECT id FROM `branding_settings` WHERE `id` = 'current'") as any[];
      if (!existingBranding || existingBranding.length === 0) {
        console.log("Seeding default branding settings into branding_settings...");
        let brandingData = {
          logoText: "EBM Digital Learning",
          logoType: "icon",
          logoIcon: "GraduationCap",
          logoImageUrl: "",
          faviconUrl: "https://cdn-icons-png.flaticon.com/512/2201/2201552.png",
          heroBackgroundImage: "",
          heroSlides: JSON.stringify([
            {
              id: "slide-1",
              title: "Start Your O-Level Journey Today",
              subtitle: "Accelerated 3-year structured paths guided by the Ejaz Bukhari Method learning methodology.",
              ctaText: "Start Learning Now",
              ctaUrl: "auth-login",
              imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
            },
            {
              id: "slide-2",
              title: "AI-Powered Socratic Tutoring",
              subtitle: "Continuous diagnostics, custom study plans, and live chat co-pilots helping students build elite STEM confidence.",
              ctaText: "Explore Education",
              ctaUrl: "roadmap",
              imageUrl: "/src/assets/images/academic_portal_mockup_1784360050225.jpg"
            },
            {
              id: "slide-3",
              title: "Parent Dashboard & Live Analytics",
              subtitle: "Real-time cognitive progress, detailed class attendance, and direct mentor alignment tracking.",
              ctaText: "Contact Admissions",
              ctaUrl: "contact",
              imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop"
            }
          ]),
          showThemeToggle: 1
        };

        // Try to load from json file if it exists
        const jsonPath = path.join(process.cwd(), "src/db/branding-settings.json");
        if (fs.existsSync(jsonPath)) {
          try {
            const fileData = fs.readFileSync(jsonPath, "utf-8");
            const parsed = JSON.parse(fileData);
            brandingData = {
              logoText: parsed.logoText || brandingData.logoText,
              logoType: parsed.logoType || brandingData.logoType,
              logoIcon: parsed.logoIcon || brandingData.logoIcon,
              logoImageUrl: parsed.logoImageUrl || brandingData.logoImageUrl,
              faviconUrl: parsed.faviconUrl || brandingData.faviconUrl,
              heroBackgroundImage: parsed.heroBackgroundImage || brandingData.heroBackgroundImage,
              heroSlides: parsed.heroSlides ? JSON.stringify(parsed.heroSlides) : brandingData.heroSlides,
              showThemeToggle: parsed.showThemeToggle === false ? 0 : 1
            };
          } catch (err) {
            console.error("Failed to read branding-settings.json fallback in seed:", err);
          }
        }

        await connection.query(`
          INSERT INTO \`branding_settings\` 
          (\`id\`, \`logoText\`, \`logoType\`, \`logoIcon\`, \`logoImageUrl\`, \`faviconUrl\`, \`heroBackgroundImage\`, \`heroSlides\`, \`showThemeToggle\`)
          VALUES ('current', ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          brandingData.logoText,
          brandingData.logoType,
          brandingData.logoIcon,
          brandingData.logoImageUrl,
          brandingData.faviconUrl,
          brandingData.heroBackgroundImage,
          brandingData.heroSlides,
          brandingData.showThemeToggle
        ]);
        console.log("Successfully seeded default branding settings into DB");
      }
    } catch (e) {
      console.error("Error seeding branding_settings:", e);
    }
    
    // Create blog tables
    try {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS \`blog_categories\` (
          \`id\` varchar(100) PRIMARY KEY,
          \`name\` varchar(255) NOT NULL,
          \`slug\` varchar(255) NOT NULL,
          \`description\` text,
          \`seoTitle\` varchar(255),
          \`seoDescription\` text,
          \`color\` varchar(50),
          \`icon\` varchar(100),
          \`createdAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      await connection.query(`
        CREATE TABLE IF NOT EXISTS \`blog_authors\` (
          \`id\` varchar(100) PRIMARY KEY,
          \`name\` varchar(255) NOT NULL,
          \`slug\` varchar(255) NOT NULL,
          \`bio\` text,
          \`role\` varchar(255),
          \`avatarUrl\` text,
          \`email\` varchar(255),
          \`socialLinks\` json,
          \`createdAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      await connection.query(`
        CREATE TABLE IF NOT EXISTS \`blog_posts\` (
          \`id\` varchar(100) PRIMARY KEY,
          \`title\` varchar(500) NOT NULL,
          \`slug\` varchar(500) NOT NULL,
          \`excerpt\` text,
          \`content\` text NOT NULL,
          \`categoryId\` varchar(100) NOT NULL,
          \`secondaryCategoryIds\` json,
          \`featuredImage\` text,
          \`featuredImageAlt\` text,
          \`featuredImageCaption\` text,
          \`authorId\` varchar(100),
          \`status\` varchar(50) NOT NULL DEFAULT 'draft',
          \`isFeatured\` int NOT NULL DEFAULT 0,
          \`publishedAt\` timestamp NULL,
          \`updatedAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          \`createdAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
          \`seoTitle\` varchar(500),
          \`seoDescription\` text,
          \`ogImage\` text,
          \`canonicalUrl\` text,
          \`readingTime\` int DEFAULT 5,
          \`tags\` json,
          \`relatedPostIds\` json,
          \`noindex\` int DEFAULT 0,
          \`views\` int DEFAULT 0,
          \`ctaType\` varchar(50),
          \`ctaLink\` text,
          \`ctaText\` varchar(255)
        );
      `);
      await connection.query(`
        CREATE TABLE IF NOT EXISTS \`blog_redirects\` (
          \`id\` varchar(100) PRIMARY KEY,
          \`sourceSlug\` varchar(500) NOT NULL,
          \`targetSlug\` varchar(500) NOT NULL,
          \`statusCode\` int NOT NULL DEFAULT 301,
          \`createdAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("Blog schema tables ready or created");
    } catch (e) {
      console.error("Error creating blog schema tables:", e);
    }
    
    connection.release();
    
    db = drizzle(pool, { schema, mode: 'default' });
    return db;
  } catch (error: any) {
    console.error("MySQL connection error:", error);
    throw new Error(`Failed to connect to database: ${error.message}`);
  }
}

export async function getDb() {
  if (db) return db;
  if (!dbPromise) {
    dbPromise = initializeDb().catch(err => {
      dbPromise = null;
      throw err;
    });
  }
  return dbPromise;
}
