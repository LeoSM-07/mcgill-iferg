import { defineField, defineType } from "sanity";

const mathInlineIcon = () => (
	<span>
		<span style={{ fontWeight: "bold" }}>∑</span>ₐ
	</span>
);

const mathIcon = () => <span style={{ fontWeight: "bold" }}>∑</span>;

export const questionType = defineType({
	name: "question",
	title: "Question",
	type: "object",
	fields: [
		defineField({
			name: "question",
			type: "string",
			title: "Question",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "answer",
			type: "array",
			title: "Answer",
			validation: (Rule) => Rule.required(),
			of: [
				{
					type: "block",
					title: "Text Block",
					styles: [{ title: "Normal", value: "normal" }],
					lists: [],
					of: [
						{
							name: "inlineMath",
							type: "latex",
							title: "Inline Math",
							icon: mathInlineIcon,
						},
					],
				},
				{
					name: "mathBlock",
					type: "latex",
					title: "Math Block",
					icon: mathIcon,
				},
			],
		}),
	],
});

export const faqSectionType = defineType({
	name: "faqSection",
	title: "FAQ Section",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "part",
			title: "Part",
			type: "number",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "questions",
			title: "Questions",
			type: "array",
			of: [{ type: "question" }],
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: { title: "title", part: "part" },
		prepare({ title, part }) {
			return {
				title: title,
				subtitle: `Section ${part}`
			}
		},
	}
});
