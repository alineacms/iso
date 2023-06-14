import {test} from 'uvu'
import * as assert from 'uvu/assert'
import {Blob} from '@alinea/iso'

test('blob', () => {
  const blob = new Blob(['hello world'], {type: 'text/plain'})
  assert.is(blob.size, 11)
  assert.is(blob.type, 'text/plain')
  assert.is(blob.toString(), '[object Blob]')
  assert.is(blob[Symbol.toStringTag], 'Blob')
  assert.ok(blob instanceof Blob)
})

test.run()
