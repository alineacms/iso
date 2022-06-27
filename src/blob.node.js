export {Blob} from '../node_modules/formdata-node/lib/esm/Blob.js'
export function atob(enc) {
  return Buffer.from(enc, 'base64').toString('binary')
}
export function btoa(str) {
  return Buffer.from(str, 'binary').toString('base64')
}
export function resolveObjectURL(url) {}
