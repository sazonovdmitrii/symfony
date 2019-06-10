import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ArticleCard from 'components/ArticleCard';

const ArticlesPreview = ({ brandName, items }) => (
    <div className="articles-preview">
        <h2 className="articles-preview__title">{brandName} в новостях и статьях</h2>
        <div className="articles-preview__row">
            {items.map((_item, index) => (
                <div className="article-item">
                    <ArticleCard key={index} />
                </div>
            ))}
        </div>
        <Link to="/articles/" className="button--white-border-g">
            Еще статьи
        </Link>
    </div>
);

ArticlesPreview.defaultProps = {
    //remove
    brandName: 'Без названия',
    limit: 4,
    items: [...Array(4)],
};

ArticlesPreview.propTypes = {
    brandName: PropTypes.string.isRequired,
    limit: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.string),
};

export default ArticlesPreview;
