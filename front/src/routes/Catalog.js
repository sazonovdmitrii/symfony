import React, { Component } from 'react';

import Sidebar from 'components/Sidebar';
import Pagination from 'components/Pagination';
import Filters from 'components/Filters';
import Products from 'components/Products';

export default class Catalog extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="catalogpage">
                <Sidebar />
                <div className="catalogpage__content">
                    <div className="brand-info">
                        <h1 className="brand-info__title">{this.props.match.params.filter && 'filter'}</h1>
                        <p className="brand-info__subtitle">Черрути</p>
                        <div className="brand-info__body">
                            <p>
                                Потрясающего очарование подлинного итальянского шика и элегантности нашло свое
                                отражение в удивительных коллекциях модного дома Cerruti, который известен еще
                                с конца девятнадцатого столетия. Утонченные и невероятно изящные силуэты,
                                роскошное исполнение и потрясающий стиль — все это коллекции от Cerruti.
                            </p>
                        </div>
                        <a href="#full_description" className="brand-info__link">
                            Подробнее
                        </a>
                    </div>
                    <Filters />
                    <Products />
                    <div className="catalog__pager">
                        <Pagination />
                    </div>
                </div>
            </div>
        );
    }
}
