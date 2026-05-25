import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // 프로젝트 최상위 루트(..)와 그 하위 폴더들의 파일 접근을 허용
      allow: ["."],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
