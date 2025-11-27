// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { resolve } from "path";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  srcDir: "./src/",
  modules: ["@nuxt/ui", "@pinia/nuxt"],

  dir: {
    middleware: "app/middleware/",
    public: "app/public/",
    plugins: "app/plugins/",
    layouts: "app/layouts/",
    assets: "app/assets/",
  },

  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap",
        },
      ],
    },
  },
  nitro: {
    replace: {
      "import * as process": "import * as processUnused",
    },
  },
  vite: { plugins: [tailwindcss()] },
  css: ["@app/assets/styles/main.css"],
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
    "@public": resolve(rootDir, "src/app/public"),
  },
});
