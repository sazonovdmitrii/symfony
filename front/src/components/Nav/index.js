import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Nav = ({ items }) => (
    <ul className="page-header-menu">
        {items.map(({ url, name }) => (
            <li key={url} className="page-header-menu__item">
                <NavLink to={url} className="page-header-menu__item-link">
                    {name}
                </NavLink>
            </li>
        ))}
    </ul>
);

Nav.defaultProps = {
    items: [
        {
            name: 'Персональные данные',
            url: '/user/personal',
        },
        {
            name: 'Моя адресная книга',
            url: '/user/addressbook',
        },
        {
            name: 'Смена пароля',
            url: '/user/security',
        },
        {
            name: 'Мои заказы',
            url: '/user/orders',
        },
    ],
};

Nav.propTypes = {};

export default Nav;
