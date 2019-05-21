import React from 'react';
import loadable from '@loadable/component';

import { SEARCH_PRODUCTS } from 'query';
import { withQuery } from 'utils';

import Loader from 'components/Loader';

export default props => {
    const { search } = props.location;
    const searchParams = new URLSearchParams(search);
    const query = searchParams.get('search');

    const rows = [40, 80, 120];
    const searchLimit = parseInt(searchParams.get('rows'), 10);
    const limit = rows.indexOf(searchLimit) >= 0 ? searchLimit : rows[0];

    // return withQuery({ query: SEARCH_PRODUCTS, variables: { query } })(props => {
    //     if (props) {
    const Component = loadable(() => import('./Search'), {
        fallback: Loader,
    });

    return <Component {...props} query={query} rows={rows} limit={limit} />;
    //     }

    //     return <Loader />;
    // });
};
