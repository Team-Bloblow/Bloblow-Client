import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/keyword": "http://localhost:3000",
    },
  },
  plugins: [react()],
});
