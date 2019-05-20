import React from 'react';
import gql from 'graphql-tag';
import loadable from '@loadable/component';

import { withQuery } from 'utils';

import Loader from 'components/Loader';

const GET_BASKET = gql`
    query Catalog($slug: String!) {
        catalog(slug: $slug) {
            name
            count
        }
    }
`;

export default props => {
    // return withQuery({ query: GET_BASKET, variables: { slug } })(props => {
    //     if (props) {
    const Component = loadable(() => import('./Basket'), {
        fallback: Loader,
    });

    return <Component {...props} />;
    //     }

    //     return <Loader />;
    // });
};
