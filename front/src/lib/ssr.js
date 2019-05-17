import 'cross-fetch/polyfill';

import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { StaticRouter } from 'react-router';
import knex from 'knex';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import Html from './Html';
import config from './config';
// import routes from './routes/index';

export default async ctx => {
    const location = ctx.request.url;
    // get token from cookies 🍪
    const token = ctx.cookies.get('token');
    const client = config.client({ token });

    const nodeExtractor = new ChunkExtractor({ statsFile: config.nodeStats });
    const { default: App } = nodeExtractor.requireEntrypoint();
    // We create an extractor from the statsFile
    const webExtractor = new ChunkExtractor({ statsFile: config.webStats });

    console.log(location, '🤔');
    // console.log(webExtractor.getScriptElements());

    // let url = await db('virtualurl').where('url', location);
    // let url = null;

    // check for product/catalog
    // if (!url) {
    //     const isProduct = /\.htm$/.test(location);
    //     const type = isProduct ? 'product' : 'catalog';
    //     const database = isProduct ? 'producturl' : 'catalogurl';
    //     const [row] = await db(database).where('url', location.replace(/^\//, ''));
    //     url = row ? row.url : null;
    //     url && console.log(url, '// url is in the database 👍');
    // }

    // TODO make redirect
    // if (url) {
    //     // find route by type
    //     // const testRoute = routes.find(item => item.type && item.type === type);

    //     routerContext = {
    //         url: `/${url}`,
    //         status: 301,
    //     };
    // }

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
    }

    if ([301, 302].includes(routerContext.statusCode)) {
        // 301 = permanent redirect, 302 = temporary
        ctx.statusCode = routerContext.statusCode;

        // Issue the new `Location:` header
        ctx.redirect(routerContext.url);

        // Return early -- no need to set a response body
        return;
    }

    console.log('ssr: ', routerContext);

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
