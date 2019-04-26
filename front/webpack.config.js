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

const isProd = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.ANALYZE || false;

const cssFilename = isProd ? '[name].[contenthash:8].css' : '[name].css';

console.log(process.env.GRAPHQL);
require('dotenv').config();

const PATHS = {
    polyfills: path.join(__dirname, 'src/polyfills'),
    app: path.join(__dirname, 'src'),
    build: path.resolve(__dirname, 'dist/public/static'),
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

const getStyleLoaders = (cssOptions, preprocessor) => {
    const loaders = [
        !isProd && require.resolve('css-hot-loader'),
        MiniCssExtractPlugin.loader,
        {
            loader: require.resolve('css-loader'),
            options: {
                ...cssOptions,
                sourceMap: false,
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
        preprocessor && preprocessor,
    ].filter(Boolean);
    return loaders;
};

const config = {
    name: 'client',
    mode: isProd ? 'production' : 'development',
    bail: isProd,
    devtool: isProd ? '' : 'cheap-module-source-map',
    entry: {
        app: [PATHS.polyfills, PATHS.app],
    },
    output: {
        path: PATHS.build,
        publicPath: PATHS.public,
        filename: isProd ? '[name].[contenthash:8].js' : '[name].js',
        chunkFilename: isProd ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js',
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
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    discardComments: {
                        removeAll: true,
                    },
                    // map: {
                    //     inline: false,
                    //     annotation: true,
                    // },
                },
            }),
        ],
        concatenateModules: isProd,
        noEmitOnErrors: isProd,
        namedModules: !isProd,
        runtimeChunk: isProd ? 'single' : false,
        splitChunks: isProd
            ? {
                  chunks: 'all',
                  // name: 'vendors',
                  maxInitialRequests: 20, // for HTTP2
                  maxAsyncRequests: 20, // for HTTP2
              }
            : false,
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
                        use: require.resolve('@svgr/webpack'),
                    },
                    {
                        test: /\.css$/,
                        loader: getStyleLoaders({
                            importLoaders: 1,
                            localIdentName: '[folder]__[local]__[hash:base64:5]',
                            modules: true,
                            url: true,
                        }),
                    },
                    {
                        test: /\.scss$/,
                        loader: getStyleLoaders(
                            {
                                importLoaders: 2,
                                modules: false,
                                url: true,
                            },
                            'sass-loader'
                        ),
                        sideEffects: true,
                    },
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [/\.(ejs|js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.scss$/],
                        options: {
                            name: 'media/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: cssFilename,
            disable: !isProd,
        }),
        new webpack.DefinePlugin({
            GRAPHQL: JSON.stringify(process.env.GRAPHQL),
            DATABASE: JSON.stringify(process.env.DATABASE),
            SERVER: false,
            SEOHIDE: false,
            WS_SUBSCRIPTIONS: JSON.stringify(process.env.WS_SUBSCRIPTIONS),
            LOCAL_STORAGE_KEY: JSON.stringify(process.env.LOCAL_STORAGE_KEY),
        }),
        new HtmlWebpackPlugin({
            minify,
            inject: false,
            alwaysWriteToDisk: true,
            filename: path.resolve(__dirname, 'dist/public/index.html'),
            template: 'src/views/static.html',
        }),
        new HtmlWebpackHarddiskPlugin(),
    ],
    stats: {
        hash: false,
        version: false,
        children: false,
        modules: false,
        warnings: false,
        entrypoints: false,
    },
    resolve: {
        extensions: ['.scss', '.js'],
        modules: ['node_modules', 'src'],
        alias: isProd
            ? {
                  'lodash-es': 'lodash',
              }
            : {},
    },
    node: {
        setImmediate: false,
        // process: !isProd,
        module: 'empty',
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
};

if (isProd) {
    config.plugins.push(new CleanWebpackPlugin());
} else {
    config.plugins.push(new CaseSensitivePathsPlugin());
}

if (isAnalyze) {
    config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
