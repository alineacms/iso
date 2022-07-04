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
    './src/fetch.node.js',
    './src/streams.node.js',
    './src/blob.node.js'
  ],
  target: 'node14.13',
  bundle: true,
  keepNames: true,
  splitting: true,
  treeShaking: true,
  inject: ['./inject.node.js'],
  plugins: [
    AliasPlugin.configure({
      'stream/web': path.resolve('./src/streams.node.js'),
      tslib: path.resolve('./node_modules/tslib/tslib.es6.js'),
      'web-streams-polyfill': path.resolve(
        './node_modules/web-streams-polyfill/dist/ponyfill.es2018.mjs'
      ),
      buffer: path.resolve('./src/blob.node.js')
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
    './src/blob.ts',
    './src/fetch.ts',
    './src/index.ts',
    './src/streams.ts',
    './src/index.node.js'
  ]
})
