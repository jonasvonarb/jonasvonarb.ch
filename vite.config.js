import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      /**
       * Data that needs to be injected into the index.html ejs template
       */
      inject: {
        data: {
          // NODE_ENV: process.env.NODE_ENV,
          // PAGE_TITLE: process.env.VITE_PAGE_TITLE,
          NODE_ENV: process.env.NODE_ENV,
          PAGE_TITLE: "Jonas von Arb",
          // PAGE_TITLE: '<%= PAGE_TITLE %>',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
