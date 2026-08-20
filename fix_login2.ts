import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

const loginRoute = `app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const db = await getDb();
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
    
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email?.toLowerCase());
    if (foundUser) {
      const token = \`ebm-token-jwt-\${foundUser.id}-\${Date.now()}\`;
      return res.json({
        success: true,
        user: foundUser,
        token
      });
    }
    
    return res.status(401).json({ success: false, error: "Invalid credentials." });
  } catch(e) {
    console.error("Login error:", e);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});`;

// Replace from app.post("/api/auth/login", up to the next app.get
content = content.replace(/app\.post\("\/api\/auth\/login", async \(req, res\) => \{[\s\S]*?\}\);\s*\} else \{\s*res\.status\(401\)\.json\(\{.*?\}\);\s*\}\s*\}\);/, loginRoute);

fs.writeFileSync('server.ts', content);
