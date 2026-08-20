import fs from 'fs';

let am = fs.readFileSync('src/components/teacher/AssignmentManager.tsx', 'utf8');
am = am.replace(/s\.classId === assignment\.classId/g, '(s.classIds || []).includes(assignment.classId)');
am = am.replace(/s\.classId === assessment\.classId/g, '(s.classIds || []).includes(assessment.classId)');
am = am.replace(/s\.classId === selectedItem\.classId/g, '(s.classIds || []).includes(selectedItem.classId)');
fs.writeFileSync('src/components/teacher/AssignmentManager.tsx', am);

let att = fs.readFileSync('src/components/teacher/AttendanceManager.tsx', 'utf8');
att = att.replace(/s\.classId === selectedClassId/g, '(s.classIds || []).includes(selectedClassId)');
fs.writeFileSync('src/components/teacher/AttendanceManager.tsx', att);

let ts = fs.readFileSync('src/components/teacher/teacher.store.ts', 'utf8');
ts = ts.replace(/classId: "",/g, 'classIds: [],');
ts = ts.replace(/classIds: \["class_1"\],/g, 'classId: "class_1",');
ts = ts.replace(/s\.classId === newAssignmentData\.classId/g, '(s.classIds || []).includes(newAssignmentData.classId)');
fs.writeFileSync('src/components/teacher/teacher.store.ts', ts);

console.log("Fixed part 2");
