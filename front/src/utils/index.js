import React, { Fragment } from 'react';
import { Query } from 'react-apollo';

import NotFound from 'routes/NotFound';

import Loader from 'components/Loader';
import ErrorMessage from 'components/Error';

export const isProd = process.env.NODE_ENV === 'production';

export const withQuery = ({ query, variables }) => Component => {
    return (
        <Query query={query} variables={variables}>
            {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) {
                    return (
                        <Fragment>
                            <NotFound />
                            <ErrorMessage error={error} />
                        </Fragment>
                    );
                }
                const newData = Object.values(data).reduce((obj, item) => {
                    return { ...obj, ...item };
                }, {});

                if (newData) {
                    return Component(newData);
                }

                return null;
            }}
        </Query>
    );
};
