// import 'destyle.css';
// import './globalStyles.css';
import './fonts';
import './styles/index.scss';

import React from 'react';
import { render, hydrate } from 'react-dom';
import { Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import createBrowserHistory from 'history/createBrowserHistory';

import { createClient } from './lib/apollo';
import App from './App';

const root = document.querySelector('#root');
const history = createBrowserHistory();
const client = createClient();

const app = (
    <ApolloProvider client={client}>
        <Router history={history}>
            <App />
        </Router>
    </ApolloProvider>
);

if (root.hasChildNodes()) {
    hydrate(app, root);
} else {
    render(app, root);
}
