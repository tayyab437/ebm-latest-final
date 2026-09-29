# Ejaz Bukhari Method (EBM) Curriculum JSON Schema Specification & Comprehensive Guide

This document is the authoritative standard for creating, importing, and validating curriculum modules, drills, and multi-section assessments in the application.

---

## Table of Contents
1. [Core JSON Architecture & Metadata](#1-core-json-architecture--metadata)
2. [Question Types & Supported Formats](#2-question-types--supported-formats)
3. [Comprehensive DO's and DON'Ts](#3-comprehensive-dos-and-donts)
4. [Universal Field Aliases & Resilience](#4-universal-field-aliases--resilience)
5. [50+ Complete Scenarios & Valid JSON Structures](#5-50-complete-scenarios--valid-json-structures)
   - [Scenarios 1–10: Elementary Arithmetic & Quick Mental Drills](#scenarios-110-elementary-arithmetic--quick-mental-drills)
   - [Scenarios 11–20: Fractions, Decimals, & Percentages](#scenarios-1120-fractions-decimals--percentages)
   - [Scenarios 21–30: 2D/3D Geometry, Symmetry, & Measurement](#scenarios-2130-2d3d-geometry-symmetry--measurement)
   - [Scenarios 31–40: Data Handling, Tables, Charts, & Multi-Question Stimuli](#scenarios-3140-data-handling-tables-charts--multi-question-stimuli)
   - [Scenarios 41–50: English Comprehension, Grammar, & Vocabulary](#scenarios-4150-english-comprehension-grammar--vocabulary)
   - [Scenarios 51–60: Science, Space, Biology, & General Knowledge](#scenarios-5160-science-space-biology--general-knowledge)
   - [Scenarios 61–70: O/A Level & Diagnostic Assessments](#scenarios-6170-oa-level--diagnostic-assessments)
6. [Full 80-Question Complete Course Blueprint](#6-full-80-question-complete-course-blueprint)

---

## 1. Core JSON Architecture & Metadata

A standard curriculum module JSON file has the following top-level structure:

```json
{
  "title": "Module Title (e.g. Mental Maths Drill 58)",
  "subject": "MATH",
  "gradeLevel": "Grade 1",
  "unitTitle": "Unit Name or Review Topic",
  "skillFocus": "Key skills practiced",
  "lifeConnection": "Practical everyday relevance",
  "duration": 25,
  "content": "# Markdown Notes\nPassage, introduction, or instructions for students.",
  "thumbnailUrl": "https://images.unsplash.com/photo-1509228468518-180dd4864904",
  "questions": [
    {
      "questionNumber": "1",
      "sectionTitle": "Part A: Quick Addition",
      "question": "2 + 3 = ______",
      "type": "FIB",
      "correctAnswer": "5",
      "acceptedAnswers": ["5"]
    }
  ]
}
```

### Top-Level Metadata Fields
| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | **Yes** | Module name displayed on cards, certificates, and headers. |
| `subject` | string | **Yes** | `MATH`, `ENGLISH`, `SCIENCE`, or custom subject. |
| `gradeLevel` | string | Optional | Target grade (e.g. `Grade 1`, `Grade 2`, `Grade 5`, `O Level`). Default: `Grade 2`. |
| `unitTitle` | string | Optional | Unit or chapter header (e.g. `Unit 4: Geometry and Spatial Sense`). |
| `skillFocus` | string | Optional | Summary of pedagogical competencies tested. |
| `lifeConnection` | string | Optional | Real-life contextual application of the skills. |
| `duration` | number | Optional | Suggested time limit in minutes. Default: `20`. |
| `content` | string | Optional | Markdown notes, study guide, or reading passage displayed on the left pane. |
| `thumbnailUrl` | string | Optional | Unsplash or custom image URL for the course banner. |
| `questions` | array | **Yes** | List of question objects (1 to 100+ items). |

---

## 2. Question Types & Supported Formats

Each question object in the `questions` array supports the following structure:

```typescript
interface Question {
  id?: string;                    // Optional unique ID (auto-generated if omitted)
  questionNumber: string;         // e.g. "1", "21", "79", "80"
  sectionTitle?: string;          // e.g. "Part A: Quick Addition", "Part J: Data Handling"
  context?: string;               // Reference data table, stimulus text, chart, or passage
  question: string;               // The prompt, equation, sentence, or task
  type: "MCQ" | "FIB" | "SHORT" | "ACTIVITY";
  options?: string[];             // Required for MCQ (2, 3, 4, or 5 choices)
  correctAnswer: string;          // Canonical correct answer
  acceptedAnswers?: string[];     // Equivalent accepted variations (e.g. ["½", "1/2", "0.5"])
}
```

### Question Type Breakdown
1. **`MCQ` (Multiple Choice Question)**:
   - Renders with prominent option badges (`A`, `B`, `C`, `D`).
   - Supports 2 choices (e.g. `["True", "False"]`, `["Yes", "No"]`), 3 choices (e.g. `["Circle", "Triangle", "Square"]`, `["½", "⅓", "¼"]`, `[">", "<", "="]`), 4 choices, or 5 choices.
2. **`FIB` (Fill in the Blanks)**:
   - Contains underscores like `______` or `= ______` or sentence blanks.
   - Evaluated with tolerance for whitespace, capitalization, and unicode variations.
3. **`SHORT` (Written Short Answer)**:
   - Free-form text, word problems, explanations, or multi-step arithmetic answers.
4. **`ACTIVITY` (Practical / Drawing Tasks)**:
   - Used for drawing shapes, shading fractions, hands-on measuring, or teacher-supervised tasks.
   - `correctAnswer` is set to `"Activity / Teacher Checked"`.

---

## 3. Comprehensive DO's and DON'Ts

### DO's:
1. **Group Questions by Section**: Use `sectionTitle` (e.g., `"Part A: Quick Addition"`, `"Part B: Quick Subtraction"`) so questions are organized beneath distinct section banners.
2. **Use `context` for Data Tables & Multi-Question Stimuli**: When 2–5 questions refer to the same table (e.g. Data Handling fruit tally), provide the table in `context`. It will display as a formatted reference box above the questions.
3. **Clean Options for MCQs**: Provide pure option strings in `options` (e.g., `["Circle", "Triangle", "Square"]`). Do **not** prepend `A.`, `B.`, `C.` inside the option text; the engine renders badge letters automatically.
4. **Provide `acceptedAnswers` for Fractions and Synonyms**: For answers like `½`, provide `["½", "1/2", "0.5"]`. For `14`, provide `["14", "14 fruits"]`.
5. **Set Exact `questionNumber`**: Keep original numbering (e.g. `"1"`, `"2"`, ... `"80"`) so reports match worksheets 1-to-1.

### DON'Ts:
1. **DON'T Embed Raw HTML**: Do not use `<div>` or `<font>` tags in question stems. Use standard markdown or plain text.
2. **DON'T Put Solution Steps in `correctAnswer`**: `correctAnswer` should contain the concise answer value (e.g., `"14"` or `"Triangle"`, not `"Because 4+3+5+2 = 14"`).
3. **DON'T Leave `options` Empty on `MCQ`**: If `type` is `"MCQ"`, always provide at least 2 strings in `options`.
4. **DON'T Create Incomplete JSON**: Ensure all brackets `{}` and quotes `""` are properly closed.

---

## 4. Universal Field Aliases & Resilience

The importer is built with universal aliases. If you import JSON from external tools, the parser automatically maps:
- `question` $\leftarrow$ `questionText`, `stem`, `prompt`, `q`
- `questionNumber` $\leftarrow$ `qNum`, `num`, `number`, `id`
- `sectionTitle` $\leftarrow$ `section`, `part`, `category`, `group`
- `context` $\leftarrow$ `sectionContext`, `table`, `stimulus`, `passage`, `data`
- `options` $\leftarrow$ `choices`, `answers`, `items`
- `correctAnswer` $\leftarrow$ `answer`, `solution`, `correct`

---

## 5. 50+ Complete Scenarios & Valid JSON Structures

### Scenarios 1–10: Elementary Arithmetic & Quick Mental Drills

#### Scenario 1: Quick Addition (FIB)
```json
{
  "questionNumber": "1",
  "sectionTitle": "Part A: Quick Addition",
  "question": "4 + 5 = ______",
  "type": "FIB",
  "correctAnswer": "9",
  "acceptedAnswers": ["9"]
}
```

#### Scenario 2: Quick Subtraction (FIB)
```json
{
  "questionNumber": "2",
  "sectionTitle": "Part B: Quick Subtraction",
  "question": "10 - 4 = ______",
  "type": "FIB",
  "correctAnswer": "6",
  "acceptedAnswers": ["6"]
}
```

#### Scenario 3: Missing Number in Equation (FIB)
```json
{
  "questionNumber": "3",
  "sectionTitle": "Part C: Missing Numbers",
  "question": "7 + ______ = 15",
  "type": "FIB",
  "correctAnswer": "8",
  "acceptedAnswers": ["8"]
}
```

#### Scenario 4: Subtraction Missing Subtrahend (FIB)
```json
{
  "questionNumber": "4",
  "sectionTitle": "Part C: Missing Numbers",
  "question": "18 - ______ = 11",
  "type": "FIB",
  "correctAnswer": "7",
  "acceptedAnswers": ["7"]
}
```

#### Scenario 5: Multiplication Table Drill (FIB)
```json
{
  "questionNumber": "5",
  "sectionTitle": "Part D: Multiplication Drills",
  "question": "6 × 7 = ______",
  "type": "FIB",
  "correctAnswer": "42",
  "acceptedAnswers": ["42"]
}
```

#### Scenario 6: Division Drill (FIB)
```json
{
  "questionNumber": "6",
  "sectionTitle": "Part E: Division Drills",
  "question": "36 ÷ 4 = ______",
  "type": "FIB",
  "correctAnswer": "9",
  "acceptedAnswers": ["9"]
}
```

#### Scenario 7: Word Problem Addition (SHORT)
```json
{
  "questionNumber": "7",
  "sectionTitle": "Part F: Word Problems",
  "question": "Sara has 8 red apples and 6 green apples. How many apples does she have in total?",
  "type": "SHORT",
  "correctAnswer": "14",
  "acceptedAnswers": ["14", "14 apples"]
}
```

#### Scenario 8: Word Problem Difference (SHORT)
```json
{
  "questionNumber": "8",
  "sectionTitle": "Part F: Word Problems",
  "question": "A baker made 24 cupcakes. He sold 17 of them. How many cupcakes are left?",
  "type": "SHORT",
  "correctAnswer": "7",
  "acceptedAnswers": ["7", "7 cupcakes"]
}
```

#### Scenario 9: Double & Half Mental Math (FIB)
```json
{
  "questionNumber": "9",
  "sectionTitle": "Part G: Doubles and Halves",
  "question": "Double of 16 is ______",
  "type": "FIB",
  "correctAnswer": "32",
  "acceptedAnswers": ["32"]
}
```

#### Scenario 10: Half of Number (FIB)
```json
{
  "questionNumber": "10",
  "sectionTitle": "Part G: Doubles and Halves",
  "question": "Half of 50 is ______",
  "type": "FIB",
  "correctAnswer": "25",
  "acceptedAnswers": ["25"]
}
```

---

### Scenarios 11–20: Fractions, Decimals, & Percentages

#### Scenario 11: 3-Choice Fraction Identification (MCQ)
```json
{
  "questionNumber": "11",
  "sectionTitle": "Part C: Choose the Correct Fraction",
  "question": "One part of a shape divided into 2 equal parts:",
  "type": "MCQ",
  "options": ["½", "⅓", "¼"],
  "correctAnswer": "½",
  "acceptedAnswers": ["½", "1/2", "0.5"]
}
```

#### Scenario 12: One Third Fraction (MCQ)
```json
{
  "questionNumber": "12",
  "sectionTitle": "Part C: Choose the Correct Fraction",
  "question": "One part out of 3 equal parts:",
  "type": "MCQ",
  "options": ["½", "⅓", "¼"],
  "correctAnswer": "⅓",
  "acceptedAnswers": ["⅓", "1/3"]
}
```

#### Scenario 13: One Quarter Fraction (MCQ)
```json
{
  "questionNumber": "13",
  "sectionTitle": "Part C: Choose the Correct Fraction",
  "question": "One part out of 4 equal parts:",
  "type": "MCQ",
  "options": ["½", "⅓", "¼"],
  "correctAnswer": "¼",
  "acceptedAnswers": ["¼", "1/4", "0.25"]
}
```

#### Scenario 14: Three Quarters Fraction (MCQ)
```json
{
  "questionNumber": "14",
  "sectionTitle": "Part C: Choose the Correct Fraction",
  "question": "Three parts out of 4 equal parts:",
  "type": "MCQ",
  "options": ["¾", "⅓", "½"],
  "correctAnswer": "¾",
  "acceptedAnswers": ["¾", "3/4", "0.75"]
}
```

#### Scenario 15: Whole Fraction (MCQ with Words & Symbols)
```json
{
  "questionNumber": "15",
  "sectionTitle": "Part C: Choose the Correct Fraction",
  "question": "Four equal parts make:",
  "type": "MCQ",
  "options": ["1 whole", "½", "⅓"],
  "correctAnswer": "1 whole",
  "acceptedAnswers": ["1 whole", "1", "whole"]
}
```

#### Scenario 16: Fraction Addition Like Denominators (FIB)
```json
{
  "questionNumber": "16",
  "sectionTitle": "Part D: Fraction Arithmetic",
  "question": "¼ + 2/4 = ______",
  "type": "FIB",
  "correctAnswer": "¾",
  "acceptedAnswers": ["¾", "3/4", "0.75"]
}
```

#### Scenario 17: Equivalent Fraction (FIB)
```json
{
  "questionNumber": "17",
  "sectionTitle": "Part D: Equivalent Fractions",
  "question": "2/4 is equivalent to ______ in simplest form.",
  "type": "FIB",
  "correctAnswer": "½",
  "acceptedAnswers": ["½", "1/2", "0.5"]
}
```

#### Scenario 18: Decimal to Fraction (MCQ)
```json
{
  "questionNumber": "18",
  "sectionTitle": "Part E: Decimals and Fractions",
  "question": "0.5 is written in fraction form as:",
  "type": "MCQ",
  "options": ["½", "¼", "¾", "1/10"],
  "correctAnswer": "½",
  "acceptedAnswers": ["½", "1/2"]
}
```

#### Scenario 19: Percentage Conversion (FIB)
```json
{
  "questionNumber": "19",
  "sectionTitle": "Part F: Percentages",
  "question": "50% of 80 = ______",
  "type": "FIB",
  "correctAnswer": "40",
  "acceptedAnswers": ["40"]
}
```

#### Scenario 20: Shading / Activity Fraction Task (ACTIVITY)
```json
{
  "questionNumber": "20",
  "sectionTitle": "Part G: Fraction Drawing",
  "question": "Draw a rectangle, divide it into 4 equal sections, and shade ¾ of it.",
  "type": "ACTIVITY",
  "correctAnswer": "Activity / Teacher Checked",
  "acceptedAnswers": ["Activity / Teacher Checked"]
}
```

---

### Scenarios 21–30: 2D/3D Geometry, Symmetry, & Measurement

#### Scenario 21: 3-Choice Shape Identification (MCQ)
```json
{
  "questionNumber": "21",
  "sectionTitle": "Part D: 2D Shapes",
  "question": "Which shape has 3 sides?",
  "type": "MCQ",
  "options": ["Circle", "Triangle", "Square"],
  "correctAnswer": "Triangle",
  "acceptedAnswers": ["Triangle", "triangle"]
}
```

#### Scenario 22: Shape with 4 Equal Sides (MCQ)
```json
{
  "questionNumber": "22",
  "sectionTitle": "Part D: 2D Shapes",
  "question": "Which shape has 4 equal sides?",
  "type": "MCQ",
  "options": ["Rectangle", "Square", "Circle"],
  "correctAnswer": "Square",
  "acceptedAnswers": ["Square", "square"]
}
```

#### Scenario 23: Shape with No Sides (MCQ)
```json
{
  "questionNumber": "23",
  "sectionTitle": "Part D: 2D Shapes",
  "question": "Which shape has no straight sides?",
  "type": "MCQ",
  "options": ["Circle", "Triangle", "Pentagon"],
  "correctAnswer": "Circle",
  "acceptedAnswers": ["Circle", "circle"]
}
```

#### Scenario 24: Shape with 5 Sides (MCQ)
```json
{
  "questionNumber": "24",
  "sectionTitle": "Part D: 2D Shapes",
  "question": "Which shape has 5 sides?",
  "type": "MCQ",
  "options": ["Hexagon", "Pentagon", "Octagon"],
  "correctAnswer": "Pentagon",
  "acceptedAnswers": ["Pentagon", "pentagon"]
}
```

#### Scenario 25: Real-World Shape Object (MCQ)
```json
{
  "questionNumber": "25",
  "sectionTitle": "Part D: Real-world Shapes",
  "question": "Which shape looks like a wall clock?",
  "type": "MCQ",
  "options": ["Circle", "Rectangle", "Triangle"],
  "correctAnswer": "Circle",
  "acceptedAnswers": ["Circle"]
}
```

#### Scenario 26: 3D Solid Shapes (MCQ)
```json
{
  "questionNumber": "26",
  "sectionTitle": "Part E: 3D Shapes",
  "question": "Which 3D shape has 6 flat square faces?",
  "type": "MCQ",
  "options": ["Cube", "Sphere", "Cylinder", "Cone"],
  "correctAnswer": "Cube",
  "acceptedAnswers": ["Cube"]
}
```

#### Scenario 27: Line of Symmetry (MCQ Yes/No)
```json
{
  "questionNumber": "27",
  "sectionTitle": "Part F: Symmetry",
  "question": "Does a standard heart shape have a vertical line of symmetry?",
  "type": "MCQ",
  "options": ["Yes", "No"],
  "correctAnswer": "Yes",
  "acceptedAnswers": ["Yes", "yes"]
}
```

#### Scenario 28: Comparison Signs (MCQ with >, <, =)
```json
{
  "questionNumber": "28",
  "sectionTitle": "Part G: Number Comparisons",
  "question": "Compare: 485 ______ 458",
  "type": "MCQ",
  "options": [">", "<", "="],
  "correctAnswer": ">",
  "acceptedAnswers": [">"]
}
```

#### Scenario 29: Clock Time Reading (FIB)
```json
{
  "questionNumber": "29",
  "sectionTitle": "Part H: Telling Time",
  "question": "When the long hand points to 12 and the short hand points to 4, the time is ______ o'clock.",
  "type": "FIB",
  "correctAnswer": "4",
  "acceptedAnswers": ["4", "4:00", "four"]
}
```

#### Scenario 30: Drawing / Activity Geometry Task (ACTIVITY)
```json
{
  "questionNumber": "30",
  "sectionTitle": "Part I: Geometric Drawing",
  "question": "Draw a triangle and mark all 3 of its corners (vertices).",
  "type": "ACTIVITY",
  "correctAnswer": "Activity / Teacher Checked",
  "acceptedAnswers": ["Activity / Teacher Checked"]
}
```

---

### Scenarios 31–40: Data Handling, Tables, Charts, & Multi-Question Stimuli

#### Scenario 31: Data Table Stimulus — Question 1 (FIB)
```json
{
  "questionNumber": "31",
  "sectionTitle": "Part J: Data Handling",
  "context": "Fruit\tNumber\nApple\t4\nBanana\t3\nMango\t5\nOrange\t2",
  "question": "Which fruit has the highest count in the table? ______",
  "type": "FIB",
  "correctAnswer": "Mango",
  "acceptedAnswers": ["Mango", "mango"]
}
```

#### Scenario 32: Data Table Stimulus — Question 2 (FIB)
```json
{
  "questionNumber": "32",
  "sectionTitle": "Part J: Data Handling",
  "context": "Fruit\tNumber\nApple\t4\nBanana\t3\nMango\t5\nOrange\t2",
  "question": "How many fruits are there altogether? ______",
  "type": "FIB",
  "correctAnswer": "14",
  "acceptedAnswers": ["14", "14 fruits"]
}
```

#### Scenario 33: Data Table Stimulus — Difference (SHORT)
```json
{
  "questionNumber": "33",
  "sectionTitle": "Part J: Data Handling",
  "context": "Fruit\tNumber\nApple\t4\nBanana\t3\nMango\t5\nOrange\t2",
  "question": "How many more mangoes are there than oranges?",
  "type": "SHORT",
  "correctAnswer": "3",
  "acceptedAnswers": ["3", "3 more", "3 mangoes"]
}
```

#### Scenario 34: Weather Chart Data Handling (MCQ)
```json
{
  "questionNumber": "34",
  "sectionTitle": "Part J: Weather Record",
  "context": "Day\tWeather\nMonday\tSunny\nTuesday\tRainy\nWednesday\tSunny\nThursday\tCloudy\nFriday\tSunny",
  "question": "Which weather occurred most frequently during the week?",
  "type": "MCQ",
  "options": ["Sunny", "Rainy", "Cloudy", "Snowy"],
  "correctAnswer": "Sunny",
  "acceptedAnswers": ["Sunny"]
}
```

#### Scenario 35: Weather Chart Count (FIB)
```json
{
  "questionNumber": "35",
  "sectionTitle": "Part J: Weather Record",
  "context": "Day\tWeather\nMonday\tSunny\nTuesday\tRainy\nWednesday\tSunny\nThursday\tCloudy\nFriday\tSunny",
  "question": "How many sunny days were recorded? ______",
  "type": "FIB",
  "correctAnswer": "3",
  "acceptedAnswers": ["3", "3 days"]
}
```

#### Scenario 36: Class Sports Poll Data (FIB)
```json
{
  "questionNumber": "36",
  "sectionTitle": "Part K: Sports Survey",
  "context": "Sport\tStudents\nFootball\t12\nCricket\t15\nTennis\t6\nSwimming\t9",
  "question": "Which sport is preferred by the most students? ______",
  "type": "FIB",
  "correctAnswer": "Cricket",
  "acceptedAnswers": ["Cricket", "cricket"]
}
```

#### Scenario 37: Class Sports Total (FIB)
```json
{
  "questionNumber": "37",
  "sectionTitle": "Part K: Sports Survey",
  "context": "Sport\tStudents\nFootball\t12\nCricket\t15\nTennis\t6\nSwimming\t9",
  "question": "How many students participated in the sports survey altogether? ______",
  "type": "FIB",
  "correctAnswer": "42",
  "acceptedAnswers": ["42", "42 students"]
}
```

#### Scenario 38: Library Books Borrowed (SHORT)
```json
{
  "questionNumber": "38",
  "sectionTitle": "Part L: Library Tally",
  "context": "Genre\tBooks Borrowed\nAdventure\t20\nScience\t14\nHistory\t8\nPoetry\t5",
  "question": "Calculate the total number of non-fiction (Science + History) books borrowed.",
  "type": "SHORT",
  "correctAnswer": "22",
  "acceptedAnswers": ["22", "22 books"]
}
```

#### Scenario 39: Pictograph Interpretation (MCQ)
```json
{
  "questionNumber": "39",
  "sectionTitle": "Part M: Pictograph Reading",
  "context": "Key: 🌟 = 2 Stars\nTeam Alpha: 🌟🌟🌟 (6)\nTeam Beta: 🌟🌟 (4)\nTeam Gamma: 🌟🌟🌟🌟 (8)",
  "question": "Which team won the highest score?",
  "type": "MCQ",
  "options": ["Team Alpha", "Team Beta", "Team Gamma"],
  "correctAnswer": "Team Gamma",
  "acceptedAnswers": ["Team Gamma"]
}
```

#### Scenario 40: Bar Graph Comparison (FIB)
```json
{
  "questionNumber": "40",
  "sectionTitle": "Part M: Pictograph Reading",
  "context": "Key: 🌟 = 2 Stars\nTeam Alpha: 🌟🌟🌟 (6)\nTeam Beta: 🌟🌟 (4)\nTeam Gamma: 🌟🌟🌟🌟 (8)",
  "question": "How many more stars did Team Gamma earn compared to Team Beta? ______",
  "type": "FIB",
  "correctAnswer": "4",
  "acceptedAnswers": ["4", "4 stars"]
}
```

---

### Scenarios 41–50: English Comprehension, Grammar, & Vocabulary

#### Scenario 41: Passage Reading Comprehension — Detail (MCQ)
```json
{
  "questionNumber": "41",
  "sectionTitle": "Section 1: Reading Comprehension",
  "context": "Leo the Lion lived in the golden savannah. Unlike other lions, Leo loved painting colorful murals on canyon walls with berry juice. One sunny morning, a wise elephant named Ella watched him create a majestic sunset painting.",
  "question": "What did Leo use to paint on the canyon walls?",
  "type": "MCQ",
  "options": ["Berry juice", "Oil paints", "Mud and water", "Colored chalk"],
  "correctAnswer": "Berry juice",
  "acceptedAnswers": ["Berry juice"]
}
```

#### Scenario 42: Passage Reading Comprehension — Character (FIB)
```json
{
  "questionNumber": "42",
  "sectionTitle": "Section 1: Reading Comprehension",
  "context": "Leo the Lion lived in the golden savannah. Unlike other lions, Leo loved painting colorful murals on canyon walls with berry juice. One sunny morning, a wise elephant named Ella watched him create a majestic sunset painting.",
  "question": "The wise elephant's name is ______",
  "type": "FIB",
  "correctAnswer": "Ella",
  "acceptedAnswers": ["Ella", "ella"]
}
```

#### Scenario 43: Vocabulary in Context (MCQ)
```json
{
  "questionNumber": "43",
  "sectionTitle": "Section 1: Reading Comprehension",
  "context": "Leo the Lion lived in the golden savannah. Unlike other lions, Leo loved painting colorful murals on canyon walls with berry juice. One sunny morning, a wise elephant named Ella watched him create a majestic sunset painting.",
  "question": "In the passage, the word 'majestic' most closely means:",
  "type": "MCQ",
  "options": ["Grand and beautiful", "Small and quiet", "Frightening", "Messy"],
  "correctAnswer": "Grand and beautiful",
  "acceptedAnswers": ["Grand and beautiful"]
}
```

#### Scenario 44: Nouns Identification (MCQ)
```json
{
  "questionNumber": "44",
  "sectionTitle": "Section 2: Parts of Speech",
  "question": "Which word in the sentence is a noun? 'The golden sun rose above the mountains.'",
  "type": "MCQ",
  "options": ["mountains", "golden", "above", "rose"],
  "correctAnswer": "mountains",
  "acceptedAnswers": ["mountains"]
}
```

#### Scenario 45: Verb Identification (MCQ)
```json
{
  "questionNumber": "45",
  "sectionTitle": "Section 2: Parts of Speech",
  "question": "Identify the action verb: 'The swift rabbit hopped across the green meadow.'",
  "type": "MCQ",
  "options": ["hopped", "swift", "rabbit", "meadow"],
  "correctAnswer": "hopped",
  "acceptedAnswers": ["hopped"]
}
```

#### Scenario 46: Fill in the Correct Preposition (FIB)
```json
{
  "questionNumber": "46",
  "sectionTitle": "Section 3: Prepositions",
  "question": "The curious cat jumped ______ the wooden fence.",
  "type": "FIB",
  "correctAnswer": "over",
  "acceptedAnswers": ["over", "across", "on"]
}
```

#### Scenario 47: Antonyms / Opposites (MCQ)
```json
{
  "questionNumber": "47",
  "sectionTitle": "Section 4: Vocabulary Skills",
  "question": "What is the opposite of 'ancient'?",
  "type": "MCQ",
  "options": ["Modern", "Old", "Historic", "Dusty"],
  "correctAnswer": "Modern",
  "acceptedAnswers": ["Modern", "modern"]
}
```

#### Scenario 48: Synonyms (MCQ)
```json
{
  "questionNumber": "48",
  "sectionTitle": "Section 4: Vocabulary Skills",
  "question": "Which word is a synonym for 'courageous'?",
  "type": "MCQ",
  "options": ["Brave", "Timid", "Quiet", "Careful"],
  "correctAnswer": "Brave",
  "acceptedAnswers": ["Brave", "brave"]
}
```

#### Scenario 49: Irregular Past Tense (FIB)
```json
{
  "questionNumber": "49",
  "sectionTitle": "Section 5: Tenses",
  "question": "Yesterday, they ______ (swim) across the lake.",
  "type": "FIB",
  "correctAnswer": "swam",
  "acceptedAnswers": ["swam"]
}
```

#### Scenario 50: Punctuation Correction (SHORT)
```json
{
  "questionNumber": "50",
  "sectionTitle": "Section 6: Punctuation",
  "question": "Rewrite the sentence with correct capitalization and punctuation: 'where are we going today asked bilal'",
  "type": "SHORT",
  "correctAnswer": "\"Where are we going today?\" asked Bilal.",
  "acceptedAnswers": [
    "\"Where are we going today?\" asked Bilal.",
    "\"Where are we going today?\" asked Bilal",
    "Where are we going today? asked Bilal."
  ]
}
```

---

### Scenarios 51–60: Science, Space, Biology, & General Knowledge

#### Scenario 51: Solar System Planet (MCQ)
```json
{
  "questionNumber": "51",
  "sectionTitle": "Unit 1: Earth and Space",
  "question": "Which planet is known as the Red Planet?",
  "type": "MCQ",
  "options": ["Mars", "Venus", "Jupiter", "Saturn"],
  "correctAnswer": "Mars",
  "acceptedAnswers": ["Mars", "mars"]
}
```

#### Scenario 52: Solar Eclipse Cause (SHORT)
```json
{
  "questionNumber": "52",
  "sectionTitle": "Unit 1: Earth and Space",
  "question": "What passes between the Earth and the Sun during a solar eclipse?",
  "type": "SHORT",
  "correctAnswer": "The Moon",
  "acceptedAnswers": ["The Moon", "Moon", "the moon"]
}
```

#### Scenario 53: States of Matter (MCQ)
```json
{
  "questionNumber": "53",
  "sectionTitle": "Unit 2: States of Matter",
  "question": "When liquid water freezes into ice, it changes from a liquid to a:",
  "type": "MCQ",
  "options": ["Solid", "Gas", "Plasma", "Vapor"],
  "correctAnswer": "Solid",
  "acceptedAnswers": ["Solid", "solid"]
}
```

#### Scenario 54: Photosynthesis Gas Requirement (FIB)
```json
{
  "questionNumber": "54",
  "sectionTitle": "Unit 3: Plant Life",
  "question": "Plants absorb ______ dioxide from the air to perform photosynthesis.",
  "type": "FIB",
  "correctAnswer": "carbon",
  "acceptedAnswers": ["carbon", "Carbon"]
}
```

#### Scenario 55: Habitat Adaptation (MCQ)
```json
{
  "questionNumber": "55",
  "sectionTitle": "Unit 4: Animal Habitats",
  "question": "Which adaptation helps polar bears stay warm in the Arctic freezing cold?",
  "type": "MCQ",
  "options": ["Thick layer of fat and blubber", "Gills for breathing", "Webbed feet", "Long thin tail"],
  "correctAnswer": "Thick layer of fat and blubber",
  "acceptedAnswers": ["Thick layer of fat and blubber"]
}
```

#### Scenario 56: Living vs Non-Living (MCQ True/False)
```json
{
  "questionNumber": "56",
  "sectionTitle": "Unit 4: Living Things",
  "question": "All living organisms need water, nutrition, and respiration to survive. (True or False)",
  "type": "MCQ",
  "options": ["True", "False"],
  "correctAnswer": "True",
  "acceptedAnswers": ["True", "true"]
}
```

#### Scenario 57: Water Cycle Evaporation (FIB)
```json
{
  "questionNumber": "57",
  "sectionTitle": "Unit 5: The Water Cycle",
  "question": "The process by which liquid water heats up and turns into water vapor is called ______",
  "type": "FIB",
  "correctAnswer": "evaporation",
  "acceptedAnswers": ["evaporation", "Evaporation"]
}
```

#### Scenario 58: Human Heart Function (MCQ)
```json
{
  "questionNumber": "58",
  "sectionTitle": "Unit 6: Human Body Systems",
  "question": "The primary function of the human heart is to:",
  "type": "MCQ",
  "options": ["Pump blood throughout the body", "Digest food", "Filter air", "Produce hormones"],
  "correctAnswer": "Pump blood throughout the body",
  "acceptedAnswers": ["Pump blood throughout the body"]
}
```

#### Scenario 59: Food Chain Producer (FIB)
```json
{
  "questionNumber": "59",
  "sectionTitle": "Unit 7: Ecosystems",
  "question": "In a forest food chain, green plants are classified as ______",
  "type": "FIB",
  "correctAnswer": "producers",
  "acceptedAnswers": ["producers", "producer", "Producer"]
}
```

#### Scenario 60: Science Diagram Task (ACTIVITY)
```json
{
  "questionNumber": "60",
  "sectionTitle": "Unit 8: Scientific Diagrams",
  "question": "Draw a plant and label its 4 major parts: roots, stem, leaves, and flower.",
  "type": "ACTIVITY",
  "correctAnswer": "Activity / Teacher Checked",
  "acceptedAnswers": ["Activity / Teacher Checked"]
}
```

---

### Scenarios 61–70: O/A Level & Diagnostic Assessments

#### Scenario 61: Linear Equation Solve (SHORT)
```json
{
  "questionNumber": "61",
  "sectionTitle": "Algebra: Linear Equations",
  "question": "Solve for x: 3x + 7 = 28",
  "type": "SHORT",
  "correctAnswer": "7",
  "acceptedAnswers": ["7", "x = 7", "x=7"]
}
```

#### Scenario 62: Quadratic Factorization (MCQ)
```json
{
  "questionNumber": "62",
  "sectionTitle": "Algebra: Factorization",
  "question": "Factorize completely: x² - 9",
  "type": "MCQ",
  "options": ["(x - 3)(x + 3)", "(x - 9)(x + 1)", "(x - 3)²", "(x + 3)²"],
  "correctAnswer": "(x - 3)(x + 3)",
  "acceptedAnswers": ["(x - 3)(x + 3)"]
}
```

#### Scenario 63: Pythagorean Theorem (SHORT)
```json
{
  "questionNumber": "63",
  "sectionTitle": "Trigonometry & Geometry",
  "question": "In a right-angled triangle, side a = 6 cm and side b = 8 cm. Find the hypotenuse c in cm.",
  "type": "SHORT",
  "correctAnswer": "10",
  "acceptedAnswers": ["10", "10 cm", "10cm"]
}
```

#### Scenario 64: Probability Calculation (FIB)
```json
{
  "questionNumber": "64",
  "sectionTitle": "Statistics & Probability",
  "question": "A fair 6-sided die is rolled. The probability of obtaining a prime number (2, 3, or 5) in simplest fraction form is ______",
  "type": "FIB",
  "correctAnswer": "½",
  "acceptedAnswers": ["½", "1/2", "0.5", "3/6"]
}
```

#### Scenario 65: Speed, Distance, Time (SHORT)
```json
{
  "questionNumber": "65",
  "sectionTitle": "Applied Mathematics",
  "question": "A high-speed train travels 240 kilometers in 3 hours. Calculate its average speed in km/h.",
  "type": "SHORT",
  "correctAnswer": "80",
  "acceptedAnswers": ["80", "80 km/h", "80km/h"]
}
```

#### Scenario 66: Chemistry Periodic Table (MCQ)
```json
{
  "questionNumber": "66",
  "sectionTitle": "O-Level Chemistry: Atomic Structure",
  "question": "What is the atomic number of Carbon (C)?",
  "type": "MCQ",
  "options": ["6", "12", "14", "8"],
  "correctAnswer": "6",
  "acceptedAnswers": ["6"]
}
```

#### Scenario 67: Physics Ohm's Law (FIB)
```json
{
  "questionNumber": "67",
  "sectionTitle": "O-Level Physics: Electricity",
  "question": "According to Ohm's law, Voltage (V) = Current (I) × ______",
  "type": "FIB",
  "correctAnswer": "Resistance",
  "acceptedAnswers": ["Resistance", "resistance", "R"]
}
```

#### Scenario 68: Biology Cell Structure (MCQ)
```json
{
  "questionNumber": "68",
  "sectionTitle": "O-Level Biology: Cytology",
  "question": "Which organelle is responsible for cellular respiration and energy (ATP) production?",
  "type": "MCQ",
  "options": ["Mitochondria", "Ribosome", "Golgi apparatus", "Endoplasmic reticulum"],
  "correctAnswer": "Mitochondria",
  "acceptedAnswers": ["Mitochondria", "mitochondria"]
}
```

#### Scenario 69: Diagnostic English Error Correction (SHORT)
```json
{
  "questionNumber": "69",
  "sectionTitle": "Diagnostic English: Syntax",
  "question": "Identify and correct the grammatical error: 'Neither of the students were ready for the test.'",
  "type": "SHORT",
  "correctAnswer": "Replace 'were' with 'was'",
  "acceptedAnswers": ["Replace 'were' with 'was'", "was", "was ready"]
}
```

#### Scenario 70: Diagnostic Math Place Value (FIB)
```json
{
  "questionNumber": "70",
  "sectionTitle": "Diagnostic Math: Number Sense",
  "question": "In the number 8,429, the digit 4 represents the value of ______",
  "type": "FIB",
  "correctAnswer": "400",
  "acceptedAnswers": ["400", "four hundred", "4 hundreds"]
}
```

---

## 6. Full 80-Question Complete Course Blueprint

Below is a complete, production-ready 80-question curriculum file with all 10 parts (Part A through Part J):

```json
{
  "title": "Mental Maths & Data Handling Drill 58 (Complete 80 Questions)",
  "subject": "MATH",
  "gradeLevel": "Grade 1",
  "unitTitle": "Review & Data Interpretation",
  "skillFocus": "Mental Math, Comparisons, 2D Geometry, Fractions, Data Handling",
  "lifeConnection": "Students solve calculations and read tables from everyday situations.",
  "duration": 30,
  "content": "# Mental Maths & Data Handling Drill 58\n\nWelcome to Drill 58. Complete all 10 parts.\n\n### Skills Overview:\n- **Part A:** Quick Addition (1–10)\n- **Part B:** Quick Subtraction (11–20)\n- **Part C:** Choose the Correct Fraction (21–30)\n- **Part D:** Circle the Correct Shape (31–40)\n- **Part E:** Missing Numbers (41–50)\n- **Part F:** Number Comparisons (51–60)\n- **Part G:** Doubles & Halves (61–70)\n- **Part H:** Practical Activities (71–75)\n- **Part I:** Word Problems (76–78)\n- **Part J:** Data Handling & Tables (79–80)",
  "thumbnailUrl": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
  "questions": [
    {"questionNumber": "1", "sectionTitle": "Part A: Quick Addition", "question": "2 + 3 = ______", "type": "FIB", "correctAnswer": "5"},
    {"questionNumber": "2", "sectionTitle": "Part A: Quick Addition", "question": "4 + 1 = ______", "type": "FIB", "correctAnswer": "5"},
    {"questionNumber": "3", "sectionTitle": "Part A: Quick Addition", "question": "5 + 5 = ______", "type": "FIB", "correctAnswer": "10"},
    {"questionNumber": "4", "sectionTitle": "Part A: Quick Addition", "question": "6 + 2 = ______", "type": "FIB", "correctAnswer": "8"},
    {"questionNumber": "5", "sectionTitle": "Part A: Quick Addition", "question": "3 + 4 = ______", "type": "FIB", "correctAnswer": "7"},
    {"questionNumber": "6", "sectionTitle": "Part A: Quick Addition", "question": "7 + 1 = ______", "type": "FIB", "correctAnswer": "8"},
    {"questionNumber": "7", "sectionTitle": "Part A: Quick Addition", "question": "8 + 2 = ______", "type": "FIB", "correctAnswer": "10"},
    {"questionNumber": "8", "sectionTitle": "Part A: Quick Addition", "question": "1 + 9 = ______", "type": "FIB", "correctAnswer": "10"},
    {"questionNumber": "9", "sectionTitle": "Part A: Quick Addition", "question": "0 + 6 = ______", "type": "FIB", "correctAnswer": "6"},
    {"questionNumber": "10", "sectionTitle": "Part A: Quick Addition", "question": "4 + 4 = ______", "type": "FIB", "correctAnswer": "8"},

    {"questionNumber": "11", "sectionTitle": "Part B: Quick Subtraction", "question": "5 - 2 = ______", "type": "FIB", "correctAnswer": "3"},
    {"questionNumber": "12", "sectionTitle": "Part B: Quick Subtraction", "question": "6 - 1 = ______", "type": "FIB", "correctAnswer": "5"},
    {"questionNumber": "13", "sectionTitle": "Part B: Quick Subtraction", "question": "7 - 3 = ______", "type": "FIB", "correctAnswer": "4"},
    {"questionNumber": "14", "sectionTitle": "Part B: Quick Subtraction", "question": "8 - 4 = ______", "type": "FIB", "correctAnswer": "4"},
    {"questionNumber": "15", "sectionTitle": "Part B: Quick Subtraction", "question": "9 - 5 = ______", "type": "FIB", "correctAnswer": "4"},
    {"questionNumber": "16", "sectionTitle": "Part B: Quick Subtraction", "question": "10 - 2 = ______", "type": "FIB", "correctAnswer": "8"},
    {"questionNumber": "17", "sectionTitle": "Part B: Quick Subtraction", "question": "4 - 0 = ______", "type": "FIB", "correctAnswer": "4"},
    {"questionNumber": "18", "sectionTitle": "Part B: Quick Subtraction", "question": "6 - 6 = ______", "type": "FIB", "correctAnswer": "0"},
    {"questionNumber": "19", "sectionTitle": "Part B: Quick Subtraction", "question": "7 - 5 = ______", "type": "FIB", "correctAnswer": "2"},
    {"questionNumber": "20", "sectionTitle": "Part B: Quick Subtraction", "question": "10 - 7 = ______", "type": "FIB", "correctAnswer": "3"},

    {"questionNumber": "21", "sectionTitle": "Part C: Choose the Correct Fraction", "question": "One part of a shape divided into 2 equal parts:", "type": "MCQ", "options": ["½", "⅓", "¼"], "correctAnswer": "½", "acceptedAnswers": ["½", "1/2", "0.5"]},
    {"questionNumber": "22", "sectionTitle": "Part C: Choose the Correct Fraction", "question": "One part of a shape divided into 3 equal parts:", "type": "MCQ", "options": ["½", "⅓", "¼"], "correctAnswer": "⅓", "acceptedAnswers": ["⅓", "1/3"]},
    {"questionNumber": "23", "sectionTitle": "Part C: Choose the Correct Fraction", "question": "One part of a shape divided into 4 equal parts:", "type": "MCQ", "options": ["½", "⅓", "¼"], "correctAnswer": "¼", "acceptedAnswers": ["¼", "1/4", "0.25"]},
    {"questionNumber": "24", "sectionTitle": "Part C: Choose the Correct Fraction", "question": "Two parts out of 4 equal parts:", "type": "MCQ", "options": ["½", "⅔", "¼"], "correctAnswer": "½", "acceptedAnswers": ["½", "2/4", "1/2"]},
    {"questionNumber": "25", "sectionTitle": "Part C: Choose the Correct Fraction", "question": "Three parts out of 4 equal parts:", "type": "MCQ", "options": ["¾", "⅓", "½"], "correctAnswer": "¾", "acceptedAnswers": ["¾", "3/4"]},
    {"questionNumber": "26", "sectionTitle": "Part C: Choose the Correct Fraction", "question": "Two equal parts make:", "type": "MCQ", "options": ["1 whole", "½", "¼"], "correctAnswer": "1 whole", "acceptedAnswers": ["1 whole", "1"]},
    {"questionNumber": "27", "sectionTitle": "Part C: Choose the Correct Fraction", "question": "Four equal parts make:", "type": "MCQ", "options": ["1 whole", "½", "⅓"], "correctAnswer": "1 whole", "acceptedAnswers": ["1 whole", "1"]},
    {"questionNumber": "28", "sectionTitle": "Part C: Choose the Correct Fraction", "question": "One-quarter is written as:", "type": "MCQ", "options": ["¼", "⅓", "½"], "correctAnswer": "¼", "acceptedAnswers": ["¼", "1/4"]},
    {"questionNumber": "29", "sectionTitle": "Part C: Choose the Correct Fraction", "question": "One-third is written as:", "type": "MCQ", "options": ["⅓", "¼", "½"], "correctAnswer": "⅓", "acceptedAnswers": ["⅓", "1/3"]},
    {"questionNumber": "30", "sectionTitle": "Part C: Choose the Correct Fraction", "question": "One-half is written as:", "type": "MCQ", "options": ["½", "⅓", "¼"], "correctAnswer": "½", "acceptedAnswers": ["½", "1/2"]},

    {"questionNumber": "31", "sectionTitle": "Part D: Circle the Correct Shape", "question": "Which shape has 3 sides?", "type": "MCQ", "options": ["Circle", "Triangle", "Square"], "correctAnswer": "Triangle"},
    {"questionNumber": "32", "sectionTitle": "Part D: Circle the Correct Shape", "question": "Which shape has 4 equal sides?", "type": "MCQ", "options": ["Rectangle", "Square", "Circle"], "correctAnswer": "Square"},
    {"questionNumber": "33", "sectionTitle": "Part D: Circle the Correct Shape", "question": "Which shape has no straight sides?", "type": "MCQ", "options": ["Circle", "Triangle", "Pentagon"], "correctAnswer": "Circle"},
    {"questionNumber": "34", "sectionTitle": "Part D: Circle the Correct Shape", "question": "Which shape has 5 sides?", "type": "MCQ", "options": ["Hexagon", "Pentagon", "Octagon"], "correctAnswer": "Pentagon"},
    {"questionNumber": "35", "sectionTitle": "Part D: Circle the Correct Shape", "question": "Which shape has 6 sides?", "type": "MCQ", "options": ["Pentagon", "Hexagon", "Square"], "correctAnswer": "Hexagon"},
    {"questionNumber": "36", "sectionTitle": "Part D: Circle the Correct Shape", "question": "Which shape has 8 sides?", "type": "MCQ", "options": ["Octagon", "Circle", "Triangle"], "correctAnswer": "Octagon"},
    {"questionNumber": "37", "sectionTitle": "Part D: Circle the Correct Shape", "question": "Which shape looks like a clock?", "type": "MCQ", "options": ["Circle", "Rectangle", "Triangle"], "correctAnswer": "Circle"},
    {"questionNumber": "38", "sectionTitle": "Part D: Circle the Correct Shape", "question": "Which shape looks like a book?", "type": "MCQ", "options": ["Rectangle", "Circle", "Pentagon"], "correctAnswer": "Rectangle"},
    {"questionNumber": "39", "sectionTitle": "Part D: Circle the Correct Shape", "question": "Which shape has 4 corners?", "type": "MCQ", "options": ["Square", "Triangle", "Both"], "correctAnswer": "Square"},
    {"questionNumber": "40", "sectionTitle": "Part D: Circle the Correct Shape", "question": "Which shape has no corners?", "type": "MCQ", "options": ["Circle", "Square", "Rectangle"], "correctAnswer": "Circle"},

    {"questionNumber": "41", "sectionTitle": "Part E: Missing Numbers", "question": "2 + ______ = 5", "type": "FIB", "correctAnswer": "3"},
    {"questionNumber": "42", "sectionTitle": "Part E: Missing Numbers", "question": "4 + ______ = 7", "type": "FIB", "correctAnswer": "3"},
    {"questionNumber": "43", "sectionTitle": "Part E: Missing Numbers", "question": "6 + ______ = 10", "type": "FIB", "correctAnswer": "4"},
    {"questionNumber": "44", "sectionTitle": "Part E: Missing Numbers", "question": "1 + ______ = 8", "type": "FIB", "correctAnswer": "7"},
    {"questionNumber": "45", "sectionTitle": "Part E: Missing Numbers", "question": "5 + ______ = 9", "type": "FIB", "correctAnswer": "4"},
    {"questionNumber": "46", "sectionTitle": "Part E: Missing Numbers", "question": "8 - ______ = 5", "type": "FIB", "correctAnswer": "3"},
    {"questionNumber": "47", "sectionTitle": "Part E: Missing Numbers", "question": "10 - ______ = 6", "type": "FIB", "correctAnswer": "4"},
    {"questionNumber": "48", "sectionTitle": "Part E: Missing Numbers", "question": "7 - ______ = 2", "type": "FIB", "correctAnswer": "5"},
    {"questionNumber": "49", "sectionTitle": "Part E: Missing Numbers", "question": "9 - ______ = 4", "type": "FIB", "correctAnswer": "5"},
    {"questionNumber": "50", "sectionTitle": "Part E: Missing Numbers", "question": "6 - ______ = 1", "type": "FIB", "correctAnswer": "5"},

    {"questionNumber": "51", "sectionTitle": "Part F: Number Comparisons", "question": "Compare: 8 ______ 5", "type": "MCQ", "options": [">", "<", "="], "correctAnswer": ">"},
    {"questionNumber": "52", "sectionTitle": "Part F: Number Comparisons", "question": "Compare: 3 ______ 7", "type": "MCQ", "options": [">", "<", "="], "correctAnswer": "<"},
    {"questionNumber": "53", "sectionTitle": "Part F: Number Comparisons", "question": "Compare: 10 ______ 10", "type": "MCQ", "options": [">", "<", "="], "correctAnswer": "="},
    {"questionNumber": "54", "sectionTitle": "Part F: Number Comparisons", "question": "Compare: 14 ______ 18", "type": "MCQ", "options": [">", "<", "="], "correctAnswer": "<"},
    {"questionNumber": "55", "sectionTitle": "Part F: Number Comparisons", "question": "Compare: 25 ______ 21", "type": "MCQ", "options": [">", "<", "="], "correctAnswer": ">"},
    {"questionNumber": "56", "sectionTitle": "Part F: Number Comparisons", "question": "Compare: 30 ______ 30", "type": "MCQ", "options": [">", "<", "="], "correctAnswer": "="},
    {"questionNumber": "57", "sectionTitle": "Part F: Number Comparisons", "question": "Compare: 42 ______ 24", "type": "MCQ", "options": [">", "<", "="], "correctAnswer": ">"},
    {"questionNumber": "58", "sectionTitle": "Part F: Number Comparisons", "question": "Compare: 19 ______ 20", "type": "MCQ", "options": [">", "<", "="], "correctAnswer": "<"},
    {"questionNumber": "59", "sectionTitle": "Part F: Number Comparisons", "question": "Compare: 50 ______ 50", "type": "MCQ", "options": [">", "<", "="], "correctAnswer": "="},
    {"questionNumber": "60", "sectionTitle": "Part F: Number Comparisons", "question": "Compare: 99 ______ 89", "type": "MCQ", "options": [">", "<", "="], "correctAnswer": ">"},

    {"questionNumber": "61", "sectionTitle": "Part G: Doubles & Halves", "question": "Double of 2 is ______", "type": "FIB", "correctAnswer": "4"},
    {"questionNumber": "62", "sectionTitle": "Part G: Doubles & Halves", "question": "Double of 5 is ______", "type": "FIB", "correctAnswer": "10"},
    {"questionNumber": "63", "sectionTitle": "Part G: Doubles & Halves", "question": "Double of 7 is ______", "type": "FIB", "correctAnswer": "14"},
    {"questionNumber": "64", "sectionTitle": "Part G: Doubles & Halves", "question": "Double of 10 is ______", "type": "FIB", "correctAnswer": "20"},
    {"questionNumber": "65", "sectionTitle": "Part G: Doubles & Halves", "question": "Double of 12 is ______", "type": "FIB", "correctAnswer": "24"},
    {"questionNumber": "66", "sectionTitle": "Part G: Doubles & Halves", "question": "Half of 4 is ______", "type": "FIB", "correctAnswer": "2"},
    {"questionNumber": "67", "sectionTitle": "Part G: Doubles & Halves", "question": "Half of 10 is ______", "type": "FIB", "correctAnswer": "5"},
    {"questionNumber": "68", "sectionTitle": "Part G: Doubles & Halves", "question": "Half of 14 is ______", "type": "FIB", "correctAnswer": "7"},
    {"questionNumber": "69", "sectionTitle": "Part G: Doubles & Halves", "question": "Half of 20 is ______", "type": "FIB", "correctAnswer": "10"},
    {"questionNumber": "70", "sectionTitle": "Part G: Doubles & Halves", "question": "Half of 24 is ______", "type": "FIB", "correctAnswer": "12"},

    {"questionNumber": "71", "sectionTitle": "Part H: Practical Activities", "question": "Draw a triangle and color it blue.", "type": "ACTIVITY", "correctAnswer": "Activity / Teacher Checked"},
    {"questionNumber": "72", "sectionTitle": "Part H: Practical Activities", "question": "Draw a circle and divide it in half.", "type": "ACTIVITY", "correctAnswer": "Activity / Teacher Checked"},
    {"questionNumber": "73", "sectionTitle": "Part H: Practical Activities", "question": "Draw a square and color ½ of it.", "type": "ACTIVITY", "correctAnswer": "Activity / Teacher Checked"},
    {"questionNumber": "74", "sectionTitle": "Part H: Practical Activities", "question": "Draw 6 stars in a row.", "type": "ACTIVITY", "correctAnswer": "Activity / Teacher Checked"},
    {"questionNumber": "75", "sectionTitle": "Part H: Practical Activities", "question": "Draw a shape with 5 sides (Pentagon).", "type": "ACTIVITY", "correctAnswer": "Activity / Teacher Checked"},

    {"questionNumber": "76", "sectionTitle": "Part I: Word Problems", "question": "Ali has 5 marbles. He buys 4 more marbles. How many marbles does Ali have now?", "type": "SHORT", "correctAnswer": "9", "acceptedAnswers": ["9", "9 marbles"]},
    {"questionNumber": "77", "sectionTitle": "Part I: Word Problems", "question": "There are 10 birds on a branch. 3 birds fly away. How many birds remain on the branch?", "type": "SHORT", "correctAnswer": "7", "acceptedAnswers": ["7", "7 birds"]},
    {"questionNumber": "78", "sectionTitle": "Part I: Word Problems", "question": "A box contains 8 chocolates. You share ½ of the box with your sister. How many chocolates do you give her?", "type": "SHORT", "correctAnswer": "4", "acceptedAnswers": ["4", "4 chocolates"]},

    {"questionNumber": "79", "sectionTitle": "Part J: Data Handling", "context": "Fruit\tNumber\nApple\t4\nBanana\t3\nMango\t5\nOrange\t2", "question": "Which fruit has the highest number? ______", "type": "FIB", "correctAnswer": "Mango", "acceptedAnswers": ["Mango", "mango"]},
    {"questionNumber": "80", "sectionTitle": "Part J: Data Handling", "context": "Fruit\tNumber\nApple\t4\nBanana\t3\nMango\t5\nOrange\t2", "question": "How many fruits are there altogether? ______", "type": "FIB", "correctAnswer": "14", "acceptedAnswers": ["14", "14 fruits"]}
  ]
}
```
