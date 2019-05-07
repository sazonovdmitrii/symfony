import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Helmet from 'react-helmet';

import NotFound from 'routes/NotFound';

import Sidebar from 'components/Sidebar';
import Pagination from 'components/Pagination';
import Filters from 'components/Filters';
import Products from 'components/Products';
import Loader from 'components/Loader';

const GET_CATALOG = gql`
    query Catalog($slug: String!) {
        catalog(slug: $slug) {
            name
            count
        }
    }
`;

const Catalog = props => {
    const { match, limit } = props;

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
        <Query query={GET_CATALOG} variables={{ slug }}>
            {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error || !data) return <NotFound />;

                const { name, count, description, subtitle, filters = [] } = data.catalog;

                let maxPages = count / limit;
                const isTest = maxPages.toString().match(/\./);

                maxPages = parseInt(maxPages, 10);
                if (isTest) {
                    maxPages += 1;
                }

                const pagination = count > limit && (
                    <div className="catalog__pager">
                        <div className="catalog__search-counts">Мы нашли {count} товара</div>
                        <Pagination current={currentPage} max={maxPages} />
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
                            <Filters items={[...new Array(10).keys()]} />
                            {pagination}
                            <Products slug={slug} limit={limit} offset={offset} count={count} />
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
