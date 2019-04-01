import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import AddressBook from './AddressBook';
import EditAddress from './EditAddress';
import NotFound from './NotFound';
import Orders from './Orders';
import Personal from './Personal';
import Register from './Register';
import RemindPassword from './RemindPassword';
import Security from './Security';

const routes = [
    { path: '/user/addressbook', component: AddressBook },
    { path: '/user/addressbook/edit/:id', component: EditAddress },
    { path: '/user/orders', component: Orders },
    { path: '/user/personal', component: Personal },
    { path: '/user/register', component: Register },
    { path: '/user/remind-password', component: RemindPassword },
    { path: '/user/security', component: Security },
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
        default:
            return 'Личный кабинет';
    }
};

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: getTitle(this.props.match.params.second) || 'Личный кабинет',
        };
    }
    componentDidUpdate(prevProps) {
        const { second } = this.props.match.params;

        if (second !== prevProps.match.params.second) {
            this.setState({
                title: getTitle(second),
            });
        }
    }
    render() {
        const { title } = this.state;

        return (
            <div className="cabinet">
                <div className="page-header">
                    <h1 className="page-header__title">{title}</h1>
                    <ul className="page-header-menu">
                        <li className="page-header-menu__item">
                            <NavLink to="/user/personal" className="page-header-menu__item-link">
                                Персональные данные
                            </NavLink>
                        </li>
                        <li className="page-header-menu__item">
                            <NavLink to="/user/addressbook" className="page-header-menu__item-link">
                                Моя адресная книга
                            </NavLink>
                        </li>
                        <li className="page-header-menu__item">
                            <NavLink to="/user/security" className="page-header-menu__item-link">
                                Смена пароля
                            </NavLink>
                        </li>
                        <li className="page-header-menu__item">
                            <NavLink to="/user/orders" className="page-header-menu__item-link">
                                Мои заказы
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="cabinet-content">
                    <Switch>
                        {routes.map(({ component, path }) => (
                            <Route key={path} path={path} component={component} exact />
                        ))}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(User);
