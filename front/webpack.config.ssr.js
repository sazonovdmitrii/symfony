const webpack = require('webpack');
const path = require('path');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ManifestPlugin = require('webpack-manifest-plugin');
const nodeModules = require('webpack-node-externals');

const isProd = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.ANALYZE || false;

const cssFilename = isProd ? '[name].[contenthash:8].css' : '[name].css';

const PATHS = {
    polyfills: path.join(__dirname, 'src/polyfills'),
    app: path.join(__dirname, 'src/ssr'),
    build: path.resolve(__dirname, 'dist'), // site/public/ckkz
    public: '/static/',
};

const minify = isProd
    ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
      }
    : false;

const getStyleLoaders = cssOptions => {
    const loaders = [
        // MiniCssExtractPlugin.loader,
        {
            loader: require.resolve('css-loader'),
            options: {
                ...cssOptions,
                sourceMap: false,
                exportOnlyLocals: true,
            },
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                ident: 'postcss',
                plugins: [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {
                            flexbox: 'no-2009',
                        },
                        preserve: false,
                        stage: 0,
                        importFrom: './src/base.css',
                    }),
                    require('postcss-hexrgba'),
                    require('postcss-color-function'),
                ],
            },
        },
    ];
    return loaders;
};

const config = {
    target: 'node',
    mode: isProd ? 'production' : 'development',
    bail: isProd,
    devtool: isProd ? '' : 'cheap-module-source-map',
    entry: [PATHS.app],
    output: {
        path: PATHS.build,
        publicPath: PATHS.public,
        filename: 'server.js',
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
                        loader: require.resolve('babel-loader'),
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
                        loader: getStyleLoaders({
                            importLoaders: 1,
                            localIdentName: '[folder]__[local]__[hash:base64:5]',
                            modules: true,
                        }),
                    },
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [/\.(ejs|js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.scss$/],
                        options: {
                            emitFile: false,
                            name: 'media/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            GRAPHQL: JSON.stringify(process.env.DOCKER_GRAPHQL || process.env.GRAPHQL),
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
        alias: isProd
            ? {
                  'lodash-es': 'lodash',
              }
            : {},
    },
    externals: nodeModules(),
    performance: false,
};

module.exports = config;
