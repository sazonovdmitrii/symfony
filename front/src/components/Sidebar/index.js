import React, { Component } from 'react';

import ArticleSidebar from './ArticleSidebar';
import CatalogSidebar from './CatalogSidebar';

export default class Name extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { type } = this.props;

        switch (type) {
            case 'news':
            case 'article':
                return <ArticleSidebar />;
            case 'catalog':
                return <CatalogSidebar />;
        }
    }
}
