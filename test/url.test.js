import { polyfillGlobal as mockPolyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';
import { polyfill as polyfillURL } from '../src/url';

jest.mock('react-native/Libraries/Utilities/PolyfillFunctions', () => ({
    polyfillGlobal: jest.fn(),
}));

test('polyfill URL and URLSearchParams', () => {
    const ASSERT_API = {
        URL: (URL) => {
            const url = new URL('http://localhost');

            expect(URL.createObjectURL).toBeInstanceOf(Function);
            expect(url.href).toBeDefined();
        },
        URLSearchParams: (URLSearchParams) => {
            const search = new URLSearchParams();

            expect(search.append).toBeInstanceOf(Function);
        },
    };

    polyfillURL();

    expect(mockPolyfillGlobal).toHaveBeenCalledTimes(2);

    mockPolyfillGlobal.mock.calls.forEach((call) => {
        const name = call[0];
        const API = call[1]?.();

        expect(name).toBeOneOf(['URL', 'URLSearchParams']);
        expect(API).toBeDefined();
        ASSERT_API[name](API);
    });
});
