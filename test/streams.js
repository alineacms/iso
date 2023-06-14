import {test} from 'uvu'
import * as assert from 'uvu/assert'
import {
  ReadableStream,
  TextEncoderStream,
  TextDecoderStream,
  WritableStream,
  TransformStream
} from '@alinea/iso'

test('readable stream', async () => {
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue('hello')
      controller.enqueue('world')
      controller.close()
    }
  })
  const reader = readable.getReader()
  assert.equal(await reader.read(), {done: false, value: 'hello'})
  assert.equal(await reader.read(), {done: false, value: 'world'})
})

test('writable stream', async () => {
  let output = ''
  const writable = new WritableStream({
    write(chunk) {
      output += chunk
    }
  })
  const writer = writable.getWriter()
  writer.write('hello')
  writer.write('world')
  await writer.close()
  assert.is(output, 'helloworld')
})

test('text encoder stream', async () => {
  const textStream = new ReadableStream({
    start(controller) {
      controller.enqueue('hello')
      controller.enqueue('world')
      controller.close()
    }
  })
  const body = textStream.pipeThrough(new TextEncoderStream())
  const reader = body.getReader()
  assert.equal(await reader.read(), {
    done: false,
    value: new Uint8Array([104, 101, 108, 108, 111])
  })
})

test('test decoder stream', async () => {
  const byteStream = new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array([104, 101, 108, 108, 111]))
      controller.close()
    }
  })
  const body = byteStream.pipeThrough(new TextDecoderStream())
  const reader = body.getReader()
  assert.equal(await reader.read(), {done: false, value: 'hello'})
})

test('transform stream', async () => {
  const transform = new TransformStream({
    transform(chunk, controller) {
      assert.is(chunk, 'hello')
      controller.enqueue(chunk + ' world')
    }
  })
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue('hello')
      controller.close()
    }
  })
  const writable = new WritableStream({
    write(chunk) {
      assert.is(chunk, 'hello world')
    }
  })
  await readable.pipeThrough(transform).pipeTo(writable)
})

test.run()
