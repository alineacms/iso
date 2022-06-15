import esbuild from 'esbuild'

const requireBanner = `import {createRequire} from "node:module"
const require = createRequire(import.meta.url)`

const common = {
  outdir: './dist',
  format: 'esm',
  platform: 'node',
  mainFields: ['module', 'main']
}

await esbuild.build({
  ...common,
  entryPoints: ['./src/crypto.node.js', './src/fetch.node.js'],
  bundle: true,
  banner: {
    js: requireBanner
  }
})

await esbuild.build({
  ...common,
  bundle: false,
  entryPoints: [
    './src/crypto.ts',
    './src/fetch.ts',
    './src/index.ts',
    './src/index.node.js'
  ]
})
