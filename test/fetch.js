import {test} from 'uvu'
import * as assert from 'uvu/assert'
import {fetch} from '@alinea/iso'
import http from 'node:http'

// Start tiny echo server
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello world')
})

test('request', async () => {
  await new Promise((resolve, reject) => {
    server.listen(8888, err => {
      if (err) reject(err)
      else resolve()
    })
  })
  const response = await fetch('http://localhost:8888')
  assert.is(response.ok, true)
  assert.is(response.status, 200)
  assert.is(response.statusText, 'OK')
  assert.is(response.headers.get('content-type'), 'text/plain')
  const body = await response.text()
  assert.is(body, 'Hello world')
  await new Promise(resolve => {
    server.close(resolve)
  })
})

test.run()
