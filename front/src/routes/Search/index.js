import React from 'react';
import gql from 'graphql-tag';
import loadable from '@loadable/component';

import { withQuery } from 'utils';

import Loader from 'components/Loader';

const GET_PRODUCTS = gql`
    query Search($query: String!) {
        productsByQuery(query: $query) {
            count
        }
    }
`;

export default props => {
    const { search } = props.location;
    const searchParams = new URLSearchParams(search);
    const query = searchParams.get('search');

    const rows = [40, 80, 120];
    const searchLimit = parseInt(searchParams.get('rows'), 10);
    console.log(searchLimit);
    const limit = rows.indexOf(searchLimit) >= 0 ? searchLimit : rows[0];

    // return withQuery({ query: GET_PRODUCTS, variables: { query } })(props => {
    //     if (props) {
    const Component = loadable(() => import('./Search'), {
        fallback: Loader,
    });

    console.log(limit, typeof limit);

    return <Component {...props} query={query} rows={rows} limit={limit} />;
    //     }

    //     return <Loader />;
    // });
};
