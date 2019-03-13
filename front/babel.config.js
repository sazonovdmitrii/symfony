module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: false,
            },
        ],
        [
            '@babel/preset-react',
            {
                useBuiltIns: true,
            },
        ],
    ],
    plugins: [
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-syntax-dynamic-import',
        [
            '@babel/plugin-proposal-class-properties',
            {
                loose: true,
            },
        ],
        [
            '@babel/plugin-proposal-object-rest-spread',
            {
                loose: true,
                useBuiltIns: true,
            },
        ],
        [
            'transform-react-remove-prop-types',
            {
                removeImport: true,
            },
        ],
    ],
};
