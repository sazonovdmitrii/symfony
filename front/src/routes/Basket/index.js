import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
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
    return (
        <Fragment>
            <Helmet>
                <title>Моя корзина</title>
            </Helmet>
            <Query query={GET_BASKET} ssr={false} partialRefetch>
                {({ loading, error, data }) => {
                    if (loading) return <Loader />;

                    return (
                        <Fragment>
                            {error && <ErrorMessage error={error} />}
                            {data && <Component {...data} />}
                        </Fragment>
                    );
                }}
            </Query>
        </Fragment>
    );
};
