import 'cross-fetch/polyfill';

import Koa from 'koa';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { StaticRouter } from 'react-router';

import { createClient } from './lib/apollo';
import App from './App';
import output from './lib/output';
import Html from './views/Html';

export default output => async ctx => {
    const client = createClient();

    const routerContext = {};

    const components = (
        <ApolloProvider client={client}>
            <StaticRouter location={ctx.request.url} context={routerContext}>
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
