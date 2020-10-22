import { polyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';

export default () => {
    const { ReadableStream } = require('web-streams-polyfill/ponyfill/es2018');

    polyfillGlobal('ReadableStream', () => ReadableStream);
};
