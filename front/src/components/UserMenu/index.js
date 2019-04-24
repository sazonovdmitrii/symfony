import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import BasketShort from 'components/BasketShort';

export default () => {
    const auth = true;
    const basket_items_count = 0;
    const email = 'test@test.ru';

    return (
        <ul className="usermenu">
            <li className="usermenu__item">
                {auth ? (
                    <Fragment>
                        <Link className="usermenu__link" to="/user/personal/">
                            <span className="usermenu__icon flaticon-avatar" />
                            <span className="usermenu__label">Ваш кабинет</span>
                        </Link>
                        <ul className="usermenu__submenu">
                            <li className="usermenu__subitem">
                                <Link className="usermenu__sublink" to="/user/personal">
                                    Персональная информация
                                </Link>
                            </li>
                            <li className="usermenu__subitem">
                                <Link className="usermenu__sublink" to="/user/orders">
                                    Ваши заказы
                                </Link>
                            </li>
                            <li className="usermenu__subitem">
                                <Link className="usermenu__sublink" to="/basket">
                                    Корзина
                                </Link>
                            </li>
                            <li className="usermenu__subitem">
                                <button type="button" className="usermenu__sublink">
                                    Выход (<span className="usermenu__email">{email}</span>)
                                </button>
                            </li>
                        </ul>
                    </Fragment>
                ) : (
                    <button
                        type="button"
                        className="usermenu__link"
                        rel="nofollow"
                        data-handle="modal"
                        data-target="#login-modal"
                    >
                        <span className="usermenu__icon flaticon-avatar" />
                        <span className="usermenu__label">Войти</span>
                    </button>
                )}
            </li>
            <li className="usermenu__item">
                <Link className="usermenu__link" to="/basket">
                    <span className="usermenu__icon flaticon-shopping-bag" />
                    <span className="usermenu__labebasketcount">{basket_items_count || 0}</span>
                    <span className="usermenu__label">Корзина</span>
                </Link>
                <BasketShort />
            </li>
        </ul>
    );
};
