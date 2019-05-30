import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ArticleItem = ({ url, image, hasVideo, author, name }) => (
    <div className="articles-list__item">
        <Link to={url} className="articles-list__link">
            {image ? (
                <div className="articles-list__image-wrapper">
                    <picture className="articles-list__image">
                        <img className="articles-list__image" src={image} alt="" />
                    </picture>
                </div>
            ) : (
                <div className="articles-list__image-wrapper--placehold">
                    {hasVideo && <i className="article-item__icon" />}
                </div>
            )}
            <div className="articles-list__text">
                <h2 className="articles-list__title">{name}</h2>
                {author && (
                    <div className="articles-list__meta">
                        <div className="articles-list__author">{author}</div>
                    </div>
                )}
            </div>
        </Link>
    </div>
);

ArticleItem.defaultProps = {
    url: null,
    image: 'https://placehold.it/200x200',
    hasVideo: false,
    name: 'Без названия',
    author: null,
};

ArticleItem.propTypes = {
    hasVideo: PropTypes.bool,
    url: PropTypes.string.isRequired,
    name: PropTypes.string,
    image: PropTypes.string,
    author: PropTypes.string,
};

export default ArticleItem;
