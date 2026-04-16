export const heroData = {
    roles: ['Full Stack Developer (MERN)', 'Power BI Developer'],
    overview:
        'Results-driven Full Stack Developer with expertise in the MERN stack and a strong foundation in Computer Applications. Proven track record of developing scalable, high-performance web applications, combining technical skills with a proactive approach to problem-solving. Committed to contributing to dynamic tech environments with innovative solutions.',
};

export const aboutData = {
    paragraphs: [
        'Results-driven Full Stack Developer with expertise in the MERN stack and a strong foundation in Computer Applications. Proven track record of developing scalable, high-performance web applications, combining technical skills with a proactive approach to problem-solving.',
        'Throughout my career, I have focused on creating user-centric and efficient digital solutions. My experience spans from developing dynamic user interfaces using React.js to implementing robust server-side logic with Node.js and Express.js. I am adept at database management with MongoDB and skilled in data analysis using Power BI and Microsoft Excel.',
        'I am passionate about continuous learning and staying up-to-date with the latest technology trends. I thrive in collaborative environments and enjoy tackling complex challenges that require innovative solutions. My goal is to leverage my skills and passion to contribute meaningfully to impactful projects.',
        'Outside of coding, I enjoy reading about technology advancements, contributing to open-source projects, and occasionally hiking to stay refreshed and inspired.',
    ],
    contact: [
        { key: 'email', label: 'Email', value: 'npanthi718@gmail.com', href: 'mailto:npanthi718@gmail.com' },
        { key: 'phone', label: 'Phone', value: '+91 9359029905', href: 'tel:+919359029905' },
        { key: 'linkedin', label: 'LinkedIn', value: 'Sushil Panthi', href: 'https://www.linkedin.com/in/sushilpanthi/' },
        { key: 'github', label: 'GitHub', value: 'Sushil Panthi', href: 'https://github.com/npanthi718' },
    ],
};

export const externalLinks = {
    googleForm: 'https://forms.gle/ntuoEHJF9wqzBjtN9',
};

export const categorizedSkillsData = { // Categorized skills data
    'Technical Skills': [
        { name: 'MERN Stack', proficiency: 90 },
        { name: 'Python', proficiency: 85 },
        { name: 'Java', proficiency: 80 },
        { name: 'SQL', proficiency: 80 },
        { name: 'C', proficiency: 85 },
        { name: 'C++', proficiency: 85 },
        { name: 'HTML', proficiency: 95 },
        { name: 'CSS', proficiency: 95 },
        { name: 'JavaScript', proficiency: 85 },
    ],
    'Tools & Platforms': [
        { name: 'Git', proficiency: 95 },
        { name: 'Power BI', proficiency: 80 },
        { name: 'Data Visualization', proficiency: 80 },
        { name: 'Microsoft Excel', proficiency: 90 },
        { name: 'Microsoft Office Suite', proficiency: 92 },
    ],
    'Soft Skills': [
        { name: 'Leadership' },
        { name: 'Team Management' },
        { name: 'Communication' },
        { name: 'Team Collaboration' },
        { name: 'Problem Solving' },
        { name: 'Time Management' },
    ],
};

