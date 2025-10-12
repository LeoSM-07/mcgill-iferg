// src/content/config.ts
import { defineCollection } from "astro:content";
import { authorFeedLoader } from "@ascorbic/bluesky-loader";

const posts = defineCollection({
  loader: authorFeedLoader({
    identifier: "mcgill-adastra.bsky.social",
  }),
});

export const collections = { posts };
