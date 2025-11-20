import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });
export default defineConfig({
  env: {},
  e2e: {
    video: process.env.CYPRESS_VIDEO === "true" || false,
    baseUrl: process.env.BASE_URL,
    supportFile: "cypress/support/e2e.ts",
    viewportWidth: Number(process.env.VIEWPORT_WIDTH) || 1280,
    viewportHeight: Number(process.env.VIEWPORT_HEIGHT) || 800,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
