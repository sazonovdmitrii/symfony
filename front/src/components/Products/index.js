import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import ProductCard from 'components/ProductCard';
import BrandSale from 'components/BrandSale';
import Button from 'components/Button';

export default class Products extends Component {
    handleShowMore = () => {};

    render() {
        const {
            products = [
                { url: '/agent-provocateur-tualetnaye-duhi-agent-provocateur.htm' },
                { url: '/st-dupont-tualetnaya-voda-st-dupont-pour-homme.htm' },
            ],
        } = this.props;
        const page = '';
        const product_count = 1;

        const Banner = ({ url = '', alt = '' }) => (
            <img className="brand-banner__image" src={url} alt={alt} />
        );
        return (
            <Fragment>
                <ul className="catalog">
                    {products.map(item => (
                        <ProductCard key={item.id} url={item.url} />
                    ))}
                    <li className="brand-banner">
                        <Link to="/">
                            <Banner />
                        </Link>
                    </li>
                    {page === 'aromat' && product_count <= 2 && <BrandSale />}
                </ul>
                <Button
                    className="button--load-more"
                    onClick={this.handleShowMore}
                    kind="secondary"
                    fullWidth
                >
                    Показать еще ...
                </Button>
            </Fragment>
        );
    }
}
