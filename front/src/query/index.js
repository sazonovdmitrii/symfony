import gql from 'graphql-tag';

import { CatalogPage } from './fragments';

export const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client(always: false)
    }
`;

export const GET_CATALOG = gql`
    query Catalog($slug: String!) {
        catalog(slug: $slug) {
            name
            count
        }
    }
`;

export const GET_USER = gql`
    query User($id: Int!) {
        user(id: $id) {
            email
            session @client {
                isAdmin
                isLoggedIn
                connectionCount
                errors
            }
        }
    }
`;

export const GET_PRODUCT = gql`
    query Product($slug: String!) {
        product(slug: $slug) {
            name
            id
            items(limit: 40, offset: 0) {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const SEARCH_PRODUCTS = gql`
    query Search($query: String!) {
        productsByQuery(query: $query) {
            count
        }
    }
`;

export const GET_PRODUCTS = gql`
    query Products($slug: String!, $offset: Int!, $limit: Int!) {
        catalog(slug: $slug) {
            count
            products(limit: $limit, offset: $offset) {
                edges {
                    node {
                        id
                        name
                        url
                        items(limit: 40, offset: 0) {
                            edges {
                                node {
                                    id
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const GET_ADDRESSES = gql`
    {
        addresses {
            data(limit: 40, offset: 0) {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const GET_BASKET = gql`
    {
        basket {
            id
        }
    }
`;

export const GET_BANNERS = gql`
    query Banners {
        banner {
            data {
                id
                path
                link
            }
        }
    }
`;

export const GET_SALES = gql`
    query Sales($limit: Int) {
        sale(limit: $limit) {
            data {
                id
                start
                finish
                category
                discount
                enabled
                featured
                type
                prior
            }
        }
    }
`;
