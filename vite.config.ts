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
            console.log('🚀 ~ file: vite.config.ts:25 ~ id:', id)
            const matcher = new RegExp(`localizations/loc/.*`)
            const match = id.match(matcher)
            console.log('🚀 ~ file: vite.config.ts:28 ~ match:', match)
            if (match && match[0]) {
              // packageName = match[0].slice(match[0].indexOf('/')+1,-1)+'/'+
              const splitted = match[0].split('/')
              if (splitted.length === 4) {
                packageName = 'loc/'+splitted[2]+'/loc'
                return packageName
              } 
            }            
          }
          // // generate localizations files to separare dir
          // let packageName = ''
          // if (id.includes('common/localizations')) {
          //   const match = id.match(/common\/localizations\/.*/)            
          //   if (match && match[0]) {
          //     // packageName = match[0].slice(match[0].indexOf('/')+1,-1)+'/'+
          //     const splitted = match[0].split('/')
          //     if (splitted.length === 5) {
          //       packageName = 'localizations/'+splitted[2]+'/'+splitted[3]+'/'+splitted[2]
          //       return packageName
          //     }
          //   }            
          // }
        },
      }
    }
  },
  server: {
    host: true
  }
})
