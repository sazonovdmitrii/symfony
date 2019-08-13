import React, { useState, useEffect, useRef } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Edit, X } from 'react-feather';

import ListItem from 'components/ListItem';
import Button from 'components/Button';
import AddressForm from 'components/AddressForm';

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
    const formEl = useRef(null);
    const [items, setItems] = useState(itemsProp);
    const [showForm, setShowForm] = useState({});
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
        setShowForm({});
        onSubmit(data.data ? data.data : data);
    };

    useEffect(() => {
        setItems(itemsProp);
    }, [itemsProp, itemsProp.length]);

    useEffect(() => {
        if (formEl.current) {
            formEl.current.scrollIntoView();
        }
    }, [showForm.id, showForm.type]);

    if (showForm.id) {
        return (
            <div ref={formEl}>
                <AddressForm
                    type={showForm.type}
                    id={showForm.id}
                    actions={
                        <Button
                            kind="secondary"
                            bold
                            onClick={() => {
                                setShowForm({});
                            }}
                        >
                            Назад
                        </Button>
                    }
                    onSubmit={handleSubmitAddress}
                />
            </div>
        );
    }

    return (
        <>
            {items && items.length ? (
                items.map(item => (
                    <ListItem
                        key={item.id}
                        title={item.name}
                        description={`${TEXT.city} ${item.city}, ${TEXT.zip} ${item.zip}, ${TEXT.street} ${
                            item.street
                        }, ${TEXT.house} ${item.house}${item.corp ? `, ${TEXT.corp} ${item.corp}` : ''}${
                            item.flat ? `, ${TEXT.flat} ${item.flat}` : ''
                        }`}
                        actions={
                            <>
                                <Button
                                    aria-label="Редактировать"
                                    kind="primary"
                                    outlined
                                    onClick={event => {
                                        event.stopPropagation();

                                        setShowForm({
                                            type: 'edit',
                                            id: item.id,
                                        });
                                    }}
                                >
                                    <Edit size="15" className={styles.icon} />
                                </Button>
                                <Mutation
                                    mutation={REMOVE_ADDRESS_MUTATION}
                                    onCompleted={handleRemoveAddress}
                                >
                                    {(remove, { error, data, loading }) => {
                                        console.log(error, data, loading);

                                        return (
                                            <Button
                                                aria-label="Удалить"
                                                kind="primary"
                                                outlined
                                                onClick={event => {
                                                    event.stopPropagation();

                                                    remove({
                                                        variables: { input: { id: item.id } },
                                                    });
                                                }}
                                            >
                                                <X size="15" className={styles.icon} />
                                            </Button>
                                        );
                                    }}
                                </Mutation>
                            </>
                        }
                        active={value === item.id}
                        onClick={() => onChange(item)}
                        pointer={!!value}
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
        </>
    );
};

export default withApollo(AddressList);
