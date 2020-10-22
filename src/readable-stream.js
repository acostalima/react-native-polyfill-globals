import { polyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';

export const polyfill = () => {
    const { ReadableStream } = require('web-streams-polyfill/ponyfill/es6');

    polyfillGlobal('ReadableStream', () => ReadableStream);
};
