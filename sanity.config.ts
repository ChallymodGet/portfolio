import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { sanityDataset, sanityProjectId } from "./sanity/env";

const projectId = sanityProjectId ?? "placeholder";
const dataset = sanityDataset;

export default defineConfig({
  name: "portfolio",
  title: "Onofuevure Charles — Portfolio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
