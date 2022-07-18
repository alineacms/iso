import {fetch, Blob, DecompressionStream, Response} from '@alinea/iso'

async function testCompression() {
  const compressed_blob = await fetch(
    'data:application/octet-stream;base64,H4sIAAAAAAAAE/NIzcnJVyjPL8pJAQBSntaLCwAAAA=='
  ).then(r => r.blob())
  const decompressor = new DecompressionStream('gzip')
  const decompression_stream = compressed_blob
    .stream()
    .pipeThrough(decompressor)
  const decompressed_blob = await new Response(decompression_stream).blob()
  console.log('decompressed:', await decompressed_blob.text())
}

async function testFetch() {
  console.log(await fetch('https://google.com/').then(res => res.text()))
}

console.log('Test')
testFetch().then(testCompression).catch(console.error)

console.log('Test')
