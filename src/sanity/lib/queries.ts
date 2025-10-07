import { sanityClient } from "sanity:client";
import { defineQuery } from "groq";
import * as Query from "../sanity.types";
import { getCachedQuery } from "./cached-query";

export async function getAllPeople(): Promise<Query.AllPeopleQueryResult> {
	const allPeopleQuery = defineQuery(
		`
{
  "higgins": *[
    _type == "person" && name == "Andrew Higgins"
  ][0],

  "current": *[
    _type == "person" &&
    status == "present" &&
    name != "Andrew Higgins"
  ] | order(string::split(name, " ")[-1] asc),

  "past": *[
    _type == "person" &&
    status == "past" &&
    name != "Andrew Higgins"
  ] | order(string::split(name, " ")[-1] asc)
}
		`,
	);
	return getCachedQuery("allPeople", () => sanityClient.fetch(allPeopleQuery));
}


export async function getAllPapers(): Promise<Query.AllPapersQueryResult> {
	const allPapersQuery = defineQuery(`
{
  "conference": *[
    _type == "publication" && type == "conference"
  ] | order(publishDate desc) {
    title,
    type,
    publishDate,
    citation,
    "pdfUrl": pdfFile.asset->url
  },

  "journal": *[
    _type == "publication" && type == "journal"
  ] | order(publishDate desc) {
    title,
    type,
    publishDate,
    citation,
    "pdfUrl": pdfFile.asset->url
  }
}
  `);

	return getCachedQuery("allPapers", () => sanityClient.fetch(allPapersQuery));
}


export async function getFaqSections(): Promise<Query.AllFaqSectionsQueryResult> {
	const allFaqSectionsQuery = defineQuery(
		`*[_type == "faqSection"] | order(part asc)`
	);

	return getCachedQuery("allFaqSections", () =>
		sanityClient.fetch(allFaqSectionsQuery)
	);
}
