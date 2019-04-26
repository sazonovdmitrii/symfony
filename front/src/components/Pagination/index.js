import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

const Pagination = ({ type = 'catalog', max, current = 1 }) => {
    const leftArrowClassName = classnames('pagenav__arrow-a', 'pagenav__arrow-a-left', {
        'pagenav__arrow-a-disabled': max < current || current === 1,
    });
    const rightArrowClassName = classnames('pagenav__arrow-a', 'pagenav__arrow-a-right', {
        'pagenav__arrow-a-disabled': max === current,
    });

    switch (type) {
        case 'content':
            return (
                <div className="article-pagination">
                    <Link to="/articles/stil-creed.htm" className="article-pagination__inner--prev">
                        <div className="article-pagination__body">
                            <div className="article-pagination__text">Предыдущая статья</div>
                            <h4 className="article-pagination__title">Стиль Creed</h4>
                        </div>
                    </Link>
                    <Link
                        to="/articles/parfyumeriya-dlya-uspeshnyh-ledi.htm"
                        className="article-pagination__inner--next"
                    >
                        <div className="article-pagination__body">
                            <div className="article-pagination__text">Следующая статья</div>
                            <h4 className="article-pagination__title">Парфюмерия для успешных леди</h4>
                        </div>
                    </Link>
                </div>
            );
        case 'catalog':
        default:
            return (
                <div className="pagenav">
                    <div className="pagenav__arrow">
                        <Link
                            to={current === 2 ? '..' : `../page-${current - 1}/`}
                            className={leftArrowClassName}
                        >
                            ‹
                        </Link>
                    </div>
                    <div className="pagenav__items">
                        Страница <span className="pagenav__items-item">{current}</span>
                        <span className="pagenav__items-item" /> из{' '}
                        <span className="pagenav__items-item">{max}</span>
                    </div>
                    <div className="pagenav__arrow">
                        <Link
                            to={current === 1 ? 'page-2/' : `../page-${current + 1}/`}
                            className={rightArrowClassName}
                        >
                            ›
                        </Link>
                    </div>
                </div>
            );
    }
};

Pagination.propTypes = {
    type: PropTypes.string,
    max: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
};

export default Pagination;
