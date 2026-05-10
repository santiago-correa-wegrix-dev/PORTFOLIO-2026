import { reactRouter } from "@react-router/dev/vite";
import { intlayer } from "vite-intlayer";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import netlifyReactRouter from "@netlify/vite-plugin-react-router";
import netlify from "@netlify/vite-plugin";

export default defineConfig({
  plugins: [
    intlayer(),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    netlifyReactRouter(),
    netlify(),
  ],
});