export const projectsData = [


    {
        title: 'SkillNexus - Learn from Humans',
        technologies: [
            'React', 'Vite', 'React Router (HashRouter)', 'Axios',
            'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT',
            'CSS utility classes'
        ],
        liveLink: 'https://skillnexus-learn-and-earn-with-humans-1.onrender.com/',
        githubLink: 'https://github.com/npanthi718/SkillNexus--Learn-and-Earn-with-Humans',
        keyContributions: [
            'Built a peer-to-peer learning marketplace where people learn directly from humans (not prerecorded videos), with mobile-first UI, width-safe layouts.',
            'Engineered a unified friendship + notification lifecycle with request/accept/reject/cancel endpoints, auto-delete pending notifications on cancel, single-item status that persists across refresh, relation-based syncing, duplicate suppression, and event-driven/visibility refresh.',
            'Implemented secure, reliable platform foundations using JWT auth, protected admin areas with token validation, Mongoose data models, scrollable one-line filters for clean discovery, consistent purple brand styling, accessible contrast, and larger tap targets.',
            'Delivered end-to-end performance and quality with removed noisy SSE 404s, optimized axios base/proxy, added toasts and disabled buttons during network calls, ran lint/QA across routes, and verified production behavior post-deploy.',
        ]
    },


    {
        title: 'AlgoCare - Reducing the Wait, Prioritizing the Life',
        technologies: [
            'React', 'Vite', 'Node.js (ESM)', 'Express', 'Socket.io',
            'MongoDB', 'Mongoose', 'JWT', 'Bcrypt', 'Tailwind/MUI'
        ],
        liveLink: 'https://algocare.onrender.com/',
        githubLink: 'https://github.com/npanthi718/AlgoCare--Reducing-the-Wait-Prioritizing-the-Life-',
        keyContributions: [
            'Developed an intelligent hospital resource and queue management SaaS for Track 3 of HackGenX 2026, delivering tailored dashboards for Patients, Doctors, and Administrators.',
            'Engineered a self-correcting queue engine using a Moving Average Algorithm that calculates high-precision patient ETAs based on the actual completion speed of the last five consultations.',
            'Implemented zero-latency real-time synchronization using Socket.io, enabling instant cross-dashboard updates for token status, bed availability, and resource levels without page refreshes.',
            'Built a secure, modular foundation using a Controller-Service-Repository pattern with JWT-based role-based access control (RBAC) and automated history linking via email-based patient identification.',
        ]
    },


    {
        title: 'Emotion-Based Mental Health Tracker',
        technologies: ['React', 'TypeScript', 'Vite', 'Material-UI', 'Recharts', 'JWT', 'localStorage (simulated DB)', 'Tailwind CSS'],
        liveLink: 'https://ai-powered-mental-healthtest-bysushil.netlify.app/',
        githubLink: 'https://github.com/npanthi718/AI-Powered-Mental-Health-Assesment-Platform',
        keyContributions: [
            'Emotion-first risk assessment with automatic webcam emotion analysis on login, 8-question survey, instant personalized risk score and recommendations.',
            'Closed-loop improvement workflow with camera-monitored guided activities, 5-question emotion retest, quantified pre/post improvement and visual comparisons.',
            'Iterative personalized recommendations via dynamic re-assessment loop delivering targeted interventions and next-step guidance to reduce user risk.',
            'Secure analytics-backed platform with role-based authentication, protected admin dashboard, persistent localStorage data and exportable real-time dashboards.'
        ]
    },


    {
        title: 'LumbiniCare Connect: Lumbini Nepal Hospital',
        technologies: ['MERN Stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js', 'Material-UI', 'JWT Authentication', 'RESTful APIs'],
        liveLink: 'https://lumbinicare-connect-lumbini-nepal-tlj9.onrender.com/',
        githubLink: 'https://github.com/npanthi718/LumbiniCare-Connect-Lumbini-Nepal-Hospital',
        keyContributions: [
            'Built a full-stack hospital management system enabling efficient management of appointments, prescriptions, and departments.',
            'Implemented secure authentication and role-based access control (RBAC) using JWT for data privacy and restricted access.',
            'Designed scalable RESTful APIs for CRUD operations with robust error handling and MongoDB integration.',
            'Enhanced user experience with a responsive React.js frontend and Material-UI for a mobile-friendly interface.'
        ]
    },


    {
        title: 'SushilGPT: Full-Stack AI Chat Platform',
        technologies: [
            'MERN Stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js', 'Vite', 'CSS Modules', 'OpenAI API'
        ],
        liveLink: null,
        githubLink: 'https://github.com/npanthi718/SushilGPT',
        keyContributions: [
            'Developed a ChatGPT-inspired conversational AI platform featuring real-time chat using the MERN stack.',
            'Integrated OpenAI API for generating intelligent and context-aware responses, enabling seamless user interaction.',
            'Implemented persistent chat history storage with MongoDB and designed RESTful APIs for robust backend operations.',
            'Created a modern, responsive UI using React.js, Vite, and CSS modules, ensuring an engaging user experience across devices.'
        ]
    },

    {
        title: 'FaceMark: Automated Attendance Solution',
        technologies: ['Python 3.9', 'OpenCV 4.x', 'Face Recognition Library', 'Tkinter', 'Numpy', 'Pandas'],
        liveLink: null,
        githubLink: 'https://github.com/npanthi718/Face_Recognition_Attendance',
        keyContributions: [
            'Developed a dynamic and efficient attendance system using Face Recognition Technology. The system automates attendance marking by detecting and identifying student faces from classroom photos.',
            'The project allows teachers to take attendance by capturing a class photo, automatically marking students present or absent based on facerecognition. It also provides a dashboard for managing student details and viewing attendance records.',
            'Architected a face detection and recognition module leveraging Flask, OpenCV, and Face Recognition Library; the tool is now used by over 20 employees across security teams.',
        ],
    },

    {
        title: 'StockSmart: MEN Stack Inventory & Billing',
        technologies: ['MongoDB', 'Express.js', 'Node.js', 'HTML/CSS', 'MEN Stack'],
        liveLink: null,
        githubLink: 'https://github.com/npanthi718/SuperMarket-Management-Using-MEN-Stack',
        keyContributions: [
            'Developed a robust inventory and billing system with real-time stock updates and automated alerts.',
            'The project provides a comprehensive platform for administrators, cashiers, and stock managers to efficiently manage stock, generate bills, and monitor sales data.',
            'Built using the MEN stack (MongoDB, Express.js, Node.js). Employed HTML/CSS/JavaScript for frontend development and Node.js for backend operations.',
            'Streamlined supermarket operations, minimized human errors, and provided real-time insights into inventory and sales performance.',
        ],
    },
    {
        title: 'StudentTrack: Django-Based Management',
        technologies: ['Python', 'JavaScript', 'Django', 'HTML/CSS'],
        liveLink: null,
        githubLink: 'https://github.com/npanthi718/Student-Management-System',
        keyContributions: [
            'Developed a robust platform for managing student data with features like CRUD operations, course filtering, and error handling.',
            'Designed a responsive user interface for seamless interaction.',
            'Implemented secure database operations to manage sensitive information.',
        ],
    },
];

