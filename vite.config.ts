import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
/// <reference types="vitest/config" />

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],

  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./src/testSetup.ts",
  },
});
