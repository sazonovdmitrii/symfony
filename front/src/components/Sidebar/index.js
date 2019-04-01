import React from 'react';

import ArticleSidebar from './ArticleSidebar';
import CatalogSidebar from './CatalogSidebar';

export default ({ type = 'catalog' }) => {
    switch (type) {
        case 'news':
        case 'article':
            return <ArticleSidebar />;
        case 'catalog':
        default:
            return <CatalogSidebar />;
    }
};
