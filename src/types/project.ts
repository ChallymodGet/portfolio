export interface Project {
  id: string;
  title: string;
  category: "EdTech" | "HealthTech" | "FinTech" | "Enterprise" | "Delivery";
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
  /** Behance embed iframe src; opens in-site modal when set */
  behanceEmbedUrl?: string;
}
