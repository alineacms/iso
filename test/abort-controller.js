import {test} from 'uvu'
import * as assert from 'uvu/assert'
import {AbortController, AbortSignal} from '@alinea/iso'

console.log(`\nTesting on Node.js ${process.version}\n`)

test('abort controller', async () => {
  const controller = new AbortController()
  assert.is(controller.signal.aborted, false)
  controller.abort()
  assert.is(controller.signal.aborted, true)
})

test.run()
