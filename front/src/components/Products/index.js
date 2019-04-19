import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import ProductCard from 'components/ProductCard';
import BrandSale from 'components/BrandSale';
import Button from 'components/Button';

const Products = ({
    items = [
        { id: 1, url: '/agent-provocateur-tualetnaye-duhi-agent-provocateur.htm' },
        { id: 2, url: '/st-dupont-tualetnaya-voda-st-dupont-pour-homme.htm' },
    ],
    onLoadMore,
}) => {
    const page = '';
    const product_count = 1;

    const Banner = ({ url = '', alt = '' }) => <img className="brand-banner__image" src={url} alt={alt} />;
    return (
        <Fragment>
            <ul className="catalog">
                {items.map(item => (
                    <ProductCard key={item.id} url={item.url} />
                ))}
                <li className="brand-banner">
                    <Link to="/">
                        <Banner />
                    </Link>
                </li>
                {page === 'aromat' && product_count <= 2 && <BrandSale />}
            </ul>
            <Button className="button--load-more" onClick={onLoadMore} kind="secondary" fullWidth>
                Показать еще ...
            </Button>
        </Fragment>
    );
};

export default Products;
