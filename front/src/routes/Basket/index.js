import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import loadable from '@loadable/component';
import Helmet from 'react-helmet';

import { GET_BASKET } from 'query';

import Loader from 'components/Loader';
import ErrorMessage from 'components/Error';

const Component = loadable(() => import('./Basket'), {
    fallback: Loader,
});

export default () => {
    const { loading, error, data } = useQuery(GET_BASKET, { ssr: false });

    if (loading) return <Loader />;
    if (error) return <ErrorMessage error={error} />;

    return (
        <>
            <Helmet>
                <title>Моя корзина</title>
            </Helmet>
            <Component {...data} />
        </>
    );
};
