import React from 'react';
import { Link } from 'react-router-dom';

import funnelIcon from './images/funnel.png';

export default () => (
    <div data-behavior="leftModule" className="catalogpage__leftmenu">
        <button type="button" className="leftcolumn__mobileshow--filters" data-handle="openMenu">
            Категории <img src="/fe/images/down.png" alt="" />
        </button>
        <button type="button" className="leftcolumn__mobilesfiltes" data-handle="showfiltersmobile">
            <img src={funnelIcon} alt="" />
        </button>
        <ul className="leftcolumn">
            <li className="leftcolumn__item">
                <span className="leftcolumn__link--current">Парфюмерия</span>
                <ul className="leftcolumn__submenu">
                    <li className="leftcolumn__item">
                        <Link to="/parfumeriya-lyuks--elitnaya/" className="leftcolumn__link">
                            Люкс / Элитная
                        </Link>
                    </li>
                    <li className="leftcolumn__item">
                        <Link to="/parfumeriya-selektivnaya--nishevaya/" className="leftcolumn__link">
                            Селективная / Нишевая
                        </Link>
                    </li>
                    <li className="leftcolumn__item">
                        <Link to="/parfumeriya-nabory/" className="leftcolumn__link">
                            Наборы
                        </Link>
                    </li>
                    <li className="leftcolumn__item">
                        <Link to="/parfumeriya-probniki/" className="leftcolumn__link">
                            Пробники
                        </Link>
                    </li>
                    <li className="leftcolumn__item">
                        <Link to="/parfumeriya-podarochnye-nabory/" className="leftcolumn__link">
                            Подарочные наборы
                        </Link>
                    </li>
                    <li className="leftcolumn__item">
                        <Link to="/parfumeriya-tualetnaya-voda/" className="leftcolumn__link">
                            Туалетная вода
                        </Link>
                    </li>
                    <li className="leftcolumn__item">
                        <Link to="/parfumeriya-tualetnye-duhi/" className="leftcolumn__link">
                            Туалетные духи
                        </Link>
                    </li>
                </ul>
            </li>
            <li className="leftcolumn__item">
                <Link to="/cosmetics/" className="leftcolumn__link">
                    Косметика
                </Link>
            </li>
            <li className="leftcolumn__item">
                <Link to="/tovary-dlya-doma/" className="leftcolumn__link">
                    Товары для дома
                </Link>
            </li>
            <li className="leftcolumn__item">
                <Link to="/podarochnye-nabory/" className="leftcolumn__link">
                    Подарочные наборы
                </Link>
            </li>
        </ul>
        <div className="catalogpage__leftmenu-gradient" />
    </div>
);
