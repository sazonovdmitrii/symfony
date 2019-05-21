import React from 'react';
import loadable from '@loadable/component';

import { GET_CATALOG } from 'query';
import { withQuery } from 'utils';

import Loader from 'components/Loader';

export default props => {
    const { match, limit } = props;

    let isPage;
    const slug = Object.values(match.params)
        .reduce((array, item = '') => {
            if (item.match(/page-\d{1,}/)) {
                isPage = item;
                return array;
            }

            return [...array, item];
        }, [])
        .filter(Boolean)
        .join('/');

    return withQuery({ query: GET_CATALOG, variables: { slug } })(props => {
        if (props) {
            const Component = loadable(() => import('./Catalog'), {
                fallback: Loader,
            });

            return <Component {...props} match={match} slug={slug} />;
        }

        return <Loader />;
    });
};
