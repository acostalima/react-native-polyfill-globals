import { polyfillGlobal as mockPolyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';
import { polyfill as polyfillReadableStream } from '../src/readable-stream';

jest.mock('web-streams-polyfill/ponyfill/es6', () => ({
    ReadableStream: () => 'ReadableStream',
}), { virtual: true });

test('polyfill ReadableStream', () => {
    polyfillReadableStream(mockPolyfillGlobal);

    expect(mockPolyfillGlobal).toHaveBeenCalled();

    const name = mockPolyfillGlobal.mock.calls[0][0];
    const getImplementation = mockPolyfillGlobal.mock.calls[0][1]?.();

    expect(getImplementation).toBeInstanceOf(Function);
    expect(name).toBe('ReadableStream');
    expect(getImplementation()).toBe('ReadableStream');
});
