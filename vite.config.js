import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [
    VitePWA({
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(new URL(".", import.meta.url).pathname, "src"),
    },
    // Ensure Firebase modules are treated as external dependencies
    build: {
      rollupOptions: {
        external: /^firebase/,
      },
    },
  },
});
