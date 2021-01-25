import { polyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';

export const polyfill = () => {
    const { fetch, Headers, Request, Response } = require('react-native-fetch-api');

    polyfillGlobal('fetch', () => fetch);
    polyfillGlobal('Headers', () => Headers);
    polyfillGlobal('Request', () => Request);
    polyfillGlobal('Response', () => Response);
};
