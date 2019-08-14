import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
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
    const {
        data: { isLoggedIn },
    } = useQuery(IS_LOGGED_IN);
    const {
        loading,
        error,
        data: { basket },
    } = useQuery(GET_SHORT_BASKET, { ssr: false });

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
            {isLoggedIn ? (
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
                        <div className={styles.icon}>
                            <UserIcon size="24" />
                        </div>
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
            )}
            <li className={styles.item}>
                {loading || error ? null : (
                    <>
                        <Link className={styles.link} to="/basket">
                            <div className={styles.icon}>
                                <Badge badgeContent={basket.products.length} kind="primary">
                                    <ShoppingBagIcon size="24" />
                                </Badge>
                            </div>
                            <span className={styles.label}>Корзина</span>
                        </Link>
                        <BasketShort products={basket.products} className={styles.dropdown} />
                    </>
                )}
            </li>
        </ul>
    );
};

UserMenu.propTypes = {};

export default UserMenu;
