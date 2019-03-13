import React, { Component, Fragment } from 'react';

import ProductCard from 'components/ProductCard';
import BrandSale from 'components/BrandSale';

export default class Products extends Component {
    handleShowMore = () => {};
    render() {
        const { products = [] } = this.props;
        const vrs = { banners: [] };
        const page = '';
        const product_count = 1;

        const Banner = ({ url = '', alt = '' }) => (
            <img className="brand-banner__image" src={url} alt={alt} />
        );
        return (
            <Fragment>
                <ul className="catalog">
                    {products.map(product => {
                        <ProductCard key={product.id} />;
                    })}
                    <li className="brand-banner">
                        <a href="">
                            <Banner />
                        </a>
                    </li>
                    {page == 'aromat' && product_count <= 2 && <BrandSale />}
                </ul>
                <button className="button--load-more" onClick={this.handleShowMore}>
                    Показать еще ...
                </button>
            </Fragment>
        );
    }
}
