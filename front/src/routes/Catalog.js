import React, { Fragment, useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import NotFound from 'routes/NotFound';

import Sidebar from 'components/Sidebar';
import Pagination from 'components/Pagination';
import Filters from 'components/Filters';
import Products from 'components/Products';

const GET_CATALOG = gql`
    query Catalog($slug: String!, $offset: Int!, $limit: Int!) {
        catalog(slug: $slug) {
            name
            products(limit: $limit, offset: $offset) {
                id
                name
            }
        }
    }
`;

const Catalog = props => {
    const { match } = props;
    const { catalog: slug } = match.params;

    return (
        <div className="catalogpage">
            <Sidebar />
            <div className="catalogpage__content">
                <Query query={GET_CATALOG} variables={{ slug, offset: 0, limit: 40 }}>
                    {({ loading, error, data: { catalog }, fetchMore }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error: ${error}`;

                        const { name, products } = catalog;
                        if (!name) return <NotFound />;

                        return (
                            <Fragment>
                                <div className="brand-info">
                                    <h1 className="brand-info__title">
                                        {props.match.params.filter && 'filter'}
                                        {name || 'Без имени'}
                                    </h1>
                                    <p className="brand-info__subtitle">Черрути</p>
                                    <div className="brand-info__body">
                                        <p>
                                            Потрясающего очарование подлинного итальянского шика и
                                            элегантности нашло свое отражение в удивительных коллекциях
                                            модного дома Cerruti, который известен еще с конца девятнадцатого
                                            столетия. Утонченные и невероятно изящные силуэты, роскошное
                                            исполнение и потрясающий стиль — все это коллекции от Cerruti.
                                        </p>
                                    </div>
                                    <a href="#full_description" className="brand-info__link">
                                        Подробнее
                                    </a>
                                </div>
                                <Filters />
                                <Products
                                    items={products}
                                    onLoadMore={() =>
                                        fetchMore({
                                            variables: {
                                                offset: catalog.products.length,
                                            },
                                            updateQuery: (prev, { fetchMoreResult }) => {
                                                if (!fetchMoreResult) return prev.catalog;

                                                return Object.assign({}, prev, {
                                                    catalog: {
                                                        ...prev.catalog,
                                                        products: [
                                                            ...prev.catalog.products,
                                                            ...fetchMoreResult.catalog.products,
                                                        ],
                                                    },
                                                });
                                            },
                                        })
                                    }
                                />
                                <div className="catalog__pager">
                                    <Pagination />
                                </div>
                            </Fragment>
                        );
                    }}
                </Query>
            </div>
        </div>
    );
};

export default Catalog;
