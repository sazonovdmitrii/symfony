require('dotenv').config();

// Koa 2 web server.  Handles incoming HTTP requests, and will serve back
// the React render, or any of the static assets being compiled
import Koa from 'koa';
import { mergeWith } from 'lodash';

import middlewares from './middlewares';
import config from './config';

// Catch CTRL/CMD+C interrupts cleanly
process.on('SIGINT', () => {
    process.exit(0);
});

const app = new Koa();

if (process.env.NODE_ENV !== 'production') {
    (async () => {
        /* eslint-disable global-require, import/no-extraneous-dependencies */
        // Koa-specific Webpack handlers
        const webpack = require('webpack');
        const { default: webpackConfig } = require('../../webpack.config.babel');
        const koaWebpack = require('koa-webpack');
        /* eslint-enable global-require, import/no-extraneous-dependencies */

        // Set hot client options
        const hotClient = {
            host: config.host,
        };

        // Is a custom WebSocket defined?
        if (config.websocketPort) {
            hotClient.port = config.websocketPort;
        }

        // Set default options for koaWebpack
        const defaultOptions = {
            compiler: webpack(webpackConfig),
            devMiddleware: {
                logLevel: 'warn',
                publicPath: '/static/',
                // publicPath: '/',
                stats: false,
                writeToDisk(filePath) {
                    return /main/.test(filePath) || /loadable-stats/.test(filePath);
                },
                writeToDisk: true,
            },
            hotClient,
        };

        // Create the middlware, by merging in any overrides
        const middleware = await koaWebpack(defaultOptions);

        // Attach middleware to our passed Koa app
        app.use(middleware);
    })();
}

middlewares(app);

app.listen(config.port, () => {
    config.spinner.succeed(`Graphql server: ${process.env.GRAPHQL}`);
    config.spinner.succeed(`Running on http://${config.host}:${config.port}`);
});
