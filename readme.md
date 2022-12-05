# iso

Cross platform JavaScript apis

- Ponyfilled for Node.js (14.13+), inlined into the bundle so no extra dependencies
  are needed
- Re-exported from globalThis for other platforms

```ts
import {
  // SubtleCrypto
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

Supported:

- Crypto: via [@peculiar/webcrypto](https://github.com/PeculiarVentures/webcrypto)
- Fetch: via [undici](https://github.com/nodejs/undici)
  - multipart parser: from [node-fetch](https://github.com/node-fetch)
- Blob: via [formdata-node](https://github.com/octet-stream/form-data)
- Text(De/En)CoderStream: via [@stardazed/streams-text-encoding](https://github.com/stardazed/sd-streams)
- (De)CompressionStream: via implementation in [compression.node.ts](https://github.com/alineacms/iso/blob/master/src/impl/compression.node.ts)
- AbortController/Signal: via [abort-controller](https://github.com/mysticatea/abort-controller)
