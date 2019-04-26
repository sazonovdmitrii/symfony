import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import ProductCard from 'components/ProductCard';
import BrandSale from 'components/BrandSale';
import Button from 'components/Button';

const Banner = ({ url = '', alt = '' }) => (
    <img className="brand-banner__image" src={url} alt={alt} style={{ width: '100%' }} />
);

const Products = ({ items = [], onLoadMore, count, page = '', loading = true }) => {
    return (
        <Fragment>
            <ul className="catalog">
                {items.map((item, index, array) => (
                    <Fragment key={item.node.id}>
                        <ProductCard {...item.node} loading={loading} />
                        {!SERVER && // seohide
                        page === 'brand' &&
                        array.length !== index + 1 && // skip last row
                        index &&
                        parseInt((index + 1) / 8, 10) === (index + 1) / 8 ? (
                            <li className="brand-banner">
                                <Link to="/">
                                    <Banner url="https://laparfumerie.ru/catalog/2013/08/22/25981_236427.jpg" />
                                </Link>
                            </li>
                        ) : null}
                    </Fragment>
                ))}
                {page === 'aromat' && product_count <= 2 && <BrandSale />}
            </ul>
            {count !== items.length && onLoadMore && (
                <Button className="button--load-more" onClick={onLoadMore} kind="secondary" fullWidth>
                    Показать еще ...
                </Button>
            )}
        </Fragment>
    );
};

export default Products;
