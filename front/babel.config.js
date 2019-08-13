const isProd = process.env.NODE_ENV === 'production';
const isServer = !!process.env.SERVER;

const isWebTarget = caller => Boolean(caller && caller.target === 'web');
const isWebpack = caller => Boolean(caller && caller.name === 'babel-loader');

// todo try ejsx for ssr
module.exports = api => {
    const web = api.caller(isWebTarget);
    const webpack = api.caller(isWebpack);

    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: webpack ? false : 'commonjs',
                    useBuiltIns: false,
                    targets: !web ? { node: 'current' } : undefined,
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
            '@loadable/babel-plugin',
            'babel-plugin-transform-minify-gql-template-literals',
        ].filter(Boolean),
    };
};
