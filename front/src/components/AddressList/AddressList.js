import React, { Fragment, useState, useEffect } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import ListItem from 'components/ListItem';
import Button from 'components/Button';
import AddressForm from 'components/AddressForm';
import Badge from 'components/Badge';

import styles from './styles.css';

const GET_ADDRESSES = gql`
    {
        addresses {
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

const TEXT = {
    city: 'г.',
    corp: 'корп.',
    flat: 'кв.',
    house: 'д.',
    street: 'ул.',
    zip: 'индекс:',
};

const AddressList = ({ items: itemsProp, value, onChange, onSubmit = () => {}, client }) => {
    const [items, setItems] = useState(itemsProp);
    const [showForm, setShowForm] = useState(null);
    const handleRemoveAddress = ({ removeAddress: { data } }) => {
        setItems(data);
    };
    const handleSubmitAddress = data => {
        // if edit take new addresses from data.data
        // esle add new address from data to items
        // todo make better
        client.writeQuery({
            query: GET_ADDRESSES,
            data: {
                addresses: {
                    data: data.data ? data.data : [...items, data],
                    __typename: 'Addresses',
                },
            },
        });
        setShowForm(null);
        onSubmit(data.data ? data.data : data);
    };

    useEffect(() => {
        setItems(itemsProp);
    }, [itemsProp.length]);

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
            {items && items.length ? (
                items.map(item => (
                    <Badge
                        key={item.id}
                        badgeContent={item.name}
                        kind="primary"
                        style={{ root: { display: 'block' }, badge: { left: '0', right: 'auto' } }}
                    >
                        <ListItem
                            description={`${TEXT.city} ${item.city}, ${TEXT.zip} ${item.zip}, ${
                                TEXT.street
                            } ${item.street}, ${TEXT.house} ${item.house}${
                                item.corp ? `, ${TEXT.corp} ${item.corp}` : ''
                            }${item.flat ? `, ${TEXT.flat} ${item.flat}` : ''}`}
                            actions={
                                <Fragment>
                                    <Button
                                        className={`${styles.button} flaticon-pencil41`}
                                        onClick={event => {
                                            event.stopPropagation();

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
                                                    onClick={event => {
                                                        event.stopPropagation();

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
                            onClick={() => onChange(item)}
                            pointer={!!value}
                        />
                    </Badge>
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

export default withApollo(AddressList);
