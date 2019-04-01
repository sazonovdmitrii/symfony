import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/Button';

export default class ProductCard extends Component {
    static defaultProps = {
        id: 0,
        url: '/products/123',
        items: [
            {
                name: 'Сыворотка против выпадения волос не смываемый 300 мл',
                price: 666,
            },
        ],
        sale: false,
        secondary_image: null,
        primary_image: null,
        brand_name: 'gucci',
        texts: {},
        cantbuy: 0,
        min_price: 666,
    };

    handleChangeImage = () => {
        // todo
    };

    render() {
        const {
            id,
            url,
            items = [],
            sale,
            secondary_image,
            primary_image,
            brand_name,
            texts = {},
            cantbuy,
            min_price,
        } = this.props;
        const not_available = items.some(item => item.not_available === 0) || 0;
        const price = () => {
            if (min_price && min_price > 0 && cantbuy !== 1) {
                return (
                    <Fragment>
                        от <span data-dtl="price">{min_price}</span> руб.
                    </Fragment>
                );
            }

            return <span className="catalog__item_price--soldout">ОЖИДАЕТСЯ ПОСТУПЛЕНИЕ</span>;
        };

        return (
            <li className="catalog__item">
                <div className="catalog__item-inner">
                    <span className="criteo-data" data-dtl="id" data-id={id} style={{ display: 'none' }}>
                        {id}
                    </span>
                    <Link to={`${url  }/test.htm`} className="catalog__item_link">
                        {sale && sale.discount > 0 && (
                            <span className="sale-item__bubble sale-item__bubble_role_discount">
                                -{sale.discount}%
                            </span>
                        )}
                        <div className="catalog__item_img" onMouseEnter={this.handleChangeImage}>
                            {secondary_image && primary_image ? (
                                <Fragment>
                                    <img
                                        src={`${primary_image}.product.jpg`}
                                        className="catalog__item_img-im--first"
                                        alt=""
                                    />
                                    <img
                                        src={`${secondary_image}.product.jpg`}
                                        className="catalog__item_img-im--second"
                                        alt=""
                                    />
                                </Fragment>
                            ) : (
                                <img
                                    src={'https://placehold.it/213x239' || `${primary_image}.product.jpg`}
                                    className="catalog__item_img-im"
                                    alt=""
                                />
                            )}
                        </div>
                        {!SEOHIDE && <h2 className="catalog__item_brand">{brand_name}</h2>}
                        <h3 className="catalog__item_name">{texts.product_name}</h3>
                    </Link>
                    <p className="catalog__item_price">{price()}</p>
                    <div className="catalog__item_prd">
                        {cantbuy !== 1 &&
                            items.map(data_alow => {
                                return (
                                    <p className="catalog__item_prd_type">
                                        <span className="catalog__item_prd_type_name">{data_alow.name}</span>
                                        <strong className="catalog__item_prd_type_price">
                                            {data_alow.price}
                                            <span className="catalog__item_prd_type_price_curren">р.</span>
                                        </strong>
                                    </p>
                                );
                            })}

                        {cantbuy !== 1 && items.length > 9 && (
                            <p className="catalog__item_prd_type">
                                <small>Ещё {items.size - 9} предложений в товаре</small>
                            </p>
                        )}
                        <Button href={url} fullWidth primary>
                            {cantbuy === 0 ? 'КУПИТЬ' : 'ОБЗОР'}
                        </Button>
                    </div>
                </div>
            </li>
        );
    }
}
