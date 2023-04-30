import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/Mafia-Assistant/",
    optimizeDeps: {
        esbuildOptions: {
            target: "es2020",
        },
    },
    esbuild: {
        // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
        logOverride: {"this-is-undefined-in-esm": "silent"},
    },
    plugins: [
        react({
            babel: {
                plugins: ["babel-plugin-macros", "babel-plugin-styled-components"],
            },
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@components": path.resolve(__dirname, "src/components"),
            "@images": path.resolve(__dirname, "src/assets/images"),
        },
    },
});