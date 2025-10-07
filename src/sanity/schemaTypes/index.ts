import type { SchemaTypeDefinition } from "sanity";
import { personType } from "./person";
import { publicationType } from "./publication";
import { faqSectionType, questionType } from "./faq";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		personType,
		publicationType,
		faqSectionType,
		questionType,
	],
};
