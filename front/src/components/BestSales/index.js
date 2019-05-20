import React, { Component } from 'react';

import Products from 'components/Products';

const BestSales = ({ items }) => {
    return (
        <div className="bestsales">
            <Products
                limit={16}
                title={<h2 className="editors-choice-title bestsales-title">Популярные товары</h2>}
            />
        </div>
    );
};

export default BestSales;
