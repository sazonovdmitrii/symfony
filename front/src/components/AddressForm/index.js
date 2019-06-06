import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { GET_ADDRESS } from 'query';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Loader from 'components/Loader';
import Button from 'components/Button';

export const AddressForm = props => {
    const [values, setValues] = useState({
        ...props.values,
        city: '',
        street: '',
        zip: '',
        house: '',
        corp: '',
        level: '',
        flat: '',
        comment: '',
    });
    const handleChange = ({ target: { name, value } }) => {
        setValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = event => {
        event.preventDefault();

        props.onSubmit({
            variables: { input: values },
        });
    };
    const handleBackURL = () => {
        props.history.goBack();
    };

    const { city, street, zip, house, corp, level, flat, comment } = values;

    return (
        <form onSubmit={handleSubmit}>
            <div className="cabinet-content__row">
                <div className="cabinet-content__column">
                    <InputGroup>
                        <Input label="Город" name="city" value={city} onChange={handleChange} required />
                    </InputGroup>
                    <InputGroup>
                        <Input label="Улица" name="street" value={street} onChange={handleChange} required />
                    </InputGroup>
                    <InputGroup>
                        <Input label="Индекс" name="zip" value={zip} onChange={handleChange} />
                    </InputGroup>
                </div>
                <div className="cabinet-content__column">
                    <InputGroup>
                        <Input label="Дом" name="house" value={house} onChange={handleChange} />
                        <Input label="Офис/квартира" name="flat" value={flat} onChange={handleChange} />
                        <Input label="Корпус" name="corp" value={corp} onChange={handleChange} />
                        <Input label="Этаж" name="level" value={level} onChange={handleChange} />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            type="textarea"
                            label="Коментарий"
                            name="comment"
                            value={comment}
                            onChange={handleChange}
                            rowsMax="4"
                            multiline
                        />
                    </InputGroup>
                </div>
            </div>
            <div className="cabinet-content__buttons">
                <Button type="submit" kind="primary">
                    Сохранить
                </Button>
                <Button kind="primary" onClick={handleBackURL} outlined>
                    Назад
                </Button>
            </div>
        </form>
    );
};

AddressForm.defaultProps = {};

AddressForm.propTypes = {};

const ADDRESS_MUTATION = gql`
    mutation($input: Input!) {
        createAddress(input: $input) {
            id
        }
    }
`;

export default props => {
    const isEdit = 'id' in props.match.params || props.type === 'edit';

    if (isEdit) {
        return (
            <Query query={GET_ADDRESS} variables={{ id: props.match.params.id }}>
                {({ loading, data }) => {
                    if (loading) return <Loader />;

                    return (
                        <Mutation mutation={ADDRESS_MUTATION}>
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
        <Mutation mutation={ADDRESS_MUTATION}>
            {(save, { data, error }) => <AddressForm {...props} onSubmit={save} {...data} />}
        </Mutation>
    );
};
