import type {Transform} from 'node:stream'
import type {Zlib} from 'node:zlib'
import {createDeflate, createGunzip, createGzip, createInflate} from 'node:zlib'
// @ts-ignore
import {TransformStream} from 'web-streams-polyfill'

function transform(transformer: Transform & Zlib) {
  return new TransformStream({
    transform(
      buffer: BufferSource,
      controller: TransformStreamDefaultController<Uint8Array>
    ) {
      transformer.write(buffer, err => {
        if (err) controller.error(err)
        else {
          let chunk
          while (null !== (chunk = transformer.read()))
            controller.enqueue(chunk)
        }
      })
    },
    flush() {
      return new Promise<void>(resolve => {
        transformer.flush(() => resolve())
      })
    }
  })
}

const kTransform = Symbol('transform')

class CompressionStream {
  constructor(format: 'deflate' | 'gzip') {
    switch (format) {
      case 'deflate':
        this[kTransform] = transform(createDeflate())
        break
      case 'gzip':
        this[kTransform] = transform(createGzip())
        break
      default:
        throw new TypeError('format must be one of `deflate`, `gzip`')
    }
  }

  get readable(): ReadableStream<Uint8Array> {
    return this[kTransform].readable
  }

  get writable(): WritableStream<Uint8Array> {
    return this[kTransform].writable
  }
}

class DecompressionStream {
  constructor(format: 'deflate' | 'gzip') {
    switch (format) {
      case 'deflate':
        this[kTransform] = transform(createInflate())
        break
      case 'gzip':
        this[kTransform] = transform(createGunzip())
        break
      default:
        throw new TypeError('format must be one of `deflate`, `gzip`')
    }
  }

  get readable(): ReadableStream<Uint8Array> {
    return this[kTransform].readable
  }

  get writable(): WritableStream<Uint8Array> {
    return this[kTransform].writable
  }
}

export {CompressionStream, DecompressionStream}
