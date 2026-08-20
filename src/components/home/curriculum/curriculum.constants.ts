import { SubjectData } from "./curriculum.types";

export const CURRICULUM_SUBJECTS: SubjectData[] = [
  {
    id: "sub-math",
    name: "Mathematics",
    tagline: "Master algebraic logic, spatial geometry, and statistical algorithms.",
    iconName: "Variable",
    difficultyLevel: "Intermediate",
    estimatedDuration: "10 Months",
    lessonCount: 120,
    worksheetCount: 80,
    quizCount: 40,
    overview: {
      overview: "O-Level Mathematics Syllabus D (4024) focuses on building problem-solving ability, arithmetic reasoning, geometry, and logical thinking. Our curriculum streamlines these modules to ensure absolute clarity across physical derivations.",
      learningObjectives: [
        "Formulate and solve multi-variable algebraic equations",
        "Decode geometric theorems and spatial trigonometry maps",
        "Compute probability matrices and statistical variations",
        "Evaluate rates, percentages, and financial math vectors"
      ],
      skillsDeveloped: [
        { id: "sm-1", name: "Logical Deduction", percentage: 95 },
        { id: "sm-2", name: "Problem Solving", percentage: 92 },
        { id: "sm-3", name: "Mathematical Modeling", percentage: 88 },
        { id: "sm-4", name: "Statistical Inference", percentage: 85 }
      ],
      studyPlan: {
        weeklyCommitment: "5 Hours recommended learning & reviews",
        assessmentFrequency: "Staggered diagnostic micro-check every Saturday",
        revisionStructure: "Iterative past exam spacing and time mock drills"
      },
      careerPathways: [
        "Aerospace & Software Engineering",
        "Financial Quantitative Analytics",
        "Machine Learning Research",
        "Actuarial Science & Accounting"
      ],
      prerequisites: ["Grade 5 Basic Arithmetic", "Introductory Pre-Algebra"],
      certificationName: "Cambridge CIE O-Level Mathematics D (4024) Proficiency"
    },
    statistics: [
      { id: "mstat-1", label: "Completed Questions", value: "3,200+", description: "Grounded in official exam criteria" },
      { id: "mstat-2", label: "Interactive Calculators", value: "15", description: "Bespoke visualization tools" }
    ],
    resources: [
      { id: "mres-1", title: "Video Conceptual Masterclass", description: "High-density tutorials for calculus and proofs", iconName: "Play", countLabel: "45 video guides" },
      { id: "mres-2", title: "Diagnostic Worksheets", description: "Targeted problem sets mapping structural deficits", iconName: "FileText", countLabel: "80 worksheets" }
    ],
    aiTools: [
      { id: "mai-1", name: "Socratic Algebra Coach", description: "Step-by-step formula guidance using inquiry loops", iconName: "Brain" },
      { id: "mai-2", name: "Math Error Diagnostics", description: "Analyzes uploading homework files for logic errors", iconName: "Activity" }
    ],
    topicGroups: [
      {
        id: "mtg-1",
        groupTitle: "Algebraic Reasoning & Functions",
        estimatedDuration: "3 Months",
        topics: [
          { id: "mt-1", title: "Linear Equations & Formula Manipulation", duration: "3 weeks", difficulty: "Beginner", lessonCount: 12 },
          { id: "mt-2", title: "Quadratic Expressions & Factorization", duration: "4 weeks", difficulty: "Intermediate", lessonCount: 16 },
          { id: "mt-3", title: "Indices, Surds & Exponential Formulations", duration: "3 weeks", difficulty: "Advanced", lessonCount: 10 }
        ]
      },
      {
        id: "mtg-2",
        groupTitle: "Geometry, Mensuration & Vector Space",
        estimatedDuration: "4 Months",
        topics: [
          { id: "mt-4", title: "Trigonometric Ratios & Sine/Cosine Rules", duration: "4 weeks", difficulty: "Intermediate", lessonCount: 15 },
          { id: "mt-5", title: "Circle Theorems & Spatial Properties", duration: "3 weeks", difficulty: "Advanced", lessonCount: 12 },
          { id: "mt-6", title: "Coordinate Geometry & Translation Matrices", duration: "3 weeks", difficulty: "Intermediate", lessonCount: 10 }
        ]
      }
    ],
    stages: [
      { id: "mst-1", title: "Logical Foundations", description: "Understand basic pre-algebra structures and arithmetic matrices.", iconName: "Compass" },
      { id: "mst-2", title: "Functional Mastery", description: "Tackle advanced formulas, trigonometric equations, and circular geometry proofs.", iconName: "Zap" },
      { id: "mst-3", title: "Board Certification", description: "Hone examination speed and layout standards across 10 years of mock papers.", iconName: "Award" }
    ]
  },
  {
    id: "sub-science",
    name: "Science",
    tagline: "Explore chemical systems, organic molecular kinetics, and thermodynamic physics.",
    iconName: "Atom",
    difficultyLevel: "Advanced",
    estimatedDuration: "12 Months",
    lessonCount: 150,
    worksheetCount: 90,
    quizCount: 50,
    overview: {
      overview: "A comprehensive, accelerated path combining CIE O-Level Physics (5054) & Chemistry (5070). Learn physical mechanics, electrical loops, chemical stoichiometry, and kinetic particle systems.",
      learningObjectives: [
        "Analyze kinetic equations, Newtonian mechanics, and wave properties",
        "Formulate and balance chemical reactions and stoichiometric ratios",
        "Map electrical circuits, magnetic flux fields, and atomic decays",
        "Design empirical labs matching scientific inquiry standards"
      ],
      skillsDeveloped: [
        { id: "ss-1", name: "Hypothesis Formulation", percentage: 94 },
        { id: "ss-2", name: "Data Analysis", percentage: 90 },
        { id: "ss-3", name: "Chemical Modeling", percentage: 86 },
        { id: "ss-4", name: "Lab Systems Design", percentage: 80 }
      ],
      studyPlan: {
        weeklyCommitment: "6 Hours weekly, including guided digital labs",
        assessmentFrequency: "Bi-weekly timed objective tests",
        revisionStructure: "CIE rubric spacing and comprehensive formula sheets"
      },
      careerPathways: [
        "Chemical & Quantum Engineering",
        "Biochemical Research & Medicine",
        "Astroparticle Physics Research",
        "Renewable Energy Systems Development"
      ],
      prerequisites: ["Introductory Chemistry", "General Physics Models"],
      certificationName: "EBM Accelerated O-Level General Science Distinction"
    },
    statistics: [
      { id: "sstat-1", label: "Simulated Lab Hours", value: "48h+", description: "Interactive physical systems modeled" },
      { id: "sstat-2", label: "Diagnostic Checkpoints", value: "35", description: "Verify concept alignment instantly" }
    ],
    resources: [
      { id: "sres-1", title: "Interactive Particle Labs", description: "Animate molecular bonding and mechanical vector forces", iconName: "Layers", countLabel: "20 simulations" },
      { id: "sres-2", title: "Past Paper Question Banks", description: "Syllabus-aligned micro modules targeting common pitfalls", iconName: "FileCheck", countLabel: "1,200 questions" }
    ],
    aiTools: [
      { id: "sai-1", name: "AI Molecule Visualizer", description: "3D structure feedback with structural explanations", iconName: "Cpu" },
      { id: "sai-2", name: "Empirical Lab Companion", description: "Helps analyze physical experiments and error factors", iconName: "MessageCircle" }
    ],
    topicGroups: [
      {
        id: "stg-1",
        groupTitle: "Physics: Mechanics & Wave Dynamics",
        estimatedDuration: "5 Months",
        topics: [
          { id: "st-1", title: "Kinematics, Vector Forces & Mass Dynamics", duration: "4 weeks", difficulty: "Intermediate", lessonCount: 16 },
          { id: "st-2", title: "Thermodynamics, Ideal Gas Laws & Spacing", duration: "3 weeks", difficulty: "Intermediate", lessonCount: 12 },
          { id: "st-3", title: "Wave Motion, Optics & Electromagnetism", duration: "5 weeks", difficulty: "Advanced", lessonCount: 20 }
        ]
      },
      {
        id: "stg-2",
        groupTitle: "Chemistry: stoichiometry & Organic Chains",
        estimatedDuration: "4 Months",
        topics: [
          { id: "st-4", title: "Stoichiometry, Moles & Chemical Equations", duration: "4 weeks", difficulty: "Advanced", lessonCount: 18 },
          { id: "st-5", title: "Electrochemistry & Redox Reactions", duration: "3 weeks", difficulty: "Advanced", lessonCount: 14 },
          { id: "st-6", title: "Organic Chemistry: Alkanes, Esters & Synthesis", duration: "4 weeks", difficulty: "Advanced", lessonCount: 15 }
        ]
      }
    ],
    stages: [
      { id: "sst-1", title: "Empirical Foundations", description: "Identify basic kinematic principles, stoichiometry constants, and states of matter.", iconName: "Compass" },
      { id: "sst-2", title: "Systems Analysis", description: "Deduce wave formulas, thermodynamic mechanics, and redox reactions.", iconName: "Zap" },
      { id: "sst-3", title: "Cambridge Integration", description: "Master long-form numerical calculations and alternative-to-practical exams.", iconName: "Award" }
    ]
  },
  {
    id: "sub-english",
    name: "English Language",
    tagline: "Cultivate rhetoric clarity, argumentative writing, and structural comprehension.",
    iconName: "PenTool",
    difficultyLevel: "Foundation",
    estimatedDuration: "8 Months",
    lessonCount: 90,
    worksheetCount: 60,
    quizCount: 30,
    overview: {
      overview: "O-Level English Language (1123) equips students with elite comprehension, lexical analysis, structural coherence, and persuasive writing skills. Our Socratic approach expands active vocabulary by analyzing historical and current academic texts.",
      learningObjectives: [
        "Synthesize and critique editorial columns and literature pieces",
        "Formulate well-argued, cohesive argumentative essays",
        "Analyze text tones, subtext devices, and figurative grammar",
        "Draft concise summaries under strict syllable guidelines"
      ],
      skillsDeveloped: [
        { id: "es-1", name: "Rhetorical Writing", percentage: 96 },
        { id: "es-2", name: "Textual Comprehension", percentage: 92 },
        { id: "es-3", name: "Critical Summary Drafts", percentage: 90 },
        { id: "es-4", name: "Vocabulary Complexity", percentage: 88 }
      ],
      studyPlan: {
        weeklyCommitment: "4 Hours weekly, with heavy emphasis on active reading",
        assessmentFrequency: "Weekly vocabulary check and summary write-ups",
        revisionStructure: "Rubric-guided essays draft iterations with AI"
      },
      careerPathways: [
        "Corporate Communication & PR",
        "Journalism, Media & Digital Law",
        "Academic Research & Philosophy",
        "Publishing & Literature Editing"
      ],
      prerequisites: ["Grade 5 Reading Comprehension", "Basic Sentence Structure"],
      certificationName: "CIE O-Level English Language (1123) Certificate"
    },
    statistics: [
      { id: "estat-1", label: "Essays Drafted & Checked", value: "32", description: "With granular paragraph analysis" },
      { id: "estat-2", label: "Active Lexicon Expanded", value: "1,500+", description: "Sophisticated words mastered in context" }
    ],
    resources: [
      { id: "eres-1", title: "Rhetorical Framework Maps", description: "Structural blueprints for persuasive, narrative, and analytical styles", iconName: "FileText", countLabel: "15 cheat-sheets" },
      { id: "eres-2", title: "Comprehension Passages", description: "Curated long-form articles with detailed feedback guidelines", iconName: "BookOpen", countLabel: "40 sets" }
    ],
    aiTools: [
      { id: "eai-1", name: "AI Rhetoric Coach", description: "Checks grammar, logic flow, and vocabulary complexity", iconName: "PenTool" },
      { id: "eai-2", name: "Lexical Helper", description: "Offers contextual synonym modifications in real time", iconName: "MessageSquare" }
    ],
    topicGroups: [
      {
        id: "etg-1",
        groupTitle: "Argumentative & Persuasive Writing",
        estimatedDuration: "3 Months",
        topics: [
          { id: "et-1", title: "Thesis Formations & Paragraph Integration", duration: "4 weeks", difficulty: "Beginner", lessonCount: 12 },
          { id: "et-2", title: "Rhetorical Fallacies & Analytical Arguments", duration: "4 weeks", difficulty: "Intermediate", lessonCount: 14 },
          { id: "et-3", title: "Cambridge Board Essay Refinement", duration: "3 weeks", difficulty: "Advanced", lessonCount: 10 }
        ]
      },
      {
        id: "etg-2",
        groupTitle: "Comprehension & Summary Synthesis",
        estimatedDuration: "2.5 Months",
        topics: [
          { id: "et-4", title: "Contextual Vocabulary & Tone Identification", duration: "3 weeks", difficulty: "Intermediate", lessonCount: 10 },
          { id: "et-5", title: "Selective Information Extraction & Merging", duration: "3 weeks", difficulty: "Intermediate", lessonCount: 12 },
          { id: "et-6", title: "Grammar Framework Mechanics & Flow", duration: "2 weeks", difficulty: "Beginner", lessonCount: 8 }
        ]
      }
    ],
    stages: [
      { id: "est-1", title: "Linguistic Base", description: "Reinforce grammar flow, sentence transitions, and general vocabulary breadth.", iconName: "Compass" },
      { id: "est-2", title: "Logical Expression", description: "Analyze advanced text materials and construct complex persuasive arguments.", iconName: "Zap" },
      { id: "est-3", title: "Board Precision", description: "Perfect time-bound narrative papers and summary mappings.", iconName: "Award" }
    ]
  },
  {
    id: "sub-cs",
    name: "Computer Science",
    tagline: "Learn data structures, algorithms, logic gates, and Python scripting.",
    iconName: "Code",
    difficultyLevel: "Advanced",
    estimatedDuration: "9 Months",
    lessonCount: 100,
    worksheetCount: 50,
    quizCount: 30,
    overview: {
      overview: "CIE O-Level Computer Science (2210) provides a modern approach to algorithmic thinking, digital logic, data representation, hardware components, and software programming. Learn real computer architecture.",
      learningObjectives: [
        "Translate algorithmic pseudo-code into functional Python scripts",
        "Construct complex boolean logic circuits and truth matrices",
        "Evaluate binary, hexadecimal, and data transmission protocols",
        "Design functional database schemas and SQL queries"
      ],
      skillsDeveloped: [
        { id: "cs-1", name: "Algorithmic Logic", percentage: 95 },
        { id: "cs-2", name: "Code Debugging", percentage: 90 },
        { id: "cs-3", name: "Digital Circuitry", percentage: 88 },
        { id: "cs-4", name: "Database Engineering", percentage: 82 }
      ],
      studyPlan: {
        weeklyCommitment: "4 Hours weekly, combining compiler tasks and theory reviews",
        assessmentFrequency: "Sparsely spaced diagnostic diagnostic debugging quizzes",
        revisionStructure: "Iterative past programming paper reviews and schema planning"
      },
      careerPathways: [
        "Full-Stack Software Development",
        "Cybersecurity & Threat Mitigation",
        "Systems Architecture & Engineering",
        "Relational Database Administration"
      ],
      prerequisites: ["Introductory Algebra", "Coordinate Coordinate Geometry"],
      certificationName: "Cambridge CIE O-Level Computer Science (2210) Certificate"
    },
    statistics: [
      { id: "csstat-1", label: "Scripts Compiled", value: "240+", description: "In real-world browser coding workspace" },
      { id: "csstat-2", label: "Circuit Simulator Labs", value: "18", description: "Simulating true Boolean components" }
    ],
    resources: [
      { id: "csres-1", title: "Syntax Framework Cheats", description: "Summarized guides for programming logic, conditional rules, and loops", iconName: "FileCode", countLabel: "10 compiler cheat-sheets" },
      { id: "csres-2", title: "Pseudo-Code Interactive Bank", description: "Trace-table practices aligned with CIE examinations formats", iconName: "Terminal", countLabel: "35 trace sets" }
    ],
    aiTools: [
      { id: "csai-1", name: "Socratic Coding Mentor", description: "Helps fix compiling issues by raising logical inquiries", iconName: "Terminal" },
      { id: "csai-2", name: "Algorithmic Planner AI", description: "Verifies the performance of logic loops and variables", iconName: "Cpu" }
    ],
    topicGroups: [
      {
        id: "csg-1",
        groupTitle: "Theory of Computer Science",
        estimatedDuration: "4 Months",
        topics: [
          { id: "cst-1", title: "Binary, Hexadecimal & Data Formats", duration: "3 weeks", difficulty: "Beginner", lessonCount: 10 },
          { id: "cst-2", title: "Internet Communication & Encryption Networks", duration: "3 weeks", difficulty: "Intermediate", lessonCount: 12 },
          { id: "cst-3", title: "Boolean Logic Gates & Integrated Circuits", duration: "4 weeks", difficulty: "Advanced", lessonCount: 15 }
        ]
      },
      {
        id: "csg-2",
        groupTitle: "Practical Problem-Solving & Coding",
        estimatedDuration: "3.5 Months",
        topics: [
          { id: "cst-4", title: "Algorithm Design, Flowcharts & Trace Tables", duration: "4 weeks", difficulty: "Intermediate", lessonCount: 14 },
          { id: "cst-5", title: "Python Scripting: Variables, Loops & Lists", duration: "5 weeks", difficulty: "Advanced", lessonCount: 18 },
          { id: "cst-6", title: "SQL Database Queries & Relational Setup", duration: "3 weeks", difficulty: "Advanced", lessonCount: 10 }
        ]
      }
    ],
    stages: [
      { id: "csst-1", title: "Data Frameworks", description: "Understand hexadecimal representation, binary mathematical scales, and internet routing.", iconName: "Compass" },
      { id: "csst-2", title: "Logical Algorithms", description: "Synthesize flowcharts, calculate Boolean logic tables, and trace variables.", iconName: "Zap" },
      { id: "csst-3", title: "Python Programming", description: "Write structured scripts solving algebraic problems under exam constraints.", iconName: "Award" }
    ]
  },
  {
    id: "sub-pk",
    name: "Pakistan Studies",
    tagline: "Trace chronological socio-political history and geographic resources.",
    iconName: "Compass",
    difficultyLevel: "Foundation",
    estimatedDuration: "7 Months",
    lessonCount: 80,
    worksheetCount: 40,
    quizCount: 20,
    overview: {
      overview: "CIE O-Level Pakistan Studies (2059) spans historical narratives (History & Culture of Pakistan) and geographic landscapes (Environment of Pakistan). Learn the geopolitical factors that shaped the subcontinent.",
      learningObjectives: [
        "Evaluate the decline of the Mughal Empire and the British East India Company",
        "Critique socio-political movements leading to the Lahore Resolution (1940)",
        "Map geological features, river valleys, and natural resource deposits",
        "Deconstruct demographic, agricultural, and industrial policies"
      ],
      skillsDeveloped: [
        { id: "ps-1", name: "Socio-Political Analysis", percentage: 92 },
        { id: "ps-2", name: "Geographic Mapping", percentage: 88 },
        { id: "ps-3", name: "Chronological Ordering", percentage: 85 },
        { id: "ps-4", name: "Source Analysis", percentage: 80 }
      ],
      studyPlan: {
        weeklyCommitment: "3.5 Hours weekly, split between history and geography",
        assessmentFrequency: "Weekly spaced retrieval revision checks",
        revisionStructure: "Timed mock response drafts addressing CIE sub-questions"
      },
      careerPathways: [
        "Geopolitical Strategic Strategy",
        "Public Policy & Administration",
        "Environmental Planning & Geography",
        "Diplomatic & International Relations"
      ],
      prerequisites: ["Introductory Social Sciences"],
      certificationName: "Cambridge CIE O-Level Pakistan Studies (2059) Credential"
    },
    statistics: [
      { id: "pstat-1", label: "Interactive Historical Timelines", value: "14", description: "Visual chronological chains" },
      { id: "pstat-2", label: "Resource Maps Analyzed", value: "45", description: "Industrial and soil zones mapped" }
    ],
    resources: [
      { id: "pres-1", title: "Historical Timelines", description: "Condensed visual maps from 1600 to 1999 AD", iconName: "Clock", countLabel: "14 timelines" },
      { id: "pres-2", title: "Topographical Maps", description: "Detailed geographical layouts of Pakistan's river basins", iconName: "Map", countLabel: "25 maps" }
    ],
    aiTools: [
      { id: "pai-1", name: "Chronology Coach AI", description: "Gives hints on cause-and-effect historical factors", iconName: "Clock" },
      { id: "pai-2", name: "Socratic Essay Reader", description: "Verifies the clarity and logical flow of historical essays", iconName: "BookOpen" }
    ],
    topicGroups: [
      {
        id: "pkg-1",
        groupTitle: "Socio-Political Historical Milestones",
        estimatedDuration: "3.5 Months",
        topics: [
          { id: "pkt-1", title: "Mughal Decline & British Consolidation", duration: "3 weeks", difficulty: "Beginner", lessonCount: 10 },
          { id: "pkt-2", title: "Two-Nation Theory & Political Milestones (1906-1947)", duration: "5 weeks", difficulty: "Intermediate", lessonCount: 16 },
          { id: "pkt-3", title: "Post-Independence Constitutional Transitions (1947-1999)", duration: "4 weeks", difficulty: "Advanced", lessonCount: 12 }
        ]
      },
      {
        id: "pkg-2",
        groupTitle: "Environment & Geographic Structures",
        estimatedDuration: "3 Months",
        topics: [
          { id: "pkt-4", title: "Topography, Soil Profiles & Weather Patterns", duration: "3 weeks", difficulty: "Beginner", lessonCount: 10 },
          { id: "pkt-5", title: "Water Distribution & Agricultural Frameworks", duration: "4 weeks", difficulty: "Intermediate", lessonCount: 14 },
          { id: "pkt-6", title: "Industrial Sectors, Demographics & Economy", duration: "3 weeks", difficulty: "Intermediate", lessonCount: 12 }
        ]
      }
    ],
    stages: [
      { id: "pkst-1", title: "Historical Narratives", description: "Understand subcontinent political progression and British colonization factors.", iconName: "Compass" },
      { id: "pkst-2", title: "Geographical Layouts", description: "Formulate environmental profiles mapping resources and climate variations.", iconName: "Zap" },
      { id: "pkst-3", title: "Cambridge Evaluation", description: "Structure critical historical writeups evaluating 7-mark and 14-mark rubric points.", iconName: "Award" }
    ]
  },
  {
    id: "sub-islamiat",
    name: "Islamiat",
    tagline: "Explore Quranic passages, Hadith interpretations, and Islamic history.",
    iconName: "Globe",
    difficultyLevel: "Foundation",
    estimatedDuration: "6 Months",
    lessonCount: 70,
    worksheetCount: 35,
    quizCount: 15,
    overview: {
      overview: "CIE O-Level Islamiat (2058) teaches Quranic and Hadith translations, the Seerah of the Holy Prophet (PBUH), early Islamic community, and core beliefs and practices. Learn contextual application of Islamic laws.",
      learningObjectives: [
        "Interpret designated Quranic passages and Hadith categories",
        "Evaluate chronological events of early Islamic history",
        "Analyze the administrative structures of the Rightly Guided Caliphs",
        "Synthesize ethical codes and contemporary moral values"
      ],
      skillsDeveloped: [
        { id: "is-1", name: "Textual Interpretation", percentage: 90 },
        { id: "is-2", name: "Historical Structuring", percentage: 88 },
        { id: "is-3", name: "Moral Alignment", percentage: 86 },
        { id: "is-4", name: "Contextual Synthesis", percentage: 82 }
      ],
      studyPlan: {
        weeklyCommitment: "3 Hours weekly, focusing on structural essay layouts",
        assessmentFrequency: "Weekly Quranic passage retrieval drills",
        revisionStructure: "Timed mock response spacing aligned with CIE rubrics"
      },
      careerPathways: [
        "Islamic Financial Systems",
        "Comparative Religious Research",
        "Legal & Jurisprudential Ethics",
        "International Cultural Diplomacy"
      ],
      prerequisites: ["Basic Arabic Lettering Literacy"],
      certificationName: "Cambridge CIE O-Level Islamiat (2058) Certificate"
    },
    statistics: [
      { id: "istat-1", label: " Quranic Passages Decoded", value: "15", description: "Fully categorized with context themes" },
      { id: "istat-2", label: "Hadith Modules Analyzed", value: "20", description: "Grounded in moral ethics" }
    ],
    resources: [
      { id: "ires-1", title: "Quranic Passage Maps", description: "Syllabus themes and textual analysis maps", iconName: "BookOpen", countLabel: "15 cheat-sheets" },
      { id: "ires-2", title: "Early History Blueprints", description: "Detailed structural diagrams of early battles and treaties", iconName: "Layout", countLabel: "12 blueprints" }
    ],
    aiTools: [
      { id: "iais-1", name: "Socratic Hadith Guide", description: "Explains translations and themes step-by-step", iconName: "HelpCircle" },
      { id: "iais-2", name: "History Evaluator AI", description: "Checks analytical response structures for chronological accuracy", iconName: "FileCheck" }
    ],
    topicGroups: [
      {
        id: "isg-1",
        groupTitle: "Quran & Early Islamic History",
        estimatedDuration: "3.5 Months",
        topics: [
          { id: "ist-1", title: "Quranic Passages & Major Themes (Tauheed, Creation)", duration: "3 weeks", difficulty: "Beginner", lessonCount: 10 },
          { id: "ist-2", title: "The Seerah of the Prophet (PBUH): Makkah & Madinah Phase", duration: "5 weeks", difficulty: "Intermediate", lessonCount: 16 },
          { id: "ist-3", title: "Early Community: Mothers of the Believers & Companions", duration: "3 weeks", difficulty: "Intermediate", lessonCount: 10 }
        ]
      },
      {
        id: "isg-2",
        groupTitle: "Ahadith & the Rightly Guided Caliphs",
        estimatedDuration: "2.5 Months",
        topics: [
          { id: "ist-4", title: "Selected Ahadith on Individual & Communal Ethics", duration: "3 weeks", difficulty: "Intermediate", lessonCount: 10 },
          { id: "ist-5", title: "Administrative Rules of the Rightly Guided Caliphs", duration: "4 weeks", difficulty: "Advanced", lessonCount: 14 },
          { id: "ist-6", title: "Core Islamic Beliefs, Pillars & Moral Practices", duration: "3 weeks", difficulty: "Beginner", lessonCount: 10 }
        ]
      }
    ],
    stages: [
      { id: "isst-1", title: "Quranic Foundations", description: "Understand core translation themes, early revelations, and theological definitions.", iconName: "Compass" },
      { id: "isst-2", title: "Seerah & Community", description: "Formulate timeline sequences of mechanical historic treaties and campaigns.", iconName: "Zap" },
      { id: "isst-3", title: "CIE Excellence", description: "Master comparative essay questions scoring full marks under official examiner rubrics.", iconName: "Award" }
    ]
  },
  {
    id: "sub-business",
    name: "Business Studies",
    tagline: "Understand market systems, supply chain structures, and operational logistics.",
    iconName: "Briefcase",
    difficultyLevel: "Intermediate",
    estimatedDuration: "8 Months",
    lessonCount: 95,
    worksheetCount: 45,
    quizCount: 25,
    overview: {
      overview: "CIE O-Level Business Studies (7115) introduces core corporate frameworks, marketing metrics, financial statement analyses, and human resource strategies. Learn practical business modeling.",
      learningObjectives: [
        "Evaluate optimal corporate structures and risk-allocation strategies",
        "Design multi-faceted marketing strategies and consumer segment maps",
        "Compute business cash flows, break-even charts, and asset metrics",
        "Deduce administrative frameworks and human resource loops"
      ],
      skillsDeveloped: [
        { id: "bs-1", name: "Corporate Strategy", percentage: 94 },
        { id: "bs-2", name: "Financial Calculations", percentage: 90 },
        { id: "bs-3", name: "Market Segmentation", percentage: 88 },
        { id: "bs-4", name: "Operational Logistics", percentage: 84 }
      ],
      studyPlan: {
        weeklyCommitment: "4 Hours weekly, including corporate case-study evaluations",
        assessmentFrequency: "Weekly timed conceptual diagnostic check-ins",
        revisionStructure: "Analysis of real corporate statements and CIE Past Papers"
      },
      careerPathways: [
        "Corporate Product & Strategy Management",
        "Venture Capital & Investment Planning",
        "Logistics & Operations Planning",
        "Commercial & Consumer Law"
      ],
      prerequisites: ["Introductory Social Sciences", "Arithmetic Arithmetic Progression"],
      certificationName: "Cambridge CIE O-Level Business Studies (7115) Certificate"
    },
    statistics: [
      { id: "bstat-1", label: "Business Case Studies Analyzed", value: "35+", description: "Real multinational data modeled" },
      { id: "bstat-2", label: "Practice Board Essays", value: "24", description: "Iterated against official rubrics" }
    ],
    resources: [
      { id: "bres-1", title: "Break-Even Templates", description: "Interactive diagnostic calculation visualizers", iconName: "Layout", countLabel: "15 templates" },
      { id: "bres-2", title: "Marketing Strategy Banks", description: "Summarized structures of standard corporate strategies", iconName: "FileText", countLabel: "20 case sets" }
    ],
    aiTools: [
      { id: "bsai-1", name: "Business Case Coach AI", description: "Suggests market expansion vectors using strategic prompts", iconName: "Brain" },
      { id: "bsai-2", name: "Socratic Statement Grader", description: "Verifies strategic break-even formulas in assignments", iconName: "FileCheck" }
    ],
    topicGroups: [
      {
        id: "bsg-1",
        groupTitle: "Corporate Structure & Marketing",
        estimatedDuration: "4 Months",
        topics: [
          { id: "bst-1", title: "Enterprise Types, Stakeholders & Risk Profiles", duration: "3 weeks", difficulty: "Beginner", lessonCount: 10 },
          { id: "bst-2", title: "Market Segmentation & the 4 Ps of Marketing Mix", duration: "4 weeks", difficulty: "Intermediate", lessonCount: 15 },
          { id: "bst-3", title: "Operations Planning, Scale Economies & Quality Control", duration: "3 weeks", difficulty: "Intermediate", lessonCount: 12 }
        ]
      },
      {
        id: "bsg-2",
        groupTitle: "Financial Analytics & Management",
        estimatedDuration: "3 Months",
        topics: [
          { id: "bst-4", title: "Human Resource Frameworks & Motivation Theories", duration: "3 weeks", difficulty: "Beginner", lessonCount: 10 },
          { id: "bst-5", title: "Capital Structuring, Cash Flows & Break-Even Charts", duration: "4 weeks", difficulty: "Advanced", lessonCount: 16 },
          { id: "bst-6", title: "Income Statements, Balance Sheets & Ratio Analysis", duration: "3 weeks", difficulty: "Advanced", lessonCount: 12 }
        ]
      }
    ],
    stages: [
      { id: "bsst-1", title: "Market Dynamics", description: "Identify core corporate setups, stakeholder metrics, and consumer motivation laws.", iconName: "Compass" },
      { id: "bsst-2", title: "Financial Modeling", description: "Deduce capital balance sheets, calculate break-even levels, and analyze ratios.", iconName: "Zap" },
      { id: "bsst-3", title: "CIE Masterclasses", description: "Formulate analytical past paper responses addressing 8-mark and 12-mark case evaluations.", iconName: "Award" }
    ]
  },
  {
    id: "sub-accounting",
    name: "Accounting",
    tagline: "Evaluate double-entry ledgers, balance sheets, and depreciation curves.",
    iconName: "TrendingUp",
    difficultyLevel: "Advanced",
    estimatedDuration: "10 Months",
    lessonCount: 110,
    worksheetCount: 55,
    quizCount: 25,
    overview: {
      overview: "CIE O-Level Principles of Accounts (7110) focuses on professional accounting frameworks, ledger balancing, capital adjustment, and financial sheet preparation.",
      learningObjectives: [
        "Synthesize comprehensive double-entry ledger books and ledger nodes",
        "Formulate and balance multi-factor trial balance sheets",
        "Calculate multi-year asset depreciation curves and adjustments",
        "Reconcile bank ledgers and financial statement anomalies"
      ],
      skillsDeveloped: [
        { id: "ac-1", name: "Double-Entry Bookkeeping", percentage: 96 },
        { id: "ac-2", name: "Financial Auditing", percentage: 92 },
        { id: "ac-3", name: "Ledger Structuring", percentage: 90 },
        { id: "ac-4", name: "Depreciation Modeling", percentage: 86 }
      ],
      studyPlan: {
        weeklyCommitment: "5 Hours weekly, split between double-entry drills and audits",
        assessmentFrequency: "Weekly diagnostic ledger verification tests",
        revisionStructure: "Practice ledger reconciliation under timed mock scenarios"
      },
      careerPathways: [
        "Chartered Accountancy (CA / ACCA)",
        "Corporate Financial Auditing",
        "Financial Risk Management",
        "Tax Planning & Strategic Consultation"
      ],
      prerequisites: ["Introductory Percentages", "Socratic Algebraic Balancing"],
      certificationName: "Cambridge CIE O-Level Principles of Accounts (7110) Credential"
    },
    statistics: [
      { id: "acstat-1", label: "Ledgers Balanced Successfully", value: "320+", description: "Real double-entry ledger audits" },
      { id: "acstat-2", label: "Formulas Covered", value: "18", description: "Depreciation, ratio and asset metrics" }
    ],
    resources: [
      { id: "acres-1", title: "Ledger Layout Sheets", description: "Standard bookkeeping ledger templates for cashbooks", iconName: "Layout", countLabel: "20 worksheets" },
      { id: "acres-2", title: "Diagnostic Past Papers", description: "Topic-specific accounts ledger reconciliation drills", iconName: "FileText", countLabel: "40 sets" }
    ],
    aiTools: [
      { id: "acai-1", name: "Socratic Audit Mentor", description: "Analyzes balance sheets for error vectors step-by-step", iconName: "Cpu" },
      { id: "acai-2", name: "Double-Entry Coach AI", description: "Traces debit and credit accounts to explain imbalances", iconName: "HelpCircle" }
    ],
    topicGroups: [
      {
        id: "acg-1",
        groupTitle: "Ledgers & Double-Entry Systems",
        estimatedDuration: "4.5 Months",
        topics: [
          { id: "act-1", title: "Double-Entry Rules, Cash Books & Ledgers", duration: "4 weeks", difficulty: "Beginner", lessonCount: 15 },
          { id: "act-2", title: "Trial Balance Compilation & Error Correction", duration: "4 weeks", difficulty: "Intermediate", lessonCount: 16 },
          { id: "act-3", title: "Bank Reconciliation Statements & Rules", duration: "3 weeks", difficulty: "Intermediate", lessonCount: 12 }
        ]
      },
      {
        id: "acg-2",
        groupTitle: "Financial Statement Adjustments",
        estimatedDuration: "4.5 Months",
        topics: [
          { id: "act-4", title: "Asset Depreciation & Disposal Calculations", duration: "4 weeks", difficulty: "Advanced", lessonCount: 18 },
          { id: "act-5", title: "Accruals, Prepayments & Capital Provisions", duration: "3 weeks", difficulty: "Advanced", lessonCount: 14 },
          { id: "act-6", title: "Income Statements & Balanced Financial Sheets", duration: "5 weeks", difficulty: "Advanced", lessonCount: 20 }
        ]
      }
    ],
    stages: [
      { id: "acst-1", title: "Bookkeeping Base", description: "Reinforce basic cash book systems, journal debiting, and credit principles.", iconName: "Compass" },
      { id: "acst-2", title: "Ledger Reconciliation", description: "Formulate bank reconciliation worksheets, trace ledger imbalances, and audit errors.", iconName: "Zap" },
      { id: "acst-3", title: "Financial Accounting", description: "Structure balance sheet projections accounting for advanced depreciation curves.", iconName: "Award" }
    ]
  },
  {
    id: "sub-economics",
    name: "Economics",
    tagline: "Deconstruct market mechanisms, inflation factors, and global exchange rates.",
    iconName: "TrendingDown",
    difficultyLevel: "Advanced",
    estimatedDuration: "9 Months",
    lessonCount: 100,
    worksheetCount: 50,
    quizCount: 20,
    overview: {
      overview: "CIE O-Level Economics (2281) deals with fundamental economic problems, resource allocation, market mechanisms, macroeconomic indicators, and global trade dynamics.",
      learningObjectives: [
        "Construct supply-demand equilibrium curves and calculate price elasticity",
        "Evaluate macroeconomic metrics: GDP, inflation indices, and employment ratios",
        "Critique government fiscal and monetary policy interventions",
        "Deconstruct international trade agreements, tariffs, and exchange rates"
      ],
      skillsDeveloped: [
        { id: "ec-1", name: "Economic Modeling", percentage: 95 },
        { id: "ec-2", name: "Market Elasticity", percentage: 92 },
        { id: "ec-3", name: "Data Trend Analysis", percentage: 88 },
        { id: "ec-4", name: "Policy Evaluation", percentage: 84 }
      ],
      studyPlan: {
        weeklyCommitment: "4.5 Hours weekly, involving current fiscal event evaluations",
        assessmentFrequency: "Weekly spaced retrieval diagnostic quizzes",
        revisionStructure: "Iterative past essay reviews mapping CIE's 8-mark questions"
      },
      careerPathways: [
        "Geopolitical Policy Advising",
        "Market Investment Research",
        "International Trade Strategy",
        "Macroeconomic Strategic Planning"
      ],
      prerequisites: ["Introductory Algebra", "Socratic Graphing Fundamentals"],
      certificationName: "Cambridge CIE O-Level Economics (2281) Certificate"
    },
    statistics: [
      { id: "ecstat-1", label: "Elasticity Models Solved", value: "140+", description: "Price and cross-elasticity models" },
      { id: "ecstat-2", label: "Trade Balance Case Studies", value: "18", description: "Global macro data analyzed" }
    ],
    resources: [
      { id: "ecres-1", title: "Elasticity Calculators", description: "Animate changes in demand, supply, and market surplus", iconName: "Layout", countLabel: "12 visualizers" },
      { id: "ecres-2", title: "Policy Analytical Files", description: "Summary maps of standard central bank interventions", iconName: "FileText", countLabel: "15 summaries" }
    ],
    aiTools: [
      { id: "ecai-1", name: "Market Equilibrium Coach", description: "Steers demand-supply calculation steps using Socratic prompts", iconName: "Brain" },
      { id: "ecai-2", name: "Socratic Essay Evaluator", description: "Analyzes strategic policy essays against CIE board expectations", iconName: "FileCheck" }
    ],
    topicGroups: [
      {
        id: "ecg-1",
        groupTitle: "Microeconomics & Market Systems",
        estimatedDuration: "4 Months",
        topics: [
          { id: "ect-1", title: "The Economic Problem: Scarcity & Opportunity Cost", duration: "2 weeks", difficulty: "Beginner", lessonCount: 8 },
          { id: "ect-2", title: "Market Equilibrium, Price Mechanics & Elasticity", duration: "5 weeks", difficulty: "Intermediate", lessonCount: 18 },
          { id: "ect-3", title: "Firm Costs, Revenues, scale Economies & Monopoly", duration: "4 weeks", difficulty: "Advanced", lessonCount: 14 }
        ]
      },
      {
        id: "ecg-2",
        groupTitle: "Macroeconomics & International Trade",
        estimatedDuration: "4.5 Months",
        topics: [
          { id: "ect-4", title: "GDP, Inflation Indices & Unemployment Drivers", duration: "4 weeks", difficulty: "Intermediate", lessonCount: 16 },
          { id: "ect-5", title: "Fiscal, Monetary & Supply-Side Policies", duration: "4 weeks", difficulty: "Advanced", lessonCount: 16 },
          { id: "ect-6", title: "Global Trade, Exchange Rates & Tariffs", duration: "4 weeks", difficulty: "Advanced", lessonCount: 15 }
        ]
      }
    ],
    stages: [
      { id: "ecst-1", title: "Economic Models", description: "Identify basic scarcity concepts, calculate elasticity, and graph equilibrium shifts.", iconName: "Compass" },
      { id: "ecst-2", title: "Policy Audits", description: "Deduce fiscal budgets, analyze central bank interest structures, and monitor inflation indices.", iconName: "Zap" },
      { id: "ecst-3", title: "Global Economics", description: "Structure critical essays evaluating trade deficits and currency floating calculations.", iconName: "Award" }
    ]
  }
];
