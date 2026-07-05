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
  email: 'mrinanktc@gmail.com',
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

export const projects = [
  {
    id: 'moodifyai',
    name: 'MoodifyAI',
    category: 'AI · Web App',
    tags: ['React', 'Python', 'Flask', 'Sentiment Analysis', 'Spotify API'],
    year: '2024',
    summary:
      'An AI-powered music recommendation platform that understands user emotions using sentiment analysis and recommends personalized songs tailored to how you feel.',
    problem:
      'Listeners struggled to find music that matched their mood. Existing platforms relied on generic algorithms that ignored emotional context entirely.',
    solution:
      'Built a sentiment-analysis engine that reads user input — text or voice — classifies the emotional state, and maps it to curated playlists via the Spotify API.',
    challenges:
      'Training the sentiment model on limited labeled data and keeping real-time inference under 200ms required lightweight NLP and aggressive caching.',
    impact: [
      { label: 'Mood accuracy', value: '89%' },
      { label: 'Avg. latency', value: '<200ms' },
      { label: 'Songs indexed', value: '10k+' },
    ],
    features: [
      'Real-time emotion detection from text input',
      'Personalized Spotify playlist generation',
      'Mood history & listening insights',
      'Clean, responsive, premium UI',
    ],
    accent: 'from-gold-light to-gold',
    image:
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'nextgen-interiors',
    name: 'NextGen Interiors',
    category: 'Frontend · Studio',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Lenis'],
    year: '2024',
    summary:
      'A luxury interior design website featuring cinematic animations, immersive storytelling, premium UI, and modern frontend engineering that elevates the brand.',
    problem:
      'The studio’s existing site felt flat and failed to convey the craftsmanship and luxury of their work, leading to low inquiry rates.',
    solution:
      'Designed a scroll-driven narrative with cinematic transitions, immersive project showcases, and a refined, editorial layout that mirrors the studio’s aesthetic.',
    challenges:
      'Balancing heavy motion with performance on mobile required careful asset optimization, lazy loading, and a reduced-motion fallback.',
    impact: [
      { label: 'Inquiry rate', value: '+45%' },
      { label: 'Avg. session', value: '3m 40s' },
      { label: 'Lighthouse', value: '96' },
    ],
    features: [
      'Scroll-driven cinematic storytelling',
      'Immersive project gallery with parallax',
      'Premium editorial typography',
      'Fully responsive with reduced-motion support',
    ],
    accent: 'from-gold to-gold-dark',
    image:
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

export const experience = [
  {
    role: 'Full Stack Developer — Freelance',
    company: 'Self-employed',
    period: '2023 — Present',
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
    period: '2023',
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
    period: '2021 — 2025',
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
