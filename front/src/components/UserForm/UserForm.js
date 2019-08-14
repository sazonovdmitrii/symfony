import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import RadioButton from 'components/RadioButton';
import RadioGroup from 'components/RadioGroup';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';

const UserForm = ({ data, type, onSubmit }) => {
    const isRegistration = type === 'registration';
    const isPersonal = type === 'personal';

    const [state, setState] = useState({
        gender: '',
        lastname: '',
        firstname: '',
        // midname: '',
        email: '',
        phone: '',
        password: '',
        disclaimer: true,
        email_subscription: true,
        sms_subscription: true,
        ...data,
    });
    const handleChange = ({ target: { name, value, type: targetType } }, checked) => {
        const newValue = targetType === 'checkbox' ? checked : value;

        setState(prevState => ({
            ...prevState,
            [name]: newValue,
        }));
    };
    const handleSubmit = event => {
        event.preventDefault();

        // todo validation
        if (onSubmit) {
            onSubmit(state);
        }
    };

    const {
        gender,
        lastname,
        firstname,
        // midname,
        email,
        phone,
        password,
        disclaimer,
        email_subscription,
        sms_subscription,
    } = state;

    return (
        <form onSubmit={handleSubmit}>
            <div className="cabinet-content__row">
                <div className="cabinet-content__column">
                    <InputGroup>
                        <Input
                            type="text"
                            name="lastname"
                            label="Фамилия"
                            value={lastname}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            type="text"
                            name="firstname"
                            label="Имя"
                            value={firstname}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    {/* TODO <InputGroup>
                        <Input
                            type="text"
                            name="midname"
                            label="Отчество"
                            value={midname}
                            onChange={handleChange}
                        />
                    </InputGroup> */}
                    Пол:
                    <InputGroup>
                        <RadioGroup name="gender" value={gender} onChange={handleChange}>
                            <RadioButton value="" label="Не указан" />
                            <RadioButton value="male" label="Мужской" />
                            <RadioButton value="female" label="Женский" />
                        </RadioGroup>
                    </InputGroup>
                </div>
                <div className="cabinet-content__column">
                    <InputGroup>
                        <Input
                            name="email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
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
                    {isRegistration && (
                        <InputGroup>
                            <Input
                                name="password"
                                type="password"
                                label="Пароль"
                                value={password}
                                onChange={handleChange}
                                required
                            />
                        </InputGroup>
                    )}
                    <InputGroup>
                        <Checkbox
                            label="Я принимаю правила и условия"
                            name="disclaimer"
                            checked={disclaimer}
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
                {(isRegistration || isPersonal) && (
                    <div className="cabinet-content__column cabinet-content__buttons">
                        <Button type="submit" kind="primary" bold>
                            {isRegistration ? 'Зарегистрироваться' : 'Сохранить'}
                        </Button>
                        {isPersonal && (
                            <Button type="reset" kind="secondary">
                                Отменить
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </form>
    );
};

UserForm.defaultProps = {
    onSubmit: () => {},
};

UserForm.propTypes = {
    onSubmit: PropTypes.func,
};

export default UserForm;
