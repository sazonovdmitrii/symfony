import React, { Component } from 'react';

export default class ArticleCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="article-item">
                <a
                    href="/articles/istoriya-brenda-jimmy-choo.htm"
                    className="article-item__link"
                    title="История бренда Jimmy Choo"
                >
                    <div className="article-item__image-wrapper">
                        <picture className="article-item__image">
                            <source
                                srcset="https://laparfumerie.ru/cont/1046/2018_05_14_15_05_29.jpg.list_1x.webp 1x, https://laparfumerie.ru/cont/1046/2018_05_14_15_05_29.jpg.list_2x.webp 2x, https://laparfumerie.ru/cont/1046/2018_05_14_15_05_29.jpg.list_3x.webp 3x"
                                type="image/webp"
                            />
                            <source srcSet="https://laparfumerie.ru/cont/1046/2018_05_14_15_05_29.jpg.list_1x.jpg 1x, https://laparfumerie.ru/cont/1046/2018_05_14_15_05_29.jpg.list_2x.jpg 2x, https://laparfumerie.ru/cont/1046/2018_05_14_15_05_29.jpg.list_3x.jpg 3x" />
                            <img
                                className="article-item__image"
                                src="https://laparfumerie.ru/cont/1046/2018_05_14_15_05_29.jpg.list_1x.jpg"
                            />
                        </picture>
                    </div>
                    <div className="article-item__text">
                        <h2 className="article-item__title"> История бренда Jimmy Choo </h2>
                        <div className="article-item__meta">
                            <div className="article-item__author">Мария Вертинская</div>
                            <div className="article-item__date">9 месяцев назад</div>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}
