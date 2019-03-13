import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/Button';

export default class Orders extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <table className="cabinet__order">
                <thead className="cabinet__order-data">
                    <tr>
                        <td className="cart-tbl__th" colSpan="3">
                            <h2 className="typography__subheader">Заказ №74078</h2>
                            <p>Состояние: New</p>
                            <p>
                                <strong className="basket__bold">Сумма: 1302.00 руб.</strong>
                            </p>
                        </td>
                        <td className="cart-tbl__th for_profile cart-tbl__th_align_center" width="165px">
                            2019-02-18 17:27:17
                            <br />
                            <br />
                            <Button
                                role="toggle-order"
                                className="show-order button button-red button-grey cabinet__order-data-button order-block"
                                secondary
                            >
                                Подробнее <i className="arrow-white" />
                            </Button>
                        </td>
                    </tr>
                </thead>
                <tbody className="cabinet__order-list">
                    <tr>
                        <td className="cart-tbl__td basket__bold">Наименование товара</td>
                        <td className="cart-tbl__td basket__bold">Цена</td>
                        <td className="cart-tbl__td align_right basket__bold">Количество</td>
                        <td className="cart-tbl__td align_right basket__bold">Сумма</td>
                    </tr>
                    <tr>
                        <td className="cart-tbl__td">
                            <Link
                                to="/cosmetics/uhod-za-kozhej/dlya-lica/antivozrastnye-sredstva/-novosvit-gialur-kislotakollagen-koncentrat-aqua-gel-24-chasa--4578.htm"
                                className="cart-tbl__link"
                            >
                                NOVOSVIT Гиалуроновая кислота&amp;Коллаген Концентрат "Aqua-гель" 24 часа 4578
                                - кислота 25 мл
                            </Link>
                        </td>
                        <td className="cart-tbl__td" />
                        <td className="cart-tbl__td align_right"> 7шт. </td>
                        <td className="cart-tbl__td align_right"> 186.00 руб. </td>
                    </tr>
                    <tr>
                        <td className="cart-tbl__td"> Ожидаемое время отгрузки: до 14 дней </td>
                        <td className="cart-tbl__td align_center" />
                        <td className="cart-tbl__td align_right basket__bold"> Доставка: </td>
                        <td className="cart-tbl__td align_right"> бесплатно </td>
                    </tr>
                    <tr>
                        <td className="cart-tbl__td" />
                        <td className="cart-tbl__td" />
                        <td className="cart-tbl__td align_right basket__bold">Итого:</td>
                        <td className="cart-tbl__td align_right">1302.00 руб.</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
