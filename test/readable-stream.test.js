import { polyfillGlobal as mockPolyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';
import { polyfill as polyfillReadableStream } from '../src/readable-stream';

jest.mock('react-native/Libraries/Utilities/PolyfillFunctions', () => ({
    polyfillGlobal: jest.fn(),
}));

test('polyfill ReadableStream', () => {
    polyfillReadableStream(mockPolyfillGlobal);

    expect(mockPolyfillGlobal).toHaveBeenCalled();

    const name = mockPolyfillGlobal.mock.calls[0][0];
    const ReadableStream = mockPolyfillGlobal.mock.calls[0][1]?.();

    expect(name).toBe('ReadableStream');
    expect(new ReadableStream()).toBeInstanceOf(Object);
    expect(ReadableStream.prototype.getReader).toBeInstanceOf(Function);
});
