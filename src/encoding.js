import { polyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';

export const polyfill = () => {
    const { TextEncoder, TextDecoder } = require('text-encoding');

    polyfillGlobal('TextEncoder', () => TextEncoder);
    polyfillGlobal('TextDecoder', () => TextDecoder);
};
