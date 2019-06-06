import './polyfills';
// import 'destyle.css';
import './fonts';
import './globalStyles.css';
import './styles/index.scss';

import React from 'react';
import { render, hydrate } from 'react-dom';
import { Router } from 'react-router';
import { hot } from 'react-hot-loader/root';
import { ApolloProvider } from 'react-apollo';
import { createBrowserHistory } from 'history';
import hardtack from 'hardtack';
import { loadableReady } from '@loadable/component';

import { isProd, createSessionKey } from 'utils';
import { createClient } from './lib/apollo';
import App from './App';

const history = createBrowserHistory();

const sessionKey = hardtack.get('session_key');
if (!sessionKey) createSessionKey();

// get token from cookies 🍪
const token = hardtack.get('token');
const client = createClient({ token });
const HotApp = hot(App);

loadableReady(() => {
    const root = document.querySelector('#root');
    const app = (
        <ApolloProvider client={client}>
            <Router history={history}>
                <HotApp />
            </Router>
        </ApolloProvider>
    );

    if (root.hasChildNodes()) {
        hydrate(app, root);
    } else {
        render(app, root);
    }
});
