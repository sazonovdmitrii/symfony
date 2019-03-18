import React, { Component } from 'react';

import Button from 'components/Button';
import Tabs from 'components/Tabs';
import Tab from 'components/Tabs/Tab';
import TabsView from 'components/Tabs/TabsView';

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabIndex: 0,
        };
    }
    handleChangeTab = ({ value }) => {
        this.setState({
            tabIndex: value,
        });
    };
    render() {
        const { tabIndex } = this.state;

        return (
            <div className="product">
                <p className="admin-edit">
                    <a className="admin-edit__link" href="http://mng.laparfumerie.ru/product/edit/2933">
                        администрировать
                    </a>
                </p>
                <div className="product__row">
                    <div className="product__brand">
                        <img
                            src="/catalog/2013/08/23/26289_237976.jpg.small.jpg"
                            data-handle="pseudolinks"
                            data-path="/duhi-agent-provocateur/"
                            className="product__brand-img"
                            alt="Agent Provocateur"
                        />
                        <span
                            className="product__brand-name"
                            data-handle="pseudolinks"
                            data-path="/duhi-agent-provocateur/"
                        >
                            Agent Provocateur
                        </span>
                        <h1 className="product__brand-title">Туалетные духи Agent Provocateur</h1>
                        <p className="product__brand-subtitle">Туалетные духи Агент Провокатор</p>
                        <div className="product__brand-stat">
                            <div className="product__brand-stat-star">
                                <i className="product-element__star--active" />
                                <i className="product-element__star--active" />
                                <i className="product-element__star--active" />
                                <i className="product-element__star--active" />
                            </div>
                            <span className="product__brand-stat-review">
                                <a href="#review">
                                    <i>1</i> отзыва
                                </a>
                            </span>
                            <div className="product__brand-stat-like">
                                <i className="product__brand-stat-like-img" />
                                <span className="product__brand-stat-like-num">
                                    <i>20</i> нравится
                                </span>
                            </div>
                        </div>
                        <div className="product__brand-info">
                            <Tabs value={tabIndex} onChange={this.handleChangeTab}>
                                <Tab className="product__brand-info-li" selected>
                                    Доставка
                                </Tab>
                                <Tab className="product__brand-info-li">
                                    Подарки к заказу
                                    <span className="gifts-json__count" data-render="gifts_count">
                                        2
                                    </span>
                                </Tab>
                                <Tab className="product__brand-info-li">Оплата</Tab>
                            </Tabs>
                            <TabsView index={tabIndex}>
                                <div className="product__brand-info-shipp product__brand-info-block">
                                    <p className="product__brand-info-shipp-p">
                                        Стоимость:
                                        <span data-render="minDelivery" data-price="1000">
                                            бесплатно по Москве от 1000 руб.; по&nbsp;России от 3000 руб.
                                        </span>
                                    </p>
                                    <p className="product__brand-info-shipp-p">
                                        Доставка по Москве:
                                        <span
                                            data-render="delivery_string"
                                            className="product__brand-info-shipp-p-date"
                                        >
                                            1-3 дня
                                        </span>
                                    </p>
                                    <ul className="product__brand-info-shipp-ul">
                                        <p className="product__brand-info-shipp-ul-p">Способ доставки:</p>
                                        <li className="product__brand-info-shipp-ul-post">
                                            <a href="http://laparfumerie.ru/info/dostavka-pochta-rossii.htm">
                                                Почта России
                                            </a>
                                            ,
                                        </li>
                                        <li className="product__brand-info-shipp-ul-post">
                                            <a href="http://laparfumerie.ru/info/delivery-and-payment.htm">
                                                Собственная курьерская служба
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </TabsView>
                        </div>
                    </div>
                    <div className="product__image">image</div>
                    <div data-behavior="addToCart" className="product__cart">
                        <div className="product__cart-block">
                            <div className="product__cart-block-name">
                                <h2 className="product__cart-block-name-h2">
                                    Туалетные духи 100 мл (тестер)
                                </h2>
                                <p className="product__cart-block-name-art">
                                    Артикул <span className="product__cart-block-name-art-id">266816490</span>
                                </p>
                            </div>
                            <div className="product__cart-block-price active">
                                <strong className="product__cart-block-price-new">
                                    2610
                                    <span className="product__cart-block-price-currer">
                                        руб.
                                        <span />
                                    </span>
                                </strong>
                            </div>
                            <div className="product__cart-block-button">
                                <form
                                    id="cart_quantity"
                                    action="/basket/add"
                                    method="post"
                                    role="add-to-basket"
                                    className="product__cart-block-button-form product-item__frm"
                                >
                                    <input type="hidden" id="item_val" name="item_id" value="23599" />
                                    <input type="hidden" name="product_id" value="2933" />
                                    <div className="left-3" style={{ width: '60px' }}>
                                        <select
                                            name="amount"
                                            id="amount"
                                            data-price=""
                                            data-card="2922.00"
                                            className="select-group"
                                        >
                                            <option value="1">1</option> <option value="2">2</option>
                                            <option value="3">3</option> <option value="4">4</option>
                                            <option value="5">5</option> <option value="6">6</option>
                                            <option value="7">7</option> <option value="8">8</option>
                                            <option value="9">9</option> <option value="10">10</option>
                                        </select>
                                        <input type="hidden" data-name="name" value="" />
                                        <i className="click-arrow" />
                                    </div>
                                    <Button type="button" primary>
                                        Добавить в корзину
                                    </Button>
                                </form>
                            </div>
                            <div className="product__cart-block-type">
                                <ul data-behavior="utmCheck" className="product__cart-block-type-ul">
                                    <li
                                        data-handle="card_item"
                                        className="product__cart-block-type-ul-li product__cart-block-type-ul-li-active"
                                        data-price="2610"
                                        data-oldprice="2610"
                                        data-value="23599"
                                        data-title="Туалетные духи 100 мл (тестер)"
                                        data-id="266816490"
                                        data-delivery-date="1-3 дня"
                                    >
                                        <div className="product__cart-block-type-ul-li-container">
                                            <img
                                                src="/item/2015/01/18/23599_45305_353568.jpg.smaller.jpg"
                                                alt="Туалетные духи Agent Provocateur Туалетные духи 100 мл (тестер)"
                                                className="product__cart-block-type-ul-li-container-img"
                                            />
                                        </div>
                                        <div className="product__cart-block-type-ul-li-nameblock">
                                            Туалетные духи 100 мл (тестер)
                                            <div className="product__cart-block-type-ul-li-nameblock-price">
                                                2610
                                                <span className="product__cart-block-type-ul-li-nameblock-currer">
                                                    руб.
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        data-handle="card_item"
                                        className="product__cart-block-type-ul-li--not_available"
                                    >
                                        <div className="product__cart-block-type-ul-li-container">
                                            <img
                                                src="/item/2015/01/18/3540_45303_353566.jpg.smaller.jpg"
                                                alt="Туалетные духи Agent Provocateur Туалетные духи 50 мл"
                                                className="product__cart-block-type-ul-li-container-img"
                                            />
                                        </div>
                                        <div className="product__cart-block-type-ul-li-nameblock">
                                            Туалетные духи 50 мл
                                            <div className="product__cart-block-type-ul-li-nameblock-available">
                                                Ожидает поступления
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
