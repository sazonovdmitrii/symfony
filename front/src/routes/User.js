import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import Personal from './Personal';
import AddressBook from './AddressBook';
import Security from './Security';
import Orders from './Orders';

const component = props => {
    const { first, second } = props.match.params;
    const route = getRoute(second);

    return route;
};

const getRoute = (param = '') => {
    switch (param) {
        case 'personal':
            return <Personal />;
        case 'addressbook':
            return <AddressBook />;
        case 'security':
            return <Security />;
        case 'orders':
            return <Orders />;
        default:
            return null;
    }
};

const getContent = (first = '', second) => {
    switch (param) {
        case 'personal':
            return <Personal />;
        case 'addressbook':
            return <AddressBook />;
        case 'security':
            return <Security />;
        case 'orders':
            return <Orders />;
        default:
            return null;
    }
};

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
                            <Link to="/user/personal" className="page-header-menu__item-link">
                                Персональные данные
                            </Link>
                        </li>
                        <li className="page-header-menu__item">
                            <Link to="/user/addressbook" className="page-header-menu__item-link">
                                Моя адресная книга
                            </Link>
                        </li>
                        <li className="page-header-menu__item">
                            <Link to="/user/security" className="page-header-menu__item-link">
                                Смена пароля
                            </Link>
                        </li>
                        <li className="page-header-menu__item">
                            <Link to="/user/orders" className="page-header-menu__item-link">
                                Мои заказы
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="cabinet-content">
                    <Switch>
                        <Route path="/:first/:second" component={component} exact={true} />
                        <Route path="/:first/:second/:third/:fourth" component={component} exact={true} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(User);
