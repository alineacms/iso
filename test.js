import {Blob, DecompressionStream} from '@alinea/iso'

async function decompressBlob(blob) {
  const ds = new DecompressionStream('gzip')
  const decompressedStream = blob.stream().pipeThrough(ds)
  return await new Response(decompressedStream).blob()
}

console.log(decompressBlob(new Blob([])))
