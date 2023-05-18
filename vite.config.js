import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import veauryVitePlugins from "veaury/vite/index.js";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    veauryVitePlugins({
      type: "vue",
      // Configuration of @vitejs/plugin-vue
      // vueOptions: {...},
      // Configuration of @vitejs/plugin-react
      // reactOptions: {...},
      // Configuration of @vitejs/plugin-vue-jsx
      // vueJsxOptions: {...}
    }),
    // vue(),
    createHtmlPlugin({
      minify: true,
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
