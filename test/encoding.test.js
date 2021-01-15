import { polyfillGlobal as mockPolyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';
import { polyfill as polyfillEncoding } from '../src/encoding';

jest.mock('text-encoding', () => ({
    TextEncoder: () => 'TextEncoder',
    TextDecoder: () => 'TextDecoder',
}), { virtual: true });

const POLYFILL_NAMES = ['TextEncoder', 'TextDecoder'];

test('polyfill TextEncoder and TextDecoder', () => {
    polyfillEncoding(mockPolyfillGlobal);

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

