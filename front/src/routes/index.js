import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';

import Home from './Home';
import NotFound from './NotFound';
import Catalog from './Catalog';
import Content from './Content';
import Articles from './Articles';
import Article from './Article';
import Product from './Product';
import Sales from './Sales';
import Sale from './Sale';
import Brands from './Brands';
import User from './User';
import Basket from './Basket';


const component = props => {
    console.log(props);
    const { first, second } = props.match.params;
    const route = second ? getContent(first, second) : getRoute(first);

    return route;
};

const getRoute = (param = '') => {
    switch (param) {
        case 'basket':
            return <Basket />;
        case 'info':
            return <Content />;
        case 'user':
            return <User />;
        case 'brands':
            return <Brands />;
        case 'sales':
            return <Sales />;
        case 'articles':
        case 'news':
            return <Articles />;
        default:
            return <Product />;
            return <Catalog />;
    }
};

const getContent = (first = '', second) => {
    switch (first) {
        case 'info':
            return <Content />;
        case 'user':
            switch (second) {
                case 'personal':
                case 'addressbook':
                case 'security':
                case 'orders':
                    return <User />;
            }
        case 'sales':
            return <Sale />;
        case 'articles':
        case 'news':
            return <Article />;
        default:
            return <Catalog />;
    }
};

export default [
    {
        component: Home,
        exact: true,
        path: '/',
    },
    {
        component,
        exact: true,
        path: '/:first',
    },
    {
        component,
        exact: true,
        path: '/:first/:second',
    },
    {
        component: NotFound,
    },
];
