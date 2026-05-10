import { reactRouter } from "@react-router/dev/vite";
import { intlayer } from "vite-intlayer";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

const analyze = process.env.ANALYZE === "true";

export default defineConfig({
  plugins: [
    intlayer(),
    tailwindcss(),
    reactRouter(),
    analyze && visualizer({ filename: "dist/stats.html", gzipSize: true, open: true }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
