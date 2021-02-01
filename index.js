export default () => {
    [
        require('./src/base64'),
        require('./src/encoding'),
        require('./src/readable-stream'),
        require('./src/url'),
        require('./src/fetch'),
        require('./src/crypto'),
    ].forEach(({ polyfill }) => polyfill());
};
