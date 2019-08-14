import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_ORDERS } from 'query';

import Order from 'components/Order';
import Loader from 'components/Loader';

const Orders = () => {
    const {
        loading,
        error,
        data: { users_orders },
    } = useQuery(GET_ORDERS, { ssr: false });

    if (loading) return <Loader />;
    if (error) return `Error: ${error}`;
    if (!users_orders.orders.length) return 'Нет заказов';

    return users_orders.orders.map(item => <Order key={item.id} {...item} />);
};

export default Orders;
