import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "strug-city",
  title: "Strug City",
  projectId,
  dataset,
  plugins: [structureTool(), codeInput()],
  schema: {
    types: schemaTypes,
  },
});
