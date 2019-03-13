import React, { Component, Fragment } from 'react';

export default class Sales extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <div className="page-header">
                    <h1 className="page-header__title">АКЦИИ</h1>
                </div>
                <div className="homesale">
                    <div className="homesale__sale">
                        <a className="homesale__picture" href="/sales/nina-ricci-na-14-marta/">
                            <picture className="homesale__image">
                                <source
                                    srcSet="/sale/1533/sale_1533_0.jpg._1x.webp 1x, /sale/1533/sale_1533_0.jpg._2x.webp 2x, /sale/1533/sale_1533_0.jpg._3x.webp 3x"
                                    media="(min-width: 1000px)"
                                    type="image/webp"
                                />
                                <source
                                    srcSet="/sale/1533/sale_1533_0.jpg._1x.jpg 1x, /sale/1533/sale_1533_0.jpg._2x.jpg 2x, /sale/1533/sale_1533_0.jpg._3x.jpg 3x"
                                    media="(min-width: 1000px)"
                                />
                                <source
                                    srcSet="/sale/1533/sale_1533_1.jpg._m_1x.webp 1x, /sale/1533/sale_1533_1.jpg._m_2x.webp 2x, /sale/1533/sale_1533_1.jpg._m_3x.webp 3x"
                                    media="(min-width: 320px) and (max-width:999px)"
                                    type="image/webp"
                                />
                                <source
                                    srcSet="/sale/1533/sale_1533_1.jpg._1x.jpg 1x, /sale/1533/sale_1533_1.jpg._m_2x.jpg 2x, /sale/1533/sale_1533_1.jpg._m_3x.jpg 3x"
                                    media="(min-width: 320px) and (max-width:999px)"
                                />
                                <img
                                    className="homesale__image-img"
                                    src="/sale/1533/sale_1533_1.jpg._1x.jpg"
                                    alt=""
                                />
                            </picture>
                            <h3 className="homesale__label-head"> Нежность и женственность </h3>
                            <div className="homesale__label">
                                <span className="homesale__label-text">
                                    Парфюмерия Nina Ricci со скидкой 11%
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
            </Fragment>
        );
    }
}
