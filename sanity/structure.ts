import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio")
    .items([
      S.listItem()
        .title("Case studies")
        .schemaType("caseStudy")
        .child(S.documentTypeList("caseStudy").title("Case studies")),
      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categories")),
      S.divider(),
      S.listItem()
        .title("About tabs (IDE)")
        .schemaType("ideTab")
        .child(S.documentTypeList("ideTab").title("About tabs")),
    ]);
