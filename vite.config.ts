<<<<<<< HEAD
/// <reference types="node" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mochaPlugins } from "@getmocha/vite-plugins";
import type { MochaEnv } from "@getmocha/vite-plugins";
import * as process from 'process';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [...mochaPlugins(process.env as unknown as MochaEnv), react()],
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mochaPlugins } from "@getmocha/vite-plugins";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [...mochaPlugins(process.env), react()],
>>>>>>> 5c6183950ce29474cbb104c3e18f9b1c4347f3e8
  server: {
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
});
