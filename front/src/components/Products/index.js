import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_PRODUCTS } from 'query';

import ProductCard from 'components/ProductCard';
import BrandSale from 'components/BrandSale';
import Button from 'components/Button';
import Loader from 'components/Loader';

import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Products = ({ title, page, slug, limit, offset, col, className }) => {
    const rowClassName = cx(styles.row, className);
    const colClassName = cx(styles.col, {
        [`col${col}`]: col,
    });

    return (
        <Query query={GET_PRODUCTS} variables={{ slug, limit, offset }}>
            {({ loading, error, data, fetchMore }) => {
                if (loading && !data.catalog) return <Loader />;
                if (error || !data) {
                    console.error(`Error: ${error}`);
                    return null;
                }

                const { products, count } = data.catalog;

                return (
                    <>
                        {title || null}
                        <div className={'catalog' || rowClassName}>
                            {products &&
                                products.edges.map((item, index, array) => (
                                    <div key={item.node.id} className={'catalog__item' || colClassName}>
                                        <ProductCard {...item.node} loading={loading} />
                                        {!SERVER && // seohide
                                        page === 'brand' &&
                                        array.length !== index + 1 && // skip last row
                                        index &&
                                        parseInt((index + 1) / 8, 10) === (index + 1) / 8 ? (
                                            <div className="brand-banner">
                                                <Link to="/">
                                                    <img
                                                        className="brand-banner__image"
                                                        src="https://laparfumerie.ru/catalog/2013/08/22/25981_236427.jpg"
                                                        style={{ width: '100%' }}
                                                        alt=""
                                                    />
                                                </Link>
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                            {page === 'aromat' && <BrandSale />}
                        </div>
                        {count !== products.edges.length && (
                            <Button
                                className="button--load-more"
                                onClick={() =>
                                    fetchMore({
                                        variables: {
                                            offset: products.edges.length,
                                        },
                                        updateQuery: (prev, { fetchMoreResult }) => {
                                            if (!fetchMoreResult) return prev;

                                            const newEdges = fetchMoreResult.catalog.products.edges;

                                            return newEdges.length
                                                ? {
                                                      catalog: {
                                                          ...prev.catalog,
                                                          products: {
                                                              __typename: prev.catalog.products.__typename,
                                                              edges: [
                                                                  ...prev.catalog.products.edges,
                                                                  ...newEdges,
                                                              ],
                                                          },
                                                      },
                                                  }
                                                : prev;
                                        },
                                    })
                                }
                                kind="secondary"
                                fullWidth
                            >
                                Показать еще ...
                            </Button>
                        )}
                    </>
                );
            }}
        </Query>
    );
};

Products.defaultProps = {
    limit: 40,
    offset: 0,
    title: null,
    page: '',
    slug: '',
    className: null,
    col: 4,
};

Products.propTypes = {
    limit: PropTypes.number,
    offset: PropTypes.number,
    title: PropTypes.node,
    page: PropTypes.string,
    slug: PropTypes.string,
    col: PropTypes.number,
    className: PropTypes.string,
};

export default Products;
