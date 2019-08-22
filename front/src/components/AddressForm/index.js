import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useApp } from 'hooks';
import { GET_ADDRESS, GET_ADDRESSES } from 'query';
import { UPDATE_ADDRESS_MUTATION, CREATE_ADDRESS_MUTATION } from 'mutations';

import Loader from 'components/Loader';

import AddressForm from './AddressForm';

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
    const { createNotification } = useApp();
    const { id, onSubmit } = props;

    const [save, { data, error: errorMutation }] = useMutation(
        id ? UPDATE_ADDRESS_MUTATION : CREATE_ADDRESS_MUTATION,
        {
            onCompleted({ createAddress, updateAddress }) {
                const data = createAddress || updateAddress;

                if (onSubmit) {
                    onSubmit(data);
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
                            data: createAddress ? [...items, createAddress] : updateAddress.data,
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
    } = useQuery(id ? GET_ADDRESS : GET_REGIONS, {
        variables: id
            ? {
                  id,
              }
            : null,
        ssr: false,
    });

    useEffect(() => {
        createNotification({ type: 'error', message: errorMutation.message });
    }, [errorMutation]);

    if (loading) return <Loader />;

    return <AddressForm {...props} regions={regions.data} values={id ? newAddress : null} onSubmit={save} />;
};