export const experienceData = [

    {
        title: 'Agentic AI Intern',
        company: 'Innomatics Research Labs',
        date: '02/2026 - Present',
        location: 'Remote',
        description: [
            'Developing advanced AI agents and workflows utilizing Python, LangChain, and LangGraph to automate complex reasoning tasks.',
            'Architecting and deploying scalable backend services and APIs using FastAPI to power AI-driven applications.',
            'Leveraging AWS cloud infrastructure to support the training, testing, and deployment of agentic systems.',
            'Collaborating on the end-to-end development of AI products, from initial concept and Python programming to production-ready deployments.',
        ],
    },

    {
        title: 'Data Science with GenAI Intern',
        company: 'Innomatics Research Labs',
        date: '11/2025 - 03/2026',
        location: 'Remote',
        description: [
            'Engaged in the development of Data Science and Generative AI-driven projects, focusing on building intelligent solutions and optimizing machine learning models.',
            'Collaborated on high-impact products involving Artificial Intelligence and Machine Learning to bridge the gap between complex data and user-centric applications.',
            'Applied advanced concepts in GenAI to enhance project functionalities and contribute to the end-to-end development lifecycle of data products.',
            'Worked within an agile, virtual environment to execute technical tasks and upskill in emerging AI technologies.',
        ],
    },

    {
        title: 'Tech Intern',
        company: 'Anishk Sustainable Development Foundation (ASDF)',
        date: '04/2024 - 04/2025',
        location: 'Remote',
        description: [
            'Collaborated with a team to develop the "Arka Journal" website, focusing on research and publications related to rural and tribal community initiatives.',
            'Utilized HTML, CSS, JavaScript, and PHP to build a responsive, user-friendly website for showcasing research papers and publications.',
            'Worked closely with developers, designers, and researchers to integrate research content seamlessly into the website.',
            'Enhanced the accessibility and visibility of community-driven research by creating a digital platform for sharing knowledge and innovations.',
        ],
    },


    {
        title: 'Full Stack Development Intern',
        company: 'Innomatics Research Labs',
        date: '01/2025 - 03/2025',
        location: 'Remote',
        description: [
            'Built dynamic and interactive user interfaces using React.js, improving the usability and aesthetics of web applications.',
            'Implemented robust server-side logic with Node.js and Express.js, ensuring secure and efficient data handling.',
            'Managed and queried data using MongoDB, optimizing application performance through effective data modeling.',
            'Participated in training sessions to upskill in both frontend and backend technologies, applying new concepts directly to real-world tasks.',
            'Proactively handled assigned tasks, demonstrating problem-solving skills and a commitment to learning and growth.',
        ],
    },
    {
        title: 'Full Stack Development Intern',
        company: 'Pantech Prolabs India Pvt Ltd',
        date: '07/2024 - 01/2025',
        location: 'Remote',
        description: [
            'Utilized MERN stack (MongoDB, Express.js, React.js, Node.js) and modern development practices to build scalable and dynamic applications.',
            'Worked under the supervision of senior developers, learning and applying best practices in software development.',
            'Contributed to debugging, testing, and optimizing code to improve application performance and reliability.',
            'Enhanced technical knowledge through hands-on experience and real-world application of software development concepts.',
        ],
    },

];

