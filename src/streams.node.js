export {
  ByteLengthQueuingStrategy,
  CountQueuingStrategy,
  ReadableByteStreamController,
  ReadableStreamBYOBReader,
  ReadableStreamBYOBRequest,
  ReadableStreamDefaultController,
  ReadableStreamDefaultReader,
  TransformStream,
  TransformStreamDefaultController,
  WritableStream,
  WritableStreamDefaultController,
  WritableStreamDefaultWriter
} from 'web-streams-polyfill'
export * from './impl/compression.node.js'
import {ReadableStream as ReadableStreamPolyfill} from 'web-streams-polyfill'
export {
  TextEncoderStream,
  TextDecoderStream
} from '@stardazed/streams-text-encoding'

export class ReadableStream extends ReadableStreamPolyfill {
  constructor(rawUnderlyingSource, rawStrategy) {
    // This works around 0 being passed as the second argument in
    // https://github.com/nodejs/undici/blob/c7f527b2a727a726d9e53c19297314d2850717cb/lib/core/util.js#L368
    // which is not an acceptable input as far as web-streams-polyfill goes in
    // https://github.com/MattiasBuelens/web-streams-polyfill/blob/d354a7457ca8a24030dbd0a135ee40baed7c774d/src/lib/validators/queuing-strategy.ts#L6
    // which seems to be backed by the spec in
    // https://streams.spec.whatwg.org/#queuing-strategy
    super(
      rawUnderlyingSource,
      typeof rawStrategy === 'object' ? rawStrategy : undefined
    )
  }
}
