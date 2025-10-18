import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/

const debug = false;
export default defineConfig({
  plugins: [react()],
  ...(debug
    ? {
        server: {
          host: "0.0.0.0",
          port: 5173,
        },
      }
    : {}),
});
