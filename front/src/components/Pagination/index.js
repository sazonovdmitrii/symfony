import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Pagination extends Component {
    static defaultProps = {
        type: 'catalog',
    };

    render() {
        const { type } = this.props;

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
                        <div className="pagenav__items">
                            Страница <span className="pagenav__items-item">1</span>
                            <span className="pagenav__items-item" /> из
                            <span className="pagenav__items-item">4</span>
                        </div>
                        <div className="pagenav__arrow">
                            <Link
                                className="pagenav__arrow-a pagenav__arrow-a-right"
                                to="/cosmetics-sredstva-dlja-volos-shampuni-dlya-vseh-tipov-volos/page-2/"
                            >
                                ›
                            </Link>
                        </div>
                    </div>
                );
        }
    }
}
