/* =============================================================
   YOUR PORTFOLIO CONTENT
   -------------------------------------------------------------
   This is the ONLY file you need to edit to update your site.
   Change the text below, save, and refresh. That's it.
   Add a project? Copy a { ... } block inside "projects" and edit.
   ============================================================= */

const DATA = {

  /* ---- Basic identity ---- */
  name: "Your Name",
  // Short roles that cycle in the animated intro. Add/remove freely.
  roles: [
    "Software Engineer",
    "Master's Applicant",
    "Problem Solver",
    "Lifelong Learner"
  ],
  // One or two sentences under your name.
  tagline: "Recent graduate passionate about building meaningful software and pursuing advanced study in my field.",

  // The accent color of the whole site. Try "#64ffda", "#7c5cff", "#ff6b6b".
  accent: "#64ffda",

  // Contact + social links. Leave a value empty ("") to hide that button.
  location: "City, Country",
  email: "you@example.com",
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    // Path to your CV file placed in the /assets folder, or a URL.
    resume: "assets/resume.pdf",
    scholar: "",     // Google Scholar (great for master's apps) or ""
    twitter: ""
  },

  /* ---- About section ---- */
  about: [
    "Write a paragraph about who you are, what drives you, and what you're looking for. Mention the field you want to pursue a master's in and the kind of roles you're targeting.",
    "A second short paragraph is optional — talk about your interests, values, or what makes you a strong candidate."
  ],
  // Quick stat highlights (shown as cards). Edit or remove.
  stats: [
    { value: "3.8", label: "GPA / 4.0" },
    { value: "5+",  label: "Projects" },
    { value: "2",   label: "Internships" }
  ],

  /* ---- Skills (grouped) ---- */
  skills: [
    { group: "Languages",  items: ["Python", "JavaScript", "C++", "SQL"] },
    { group: "Frameworks", items: ["React", "Node.js", "Flask", "TensorFlow"] },
    { group: "Tools",      items: ["Git", "Docker", "Linux", "Figma"] }
  ],

  /* ---- Education (timeline) ---- */
  education: [
    {
      period: "2021 — 2025",
      title: "B.Sc. in Your Major",
      org: "Your University",
      detail: "Relevant coursework, honors, thesis topic, or GPA. Anything that strengthens a master's application goes here."
    }
  ],

  /* ---- Experience (timeline) ---- */
  experience: [
    {
      period: "Summer 2024",
      title: "Software Engineering Intern",
      org: "Company Name",
      detail: "What you built and the impact. Use numbers where you can (improved X by Y%, served Z users)."
    }
  ],

  /* ---- Projects (cards) ----
     Copy a whole { ... } block to add a new project. */
  projects: [
    {
      title: "Project One",
      description: "A one-to-two sentence description of what it does and why it's interesting.",
      tags: ["Python", "Machine Learning"],
      link: "https://github.com/yourusername/project-one",  // or "" to hide
      demo: ""   // live demo URL, or "" to hide
    },
    {
      title: "Project Two",
      description: "Another project. Highlight the hardest problem you solved.",
      tags: ["React", "Node.js"],
      link: "https://github.com/yourusername/project-two",
      demo: ""
    },
    {
      title: "Project Three",
      description: "Research, coursework, or a personal build you're proud of.",
      tags: ["C++", "Algorithms"],
      link: "",
      demo: ""
    }
  ],

  /* ---- Achievements / awards (optional list) ---- */
  achievements: [
    "Dean's List — 2022, 2023",
    "1st place, University Hackathon 2024",
    "Publication or certificate you want to feature"
  ]
};
