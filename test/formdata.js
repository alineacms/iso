import {test} from 'uvu'
import * as assert from 'uvu/assert'
import {FormData} from '@alinea/iso'

test('form data', async () => {
  const formData = new FormData()
  formData.append('foo', 'bar')
  formData.append('foo', 'baz')
  assert.is(formData.get('foo'), 'bar')
  assert.equal(formData.getAll('foo'), ['bar', 'baz'])
})

test('parse multipart', async () => {
  const formData = new FormData()
  formData.append('foo', 'bar')
  formData.append('foo', 'baz')
  const request = new Request('http://localhost/', {
    method: 'POST',
    body: formData
  })
  const parsed = await request.formData()
  assert.is(parsed.get('foo'), 'bar')
  assert.equal(parsed.getAll('foo'), ['bar', 'baz'])
})

test.run()
