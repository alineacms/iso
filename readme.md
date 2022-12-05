# iso

Cross platform JavaScript apis

- Ponyfilled for Node.js (14.13+), inlined into the bundle
- Re-exported from globalThis for other platforms

```ts
import {
  // Crypto
  crypto,

  // Web streams
  ByteLengthQueuingStrategy,
  CompressionStream,
  CountQueuingStrategy,
  DecompressionStream,
  ReadableByteStreamController,
  ReadableStream,
  ReadableStreamBYOBReader,
  ReadableStreamBYOBRequest,
  ReadableStreamDefaultController,
  ReadableStreamDefaultReader,
  TextDecoderStream,
  TextEncoderStream,
  TransformStream,
  TransformStreamDefaultController,
  WritableStream,
  WritableStreamDefaultController,
  WritableStreamDefaultWriter,

  // Fetch apis
  AbortController,
  AbortSignal,
  File,
  FormData,
  Headers,
  Request,
  Response,
  fetch,

  // Binary utilities
  atob,
  btoa,
  Blob
} from '@alinea/iso'
```

### Node.js sources

| Feature                | Polyfill                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Crypto                 | [@peculiar/webcrypto](https://github.com/PeculiarVentures/webcrypto)                                               |
| Fetch                  | [undici](https://github.com/nodejs/undici)                                                                         |
| Multipart parser       | from [node-fetch](https://github.com/node-fetch)                                                                   |
| Blob                   | [formdata-node](https://github.com/octet-stream/form-data)                                                         |
| Text(De/En)CoderStream | [@stardazed/streams-text-encoding](https://github.com/stardazed/sd-streams)                                        |
| (De)CompressionStream  | implementation in [compression.node.ts](https://github.com/alineacms/iso/blob/master/src/impl/compression.node.ts) |
| AbortController/Signal | [abort-controller](https://github.com/mysticatea/abort-controller)                                                 |
