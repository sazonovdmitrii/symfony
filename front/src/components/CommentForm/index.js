import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Stars from 'components/Stars';

const CommentForm = () => {
    const [values, setValues] = useState({
        comment: '',
        email: '',
        name: '',
        star: '0',
    });
    const handleChange = ({ target: { name, value, type } }, checked) => {
        const newValue = type === 'checkbox' ? checked : value;

        setValues(prevState => ({
            ...prevState,
            [name]: newValue,
        }));
    };

    const { star, name, email, comment } = values;

    return (
        <form className="comments-form">
            <div>
                Оценка:
                <InputGroup>
                    <Stars value={star} onChange={handleChange} />
                </InputGroup>
            </div>
            <InputGroup>
                <Input
                    name="name"
                    label="Имя"
                    className="input-text"
                    value={name}
                    onChange={handleChange}
                    required
                />
            </InputGroup>
            <InputGroup>
                <Input
                    name="email"
                    label="E-mail"
                    value={email}
                    className="input-text"
                    pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                    onChange={handleChange}
                    required
                />
            </InputGroup>
            <InputGroup>
                <Input
                    type="textarea"
                    name="comment"
                    label="Коментарий"
                    value={comment}
                    onChange={handleChange}
                    rows="4"
                    multiline
                    required
                />
            </InputGroup>
            <Button type="submit" kind="primary">
                Опубликовать
            </Button>
        </form>
    );
};

export default CommentForm;
