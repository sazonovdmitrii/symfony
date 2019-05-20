import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'components/Button';

import Loader from './Loader';
import styles from './styles.css';

const ProductCard = ({
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
    name,
    loading,
    price,
}) => {
    const myPrice = () => {
        if (min_price && min_price > 0 && cantbuy !== 1) {
            return (
                <Fragment>
                    от{' '}
                    <span>
                        {
                            items.sort((a, b) => {
                                if (a.price > b.price) return -1;
                            })[0].price
                        }
                    </span>{' '}
                    руб.
                </Fragment>
            );
        }

        return <span className="catalog__item_price--soldout">Ожидается поступление</span>;
    };

    if (loading) return <Loader />;

    return (
        <div className={0 && styles.wrapper}>
            <div className="catalog__item-inner">
                <span className="criteo-data" data-dtl="id" data-id={id} style={{ display: 'none' }}>
                    {id}
                </span>
                <Link to={url} className="catalog__item_link">
                    {sale && sale.discount > 0 && (
                        <span className="sale-item__bubble sale-item__bubble_role_discount">
                            -{sale.discount}%
                        </span>
                    )}
                    <div className="catalog__item_img">
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
                            <Fragment>
                                <img
                                    src={'https://placehold.it/213x239/000' || `${primary_image}.product.jpg`}
                                    className="catalog__item_img-im--first"
                                    alt=""
                                />
                                <img
                                    src={'https://placehold.it/213x239' || `${primary_image}.product.jpg`}
                                    className="catalog__item_img-im--second"
                                    alt=""
                                />
                            </Fragment>
                        )}
                    </div>
                    {!SEOHIDE && <h2 className="catalog__item_brand">{brand_name}</h2>}
                    <h3 className="catalog__item_name">{name}</h3>
                </Link>
                <p className="catalog__item_price">{myPrice()}</p>
                <div className="catalog__item_prd">
                    {items.edges.map(({ node: item }) => {
                        if (!item.price) return null;

                        return (
                            <p key={item.name} className="catalog__item_prd_type">
                                <span className="catalog__item_prd_type_name">{item.name}</span>
                                <strong className="catalog__item_prd_type_price">
                                    {item.price}
                                    <span className="catalog__item_prd_type_price_curren">р.</span>
                                </strong>
                            </p>
                        );
                    })}
                    {items.edges.length > 9 && (
                        <p className="catalog__item_prd_type">
                            <small>Ещё {items.edges.length - 9} предложений в товаре</small>
                        </p>
                    )}
                    <Button className={styles.button} href={url} kind="primary">
                        {price ? 'КУПИТЬ' : 'ОБЗОР'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

ProductCard.defaultProps = {
    id: 0,
    url: '',
    items: [
        {
            name: 'Сыворотка против выпадения волос не смываемый 300 мл',
            price: 666,
        },
    ],
    sale: false,
    secondary_image: null,
    primary_image: null,
    brand_name: '',
    name: '',
    texts: {},
    cantbuy: 0,
    min_price: 0,
};

ProductCard.propTypes = {
    url: PropTypes.string.isRequired,
};

export default ProductCard;
