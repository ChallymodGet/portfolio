export const caseStudiesQuery = `*[_type == "caseStudy"] | order(order asc, title asc) {
  "id": slug.current,
  title,
  "category": coalesce(categoryRef->title, category),
  heroImage,
  wireframeImage,
  finalImage,
  description,
  metrics,
  challenges,
  techStack,
  behanceEmbedUrl
}`;

export const ideTabsQuery = `*[_type == "ideTab"] | order(order asc) {
  tabKey,
  fileName,
  code,
  preview
}`;
