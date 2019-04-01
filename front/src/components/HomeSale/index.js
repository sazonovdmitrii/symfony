import React from 'react';

export default ({ sales = [] }) => (
    <div className="homesale">
        {sales.map(sale => (
            <div className="homesale__sale">
                <a className="homesale__picture" href={sale.data.url}>
                    <picture className="homesale__image">
                        <img
                            className="homesale__image-img"
                            src="https://placehold.it/300x300"
                            alt={sale.texts.sale_meta_description}
                        />
                    </picture>
                    <h3 className="homesale__label-head">{sale.data.texts.sale_tagline}</h3>
                    <div className="homesale__label">
                        <span className="homesale__label-text">{sale.data.texts.sale_name}</span>
                    </div>
                </a>
            </div>
        ))}
        <div className="homesale__saleall">
            <a className="homesale__saleall-link" href="/sales/">
                Смотреть все акции <i className="right-arrow" />
            </a>
        </div>
    </div>
);
