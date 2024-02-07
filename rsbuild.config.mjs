import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      // http://localhost:8080/api -> http://localhost:3000
      // http://localhost:8080/api/foo -> http://localhost:3000/foo
      "/api": {
        target: "https://api.schiphol.nl/public-flights",
        pathRewrite: { "^/api": "" },
      },
    },
  },
  plugins: [pluginReact()],
  html: {
    template: "./public/index.html",
  },
});
