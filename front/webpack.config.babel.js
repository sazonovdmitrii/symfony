import path from 'path';
import webpack from 'webpack';

import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import nodeExternals from 'webpack-node-externals';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import safePostCssParser from 'postcss-safe-parser';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.ANALYZE || false;

const cssFilename = isProd ? '[name].[contenthash:8].css' : '[name].css';

const PATHS = {
    node: path.join(__dirname, 'dist/node'),
    web: path.join(__dirname, 'dist/public/static'),
    public: '/static/',
};

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

const getConfig = target => {
    const isNode = target === 'node';

    return {
        target,
        name: target,
        mode: isProd ? 'production' : 'development',
        devtool: isProd ? '' : 'cheap-module-source-map',
        entry: [path.join(__dirname, `src/main-${target}`)],
        output: {
            path: PATHS[target],
            filename: isProd ? '[name].[contenthash:8].js' : '[name].js',
            chunkFilename: isProd ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js',
            publicPath: `/static/`,
            libraryTarget: target === 'node' ? 'commonjs2' : undefined,
        },
        optimization: !isNode
            ? {
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
              }
            : undefined,
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
                            test: /\.(js|jsx)$/,
                            loader: require.resolve('babel-loader'),
                            options: {
                                compact: isProd,
                                cacheCompression: isProd,
                                cacheDirectory: true,
                                caller: { target },
                            },
                        },
                        {
                            test: /\.svg$/,
                            use: require.resolve('@svgr/webpack'),
                        },
                        isNode && {
                            test: /\.css$/,
                            loader: 'css-loader',
                            options: {
                                localIdentName: '[folder]__[local]__[hash:base64:5]',
                                modules: true,
                                sourceMap: false,
                                exportOnlyLocals: true,
                                url: true,
                            },
                        },
                        !isNode && {
                            test: /\.css$/,
                            loader: getStyleLoaders({
                                importLoaders: 1,
                                localIdentName: '[folder]__[local]__[hash:base64:5]',
                                modules: true,
                                url: true,
                            }),
                        },
                        !isNode && {
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
                            exclude: [/\.(ejs|js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.css$/],
                            options: {
                                emitFile: !isNode,
                                name: 'media/[name].[hash:8].[ext]',
                            },
                        },
                    ].filter(Boolean),
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.GRAPHQL': JSON.stringify(process.env.DOCKER_GRAPHQL || process.env.GRAPHQL),
                'process.env.DB_HOST': JSON.stringify(process.env.DOCKER_DATABASE || process.env.DB_HOST),
                'process.env.SERVER': isNode,
                SERVER: isNode,
                SEOHIDE: !isNode,
            }),
            isNode
                ? new webpack.optimize.LimitChunkCountPlugin({
                      maxChunks: 1,
                  })
                : new MiniCssExtractPlugin({
                      filename: cssFilename,
                  }),
            new LoadablePlugin({
                writeToDisk: isNode,
            }),
            isProd
                ? new CleanWebpackPlugin([PATHS[target]], {
                      beforeEmit: true,
                      verbose: true,
                  })
                : new CaseSensitivePathsPlugin(),
            isAnalyze && !isNode && new BundleAnalyzerPlugin(),
            // new webpack.HashedModuleIdsPlugin({
            //     hashFunction: 'md4',
            //     hashDigest: 'base64',
            //     hashDigestLength: 4,
            // }),
        ].filter(Boolean),
        resolve: {
            extensions: ['.js'],
            modules: ['node_modules', 'src'],
            alias: isProd
                ? {
                      'lodash-es': 'lodash',
                  }
                : {},
        },
        externals: isNode ? ['@loadable/component', nodeExternals()] : undefined,
        stats: {
            hash: false,
            version: false,
            children: false,
            modules: false,
            warnings: false,
            entrypoints: false,
        },
        performance: false,
        // node: !isNode
        //     ? {
        //           setImmediate: false,
        //           process: !isProd,
        //           module: 'empty',
        //           dgram: 'empty',
        //           fs: 'empty',
        //           net: 'empty',
        //           tls: 'empty',
        //           child_process: 'empty',
        //       }
        //     : undefined,
    };
};

export default [getConfig('node'), getConfig('web')];
