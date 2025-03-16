import react from "@vitejs/plugin-react-swc";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv } from "vite";
import { addPreload } from "./preload-plugin";
import checker from "vite-plugin-checker";
import { createHtmlPlugin } from "vite-plugin-html";

export default ({ mode }: { mode: "local" | "development" | "production" }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  if (process.env.npm_lifecycle_event === "build" && !process.env.CI) {
    console.warn(
      "\nBuilding the frontend app without an API key. The frontend build will not run without an API key.\n",
    );
  }

  return defineConfig({
    base: process.env.VITE_BASE_NAME + "/",
    root: dirname(fileURLToPath(import.meta.url)),
    plugins: [
      react(),
      addPreload(),
      checker({
        eslint: {
          lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
        },
      }),
      createHtmlPlugin({
        inject: {
          data: {
            VITE_HOST: process.env.VITE_HOST,
          },
        },
      }),
    ],
    define: {
      "process.env.VITE_ENV": JSON.stringify(process.env.VITE_ENV),
      "process.env.VITE_BASE_URL": JSON.stringify(process.env.VITE_BASE_URL),
    },
    resolve: {
      preserveSymlinks: true,
      alias: [{ find: "@", replacement: join(__dirname, "/src") }],
    },
    server: {
      // host: process.env.VITE_DOCKER_HOST,
      proxy: {
        "/api": {
          target: process.env.VITE_PROXY_SERVER_URL, // Địa chỉ của máy chủ Server
          changeOrigin: true,
          secure: process.env.VITE_ENV === "local" ? false : true,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react"],
            "react-dom": ["react-dom"],
            "react-router-dom": ["react-router-dom"],
            "react-redux": ["react-redux"],
            vendor: ["@reduxjs/toolkit", "@tanstack/react-query"],
            // other chunks
          },
        },
      },
      outDir: "dist",
      minify: true,
      cssMinify: true,
      cssCodeSplit: true,
    },
  });
};
