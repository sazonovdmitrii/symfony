import React, { useState } from 'react';

import Button from 'components/Button';
import Input from 'components/Input';

import styles from './styles.css';

export default ({ string, value, type, name, onRemove, onSubmit }) => {
    const [{ active, promocode, error }, setState] = useState({
        active: !!string,
        promocode: string,
        error: false,
        message: '',
    });
    const handleChange = ({ target: { name, value: newValue } }) => {
        setState(prevState => ({
            ...prevState,
            [name]: newValue,
        }));
    };
    const handleSubmit = event => {
        onSubmit(event, { promocode, error });
    };

    const currency = type === 'procent' ? '%' : 'руб.';
    const formatValue = type === 'procent' ? value : `-${value}`;

    if (active) {
        return (
            <div className={styles.message}>
                <div className={styles.badge}>{name}</div>
                <div className={styles.description}>
                    {formatValue}
                    {currency}
                </div>
                <Button type="button" onClick={() => onRemove()} kind="primary" bold>
                    Удалить
                </Button>
            </div>
        );
    }

    return (
        <form className={styles.inner} onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
                <Input
                    label="Промокод"
                    theme={{ input: styles.input, label: styles.inputLabel }}
                    name="promocode"
                    value={promocode}
                    onChange={handleChange}
                />
            </div>
            <Button type="submit" kind="primary" bold>
                Применить
            </Button>
        </form>
    );
};
