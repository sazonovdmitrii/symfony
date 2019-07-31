import React, { Fragment, useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { GET_ADDRESSES } from 'query';

import ErrorMessage from 'components/Error';
import Loader from 'components/Loader';

import AddressList from './AddressList';

export default ({ onChange, value }) => {
    return (
        <Query query={GET_ADDRESSES} ssr={false} partialRefetch>
            {({ loading, error, data: { addresses } }) => {
                if (error && !addresses) return <ErrorMessage error={error} />;
                if (loading) return <Loader />;

                return <AddressList items={addresses.data} onChange={onChange} value={value} />;
            }}
        </Query>
    );
};
