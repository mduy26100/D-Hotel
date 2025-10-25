import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig(({ command, mode }) => {
  const isDev = command === "serve";

  return {
    plugins: [react()],
    server: isDev
      ? {
          https: {
            key: fs.readFileSync("./localhost-key.pem"),
            cert: fs.readFileSync("./localhost.pem"),
          },
          host: "localhost",
          port: 5173,
        }
      : undefined,
  };
});
