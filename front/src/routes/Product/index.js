import React from 'react';
import gql from 'graphql-tag';
import loadable from '@loadable/component';

import { withQuery } from 'utils';

import Loader from 'components/Loader';

const GET_PRODUCT = gql`
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

const Component = loadable(() => import('./Product'), {
    fallback: Loader,
});

export default props => {
    const { url } = props.match;
    const slug = url.slice(1);

    return withQuery({ query: GET_PRODUCT, variables: { slug } })(props => <Component {...props} />);
};
