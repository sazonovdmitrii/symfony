import React from 'react';
import PropTypes from 'prop-types';

const ProductItems = ({ items, active, onChange }) => {
    return (
        <ul className="product__cart-block-type-ul">
            {items.edges.map(({ node: item }) => {
                const { id, price, name } = item;

                return (
                    <li
                        key={id}
                        className={`product__cart-block-type-ul-li${
                            !price
                                ? '--not_available'
                                : active.id === id
                                ? ' product__cart-block-type-ul-li-active'
                                : ''
                        }`}
                        onClick={() => onChange(item)}
                    >
                        <div className="product__cart-block-type-ul-li-container">
                            <img
                                className="product__cart-block-type-ul-li-container-img"
                                src="https://laparfumerie.ru/item/2015/01/18/23599_45305_353568.jpg.smaller.jpg"
                                alt={name}
                            />
                        </div>
                        <div className="product__cart-block-type-ul-li-nameblock">
                            {name}
                            {price ? (
                                <div className="product__cart-block-type-ul-li-nameblock-price">
                                    {price}
                                    <span className="product__cart-block-type-ul-li-nameblock-currer">
                                        руб.
                                    </span>
                                </div>
                            ) : (
                                <div className="product__cart-block-type-ul-li-nameblock-available">
                                    Ожидает поступления
                                </div>
                            )}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

ProductItems.defaultProps = {
    active: {},
    onChange: () => {},
};

ProductItems.propTypes = {
    active: PropTypes.shape({
        id: PropTypes.number,
    }),
    items: PropTypes.shape({
        edges: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    onChange: PropTypes.func,
};

export default ProductItems;
