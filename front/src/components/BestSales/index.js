import React, { Component } from 'react';

import Products from 'components/Products';

export default class BestSales extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bestsales">
                <h2 className="editors-choice-title bestsales-title">Популярные товары</h2>
                [% SET editor_choice = popular %]
                <Products />
            </div>
        );
    }
}
