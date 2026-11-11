import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // './' makes the built site work from any sub-path, so it runs on
  // https://<user>.github.io/<repo>/ without knowing the repository name.
  // (The app uses hash routing, so no server-side route handling is needed.)
  base: './',
  server: { port: 5173, open: true },
})
