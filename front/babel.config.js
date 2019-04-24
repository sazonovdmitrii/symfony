const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: false,
                targets: !isProd
                    ? {
                          node: 'current',
                      }
                    : {},
                ignoreBrowserslistConfig: !isProd,
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
        isProd && [
            'transform-react-remove-prop-types',
            {
                removeImport: true,
            },
        ],
    ].filter(Boolean),
};
