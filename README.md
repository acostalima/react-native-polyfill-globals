# react-native-polyfill-globals

[![npm version](https://img.shields.io/npm/v/react-native-polyfill-globals.svg)](https://www.npmjs.com/package/react-native-polyfill-globals)
[![ci](https://github.com/acostalima/react-native-polyfill-globals/workflows/Node%20CI/badge.svg)](https://github.com/acostalima/react-native-polyfill-globals/actions)
[![codecov](https://codecov.io/gh/acostalima/react-native-polyfill-globals/badge.svg?branch=master)](https://codecov.io/gh/acostalima/react-native-polyfill-globals?branch=master)

> Polyfills and patches missing or partially supported web and core APIs.

## Motivation

There are several APIs which React Native does not provide. When available, they usally are not spec conformant. This package aims to fill that gap by providing polyfills and patches to said APIs.

As of React Native v0.63.3:
- [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) and [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) are partially implemented
    - https://github.com/facebook/react-native/blob/v0.63.3/Libraries/Blob/URL.js#L56
    - https://github.com/facebook/react-native/blob/v0.63.3/Libraries/Blob/URL.js#L115
    - https://github.com/facebook/react-native/pull/30188
    - https://github.com/facebook/react-native/pull/25719
    - https://github.com/facebook/react-native/issues/23922
    - https://github.com/facebook/react-native/issues/24428
- [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) is partially implemented
    - https://github.com/facebook/react-native/blob/v0.63.3/Libraries/Network/FormData.js
- [`FileReader.readAsArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer) is not implemented
    - https://github.com/facebook/react-native/blob/v0.63.3/Libraries/Blob/FileReader.js#L84
- [`Response.body`](https://developer.mozilla.org/en-US/docs/Web/API/Body/body) is not implemented
    - https://github.com/facebook/react-native/issues/12912
- [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) is not supported
- [`btoa`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa) and [`atob`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob) are not supported
- [`TextEncoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) and [`TextDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) are not supported

## Installation

```sh
$ npm install react-native-polyfill-globals
```

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

### Polyfill selectively on demand

```js
import { polyfill as polyfillBase64 } 'react-native-polyfill-globals/src/base64';
import { polyfill as polyfillEncoding } 'react-native-polyfill-globals/src/encoding';
import { polyfill as polyfillReadableStream } 'react-native-polyfill-globals/src/readable-stream';
import { polyfill as polyfillURL } 'react-native-polyfill-globals/src/url';
```

### Apply patches

Patch files provided at the [patches](patches) directory install additional polyfills.

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

## Included support

- Implemented by react-native+0.63.3.patch
    - `FormData.set` 
    - `FormData` handles `Blob`s correctly
    - `FileReader.readAsArrayBuffer`
- Implemented by whatwg-fetch+3.4.1.patch
    - `Response.body`
- `URL` and `URLSearchParams`
- `ReadableStream`
- `btoa` and `atob`
- `TextEncoder` and `TextDecoder`

### About streaming

As React Native does not support returning a `ReadableStream` natively nor provide access to the underlying byte stream (only base64 can be read through the bridge), we have to fallback to `XMLHttpRequest` without support for true streaming. React Native's XHR provides [progress events](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event) which buffers text and allows us to concatenate a response by encoding it into its UTF-8 byte representation using the `TextEncoder` API. Although [very inefficient](https://github.com/jonnyreeves/fetch-readablestream/blob/cabccb98788a0141b001e6e775fc7fce87c62081/src/defaultTransportFactory.js#L33), it's some of sort of pseudo-streaming that works. Read more at https://github.com/github/fetch/issues/746#issuecomment-573251497 and https://hpbn.co/xmlhttprequest/#streaming-data-with-xhr.

To make `Response.body` work, `ReadableStream`'s controller was integrated with XHR's progress events. It's important to stress that progress events are only dispatched when [`XMLHttpRequest.responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType) is set to `text` (https://github.com/facebook/react-native/blob/v0.63.3/Libraries/Network/RCTNetworking.mm#L544-L547). If you wish to process raw binary data, either `blob` or `arraybuffer` has to be used. In this case, the response is read as a whole, when the load event is fired, and enqueued to the stream's controller as a single chunk.

Currently, on each request, if the `Content-Type` header is set `application/octet-stream` then `XMLHttpRequest.responseType` is set to `text`. Otherwise, it is set to `arraybuffer`.

## ⚠️ Bundling

Note that Metro, React Native's bundler, at this time [does not support](https://github.com/facebook/metro/issues/227) tree-shaking nor dead code elimination. As such, beware if you are applying polyfills selectively with the JavaScript API and don't call the functions, the code will be included in the production bundle regardless. If you don't need a given polyfill, do not import it at all.

## License

Released under the [MIT License](https://www.opensource.org/licenses/mit-license.php).
