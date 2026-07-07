export const profile = {
  name: 'Mrinank T C',
  firstName: 'Mrinank',
  lastName: 'T C',
  initials: 'MT',
  role: 'Full Stack Developer | AI Developer | UI/UX Enthusiast',
  roles: ['Full Stack Developer', 'AI Developer', 'UI/UX Enthusiast'],
  tagline: 'Building premium digital experiences with modern web technologies and Artificial Intelligence.',
  location: 'Bengaluru, Karnataka, India',
  availability: 'Available for internships & freelance opportunities',
  email: '1by23is126@bmsit.in',
  bio: 'I am a passionate Information Science Engineering student who enjoys building modern web applications, AI-powered products, and premium user experiences. I love combining clean engineering with elegant UI/UX to create products that are both functional and visually impressive. I continuously explore new technologies, improve my design skills, and enjoy solving real-world problems through software.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/mrinanktc', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/mrinanktc', icon: 'linkedin' },
    { label: 'Twitter', href: 'https://twitter.com/mrinanktc', icon: 'twitter' },
  ],
};

export const stats = [
  { value: 10, decimals: 0, suffix: '+', label: 'Projects built' },
  { value: 5, decimals: 0, suffix: '+', label: 'AI integrations' },
  { value: 7.2, decimals: 1, suffix: '', label: 'CGPA' },
  { value: 3, decimals: 0, suffix: '+', label: 'Years learning' },
];

export const skills = [
  {
    category: 'Frontend',
    description: 'Crafting responsive, premium interfaces with modern tooling.',
    items: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'TypeScript', level: 82 },
      { name: 'JavaScript', level: 92 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'HTML & CSS', level: 94 },
    ],
  },
  {
    category: 'Backend',
    description: 'Building robust APIs and server-side logic.',
    items: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 84 },
      { name: 'Python', level: 80 },
      { name: 'Flask', level: 78 },
    ],
  },
  {
    category: 'Database',
    description: 'Modeling and managing data at scale.',
    items: [
      { name: 'MongoDB', level: 86 },
      { name: 'Firebase', level: 88 },
      { name: 'SQL', level: 82 },
    ],
  },
  {
    category: 'Tools',
    description: 'The workflow that keeps everything shipping.',
    items: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 84 },
      { name: 'Postman', level: 88 },
      { name: 'Vercel', level: 90 },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  techStack: string[];
  features: string[];
  challenges: string[];
  role: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    id: 'moodify-ai',
    title: 'Moodify AI',
    category: 'AI · Web App',
    tagline: 'AI-powered multilingual music recommendation platform.',
    description:
      "Moodify AI is a GenAI-powered web application that analyzes a user's mood through natural language input and recommends personalized songs across multiple languages. It integrates Spotify for album artwork and delivers recommendations through a modern cinematic user experience.",
    techStack: ['React', 'Vite', 'Python', 'Flask', 'Tailwind CSS', 'Spotify API'],
    features: [
      'AI mood analysis',
      'Smart music recommendations',
      'Spotify album artwork',
      'Multi-language support',
      'Responsive UI',
      'Cinematic animations',
    ],
    challenges: [
      'Mood classification',
      'Recommendation accuracy',
      'Spotify integration',
      'Performance optimization',
      'Dynamic language handling',
    ],
    role:
      'Designed and developed the entire application, including frontend, backend, AI integration, Spotify integration, UI/UX, and deployment.',
    image: '/projects/moodify-ai.png',
    liveUrl: 'https://moodify-ai-gamma.vercel.app/',
    githubUrl: '',
  },
  {
    id: 'centralops',
    title: 'CentralOps',
    category: 'Enterprise · Web App',
    tagline: 'Enterprise operations management platform.',
    description:
      'CentralOps is a full-stack enterprise management platform that centralizes employee management, task assignment, meetings, attendance, compliance tracking, and analytics through a modern role-based dashboard designed for organizations.',
    techStack: ['React', 'Node.js', 'Express', 'Tailwind CSS'],
    features: [
      'Role-based authentication',
      'Employee management',
      'Task management',
      'Meeting scheduler',
      'Attendance tracking',
      'Compliance management',
      'Analytics dashboard',
      'Notifications',
      'Enterprise dashboard',
    ],
    challenges: [
      'Role-based architecture',
      'Scalable dashboard design',
      'Enterprise workflow optimization',
      'Data organization',
      'Responsive interface',
    ],
    role:
      'Designed and developed the complete platform including UI/UX, frontend, backend, reusable components, authentication, dashboards, and workflow management.',
    image: '/projects/centralops.png',
    liveUrl: 'https://central-o-ps.vercel.app/login',
    githubUrl: '',
  },
];

export const experience = [
  {
    role: 'Full Stack Developer — Freelance',
    company: 'Self-employed',
    period: '2024 — Present',
    location: 'Remote',
    description:
      'Building modern web applications and AI-powered products for clients — from concept and design to deployment.',
    highlights: [
      'Shipped MoodifyAI, an AI music recommendation platform',
      'Delivered NextGen Interiors, a luxury studio website',
      'Specialized in premium UI/UX and clean engineering',
    ],
  },
  {
    role: 'Web Development Intern',
    company: 'Startup (Bengaluru)',
    period: '2026',
    location: 'Bengaluru, India',
    description:
      'Contributed to a production web app, building features across the stack and improving UI performance.',
    highlights: [
      'Developed responsive React components and pages',
      'Integrated REST APIs and optimized data fetching',
      'Collaborated with designers to ship pixel-perfect UI',
    ],
  },
];

export const education = [
  {
    degree: 'B.E. in Information Science & Engineering',
    school: 'BMS Institute of Technology & Management',
    period: '2023 — 2027',
    description:
      'Pursuing a degree in Information Science & Engineering with a CGPA of 7.2. Focused on web technologies, AI, and software engineering fundamentals.',
  },
];

export const techOrbit = [
  { name: 'React', angle: 0 },
  { name: 'Next.js', angle: 60 },
  { name: 'TS', angle: 120 },
  { name: 'Node', angle: 180 },
  { name: 'Python', angle: 240 },
  { name: 'Mongo', angle: 300 },
];
