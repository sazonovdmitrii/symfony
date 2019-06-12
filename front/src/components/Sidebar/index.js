import React from 'react';
import PropTypes from 'prop-types';

import ArticleSidebar from './ArticleSidebar';
import CatalogSidebar from './CatalogSidebar';

const Sidebar = ({ type = 'catalog' }) => {
    switch (type) {
        case 'news':
        case 'article':
            return <ArticleSidebar />;
        case 'catalog':
        default:
            return <CatalogSidebar />;
    }
};

Sidebar.defaultProps = {
    type: '',
};

Sidebar.propTypes = {
    type: PropTypes.string,
};

export default Sidebar;
