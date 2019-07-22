import React from 'react';
import gql from 'graphql-tag';
import loadable from '@loadable/component';

import { GET_PRODUCT } from 'query';
import { withQuery } from 'utils';

import Loader from 'components/Loader';

const Component = loadable(() => import('./Product'), {
    fallback: Loader,
});

export default props => {
    const { url } = props.match;
    const slug = url.slice(1);

    return withQuery({ query: GET_PRODUCT, variables: { slug } })(data => <Component {...props} {...data} />);
};
