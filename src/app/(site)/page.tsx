import HomePage from "@/components/HomePage";
import { getCaseStudies, getIdeTabs } from "@/lib/sanity.fetch";

export default async function Home() {
  const [projects, ideTabs] = await Promise.all([getCaseStudies(), getIdeTabs()]);

  return <HomePage projects={projects} ideTabs={ideTabs} />;
}
