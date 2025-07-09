/// <reference types="node" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mochaPlugins } from "@getmocha/vite-plugins";
import type { MochaEnv } from "@getmocha/vite-plugins";
import * as process from 'process';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [...mochaPlugins(process.env as unknown as MochaEnv), react()],
  server: {
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
});
