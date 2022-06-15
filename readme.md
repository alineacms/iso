# iso

Pure ESM web APIs, using existing polyfills for node.js. The polyfills are
converted to ESM and inlined into the resulting bundle so no extra dependencies
are needed.

Supported:

- Crypto: via [@peculiar/webcrypto](https://github.com/PeculiarVentures/webcrypto)
- Fetch: via [node-fetch](https://github.com/node-fetch/node-fetch)