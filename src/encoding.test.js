import { polyfillGlobal as mockPolyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';
import polyfillEncoding from './encoding';

jest.mock('react-native/Libraries/Utilities/PolyfillFunctions', () => ({
    polyfillGlobal: jest.fn(),
}));

test('polyfill TextEncoder and TextDecoder', () => {
    const ASSERT_API = {
        TextEncoder: (TextEncoder) => {
            expect(TextEncoder.prototype.encode).toBeInstanceOf(Function);
        },
        TextDecoder: (TextDecoder) => {
            expect(TextDecoder.prototype.decode).toBeInstanceOf(Function);
        },
    };

    polyfillEncoding(mockPolyfillGlobal);

    expect(mockPolyfillGlobal).toHaveBeenCalledTimes(2);

    mockPolyfillGlobal.mock.calls.forEach((call) => {
        const name = call[0];
        const API = call[1]?.();

        expect(name).toBeOneOf(['TextEncoder', 'TextDecoder']);
        expect(API).toBeDefined();
        ASSERT_API[name](API);
    });
});

