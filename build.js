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
  outdir: './dist',
  format: 'cjs',
  platform: 'node',
  entryPoints: ['./src/index.node.js'],
  outExtension: {'.js': '.cjs'},
  target: 'node14.13',
  bundle: true,
  treeShaking: true,
  inject: ['./inject.node.js'],
  plugins: [
    AliasPlugin.configure({
      'stream/web': path.resolve('./src/streams.node.js'),
      tslib: path.resolve('./node_modules/tslib/tslib.js'),
      'web-streams-polyfill': path.resolve(
        './node_modules/web-streams-polyfill/dist/ponyfill.es2018.js'
      ),
      buffer: path.resolve('./src/blob.node.js'),
      'abort-controller': path.resolve(
        './node_modules/abort-controller/dist/abort-controller.js'
      ),
      'event-target-shim': path.resolve(
        './node_modules/event-target-shim/dist/event-target-shim.js'
      ),
      'util/types': path.resolve('./src/impl/util-types.node.js')
    })
  ]
  /*banner: {
    js: 'import {createRequire} from "module";\nconst require = createRequire(import.meta.url);'
  }*/
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
