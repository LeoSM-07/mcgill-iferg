// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://interstellar.leomindlin.com",
  trailingSlash: "ignore",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD
        ? {
            "react-dom/server": "react-dom/server.edge",
          }
        : undefined,
    },
  },

  integrations: [
    sanity({
      projectId: "umezahk3",
      dataset: "prod",
      useCdn: false,
      // studioBasePath: "/admin",
    }),
    react(),
  ],
});
