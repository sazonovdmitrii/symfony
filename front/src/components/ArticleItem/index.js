import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ArticleItem extends Component {
    static defaultProps = {
        url: '/',
        image: 'https://placehold.it/200x200',
        has_video: false,
        author: 'FACE',
        name: 'Стиль Creed',
    };
    constructor(props) {
        super(props);
    }
    render() {
        const { url, image, has_video, author, name } = this.props;

        return (
            <div className="articles-list__item">
                <Link to={url} className="articles-list__link">
                    {image.url ? (
                        <div className="articles-list__image-wrapper">
                            <picture className="articles-list__image">
                                <img className="articles-list__image" src={image.url} />
                            </picture>
                        </div>
                    ) : (
                        <div className="articles-list__image-wrapper--placehold">
                            {has_video == 1 && <i className="article-item__icon" />}
                        </div>
                    )}
                    <div className="articles-list__text">
                        <h2 className="articles-list__title">{name}</h2>
                        <div className="articles-list__meta">
                            {author && <div className="articles-list__author">{author}</div>}
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}
