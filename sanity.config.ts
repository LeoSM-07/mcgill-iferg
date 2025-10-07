import { defineConfig } from "sanity";
import { schema } from "./src/sanity/schemaTypes";
import { structureTool } from "sanity/structure";
import { latexInput } from "sanity-plugin-latex-input";

export default defineConfig({
	name: "iferg",
	title: "McGill IFERG Website",
	projectId: "umezahk3",
	dataset: "prod",
	apiVersion: "2025-01-28",
	plugins: [
		structureTool(),
		latexInput()
	],
	schema
})
