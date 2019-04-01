// import 'destyle.css';
import './fonts';
import './styles/index.scss';
import './globalStyles.css';

import React from 'react';
import { render, hydrate } from 'react-dom';
import { Router } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createBrowserHistory } from 'history';

import { createClient } from './lib/apollo';
import App from './App';

const root = document.querySelector('#root');
const history = createBrowserHistory();
const client = createClient();

const HotApp = hot(App);

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
