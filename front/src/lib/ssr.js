import 'cross-fetch/polyfill';

import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { StaticRouter } from 'react-router';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import jwt from 'jsonwebtoken';

import Html from './Html';
import ErrorPage from './500';
import config from './config';

const checkToken = token => {
    const pathToCert = path.join('../config/jwt/public.pem');
    const cert = fs.readFileSync(pathToCert);

    try {
        return jwt.verify(token, cert);
    } catch (e) {
        return;
    }
};

export default async ctx => {
    const location = ctx.request.url;
    // get token from cookies 🍪
    const token = checkToken(ctx.cookies.get('token'));
    const client = config.client({ token });

    const nodeExtractor = new ChunkExtractor({ statsFile: config.nodeStats });
    const { default: App } = nodeExtractor.requireEntrypoint();
    // We create an extractor from the statsFile
    const webExtractor = new ChunkExtractor({ statsFile: config.webStats });

    let routerContext = {};
    const components = (
        <ChunkExtractorManager extractor={webExtractor}>
            <ApolloProvider client={client}>
                <StaticRouter location={location} context={routerContext}>
                    <App />
                </StaticRouter>
            </ApolloProvider>
        </ChunkExtractorManager>
    );

    // Await GraphQL data coming from the API server
    try {
        await getDataFromTree(components);
    } catch (error) {
        // Prevent GraphQL client errors from crashing SSR.
        console.error('Error while running `getDataFromTree`', error, location);
        // const errorRender = renderToString(
        //     <ErrorPage helmet={Helmet.renderStatic()} bundle={webExtractor} />
        // );

        // ctx.status = 500;
        // ctx.body = `<!DOCTYPE html>${errorRender}`;

        // return;
    }

    if ([301, 302].includes(routerContext.statusCode)) {
        // 301 = permanent redirect, 302 = temporary
        ctx.statusCode = routerContext.statusCode;

        // Issue the new `Location:` header
        ctx.redirect(routerContext.url);

        // Return early -- no need to set a response body
        return;
    }

    if (routerContext.statusCode === 404) {
        // By default, just set the statusCode to 404. You can
        // modify this section to do things like log errors to a
        // third-party, or redirect users to a dedicated 404 page

        ctx.status = 404;
        // ctx.body = 'Not found';

        // return;
    }

    const html = renderToString(components);
    const reactRender = renderToString(
        <Html
            html={html}
            helmet={Helmet.renderStatic()}
            bundle={webExtractor}
            window={{
                __APOLLO__: client.extract(),
            }}
        />
    );

    ctx.type = 'text/html';
    ctx.body = `<!DOCTYPE html>${reactRender}`;
};
