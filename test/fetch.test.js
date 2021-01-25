import { polyfillGlobal as mockPolyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';
import { polyfill as polyfillFetch } from '../src/fetch';

jest.mock('react-native-fetch-api', () => ({
    fetch: () => 'fetch',
    Headers: () => 'Headers',
    Request: () => 'Request',
    Response: () => 'Response',
}), { virtual: true });

const POLYFILL_NAMES = ['fetch', 'Headers', 'Request', 'Response'];

test('polyfill fetch', () => {
    polyfillFetch(mockPolyfillGlobal);

    expect(mockPolyfillGlobal).toHaveBeenCalledTimes(4);

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
