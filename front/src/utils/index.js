import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Route } from 'react-router-dom';

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

export const RouteStatus = props => (
    <Route
        render={({ staticContext }) => {
            // we have to check if staticContext exists
            // because it will be undefined if rendered through a BrowserRouter
            if (staticContext) {
                staticContext.statusCode = props.statusCode;
            }

            return <div>{props.children}</div>;
        }}
    />
);
