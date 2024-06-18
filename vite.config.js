import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (mode === 'prod') {
    return {
      base: '/cid101/g3/back/',
      build: {
        outDir: 'back'
      },
      plugins: [vue(), VueDevTools()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    }
  } else {
    return {
      // 放原本的設定
      plugins: [vue(), VueDevTools()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    }
  }
})

