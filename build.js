import esbuild from 'esbuild'
import fs from 'fs'

const common = {
  outdir: './dist',
  format: 'esm',
  platform: 'node',
  mainFields: ['module', 'main']
}

if (fs.existsSync('dist')) fs.rmSync('dist', {recursive: true})

await esbuild.build({
  outdir: './dist',
  format: 'esm',
  platform: 'node',
  entryPoints: ['./src/index.node.js'],
  target: 'node18',
  bundle: true,
  treeShaking: true
})

await esbuild.build({
  ...common,
  bundle: false,
  entryPoints: [
    './src/crypto.ts',
    './src/blob.ts',
    './src/fetch.ts',
    './src/index.ts',
    './src/streams.ts'
  ]
})
