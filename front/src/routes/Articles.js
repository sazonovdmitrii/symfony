import React, { Component } from 'react';

import ArticleCard from 'components/ArticleCard';

export default class News extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <ArticleCard />
            </div>
        );
    }
}
