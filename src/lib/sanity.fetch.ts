import { projects as fallbackProjects } from "@/lib/projects";
import { sanityClient } from "@/lib/sanity.client";
import { caseStudiesQuery, ideTabsQuery } from "@/lib/sanity.queries";
import type { IdeTabContent, IdeTabKey } from "@/types/ide";
import type { Project } from "@/types/project";
import { getDefaultIdeTabs } from "@/lib/ideDefaults";

type SanityCaseStudy = Omit<Project, "id" | "wireframeImage" | "finalImage"> & {
  id: string;
  wireframeImage?: string;
  finalImage?: string;
};

type SanityIdeTab = {
  tabKey: string;
  fileName: string;
  code: string;
  preview: string;
};

const validCategories = new Set<Project["category"]>([
  "EdTech",
  "HealthTech",
  "FinTech",
  "Enterprise",
]);

function mapCaseStudy(doc: SanityCaseStudy): Project | null {
  if (!doc?.id || !doc.title || !validCategories.has(doc.category as Project["category"])) {
    return null;
  }

  return {
    id: doc.id,
    title: doc.title,
    category: doc.category as Project["category"],
    heroImage: doc.heroImage || "/projects/placeholder.png",
    wireframeImage: doc.wireframeImage || doc.heroImage,
    finalImage: doc.finalImage || doc.heroImage,
    description: doc.description,
    metrics: doc.metrics ?? [],
    challenges: doc.challenges ?? [],
    techStack: doc.techStack ?? [],
    behanceEmbedUrl: doc.behanceEmbedUrl,
  };
}

function mapIdeTab(doc: SanityIdeTab): IdeTabContent | null {
  const keys: IdeTabKey[] = ["profile", "stack", "metrics"];
  if (!keys.includes(doc.tabKey as IdeTabKey)) return null;

  return {
    tabKey: doc.tabKey as IdeTabKey,
    fileName: doc.fileName,
    code: doc.code,
    preview: doc.preview,
  };
}

export async function getCaseStudies(): Promise<Project[]> {
  if (!sanityClient) return fallbackProjects;

  try {
    const docs = await sanityClient.fetch<SanityCaseStudy[]>(caseStudiesQuery);
    if (!docs?.length) return fallbackProjects;

    const mapped = docs.map(mapCaseStudy).filter((p): p is Project => p !== null);
    return mapped.length ? mapped : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getIdeTabs(): Promise<IdeTabContent[]> {
  const fallback = getDefaultIdeTabs();
  if (!sanityClient) return fallback;

  try {
    const docs = await sanityClient.fetch<SanityIdeTab[]>(ideTabsQuery);
    if (!docs?.length) return fallback;

    const mapped = docs.map(mapIdeTab).filter((t): t is IdeTabContent => t !== null);
    return mapped.length ? mapped : fallback;
  } catch {
    return fallback;
  }
}
