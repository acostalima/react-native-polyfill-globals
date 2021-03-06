import { polyfillGlobal as mockPolyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';
import { polyfill as polyfillBase64 } from '../src/base64';

jest.mock('base-64', () => ({
    encode: () => 'btoa',
    decode: () => 'atob',
}), { virtual: true });

const POLYFILL_NAMES = ['atob', 'btoa'];

test('polyfill atob and btoa', () => {
    polyfillBase64();

    expect(mockPolyfillGlobal).toHaveBeenCalledTimes(2);

    mockPolyfillGlobal.mock.calls.forEach((call) => {
        const name = call[0];
        const getImplementation = call[1]?.();

        expect(getImplementation).toBeInstanceOf(Function);
        expect(name).toBeOneOf(POLYFILL_NAMES);
        expect(getImplementation()).toBe(name);

        POLYFILL_NAMES.shift();
    });

    expect(POLYFILL_NAMES).toHaveLength(0);
});
