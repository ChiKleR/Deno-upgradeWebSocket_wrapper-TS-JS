This Deno module exports a function ``upgradeWebSocket_wrapper`` in TypeScript and JavaScript, which is a wrapper around Deno's ``upgradeWebSocket`` function, catching some exceptions thrown from the original function due to client-side errors, which would crash the server.
It takes the same arguments as the original, and instead returns a union between a ``Deno.WebSocketUpgrade`` and an object with two properties, ``response`` and ``socket``, both undefined. This way, it can be used like in the given code sample.

Sample:
``deno run --allow-net ./src/lib/sample.ts``

Compile to JS:
``deno bundle ./src/lib/mod.ts ./src/lib/mod.js``
