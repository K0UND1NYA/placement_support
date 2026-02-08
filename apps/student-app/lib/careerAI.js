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
    title: 'Full Stack Developer (JS/TS)',
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
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data Science',
    description: 'Interpret complex data to help companies make better business decisions.',
    details: 'Data Analysts collect, process, and perform statistical analyses on large datasets. You will discover how data can be used to answer questions and solve problems. This path focuses on SQL, Python, Excel, and Visualization tools.',
    averageSalary: '$70k - $125k',
    requiredSkills: ['SQL', 'Python', 'Tableau', 'Excel'],
    youtubeResources: [
      { title: 'Complete Data Analyst Roadmap', url: 'https://www.youtube.com/watch?v=8JJ101D3knE' },
      { title: 'Data Analyst Bootcamp', url: 'https://www.youtube.com/watch?v=7h7K9dJ_h8M' },
      { title: 'Python for Data Analysis', url: 'https://www.youtube.com/watch?v=r-uOLxNrNk4' },
      { title: 'Statistics for Data Science', url: 'https://www.youtube.com/watch?v=Vfo5le26IhY' }
    ]
  },
  {
    id: 'java-fullstack',
    title: 'Java Full Stack Developer',
    category: 'Development',
    description: 'Build robust, scalable enterprise applications using Java and modern frontend frameworks.',
    details: 'Combine the power of Java for backend logic with dynamic frontends. You will master Spring Boot for server-side development and React/Angular for the user interface.',
    averageSalary: '$90k - $150k',
    requiredSkills: ['Java', 'Spring Boot', 'React', 'SQL'],
    youtubeResources: [
      { title: 'Java Full Stack Roadmap', url: 'https://www.youtube.com/watch?v=x0rN9sFpXm8' },
      { title: 'Spring Boot Tutorial', url: 'https://www.youtube.com/watch?v=9ptBq8q4xI4' },
      { title: 'Java for Beginners', url: 'https://www.youtube.com/watch?v=eIrMbAQSU34' },
      { title: 'Full Stack Java Course', url: 'https://www.youtube.com/watch?v=A74TOX803D0' }
    ]
  },
  {
    id: 'python-fullstack',
    title: 'Python Full Stack Developer',
    category: 'Development',
    description: 'Leverage Python’s versatility to build powerful web applications with Django or Flask.',
    details: 'Python is known for its readability and efficiency. As a Python Full Stack Developer, you will use Django or Flask for the backend and modern JavaScript frameworks for the frontend.',
    averageSalary: '$90k - $150k',
    requiredSkills: ['Python', 'Django', 'React', 'PostgreSQL'],
    youtubeResources: [
      { title: 'Python Web Dev Roadmap', url: 'https://www.youtube.com/watch?v=Q_qYkZ2cMug' },
      { title: 'Django Crash Course', url: 'https://www.youtube.com/watch?v=JT80XhYJ4bw' },
      { title: 'Python Full Stack Guide', url: 'https://www.youtube.com/watch?v=WGJJIrtnfpk' },
      { title: 'React & Django Integration', url: 'https://www.youtube.com/watch?v=6c666t8kKNU' }
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Designer',
    category: 'Design',
    description: 'Design intuitive, aesthetically pleasing, and user-friendly digital experiences.',
    details: 'UI/UX Designers focus on the look and feel of a product. You will conduct user research, create wireframes, and design high-fidelity prototypes using tools like Figma.',
    averageSalary: '$75k - $130k',
    requiredSkills: ['Figma', 'Wireframing', 'Prototyping', 'User Research'],
    youtubeResources: [
      { title: 'UI/UX Design Roadmap', url: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU' },
      { title: 'Figma Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=FTyP5tV522c' },
      { title: 'User Experience Basics', url: 'https://www.youtube.com/watch?v=CJnhxwZN6og' },
      { title: 'Web Design Masterclass', url: 'https://www.youtube.com/watch?v=zJSY8tbf_ys' }
    ]
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security Specialist',
    category: 'Security',
    description: 'Protect systems, networks, and programs from digital attacks.',
    details: 'Cyber Security Specialists are the defenders of the digital world. You will learn to identify vulnerabilities, monitor for threats, and implement security measures.',
    averageSalary: '$90k - $160k',
    requiredSkills: ['Network Security', 'Linux', 'Python', 'Ethical Hacking'],
    youtubeResources: [
      { title: 'Cyber Security Roadmap', url: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE' },
      { title: 'Ethical Hacking Course', url: 'https://www.youtube.com/watch?v=fNZ8nJN_Lh4' },
      { title: 'Linux for Hackers', url: 'https://www.youtube.com/watch?v=lZN8tWfI3d0' },
      { title: 'Networking Fundamentals', url: 'https://www.youtube.com/watch?v=qiQR5rTSshw' }
    ]
  }
];

// --------------------
// MILESTONE DEFINITIONS
// --------------------

const WEB_DEV_MILESTONES = [
  {
    title: 'Foundations & Environment',
    overview: 'Master the tools of the trade. Set up a professional development environment and learn the basics of version control.',
    dailyPlan: [
      { topic: 'Setup', detail: 'Install VS Code, Node.js, and essential extensions (Prettier, ESLint).' },
      { topic: 'Git Init', detail: 'Initialize a git repo, learn add, commit, push, and .gitignore.' },
      { topic: 'HTML/CSS', detail: 'Review semantic HTML and modern CSS box model.' },
      { topic: 'JS Basics', detail: 'Practice variables, loops, functions, and ES6+ syntax.' },
      { topic: 'DOM', detail: 'Manipulate the DOM using vanilla JavaScript.' },
      { topic: 'Deployment', detail: 'Deploy a static site to Netlify or Vercel.' },
      { topic: 'Review', detail: 'Build a personal portfolio landing page.' },
      { topic: 'CSS Flexbox', detail: 'Master layout alignment, direction, and responsiveness.' },
      { topic: 'CSS Grid', detail: 'Create complex 2D layouts using CSS Grid properties.' },
      { topic: 'Responsive Design', detail: 'Media queries and mobile-first design principles.' },
      { topic: 'JS Events', detail: 'Deep dive into event listeners, bubbling, and delegation.' },
      { topic: 'JS Objects', detail: 'Master object manipulation, referencing, and cloning.' },
      { topic: 'ES Modules', detail: 'Understand import/export and modular code structure.' },
      { topic: 'Mini Project', detail: 'Build a responsive landing page with a mobile menu.' }
    ]
  },
  {
    title: 'Frontend Mastery',
    overview: 'Dive deep into modern frontend frameworks. Learn to build interactive and responsive user interfaces.',
    dailyPlan: [
      { topic: 'React Basics', detail: 'Components, props, state, and JSX syntax.' },
      { topic: 'Hooks', detail: 'Master useState and useEffect for lifecycle management.' },
      { topic: 'Styling', detail: 'Integrate Tailwind CSS or Styled Components.' },
      { topic: 'Routing', detail: 'Implement client-side routing with React Router.' },
      { topic: 'Forms', detail: 'Handle user input and validation controlled components.' },
      { topic: 'API', detail: 'Fetch data using fetch() or Axios and display it.' },
      { topic: 'Project', detail: 'Build a dynamic Todo list or Weather app.' },
      { topic: 'Context API', detail: 'Share state globally without prop drilling.' },
      { topic: 'Custom Hooks', detail: 'Extract component logic into reusable functions.' },
      { topic: 'React Performance', detail: 'Learn useMemo, useCallback, and React.memo.' },
      { topic: 'Redux Toolkit', detail: 'Introduction to Redux slices and global store.' },
      { topic: 'Accessibility', detail: 'ARIA labels, keyboard navigation, and semantic HTML.' },
      { topic: 'Testing', detail: 'Unit test components with Jest and React Testing Library.' },
      { topic: 'Adv Project', detail: 'Build an E-commerce product page with cart logic.' }
    ]
  },
  {
    title: 'Backend Fundamentals',
    overview: 'Understand what happens on the server. Build APIs and manage data flow.',
    dailyPlan: [
      { topic: 'Node.js', detail: 'Understand the event loop and non-blocking I/O.' },
      { topic: 'Express', detail: 'Set up a basic Express server and routes.' },
      { topic: 'REST API', detail: 'Design RESTful endpoints (GET, POST, PUT, DELETE).' },
      { topic: 'Middleware', detail: 'Use middleware for logging and error handling.' },
      { topic: 'Database', detail: 'Connect to MongoDB or PostgreSQL.' },
      { topic: 'CRUD', detail: 'Implement full CRUD operations on your database.' },
      { topic: 'Integration', detail: 'Connect your Frontend to your Backend.' },
      { topic: 'Authentication', detail: 'Implement JWT based auth and password hashing.' },
      { topic: 'Mongoose/Models', detail: 'Define data schemas and models for MongoDB.' },
      { topic: 'File Uploads', detail: 'Handle image uploads using Multer.' },
      { topic: 'Error Handling', detail: 'Create a centralized error handling mechanism.' },
      { topic: 'Validation', detail: 'Validate incoming data using Zod or Joi.' },
      { topic: 'Postman', detail: 'Master API testing and documentation in Postman.' },
      { topic: 'Backend Project', detail: 'Build a complete Blog API with user accounts.' }
    ]
  },
  {
    title: 'Advanced Full Stack',
    overview: 'Connect the dots. Handle authentication, security, and complex state.',
    dailyPlan: [
      { topic: 'Auth Integration', detail: 'Connect frontend login forms to backend JWT auth.' },
      { topic: 'Protected Routes', detail: 'Restrict access to pages based on login state.' },
      { topic: 'Optimization', detail: 'Lazy load components and optimize images.' },
      { topic: 'Security', detail: 'Sanitize inputs and prevent SQL injection/XSS.' },
      { topic: 'Testing Integration', detail: 'Write integration tests for the full flow.' },
      { topic: 'Docker', detail: 'Containerize your application for consistent environments.' },
      { topic: 'CI/CD', detail: 'Set up a GitHub Action for automated testing.' },
      { topic: 'Next.js Intro', detail: 'Understand App Router and file-based routing.' },
      { topic: 'SSR vs CSR', detail: 'Learn the difference and when to use which.' },
      { topic: 'Caching', detail: 'Implement Redis for caching API responses.' },
      { topic: 'Rate Limiting', detail: 'Protect your API from spam and abuse.' },
      { topic: 'WebSockets', detail: 'Build real-time features using Socket.io.' },
      { topic: 'Deployments', detail: 'Deploy frontend and backend to production services.' },
      { topic: 'Monitoring', detail: 'Add logging and monitoring to your live app.' }
    ]
  },
  {
    title: 'Capstone Project',
    overview: 'Build a production-grade application to showcase your skills.',
    dailyPlan: [
      { topic: 'Planning', detail: 'Define requirements, database schema, and UI wireframes.' },
      { topic: 'Setup', detail: 'Initialize the full stack repo and boilerplate.' },
      { topic: 'Core Features', detail: 'Implement the MVP features (Auth, CRUD).' },
      { topic: 'UI Polish', detail: 'Add animations, transitions, and responsive design.' },
      { topic: 'Refactor', detail: 'Clean up code, add comments, and optimize.' },
      { topic: 'Docs', detail: 'Write a comprehensive README with setup instructions.' },
      { topic: 'Demo', detail: 'Record a video walkthrough of your project.' },
      { topic: 'Adv Feature', detail: 'Implement search filtering or pagination.' },
      { topic: 'Payments', detail: 'Integrate Stripe or a fake payment gateway.' },
      { topic: 'Admin Panel', detail: 'Build an admin dashboard for managing content.' },
      { topic: 'Email Service', detail: 'Send welcome emails using a service like Resend.' },
      { topic: 'Analytics', detail: 'Integrate basic analytics to track page views.' },
      { topic: 'Bug Bash', detail: 'Spend a day ensuring no edge cases crash the app.' },
      { topic: 'Launch', detail: 'Final production deploy and social sharing.' }
    ]
  },
  {
    title: 'Career Prep',
    overview: 'Get ready for the job market. Polish your resume and practice interviews.',
    dailyPlan: [
      { topic: 'Resume', detail: 'Update your resume with new skills and projects.' },
      { topic: 'Portfolio', detail: 'Ensure your portfolio site is live and bug-free.' },
      { topic: 'DSA Basics', detail: 'Practice common array and string algorithms.' },
      { topic: 'System Design', detail: 'Learn basic system design concepts for interviews.' },
      { topic: 'Mock Interview', detail: 'Practice explaining your code out loud.' },
      { topic: 'Networking', detail: 'Update LinkedIn and reach out to recruiters.' },
      { topic: 'Apply', detail: 'Apply to 5-10 relevant job postings.' },
      { topic: 'Behavioral', detail: 'Prepare STAR method answers for standard questions.' },
      { topic: 'Whiteboarding', detail: 'Practice solving problems on a whiteboard/paper.' },
      { topic: 'Negotiation', detail: 'Learn basics of salary negotiation.' },
      { topic: 'Open Source', detail: 'Find a small issue to contribute to on GitHub.' },
      { topic: 'Personal Brand', detail: 'Write a blog post about what you learned.' },
      { topic: 'Cold Outreach', detail: 'Draft and send emails to companies you admire.' },
      { topic: 'Review', detail: 'Final review of all materials and ongoing learning plan.' }
    ]
  }
];

const DATA_ANALYST_MILESTONES = [
  {
    title: 'Excel & Statistics Fundamentals',
    overview: 'Master the most widely used data tool and the math behind the analysis.',
    dailyPlan: [
      { topic: 'Excel Basics', detail: 'Master filtering, sorting, and conditional formatting.' },
      { topic: 'Advanced Excel', detail: 'VLOOKUP, XLOOKUP, Pivot Tables, and Macros.' },
      { topic: 'Stats 101', detail: 'Mean, Median, Mode, Standard Deviation, and Variance.' },
      { topic: 'Distributions', detail: 'Understand Normal distribution and probability.' },
      { topic: 'Hypothesis', detail: 'Learn about p-values, t-tests, and significance.' },
      { topic: 'Data Cleaning', detail: 'Practice cleaning messy datasets in Excel.' },
      { topic: 'Project', detail: 'Analyze a dataset using only Excel and present findings.' },
      { topic: 'Excel Charts', detail: 'Master bar, line, scatter, and combo charts.' },
      { topic: 'Pivot Charts', detail: 'Create interactive charts linked to Pivot tables.' },
      { topic: 'Power Query', detail: 'Learn to import and transform data automatedly.' },
      { topic: 'Correlation', detail: 'Understand correlation vs causation.' },
      { topic: 'Regression', detail: 'Basic linear regression in Excel.' },
      { topic: 'Excel Dashboards', detail: 'Combine multiple charts into a single view.' },
      { topic: 'Presentation', detail: 'Practice presenting your Excel findings.' }
    ]
  },
  {
    title: 'SQL Mastery',
    overview: 'Learn to talk to databases. SQL is the core skill for any data role.',
    dailyPlan: [
      { topic: 'Select', detail: 'Basic SELECT, FROM, WHERE clauses.' },
      { topic: 'Aggregates', detail: 'GROUP BY, HAVING, and aggregate functions.' },
      { topic: 'Joins', detail: 'Inner, Left, Right, and Full Outer Joins.' },
      { topic: 'Advanced SQL', detail: 'Window functions (RANK, LEAD/LAG), CTEs.' },
      { topic: 'Database Design', detail: 'Primary keys, Foreign keys, and Normalization.' },
      { topic: 'Practice', detail: 'Solve LeetCode or HackerRank SQL problems.' },
      { topic: 'Project', detail: 'Query a real database to answer business questions.' },
      { topic: 'Subqueries', detail: 'Writing nested queries for complex logic.' },
      { topic: 'Set Operations', detail: 'UNION, UNION ALL, INTERSECT.' },
      { topic: 'String Functions', detail: 'Manipulation of text data in SQL.' },
      { topic: 'Date Functions', detail: 'Handling timestamps and date math.' },
      { topic: 'Stored Procedures', detail: 'Basics of reusable SQL code blocks.' },
      { topic: 'Indexing', detail: 'Understanding how indexes speed up queries.' },
      { topic: 'Optimization', detail: 'Analyzing query plans and optimizing performance.' }
    ]
  },
  {
    title: 'Python for Data Analysis',
    overview: 'Automate your analysis. Learn Python, Pandas, and NumPy.',
    dailyPlan: [
      { topic: 'Python Basics', detail: 'Variables, loops, functions, and data structures.' },
      { topic: 'NumPy', detail: 'Arrays, vectorized operations, and math functions.' },
      { topic: 'Pandas Intro', detail: 'DataFrames, Series, and reading CSV/Excel.' },
      { topic: 'Data Cleaning', detail: 'Handling missing values and duplicates with Pandas.' },
      { topic: 'Manipulation', detail: 'Filtering, grouping, and merging DataFrames.' },
      { topic: 'EDA', detail: 'Exploratory Data Analysis techniques.' },
      { topic: 'Project', detail: 'Clean and analyze a Kaggle dataset with Python.' },
      { topic: 'Matplotlib', detail: 'Basic plotting concepts and API.' },
      { topic: 'Seaborn', detail: 'Statistical data visualization made easy.' },
      { topic: 'Scikit-Learn', detail: 'Intro to machine learning library.' },
      { topic: 'Linear Regression', detail: 'Implementing a simple model in Python.' },
      { topic: 'Web Scraping', detail: 'Using BeautifulSoup to harvest data.' },
      { topic: 'Automation', detail: 'Writing scripts to automate file processing.' },
      { topic: 'GitHub', detail: 'Versioning your analysis notebooks.' }
    ]
  },
  {
    title: 'Data Visualization',
    overview: 'Tell a story with data. Master tools like Tableau or Power BI.',
    dailyPlan: [
      { topic: 'Viz Principles', detail: 'Choosing the right chart for data type.' },
      { topic: 'Tableau/PowerBI', detail: 'Connect to data and create basic charts.' },
      { topic: 'Dashboards', detail: 'Build interactive dashboards with filters.' },
      { topic: 'Calculated Fields', detail: 'Create custom metrics within the tool.' },
      { topic: 'Storytelling', detail: 'Narrative structure in data presentation.' },
      { topic: 'Python Viz', detail: 'Matplotlib and Seaborn basics.' },
      { topic: 'Project', detail: 'Build a comprehensive Executive Dashboard.' },
      { topic: 'Actions', detail: 'Adding interactivity and drill-downs.' },
      { topic: 'Parameters', detail: 'Allowing users to change variables dynamically.' },
      { topic: 'LOD Expressions', detail: 'Level of Detail calculations in Tableau.' },
      { topic: 'Maps', detail: 'Geospatial visualization techniques.' },
      { topic: 'Design Polish', detail: 'Fonts, colors, and layout for readability.' },
      { topic: 'User Testing', detail: 'Getting feedback on dashboard usability.' },
      { topic: 'Publishing', detail: 'Sharing your work on Tableau Public.' }
    ]
  },
  {
    title: 'Advanced Analysis & Projects',
    overview: 'Go deeper. Apply all skills to complex, real-world problems.',
    dailyPlan: [
      { topic: 'Advanced Python', detail: 'Web scraping or API data collection.' },
      { topic: 'Time Series', detail: 'Analyzing trends over time.' },
      { topic: 'Correlation', detail: 'Identifying relationships between variables.' },
      { topic: 'Case Study 1', detail: 'End-to-end analysis of a business problem.' },
      { topic: 'Case Study 2', detail: 'Focus on financial or marketing data.' },
      { topic: 'Reporting', detail: 'Writing clear, actionable reports.' },
      { topic: 'Portfolio', detail: 'Assemble your analyses into a portfolio.' },
      { topic: 'Machine Learning', detail: 'Intro to K-Means Clustering for segmentation.' },
      { topic: 'NLP Basics', detail: 'Analyzing text data (sentiment analysis).' },
      { topic: 'Big Data', detail: 'Conceptual intro to Spark and Hadoop.' },
      { topic: 'Cloud Data', detail: 'Basics of Data Warehouses (Snowflake/BigQuery).' },
      { topic: 'Business Logic', detail: 'Define KPIs and success metrics.' },
      { topic: 'Presentation', detail: 'Record a loom video explaining your analysis.' },
      { topic: 'Portfolio Site', detail: 'Create a simple landing page for your work.' }
    ]
  },
  {
    title: 'Career & Interview Prep',
    overview: 'Showcase your ability to drive insights and business value.',
    dailyPlan: [
      { topic: 'SQL Interview', detail: 'Practice complex SQL queries on whiteboard.' },
      { topic: 'Case Interviews', detail: 'Practice product and business sense questions.' },
      { topic: 'Portfolio Review', detail: 'Polish your GitHub and Tableau Public profile.' },
      { topic: 'Resume', detail: 'Highlight impact ("improved x by y%").' },
      { topic: 'Mock Interview', detail: 'Practice explaining technical concepts simply.' },
      { topic: 'Networking', detail: 'Connect with other data professionals.' },
      { topic: 'Apply', detail: 'Target Data Analyst and Business Analyst roles.' },
      { topic: 'Metric Definition', detail: 'Practice defining metrics for vague problems.' },
      { topic: 'A/B Testing', detail: 'Understanding statistical significance in experiments.' },
      { topic: 'Python Challenges', detail: 'Solving data-specific coding challenges.' },
      { topic: 'Domain Knowledge', detail: 'Read up on a specific industry (Finance, Health).' },
      { topic: 'Freelancing', detail: 'Basics of finding data gigs on Upwork.' },
      { topic: 'Blog Writing', detail: 'Write an article about a recent project.' },
      { topic: 'Final Push', detail: 'Send targeted applications to dream companies.' }
    ]
  }
];

const JAVA_MILESTONES = [
  {
    title: 'Java Core Fundamentals',
    overview: 'Build a rock-solid foundation in Java programming and OOP.',
    dailyPlan: [
      { topic: 'Setup', detail: 'Install JDK, IntelliJ IDEA, and Maven.' },
      { topic: 'Syntax', detail: 'Variables, data types, operators, and loops.' },
      { topic: 'OOP 1', detail: 'Classes, Objects, Methods, and Constructors.' },
      { topic: 'OOP 2', detail: 'Inheritance, Polymorphism, Encapsulation.' },
      { topic: 'Collections', detail: 'List, Set, Map, and ArrayList vs LinkedList.' },
      { topic: 'Exceptions', detail: 'Try-catch blocks and creating custom exceptions.' },
      { topic: 'Project', detail: 'Build a console-based Banking System.' },
      { topic: 'Strings', detail: 'String immutability, StringBuilder, and formatting.' },
      { topic: 'Arrays', detail: 'Multidimensional arrays and manipulation.' },
      { topic: 'Debugging', detail: 'Master breakpoints and variable inspection.' },
      { topic: 'Unit Testing', detail: 'Intro to JUnit annotations and assertions.' },
      { topic: 'Java 17', detail: 'Records, Pattern Matching, and Switch Expressions.' },
      { topic: 'Clean Code', detail: 'Naming conventions and DRY principle.' },
      { topic: 'Refactoring', detail: 'Improving the Banking System code.' }
    ]
  },
  {
    title: 'Advanced Java & Database',
    overview: 'Master advanced language features and database connectivity.',
    dailyPlan: [
      { topic: 'Streams API', detail: 'Functional programming and Lambdas in Java 8.' },
      { topic: 'Multithreading', detail: 'Threads, Runnable, and Synchronization.' },
      { topic: 'File I/O', detail: 'Reading and writing files.' },
      { topic: 'SQL Basics', detail: 'Tables, keys, and basic queries.' },
      { topic: 'JDBC', detail: 'Connecting Java applications to a database.' },
      { topic: 'Design Patterns', detail: 'Singleton, Factory, and Builder patterns.' },
      { topic: 'Project', detail: 'Upgrade Banking System to use a DB.' },
      { topic: 'Generics', detail: 'Creating and using generic classes and methods.' },
      { topic: 'Reflection', detail: 'Inspecting classes and objects at runtime.' },
      { topic: 'Annotations', detail: 'Creating custom annotations.' },
      { topic: 'Socket Prog', detail: 'Basic networking in Java.' },
      { topic: 'Maven/Gradle', detail: 'Dependency management and build lifecycles.' },
      { topic: 'Normalization', detail: 'Database design forms (1NF, 2NF, 3NF).' },
      { topic: 'Project Polish', detail: 'Optimize DB connections and handling.' }
    ]
  },
  {
    title: 'Spring Framework & Boot',
    overview: 'Enter the enterprise world. Learn the industry-standard framework.',
    dailyPlan: [
      { topic: 'IoC & DI', detail: 'Inversion of Control and Dependency Injection.' },
      { topic: 'Spring Boot', detail: 'Starters, Auto-configuration, and properties.' },
      { topic: 'Spring MVC', detail: 'Building Controllers and handling requests.' },
      { topic: 'Spring Data JPA', detail: 'Repositories and Hibernate ORM.' },
      { topic: 'REST APIs', detail: 'Building RESTful services with Spring Boot.' },
      { topic: 'Security', detail: 'Basic Auth with Spring Security.' },
      { topic: 'Project', detail: 'Build a Task Management API.' },
      { topic: 'AOP', detail: 'Aspect Oriented Programming basics (Logging).' },
      { topic: 'Security Deep Dive', detail: 'JWT implementation and Filters.' },
      { topic: 'Validation', detail: 'Using Bean Validation (Hibernate Validator).' },
      { topic: 'Actuator', detail: 'Monitoring your Spring Boot application.' },
      { topic: 'Profiles', detail: 'Managing configuration for Dev/Prod environments.' },
      { topic: 'Swagger', detail: 'Documenting your API with OpenAPI.' },
      { topic: 'Integration Testing', detail: 'Testing Spring Context and Controllers.' }
    ]
  },
  {
    title: 'Frontend Integration (React)',
    overview: 'Become full stack. Connect your Java backend to a modern UI.',
    dailyPlan: [
      { topic: 'HTML/CSS/JS', detail: 'Crash course in web fundamentals.' },
      { topic: 'React Basics', detail: 'Components, State, and Props.' },
      { topic: 'Fetch API', detail: 'Consuming your Spring Boot API.' },
      { topic: 'CORS', detail: 'Handling Cross-Origin Resource Sharing.' },
      { topic: 'Forms', detail: 'Building forms to post data to backend.' },
      { topic: 'State', detail: 'Managing UI state based on API responses.' },
      { topic: 'Project', detail: 'Build the UI for your Task Manager.' },
      { topic: 'TypeScript', detail: 'Adding types to your React code.' },
      { topic: 'Context', detail: 'Managing global user state.' },
      { topic: 'UI Libraries', detail: 'Using Material UI or Bootstrap.' },
      { topic: 'React Router', detail: 'Handling navigation in the frontend.' },
      { topic: 'Error Hands', detail: 'Displaying backend errors to the user.' },
      { topic: 'Hooks', detail: 'Custom hooks for API calls.' },
      { topic: 'Frontend Testing', detail: 'Basic component testing.' }
    ]
  },
  {
    title: 'Full Stack & Microservices',
    overview: 'Scale it up. Learn about distributed systems and deployment.',
    dailyPlan: [
      { topic: 'Docker', detail: 'Containerizing Java apps.' },
      { topic: 'Microservices', detail: 'Monolith vs Microservices architecture.' },
      { topic: 'Service Discovery', detail: 'Basics of Eureka/Consul (conceptual).' },
      { topic: 'Testing', detail: 'JUnit and Mockito for backend testing.' },
      { topic: 'CI/CD', detail: 'Jenkins or GitHub Actions basics.' },
      { topic: 'Deployment', detail: 'Deploying JARs to cloud providers.' },
      { topic: 'Project', detail: 'Final Polish of Full Stack Application.' },
      { topic: 'Kubernetes', detail: 'Basic K8s concepts (Pods, Services).' },
      { topic: 'Cloud', detail: 'AWS Elastic Beanstalk or EC2 basics.' },
      { topic: 'Monitoring', detail: 'Prometheus and Grafana intro.' },
      { topic: 'Caching', detail: 'Redis integration for performance.' },
      { topic: 'Messaging', detail: 'Intro to Kafka or RabbitMQ.' },
      { topic: 'Resilience', detail: 'Circuit Breaker pattern.' },
      { topic: 'Project Review', detail: 'Full code audit and cleanup.' }
    ]
  },
  {
    title: 'Career & Interview',
    overview: 'Prepare for Enterprise Java roles.',
    dailyPlan: [
      { topic: 'Java Interview', detail: 'Review memory management and garbage collection.' },
      { topic: 'Spring Interview', detail: 'Lifecycle, scopes, and transaction management.' },
      { topic: 'System Design', detail: 'Designing scalable backend systems.' },
      { topic: 'Resume', detail: 'Highlight "Spring Boot" and "Microservices".' },
      { topic: 'Coding Challenge', detail: 'Practice LeetCode in Java.' },
      { topic: 'Mock Interview', detail: 'Explain your architecture choices.' },
      { topic: 'Apply', detail: 'Target Enterprise and backend-heavy roles.' },
      { topic: 'Concurrency', detail: 'Deep dive into Java concurrency interview questions.' },
      { topic: 'JVM Internals', detail: 'Classloading and memory model details.' },
      { topic: 'Design Patterns', detail: 'Reviewing common patterns in interviews.' },
      { topic: 'Behavioral', detail: 'STAR method practice.' },
      { topic: 'Distributed Tracing', detail: 'Concepts of Zipkin/Sleuth.' },
      { topic: 'Networking', detail: 'Connecting with Java User Groups.' },
      { topic: 'Final Apps', detail: 'Applying to top tier tech companies.' }
    ]
  }
];

const PYTHON_MILESTONES = [
  {
    title: 'Python Core & Logic',
    overview: 'Master the language of the web and data.',
    dailyPlan: [
      { topic: 'Setup', detail: 'Install Python, VS Code, and Virtual Environments.' },
      { topic: 'Syntax', detail: 'Variables, Types, Control Flow.' },
      { topic: 'Functions', detail: 'Arguments, Return values, Lambda.' },
      { topic: 'Data Structures', detail: 'Lists, Tuples, Sets, Dictionaries.' },
      { topic: 'OOP', detail: 'Classes, Objects, and Inheritance.' },
      { topic: 'Modules', detail: 'Importing and creating packages.' },
      { topic: 'Project', detail: 'Build a CLI Tool or Game.' },
      { topic: 'File I/O', detail: 'Reading and writing text/CSV files.' },
      { topic: 'Error Handling', detail: 'Try, Except, Finally blocks.' },
      { topic: 'Iterators', detail: 'Understanding Iterators and Generators.' },
      { topic: 'Decorators', detail: 'Higher-order functions and wrappers.' },
      { topic: 'RegEx', detail: 'Regular Expressions for text matching.' },
      { topic: 'Type Hinting', detail: 'Adding static types (mypy) to Python.' },
      { topic: 'Unit Tests', detail: 'Writing tests with unittest or pytest.' }
    ]
  },
  {
    title: 'Web Frameworks (Django)',
    overview: 'Build robust web applications with "batteries included".',
    dailyPlan: [
      { topic: 'Install Django', detail: 'Setup, Virtual Env, and Project Structure.' },
      { topic: 'Apps', detail: 'Concept of Apps and Routing (URLs).' },
      { topic: 'Views', detail: 'Function-based vs Class-based views.' },
      { topic: 'Templates', detail: 'Django Template Language (DTL).' },
      { topic: 'Models', detail: 'Defining database schemas in Python.' },
      { topic: 'Admin', detail: 'Customizing the Django Admin panel.' },
      { topic: 'Project', detail: 'Build a Blog or News site.' },
      { topic: 'Context Procs', detail: 'Global variables in templates.' },
      { topic: 'Middleware', detail: 'Writing custom middleware functions.' },
      { topic: 'Signals', detail: 'Decoupled actions on model save.' },
      { topic: 'Commands', detail: 'Writing custom management commands.' },
      { topic: 'Static Files', detail: 'Managing CSS/JS and media uploads.' },
      { topic: 'Debug Toolbar', detail: 'Profiling queries and performance.' },
      { topic: 'Deploy Prep', detail: 'Settings separation (base, dev, prod).' }
    ]
  },
  {
    title: 'Advanced Django & API',
    overview: 'Decouple the frontend. Build APIs with Django REST Framework (DRF).',
    dailyPlan: [
      { topic: 'ORM Queries', detail: 'Filtering, ordering, and relationships.' },
      { topic: 'Forms', detail: 'Handling user input and validation.' },
      { topic: 'DRF Intro', detail: 'Serializers and API Views.' },
      { topic: 'Authentication', detail: 'Token-based auth and permissions.' },
      { topic: 'ViewSets', detail: 'Routers and collaborative endpoints.' },
      { topic: 'Testing', detail: 'Writing tests for Views and Models.' },
      { topic: 'Project', detail: 'Convert Blog to an API.' },
      { topic: 'Generic Views', detail: 'Reducing boilerplate code in DRF.' },
      { topic: 'Throttling', detail: 'Rate limiting your API.' },
      { topic: 'Filtering', detail: 'Adding search and ordering to lists.' },
      { topic: 'Nested Tech', detail: 'Handling related data in serializers.' },
      { topic: 'API Docs', detail: 'Using Swagger/Redoc.' },
      { topic: 'JWT', detail: 'Implementing JSON Web Tokens.' },
      { topic: 'Postman', detail: 'Automated API testing collections.' }
    ]
  },
  {
    title: 'Frontend Integration (React)',
    overview: 'The modern stack. Python backend, React frontend.',
    dailyPlan: [
      { topic: 'React Setup', detail: 'Create React App / Vite.' },
      { topic: 'Components', detail: 'Building UI blocks.' },
      { topic: 'Axios', detail: 'Fetching data from Django API.' },
      { topic: 'State Mgmt', detail: 'Handling API data in React state.' },
      { topic: 'Auth Flow', detail: 'Login/Register via API.' },
      { topic: 'CORS', detail: 'Configuring headers for cross-origin.' },
      { topic: 'Project', detail: 'Full Stack Blog with React UI.' },
      { topic: 'React Router', detail: 'Client-side navigation.' },
      { topic: 'React Query', detail: 'Efficient server state management.' },
      { topic: 'Zustand', detail: 'Simple global state management.' },
      { topic: 'UI Library', detail: 'Using Chakra UI or Mantine.' },
      { topic: 'Form Handling', detail: 'React Hook Form integration.' },
      { topic: 'Error UI', detail: 'Toasts and alerts for errors.' },
      { topic: 'Final Polish', detail: 'Responsive design tweaks.' }
    ]
  },
  {
    title: 'Deployment & DevOps',
    overview: 'Get it running in production.',
    dailyPlan: [
      { topic: 'PostgreSQL', detail: 'Switching from SQLite to Postgres.' },
      { topic: 'Gunicorn', detail: 'WSGI HTTP Server.' },
      { topic: 'Docker', detail: 'Dockerizing Django and React.' },
      { topic: 'Cloud', detail: 'Deploy to Heroku, Render, or AWS.' },
      { topic: 'Static Files', detail: 'Handling static assets in production (WhiteNoise).' },
      { topic: 'CI/CD', detail: 'Automated testing and linting (Flake8).' },
      { topic: 'Docs', detail: 'Documenting your API with Swagger.' },
      { topic: 'Nginx', detail: 'Reverse proxy configuration.' },
      { topic: 'Celery', detail: 'Async task queue setup (Redis).' },
      { topic: 'AWS EC2', detail: 'Virtual server basics.' },
      { topic: 'AWS S3', detail: 'Offloading media files to object storage.' },
      { topic: 'Sentry', detail: 'Error tracking in production.' },
      { topic: 'Monitoring', detail: 'Basic uptime checks.' },
      { topic: 'Security', detail: 'SSL (LetsEncrypt) and firewalls.' }
    ]
  },
  {
    title: 'Career & Interview',
    overview: 'Land the Python role.',
    dailyPlan: [
      { topic: 'Python Interview', detail: 'Generators, Decorators, GIL.' },
      { topic: 'Django Interview', detail: 'Request cycle, Middleware, Signals.' },
      { topic: 'Resume', detail: 'Focus on "Full Stack" and specific libraries.' },
      { topic: 'Portfolio', detail: 'Showcase code quality and documentation.' },
      { topic: 'Algorithms', detail: 'Pythonic solutions to LeetCode.' },
      { topic: 'System Design', detail: 'Designing data-heavy apps.' },
      { topic: 'Apply', detail: 'Target Startups and Python shops.' },
      { topic: 'Asyncio', detail: 'Understanding asynchronous Python.' },
      { topic: 'Code Review', detail: 'Practice reviewing code snippets.' },
      { topic: 'Behavioral', detail: 'Preparing soft skill answers.' },
      { topic: 'Whiteboarding', detail: 'Solving problems on paper.' },
      { topic: 'Networking', detail: 'Python Discord communities.' },
      { topic: 'Blogging', detail: 'Write a tutorial on a niche topic.' },
      { topic: 'Final Review', detail: 'Audit of all projects.' }
    ]
  }
];

const UIUX_MILESTONES = [
  {
    title: 'Design Foundations',
    overview: 'Understand the "Why" before the "How". Theory of aesthetics and usability.',
    dailyPlan: [
      { topic: 'Typography', detail: 'Typefaces, hierarchy, and readability.' },
      { topic: 'Color Theory', detail: 'Color wheel, harmony, and psychology.' },
      { topic: 'Layout', detail: 'Grid systems, whitespace, and alignment.' },
      { topic: 'Interaction', detail: 'Principles of animation and feedback.' },
      { topic: 'Accessibility', detail: 'WCAG guidelines and inclusive design.' },
      { topic: 'Heuristics', detail: 'Nielsen’s 10 usability heuristics.' },
      { topic: 'Analysis', detail: 'Critique 3 popular apps based on these principles.' },
      { topic: 'Gestalt', detail: 'Gestalt principles of visual perception.' },
      { topic: 'Hierarchy', detail: 'Controlling where the user looks.' },
      { topic: 'Design Trends', detail: 'Analyzing current UI trends (Glassmorphism, etc).' },
      { topic: 'Biases', detail: 'Cognitive biases in user experience.' },
      { topic: 'Mobile First', detail: 'Designing for small screens first.' },
      { topic: 'Dark Mode', detail: 'Considerations for dark themes.' },
      { topic: 'Copywriting', detail: 'Micro-copy and tone of voice.' }
    ]
  },
  {
    title: 'Figma Mastery',
    overview: 'Master the industry standard tool for interface design.',
    dailyPlan: [
      { topic: 'Interface', detail: 'Frames, Groups, and Layers concepts.' },
      { topic: 'Vector Tools', detail: 'Pen tool, boolean operations, and shapes.' },
      { topic: 'Auto Layout', detail: 'Crucial for responsive cards and lists.' },
      { topic: 'Components', detail: 'Creating reusable UI elements.' },
      { topic: 'Variants', detail: 'Component states (hover, active, disabled).' },
      { topic: 'Plugins', detail: 'Essential plugins for icons and data.' },
      { topic: 'Practice', detail: 'Clone a popular app screen exactly.' },
      { topic: 'Adv AutoLayout', detail: 'Nested frames and absolute positioning.' },
      { topic: 'Interactive', detail: 'Creating interactive components.' },
      { topic: 'Prototyping', detail: 'Scroll behavior and fixed elements.' },
      { topic: 'Variables', detail: 'Using variables for modes (light/dark).' },
      { topic: 'Constraints', detail: 'Resizing behavior for screens.' },
      { topic: 'Shortcuts', detail: 'Speed up workflow with keyboard shortcuts.' },
      { topic: 'Asset Export', detail: 'Preparing assets for developers.' }
    ]
  },
  {
    title: 'UX Research & Flows',
    overview: 'Solve the right problem. Understand the user.',
    dailyPlan: [
      { topic: 'Discovery', detail: 'User interviews and competitive audit.' },
      { topic: 'Personas', detail: 'Creating user archetypes.' },
      { topic: 'User Journey', detail: 'Mapping the current and future state.' },
      { topic: 'Information Arch', detail: 'Sitemaps and card sorting.' },
      { topic: 'User Flows', detail: 'Diagramming the path to a goal.' },
      { topic: 'Sketches', detail: 'Paper prototyping and rapid ideation.' },
      { topic: 'Problem Statement', detail: 'Defining the "How might we".' },
      { topic: 'Affinity Maps', detail: 'Synthesizing research data.' },
      { topic: 'Empathy Maps', detail: 'Understanding user feelings and thoughts.' },
      { topic: 'Value Prop', detail: 'Defining the core value for the user.' },
      { topic: 'Surveys', detail: 'Designing effective user surveys.' },
      { topic: 'A/B Testing', detail: 'Concepts of split testing designs.' },
      { topic: 'Research Repo', detail: 'Organizing research findings.' },
      { topic: 'Storyboarding', detail: 'Visualizing usage scenarios.' }
    ]
  },
  {
    title: 'Wireframing & Prototyping',
    overview: 'Bring ideas to life. From Low-Fi to High-Fi.',
    dailyPlan: [
      { topic: 'Lo-Fi', detail: 'Digital wireframes focused on structure.' },
      { topic: 'Mid-Fi', detail: 'Adding grid and basic copy' },
      { topic: 'Hi-Fi', detail: 'Applying brand, color, and images.' },
      { topic: 'Prototyping', detail: 'Connecting screens with interactions.' },
      { topic: 'Smart Animate', detail: 'Creating smooth transitions.' },
      { topic: 'Micro-interactions', detail: 'Animating buttons and toggles.' },
      { topic: 'Testing', detail: 'Running a usability test on your prototype.' },
      { topic: 'Grids', detail: 'Setting up responsive column grids.' },
      { topic: 'Patterns', detail: 'Common UI patterns (Modals, Navs).' },
      { topic: 'Accessibility', detail: 'Annotating designs for screen readers.' },
      { topic: 'Empty States', detail: 'Designing for no-data scenarios.' },
      { topic: 'Edge Cases', detail: 'Designing for errors and long content.' },
      { topic: 'Motion Design', detail: 'Timing and easing in animations.' },
      { topic: 'Iteration', detail: 'Refining based on test feedback.' }
    ]
  },
  {
    title: 'Design Systems & Handoff',
    overview: 'Work with developers. Scale your design.',
    dailyPlan: [
      { topic: 'Design System', detail: 'Documenting tokens (color, type).' },
      { topic: 'Component Lib', detail: 'Organizing components for reuse.' },
      { topic: 'Documentation', detail: 'Writing guidelines for usage.' },
      { topic: 'Handoff', detail: 'Preparing files for developers (specs).' },
      { topic: 'Collaboration', detail: 'Using Figma logic/dev mode.' },
      { topic: 'Review', detail: ' QAing the implemented code.' },
      { topic: 'Project', detail: 'Create a mini design system.' },
      { topic: 'Iconography', detail: 'Creating a cohesive icon set.' },
      { topic: 'Spacing', detail: 'Defining a spatial rhythm system.' },
      { topic: 'Tokens', detail: 'Semantic naming of design values.' },
      { topic: 'Governance', detail: 'How to update the system.' },
      { topic: 'Storybook', detail: 'Understanding the dev side of systems.' },
      { topic: 'Communication', detail: 'Speaking the developer language.' },
      { topic: 'Case Study', detail: 'Documenting the system for portfolio.' }
    ]
  },
  {
    title: 'Portfolio & Career',
    overview: 'Showcase your process, not just pretty pictures.',
    dailyPlan: [
      { topic: 'Case Study 1', detail: 'Write a deep dive on a project (Problem -> Solution).' },
      { topic: 'Case Study 2', detail: 'A smaller, visual-focused project.' },
      { topic: 'Portfolio Site', detail: 'Build a site (Framer/Webflow) or PDF.' },
      { topic: 'Resume', detail: 'Design a clean, readable resume.' },
      { topic: 'Presentation', detail: 'Prepare a deck for portfolio review.' },
      { topic: 'Mock Interview', detail: 'Practice the "Whiteboard Challenge".' },
      { topic: 'Apply', detail: 'Apply to Product Designer / UI/UX roles.' },
      { topic: 'Freelancing', detail: 'Basics of contract and pricing.' },
      { topic: 'Networking', detail: 'Engaging with the design community.' },
      { topic: 'Challenges', detail: 'Participating in daily UI challenges.' },
      { topic: 'Critique', detail: 'Giving and receiving design feedback.' },
      { topic: 'Soft Skills', detail: 'Empathy and communication.' },
      { topic: 'Redesign', detail: 'Unsolicited redesign of an existing app.' },
      { topic: 'Final Polish', detail: 'Perfecting the portfolio site.' }
    ]
  }
];

const CYBER_MILESTONES = [
  {
    title: 'IT & Network Foundations',
    overview: 'You can\'t hack what you don\'t understand. Master the infrastructure.',
    dailyPlan: [
      { topic: 'Computing', detail: 'CPU, RAM, Storage, and Logic.' },
      { topic: 'OSI Model', detail: 'Deep dive into the 7 layers of networking.' },
      { topic: 'TCP/IP', detail: 'IP addressing, Subnetting, and Ports.' },
      { topic: 'Protocols', detail: 'DNS, DHCP, HTTP/HTTPS, FTP, SSH.' },
      { topic: 'Virtualization', detail: 'Setup VirtualBox/VMware and Kali Linux.' },
      { topic: 'Windows', detail: 'Command line and Registry basics.' },
      { topic: 'Lab', detail: 'Build a home lab with Active Directory.' },
      { topic: 'Subnetting', detail: 'Calculating subnets and masks.' },
      { topic: 'Routing', detail: 'How packets travel across networks.' },
      { topic: 'DNS', detail: 'Name resolution and record types.' },
      { topic: 'Active Directory', detail: 'Users, Groups, and Domains.' },
      { topic: 'PowerShell', detail: 'Basic administration scripting.' },
      { topic: 'Linux FS', detail: 'Understanding file system hierarchy.' },
      { topic: 'Troubleshooting', detail: 'Diagnosing network connectivity issues.' }
    ]
  },
  {
    title: 'Linux & Scripting',
    overview: 'The hacker\'s OS. Learn to live in the terminal.',
    dailyPlan: [
      { topic: 'Linux Basics', detail: 'Navigation, Permissions (chmod/chown).' },
      { topic: 'Bash Scripting', detail: 'Automating tasks with shell scripts.' },
      { topic: 'Python Basics', detail: 'Syntax for security scripts.' },
      { topic: 'Socket Prog', detail: 'Writing a basic port scanner in Python.' },
      { topic: 'Text Processing', detail: 'Grep, Sed, Awk mastery.' },
      { topic: 'Processes', detail: 'Managing processes and services.' },
      { topic: 'Lab', detail: 'Complete "OverTheWire Bandit" Wargame.' },
      { topic: 'Logs', detail: 'Analyzing /var/log for activity.' },
      { topic: 'Cron', detail: 'Scheduling automated tasks.' },
      { topic: 'SSH Keys', detail: 'Secure authentication management.' },
      { topic: 'RegEx', detail: 'Pattern matching for log analysis.' },
      { topic: 'Requests Lib', detail: 'Interacting with web services in Python.' },
      { topic: 'One-Liners', detail: 'Powerful bash command chains.' },
      { topic: 'Vim/Nano', detail: 'Editing config files in terminal.' }
    ]
  },
  {
    title: 'Security Cores',
    overview: 'Defensive theory. CIA Triad and Cryptography.',
    dailyPlan: [
      { topic: 'CIA Triad', detail: 'Confidentiality, Integrity, Availability.' },
      { topic: 'Encryption', detail: 'Symmetric vs Asymmetric, Hashing.' },
      { topic: 'PKI', detail: 'Public Key Infrastructure and Certificates.' },
      { topic: 'Access Control', detail: 'Authentication vs Authorization (RBAC).' },
      { topic: 'Firewalls', detail: 'Host vs Network firewalls rules.' },
      { topic: 'Malware', detail: 'Types of malware: Virus, Worm, Trojan, Ransomware.' },
      { topic: 'Quiz', detail: 'Test yourself on Security+ concepts.' },
      { topic: 'VPNs', detail: 'Tunneling and secure remote access.' },
      { topic: 'IDS/IPS', detail: 'Intrusion Detection/Prevention Systems.' },
      { topic: 'SIEM', detail: 'Security Information and Event Management.' },
      { topic: 'DLP', detail: 'Data Loss Prevention concepts.' },
      { topic: 'Hashing', detail: 'MD5, SHA families and collisions.' },
      { topic: 'Steganography', detail: 'Hiding data within other files.' },
      { topic: 'Physical Sec', detail: 'Locks, cameras, and tailgating.' }
    ]
  },
  {
    title: 'Ethical Hacking Tools',
    overview: 'The offensive toolkit. Reconnaissance and Scanning.',
    dailyPlan: [
      { topic: 'Recon', detail: 'OSINT techniques (Shodan, whois).' },
      { topic: 'Nmap', detail: 'Network mapping and vulnerability scanning.' },
      { topic: 'Wireshark', detail: 'Packet analysis and traffic sniffing.' },
      { topic: 'Metasploit', detail: 'Framework basics and payloards.' },
      { topic: 'Burp Suite', detail: 'Web proxy and request manipulation.' },
      { topic: 'Hydra/John', detail: 'Password cracking tools.' },
      { topic: 'Lab', detail: 'Hack a beginner box on TryHackMe.' },
      { topic: 'Google Dorks', detail: 'Advanced search operators for recon.' },
      { topic: 'Nikto', detail: 'Web server scanning.' },
      { topic: 'Gobuster', detail: 'Brute forcing directories and DNS.' },
      { topic: 'Netcat', detail: 'The swiss army knife of networking.' },
      { topic: 'Hashcat', detail: 'GPU based password cracking.' },
      { topic: 'PrivEsc', detail: 'Basic Linux privilege escalation.' },
      { topic: 'Report', detail: 'Documenting the findings from the lab.' }
    ]
  },
  {
    title: 'Web & App Security',
    overview: 'Hunting for bugs on the web. OWASP Top 10.',
    dailyPlan: [
      { topic: 'OWASP Top 10', detail: 'Injection, Broken Auth, XSS.' },
      { topic: 'SQL Injection', detail: 'Manual and automated testing (SQLMap).' },
      { topic: 'XSS', detail: 'Stored vs Reflected Cross-Site Scripting.' },
      { topic: 'CSRF/SSRF', detail: 'Forgery and Server-Side Request Forgery.' },
      { topic: 'IDOR', detail: 'Insecure Direct Object Reference.' },
      { topic: 'Secure Coding', detail: 'How to fix these vulnerabilities.' },
      { topic: 'Lab', detail: 'Complete OWASP Juice Shop challenges.' },
      { topic: 'File Inclusion', detail: 'LFI and RFI vulnerabilities.' },
      { topic: 'Command Inj', detail: 'OS Command Injection attacks.' },
      { topic: 'XXE', detail: 'XML External Entity attacks.' },
      { topic: 'Web Shells', detail: 'Uploading backdoors to servers.' },
      { topic: 'API Security', detail: 'Testing REST and GraphQL endpoints.' },
      { topic: 'WAF', detail: 'Web Application Firewalls bypass basics.' },
      { topic: 'Bug Bounty', detail: 'Intro to HackerOne and platforms.' }
    ]
  },
  {
    title: 'Certifications & Career',
    overview: 'Validation and getting hired.',
    dailyPlan: [
      { topic: 'Cert Path', detail: 'Security+ -> CEH/eJPT -> OSCP.' },
      { topic: 'Reporting', detail: 'Writing professional vulnerability reports.' },
      { topic: 'CTFs', detail: 'Participate in a Capture The Flag event.' },
      { topic: 'Resume', detail: 'Highlight labs, CTFs, and tools.' },
      { topic: 'Interview', detail: 'Common port numbers and attack scenarios.' },
      { topic: 'Ethics', detail: 'Rules of Engagement and legal boundaries.' },
      { topic: 'Apply', detail: 'Target SOC Analyst or Junior Pentester roles.' },
      { topic: 'Report Writing', detail: 'Practicing executive summaries.' },
      { topic: 'Soft Skills', detail: 'Communicating risk to stakeholders.' },
      { topic: 'Blue Team', detail: 'Understanding the defensive perspective.' },
      { topic: 'Compliance', detail: 'GDPR, HIPAA, and PCI-DSS basics.' },
      { topic: 'Networking', detail: 'InfoSec Twitter and conferences.' },
      { topic: 'Continuous', detail: 'Setting up an RSS feed for security news.' },
      { topic: 'Final Goal', detail: 'Mapping out the next 1-3 years.' }
    ]
  }
];

// Mapping roles to their specific milestones
const MILESTONE_MAP = {
  'frontend-dev': WEB_DEV_MILESTONES,
  'backend-dev': WEB_DEV_MILESTONES,
  'fullstack-dev': WEB_DEV_MILESTONES,
  'data-analyst': DATA_ANALYST_MILESTONES,
  'java-fullstack': JAVA_MILESTONES,
  'python-fullstack': PYTHON_MILESTONES,
  'ui-ux': UIUX_MILESTONES,
  'cyber-security': CYBER_MILESTONES
};


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

  // Select the appropriate set of milestones based on role, fallback to Web Dev if unknown (unlikely)
  const sourceMilestones = MILESTONE_MAP[roleId] || WEB_DEV_MILESTONES;

  for (let i = 0; i < milestoneCount; i++) {
    // Cyclic access to milestones if count > length (e.g. 24 week plan repeats or extends)
    const base = sourceMilestones[i % sourceMilestones.length];

    const weekStart = i * 2 + 1;
    const weekEnd = weekStart + 1;

    milestones.push({
      id: `m${i + 1}`,
      week: `Week ${weekStart}–${weekEnd}`,
      title:
        durationWeeks === 24 && i >= sourceMilestones.length
          ? `${base.title} (Deep Dive)`
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