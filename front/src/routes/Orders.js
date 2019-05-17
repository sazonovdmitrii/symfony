import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import NotFound from 'routes/NotFound';

import Order from 'components/Order';
import Loader from 'components/Loader';

const GET_ORDERS = gql`
    {
        orders {
            id
            name
        }
    }
`;

const Orders = () => {
    return (
        <Query query={GET_ORDERS}>
            {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) return `Error: ${error}`;

                return data.orders.map(item => <Order key={item.id} {...item} />);
            }}
        </Query>
    );
};

export default Orders;
