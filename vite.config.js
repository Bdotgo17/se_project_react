import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/items": {
        target: "http://localhost:3002",
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq) => {
            console.log("Proxying request to:", proxyReq.path);
          });
          proxy.on("error", (err, req, res) => {
            console.error("Proxy error:", err);
          });
        },
      },
    },
  },
});
