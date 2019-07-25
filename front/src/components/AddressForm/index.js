import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { GET_ADDRESS } from 'query';
import { Address } from 'query/fragments';

import Loader from 'components/Loader';

import AddressForm from './AddressForm';

const CREATE_ADDRESS_MUTATION = gql`
    mutation createAddress($input: CreateAddressInput!) {
        createAddress(input: $input) {
            ...${Address}
        }
    }
`;

const UPDATE_ADDRESS_MUTATION = gql`
    mutation updateAddress($input: UpdateAddressInput!) {
        updateAddress(input: $input) {
            ...${Address}
        }
    }
`;

const GET_REGIONS = gql`
    {
        regions {
            data {
                id
                title
            }
        }
    }
`;

export default props => {
    const isEdit = props.type === 'edit';

    const handleCompleted = ({ createAddress, updateAddress }, data = createAddress || updateAddress) => {
        if (props.onSubmit) {
            props.onSubmit(data);
        }
    };

    if (isEdit) {
        return (
            <Query query={GET_ADDRESS} variables={{ id: props.id }} ssr={false}>
                {({ loading, data: { address, regions } }) => {
                    if (loading) return <Loader />;

                    const { __typename, ...newAddress } = address;

                    return (
                        <Mutation mutation={UPDATE_ADDRESS_MUTATION} onCompleted={handleCompleted}>
                            {(save, { error }) => (
                                <AddressForm
                                    {...props}
                                    regions={regions.data}
                                    values={newAddress}
                                    error={error}
                                    onSubmit={save}
                                />
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }

    return (
        <Query query={GET_REGIONS} ssr={false}>
            {({ loading, error, data: { regions } }) => {
                if (loading) return <Loader />;

                return (
                    <Mutation mutation={CREATE_ADDRESS_MUTATION} onCompleted={handleCompleted}>
                        {(save, { data, error: errorMutation }) => (
                            <AddressForm {...props} {...data} regions={regions.data} onSubmit={save} />
                        )}
                    </Mutation>
                );
            }}
        </Query>
    );
};
