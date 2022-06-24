import {AliasPlugin} from '@esbx/alias'
import esbuild from 'esbuild'
import path from 'path'

const common = {
  outdir: './dist',
  format: 'esm',
  platform: 'node',
  mainFields: ['module', 'main']
}

await esbuild.build({
  ...common,
  entryPoints: [
    './src/crypto.node.js',
    './src/fetch.node.js',
    './src/streams.node.js'
  ],
  bundle: true,
  plugins: [
    AliasPlugin.configure({
      '@remix-run/web-stream': path.resolve('./src/streams.node.js'),
      tslib: path.resolve('./node_modules/tslib/tslib.es6.js'),
      'web-streams-polyfill/ponyfill': path.resolve(
        './web-streams-polyfill/dist/ponyfill.es2018.mjs'
      ),
      '@remix-run/web-blob': path.resolve(
        './node_modules/@remix-run/web-blob/src/blob.js'
      )
    })
  ],
  inject: ['./inject.node.js']
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
