// /schemas/publication.ts
import { defineType, defineField } from 'sanity'


export const publicationType = defineType({
	name: 'publication',
	title: 'Publication',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'type',
			title: 'Type',
			type: 'string',
			options: {
				list: [
					{ title: "Journal Article", value: "journal" },
					{ title: "Conference Paper", value: "conference" }
				]
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: "publishDate",
			title: "Publcation Date",
			type: "date",
			options: {
				dateFormat: "MMM YYYY"
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'citation',
			title: 'Citation',
			type: 'array',
			of: [{
				type: "block",
				styles: [{ title: "Normal", value: "normal" }],
				lists: [],
			}]
		}),
		defineField({
			name: 'pdfFile',
			title: 'PDF Upload',
			type: 'file',
			validation: (Rule) => Rule.required()
		}),
	],
	preview: {
		select: {
			title: "title",
			date: "publishDate",
			type: "type",
		},
		prepare(selection) {
			const { title, date, type } = selection
			return {
				title: title,
				subtitle: `${new Date(`${date}T00:00:00Z`).toLocaleString("en-US", {
					month: "short",
					year: "numeric",
					timeZone: "UTC"
				})} • ${type === "conference" ? "Conference Paper" : "Journal Article"} `
			}
		}
	}
})
