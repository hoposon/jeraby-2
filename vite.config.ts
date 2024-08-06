import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [vue(), eslintPlugin({ cache: false })],
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve('src'),
      },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // generate localizations files to separare dir
          let packageName = ''
          if (id.includes('localizations/loc')) {
            const matcher = new RegExp(`localizations/loc/.*`)
            const match = id.match(matcher)
            if (match && match[0]) {
              const splitted = match[0].split('/')
              if (splitted.length === 4) {
                packageName = 'loc/'+splitted[2]+'/loc'
                return packageName
              } 
            }            
          }
        },
      }
    }
  },
  server: {
    host: true
  }
})
