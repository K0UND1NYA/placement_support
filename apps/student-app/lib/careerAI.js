// --------------------
// AVAILABLE ROLES
// --------------------
export const availableRoles = [
  {
    id: 'frontend-dev',
    title: 'Frontend Developer',
    category: 'Development',
    description:
      'Build beautiful, responsive, and performant user interfaces using modern web technologies.',
    details: 'As a Frontend Developer, you are the architect of the user experience. You will translate designs into code, optimize performance, and ensure cross-browser compatibility. This path focuses on React, Next.js, and modern CSS frameworks.',
    averageSalary: '$80k - $140k',
    requiredSkills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    youtubeResources: [
      { title: 'Frontend Developer Roadmap', url: 'https://www.youtube.com/watch?v=bgIJ29d2f78' },
      { title: 'React JS - Full Course', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8' },
      { title: 'Next.js 14 Full Course', url: 'https://www.youtube.com/watch?v=ZVnjOPwW4ZA' },
      { title: 'Tailwind CSS Course', url: 'https://www.youtube.com/watch?v=ft30zcMlFao' }
    ]
  },
  {
    id: 'backend-dev',
    title: 'Backend Developer',
    category: 'Development',
    description:
      'Design and implement scalable server-side logic, databases, and APIs.',
    details: 'Backend Developers are the engine of web applications. You will handle data storage, security, authentication, and server-side logic. This roadmap guides you through Node.js, databases, and cloud deployment.',
    averageSalary: '$85k - $150k',
    requiredSkills: ['Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    youtubeResources: [
      { title: 'Backend Developer Roadmap', url: 'https://www.youtube.com/watch?v=tN6oJu2DqCM' },
      { title: 'Node.js Crash Course', url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4' },
      { title: 'PostgreSQL Tutorial', url: 'https://www.youtube.com/watch?v=qw--VYLpxG4' },
      { title: 'Docker for Beginners', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' }
    ]
  },
  {
    id: 'fullstack-dev',
    title: 'Full Stack Developer',
    category: 'Development',
    description:
      'Master both frontend and backend technologies to build complete web applications.',
    details: 'Full Stack Developers bridge the gap between user interface and server logic. You will learn to build end-to-end applications, manage databases, and deploy to the cloud. A versatile role highly valued in the industry.',
    averageSalary: '$90k - $160k',
    requiredSkills: ['React', 'Node.js', 'Database Design', 'System Architecture'],
    youtubeResources: [
      { title: 'Web Development Full Course', url: 'https://www.youtube.com/watch?v=G3e-cpL7ofc' },
      { title: 'MERN Stack Course', url: 'https://www.youtube.com/watch?v=7CqJlxBYj-M' },
      { title: 'System Design Interview', url: 'https://www.youtube.com/watch?v=bUHFg8CZFws' },
      { title: 'Next.js Full Stack', url: 'https://www.youtube.com/watch?v=WM4040j9eSE' }
    ]
  }
];

// --------------------
// BASE 12-WEEK MASTER PLAN (Updated with Details)
// --------------------
const BASE_MILESTONES = [
  {
    title: 'Foundations & Environment Mastery',
    overview:
      'This phase removes beginner friction permanently and builds professional discipline. You will set up your developer environment and learn the core tools.',
    dailyPlan: [
      { topic: 'Install runtime, editor, extensions', detail: 'Download and install VS Code, Node.js (or Python), and key extensions like VSCode Icons and Prettier.' },
      { topic: 'ESLint & Prettier', detail: 'Configure ESLint and Prettier to automatically format and lint your code on save to ensure consistency.' },
      { topic: 'Git basics', detail: 'Learn git init, add, commit, and status. Understand the importance of version control in software development.' },
      { topic: 'GitHub push', detail: 'Create a GitHub repository, connect your local project, and push your first commit to the cloud.' },
      { topic: 'Folder structure', detail: 'Set up a standard project structure (src, components, utils) properly to maintain scalability.' },
      { topic: 'Environment variables', detail: 'Learn to use .env files to manage secrets and configuration safely.' },
      { topic: 'Revision', detail: 'Review all concepts learned so far. Re-do the setup without looking at tutorials.' },
      { topic: 'Rebuild from scratch', detail: 'Delete your project and rebuild it from scratch to build muscle memory.' },
      { topic: 'Improve README', detail: 'Write a professional README.md with installation instructions and project features.' },
      { topic: 'Clean configs', detail: 'Refine your configuration files (tsconfig, eslintrc) to be minimal and effective.' },
      { topic: 'Simulate onboarding', detail: 'Pretend you are joining a new team and document your setup process.' },
      { topic: 'Debug setup', detail: 'Intentionally break your config and fix it to understand error messages.' },
      { topic: 'Explain setup aloud', detail: 'Explain your setup process out loud to practice for interviews.' },
      { topic: 'Buffer', detail: 'Use this day to catch up on any missed tasks or explore related topics.' }
    ]
  },
  {
    title: 'Core Concepts & Mini Project',
    overview:
      'You stop learning concepts in isolation and start building real features. Focus on understanding the "why" behind the code.',
    dailyPlan: [
      { topic: 'Feature planning', detail: 'Break down a small feature into tasks. Sketch a simple UI or flowchart.' },
      { topic: 'Implementation', detail: 'Write the core logic for your feature. Focus on functionality first.' },
      { topic: 'Implementation', detail: 'Connect your logic to the UI. Ensure data flows correctly.' },
      { topic: 'Refactor', detail: 'Review your code. Improve variable names and extract reusable functions.' },
      { topic: 'Edge cases', detail: 'Handle empty states, loading states, and potential errors.' },
      { topic: 'Validation', detail: 'Add input validation to prevent invalid data processing.' },
      { topic: 'Review', detail: 'Self-review your pull request. Look for improvements.' },
      { topic: 'Improve UX', detail: 'Add hover states, transitions, and loading indicators.' },
      { topic: 'Clean code', detail: 'Remove dead code, console logs, and comments.' },
      { topic: 'Debug', detail: 'Find and fix a small bug. Use the debugger.' },
      { topic: 'Explain logic', detail: 'Walk through your code logic as if explaining to a peer.' },
      { topic: 'Optimize', detail: 'Check for unnecessary re-renders or slow operations.' },
      { topic: 'Interview explanation', detail: 'Practice answering "How did you build this?"' },
      { topic: 'Buffer', detail: 'Catch up or add a small bonus feature.' }
    ]
  },
  {
    title: 'Advanced Features',
    overview: 'You move from “it works” to “it scales”. Dive into state management, complex data flows, and architectural patterns.',
    dailyPlan: [
      { topic: 'Architecture design', detail: 'Plan a scalable folder structure and data flow.' },
      { topic: 'API planning', detail: 'Design your API endpoints or data schemas before coding.' },
      { topic: 'API integration', detail: 'Fetch data from an API and handle success/error states.' },
      { topic: 'Error handling', detail: 'Implement global error boundaries and user-friendly error messages.' },
      { topic: 'Modularity', detail: 'Break down large components into smaller, focused ones.' },
      { topic: 'Refactor', detail: 'Improve code readability and maintainability.' },
      { topic: 'Review', detail: 'Check for potential security issues or performance, bottlenecks.' },
      { topic: 'Simulate failures', detail: 'Test how your app behaves offline or with slow network.' },
      { topic: 'Resilience', detail: 'Implement retries or fallbacks for critical failures.' },
      { topic: 'Optimize', detail: 'Use memoization or caching to improve performance.' },
      { topic: 'Remove duplication', detail: 'Apply DRY (Don\'t Repeat Yourself) principle.' },
      { topic: 'Code review', detail: 'Review your code against best practices style guides.' },
      { topic: 'Interview explanation', detail: 'Explain your architectural decisions and trade-offs.' },
      { topic: 'Buffer', detail: 'Deep dive into a specific advanced topic.' }
    ]
  },
  {
    title: 'Performance & Best Practices',
    overview: 'Optimize performance and architecture. Learn how to make your application faster and more reliable.',
    dailyPlan: [
      { topic: 'Identify bottlenecks', detail: 'Use profiling tools to find slow components.' },
      { topic: 'Refactor', detail: 'Rewrite slow functions or components for better performance.' },
      { topic: 'Reduce re-renders', detail: 'Implement React.memo or similar techniques.' },
      { topic: 'Clean architecture', detail: 'Ensure separation of concerns in your codebase.' },
      { topic: 'Optimize state', detail: 'Move state down or use a global store efficiently.' },
      { topic: 'Review', detail: 'Audit your app for accessibility (a11y) issues.' },
      { topic: 'Test', detail: 'Write unit tests for critical utility functions.' },
      { topic: 'Improvements', detail: 'Apply small polish tweaks to UI/UX.' },
      { topic: 'Improvements', detail: 'Optimize images and assets.' },
      { topic: 'Improvements', detail: 'Implement lazy loading for routes or images.' },
      { topic: 'Improvements', detail: 'Review bundle size and reduce plain dependencies.' },
      { topic: 'Improvements', detail: 'Ensure consistent error logging.' },
      { topic: 'Improvements', detail: 'Final performance audit.' },
      { topic: 'Buffer', detail: 'Rest or explore new tools.' }
    ]
  },
  {
    title: 'Capstone Project',
    overview: 'Build a complete real-world project from scratch. This will be the centerpiece of your portfolio.',
    dailyPlan: [
      { topic: 'Architecture', detail: 'Plan the full stack architecture for your capstone.' },
      { topic: 'Feature build', detail: 'Implement core feature set 1.' },
      { topic: 'Feature build', detail: 'Implement core feature set 2.' },
      { topic: 'Feature build', detail: 'Implement core feature set 3.' },
      { topic: 'Feature build', detail: 'Implement user authentication.' },
      { topic: 'Feature build', detail: 'Implement database integration.' },
      { topic: 'Review', detail: 'Mid-point review of progress and scope.' },
      { topic: 'Polish', detail: 'Refine UI design and responsiveness.' },
      { topic: 'Polish', detail: 'Add animations and transitions.' },
      { topic: 'Polish', detail: 'Ensure cross-browser compatibility.' },
      { topic: 'Polish', detail: 'Final bug fixes.' },
      { topic: 'Polish', detail: 'Prepare demo data.' },
      { topic: 'Interview explanation', detail: 'Prepare a presentation for your project.' },
      { topic: 'Buffer', detail: 'Final touches before deployment.' }
    ]
  },
  {
    title: 'Deployment & Job Readiness',
    overview: 'Deploy your applications and prepare for interviews. Focus on soft skills and technical explanations.',
    dailyPlan: [
      { topic: 'Deployment', detail: 'Deploy your app to Vercel, Netlify, or AWS.' },
      { topic: 'CI/CD basics', detail: 'Set up a basic CI/CD pipeline for automated testing/deployment.' },
      { topic: 'Docs', detail: 'Complete documentation for your projects.' },
      { topic: 'Resume', detail: 'Update your resume with new skills and projects.' },
      { topic: 'Mock interviews', detail: 'Practice behavioral interview questions.' },
      { topic: 'Mock interviews', detail: 'Practice technical whiteboard coding.' },
      { topic: 'Mock interviews', detail: 'Do a mock system design interview.' },
      { topic: 'Mock interviews', detail: 'Practice explaining your projects.' },
      { topic: 'Mock interviews', detail: 'Review common interview pitfalls.' },
      { topic: 'Mock interviews', detail: 'Practice negotiation strategies.' },
      { topic: 'Fix gaps', detail: 'Review any weak areas identified during mock interviews.' },
      { topic: 'Fix gaps', detail: 'Deepen knowledge in specific framework internals.' },
      { topic: 'Fix gaps', detail: 'Final portfolio review.' },
      { topic: 'Buffer', detail: 'Apply to jobs and reach out to network.' }
    ]
  }
];

// --------------------
// CAREER ROADMAP GENERATOR (FINAL)
// --------------------
export const generateCareerRoadmap = async (roleId, durationWeeks) => {
  await new Promise(resolve => setTimeout(resolve, 700));

  const role = availableRoles.find(r => r.id === roleId);
  if (!role) throw new Error('Role not found');

  /**
   * RULES:
   * 4 weeks  → first 2 milestones
   * 12 weeks → all 6 milestones
   * 24 weeks → repeat depth (advanced pass)
   */
  let milestoneCount = 6;

  if (durationWeeks === 4) milestoneCount = 2;
  if (durationWeeks === 12) milestoneCount = 6;
  if (durationWeeks === 24) milestoneCount = 12;

  const milestones = [];

  for (let i = 0; i < milestoneCount; i++) {
    const base = BASE_MILESTONES[i % BASE_MILESTONES.length];
    const weekStart = i * 2 + 1;
    const weekEnd = weekStart + 1;

    // Distribute videos across milestones if possible, or just repeat decent generic resources
    // For now, we put specific resources in the roadmap object mainly

    milestones.push({
      id: `m${i + 1}`,
      week: `Week ${weekStart}–${weekEnd}`,
      title:
        durationWeeks === 24
          ? `${base.title} (Advanced)`
          : base.title,
      overview: base.overview,
      completed: i === 0, // Mocking first milestone as active/completed for visual checking

      tasks: [
        {
          title: base.title,
          dailyPlan: base.dailyPlan.map((d, idx) => ({
            day: `Day ${idx + 1}`,
            topic: d.topic,
            detail: d.detail
          }))
        }
      ],

      skills: role.requiredSkills.map(skill => ({
        name: skill,
        whyItMatters: 'Critical for real-world roles'
      })),

      resources: [
        { title: 'Official Docs', url: null },
        { title: 'Hands-on Practice', url: null },
        ...(role.youtubeResources && i < role.youtubeResources.length ? [{
          title: role.youtubeResources[i].title,
          url: role.youtubeResources[i].url
        }] : [])
      ]
    });
  }

  return {
    role: role.title,
    duration: durationWeeks,
    description: role.details,
    youtubeResources: role.youtubeResources,
    milestones
  };
};