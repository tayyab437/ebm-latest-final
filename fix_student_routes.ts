import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

const missingRoutes = `

// --- RESTORED STUDENT ROUTES ---

app.get("/api/student/dashboard", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  
  // Extract user id from mock JWT token
  let userId = "student-1";
  if (token) {
    const withoutPrefix = token.replace("ebm-token-jwt-", "");
    const lastDashIdx = withoutPrefix.lastIndexOf("-");
    if (lastDashIdx > 0) userId = withoutPrefix.substring(0, lastDashIdx);
  }
  
  if (!studentDashboardState[userId]) {
    const onboardingState = studentOnboardingState ? studentOnboardingState[userId] : null;
    studentDashboardState[userId] = {
      ...MOCK_DASHBOARD_DATA,
      studentName: onboardingState?.profile?.preferredName || MOCK_DASHBOARD_DATA.studentName,
      currentGrade: onboardingState?.academic?.currentGrade || MOCK_DASHBOARD_DATA.currentGrade
    };
  }
  
  res.json({ success: true, data: studentDashboardState[userId] });
});

app.put("/api/student/dashboard", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  let userId = "student-1";
  if (token) {
    const withoutPrefix = token.replace("ebm-token-jwt-", "");
    const lastDashIdx = withoutPrefix.lastIndexOf("-");
    if (lastDashIdx > 0) userId = withoutPrefix.substring(0, lastDashIdx);
  }
  
  const updates = req.body;
  if (!studentDashboardState[userId]) {
    studentDashboardState[userId] = { ...MOCK_DASHBOARD_DATA };
  }
  
  studentDashboardState[userId] = {
    ...studentDashboardState[userId],
    ...updates
  };
  
  res.json({ success: true, message: "Dashboard updated" });
});

app.post("/api/student/onboarding", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  let userId = "student-1";
  if (token) {
    const withoutPrefix = token.replace("ebm-token-jwt-", "");
    const lastDashIdx = withoutPrefix.lastIndexOf("-");
    if (lastDashIdx > 0) userId = withoutPrefix.substring(0, lastDashIdx);
  }
  
  if (typeof studentOnboardingState !== 'undefined') {
    studentOnboardingState[userId] = req.body;
  }
  
  res.json({ success: true });
});

app.get("/api/student/planner", (req, res) => {
  res.json({ success: true, tasks: dailyTasks });
});

app.post("/api/student/planner/toggle", (req, res) => {
  const { id } = req.body;
  const task = dailyTasks.find(t => t.id === id);
  if (task) {
    task.status = task.status === "COMPLETED" ? "PENDING" : "COMPLETED";
    res.json({ success: true, task });
  } else {
    res.status(404).json({ success: false, error: "Not found" });
  }
});

app.post("/api/student/planner/add", (req, res) => {
  const newTask = {
    id: "task_" + Date.now(),
    title: req.body.title || "New Task",
    description: req.body.description || "",
    subject: req.body.subject || "General",
    type: req.body.type || "PRACTICE",
    status: "PENDING",
    estimatedMinutes: req.body.estimatedMinutes || 15,
    date: req.body.date || new Date().toISOString().split('T')[0]
  };
  dailyTasks.push(newTask);
  res.json({ success: true, task: newTask });
});

// ---------------------------------

`;

const targetStr = '    app.get("*", (req, res) => {';
if (content.includes(targetStr)) {
  content = content.replace(targetStr, missingRoutes + targetStr);
  fs.writeFileSync('server.ts', content);
  console.log("Restored missing routes!");
} else {
  console.log("Could not find insertion point.");
}
