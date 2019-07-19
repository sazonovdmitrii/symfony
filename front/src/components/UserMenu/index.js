import React, { useState, Fragment } from 'react';
import { withApollo, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import hardtack from 'hardtack';

import { IS_LOGGED_IN, GET_BASKET } from 'query';

import BasketShort from 'components/BasketShort';
import Button from 'components/Button';
import LoginForm from 'components/LoginForm';
import { Dialog, DialogTitle, DialogContent } from 'components/Dialog';

import styles from './styles.css';

const UserMenu = ({ client, history }) => {
    const [openModal, setOpenModal] = useState(false);
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
                <Query query={GET_BASKET} ssr={false} partialRefetch>
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
                                <BasketShort {...data.basket} className={styles.dropdown} />
                            </Fragment>
                        );
                    }}
                </Query>
            </li>
        </ul>
    );
};

UserMenu.propTypes = {
    client: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.array,
            PropTypes.func,
            PropTypes.bool,
        ])
    ).isRequired,
    history: PropTypes.object.isRequired,
};

export default withApollo(withRouter(UserMenu));
