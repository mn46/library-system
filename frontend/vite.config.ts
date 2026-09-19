import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { reactRouterDevTools } from "react-router-devtools";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouterDevTools(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
