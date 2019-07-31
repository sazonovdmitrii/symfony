import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import loadable from '@loadable/component';

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
        directions {
            data {
                id
                avarda_id
                title
                price
                delivery_days
                visible
                comment
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
    }
`;

const Component = loadable(() => import('./Basket'), {
    fallback: Loader,
});

export default () => {
    return (
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
    );
};
