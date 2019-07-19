import React, { Fragment, useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { GET_BASKET } from 'query';
import Button from 'components/Button';

const REMOVE_PRODUCT_MUTATION = gql`
    mutation removeProduct($input: AddBasketInput!) {
        removeBasket(input: $input) {
            products {
                item_id
                qty
                name
                product_name
            }
        }
    }
`;

const BasketShort = ({ products: productsProps, className, delivery, currency, total_sum }) => {
    const [products, setProducts] = useState(productsProps.filter(Boolean) || []);
    const handleRemoveProduct = ({ removeBasket: { products: newProducts } }) => {
        console.log(newProducts);
        setProducts(newProducts);
    };

    return (
        <div className={`basket-short ${className}`}>
            {products.length ? (
                <Fragment>
                    <ul className="basket-short__list">
                        {products.map(
                            ({
                                item_id,
                                product_name,
                                name,
                                qty,
                                url = '',
                                brand_name,
                                sum,
                                prices,
                                image,
                            }) => (
                                <li key={item_id} className="basket-short__item">
                                    <div className="basket-short__item-img">
                                        <img src={`${image}.small.jpg`} alt="" />
                                    </div>
                                    <div className="basket-short__item-body">
                                        <a className="basket-short__item-link" href={url}>
                                            <div className="basket-short__item-brand">{brand_name}</div>
                                            <div className="basket-short__item-title">{product_name}</div>
                                            <div className="basket-short__item-property">{name}</div>
                                        </a>
                                        <Mutation
                                            mutation={REMOVE_PRODUCT_MUTATION}
                                            onCompleted={handleRemoveProduct}
                                        >
                                            {(remove, { error, data, loading }) => {
                                                console.log(error, data, loading);

                                                return (
                                                    <Button
                                                        className="basket-short__item-remove"
                                                        onClick={() =>
                                                            remove({
                                                                variables: { input: { item_id } },
                                                            })
                                                        }
                                                    >
                                                        ✖ Удалить покупку
                                                    </Button>
                                                );
                                            }}
                                        </Mutation>
                                    </div>
                                    <span className="basket-short__item-quantity">x&nbsp;{qty}&nbsp;шт.</span>
                                    {sum && (
                                        <div className="basket-short__item-sum">
                                            {discounted && (
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
                            )
                        )}
                    </ul>
                    <div className="basket-short__footer">
                        <div className="basket-short__row">
                            <div className="basket-short__column">
                                Стоимость доставки:
                                <p>{delivery ? `${delivery}&nbsp;${currency}` : 'Бесплатно'}</p>
                            </div>
                            <div className="basket-short__column--right">
                                Итого:&nbsp;
                                <span className="basket-short__total-sum">{total_sum || 0}</span>
                                &nbsp;{currency || 'руб.'}
                            </div>
                        </div>
                        <Button to="/basket/#adress" className="basket-short__btn" kind="primary" fullWidth>
                            Оформить заказ
                        </Button>
                    </div>
                </Fragment>
            ) : (
                <div className="basket-short__empty">В данный момент ваша корзина пуста.</div>
            )}
        </div>
    );
};

export default BasketShort;
