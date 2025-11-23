// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { resolve } from "path";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  srcDir: "./src/",
  modules: ["@nuxt/ui", "@pinia/nuxt"],

  dir: {
    middleware: "app/middleware/",
    public: "app/public/",
    plugins: "app/plugins/",
    layouts: "app/layouts/",
  },
  vite: { plugins: [tailwindcss()] },
  css: ["@app/styles/main.css"],
  ui: {
    colorMode: false,
    theme: {
      colors: [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "gray",
      ],
    },
  },
  alias: {
    "@app": resolve(rootDir, "src/app"),
    "@pages": resolve(rootDir, "src/pages"),
    "@widgets": resolve(rootDir, "src/widgets"),
    "@features": resolve(rootDir, "src/features"),
    "@entities": resolve(rootDir, "src/entities"),
    "@shared": resolve(rootDir, "src/shared"),
  },
});
