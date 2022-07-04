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
  WritableStreamDefaultWriter,
  TextEncoderStream,
  TextDecoderStream
} = globalThis

export type ByteLengthQueuingStrategy = globalThis.ByteLengthQueuingStrategy
export type CountQueuingStrategy = globalThis.CountQueuingStrategy
export type ReadableByteStreamController =
  globalThis.ReadableByteStreamController
export type ReadableStream<R = any> = globalThis.ReadableStream<R>
export type ReadableStreamBYOBReader = globalThis.ReadableStreamBYOBReader
export type ReadableStreamBYOBRequest = globalThis.ReadableStreamBYOBRequest
export type ReadableStreamDefaultController<R = any> =
  globalThis.ReadableStreamDefaultController<R>
export type ReadableStreamDefaultReader<R = any> =
  globalThis.ReadableStreamDefaultReader<R>
export type TransformStream<I = any, O = any> = globalThis.TransformStream<I, O>
export type TransformStreamDefaultController<O = any> =
  globalThis.TransformStreamDefaultController<O>
export type WritableStream<W = any> = globalThis.WritableStream<W>
export type WritableStreamDefaultController =
  globalThis.WritableStreamDefaultController
export type WritableStreamDefaultWriter<W = any> =
  globalThis.WritableStreamDefaultWriter<W>
export type TextEncoderStream = globalThis.TextEncoderStream
export type TextDecoderStream = globalThis.TextDecoderStream

import type {
  CompressionStream as CS,
  DecompressionStream as DS
} from './impl/compression.node'
export type CompressionStream = CS
export const CompressionStream: typeof CS = globalThis.CompressionStream
export type DecompressionStream = CS
export const DecompressionStream: typeof DS = globalThis.DecompressionStream
