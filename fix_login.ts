import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

const loginRoute = `app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const db = await getDb();
    // 1. Check database for students
    const dbStudents = await db.select().from(schema.students).where(eq(schema.students.email, email?.toLowerCase()));
    if (dbStudents.length > 0) {
      const student = dbStudents[0];
      const token = \`ebm-token-jwt-\${student.id}-\${Date.now()}\`;
      return res.json({
        success: true,
        user: {
          id: student.id,
          name: student.name,
          email: student.email,
          role: "STUDENT",
          ebmYear: "YEAR_1",
        },
        token
      });
    }
    
    // 2. Fallback to mock users (teachers, admins, etc)
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email?.toLowerCase());
    if (foundUser) {
      const token = \`ebm-token-jwt-\${foundUser.id}-\${Date.now()}\`;
      return res.json({
        success: true,
        user: foundUser,
        token
      });
    }
    
    return res.status(401).json({ success: false, error: "Invalid credentials. Ensure the email exists in the database." });
  } catch(e) {
    console.error("Login error:", e);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});`;

const meRoute = `app.get("/api/auth/me", async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ success: false, error: "No authorization token provided" });
  }
  
  // Extract user id from mock JWT token (format: ebm-token-jwt-{id}-{timestamp})
  const parts = token.split('-');
  // Since format is ebm-token-jwt-ID-TIMESTAMP, id could have hyphens too.
  // The easiest way is to use regex or substring. ebm-token-jwt- is 14 chars.
  // Actually, parts[3] might be just the first part of ID. Let's do string replacement.
  const withoutPrefix = token.replace("ebm-token-jwt-", "");
  const lastDashIdx = withoutPrefix.lastIndexOf("-");
  const userId = lastDashIdx > 0 ? withoutPrefix.substring(0, lastDashIdx) : null;
  
  if (!userId) {
    return res.status(401).json({ success: false, error: "Invalid token format" });
  }

  // 1. Check mock users
  const mockUser = mockUsers.find(u => u.id === userId);
  if (mockUser) {
    return res.json({ success: true, user: mockUser });
  }

  // 2. Check DB
  try {
    const db = await getDb();
    const dbStudents = await db.select().from(schema.students).where(eq(schema.students.id, userId));
    if (dbStudents.length > 0) {
      const student = dbStudents[0];
      return res.json({
        success: true,
        user: {
          id: student.id,
          name: student.name,
          email: student.email,
          role: "STUDENT",
          ebmYear: "YEAR_1",
        }
      });
    }
  } catch(e) {
    console.error("Auth me error:", e);
  }

  return res.status(401).json({ success: false, error: "Invalid or expired token" });
});`;

content = content.replace(/app\.post\("\/api\/auth\/login", \(req, res\) => \{[\s\S]*?\}\);/, loginRoute);
content = content.replace(/app\.get\("\/api\/auth\/me", \(req, res\) => \{[\s\S]*?\}\);/, meRoute);

fs.writeFileSync('server.ts', content);
