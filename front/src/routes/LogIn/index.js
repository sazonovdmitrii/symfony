import React, { useState } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import hardtack from 'hardtack';

import LoginForm from 'components/LoginForm';
import Button from 'components/Button';

export default withApollo(props => {
    const handleCompleted = ({ auth }) => {
        if (auth && auth.hash) {
            const date = new Date();
            const currentYear = date.getFullYear();

            date.setFullYear(currentYear + 1);
            hardtack.set('token', auth.hash, {
                path: '/',
                expires: date.toUTCString(),
            });
            props.client.writeData({ data: { isLoggedIn: true } });
            props.history.push('/');
        }
    };

    return (
        <div className="cabinet">
            <div className="page-header">
                <h1 className="page-header__title">Авторизация</h1>
            </div>
            <div className="cabinet-content">
                <div className="cabinet-content__row">
                    <div className="cabinet-content__column">
                        <LoginForm onCompleted={handleCompleted} />
                    </div>
                    <div className="cabinet-content__column rte">
                        <h5>Почему быть пользователем Laparfumerie.ru очень удобно?</h5>
                        <p>
                            - создайте свой личный кабинет и управляйте своим заказами
                            <br /> - получите возможность оставлять коментарии и оценивать товары
                            <br /> - отслеживайте изменения цен на понравившиеся товары в своей корзине
                            <br /> - получайте рассылку с самой актуальной и свежей информацией
                            <br /> - будьте в курсе новостей мира парфюмерных и косметических новинок
                        </p>
                        <Button to="/user/register" kind="primary" bold uppercase>
                            Зарегистрироваться
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
});
