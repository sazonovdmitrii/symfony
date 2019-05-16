import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Products from 'components/Products';
import Pagination from 'components/Pagination';
import SearchForm from 'components/SearchForm';

import SortBox from './SortBox';

const MySearchForm = (
    <div className="catalog__search">
        Изменить запрос?
        <div className="catalog__search-form">
            <SearchForm />
        </div>
    </div>
);

const Search = ({ match, limit, count, query, rows }) => {
    const isPage = match.url.match(/(\/page-)(?<index>\d+)/);
    let offset = 0;
    let currentPage = 1;

    if (isPage) {
        const {
            groups: { index },
        } = isPage;

        currentPage = parseInt(index, 10);
        offset = (currentPage - 1) * limit;
    }

    let maxPages = count / limit;
    const isTest = maxPages.toString().match(/\./);
    const redirectToIndexPage = count < offset;

    maxPages = parseInt(maxPages, 10);
    if (isTest) {
        maxPages += 1;
    }
    const pagination = count > limit && <Pagination current={currentPage} max={maxPages} />;

    return (
        <div className="catalogpage catalogpage-5column">
            <div className="catalogpage__content--full">
                <h1 className="typography__catheader">Вы искали: {query}</h1>
                {count ? (
                    <Fragment>
                        <div className="catalogpage__foundcount">Мы нашли {count} товаров</div>
                        <div className="catalog__pager">
                            {pagination}
                            <SortBox query={query} rows={rows} />
                            <form className="catalog-sorting">
                                <div className="catalog-sorting__label">Сортировать:</div>
                                <div className="catalog-sorting__inner">
                                    <select className="catalog-sorting__select" name="sort">
                                        <option value="dateup">По дате</option>{' '}
                                        <option value="priceup">По ↑ цене</option>
                                        <option value="pricedown">По ↓ цене</option>
                                        <option value="ratingup">По рейтингу</option>
                                    </select>
                                    <i className="catalog-sorting__arrow" />
                                </div>
                            </form>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        {MySearchForm}
                        <div
                            style={{
                                paddingBottom: '39px',
                                paddingTop: '39px',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                                textAlign: 'center',
                                lineHeight: '1.3125',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '19px',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    marginBottom: '10px',
                                }}
                            >
                                Ничего не найдено
                            </div>
                            <div style={{ fontSize: '15px', fontWeight: '400' }}>
                                Поиск не принес результатов.
                            </div>
                        </div>
                    </Fragment>
                )}
                {count ? (
                    <Fragment>
                        <Products limit={limit} />
                        <div className="catalog__sorting catalog__sorting_pos_b">
                            <div className="catalog__search-name">
                                Вы искали <span className="typography__catheader">{query}</span>
                            </div>
                            <div className="catalog__search-counts">
                                Мы нашли <span className="catalog__counts-i">{count} товаров</span>
                            </div>
                            {MySearchForm}
                        </div>
                    </Fragment>
                ) : null}
                {pagination}
            </div>
        </div>
    );
};

Search.defaultProps = {
    limit: 40,
    rows: [],
};

Search.propTypes = {
    limit: PropTypes.number,
    query: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    rows: PropTypes.array,
};

export default Search;
