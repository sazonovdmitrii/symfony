import React, { useState } from 'react';

import Input from 'components/Input';

import styles from './styles.css';

const Subscribe = () => {
    const [email, setEmail] = useState('');
    const [notification, setNotification] = useState(null);

    return (
        <form className="subscribe" action="/user/subscribe">
            <label className="subscribe__label">Подпишитесь на скидки</label>
            <div className={styles.form}>
                <Input
                    type="email"
                    theme={{ input: styles.input }}
                    name="email"
                    value={email}
                    placeholder="Ваш e-mail"
                    pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                    title="Пример: info@laparfumerie.ru"
                    onChange={({ target: { value } }) => setEmail(value)}
                    required
                />
                <button type="submit" className={styles.button} />
            </div>
            {notification && <div className="subscribe__notification">{notification}</div>}
        </form>
    );
};

export default Subscribe;
