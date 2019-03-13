import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Sidebar from 'components/Sidebar';
import Pagination from 'components/Pagination';

export default class Article extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{ display: 'flex' }}>
                <div className="article-content">
                    <h1 className="article-content__title">История бренда Jimmy Choo</h1>
                    <div className="article-content__meta">
                        <span className="article-content__author">от Мария Вертинская</span>
                        <span className="article-content__date">Опубликовано 14 мая 2018 г.</span>
                    </div>
                    <Pagination type="content" />
                </div>
                <Sidebar type="article" />
            </div>
        );
    }
}
