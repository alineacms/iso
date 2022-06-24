import {AliasPlugin} from '@esbx/alias'
import esbuild from 'esbuild'
import path from 'path'
import fs from 'fs'

const common = {
  outdir: './dist',
  format: 'esm',
  platform: 'node',
  mainFields: ['module', 'main']
}

if (fs.existsSync('dist')) fs.rmSync('dist', {recursive: true})

await esbuild.build({
  ...common,
  entryPoints: [
    './src/crypto.node.js',
    './src/buffer.node.js',
    './src/fetch.node.js',
    './src/streams.node.js'
  ],
  bundle: true,
  splitting: true,
  minify: true,
  treeShaking: true,
  plugins: [
    AliasPlugin.configure({
      'stream/web': path.resolve('./src/streams.node.js'),
      tslib: path.resolve('./node_modules/tslib/tslib.es6.js'),
      'web-streams-polyfill': path.resolve(
        './node_modules/web-streams-polyfill/dist/ponyfill.es2018.mjs'
      ),
      buffer: path.resolve('./src/buffer.node.js')
    })
  ],
  banner: {
    js: 'import {createRequire} from "module";const require = createRequire(import.meta.url);'
  }
})

await esbuild.build({
  ...common,
  bundle: false,
  entryPoints: [
    './src/crypto.ts',
    './src/fetch.ts',
    './src/index.ts',
    './src/streams.ts',
    './src/index.node.js'
  ]
})
