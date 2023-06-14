import {test} from 'uvu'
import * as assert from 'uvu/assert'
import {crypto} from '@alinea/iso'

test('crypto', () => {
  assert.is(crypto.getRandomValues.name, 'getRandomValues')
  assert.is(crypto.getRandomValues.length, 1)
  assert.is(crypto[Symbol.toStringTag], 'Crypto')
})

test('random values', () => {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  assert.is(array.length, 16)
  assert.ok(array[0] >= 0)
  assert.ok(array[0] <= 255)
  assert.ok(array[15] >= 0)
  assert.ok(array[15] <= 255)
})

test('subtle crypto', () => {
  assert.is(crypto.subtle.generateKey.name, 'generateKey')
  assert.ok(crypto.subtle.digest)
  assert.ok(crypto.subtle.sign)
  assert.ok(crypto.subtle.verify)
  assert.ok(crypto.subtle.encrypt)
  assert.ok(crypto.subtle.decrypt)
  assert.ok(crypto.subtle.deriveBits)
  assert.ok(crypto.subtle.deriveKey)
  assert.ok(crypto.subtle.exportKey)
  assert.ok(crypto.subtle.importKey)
  assert.ok(crypto.subtle.wrapKey)
  assert.ok(crypto.subtle.unwrapKey)
})

test.run()
