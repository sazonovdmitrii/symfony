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
    const { catalog: slug, subcatalog } = match.params;
    let offset = 0;
    let myCount = 0;
    let currentPage = 1;

    const isPage = subcatalog && subcatalog.match(/page-\d{1,}/);

    if (isPage) {
        currentPage = +subcatalog.match(/\d+/)[0];

        offset = currentPage * limit;
    }

    return (
        <div className="catalogpage">
            <Sidebar />
            <div className="catalogpage__content">
                <Query query={GET_CATALOG} variables={{ slug, limit, offset }}>
                    {({ loading, error, data: { catalog }, fetchMore }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error: ${error}`;

                        const { name, products, count } = catalog;
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
                                <Products items={products.edges} />
                                {count > limit && (
                                    <div className="catalog__pager">
                                        <Pagination
                                            current={currentPage}
                                            max={Math.round(count / limit)}
                                            onNextPage={() =>
                                                fetchMore({
                                                    variables: {
                                                        cursor: products.pageInfo.endCursor,
                                                    },
                                                    updateQuery: (previousResult, { fetchMoreResult }) => {
                                                        const newEdges = fetchMoreResult.products.edges;
                                                        const pageInfo = fetchMoreResult.products.pageInfo;

                                                        return newEdges.length
                                                            ? {
                                                                  // Put the new products at the end of the list and update `pageInfo`
                                                                  // so we have the new `endCursor` and `hasNextPage` values
                                                                  products: {
                                                                      pageInfo,
                                                                      __typename:
                                                                          previousResult.products.__typename,
                                                                      edges: newEdges,
                                                                  },
                                                              }
                                                            : previousResult;
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                )}
                            </Fragment>
                        );
                    }}
                </Query>
            </div>
        </div>
    );
};

Catalog.defaultProps = {
    limit: 40,
};

export default Catalog;
