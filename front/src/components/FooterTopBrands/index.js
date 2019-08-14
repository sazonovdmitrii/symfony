import React from 'react';

export default ({ items = [] }) => (
    <>
        <p className="footer__head">Популярные бренды</p>
        {items.map(brand => (
            <div className="footer__colum">
                <a href={brand.url} className="footer__list_item footer__list_item_link">
                    {brand.name}
                </a>
            </div>
        ))}
    </>
);
