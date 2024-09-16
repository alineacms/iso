export const {
  ByteLengthQueuingStrategy,
  CountQueuingStrategy,
  ReadableByteStreamController,
  ReadableStream,
  ReadableStreamBYOBReader,
  ReadableStreamBYOBRequest,
  ReadableStreamDefaultController,
  ReadableStreamDefaultReader,
  TransformStream,
  TransformStreamDefaultController,
  WritableStream,
  WritableStreamDefaultController,
  WritableStreamDefaultWriter
} = globalThis

/**
 * (c) 2023 Kitpipat Jaritwong
 * https://github.com/sunneydev/bun-compression
 */

import zlib from 'node:zlib'

export class CompressionStream {
  constructor(format) {
    const handle =
      format === 'deflate'
        ? zlib.createDeflate()
        : format === 'gzip'
        ? zlib.createGzip()
        : zlib.createDeflateRaw()

    this.readable = new ReadableStream({
      start(controller) {
        handle.on('data', chunk => controller.enqueue(chunk))
        handle.once('end', () => controller.close())
      }
    })

    this.writable = new WritableStream({
      write: chunk => handle.write(chunk),
      close: () => handle.end()
    })
  }
}

export class DecompressionStream {
  constructor(format) {
    const handle =
      format === 'deflate'
        ? zlib.createInflate()
        : format === 'gzip'
        ? zlib.createGunzip()
        : zlib.createInflateRaw()

    this.readable = new ReadableStream({
      start(controller) {
        handle.on('data', chunk => controller.enqueue(chunk))
        handle.once('end', () => controller.close())
      }
    })

    this.writable = new WritableStream({
      write: chunk => handle.write(chunk),
      close: () => handle.end()
    })
  }
}

/**
 * streams-text-encoding/encoder-stream - transform stream wrapping TextEncoder
 * Part of Stardazed
 * (c) 2018-Present by @zenmumbler
 * https://github.com/stardazed/sd-streams
 */

const encEncoder = Symbol('encEncoder')
const encTransform = Symbol('encTransform')

class TextEncodeTransformer {
  constructor(encoder) {
    this.encoder_ = encoder
    this.partial_ = undefined
  }

  transform(chunk, controller) {
    let stringChunk = String(chunk)
    if (this.partial_ !== undefined) {
      stringChunk = this.partial_ + stringChunk
      this.partial_ = undefined
    }

    const lastCharIndex = stringChunk.length - 1
    const lastCodeUnit = stringChunk.charCodeAt(lastCharIndex)
    if (lastCodeUnit >= 0xd800 && lastCodeUnit < 0xdc00) {
      this.partial_ = String.fromCharCode(lastCodeUnit)
      stringChunk = stringChunk.substring(0, lastCharIndex)
    }

    const bytes = this.encoder_.encode(stringChunk)
    if (bytes.length !== 0) {
      controller.enqueue(bytes)
    }
  }

  flush(controller) {
    if (this.partial_) {
      controller.enqueue(this.encoder_.encode(this.partial_))
      this.partial_ = undefined
    }
  }
}

export class TextEncoderStream {
  constructor() {
    this[encEncoder] = new TextEncoder()
    this[encTransform] = new TransformStream(
      new TextEncodeTransformer(this[encEncoder])
    )
  }

  get encoding() {
    return this[encEncoder].encoding
  }

  get readable() {
    return this[encTransform].readable
  }

  get writable() {
    return this[encTransform].writable
  }
}

/**
 * streams-text-encoding/decoder-stream - transform stream wrapping TextDecoder
 * Part of Stardazed
 * (c) 2018-Present by @zenmumbler
 * https://github.com/stardazed/sd-streams
 */

const decDecoder = Symbol('decDecoder')
const decTransform = Symbol('decTransform')

class TextDecodeTransformer {
  constructor(decoder) {
    this.decoder_ = decoder
  }

  transform(chunk, controller) {
    if (!(chunk instanceof ArrayBuffer || ArrayBuffer.isView(chunk))) {
      throw new TypeError('Input data must be a BufferSource')
    }
    const text = this.decoder_.decode(chunk, {stream: true})
    if (text.length !== 0) {
      controller.enqueue(text)
    }
  }

  flush(controller) {
    const text = this.decoder_.decode()
    if (text.length !== 0) {
      controller.enqueue(text)
    }
  }
}

export class TextDecoderStream {
  constructor(label = 'utf-8', options = {}) {
    this[decDecoder] = new TextDecoder(label, options)
    this[decTransform] = new TransformStream(
      new TextDecodeTransformer(this[decDecoder])
    )
  }

  get encoding() {
    return this[decDecoder].encoding
  }

  get fatal() {
    return this[decDecoder].fatal
  }

  get ignoreBOM() {
    return this[decDecoder].ignoreBOM
  }

  get readable() {
    return this[decTransform].readable
  }

  get writable() {
    return this[decTransform].writable
  }
}
