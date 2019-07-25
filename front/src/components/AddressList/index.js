import React, { Fragment, useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { GET_ADDRESSES } from 'query';

import ErrorMessage from 'components/Error';
import AddressItem from 'components/AddressItem';
import Loader from 'components/Loader';
import Button from 'components/Button';
import AddressForm from 'components/AddressForm';

import styles from './styles.css';

const REMOVE_ADDRESS_MUTATION = gql`
    mutation removeAddress($input: RemoveAddressInput!) {
        removeAddress(input: $input) {
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

const AddressList = ({ items: itemsProp, value, onChange }) => {
    const [items, setItems] = useState(itemsProp);
    const [showForm, setShowForm] = useState(null);
    const handleRemoveAddress = ({ removeAddress: { data } }) => {
        setItems(data);
    };
    const handleSubmitAddress = ({ data }) => {
        setItems(data);
        setShowForm(null);
    };

    if (showForm) {
        return (
            <AddressForm
                type={showForm.type}
                id={showForm.id}
                actions={
                    <Button
                        kind="secondary"
                        bold
                        onClick={() => {
                            setShowForm(null);
                        }}
                    >
                        Назад
                    </Button>
                }
                onSubmit={handleSubmitAddress}
            />
        );
    }

    return (
        <Fragment>
            {items.length ? (
                items.map(item => (
                    <AddressItem
                        key={item.id}
                        {...item}
                        actions={
                            <Fragment>
                                <Button
                                    className={`${styles.button} flaticon-pencil41`}
                                    onClick={() => {
                                        setShowForm({
                                            type: 'edit',
                                            id: item.id,
                                        });
                                    }}
                                    kind="primary"
                                    size="small"
                                    outlined
                                />
                                <Mutation
                                    mutation={REMOVE_ADDRESS_MUTATION}
                                    onCompleted={handleRemoveAddress}
                                >
                                    {(remove, { error, data, loading }) => {
                                        console.log(error, data, loading);

                                        return (
                                            <Button
                                                className={`${styles.button} flaticon-delete96`}
                                                kind="primary"
                                                size="small"
                                                outlined
                                                onClick={() => {
                                                    remove({
                                                        variables: { input: { id: item.id } },
                                                    });
                                                }}
                                            />
                                        );
                                    }}
                                </Mutation>
                            </Fragment>
                        }
                        active={value === item.id}
                        onClick={onChange}
                    />
                ))
            ) : (
                <p>Вы не указали ни одного адреса</p>
            )}
            <div>
                <Button
                    kind="primary"
                    onClick={() => {
                        setShowForm({ type: 'new' });
                    }}
                >
                    Добавить адрес
                </Button>
            </div>
        </Fragment>
    );
};

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
