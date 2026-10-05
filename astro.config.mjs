import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "https://www.mytam-mayosmith.com",
  server: {
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
    assetsInclude: ["**/*.mov"],
  }
});