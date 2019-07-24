import React, { useState, Fragment } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import { IS_LOGGED_IN, GET_SHORT_BASKET } from 'query';
import { useApp } from 'hooks';

import BasketShort from 'components/BasketShort';
import Button from 'components/Button';
import LoginForm from 'components/LoginForm';
import { Dialog, DialogTitle, DialogContent } from 'components/Dialog';

import styles from './styles.css';

const UserMenu = () => {
    const { logout, login } = useApp();
    const [openModal, setOpenModal] = useState(false);
    const handleLogOut = async () => {
        await logout();
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleCompleted = async ({ auth }) => {
        if (auth && auth.hash) {
            await login(auth.hash);
            handleCloseModal();
        } else {
            // todo error
        }
    };

    return (
        <ul className={styles.root}>
            <Query query={IS_LOGGED_IN}>
                {({ data: { isLoggedIn } }) => {
                    return isLoggedIn ? (
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
                    );
                }}
            </Query>
            <li className={styles.item}>
                <Query query={GET_SHORT_BASKET} ssr={false} partialRefetch>
                    {({ loading, error, data }) => {
                        if (loading || error) return null;

                        const {
                            basket: { products },
                        } = data;

                        return (
                            <Fragment>
                                <Link className={styles.link} to="/basket">
                                    <span className={`${styles.icon} flaticon-shopping-bag`} />
                                    <span className="usermenu__labebasketcount">
                                        {products ? products.length : 0}
                                    </span>
                                    <span className={styles.label}>Корзина</span>
                                </Link>
                                <BasketShort products={products} className={styles.dropdown} />
                            </Fragment>
                        );
                    }}
                </Query>
            </li>
        </ul>
    );
};

UserMenu.propTypes = {};

export default UserMenu;
