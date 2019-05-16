import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router';

import Nav from 'components/Nav';

import AddressBook from './AddressBook';
import EditAddress from './EditAddress';
import NotFound from './NotFound';
import Orders from './Orders';
import Personal from './Personal';
import Register from './Register';
import RemindPassword from './RemindPassword';
import Security from './Security';
import LogIn from './LogIn';

const routes = [
    { path: '/user/addressbook', component: AddressBook },
    { path: '/user/addressbook/edit/:id', component: EditAddress },
    { path: '/user/orders', component: Orders },
    { path: '/user/personal', component: Personal },
    { path: '/user/register', component: Register },
    { path: '/user/remind-password', component: RemindPassword },
    { path: '/user/security', component: Security },
    { path: '/user/register', component: Register },
    { path: '/user/login', component: LogIn },
    { component: NotFound },
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
        case 'register':
            return 'Регистрация';
        case 'login':
            return 'Авторизация';
        case 'remind-password':
            return 'Напомнить пароль';
        default:
            return 'Личный кабинет';
    }
};

const _ANON_ROUTES = ['register', 'login', 'remind-password'];

class User extends Component {
    constructor(props) {
        super(props);

        const {
            match: {
                params: { slug },
            },
        } = this.props;
        this.showNavs = slug ? _ANON_ROUTES.indexOf(slug) < 0 : true;

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
        const { title } = this.state;

        return (
            <div className="cabinet">
                <div className="page-header">
                    <h1 className="page-header__title">{title}</h1>
                    {this.showNavs && <Nav />}
                </div>
                <div className="cabinet-content">
                    <Switch>
                        {routes.map(({ component, path }, index) => (
                            <Route key={index} path={path} component={component} exact />
                        ))}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(User);
