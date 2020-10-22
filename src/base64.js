import { polyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';

export default () => {
    const { decode, encode } = require('base-64');

    polyfillGlobal('atob', () => decode);
    polyfillGlobal('btoa', () => encode);
};
