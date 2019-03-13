import React, { Component, Fragment } from 'react';

export default class ProductCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const not_available = product.items.some(item => item.not_available === 0) || 0;
        const price = () => {
            if (product.min_price && product.min_price > 0 && product.cantbuy != 1) {
                return (
                    <Fragment>
                        от <span data-dtl="price">{product.min_price}</span> руб.
                    </Fragment>
                );
            } else if (!product.brand_name) {
            } else {
                <span className="catalog__item_price--soldout">ОЖИДАЕТСЯ ПОСТУПЛЕНИЕ</span>;
            }
        };

        return (
            <li className="catalog__item">
                <span className="criteo-data" data-dtl="id" data-id={product.id} style="display: none">
                    {product.id}
                </span>
                <a href={product.url} className="catalog__item_link">
                    {product.sale && product.sale.discount > 0 && (
                        <span className="sale-item__bubble sale-item__bubble_role_discount">
                            -{product.sale.discount}%
                        </span>
                    )}
                    <div className="catalog__item_img">
                        {product.secondary_image && product.primary_image ? (
                            <Fragment>
                                <img
                                    src={`${product.primary_image}.product.jpg`}
                                    className="catalog__item_img-im--first"
                                />
                                <img
                                    src={`${product.secondary_image}.product.jpg`}
                                    className="catalog__item_img-im--second"
                                />
                            </Fragment>
                        ) : (
                            <img
                                src={`${product.primary_image}.product.jpg`}
                                className="catalog__item_img-im"
                            />
                        )}
                    </div>
                    {!SEOHIDE && <h2 className="catalog__item_brand">{product.brand_name}</h2>}
                    <h3 className="catalog__item_name">{product.texts.product_name}</h3>
                </a>
                <p className="catalog__item_price">{price()}</p>
                <div className="catalog__item_prd">
                    {product.cantbuy != 1 &&
                        product.items.map(data_alow => {
                            if (loop.count > 9) {
                                return (
                                    <p className="catalog__item_prd_type">
                                        <small>Ещё {product.items.size - 9} предложений в товаре</small>
                                    </p>
                                );
                            }

                            return (
                                <p className="catalog__item_prd_type">
                                    <span className="catalog__item_prd_type_name">{data_alow.name}</span>
                                    <strong className="catalog__item_prd_type_price">
                                        {data_alow.prices.sale_price.value ||
                                            data_alow.prices.final_price.value}
                                        <span className="catalog__item_prd_type_price_curren">р.</span>
                                    </strong>
                                </p>
                            );
                        })}
                    <a href={product.url} className="catalog__item_prd_button">
                        {product.cantbuy == 0 ? 'КУПИТЬ' : 'ОБЗОР'}
                    </a>
                </div>
            </li>
        );
    }
}
