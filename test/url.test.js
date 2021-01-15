import { polyfill as polyfillURL } from '../src/url';

const mockUrlPolyfill = jest.fn();

jest.mock('react-native-url-polyfill/auto', () => mockUrlPolyfill(), { virtual: true });

test('polyfill URL and URLSearchParams', () => {
    polyfillURL();

    expect(mockUrlPolyfill).toHaveBeenCalledTimes(1);
});
