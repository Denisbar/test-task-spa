import { defineConfig } from "vite";
import stringPlugin from "vite-plugin-string";

export default defineConfig({
    root: "./",
    server: {
        historyApiFallback: true
    },
    plugins: [
        stringPlugin({
            include: "**/*.html",
        })
    ],
    build: {
        outDir: "dist",
        emptyOutDir: true
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./tests/setup.js"
    }
});
