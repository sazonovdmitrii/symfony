import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className="article-item">
        <Link
            to="/articles/istoriya-brenda-jimmy-choo.htm"
            className="article-item__link"
            title="История бренда Jimmy Choo"
        >
            <div className="article-item__image-wrapper">
                <picture className="article-item__image">
                    <img className="article-item__image" src="https://placehold.it/300x300" />
                </picture>
            </div>
            <div className="article-item__text">
                <h2 className="article-item__title"> История бренда Jimmy Choo </h2>
                <div className="article-item__meta">
                    <div className="article-item__author">Мария Вертинская</div>
                    <div className="article-item__date">9 месяцев назад</div>
                </div>
            </div>
        </Link>
    </div>
);
