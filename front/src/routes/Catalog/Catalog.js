import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Sidebar from 'components/Sidebar';
import Pagination from 'components/Pagination';
import Filters from 'components/Filters';
import Products from 'components/Products';

const Catalog = ({ match, slug, limit, name, count, description, subtitle, filters = [] }) => {
    const isPage = Object.values(match.params).some((item = '') => item.match(/page-\d{1,}/));
    let offset = 0;
    let currentPage = 1;

    if (isPage) {
        currentPage = match.url.match(/\d+$/)[0];

        offset = (currentPage - 1) * limit;
    }

    let maxPages = count / limit;
    const isTest = maxPages.toString().match(/\./);
    const redirectToIndexPage = count < offset;

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

    if (redirectToIndexPage) {
        return <Redirect to=".." />;
    }
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
};

Catalog.defaultProps = {
    limit: 40,
};

Catalog.propTypes = {
    limit: PropTypes.number,
};

export default Catalog;
