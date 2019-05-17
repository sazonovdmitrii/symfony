import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';

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
                        <Link className="homesale__picture" to="/sales/nina-ricci-na-14-marta/">
                            <picture className="homesale__image">
                                <img
                                    className="homesale__image-img"
                                    src="https://placehold.it/290x290"
                                    alt=""
                                />
                            </picture>
                            <h3 className="homesale__label-head"> Нежность и женственность </h3>
                            <div className="homesale__label">
                                <span className="homesale__label-text">
                                    Парфюмерия Nina Ricci со скидкой 11%
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </Fragment>
        );
    }
}
