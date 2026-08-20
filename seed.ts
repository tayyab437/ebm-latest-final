import { getDb } from "./src/db/index.js";
import * as schema from "./src/db/schema.js";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
  console.log("Starting database seeding...");
  try {
    const db = await getDb();

    // Insert Classes
    const demoClasses = [
      {
        id: "class_1",
        name: "Physics 101",
        subject: "Physics",
        gradeLevel: "Grade 10",
        studentCount: 5,
        schedule: "Mon, Wed, Fri",
        room: "Lab 2",
        status: "ACTIVE"
      },
      {
        id: "class_2",
        name: "Calculus",
        subject: "Mathematics",
        gradeLevel: "Grade 11",
        studentCount: 5,
        schedule: "Tue, Thu",
        room: "Room 104",
        status: "ACTIVE"
      }
    ];

    // Delete existing demo data
    await db.delete(schema.students);
    await db.delete(schema.classes);
    await db.delete(schema.assignments);

    console.log("Cleared old data.");

    for (const c of demoClasses) {
      await db.insert(schema.classes).values(c);
    }
    console.log("Classes seeded.");

    // Insert Students
    const demoStudents = [
      { id: "student-1", name: "Alice Smith", email: "alice@example.com", gradeLevel: "Grade 10", performanceScore: 92, attendanceRate: 98, riskStatus: "LOW", classIds: ["class_1"], lastActive: new Date() },
      { id: "student-2", name: "Bob Jones", email: "bob@example.com", gradeLevel: "Grade 10", performanceScore: 78, attendanceRate: 85, riskStatus: "MEDIUM", classIds: ["class_1", "class_2"], lastActive: new Date() },
      { id: "student-3", name: "Charlie Brown", email: "charlie@example.com", gradeLevel: "Grade 10", performanceScore: 88, attendanceRate: 95, riskStatus: "LOW", classIds: ["class_1"], lastActive: new Date() },
      { id: "student-4", name: "Diana Prince", email: "diana@example.com", gradeLevel: "Grade 10", performanceScore: 99, attendanceRate: 100, riskStatus: "LOW", classIds: ["class_1", "class_2"], lastActive: new Date() },
      { id: "student-5", name: "Evan Wright", email: "evan@example.com", gradeLevel: "Grade 10", performanceScore: 65, attendanceRate: 75, riskStatus: "HIGH", classIds: ["class_1"], lastActive: new Date() },
      { id: "student-6", name: "Fiona Gallagher", email: "fiona@example.com", gradeLevel: "Grade 11", performanceScore: 91, attendanceRate: 96, riskStatus: "LOW", classIds: ["class_2"], lastActive: new Date() },
      { id: "student-7", name: "George Miller", email: "george@example.com", gradeLevel: "Grade 11", performanceScore: 84, attendanceRate: 90, riskStatus: "LOW", classIds: ["class_2", "class_1"], lastActive: new Date() },
      { id: "student-8", name: "Hannah Abbott", email: "hannah@example.com", gradeLevel: "Grade 11", performanceScore: 72, attendanceRate: 82, riskStatus: "MEDIUM", classIds: ["class_2"], lastActive: new Date() },
      { id: "student-9", name: "Ian Malcolm", email: "ian@example.com", gradeLevel: "Grade 11", performanceScore: 95, attendanceRate: 99, riskStatus: "LOW", classIds: ["class_2"], lastActive: new Date() },
      { id: "student-10", name: "Julia Roberts", email: "julia@example.com", gradeLevel: "Grade 11", performanceScore: 58, attendanceRate: 70, riskStatus: "HIGH", classIds: ["class_2"], lastActive: new Date() }
    ];

    for (const s of demoStudents) {
      await db.insert(schema.students).values(s);
    }
    console.log("Students seeded.");

    const demoAssignments = [
      { id: "asn_1", title: "Kinematics Worksheet", description: "Complete problems 1-15", classId: "class_1", dueDate: new Date(Date.now() + 86400000 * 3), status: "PUBLISHED" },
      { id: "asn_2", title: "Derivatives Practice", description: "Solve all problems in chapter 4", classId: "class_2", dueDate: new Date(Date.now() + 86400000 * 5), status: "PUBLISHED" }
    ];

    for (const a of demoAssignments) {
      await db.insert(schema.assignments).values(a);
    }
    console.log("Assignments seeded.");

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
