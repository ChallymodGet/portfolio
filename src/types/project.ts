export interface Project {
  id: string;
  title: string;
  category: "EdTech" | "HealthTech" | "FinTech" | "Enterprise";
  heroImage: string;
  wireframeImage: string;
  finalImage: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  challenges: {
    problem: string;
    solution: string;
  }[];
  techStack: string[];
}
