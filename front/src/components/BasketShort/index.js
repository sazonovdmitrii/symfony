import React, { Fragment, useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { GET_BASKET } from 'query';
import Button from 'components/Button';

const CURRENCY = 'Руб.';

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

const BasketShort = ({ products: productsProps, className, delivery }) => {
    const [products, setProducts] = useState(productsProps);
    const handleRemoveProduct = ({ removeBasket: { products: newProducts } }) => {
        setProducts(newProducts);
    };
    const totalSum = products.reduce((sum, { price, qty }) => sum + price * qty, 0);

    useEffect(() => {
        setProducts(productsProps);
    }, [productsProps.length]);

    return (
        <div className={`basket-short ${className}`}>
            {products.length ? (
                <Fragment>
                    <ul className="basket-short__list">
                        {products.map(
                            ({
                                item_id: id,
                                product_name,
                                name,
                                qty,
                                url = '',
                                brand_name,
                                price,
                                discount,
                            }) => (
                                <li key={id} className="basket-short__item">
                                    <div className="basket-short__item-img">
                                        <img src="https://placehold.it/60x60" alt="" />
                                    </div>
                                    <div className="basket-short__item-body">
                                        <a className="basket-short__item-link" href={url}>
                                            {brand_name && (
                                                <div className="basket-short__item-brand">{brand_name}</div>
                                            )}
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
                                                        onClick={() => {
                                                            remove({
                                                                variables: { input: { item_id: id } },
                                                            });
                                                        }}
                                                    >
                                                        ✖ Удалить покупку
                                                    </Button>
                                                );
                                            }}
                                        </Mutation>
                                    </div>
                                    <span className="basket-short__item-quantity">x&nbsp;{qty}&nbsp;шт.</span>
                                    {price && (
                                        <div className="basket-short__item-sum">
                                            {discount && (
                                                <span className="basket-short__item-sum-sale">
                                                    {discount}&nbsp;{CURRENCY}
                                                </span>
                                            )}
                                            {price}&nbsp;
                                            <span className="basket-short__item-sum-currency">
                                                {CURRENCY}
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
                                <span className="basket-short__total-sum">{totalSum}</span>
                                &nbsp;{CURRENCY}
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
