import React from 'react';

import ArticleItem from 'components/ArticleItem';

export default ({ items = [] }) => (
    <div className="articles-list">
        {items.map((item, index) => (
            <ArticleItem key={index} {...article} />
        ))}
    </div>
);
