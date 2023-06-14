import {test} from 'uvu'
import * as assert from 'uvu/assert'
import {ReadableStream, WritableStream} from '@alinea/iso'

test('ReadableStream', async () => {
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

test('WritableStream', async () => {
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

test.run()
