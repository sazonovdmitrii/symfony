import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import RadioGroup from 'components/RadioGroup';
import Radio from 'components/Radio';
import Checkbox from 'components/Checkbox';

const Register = props => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [disclaimer, setDisclaimer] = useState(false);
    const [emailSubscription, setEmailSubscription] = useState(true);
    const handleChange = ({ target: { value } }) => {
        setGender(value);
    };
    const register = e => {
        e.preventDefault();

        console.log(e);
        props
            .onSubmit({
                variables: {
                    firstname,
                    lastname,
                    email,
                    password,
                    gender,
                },
            })
            .then(resp => {
                console.log(resp, '🤔');
            });
    };

    return (
        <form onSubmit={register}>
            <div className="cabinet-content__row">
                <div className="cabinet-content__column">
                    <InputGroup>
                        <Input
                            name="firstname"
                            label="Имя"
                            value={firstname}
                            onChange={({ target: { value } }) => setFirstname(value)}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            name="lastname"
                            label="Фамилия"
                            value={lastname}
                            onChange={({ target: { value } }) => setLastname(value)}
                            required
                        />
                    </InputGroup>
                    Пол:
                    <InputGroup>
                        <RadioGroup name="gender" value={gender} onChange={handleChange}>
                            <Radio value="" label="Не указан" />
                            <Radio value="male" label="Мужской" />
                            <Radio value="female" label="Женский" />
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
                            onChange={({ target: { value } }) => setEmail(value)}
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
                            onChange={({ target: { value } }) => setPhone(value)}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            name="password"
                            type="password"
                            label="Пароль"
                            value={password}
                            onChange={({ target: { value } }) => setPassword(value)}
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
