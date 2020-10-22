import { polyfillGlobal as mockPolyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';
import { polyfill as polyfillBase64 } from '../src/base64';

jest.mock('react-native/Libraries/Utilities/PolyfillFunctions', () => ({
    polyfillGlobal: jest.fn(),
}));

test('polyfill atob and btoa', () => {
    polyfillBase64();

    expect(mockPolyfillGlobal).toHaveBeenCalledTimes(2);

    mockPolyfillGlobal.mock.calls.forEach((call) => {
        const name = call[0];
        const fn = call[1]?.();

        expect(name).toBeOneOf(['atob', 'btoa']);
        expect(fn).toBeInstanceOf(Function);
    });
});
