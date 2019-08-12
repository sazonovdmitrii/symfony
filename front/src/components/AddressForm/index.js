import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { GET_ADDRESS, GET_ADDRESSES } from 'query';

import Loader from 'components/Loader';

import AddressForm from './AddressForm';

const CREATE_ADDRESS_MUTATION = gql`
    mutation createAddress($input: CreateAddressInput!) {
        createAddress(input: $input) {
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
`;

const UPDATE_ADDRESS_MUTATION = gql`
    mutation updateAddress($input: UpdateAddressInput!) {
        updateAddress(input: $input) {
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
    const [save, { data, error: errorMutation }] = useMutation(
        isEdit ? UPDATE_ADDRESS_MUTATION : CREATE_ADDRESS_MUTATION,
        {
            onCompleted({ createAddress, updateAddress }) {
                const data = createAddress || updateAddress;

                if (props.onSubmit) {
                    props.onSubmit(data);
                }
            },
            update(
                cache,
                {
                    data: { updateAddress, createAddress },
                }
            ) {
                const {
                    addresses: { data: items },
                } = cache.readQuery({ query: GET_ADDRESSES });

                cache.writeQuery({
                    query: GET_ADDRESSES,
                    data: {
                        addresses: {
                            data: updateAddress.data ? updateAddress.data : [...items, createAddress],
                            __typename: 'Addresses',
                        },
                    },
                });
            },
        }
    );
    const {
        loading,
        error,
        data: { address: { __typename, ...newAddress } = {}, regions },
    } = useQuery(isEdit ? GET_ADDRESS : GET_REGIONS, {
        variables: isEdit
            ? {
                  id: props.id,
              }
            : null,
        ssr: false,
    });

    if (loading) return <Loader />;

    return (
        <AddressForm
            {...props}
            regions={regions.data}
            values={isEdit ? newAddress : null}
            error={errorMutation}
            onSubmit={save}
        />
    );
};
