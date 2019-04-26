import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Helmet from 'react-helmet';

import NotFound from 'routes/NotFound';

import Sidebar from 'components/Sidebar';
import Pagination from 'components/Pagination';
import Filters from 'components/Filters';
import Products from 'components/Products';

const GET_CATALOG = gql`
    query Catalog($slug: String!, $offset: Int!, $limit: Int!) {
        catalog(slug: $slug) {
            name
            count
            products(limit: $limit, offset: $offset) {
                edges {
                    cursor
                    node {
                        id
                        name
                    }
                }
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                }
            }
        }
    }
`;

const Catalog = props => {
    const { match, limit } = props;
    const { catalog, subcatalog, filter } = match.params;

    let isPage;
    const slug = Object.values(match.params)
        .reduce((array, item = '') => {
            if (item.match(/page-\d{1,}/)) {
                isPage = item;
                return array;
            }

            return [...array, item];
        }, [])
        .filter(Boolean)
        .join('/');
    let offset = 0;
    let currentPage = 1;

    if (isPage) {
        currentPage = +isPage.match(/\d+/)[0];

        offset = (currentPage - 1) * limit;
    }

    return (
        <Query query={GET_CATALOG} variables={{ slug, limit, offset }}>
            {({ loading, error, data: { catalog }, fetchMore }) => {
                if (error) return `Error: ${error}`;

                const { name, products, count, description, subtitle, filters = [] } = catalog;
                if (!name || !products.edges.length) return <NotFound />;

                const pagination = count > limit && (
                    <div className="catalog__pager">
                        <div className="catalog__search-counts">Мы нашли {count} товара</div>
                        <Pagination current={currentPage} max={Math.round(count / limit)} />
                    </div>
                );

                return (
                    <div className="catalogpage">
                        <Helmet>
                            <title>{`${name} - купить с доставкой по Москве и России - фото, цена, отзывы в интернет-магазине Laparfumerie.ru!${
                                currentPage > 1 ? ` Cтраница ${currentPage}` : ''
                            }`}</title>
                        </Helmet>
                        <Sidebar />
                        <div className="catalogpage__content">
                            <div className="brand-info">
                                <h1 className="brand-info__title">{name || 'Без имени'}</h1>
                                {subtitle && <p className="brand-info__subtitle">{subtitle || 'Черрути'}</p>}
                                {description && (
                                    <Fragment>
                                        <div className="brand-info__body">
                                            <p>
                                                {description ||
                                                    'Потрясающего очарование подлинного итальянского шика и элегантности нашло свое отражение в удивительных коллекциях модного дома Cerruti, который известен еще с конца девятнадцатого столетия. Утонченные и невероятно изящные силуэты, роскошное исполнение и потрясающий стиль — все это коллекции от Cerruti.'}
                                            </p>
                                        </div>
                                        }
                                        <a href="#full_description" className="brand-info__link">
                                            Подробнее
                                        </a>
                                    </Fragment>
                                )}
                            </div>
                            {filters.length ? <Filters items={filters} /> : null}
                            {pagination}
                            <Products
                                loading={loading}
                                count={count}
                                items={products.edges}
                                onLoadMore={() =>
                                    fetchMore({
                                        variables: {
                                            offset: products.edges.length,
                                        },
                                        updateQuery: (prev, { fetchMoreResult }) => {
                                            console.log(fetchMoreResult);
                                            if (!fetchMoreResult) return prev;

                                            const newEdges = fetchMoreResult.catalog.products.edges;
                                            const pageInfo = fetchMoreResult.catalog.products.pageInfo;

                                            return newEdges.length
                                                ? {
                                                      catalog: {
                                                          ...prev.catalog,
                                                          products: {
                                                              pageInfo,
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
                            />
                            {pagination}
                        </div>
                    </div>
                );
            }}
        </Query>
    );
};

Catalog.defaultProps = {
    limit: 40,
};

Catalog.propTypes = {
    limit: PropTypes.number,
};

export default Catalog;
