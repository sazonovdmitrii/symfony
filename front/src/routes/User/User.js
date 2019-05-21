import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router';

import Nav from 'components/Nav';

import AddressBook from 'routes/AddressBook';
import EditAddress from 'routes/EditAddress';
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
    { component: NotFound },
];

const loggedInRoutes = [
    { path: '/user/addressbook', component: AddressBook },
    { path: '/user/addressbook/edit/:id', component: EditAddress },
    { path: '/user/orders', component: Orders },
    { path: '/user/personal', component: Personal },
    { path: '/user/remind-password', component: RemindPassword },
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
        case 'remind-password':
            return 'Напомнить пароль';
        default:
            return 'Личный кабинет';
    }
};

class User extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        match: PropTypes.objectOf(PropTypes.string).isRequired,
    };

    constructor(props) {
        super(props);

        const {
            match: {
                params: { slug },
            },
        } = this.props;

        this.state = {
            title: getTitle(slug),
        };
    }

    componentDidUpdate(prevProps) {
        const {
            match: {
                params: { slug },
            },
        } = this.props;

        if (slug && slug !== prevProps.match.params.slug) {
            this.setState({
                title: getTitle(slug),
            });
        }
    }

    render() {
        const { isLoggedIn } = this.props;
        const { title } = this.state;

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
    }
}

export default withRouter(User);
