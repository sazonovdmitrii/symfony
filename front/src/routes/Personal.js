import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import RadioButton from 'components/RadioButton';
import RadioGroup from 'components/RadioGroup';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';

const Personal = ({ onSubmit }) => {
    const [state, setState] = useState({
        gender: '',
        last_name: '',
        name: '',
        mid_name: '',
        phone: '',
        email_subscription: false,
        sms_subscription: false,
    });
    const handleChange = ({ target: { name, value, type } }, checked) => {
        const newValue = type === 'checkbox' ? checked : value;

        setState(prevState => ({
            ...prevState,
            [name]: newValue,
        }));
    };
    const handleSubmit = event => {
        event.preventDefault();

        // todo validation

        onSubmit({
            variables: state,
        });
    };

    const { gender, last_name, name, mid_name, phone, email_subscription, sms_subscription } = state;

    return (
        <form onSubmit={handleSubmit}>
            <div className="cabinet-content__row">
                <div className="cabinet-content__column">
                    <InputGroup>
                        <Input
                            type="text"
                            name="last_name"
                            label="Фамилия"
                            value={last_name}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            type="text"
                            name="name"
                            label="Имя"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            type="text"
                            name="mid_name"
                            label="Отчество"
                            value={mid_name}
                            onChange={handleChange}
                        />
                    </InputGroup>
                </div>
                <div className="cabinet-content__column">
                    Пол:
                    <InputGroup>
                        <RadioGroup name="gender" value={gender} onChange={handleChange}>
                            <RadioButton value="" label="Не указан" />
                            <RadioButton value="male" label="Мужской" />
                            <RadioButton value="female" label="Женский" />
                        </RadioGroup>
                    </InputGroup>
                    <InputGroup>
                        <Input
                            type="tel"
                            name="phone"
                            value={phone}
                            label="Телефон"
                            placeholder="+7 (000) 000-00-00"
                            mask="+{7} (000) 000-00-00"
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Checkbox
                            label="Получать уведомления о новых распродажах"
                            name="email_subscription"
                            checked={email_subscription}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Checkbox
                            label="Получать SMS-сообщения"
                            name="sms_subscription"
                            checked={sms_subscription}
                            onChange={handleChange}
                        />
                    </InputGroup>
                </div>
                <div className="cabinet-content__column cabinet-content__buttons">
                    <Button type="submit" role="submit" kind="primary">
                        Сохранить
                    </Button>
                    <Button type="reset" kind="secondary">
                        Отменить
                    </Button>
                </div>
            </div>
        </form>
    );
};

Personal.defaultProps = {
    onSubmit: () => {},
};

Personal.propTypes = {
    onSubmit: PropTypes.func,
};

export default Personal;
