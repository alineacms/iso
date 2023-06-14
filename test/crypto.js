import {test} from 'uvu'
import * as assert from 'uvu/assert'
import {crypto} from '@alinea/iso'

const example0 = {
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTY1NTM4NjU0OSwiZXhwIjoxNjU1MzkwMTQ5fQ.XzrLdHgDhx_G1OEl4kc-OdBom7426dTxrMa-nFgIpioe_vavB442wr1RzKjLfpzxi-klLX5vG7UIvt42SjJRb2vS2FUJlChj4FHOOvHveYL6L6Zlwgw-Gpt76i_-IDGcfp52ajZPl_fZDekcXwMFcpJsQzTv_XIynvIUmpFiRSftzike0UdX6FRNU-uEbvu-ekzG8NfXC9T6f8SQTt9JrtHHwOaE9Sbnn6mF1BBLI1HToBLpDen3ZWWIc1IQpLr74q9MKDpclEdgwSacRYMKpwhDgN7KGRGHsCJJBkgw9E834aBAuM2TGGZcO0Tv4z28KwFrKOp9ND-IbyAWcTkigw',
  publicKey: {
    kty: 'RSA',
    n: '6S7asUuzq5Q_3U9rbs-PkDVIdjgmtgWreG5qWPsC9xXZKiMV1AiV9LXyqQsAYpCqEDM3XbfmZqGb48yLhb_XqZaKgSYaC_h2DjM7lgrIQAp9902Rr8fUmLN2ivr5tnLxUUOnMOc2SQtr9dgzTONYW5Zu3PwyvAWk5D6ueIUhLtYzpcB-etoNdL3Ir2746KIy_VUsDwAM7dhrqSK8U2xFCGlau4ikOTtvzDownAMHMrfE7q1B6WZQDAQlBmxRQsyKln5DIsKv6xauNsHRgBAKctUxZG8M4QJIx3S6Aughd3RZC4Ca5Ae9fd8L8mlNYBCrQhOZ7dS0f4at4arlLcajtw',
    e: 'AQAB',
    alg: 'RS512',
    use: 'sig'
  },
  alg: 'RS512',
  payload: {
    sub: '1234567890',
    name: 'John Doe',
    admin: true,
    iat: 1655386549,
    exp: 1655390149
  },
  validAt: 1655386548
}

const example1 = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o',
  alg: 'HS256',
  payload: {sub: '1234567890', name: 'John Doe', iat: 1516239022},
  header: {alg: 'HS256', typ: 'JWT'},
  secret: 'secret'
}

const example2 = {
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2NTUzODQ4NDIsImV4cCI6MTY4NjkyMDg0MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.hOGlmibLnbZj530ARio97HMdN7maWSW6E5zFZ28XCLjar6X8b5AGRS3xJe23jTePYdMbDiGVxPZdG_Y-4RzPoA',
  payload: {
    iss: 'Online JWT Builder',
    iat: 1655384842,
    exp: 1686920842,
    aud: 'www.example.com',
    sub: 'jrocket@example.com',
    GivenName: 'Johnny',
    Surname: 'Rocket',
    Email: 'jrocket@example.com',
    Role: ['Manager', 'Project Administrator']
  },
  header: {typ: 'JWT', alg: 'HS512'},
  validAt: 1686920841,
  notValidAt: 1686920842,
  alg: 'HS512',
  secret: 'qwertyuiopasdfghjklzxcvbnm123456'
}

test('crypto', () => {
  assert.ok(crypto.getRandomValues)
  assert.ok(crypto.subtle)
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

test('import key', async () => {
  const key = await crypto.subtle.importKey(
    'jwk',
    example0.publicKey,
    {name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-512'},
    false,
    ['verify']
  )
  assert.ok(key)
})

test('verify', async () => {
  const key = await crypto.subtle.importKey(
    'jwk',
    example0.publicKey,
    {name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-512'},
    false,
    ['verify']
  )
  assert.ok(key)
  const result = await crypto.subtle.verify(
    {name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-512'},
    key,
    new Uint8Array(0),
    new Uint8Array(0)
  )
  assert.is(result, false)
})

test.run()
