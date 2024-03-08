// vite.config.js
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const fs = require('fs')
const path = require('path')

const workersFolder = './src/web-workers'
const entries = fs.readdirSync(workersFolder).reduce((acc, file) => {
  const withoutExt = path.basename(file, path.extname(file))
  acc[withoutExt] = path.resolve(workersFolder, file)
  return acc
}, {})
console.log(entries)

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    // Specify the entry file for your web worker
    rollupOptions: {
      input: entries,
      output: {
        entryFileNames: `[name].js`, // Removes hash from JS files
        chunkFileNames: `[name].js`, // Removes hash from chunk files
        assetFileNames: `[name].[ext]`, // Removes hash from asset files like CSS
      },
    },
    // Define output settings (optional)
    outDir: './public', // The directory to output the built file
  },
  publicDir: './web', // The directory to find the entry file in
  // Additional configurations for Vite
})