export const additionalExperienceData = [
    {
        title: 'Manager',
        company: 'New Sushant Chamena Griha',
        date: 'April 2020 - June 2023',
        location: 'Kathmandu, Nepal (On-site)',
        description: [
            'Managed inventory, finances, and supplier relations effectively',
        ],
    },
    {
        title: 'Marketing Director',
        company: 'Vision Dreamery Private Limited',
        date: 'November 2022 - April 2023',
        location: 'Kathmandu, Nepal (On-site)',
        description: [
            'Oversaw marketing campaigns to enhance brand visibility and drive revenue growth.',
            'Conducted market research to inform strategy development.',
            'Led team efforts to design and execute impactful campaigns.',
        ],
    },
    {
        title: 'Motivational Speaker',
        company: 'Sarva Sikshya Educational Center',
        date: 'November 2022 - April 2023',
        location: 'Kathmandu, Nepal (On-site)',
        description: [
            'Delivered engaging speeches to inspire individuals to overcome challenges and achieve goals.',
            'Tailored presentations to suit audience needs, fostering motivation and personal growth.',
        ],
    },
    {
        title: 'Sales and Marketing Specialist',
        company: 'Emporium Marketing Private Limited',
        date: 'August 2021 - October 2022',
        location: 'West Bengal, India (On-site)',
        description: [
            'Developed and executed marketing programs to promote products and expand the customer base.',
            'Engaged in lead generation and strengthened distributor relationships.',
        ],
    },
    {
        title: 'Sales Supervisor',
        company: 'Bishal Impex',
        date: 'January 2021 - July 2021',
        location: 'Kathmandu, Nepal (On-site)',
        description: [
            'Led a team of sales associates, optimizing sales processes and mentoring staff.',
            'Managed inventory and ensured high levels of customer satisfaction.',
        ],
    },
];

export const educationData = [  // Education Data Array
    {
        degree: 'Bachelor of Computer Applications (BCA)',
        institution: 'School of Computer Science and Engineering, Sandip University',
        dates: 'July 2023 - May 2026',
        cgpa: '8.6/10',
    },
    {
        degree: 'Secondary Level (+2)',
        institution: 'Vijaya Memorial Secondary School',
        dates: 'July 2021 - May 2023',
        cgpa: '3.12/4',
    },
    {
        degree: 'Intermediate Level (10)',
        institution: 'Vijaya Memorial Secondary School',
        dates: 'Completed',
        cgpa: '3.8/4',
    },
];

export const achievementsData = [ // Achievements & Extracurricular Activities Data
    {
        title: 'President, Nature Club',
        company: 'Vijaya Memorial Secondary School',
        date: '2020 - 2021', // Year
        location: 'Kathmandu, Nepal',
        description: [
            'Led tree plantation drives, clean-up campaigns, and biodiversity seminars.',
            'Promoted eco-friendly practices like recycling and waste reduction in school.',
            'Organized field trips and workshops to foster environmental awareness.',
            'Collaborated with communities to address environmental challenges.',
        ],
    },
    {
        title: 'President, Child Club',
        company: 'Vijaya Memorial Secondary School',
        date: '2019 - 2021',
        location: 'Kathmandu, Nepal',
        description: [
            'Led initiatives to promote child rights, education, and personal development.',
            'Organized awareness programs, talent shows, and leadership workshops.',
            'Fostered teamwork and community engagement through various school activities.',
            'Collaborated with students and teachers to address child-related issues.'
        ],
    },
    {
        title: 'Cultural Program Coordinator',
        company: 'Vijaya Memorial Secondary School',
        date: '2018 - 2021',
        location: 'Kathmandu, Nepal',
        description: [
            'Organized and coordinated school cultural events and festivals.',
            'Promoted cultural awareness and student participation in arts and traditions.',
            'Managed event planning, scheduling, and resource allocation.',
            'Fostered teamwork and creativity among students through cultural activities.',

        ],
    },
];

