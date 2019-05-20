import React, { Component } from 'react';

import Button from 'components/Button';

export default class Basket extends Component {
    constructor(props) {
        super(props);
    }

    handleNextStep = () => {
        // next step
    };

    render() {
        const { items } = this.props;

        if (!items) {
            return (
                <div
                    style={{
                        margin: '20px 0',
                        textAlign: 'center',
                        fontSize: '18px',
                        lineHeight: '48px',
                        background: '#f6f6f6',
                    }}
                >
                    В данный момент ваша корзина пуста.
                </div>
            );
        }

        return (
            <div>
                <div className="basket__title">
                    <h1 className="typography__catheader float_left basket__h1">Моя корзина</h1>
                    <div className="float_right">
                        <Button to="/" kind="secondary">
                            Продолжить покупки
                        </Button>
                        <Button onClick={this.handleNextStep} kind="primary">
                            Оформить заказ
                        </Button>
                    </div>
                </div>
                <table className="basket__table">
                    <thead>
                        <tr>
                            <td colSpan="2" className="basket__table-tdh">
                                Наименование
                            </td>
                            <td className="basket__table-tdh">
                                <span className="show-on-mobile">Кол-во</span>
                                <span className="hide-on-mobile">Количество</span>
                            </td>
                            <td className="basket__table-tdh">Скидка</td>
                            <td className="basket__table-tdh">Цена</td>
                            <td className="basket__table-tdh">Сумма</td>
                        </tr>
                    </thead>
                    <tbody data-handle="productBody">
                        <tr data-id="832728" data-render="productRow" className="basket__table-tr">
                            <td width="10%" align="center" className="basket__table-tdb">
                                <a
                                    target="_blank"
                                    href="/estee-lauder-tualetnye-duhi-estee.htm"
                                    className="cart-tbl__link hide-on-mobile"
                                >
                                    <img
                                        src="https://laparfumerie.ru/product/2016/07/14/3488_80025_658103_ru.jpg.small.jpg"
                                        height="60"
                                        alt=""
                                    />
                                </a>
                            </td>
                            <td width="50%" className="basket__table-tdb">
                                <strong className="basket__bold hide-on-mobile">Estee Lauder</strong>
                                <a
                                    className="basket__productname"
                                    target="_blank"
                                    href="/estee-lauder-tualetnye-duhi-estee.htm"
                                >
                                    Туалетные духи Estee Lauder Estee - 13 мл
                                </a>

                                <div className="basket__table-navitem hide-on-mobile">
                                    <span className="basket__bold basket__table-navitem-del">
                                        <span data-id="832728" data-handle="deleteProduct">
                                            ✖ Удалить покупку
                                        </span>
                                    </span>
                                </div>
                            </td>
                            <td width="10%" className="basket__table-tdb">
                                <div className="basket__count">
                                    <i className="basket__count-arrow">▼</i>
                                    <select className="basket__count-select" name="products-qty">
                                        {[...new Array(10).keys()].map((item, index) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="basket__count-label">3</span>
                                </div>
                            </td>
                            <td width="10%" className="basket__table-tdb">
                                12 %
                            </td>
                            <td width="10%" className="basket__table-tdb">
                                <span className="cart-price cart-price_role_original">1194 Руб.</span>

                                <span className="cart-price cart-price_role_final">1051 Руб.</span>
                            </td>
                            <td width="10%" className="basket__table-tdb">
                                <span
                                    className="cart-subtotal criteo-cart"
                                    data-id="832728"
                                    data-price="1051"
                                    data-name="Туалетные духи Estee Lauder Estee - 13 мл"
                                    data-render="productSum"
                                    data-quantity="3"
                                >
                                    3153
                                </span>
                                Руб.
                                <span
                                    className="show-on-mobile"
                                    style={{ float: 'right' }}
                                    data-id="832728"
                                    data-handle="deleteProduct"
                                >
                                    ✖
                                </span>
                            </td>
                        </tr>
                        <tr className="gift_row">
                            <td colSpan="2" className="basket__table-tdb">
                                <a
                                    className="link_role_add-gift"
                                    data-handle="modal"
                                    data-target="#list-gifts"
                                >
                                    <span className="basket__gifts-add">Добавить подарок</span>
                                </a>
                            </td>
                            <td colSpan="4" className="basket__table-tdb">
                                <div data-handle="minSumMessage" hidden="hidden">
                                    Минимальная сумма заказа по Москве и Московской области 500 руб, по
                                    регионам РФ - 1000 руб.
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3" className="basket__table-tdf">
                                <img className="basket__icon hide-on-mobile" src="/fe/images/car.png" />
                                <p className="basket__table-time">
                                    <strong className="basket__bold">
                                        Ожидаемое время доставки по Москве:
                                    </strong>
                                    <br />
                                    <span data-render="deliveryDate">до 14 дней</span>
                                </p>
                            </td>
                            <td colSpan="3" className="basket__table-tdf">
                                <table width="100%">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span className="show-on-mobile">Доставка: </span>
                                                <span className="hide-on-mobile">
                                                    Стоимость доставки по Москве:
                                                </span>
                                            </td>
                                            <td className="align_right">
                                                <span data-handle="deliveryPrice">Бесплатно</span>
                                            </td>
                                        </tr>
                                        <tr data-render="promocodeRow" />
                                        <tr className="basket__bold">
                                            <td>Итого:</td>
                                            <td className="align_right">
                                                <span data-render="totalSum">4111</span> <span>Руб.</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3" className="basket__table-tdf">
                                <div>
                                    <ul className="basket__table-list">
                                        <li className="basket__table-list-pt">✔ Удобные споcобы оплаты</li>
                                        <li className="basket__table-list-pt">✔ Бесплатная доставка</li>
                                        <li className="basket__table-list-pt">✔ Гарантия качества</li>
                                        <li className="basket__table-list-pt">✔ Бесплатный возврат</li>
                                    </ul>
                                </div>
                            </td>
                            <td colSpan="3" className="basket__table-tdf">
                                <div className="basket__table-list basket__table-infoblock float_right">
                                    <img className="basket__icon" src="/fe/images/info.png" />
                                    <p className="basket__table-infoblock-text">
                                        <span>
                                            Вы сможете ввести промо-код на стадии "Подтверждения заказа"
                                        </span>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}
