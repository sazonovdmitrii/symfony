import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_ADDRESSES } from 'query';

import ErrorMessage from 'components/Error';
import Loader from 'components/Loader';

import AddressList from './AddressList';

export default ({ onChange, value }) => {
    const {
        loading,
        error,
        data: { addresses },
    } = useQuery(GET_ADDRESSES, { ssr: false });

    if (error && !addresses) return <ErrorMessage error={error} />;
    if (loading) return <Loader />;

    return <AddressList items={addresses.data} onChange={onChange} value={value} />;
};
