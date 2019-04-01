// Hot server middleware

// ----------------------------------------------------------------------------
// IMPORTS

/* Node */
import fs from 'fs';
import path from 'path';

/* NPM */
import Koa from 'koa';
import requireFromString from 'require-from-string';
import sourceMapSupport from 'source-map-support';
import webpack from 'webpack';

/* Launch.js */
import Output from './output';
import Stats from './stats';

// ----------------------------------------------------------------------------

// Create a Koa handler
const createKoaHandler = (error, serverRenderer) => (ctx, next) => {
    if (error) {
        ctx.throw(error);
    }
    return serverRenderer(ctx, next);
};

const isMultiCompiler = compiler => {
    // Duck typing as `instanceof MultiCompiler` fails when npm decides to
    // install multiple instances of webpack.
    return compiler && compiler.compilers;
};

const findCompiler = (multiCompiler, name) =>
    multiCompiler.compilers.filter(compiler => compiler.name.indexOf(name) === 0);

const findStats = (multiStats, name) =>
    multiStats.stats.filter(stats => stats.compilation.name.indexOf(name) === 0);

function getFilename(serverStats, outputPath) {
    const assetsByChunkName = serverStats.toJson().assetsByChunkName;
    const filename = assetsByChunkName.main || '';
    // If source maps are generated `assetsByChunkName.main`
    // will be an array of filenames.
    return path.join(
        outputPath,
        Array.isArray(filename) ? filename.find(asset => /\.js$/.test(asset)) : filename
    );
}

function getServerRenderer(filename, buffer, output) {
    const errMessage = `The "server" compiler must export a function in the form of \`(output: Output) => (ctx: Koa.Context, next: () => Promise<any>) => void\``;

    const outputRenderer = requireFromString(buffer.toString(), filename).default;
    if (typeof outputRenderer !== 'function') {
        throw new Error(errMessage);
    }

    const serverRenderer = outputRenderer(output);
    if (typeof serverRenderer !== 'function') {
        throw new Error(errMessage);
    }

    return serverRenderer;
}

function installSourceMapSupport(filesystem) {
    sourceMapSupport.install({
        // NOTE: If https://github.com/evanw/node-source-map-support/pull/149
        // lands we can be less aggressive and explicitly invalidate the source
        // map cache when Webpack recompiles.
        emptyCacheBetweenOperations: true,
        retrieveFile(source) {
            try {
                return filesystem.readFileSync(source, 'utf8');
            } catch (ex) {
                // Doesn't exist
                return '';
            }
        },
    });
}

/**
 * Passes the request to the most up to date "server" bundle.
 * NOTE: This must be mounted after webpackDevMiddleware to ensure this
 * middleware doesn't get called until the compilation is complete.
 */
function webpackHotServerMiddleware(multiCompiler) {
    if (!isMultiCompiler(multiCompiler)) {
        throw new Error(`Expected webpack compiler to contain both a "client" and/or "server" config`);
    }

    const serverCompiler = findCompiler(multiCompiler, 'server')[0];
    const clientCompilers = findCompiler(multiCompiler, 'client');

    const outputFs = serverCompiler.outputFileSystem;
    const outputPath = serverCompiler.outputPath;

    installSourceMapSupport(outputFs);

    let serverRenderer;
    let error = false;

    const doneHandler = multiStats => {
        error = false;

        const serverStats = findStats(multiStats, 'server')[0];
        // Server compilation errors need to be propagated to the client.
        if (serverStats.compilation.errors.length) {
            error = serverStats.compilation.errors[0];
            return;
        }

        let clientStatsJson = null;

        if (clientCompilers.length) {
            const clientStats = findStats(multiStats, 'client');
            clientStatsJson = clientStats.map(obj => obj.toJson());

            if (clientStatsJson.length === 1) {
                clientStatsJson = clientStatsJson[0];
            }
        }

        const filename = getFilename(serverStats, outputPath);
        const buffer = outputFs.readFileSync(filename);

        // Create an `Output` instance, containing our client/server stats
        const output = new Output({
            client: new Stats(clientStatsJson),
            server: new Stats(serverStats.toJson()),
        });

        try {
            serverRenderer = getServerRenderer(filename, buffer, output);
        } catch (ex) {
            error = ex;
        }
    };

    // Webpack 4
    multiCompiler.hooks.done.tap('WebpackHotServerMiddleware', doneHandler);

    return function createHandler() {
        return createKoaHandler(error, serverRenderer).apply(null, arguments);
    };
}

export default webpackHotServerMiddleware;
