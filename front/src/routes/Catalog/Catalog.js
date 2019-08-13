import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { seoHead } from 'utils';

import Sidebar from 'components/Sidebar';
import Pagination from 'components/Pagination';
import Filters from 'components/Filters';
import Products from 'components/Products';

const Catalog = ({ match, slug, limit, name, count, description, subtitle, tags = [] }) => {
    const {
        groups: { index },
    } = match.url.match(/(\/page-)(?<index>\d+)/) || { groups: { index: null } };
    const maxPages = parseInt(count / limit, 10) + 1;
    const currentPage = index ? parseInt(index, 10) : 1;
    const offset = currentPage > 1 ? (currentPage - 1) * limit : 0;
    const redirectToIndexPage = count < offset || parseInt(index, 10) === 0 || parseInt(index, 10) === 1;

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
            {seoHead('catalog', { name, currentPage })}
            <Sidebar />
            <div className="catalogpage__content">
                <div className="brand-info">
                    <h1 className="brand-info__title">{name || 'Без имени'}</h1>
                    {subtitle && <p className="brand-info__subtitle">{subtitle || 'Черрути'}</p>}
                    {description && (
                        <>
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
                        </>
                    )}
                </div>
                {tags.length ? <Filters items={tags} /> : null}
                {pagination}
                <Products slug={slug} limit={limit} offset={offset} count={count} />
                {pagination}
            </div>
        </div>
    );
};

Catalog.defaultProps = {
    limit: 40,
    name: 'Без имени',
    subtitle: null,
    description: null,
};

Catalog.propTypes = {
    limit: PropTypes.number,
    slug: PropTypes.string.isRequired,
    match: PropTypes.object,
    name: PropTypes.string,
    count: PropTypes.number.isRequired,
    description: PropTypes.string,
    subtitle: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.object),
};

export default Catalog;
