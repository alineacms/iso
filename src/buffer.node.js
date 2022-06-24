import {Blob} from '../node_modules/formdata-node/lib/esm/Blob.js'
export {Blob}
export function atob(enc) {
  return Buffer.from(enc, 'base64').toString('binary')
}
export function btoa(str) {
  return Buffer.from(str, 'binary').toString('base64')
}
export function resolveObjectURL(url) {}
export default {
  Blob,
  atob,
  btoa,
  resolveObjectURL
}
