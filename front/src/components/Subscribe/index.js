import React, { Component } from 'react';

import Input from 'components/Input';

import styles from './styles.css';

export default class Subscribe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notification: null,
        };
    }

    render() {
        const { notification } = this.state;

        return (
            <form className="subscribe" action="/user/subscribe">
                <label className="subscribe__label">Подпишитесь на скидки</label>
                <div className={styles.form}>
                    <Input
                        type="email"
                        theme={{ input: styles.input }}
                        name="email"
                        placeholder="Ваш e-mail"
                        pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                        title="Пример: info@laparfumerie.ru"
                        required
                    />
                    <button type="submit" className={styles.button} />
                </div>
                {notification && <div className="subscribe__notification">{notification}</div>}
            </form>
        );
    }
}
