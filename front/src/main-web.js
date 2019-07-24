import './polyfills';
// import 'destyle.css';
import './fonts';
import './styles/index.scss';
import './globalStyles.css';

import React from 'react';
import { render, hydrate } from 'react-dom';
import { Router } from 'react-router';
import { hot } from 'react-hot-loader/root';
import { ApolloProvider } from 'react-apollo';
import { createBrowserHistory } from 'history';
import hardtack from 'hardtack';
import { loadableReady } from '@loadable/component';

import { isProd, createSessionKey } from 'utils';
import { useApp } from 'hooks';
import { AppProvider } from 'AppContext';

import App from './App';

const history = createBrowserHistory();

const sessionKey = hardtack.get('session_key');
if (!sessionKey) createSessionKey();

// get token from cookies 🍪
const HotApp = hot(App);

const RootApp = () => {
    const { client } = useApp();

    return (
        <ApolloProvider client={client}>
            <Router history={history}>
                <HotApp />
            </Router>
        </ApolloProvider>
    );
};

loadableReady(() => {
    const root = document.querySelector('#root');
    const app = (
        <AppProvider>
            <RootApp />
        </AppProvider>
    );

    if (root.hasChildNodes()) {
        hydrate(app, root);
    } else {
        render(app, root);
    }
});
