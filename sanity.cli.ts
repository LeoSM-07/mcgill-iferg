import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "umezahk3",
    dataset: "prod",
  },
  project: {
    basePath: "/admin",
  },
  deployment: {
    appId: "w2oo3ju16sgxhvi19ie3wynj",
  },
});
