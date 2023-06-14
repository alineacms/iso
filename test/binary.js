import {test} from 'uvu'
import * as assert from 'uvu/assert'
import {atob, btoa} from '@alinea/iso'

test('atob', () => {
  assert.is(atob('aGVsbG8gd29ybGQ='), 'hello world')
})

test('btoa', () => {
  assert.is(btoa('hello world'), 'aGVsbG8gd29ybGQ=')
})

test.run()
