import { Project, SkillCategory, Milestone, Experience } from '@/types';

// ── Projects ──────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 'knowiki',
    name: 'KnoWiki',
    tagline: 'Versioned Knowledgebase for AI Agents',
    description:
      'A versioned knowledgebase platform for AI-driven development. Compiles raw sources (repos, logs, docs) into a structured, queryable knowledge layer with automated health checks, contradiction detection, and agent-readable context handoffs.',
    url: 'https://www.knowiki.in/',
    stack: ['Next.js', 'Python'],
    image: '/images/projects/knowiki.png',
    color: '#C8A97E',
  },
  {
    id: 'carma',
    name: 'CARMA',
    tagline: 'Carbon & Air Research Analysis',
    description:
      'Built a full-stack web application with a Flask-based backend and a Next.js frontend. Designed RESTful APIs and integrated them with a responsive UI for policy impact simulations.',
    url: 'https://carmawebsite.vercel.app/',
    stack: ['Python', 'Flask', 'Next.js'],
    image: '/images/projects/carma.png',
    color: '#4ca85b',
  },
  {
    id: 'analytical-archive',
    name: 'Analytical Archive',
    tagline: 'CGE Policy Simulation Platform',
    description:
      'Engineered a CGE simulation pipeline modeling macro and persona-level impacts. Built a causal graph engine and optimized simulations (<40ms) with automated insights.',
    url: 'https://analyticalarchive.vercel.app/',
    stack: ['React', 'Python'],
    image: '/images/projects/archive.png',
    color: '#9B59B6',
  },
  {
    id: 'helix',
    name: 'Helix',
    tagline: 'AI Scientist',
    description:
      'Designed a full-stack AI system with a RAG pipeline over 2.4M+ papers for protocol generation. Built an interactive UI for real-time refinement and predictive anomaly detection.',
    url: 'https://helix-hacknation.vercel.app/',
    stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'],
    image: '/images/projects/helix.png',
    color: '#1e94a6',
  },
  {
    id: 'resolve',
    name: 'Resolve',
    tagline: 'Take Control of Your Focus',
    description:
      'A React Native mental health app designed to help individuals overcome pornography addiction. Features an app and a Flask backend powered by Gemini AI, offering compassionate chatbot assistance and personalized recovery strategies based on PDI assessments.',
    url: 'https://resolvefocus.vercel.app/',
    stack: ['React Native', 'Flask', 'Firebase'],
    image: '/images/projects/resolve.png',
    color: '#8ac108',
  },
]

// ── Experience ────────────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    id: 'ameya-books',
    company: 'Ameya Books',
    role: 'Full Stack Developer',
    duration: 'Jan 2026 - Apr 2026',
    location: 'Hybrid, Delhi',
    description: [
      'Built a cross-platform React Native app for real-time inventory and sales with live Firestore synchronization.',
      'Developed an Express.js backend with Firebase RBAC, automating invoicing (PDFKit) and integrating cloud storage and payments.',
    ],
  },
  {
    id: 'appyard',
    company: 'AppYard Technologies',
    role: 'React Development Intern',
    duration: 'May 2025 - Jul 2025',
    location: 'Remote, Bengaluru',
    description: [
      'Architected and developed three interconnected mobile applications from scratch using React Native, Expo, and Redux Toolkit.',
      'Built and shipped six production web applications spanning live video streaming, webinar portals, and AI backends.',
    ],
  },
  {
    id: 'refactore',
    company: 'Refactore HU',
    role: 'Web Development Intern',
    duration: 'May 2024 - July 2024',
    location: 'Remote, Warsaw, Poland',
    description: [
      'Built the web presence for EXIST, a large-scale electronic music event brand hosting warehouse raves across Poland.',
      'Developed a full-stack event booking and ticketing platform serving an active community using React, PHP, and MySQL.',
    ],
  },
];

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    icon: '⌘',
    items: [
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'Python' },
      { name: 'Java' },
      { name: 'C++' },
      { name: 'SQL' },
      { name: 'PHP' },
    ],
  },
  {
    category: 'Frontend',
    icon: '◆',
    items: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'Tailwind CSS' },
      { name: 'HTML/CSS' },
    ],
  },
  {
    category: 'Backend',
    icon: '▲',
    items: [
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'FastAPI' },
      { name: 'Flask' },
      { name: 'REST APIs' },
    ],
  },
  {
    category: 'Database & Cloud',
    icon: '◉',
    items: [
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'Firebase' },
      { name: 'Firestore' },
      { name: 'MongoDB' },
    ],
  },
  {
    category: 'Mobile',
    icon: '●',
    items: [
      { name: 'React Native' },
      { name: 'Expo' },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: '⚙',
    items: [
      { name: 'Git' },
      { name: 'Docker' },
      { name: 'Vercel' },
      { name: 'Figma' },
    ],
  },
];

