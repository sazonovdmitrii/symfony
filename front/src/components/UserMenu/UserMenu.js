import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import hardtack from 'hardtack';

import BasketShort from 'components/BasketShort';
import Button from 'components/Button';
import LoginForm from 'components/LoginForm';
import { Dialog, DialogTitle, DialogContent } from 'components/Dialog';

import styles from './styles.css';

const UserMenu = ({ client, isLoggedIn, history }) => {
    const [openModal, setOpenModal] = useState(false);
    const basket_items_count = 0;
    const handleLogOut = async () => {
        hardtack.remove('token', { path: '/' });
        await client.resetStore();

        history.push('/');
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleCompleted = ({ auth }) => {
        if (auth && auth.hash) {
            const date = new Date();
            const currentYear = date.getFullYear();

            date.setFullYear(currentYear + 1);
            hardtack.set('token', auth.hash, {
                path: '/',
                expires: date.toUTCString(),
            });
            client.writeData({ data: { isLoggedIn: true } });
            handleCloseModal();
        }
    };

    return (
        <ul className={styles.root}>
            {isLoggedIn ? (
                <li className={styles.item}>
                    <Link className={styles.link} to="/user/personal/">
                        <span className={`${styles.icon} flaticon-avatar`} />
                        <span className={styles.label}>Ваш кабинет</span>
                    </Link>
                    <ul className={styles.submenu}>
                        <li className="usermenu__subitem">
                            <Link className="usermenu__sublink" to="/user/personal">
                                Персональные данные
                            </Link>
                        </li>
                        <li className="usermenu__subitem">
                            <Link className="usermenu__sublink" to="/user/addressbook">
                                Адресная книга
                            </Link>
                        </li>
                        <li className="usermenu__subitem">
                            <Link className="usermenu__sublink" to="/user/orders">
                                Ваши заказы
                            </Link>
                        </li>
                        <li className="usermenu__subitem">
                            <Button
                                className="usermenu__sublink"
                                kind="primary"
                                size="small"
                                onClick={handleLogOut}
                                outlined
                            >
                                Выход
                            </Button>
                        </li>
                    </ul>
                </li>
            ) : (
                <li className={styles.item}>
                    <button type="button" className={styles.link} onClick={() => setOpenModal(true)}>
                        <span className={`${styles.icon} flaticon-avatar`} />
                        <span className={styles.label}>Войти</span>
                    </button>
                    {openModal && (
                        <Dialog open={openModal} onClose={handleCloseModal}>
                            <DialogTitle>
                                Добро пожаловать на LaParfumerie.ru! Присоединяйтесь к нам!
                            </DialogTitle>
                            <DialogContent>
                                <LoginForm onCompleted={handleCompleted} />
                            </DialogContent>
                        </Dialog>
                    )}
                </li>
            )}
            <li className={styles.item}>
                <Link className={styles.link} to="/basket">
                    <span className={`${styles.icon} flaticon-shopping-bag`} />
                    <span className="usermenu__labebasketcount">{basket_items_count || 0}</span>
                    <span className={styles.label}>Корзина</span>
                </Link>
                <BasketShort className={styles.dropdown} />
            </li>
        </ul>
    );
};

UserMenu.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

export default withRouter(UserMenu);
