import React from 'react';
import { Link } from 'react-router-dom';

import SearchForm from 'components/SearchForm';

import classnames from 'classnames';

export default ({ all_brands_top_menu = {}, className }) => {
    const menuClassName = classnames('mainmenu', className);

    return (
        <ul className={menuClassName} data-behavior="menuModule">
            <li data-handle="opensubmenu" className="mainmenu__item">
                <Link className="mainmenu__link" to="/brands/">
                    Бренды
                </Link>
                <div data-render="submenu" className="mainmenu__brandmenu">
                    <ul className="mainmenu__brandmenu_list">
                        {(all_brands_top_menu.pairs || []).map((pair, index) => (
                            <li
                                className={`mainmenu__brandmenu_item${loop.count ==
                                    all_brands_top_menu.pairs.size && '--last'}${loop.count == 1 &&
                                    '--first'}`}
                            >
                                <span>{pair.key || 'Бестселлеры'}</span>
                                <div className="mainmenu__brandmenu_wrapper">
                                    <div className="mainmenu__brandmenu_bigletter">
                                        <span>{pair.key || 'ТB'}</span>
                                        {pair.key == 0 && <small>top brands</small>}
                                        <img
                                            data-render="imagehover"
                                            className="mainmenu__brandmenu_logo"
                                            src=""
                                            alt=""
                                        />
                                    </div>
                                    <ul className="mainmenu__brandmenu_brandlist">
                                        {(pair.value || []).map(brand => (
                                            <li className="mainmenu__brandmenu_brandlist_item">
                                                <Link
                                                    className="mainmenu__brandmenu_brandlist_item_link[% 'bold' IF  brand.left_menu %]"
                                                    to={brand.url}
                                                    data-handle="imagehover"
                                                    data-content={brand.images[0].value}
                                                >
                                                    {brand.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </li>
            <li data-handle="opensubmenu" className="mainmenu__item">
                <Link className="mainmenu__link" to="/parfumeriya/">
                    Парфюмерия
                </Link>
            </li>
            <li data-handle="opensubmenu" className="mainmenu__item">
                <Link className="mainmenu__link" to="/sales/">
                    Акции
                </Link>
            </li>
            <li className="mainmenu__item--search">
                <SearchForm />
            </li>
        </ul>
    );
};
