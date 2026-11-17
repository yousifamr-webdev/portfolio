export type ProjectCategory = "Full-Stack" | "Frontend" | "Backend" | "Databases" | "Dev Tools/Cloud";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  impact: string;
  stack: string[];
  image: string;
  imageLabel: string;
  gallery?: string[];
  liveUrl?: string;
  githubUrl: string;
  technicalScore: number;
  visualScore: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  achievements: string[];
}

export interface SkillCategory {
  name: "Frontend" | "Backend" | "Databases" | "Dev Tools/Cloud";
  description: string;
  skills: string[];
}

export interface PortfolioData {
  identity: {
    name: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    facebook: string;
    instagram: string;
  };
  recruiter: {
    title: string;
    stack: string[];
    metrics: string[];
  };
  showcase: {
    title: string;
    description: string;
    trustHighlights: string[];
    featuredProject: {
      label: string;
      name: string;
      description: string;
    };
  };
  projects: Project[];
  experience: Experience[];
  skillCategories: SkillCategory[];
}

export const portfolioData: PortfolioData = {
  identity: {
    name: "Yousif Amr",
    email: "yousifamr811@gmail.com",
    phone: "+20 109 400 5690",
    github: "https://github.com/yousifamr-webdev",
    linkedin: "https://www.linkedin.com/in/yousif-amr/",
    facebook: "https://web.facebook.com/yousif.amr.fb",
    instagram: "https://www.instagram.com/yousifamr_/",
  },
  recruiter: {
    title: "Full-Stack Software Engineer",
    stack: [
      "NestJS",
      "Node.js",
      "Express.js",
      "TypeScript",
      "React",
      "Next.js",
      "MongoDB",
      "SQL (MySQL)",
      "Docker",
    ],
    metrics: [
      "68 RESTful API Endpoints (FreshCart)",
      "11 NoSQL Relational Models (Mongoose)",
      "Sub-100ms Modular API Latencies",
      "Real-Time Bidirectional WebSockets (SocialApp)",
    ],
  },
  showcase: {
    title: "Architecting Scalable Backend Systems & High-Performance Web Apps.",
    description:
      "Full-stack software engineer building modular NestJS/Node architectures, real-time WebSocket communication, and responsive production interfaces.",
    trustHighlights: [
      "Everything handled, from idea to launch",
      "Secure logins and customer data protection",
      "Fast and reliable even as you grow",
    ],
    featuredProject: {
      label: "Featured Build (Concept Project)",
      name: "FreshCart (Concept Project)",
      description:
        "Online Marketplace: Customers browse, order and pay online.",
    },
  },
  projects: [
    {
      id: "ecommerce-nestjs",
      title: "E-Commerce Platform",
      category: "Full-Stack",
      impact:
        "A full-stack storefront pairing a NestJS commerce API (68 REST endpoints, JWT auth, S3 image uploads, 11 Mongoose schemas spanning products, carts, orders, and coupons) with a Next.js 15 frontend handling checkout, wishlists, and order history.",
      stack: [
        "Next.js",
        "NestJS",
        "TypeScript",
        "MongoDB",
        "Mongoose",
        "Zod",
        "NextAuth",
        "AWS S3",
      ],
      image: "/projects/e-commerce/landing-page.webp",
      imageLabel: "E-Commerce storefront and checkout preview",
      gallery: [
        "/projects/e-commerce/landing-page.webp",
        "/projects/e-commerce/products-page.webp",
        "/projects/e-commerce/orders-page.webp",
      ],
      liveUrl: "https://e-commerce-green-ten-54.vercel.app",
      githubUrl: "https://github.com/yousifamr-webdev/E-Commerce-NestJS-",
      technicalScore: 10,
      visualScore: 0,
    },
    {
      id: "social-app",
      title: "Social App",
      category: "Backend",
      impact:
        "A full-stack social network with 29 REST endpoints plus a GraphQL layer for post reactions, real-time chat over Socket.io, Firebase push notifications, and S3-backed media uploads, paired with a React 19 frontend built on TanStack Query.",
      stack: [
        "React",
        "Vite",
        "TypeScript",
        "Express",
        "MongoDB",
        "Socket.io",
        "GraphQL",
        "TanStack Query",
        "Redis",
      ],
      image: "",
      imageLabel: "Social App feed and post details preview",
      githubUrl: "https://github.com/yousifamr-webdev/Social_App_BE",
      technicalScore: 9,
      visualScore: 0,
    },
    {
      id: "sara7a-app",
      title: "Sara7a App",
      category: "Backend",
      impact:
        "An anonymous messaging API (Sarahah-style) with 24 RESTful endpoints, Google OAuth + two-step OTP verification, JWT access/refresh tokens, and Redis-backed session/rate control.",
      stack: [
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
        "Redis",
        "JWT",
        "Joi",
      ],
      image: "",
      imageLabel: "Sara7a App auth and messaging flow preview",
      githubUrl: "https://github.com/yousifamr-webdev/Sara7a-App",
      technicalScore: 7.5,
      visualScore: 0,
    },
    {
      id: "forthmark-laravel",
      title: "Forthmark",
      category: "Full-Stack",
      impact:
        "A Laravel 13 idea-tracking app where each user manages private ideas with a three-state status, a toggleable step checklist, reference links, Markdown descriptions, and an S3-compatible image upload (14 routes, 3 Eloquent models, 5 migrations). Server-rendered Blade with Alpine.js modals and Tailwind CSS 4, with policy-based ownership checks and Pest browser tests.",
      stack: [
        "Laravel",
        "PHP",
        "Blade",
        "Alpine.js",
        "Tailwind CSS",
        "Vite",
        "Pest",
        "AWS S3",
      ],
      image: "/projects/forthmark/logo.avif",
      imageLabel: "Forthmark idea dashboard and idea detail preview",
      gallery: [
        "/projects/forthmark/landing-page.avif",
        "/projects/forthmark/show-projects.avif",
        "/projects/forthmark/create-idea.avif",
        "/projects/forthmark/show-idea.avif",
        "/projects/forthmark/idea-in-progress.avif",
        "/projects/forthmark/form.avif",
      ],
      liveUrl: "https://forthmark.wasmer.app",
      githubUrl: "https://github.com/yousifamr-webdev/forthmark",
      technicalScore: 7,
      visualScore: 0,
    },
  ],
  experience: [
    {
      id: "route-training",
      role: "Full-Stack Software Engineering Trainee",
      company: "Route IT-Training Center",
      period: "March 2025 — July 2026",
      summary:
        "Owned end-to-end full-stack development, delivering modular backend APIs, responsive user interfaces, and strong authentication layers.",
      achievements: [
        "Developed modular RESTful APIs with Node.js, Express.js, and NestJS, integrating both relational SQL and NoSQL MongoDB databases.",
        "Architected relational schemas with Mongoose and Sequelize, enforcing schema validation and automated population.",
        "Implemented JWT authentication, role-based authorization, and Zod/Joi payload validation to secure sensitive API endpoints.",
        "Maintained code reliability and branch collaboration using Git, modular architecture, and structured centralized error handling.",
      ],
    },
    {
      id: "engineering-foundation",
      role: "Civil Engineering & Software Transition",
      company: "University of Alexandria",
      period: "Graduated July 2026",
      summary:
        "Earned a Bachelor of Science Degree in Civil Engineering while mastering computer science fundamentals and web technologies.",
      achievements: [
        "Applied civil engineering analytical mindset, structural problem-solving, and mathematics to master software engineering systems and algorithms.",
        "Built persistent browser utilities and responsive React applications using Vite and modern ES6+ paradigms.",
        "Completed intensive full-stack certification focusing on scalable web architectures and containerized microservices.",
      ],
    },
  ],
  skillCategories: [
    {
      name: "Frontend",
      description: "Interfaces built with intent, speed, and responsiveness.",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript (ES6+)",
        "Tailwind CSS",
        "Bootstrap 5",
        "HTML5 / CSS3",
      ],
    },
    {
      name: "Backend",
      description: "Modular services, scalable APIs, and event-driven sockets.",
      skills: [
        "NestJS",
        "Node.js",
        "Express.js",
        "RESTful APIs",
        "Socket.io",
        "JWT Authentication",
        "Role-Based Authorization",
      ],
    },
    {
      name: "Databases",
      description: "Structured relational models and flexible document stores.",
      skills: ["MongoDB", "Mongoose", "SQL (MySQL)", "Sequelize"],
    },
    {
      name: "Dev Tools/Cloud",
      description:
        "Containerization, validation, testing, and version control.",
      skills: [
        "Docker",
        "Redis",
        "Git & GitHub",
        "Postman",
        "npm",
        "Zod & Joi Validation",
      ],
    },
  ],
};
