# react-native-polyfill-globals

[![npm version](https://img.shields.io/npm/v/react-native-polyfill-globals.svg)](https://www.npmjs.com/package/react-native-polyfill-globals)
[![ci](https://github.com/acostalima/react-native-polyfill-globals/workflows/Node%20CI/badge.svg)](https://github.com/acostalima/react-native-polyfill-globals/actions)
[![codecov](https://codecov.io/gh/acostalima/react-native-polyfill-globals/badge.svg?branch=master)](https://codecov.io/gh/acostalima/react-native-polyfill-globals?branch=master)

> Polyfills and patches missing or partially supported web and core APIs.

## Motivation

There are several APIs which React Native does not support. When available, they usally are not spec-conformant. This package aims to fill that gap by providing polyfills and patches to said APIs.

As of React Native v0.63.3:

- [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) and [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) are partially implemented.
    - https://github.com/facebook/react-native/blob/v0.63.3/Libraries/Blob/URL.js#L56
    - https://github.com/facebook/react-native/blob/v0.63.3/Libraries/Blob/URL.js#L115
    - Related discussions:
        - https://github.com/facebook/react-native/pull/30188
        - https://github.com/facebook/react-native/pull/25719
        - https://github.com/facebook/react-native/issues/23922
        - https://github.com/facebook/react-native/issues/24428
        - https://github.com/facebook/react-native/issues/16434
        - https://github.com/facebook/react-native/issues/25717
        - https://github.com/facebook/react-native/issues/26019
- [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) is partially implemented
    - https://github.com/facebook/react-native/blob/v0.63.3/Libraries/Network/FormData.js
- [`FileReader.readAsArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer) is not implemented
    - https://github.com/facebook/react-native/blob/v0.63.3/Libraries/Blob/FileReader.js#L84
    - Related discussions:
        - https://github.com/facebook/react-native/issues/21209
- [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) is not supported and, by extension, [`Response.body`](https://developer.mozilla.org/en-US/docs/Web/API/Body/body) is not implemented. Related discussions:
    - https://github.com/facebook/react-native/issues/27741
    - https://github.com/facebook/react-native/issues/12912
    - https://github.com/github/fetch/issues/198
    - https://github.com/github/fetch/issues/746
- [`btoa`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa) and [`atob`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob) are not supported
- [`TextEncoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) and [`TextDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) are not supported
- ...and others
## Installation

```sh
$ npm install react-native-polyfill-globals
```

### Peer dependencies

- [react-native-url-polyfill](https://github.com/charpeni/react-native-url-polyfill)
- [web-streams-polyfill](https://github.com/MattiasBuelens/web-streams-polyfill)
- [base-64](https://github.com/mathiasbynens/base64)
- [text-encoding](https://github.com/inexorabletash/text-encoding)
- [react-native-fetch-api](https://github.com/react-native-community/fetch)
- [react-native-get-random-values](https://github.com/LinusU/react-native-get-random-values)

Install the above as necessary.

## Included support

- Implemented by [react-native+0.63.3.patch](patches/react-native+0.63.3.patch)
    - `FormData.set` 
    - Handling of `Blob`s by `FormData`
    - `FileReader.readAsArrayBuffer`
- `URL` and `URLSearchParams` provided by [react-native-url-polyfill](https://github.com/charpeni/react-native-url-polyfill)
- `ReadableStream` provided by [web-streams-polyfill](https://github.com/MattiasBuelens/web-streams-polyfill)
- `btoa` and `atob` provided by [base-64](https://github.com/mathiasbynens/base64)
- `TextEncoder` and `TextDecoder` provided by [text-encoding](https://github.com/inexorabletash/text-encoding)
- `fetch` for text streaming provided by [react-native-fetch-api](https://github.com/react-native-community/fetch)
- `crypto.getRandomValues` provided by [react-native-get-random-values](https://github.com/LinusU/react-native-get-random-values)

## Usage

### Polyfill all on demand

Import the `polyfill` function and call it whenever.

```js
import { polyfill } from 'react-native-polyfill-globals';

polyfill();
```

### Polyfill all automatically

Add the following import to the top of your app's entry file, `index.js`, located at the root of your project.

```js
import 'react-native-polyfill-globals/auto';
```

### Polyfill selectively

```js
import { polyfill as polyfillBase64 } from 'react-native-polyfill-globals/src/base64';
import { polyfill as polyfillEncoding } from 'react-native-polyfill-globals/src/encoding';
import { polyfill as polyfillReadableStream } from 'react-native-polyfill-globals/src/readable-stream';
import { polyfill as polyfillURL } from 'react-native-polyfill-globals/src/url';
import { polyfill as polyfillFetch } from 'react-native-polyfill-globals/src/fetch';
import { polyfill as polyfillCrypto } from 'react-native-polyfill-globals/src/crypto';
```

### Apply patches

Patch files located at the [patches](patches) directory provide additional polyfills and fixes.

Apply all at once with `patch-package`:

```sh
$ npm install -D patch-package
$ npx patch-package --patch-dir node_modules/react-native-polyfill-globals/patches
```

Apply invidually with Git:

```sh
$ git apply --ignore-whitespace node_modules/react-native-polyfill-globals/react-native+0.63.3.patch
```

Apply invidually with `patch`:

```sh
$ patch -p1 -i node_modules/react-native-polyfill-globals/react-native+0.63.3.patch
```

## ⚠️ Bundling

Note that Metro, React Native's bundler, at this time [does not support](https://github.com/facebook/metro/issues/227) tree-shaking nor dead code elimination. As such, beware that even if you apply polyfills selectively and don't use them at runtime, the code will be included in the production bundle regardless. If you don't need a given polyfill, do not import it at all.

## Related

- [node-libs-react-native](https://github.com/parshap/node-libs-react-native) - Node.js core modules for React Native.
- [rn-nodeify](https://github.com/tradle/rn-nodeify) - Hack to allow React Native projects to use Node core modules and npm modules that use them.
- [ReactNativify](https://github.com/philikon/ReactNativify) - A saner approach on how to use Node.js libraries in React Native.

## License

MIT © [André Costa Lima](https://github.com/acostalima)
