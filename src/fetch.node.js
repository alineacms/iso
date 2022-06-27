export {FormData} from 'undici/lib/fetch/formdata.js'
export {File} from 'undici/lib/fetch/file.js'
export {Headers} from 'undici/lib/fetch/headers.js'
export {fetch} from 'undici/index-fetch.js'
import {Request as UndiciRequest} from 'undici/lib/fetch/request.js'
export {Response} from 'undici/lib/fetch/response.js'
import {toFormData} from './impl/multipart.node.js'

export class Request extends UndiciRequest {
  async formData() {
    const contentType = this.headers.get('Content-Type')
    if (/multipart\/form-data/.test(contentType))
      return toFormData(this.body, contentType)
    return super.formData()
  }
}
