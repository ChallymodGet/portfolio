import type { IdeTabContent } from "@/types/ide";

/** Fallback when Sanity is not configured or has no about tabs yet */
export function getDefaultIdeTabs(): IdeTabContent[] {
  return [
    {
      tabKey: "profile",
      fileName: "profile.ts",
      code: `export const Designer = {
  name: "Onofuevure Charles",
  role: "Senior Product Designer",
  email: "modgetdesigns@gmail.com",
  location: "Lagos, Nigeria (Remote)",
  education: "B.Tech Physics Electronics",
  experience: "5+ Years",
  specialization: [
    "End-to-End Product Design",
    "UX Strategy",
    "Design Systems",
    "Business Logic Transformation"
  ],
  mindset: "Analytical, Data-Driven, User-Centric",
};`,
      preview:
        "ONOFUEVURE CHARLES\nSenior Product Designer\nmodgetdesigns@gmail.com\nLagos, Nigeria | Remote\nB.Tech Physics Electronics\n5+ Years Experience\n\nExpertise: End-to-End Design, UX Strategy, Design Systems",
    },
    {
      tabKey: "stack",
      fileName: "stack.json",
      code: `{
  "design": ["Figma", "Adobe CC"],
  "dev": ["Next.js", "TS"],
  "motion": ["GSAP", "Framer"],
  "os": ["MacOS", "Linux"]
}`,
      preview: "Design: Figma, Adobe CC\nDev: Next.js, TS\nMotion: GSAP, Framer\nOS: MacOS, Linux",
    },
    {
      tabKey: "metrics",
      fileName: "metrics.md",
      code: `# Impact Metrics

- Engagement: +40%
- Adoption: +25%
- Efficiency: +30%
- UX: End-to-End`,
      preview:
        "CORE IMPACT:\n\nEngagement: 40% Increase ↑\nAdoption: 25% Growth ↑\nEfficiency: 30% Increase ↑\nUX: Optimized",
    },
  ];
}
