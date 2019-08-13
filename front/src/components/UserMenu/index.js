import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { ShoppingBag as ShoppingBagIcon, User as UserIcon } from 'react-feather';

import { IS_LOGGED_IN, GET_SHORT_BASKET } from 'query';
import { useApp } from 'hooks';

import BasketShort from 'components/BasketShort';
import Button from 'components/Button';
import LoginForm from 'components/LoginForm';
import Badge from 'components/Badge';
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
                                <div className={styles.icon}>
                                    <UserIcon size="24" />
                                </div>
                                <div className={styles.label}>Ваш кабинет</div>
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
                                <UserIcon className={styles.icon} size="24" />
                                <div className={styles.label}>Войти</div>
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
                            <>
                                <Link className={styles.link} to="/basket">
                                    <div className={styles.icon}>
                                        <Badge badgeContent={products.length} kind="primary">
                                            <ShoppingBagIcon size="24" />
                                        </Badge>
                                    </div>
                                    <span className={styles.label}>Корзина</span>
                                </Link>
                                <BasketShort products={products} className={styles.dropdown} />
                            </>
                        );
                    }}
                </Query>
            </li>
        </ul>
    );
};

UserMenu.propTypes = {};

export default UserMenu;
