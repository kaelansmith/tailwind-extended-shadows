import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    // Plugin + Tailwind are CommonJS; keep Node environment
    environment: "node",
  },
});
