import { Project, SkillCategory, Milestone, Experience } from '@/types';

// ── Projects ──────────────────────────────────────────────────────
export const projects: Project[] = [
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
    tagline: 'Lab Intelligence System',
    description:
      'Designed a full-stack AI system with a RAG pipeline over 2.4M+ papers for protocol generation. Built an interactive UI for real-time refinement and predictive anomaly detection.',
    url: 'https://helix-hacknation.vercel.app/',
    stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'],
    image: '/images/projects/helix.png',
    color: '#1e94a6',
  },
]
// ── Experience ────────────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    id: 'ameya',
    company: 'Ameya Books',
    role: 'Full Stack Developer',
    duration: 'Jan 2026 - Apr 2026',
    location: 'Hybrid, Ghaziabad',
    description: [
      'Built a cross-platform React Native app for real-time inventory and sales with live Firestore synchronization.',
      'Developed an Express.js backend with Firebase RBAC, automating invoicing (PDFKit) and integrating cloud storage and payments.',
    ],
  },
  {
    id: 'appyard',
    company: 'AppYard Technologies',
    role: 'React Developer Intern',
    duration: 'May 2025 - Jul 2025',
    location: 'Remote, Bengaluru',
    description: [
      'Engineered 15+ reusable React components across 4 product screens, reducing UI dev time by 30%.',
      'Delivered 3 sprint features end-to-end integrating REST APIs, cutting reported UI bugs by 40% post-release.',
    ],
  },
  {
    id: 'refactore',
    company: 'Refactore HU',
    role: 'Software Engineering Intern',
    duration: 'May 2024 - July 2024',
    location: 'Remote, Warsaw, Poland',
    description: [
      'Developed full-stack features using Node.js, PHP, and MySQL with a focus on API and schema design.',
      'Reduced query execution time by optimizing 8+ MySQL stored procedures and indexes, improving API response by ~35%.',
    ],
  },
];

// ── Skills ────────────────────────────────────────────────────────
export const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    icon: '◆',
    items: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Framer Motion', level: 75 },
    ],
  },
  {
    category: 'Backend',
    icon: '▲',
    items: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 82 },
      { name: 'FastAPI', level: 80 },
      { name: 'REST APIs', level: 90 },
    ],
  },
  {
    category: 'Data & Mobile',
    icon: '●',
    items: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MySQL', level: 80 },
      { name: 'React Native', level: 88 },
      { name: 'Firebase', level: 85 },
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
  'Delhi NCR',
  'Full Stack Developer',
  'Hackathon Winner',
  'Christ University BCA',
  'AI Integration',
];

// ── About Section - Milestones ────────────────────────────────────
export const milestones: Milestone[] = [
  {
    id: 'gpa',
    title: '9 CGPA',
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
