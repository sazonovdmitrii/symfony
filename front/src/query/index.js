import gql from 'graphql-tag';

import { Address } from './fragments';

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
            tags {
                id
                name
                childrens {
                    id
                    name
                    count
                }
            }
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
                        price
                    }
                }
            }
            tags {
                name
                value
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
                                    price
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const GET_ADDRESS = gql`
    query Address($id: Int!) {
        address(id: $id) {
            id
        }
    }
`;

export const GET_ADDRESSES = gql`
    {
        addresses {
            data {
                id
                name
                user_id
                person
                zip
                region_id
                city
                street
                house
                corp
                level
                flat
                code
                active
            }
        }
    }
`;

export const GET_SHORT_BASKET = gql`
    query Basket {
        basket {
            products {
                item_id
                qty
                name
                product_name
                price
            }
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
