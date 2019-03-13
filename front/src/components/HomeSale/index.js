import React, { Component } from 'react';

export default class HomeSale extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { sales = [] } = this.props;

        return (
            <div className="homesale">
                {sales.map(sale => (
                    <div className="homesale__sale">
                        <a className="homesale__picture" href={sale.data.url}>
                            <picture className="homesale__image">
                                <img
                                    className="homesale__image-img"
                                    src={`${img_host + sale.data.bnr_img}._1x.jpg`}
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
    }
}
