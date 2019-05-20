import React from 'react';
import PropTypes from 'prop-types';

import Loader from 'components/Loader';

const ProductItems = ({ items, active, onChange }) => {
    return (
        <ul className="product__cart-block-type-ul">
            {items.edges.map(({ node: item }) => (
                <li
                    key={item.id}
                    className={`product__cart-block-type-ul-li${
                        !item.price
                            ? '--not_available'
                            : active.id === item.id
                            ? ' product__cart-block-type-ul-li-active'
                            : ''
                    }`}
                    onClick={() => onChange(item)}
                >
                    <div className="product__cart-block-type-ul-li-container">
                        <img
                            className="product__cart-block-type-ul-li-container-img"
                            src="https://laparfumerie.ru/item/2015/01/18/23599_45305_353568.jpg.smaller.jpg"
                            alt={item.name}
                        />
                    </div>
                    <div className="product__cart-block-type-ul-li-nameblock">
                        {item.name}
                        {item.price ? (
                            <div className="product__cart-block-type-ul-li-nameblock-price">
                                {item.price}
                                <span className="product__cart-block-type-ul-li-nameblock-currer">руб.</span>
                            </div>
                        ) : (
                            <div className="product__cart-block-type-ul-li-nameblock-available">
                                Ожидает поступления
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};

ProductItems.propTypes = {};

export default ProductItems;
