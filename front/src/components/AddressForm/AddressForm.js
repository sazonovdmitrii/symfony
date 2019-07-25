import React, { useState } from 'react';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import Select from 'components/Select';
import Snackbar from 'components/Snackbar';

const AddressForm = ({ values: valuesProp, onSubmit, history, actions, regions }) => {
    const regionsForSelect = regions.map(({ id, title }) => ({ id, value: title }));
    const [notification, setNotification] = useState(null);
    const [values, setValues] = useState({
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
        ...valuesProp,
    });
    const handleCloseNotification = () => {
        setNotification(null);
    };
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
        region_id,
        code,
        name,
        person,
        // comment,
    } = values;

    return (
        <form onSubmit={handleSubmit}>
            {notification && (
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
                        <Input label="Получатель" name="person" value={person} onChange={handleChange} />
                        <Input
                            label="Название адреса"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            required
                        />
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

export default AddressForm;
