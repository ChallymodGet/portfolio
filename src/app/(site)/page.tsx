import { Suspense } from "react";
import HomePage from "@/components/HomePage";
import { getDefaultIdeTabs } from "@/lib/ideDefaults";
import { projects as fallbackProjects } from "@/lib/projects";
import { getCaseStudies, getIdeTabs } from "@/lib/sanity.fetch";

async function HomeContent() {
  const [projects, ideTabs] = await Promise.all([getCaseStudies(), getIdeTabs()]);
  return <HomePage projects={projects} ideTabs={ideTabs} />;
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <HomePage projects={fallbackProjects} ideTabs={getDefaultIdeTabs()} />
      }
    >
      <HomeContent />
    </Suspense>
  );
}
