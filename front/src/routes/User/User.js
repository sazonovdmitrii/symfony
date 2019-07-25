import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router';
import { Helmet } from 'react-helmet';

import Nav from 'components/Nav';

import AddressBook from 'routes/AddressBook';
import NotFound from 'routes/NotFound';
import Orders from 'routes/Orders';
import Personal from 'routes/Personal';
import Register from 'routes/Register';
import RemindPassword from 'routes/RemindPassword';
import Security from 'routes/Security';
import LogIn from 'routes/LogIn';

const routes = [
    { path: '/user/register', component: Register },
    { path: '/user/login', component: LogIn },
    { path: '/user/remind-password', component: RemindPassword },
    { component: NotFound },
];

const loggedInRoutes = [
    { path: '/user/addressbook', component: AddressBook },
    { path: '/user/orders', component: Orders },
    { path: '/user/personal', component: Personal },
    { path: '/user/security', component: Security },
];

const getTitle = (params = '') => {
    switch (params) {
        case 'personal':
            return 'Персональные данные';
        case 'addressbook':
            return 'Адреса';
        case 'security':
            return 'Смена пароля';
        case 'orders':
            return 'Мои заказы';
        default:
            return 'Личный кабинет';
    }
};

const User = ({
    match: {
        params: { slug },
    },
    isLoggedIn,
}) => {
    const titleBySlug = getTitle(slug);
    const [title, setTitle] = useState(titleBySlug);

    useEffect(() => {
        setTitle(titleBySlug);
    }, [slug, titleBySlug]);

    if (!isLoggedIn) {
        return (
            <Switch>
                {routes.map(({ component, path }, index) => (
                    <Route key={index} path={path} component={component} exact />
                ))}
            </Switch>
        );
    }

    return (
        <div className="cabinet">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="page-header">
                <h1 className="page-header__title">{title}</h1>
                <Nav />
            </div>
            <div className="cabinet-content">
                <Switch>
                    {loggedInRoutes.map(({ component, path }, index) => (
                        <Route key={index} path={path} component={component} exact />
                    ))}
                </Switch>
            </div>
        </div>
    );
};

User.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    match: PropTypes.shape({
        isExact: PropTypes.bool,
    }).isRequired,
};

export default withRouter(User);
