import 'cross-fetch/polyfill';

import Koa from 'koa';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { StaticRouter } from 'react-router';
import pathToRegexp from 'path-to-regexp';
import knex from 'knex';

import { createClient } from './lib/apollo';
import App from './App';
import output from './lib/output';
import Html from './views/Html';

import routes from './routes/index';

// w8 db 😟
// var db = knex({
//     client: 'pg',
//     connection: {
//         host: 'localhost',
//         port: '5432',
//         user: 'symfony',
//         password: 'symfony',
//         database: 'symfony',
//     },
// });

let virtualUrls = [
    {
        type: 'product',
        url: '/catalog/product.htm',
        to: '/duhi/gucci.htm',
    },
    {
        type: 'catalog',
        url: '/catalog/subcatalog',
        to: '/duhi/gucci',
    },
];

(async url => {
    // w8 db 😟
    // virtualUrls = await db.select('*').from('virtual_url');
})();

export default output => async ctx => {
    const location = ctx.request.url;
    const client = createClient();

    let routerContext = {};

    // check for redirects
    const { to, type } = virtualUrls.find(item => item.url === location) || {};

    if (type && to) {
        // find route by type
        const testRoute = routes.find(item => item.type && item.type === type);

        if (testRoute) {
            routerContext = {
                url: to,
                status: 301,
            };
        }
    }

    const components = (
        <ApolloProvider client={client}>
            <StaticRouter location={location} context={routerContext}>
                <App />
            </StaticRouter>
        </ApolloProvider>
    );

    // Await GraphQL data coming from the API server
    await getDataFromTree(components);

    if ([301, 302].includes(routerContext.status)) {
        // 301 = permanent redirect, 302 = temporary
        ctx.status = routerContext.status;

        // Issue the new `Location:` header
        ctx.redirect(routerContext.url);

        // Return early -- no need to set a response body
        return;
    }

    if (routerContext.status === 404) {
        // By default, just set the status code to 404. You can
        // modify this section to do things like log errors to a
        // third-party, or redirect users to a dedicated 404 page

        ctx.status = 404;
        ctx.body = 'Not found';

        return;
    }

    const html = ReactDOMServer.renderToString(components);
    const reactRender = ReactDOMServer.renderToString(
        <Html
            cssFiles={output.client.main('css')}
            helmet={Helmet.renderStatic()}
            html={html}
            scripts={output.client.main('js')}
            window={{
                __APOLLO__: client.extract(),
            }}
        />
    );

    ctx.type = 'text/html';
    ctx.body = `<!DOCTYPE html>${reactRender}`;
};
