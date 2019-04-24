const webpack = require('webpack');
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const nodeModules = require('webpack-node-externals');

const isProd = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.ANALYZE || false;

const cssFilename = isProd ? '[name].[contenthash:8].css' : '[name].css';

const PATHS = {
    polyfills: path.join(__dirname, 'src/polyfills'),
    app: path.join(__dirname, 'src/ssr'),
    build: path.resolve(__dirname, 'dist/public'),
    public: '/',
};

module.exports = {
    name: 'server',
    target: 'node',
    mode: isProd ? 'production' : 'development',
    bail: isProd,
    devtool: isProd ? '' : 'cheap-module-source-map',
    entry: [PATHS.app],
    output: {
        path: PATHS.build,
        publicPath: PATHS.public,
        filename: '../server.js',
        libraryTarget: 'commonjs2',
    },
    optimization: {
        minimize: isProd,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        pure_funcs: ['console.log'],
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
                parallel: true,
                cache: true,
                sourceMap: false,
            }),
        ],
        concatenateModules: isProd,
        noEmitOnErrors: isProd,
        namedModules: !isProd,
        runtimeChunk: false,
        splitChunks: false,
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                parser: {
                    requireEnsure: false,
                },
            },
            {
                oneOf: [
                    {
                        test: /\.(mjs|js|jsx)$/,
                        loader: 'babel-loader',
                        options: {
                            compact: isProd,
                            cacheCompression: isProd,
                            cacheDirectory: true,
                        },
                    },
                    {
                        test: /\.svg$/,
                        use: '@svgr/webpack',
                    },
                    {
                        test: /\.css$/,
                        loader: 'css-loader',
                        options: {
                            localIdentName: '[folder]__[local]__[hash:base64:5]',
                            modules: true,
                            sourceMap: false,
                            exportOnlyLocals: true,
                        },
                    },
                    {
                        loader: 'file-loader',
                        exclude: [/\.(ejs|js|jsx|mjs)$/, /\.json$/],
                        options: {
                            emitFile: false,
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            GRAPHQL: JSON.stringify(process.env.DOCKER_GRAPHQL || process.env.GRAPHQL),
            DATABASE: JSON.stringify(process.env.DOCKER_DATABASE || process.env.DATABASE),
            SERVER: true,
            SEOHIDE: true,
            WS_SUBSCRIPTIONS: JSON.stringify(process.env.WS_SUBSCRIPTIONS),
            LOCAL_STORAGE_KEY: JSON.stringify(process.env.LOCAL_STORAGE_KEY),
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ],
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules', 'src'],
    },
    externals: nodeModules(),
    // performance: false,
};
