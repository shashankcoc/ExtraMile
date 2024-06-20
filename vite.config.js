import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ensure Firebase aliases are correctly set
      "firebase/app": "firebase/app",
      "firebase/auth": "firebase/auth",
      "firebase/firestore": "firebase/firestore",
    },
  },
});
