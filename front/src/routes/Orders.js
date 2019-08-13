import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { GET_ORDERS } from 'query';

import NotFound from 'routes/NotFound';

import Order from 'components/Order';
import Loader from 'components/Loader';

const Orders = () => {
    return (
        <Query query={GET_ORDERS} ssr={false} partialRefetch>
            {({ loading, error, data: { users_orders } }) => {
                if (loading) return <Loader />;
                if (error) return `Error: ${error}`;

                if (!users_orders.orders.length) return 'Нет заказов';

                return users_orders.orders.map(item => <Order key={item.id} {...item} />);
            }}
        </Query>
    );
};

export default Orders;
