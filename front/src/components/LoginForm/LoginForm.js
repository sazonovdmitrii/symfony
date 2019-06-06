import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import Snackbar from 'components/Snackbar';

const LogIn = ({ onSubmit, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notify, setNotify] = useState(error);

    useEffect(() => {
        setNotify(error);
    }, [error]);

    const handleSubmit = e => {
        e.preventDefault();

        // TODO login
        onSubmit({
            variables: {
                input: {
                    email,
                    password,
                },
            },
        });
    };

    const handleClose = () => {
        setNotify(null);
    };

    return (
        <Fragment>
            {notify && <Snackbar text={notify} active={!!notify} theme="error" onClose={handleClose} />}
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
                <InputGroup>
                    <ButtonGroup>
                        <Button type="submit" kind="primary" bold uppercase>
                            Войти
                        </Button>
                        <Button to="/user/remind-password" kind="secondary">
                            Забыл пароль
                        </Button>
                    </ButtonGroup>
                </InputGroup>
            </form>
        </Fragment>
    );
};

export default LogIn;
