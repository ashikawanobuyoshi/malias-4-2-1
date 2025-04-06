// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  // その他の Nuxt 設定...
  vite: {
    // Vite の設定をここに記述します
    resolve: {
      alias: {
        '@': '/<project-root>/src'
      }
    },
    server: {
      port: 3000,
      open: true,
    },
    // ここに他の Vite 固有の設定を追加可能です
  },

  compatibilityDate: '2025-04-04',
})