// ── Flat skill list for terminal animation ────────────────────────
export const terminalSkills = [
  'TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'SQL',
  'React', 'Next.js', 'Node.js', 'PostgreSQL', 'React Native',
];

// ── About Section - Personal Tags ─────────────────────────────────
export const personalTags = [
  'Student',
  'Full Stack Developer',
  'Hackathon Winner',
  'Industry Experience',
];

// ── About Section - Milestones ────────────────────────────────────
export const milestones: Milestone[] = [
  {
    id: 'gpa',
    title: '9.0 CGPA',
    subtitle: 'BCA at Christ University',
    icon: 'GraduationCap',
  },
  {
    id: 'internships',
    title: '3 Internships',
    subtitle: 'Full-stack & mobile development',
    icon: 'Globe',
  },
  {
    id: 'hackathons',
    title: 'Hackathon Wins',
    subtitle: 'Brainwave 1st Place & SIH Finalist',
    icon: 'Trophy',
  },
  {
    id: 'ai',
    title: 'AI Products',
    subtitle: 'Built RAG pipelines & simulations',
    icon: 'Flag',
  },
];

// ── Contact Links ─────────────────────────────────────────────────
export const socialLinks = [
  {
    label: 'GitHub',
    url: 'https://github.com/AlexKurian77',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/alexkurian',
    icon: 'linkedin',
  },
  {
    label: 'Email',
    url: 'mailto:alexanderkurian777@gmail.com',
    icon: 'email',
  },
];

// ── Bio Text ──────────────────────────────────────────────────────
export const bioText = `BCA finalist with 3 internships across full-stack and mobile development. Shipped production systems in React Native, Next.js, FastAPI, and Firebase. I love building AI-integrated products and have hands-on experience as a hackathon winner.`;

