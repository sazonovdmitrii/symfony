import React from 'react';
import loadable from '@loadable/component';

import { GET_CATALOG } from 'query';
import { withQuery } from 'utils';

import Loader from 'components/Loader';

const Component = loadable(() => import('./Catalog'), {
    fallback: Loader,
});

export default ({ match }) => {
    const slug = Object.values(match.params)
        .reduce((array, item = '') => {
            if (item.match(/page-\d{1,}/)) {
                return array;
            }

            return [...array, item];
        }, [])
        .filter(Boolean)
        .join('/');

    return withQuery({ query: GET_CATALOG, variables: { slug } })(props => (
        <Component {...props} match={match} slug={slug} />
    ));
};
