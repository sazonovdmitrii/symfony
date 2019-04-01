import React, { Component, Fragment } from 'react';

import Button from 'components/Button';

export default class BasketShort extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { items = [], basket = {} } = this.props;

        return (
            <div className="basket-short">
                {items ? (
                    <Fragment>
                        <ul className="basket-short__list">
                            {items.map(({ product, amount, sum, prices }) => (
                                <li className="basket-short__item">
                                    <div className="basket-short__item-img">
                                        <img src={`${product.image}.small.jpg`} alt="" />
                                    </div>
                                    <div className="basket-short__item-body">
                                        <a className="basket-short__item-link" href={product.url}>
                                            <div className="basket-short__item-brand">
                                                {product.brand_name}
                                            </div>
                                            <div className="basket-short__item-title">{product.name}</div>
                                            <div className="basket-short__item-property">
                                                {product.item_name}
                                            </div>
                                        </a>
                                        <span className="basket-short__item-remove">✖ Удалить покупку</span>
                                    </div>
                                    <span className="basket-short__item-quantity">
                                        x&nbsp;{amount}&nbsp;шт.
                                    </span>
                                    {sum.value && (
                                        <div className="basket-short__item-sum">
                                            {product.discounted && (
                                                <span className="basket-short__item-sum-sale">
                                                    {prices.basket_original_price.value}&nbsp;{sum.currency}
                                                </span>
                                            )}
                                            {sum.value}
                                            <span className="basket-short__item-sum-currency">
                                                {sum.currency}
                                            </span>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="basket-short__footer">
                            <div className="basket-short__row">
                                <div className="basket-short__column">
                                    Стоимость доставки:
                                    <p>
                                        {basket.delivery
                                            ? `${basket.delivery}&nbsp;${basket.currency}`
                                            : 'Бесплатно'}
                                    </p>
                                </div>
                                <div className="basket-short__column--right">
                                    Итого:&nbsp;
                                    <span className="basket-short__total-sum">{basket.total_sum || 0}</span>
                                    &nbsp;{basket.currency || 'руб.'}
                                </div>
                            </div>
                            <Button href="/basket/#adress" className="basket-short__btn" primary fullWidth>
                                Оформить заказ
                            </Button>
                        </div>
                    </Fragment>
                ) : (
                    <div className="basket-short__empty">В данный момент ваша корзина пуста.</div>
                )}
            </div>
        );
    }
}
