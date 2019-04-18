import React, { Component } from 'react';

export default class Filters extends Component {
    constructor(props) {
        super(props);
    }

    handleOpen = () => {
        // todo
    };

    render() {
        return (
            <div className="filtertiles__item">
                <div className="filtertiles__item-name" onClick={this.handleOpen}>
                    <span className="filtertiles__item-name-link">Бренд</span>
                    <i className="filtertiles__item-name-i" />
                </div>
                <div className="filtertiles__dropmenu">
                    <input className="filtertiles__dropmenu-search" placeholder="Найти" />
                    <ul data-render="taglist" className="filtertiles__dropmenu_list list">
                        <li className="filtertiles__dropmenu_item active-0">
                            <a href="/parfumeriya/brend_hugo-boss/">Hugo Boss (239)</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
