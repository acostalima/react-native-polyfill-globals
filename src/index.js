export default (polyfillRNGlobal) => {
    [
        require('./base-64'),
        require('./bigint'),
        require('./encoding'),
        require('./readable-stream'),
        require('./form-data'),
        require('./url'),
    ].forEach((polyfill) => polyfill(polyfillRNGlobal));
};
