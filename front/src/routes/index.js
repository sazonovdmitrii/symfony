import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';
import Loadable from 'react-loadable';

import NotFound from './NotFound';
import Loader from 'components/Loader';

const getComponent = (component, async = true) => {
    if (async) {
        return Loadable({ loading: Loader, loader: () => import(`${component}`) });
    } else {
        return require(`${component}`).default;
    }
};

export default [
    {
        component: getComponent('./Home'),
        exact: true,
        path: '/',
    },
    {
        path: '/(articles|news)',
        exact: true,
        component: getComponent('./Articles'),
    },
    {
        path: '/(articles|news)/:slug.htm',
        exact: true,
        component: getComponent('./Article'),
    },
    {
        path: '/info/:slug.htm?',
        exact: true,
        component: getComponent('./Content'),
    },
    {
        path: '/basket',
        exact: true,
        component: getComponent('./Basket'),
    },
    {
        path: '/user/:slug?',
        exact: true,
        component: getComponent('./User'),
    },
    {
        path: '/brands',
        exact: true,
        component: getComponent('./Brands'),
    },
    {
        path: '/sales',
        exact: true,
        component: getComponent('./Sales'),
    },
    {
        path: '/sales/:slug',
        exact: true,
        component: getComponent('./Sale'),
    },
    {
        path: '/search',
        exact: true,
        component: getComponent('./Search'),
    },
    {
        path: ['/order/:id'],
        exact: true,
        component: getComponent('./Order'),
    },
    {
        path: ['/sales-leader/'],
        exact: true,
        component: getComponent('./SalesLeader', false),
    },
    {
        type: 'product',
        path: ['/:product.htm', '/:catalog/:product.htm', '/:catalog/:subcatalog/:product.htm'],
        exact: true,
        component: getComponent('./Product'),
    },
    {
        type: 'catalog',
        path: '/:catalog/:subcatalog?/:filter?',
        exact: true,
        component: getComponent('./Catalog'),
    },
    {
        component: NotFound,
    },
];
