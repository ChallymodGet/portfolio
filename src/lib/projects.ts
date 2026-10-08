import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "shkula",
    title: "Shkula",
    category: "EdTech",
    heroImage: "/projects/shkula-hero.png",
    wireframeImage: "/projects/shkula-wireframe.png",
    finalImage: "/projects/shkula-final.png",
    description: "An educational platform designed to scale learning. Focused on increasing user engagement and streamlining the student-teacher loop.",
    metrics: [
      { label: "Engagement Lift", value: "40%" },
      { label: "Active Users", value: "10k+" },
    ],
    challenges: [
      { problem: "High drop-off rate during onboarding.", solution: "Redesigned the KYC and profile setup into a gamified 3-step process." },
      { problem: "Complex course navigation.", solution: "Implemented a modular 'Learning Path' UI that allows students to track progress visually." },
    ],
    techStack: ["Figma", "Next.js", "TypeScript"],
  },
  {
    id: "nbioteck",
    title: "NBIOTEK",
    category: "HealthTech",
    heroImage: "/projects/nbioteck-hero.png",
    wireframeImage: "/projects/nbioteck-wireframe.png",
    finalImage: "/projects/nbioteck-final.png",
    description: "A complex healthcare ecosystem managing clinicians, patients, and admin roles with a focus on operational efficiency.",
    metrics: [
      { label: "Admin Efficiency", value: "30%" },
      { label: "Patient Onboarding", value: "2x Faster" },
    ],
    challenges: [
      { problem: "Multi-role permission complexity.", solution: "Built a role-based dashboard system that dynamically adjusts UI based on user privileges." },
      { problem: "Data heavy medical records.", solution: "Designed a 'Quick-View' summary panel to reduce cognitive load for clinicians." },
    ],
    techStack: ["Figma", "React", "Tailwind"],
  },
  {
    id: "lumely",
    title: "Lumely",
    category: "Enterprise",
    heroImage: "/projects/lumely-hero.png",
    wireframeImage: "/projects/lumely-wireframe.png",
    finalImage: "/projects/lumely-final.png",
    description: "A high-end enterprise solution focusing on streamlined workflows and professional aesthetics.",
    metrics: [
      { label: "Workflow Speed", value: "25%" },
      { label: "User Adoption", value: "85%" },
    ],
    challenges: [
      { problem: "Overwhelming feature set for new users.", solution: "Introduced an AI-guided 'Onboarding Tour' that teaches features contextually." },
      { problem: "Lack of visual hierarchy in data tables.", solution: "Implemented a 'Density Toggle' allowing users to switch between Compact and Comfortable views." },
    ],
    techStack: ["Figma", "Next.js", "Framer Motion"],
  },
  {
    id: "ransact",
    title: "Ransact",
    category: "FinTech",
    heroImage: "/projects/ransact-hero.png",
    wireframeImage: "/projects/ransact-wireframe.png",
    finalImage: "/projects/ransact-final.png",
    description: "A secure FinTech platform specializing in compliance and high-frequency transactions.",
    metrics: [
      { label: "KYC Completion", value: "50% Increase" },
      { label: "Transaction Speed", value: "Sub-second" },
    ],
    challenges: [
      { problem: "Friction in identity verification.", solution: "Integrated an OCR-based document uploader to automate data entry." },
      { problem: "Trust and security anxiety.", solution: "Used 'Security Indicators' and real-time status badges throughout the transaction flow." },
    ],
    techStack: ["Figma", "TypeScript", "WebSockets"],
  },
];
