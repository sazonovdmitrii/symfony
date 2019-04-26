const isProd = process.env.NODE_ENV === 'production';
const isServer = process.env.SERVER;

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: false,
                targets:
                    isServer || !isProd
                        ? {
                              node: 'current',
                          }
                        : {},
                ignoreBrowserslistConfig: isServer || !isProd,
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
        (isServer || isProd) && [
            'transform-react-remove-prop-types',
            {
                removeImport: true,
            },
        ],
    ].filter(Boolean),
};
