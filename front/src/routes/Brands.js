import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Brands extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <div className="page-header">
                    <h1 className="page-header__title">Все бренды</h1>
                </div>
                <div className="page-brand">
                    <div className="page-brand__menu">
                        <a className="page-brand__menu-item" href="#A">
                            A – D
                        </a>
                        <a className="page-brand__menu-item" href="#E">
                            E – I
                        </a>
                        <a className="page-brand__menu-item" href="#J">
                            J – N
                        </a>
                        <a className="page-brand__menu-item" href="#O">
                            O – S
                        </a>
                        <a className="page-brand__menu-item" href="#T">
                            T – X
                        </a>
                        <a className="page-brand__menu-item" href="#Y">
                            Y – А-Я
                        </a>
                    </div>
                    <ul className="page-brand__brands">
                        <li className="page-brand__letter-list">
                            <p className="page-brand__letter" id="0">
                                Популярные бренды
                            </p>
                            <ul className="page-brand__list">
                                <li className="page-brand__list-item">
                                    <Link className="page-brand__link--bold" to="/duhi-agent-provocateur/">
                                        Agent Provocateur
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </Fragment>
        );
    }
}
