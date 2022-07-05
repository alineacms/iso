# iso

Pure ESM web APIs, using existing polyfills for node.js. The polyfills are
converted to ESM and inlined into the resulting bundle so no extra dependencies
are needed.

Supported:

- Crypto: via [@peculiar/webcrypto](https://github.com/PeculiarVentures/webcrypto)
- Fetch: via [undici](https://github.com/nodejs/undici)
  - multipart parser: from [node-fetch](https://github.com/node-fetch)
- Blob: via [formdata-node](https://github.com/octet-stream/form-data)
- Text(De/En)CoderStream: via [@stardazed/streams-text-encoding](https://github.com/stardazed/sd-streams)
- (De)CompressionStream: via implementation in [compression.node.ts](https://github.com/alineacms/iso/blob/master/src/impl/compression.node.ts)
