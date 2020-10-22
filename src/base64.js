import { polyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';

export const polyfill = () => {
    const { decode, encode } = require('base-64');

    polyfillGlobal('atob', () => decode);
    polyfillGlobal('btoa', () => encode);
};
