import { defineConfig } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import monicon from "@monicon/vite";
import tailwindcss from "tailwindcss";
import Icons from "./src/utils/json/icons.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "kt_frontend_labs",
      project: "typescript-react",
    }),
    monicon({
      icons: Icons,
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    sourcemap: true,
  },
  test: {
    environment: "jsdom",
    exclude: ["**/playwright_tests/**", "**/node_modules/**"],
  },
});
