import React from 'react';
import { Query } from 'react-apollo';

import { GET_ADDRESSES } from 'query';

import ErrorMessage from 'components/Error';
import AddressItem from 'components/AddressItem';
import Loader from 'components/Loader';

export default () => {
    return (
        <Query query={GET_ADDRESSES}>
            {({ loading, error, data: { addresses } }) => {
                if (error && !data) return <ErrorMessage error={error} />;
                if (loading) return <Loader />;

                return addresses ? (
                    addresses.data.map(item => <AddressItem key={item.id} {...item} />)
                ) : (
                    <p>Вы не указали ни одного адреса</p>
                );
            }}
        </Query>
    );
};
