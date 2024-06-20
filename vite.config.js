import { defineConfig } from "vite";
// import { VitePWA } from "vite-plugin-pwa";
// import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
