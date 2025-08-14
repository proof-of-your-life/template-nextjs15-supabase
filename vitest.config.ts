import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    css: true,
    // 単体テストのみ拾う
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    // e2e や成果物は除外
    exclude: [
      "e2e/**",
      "playwright/**",
      "node_modules/**",
      "dist/**",
      "coverage/**",
      "tests-examples/**",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        ".next/**",
        "public/**",
        "coverage/**",

        // テスト関連
        "src/test/**",
        "src/**/*.test.{ts,tsx}",
        "src/**/*.spec.{ts,tsx}",
        "src/**/__tests__/**",
        "src/**/__mocks__/**",
        "src/**/*.stories.{ts,tsx}",
        "e2e/**",
        "tests-examples/**",

        // 型・設定・生成系
        "src/types/**",
        "**/*.d.ts",
        "**/*.config.*",
        "vitest.config.ts",
        "next.config.ts",
        "postcss.config.*",
        "tailwind.config.*",
        "eslint.config.*",
        "tsconfig.*.json",
        "vite.config.ts",
        "vitest.config.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
