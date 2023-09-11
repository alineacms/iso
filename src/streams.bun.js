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

import {createDeflate, createGunzip, createGzip, createInflate} from 'node:zlib'

function transform(transformer) {
  return new TransformStream({
    start(controller) {
      transformer.on('data', data => {
        controller.enqueue(data)
      })
    },
    transform(buffer) {
      transformer.write(buffer)
    },
    flush() {
      return new Promise(resolve => {
        transformer.flush(() => resolve())
      })
    }
  })
}

const kTransform = Symbol('transform')

export class CompressionStream {
  constructor(format) {
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

  get readable() {
    return this[kTransform].readable
  }

  get writable() {
    return this[kTransform].writable
  }
}

export class DecompressionStream {
  constructor(format) {
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

  get readable() {
    return this[kTransform].readable
  }

  get writable() {
    return this[kTransform].writable
  }
}

/**
 * streams-text-encoding/encoder-stream - transform stream wrapping TextEncoder
 * Part of Stardazed
 * (c) 2018-Present by @zenmumbler
 * https://github.com/stardazed/sd-streams
 */

const encEncoder = Symbol("encEncoder");
const encTransform = Symbol("encTransform");

class TextEncodeTransformer {
	constructor(encoder) {
		this.encoder_ = encoder;
		this.partial_ = undefined;
	}

	transform(chunk, controller) {
		let stringChunk = String(chunk);
		if (this.partial_ !== undefined) {
			stringChunk = this.partial_ + stringChunk;
			this.partial_ = undefined;
		}
		
		const lastCharIndex = stringChunk.length - 1;
		const lastCodeUnit = stringChunk.charCodeAt(lastCharIndex);
		if (lastCodeUnit >= 0xD800 && lastCodeUnit < 0xDC00) {
			this.partial_ = String.fromCharCode(lastCodeUnit);
			stringChunk = stringChunk.substring(0, lastCharIndex);
		}

		const bytes = this.encoder_.encode(stringChunk);
		if (bytes.length !== 0) {
			controller.enqueue(bytes);
		}
	}

	flush(controller) {
		if (this.partial_) {
			controller.enqueue(this.encoder_.encode(this.partial_));
			this.partial_ = undefined;
		}
	}
}

export class TextEncoderStream  {
	constructor() {
		this[encEncoder] = new TextEncoder();
		this[encTransform] = new TransformStream(new TextEncodeTransformer(this[encEncoder]));
	}

	get encoding() {
		return this[encEncoder].encoding;
	}

	get readable() {
		return this[encTransform].readable;
	}

	get writable() {
		return this[encTransform].writable;
	}
}

/**
 * streams-text-encoding/decoder-stream - transform stream wrapping TextDecoder
 * Part of Stardazed
 * (c) 2018-Present by @zenmumbler
 * https://github.com/stardazed/sd-streams
 */

const decDecoder = Symbol("decDecoder");
const decTransform = Symbol("decTransform");


class TextDecodeTransformer {
	constructor(decoder) {
		this.decoder_ = decoder;
	}

	transform(chunk, controller) {
		if (! (chunk instanceof ArrayBuffer || ArrayBuffer.isView(chunk))) {
			throw new TypeError("Input data must be a BufferSource");
		}
		const text = this.decoder_.decode(chunk, { stream: true });
		if (text.length !== 0) {
			controller.enqueue(text);
		}
	}

	flush(controller) {
		const text = this.decoder_.decode();
		if (text.length !== 0) {
			controller.enqueue(text);
		}
	}
}

export class TextDecoderStream {
	constructor(label = 'utf-8', options = {}) {
		this[decDecoder] = new TextDecoder(label, options);
		this[decTransform] = new TransformStream(new TextDecodeTransformer(this[decDecoder]));
	}

	get encoding() {
		return this[decDecoder].encoding;
	}

	get fatal() {
		return this[decDecoder].fatal;
	}

	get ignoreBOM() {
		return this[decDecoder].ignoreBOM;
	}

	get readable() {
		return this[decTransform].readable;
	}

	get writable() {
		return this[decTransform].writable;
	}
}