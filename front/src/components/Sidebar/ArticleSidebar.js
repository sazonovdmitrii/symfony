import React from 'react';
import { Link } from 'react-router-dom';

import ArticlesList from 'components/ArticlesList';

export default () => (
    <div className="article-rightcolumn">
        <ul className="tags"> </ul>
        <h3 className="article-rightcolumn__title">Мода и красота</h3>
        <div className="article-rightcolumn__articles-list">
            <ArticlesList />
        </div>
        <Link to="/articles/" className="button--white-border-g">
            Еще статьи
        </Link>
    </div>
);
