import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';

const LogIn = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = e => {
        e.preventDefault();

        // TODO login
        props.onSubmit({
            variables: {
                input: {
                    email,
                    password,
                },
            },
        });
    };

    return (
        <div className="cabinet-content__row">
            <div className="cabinet-content__column">
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Input
                            name="email"
                            type="email"
                            label="Email"
                            value={email}
                            onChange={({ target: { value } }) => setEmail(value)}
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
                    <Button type="submit" kind="primary" bold uppercase>
                        Войти
                    </Button>
                    <Button to="/user/remind-password" kind="secondary">
                        Забыл пароль
                    </Button>
                </form>
            </div>
            <div className="cabinet-content__column rte">
                <h5>Почему быть пользователем Laparfumerie.ru очень удобно?</h5>
                <p>
                    - создайте свой личный кабинет и управляйте своим заказами
                    <br /> - получите возможность оставлять коментарии и оценивать товары
                    <br /> - отслеживайте изменения цен на понравившиеся товары в своей корзине
                    <br /> - получайте рассылку с самой актуальной и свежей информацией
                    <br /> - будьте в курсе новостей мира парфюмерных и косметических новинок
                </p>
                <Button to="/user/register" kind="primary" bold uppercase>
                    Зарегистрироваться
                </Button>
            </div>
        </div>
    );
};

export default LogIn;
