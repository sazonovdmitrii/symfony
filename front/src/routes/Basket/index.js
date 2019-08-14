import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import loadable from '@loadable/component';
import Helmet from 'react-helmet';

import Loader from 'components/Loader';
import ErrorMessage from 'components/Error';

const GET_BASKET = gql`
    query {
        isLoggedIn @client(always: false)
        basket {
            products {
                item_id
                qty
                name
                product_name
                price
            }
        }
        payments_methods {
            data {
                id
                name
            }
        }
        addresses {
            data {
                id
                name
                person
                zip
                region_id
                city
                street
                house
                corp
                level
                flat
                code
            }
        }
        cities {
            data {
                id
                title
                visible
            }
        }
    }
`;

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
