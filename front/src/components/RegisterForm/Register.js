import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import RadioGroup from 'components/RadioGroup';
import RadioButton from 'components/RadioButton';
import Checkbox from 'components/Checkbox';

import styles from './styles.css';

const Register = props => {
    const [{ firstname, lastname, email, phone, password, gender }, setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        gender: '',
    });
    const [disclaimer, setDisclaimer] = useState(false);
    const [emailSubscription, setEmailSubscription] = useState(true);
    const handleChange = ({ target: { value, name } }) => {
        setValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = e => {
        e.preventDefault();

        // todo validate
        props.onSubmit({
            variables: {
                input: {
                    firstname,
                    lastname,
                    phone,
                    email,
                    password,
                    gender,
                    confirm_password: password,
                },
            },
        });
    };

    return (
        <form className={styles.root} onSubmit={handleSubmit}>
            <div className="cabinet-content__row">
                <div className="cabinet-content__column">
                    <InputGroup>
                        <Input
                            name="firstname"
                            label="Имя"
                            value={firstname}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            name="lastname"
                            label="Фамилия"
                            value={lastname}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
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
                    <InputGroup>
                        <Checkbox
                            label="Я принимаю правила и условия"
                            name="disclaimer"
                            checked={disclaimer}
                            onChange={(e, checked) => setDisclaimer(checked)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Checkbox
                            label="Получать уведомления о новых распродажах"
                            name="email_subscription"
                            checked={emailSubscription}
                            onChange={(e, checked) => setEmailSubscription(checked)}
                        />
                    </InputGroup>
                    <Button type="submit" kind="primary" bold uppercase>
                        Зарегестрироваться
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default Register;