// ── Detailed Experiences ──────────────────────────────────────────
export const detailedExperiences = [
  {
    id: "ameya-books",
    company: "Ameya Books",
    link:"https://www.ameyabooks.in",
    role: "Full Stack Developer",
    duration: "Jan 2026 - Apr 2026",
    location: "Hybrid, Delhi",
    overview:
      "Ameya Books is a comprehensive system designed to streamline the process of purchasing school book bundles. The business model revolves around working closely with schools to provide curated, exact book sets, notebooks, and stationery for students from Nursery to Higher Secondary classes. To support this operation, the project uses a modern web and mobile technology stack divided into four main components.",
    achievements: [],
    management:
      "The repository covers the entire lifecycle of the business: a marketing website to draw in customers, a mobile app for staff interactions, a robust admin panel to manage inventory and staff, and a secure backend handling Firebase data, receipts, and payment processing.",
    techStack: ["Next.js", "React Native", "Expo", "Node.js", "Express", "Firebase", "Tailwind CSS"],
    sections: [
      {
        title: "Public Website",
        link:"https://www.ameyabooks.in/",
        description: "The customer-facing landing page where parents and schools can learn about Ameya Books.",
        techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Lucide React"],
        features: [
          "A premium, visually appealing marketing site that highlights core pillars: curated bundles tailored to school curriculums, complete kits with stationery, and quality assurance."
        ]
      },
      {
        title: "Admin Dashboard",
        description: "An internal management portal strictly for administrators to manage the back-office operations.",
        techStack: ["React (Vite)", "React Router", "Tailwind CSS", "Firebase", "@dnd-kit"],
        features: [
          "Inventory management for books and bundles.",
          "Tracking system for transactions and monitoring analytics.",
          "Academic year management (allowing admins to clone seasons for upcoming school years).",
          "Staff authorization and settings management.",
          "Strict Firebase authentication (Email/Password & Google OAuth) to ensure only authorized admin roles can log in."
        ]
      },
      {
        title: "Mobile App",
        description: "A mobile application built for parents to make purchases and track orders, and for staff members to facilitate operations.",
        techStack: ["React Native", "Expo", "NativeWind", "Firebase", "Axios"],
        features: [
          "Cross-platform support (Android, iOS, and Web via Expo Router).",
          "QR code scanning capabilities.",
          "Google Sign-in integration for easy user authentication.",
          "Deep integration with the backend for fetching catalog data and displaying transactions."
        ]
      },
      {
        title: "Backend API",
        description: "The core server that acts as the bridge between the database, external services, and the frontends.",
        techStack: ["Node.js", "Express", "Firebase Admin SDK", "Vercel Blob"],
        features: [
          "Receipt System: Hosts dynamic, secure short links. Parents must verify their 10-digit phone number against the transaction record for privacy.",
          "APK Distribution: Includes a passcode-protected endpoint to let staff download the mobile app's APK.",
          "Authentication Middleware: Verifies Firebase tokens to determine if a request is coming from an authorized Staff or Admin.",
          "Payments: Infrastructure to support integrations with Paytm and South Indian Bank (SIB) dynamic UPI QR code generation and status polling."
        ]
      }
    ]
  },
  {
    id: "appyard",
    company: "AppYard Technologies",
    link:"https://appyard.in/",
    role: "React Development Intern",
    duration: "May 2025 - Jul 2025",
    location: "Remote, Bengaluru",
    overview:
      "At Appyard, I worked across the full product surface - building and shipping six web applications and a three-app React Native mobile ecosystem, independently and end-to-end.",
    achievements: [],
    management: "",
    techStack: ["React", "React Native", "Expo", "Vite", "Node.js", "Express", "Firebase", "Redux Toolkit", "Tailwind CSS", "GSAP", "Framer Motion", "Axios"],
    sections: [
      {
        title: "Mobile Development (React Native / Expo)",
        description: "Architected and developed three interconnected mobile applications from scratch: a consumer-facing service booking app, a partner/provider management app, and an internal push notification utility.",
        techStack: ["React Native", "Expo Router", "Redux Toolkit", "Firebase", "NativeWind"],
        features: [
          "Implemented real-time job queues, dynamic checkout flows, and a partner analytics dashboard with chart visualisations.",
          "Integrated deep linking, location services, and camera capabilities.",
          "Standardised UI across all three apps for 60fps interactions."
        ]
      },
      {
        title: "Web & Full-Stack Development (React / Vite / Node.js)",
        description: "Built and shipped six production web applications spanning various domains.",
        techStack: ["React", "Vite", "Node.js", "Express", "GSAP", "Axios"],
        features: [
          "Live video streaming with adaptive playback.",
          "Multi-page webinar registration and scheduling portals with third-party calendar API integrations.",
          "Content-rich media browsing interfaces and a corporate marketing site with GSAP-powered scroll animations and micro-interactions.",
        ]
      }
    ]
  },
  {
    id: "refactore",
    company: "Refactore HU",
    link:"https://exist.pl/",
    role: "Web Development Intern",
    duration: "May 2024 - July 2024",
    location: "Remote, Warsaw, Poland",
    overview:
      "During my international internship at Refactore HU in Warsaw, I contributed to building the web presence for EXIST - a Warsaw-born large-scale electronic music event brand with a global following, hosting high-production warehouse raves across Poland with internationally curated lineups.",
    achievements: [
      "Engineered a dynamic frontend for EXIST's event discovery and checkout flows using React and vanilla web technologies, creating a seamless, immersive ticket purchasing experience tailored for high-traffic drops.",
      "Architected the backend booking management system and server-side logic in PHP to securely process user registrations, manage dynamic ticket inventories, and enforce real-time event capacity limits.",
      "Designed and optimized a relational MySQL database to maintain complex event schemas, ensuring reliable transaction handling and data integrity during peak checkout surges.",
      "Successfully shipped the custom ticketing infrastructure to production, directly serving an international electronic music community and enabling the brand to operate independently of third-party vendors."
    ],
    management: "",
    techStack: ["React", "PHP", "MySQL"],
  },
];
