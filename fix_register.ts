import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

const authLogic = `
import bcrypt from 'bcryptjs';

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role, ebmYear } = req.body;
    const db = await getDb();
    
    // Check if user exists
    const existing = await db.select().from(schema.students).where(eq(schema.students.email, email.toLowerCase()));
    if (existing.length > 0) {
      return res.status(400).json({ success: false, error: "Email already in use." });
    }
    
    // Only handling STUDENT role database insertion for now
    if (role === 'STUDENT') {
      const hashedPassword = await bcrypt.hash(password, 10);
      const studentId = "usr-" + Date.now();
      
      await db.insert(schema.students).values({
        id: studentId,
        name,
        email: email.toLowerCase(),
        passwordHash: hashedPassword,
        gradeLevel: ebmYear || "YEAR_1",
      });
      
      const token = \`ebm-token-jwt-\${studentId}-\${Date.now()}\`;
      return res.json({
        success: true,
        user: { id: studentId, name, email, role: 'STUDENT', ebmYear },
        token
      });
    } else {
      // Mock for other roles
      const mockId = "usr-" + Date.now();
      const token = \`ebm-token-jwt-\${mockId}-\${Date.now()}\`;
      return res.json({
        success: true,
        user: { id: mockId, name, email, role },
        token
      });
    }
  } catch(e) {
    console.error("Register error:", e);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});
`;

// Insert the register route right before app.post("/api/auth/login"
const loginStr = 'app.post("/api/auth/login"';
if (content.includes(loginStr)) {
  content = content.replace(loginStr, authLogic + '\n' + loginStr);
  
  // Update the login route to verify password
  const oldLoginRegex = /app\.post\("\/api\/auth\/login", async \(req, res\) => \{[\s\S]*?dbStudents\.length > 0\) \{[\s\S]*?const student = dbStudents\[0\];/;
  const newLogin = `app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const db = await getDb();
    const dbStudents = await db.select().from(schema.students).where(eq(schema.students.email, email?.toLowerCase()));
    if (dbStudents.length > 0) {
      const student = dbStudents[0];
      
      // Verify password if hash exists
      if (student.passwordHash) {
        const isValid = await bcrypt.compare(password, student.passwordHash);
        if (!isValid) {
          return res.status(401).json({ success: false, error: "Invalid credentials." });
        }
      }`;
      
  content = content.replace(oldLoginRegex, newLogin);
  
  fs.writeFileSync('server.ts', content);
  console.log("Added register endpoint and updated login");
} else {
  console.log("Could not find login endpoint to replace");
}