export const coursesData = [ // Courses Data
    {
        name: 'AI in Current Technology (Advanced AI Technologies)',
        institution: 'Be10X',
        date: 'August 2025 - February 2026',
    },

    {
        name: 'Full Stack Development (MERN Stack)',
        institution: 'Apna College',
        date: 'February 2025 - July 2025',
    },

    {
        name: 'Data Structures and Algorithms (DSA)',
        institution: 'Apna College',
        date: 'October 2024 - February 2025',
    },

    {
        name: 'Advanced Power BI',
        institution: 'JatanSah',
        date: 'January 2024 - October 2024',
    },
];

export const researchpapersData = [
    {
        title: 'A Blockchain-Driven Decentralized Framework for Secure and Automated Spectrum Trading in 6G Wireless Networks Using Automata Theory',
        organizer: 'International Conference on Advances in Computational Intelligence and Applications-2025',
        institution: 'Insitute of Information Technology & Management(IITM), GGS Indraprastha University, New Delhi',
        date: 'November 8 & 9, 2025',
        location: 'Online Presentation',
        paperLink: null,
        description: [
            'Developed a blockchain-based decentralized framework for secure and automated spectrum trading in 6G networks using smart contracts and finite state automata for verification.',
            'Ensured privacy and trust through Zero-Knowledge Proofs and tokenization of spectrum assets as digital NFTs.',
            'Integrated machine learning to enhance real-time trade validation, reducing latency and improving transaction success rates compared to centralized systems.',
        ],
    },

    {
        title: ' AI-Augmented Real-Time Character Animation in AR/VR Using Consumer-Grade Motion Capture and Automata-Guided Workflow',
        organizer: '(ICETDA 2025), 3rd International Conference on Emerging Trends of Design & Arts',
        institution: 'Poornima University, Jaipur, Rajasthan',
        date: 'September, 2025',
        location: 'Online Presentation',
        paperLink: null,
        description: [
            'Created a deep learning and automata-driven system for real-time AR/VR character animation using affordable consumer-grade motion capture devices.',
            'Achieved high accuracy (up to 95%) and low latency (<50 ms) with superior garment alignment and robust performance across diverse applications.',
            'Awarded Best Paper at ICEIDA 2025 for scalable innovation in immersive animation.'
        ],
    },

    {
        title: 'A Bioinformatics-Inspired Machine Learning Framework for Financial Fraud Detection Using Sequence Alignment and Evolutionary Optimization',
        organizer: '(FINCON 2025), International Financial Security and Management Conference-2025',
        institution: 'National Forensic Sciences University, Gandhinagar, Gujarat',
        date: 'August, 2025',
        location: 'Online Presentation',
        paperLink: null,
        description: [
            'Proposed a bioinformatics-inspired framework using sequence alignment and motif discovery for advanced financial fraud detection.',
            'Applied genetic algorithms for real-time, adaptive model tuning to boost accuracy and handle severe class imbalance.',
            'Achieved 95%+ accuracy and F1-score, outperforming traditional ML methods with better interpretability and robustness.'
        ],
    },

    {
        title: 'Harnessing Machine Learning to Detect and Prevent Credit Card Fraud',
        organizer: 'IEEE Conferences- ARRIA 2024',
        institution: 'Manipal Institute of Technology, Manipal, Karnataka',
        date: 'December, 2024',
        location: 'Online Presentation',
        paperLink: 'https://ieeexplore.ieee.org/document/11051522',
        description: [
            'Identified and emphasized crucial anonymized features (V17, V14, and V10) for predicting fraudulent activities, significantly enhancing model performance.',
            'Highlighted the importance of feature selection and data preprocessing in improving fraud detection systems.',
            'Demonstrated the potential for implementing machine learning models to significantly reduce financial losses and increase security in financial transactions.',
        ],
    },
];
