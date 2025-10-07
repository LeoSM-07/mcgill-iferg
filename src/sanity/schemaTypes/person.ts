import { defineField, defineType } from "sanity";

export const personType = defineType({
	name: 'person',
	title: 'Person',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'portrait',
			title: 'Portrait',
			type: 'image',
			options: {
				hotspot: true,
			},
			// validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: "status",
			title: "Member Status",
			type: "string",
			options: {
				list: [
					{ title: "Current Member", value: "present" },
					{ title: "Past Member", value: "past" },
				],
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'bio',
			title: 'Bio',
			type: 'array',
			of: [{
				type: "block",
				styles: [{ title: "Normal", value: "normal" }],
				lists: [],
			}],
		}),
		defineField({
			name: "links",
			title: "Links",
			type: "object",
			fields: [
				defineField({ name: "email", type: "email", }),
				defineField({ name: "linkedin", title: "LinkedIn", type: "url", }),
				defineField({ name: "gitHub", title: "GitHub", type: "url", }),
				defineField({ name: "twitter", type: "url", }),
			]
		})
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'bio',
			media: 'portrait'
		},
	}
});
