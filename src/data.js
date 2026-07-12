/* =============================================================
   YOUR PORTFOLIO CONTENT  —  edit this file to update the site
   -------------------------------------------------------------
   Change text here, save, and the dev server hot-reloads.
   Add a project? Copy a { ... } block inside "projects".
   ============================================================= */

export const DATA = {

  /* ---- Basic identity ---- */
  name: "Yahia Elgayar",
  roles: [
    "AI & Machine Learning",
    "Data Science",
    "Computer Vision",
    "Deep Learning"
  ],
  tagline:
    "Computer Engineering student turning complex data into practical, intelligent systems — from deep-learning models to interactive dashboards.",

  /* Accent colours (kept as an AI-leaning cyan/blue so it reads distinct
     from the reference site). --accent is primary; --accent-2 the glow. */
  accent: "#38e1ff",
  accent2: "#7c9bff",

  location: "Cairo, Egypt",
  email: "yahiagayar2005@gmail.com",
  links: {
    github: "https://github.com/Yahiaelgayarrr",
    linkedin: "https://linkedin.com/in/yahia-elgayar",
    resume: "", // drop assets/resume.pdf and set to "assets/resume.pdf"
  },

  /* ---- About ---- */
  about: [
    "I'm a Computer Engineering student at the German University in Cairo, focused on Artificial Intelligence, Machine Learning, and Data Science. I like building things end to end — from benchmarking deep-learning models and engineering data pipelines to shipping analytics and dashboards people actually use.",
    "My A+ (98/100) bachelor thesis — a real-time crowd-analysis computer-vision system — was nominated by GUC for a showcase in Berlin and earned a research-internship offer. Combined with data-engineering experience at IBM, I'm aiming for AI / data-science roles and an English-taught Master's in Germany."
  ],

  stats: [
    { value: 98, suffix: "/100", label: "Bachelor Thesis (A+)" },
    { value: 7.7, suffix: "M+", label: "Records Analyzed" },
    { value: 8, suffix: "+", label: "Projects Built" },
    { value: 2, suffix: "", label: "Tech Internships" }
  ],

  /* ---- Skills ---- */
  skills: [
    { group: "Languages", items: ["Python", "Java", "C++", "SQL"] },
    { group: "AI / Machine Learning", items: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "Deep Learning"] },
    { group: "Computer Vision", items: ["OpenCV", "YOLO", "FIDTM", "LabelMe"] },
    { group: "Data & Analytics", items: ["Pandas", "NumPy", "EDA", "ETL Pipelines", "Azure Data Factory", "SSIS"] },
    { group: "Visualization & Apps", items: ["Power BI", "Matplotlib", "Seaborn", "Streamlit"] },
    { group: "Web & Databases", items: ["React", "Node.js", "Express", "MongoDB", "SQL Server", "Git"] }
  ],

  /* ---- Education ---- */
  education: [
    {
      period: "2022 — 2027",
      title: "B.Sc. Computer Engineering",
      org: "German University in Cairo (GUC)",
      detail: "AI / Machine Learning specialization. Bachelor thesis graded A+ (98/100). Expected graduation 2027."
    }
  ],

  /* ---- Experience ---- */
  experience: [
    {
      period: "Aug 2025 — Sep 2025",
      title: "Data Engineer Intern",
      org: "IBM, Cairo",
      detail: "Built a data warehouse from the ground up for Finlytics, a financial-analytics platform. Engineered ETL pipelines in Azure Data Factory, integrated SQL Server + MongoDB, and delivered Power BI dashboards."
    },
    {
      period: "Jul 2024",
      title: "Data Analyst Intern",
      org: "Hyve Technology Consultant, Cairo",
      detail: "Cleaned and preprocessed raw datasets in SQL, built interactive Power BI dashboards, and supported end-to-end ETL workflows using SSIS."
    }
  ],

  /* ---- Featured project ---- */
  featured: {
    label: "Bachelor Thesis · Graded A+ (98/100)",
    title: "Crowd Analysis System",
    description:
      "An end-to-end computer-vision system that turns CCTV-style video into crowd counts, head-localization points, heatmaps, and zone-level risk analysis. Benchmarked crowd-localization models (FIDTM, PET, STEERER) and built a Streamlit dashboard with a data-grounded AI assistant.",
    highlights: [
      "Nominated by GUC management for a showcase event in Berlin",
      "Offered a research internship to extend the project",
      "Selected FIDTM for the best accuracy/runtime balance (MAE 3.61, F1 0.73 on FDST)",
      "Rule-based risk classifier (LOW / MEDIUM / HIGH / CRITICAL) with polygon zone analysis"
    ],
    tags: ["Python", "PyTorch", "OpenCV", "FIDTM", "Streamlit"],
    category: "AI / Computer Vision",
    link: "https://github.com/Yahiaelgayarrr/Crowd_Analysis_System"
  },

  filters: ["All", "AI / Computer Vision", "Data Analysis", "Web", "Games"],

  /* ---- Projects ---- */
  projects: [
    {
      title: "RoadPulse Analytics",
      description: "US traffic-accident risk analysis over 7.7M+ records — data pipeline, exploration, and interactive risk dashboards.",
      tags: ["Python", "Power BI", "Data Analysis"],
      category: "Data Analysis",
      link: "https://github.com/Yahiaelgayarrr/roadpulse-analytics"
    },
    {
      title: "Talabat Egypt Data Analysis",
      description: "End-to-end EDA on 100,000 food-delivery orders — cleaning, KPI calculations, dashboards, and business recommendations.",
      tags: ["Pandas", "NumPy", "Seaborn"],
      category: "Data Analysis",
      link: "https://github.com/Yahiaelgayarrr/talabat-egypt-analysis"
    },
    {
      title: "Car Sales Data Analysis",
      description: "End-to-end car-sales analysis with Pandas and KPI reporting, an interactive dashboard, and actionable business insights.",
      tags: ["Python", "Pandas", "Dashboard"],
      category: "Data Analysis",
      link: "https://github.com/Yahiaelgayarrr/car-sales-data-analysis"
    },
    {
      title: "Sales Data Analysis",
      description: "Exploration, KPI calculation, dashboards, and reporting across a full sales dataset lifecycle.",
      tags: ["Python", "EDA", "KPIs"],
      category: "Data Analysis",
      link: "https://github.com/Yahiaelgayarrr/sales-data-analysis"
    },
    {
      title: "Event Management System",
      description: "Full-stack MERN platform for managing events, vendors, and bookings with role-based auth and RESTful APIs.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      category: "Web",
      link: "https://github.com/Yahiaelgayarrr/internship-event-management-system"
    },
    {
      title: "Attack on Titan — Tower Defense",
      description: "One-player endless tower-defense game with wall-defense mechanics, built in Java with an object-oriented design.",
      tags: ["Java", "OOP", "Game Dev"],
      category: "Games",
      link: "https://github.com/Yahiaelgayarrr/Attack-On-Titan-Game"
    }
  ],

  /* ---- Achievements ---- */
  achievements: [
    "Bachelor thesis graded A+ (98/100) — top mark for applied computer-vision work",
    "Nominated by GUC management for a project showcase in Berlin",
    "Offered a research internship to extend the thesis project",
    "Data-engineering internship at IBM — built a financial-analytics data warehouse end to end"
  ]
};
