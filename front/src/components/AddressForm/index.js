import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { GET_ADDRESS } from 'query';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Select from 'components/Select';
import Snackbar from 'components/Snackbar';

export const AddressForm = ({ values: valuesProp, onSubmit, history, actions, regions }) => {
    const regionsForSelect = regions.map(({ id, title }) => ({ id, value: title }));
    const [notitication, setNotification] = useState(null);
    const [values, setValues] = useState({
        ...valuesProp,
        name: '',
        person: '',
        region_id: null,
        city: '',
        street: '',
        zip: '',
        house: '',
        corp: '',
        level: '',
        flat: '',
        code: '',
        // comment: '',
    });
    const handleChange = ({ target: { name, value } }) => {
        setValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleChangeSelect = ({ id }) => {
        setValues(prevState => ({
            ...prevState,
            region_id: id,
        }));
    };
    const isValid = () => {
        // todo
        return true;
    };
    const handleSubmit = event => {
        event.preventDefault();

        if (isValid()) {
            onSubmit({
                variables: { input: values },
            });
        } else {
            setNotification();
        }
    };
    const handleBackURL = () => {
        history.goBack();
    };

    const {
        city,
        street,
        zip,
        house,
        corp,
        level,
        flat,
        // comment,
        region_id,
        code,
        name,
    } = values;

    return (
        <form onSubmit={handleSubmit}>
            {notitication && (
                <Snackbar
                    text={notification.text}
                    active={!!notification}
                    theme={notification.type}
                    onClose={handleCloseNotification}
                />
            )}
            <div className="cabinet-content__row">
                <div className="cabinet-content__column">
                    <InputGroup>
                        <Select
                            label="Регион*"
                            items={regionsForSelect}
                            value={region_id}
                            onChange={handleChangeSelect}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Input label="Город" name="city" value={city} onChange={handleChange} required />
                    </InputGroup>
                    <InputGroup>
                        <Input label="Улица" name="street" value={street} onChange={handleChange} required />
                    </InputGroup>
                    <InputGroup>
                        <Input label="Индекс" name="zip" value={zip} onChange={handleChange} required />
                    </InputGroup>
                </div>
                <div className="cabinet-content__column">
                    <InputGroup>
                        <Input label="Дом" name="house" value={house} onChange={handleChange} />
                        <Input label="Офис/квартира" name="flat" value={flat} onChange={handleChange} />
                        <Input label="Домофон" name="code" value={code} onChange={handleChange} />
                        <Input label="Корпус" name="corp" value={corp} onChange={handleChange} />
                        <Input label="Этаж" name="level" value={level} onChange={handleChange} />
                    </InputGroup>
                    <InputGroup>
                        <Input label="Название адреса" name="name" value={name} onChange={handleChange} />
                        {/* <Input
                            label="Коментарий"
                            name="comment"
                            value={comment}
                            onChange={handleChange}
                            rowsMax="4"
                            multiline
                        /> */}
                    </InputGroup>
                </div>
            </div>
            <div className="cabinet-content__buttons">
                <Button type="submit" kind="primary" bold>
                    Сохранить
                </Button>
                {actions || (
                    <Button kind="secondary" onClick={handleBackURL} bold>
                        Назад
                    </Button>
                )}
            </div>
        </form>
    );
};

AddressForm.defaultProps = {};

AddressForm.propTypes = {};

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
            active
        }
    }
`;

const EDIT_ADDRESS_MUTATION = gql`
    mutation editAddress($input: EditAddressInput!) {
        editAddress(input: $input) {
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
            active
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
    // const isEdit = props.type === 'edit' || (props.match.params && 'id' in props.match.params);
    const isEdit = props.type === 'edit';

    const handleCompleted = ({ createAddress, editAddress }, data = createAddress || editAddress) => {
        if (data) props.history.push('/user/addressbook');
    };

    if (isEdit) {
        return (
            <Query query={GET_ADDRESS} variables={{ id: props.id || (props.match && props.match.params.id) }}>
                {({ loading, data }) => {
                    if (loading) return <Loader />;

                    return (
                        <Mutation mutation={EDIT_ADDRESS_MUTATION} onCompleted={handleCompleted}>
                            {(save, { error }) => (
                                <AddressForm {...props} onSubmit={save} values={data} error={error} />
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
                        {(save, { data, error }) => (
                            <AddressForm {...props} {...data} regions={regions.data} onSubmit={save} />
                        )}
                    </Mutation>
                );
            }}
        </Query>
    );
};
