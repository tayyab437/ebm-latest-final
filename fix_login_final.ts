import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

// Find the index of app.post("/api/auth/login"
const loginIdx = content.indexOf('app.post("/api/auth/login"');
// Find the next route after me, which is app.get("/api/teacher/classes"
const nextRouteIdx = content.indexOf('app.get("/api/teacher/classes"');

if (loginIdx !== -1 && nextRouteIdx !== -1) {
  const before = content.substring(0, loginIdx);
  const after = content.substring(nextRouteIdx);
  
  const newRoutes = `app.post("/api/auth/login", async (req, res) => {
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
});

app.get("/api/auth/me", async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ success: false, error: "No authorization token provided" });
  }
  
  const withoutPrefix = token.replace("ebm-token-jwt-", "");
  const lastDashIdx = withoutPrefix.lastIndexOf("-");
  const userId = lastDashIdx > 0 ? withoutPrefix.substring(0, lastDashIdx) : null;
  
  if (!userId) {
    return res.status(401).json({ success: false, error: "Invalid token format" });
  }

  const mockUser = mockUsers.find(u => u.id === userId);
  if (mockUser) {
    return res.json({ success: true, user: mockUser });
  }

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
});

`;

  fs.writeFileSync('server.ts', before + newRoutes + after);
}
