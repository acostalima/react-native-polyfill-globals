'use strict';

const { baseConfig, compose } = require('@moxy/jest-config-base');
const withReactNative = require('@moxy/jest-config-react-native');

module.exports = compose(
    baseConfig('node'),
    withReactNative(),
    (config) => ({
        ...config,
        setupFilesAfterEnv: [
            ...config.setupFilesAfterEnv,
            'jest-extended',
        ],
    }),
);
