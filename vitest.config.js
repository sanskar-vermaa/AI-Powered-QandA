import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
    globals: true,
    include: ["**/__tests__/**/*.test.{js,jsx}", "tests/**/*.test.{js,jsx}"],
    exclude: ["node_modules/**", ".next/**"],
    setupFiles: ["./tests/setup.js"],
    coverage: {
      provider: "v8",
      include: ["lib/**", "app/actions.js"],
      exclude: ["lib/__tests__/**", "lib/session.js"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      // The real package throws outside a React Server Component build.
      "server-only": path.resolve(__dirname, "tests/stubs/server-only.js"),
    },
  },
});
