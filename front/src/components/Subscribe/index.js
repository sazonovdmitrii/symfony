import React, { Component } from 'react';

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
            <form className="subscribe" action="/user/subscribe" role="subscribe-form">
                <label className="subscribe__label">Подпишитесь на скидки</label>
                <div className="subscribe__form">
                    <input
                        type="email"
                        className="subscribe__input"
                        name="email"
                        placeholder="Ваш e-mail"
                        pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                        title="Пример: info@laparfumerie.ru"
                        required
                    />
                    <button type="submit" className="subscribe__button" />
                </div>
                {notification && <div className="subscribe__notification">{notification}</div>}
            </form>
        );
    }
}
