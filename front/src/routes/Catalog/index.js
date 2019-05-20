import React from 'react';
import gql from 'graphql-tag';
import loadable from '@loadable/component';

import { withQuery } from 'utils';

import Loader from 'components/Loader';

const GET_CATALOG = gql`
    query Catalog($slug: String!) {
        catalog(slug: $slug) {
            name
            count
        }
    }
`;

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
