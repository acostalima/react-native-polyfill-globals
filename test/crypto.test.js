import { polyfill as polyfillCrypto } from '../src/crypto';

const mockCryptoPolyfill = jest.fn();

jest.mock('react-native-get-random-values', () => mockCryptoPolyfill(), { virtual: true });

test('polyfill crypto.getRandomValuess', () => {
    polyfillCrypto();

    expect(mockCryptoPolyfill).toHaveBeenCalledTimes(1);
});
