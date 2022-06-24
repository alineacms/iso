# iso

Pure ESM web APIs, using existing polyfills for node.js. The polyfills are
converted to ESM and inlined into the resulting bundle so no extra dependencies
are needed.

Supported:

- Crypto: via [@peculiar/webcrypto](https://github.com/PeculiarVentures/webcrypto)
- Fetch: via [undici](https://github.com/nodejs/undici)
- Blob: via [formdata-node](https://www.npmjs.com/package/formdata-node)
