import {test} from 'uvu'
import * as assert from 'uvu/assert'
import {fetch, DecompressionStream, CompressionStream, Response} from '@alinea/iso'

test('decompression stream', async () => {
  const compressed = await fetch(
    'data:application/octet-stream;base64,H4sIAAAAAAAAE/NIzcnJVyjPL8pJAQBSntaLCwAAAA=='
  ).then(r => r.blob())
  const decompressor = new DecompressionStream('gzip')
  const decompressionStream = compressed.stream().pipeThrough(decompressor)
  const decompressed = await new Response(decompressionStream).blob()
  assert.is(await decompressed.text(), 'Hello world')
  assert.is(decompressed.size, 11)
  assert.is(decompressed.toString(), '[object Blob]')
  assert.is(decompressed[Symbol.toStringTag], 'Blob')
})

test.run()
