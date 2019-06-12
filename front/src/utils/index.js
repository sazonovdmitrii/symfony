import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import nanoid from 'nanoid';
import hardtack from 'hardtack';

import SEO from 'globalMeta';

import NotFound from 'routes/NotFound';

import Loader from 'components/Loader';
import ErrorMessage from 'components/Error';

export const isProd = process.env.NODE_ENV === 'production';

export const createSessionKey = () => {
    const date = new Date();
    const currentYear = date.getFullYear();

    date.setFullYear(currentYear + 1);
    hardtack.set('session_key', nanoid(), {
        path: '/',
        expires: date.toUTCString(),
    });
};

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

export const seoHead = (type, props) => {
    const { url } = props;
    const { title, description, keywords, locale = 'ru_RU', ogType = 'website' } = SEO[type](props);

    return (
        <Helmet>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={`https://laparfumerie.ru${url}`} />
            <meta property="og:site_name" content={SEO.fullSiteName} />
            <meta property="og:locale" content={locale} />
        </Helmet>
    );
};
